// ─── ContentEngine ────────────────────────────────────────────────────────────
// The brain of the content layer. Every screen calls these functions to get
// the right content for the right user at the right time.
//
// Pure functions, with one exception: getNotification persists the last 7
// notification IDs used (per-theme) to AsyncStorage so the same copy is not
// repeated within a week.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDayContent,
  getPhaseForDay,
  getThemeFile,
  getWordForDay,
  ALL_REFLECTIONS,
} from '../data';
import type { Ritual } from '../data/rituals';
import type {
  DayAction,
  DayReflection,
  EveningContent,
  HomeCard,
  Mood,
  MoodEntry,
  MoodPersonalization,
  MoodTrend,
  NotificationContent,
  RitualIntensity,
  ThemeFile,
  WordOfDay,
} from '../types/content';

// ─── 1. getDayRitual ──────────────────────────────────────────────────────────
// Returns the complete ritual content for a given day, personalized by theme.
// Base ritual (from rituals.json / dailyResetsExtended) is merged with theme
// variants for the five themed screens. Action / why / reflection / completion
// message / home_card / evening_reflection are kept from the base ritual.
// word_of_day is overridden by words_365.

export function getDayRitual(day: number, theme: string): Ritual {
  // Base — fall back to day 1 if the requested day isn't found.
  const base = getDayContent(day) ?? getDayContent(1)!;
  const themeFile = getThemeFile(theme);

  const arrivalVariants    = themeFile.ritual_variants.arrival;
  const releaseVariants    = themeFile.ritual_variants.release;
  const breathVariants     = themeFile.ritual_variants.breath;
  const momentVariants     = themeFile.ritual_variants.moment;
  const completionVariants = themeFile.ritual_variants.completion;

  const arrival    = arrivalVariants[day % arrivalVariants.length];
  const release    = releaseVariants[day % releaseVariants.length];
  const breath     = breathVariants[day % breathVariants.length];
  const moment     = momentVariants[day % momentVariants.length];
  const completion = completionVariants[day % completionVariants.length];

  const word = getWordForDay(day);

  return {
    ...base,
    screens: {
      ...base.screens,
      arrival: {
        ...base.screens.arrival,
        heading: arrival.heading,
        subheading: arrival.subheading,
      },
      release: {
        ...base.screens.release,
        heading: release.heading,
        subheading: release.subheading,
        field_placeholder: release.field_placeholder ?? base.screens.release.field_placeholder,
      },
      breath: {
        ...base.screens.breath,
        heading: breath.heading,
        instruction: breath.instruction,
      },
      moment: {
        ...base.screens.moment,
        heading: moment.heading,
      },
      completion: {
        ...base.screens.completion,
        heading: completion.heading,
        subheading: completion.subheading,
      },
    },
    word_of_day: word.word,
  };
}

// ─── 2. getWordOfDay ──────────────────────────────────────────────────────────

export function getWordOfDay(day: number): WordOfDay {
  return getWordForDay(day);
}

// ─── 3. getHomeCard ───────────────────────────────────────────────────────────

export function getHomeCard(day: number, theme: string): HomeCard {
  const themeFile = getThemeFile(theme);
  const homeCards = themeFile.home_cards;
  const card = homeCards[day % homeCards.length];
  const word = getWordForDay(day);

  return {
    headline: card.headline,
    subheadline: card.subheadline,
    word: word.word,
    word_meaning: word.meaning,
    day_label: `DAY ${day}`,
    theme_tag: themeFile.theme,
    duration: '~2 min',
  };
}

// ─── 4. getDayAction ──────────────────────────────────────────────────────────

export function getDayAction(day: number, theme: string): DayAction {
  // Days 1-100 use the curated base ritual action.
  if (day <= 100) {
    const base = getDayContent(day);
    if (base) {
      return {
        title: base.today_action.title || "Today's Action",
        content: base.today_action.content,
        why: base.why_it_matters.content,
      };
    }
  }
  // Days 101+ use theme actions (cycle through 30 variants).
  const themeFile = getThemeFile(theme);
  const actions = themeFile.actions;
  const action = actions[(day - 1) % actions.length];
  return {
    title: "Today's Action",
    content: action.content,
    why: action.why,
  };
}

// ─── 5. getDayReflection ──────────────────────────────────────────────────────

export function getDayReflection(day: number, theme: string): DayReflection {
  const phase = getPhaseForDay(day);
  const phasePool = ALL_REFLECTIONS.filter(r => r.phase === phase);

  // Days 101+: if phase pool is empty (shouldn't be) or we want to supplement,
  // fall back to theme reflections.
  if (day > 100 || phasePool.length === 0) {
    const themeFile = getThemeFile(theme);
    const themePool = themeFile.reflections;
    if (themePool.length > 0) {
      const r = themePool[(day - 1) % themePool.length];
      return { title: 'Reflection', content: r.content };
    }
  }

  const r = phasePool[day % phasePool.length];
  return { title: 'Reflection', content: r.prompt };
}

// ─── 6. getNotification ───────────────────────────────────────────────────────
// Picks the highest-weighted notification for the user's mood, avoiding any
// notification used in the last 7 days. Stores the chosen ID afterward.

const NOTIF_USED_KEY = 'content_engine_notif_used_v1';

type NotifUsedEntry = {
  id: string;
  theme: string;
  date: string; // YYYY-MM-DD
};

async function readUsedNotifs(): Promise<NotifUsedEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTIF_USED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUsedNotifs(entries: NotifUsedEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTIF_USED_KEY, JSON.stringify(entries));
  } catch {
    // silent
  }
}

function todayYmd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function moodKey(mood: Mood): 'dark' | 'half' | 'full' {
  if (mood === 0) return 'dark';
  if (mood === 1) return 'half';
  return 'full';
}

export async function getNotification(
  day: number,
  theme: string,
  mood: Mood,
): Promise<NotificationContent> {
  const themeFile = getThemeFile(theme);
  const pool = themeFile.notification_pool;
  const word = getWordForDay(day);

  // Trim used entries to last 7 days.
  const allUsed = await readUsedNotifs();
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = allUsed.filter(e => {
    const t = new Date(e.date).getTime();
    return !Number.isNaN(t) && t >= cutoff;
  });
  const recentIds = new Set(recent.map(e => e.id));

  // Filter & weight.
  const key = moodKey(mood);
  let candidates = pool.filter(n => !recentIds.has(n.id));

  // Defensive fallback: if every notification is "used" (shouldn't happen
  // with 28 in pool / 7-day window), reset and use the full pool.
  if (candidates.length === 0) {
    candidates = pool;
  }

  const sorted = [...candidates].sort(
    (a, b) => b.mood_weight[key] - a.mood_weight[key],
  );
  const chosen = sorted[0];

  // Persist usage.
  const updated: NotifUsedEntry[] = [
    ...recent,
    { id: chosen.id, theme: themeFile.theme, date: todayYmd() },
  ];
  await writeUsedNotifs(updated);

  return {
    id: chosen.id,
    copy: chosen.copy,
    word_hook: `Your word today: ${word.word}. ${word.notification_hook}`,
  };
}

// ─── 7. getEveningPrompt ──────────────────────────────────────────────────────

export function getEveningPrompt(day: number, theme: string): EveningContent {
  const word = getWordForDay(day);
  const themeFile = getThemeFile(theme);
  const evenings = themeFile.evening_reflections;
  const evening = evenings[day % evenings.length];
  return {
    word_prompt: word.evening_prompt,
    theme_reflection: evening.content,
  };
}

// ─── 8. getMoodPersonalization ────────────────────────────────────────────────

function calcTrend(moodHistory: MoodEntry[]): MoodTrend {
  const last3 = moodHistory.slice(-3);
  if (last3.length < 3) {
    // Not enough data — treat as stable.
    return 'stable';
  }
  const [a, b, c] = last3.map(m => m.mood);

  if (a === 0 && b === 0 && c === 0) return 'struggling';
  if (a < b && b < c) return 'improving';
  if (a > b && b > c) return 'declining';
  return 'stable';
}

function mostUsedIntention(moodHistory: MoodEntry[]): string | null {
  const counts: Record<string, number> = {};
  for (const m of moodHistory) {
    if (m.intention) counts[m.intention] = (counts[m.intention] ?? 0) + 1;
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [k, v] of Object.entries(counts)) {
    if (v > bestCount) {
      best = k;
      bestCount = v;
    }
  }
  return best;
}

function intensityForTrend(trend: MoodTrend): RitualIntensity {
  if (trend === 'struggling' || trend === 'declining') return 'gentle';
  if (trend === 'improving') return 'energized';
  return 'standard';
}

// ─── Greeting system ──────────────────────────────────────────────────────────

type TimeBand = 'morning' | 'afternoon' | 'evening' | 'late';

function timeBand(hour: number): TimeBand {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'late';
}

function baseGreeting(band: TimeBand): string {
  switch (band) {
    case 'morning':   return 'Good morning.';
    case 'afternoon': return 'Midday.';
    case 'evening':   return 'Good evening.';
    case 'late':      return 'Still here.';
  }
}

function moodModifier(trend: MoodTrend, band: TimeBand): string {
  const isMorning = band === 'morning';
  switch (trend) {
    case 'struggling':
      return isMorning
        ? "Three hard days. You're still showing up."
        : "It's been heavy. This moment is still yours.";
    case 'improving':
      return isMorning
        ? 'Something is shifting. Can you feel it?'
        : "You're moving in the right direction.";
    case 'declining':
      return isMorning
        ? 'Yesterday was hard. Today is separate.'
        : 'The weight is back. This moment still counts.';
    case 'stable':
      return isMorning
        ? 'You showed up. That already matters.'
        : "You're here. That's the whole thing.";
  }
}

function streakModifier(streak: number): string | null {
  if (streak === 0)   return 'Welcome back.';
  if (streak === 1)   return 'Day one. The beginning counts.';
  if (streak === 3)   return 'Three days. Something is forming.';
  if (streak === 7)   return 'One week. Something has shifted.';
  if (streak === 14)  return 'Two weeks of choosing yourself.';
  if (streak === 30)  return 'One month. You are not who you were.';
  if (streak === 100) return 'One hundred days. This is who you are now.';
  return null;
}

export function buildGreeting(
  trend: MoodTrend,
  streak: number,
  hour: number = new Date().getHours(),
): string {
  const band = timeBand(hour);
  const base = baseGreeting(band);
  const mood = moodModifier(trend, band);
  const streakPart = streakModifier(streak);
  return streakPart ? `${streakPart} ${base} ${mood}` : `${base} ${mood}`;
}

export function getMoodPersonalization(
  moodHistory: MoodEntry[],
  currentDay: number,
  theme: string,
): MoodPersonalization {
  const trend = calcTrend(moodHistory);

  // Suggested intention by trend.
  let suggested: string;
  if (trend === 'struggling') {
    suggested = 'Rest';
  } else if (trend === 'improving') {
    suggested = mostUsedIntention(moodHistory) ?? theme;
  } else if (trend === 'declining') {
    suggested = 'Courage';
  } else {
    suggested = theme;
  }

  // Streak rough-derived from how many entries in last 14 days.
  // The screens usually pass real streak in via theme/state — for greeting we
  // approximate by counting recent entries. Screens that have the real streak
  // can call buildGreeting() directly.
  const streakProxy = moodHistory.filter(m => {
    const t = new Date(m.date).getTime();
    return !Number.isNaN(t) && t >= Date.now() - 14 * 24 * 60 * 60 * 1000;
  }).length;

  const greeting = buildGreeting(trend, streakProxy);

  return {
    trend,
    greeting,
    suggested_intention: suggested,
    ritual_intensity: intensityForTrend(trend),
  };
}

// ─── Convenience re-export for screens that already use types/content ─────────
export type {
  WordOfDay,
  HomeCard,
  DayAction,
  DayReflection,
  NotificationContent,
  EveningContent,
  MoodPersonalization,
  MoodEntry,
  MoodTrend,
  Mood,
};

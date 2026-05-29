// ─── ContentEngine — Type Definitions ─────────────────────────────────────────
// Types shared by ContentEngine.ts and the screens that consume it.

export type Mood = 0 | 1 | 2;

export type MoodEntry = {
  date: string;
  mood: Mood;
  intention?: string;
};

export type WordOfDay = {
  day: number;
  week: number;
  arc: string;
  word: string;
  category: string;
  meaning: string;
  notification_hook: string;
  evening_prompt: string;
};

export type HomeCard = {
  headline: string;
  subheadline: string;
  word: string;
  word_meaning: string;
  day_label: string;
  theme_tag: string;
  duration: string;
};

export type DayAction = {
  title: string;
  content: string;
  why: string;
};

export type DayReflection = {
  title: string;
  content: string;
};

export type NotificationContent = {
  id: string;
  copy: string;
  word_hook: string;
};

export type EveningContent = {
  word_prompt: string;
  theme_reflection: string;
};

export type MoodTrend = 'struggling' | 'improving' | 'declining' | 'stable';

export type RitualIntensity = 'gentle' | 'standard' | 'energized';

export type MoodPersonalization = {
  trend: MoodTrend;
  greeting: string;
  suggested_intention: string;
  ritual_intensity: RitualIntensity;
};

// ─── Theme file shape ─────────────────────────────────────────────────────────

export type ThemeArrivalVariant = {
  id: string;
  heading: string;
  subheading: string;
};

export type ThemeReleaseVariant = {
  id: string;
  heading: string;
  subheading: string;
  field_placeholder: string;
};

export type ThemeBreathVariant = {
  id: string;
  heading: string;
  instruction: string;
};

export type ThemeMomentVariant = {
  id: string;
  heading: string;
};

export type ThemeCompletionVariant = {
  id: string;
  heading: string;
  subheading: string;
};

export type ThemeHomeCardVariant = {
  id: string;
  headline: string;
  subheadline: string;
};

export type ThemeActionVariant = {
  id: string;
  content: string;
  why: string;
};

export type ThemeReflectionVariant = {
  id: string;
  content: string;
};

export type ThemeWordVariant = {
  id: string;
  word: string;
  meaning: string;
};

export type ThemeNotificationVariant = {
  id: string;
  copy: string;
  mood_weight: { dark: number; half: number; full: number };
};

export type ThemeEveningVariant = {
  id: string;
  content: string;
};

export type ThemeFile = {
  theme: string;
  user_state: string;
  core_need: string;
  emotional_tone: string;
  ritual_variants: {
    arrival: ThemeArrivalVariant[];
    release: ThemeReleaseVariant[];
    breath: ThemeBreathVariant[];
    moment: ThemeMomentVariant[];
    completion: ThemeCompletionVariant[];
  };
  home_cards: ThemeHomeCardVariant[];
  actions: ThemeActionVariant[];
  reflections: ThemeReflectionVariant[];
  words: ThemeWordVariant[];
  notification_pool: ThemeNotificationVariant[];
  evening_reflections: ThemeEveningVariant[];
};

// ─── "What I've Noticed" Pattern Detection ────────────────────────────────────
// Analyses available user data and surfaces a single meaningful observation.
// Tone: observational · human · never motivational.
// Returns null when no meaningful pattern is found — never forces content.

type LangMap = Record<string, string>;

function pick(map: LangMap, lang: string): string {
  return map[lang] ?? map['en'] ?? '';
}

export interface PatternContext {
  heavyDayCount: number;   // # of hard/dark mood days in last 7
  moodTrend: string;       // 'improving'|'declining'|'stable'|'heavy'|'unknown'
  weeklyScore: number;     // completions this week (0–7)
  streak: number;
  totalDays: number;
  comebackCount: number;
  currentDay: number;
}

interface PatternEntry {
  id: string;
  when: (ctx: PatternContext) => boolean;
  text: (lang: string) => string;
}

// ─── Pattern library ──────────────────────────────────────────────────────────
// Each entry is a condition + a quiet observation. No prescriptions.

const PATTERNS: PatternEntry[] = [
  {
    id: 'heavy_recurring',
    when: ctx => ctx.heavyDayCount >= 3,
    text: lang => pick({
      en: "A lot of heavier days have been showing up lately.",
      pt: "Muitos dias pesados têm aparecido ultimamente.",
      es: "Han aparecido muchos días pesados últimamente.",
      fr: "Beaucoup de jours difficiles se sont présentés ces derniers temps.",
      de: "In letzter Zeit sind viele schwere Tage aufgetaucht.",
    }, lang),
  },
  {
    id: 'mood_declining',
    when: ctx => ctx.moodTrend === 'declining',
    text: lang => pick({
      en: "The last few days have felt a bit heavier than usual.",
      pt: "Os últimos dias pareceram um pouco mais pesados que o habitual.",
      es: "Los últimos días se sintieron un poco más pesados de lo habitual.",
      fr: "Ces derniers jours ont semblé un peu plus lourds que d'habitude.",
      de: "Die letzten Tage haben sich etwas schwerer angefühlt als gewöhnlich.",
    }, lang),
  },
  {
    id: 'mood_improving_after_hard',
    when: ctx => ctx.moodTrend === 'improving' && ctx.heavyDayCount >= 2,
    text: lang => pick({
      en: "Things seem to be getting a little lighter.",
      pt: "As coisas parecem estar ficando um pouco mais leves.",
      es: "Las cosas parecen estar volviéndose un poco más ligeras.",
      fr: "Les choses semblent devenir un peu plus légères.",
      de: "Die Dinge scheinen etwas leichter zu werden.",
    }, lang),
  },
  {
    id: 'consistent_week',
    when: ctx => ctx.weeklyScore >= 5 && ctx.totalDays >= 7,
    text: lang => pick({
      en: "You've been checking in more consistently this week.",
      pt: "Você tem se apresentado com mais constância esta semana.",
      es: "Has estado apareciendo más consistentemente esta semana.",
      fr: "Tu t'es présenté plus régulièrement cette semaine.",
      de: "Du bist diese Woche regelmäßiger erschienen.",
    }, lang),
  },
  {
    id: 'quiet_week_vs_history',
    when: ctx => ctx.weeklyScore <= 2 && ctx.totalDays >= 14,
    text: lang => pick({
      en: "This week has been quieter than your usual pace.",
      pt: "Esta semana foi mais quieta que o seu ritmo habitual.",
      es: "Esta semana ha sido más tranquila de lo que es tu ritmo habitual.",
      fr: "Cette semaine a été plus calme que ton rythme habituel.",
      de: "Diese Woche war ruhiger als dein übliches Tempo.",
    }, lang),
  },
  {
    id: 'comeback_pattern',
    when: ctx => ctx.comebackCount >= 2 && ctx.streak >= 3,
    text: lang => pick({
      en: "You keep coming back, even after the harder days.",
      pt: "Você continua voltando, mesmo depois dos dias mais difíceis.",
      es: "Sigues volviendo, incluso después de los días más difíciles.",
      fr: "Tu continues à revenir, même après les jours plus difficiles.",
      de: "Du kehrst immer wieder zurück, auch nach den schwereren Tagen.",
    }, lang),
  },
  {
    id: 'heavy_but_present',
    when: ctx => ctx.heavyDayCount >= 2 && ctx.weeklyScore >= 4,
    text: lang => pick({
      en: "Even on the harder days, you still made space for this.",
      pt: "Mesmo nos dias mais difíceis, você ainda criou espaço para isso.",
      es: "Incluso en los días más difíciles, seguiste haciendo espacio para esto.",
      fr: "Même pendant les jours les plus difficiles, tu as quand même fait de la place pour ça.",
      de: "Auch an den schwereren Tagen hast du noch Raum für das hier geschaffen.",
    }, lang),
  },
];

/**
 * Returns a single meaningful observation, or null if no pattern is worth surfacing.
 * Uses seed for consistent daily rotation (same day = same observation).
 *
 * Visibility gate: shows on days where `currentDay % 3 !== 2` — roughly 2 out of 3
 * days, creating a natural "not every single day" rhythm.
 */
export function getNoticedPattern(ctx: PatternContext, lang: string): string | null {
  // Visibility gate — prevents card from feeling like a permanent fixture
  if (ctx.currentDay % 3 === 2) return null;

  const matching = PATTERNS.filter(p => p.when(ctx));
  if (matching.length === 0) return null;

  // Rotate through matching observations using currentDay as seed
  const entry = matching[Math.abs(ctx.currentDay) % matching.length];
  return entry?.text(lang) ?? null;
}

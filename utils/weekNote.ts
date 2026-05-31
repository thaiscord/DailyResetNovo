// ─── "A Note From Your Week" Copy Engine ─────────────────────────────────────
// Transforms WeekInsights data into a short, human, observational note.
// Tone: calm · quiet · never motivational · never clinical.
// Only surfaces when there are at least 2 meaningful observations.

import { WeekInsights } from './weeklyInsights';

export interface WeekNote {
  lines: string[];
}

type LangMap = Record<string, string>;

function pick(map: LangMap, lang: string): string {
  return map[lang] ?? map['en'] ?? '';
}

// ─── Line 1: what the week "felt like" ────────────────────────────────────────

function observeState(state: string | null, lang: string): string | null {
  if (!state) return null;
  const map: Record<string, LangMap> = {
    overwhelmed: {
      en: 'A lot was being held this week.',
      pt: 'Muita coisa estava sendo carregada esta semana.',
      es: 'Esta semana se cargó bastante.',
      fr: 'Beaucoup était porté cette semaine.',
      de: 'Diese Woche wurde viel getragen.',
    },
    drained: {
      en: 'Low energy ran through most of the week.',
      pt: 'A energia esteve baixa durante grande parte da semana.',
      es: 'La energía estuvo baja gran parte de la semana.',
      fr: "L'énergie était basse pendant la majeure partie de la semaine.",
      de: 'Die Energie war die meiste Woche über niedrig.',
    },
    tired: {
      en: 'Tiredness was with you for much of this week.',
      pt: 'O cansaço esteve presente em boa parte da semana.',
      es: 'El cansancio estuvo presente gran parte de la semana.',
      fr: 'La fatigue était là pendant une bonne partie de la semaine.',
      de: 'Müdigkeit begleitete dich einen Großteil der Woche.',
    },
    racing: {
      en: 'The week had a restless, full quality.',
      pt: 'A semana teve uma qualidade agitada e cheia.',
      es: 'La semana tuvo una cualidad agitada y llena.',
      fr: 'La semaine avait une qualité agitée et chargée.',
      de: 'Die Woche hatte eine unruhige, volle Qualität.',
    },
    unclear: {
      en: 'Clarity was hard to hold onto this week.',
      pt: 'A clareza foi difícil de manter esta semana.',
      es: 'La claridad fue difícil de mantener esta semana.',
      fr: 'La clarté était difficile à maintenir cette semaine.',
      de: 'Klarheit war diese Woche schwer festzuhalten.',
    },
  };
  const m = map[state];
  return m ? pick(m, lang) : null;
}

function observeMood(mood: 'hard' | 'okay' | 'good' | null, lang: string): string | null {
  if (mood === 'hard') return pick({
    en: 'Most moments this week felt difficult.',
    pt: 'A maioria dos momentos esta semana pareceu difícil.',
    es: 'La mayoría de los momentos de esta semana se sintieron difíciles.',
    fr: 'La plupart des moments cette semaine ont semblé difficiles.',
    de: 'Die meisten Momente dieser Woche fühlten sich schwer an.',
  }, lang);
  if (mood === 'good') return pick({
    en: 'The week felt relatively lighter than usual.',
    pt: 'A semana pareceu relativamente mais leve que o habitual.',
    es: 'La semana se sintió relativamente más ligera de lo habitual.',
    fr: 'La semaine a semblé relativement plus légère que d'habitude.',
    de: 'Die Woche fühlte sich verhältnismäßig leichter an als gewöhnlich.',
  }, lang);
  return null;
}

// ─── Line 2: what they were reaching for, or how the week shifted ─────────────

function observeCategory(cat: string | null, lang: string): string | null {
  if (!cat) return null;
  const map: Record<string, LangMap> = {
    Calm: {
      en: 'You were searching for calm more than anything.',
      pt: 'Você estava buscando calma mais do que qualquer outra coisa.',
      es: 'Buscabas calma más que nada.',
      fr: 'Tu cherchais la calme plus que tout.',
      de: 'Du hast mehr als alles andere nach Ruhe gesucht.',
    },
    Focus: {
      en: 'You kept reaching for focus.',
      pt: 'Você continuou buscando foco.',
      es: 'Seguías buscando enfoque.',
      fr: 'Tu continuais à chercher la concentration.',
      de: 'Du hast immer wieder nach Fokus gesucht.',
    },
    Rest: {
      en: 'You were looking for recovery, not speed.',
      pt: 'Você estava buscando recuperação, não velocidade.',
      es: 'Buscabas recuperarte, no velocidad.',
      fr: 'Tu cherchais à récupérer, pas à aller plus vite.',
      de: 'Du hast nach Erholung gesucht, nicht nach Tempo.',
    },
    Rhythm: {
      en: 'Steadiness was what you were reaching for.',
      pt: 'Estabilidade era o que você estava buscando.',
      es: 'La estabilidad era lo que buscabas.',
      fr: 'La stabilité était ce que tu cherchais.',
      de: 'Beständigkeit war das, wonach du gesucht hast.',
    },
    Courage: {
      en: 'Courage kept appearing in what you chose.',
      pt: 'Coragem continuou aparecendo nas suas escolhas.',
      es: 'El coraje seguía apareciendo en lo que elegiste.',
      fr: 'Le courage continuait à apparaître dans tes choix.',
      de: 'Mut zeigte sich immer wieder in dem, was du gewählt hast.',
    },
    Clarity: {
      en: 'You were reaching for clarity.',
      pt: 'Você estava buscando clareza.',
      es: 'Buscabas claridad.',
      fr: 'Tu cherchais la clarté.',
      de: 'Du hast nach Klarheit gesucht.',
    },
    Momentum: {
      en: 'Moving forward was on your mind.',
      pt: 'Avançar estava na sua mente.',
      es: 'Avanzar estaba en tu mente.',
      fr: "Avancer était dans ton esprit.",
      de: 'Vorwärtskommen war in deinem Kopf.',
    },
    Discipline: {
      en: 'Structure was what you were holding onto.',
      pt: 'Estrutura era o que você estava segurando.',
      es: 'La estructura era a lo que te aferrabas.',
      fr: 'La structure était ce à quoi tu te tenais.',
      de: 'Struktur war das, woran du festgehalten hast.',
    },
  };
  const m = map[cat];
  return m ? pick(m, lang) : null;
}

function observeTrend(dir: 'improved' | 'declined' | 'steady' | null, lang: string): string | null {
  if (dir === 'improved') return pick({
    en: 'Things seemed to ease a little as the week went on.',
    pt: 'As coisas pareceram aliviar um pouco com o passar da semana.',
    es: 'Las cosas parecieron aliviarse un poco a medida que avanzaba la semana.',
    fr: "Les choses semblaient s'alléger un peu au fil de la semaine.",
    de: 'Die Dinge schienen sich im Laufe der Woche etwas zu erleichtern.',
  }, lang);
  if (dir === 'declined') return pick({
    en: 'Things got a bit heavier as the week moved on.',
    pt: 'As coisas ficaram um pouco mais pesadas com o passar da semana.',
    es: 'Las cosas se pusieron un poco más pesadas a medida que avanzaba la semana.',
    fr: "Les choses se sont alourdies au fil de la semaine.",
    de: 'Die Dinge wurden im Laufe der Woche etwas schwerer.',
  }, lang);
  return null;
}

// ─── Line 3: presence / frequency note ────────────────────────────────────────

function observeFrequency(resets: number, hasOpeningLine: boolean, lang: string): string | null {
  if (resets >= 6) return pick({
    en: 'Even so, you made space for yourself almost every day.',
    pt: 'Mesmo assim, você criou espaço para si mesma quase todos os dias.',
    es: 'Aun así, te diste espacio casi todos los días.',
    fr: "Tu t'es quand même accordé un espace presque chaque jour.",
    de: 'Du hast dir trotzdem fast jeden Tag Raum gegeben.',
  }, lang);

  if (resets <= 2) return pick({
    en: 'This was a quieter week in terms of check-ins.',
    pt: 'Esta foi uma semana mais quieta em termos de presença.',
    es: 'Esta fue una semana más tranquila en términos de presencia.',
    fr: "C'était une semaine plus calme en termes de présence.",
    de: 'Dies war eine ruhigere Woche in Bezug auf das Erscheinen.',
  }, lang);

  if (resets >= 4 && hasOpeningLine) return pick({
    en: 'Even so, you still came back most days.',
    pt: 'Mesmo assim, você voltou na maioria dos dias.',
    es: 'Aun así, volviste la mayoría de los días.',
    fr: "Tu es quand même revenu la plupart des jours.",
    de: 'Trotzdem bist du an den meisten Tagen zurückgekommen.',
  }, lang);

  return null;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generates a 2-3 line observational note about the week.
 * Returns null when there isn't enough data to say something meaningful.
 */
export function generateWeekNote(insights: WeekInsights, lang: string): WeekNote | null {
  const lines: string[] = [];

  // Line 1: What the week felt like (state > mood)
  const stateLine = observeState(insights.dominantState, lang);
  const moodLine  = observeMood(insights.dominantMood, lang);
  if (stateLine) lines.push(stateLine);
  else if (moodLine) lines.push(moodLine);

  // Line 2: What they were reaching for, or how the week shifted
  const catLine   = observeCategory(insights.topCategories[0] ?? null, lang);
  const trendLine = observeTrend(insights.trendDirection, lang);
  if (catLine) lines.push(catLine);
  else if (trendLine) lines.push(trendLine);

  // Line 3: Frequency note — only adds when it contextualizes lines above
  const hasOpening = lines.length > 0;
  const freqLine = observeFrequency(insights.resetsCompleted, hasOpening, lang);
  if (freqLine && lines.length < 3) lines.push(freqLine);

  // Need at least 2 lines to be worth showing
  if (lines.length < 2) return null;

  return { lines };
}

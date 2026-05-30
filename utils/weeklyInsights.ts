// ─── Weekly Insights Engine ───────────────────────────────────────────────────
// Analyses a Mon-Sun calendar week and generates emotionally intelligent copy.
// All functions are pure — no side effects, no storage access.

import { DailyEntry } from './dailyEntries';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RhythmPattern =
  | 'steady'      // completions distributed across the week
  | 'frontLoaded' // mostly Mon–Wed
  | 'backLoaded'  // mostly Fri–Sun
  | 'middle'      // mostly Tue–Thu
  | 'sparse';     // 0–2 completions

export interface WeekDayData {
  dayIndex: number;       // 0=Mon … 6=Sun
  dateKey: string;        // 'YYYY-MM-DD'
  entry: DailyEntry | null;
  completed: boolean;
  dailyState: string | null; // 'racing'|'tired'|'overwhelmed'|'unclear'|'drained'
}

export interface WeekInsights {
  days: WeekDayData[];
  resetsCompleted: number;
  skippedCount: number;
  rhythmPattern: RhythmPattern;
  completedDayIndices: number[];
  // Mood (from post-reset badge selection)
  moodCounts: { hard: number; okay: number; good: number };
  dominantMood: 'hard' | 'okay' | 'good' | null;
  secondaryMoods: Array<'hard' | 'okay' | 'good'>;
  moodTotal: number;
  // Daily emotional state (from pre-reset check-in — real user data)
  stateCounts: Record<string, number>;
  dominantState: string | null;
  secondaryStates: string[];
  stateTotal: number;
  topCategories: string[];
  categoryCounts: Record<string, number>;
  uniqueWords: string[];
  mostFrequentWord: string | null;
  highlight: {
    dayIndex: number;
    dateKey: string;
    entry: DailyEntry;
    text: string;
    type: 'reflection' | 'action';
  } | null;
  trendStartMood: 'hard' | 'okay' | 'good' | null;
  trendEndMood:   'hard' | 'okay' | 'good' | null;
  trendDirection: 'improved' | 'declined' | 'steady' | null;
}

// ─── Analysis ─────────────────────────────────────────────────────────────────

function dominantMoodOf(c: { hard: number; okay: number; good: number }): 'hard' | 'okay' | 'good' | null {
  if (c.hard + c.okay + c.good === 0) return null;
  if (c.good > c.okay && c.good > c.hard) return 'good';
  if (c.okay >= c.hard) return 'okay';
  return 'hard';
}

function rhythmPatternOf(indices: number[], total: number): RhythmPattern {
  if (total <= 2) return 'sparse';
  const front = indices.filter(i => i <= 2).length;
  const back  = indices.filter(i => i >= 4).length;
  const mid   = indices.filter(i => i >= 1 && i <= 4).length;
  if (front >= total * 0.65) return 'frontLoaded';
  if (back  >= total * 0.65) return 'backLoaded';
  if (mid   >= total * 0.65 && front < total * 0.45 && back < total * 0.45) return 'middle';
  return 'steady';
}

/**
 * Build a complete insight snapshot for one Mon-Sun week.
 * dailyStates — optional per-day emotional check-in array (index 0=Mon).
 * Loaded from 'daily_state_v1_YYYY-MM-DD' keys via getDailyStatesForWeek().
 */
export function buildWeekInsights(
  allDays: (DailyEntry | null)[],
  monday: Date,
  dailyStates: (string | null)[] = [],
): WeekInsights {
  const days: WeekDayData[] = allDays.map((entry, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return {
      dayIndex: i, dateKey, entry,
      completed: entry?.completed ?? false,
      dailyState: dailyStates[i] ?? null,
    };
  });

  const completedDayIndices = days.filter(d => d.completed).map(d => d.dayIndex);
  const resetsCompleted = completedDayIndices.length;

  // Mood (post-reset badge)
  const moodCounts = { hard: 0, okay: 0, good: 0 };
  days.forEach(d => { if (d.entry?.mood) moodCounts[d.entry.mood]++; });
  const moodTotal    = moodCounts.hard + moodCounts.okay + moodCounts.good;
  const dominantMood = dominantMoodOf(moodCounts);
  const secondaryMoods = (['hard', 'okay', 'good'] as const)
    .filter(m => m !== dominantMood && moodCounts[m] > 0)
    .sort((a, b) => moodCounts[b] - moodCounts[a]);

  // Daily emotional state (pre-reset check-in — real user selections)
  const stateCounts: Record<string, number> = {};
  days.forEach(d => {
    if (d.dailyState) stateCounts[d.dailyState] = (stateCounts[d.dailyState] ?? 0) + 1;
  });
  const sortedStates  = Object.entries(stateCounts).sort((a, b) => b[1] - a[1]);
  const dominantState = sortedStates[0]?.[0] ?? null;
  const secondaryStates = sortedStates.slice(1).map(([s]) => s);
  const stateTotal    = sortedStates.reduce((acc, [, n]) => acc + n, 0);

  // Categories
  const categoryCounts: Record<string, number> = {};
  days.forEach(d => {
    if (d.entry?.category) categoryCounts[d.entry.category] = (categoryCounts[d.entry.category] ?? 0) + 1;
  });
  const topCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);

  // Words (word_of_day when saved; no fallback — empty = section not shown)
  const wordCounts: Record<string, number> = {};
  days.forEach(d => {
    if (d.entry?.word_of_day) wordCounts[d.entry.word_of_day] = (wordCounts[d.entry.word_of_day] ?? 0) + 1;
  });
  const sortedWords      = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
  const uniqueWords      = sortedWords.map(([w]) => w);
  const mostFrequentWord = sortedWords.length > 0 && sortedWords[0][1] > 1 ? sortedWords[0][0] : null;

  // Highlight — best piece of user writing
  const candidates: NonNullable<WeekInsights['highlight']>[] = [];
  days.forEach(d => {
    if (!d.entry) return;
    const ref = d.entry.reflection_response?.trim() ?? '';
    const act = d.entry.action_response?.trim() ?? '';
    if (ref.length > 15) candidates.push({ dayIndex: d.dayIndex, dateKey: d.dateKey, entry: d.entry, text: ref, type: 'reflection' });
    else if (act.length > 15) candidates.push({ dayIndex: d.dayIndex, dateKey: d.dateKey, entry: d.entry, text: act, type: 'action' });
  });
  candidates.sort((a, b) => {
    if (a.type === 'reflection' && b.type !== 'reflection') return -1;
    if (a.type !== 'reflection' && b.type === 'reflection') return 1;
    return b.text.length - a.text.length;
  });
  const highlight = candidates[0] ?? null;

  // Trend — first half (Mon–Thu) vs second half (Thu–Sun)
  function halfDominant(half: WeekDayData[]) {
    const c = { hard: 0, okay: 0, good: 0 };
    half.forEach(d => { if (d.entry?.mood) c[d.entry.mood]++; });
    return dominantMoodOf(c);
  }
  const trendStartMood = halfDominant(days.slice(0, 4));
  const trendEndMood   = halfDominant(days.slice(3, 7));
  const score = { good: 2, okay: 1, hard: 0 } as const;
  let trendDirection: WeekInsights['trendDirection'] = null;
  if (trendStartMood && trendEndMood) {
    const diff = score[trendEndMood] - score[trendStartMood];
    trendDirection = diff > 0 ? 'improved' : diff < 0 ? 'declined' : 'steady';
  }

  return {
    days,
    resetsCompleted,
    skippedCount: 7 - resetsCompleted,
    rhythmPattern: rhythmPatternOf(completedDayIndices, resetsCompleted),
    completedDayIndices,
    moodCounts,
    dominantMood,
    secondaryMoods,
    moodTotal,
    stateCounts,
    dominantState,
    secondaryStates,
    stateTotal,
    topCategories,
    categoryCounts,
    uniqueWords,
    mostFrequentWord,
    highlight,
    trendStartMood,
    trendEndMood,
    trendDirection,
  };
}

// ─── Label Helpers ────────────────────────────────────────────────────────────

const DAY_NAMES: Record<string, string[]> = {
  en: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  pt: ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
  es: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],
  fr: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
  de: ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'],
};

export function getDayName(index: number, lang: string): string {
  const arr = DAY_NAMES[lang] ?? DAY_NAMES.en;
  return arr[index] ?? arr[0];
}

const MOOD_LABELS: Record<'hard' | 'okay' | 'good', Record<string, string>> = {
  hard: { en: 'Difficult',   pt: 'Difícil',        es: 'Difícil',        fr: 'Difficile',       de: 'Schwer'        },
  okay: { en: 'Steady',      pt: 'Estável',        es: 'Estable',        fr: 'Stable',          de: 'Ruhig'         },
  good: { en: 'Lighter',     pt: 'Mais leve',      es: 'Más ligero',     fr: 'Plus léger',      de: 'Leichter'      },
};
export function getMoodLabel(mood: 'hard' | 'okay' | 'good', lang: string): string {
  return MOOD_LABELS[mood][lang] ?? MOOD_LABELS[mood].en;
}

// Daily emotional state labels — matches DAILY_STATE_OPTIONS in dailyState.ts
const STATE_LABELS: Record<string, Record<string, string>> = {
  racing:      { en: 'Racing Mind',  pt: 'Mente acelerada',  es: 'La mente no para',      fr: 'Pensées rapides',  de: 'Gedankenkarussell' },
  tired:       { en: 'Tired',        pt: 'Com cansaço',      es: 'Agotado',               fr: 'Fatigue',          de: 'Müde'              },
  overwhelmed: { en: 'Overwhelmed',  pt: 'Sobrecarregado',   es: 'Todo se siente mucho',  fr: 'Trop plein',       de: 'Überwältigt'       },
  unclear:     { en: 'Unfocused',    pt: 'Sem clareza',      es: 'Sin claridad',          fr: 'Flou',             de: 'Unklar'            },
  drained:     { en: 'Low Energy',   pt: 'Sem energia',      es: 'Sin energía',           fr: 'Peu d\'énergie',   de: 'Wenig Energie'     },
};
// Color for each state dot
export const STATE_DOT_COLOR: Record<string, string> = {
  racing:      '#C9806A',
  tired:       '#9B9B9B',
  overwhelmed: '#B87560',
  unclear:     '#7A8FA8',
  drained:     '#A89060',
};
export function getStateLabel(state: string, lang: string): string {
  const entry = STATE_LABELS[state];
  return entry ? (entry[lang] ?? entry.en) : state;
}

const CAT_LABELS: Record<string, Record<string, string>> = {
  Calm:     { en: 'Calm',     pt: 'Calma',     es: 'Calma',      fr: 'Calme',     de: 'Ruhe'       },
  Clarity:  { en: 'Clarity',  pt: 'Clareza',   es: 'Claridad',   fr: 'Clarté',    de: 'Klarheit'   },
  Rest:     { en: 'Rest',     pt: 'Descanso',  es: 'Descanso',   fr: 'Repos',     de: 'Erholung'   },
  Focus:    { en: 'Focus',    pt: 'Foco',      es: 'Enfoque',    fr: 'Focus',     de: 'Fokus'      },
  Momentum: { en: 'Momentum', pt: 'Impulso',   es: 'Impulso',    fr: 'Élan',      de: 'Schwung'    },
  Courage:  { en: 'Courage',  pt: 'Coragem',   es: 'Coraje',     fr: 'Courage',   de: 'Mut'        },
  Rhythm:   { en: 'Rhythm',   pt: 'Ritmo',     es: 'Ritmo',      fr: 'Rythme',    de: 'Rhythmus'   },
};
export function getCategoryLabel(category: string, lang: string): string {
  const entry = CAT_LABELS[category];
  return entry ? (entry[lang] ?? entry.en ?? category) : category;
}

// ─── Section 4 — How You Arrived: personalized note ──────────────────────────
// One sentence derived from dominant state, secondary states, and week pattern.

const HOW_ARRIVED_STATE_NOTES: Record<string, L5> = {
  drained: {
    en: ['Low energy appeared more than anything else this week.', 'Your check-ins were often marked by low energy.', 'You came back even on the heavier days.'],
    pt: ['Pouca energia apareceu mais do que qualquer outra coisa esta semana.', 'Seus check-ins foram frequentemente marcados por pouca energia.', 'Você voltou mesmo nos dias mais pesados.'],
    es: ['Poca energía apareció más que cualquier otra cosa esta semana.', 'Tus check-ins fueron frecuentemente marcados por poca energía.', 'Volviste incluso en los días más pesados.'],
    fr: ["Peu d'énergie est apparu plus que n'importe quoi d'autre cette semaine.", "Tes retours étaient souvent marqués par peu d'énergie.", 'Tu es revenu même les jours plus lourds.'],
    de: ['Wenig Energie kam diese Woche mehr als alles andere vor.', 'Deine Rückkehren waren oft von wenig Energie geprägt.', 'Du bist auch an den schwereren Tagen zurückgekehrt.'],
  },
  tired: {
    en: ['Tiredness was the main thread this week.', 'Your check-ins moved through tiredness more than anything else.', 'You came back even on the heavier days.'],
    pt: ['O cansaço foi o fio principal desta semana.', 'Seus check-ins passaram pelo cansaço mais do que qualquer outra coisa.', 'Você voltou mesmo nos dias mais pesados.'],
    es: ['El cansancio fue el hilo principal esta semana.', 'Tus check-ins pasaron por el cansancio más que cualquier otra cosa.', 'Volviste incluso en los días más pesados.'],
    fr: ["La fatigue était le fil principal cette semaine.", "Tes retours ont traversé la fatigue plus que n'importe quoi d'autre.", 'Tu es revenu même les jours plus lourds.'],
    de: ['Müdigkeit war diese Woche der Hauptfaden.', 'Deine Rückkehren bewegten sich durch Müdigkeit mehr als durch alles andere.', 'Du bist auch an den schwereren Tagen zurückgekehrt.'],
  },
  racing: {
    en: ['Racing thoughts showed up early this week.', 'Your mind was busy more often than quiet this week.', 'Racing thoughts appeared and softened across the week.'],
    pt: ['Pensamentos acelerados apareceram cedo esta semana.', 'Sua mente esteve mais agitada do que quieta esta semana.', 'Pensamentos acelerados apareceram e foram se suavizando ao longo da semana.'],
    es: ['Pensamientos acelerados aparecieron pronto esta semana.', 'Tu mente estuvo más agitada que tranquila esta semana.', 'Pensamientos acelerados aparecieron y se fueron suavizando a lo largo de la semana.'],
    fr: ["Les pensées rapides sont apparues tôt cette semaine.", "Ton esprit était plus agité que calme cette semaine.", 'Les pensées rapides sont apparues et se sont adoucies au fil de la semaine.'],
    de: ['Gedankenkarussell erschien früh diese Woche.', 'Dein Geist war diese Woche öfter beschäftigt als ruhig.', 'Gedankenkarussell erschien und milderte sich im Laufe der Woche.'],
  },
  overwhelmed: {
    en: ['Overwhelm appeared more than once this week.', 'The week carried a sense of too much, more than once.', 'Your mind asked for less noise this week.'],
    pt: ['Sobrecarga apareceu mais de uma vez esta semana.', 'A semana carregou uma sensação de excesso, mais de uma vez.', 'Sua mente pediu menos barulho esta semana.'],
    es: ['El agobio apareció más de una vez esta semana.', 'La semana tuvo una sensación de demasiado, más de una vez.', 'Tu mente pidió menos ruido esta semana.'],
    fr: ["Le trop-plein est apparu plus d'une fois cette semaine.", "La semaine a porté un sentiment de trop, plus d'une fois.", 'Ton esprit a demandé moins de bruit cette semaine.'],
    de: ['Überwältigung erschien diese Woche mehr als einmal.', 'Die Woche trug mehr als einmal ein Gefühl von zu viel.', 'Dein Geist bat diese Woche um weniger Lärm.'],
  },
  unclear: {
    en: ["There wasn't one dominant feeling. The week shifted around.", 'Unfocused days appeared more often than clear ones.', 'The week moved without a clear thread to follow.'],
    pt: ['Não houve um sentimento dominante. A semana foi variada.', 'Dias sem foco apareceram com mais frequência do que dias claros.', 'A semana se moveu sem um fio claro a seguir.'],
    es: ['No hubo un sentimiento dominante. La semana fue variada.', 'Días sin enfoque aparecieron más a menudo que días claros.', 'La semana se movió sin un hilo claro a seguir.'],
    fr: ["Il n'y avait pas un sentiment dominant. La semaine a varié.", "Des jours sans clarté sont apparus plus souvent que des jours clairs.", "La semaine s'est déroulée sans un fil clair à suivre."],
    de: ['Es gab kein dominierendes Gefühl. Die Woche wechselte sich ab.', 'Unklare Tage erschienen häufiger als klare Tage.', 'Die Woche verlief ohne einen klaren Faden zu verfolgen.'],
  },
};

const HOW_ARRIVED_PATTERN_NOTES: Record<string, L5> = {
  mixed: {
    en: ["There wasn't one dominant feeling. The week shifted around."],
    pt: ['Não houve um sentimento dominante. A semana foi variada.'],
    es: ['No hubo un sentimiento dominante. La semana fue variada.'],
    fr: ["Il n'y avait pas un sentiment dominant. La semaine a varié."],
    de: ['Es gab kein dominierendes Gefühl. Die Woche wechselte sich ab.'],
  },
  moved_between: {
    en: ['Your check-ins moved between pressure and tiredness.'],
    pt: ['Seus check-ins alternaram entre pressão e cansaço.'],
    es: ['Tus check-ins se movieron entre presión y cansancio.'],
    fr: ['Tes retours ont oscillé entre pression et fatigue.'],
    de: ['Deine Rückkehren bewegten sich zwischen Druck und Müdigkeit.'],
  },
  came_back_heavy: {
    en: ['You came back even on the heavier days.'],
    pt: ['Você voltou mesmo nos dias mais pesados.'],
    es: ['Volviste incluso en los días más pesados.'],
    fr: ['Tu es revenu même les jours plus lourds.'],
    de: ['Du bist auch an den schwereren Tagen zurückgekehrt.'],
  },
};

export function getHowYouArrivedNote(insights: WeekInsights, lang: string, weekNumber: number = 1): string {
  const { dominantState, secondaryStates, stateCounts, stateTotal, dominantMood, moodCounts, resetsCompleted } = insights;
  const l = (lang as keyof L5);

  if (stateTotal === 0) {
    // Mood-only fallback
    if (dominantMood === 'hard' && moodCounts.hard >= 2 && resetsCompleted >= 2) {
      const note = HOW_ARRIVED_PATTERN_NOTES.came_back_heavy;
      return (note[l] ?? note.en)[0];
    }
    return '';
  }

  // Two states close in count → mixed or moved_between
  if (dominantState && secondaryStates.length > 0) {
    const topCount  = stateCounts[dominantState] ?? 0;
    const secCount  = stateCounts[secondaryStates[0]] ?? 0;
    const isPressurePair =
      (dominantState === 'racing'      && (secondaryStates[0] === 'tired' || secondaryStates[0] === 'overwhelmed')) ||
      (dominantState === 'tired'       && secondaryStates[0] === 'racing') ||
      (dominantState === 'overwhelmed' && secondaryStates[0] === 'tired');
    if (isPressurePair && secCount >= topCount - 1) {
      const note = HOW_ARRIVED_PATTERN_NOTES.moved_between;
      return (note[l] ?? note.en)[0];
    }
    if (secCount >= topCount - 1 && topCount <= 2) {
      const note = HOW_ARRIVED_PATTERN_NOTES.mixed;
      return (note[l] ?? note.en)[0];
    }
  }

  // Dominant state pool — cycle by weekNumber
  if (dominantState && HOW_ARRIVED_STATE_NOTES[dominantState]) {
    const pool = HOW_ARRIVED_STATE_NOTES[dominantState];
    const sentences = pool[l] ?? pool.en;
    return sentences[(weekNumber - 1) % sentences.length];
  }

  if (dominantMood === 'hard' && resetsCompleted >= 2) {
    const note = HOW_ARRIVED_PATTERN_NOTES.came_back_heavy;
    return (note[l] ?? note.en)[0];
  }
  return '';
}

// ─── Section 4 — What Your Mind Was Asking For: context note ─────────────────

const CAT_CONTEXT_NOTE: Record<string, L5> = {
  Rest:     { en: ['Rest appeared more than anything else.'],     pt: ['Descanso apareceu mais do que qualquer outra coisa.'],  es: ['Descanso apareció más que cualquier otra cosa.'],     fr: ["Le repos est apparu plus que n'importe quoi d'autre."],    de: ['Erholung erschien mehr als alles andere.']              },
  Clarity:  { en: ['Clarity kept returning.'],                    pt: ['Clareza continuou voltando.'],                         es: ['Claridad siguió volviendo.'],                         fr: ["La clarté n'arrêtait pas de revenir."],                    de: ['Klarheit kehrte immer wieder zurück.']                  },
  Calm:     { en: ['Calm was what came up most.'],                pt: ['Calma foi o que mais apareceu.'],                      es: ['Calma fue lo que más apareció.'],                     fr: ['Le calme était ce qui revenait le plus.'],                 de: ['Ruhe war das, was am häufigsten auftauchte.']            },
  Focus:    { en: ['Focus was what you reached for most.'],       pt: ['Foco foi o que você mais buscou.'],                    es: ['Foco fue lo que más buscaste.'],                      fr: ['Le focus était ce que tu cherchais le plus.'],            de: ['Fokus war das, wonach du am meisten gesucht hast.']      },
  Momentum: { en: ['You kept returning to movement.'],            pt: ['Você continuou voltando para o movimento.'],            es: ['Seguiste volviendo al movimiento.'],                  fr: ['Tu continuais de revenir vers le mouvement.'],            de: ['Du kehrtest immer wieder zur Bewegung zurück.']          },
  Courage:  { en: ['Courage was the path you chose most.'],       pt: ['Coragem foi o caminho que você mais escolheu.'],        es: ['Coraje fue el camino que más elegiste.'],             fr: ['Le courage était le chemin que tu choisissais le plus.'], de: ['Mut war der Weg, den du am häufigsten wähltest.']        },
  Rhythm:   { en: ['You came back to rhythm more than once.'],    pt: ['Você voltou ao ritmo mais de uma vez.'],               es: ['Volviste al ritmo más de una vez.'],                  fr: ["Tu es revenu au rythme plus d'une fois."],                de: ['Du bist mehr als einmal zum Rhythmus zurückgekehrt.']    },
};

export function getCategoryContextNote(insights: WeekInsights, lang: string): string {
  const { topCategories, categoryCounts } = insights;
  if (topCategories.length === 0) return '';
  const dominant = topCategories[0];
  if ((categoryCounts[dominant] ?? 0) < 2) return '';
  const note = CAT_CONTEXT_NOTE[dominant];
  if (!note) return '';
  const l = (lang as keyof L5);
  return (note[l] ?? note.en)[0];
}

// ─── Section 1 — Week Overview copy ──────────────────────────────────────────
// Intro: 3 variations per count — picked by weekNumber so it reads differently
// each week even when behaviour is similar.
// Narrative: per-count, imperfect-week-safe.

type L5 = { en: string[]; pt: string[]; es: string[]; fr: string[]; de: string[] };

const OVERVIEW_INTRO_POOLS: Record<string, L5> = {
  n0: {
    en: ['The week passed quietly.', 'A still week.', 'This week was mostly quiet.'],
    pt: ['A semana passou em silêncio.', 'Uma semana quieta.', 'Esta semana foi em sua maioria silenciosa.'],
    es: ['La semana pasó en silencio.', 'Una semana quieta.', 'Esta semana fue en su mayoría tranquila.'],
    fr: ['La semaine est passée en silence.', 'Une semaine tranquille.', 'Cette semaine a été surtout calme.'],
    de: ['Die Woche verging still.', 'Eine ruhige Woche.', 'Diese Woche war größtenteils still.'],
  },
  n1: {
    en: ['You returned once this week.', 'One return this week.', 'There was one quiet return.'],
    pt: ['Você voltou uma vez esta semana.', 'Um retorno esta semana.', 'Houve um retorno quieto.'],
    es: ['Regresaste una vez esta semana.', 'Un regreso esta semana.', 'Hubo un regreso tranquilo.'],
    fr: ['Tu es revenu une fois cette semaine.', 'Un retour cette semaine.', 'Il y a eu un retour calme.'],
    de: ['Du bist diese Woche einmal zurückgekehrt.', 'Eine Rückkehr diese Woche.', 'Es gab eine stille Rückkehr.'],
  },
  n2: {
    en: ['You found your way back twice this week.', 'Two returns this week.', 'You came back a couple of times.'],
    pt: ['Você voltou duas vezes esta semana.', 'Dois retornos esta semana.', 'Você voltou algumas vezes.'],
    es: ['Regresaste dos veces esta semana.', 'Dos regresos esta semana.', 'Volviste un par de veces.'],
    fr: ['Tu es revenu deux fois cette semaine.', 'Deux retours cette semana.', 'Tu es revenu quelques fois.'],
    de: ['Du bist diese Woche zweimal zurückgekehrt.', 'Zwei Rückkehren diese Woche.', 'Du bist ein paar Mal zurückgekehrt.'],
  },
  n3: {
    en: ['You came back a few times this week.', 'There were a few returns this week.', 'You found moments for yourself this week.'],
    pt: ['Você voltou algumas vezes esta semana.', 'Houve alguns retornos esta semana.', 'Você encontrou momentos para si mesmo esta semana.'],
    es: ['Regresaste algunas veces esta semana.', 'Hubo algunos regresos esta semana.', 'Encontraste momentos para ti esta semana.'],
    fr: ['Tu es revenu quelques fois cette semana.', 'Il y a eu quelques retours cette semaine.', 'Tu as trouvé des moments pour toi cette semaine.'],
    de: ['Du bist diese Woche ein paar Mal zurückgekehrt.', 'Es gab einige Rückkehren diese Woche.', 'Du hast dir diese Woche Momente geschaffen.'],
  },
  n4: {
    en: ['You came back four times this week.', 'There were four returns this week.', 'Four days had space for you this week.'],
    pt: ['Você voltou quatro vezes esta semana.', 'Houve quatro retornos esta semana.', 'Quatro dias tiveram espaço para você esta semana.'],
    es: ['Regresaste cuatro veces esta semana.', 'Hubo cuatro regresos esta semana.', 'Cuatro días tuvieron espacio para ti esta semana.'],
    fr: ['Tu es revenu quatre fois cette semaine.', 'Il y a eu quatre retours cette semaine.', 'Quatre jours ont eu de l\'espace pour toi cette semaine.'],
    de: ['Du bist diese Woche viermal zurückgekehrt.', 'Es gab vier Rückkehren diese Woche.', 'Vier Tage hatten diese Woche Platz für dich.'],
  },
  n5: {
    en: ['You found your way back most days this week.', 'Most of the week had space for you.', 'You returned through most of the week.'],
    pt: ['Você voltou a maior parte dos dias esta semana.', 'A maior parte da semana teve espaço para você.', 'Você voltou durante a maior parte da semana.'],
    es: ['Regresaste la mayoría de los días esta semana.', 'La mayor parte de la semana tuvo espacio para ti.', 'Regresaste durante la mayor parte de la semana.'],
    fr: ['Tu es revenu la plupart des jours cette semaine.', 'La plupart de la semaine avait de l\'espace pour toi.', 'Tu es revenu pendant la majeure partie de la semaine.'],
    de: ['Du bist die meisten Tage dieser Woche zurückgekehrt.', 'Der größte Teil der Woche hatte Platz für dich.', 'Du bist den größten Teil der Woche zurückgekehrt.'],
  },
  n6: {
    en: ['You came back almost every day this week.', 'Six days this week had space for you.', 'You were present for most of the week.'],
    pt: ['Você voltou quase todos os dias esta semana.', 'Seis dias desta semana tiveram espaço para você.', 'Você esteve presente na maior parte da semana.'],
    es: ['Regresaste casi todos los días esta semana.', 'Seis días de esta semana tuvieron espacio para ti.', 'Estuviste presente durante la mayor parte de la semana.'],
    fr: ['Tu es revenu presque chaque jour cette semaine.', 'Six jours cette semaine avaient de l\'espace pour toi.', 'Tu étais présent pour la majeure partie de la semaine.'],
    de: ['Du bist diese Woche fast jeden Tag zurückgekehrt.', 'Sechs Tage dieser Woche hatten Platz für dich.', 'Du warst für den größten Teil der Woche präsent.'],
  },
  n7: {
    en: ['You came back each day this week.', 'You kept returning, even on ordinary days.', 'There was space for you in each day this week.'],
    pt: ['Você voltou todos os dias desta semana.', 'Você continuou voltando, mesmo nos dias ordinários.', 'Houve espaço para você em cada dia desta semana.'],
    es: ['Regresaste cada día de esta semana.', 'Seguiste volviendo, incluso en los días ordinarios.', 'Hubo espacio para ti en cada día de esta semana.'],
    fr: ['Tu es revenu chaque jour cette semaine.', 'Tu as continué à revenir, même les jours ordinaires.', 'Il y avait de l\'espace pour toi chaque jour cette semaine.'],
    de: ['Du bist jeden Tag dieser Woche zurückgekehrt.', 'Du bist immer wieder zurückgekehrt, auch an gewöhnlichen Tagen.', 'Diese Woche war jeden Tag Platz für dich.'],
  },
};

const OVERVIEW_NARRATIVE: Record<string, Record<string, string>> = {
  n0: { en: '', pt: '', es: '', fr: '', de: '' },
  n1: { en: 'There were quiet days.\nBut you still returned.', pt: 'Houve dias silenciosos.\nMas você ainda voltou.', es: 'Hubo días tranquilos.\nPero todavía regresaste.', fr: 'Il y a eu des jours calmes.\nMais tu es quand même revenu.', de: 'Es gab stille Tage.\nAber du bist trotzdem zurückgekehrt.' },
  n2: { en: 'There were quiet days.\nBut you still returned.', pt: 'Houve dias silenciosos.\nMas você ainda voltou.', es: 'Hubo días tranquilos.\nPero todavía regresaste.', fr: 'Il y a eu des jours calmes.\nMais tu es quand même revenu.', de: 'Es gab stille Tage.\nAber du bist trotzdem zurückgekehrt.' },
  n3: { en: 'This week wasn\'t continuous.\nStill, you found your way back.', pt: 'Esta semana não foi contínua.\nAinda assim, você encontrou seu caminho.', es: 'Esta semana no fue continua.\nAun así, encontraste tu camino de regreso.', fr: 'Cette semaine n\'a pas été continue.\nPourtant, tu as trouvé ton chemin.', de: 'Diese Woche war nicht durchgehend.\nDennoch hast du deinen Weg zurückgefunden.' },
  n4: { en: 'Some days were left untouched.\nOthers became moments for yourself.', pt: 'Alguns dias ficaram sem toque.\nOutros se tornaram momentos para você.', es: 'Algunos días quedaron sin tocar.\nOtros se convirtieron en momentos para ti.', fr: 'Certains jours sont restés sans contact.\nD\'autres sont devenus des moments pour toi.', de: 'Einige Tage blieben unberührt.\nAndere wurden zu Momenten für dich.' },
  n5: { en: 'The rhythm wasn\'t perfect.\nIt didn\'t need to be.', pt: 'O ritmo não foi perfeito.\nNão precisava ser.', es: 'El ritmo no fue perfecto.\nNo necesitaba serlo.', fr: 'Le rythme n\'était pas parfait.\nIl n\'avait pas besoin de l\'être.', de: 'Der Rhythmus war nicht perfekt.\nEr musste es nicht sein.' },
  n6: { en: 'You stayed close to your reset.\nEven on the quieter days.', pt: 'Você ficou perto do seu reset.\nMesmo nos dias mais quietos.', es: 'Te mantuviste cerca de tu reset.\nIncluso en los días más tranquilos.', fr: 'Tu es resté proche de ton reset.\nMême pendant les jours plus calmes.', de: 'Du bliebst nah an deinem Reset.\nAuch an den stilleren Tagen.' },
  n7: { en: 'An ordinary week — and you were here for all of it.', pt: 'Uma semana ordinária — e você estava aqui para todo ela.', es: 'Una semana ordinaria — y estuviste aquí para todo.', fr: 'Une semaine ordinaire — et tu étais là pour tout.', de: 'Eine gewöhnliche Woche — und du warst für alles hier.' },
};

export function getWeekOverviewLines(insights: WeekInsights, lang: string, weekNumber: number = 1): { intro: string; narrative: string } {
  const { resetsCompleted } = insights;
  const key = `n${Math.min(resetsCompleted, 7)}`;
  const pool = OVERVIEW_INTRO_POOLS[key];
  const l    = (lang in pool ? lang : 'en') as keyof L5;
  const intros = pool[l];
  const intro  = intros[(weekNumber - 1) % intros.length];
  const narrative = OVERVIEW_NARRATIVE[key]?.[lang] ?? OVERVIEW_NARRATIVE[key]?.en ?? '';
  return { intro, narrative };
}

// ─── Section 2 — Your Rhythm copy ────────────────────────────────────────────
// 3 sentences per pattern — picked by weekNumber for variation.

const RHYTHM_COPY_POOLS: Record<RhythmPattern, L5> = {
  steady: {
    en: ['Your resets were spread across the week.', 'The week moved quietly from one day to the next.', 'Your rhythm was steady from beginning to end.'],
    pt: ['Seus resets foram distribuídos ao longo da semana.', 'A semana se moveu quietamente de um dia para o outro.', 'Seu ritmo foi constante do início ao fim.'],
    es: ['Tus resets estuvieron distribuidos a lo largo de la semana.', 'La semana se movió en silencio de un día al siguiente.', 'Tu ritmo fue constante de principio a fin.'],
    fr: ['Tes resets étaient répartis tout au long de la semaine.', "La semaine s'est écoulée calmement d'un jour à l'autre.", 'Ton rythme était stable du début à la fin.'],
    de: ['Deine Resets waren über die Woche verteilt.', 'Die Woche verlief ruhig von einem Tag zum nächsten.', 'Dein Rhythmus war gleichmäßig vom Anfang bis zum Ende.'],
  },
  frontLoaded: {
    en: ['Most of your returns happened near the beginning of the week.', 'You returned mostly at the start, then the week quieted.', 'You returned mostly at the beginning of the week.'],
    pt: ['A maioria dos seus retornos aconteceu no começo da semana.', 'Você voltou principalmente no início, depois a semana ficou quieta.', 'Você voltou principalmente no começo da semana.'],
    es: ['La mayoría de tus regresos ocurrieron al comienzo de la semana.', 'Regresaste sobre todo al principio, luego la semana se aquietó.', 'Regresaste sobre todo al comienzo de la semana.'],
    fr: ["La plupart de tes retours ont eu lieu en début de semaine.", "Tu es revenu surtout au début, puis la semaine s'est calmée.", 'Tu es revenu surtout en début de semaine.'],
    de: ['Die meisten deiner Rückkehren erfolgten zu Beginn der Woche.', 'Du bist vor allem am Anfang zurückgekehrt, dann wurde die Woche ruhiger.', 'Du bist vor allem zu Beginn der Woche zurückgekehrt.'],
  },
  backLoaded: {
    en: ['There was a pause in the middle, then you came back.', 'The week started quiet, then returned.', 'Your rhythm found its way toward the end of the week.'],
    pt: ['Houve uma pausa no meio, depois você voltou.', 'A semana começou quieta, depois retornou.', 'Seu ritmo se encontrou mais para o final da semana.'],
    es: ['Hubo una pausa en el medio, luego volviste.', 'La semana comenzó tranquila, luego retornó.', 'Tu ritmo encontró su camino hacia el final de la semana.'],
    fr: ['Il y a eu une pause au milieu, puis tu es revenu.', 'La semaine a commencé calmement, puis est revenue.', 'Ton rythme a trouvé sa place vers la fin de la semaine.'],
    de: ['Es gab eine Pause in der Mitte, dann bist du zurückgekehrt.', 'Die Woche begann ruhig, dann kehrte sie zurück.', 'Dein Rhythmus fand sich gegen Ende der Woche.'],
  },
  middle: {
    en: ['The middle of the week held the most presence.', 'Most of your check-ins landed mid-week.', 'You returned mostly in the middle of the week.'],
    pt: ['O meio da semana teve mais presença.', 'A maioria dos seus check-ins aconteceu no meio da semana.', 'Você voltou principalmente no meio da semana.'],
    es: ['El medio de la semana tuvo más presencia.', 'La mayoría de tus check-ins cayeron a mediados de semana.', 'Regresaste sobre todo en el centro de la semana.'],
    fr: ['Le milieu de la semaine a eu le plus de présence.', 'La plupart de tes retours ont eu lieu en milieu de semaine.', 'Tu es revenu surtout au milieu de la semaine.'],
    de: ['Die Mitte der Woche hatte die meiste Präsenz.', 'Die meisten deiner Rückkehren fanden in der Wochenmitte statt.', 'Du bist vor allem in der Mitte der Woche zurückgekehrt.'],
  },
  sparse: {
    en: ['Some days stayed untouched, but the rhythm returned.', 'The week was mostly quiet. You kept the thread.', 'A few quiet returns. They still counted.'],
    pt: ['Alguns dias ficaram sem toque, mas o ritmo voltou.', 'A semana foi em sua maioria silenciosa. Você manteve o fio.', 'Alguns retornos quietos. Eles ainda contaram.'],
    es: ['Algunos días quedaron intactos, pero el ritmo volvió.', 'La semana estuvo en gran parte tranquila. Mantuviste el hilo.', 'Algunos regresos tranquilos. Aún contaron.'],
    fr: ['Certains jours sont restés intacts, mais le rythme est revenu.', 'La semaine a été surtout calme. Tu as gardé le fil.', 'Quelques retours calmes. Ils ont quand même compté.'],
    de: ['Einige Tage blieben unberührt, aber der Rhythmus kehrte zurück.', 'Die Woche war größtenteils still. Du hast den Faden gehalten.', 'Ein paar stille Rückkehren. Sie zählten trotzdem.'],
  },
};

export function getRhythmCopy(pattern: RhythmPattern, lang: string, weekNumber: number = 1): string {
  const pool = RHYTHM_COPY_POOLS[pattern];
  const l = (lang in pool ? lang : 'en') as keyof L5;
  const sentences = pool[l];
  return sentences[(weekNumber - 1) % sentences.length];
}

// ─── Section 7 — What Changed copy ───────────────────────────────────────────

type TrendMood = 'hard' | 'okay' | 'good';
const TREND_BEGIN: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'The beginning felt heavier.', pt: 'O começo pareceu mais pesado.', es: 'El comienzo se sintió más pesado.', fr: 'Le début a semblé plus lourd.', de: 'Der Anfang fühlte sich schwerer an.' },
  okay: { en: 'The week started at a quiet pace.', pt: 'A semana começou num ritmo quieto.', es: 'La semana empezó a un ritmo tranquilo.', fr: 'La semaine a commencé à un rythme calme.', de: 'Die Woche begann in einem ruhigen Tempo.' },
  good: { en: 'The week started with a little more ease.', pt: 'A semana começou com um pouco mais de leveza.', es: 'La semana comenzó con un poco más de facilidad.', fr: 'La semaine a commencé avec un peu plus de légèreté.', de: 'Die Woche begann mit etwas mehr Leichtigkeit.' },
};
const TREND_END_IMPROVED: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'Things didn\'t fully ease —\nbut something shifted near the end.', pt: 'As coisas não aliviaram completamente —\nmas algo mudou perto do final.', es: 'Las cosas no aliviaron del todo —\npero algo cambió cerca del final.', fr: 'Les choses ne se sont pas complètement allégées —\nmais quelque chose a changé vers la fin.', de: 'Es erleichterte sich nicht vollständig —\naber gegen Ende änderte sich etwas.' },
  okay: { en: 'There was more steadiness near the end of the week.', pt: 'Houve mais estabilidade perto do final da semana.', es: 'Hubo más estabilidad cerca del final de la semana.', fr: 'Il y a eu plus de stabilité vers la fin de la semaine.', de: 'Gegen Ende der Woche war mehr Beständigkeit spürbar.' },
  good: { en: 'The end of the week felt a little lighter.', pt: 'O final da semana pareceu um pouco mais leve.', es: 'El final de la semana se sintió un poco más ligero.', fr: 'La fin de la semaine a semblé un peu plus légère.', de: 'Das Ende der Woche fühlte sich etwas leichter an.' },
};
const TREND_END_DECLINED: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'More weight arrived as the week went on.', pt: 'Mais peso chegou à medida que a semana avançou.', es: 'Más peso llegó a medida que avanzaba la semana.', fr: 'Plus de poids est arrivé au fil de la semaine.', de: 'Im Laufe der Woche kam mehr Gewicht dazu.' },
  okay: { en: 'A quieter pace started to emerge toward the end.', pt: 'Um ritmo mais quieto começou a surgir no final.', es: 'Un ritmo más tranquilo empezó a emerger hacia el final.', fr: 'Un rythme plus calme a commencé à émerger vers la fin.', de: 'Gegen Ende begann ein ruhigeres Tempo zu entstehen.' },
  good: { en: 'The energy quieted a little as the week went on.\nSometimes the week just ends that way.', pt: 'A energia quietou um pouco à medida que a semana avançou.\nÀs vezes a semana termina assim.', es: 'La energía se calmó un poco a medida que avanzaba la semana.\nA veces la semana termina así.', fr: 'L\'énergie s\'est calmée un peu au fil de la semaine.\nParfois la semaine se termine ainsi.', de: 'Die Energie wurde im Laufe der Woche ruhiger.\nManchmal endet die Woche einfach so.' },
};
const TREND_END_STEADY: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'The weight didn\'t lift much, but you were still moving.', pt: 'O peso não aliviou muito, mas você ainda estava em movimento.', es: 'El peso no levantó mucho, pero todavía estabas en movimiento.', fr: 'Le poids n\'a pas beaucoup levé, mais tu étais encore en mouvement.', de: 'Das Gewicht hob sich nicht viel, aber du warst noch in Bewegung.' },
  okay: { en: 'The rhythm didn\'t change much from day to day.', pt: 'O ritmo não mudou muito de dia para dia.', es: 'El ritmo no cambió mucho de día en día.', fr: 'Le rythme n\'a pas beaucoup changé d\'un jour à l\'autre.', de: 'Der Rhythmus änderte sich von Tag zu Tag nicht viel.' },
  good: { en: 'The week held a similar pace from beginning to end.', pt: 'A semana manteve um ritmo semelhante do início ao fim.', es: 'La semana mantuvo un ritmo similar de principio a fin.', fr: 'La semaine a gardé un rythme similaire du début à la fin.', de: 'Die Woche hielt ein ähnliches Tempo vom Anfang bis zum Ende.' },
};

export function getTrendCopy(insights: WeekInsights, lang: string): { beginning: string; ending: string } | null {
  const { trendStartMood, trendEndMood, trendDirection } = insights;
  if (!trendStartMood || !trendEndMood || !trendDirection) return null;
  const l = lang in TREND_BEGIN[trendStartMood] ? lang : 'en';
  const beginning = TREND_BEGIN[trendStartMood][l] ?? TREND_BEGIN[trendStartMood].en;
  const endMap = trendDirection === 'improved' ? TREND_END_IMPROVED : trendDirection === 'declined' ? TREND_END_DECLINED : TREND_END_STEADY;
  const ending = endMap[trendEndMood][l] ?? endMap[trendEndMood].en;
  return { beginning, ending };
}

// ─── Section 8 — A Quiet Observation ─────────────────────────────────────────
// 5 pools per category — 50+ unique observation templates total.
// weekNumber cycles pools so consecutive similar weeks still feel different.
// Tone rule: observational, understated, never inspirational, never coaching.

type ObsPool = L5[];

const QUIET_OBS: Record<string, ObsPool> = {
  Rest: [
    { en: ['This week asked for more rest than urgency.', 'You listened more often than you pushed.', 'That mattered.'],
      pt: ['Esta semana pediu mais descanso do que urgência.', 'Você ouviu mais do que forçou.', 'Isso importou.'],
      es: ['Esta semana pidió más descanso que urgencia.', 'Escuchaste más de lo que empujaste.', 'Eso importó.'],
      fr: ['Cette semaine a demandé plus de repos que d\'urgence.', 'Tu as écouté plus souvent que tu n\'as poussé.', 'Ça a compté.'],
      de: ['Diese Woche fragte mehr nach Erholung als nach Dringlichkeit.', 'Du hast öfter zugehört als gedrückt.', 'Das hatte Bedeutung.'] },
    { en: ['There was less movement this week.', 'More pausing.', 'Some weeks need that.'],
      pt: ['Houve menos movimento esta semana.', 'Mais pausas.', 'Algumas semanas precisam disso.'],
      es: ['Hubo menos movimiento esta semana.', 'Más pausas.', 'Algunas semanas necesitan eso.'],
      fr: ['Il y a eu moins de mouvement cette semaine.', 'Plus de pauses.', 'Certaines semaines ont besoin de ça.'],
      de: ['Es gab diese Woche weniger Bewegung.', 'Mehr Pausen.', 'Manche Wochen brauchen das.'] },
    { en: ['Not every week needs to be active.', 'This one made room for stillness.', 'That\'s its own kind of presence.'],
      pt: ['Nem toda semana precisa ser ativa.', 'Esta fez espaço para a quietude.', 'Isso é sua própria forma de presença.'],
      es: ['No toda semana necesita ser activa.', 'Esta hizo espacio para la quietud.', 'Eso es su propio tipo de presencia.'],
      fr: ['Toutes les semaines n\'ont pas besoin d\'être actives.', 'Celle-ci a fait de la place pour le calme.', 'C\'est sa propre forme de présence.'],
      de: ['Nicht jede Woche muss aktiv sein.', 'Diese machte Platz für Stille.', 'Das ist seine eigene Art von Präsenz.'] },
    { en: ['Rest isn\'t absence.', 'This week made room for it.'],
      pt: ['Descanso não é ausência.', 'Esta semana abriu espaço para ele.'],
      es: ['El descanso no es ausencia.', 'Esta semana hizo espacio para él.'],
      fr: ['Le repos n\'est pas une absence.', 'Cette semaine lui a fait de la place.'],
      de: ['Ruhe ist keine Abwesenheit.', 'Diese Woche machte Platz dafür.'] },
    { en: ['The pace stayed slower this week.', 'That seems to be what the week needed.'],
      pt: ['O ritmo ficou mais lento esta semana.', 'Parece que era o que a semana precisava.'],
      es: ['El ritmo se mantuvo más lento esta semana.', 'Parece que eso era lo que la semana necesitaba.'],
      fr: ['Le rythme est resté plus lent cette semaine.', 'C\'est ce que la semaine semblait nécessiter.'],
      de: ['Das Tempo blieb diese Woche langsamer.', 'Das scheint es zu sein, was die Woche brauchte.'] },
  ],
  Calm: [
    { en: ['The week had a stillness to it.', 'Not because everything was simple.', 'But because you kept returning to a quieter place.'],
      pt: ['A semana teve uma quietude.', 'Não porque tudo foi simples.', 'Mas porque você continuou voltando para um lugar mais quieto.'],
      es: ['La semana tuvo una quietud.', 'No porque todo fuera simple.', 'Sino porque seguiste volviendo a un lugar más tranquilo.'],
      fr: ['La semaine avait une certaine tranquillité.', 'Pas parce que tout était simple.', 'Mais parce que tu revenais sans cesse à un endroit plus calme.'],
      de: ['Die Woche hatte eine Stille.', 'Nicht weil alles einfach war.', 'Sondern weil du immer wieder zu einem ruhigeren Ort zurückgekehrt bist.'] },
    { en: ['Something stayed steady this week.', 'Quietly, without needing to be noticed.'],
      pt: ['Algo permaneceu estável esta semana.', 'Quietamente, sem precisar ser notado.'],
      es: ['Algo se mantuvo estable esta semana.', 'En silencio, sin necesitar ser notado.'],
      fr: ['Quelque chose est resté stable cette semaine.', 'Silencieusement, sans avoir besoin d\'être remarqué.'],
      de: ['Etwas blieb diese Woche beständig.', 'Still, ohne bemerkt werden zu müssen.'] },
    { en: ['There were ordinary moments this week.', 'You were calm enough to notice some of them.'],
      pt: ['Houve momentos ordinários esta semana.', 'Você estava calmo o suficiente para notar alguns deles.'],
      es: ['Hubo momentos ordinarios esta semana.', 'Estabas lo suficientemente tranquilo para notar algunos de ellos.'],
      fr: ['Il y a eu des moments ordinaires cette semaine.', 'Tu étais assez calme pour en remarquer quelques-uns.'],
      de: ['Es gab gewöhnliche Momente in dieser Woche.', 'Du warst ruhig genug, einige davon zu bemerken.'] },
    { en: ['This week didn\'t ask much from you.', 'That\'s not a small thing.'],
      pt: ['Esta semana não pediu muito de você.', 'Isso não é pouca coisa.'],
      es: ['Esta semana no te pidió mucho.', 'Eso no es poca cosa.'],
      fr: ['Cette semaine ne t\'a pas demandé grand-chose.', 'Ce n\'est pas rien.'],
      de: ['Diese Woche hat nicht viel von dir verlangt.', 'Das ist keine Kleinigkeit.'] },
    { en: ['Quiet doesn\'t mean empty.', 'This week had its own texture.'],
      pt: ['Quieto não significa vazio.', 'Esta semana teve sua própria textura.'],
      es: ['Quieto no significa vacío.', 'Esta semana tuvo su propia textura.'],
      fr: ['Calme ne veut pas dire vide.', 'Cette semaine avait sa propre texture.'],
      de: ['Still bedeutet nicht leer.', 'Diese Woche hatte ihre eigene Textur.'] },
  ],
  Clarity: [
    { en: ['You kept looking for space between thoughts.', 'Some answers appeared when you stopped forcing them.'],
      pt: ['Você continuou procurando espaço entre os pensamentos.', 'Algumas respostas apareceram quando você parou de forçá-las.'],
      es: ['Seguiste buscando espacio entre los pensamientos.', 'Algunas respuestas aparecieron cuando dejaste de forzarlas.'],
      fr: ['Tu as continué à chercher de l\'espace entre les pensées.', 'Certaines réponses sont apparues quand tu as arrêté de les forcer.'],
      de: ['Du suchtest weiter nach Raum zwischen den Gedanken.', 'Einige Antworten erschienen, als du aufhörtest, sie zu erzwingen.'] },
    { en: ['Clarity doesn\'t always arrive quickly.', 'This week was about noticing — not concluding.'],
      pt: ['A clareza nem sempre chega rapidamente.', 'Esta semana foi sobre notar — não concluir.'],
      es: ['La claridad no siempre llega rápidamente.', 'Esta semana fue sobre notar — no concluir.'],
      fr: ['La clarté n\'arrive pas toujours rapidement.', 'Cette semaine était une question de remarquer — pas de conclure.'],
      de: ['Klarheit kommt nicht immer schnell.', 'Diese Woche ging es ums Wahrnehmen — nicht ums Schlussfolgern.'] },
    { en: ['Some weeks are less about answers and more about the right questions.', 'This seemed to be one of those.'],
      pt: ['Algumas semanas são menos sobre respostas e mais sobre as perguntas certas.', 'Esta pareceu ser uma delas.'],
      es: ['Algunas semanas son más sobre las preguntas correctas que sobre las respuestas.', 'Esta pareció ser una de esas.'],
      fr: ['Certaines semaines sont moins une question de réponses et plus de bonnes questions.', 'Celle-ci semblait en être une.'],
      de: ['Manche Wochen gehen weniger um Antworten und mehr um die richtigen Fragen.', 'Diese schien eine davon zu sein.'] },
    { en: ['Something became a little clearer as the week moved on.', 'Not completely. But enough.'],
      pt: ['Algo ficou um pouco mais claro à medida que a semana avançou.', 'Não completamente. Mas o suficiente.'],
      es: ['Algo se aclaró un poco a medida que la semana avanzaba.', 'No completamente. Pero lo suficiente.'],
      fr: ['Quelque chose est devenu un peu plus clair au fil de la semaine.', 'Pas complètement. Mais assez.'],
      de: ['Etwas wurde im Verlauf der Woche ein wenig klarer.', 'Nicht vollständig. Aber genug.'] },
    { en: ["The fog didn't clear all at once.", 'Some things became visible on their own.'],
      pt: ['A névoa não se dissipou de uma vez.', 'Algumas coisas se tornaram visíveis por conta própria.'],
      es: ['La niebla no se despejó de una vez.', 'Algunas cosas se volvieron visibles por sí solas.'],
      fr: ["Le brouillard ne s'est pas dissipé d'un coup.", 'Certaines choses sont devenues visibles par elles-mêmes.'],
      de: ['Der Nebel lichtete sich nicht auf einmal.', 'Einige Dinge wurden von selbst sichtbar.'] },
  ],
  Focus: [
    { en: ['There was direction to this week.', 'A sense of what mattered.', 'Not loud — just present.'],
      pt: ['Houve direção nesta semana.', 'Um senso do que importava.', 'Não alto — apenas presente.'],
      es: ['Hubo dirección en esta semana.', 'Una sensación de lo que importaba.', 'No en voz alta — simplemente presente.'],
      fr: ['Il y avait une direction dans cette semaine.', 'Un sentiment de ce qui comptait.', 'Pas fort — juste présent.'],
      de: ['Diese Woche hatte eine Richtung.', 'Ein Gefühl dafür, was wichtig war.', 'Nicht laut — einfach präsent.'] },
    { en: ['You returned to a single thread throughout the week.', 'That kind of attention has its own value.'],
      pt: ['Você voltou a um único fio ao longo da semana.', 'Esse tipo de atenção tem seu próprio valor.'],
      es: ['Regresaste a un único hilo a lo largo de la semana.', 'Ese tipo de atención tiene su propio valor.'],
      fr: ['Tu es revenu à un seul fil tout au long de la semaine.', 'Ce genre d\'attention a sa propre valeur.'],
      de: ['Du bist die ganze Woche zu einem einzigen Faden zurückgekehrt.', 'Diese Art von Aufmerksamkeit hat ihren eigenen Wert.'] },
    { en: ['One thing at a time.', 'This week seemed to understand that.'],
      pt: ['Uma coisa de cada vez.', 'Esta semana pareceu entender isso.'],
      es: ['Una cosa a la vez.', 'Esta semana pareció entender eso.'],
      fr: ['Une chose à la fois.', 'Cette semaine semblait comprendre ça.'],
      de: ['Eine Sache nach der anderen.', 'Diese Woche schien das zu verstehen.'] },
    { en: ['There was a focus to this week.', 'Not perfect. But it was there.'],
      pt: ['Houve um foco nesta semana.', 'Não perfeito. Mas estava lá.'],
      es: ['Hubo un enfoque en esta semana.', 'No perfecto. Pero estaba ahí.'],
      fr: ['Il y avait un focus dans cette semaine.', 'Pas parfait. Mais il était là.'],
      de: ['Es gab einen Fokus in dieser Woche.', 'Nicht perfekt. Aber er war da.'] },
    { en: ['Distraction was there too.', 'But you kept finding your way back to what mattered.'],
      pt: ['A distração também estava lá.', 'Mas você continuou encontrando seu caminho de volta ao que importava.'],
      es: ['La distracción también estaba allí.', 'Pero seguiste encontrando tu camino de regreso a lo que importaba.'],
      fr: ['La distraction était là aussi.', 'Mais tu as continué à trouver ton chemin vers ce qui comptait.'],
      de: ['Ablenkung war auch da.', 'Aber du hast immer wieder den Weg zu dem gefunden, was wichtig war.'] },
  ],
  Momentum: [
    { en: ['Something was in motion this week.', 'It wasn\'t loud. But it was real.'],
      pt: ['Algo estava em movimento esta semana.', 'Não foi alto. Mas foi real.'],
      es: ['Algo estaba en movimiento esta semana.', 'No fue en voz alta. Pero fue real.'],
      fr: ['Quelque chose était en mouvement cette semaine.', 'Ce n\'était pas fort. Mais c\'était réel.'],
      de: ['Etwas war diese Woche in Bewegung.', 'Es war nicht laut. Aber es war echt.'] },
    { en: ['There was a current to this week.', 'Small but steady.'],
      pt: ['Houve uma corrente nesta semana.', 'Pequena, mas constante.'],
      es: ['Hubo una corriente en esta semana.', 'Pequeña pero constante.'],
      fr: ['Il y avait un courant dans cette semaine.', 'Petit mais régulier.'],
      de: ['Diese Woche hatte eine Strömung.', 'Klein, aber gleichmäßig.'] },
    { en: ['You kept going even when the direction wasn\'t completely clear.', 'That says something.'],
      pt: ['Você continuou mesmo quando a direção não estava completamente clara.', 'Isso diz algo.'],
      es: ['Seguiste incluso cuando la dirección no estaba completamente clara.', 'Eso dice algo.'],
      fr: ['Tu as continué même quand la direction n\'était pas complètement claire.', 'Ça dit quelque chose.'],
      de: ['Du bist weiter gegangen, auch wenn die Richtung nicht ganz klar war.', 'Das sagt etwas.'] },
    { en: ['The week kept moving.', 'Even on the days when it felt harder.'],
      pt: ['A semana continuou se movendo.', 'Mesmo nos dias em que parecia mais difícil.'],
      es: ['La semana siguió moviéndose.', 'Incluso en los días en que se sentía más difícil.'],
      fr: ["La semaine a continué d'avancer.", "Même les jours où c'était plus difficile."],
      de: ['Die Woche bewegte sich weiter.', 'Auch an den Tagen, an denen es schwerer schien.'] },
    { en: ['Something carried through from one day to the next.', "That's not nothing."],
      pt: ['Algo foi passando de um dia para o outro.', 'Isso não é pouco.'],
      es: ['Algo fue pasando de un día al siguiente.', 'Eso no es poco.'],
      fr: ["Quelque chose s'est transmis d'un jour à l'autre.", "Ce n'est pas rien."],
      de: ['Etwas trug sich von einem Tag zum nächsten.', 'Das ist nicht nichts.'] },
  ],
  Courage: [
    { en: ['Not every step felt certain.', 'You moved anyway.'],
      pt: ['Nem todo passo pareceu certo.', 'Você se moveu mesmo assim.'],
      es: ['No cada paso se sintió seguro.', 'Te moviste de todas formas.'],
      fr: ['Chaque pas n\'était pas certain.', 'Tu t\'es quand même avancé.'],
      de: ['Nicht jeder Schritt fühlte sich sicher an.', 'Du bist trotzdem gegangen.'] },
    { en: ['There were moments of uncertainty this week.', 'You stayed in them long enough to find a way through.'],
      pt: ['Houve momentos de incerteza esta semana.', 'Você permaneceu neles tempo suficiente para encontrar um caminho.'],
      es: ['Hubo momentos de incertidumbre esta semana.', 'Te quedaste en ellos el tiempo suficiente para encontrar un camino.'],
      fr: ['Il y a eu des moments d\'incertitude cette semaine.', 'Tu y es resté assez longtemps pour trouver un chemin.'],
      de: ['Es gab diese Woche Momente der Unsicherheit.', 'Du bist lang genug in ihnen geblieben, um einen Weg zu finden.'] },
    { en: ['Something required a little more from you this week.', 'You gave it.'],
      pt: ['Algo exigiu um pouco mais de você esta semana.', 'Você deu.'],
      es: ['Algo requirió un poco más de ti esta semana.', 'Lo diste.'],
      fr: ['Quelque chose t\'a demandé un peu plus cette semaine.', 'Tu l\'as donné.'],
      de: ['Etwas hat diese Woche ein bisschen mehr von dir verlangt.', 'Du hast es gegeben.'] },
    { en: ['Some days felt uncertain.', 'You stayed with them anyway.'],
      pt: ['Alguns dias pareceram incertos.', 'Você ficou com eles mesmo assim.'],
      es: ['Algunos días se sintieron inciertos.', 'Te quedaste con ellos de todas formas.'],
      fr: ['Certains jours se sont sentis incertains.', 'Tu es quand même resté avec eux.'],
      de: ['Einige Tage fühlten sich ungewiss an.', 'Du bist trotzdem dabei geblieben.'] },
    { en: ["The harder part wasn't avoided this week.", 'It was met.'],
      pt: ['A parte mais difícil não foi evitada esta semana.', 'Foi enfrentada.'],
      es: ['La parte más difícil no fue evitada esta semana.', 'Fue encontrada.'],
      fr: ["La partie la plus difficile n'a pas été évitée cette semaine.", 'Elle a été rencontrée.'],
      de: ['Der schwierigere Teil wurde diese Woche nicht vermieden.', 'Er wurde angenommen.'] },
  ],
  Rhythm: [
    { en: ['The week had its own pattern.', 'Not perfect. But recognizable.'],
      pt: ['A semana teve seu próprio padrão.', 'Não perfeito. Mas reconhecível.'],
      es: ['La semana tuvo su propio patrón.', 'No perfecto. Pero reconocible.'],
      fr: ['La semaine avait son propre schéma.', 'Pas parfait. Mais reconnaissable.'],
      de: ['Die Woche hatte ihr eigenes Muster.', 'Nicht perfekt. Aber erkennbar.'] },
    { en: ['Something repeated this week.', 'A returning. A small pattern.', 'That\'s how rhythm is made.'],
      pt: ['Algo se repetiu esta semana.', 'Um retorno. Um pequeno padrão.', 'É assim que o ritmo é feito.'],
      es: ['Algo se repitió esta semana.', 'Un regreso. Un pequeño patrón.', 'Así se hace el ritmo.'],
      fr: ['Quelque chose s\'est répété cette semaine.', 'Un retour. Un petit schéma.', 'C\'est ainsi que se fait le rythme.'],
      de: ['Etwas wiederholte sich diese Woche.', 'Eine Rückkehr. Ein kleines Muster.', 'So entsteht Rhythmus.'] },
    { en: ['The pattern continued this week.', 'Quietly. Without fanfare.'],
      pt: ['O padrão continuou esta semana.', 'Quietamente. Sem alarde.'],
      es: ['El patrón continuó esta semana.', 'En silencio. Sin fanfarria.'],
      fr: ['Le schéma a continué cette semaine.', 'Silencieusement. Sans fanfare.'],
      de: ['Das Muster setzte sich diese Woche fort.', 'Still. Ohne Aufsehen.'] },
    { en: ['The week had its returns.', 'Small ones. But they added up.'],
      pt: ['A semana teve seus retornos.', 'Pequenos. Mas foram se acumulando.'],
      es: ['La semana tuvo sus regresos.', 'Pequeños. Pero fueron sumándose.'],
      fr: ['La semaine a eu ses retours.', "Petits. Mais ils s'additionnaient."],
      de: ['Die Woche hatte ihre Rückkehren.', 'Kleine. Aber sie summierten sich.'] },
    { en: ['You kept a thread going throughout the week.', 'Even on the quieter days.'],
      pt: ['Você manteve um fio ao longo da semana.', 'Mesmo nos dias mais quietos.'],
      es: ['Mantuviste un hilo a lo largo de la semana.', 'Incluso en los días más tranquilos.'],
      fr: ['Tu as maintenu un fil tout au long de la semaine.', 'Même les jours plus calmes.'],
      de: ['Du hast einen Faden durch die gesamte Woche gehalten.', 'Auch an den stilleren Tagen.'] },
  ],
  // 7/7 completions — specific acknowledgement
  _7of7: [
    { en: ['You came back each day this week.', 'Not because everything was easy.', 'Because there was a small place for you in each day.'],
      pt: ['Você voltou todos os dias desta semana.', 'Não porque tudo foi fácil.', 'Porque havia um pequeno espaço para você em cada dia.'],
      es: ['Regresaste cada día de esta semana.', 'No porque todo fuera fácil.', 'Porque había un pequeño lugar para ti en cada día.'],
      fr: ['Tu es revenu chaque jour cette semaine.', "Pas parce que tout était facile.", "Parce qu'il y avait une petite place pour toi chaque jour."],
      de: ['Du bist jeden Tag dieser Woche zurückgekehrt.', 'Nicht weil alles einfach war.', 'Weil es jeden Tag einen kleinen Platz für dich gab.'] },
    { en: ['Every day had space for you this week.', 'Seven returns.', "That's its own kind of presence."],
      pt: ['Cada dia teve espaço para você esta semana.', 'Sete retornos.', 'Isso é sua própria forma de presença.'],
      es: ['Cada día tuvo espacio para ti esta semana.', 'Siete regresos.', 'Eso es su propio tipo de presencia.'],
      fr: ["Chaque jour avait de l'espace pour toi cette semaine.", 'Sept retours.', "C'est sa propre forme de présence."],
      de: ['Jeden Tag hatte diese Woche Platz für dich.', 'Sieben Rückkehren.', 'Das ist seine eigene Art von Präsenz.'] },
    { en: ['Seven days.', 'Seven small returns.', 'Nothing flashy. Just consistent.'],
      pt: ['Sete dias.', 'Sete pequenos retornos.', 'Sem exibição. Apenas consistente.'],
      es: ['Siete días.', 'Siete pequeños regresos.', 'Sin alarde. Solo consistente.'],
      fr: ['Sept jours.', 'Sept petits retours.', "Rien d'ostentatoire. Juste constant."],
      de: ['Sieben Tage.', 'Sieben kleine Rückkehren.', 'Nichts Aufsehenerregendes. Nur beständig.'] },
    { en: ['You showed up every day this week.', 'Ordinary days — and you were in all of them.'],
      pt: ['Você apareceu todos os dias esta semana.', 'Dias ordinários — e você estava em todos eles.'],
      es: ['Te presentaste cada día de esta semana.', 'Días ordinarios — y estuviste en todos ellos.'],
      fr: ['Tu t\'es présenté chaque jour cette semaine.', "Des jours ordinaires — et tu étais dans chacun d'eux."],
      de: ['Du bist jeden Tag dieser Woche erschienen.', 'Gewöhnliche Tage — und du warst in allen davon.'] },
    { en: ["Each day had a moment that was yours.", "That's not a small thing.", 'Seven of them, this week.'],
      pt: ['Cada dia teve um momento que foi seu.', 'Isso não é pouco.', 'Sete deles, esta semana.'],
      es: ['Cada día tuvo un momento que fue tuyo.', 'Eso no es poca cosa.', 'Siete de ellos, esta semana.'],
      fr: ["Chaque jour avait un moment qui était le tien.", "Ce n'est pas peu de chose.", 'Sept d\'entre eux, cette semaine.'],
      de: ['Jeder Tag hatte einen Moment, der dir gehörte.', 'Das ist keine Kleinigkeit.', 'Sieben davon, diese Woche.'] },
  ],
  // Many skipped days — honest, non-judgmental
  _skipped_heavy: [
    { en: ['Some days stayed untouched.', 'That did not erase the days you returned.', 'The week still held a few small openings.'],
      pt: ['Alguns dias ficaram sem toque.', 'Isso não apagou os dias em que você voltou.', 'A semana ainda teve algumas pequenas aberturas.'],
      es: ['Algunos días permanecieron intactos.', 'Eso no borró los días en que regresaste.', 'La semana todavía tuvo algunas pequeñas aperturas.'],
      fr: ["Certains jours sont restés intacts.", "Cela n'a pas effacé les jours où tu es revenu.", 'La semaine avait encore quelques petites ouvertures.'],
      de: ['Einige Tage blieben unberührt.', 'Das hat die Tage, an denen du zurückgekehrt bist, nicht ausgelöscht.', 'Die Woche hielt noch ein paar kleine Öffnungen bereit.'] },
    { en: ['More days were quiet than active this week.', 'The ones that were active still counted.', "That's enough."],
      pt: ['Mais dias foram quietos do que ativos esta semana.', 'Os que foram ativos ainda contaram.', 'Isso é suficiente.'],
      es: ['Más días estuvieron tranquilos que activos esta semana.', 'Los que estuvieron activos aún contaron.', 'Eso es suficiente.'],
      fr: ["Plus de jours étaient calmes qu'actifs cette semaine.", 'Ceux qui étaient actifs comptaient quand même.', "C'est assez."],
      de: ['Mehr Tage waren ruhig als aktiv diese Woche.', 'Die, die aktiv waren, zählten trotzdem.', 'Das reicht.'] },
    { en: ['The week passed mostly in silence.', 'You still showed up in it.', 'A few times was enough.'],
      pt: ['A semana passou em sua maioria em silêncio.', 'Você ainda apareceu nela.', 'Algumas vezes foi suficiente.'],
      es: ['La semana pasó en su mayoría en silencio.', 'Aún así, te presentaste en ella.', 'Unas pocas veces fue suficiente.'],
      fr: ['La semaine est passée principalement dans le silence.', 'Tu y étais quand même présent.', "Quelques fois, c'était assez."],
      de: ['Die Woche verlief größtenteils in Stille.', 'Du warst trotzdem dabei.', 'Ein paarmal war genug.'] },
    { en: ['A quieter week.', 'Not every week moves the same way.', 'You were still here.'],
      pt: ['Uma semana mais quieta.', 'Nem toda semana se move da mesma forma.', 'Você ainda estava aqui.'],
      es: ['Una semana más tranquila.', 'No todas las semanas se mueven de la misma manera.', 'Todavía estabas aquí.'],
      fr: ['Une semaine plus calme.', 'Toutes les semaines ne se déroulent pas de la même façon.', 'Tu étais encore là.'],
      de: ['Eine ruhigere Woche.', 'Nicht jede Woche bewegt sich auf die gleiche Weise.', 'Du warst trotzdem hier.'] },
    { en: ['Some weeks just stay quiet.', "That's not a failure.", 'The next one starts without explanation.'],
      pt: ['Algumas semanas simplesmente ficam quietas.', 'Isso não é fracasso.', 'A próxima começa sem explicações.'],
      es: ['Algunas semanas simplemente se quedan tranquilas.', 'Eso no es un fracaso.', 'La siguiente comienza sin explicaciones.'],
      fr: ['Certaines semaines restent simplement calmes.', "Ce n'est pas un échec.", 'La suivante commence sans explication.'],
      de: ['Manche Wochen bleiben einfach ruhig.', 'Das ist kein Versagen.', 'Die nächste beginnt ohne Erklärung.'] },
  ],
  // Completion-based fallbacks (when no dominant category)
  _high: [
    { en: ['You showed up in a quiet, consistent way this week.', 'Not loudly.', 'Just reliably.'],
      pt: ['Você apareceu de forma quieta e consistente esta semana.', 'Não em voz alta.', 'Apenas confiavelmente.'],
      es: ['Te presentaste de manera tranquila y consistente esta semana.', 'No en voz alta.', 'Solo de manera confiable.'],
      fr: ['Tu t\'es présenté de manière calme et régulière cette semaine.', 'Pas bruyamment.', 'Juste de manière fiable.'],
      de: ['Du bist diese Woche auf ruhige, beständige Art erschienen.', 'Nicht laut.', 'Einfach zuverlässig.'] },
    { en: ['Day after day, you created small moments for yourself.', 'That becomes its own kind of rhythm.'],
      pt: ['Dia após dia, você criou pequenos momentos para si mesmo.', 'Isso se torna seu próprio tipo de ritmo.'],
      es: ['Día tras día, creaste pequeños momentos para ti.', 'Eso se convierte en su propio tipo de ritmo.'],
      fr: ['Jour après jour, tu as créé de petits moments pour toi-même.', 'Ça devient son propre type de rythme.'],
      de: ['Tag für Tag hast du dir kleine Momente geschaffen.', 'Das wird zu einem eigenen Rhythmus.'] },
    { en: ['It was an ordinary week — and you were here for most of it.', 'That\'s more than it sounds.'],
      pt: ['Foi uma semana ordinária — e você estava aqui para a maior parte.', 'Isso é mais do que parece.'],
      es: ['Fue una semana ordinaria — y estuviste aquí para la mayor parte.', 'Eso es más de lo que suena.'],
      fr: ['C\'était une semaine ordinaire — et tu étais là pour la plupart.', 'C\'est plus que ça en a l\'air.'],
      de: ['Es war eine gewöhnliche Woche — und du warst für das meiste davon hier.', 'Das ist mehr als es klingt.'] },
    { en: ['Nothing dramatic happened.', 'You still showed up.'],
      pt: ['Nada dramático aconteceu.', 'Você ainda apareceu.'],
      es: ['Nada dramático pasó.', 'Todavía te presentaste.'],
      fr: ["Rien de dramatique ne s'est passé.", "Tu t'es quand même présenté."],
      de: ['Nichts Dramatisches passierte.', 'Du bist trotzdem erschienen.'] },
    { en: ['The week passed without announcement.', 'And you were there for it.'],
      pt: ['A semana passou sem anúncios.', 'E você estava lá para ela.'],
      es: ['La semana pasó sin anuncios.', 'Y estuviste ahí para ella.'],
      fr: ['La semaine est passée sans annonce.', 'Et tu étais là pour elle.'],
      de: ['Die Woche verging ohne Ankündigung.', 'Und du warst dabei.'] },
  ],
  _medium: [
    { en: ['The week wasn\'t all or nothing.', 'Some days had space for you.', 'Others didn\'t.'],
      pt: ['A semana não foi tudo ou nada.', 'Alguns dias tiveram espaço para você.', 'Outros não.'],
      es: ['La semana no fue todo o nada.', 'Algunos días tuvieron espacio para ti.', 'Otros no.'],
      fr: ['La semaine n\'était pas tout ou rien.', 'Certains jours avaient de l\'espace pour toi.', 'D\'autres non.'],
      de: ['Die Woche war nicht alles oder nichts.', 'Einige Tage hatten Platz für dich.', 'Andere nicht.'] },
    { en: ['There were returns, and there were pauses.', 'Both were part of the week.'],
      pt: ['Houve retornos, e houve pausas.', 'Ambos faziam parte da semana.'],
      es: ['Hubo regresos, y hubo pausas.', 'Ambos fueron parte de la semana.'],
      fr: ['Il y a eu des retours, et il y a eu des pauses.', 'Les deux faisaient partie de la semaine.'],
      de: ['Es gab Rückkehren und es gab Pausen.', 'Beides gehörte zur Woche.'] },
    { en: ['You came back some days and not others.', 'That\'s a realistic week.'],
      pt: ['Você voltou alguns dias e não outros.', 'Essa é uma semana realista.'],
      es: ['Regresaste algunos días y no otros.', 'Esa es una semana realista.'],
      fr: ['Tu es revenu certains jours et pas d\'autres.', 'C\'est une semaine réaliste.'],
      de: ['Du bist an einigen Tagen zurückgekehrt und an anderen nicht.', 'Das ist eine realistische Woche.'] },
    { en: ['Some days worked better than others.', "That's how most weeks look."],
      pt: ['Alguns dias funcionaram melhor do que outros.', 'É assim que a maioria das semanas parece.'],
      es: ['Algunos días funcionaron mejor que otros.', 'Así es como se ven la mayoría de las semanas.'],
      fr: ["Certains jours ont mieux marché que d'autres.", "C'est à quoi ressemblent la plupart des semaines."],
      de: ['Einige Tage liefen besser als andere.', 'So sehen die meisten Wochen aus.'] },
    { en: ['Not every day needed to count.', 'Enough of them did.'],
      pt: ['Nem todo dia precisava contar.', 'Suficientes contaram.'],
      es: ['No cada día necesitaba contar.', 'Suficientes sí contaron.'],
      fr: ["Pas chaque jour n'avait besoin de compter.", "Assez l'ont fait."],
      de: ['Nicht jeder Tag musste zählen.', 'Genug haben es getan.'] },
  ],
  _low: [
    { en: ['This week had its own rhythm.', 'Less active than usual.', 'Sometimes the week is just like that.'],
      pt: ['Esta semana teve seu próprio ritmo.', 'Menos ativo que o habitual.', 'Às vezes a semana é assim.'],
      es: ['Esta semana tuvo su propio ritmo.', 'Menos activo que de costumbre.', 'A veces la semana es simplemente así.'],
      fr: ['Cette semaine avait son propre rythme.', 'Moins active que d\'habitude.', 'Parfois la semaine est juste comme ça.'],
      de: ['Diese Woche hatte ihren eigenen Rhythmus.', 'Weniger aktiv als sonst.', 'Manchmal ist die Woche einfach so.'] },
    { en: ['Not every week moves at the same pace.', 'This one was quieter.', 'That\'s part of the pattern too.'],
      pt: ['Nem toda semana se move no mesmo ritmo.', 'Esta foi mais quieta.', 'Isso também faz parte do padrão.'],
      es: ['No toda semana se mueve al mismo ritmo.', 'Esta fue más tranquila.', 'Eso también es parte del patrón.'],
      fr: ['Toutes les semaines ne se déroulent pas au même rythme.', 'Celle-ci était plus calme.', 'C\'est aussi une partie du schéma.'],
      de: ['Nicht jede Woche bewegt sich im gleichen Tempo.', 'Diese war ruhiger.', 'Das ist auch Teil des Musters.'] },
    { en: ['There were quiet days.', 'And there was you, still here.'],
      pt: ['Houve dias quietos.', 'E você estava aqui.'],
      es: ['Hubo días tranquilos.', 'Y estabas aquí.'],
      fr: ['Il y a eu des jours calmes.', 'Et il y avait toi, encore là.'],
      de: ['Es gab stille Tage.', 'Und da warst du, immer noch hier.'] },
    { en: ['The week moved at its own pace.', 'Slower than expected, maybe.', 'Still, you were here.'],
      pt: ['A semana se moveu no seu próprio ritmo.', 'Mais lenta do que o esperado, talvez.', 'Ainda assim, você estava aqui.'],
      es: ['La semana se movió a su propio ritmo.', 'Más lenta de lo esperado, tal vez.', 'De todas formas, estabas aquí.'],
      fr: ["La semaine s'est déroulée à son propre rythme.", 'Plus lentement que prévu, peut-être.', 'Tu étais quand même là.'],
      de: ['Die Woche bewegte sich in ihrem eigenen Tempo.', 'Langsamer als erwartet, vielleicht.', 'Trotzdem warst du hier.'] },
    { en: ['Quiet weeks exist.', 'This was one of them.'],
      pt: ['Semanas quietas existem.', 'Esta foi uma delas.'],
      es: ['Las semanas tranquilas existen.', 'Esta fue una de ellas.'],
      fr: ['Les semaines calmes existent.', "Celle-ci en était une."],
      de: ['Stille Wochen gibt es.', 'Dies war eine davon.'] },
  ],
};

function quietObsPoolKey(insights: WeekInsights): string {
  if (insights.resetsCompleted === 7) return '_7of7';
  if (insights.skippedCount >= 4)    return '_skipped_heavy';
  const cat = insights.topCategories[0];
  if (cat && QUIET_OBS[cat]) return cat;
  if (insights.resetsCompleted >= 5) return '_high';
  if (insights.resetsCompleted >= 3) return '_medium';
  return '_low';
}

export function getQuietObservation(insights: WeekInsights, lang: string, weekNumber: number = 1): string[] {
  const key   = quietObsPoolKey(insights);
  const pools = QUIET_OBS[key];
  const pool  = pools[(weekNumber - 1) % pools.length];
  const l     = (lang in pool ? lang : 'en') as keyof L5;
  return pool[l];
}

// ─── Section 9 — Looking Ahead copy ──────────────────────────────────────────
// 5 pools of 2 soft sentences. Selected by weekNumber so consecutive weeks
// feel different. No advice, no goals — just a quiet acknowledgement that
// another week exists.

const LOOKING_AHEAD_POOLS: L5[] = [
  { en: ["Let's see what next week brings.", 'Nothing needs to be decided today.'],
    pt: ['Vamos ver o que a próxima semana traz.', 'Nada precisa ser decidido hoje.'],
    es: ['Veamos qué trae la próxima semana.', 'Nada necesita ser decidido hoy.'],
    fr: ['Voyons ce que la prochaine semaine apporte.', "Rien n'a besoin d'être décidé aujourd'hui."],
    de: ['Mal sehen, was die nächste Woche bringt.', 'Heute muss nichts entschieden werden.'] },
  { en: ['Your rhythm continues from here.', 'Another week begins where this one ended.'],
    pt: ['Seu ritmo continua daqui.', 'Uma nova semana começa onde esta terminou.'],
    es: ['Tu ritmo continúa desde aquí.', 'Una nueva semana comienza donde esta terminó.'],
    fr: ["Ton rythme continue d'ici.", "Une nouvelle semaine commence là où celle-ci s'est terminée."],
    de: ['Dein Rhythmus setzt sich von hier aus fort.', 'Eine neue Woche beginnt dort, wo diese endete.'] },
  { en: ['The next days will have their own shape.', 'No particular expectations.'],
    pt: ['Os próximos dias terão sua própria forma.', 'Sem expectativas particulares.'],
    es: ['Los próximos días tendrán su propia forma.', 'Sin expectativas particulares.'],
    fr: ['Les prochains jours auront leur propre forme.', "Pas d'attentes particulières."],
    de: ['Die nächsten Tage werden ihre eigene Form haben.', 'Keine besonderen Erwartungen.'] },
  { en: ['Not everything needs to carry over.', 'Next week starts fresh.'],
    pt: ['Nem tudo precisa ser carregado.', 'A próxima semana começa do zero.'],
    es: ['No todo necesita pasar a la siguiente semana.', 'La próxima semana comienza de nuevo.'],
    fr: ["Tout n'a pas besoin de passer à la suite.", 'La semaine prochaine commence à zéro.'],
    de: ['Nicht alles muss mitgenommen werden.', 'Die nächste Woche beginnt frisch.'] },
  { en: ["There's a new week ahead.", 'It will be what it is.'],
    pt: ['Há uma nova semana à frente.', 'Ela será o que for.'],
    es: ['Hay una nueva semana por delante.', 'Será lo que sea.'],
    fr: ['Il y a une nouvelle semaine à venir.', 'Elle sera ce quelle sera.'],
    de: ['Es gibt eine neue Woche vor dir.', 'Sie wird sein, was sie ist.'] },
  { en: ['The story continues next week.', "There's no rush to get there."],
    pt: ['A história continua na próxima semana.', 'Não há pressa para chegar lá.'],
    es: ['La historia continúa la próxima semana.', 'No hay prisa por llegar allí.'],
    fr: ["L'histoire continue la semaine prochaine.", "Rien ne presse pour y arriver."],
    de: ['Die Geschichte geht nächste Woche weiter.', 'Es gibt keinen Grund, sich zu beeilen.'] },
  { en: ['One day at a time is enough.', 'The next one will arrive on its own.'],
    pt: ['Um dia de cada vez já é suficiente.', 'O próximo chegará por conta própria.'],
    es: ['Un día a la vez es suficiente.', 'El siguiente llegará por sí solo.'],
    fr: ['Un jour à la fois, ça suffit.', 'Le suivant arrivera de lui-même.'],
    de: ['Ein Tag nach dem anderen ist genug.', 'Der nächste kommt von selbst.'] },
  { en: ['There is time.', "The next week hasn't started yet."],
    pt: ['Há tempo.', 'A próxima semana ainda não começou.'],
    es: ['Hay tiempo.', 'La próxima semana todavía no ha comenzado.'],
    fr: ['Il y a du temps.', "La prochaine semaine n'a pas encore commencé."],
    de: ['Es gibt Zeit.', 'Die nächste Woche hat noch nicht begonnen.'] },
  { en: ['Next week is still unwritten.', "That's a quiet kind of possibility."],
    pt: ['A próxima semana ainda não foi escrita.', 'Isso é uma espécie de possibilidade quieta.'],
    es: ['La próxima semana todavía está sin escribir.', 'Eso es una especie de posibilidad tranquila.'],
    fr: ["La semaine prochaine n'est pas encore écrite.", "C'est une sorte de possibilité tranquille."],
    de: ['Die nächste Woche ist noch ungeschrieben.', 'Das ist eine stille Art von Möglichkeit.'] },
  { en: ["The days ahead haven't been decided yet.", 'They rarely need to be.'],
    pt: ['Os dias à frente ainda não foram decididos.', 'Raramente precisam ser.'],
    es: ['Los días por delante todavía no han sido decididos.', 'Raramente necesitan serlo.'],
    fr: ["Les jours à venir n'ont pas encore été décidés.", "Ils ont rarement besoin de l'être."],
    de: ['Die kommenden Tage wurden noch nicht entschieden.', 'Das brauchen sie selten.'] },
  { en: ['Another week will come.', 'It will look a little different.'],
    pt: ['Outra semana vai chegar.', 'Ela vai parecer um pouco diferente.'],
    es: ['Otra semana llegará.', 'Se verá un poco diferente.'],
    fr: ['Une autre semaine viendra.', 'Elle aura un aspect un peu différent.'],
    de: ['Eine weitere Woche wird kommen.', 'Sie wird ein bisschen anders aussehen.'] },
  { en: ['The coming week is still open.', 'Let it be.'],
    pt: ['A semana que vem ainda está aberta.', 'Deixe-a ser.'],
    es: ['La semana que viene todavía está abierta.', 'Déjala ser.'],
    fr: ['La semaine qui vient est encore ouverte.', 'Laisse-la être.'],
    de: ['Die kommende Woche ist noch offen.', 'Lass es so sein.'] },
  { en: ["There's nothing to prepare.", 'Just continue.'],
    pt: ['Não há nada a preparar.', 'Apenas continue.'],
    es: ['No hay nada que preparar.', 'Solo continúa.'],
    fr: ["Il n'y a rien à préparer.", 'Juste continuer.'],
    de: ['Es gibt nichts vorzubereiten.', 'Einfach weitermachen.'] },
  { en: ['Next week is close.', 'No need to reach for it yet.'],
    pt: ['A próxima semana está próxima.', 'Não há necessidade de alcançá-la ainda.'],
    es: ['La próxima semana está cerca.', 'No hay necesidad de alcanzarla todavía.'],
    fr: ['La semaine prochaine est proche.', "Pas besoin de l'atteindre encore."],
    de: ['Die nächste Woche ist nah.', 'Es gibt keinen Grund, schon danach zu greifen.'] },
  { en: ['The thread continues.', 'Another seven days will follow.'],
    pt: ['O fio continua.', 'Mais sete dias vão se seguir.'],
    es: ['El hilo continúa.', 'Otros siete días seguirán.'],
    fr: ['Le fil continue.', 'Sept autres jours suivront.'],
    de: ['Der Faden geht weiter.', 'Weitere sieben Tage werden folgen.'] },
  { en: ['Whatever happened this week stays here.', 'The next one is separate.'],
    pt: ['O que aconteceu esta semana fica aqui.', 'A próxima é separada.'],
    es: ['Lo que pasó esta semana se queda aquí.', 'La siguiente es diferente.'],
    fr: ['Ce qui est arrivé cette semaine reste ici.', 'La suivante est à part.'],
    de: ['Was diese Woche passiert ist, bleibt hier.', 'Die nächste ist getrennt.'] },
  { en: ['The pace continues from wherever this week left it.', "That's enough."],
    pt: ['O ritmo continua de onde esta semana o deixou.', 'Isso é suficiente.'],
    es: ['El ritmo continúa desde donde esta semana lo dejó.', 'Eso es suficiente.'],
    fr: ['Le rythme continue là où cette semaine le laisse.', 'Ça suffit.'],
    de: ['Das Tempo setzt dort fort, wo diese Woche es gelassen hat.', 'Das reicht.'] },
  { en: ['Next week will begin quietly.', 'Like every week does.'],
    pt: ['A próxima semana vai começar quietamente.', 'Como toda semana faz.'],
    es: ['La próxima semana comenzará en silencio.', 'Como cada semana lo hace.'],
    fr: ['La semaine prochaine commencera calmement.', 'Comme toutes les semaines.'],
    de: ['Die nächste Woche beginnt ruhig.', 'Wie jede Woche.'] },
  { en: ["There's no urgency in what comes next.", 'It arrives on its own.'],
    pt: ['Não há urgência no que vem a seguir.', 'Chega por conta própria.'],
    es: ['No hay urgencia en lo que viene después.', 'Llega por sí solo.'],
    fr: ["Il n'y a pas d'urgence dans ce qui vient après.", 'Ça arrive tout seul.'],
    de: ['Es gibt keine Dringlichkeit in dem, was als nächstes kommt.', 'Es kommt von selbst.'] },
  { en: ['One week at a time.', "That's already enough."],
    pt: ['Uma semana de cada vez.', 'Isso já é suficiente.'],
    es: ['Una semana a la vez.', 'Eso ya es suficiente.'],
    fr: ['Une semaine à la fois.', "C'est déjà suffisant."],
    de: ['Eine Woche nach der anderen.', 'Das ist schon genug.'] },
  { en: ['Tomorrow is still uncertain.', "That's okay."],
    pt: ['Amanhã ainda é incerto.', 'Tudo bem.'],
    es: ['Mañana todavía es incierto.', 'Está bien.'],
    fr: ["Demain est encore incertain.", "C'est bien ainsi."],
    de: ['Morgen ist noch ungewiss.', 'Das ist in Ordnung.'] },
  { en: ["There's no need to carry this week forward.", 'The next one starts on its own.'],
    pt: ['Não há necessidade de carregar esta semana adiante.', 'A próxima começa por conta própria.'],
    es: ['No hay necesidad de llevar esta semana hacia adelante.', 'La próxima comienza por sí sola.'],
    fr: ["Il n'est pas nécessaire de porter cette semaine en avant.", 'La prochaine commence par elle-même.'],
    de: ['Es ist nicht nötig, diese Woche vorwärtszutragen.', 'Die nächste beginnt von selbst.'] },
  { en: ['The week ahead will arrive.', 'Quietly, like all the others.'],
    pt: ['A semana que vem vai chegar.', 'Quietamente, como todas as outras.'],
    es: ['La semana de adelante llegará.', 'En silencio, como todas las demás.'],
    fr: ['La semaine à venir arrivera.', 'Calmement, comme toutes les autres.'],
    de: ['Die kommende Woche wird ankommen.', 'Still, wie alle anderen.'] },
  { en: ['Seven new days will follow.', 'Nothing is decided about them yet.'],
    pt: ['Sete novos dias virão.', 'Nada foi decidido sobre eles ainda.'],
    es: ['Siete nuevos días seguirán.', 'Nada está decidido sobre ellos aún.'],
    fr: ['Sept nouveaux jours suivront.', "Rien n'est encore décidé à leur sujet."],
    de: ['Sieben neue Tage werden folgen.', 'Nichts davon ist noch entschieden.'] },
  { en: ["The next week doesn't know what happened this week.", 'It will be its own thing.'],
    pt: ['A próxima semana não sabe o que aconteceu esta semana.', 'Ela será sua própria coisa.'],
    es: ['La próxima semana no sabe lo que pasó esta semana.', 'Será su propia cosa.'],
    fr: ["La semaine prochaine ne sait pas ce qui s'est passé cette semaine.", 'Elle sera sa propre chose.'],
    de: ['Die nächste Woche weiß nicht, was diese Woche passiert ist.', 'Sie wird ihr eigenes Ding sein.'] },
  { en: ["There's still some time before next week.", 'Let this one close first.'],
    pt: ['Ainda há algum tempo antes da próxima semana.', 'Deixe esta fechar primeiro.'],
    es: ['Todavía hay algo de tiempo antes de la próxima semana.', 'Deja que esta cierre primero.'],
    fr: ["Il y a encore du temps avant la semaine prochaine.", "Laisse celle-ci se fermer d'abord."],
    de: ['Es gibt noch etwas Zeit vor der nächsten Woche.', 'Lass diese zuerst schließen.'] },
  { en: ['The week ahead is not yet here.', "That's where it belongs for now."],
    pt: ['A semana à frente ainda não chegou.', 'É lá que ela pertence por agora.'],
    es: ['La semana de adelante aún no está aquí.', 'Ahí es donde pertenece por ahora.'],
    fr: ["La semaine à venir n'est pas encore là.", "C'est là qu'elle appartient pour l'instant."],
    de: ['Die Woche vor uns ist noch nicht hier.', 'Dort gehört sie fürs Erste hin.'] },
  { en: ['Something will be different next week.', 'Something will stay the same.'],
    pt: ['Algo será diferente na próxima semana.', 'Algo permanecerá igual.'],
    es: ['Algo será diferente la próxima semana.', 'Algo seguirá igual.'],
    fr: ['Quelque chose sera différent la semaine prochaine.', 'Quelque chose restera pareil.'],
    de: ['Etwas wird nächste Woche anders sein.', 'Etwas wird gleich bleiben.'] },
  { en: ['The pattern continues.', 'One week, and then another.'],
    pt: ['O padrão continua.', 'Uma semana, e depois outra.'],
    es: ['El patrón continúa.', 'Una semana, y luego otra.'],
    fr: ['Le schéma continue.', 'Une semaine, puis une autre.'],
    de: ['Das Muster setzt sich fort.', 'Eine Woche, dann die nächste.'] },
  { en: ["It's okay not to know what next week holds.", "Most people don't."],
    pt: ['Tudo bem não saber o que a próxima semana traz.', 'A maioria das pessoas não sabe.'],
    es: ['Está bien no saber lo que trae la próxima semana.', 'La mayoría de las personas tampoco sabe.'],
    fr: ["C'est bien de ne pas savoir ce que la prochaine semaine réserve.", "La plupart des gens ne savent pas non plus."],
    de: ['Es ist in Ordnung, nicht zu wissen, was die nächste Woche bringt.', 'Die meisten wissen es nicht.'] },
  { en: ['Things will unfold.', 'They tend to.'],
    pt: ['As coisas vão se desdobrar.', 'Costumam fazer isso.'],
    es: ['Las cosas se irán desarrollando.', 'Suelen hacerlo.'],
    fr: ['Les choses se dérouleront.', "Elles ont tendance à le faire."],
    de: ['Die Dinge werden sich entfalten.', 'Das tun sie meistens.'] },
  { en: ['The next seven days are still open.', 'No need to fill them yet.'],
    pt: ['Os próximos sete dias ainda estão abertos.', 'Não há necessidade de preenchê-los ainda.'],
    es: ['Los próximos siete días todavía están abiertos.', 'No hay necesidad de llenarlos todavía.'],
    fr: ['Les sept prochains jours sont encore ouverts.', 'Pas besoin de les remplir encore.'],
    de: ['Die nächsten sieben Tage sind noch offen.', 'Es ist nicht nötig, sie jetzt schon zu füllen.'] },
  { en: ['Just a week ahead.', "That's all it is."],
    pt: ['Apenas uma semana à frente.', 'É só isso.'],
    es: ['Solo una semana por delante.', 'Eso es todo.'],
    fr: ["Juste une semaine à venir.", "C'est tout ce que c'est."],
    de: ['Nur eine Woche vor uns.', 'Mehr ist es nicht.'] },
  { en: ['Next week will have its own quiet moments.', 'And its less quiet ones too.'],
    pt: ['A próxima semana terá seus próprios momentos quietos.', 'E os menos quietos também.'],
    es: ['La próxima semana tendrá sus propios momentos tranquilos.', 'Y los menos tranquilos también.'],
    fr: ['La semaine prochaine aura ses propres moments calmes.', 'Et ses moments moins calmes aussi.'],
    de: ['Die nächste Woche wird ihre eigenen stillen Momente haben.', 'Und die weniger stillen auch.'] },
  { en: ['The coming week begins like every week does.', 'From wherever you left off.'],
    pt: ['A semana que vem começa como toda semana faz.', 'De onde você parou.'],
    es: ['La semana que viene comienza como cada semana lo hace.', 'Desde donde lo dejaste.'],
    fr: ['La semaine qui vient commence comme toutes les semaines.', "D'où tu t'es arrêté."],
    de: ['Die kommende Woche beginnt wie jede Woche.', 'Von dort, wo du aufgehört hast.'] },
  { en: ['Rest now.', 'Next week will be what it is.'],
    pt: ['Descanse agora.', 'A próxima semana será o que for.'],
    es: ['Descansa ahora.', 'La próxima semana será lo que sea.'],
    fr: ['Repose-toi maintenant.', 'La semaine prochaine sera ce quelle sera.'],
    de: ['Ruh dich jetzt aus.', 'Die nächste Woche wird sein, was sie ist.'] },
  { en: ['Another week comes.', 'This one needed to end first.'],
    pt: ['Outra semana chega.', 'Esta precisava terminar primeiro.'],
    es: ['Otra semana llega.', 'Esta necesitaba terminar primero.'],
    fr: ['Une autre semaine arrive.', "Celle-ci devait d'abord se terminer."],
    de: ['Eine weitere Woche kommt.', 'Diese musste zuerst enden.'] },
  { en: ["There's nothing to predict about next week.", "It hasn't happened yet."],
    pt: ['Não há nada a prever sobre a próxima semana.', 'Ainda não aconteceu.'],
    es: ['No hay nada que predecir sobre la próxima semana.', 'Todavía no ha sucedido.'],
    fr: ["Il n'y a rien à prédire sur la semaine prochaine.", "Elle n'est pas encore arrivée."],
    de: ['Es gibt nichts über die nächste Woche vorherzusagen.', 'Sie ist noch nicht passiert.'] },
  { en: ['The quiet continues.', 'Somewhere, next week is waiting.'],
    pt: ['O silêncio continua.', 'Em algum lugar, a próxima semana está esperando.'],
    es: ['El silencio continúa.', 'En algún lugar, la próxima semana está esperando.'],
    fr: ['Le calme continue.', 'Quelque part, la semaine prochaine attend.'],
    de: ['Die Stille setzt sich fort.', 'Irgendwo wartet die nächste Woche.'] },
  { en: ['The days will come.', "There's no particular rush."],
    pt: ['Os dias virão.', 'Não há pressa em particular.'],
    es: ['Los días vendrán.', 'No hay prisa en particular.'],
    fr: ['Les jours viendront.', "Il n'y a pas de hâte particulière."],
    de: ['Die Tage werden kommen.', 'Es gibt keinen besonderen Grund zur Eile.'] },
  { en: ['This was one week.', 'Next will be another.'],
    pt: ['Esta foi uma semana.', 'A próxima será outra.'],
    es: ['Esta fue una semana.', 'La próxima será otra.'],
    fr: ["C'était une semaine.", "La prochaine en sera une autre."],
    de: ['Das war eine Woche.', 'Die nächste wird eine andere sein.'] },
];

// Context-aware pools — picked when dominant pattern is clear enough to matter.
const LOOKING_AHEAD_CONTEXTUAL: Record<string, L5[]> = {
  rest_heavy: [
    { en: ['The next few days may still ask for room.', 'No need to rush ahead.'],
      pt: ['Os próximos dias ainda podem pedir espaço.', 'Sem pressa para avançar.'],
      es: ['Los próximos días puede que todavía pidan espacio.', 'Sin prisa para avanzar.'],
      fr: ["Les prochains jours peuvent encore demander de l'espace.", 'Pas besoin de se presser.'],
      de: ['Die nächsten Tage könnten noch Raum verlangen.', 'Kein Grund zur Eile.'] },
    { en: ["Rest doesn't have to end with this week.", 'Let the next one begin softly.'],
      pt: ['O descanso não precisa terminar com esta semana.', 'Deixe a próxima começar suavemente.'],
      es: ['El descanso no tiene que terminar con esta semana.', 'Deja que la próxima empiece suavemente.'],
      fr: ["Le repos n'a pas à se terminer avec cette semaine.", 'Laisse la suivante commencer doucement.'],
      de: ['Ruhe muss nicht mit dieser Woche enden.', 'Lass die nächste sanft beginnen.'] },
  ],
  clarity_seeking: [
    { en: ['Maybe next week begins with a little more space.', 'See what becomes clearer.'],
      pt: ['Talvez a próxima semana comece com um pouco mais de espaço.', 'Veja o que fica mais claro.'],
      es: ['Tal vez la próxima semana empiece con un poco más de espacio.', 'Ve lo que se vuelve más claro.'],
      fr: ["Peut-être que la semaine prochaine commence avec un peu plus d'espace.", 'Vois ce qui devient plus clair.'],
      de: ['Vielleicht beginnt die nächste Woche mit etwas mehr Raum.', 'Sieh, was klarer wird.'] },
    { en: ['Some things become clearer when they\'re ready.', "The next week doesn't have to explain them."],
      pt: ['Algumas coisas ficam mais claras quando estão prontas.', 'A próxima semana não precisa explicá-las.'],
      es: ['Algunas cosas se aclaran cuando están listas.', 'La próxima semana no tiene que explicarlas.'],
      fr: ["Certaines choses deviennent plus claires quand elles sont prêtes.", "La semaine prochaine n'a pas à les expliquer."],
      de: ['Einige Dinge werden klarer, wenn sie bereit sind.', 'Die nächste Woche muss sie nicht erklären.'] },
  ],
  skipped_heavy: [
    { en: ['The next week can begin without explaining the last one.', "There's nothing to carry over."],
      pt: ['A próxima semana pode começar sem explicar a última.', 'Não há nada a carregar.'],
      es: ['La próxima semana puede comenzar sin explicar la última.', 'No hay nada que llevar.'],
      fr: ["La semaine prochaine peut commencer sans expliquer la dernière.", "Il n'y a rien à emporter."],
      de: ['Die nächste Woche kann beginnen, ohne die letzte zu erklären.', 'Es gibt nichts mitzunehmen.'] },
    { en: ["A quiet week doesn't need to be explained to the next one.", "They're separate."],
      pt: ['Uma semana quieta não precisa ser explicada para a próxima.', 'Elas são separadas.'],
      es: ['Una semana tranquila no necesita ser explicada a la siguiente.', 'Son separadas.'],
      fr: ["Une semaine calme n'a pas besoin d'être expliquée à la suivante.", 'Elles sont séparées.'],
      de: ['Eine stille Woche muss der nächsten nicht erklärt werden.', 'Sie sind getrennt.'] },
  ],
  steady: [
    { en: ['Another week can begin from this quiet rhythm.', "That's enough."],
      pt: ['Outra semana pode começar a partir deste ritmo quieto.', 'Isso é suficiente.'],
      es: ['Otra semana puede comenzar desde este ritmo tranquilo.', 'Eso es suficiente.'],
      fr: ['Une autre semaine peut commencer à partir de ce rythme calme.', "C'est assez."],
      de: ['Eine weitere Woche kann aus diesem ruhigen Rhythmus beginnen.', 'Das reicht.'] },
    { en: ['The rhythm continues from here.', 'Nothing needs to be rebuilt.'],
      pt: ['O ritmo continua daqui.', 'Nada precisa ser reconstruído.'],
      es: ['El ritmo continúa desde aquí.', 'Nada necesita ser reconstruido.'],
      fr: ["Le rythme continue d'ici.", "Rien n'a besoin d'être reconstruit."],
      de: ['Der Rhythmus setzt sich von hier fort.', 'Nichts muss neu aufgebaut werden.'] },
  ],
  pressure_heavy: [
    { en: ["The weight doesn't have to follow into next week.", 'It can start lighter.'],
      pt: ['O peso não precisa seguir para a próxima semana.', 'Ela pode começar mais leve.'],
      es: ['El peso no tiene que seguir a la próxima semana.', 'Puede empezar más ligera.'],
      fr: ["Le poids n'a pas à suivre dans la semaine prochaine.", 'Elle peut commencer plus légère.'],
      de: ['Das Gewicht muss nicht in die nächste Woche übergehen.', 'Sie kann leichter beginnen.'] },
    { en: ["Next week doesn't know what this one asked of you.", 'It starts on its own terms.'],
      pt: ['A próxima semana não sabe o que esta pediu de você.', 'Ela começa nos seus próprios termos.'],
      es: ['La próxima semana no sabe lo que esta te pidió.', 'Comienza en sus propios términos.'],
      fr: ["La semaine prochaine ne sait pas ce que celle-ci t'a demandé.", 'Elle commence à ses propres conditions.'],
      de: ['Die nächste Woche weiß nicht, was diese von dir verlangt hat.', 'Sie beginnt zu ihren eigenen Bedingungen.'] },
  ],
};

function lookingAheadContext(insights: WeekInsights): string {
  const { topCategories, dominantState, skippedCount, resetsCompleted, rhythmPattern } = insights;
  const topCat = topCategories[0];
  if (skippedCount >= 4) return 'skipped_heavy';
  if (dominantState === 'overwhelmed' || dominantState === 'racing') return 'pressure_heavy';
  if (topCat === 'Rest' || topCat === 'Calm' || dominantState === 'tired' || dominantState === 'drained') return 'rest_heavy';
  if (topCat === 'Clarity' || dominantState === 'unclear') return 'clarity_seeking';
  if (resetsCompleted >= 5 && (rhythmPattern === 'steady' || rhythmPattern === 'frontLoaded')) return 'steady';
  return 'default';
}

export function getLookingAhead(insights: WeekInsights, lang: string, weekNumber: number = 1): string[] {
  const context = lookingAheadContext(insights);
  if (context !== 'default') {
    const pools = LOOKING_AHEAD_CONTEXTUAL[context];
    const pool  = pools[(weekNumber - 1) % pools.length];
    const l     = (lang in pool ? lang : 'en') as keyof L5;
    return pool[l];
  }
  const pool = LOOKING_AHEAD_POOLS[(weekNumber - 1) % LOOKING_AHEAD_POOLS.length];
  const l    = (lang in pool ? lang : 'en') as keyof L5;
  return pool[l];
}

// ─── Section: Words of the Week ──────────────────────────────────────────────
// 3 words max. Words reflect what the user actually encountered — not abstract
// concepts, not self-help vocabulary. Human, emotional, understated.

const WORD_POOLS: Record<string, L5[]> = {
  Rest: [
    { en: ['Rest','Pause','Ease'],    pt: ['Descanso','Pausa','Leveza'],     es: ['Descanso','Pausa','Alivio'],     fr: ['Repos','Pause','Légèreté'],     de: ['Ruhe','Pause','Leichtigkeit'] },
    { en: ['Quiet','Space','Breathe'], pt: ['Quieto','Espaço','Respirar'],    es: ['Quieto','Espacio','Respirar'],   fr: ['Calme','Espace','Respirer'],    de: ['Still','Raum','Atmen'] },
    { en: ['Gentle','Slow','Enough'], pt: ['Gentil','Devagar','Suficiente'], es: ['Gentil','Despacio','Suficiente'],fr: ['Doux','Lent','Assez'],          de: ['Sanft','Langsam','Genug'] },
  ],
  Calm: [
    { en: ['Still','Space','Quiet'],   pt: ['Quieto','Espaço','Silêncio'],   es: ['Quieto','Espacio','Silencio'],   fr: ['Calme','Espace','Silence'],     de: ['Still','Raum','Stille'] },
    { en: ['Ease','Breathe','Present'],pt: ['Leveza','Respirar','Presente'], es: ['Alivio','Respirar','Presente'],  fr: ['Légèreté','Respirer','Présent'],de: ['Leichtigkeit','Atmen','Präsent'] },
    { en: ['Gentle','Slow','Rest'],    pt: ['Gentil','Devagar','Descanso'],  es: ['Gentil','Despacio','Descanso'],  fr: ['Doux','Lent','Repos'],         de: ['Sanft','Langsam','Ruhe'] },
  ],
  Clarity: [
    { en: ['Clarity','Space','Focus'], pt: ['Clareza','Espaço','Foco'],      es: ['Claridad','Espacio','Foco'],     fr: ['Clarté','Espace','Focus'],      de: ['Klarheit','Raum','Fokus'] },
    { en: ['Notice','Quiet','Breathe'],pt: ['Notar','Quieto','Respirar'],    es: ['Notar','Quieto','Respirar'],    fr: ['Remarquer','Calme','Respirer'], de: ['Wahrnehmen','Still','Atmen'] },
    { en: ['Clear','Still','Present'], pt: ['Claro','Quieto','Presente'],    es: ['Claro','Quieto','Presente'],    fr: ['Clair','Calme','Présent'],      de: ['Klar','Still','Präsent'] },
  ],
  Focus: [
    { en: ['Focus','Clarity','Steady'],pt: ['Foco','Clareza','Estável'],     es: ['Foco','Claridad','Estable'],    fr: ['Focus','Clarté','Stable'],      de: ['Fokus','Klarheit','Stabil'] },
    { en: ['Present','Patience','Space'],pt:['Presente','Paciência','Espaço'],es:['Presente','Paciencia','Espacio'],fr:['Présent','Patience','Espace'],   de: ['Präsent','Geduld','Raum'] },
    { en: ['Still','Breathe','Balance'],pt:['Quieto','Respirar','Equilíbrio'],es:['Quieto','Respirar','Equilibrio'],fr:['Calme','Respirer','Équilibre'],  de: ['Still','Atmen','Balance'] },
  ],
  Momentum: [
    { en: ['Return','Continue','Steady'],pt:['Retorno','Continuar','Estável'],es:['Regreso','Continuar','Estable'], fr:['Retour','Continuer','Stable'],   de: ['Rückkehr','Weitermachen','Stabil'] },
    { en: ['Courage','Breathe','Present'],pt:['Coragem','Respirar','Presente'],es:['Coraje','Respirar','Presente'], fr:['Courage','Respirer','Présent'],  de: ['Mut','Atmen','Präsent'] },
    { en: ['Balance','Return','Ease'],  pt: ['Equilíbrio','Retorno','Leveza'],es: ['Equilibrio','Regreso','Alivio'],fr: ['Équilibre','Retour','Légèreté'],de: ['Balance','Rückkehr','Leichtigkeit'] },
  ],
  Courage: [
    { en: ['Courage','Try','Begin'],    pt: ['Coragem','Tentar','Começar'],   es: ['Coraje','Intentar','Comenzar'], fr: ['Courage','Essayer','Commencer'],de: ['Mut','Versuchen','Beginnen'] },
    { en: ['Present','Steady','Breathe'],pt:['Presente','Estável','Respirar'],es:['Presente','Estable','Respirar'],fr:['Présent','Stable','Respirer'],   de: ['Präsent','Stabil','Atmen'] },
    { en: ['Return','Space','Patience'],pt: ['Retorno','Espaço','Paciência'], es: ['Regreso','Espacio','Paciencia'],fr: ['Retour','Espace','Patience'],   de: ['Rückkehr','Raum','Geduld'] },
  ],
  Rhythm: [
    { en: ['Return','Steady','Balance'],pt: ['Retorno','Estável','Equilíbrio'],es: ['Regreso','Estable','Equilibrio'],fr: ['Retour','Stable','Équilibre'], de: ['Rückkehr','Stabil','Balance'] },
    { en: ['Ease','Continue','Present'],pt: ['Leveza','Continuar','Presente'],es: ['Alivio','Continuar','Presente'],fr: ['Légèreté','Continuer','Présent'],de: ['Leichtigkeit','Weitermachen','Präsent'] },
    { en: ['Patience','Quiet','Return'],pt: ['Paciência','Quieto','Retorno'], es: ['Paciencia','Quieto','Regreso'], fr: ['Patience','Calme','Retour'],    de: ['Geduld','Still','Rückkehr'] },
  ],
  // State-derived pools
  _tired:       [{ en: ['Rest','Pause','Ease'],       pt: ['Descanso','Pausa','Leveza'],    es: ['Descanso','Pausa','Alivio'],    fr: ['Repos','Pause','Légèreté'],    de: ['Ruhe','Pause','Leichtigkeit'] }],
  _drained:     [{ en: ['Rest','Gentle','Space'],      pt: ['Descanso','Gentil','Espaço'],   es: ['Descanso','Gentil','Espacio'],  fr: ['Repos','Doux','Espace'],       de: ['Ruhe','Sanft','Raum'] }],
  _racing:      [{ en: ['Still','Breathe','Quiet'],    pt: ['Quieto','Respirar','Silêncio'], es: ['Quieto','Respirar','Silencio'], fr: ['Calme','Respirer','Silence'],  de: ['Still','Atmen','Stille'] }],
  _overwhelmed: [{ en: ['Space','Breathe','Ease'],     pt: ['Espaço','Respirar','Leveza'],   es: ['Espacio','Respirar','Alivio'],  fr: ['Espace','Respirer','Légèreté'],de: ['Raum','Atmen','Leichtigkeit'] }],
  _unclear:     [{ en: ['Clarity','Quiet','Space'],    pt: ['Clareza','Quieto','Espaço'],    es: ['Claridad','Quieto','Espacio'],  fr: ['Clarté','Calme','Espace'],     de: ['Klarheit','Still','Raum'] }],
  // Default fallback
  _default: [
    { en: ['Return','Pause','Rest'],    pt: ['Retorno','Pausa','Descanso'],  es: ['Regreso','Pausa','Descanso'],   fr: ['Retour','Pause','Repos'],       de: ['Rückkehr','Pause','Ruhe'] },
    { en: ['Space','Quiet','Breathe'],  pt: ['Espaço','Quieto','Respirar'],  es: ['Espacio','Quieto','Respirar'],  fr: ['Espace','Calme','Respirer'],    de: ['Raum','Still','Atmen'] },
    { en: ['Breathe','Still','Present'],pt: ['Respirar','Quieto','Presente'],es: ['Respirar','Quieto','Presente'], fr: ['Respirer','Calme','Présent'],   de: ['Atmen','Still','Präsent'] },
  ],
};

const STATE_TO_POOL: Record<string, string> = {
  tired: '_tired', drained: '_drained', racing: '_racing',
  overwhelmed: '_overwhelmed', unclear: '_unclear',
};

/**
 * Derives 3 thematic words from actual week data (max 3, not 4).
 * Primary: real word_of_day entries if ≥2 exist.
 * Secondary: dominant category pool.
 * Tertiary: dominant state pool.
 * Fallback: default pool.
 * weekNumber varies the pool so consecutive weeks read differently.
 */
export function getWeekWords(insights: WeekInsights, lang: string, weekNumber: number = 1): string[] {
  // 1. Real word_of_day data — use as-is when sufficient
  if (insights.uniqueWords.length >= 2) {
    return insights.uniqueWords.slice(0, 3);
  }

  // 2. Category pool
  const cat = insights.topCategories[0];
  let poolKey = cat && WORD_POOLS[cat] ? cat : null;

  // 3. State pool
  if (!poolKey) {
    const state = insights.dominantState;
    if (state && STATE_TO_POOL[state]) poolKey = STATE_TO_POOL[state];
  }

  // 4. Default
  if (!poolKey) poolKey = '_default';

  const pools = WORD_POOLS[poolKey];
  const pool  = pools[(weekNumber - 1) % pools.length];
  const l     = (lang in pool ? lang : 'en') as keyof L5;
  return pool[l];
}

// ─── Section: Small Moments ───────────────────────────────────────────────────
// Generates 2–3 specific, data-driven observations. Each one names something
// that actually happened — no interpretation, no coaching, just noticing.

const CAT_MOMENT: Record<string, Record<string, string>> = {
  Rest:     { en: 'You chose Rest more than any other path this week.', pt: 'Você escolheu Descanso mais do que qualquer outro caminho esta semana.', es: 'Elegiste Descanso más que cualquier otro camino esta semana.', fr: 'Tu as choisi le Repos plus que tout autre chemin cette semaine.', de: 'Du hast diese Woche Erholung mehr als jeden anderen Weg gewählt.' },
  Calm:     { en: 'Calm came up more than anything else this week.', pt: 'Calma apareceu mais do que qualquer outra coisa esta semana.', es: 'Calma apareció más que cualquier otra cosa esta semana.', fr: 'Le calme est apparu plus que n\'importe quoi d\'autre cette semaine.', de: 'Ruhe kam diese Woche mehr als alles andere vor.' },
  Clarity:  { en: 'Clarity was what you reached for most this week.', pt: 'Clareza foi o que você mais buscou esta semana.', es: 'Claridad fue lo que más buscaste esta semana.', fr: 'La clarté était ce que tu cherchais le plus cette semaine.', de: 'Klarheit war das, wonach du diese Woche am meisten gesucht hast.' },
  Focus:    { en: 'You chose Focus more than once this week.', pt: 'Você escolheu Foco mais de uma vez esta semana.', es: 'Elegiste Enfoque más de una vez esta semana.', fr: 'Tu as choisi le Focus plus d\'une fois cette semaine.', de: 'Du hast diese Woche mehr als einmal Fokus gewählt.' },
  Momentum: { en: 'Momentum was the direction you chose most this week.', pt: 'Impulso foi a direção que você mais escolheu esta semana.', es: 'El impulso fue la dirección que más elegiste esta semana.', fr: 'L\'élan était la direction que tu choisissais le plus cette semaine.', de: 'Schwung war diese Woche die Richtung, die du am häufigsten wähltest.' },
  Courage:  { en: 'You returned to Courage more than once this week.', pt: 'Você voltou à Coragem mais de uma vez esta semana.', es: 'Volviste al Coraje más de una vez esta semana.', fr: 'Tu es revenu au Courage plus d\'une fois cette semaine.', de: 'Du bist diese Woche mehr als einmal zu Mut zurückgekehrt.' },
  Rhythm:   { en: 'Rhythm was the thread you kept returning to.', pt: 'Ritmo foi o fio ao qual você continuou voltando.', es: 'El ritmo fue el hilo al que seguiste volviendo.', fr: 'Le rythme était le fil vers lequel tu revenais sans cesse.', de: 'Rhythmus war der Faden, zu dem du immer wieder zurückgekehrt bist.' },
};

const HARD_MOOD_MOMENT: Record<string, string> = {
  en: 'Difficult days appeared more than once this week.',
  pt: 'Dias difíceis apareceram mais de uma vez esta semana.',
  es: 'Días difíciles aparecieron más de una vez esta semana.',
  fr: 'Des jours difficiles sont apparus plus d\'une fois cette semaine.',
  de: 'Schwere Tage kamen diese Woche mehr als einmal vor.',
};

const GOOD_MOOD_MOMENT: Record<string, string> = {
  en: 'Lighter days were more present this week.',
  pt: 'Dias mais leves estiveram mais presentes esta semana.',
  es: 'Días más ligeros estuvieron más presentes esta semana.',
  fr: 'Des jours plus légers étaient plus présents cette semaine.',
  de: 'Leichtere Tage waren diese Woche präsenter.',
};

const RETURN_AFTER_SKIP: Record<string, string> = {
  en: 'You returned after a quiet day.',
  pt: 'Você voltou depois de um dia silencioso.',
  es: 'Regresaste después de un día tranquilo.',
  fr: 'Tu es revenu après un jour calme.',
  de: 'Du bist nach einem stillen Tag zurückgekehrt.',
};

const BACK_LOADED_MOMENT: Record<string, string> = {
  en: 'Your check-ins became more consistent as the week went on.',
  pt: 'Seus check-ins ficaram mais consistentes à medida que a semana avançou.',
  es: 'Tus check-ins se volvieron más consistentes a medida que avanzaba la semana.',
  fr: 'Tes retours sont devenus plus réguliers au fil de la semaine.',
  de: 'Deine Rückkehren wurden beständiger, je weiter die Woche fortschritt.',
};

const FRONT_LOADED_MOMENT: Record<string, string> = {
  en: 'You showed up most at the start of the week.',
  pt: 'Você apareceu mais no início da semana.',
  es: 'Apareciste más al comienzo de la semana.',
  fr: 'Tu t\'es présenté surtout en début de semaine.',
  de: 'Du bist vor allem zu Beginn der Woche erschienen.',
};

const SINGLE_WORD_MOMENT: Record<string, (w: string) => string> = {
  en: w => `One word stayed with you all week: ${w}.`,
  pt: w => `Uma palavra ficou com você a semana toda: ${w}.`,
  es: w => `Una palabra estuvo contigo toda la semana: ${w}.`,
  fr: w => `Un seul mot t\'a accompagné toute la semaine : ${w}.`,
  de: w => `Ein Wort blieb die ganze Woche bei dir: ${w}.`,
};

function pick<T extends Record<string, string>>(map: T, lang: string): string {
  return map[lang] ?? map.en ?? '';
}

export function getSmallMoments(insights: WeekInsights, lang: string): string[] {
  const moments: string[] = [];
  const l = lang in HARD_MOOD_MOMENT ? lang : 'en';

  // 1. Top category — only if a single category dominates clearly
  if (insights.topCategories.length > 0) {
    const top = insights.topCategories[0];
    const topCount = insights.categoryCounts[top] ?? 0;
    if (topCount >= 2 && CAT_MOMENT[top]) {
      moments.push(pick(CAT_MOMENT[top] as Record<string, string>, l));
    }
  }

  // 2. Dominant mood — only if it appeared multiple times
  if (insights.dominantMood === 'hard' && insights.moodCounts.hard >= 2) {
    moments.push(HARD_MOOD_MOMENT[l]);
  } else if (insights.dominantMood === 'good' && insights.moodCounts.good >= 2) {
    moments.push(GOOD_MOOD_MOMENT[l]);
  }

  // 3. Rhythm pattern — only for back/front loaded with enough data
  if (insights.resetsCompleted >= 3 && moments.length < 3) {
    if (insights.rhythmPattern === 'backLoaded') {
      moments.push(BACK_LOADED_MOMENT[l]);
    } else if (insights.rhythmPattern === 'frontLoaded') {
      moments.push(FRONT_LOADED_MOMENT[l]);
    }
  }

  // 4. Return after a skipped day (check for gap-then-return pattern)
  if (moments.length < 3 && insights.resetsCompleted >= 2) {
    const { days } = insights;
    const hadReturnAfterSkip = days.some((d, i) =>
      i > 0 && d.completed && !days[i - 1].completed
    );
    if (hadReturnAfterSkip) moments.push(RETURN_AFTER_SKIP[l]);
  }

  // 5. A single repeated word
  if (moments.length < 3 && insights.mostFrequentWord) {
    const fn = SINGLE_WORD_MOMENT[l] ?? SINGLE_WORD_MOMENT.en;
    moments.push(fn(insights.mostFrequentWord));
  }

  return moments.slice(0, 3);
}

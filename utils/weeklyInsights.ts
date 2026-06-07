// ─── Weekly Insights Engine ───────────────────────────────────────────────────
// Analyses a Mon-Sun calendar week and generates emotionally intelligent copy.
// All functions are pure — no side effects, no storage access.

import { DailyEntry } from './dailyEntries';
import type { EmotionalProfile } from './emotionalProfile';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserGoal = 'calm' | 'clarity' | 'confidence' | 'consistency' | 'presence' | 'balance';

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
  completedByDate?: Record<string, boolean | true>,
): WeekInsights {
  const days: WeekDayData[] = allDays.map((entry, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    // Use completedByDate as authoritative source when available — fixes off-by-one
    // errors where DailyEntry.completed may lag behind the completion record.
    const isCompleted = completedByDate
      ? !!completedByDate[dateKey]
      : (entry?.completed ?? false);
    return {
      dayIndex: i, dateKey, entry,
      completed: isCompleted,
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

// Human labels for each emotional state, matching DAILY_STATE_OPTIONS exactly.
// These are the authoritative display strings for all Weekly Summary sections.
const STATE_LABELS: Record<string, Record<string, string>> = {
  racing:      { en: 'Racing mind',     pt: 'Mente acelerada',   es: 'Mente acelerada',   fr: 'Esprit accéléré',  de: 'Rasende Gedanken' },
  tired:       { en: 'Tired',           pt: 'Com cansaço',       es: 'Con cansancio',     fr: 'Fatigué',          de: 'Müde'             },
  overwhelmed: { en: 'Overwhelmed',     pt: 'Sobrecarregado',    es: 'Abrumado',          fr: 'Débordé',          de: 'Überfordert'      },
  unclear:     { en: 'Unclear',         pt: 'Sem clareza',       es: 'Sin claridad',      fr: 'Sans clarté',      de: 'Ohne Klarheit'    },
  drained:     { en: 'Low energy',      pt: 'Sem energia',       es: 'Sin energía',       fr: 'Sans énergie',     de: 'Wenig Energie'    },
  balanced:    { en: 'Balanced',        pt: 'Em equilíbrio',     es: 'En equilibrio',     fr: 'En équilibre',     de: 'Im Gleichgewicht' },
};

// Neutral localized fallback — used when an unknown state key appears in storage.
// Never exposes the raw key to the user.
const UNKNOWN_STATE_LABEL: Record<string, string> = {
  en: 'An unnamed state',
  pt: 'Um estado não identificado',
  es: 'Un estado no identificado',
  fr: 'Un état non identifié',
  de: 'Ein unbekannter Zustand',
};

// Color for each state dot
export const STATE_DOT_COLOR: Record<string, string> = {
  racing:      '#C9806A',
  tired:       '#9B9B9B',
  overwhelmed: '#B87560',
  unclear:     '#7A8FA8',
  drained:     '#A89060',
  balanced:    '#7A9A82',
};
export function getStateLabel(state: string, lang: string): string {
  const entry = STATE_LABELS[state];
  if (entry) return entry[lang] ?? entry.en;
  return UNKNOWN_STATE_LABEL[lang] ?? UNKNOWN_STATE_LABEL.en;
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

// One sentence appended to state labels — describes what showed up DESPITE the state,
// not the state itself (SectionConnections already named the state).
// 3 variants per state, cycled by weekNumber.
const HOW_ARRIVED_STATE_NOTES: Record<string, L5> = {
  drained: {
    en: ['Energy was lower than expected this week.', 'There was less stamina available at many moments this week.', 'Depletion showed up more often than usual this week.'],
    pt: ['A energia esteve mais baixa do que o esperado nesta semana.', 'Havia menos fôlego disponível em vários momentos desta semana.', 'O esgotamento apareceu com mais frequência do que o habitual nesta semana.'],
    es: ['La energía estuvo más baja de lo esperado esta semana.', 'Había menos aliento disponible en varios momentos de esta semana.', 'El agotamiento apareció con más frecuencia de lo habitual esta semana.'],
    fr: ["L'énergie était plus basse que prévu cette semaine.", 'Il y avait moins de souffle disponible à de nombreux moments de cette semaine.', "L'épuisement s'est manifesté plus souvent que d'habitude cette semaine."],
    de: ['Die Energie war diese Woche niedriger als erwartet.', 'In vielen Momenten dieser Woche stand weniger Ausdauer zur Verfügung.', 'Erschöpfung zeigte sich diese Woche häufiger als gewöhnlich.'],
  },
  tired: {
    en: ['Tiredness was present through much of this week.', 'There was less energy available than usual this week.', 'The weight of tiredness followed many moments of this week.'],
    pt: ['O cansaço esteve presente em boa parte desta semana.', 'Havia menos energia disponível do que o habitual nesta semana.', 'O peso do cansaço acompanhou vários momentos desta semana.'],
    es: ['El cansancio estuvo presente durante gran parte de esta semana.', 'Había menos energía disponible de lo habitual esta semana.', 'El peso del cansancio acompañó varios momentos de esta semana.'],
    fr: ['La fatigue était présente pendant une bonne partie de cette semaine.', "Il y avait moins d'énergie disponible qu'à l'habitude cette semaine.", 'Le poids de la fatigue a accompagné de nombreux moments de cette semaine.'],
    de: ['Müdigkeit war einen Großteil dieser Woche präsent.', 'Diese Woche stand weniger Energie zur Verfügung als gewöhnlich.', 'Das Gewicht der Müdigkeit begleitete viele Momente dieser Woche.'],
  },
  racing: {
    en: ['Racing thoughts were present through much of this week.', 'The mind was fuller than quiet through this week.', 'There was a busier rhythm running through this week.'],
    pt: ['Pensamentos acelerados estiveram presentes durante boa parte desta semana.', 'A mente esteve mais cheia do que quieta ao longo desta semana.', 'Havia um ritmo mais acelerado nos bastidores desta semana.'],
    es: ['Los pensamientos acelerados estuvieron presentes durante gran parte de esta semana.', 'La mente estuvo más llena que tranquila a lo largo de esta semana.', 'Había un ritmo más acelerado durante esta semana.'],
    fr: ['Des pensées accélérées ont été présentes pendant une bonne partie de cette semaine.', "L'esprit était plus plein que calme tout au long de cette semaine.", 'Un rythme plus soutenu a traversé cette semaine.'],
    de: ['Rasende Gedanken waren einen Großteil dieser Woche präsent.', 'Der Geist war diese Woche voller als still.', 'Diese Woche hatte einen geschäftigeren Rhythmus im Hintergrund.'],
  },
  overwhelmed: {
    en: ['There were more demands than usual at some moments this week.', 'The weight of many things at once was present this week.', 'Some moments asked for more than felt easy to give this week.'],
    pt: ['Havia mais demandas do que o usual em alguns momentos desta semana.', 'O peso de muita coisa ao mesmo tempo esteve presente esta semana.', 'Alguns momentos pediram mais do que parecia fácil dar nesta semana.'],
    es: ['Había más demandas de lo usual en algunos momentos de esta semana.', 'El peso de muchas cosas a la vez estuvo presente esta semana.', 'Algunos momentos pidieron más de lo que parecía fácil dar esta semana.'],
    fr: ["Il y avait plus d'exigences qu'à l'habitude à certains moments de cette semaine.", 'Le poids de nombreuses choses à la fois était présent cette semaine.', 'Certains moments ont demandé plus que ce qui semblait facile à donner cette semaine.'],
    de: ['Es gab in einigen Momenten dieser Woche mehr Anforderungen als gewöhnlich.', 'Das Gewicht von vielem auf einmal war diese Woche präsent.', 'Einige Momente verlangten diese Woche mehr, als leicht zu geben schien.'],
  },
  unclear: {
    en: ['A lack of clarity was more present than usual this week.', "It wasn't always clear which direction to take this week.", 'Some things remained unanswered through moments of this week.'],
    pt: ['A falta de clareza esteve mais presente do que o habitual nesta semana.', 'Nem sempre foi fácil saber qual direção tomar nesta semana.', 'Algumas coisas ficaram sem resposta durante vários momentos desta semana.'],
    es: ['La falta de claridad estuvo más presente de lo habitual esta semana.', 'No siempre fue fácil saber qué dirección tomar esta semana.', 'Algunas cosas quedaron sin respuesta en varios momentos de esta semana.'],
    fr: ["Un manque de clarté était plus présent qu'à l'habitude cette semaine.", "La direction à prendre n'était pas toujours évidente cette semaine.", 'Certaines choses sont restées sans réponse à divers moments de cette semaine.'],
    de: ['Ein Mangel an Klarheit war diese Woche häufiger präsent als gewöhnlich.', 'Es war diese Woche nicht immer klar, welche Richtung einzuschlagen.', 'Einige Dinge blieben in verschiedenen Momenten dieser Woche unbeantwortet.'],
  },
  balanced: {
    en: ['A certain balance was present at many moments this week.', 'There was more steadiness than turbulence through this week.', 'The week brought a more balanced pace than usual.'],
    pt: ['Um certo equilíbrio esteve presente em vários momentos desta semana.', 'Houve mais estabilidade do que agitação ao longo desta semana.', 'A semana trouxe um ritmo mais equilibrado do que o habitual.'],
    es: ['Un cierto equilibrio estuvo presente en varios momentos de esta semana.', 'Hubo más estabilidad que agitación a lo largo de esta semana.', 'La semana trajo un ritmo más equilibrado de lo habitual.'],
    fr: ['Un certain équilibre était présent à de nombreux moments de cette semaine.', 'Il y avait plus de stabilité que de turbulences tout au long de cette semaine.', "La semaine a apporté un rythme plus équilibré qu'à l'habitude."],
    de: ['Ein gewisses Gleichgewicht war in vielen Momenten dieser Woche präsent.', 'Diese Woche gab es mehr Beständigkeit als Unruhe.', 'Die Woche brachte einen ausgeglicheneren Rhythmus als gewöhnlich.'],
  },
};

const HOW_ARRIVED_PATTERN_NOTES: Record<string, L5> = {
  mixed: {
    en: ["Each day brought something different this week."],
    pt: ['Cada dia trouxe algo diferente esta semana.'],
    es: ['Cada día trajo algo diferente esta semana.'],
    fr: ['Chaque jour a apporté quelque chose de différent cette semaine.'],
    de: ['Jeder Tag brachte diese Woche etwas anderes.'],
  },
  moved_between: {
    en: ['The week moved between pressure and tiredness in close measure.'],
    pt: ['A semana trouxe pressão e cansaço quase em igual medida.'],
    es: ['La semana trajo presión y cansancio casi en igual medida.'],
    fr: ['La semaine a alterné entre pression et fatigue en proportions proches.'],
    de: ['Die Woche bewegte sich zwischen Druck und Müdigkeit in nahezu gleichem Maß.'],
  },
  came_back_heavy: {
    en: ['Some days carried a noticeably heavier weight than others.'],
    pt: ['Alguns dias carregaram um peso visivelmente maior do que outros.'],
    es: ['Algunos días llevaron un peso visiblemente más pesado que otros.'],
    fr: ['Certains jours ont porté un poids visiblement plus lourd que les autres.'],
    de: ['Einige Tage trugen ein spürbar schwereres Gewicht als andere.'],
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
    en: ['You came back each day this week.', 'Not a single day was left out this week.', 'There was space for you in each day this week.'],
    pt: ['Você voltou todos os dias desta semana.', 'Nenhum dia ficou completamente de fora esta semana.', 'Houve espaço para você em cada dia desta semana.'],
    es: ['Regresaste cada día de esta semana.', 'Ningún día quedó fuera esta semana.', 'Hubo espacio para ti en cada día de esta semana.'],
    fr: ['Tu es revenu chaque jour cette semaine.', 'Aucun jour n\'est resté en dehors cette semaine.', 'Il y avait de l\'espace pour toi chaque jour cette semaine.'],
    de: ['Du bist jeden Tag dieser Woche zurückgekehrt.', 'Kein einziger Tag blieb diese Woche außen vor.', 'Diese Woche war jeden Tag Platz für dich.'],
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
  n7: { en: 'Each day this week had a small moment for you.', pt: 'Houve um momento seu em cada dia desta semana.', es: 'Cada día de esta semana tuvo un pequeño momento tuyo.', fr: 'Chaque jour de cette semaine a eu son petit moment pour toi.', de: 'Jeder Tag dieser Woche hatte einen kleinen Moment für dich.' },
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
    { en: ['The smaller moments of this week tend to go unnoticed.', 'Calm creates the space to see them.'],
      pt: ['Os momentos menores desta semana tendem a passar despercebidos.', 'A calma cria espaço para vê-los.'],
      es: ['Los momentos más pequeños de esta semana tienden a pasar desapercibidos.', 'La calma crea el espacio para verlos.'],
      fr: ['Les petits moments de cette semaine ont tendance à passer inaperçus.', 'Le calme crée l\'espace pour les voir.'],
      de: ['Die kleineren Momente dieser Woche neigen dazu, unbemerkt zu bleiben.', 'Ruhe schafft den Raum, um sie zu sehen.'] },
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
  // 7/7 completions — quiet observation about what's inside the fullness, not a repeat of the count
  _7of7: [
    { en: ['Seven days — each one different.', 'Not all of them were easy to be present in.', 'That detail tends to get lost in the count.'],
      pt: ['Sete dias — cada um diferente.', 'Nem todos foram fáceis de estar presente.', 'Esse detalhe tende a se perder na contagem.'],
      es: ['Siete días — cada uno diferente.', 'No todos fueron fáciles para estar presente.', 'Ese detalle tiende a perderse en el recuento.'],
      fr: ['Sept jours — chacun différent.', "Pas tous faciles pour être présent.", 'Ce détail a tendance à se perdre dans le compte.'],
      de: ['Sieben Tage — jeder anders.', 'Nicht alle waren leicht, präsent zu sein.', 'Dieses Detail geht in der Zählung verloren.'] },
    { en: ['A full week — and still, some moments passed quietly.', "Presence doesn't mean everything was noticed.", 'Some things only appear when you keep showing up.'],
      pt: ['Uma semana inteira — e ainda assim, alguns momentos passaram em silêncio.', 'Presença não significa que tudo foi notado.', 'Algumas coisas só aparecem quando você continua aparecendo.'],
      es: ['Una semana completa — y aun así, algunos momentos pasaron en silencio.', 'Presencia no significa que todo fue notado.', 'Algunas cosas solo aparecen cuando sigues apareciendo.'],
      fr: ['Une semaine complète — et pourtant, certains moments sont passés silencieusement.', "La présence ne signifie pas que tout a été remarqué.", 'Certaines choses ne se montrent que quand tu continues de te présenter.'],
      de: ['Eine volle Woche — und trotzdem vergingen einige Momente still.', 'Präsenz bedeutet nicht, dass alles bemerkt wurde.', 'Manche Dinge zeigen sich erst, wenn du weiter erscheinst.'] },
    { en: ['Not every day of this week felt the same.', 'The count looks clean from the outside.', 'You were the one feeling the difference.'],
      pt: ['Nem todo dia desta semana pareceu igual.', 'A contagem parece limpa de fora.', 'Você foi quem sentiu a diferença.'],
      es: ['No todos los días de esta semana se sintieron igual.', 'El recuento parece limpio desde afuera.', 'Tú fuiste quien sintió la diferencia.'],
      fr: ['Tous les jours de cette semaine ne se sont pas sentis pareils.', 'Le compte semble propre de l\'extérieur.', 'Tu étais celui qui ressentait la différence.'],
      de: ['Nicht jeder Tag dieser Woche fühlte sich gleich an.', 'Die Zählung sieht von außen sauber aus.', 'Du warst derjenige, der den Unterschied spürte.'] },
    { en: ['Completing a week is visible.', "What it cost, or what it gave — less so.", 'That part only you carry.'],
      pt: ['Completar uma semana é visível.', 'O que custou, ou o que deu — menos.', 'Essa parte só você carrega.'],
      es: ['Completar una semana es visible.', 'Lo que costó, o lo que dio — menos.', 'Esa parte solo tú la cargas.'],
      fr: ['Compléter une semaine est visible.', 'Ce qu\'elle a coûté, ou ce qu\'elle a donné — moins.', 'Cette partie, seul toi la portes.'],
      de: ['Eine Woche abzuschließen ist sichtbar.', 'Was sie kostete oder was sie gab — weniger.', 'Diesen Teil trägst nur du.'] },
    { en: ['Each day this week happened in its own way.', 'Being present throughout doesn\'t mean every day felt the same.', 'Worth noticing.'],
      pt: ['Cada dia desta semana aconteceu do seu jeito.', 'Estar presente em todos não significa que todos foram iguais.', 'Vale notar.'],
      es: ['Cada día de esta semana ocurrió a su manera.', 'Estar presente en todos no significa que todos se sintieron igual.', 'Vale la pena notarlo.'],
      fr: ['Chaque jour de cette semaine s\'est passé à sa façon.', 'Être présent tout au long ne signifie pas que tous les jours se sont sentis pareils.', 'Ça vaut la peine de le noter.'],
      de: ['Jeder Tag dieser Woche geschah auf seine eigene Weise.', 'Durchgehend präsent zu sein bedeutet nicht, dass sich alle Tage gleich anfühlten.', 'Es lohnt sich, das zu bemerken.'] },
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
    { en: ['The week moved along without announcement.', 'You kept your rhythm through it.'],
      pt: ['A semana avançou sem anúncios.', 'Você manteve seu ritmo ao longo dela.'],
      es: ['La semana avanzó sin anuncios.', 'Mantuviste tu ritmo a lo largo de ella.'],
      fr: ['La semaine a avancé sans annonce.', 'Tu as maintenu ton rythme à travers elle.'],
      de: ['Die Woche verlief ohne Ankündigung.', 'Du hieltest deinen Rhythmus dabei aufrecht.'] },
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
  if (insights.resetsCompleted >= 5) return '_high';
  if (insights.resetsCompleted >= 3) return '_medium';
  return '_low';
}

// Profile-toned suffix lines appended when the base observation has 2 lines.
// The profile is never named — only the closing note changes in emphasis.
const QUIET_OBS_PROFILE_SUFFIX: Record<EmotionalProfile, L5> = {
  burnout: {
    en: ["You came back anyway.", "That's the whole thing."],
    pt: ["Você voltou mesmo assim.", "Isso é tudo."],
    es: ["Regresaste de todas formas.", "Eso es todo."],
    fr: ["Tu es revenu quand même.", "C'est l'essentiel."],
    de: ["Du bist trotzdem zurückgekehrt.", "Das ist alles."],
  },
  calm: {
    en: ["The quiet was part of it.", "That's not a small thing."],
    pt: ["O silêncio fez parte disso.", "Isso não é pouca coisa."],
    es: ["El silencio fue parte de ello.", "Eso no es poca cosa."],
    fr: ["Le calme en faisait partie.", "Ce n'est pas une petite chose."],
    de: ["Die Stille war ein Teil davon.", "Das ist keine Kleinigkeit."],
  },
  focus: {
    en: ["Your attention kept returning.", "That's what focus actually is."],
    pt: ["Sua atenção continuou voltando.", "É isso que o foco realmente é."],
    es: ["Tu atención seguía volviendo.", "Eso es lo que el enfoque realmente es."],
    fr: ["Ton attention revenait sans cesse.", "C'est ça le vrai focus."],
    de: ["Deine Aufmerksamkeit kehrte immer zurück.", "Das ist echter Fokus."],
  },
  confidence: {
    en: ["You were here.", "A week like this is evidence of something."],
    pt: ["Você estava aqui.", "Uma semana como esta é evidência de algo."],
    es: ["Estabas aquí.", "Una semana como esta es evidencia de algo."],
    fr: ["Tu étais là.", "Une semaine comme celle-ci est la preuve de quelque chose."],
    de: ["Du warst da.", "Eine Woche wie diese ist Beweis für etwas."],
  },
};

// Narrative state tone-modifier lines for "A Quiet Observation".
// Appended as a closing line when the base pool has < 3 lines and profile
// hasn't already filled the slot. Never overrides data-driven content.
type NarrativeToneEntry = { en: string; pt: string; es: string; fr: string; de: string };

const NARRATIVE_TONE_OBS: Record<string, NarrativeToneEntry[]> = {
  first_week: [
    { pt: 'Toda jornada tem um começo.', en: 'Every journey starts somewhere.', es: 'Todo viaje tiene un comienzo.', fr: 'Tout voyage commence quelque part.', de: 'Jede Reise beginnt irgendwo.' },
    { pt: 'Esta semana foi a primeira.', en: 'This was the first week.', es: 'Esta fue la primera semana.', fr: "C'était la première semaine.", de: 'Dies war die erste Woche.' },
    { pt: 'Há um começo em tudo isso.', en: "There's a beginning in all of this.", es: 'Hay un comienzo en todo esto.', fr: 'Il y a un début dans tout cela.', de: 'In all dem steckt ein Anfang.' },
  ],
  breakthrough: [
    { pt: 'Há semanas que ficam na memória do caminho.', en: 'Some weeks stay in the memory of the journey.', es: 'Hay semanas que quedan en la memoria del camino.', fr: 'Certaines semaines restent dans la mémoire du chemin.', de: 'Manche Wochen bleiben im Gedächtnis des Weges.' },
    { pt: 'Esta semana teve uma textura diferente das outras.', en: 'This week had a different texture than most.', es: 'Esta semana tuvo una textura diferente a las demás.', fr: 'Cette semaine avait une texture différente des autres.', de: 'Diese Woche hatte eine andere Textur als die meisten anderen.' },
    { pt: 'Há semanas que não precisam ser explicadas.', en: 'Some weeks need no explanation.', es: 'Hay semanas que no necesitan explicación.', fr: "Il y a des semaines qui n'ont pas besoin d'explication.", de: 'Manche Wochen brauchen keine Erklärung.' },
  ],
  high_consistency: [
    { pt: 'Algumas coisas continuaram presentes.', en: 'Some things stayed present.', es: 'Algunas cosas se mantuvieron presentes.', fr: 'Certaines choses sont restées présentes.', de: 'Einige Dinge blieben präsent.' },
    { pt: 'Nem tudo mudou de uma vez.', en: 'Not everything changed at once.', es: 'No todo cambió de una vez.', fr: "Tout n'a pas changé d'un coup.", de: 'Nicht alles änderte sich auf einmal.' },
    { pt: 'O ritmo parece ter encontrado alguma estabilidade.', en: 'The rhythm seemed to find some steadiness.', es: 'El ritmo parece haber encontrado cierta estabilidad.', fr: 'Le rythme semble avoir trouvé une certaine stabilité.', de: 'Der Rhythmus schien etwas Stabilität gefunden zu haben.' },
  ],
  momentum: [
    { pt: 'Tem havido continuidade neste processo.', en: 'There has been continuity in this process.', es: 'Ha habido continuidad en este proceso.', fr: 'Il y a eu de la continuité dans ce processus.', de: 'In diesem Prozess gab es Kontinuität.' },
    { pt: 'Nem toda semana precisa ser completa para importar.', en: 'Not every week needs to be full to matter.', es: 'No toda semana necesita estar completa para importar.', fr: "Toutes les semaines n'ont pas besoin d'être complètes pour compter.", de: 'Nicht jede Woche muss vollständig sein, um zu zählen.' },
    { pt: 'Há algo se formando ao longo do caminho.', en: 'Something is taking shape along the way.', es: 'Algo se está formando en el camino.', fr: 'Quelque chose se forme en chemin.', de: 'Etwas nimmt unterwegs Gestalt an.' },
  ],
  comeback: [
    { pt: 'Alguma coisa continuou viva entre uma semana e outra.', en: 'Something stayed alive from one week to the next.', es: 'Algo siguió vivo de una semana a la siguiente.', fr: "Quelque chose est resté vivant d'une semaine à l'autre.", de: 'Etwas blieb von einer Woche zur nächsten lebendig.' },
    { pt: 'Nem toda retomada faz barulho.', en: 'Not every return makes noise.', es: 'No todo regreso hace ruido.', fr: 'Tout retour ne fait pas de bruit.', de: 'Nicht jede Rückkehr macht Lärm.' },
    { pt: 'Mesmo depois de dias mais quietos, você encontrou um caminho de volta.', en: 'Even after quieter days, you found a way back.', es: 'Incluso después de días más tranquilos, encontraste un camino de regreso.', fr: 'Même après des jours plus calmes, vous avez trouvé un chemin de retour.', de: 'Auch nach ruhigeren Tagen hast du einen Weg zurückgefunden.' },
  ],
  low_activity: [
    { pt: 'Algumas semanas ocupam menos espaço, e tudo bem.', en: 'Some weeks take up less space, and that is okay.', es: 'Algunas semanas ocupan menos espacio, y está bien.', fr: "Certaines semaines prennent moins de place, et c'est bien.", de: 'Manche Wochen nehmen weniger Platz ein, und das ist in Ordnung.' },
    { pt: 'Nem toda semana pede a mesma energia.', en: 'Not every week asks for the same energy.', es: 'No toda semana pide la misma energía.', fr: "Toutes les semaines ne demandent pas la même énergie.", de: 'Nicht jede Woche fordert dieselbe Energie.' },
    { pt: 'O ritmo ficou mais leve desta vez.', en: 'The rhythm was lighter this time.', es: 'El ritmo fue más ligero esta vez.', fr: 'Le rythme était plus léger cette fois.', de: 'Der Rhythmus war diesmal leichter.' },
  ],
};

export function getQuietObservation(insights: WeekInsights, lang: string, weekNumber: number = 1, profile?: EmotionalProfile | null, narrativeState?: string | null, usedThemes?: Set<string>): string[] {
  let key = quietObsPoolKey(insights);
  // If 'return' was already the protagonist in Overview/Connections and this is a _7of7 week,
  // the _7of7 pool already focuses on a different angle — no redirect needed.
  // usedThemes is available for future guards against other theme repetitions.
  const pools = QUIET_OBS[key];
  const pool  = pools[(weekNumber - 1) % pools.length];
  const l     = (lang in pool ? lang : 'en') as keyof L5;
  let result  = pool[l] as string[];

  if (profile && result.length < 3) {
    const suffix = QUIET_OBS_PROFILE_SUFFIX[profile];
    const sl = (lang in suffix ? lang : 'en') as keyof L5;
    const suffixLines = suffix[sl] as string[];
    const slotsLeft = 3 - result.length;
    result = [...result, ...suffixLines.slice(0, slotsLeft)];
  }

  // Narrative state: append a tone-context line if there is still space
  if (narrativeState && result.length < 3) {
    const tonePool = NARRATIVE_TONE_OBS[narrativeState];
    if (tonePool) {
      const entry = tonePool[(weekNumber - 1) % tonePool.length];
      result = [...result, (entry as Record<string, string>)[lang] ?? entry.en];
    }
  }

  return result;
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
  { en: ["There's nothing to prepare.", 'The next week arrives when it does.'],
    pt: ['Não há nada a preparar.', 'A próxima semana chega quando chega.'],
    es: ['No hay nada que preparar.', 'La próxima semana llega cuando llega.'],
    fr: ["Il n'y a rien à préparer.", 'La prochaine semaine arrive quand elle arrive.'],
    de: ['Es gibt nichts vorzubereiten.', 'Die nächste Woche kommt, wenn sie kommt.'] },
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
  { en: ['Each week finds its own pace.', 'The next one will too.'],
    pt: ['Cada semana encontra seu próprio ritmo.', 'A próxima também vai encontrar.'],
    es: ['Cada semana encuentra su propio ritmo.', 'La próxima también lo encontrará.'],
    fr: ['Chaque semaine trouve son propre rythme.', 'La prochaine aussi.'],
    de: ['Jede Woche findet ihr eigenes Tempo.', 'Die nächste wird es auch.'] },
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
  low_resets: [
    { en: ['The week existed — even without many check-ins.', 'The next one will arrive as it always does.'],
      pt: ['A semana existiu — mesmo sem muitos check-ins.', 'A próxima vai chegar como sempre faz.'],
      es: ['La semana existió — aunque sin muchos check-ins.', 'La próxima llegará como siempre lo hace.'],
      fr: ["La semaine a existé — même sans beaucoup de retours.", 'La suivante arrivera comme toujours.'],
      de: ['Die Woche existierte — auch ohne viele Check-ins.', 'Die nächste wird kommen wie immer.'] },
    { en: ['Some weeks are quieter than others.', 'The next one can begin from wherever this one left things.'],
      pt: ['Algumas semanas são mais quietas do que outras.', 'A próxima pode começar de onde esta deixou as coisas.'],
      es: ['Algunas semanas son más tranquilas que otras.', 'La próxima puede comenzar desde donde esta dejó las cosas.'],
      fr: ["Certaines semaines sont plus calmes que d'autres.", "La suivante peut commencer là où celle-ci a laissé les choses."],
      de: ['Manche Wochen sind ruhiger als andere.', 'Die nächste kann dort beginnen, wo diese die Dinge gelassen hat.'] },
  ],
  medium_resets: [
    { en: ['You were here for some of it.', 'The next week begins from that.'],
      pt: ['Você esteve aqui em parte dela.', 'A próxima semana começa a partir disso.'],
      es: ['Estuviste aquí en parte de ella.', 'La próxima semana comienza desde ahí.'],
      fr: ['Tu étais là pour une partie de cette semaine.', 'La suivante commence à partir de là.'],
      de: ['Du warst für einen Teil davon hier.', 'Die nächste Woche beginnt davon aus.'] },
    { en: ['Not every week lands the same way.', 'The next one will have its own shape.'],
      pt: ['Nem toda semana pousa do mesmo jeito.', 'A próxima terá sua própria forma.'],
      es: ['No cada semana aterriza de la misma manera.', 'La próxima tendrá su propia forma.'],
      fr: ["Toutes les semaines ne se posent pas de la même façon.", 'La suivante aura sa propre forme.'],
      de: ['Nicht jede Woche landet auf die gleiche Weise.', 'Die nächste wird ihre eigene Form haben.'] },
  ],
};

function lookingAheadContext(insights: WeekInsights): string {
  const { topCategories, dominantState, skippedCount, resetsCompleted } = insights;
  const topCat = topCategories[0];
  if (skippedCount >= 4) return 'skipped_heavy';
  if (dominantState === 'overwhelmed' || dominantState === 'racing') return 'pressure_heavy';
  if (topCat === 'Rest' || topCat === 'Calm' || dominantState === 'tired' || dominantState === 'drained') return 'rest_heavy';
  if (topCat === 'Clarity' || dominantState === 'unclear') return 'clarity_seeking';
  if (resetsCompleted >= 5) return 'steady';
  if (resetsCompleted <= 2) return 'low_resets';
  return 'medium_resets';
}

// ─── Goal relevance helper ────────────────────────────────────────────────────
// Picks the single most contextually relevant UserGoal for the current week.
// When multiple goals were saved, affinity with topCategory and dominantState
// decides — otherwise first goal in user's list is returned.

const GOAL_CAT_AFFINITY: Partial<Record<string, UserGoal>> = {
  Calm: 'calm', Focus: 'clarity', Rest: 'balance', Rhythm: 'consistency',
  Courage: 'confidence', Clarity: 'clarity', Momentum: 'consistency', Discipline: 'consistency',
};

const GOAL_STATE_AFFINITY: Partial<Record<string, UserGoal>> = {
  overwhelmed: 'calm', drained: 'balance', tired: 'calm', racing: 'calm', unclear: 'clarity',
};

const VALID_GOALS = new Set<UserGoal>(['calm','clarity','confidence','consistency','presence','balance']);

export function pickRelevantGoal(rawGoals: string[], insights: WeekInsights): UserGoal | null {
  const goals = rawGoals.filter((g): g is UserGoal => VALID_GOALS.has(g as UserGoal));
  if (goals.length === 0) return null;
  if (goals.length === 1) return goals[0];
  const byCategory = GOAL_CAT_AFFINITY[insights.topCategories[0] ?? ''];
  if (byCategory && goals.includes(byCategory)) return byCategory;
  const byState = GOAL_STATE_AFFINITY[insights.dominantState ?? ''];
  if (byState && goals.includes(byState)) return byState;
  return goals[0];
}

// Profile-specific Looking Ahead pools — 3 pools per profile, cycled by weekNumber.
// When profile is set, these replace the generic pool entirely.
// Tone rule: profile pool must feel like a different person wrote it, not a different label.
const LOOKING_AHEAD_PROFILE: Record<EmotionalProfile, L5[]> = {
  burnout: [
    { en: ["You don't need to resolve next week now.", "It will begin when it begins."],
      pt: ["Você não precisa resolver a próxima semana agora.", "Ela vai começar quando começar."],
      es: ["No tienes que resolver la próxima semana ahora.", "Comenzará cuando comience."],
      fr: ["Tu n'as pas besoin de résoudre la semaine prochaine maintenant.", "Elle commencera quand elle commencera."],
      de: ["Du musst die nächste Woche nicht jetzt lösen.", "Sie beginnt, wenn sie beginnt."] },
    { en: ["The next week doesn't need to be bigger than this one.", "It carries its own weight."],
      pt: ["A próxima semana não precisa ser maior do que esta.", "Ela carrega seu próprio peso."],
      es: ["La próxima semana no necesita ser más grande que esta.", "Lleva su propio peso."],
      fr: ["La semaine prochaine n'a pas besoin d'être plus grande que celle-ci.", "Elle porte son propre poids."],
      de: ["Die nächste Woche muss nicht größer sein als diese.", "Sie trägt ihr eigenes Gewicht."] },
    { en: ["Recovery doesn't follow a schedule.", "Next week will be what it can be."],
      pt: ["A recuperação não segue um cronograma.", "A próxima semana será o que puder ser."],
      es: ["La recuperación no sigue un horario.", "La próxima semana será lo que pueda ser."],
      fr: ["La récupération ne suit pas de calendrier.", "La semaine prochaine sera ce qu'elle peut être."],
      de: ["Erholung folgt keinem Zeitplan.", "Die nächste Woche wird sein, was sie sein kann."] },
  ],
  calm: [
    { en: ["Let next week arrive at its own pace.", "No need to reach for it."],
      pt: ["Deixe a próxima semana chegar no seu próprio ritmo.", "Não há necessidade de buscá-la."],
      es: ["Deja que la próxima semana llegue a su propio ritmo.", "No hay necesidad de alcanzarla."],
      fr: ["Laisse la semaine prochaine arriver à son propre rythme.", "Pas besoin de la chercher."],
      de: ["Lass die nächste Woche in ihrem eigenen Tempo ankommen.", "Es gibt keinen Grund, danach zu greifen."] },
    { en: ["Quiet continues into next week.", "That's allowed."],
      pt: ["O silêncio continua na próxima semana.", "Isso é permitido."],
      es: ["La quietud continúa en la próxima semana.", "Eso está bien."],
      fr: ["Le calme continue jusqu'à la semaine prochaine.", "C'est permis."],
      de: ["Die Stille geht in die nächste Woche über.", "Das ist erlaubt."] },
    { en: ["Next week can begin as quietly as this one ends.", "There's no need for it to be different."],
      pt: ["A próxima semana pode começar tão quietamente quanto esta termina.", "Não há necessidade de ser diferente."],
      es: ["La próxima semana puede comenzar tan tranquila como esta termina.", "No necesita ser diferente."],
      fr: ["La semaine prochaine peut commencer aussi calmement que celle-ci se termine.", "Pas besoin qu'elle soit différente."],
      de: ["Die nächste Woche kann so ruhig beginnen, wie diese endet.", "Sie muss nicht anders sein."] },
  ],
  focus: [
    { en: ["The next week holds its own thread.", "It can begin where attention naturally goes."],
      pt: ["A próxima semana tem seu próprio fio.", "Ela pode começar onde a atenção naturalmente vai."],
      es: ["La próxima semana tiene su propio hilo.", "Puede comenzar donde la atención vaya naturalmente."],
      fr: ["La semaine prochaine a son propre fil.", "Elle peut commencer là où l'attention va naturellement."],
      de: ["Die nächste Woche hat ihren eigenen Faden.", "Sie kann dort beginnen, wo die Aufmerksamkeit natürlich hingeht."] },
    { en: ["Not everything needs to be carried forward.", "Keep only what still matters."],
      pt: ["Nem tudo precisa ser carregado adiante.", "Fique apenas com o que ainda importa."],
      es: ["No todo necesita seguir adelante.", "Quédate solo con lo que todavía importa."],
      fr: ["Tout n'a pas besoin d'avancer.", "Garde seulement ce qui compte encore."],
      de: ["Nicht alles muss weitergeführt werden.", "Behalte nur das, was noch wichtig ist."] },
    { en: ["Some clarity takes another week to arrive.", "Let it."],
      pt: ["Algumas claridades levam mais uma semana para chegar.", "Deixe-as chegar."],
      es: ["Algunas claridades tardan una semana más en llegar.", "Deja que lleguen."],
      fr: ["Certaines clarifications prennent encore une semaine pour arriver.", "Laisse-les venir."],
      de: ["Manche Klarheit braucht noch eine Woche, um anzukommen.", "Lass es zu."] },
  ],
  confidence: [
    { en: ["Small things accumulate.", "Next week is another one of them."],
      pt: ["Coisas pequenas se acumulam.", "A próxima semana é mais uma delas."],
      es: ["Las cosas pequeñas se acumulan.", "La próxima semana es otra de ellas."],
      fr: ["Les petites choses s'accumulent.", "La semaine prochaine en est une autre."],
      de: ["Kleine Dinge häufen sich an.", "Die nächste Woche ist eine weitere davon."] },
    { en: ["What was practiced this week doesn't disappear.", "It goes forward with you."],
      pt: ["O que foi praticado esta semana não desaparece.", "Vai com você para frente."],
      es: ["Lo que se practicó esta semana no desaparece.", "Va contigo hacia adelante."],
      fr: ["Ce qui a été pratiqué cette semaine ne disparaît pas.", "Ça avance avec toi."],
      de: ["Was diese Woche geübt wurde, verschwindet nicht.", "Es geht mit dir weiter."] },
    { en: ["Next week begins with what this one built.", "Even when that's hard to see."],
      pt: ["A próxima semana começa com o que esta construiu.", "Mesmo quando é difícil de ver."],
      es: ["La próxima semana comienza con lo que esta construyó.", "Incluso cuando es difícil de ver."],
      fr: ["La semaine prochaine commence avec ce que celle-ci a construit.", "Même quand c'est difficile à voir."],
      de: ["Die nächste Woche beginnt mit dem, was diese aufgebaut hat.", "Auch wenn das schwer zu erkennen ist."] },
  ],
};

// Goal-specific Looking Ahead pools — 3 pools per goal, cycled by weekNumber.
// When goal is set, takes priority over profile. Vocabulary follows the goal's
// emotional territory without naming it.
const LOOKING_AHEAD_GOAL: Record<UserGoal, L5[]> = {
  calm: [
    { en: ["Next week doesn't need to be won.", "It just needs a few places to breathe."],
      pt: ["A próxima semana não precisa ser vencida.", "Ela só precisa de alguns lugares para respirar."],
      es: ["La próxima semana no necesita ser ganada.", "Solo necesita algunos lugares para respirar."],
      fr: ["La semaine prochaine n'a pas besoin d'être gagnée.", "Elle a juste besoin de quelques espaces pour respirer."],
      de: ["Die nächste Woche muss nicht gewonnen werden.", "Sie braucht nur ein paar Stellen zum Atmen."] },
    { en: ["Let next week arrive at its own pace.", "That's the kind of space you came here looking for."],
      pt: ["Deixe a próxima semana chegar no seu ritmo.", "É esse tipo de espaço que trouxe você aqui."],
      es: ["Deja que la próxima semana llegue a su propio ritmo.", "Es ese tipo de espacio que te trajo aquí."],
      fr: ["Laisse la semaine prochaine arriver à son rythme.", "C'est ce genre d'espace que tu es venu chercher ici."],
      de: ["Lass die nächste Woche in ihrem eigenen Tempo ankommen.", "Das ist die Art von Raum, nach der du hierher gekommen bist."] },
    { en: ["Even one softer moment next week counts.", "You don't have to earn the rest."],
      pt: ["Mesmo um momento mais suave na próxima semana já conta.", "Você não precisa merecer o descanso."],
      es: ["Incluso un momento más suave la próxima semana cuenta.", "No tienes que ganarte el descanso."],
      fr: ["Même un moment plus doux la semaine prochaine compte.", "Tu n'as pas à mériter le repos."],
      de: ["Selbst ein weicherer Moment in der nächsten Woche zählt.", "Du musst die Ruhe nicht verdienen."] },
  ],
  clarity: [
    { en: ["Next week may not bring all the answers.", "But it might bring a slightly clearer question."],
      pt: ["A próxima semana pode não trazer todas as respostas.", "Mas pode trazer uma pergunta um pouco mais clara."],
      es: ["La próxima semana puede no traer todas las respuestas.", "Pero puede traer una pregunta un poco más clara."],
      fr: ["La semaine prochaine n'apportera peut-être pas toutes les réponses.", "Mais elle pourrait apporter une question un peu plus claire."],
      de: ["Die nächste Woche bringt vielleicht nicht alle Antworten.", "Aber vielleicht eine etwas klarere Frage."] },
    { en: ["Clarity tends to arrive slowly.", "Next week is another chance for something to become a little more visible."],
      pt: ["A clareza costuma chegar devagar.", "A próxima semana é mais uma chance de algo se tornar um pouco mais visível."],
      es: ["La claridad suele llegar despacio.", "La próxima semana es otra oportunidad de que algo se vuelva un poco más visible."],
      fr: ["La clarté a tendance à arriver lentement.", "La semaine prochaine est une autre chance pour que quelque chose devienne un peu plus visible."],
      de: ["Klarheit kommt langsam.", "Die nächste Woche ist eine weitere Chance, dass etwas ein wenig sichtbarer wird."] },
    { en: ["Not everything needs to make sense at once.", "Next week, some things might settle a little more."],
      pt: ["Nem tudo precisa fazer sentido de uma vez.", "Na próxima semana, algumas coisas podem se assentar um pouco mais."],
      es: ["No todo tiene que tener sentido a la vez.", "La próxima semana, algunas cosas pueden asentarse un poco más."],
      fr: ["Tout n'a pas besoin d'avoir un sens en même temps.", "La semaine prochaine, certaines choses pourraient s'établir un peu plus."],
      de: ["Nicht alles muss auf einmal Sinn ergeben.", "In der nächsten Woche könnten sich manche Dinge ein wenig mehr setzen."] },
  ],
  confidence: [
    { en: ["Confidence doesn't have to arrive whole.", "Next week is another small piece of it."],
      pt: ["A confiança não precisa chegar inteira.", "A próxima semana é mais um pequeno pedaço dela."],
      es: ["La confianza no tiene que llegar entera.", "La próxima semana es otra pequeña parte de ella."],
      fr: ["La confiance n'a pas besoin d'arriver entière.", "La semaine prochaine en sera un autre petit morceau."],
      de: ["Vertrauen muss nicht vollständig ankommen.", "Die nächste Woche ist ein weiteres kleines Stück davon."] },
    { en: ["What you practiced this week doesn't disappear.", "It goes forward with you, quietly."],
      pt: ["O que você praticou esta semana não desaparece.", "Vai com você para frente, silenciosamente."],
      es: ["Lo que practicaste esta semana no desaparece.", "Va contigo hacia adelante, silenciosamente."],
      fr: ["Ce que tu as pratiqué cette semaine ne disparaît pas.", "Ça avance avec toi, silencieusement."],
      de: ["Was du diese Woche geübt hast, verschwindet nicht.", "Es geht still mit dir weiter."] },
    { en: ["Next week is another seven days.", "They carry their own quiet weight."],
      pt: ["A próxima semana são mais sete dias.", "Eles carregam seu próprio peso quieto."],
      es: ["La próxima semana son otros siete días.", "Llevan su propio peso tranquilo."],
      fr: ["La semaine prochaine, c'est encore sept jours.", "Ils portent leur propre poids tranquille."],
      de: ["Die nächste Woche sind weitere sieben Tage.", "Sie tragen ihr eigenes stilles Gewicht."] },
  ],
  consistency: [
    { en: ["Next week starts as its own open space.", "What you bring to it doesn't need to be perfect."],
      pt: ["A próxima semana começa como seu próprio espaço aberto.", "O que você traz para ela não precisa ser perfeito."],
      es: ["La próxima semana comienza como su propio espacio abierto.", "Lo que llevas a ella no necesita ser perfecto."],
      fr: ["La semaine prochaine commence comme son propre espace ouvert.", "Ce que tu y apportes n'a pas besoin d'être parfait."],
      de: ["Die nächste Woche beginnt als ihr eigener offener Raum.", "Was du mitbringst, muss nicht perfekt sein."] },
    { en: ["Next week will arrive.", "And it will have its own shape."],
      pt: ["A próxima semana vai chegar.", "E ela terá sua própria forma."],
      es: ["La próxima semana llegará.", "Y tendrá su propia forma."],
      fr: ["La semaine prochaine arrivera.", "Et elle aura sa propre forme."],
      de: ["Die nächste Woche wird kommen.", "Und sie wird ihre eigene Form haben."] },
    { en: ["Next week doesn't need to be figured out in advance.", "It arrives as it does."],
      pt: ["A próxima semana não precisa ser resolvida com antecedência.", "Ela chega como chegar."],
      es: ["La próxima semana no necesita ser descifrada de antemano.", "Llega como llega."],
      fr: ["La semaine prochaine n'a pas besoin d'être anticipée.", "Elle arrive comme elle arrive."],
      de: ["Du musst nicht perfekt erscheinen.", "Mach einfach weiter, wie bisher."] },
  ],
  presence: [
    { en: ["Next week, a few moments of noticing are enough.", "You don't have to catch everything."],
      pt: ["Na próxima semana, alguns momentos de perceber já são suficientes.", "Você não precisa capturar tudo."],
      es: ["La próxima semana, unos pocos momentos de notar son suficientes.", "No tienes que captarlo todo."],
      fr: ["La semaine prochaine, quelques moments d'attention suffisent.", "Tu n'as pas à tout saisir."],
      de: ["Nächste Woche reichen ein paar Momente des Wahrnehmens.", "Du musst nicht alles erfassen."] },
    { en: ["Next week will have its own quiet moments.", "And its less quiet ones too."],
      pt: ["A próxima semana terá seus próprios momentos quietos.", "E os menos quietos também."],
      es: ["La próxima semana tendrá sus propios momentos tranquilos.", "Y los menos tranquilos también."],
      fr: ["La semaine prochaine aura ses propres moments calmes.", "Et ses moments moins calmes aussi."],
      de: ["In der nächsten Woche hier zu sein — auch an den ruhigeren Tagen — ist noch Präsenz.", "Das ist es, wonach du gesucht hast."] },
    { en: ["Small presence is still presence.", "Next week will offer its own small moments of it."],
      pt: ["Pequena presença ainda é presença.", "A próxima semana vai oferecer seus próprios pequenos momentos disso."],
      es: ["La pequeña presencia sigue siendo presencia.", "La próxima semana ofrecerá sus propios pequeños momentos de ella."],
      fr: ["Une petite présence, c'est encore de la présence.", "La semaine prochaine offrira ses propres petits moments."],
      de: ["Kleine Präsenz ist immer noch Präsenz.", "Die nächste Woche bietet ihre eigenen kleinen Momente davon."] },
  ],
  balance: [
    { en: ["Next week doesn't have to tip too far in any direction.", "One steadier day is a start."],
      pt: ["A próxima semana não precisa pender demais em nenhuma direção.", "Um dia mais estável já é um começo."],
      es: ["La próxima semana no tiene que inclinarse demasiado en ninguna dirección.", "Un día más estable ya es un comienzo."],
      fr: ["La semaine prochaine n'a pas besoin de trop pencher dans un sens.", "Un jour plus stable, c'est un début."],
      de: ["Die nächste Woche muss sich nicht zu weit in eine Richtung neigen.", "Ein ruhigerer Tag ist ein Anfang."] },
    { en: ["Something more sustainable doesn't build all at once.", "Next week is another piece of it."],
      pt: ["Algo mais sustentável não se constrói de uma vez.", "A próxima semana é mais um pedaço disso."],
      es: ["Algo más sostenible no se construye de una vez.", "La próxima semana es otra parte de ello."],
      fr: ["Quelque chose de plus durable ne se construit pas en une fois.", "La semaine prochaine en est une autre pièce."],
      de: ["Etwas Nachhaltigeres baut sich nicht auf einmal auf.", "Die nächste Woche ist ein weiteres Stück davon."] },
    { en: ["A more human pace next week — that's worth returning to.", "You don't have to force it."],
      pt: ["Um ritmo mais humano na próxima semana — isso vale a pena retornar.", "Você não precisa forçar isso."],
      es: ["Un ritmo más humano la próxima semana — eso vale la pena volver.", "No tienes que forzarlo."],
      fr: ["Un rythme plus humain la semaine prochaine — ça vaut la peine d'y revenir.", "Tu n'as pas à le forcer."],
      de: ["Ein menschlicheres Tempo in der nächsten Woche — das ist es wert, dorthin zurückzukehren.", "Du musst es nicht erzwingen."] },
  ],
};

// Narrative-aware "Looking Ahead" pools — 2-line entries, one sub-array per weekNumber rotation.
// Used instead of generic LOOKING_AHEAD_POOLS when narrativeState is defined
// and no goal/profile/contextual override is active.
const NARRATIVE_TONE_AHEAD: Record<string, NarrativeToneEntry[][]> = {
  first_week: [
    [{ pt: 'A próxima semana começa com algo que esta criou.', en: 'The next week starts with something this one created.', es: 'La próxima semana comienza con algo que esta creó.', fr: 'La semaine prochaine commence avec quelque chose que celle-ci a créé.', de: 'Die nächste Woche beginnt mit etwas, das diese geschaffen hat.' },
     { pt: 'Não é necessário saber para onde ainda.', en: 'No need to know where yet.', es: 'No es necesario saber adónde todavía.', fr: "Pas besoin de savoir où encore.", de: 'Es ist noch nicht nötig zu wissen, wohin.' }],
    [{ pt: 'A segunda semana terá uma forma diferente.', en: 'The second week will have its own shape.', es: 'La segunda semana tendrá su propia forma.', fr: 'La deuxième semaine aura sa propre forme.', de: 'Die zweite Woche wird ihre eigene Form haben.' },
     { pt: 'Ela chegará do jeito que precisar chegar.', en: 'It will arrive the way it needs to.', es: 'Llegará de la manera que necesite llegar.', fr: 'Elle arrivera de la façon dont elle doit arriver.', de: 'Sie wird so kommen, wie sie kommen muss.' }],
    [{ pt: 'Há continuidade a partir daqui.', en: 'There is continuity from here.', es: 'Hay continuidad desde aquí.', fr: "Il y a une continuité à partir d'ici.", de: 'Es gibt Kontinuität von hier aus.' },
     { pt: 'A próxima semana já começa.', en: 'The next week is already beginning.', es: 'La próxima semana ya está comenzando.', fr: 'La semaine prochaine commence déjà.', de: 'Die nächste Woche beginnt bereits.' }],
  ],
  breakthrough: [
    [{ pt: 'A próxima semana não precisa ser igual a esta.', en: "The next week doesn't need to be like this one.", es: 'La próxima semana no necesita ser como esta.', fr: "La semaine prochaine n'a pas besoin d'être comme celle-ci.", de: 'Die nächste Woche muss nicht wie diese sein.' },
     { pt: 'O que foi vivido esta semana fica.', en: 'What was lived this week stays.', es: 'Lo que se vivió esta semana se queda.', fr: 'Ce qui a été vécu cette semaine reste.', de: 'Was diese Woche erlebt wurde, bleibt.' }],
    [{ pt: 'Não há pressão para repetir o que aconteceu aqui.', en: 'There is no pressure to repeat what happened here.', es: 'No hay presión para repetir lo que ocurrió aquí.', fr: "Il n'y a aucune pression pour répéter ce qui s'est passé ici.", de: 'Es gibt keinen Druck, das zu wiederholen, was hier passiert ist.' },
     { pt: 'A próxima semana terá o que precisar ter.', en: 'The next week will have what it needs to have.', es: 'La próxima semana tendrá lo que necesite tener.', fr: "La semaine prochaine aura ce qu'elle a besoin d'avoir.", de: 'Die nächste Woche wird haben, was sie haben muss.' }],
    [{ pt: 'Há semanas que têm peso próprio.', en: 'Some weeks carry their own weight.', es: 'Hay semanas que tienen su propio peso.', fr: 'Certaines semaines ont leur propre poids.', de: 'Manche Wochen haben ihr eigenes Gewicht.' },
     { pt: 'A próxima chegará com o que for.', en: 'The next will arrive with what it brings.', es: 'La próxima llegará con lo que traiga.', fr: "La prochaine arrivera avec ce qu'elle apporte.", de: 'Die nächste wird mit dem kommen, was sie bringt.' }],
  ],
  high_consistency: [
    [{ pt: 'O que foi construído esta semana vai junto para a próxima.', en: 'What was built this week goes with you into the next.', es: 'Lo que se construyó esta semana va contigo a la siguiente.', fr: "Ce qui a été construit cette semaine t'accompagne dans la prochaine.", de: 'Was diese Woche aufgebaut wurde, geht mit dir in die nächste.' },
     { pt: 'A continuidade não precisa ser perfeita para ser real.', en: "Continuity doesn't need to be perfect to be real.", es: 'La continuidad no necesita ser perfecta para ser real.', fr: "La continuité n'a pas besoin d'être parfaite pour être réelle.", de: 'Kontinuität muss nicht perfekt sein, um real zu sein.' }],
    [{ pt: 'Alguma coisa se manteve. Isso tem seu peso.', en: 'Something stayed. That has its own weight.', es: 'Algo se mantuvo. Eso tiene su propio peso.', fr: 'Quelque chose est resté. Ça a son propre poids.', de: 'Etwas blieb. Das hat sein eigenes Gewicht.' },
     { pt: 'A próxima semana começa daqui.', en: 'The next week begins from here.', es: 'La próxima semana comienza desde aquí.', fr: "La semaine prochaine commence d'ici.", de: 'Die nächste Woche beginnt von hier.' }],
    [{ pt: 'Nem tudo precisa mudar para a próxima semana.', en: "Not everything needs to change for the next week.", es: 'No todo necesita cambiar para la próxima semana.', fr: "Tout n'a pas besoin de changer pour la semaine prochaine.", de: 'Nicht alles muss sich für die nächste Woche ändern.' },
     { pt: 'Algumas coisas continuarão. É suficiente.', en: 'Some things will continue. That is enough.', es: 'Algunas cosas continuarán. Es suficiente.', fr: "Certaines choses continueront. C'est suffisant.", de: 'Einige Dinge werden weitergehen. Das reicht.' }],
  ],
  momentum: [
    [{ pt: 'A próxima semana encontrará algo já em movimento.', en: 'The next week will find something already in motion.', es: 'La próxima semana encontrará algo ya en movimiento.', fr: 'La semaine prochaine trouvera quelque chose déjà en mouvement.', de: 'Die nächste Woche wird etwas bereits in Bewegung vorfinden.' },
     { pt: 'O ritmo não precisa ser reiniciado.', en: "The rhythm doesn't need to restart.", es: 'El ritmo no necesita reiniciarse.', fr: "Le rythme n'a pas besoin de redémarrer.", de: 'Der Rhythmus muss nicht neu starten.' }],
    [{ pt: 'Algo foi construído esta semana, mesmo que discretamente.', en: 'Something was built this week, quietly.', es: 'Algo se construyó esta semana, en silencio.', fr: 'Quelque chose a été construit cette semaine, discrètement.', de: 'Etwas wurde diese Woche aufgebaut, leise.' },
     { pt: 'A próxima começa daqui.', en: 'The next begins from here.', es: 'La siguiente comienza desde aquí.', fr: "La prochaine commence d'ici.", de: 'Die nächste beginnt von hier.' }],
    [{ pt: 'Nem toda semana precisa ser grande para deixar algo para a próxima.', en: "Not every week needs to be big to leave something for the next.", es: 'No toda semana necesita ser grande para dejar algo para la siguiente.', fr: "Toutes les semaines n'ont pas besoin d'être grandes pour laisser quelque chose à la suivante.", de: 'Nicht jede Woche muss groß sein, um etwas für die nächste zu hinterlassen.' },
     { pt: 'Algo continua.', en: 'Something continues.', es: 'Algo continúa.', fr: 'Quelque chose continue.', de: 'Etwas geht weiter.' }],
  ],
  comeback: [
    [{ pt: 'A próxima semana começa de um lugar diferente do que esta encontrou.', en: 'The next week starts from a different place than this one found.', es: 'La próxima semana comienza desde un lugar diferente al que encontró esta.', fr: "La semaine prochaine commence d'un endroit différent de celui que celle-ci a trouvé.", de: 'Die nächste Woche beginnt von einem anderen Ort als dem, den diese gefunden hat.' },
     { pt: 'O caminho não começou do zero.', en: 'The path did not start from zero.', es: 'El camino no comenzó desde cero.', fr: "Le chemin n'a pas commencé à zéro.", de: 'Der Weg begann nicht von vorne.' }],
    [{ pt: 'Algo continuou. Isso vai junto para a próxima semana.', en: 'Something continued. That goes with you into the next week.', es: 'Algo continuó. Eso va contigo a la próxima semana.', fr: "Quelque chose a continué. Ça t'accompagne dans la semaine prochaine.", de: 'Etwas ist weitergegangen. Das geht mit dir in die nächste Woche.' },
     { pt: 'Nem toda retomada precisa de impulso para durar.', en: "Not every return needs momentum to last.", es: 'No todo regreso necesita impulso para durar.', fr: "Tout retour n'a pas besoin d'élan pour durer.", de: 'Nicht jede Rückkehr braucht Schwung, um zu dauern.' }],
    [{ pt: 'Há algo que continuou vivo. Isso vai junto.', en: 'Something stayed alive. That goes along.', es: 'Algo siguió vivo. Eso va junto.', fr: 'Quelque chose est resté vivant. Ça va avec.', de: 'Etwas blieb lebendig. Das geht mit.' },
     { pt: 'A próxima semana não começa do vazio.', en: "The next week doesn't start from nothing.", es: 'La próxima semana no comienza de la nada.', fr: 'La semaine prochaine ne commence pas de rien.', de: 'Die nächste Woche beginnt nicht aus dem Nichts.' }],
  ],
  low_activity: [
    [{ pt: 'Algumas semanas precisam acontecer para que as seguintes possam começar de outro lugar.', en: 'Some weeks need to happen for the next ones to begin somewhere different.', es: 'Algunas semanas necesitan suceder para que las siguientes puedan comenzar en otro lugar.', fr: 'Certaines semaines doivent se passer pour que les suivantes puissent commencer ailleurs.', de: 'Manche Wochen müssen geschehen, damit die nächsten woanders beginnen können.' },
     { pt: 'Não é necessário recuperar nada.', en: 'There is nothing to recover.', es: 'No hay nada que recuperar.', fr: "Il n'y a rien à récupérer.", de: 'Es gibt nichts zu erholen.' }],
    [{ pt: 'A próxima semana chegará com o que esta deixou.', en: 'The next week will arrive with what this one left.', es: 'La próxima semana llegará con lo que esta dejó.', fr: 'La semaine prochaine arrivera avec ce que celle-ci a laissé.', de: 'Die nächste Woche wird mit dem ankommen, was diese zurückgelassen hat.' },
     { pt: 'Ela chegará como for.', en: 'It will arrive as it is.', es: 'Llegará como sea.', fr: "Elle arrivera telle qu'elle est.", de: 'Sie wird kommen, wie sie ist.' }],
    [{ pt: 'Nem toda semana pede a mesma presença.', en: 'Not every week asks for the same presence.', es: 'No toda semana pide la misma presencia.', fr: "Toutes les semaines ne demandent pas la même présence.", de: 'Nicht jede Woche fordert dieselbe Präsenz.' },
     { pt: 'A próxima será o que for.', en: 'The next will be what it is.', es: 'La siguiente será lo que sea.', fr: 'La prochaine sera ce quelle est.', de: 'Die nächste wird sein, was sie ist.' }],
  ],
};

export function getLookingAhead(insights: WeekInsights, lang: string, weekNumber: number = 1, profile?: EmotionalProfile | null, goal?: UserGoal | null, narrativeState?: string | null): string[] {
  if (goal) {
    const pools = LOOKING_AHEAD_GOAL[goal];
    const pool  = pools[(weekNumber - 1) % pools.length];
    const l     = (lang in pool ? lang : 'en') as keyof L5;
    return pool[l];
  }
  if (profile) {
    const pools = LOOKING_AHEAD_PROFILE[profile];
    const pool  = pools[(weekNumber - 1) % pools.length];
    const l     = (lang in pool ? lang : 'en') as keyof L5;
    return pool[l];
  }
  const context = lookingAheadContext(insights);
  if (context !== 'default') {
    const pools = LOOKING_AHEAD_CONTEXTUAL[context];
    const pool  = pools[(weekNumber - 1) % pools.length];
    const l     = (lang in pool ? lang : 'en') as keyof L5;
    return pool[l];
  }
  // Narrative state: use a continuity-aware pool instead of the generic default
  if (narrativeState) {
    const narPairs = NARRATIVE_TONE_AHEAD[narrativeState];
    if (narPairs) {
      const pair = narPairs[(weekNumber - 1) % narPairs.length];
      return pair.map(e => (e as Record<string, string>)[lang] ?? e.en);
    }
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

// ─── Habit Presence Observation ───────────────────────────────────────────────
// Generates 1–2 emotional sentences about the week's most consistent habits.
// Input: topHabits sorted desc by count, already filtered to count >= 2.
// Never mentions numbers, percentages, or lists.

const HABIT_EMOTIONAL_LABELS: Record<string, { en: string; pt: string; es: string; fr: string; de: string }> = {
  morning:        { pt: 'A rotina da manhã',    en: 'The morning routine',   es: 'La rutina matutina',     fr: 'La routine du matin',   de: 'Die Morgenroutine'         },
  workout:        { pt: 'O movimento',           en: 'Movement',              es: 'El movimiento',          fr: 'Le mouvement',          de: 'Die Bewegung'              },
  deepwork:       { pt: 'O foco',                en: 'Deep focus',            es: 'El enfoque profundo',    fr: 'La concentration',      de: 'Die Konzentration'         },
  read:           { pt: 'A leitura',             en: 'Reading',               es: 'La lectura',             fr: 'La lecture',            de: 'Das Lesen'                 },
  water:          { pt: 'A hidratação',          en: 'Hydration',             es: 'La hidratación',         fr: "L'hydratation",         de: 'Die Flüssigkeitszufuhr'   },
  nodistractions: { pt: 'A atenção plena',       en: 'Focused attention',     es: 'La atención plena',      fr: "L'attention pleine",    de: 'Die volle Aufmerksamkeit'  },
  sleep:          { pt: 'O sono',                en: 'Sleep',                 es: 'El sueño',               fr: 'Le sommeil',            de: 'Der Schlaf'                },
  plan:           { pt: 'O planejamento',        en: 'Planning',              es: 'La planificación',       fr: 'La planification',      de: 'Die Planung'               },
  gratitude:      { pt: 'A gratidão',            en: 'Gratitude',             es: 'La gratitud',            fr: 'La gratitude',          de: 'Die Dankbarkeit'           },
  detox:          { pt: 'O descanso digital',    en: 'Digital rest',          es: 'El descanso digital',    fr: 'Le repos numérique',    de: 'Die digitale Pause'        },
};

function habitEmotionalLabel(id: string, name: string, lang: string): string {
  const known = HABIT_EMOTIONAL_LABELS[id];
  if (known) return (known as Record<string, string>)[lang] ?? known.en;
  const n = name.trim();
  return n.charAt(0).toUpperCase() + n.slice(1);
}

export function getHabitPresenceLines(
  topHabits: { id: string; name: string; count: number }[],
  lang: string,
  weekNumber: number = 1,
): string[] {
  if (topHabits.length === 0) return [];

  const l1 = habitEmotionalLabel(topHabits[0].id, topHabits[0].name, lang);
  const c1 = topHabits[0].count;
  const v  = (weekNumber - 1) % 2;

  let line1: string;
  if (c1 >= 5) {
    const t: [Record<string, string>, Record<string, string>] = [
      { pt: `${l1} apareceu em quase todos os dias desta semana.`,     en: `${l1} showed up on most days this week.`,                es: `${l1} apareció en casi todos los días de esta semana.`,      fr: `${l1} était là presque chaque jour de cette semaine.`,      de: `${l1} war diese Woche fast jeden Tag da.`                },
      { pt: `${l1} esteve presente na maior parte desta semana.`,       en: `${l1} was present for most of this week.`,               es: `${l1} estuvo presente en la mayor parte de esta semana.`,    fr: `${l1} était présent(e) la plupart du temps cette semaine.`, de: `${l1} war den größten Teil dieser Woche vorhanden.`       },
    ];
    line1 = t[v][lang] ?? t[v].en;
  } else {
    const t: [Record<string, string>, Record<string, string>] = [
      { pt: `${l1} encontrou espaço em alguns dias desta semana.`,      en: `${l1} found its way in on some days this week.`,         es: `${l1} encontró espacio en algunos días de esta semana.`,     fr: `${l1} a trouvé sa place quelques jours cette semaine.`,     de: `${l1} fand diese Woche an einigen Tagen seinen Platz.`    },
      { pt: `${l1} apareceu em alguns momentos desta semana.`,           en: `${l1} made an appearance this week.`,                    es: `${l1} apareció en algunos momentos de esta semana.`,         fr: `${l1} est apparu(e) à quelques moments cette semaine.`,     de: `${l1} tauchte diese Woche einige Male auf.`               },
    ];
    line1 = t[v][lang] ?? t[v].en;
  }

  const lines = [line1];

  if (topHabits.length >= 2) {
    const l2 = habitEmotionalLabel(topHabits[1].id, topHabits[1].name, lang);
    const also: Record<string, string> = {
      pt: `${l2} também apareceu.`,
      en: `${l2} was there too.`,
      es: `${l2} también apareció.`,
      fr: `${l2} était là aussi.`,
      de: `${l2} war auch dabei.`,
    };
    lines.push(also[lang] ?? also.en);
  }

  return lines;
}

// ─── Cross-Week Memory ─────────────────────────────────────────────────────────
// Compares current week to the previous one and returns one sentence that creates
// emotional continuity. Never uses "better/worse", comparisons, or percentages.
// Priority: state shift > category shift > return-count comparison.

type CWL = { en: string; pt: string; es: string; fr: string; de: string };

function pickCWL(pool: CWL[], weekNumber: number, lang: string): string {
  const t = pool[(Math.max(1, weekNumber) - 1) % pool.length];
  return (t as Record<string, string>)[lang] ?? t.en;
}

function cwInterpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

const CW_COMEBACK: CWL[] = [
  { en: 'After a quieter week, this one had more room for you.',
    pt: 'Depois de uma semana mais silenciosa, esta teve mais espaço para você.',
    es: 'Después de una semana más tranquila, esta tuvo más espacio para ti.',
    fr: 'Après une semaine plus calme, celle-ci avait plus de place pour toi.',
    de: 'Nach einer ruhigeren Woche hatte diese mehr Raum für dich.' },
  { en: 'Something returned this week that was quieter before.',
    pt: 'Algo voltou esta semana que estava mais quieto antes.',
    es: 'Algo volvió esta semana que antes estaba más tranquilo.',
    fr: "Quelque chose est revenu cette semaine qui était plus calme avant.",
    de: 'Etwas kehrte diese Woche zurück, das zuvor ruhiger war.' },
  { en: 'After last week, this one showed up differently.',
    pt: 'Depois da semana passada, esta se apresentou de outra forma.',
    es: 'Después de la semana pasada, esta se presentó de otra manera.',
    fr: "Après la semaine dernière, celle-ci s'est présentée différemment.",
    de: 'Nach der letzten Woche zeigte sich diese anders.' },
];

const CW_QUIETER: CWL[] = [
  { en: 'After a fuller week, this one moved at a different pace.',
    pt: 'Depois de uma semana mais cheia, esta se moveu em outro ritmo.',
    es: 'Después de una semana más llena, esta se movió a un ritmo diferente.',
    fr: "Après une semaine plus chargée, celle-ci s'est déroulée à un rythme différent.",
    de: 'Nach einer volleren Woche bewegte sich diese in einem anderen Tempo.' },
  { en: 'This week was quieter than the last. Both have their place.',
    pt: 'Esta semana foi mais quieta que a anterior. Ambas têm seu lugar.',
    es: 'Esta semana fue más tranquila que la anterior. Ambas tienen su lugar.',
    fr: "Cette semaine était plus calme que la dernière. Toutes les deux ont leur place.",
    de: 'Diese Woche war ruhiger als die letzte. Beide haben ihren Platz.' },
  { en: 'The rhythm was different this time — slower, more inward.',
    pt: 'O ritmo foi diferente desta vez — mais lento, mais voltado para dentro.',
    es: 'El ritmo fue diferente esta vez — más lento, más hacia adentro.',
    fr: 'Le rythme était différent cette fois — plus lent, plus intérieur.',
    de: 'Der Rhythmus war diesmal anders — langsamer, mehr nach innen.' },
];

const CW_STEADY: CWL[] = [
  { en: 'The rhythm stayed similar to last week.',
    pt: 'O ritmo se manteve parecido com o da semana passada.',
    es: 'El ritmo se mantuvo similar al de la semana pasada.',
    fr: 'Le rythme est resté similaire à la semaine dernière.',
    de: 'Der Rhythmus blieb ähnlich wie in der letzten Woche.' },
  { en: 'This week moved in a familiar way — close to the one before.',
    pt: 'Esta semana se moveu de forma familiar — próxima à anterior.',
    es: 'Esta semana se movió de manera familiar — cercana a la anterior.',
    fr: 'Cette semaine a suivi un rythme familier — proche de la précédente.',
    de: 'Diese Woche bewegte sich auf vertraute Weise — ähnlich wie die vorherige.' },
  { en: 'Something continued from last week into this one.',
    pt: 'Algo continuou da semana passada para esta.',
    es: 'Algo continuó de la semana pasada a esta.',
    fr: "Quelque chose a continué de la semaine dernière à celle-ci.",
    de: 'Etwas setzte sich von letzter Woche in diese fort.' },
];

const CW_STATE_SHIFT: CWL[] = [
  { en: 'Last week, {prev} was more present. This time, {curr} took up more space.',
    pt: 'Na semana anterior, {prev} apareceu mais. Desta vez, {curr} ocupou mais espaço.',
    es: 'La semana anterior, {prev} estuvo más presente. Esta vez, {curr} ocupó más espacio.',
    fr: 'La semaine dernière, {prev} était plus présent. Cette fois, {curr} a pris plus de place.',
    de: 'Letzte Woche war {prev} stärker präsent. Diesmal nahm {curr} mehr Raum ein.' },
  { en: 'Something shifted between last week and this one — from {prev} to {curr}.',
    pt: 'Algo mudou entre a semana passada e esta — de {prev} para {curr}.',
    es: 'Algo cambió entre la semana pasada y esta — de {prev} a {curr}.',
    fr: "Quelque chose a changé entre la semaine dernière et celle-ci — de {prev} à {curr}.",
    de: 'Zwischen letzter Woche und dieser hat sich etwas verschoben — von {prev} zu {curr}.' },
  { en: 'Where last week had more {prev}, this one brought {curr} instead.',
    pt: 'Enquanto a semana passada tinha mais {prev}, esta trouxe {curr}.',
    es: 'Mientras la semana pasada tenía más {prev}, esta trajo {curr}.',
    fr: 'Là où la semaine dernière avait plus de {prev}, celle-ci a apporté {curr}.',
    de: 'Wo die letzte Woche mehr {prev} hatte, brachte diese {curr}.' },
];

const CW_CAT_SHIFT: CWL[] = [
  { en: 'Last week, your mind seemed to ask for more {prev}. This week, {curr} came up more often.',
    pt: 'Na semana passada, sua mente parecia pedir mais {prev}. Nesta, {curr} apareceu com mais frequência.',
    es: 'La semana pasada, tu mente parecía pedir más {prev}. Esta semana, {curr} apareció con más frecuencia.',
    fr: "La semaine dernière, ton esprit semblait demander plus de {prev}. Cette semaine, {curr} est revenu plus souvent.",
    de: 'Letzte Woche schien dein Geist mehr nach {prev} zu verlangen. Diese Woche tauchte {curr} häufiger auf.' },
  { en: 'Where last week leaned toward {prev}, this one moved closer to {curr}.',
    pt: 'Enquanto a semana passada se inclinou para {prev}, esta se aproximou mais de {curr}.',
    es: 'Mientras la semana pasada se inclinó hacia {prev}, esta se acercó más a {curr}.',
    fr: "Là où la semaine dernière penchait vers {prev}, celle-ci s'est rapprochée de {curr}.",
    de: 'Während die letzte Woche zu {prev} tendierte, bewegte sich diese näher zu {curr}.' },
  { en: 'Something different surfaced this week — {curr} instead of {prev}.',
    pt: 'Algo diferente veio à tona esta semana — {curr} em vez de {prev}.',
    es: 'Algo diferente emergió esta semana — {curr} en lugar de {prev}.',
    fr: "Quelque chose de différent est apparu cette semaine — {curr} au lieu de {prev}.",
    de: 'Etwas anderes kam diese Woche an die Oberfläche — {curr} statt {prev}.' },
];

/**
 * Generates one sentence of cross-week emotional continuity.
 * Priority: state shift → category shift → return-count comparison.
 * Returns null when no meaningful comparison exists (first week, small diff, no data).
 */
export function getCrossWeekMemory(
  current: WeekInsights,
  prev: WeekInsights,
  lang: string,
  weekNumber: number = 1,
): string | null {
  // 1. Emotional state shift — most personal signal
  if (
    current.dominantState &&
    prev.dominantState &&
    current.dominantState !== prev.dominantState
  ) {
    const v = (Math.max(1, weekNumber) - 1) % CW_STATE_SHIFT.length;
    const tmpl = CW_STATE_SHIFT[v];
    const template = (tmpl as Record<string, string>)[lang] ?? tmpl.en;
    return cwInterpolate(template, {
      prev: getStateLabel(prev.dominantState, lang),
      curr: getStateLabel(current.dominantState, lang),
    });
  }

  // 2. Category shift — what the mind was asking for changed
  if (
    current.topCategories.length > 0 &&
    prev.topCategories.length > 0 &&
    current.topCategories[0] !== prev.topCategories[0]
  ) {
    const v = (Math.max(1, weekNumber) - 1) % CW_CAT_SHIFT.length;
    const tmpl = CW_CAT_SHIFT[v];
    const template = (tmpl as Record<string, string>)[lang] ?? tmpl.en;
    return cwInterpolate(template, {
      prev: getCategoryLabel(prev.topCategories[0], lang),
      curr: getCategoryLabel(current.topCategories[0], lang),
    });
  }

  // 3. Return-count comparison
  const diff = current.resetsCompleted - prev.resetsCompleted;
  if (diff >= 3) return pickCWL(CW_COMEBACK, weekNumber, lang);
  if (diff <= -3) return pickCWL(CW_QUIETER, weekNumber, lang);
  if (Math.abs(diff) <= 1 && (current.resetsCompleted > 0 || prev.resetsCompleted > 0)) {
    return pickCWL(CW_STEADY, weekNumber, lang);
  }

  return null;
}

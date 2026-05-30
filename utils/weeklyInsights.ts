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
  dayIndex: number;   // 0=Mon … 6=Sun
  dateKey: string;    // 'YYYY-MM-DD'
  entry: DailyEntry | null;
  completed: boolean;
}

export interface WeekInsights {
  days: WeekDayData[];
  resetsCompleted: number;
  skippedCount: number;
  rhythmPattern: RhythmPattern;
  completedDayIndices: number[];
  moodCounts: { hard: number; okay: number; good: number };
  dominantMood: 'hard' | 'okay' | 'good' | null;
  secondaryMoods: Array<'hard' | 'okay' | 'good'>;
  moodTotal: number;
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

export function buildWeekInsights(allDays: (DailyEntry | null)[], monday: Date): WeekInsights {
  const days: WeekDayData[] = allDays.map((entry, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { dayIndex: i, dateKey, entry, completed: entry?.completed ?? false };
  });

  const completedDayIndices = days.filter(d => d.completed).map(d => d.dayIndex);
  const resetsCompleted = completedDayIndices.length;

  // Mood
  const moodCounts = { hard: 0, okay: 0, good: 0 };
  days.forEach(d => { if (d.entry?.mood) moodCounts[d.entry.mood]++; });
  const moodTotal   = moodCounts.hard + moodCounts.okay + moodCounts.good;
  const dominantMood = dominantMoodOf(moodCounts);
  const secondaryMoods = (['hard', 'okay', 'good'] as const)
    .filter(m => m !== dominantMood && moodCounts[m] > 0)
    .sort((a, b) => moodCounts[b] - moodCounts[a]);

  // Categories
  const categoryCounts: Record<string, number> = {};
  days.forEach(d => {
    if (d.entry?.category) categoryCounts[d.entry.category] = (categoryCounts[d.entry.category] ?? 0) + 1;
  });
  const topCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);

  // Words
  const wordCounts: Record<string, number> = {};
  days.forEach(d => {
    if (d.entry?.word_of_day) wordCounts[d.entry.word_of_day] = (wordCounts[d.entry.word_of_day] ?? 0) + 1;
  });
  const sortedWords     = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
  const uniqueWords     = sortedWords.map(([w]) => w);
  const mostFrequentWord = sortedWords.length > 0 && sortedWords[0][1] > 1 ? sortedWords[0][0] : null;

  // Highlight — best piece of user writing this week
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

  // Trend — compare first half (Mon–Thu) with second half (Thu–Sun)
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
  hard: { en: 'Hard day',    pt: 'Dia difícil',    es: 'Día difícil',    fr: 'Jour difficile',  de: 'Schwerer Tag'  },
  okay: { en: 'Steady day',  pt: 'Dia estável',    es: 'Día estable',    fr: 'Jour stable',     de: 'Ruhiger Tag'   },
  good: { en: 'Lighter day', pt: 'Dia mais leve',  es: 'Día más ligero', fr: 'Jour plus léger', de: 'Leichter Tag'  },
};
export function getMoodLabel(mood: 'hard' | 'okay' | 'good', lang: string): string {
  return MOOD_LABELS[mood][lang] ?? MOOD_LABELS[mood].en;
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

// ─── Section 1 — Week Overview copy ──────────────────────────────────────────

const OVERVIEW_INTRO: Record<string, (n: number) => string> = {
  en: n => n === 0 ? 'The week passed quietly.' : n === 1 ? 'You returned once this week.' : n === 7 ? 'You returned every day this week.' : `This week, you returned ${n} times.`,
  pt: n => n === 0 ? 'A semana passou em silêncio.' : n === 1 ? 'Você voltou uma vez esta semana.' : n === 7 ? 'Você voltou todos os dias esta semana.' : `Esta semana, você voltou ${n} vezes.`,
  es: n => n === 0 ? 'La semana pasó en silencio.' : n === 1 ? 'Regresaste una vez esta semana.' : n === 7 ? 'Regresaste todos los días esta semana.' : `Esta semana, regresaste ${n} veces.`,
  fr: n => n === 0 ? 'La semaine est passée en silence.' : n === 1 ? 'Tu es revenu une fois cette semaine.' : n === 7 ? 'Tu es revenu chaque jour cette semaine.' : `Cette semaine, tu es revenu ${n} fois.`,
  de: n => n === 0 ? 'Die Woche verging in Stille.' : n === 1 ? 'Du bist diese Woche einmal zurückgekehrt.' : n === 7 ? 'Du bist diese Woche jeden Tag zurückgekehrt.' : `Diese Woche bist du ${n} Mal zurückgekehrt.`,
};

// Overview narrative lines (2 sentences, based on mood + completion)
type OverviewKey = 'high_hard' | 'high_light' | 'mid_hard' | 'mid_light' | 'low';
const OVERVIEW_NARRATIVE: Record<OverviewKey, Record<string, string>> = {
  high_hard:  { en: 'The week was demanding.\nBut you kept coming back.', pt: 'A semana foi exigente.\nMas você continuou voltando.', es: 'La semana fue exigente.\nPero seguiste volviendo.', fr: 'La semaine a été exigeante.\nMais tu as continué à revenir.', de: 'Die Woche war fordernd.\nAber du bist immer wieder zurückgekehrt.' },
  high_light: { en: 'There was a steadiness to this week.\nYou kept finding your way back.', pt: 'Houve uma constância nesta semana.\nVocê continuou encontrando seu caminho.', es: 'Hubo una constancia en esta semana.\nSeguiste encontrando tu camino de regreso.', fr: 'Il y avait une stabilité dans cette semaine.\nTu as continué à trouver ton chemin.', de: 'Diese Woche hatte eine Beständigkeit.\nDu hast immer wieder deinen Weg zurückgefunden.' },
  mid_hard:   { en: 'Some days were difficult.\nYou kept coming back anyway.', pt: 'Alguns dias foram difíceis.\nVocê continuou voltando mesmo assim.', es: 'Algunos días fueron difíciles.\nAun así, seguiste volviendo.', fr: 'Certains jours ont été difficiles.\nTu es quand même revenu.', de: 'Einige Tage waren schwer.\nDu bist trotzdem zurückgekehrt.' },
  mid_light:  { en: 'You navigated the week at your own pace.\nThe returns were quiet and consistent.', pt: 'Você navegou a semana no seu próprio ritmo.\nOs retornos foram quietos e consistentes.', es: 'Navegaste la semana a tu propio ritmo.\nLos regresos fueron tranquilos y consistentes.', fr: 'Tu as navigué la semaine à ton propre rythme.\nLes retours ont été calmes et réguliers.', de: 'Du hast die Woche in deinem eigenen Tempo gemeistert.\nDie Rückkehren waren ruhig und beständig.' },
  low:        { en: 'The week asked a lot.\nYou were still here.', pt: 'A semana pediu muito.\nVocê ainda estava aqui.', es: 'La semana pidió mucho.\nAún así, estuviste aquí.', fr: 'La semaine a demandé beaucoup.\nTu étais quand même là.', de: 'Die Woche hat viel verlangt.\nDu warst trotzdem noch hier.' },
};

export function getWeekOverviewLines(insights: WeekInsights, lang: string): { intro: string; narrative: string } {
  const { resetsCompleted, dominantMood } = insights;
  const l = lang in OVERVIEW_INTRO ? lang : 'en';
  const intro = OVERVIEW_INTRO[l](resetsCompleted);
  const isHard = dominantMood === 'hard';
  let key: OverviewKey;
  if (resetsCompleted >= 5) key = isHard ? 'high_hard' : 'high_light';
  else if (resetsCompleted >= 3) key = isHard ? 'mid_hard' : 'mid_light';
  else key = 'low';
  const narrative = OVERVIEW_NARRATIVE[key][l] ?? OVERVIEW_NARRATIVE[key].en;
  return { intro, narrative };
}

// ─── Section 2 — Your Rhythm copy ────────────────────────────────────────────

const RHYTHM_COPY: Record<RhythmPattern, Record<string, string>> = {
  steady:      { en: 'Your rhythm was steady from beginning to end.', pt: 'Seu ritmo foi constante do início ao fim.', es: 'Tu ritmo fue constante de principio a fin.', fr: 'Ton rythme était stable du début à la fin.', de: 'Dein Rhythmus war gleichmäßig vom Anfang bis zum Ende.' },
  frontLoaded: { en: 'You returned mostly at the beginning of the week.', pt: 'Você voltou principalmente no começo da semana.', es: 'Regresaste sobre todo al comienzo de la semana.', fr: 'Tu es revenu surtout en début de semaine.', de: 'Du bist vor allem zu Beginn der Woche zurückgekehrt.' },
  backLoaded:  { en: 'Your rhythm found its way toward the end of the week.', pt: 'Seu ritmo se encontrou mais para o final da semana.', es: 'Tu ritmo encontró su camino hacia el final de la semana.', fr: 'Ton rythme a trouvé sa place vers la fin de la semaine.', de: 'Dein Rhythmus fand sich gegen Ende der Woche.' },
  middle:      { en: 'You returned mostly in the middle of the week.', pt: 'Você voltou principalmente no meio da semana.', es: 'Regresaste sobre todo en el centro de la semana.', fr: 'Tu es revenu surtout au milieu de la semaine.', de: 'Du bist vor allem in der Mitte der Woche zurückgekehrt.' },
  sparse:      { en: 'The week was mostly quiet. You kept the thread.', pt: 'A semana foi em sua maioria silenciosa. Você manteve o fio.', es: 'La semana estuvo en gran parte tranquila. Mantuviste el hilo.', fr: 'La semaine a été surtout calme. Tu as gardé le fil.', de: 'Die Woche war größtenteils still. Du hast den Faden gehalten.' },
};
export function getRhythmCopy(pattern: RhythmPattern, lang: string): string {
  return RHYTHM_COPY[pattern][lang] ?? RHYTHM_COPY[pattern].en;
}

// ─── Section 7 — What Changed copy ───────────────────────────────────────────

type TrendMood = 'hard' | 'okay' | 'good';
const TREND_BEGIN: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'You began the week carrying something heavy.', pt: 'Você começou a semana carregando algo pesado.', es: 'Comenzaste la semana cargando algo pesado.', fr: 'Tu as commencé la semaine en portant quelque chose de lourd.', de: 'Du bist mit etwas Schwerem in die Woche gegangen.' },
  okay: { en: 'You began the week at a steady pace.', pt: 'Você começou a semana num ritmo estável.', es: 'Comenzaste la semana a un ritmo estable.', fr: 'Tu as commencé la semaine à un rythme stable.', de: 'Du bist in einem gleichmäßigen Tempo in die Woche gestartet.' },
  good: { en: 'The week started on lighter ground.', pt: 'A semana começou em terreno mais leve.', es: 'La semana comenzó en terreno más ligero.', fr: 'La semaine a commencé sur un terrain plus léger.', de: 'Die Woche begann auf leichterem Boden.' },
};
const TREND_END_IMPROVED: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'By the end, things had not fully eased —\nbut you were still here.', pt: 'No final, as coisas não aliviaram completamente —\nmas você ainda estava aqui.', es: 'Al final, las cosas no aliviaron del todo —\npero seguías aquí.', fr: 'À la fin, les choses ne s\'étaient pas complètement allégées —\nmais tu étais toujours là.', de: 'Bis zum Ende hatte sich nicht alles erleichtert —\naber du warst noch da.' },
  okay: { en: 'By the end, a little more steadiness arrived.', pt: 'No final, um pouco mais de estabilidade chegou.', es: 'Al final, llegó un poco más de estabilidad.', fr: 'À la fin, un peu plus de stabilité est arrivée.', de: 'Gegen Ende kam ein wenig mehr Beständigkeit.' },
  good: { en: 'By the end, something had lightened.', pt: 'No final, algo aliviou.', es: 'Al final, algo se alivió.', fr: 'À la fin, quelque chose s\'est allégé.', de: 'Gegen Ende hatte sich etwas erleichtert.' },
};
const TREND_END_DECLINED: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'The week became heavier as it went on.\nYou carried it anyway.', pt: 'A semana ficou mais pesada à medida que avançou.\nVocê carregou mesmo assim.', es: 'La semana se volvió más pesada a medida que avanzaba.\nLo cargaste de todas formas.', fr: 'La semaine est devenue plus lourde au fur et à mesure.\nTu l\'as portée quand même.', de: 'Die Woche wurde schwerer, je weiter sie ging.\nDu hast sie trotzdem getragen.' },
  okay: { en: 'The week slowed toward the end.\nYou stayed with it.', pt: 'A semana desacelerou no final.\nVocê permaneceu com ela.', es: 'La semana se ralentizó hacia el final.\nPermaneciste con ella.', fr: 'La semaine a ralenti vers la fin.\nTu y es resté.', de: 'Die Woche verlangsamte sich gegen Ende.\nDu bist dabei geblieben.' },
  good: { en: 'Energy faded toward the end of the week.\nSometimes the week just ends that way.', pt: 'A energia diminuiu no final da semana.\nÀs vezes a semana simplesmente termina assim.', es: 'La energía se desvaneció hacia el final de la semana.\nA veces la semana simplemente termina así.', fr: 'L\'énergie s\'est estompée vers la fin de la semaine.\nParfois la semaine se termine simplement ainsi.', de: 'Die Energie ließ gegen Ende der Woche nach.\nManchmal endet die Woche einfach so.' },
};
const TREND_END_STEADY: Record<TrendMood, Record<string, string>> = {
  hard: { en: 'The weight stayed constant through the week.\nYou navigated it all the same.', pt: 'O peso permaneceu constante ao longo da semana.\nVocê a navegou mesmo assim.', es: 'El peso se mantuvo constante a lo largo de la semana.\nLa navegaste de todas formas.', fr: 'Le poids est resté constant tout au long de la semaine.\nTu l\'as navigué quand même.', de: 'Die Last blieb die ganze Woche konstant.\nDu hast sie trotzdem gemeistert.' },
  okay: { en: 'The week stayed at a consistent pace from start to finish.', pt: 'A semana manteve um ritmo consistente do início ao fim.', es: 'La semana mantuvo un ritmo constante de principio a fin.', fr: 'La semaine a maintenu un rythme constant du début à la fin.', de: 'Die Woche verlief von Anfang bis Ende in einem gleichmäßigen Tempo.' },
  good: { en: 'The lightness held through the whole week.', pt: 'A leveza se manteve durante toda a semana.', es: 'La ligereza se mantuvo durante toda la semana.', fr: 'La légèreté a tenu tout au long de la semaine.', de: 'Die Leichtigkeit hielt die ganze Woche an.' },
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

type ObservationKey = 'sparse_hard' | 'sparse_quiet' | 'moderate_hard' | 'moderate_flowing' | 'consistent_hard' | 'consistent_flowing';

function observationKey(insights: WeekInsights): ObservationKey {
  const { resetsCompleted, dominantMood } = insights;
  const isHard = dominantMood === 'hard';
  if (resetsCompleted <= 2) return isHard ? 'sparse_hard' : 'sparse_quiet';
  if (resetsCompleted <= 4) return isHard ? 'moderate_hard' : 'moderate_flowing';
  return isHard ? 'consistent_hard' : 'consistent_flowing';
}

const QUIET_OBSERVATIONS: Record<ObservationKey, Record<string, string[]>> = {
  sparse_hard: {
    en: ['This week carried weight.',
         'You didn\'t need to accomplish more.\nBeing present at all was already something.',
         'Sometimes the quietest weeks ask the most of us.'],
    pt: ['Esta semana carregou peso.',
         'Você não precisava realizar mais.\nEstar presente já era alguma coisa.',
         'Às vezes as semanas mais silenciosas são as que mais nos pedem.'],
    es: ['Esta semana llevó peso.',
         'No necesitabas lograr más.\nEstar presente ya era algo.',
         'A veces las semanas más silenciosas son las que más nos piden.'],
    fr: ['Cette semaine a porté un poids.',
         'Tu n\'avais pas besoin d\'accomplir davantage.\nÊtre présent était déjà quelque chose.',
         'Parfois les semaines les plus silencieuses sont celles qui demandent le plus.'],
    de: ['Diese Woche trug ein Gewicht.',
         'Du musstest nicht mehr erreichen.\nPräsent zu sein war bereits etwas.',
         'Manchmal sind die stillsten Wochen die, die am meisten von uns verlangen.'],
  },
  sparse_quiet: {
    en: ['This week was gentle.',
         'Not every week needs to be full.\nSome weeks are about staying present, not moving fast.',
         'The thread is still here.'],
    pt: ['Esta semana foi gentil.',
         'Nem toda semana precisa ser cheia.\nAlgumas semanas são sobre continuar presente, não sobre se mover rápido.',
         'O fio ainda está aqui.'],
    es: ['Esta semana fue tranquila.',
         'No toda semana necesita estar llena.\nAlgunas semanas son sobre permanecer presente, no sobre moverse rápido.',
         'El hilo sigue aquí.'],
    fr: ['Cette semaine était douce.',
         'Toutes les semaines n\'ont pas besoin d\'être pleines.\nCertaines semaines sont faites pour rester présent, pas pour aller vite.',
         'Le fil est encore là.'],
    de: ['Diese Woche war sanft.',
         'Nicht jede Woche muss voll sein.\nManche Wochen geht es darum, präsent zu bleiben, nicht darum, schnell zu gehen.',
         'Der Faden ist noch hier.'],
  },
  moderate_hard: {
    en: ['The week had difficult moments.',
         'You kept coming back even when it wasn\'t easy.\nThat takes more than it looks like.',
         'What shows up in hard weeks is often what matters most.'],
    pt: ['A semana teve momentos difíceis.',
         'Você continuou voltando mesmo quando não foi fácil.\nIsso exige mais do que parece.',
         'O que aparece nas semanas difíceis é muitas vezes o que mais importa.'],
    es: ['La semana tuvo momentos difíciles.',
         'Seguiste volviendo incluso cuando no fue fácil.\nEso requiere más de lo que parece.',
         'Lo que aparece en las semanas difíciles es a menudo lo que más importa.'],
    fr: ['La semaine a eu des moments difficiles.',
         'Tu as continué à revenir même quand ce n\'était pas facile.\nCela demande plus qu\'il n\'y paraît.',
         'Ce qui se montre dans les semaines difficiles est souvent ce qui compte le plus.'],
    de: ['Die Woche hatte schwere Momente.',
         'Du bist immer wieder zurückgekehrt, auch wenn es nicht einfach war.\nDas verlangt mehr, als es aussieht.',
         'Was sich in schweren Wochen zeigt, ist oft das, was am meisten zählt.'],
  },
  moderate_flowing: {
    en: ['There was a rhythm this week, even in the spaces between.',
         'You found your way back several times.\nThat pattern is quietly building something.',
         'Each return adds to what\'s already here.'],
    pt: ['Houve um ritmo nesta semana, mesmo nos espaços entre eles.',
         'Você encontrou seu caminho de volta várias vezes.\nEsse padrão está construindo algo silenciosamente.',
         'Cada retorno acrescenta ao que já está aqui.'],
    es: ['Hubo un ritmo esta semana, incluso en los espacios entre ellos.',
         'Encontraste tu camino de regreso varias veces.\nEse patrón está construyendo algo silenciosamente.',
         'Cada regreso agrega a lo que ya está aquí.'],
    fr: ['Il y avait un rythme cette semaine, même dans les espaces entre.',
         'Tu as trouvé ton chemin de retour plusieurs fois.\nCe schéma construit quelque chose silencieusement.',
         'Chaque retour s\'ajoute à ce qui est déjà là.'],
    de: ['Es gab einen Rhythmus in dieser Woche, auch in den Räumen dazwischen.',
         'Du hast mehrmals deinen Weg zurückgefunden.\nDieses Muster baut still etwas auf.',
         'Jede Rückkehr fügt dem hinzu, was bereits hier ist.'],
  },
  consistent_hard: {
    en: ['This week asked a lot of you — and you kept showing up.',
         'There\'s something worth noticing in that.\nConsistency through difficulty is a different kind of strength.',
         'Even heavy weeks leave a trace of presence.'],
    pt: ['Esta semana pediu muito de você — e você continuou aparecendo.',
         'Há algo que vale a pena notar nisso.\nA consistência através da dificuldade é um tipo diferente de força.',
         'Mesmo as semanas pesadas deixam um traço de presença.'],
    es: ['Esta semana te pidió mucho — y seguiste apareciendo.',
         'Hay algo que vale la pena notar en eso.\nLa consistencia a través de la dificultad es un tipo diferente de fuerza.',
         'Incluso las semanas pesadas dejan una huella de presencia.'],
    fr: ['Cette semaine t\'a beaucoup demandé — et tu as continué à te présenter.',
         'Il y a quelque chose qui mérite d\'être remarqué là-dedans.\nLa constance à travers la difficulté est une force différente.',
         'Même les semaines lourdes laissent une trace de présence.'],
    de: ['Diese Woche hat viel von dir verlangt — und du bist trotzdem erschienen.',
         'Daran ist etwas zu bemerken wert.\nBeständigkeit durch Schwierigkeit ist eine andere Art von Stärke.',
         'Selbst schwere Wochen hinterlassen eine Spur von Präsenz.'],
  },
  consistent_flowing: {
    en: ['Something has quietly settled this week.',
         'You were here, day after day.\nNot perfectly. Just present.',
         'What you build by returning — even on ordinary days — is not small.'],
    pt: ['Algo se estabeleceu silenciosamente nesta semana.',
         'Você esteve aqui, dia após dia.\nNão perfeitamente. Apenas presente.',
         'O que você constrói ao voltar — mesmo nos dias ordinários — não é pequeno.'],
    es: ['Algo se ha establecido silenciosamente esta semana.',
         'Estuviste aquí, día tras día.\nNo perfectamente. Solo presente.',
         'Lo que construyes al regresar — incluso en los días ordinarios — no es pequeño.'],
    fr: ['Quelque chose s\'est doucement installé cette semaine.',
         'Tu étais là, jour après jour.\nPas parfaitement. Juste présent.',
         'Ce que tu construis en revenant — même les jours ordinaires — n\'est pas petit.'],
    de: ['Etwas hat sich diese Woche still eingependelt.',
         'Du warst hier, Tag für Tag.\nNicht perfekt. Nur präsent.',
         'Was du durch Zurückkehren aufbaust — auch an gewöhnlichen Tagen — ist nicht klein.'],
  },
};

export function getQuietObservation(insights: WeekInsights, lang: string): string[] {
  const key = observationKey(insights);
  const l   = lang in QUIET_OBSERVATIONS[key] ? lang : 'en';
  return QUIET_OBSERVATIONS[key][l];
}

// ─── Section 9 — Looking Ahead copy ──────────────────────────────────────────

type LookingAheadKey = 'rest' | 'calm' | 'clarity' | 'hard' | 'default';

function lookingAheadKey(insights: WeekInsights): LookingAheadKey {
  const { topCategories, dominantMood } = insights;
  const top = topCategories[0];
  if (top === 'Rest' || (dominantMood === 'hard' && !top)) return 'hard';
  if (top === 'Calm') return 'calm';
  if (top === 'Clarity') return 'clarity';
  if (dominantMood === 'hard') return 'rest';
  return 'default';
}

const LOOKING_AHEAD: Record<LookingAheadKey, Record<string, string[]>> = {
  rest: {
    en: ['The coming week may ask for more rest than effort.', 'It may be worth noticing when tension begins to build.'],
    pt: ['A semana que vem pode pedir mais descanso do que esforço.', 'Pode valer a pena notar quando a tensão começa a aumentar.'],
    es: ['La semana que viene puede pedir más descanso que esfuerzo.', 'Puede valer la pena notar cuando la tensión comienza a acumularse.'],
    fr: ['La semaine qui vient demandera peut-être plus de repos que d\'effort.', 'Il peut être utile de remarquer quand la tension commence à s\'accumuler.'],
    de: ['Die kommende Woche könnte mehr Erholung als Anstrengung fordern.', 'Es könnte sich lohnen zu bemerken, wenn die Spannung beginnt sich aufzubauen.'],
  },
  calm: {
    en: ['The coming week can be met at the same quiet pace.', 'Calm doesn\'t need to be defended — it only needs to be noticed.'],
    pt: ['A semana que vem pode ser recebida no mesmo ritmo quieto.', 'A calma não precisa ser defendida — só precisa ser notada.'],
    es: ['La semana que viene puede ser recibida al mismo ritmo tranquilo.', 'La calma no necesita ser defendida — solo necesita ser notada.'],
    fr: ['La semaine qui vient peut être accueillie au même rythme calme.', 'Le calme n\'a pas besoin d\'être défendu — il a juste besoin d\'être remarqué.'],
    de: ['Die kommende Woche kann im gleichen ruhigen Tempo angegangen werden.', 'Ruhe muss nicht verteidigt werden — sie muss nur bemerkt werden.'],
  },
  clarity: {
    en: ['The coming days may offer small moments of clarity.', 'It may be worth pausing when something feels clear.'],
    pt: ['Os próximos dias podem oferecer pequenos momentos de clareza.', 'Pode valer a pena pausar quando algo parecer claro.'],
    es: ['Los próximos días pueden ofrecer pequeños momentos de claridad.', 'Puede valer la pena hacer una pausa cuando algo se sienta claro.'],
    fr: ['Les prochains jours peuvent offrir de petits moments de clarté.', 'Il peut être utile de faire une pause quand quelque chose semble clair.'],
    de: ['Die kommenden Tage könnten kleine Momente der Klarheit bieten.', 'Es könnte sich lohnen innezuhalten, wenn sich etwas klar anfühlt.'],
  },
  hard: {
    en: ['Next week, there\'s no pressure to be different.', 'Small returns, whenever they come, are enough.'],
    pt: ['Na semana que vem, não há pressão para ser diferente.', 'Pequenos retornos, quando chegarem, já são suficientes.'],
    es: ['La semana próxima, no hay presión para ser diferente.', 'Los pequeños regresos, cuando lleguen, son suficientes.'],
    fr: ['La semaine prochaine, il n\'y a pas de pression pour être différent.', 'Les petits retours, quand ils viennent, sont suffisants.'],
    de: ['Nächste Woche gibt es keinen Druck, anders zu sein.', 'Kleine Rückkehren, wann immer sie kommen, sind genug.'],
  },
  default: {
    en: ['There\'s no particular goal for next week.', 'Just returning, however that looks, is enough.'],
    pt: ['Não há um objetivo específico para a semana que vem.', 'Apenas voltar, seja como for, já é suficiente.'],
    es: ['No hay un objetivo particular para la semana que viene.', 'Solo regresar, como sea que se vea, es suficiente.'],
    fr: ['Il n\'y a pas d\'objectif particulier pour la semaine prochaine.', 'Juste revenir, de quelque façon que ce soit, est suffisant.'],
    de: ['Es gibt kein besonderes Ziel für nächste Woche.', 'Einfach zurückzukehren, wie auch immer das aussieht, ist genug.'],
  },
};

export function getLookingAhead(insights: WeekInsights, lang: string): string[] {
  const key = lookingAheadKey(insights);
  const l   = lang in LOOKING_AHEAD[key] ? lang : 'en';
  return LOOKING_AHEAD[key][l];
}

import { getLocalDateKey } from '../hooks/useStorage';
import { getAppNow } from './appDate';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type WeeklyNarrativeState =
  | 'first_week'
  | 'breakthrough'
  | 'high_consistency'
  | 'momentum'
  | 'comeback'
  | 'low_activity';

export interface WeeklyHighlight {
  icon: string;
  label: string;
  value: string;
  emotional: string;
}

export interface WeeklyNarrativeContent {
  headline: string;
  body: string;
  subtext: string;
}

export interface WeeklyRecapData {
  weekNumber: number;
  weekLabel: string;
  dateLabel: string;
  weekMonday?: string; // 'YYYY-MM-DD' of Monday — calendar-week identifier
  resetsCompleted: number;
  streakAtEnd: number;
  bestStreakAtEnd: number;
  weeklyHabitRate: number;
  totalDaysCompleted: number;
  narrativeState: WeeklyNarrativeState;
  savedAt: string;
}

// ─── Calendar Week Helpers ────────────────────────────────────────────────────

/**
 * Returns the Monday of the Mon-Sun calendar week containing `date`.
 * All date math uses the local timezone of the device.
 */
export function getWeekMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon … 6=Sat
  const diff = day === 0 ? -6 : 1 - day; // if Sunday go back 6 days, else back to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Returns 'YYYY-MM-DD' of the Monday of the calendar week containing `date`. */
export function getWeekMondayKey(date: Date): string {
  return getLocalDateKey(getWeekMonday(date));
}

/**
 * Returns a human-readable date range label for the Mon-Sun week starting at `monday`.
 * e.g. "May 27 – Jun 2" or "May 27 – May 31"
 */
export function getCalendarWeekDateLabel(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const startStr = `${monthNames[monday.getMonth()]} ${monday.getDate()}`;
  const endStr   = `${monthNames[sunday.getMonth()]} ${sunday.getDate()}`;
  return `${startStr} – ${endStr}`;
}

/**
 * Count how many days in a Mon-Sun calendar week have a completion entry.
 * `monday` is the Monday of that week (use getWeekMonday() to obtain it).
 */
export function countResetsInCalendarWeek(
  completedByDate: Record<string, true>,
  monday: Date,
): number {
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    if (completedByDate[getLocalDateKey(d)]) count++;
  }
  return count;
}

/**
 * Returns all Mon-Sun calendar weeks strictly before the current week
 * that have at least one completion in completedByDate.
 * Sorted chronologically, oldest Monday first.
 */
export function getPastCompletedWeeks(
  completedByDate: Record<string, true>,
): Array<{ monday: Date; mondayKey: string; count: number }> {
  const now = getAppNow();
  const currentMondayKey = getLocalDateKey(getWeekMonday(now));

  const seen = new Map<string, Date>();
  for (const dateKey of Object.keys(completedByDate)) {
    const d = new Date(dateKey + 'T00:00:00');
    const monday = getWeekMonday(d);
    const mondayKey = getLocalDateKey(monday);
    if (mondayKey < currentMondayKey && !seen.has(mondayKey)) {
      seen.set(mondayKey, monday);
    }
  }

  return Array.from(seen.entries())
    .map(([mondayKey, monday]) => ({
      monday,
      mondayKey,
      count: countResetsInCalendarWeek(completedByDate, monday),
    }))
    .sort((a, b) => a.mondayKey.localeCompare(b.mondayKey));
}

// ─── Journey Week Utilities ───────────────────────────────────────────────────

/**
 * Returns the journey start date — the first date the user ever completed a reset.
 * Falls back to today if completedByDate is empty.
 */
export function getJourneyStartDate(completedByDate: Record<string, true>): Date {
  const keys = Object.keys(completedByDate).sort();
  if (keys.length === 0) {
    const d = getAppNow();
    d.setHours(0, 0, 0, 0);
    return d;
  }
  const [y, m, dy] = keys[0].split('-').map(Number);
  return new Date(y, m - 1, dy, 0, 0, 0, 0);
}

/**
 * Returns the start date of journey week N (1-based).
 * Week 1 starts on journeyStart; Week 2 = journeyStart + 7 days, etc.
 */
export function getJourneyWeekStart(journeyStart: Date, weekIndex: number): Date {
  const d = new Date(journeyStart);
  d.setDate(journeyStart.getDate() + (weekIndex - 1) * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Returns the current journey week index (1-based).
 * Days 0–6 from journeyStart = Week 1; Days 7–13 = Week 2; etc.
 */
export function getCurrentJourneyWeekIndex(
  journeyStart: Date,
  now: Date = getAppNow(),
): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const startOfJourney = new Date(journeyStart);
  startOfJourney.setHours(0, 0, 0, 0);
  const startOfNow = new Date(now);
  startOfNow.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.max(
    0,
    Math.floor((startOfNow.getTime() - startOfJourney.getTime()) / msPerDay),
  );
  return Math.floor(daysSinceStart / 7) + 1;
}

/**
 * Count how many days in a 7-day journey week have a completion.
 * weekStart can be any weekday — not required to be a Monday.
 */
export function countResetsInJourneyWeek(
  completedByDate: Record<string, true>,
  weekStart: Date,
): number {
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    if (completedByDate[getLocalDateKey(d)]) count++;
  }
  return count;
}

/**
 * Human-readable date range for a journey week, e.g. "Jun 1 – Jun 7".
 */
export function getJourneyWeekDateLabel(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${M[weekStart.getMonth()]} ${weekStart.getDate()} – ${M[weekEnd.getMonth()]} ${weekEnd.getDate()}`;
}

/**
 * Returns all journey weeks strictly before the current week that have at least
 * one completion. Sorted chronologically, earliest week first.
 */
export function getPastJourneyWeeks(
  completedByDate: Record<string, true>,
  journeyStart: Date,
): Array<{ weekIndex: number; weekStart: Date; weekStartKey: string; count: number }> {
  const now = getAppNow();
  const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);
  const result: Array<{
    weekIndex: number;
    weekStart: Date;
    weekStartKey: string;
    count: number;
  }> = [];

  for (let i = 1; i < currentWeekIndex; i++) {
    const weekStart = getJourneyWeekStart(journeyStart, i);
    const count = countResetsInJourneyWeek(completedByDate, weekStart);
    if (count > 0) {
      result.push({ weekIndex: i, weekStart, weekStartKey: getLocalDateKey(weekStart), count });
    }
  }

  return result;
}

// ─── Date Helpers (legacy — kept for backward compatibility) ──────────────────

/** Returns an array of YYYY-MM-DD keys for the last N days (inclusive of today). */
export function getLastNDateKeys(n: number): string[] {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = getAppNow();
    d.setDate(d.getDate() - i);
    keys.push(getLocalDateKey(d));
  }
  return keys;
}

/** Returns a human-readable date range label for the last 7 days. */
export function getWeekDateLabel(): string {
  const end = getAppNow();
  const start = getAppNow();
  start.setDate(end.getDate() - 6);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const startStr = `${monthNames[start.getMonth()]} ${start.getDate()}`;
  const endStr   = `${monthNames[end.getMonth()]} ${end.getDate()}`;
  return `${startStr} – ${endStr}`;
}

/**
 * Count how many of the last 7 calendar days have an entry in completedByDate.
 * Used for "resets completed last week" when triggering on Monday.
 */
export function countResetsInLastWeek(
  completedByDate: Record<string, true>,
  daysBack: number = 7,
): number {
  const keys = getLastNDateKeys(daysBack);
  return keys.filter(k => completedByDate[k]).length;
}

/**
 * Compute weekly habit completion rate from habitLog for the last 7 days.
 * habitLog: { [YYYY-MM-DD]: string[] } — IDs of habits completed that day.
 * totalHabits: total number of habits tracked.
 */
export function computeWeeklyHabitRate(
  habitLog: Record<string, string[]>,
  totalHabits: number,
): number {
  if (totalHabits === 0) return 0;
  const keys = getLastNDateKeys(7);
  const totalSlots = totalHabits * 7;
  const completed = keys.reduce((acc, k) => acc + (habitLog[k]?.length ?? 0), 0);
  return Math.round((completed / totalSlots) * 100);
}

// ─── Narrative State ──────────────────────────────────────────────────────────

export function getWeeklyNarrativeState(
  resetsCompleted: number,
  weekNumber: number,
  prevWeekResets?: number,
): WeeklyNarrativeState {
  if (weekNumber === 1) return 'first_week';
  if (resetsCompleted === 7) return 'breakthrough';
  if (resetsCompleted >= 5) return 'high_consistency';
  if (resetsCompleted >= 3) return 'momentum';
  if (resetsCompleted >= 1) {
    if (prevWeekResets !== undefined && prevWeekResets >= 3) return 'comeback';
    return 'momentum';
  }
  return 'low_activity';
}

// ─── Narrative Copy ───────────────────────────────────────────────────────────

export function getWeeklyNarrative(
  state: WeeklyNarrativeState,
  resetsCompleted: number,
): WeeklyNarrativeContent {
  if (isPt()) {
    switch (state) {
      case 'first_week':
        return {
          headline: resetsCompleted === 7
            ? 'A presença esteve aqui todos os dias.'
            : resetsCompleted >= 3
            ? 'Você apareceu.'
            : resetsCompleted === 1
            ? 'Houve um retorno.'
            : 'A primeira semana passou.',
          body: resetsCompleted === 7
            ? 'Sete dias.\nSete retornos.\nHouve presença em cada um.'
            : resetsCompleted >= 3
            ? `Sua primeira semana trouxe ${resetsCompleted} retornos.\nIsso não foi pequeno.`
            : resetsCompleted === 1
            ? 'Uma vez.\nUma escolha.\nO espaço reapareceu.'
            : 'Esta semana foi quieta.\nMas você ainda está aqui.\nNada foi perdido.',
          subtext: resetsCompleted >= 1
            ? 'Todo ritmo tem um começo.'
            : 'A próxima semana começa amanhã.',
        };
      case 'breakthrough':
        return {
          headline: 'Você apareceu todos os dias desta semana.',
          body: 'Houve presença em cada dia.\nSete retornos.\nAlgo se reorganizou aqui.',
          subtext: 'Sete retornos quietos.',
        };
      case 'high_consistency':
        return {
          headline: 'Seu ritmo apareceu nesta semana.',
          body: `Nem todos os dias foram leves.\nVocê ainda voltou ${resetsCompleted} vezes.\nHouve presença.`,
          subtext: 'Os dias começam a se conectar.',
        };
      case 'momentum':
        return {
          headline: 'Houve retornos nesta semana.',
          body: `Alguns dias foram silenciosos.\nAinda assim, você apareceu ${resetsCompleted} vezes.\nO fio continua.`,
          subtext: 'Mesmo devagar, houve presença.',
        };
      case 'comeback':
        return {
          headline: 'Você voltou.',
          body: 'Houve retornos mesmo nos dias difíceis.\nNem todos os dias foram leves.\nVocê ainda voltou.',
          subtext: 'O espaço continuou aqui.',
        };
      case 'low_activity':
        return {
          headline: 'Alguns dias foram silenciosos.',
          body: 'Esta semana foi quieta.\nMas você ainda está aqui.\nNada foi perdido.',
          subtext: 'A próxima semana começa amanhã.',
        };
    }
  }

  if (isEs()) {
    switch (state) {
      case 'first_week':
        return {
          headline: resetsCompleted === 7
            ? 'Algo comenzó esta semana.'
            : resetsCompleted >= 3
            ? 'Apareciste.'
            : resetsCompleted === 1
            ? 'Hubo un regreso.'
            : 'La primera semana pasó.',
          body: resetsCompleted === 7
            ? 'Siete días.\nSiete regresos.\nHubo presencia en cada uno.'
            : resetsCompleted >= 3
            ? `Tu primera semana tuvo ${resetsCompleted} regresos.\nEso no fue pequeño.`
            : resetsCompleted === 1
            ? 'Una vez.\nUna elección.\nAlgo comenzó aquí.'
            : 'Esta semana fue quieta.\nPero sigues aquí.\nNada se perdió.',
          subtext: resetsCompleted >= 1
            ? 'Todo ritmo tiene un comienzo.'
            : 'La próxima semana empieza mañana.',
        };
      case 'breakthrough':
        return {
          headline: 'Estuviste aquí todos los días de esta semana.',
          body: 'Hubo presencia cada día.\nSiete regresos.\nAlgo se reorganizó aquí.',
          subtext: 'Siete regresos tranquilos.',
        };
      case 'high_consistency':
        return {
          headline: 'Tu ritmo apareció esta semana.',
          body: `No todos los días fueron fáciles.\nAún así, regresaste ${resetsCompleted} veces.\nHubo presencia.`,
          subtext: 'Los días empiezan a conectarse.',
        };
      case 'momentum':
        return {
          headline: 'Hubo regresos esta semana.',
          body: `Algunos días fueron silenciosos.\nAun así, apareciste ${resetsCompleted} veces.\nEl hilo continúa.`,
          subtext: 'Aunque despacio, hubo presencia.',
        };
      case 'comeback':
        return {
          headline: 'Regresaste.',
          body: 'Hubo regresos incluso en los días difíciles.\nNo todos los días fueron fáciles.\nAún así, volviste.',
          subtext: 'El espacio seguía aquí.',
        };
      case 'low_activity':
        return {
          headline: 'Algunos días fueron silenciosos.',
          body: 'Esta semana fue tranquila.\nPero sigues aquí.\nNada se perdió.',
          subtext: 'La próxima semana empieza mañana.',
        };
    }
  }

  if (isFr()) {
    switch (state) {
      case 'first_week':
        return {
          headline: resetsCompleted === 7
            ? 'Quelque chose a commencé cette semaine.'
            : resetsCompleted >= 3
            ? 'Tu t\'es présenté.'
            : resetsCompleted === 1
            ? 'Il y a eu un retour.'
            : 'La première semaine est passée.',
          body: resetsCompleted === 7
            ? 'Sept jours.\nSept retours.\nIl y avait de la présence dans chacun.'
            : resetsCompleted >= 3
            ? `Ta première semaine a tenu ${resetsCompleted} retours.\nCe n\'était pas rien.`
            : resetsCompleted === 1
            ? 'Une fois.\nUn choix.\nQuelque chose a commencé ici.'
            : 'Cette semaine était tranquille.\nMais tu es encore là.\nRien n\'a été perdu.',
          subtext: resetsCompleted >= 1
            ? 'Tout rythme a un début.'
            : 'La prochaine semaine commence demain.',
        };
      case 'breakthrough':
        return {
          headline: 'Tu étais là chaque jour de cette semaine.',
          body: 'Il y avait de la présence chaque jour.\nSept retours.\nQuelque chose s\'est réorganisé ici.',
          subtext: 'Sept retours tranquilles.',
        };
      case 'high_consistency':
        return {
          headline: 'Ton rythme est apparu cette semaine.',
          body: `Tous les jours n\'ont pas été faciles.\nTu es quand même revenu ${resetsCompleted} fois.\nIl y avait de la présence.`,
          subtext: 'Les jours commencent à se connecter.',
        };
      case 'momentum':
        return {
          headline: 'Il y a eu des retours cette semaine.',
          body: `Certains jours étaient silencieux.\nTu t\'es quand même présenté ${resetsCompleted} fois.\nLe fil continue.`,
          subtext: 'Même lentement, il y avait de la présence.',
        };
      case 'comeback':
        return {
          headline: 'Tu es revenu.',
          body: 'Il y a eu des retours même dans les jours difficiles.\nTous les jours n\'ont pas été faciles.\nTu es quand même revenu.',
          subtext: 'L\'espace était toujours là.',
        };
      case 'low_activity':
        return {
          headline: 'Certains jours étaient tranquilles.',
          body: 'Cette semaine était calme.\nMais tu es encore là.\nRien n\'a été perdu.',
          subtext: 'La prochaine semaine commence demain.',
        };
    }
  }

  if (isDe()) {
    switch (state) {
      case 'first_week':
        return {
          headline: resetsCompleted === 7
            ? 'Etwas begann diese Woche.'
            : resetsCompleted >= 3
            ? 'Du bist erschienen.'
            : resetsCompleted === 1
            ? 'Es gab eine Rückkehr.'
            : 'Die erste Woche ist vergangen.',
          body: resetsCompleted === 7
            ? 'Sieben Tage.\nSieben Rückkehren.\nIn jedem war Präsenz.'
            : resetsCompleted >= 3
            ? `Deine erste Woche hatte ${resetsCompleted} Rückkehren.\nDas war nicht klein.`
            : resetsCompleted === 1
            ? 'Einmal.\nEine Entscheidung.\nEtwas begann hier.'
            : 'Diese Woche war still.\nAber du bist noch hier.\nNichts ist verloren.',
          subtext: resetsCompleted >= 1
            ? 'Jeder Rhythmus hat einen Anfang.'
            : 'Die nächste Woche beginnt morgen.',
        };
      case 'breakthrough':
        return {
          headline: 'Du warst diese Woche jeden Tag hier.',
          body: 'An jedem Tag war Präsenz.\nSieben Rückkehren.\nEtwas hat sich hier neu geordnet.',
          subtext: 'Sieben stille Rückkehren.',
        };
      case 'high_consistency':
        return {
          headline: 'Dein Rhythmus erschien diese Woche.',
          body: `Nicht jeder Tag war leicht.\nDu bist trotzdem ${resetsCompleted} Mal zurückgekehrt.\nEs gab Präsenz.`,
          subtext: 'Die Tage beginnen sich zu verbinden.',
        };
      case 'momentum':
        return {
          headline: 'Diese Woche gab es Rückkehren.',
          body: `Einige Tage waren still.\nDu bist trotzdem ${resetsCompleted} Mal erschienen.\nDer Faden geht weiter.`,
          subtext: 'Auch langsam war Präsenz da.',
        };
      case 'comeback':
        return {
          headline: 'Du bist zurückgekehrt.',
          body: 'Auch an schweren Tagen gab es Rückkehren.\nNicht jeder Tag war leicht.\nDu bist trotzdem zurückgekehrt.',
          subtext: 'Der Raum war noch hier.',
        };
      case 'low_activity':
        return {
          headline: 'Einige Tage waren still.',
          body: 'Diese Woche war ruhig.\nAber du bist noch hier.\nNichts ist verloren.',
          subtext: 'Die nächste Woche beginnt morgen.',
        };
    }
  }

  switch (state) {
    case 'first_week':
      return {
        headline: resetsCompleted === 7
          ? 'Something began this week.'
          : resetsCompleted >= 3
          ? 'You appeared.'
          : resetsCompleted === 1
          ? 'There was one return.'
          : 'The first week passed.',
        body: resetsCompleted === 7
          ? 'Seven days.\nSeven returns.\nThere was presence in each one.'
          : resetsCompleted >= 3
          ? `Your first week held ${resetsCompleted} returns.\nThat wasn\'t small.`
          : resetsCompleted === 1
          ? 'Once.\nOne choice.\nSomething began here.'
          : 'This week was quiet.\nBut you\'re still here.\nNothing was lost.',
        subtext: resetsCompleted >= 1
          ? 'Every rhythm has a beginning.'
          : 'Next week begins tomorrow.',
      };

    case 'breakthrough':
      return {
        headline: 'You were here every day this week.',
        body: 'There was presence each day.\nSeven returns.\nSomething reorganized here.',
        subtext: 'Seven quiet returns.',
      };

    case 'high_consistency':
      return {
        headline: 'Your rhythm appeared this week.',
        body: `Not every day was easy.\nYou still returned ${resetsCompleted} times.\nThere was presence.`,
        subtext: 'The days are beginning to connect.',
      };

    case 'momentum':
      return {
        headline: 'There were returns this week.',
        body: `Some days were quiet.\nYou still appeared ${resetsCompleted} times.\nThe thread continues.`,
        subtext: 'Even slowly, there was presence.',
      };

    case 'comeback':
      return {
        headline: 'You returned.',
        body: 'There were returns even on difficult days.\nNot every day was easy.\nYou came back anyway.',
        subtext: 'The space was still here.',
      };

    case 'low_activity':
      return {
        headline: 'Some days were quiet.',
        body: 'This week was still.\nBut you\'re still here.\nNothing was lost.',
        subtext: 'Next week begins tomorrow.',
      };
  }
}

// ─── Emotional Metrics ────────────────────────────────────────────────────────

export interface EmotionalMetric {
  raw: string;
  emotional: string;
  icon: string;
}

export function getEmotionalMetrics(
  resetsCompleted: number,
  streak: number,
  weekNumber: number,
): EmotionalMetric[] {
  const metrics: EmotionalMetric[] = [];

  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();
  // Resets
  metrics.push({
    raw: `${resetsCompleted}/7 resets`,
    emotional: de
      ? (resetsCompleted === 7
          ? 'Du bist jeden Tag erschienen.'
          : resetsCompleted >= 5
          ? `Du bist ${resetsCompleted} Mal diese Woche erschienen.`
          : resetsCompleted === 1
          ? 'Du bist zurückgekehrt. Das zählt.'
          : resetsCompleted === 0
          ? 'Die nächste Woche beginnt morgen.'
          : `${resetsCompleted} stille Rückkehren.`)
      : pt
      ? (resetsCompleted === 7
          ? 'Você voltou todos os dias.'
          : resetsCompleted >= 5
          ? `Você voltou ${resetsCompleted} vezes nesta semana.`
          : resetsCompleted === 1
          ? 'Você voltou. Isso conta.'
          : resetsCompleted === 0
          ? 'A próxima semana começa amanhã.'
          : `${resetsCompleted} retornos quietos.`)
      : es
      ? (resetsCompleted === 7
          ? 'Te presentaste todos los días.'
          : resetsCompleted >= 5
          ? `Te presentaste ${resetsCompleted} veces esta semana.`
          : resetsCompleted === 1
          ? 'Regresaste. Eso cuenta.'
          : resetsCompleted === 0
          ? 'La próxima semana empieza mañana.'
          : `${resetsCompleted} días eligiéndote.`)
      : fr
      ? (resetsCompleted === 7
          ? 'Tu t\'es présenté chaque jour.'
          : resetsCompleted >= 5
          ? `Tu t\'es présenté ${resetsCompleted} fois cette semaine.`
          : resetsCompleted === 1
          ? 'Tu es revenu. Ça compte.'
          : resetsCompleted === 0
          ? 'La prochaine semaine commence demain.'
          : `${resetsCompleted} retours tranquilles.`)
      : (resetsCompleted === 7
          ? 'You showed up every single day.'
          : resetsCompleted >= 5
          ? `You showed up ${resetsCompleted} times this week.`
          : resetsCompleted === 1
          ? 'You returned. That counts.'
          : resetsCompleted === 0
          ? 'Next week starts tomorrow.'
          : `${resetsCompleted} quiet returns.`),
    icon: 'sunny',
  });

  // Rhythm (previously "streak" — language removed)
  if (streak > 0) {
    metrics.push({
      raw: de ? `${streak} stille Rückkehren` : pt ? `${streak} retornos quietos` : es ? `${streak} días` : fr ? `${streak} retours tranquilles` : `${streak} quiet returns`,
      emotional: de
        ? (streak >= 21
            ? `${streak} Tage. Du baust etwas Echtes auf.`
            : streak >= 7
            ? `${streak} stille Rückkehren.`
            : streak >= 3
            ? `${streak} stille Rückkehren.`
            : 'Der Rhythmus kehrt zurück.')
        : pt
        ? (streak >= 21
            ? `${streak} dias. Você está construindo algo real.`
            : streak >= 7
            ? `${streak} retornos quietos.`
            : streak >= 3
            ? `${streak} retornos quietos.`
            : 'O ritmo está voltando.')
        : es
        ? (streak >= 21
            ? `${streak} días. Estás construyendo algo real.`
            : streak >= 7
            ? `${streak} días de continuidad.`
            : streak >= 3
            ? `${streak} días eligiéndote.`
            : 'El ritmo está regresando.')
        : fr
        ? (streak >= 21
            ? `${streak} jours. Tu construis quelque chose de réel.`
            : streak >= 7
            ? `${streak} retours tranquilles.`
            : streak >= 3
            ? `${streak} retours tranquilles.`
            : 'Le rythme revient.')
        : (streak >= 21
            ? `${streak} days. You are building something real.`
            : streak >= 7
            ? `${streak} quiet returns.`
            : streak >= 3
            ? `${streak} quiet returns.`
            : 'The rhythm is returning.'),
      icon: 'leaf-outline',
    });
  }

  // Week milestone
  metrics.push({
    raw: de ? `Woche ${weekNumber}` : pt ? `Semana ${weekNumber}` : es ? `Semana ${weekNumber}` : fr ? `Semaine ${weekNumber}` : `Week ${weekNumber}`,
    emotional: de
      ? (weekNumber >= 12
          ? 'Drei Monate erscheinen.'
          : weekNumber >= 8
          ? 'Zwei Monate. Du hast weitergemacht.'
          : weekNumber >= 4
          ? 'Ein Monat erscheinen.'
          : weekNumber >= 2
          ? 'Du bist über den Anfang hinausgegangen.'
          : 'Du bist in Bewegung.')
      : pt
      ? (weekNumber >= 12
          ? 'Três meses voltando.'
          : weekNumber >= 8
          ? 'Dois meses. Você continuou.'
          : weekNumber >= 4
          ? 'Um mês voltando.'
          : weekNumber >= 2
          ? 'Você foi além do começo.'
          : 'Você está em movimento.')
      : es
      ? (weekNumber >= 12
          ? 'Tres meses presentándote.'
          : weekNumber >= 8
          ? 'Dos meses. Seguiste.'
          : weekNumber >= 4
          ? 'Un mes presentándote.'
          : weekNumber >= 2
          ? 'Seguiste más allá del comienzo.'
          : 'Estás en marcha.')
      : fr
      ? (weekNumber >= 12
          ? 'Trois mois à te présenter.'
          : weekNumber >= 8
          ? 'Deux mois. Tu as continué.'
          : weekNumber >= 4
          ? 'Un mois à te présenter.'
          : weekNumber >= 2
          ? 'Tu es allé au-delà du début.'
          : 'Tu es en mouvement.')
      : (weekNumber >= 12
          ? 'Three months of showing up.'
          : weekNumber >= 8
          ? 'Two months in. You kept going.'
          : weekNumber >= 4
          ? 'A month of showing up.'
          : weekNumber >= 2
          ? 'You kept going past the beginning.'
          : 'You\'re underway.'),
    icon: 'calendar',
  });

  return metrics;
}

// ─── Weekly Highlights ────────────────────────────────────────────────────────

export function getWeeklyHighlights(
  resetsCompleted: number,
  streak: number,
  weeklyHabitRate: number,
  weekNumber: number,
): WeeklyHighlight[] {
  const highlights: WeeklyHighlight[] = [];

  const de = isDe();
  const es = isEs();
  const pt = isPt();
  const fr = isFr();

  if (resetsCompleted > 0) {
    highlights.push({
      icon: 'checkmark-circle',
      label: de ? 'Du bist immer wieder erschienen' : es ? 'Seguiste volviendo' : pt ? 'Você continuou voltando' : fr ? 'Tu as continué à revenir' : 'You kept showing up',
      value: de ? `${resetsCompleted} von 7 Tagen` : es ? `${resetsCompleted} de 7 días` : pt ? `${resetsCompleted} de 7 dias` : fr ? `${resetsCompleted} sur 7 jours` : `${resetsCompleted} of 7 days`,
      emotional: resetsCompleted === 7
        ? (de ? 'Du warst jeden Tag hier. Das ist alles.' : es ? 'Estuviste aquí todos los días. Eso lo es todo.' : pt ? 'Você apareceu todos os dias. Isso é tudo.' : fr ? 'Tu t\'es présenté chaque jour. C\'est tout.' : 'You showed up every single day. That\'s everything.')
        : resetsCompleted >= 5
        ? (de ? 'Du hast deine Aufmerksamkeit geschützt.' : es ? 'Protegiste tu atención.' : pt ? 'Você protegeu seu foco.' : fr ? 'Tu as protégé ton attention.' : 'You protected your focus.')
        : (de ? 'Du hast den Rhythmus wiedergefunden.' : es ? 'Volviste a encontrar el ritmo.' : pt ? 'Você reconstruiu o impulso.' : fr ? 'Tu as retrouvé le rythme.' : 'You rebuilt momentum.'),
    });
  }

  if (streak >= 3) {
    highlights.push({
      icon: 'leaf-outline',
      label: de ? 'Stiller Rhythmus' : pt ? 'Ritmo quieto' : es ? 'Ritmo tranquilo' : fr ? 'Rythme tranquille' : 'Quiet rhythm',
      value: de ? `${streak} Tage` : pt ? `${streak} dias` : es ? `${streak} días` : fr ? `${streak} jours` : `${streak} days`,
      emotional: streak >= 7
        ? (de ? 'Eine ruhigere Woche.' : pt ? 'Uma semana mais tranquila.' : es ? 'Una semana más suave.' : fr ? 'Une semaine plus douce.' : 'A softer week.')
        : (de ? `${streak} stille Rückkehren.` : pt ? `${streak} retornos quietos.` : es ? `${streak} regresos tranquilos.` : fr ? `${streak} retours tranquilles.` : `${streak} quiet returns.`),
    });
  }

  if (weeklyHabitRate >= 30) {
    highlights.push({
      icon: 'star',
      label: de ? 'Gewohnheitsrhythmus' : es ? 'Ritmo de hábitos' : pt ? 'Ritmo de hábitos' : fr ? 'Rythme des habitudes' : 'Habit rhythm',
      value: `${weeklyHabitRate}%`,
      emotional: weeklyHabitRate >= 70
        ? (de ? 'Deine Gewohnheiten werden automatisch.' : es ? 'Tus hábitos se están volviendo automáticos.' : pt ? 'Seus hábitos estão se tornando automáticos.' : fr ? 'Tes habitudes deviennent automatiques.' : 'Your habits are becoming automatic.')
        : weeklyHabitRate >= 40
        ? (de ? 'Beständigkeit wächst.' : es ? 'La constancia está creciendo.' : pt ? 'A constância está crescendo.' : fr ? 'La constance grandit.' : 'Consistency is growing.')
        : (de ? 'Kleine Schritte bauen den Weg.' : es ? 'Pequeños pasos construyen el camino.' : pt ? 'Pequenos passos constroem o caminho.' : fr ? 'Les petits pas construisent le chemin.' : 'Small steps build the path.'),
    });
  }

  if (weekNumber >= 2) {
    highlights.push({
      icon: 'trending-up',
      label: de ? 'Reise' : es ? 'Jornada' : pt ? 'Jornada' : fr ? 'Chemin' : 'Journey',
      value: de ? `Woche ${weekNumber} abgeschlossen` : es ? `Semana ${weekNumber} completa` : pt ? `Semana ${weekNumber} completa` : fr ? `Semaine ${weekNumber} terminée` : `Week ${weekNumber} complete`,
      emotional: weekNumber >= 4
        ? (de ? 'Du hast nicht in der ersten Woche aufgehört.' : es ? 'No te detuviste en la primera semana.' : pt ? 'Você não parou na primeira semana.' : fr ? 'Tu ne t\'es pas arrêté à la première semaine.' : 'You didn\'t stop at week one.')
        : (de ? 'Du bist über den Anfang hinausgegangen.' : es ? 'Seguiste más allá del comienzo.' : pt ? 'Você foi além do começo.' : fr ? 'Tu es allé au-delà du début.' : 'You kept going past the beginning.'),
    });
  }

  // Ensure at least one highlight always
  if (highlights.length === 0) {
    highlights.push({
      icon: 'heart',
      label: de ? 'Du bist noch hier' : es ? 'Sigues aquí' : pt ? 'Você ainda está aqui' : fr ? 'Tu es encore là' : 'You\'re still here',
      value: de ? 'Das zählt' : es ? 'Eso importa' : pt ? 'Isso importa' : fr ? 'Ça compte' : 'That matters',
      emotional: de ? 'Jede Rückkehr ist ein neuer Anfang.' : es ? 'Cada regreso es un nuevo comienzo.' : pt ? 'Cada retorno é um recomeço.' : fr ? 'Chaque retour est un nouveau départ.' : 'Every return is a fresh start.',
    });
  }

  return highlights;
}

// ─── Momentum State ───────────────────────────────────────────────────────────

export type MomentumLevel = 'exceptional' | 'strong' | 'building' | 'returning' | 'quiet';

export function getWeeklyMomentumState(
  resetsCompleted: number,
  streak: number,
): MomentumLevel {
  if (resetsCompleted === 7 && streak >= 7) return 'exceptional';
  if (resetsCompleted >= 5 || streak >= 7) return 'strong';
  if (resetsCompleted >= 3 || streak >= 3) return 'building';
  if (resetsCompleted >= 1) return 'returning';
  return 'quiet';
}

// ─── Future Momentum ──────────────────────────────────────────────────────────

export function getWeeklyFutureMomentum(state: WeeklyNarrativeState): string[] {
  if (isDe()) {
    switch (state) {
      case 'breakthrough':
        return ['Etwas hat sich diese Woche verändert.', 'Die nächste Woche beginnt von hier.', 'Dein Rhythmus wächst weiter.'];
      case 'high_consistency':
        return ['Kleine Beständigkeit wird Identität.', 'Die nächste Woche beginnt morgen.', 'Die kommende Woche gehört dir bereits.'];
      case 'momentum':
        return ['Der Faden geht weiter.', 'Wieder zu erscheinen ist genug.', 'Der Schwung hält an.'];
      case 'comeback':
        return ['Du bist zurückgekehrt. Das zählt bereits.', 'Die nächste Woche beginnt von hier.', 'Zurückkehren ist seine eigene Form der Stabilität.'];
      case 'first_week':
        return ['Etwas beginnt sich zu setzen.', 'Jede Rückkehr hinterlässt etwas in dir.', 'Der Rhythmus beginnt sich zu formen.'];
      case 'low_activity':
      default:
        return ['Die nächste Woche beginnt morgen.', 'Ein Reset reicht, um neu anzufangen.', 'Der Rhythmus kann zurückkehren.'];
    }
  }

  if (isPt()) {
    switch (state) {
      case 'breakthrough':
        return ['Algo mudou nesta semana.', 'A próxima semana começa daqui.', 'Seu futuro se forma em silêncio, um dia de cada vez.'];
      case 'high_consistency':
        return ['A constância pequena se torna identidade.', 'A próxima semana começa amanhã.', 'A semana que vem já é sua.'];
      case 'momentum':
        return ['O fio continua.', 'Voltar de novo já é suficiente.', 'O retorno continua.'];
      case 'comeback':
        return ['Você voltou. Isso já importa.', 'A próxima semana começa daqui.', 'Voltar é sua própria forma de estabilidade.'];
      case 'first_week':
        return ['A primeira semana é onde tudo começa.', 'Cada retorno se soma ao que está aqui.', 'O ritmo está se formando.'];
      case 'low_activity':
      default:
        return ['A próxima semana começa amanhã.', 'Um reset já é suficiente para recomeçar.', 'O ritmo pode voltar.'];
    }
  }

  if (isEs()) {
    switch (state) {
      case 'breakthrough':
        return ['Algo cambió esta semana.', 'La próxima semana empieza desde aquí.', 'Tu ritmo sigue creciendo.'];
      case 'high_consistency':
        return ['La constancia pequeña se vuelve identidad.', 'La próxima semana empieza mañana.', 'La semana que viene ya es tuya.'];
      case 'momentum':
        return ['El hilo continúa.', 'Volver otra vez ya es suficiente.', 'El movimiento sigue.'];
      case 'comeback':
        return ['Regresaste. Eso ya importa.', 'La próxima semana empieza desde aquí.', 'Regresar es su propio tipo de estabilidad.'];
      case 'first_week':
        return ['Algo empezó a asentarse.', 'Cada regreso deja algo en ti.', 'El ritmo empieza a quedarse.'];
      case 'low_activity':
      default:
        return ['La próxima semana empieza mañana.', 'Un reset es suficiente para comenzar de nuevo.', 'El ritmo puede volver.'];
    }
  }

  if (isFr()) {
    switch (state) {
      case 'breakthrough':
        return ['Quelque chose a changé cette semaine.', 'La prochaine semaine commence d\'ici.', 'Ton rythme continue de grandir.'];
      case 'high_consistency':
        return ['La petite constance devient identité.', 'La prochaine semaine commence demain.', 'La semaine qui vient est déjà tienne.'];
      case 'momentum':
        return ['Le fil continue.', 'Revenir encore suffit.', 'L\'élan continue.'];
      case 'comeback':
        return ['Tu es revenu. Ça compte déjà.', 'La prochaine semaine commence d\'ici.', 'Revenir est sa propre forme de stabilité.'];
      case 'first_week':
        return ['Quelque chose a commencé à se stabiliser.', 'Chaque retour laisse quelque chose en toi.', 'Le rythme commence à s\'installer.'];
      case 'low_activity':
      default:
        return ['La prochaine semaine commence demain.', 'Un reset suffit pour recommencer.', 'Le rythme peut revenir.'];
    }
  }

  switch (state) {
    case 'breakthrough':
      return [
        'Something shifted this week.',
        'Next week begins from here.',
        'Your future is shaped quietly, daily.',
      ];
    case 'high_consistency':
      return [
        'Small consistency becomes identity.',
        'Next week starts tomorrow.',
        'The next week is already yours.',
      ];
    case 'momentum':
      return [
        'The thread continues.',
        'Showing up again is enough.',
        'Momentum continues.',
      ];
    case 'comeback':
      return [
        'You returned. That already matters.',
        'Next week starts from here.',
        'Returning is its own kind of steadiness.',
      ];
    case 'first_week':
      return [
        'The first week is where it begins.',
        'Each return adds to what\'s here.',
        'The rhythm is forming.',
      ];
    case 'low_activity':
    default:
      return [
        'Next week starts tomorrow.',
        'One reset is enough to begin again.',
        'The rhythm can return.',
      ];
  }
}

// ─── Celebration Level ────────────────────────────────────────────────────────

export type CelebrationLevel = 'none' | 'soft' | 'strong' | 'exceptional';

export function getCelebrationLevel(
  resetsCompleted: number,
  streak: number,
): CelebrationLevel {
  if (resetsCompleted === 7 || streak >= 21) return 'exceptional';
  if (resetsCompleted >= 5 || streak >= 7) return 'strong';
  if (resetsCompleted >= 3 || streak >= 3) return 'soft';
  return 'none';
}

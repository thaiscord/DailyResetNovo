import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';
import {
  WeeklyRecapData,
  WeeklyNarrativeState,
  countResetsInCalendarWeek,
  computeWeeklyHabitRate,
  getWeeklyNarrativeState,
  getCalendarWeekDateLabel,
  getWeekMonday,
} from '../utils/weeklyRecap';
import { ProgressState } from './useProgress';
import { isEs, isPt } from '../utils/langStore';
import { getAppNow } from '../utils/appDate';

function weekLabel(n: number): string {
  return isPt() || isEs() ? `Semana ${n}` : `Week ${n}`;
}

/**
 * Returns the Monday of the most recently completed Mon-Sun calendar week.
 * - On Monday: the week that just ended (last Mon → last Sun).
 * - On Sunday ≥ 18:00: the current week (Mon → today), which is ending.
 */
function getLastCompletedWeekMonday(now: Date): Date {
  const dow = now.getDay(); // 0=Sun, 1=Mon
  const currentMonday = getWeekMonday(now);
  if (dow === 1) {
    const lastMonday = new Date(currentMonday);
    lastMonday.setDate(currentMonday.getDate() - 7);
    return lastMonday;
  }
  // Sunday: the current week's Monday is the start of the week ending today
  return new Date(currentMonday);
}

// ─── Auto-trigger logic ───────────────────────────────────────────────────────
// Fires on Sunday ≥ 18:00 or Monday when the previous Mon-Sun week has not
// been recapped yet. Does NOT require 7 completed resets — any number works.

function shouldAutoTrigger(
  lastRecapWeekMonday: string,           // 'YYYY-MM-DD' stored, or '' if never
  completedByDate: Record<string, true>,
): boolean {
  const now = getAppNow();
  const dow  = now.getDay();
  const hour = now.getHours();

  const isSundayEvening = dow === 0 && hour >= 18;
  const isMonday        = dow === 1;
  if (!isSundayEvening && !isMonday) return false;

  // Need at least one completion ever to produce a meaningful recap
  if (Object.keys(completedByDate).length === 0) return false;

  const lastCompletedMondayKey = getLocalDateKey(getLastCompletedWeekMonday(now));

  // Already recapped this calendar week (or a more recent one)
  if (lastRecapWeekMonday !== '' && lastRecapWeekMonday >= lastCompletedMondayKey) return false;

  return true;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWeeklyRecap(
  progress: ProgressState,
  weeklyScore: number, // kept in signature for caller compatibility; not used internally
  habitLog: Record<string, string[]> = {},
  totalHabits: number = 10,
) {
  const [recaps, setRecaps] = useState<WeeklyRecapData[]>([]);
  const [shouldShowRecap, setShouldShowRecap] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [storedRecaps, lastRecapWeekMonday] = await Promise.all([
      getItem<WeeklyRecapData[]>(StorageKeys.WEEKLY_RECAPS, []),
      getItem<string>(StorageKeys.LAST_RECAP_WEEK_MONDAY, ''),
    ]);
    setRecaps(storedRecaps);
    setShouldShowRecap(shouldAutoTrigger(lastRecapWeekMonday, progress.completedByDate));
    setLoading(false);
  }, [progress.completedByDate]);

  useEffect(() => { load(); }, [load]);

  /** Generate and persist a recap snapshot for the just-finished calendar week. */
  const generateAndSave = useCallback(async (): Promise<WeeklyRecapData> => {
    const now = getAppNow();
    const lastCompletedMonday = getLastCompletedWeekMonday(now);
    const weekMondayKey = getLocalDateKey(lastCompletedMonday);

    // Return existing recap if this week was already saved
    const existing = recaps.find(r => r.weekMonday === weekMondayKey);
    if (existing) return existing;

    const weekNumber      = recaps.length + 1;
    const resetsCompleted = countResetsInCalendarWeek(progress.completedByDate, lastCompletedMonday);
    const weeklyHabitRate = computeWeeklyHabitRate(habitLog, totalHabits);
    const prevWeek        = recaps[recaps.length - 1];

    const narrativeState: WeeklyNarrativeState = getWeeklyNarrativeState(
      resetsCompleted,
      weekNumber,
      prevWeek?.resetsCompleted,
    );

    const recap: WeeklyRecapData = {
      weekNumber,
      weekLabel:         weekLabel(weekNumber),
      dateLabel:         getCalendarWeekDateLabel(lastCompletedMonday),
      weekMonday:        weekMondayKey,
      resetsCompleted,
      streakAtEnd:       progress.streak,
      bestStreakAtEnd:   progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt:           new Date().toISOString(),
    };

    const updated = [...recaps, recap];
    await Promise.all([
      setItem(StorageKeys.WEEKLY_RECAPS, updated),
      setItem(StorageKeys.LAST_RECAP_WEEK_MONDAY, weekMondayKey),
    ]);
    setRecaps(updated);
    return recap;
  }, [progress, habitLog, totalHabits, recaps]);

  /**
   * Generate a "live" (unsaved) recap for the current calendar week in progress.
   * Used when the user manually opens the recap from the Progress tab mid-week.
   */
  const generateCurrentWeekPreview = useCallback((): WeeklyRecapData => {
    const now           = getAppNow();
    const currentMonday = getWeekMonday(now);
    const weekMondayKey = getLocalDateKey(currentMonday);

    const weekNumber      = recaps.length + 1;
    const resetsCompleted = countResetsInCalendarWeek(progress.completedByDate, currentMonday);
    const weeklyHabitRate = computeWeeklyHabitRate(habitLog, totalHabits);
    const prevWeek        = recaps[recaps.length - 1];

    const narrativeState = getWeeklyNarrativeState(
      resetsCompleted,
      weekNumber,
      prevWeek?.resetsCompleted,
    );

    return {
      weekNumber,
      weekLabel:         weekLabel(weekNumber),
      dateLabel:         getCalendarWeekDateLabel(currentMonday),
      weekMonday:        weekMondayKey,
      resetsCompleted,
      streakAtEnd:       progress.streak,
      bestStreakAtEnd:   progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt:           new Date().toISOString(),
    };
  }, [progress, habitLog, totalHabits, recaps]);

  const dismissAutoTrigger = useCallback(async () => {
    const now = getAppNow();
    const weekMondayKey = getLocalDateKey(getLastCompletedWeekMonday(now));
    await setItem(StorageKeys.LAST_RECAP_WEEK_MONDAY, weekMondayKey);
    setShouldShowRecap(false);
  }, []);

  const getRecapForWeek = useCallback(
    (weekNum: number): WeeklyRecapData | undefined =>
      recaps.find(r => r.weekNumber === weekNum),
    [recaps],
  );

  return {
    recaps,
    shouldShowRecap,
    loading,
    generateAndSave,
    generateCurrentWeekPreview,
    dismissAutoTrigger,
    getRecapForWeek,
  };
}

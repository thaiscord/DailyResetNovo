import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';
import {
  WeeklyRecapData,
  WeeklyNarrativeState,
  countResetsInLastWeek,
  computeWeeklyHabitRate,
  getWeeklyNarrativeState,
  getWeekDateLabel,
} from '../utils/weeklyRecap';
import { ProgressState } from './useProgress';
import { isEs, isPt } from '../utils/langStore';

function weekLabel(n: number): string {
  return isPt() || isEs() ? `Semana ${n}` : `Week ${n}`;
}

// ─── Auto-trigger logic ───────────────────────────────────────────────────────
// Fires on Sunday ≥ 18:00 or Monday (any time) when a recap for the
// just-finished program week hasn't been shown yet.

function shouldAutoTrigger(currentDay: number, lastRecapWeek: number): boolean {
  if (currentDay < 8) return false; // need at least one full week done

  const currentProgramWeek = Math.ceil(currentDay / 7);
  const completedProgramWeek = currentProgramWeek - 1;

  if (lastRecapWeek >= completedProgramWeek) return false; // already shown

  const dow = new Date().getDay();
  const hour = new Date().getHours();
  const isSundayEvening = dow === 0 && hour >= 18;
  const isMonday = dow === 1;
  return isSundayEvening || isMonday;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWeeklyRecap(
  progress: ProgressState,
  weeklyScore: number,
  habitLog: Record<string, string[]> = {},
  totalHabits: number = 10,
) {
  const [recaps, setRecaps] = useState<WeeklyRecapData[]>([]);
  const [shouldShowRecap, setShouldShowRecap] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [storedRecaps, lastRecapWeek] = await Promise.all([
      getItem<WeeklyRecapData[]>(StorageKeys.WEEKLY_RECAPS, []),
      getItem<number>(StorageKeys.LAST_RECAP_WEEK, 0),
    ]);

    setRecaps(storedRecaps);
    setShouldShowRecap(shouldAutoTrigger(progress.currentDay, lastRecapWeek));
    setLoading(false);
  }, [progress.currentDay]);

  useEffect(() => { load(); }, [load]);

  /** Generate and persist a recap snapshot for the just-finished week. */
  const generateAndSave = useCallback(async (): Promise<WeeklyRecapData> => {
    const weekNumber = Math.ceil(progress.currentDay / 7);
    const recappedWeekNumber = weekNumber - 1; // the week that just finished

    // Check if we already have a stored recap for this week
    const existing = recaps.find(r => r.weekNumber === recappedWeekNumber);
    if (existing) return existing;

    const resetsCompleted = countResetsInLastWeek(progress.completedByDate);
    const weeklyHabitRate = computeWeeklyHabitRate(habitLog, totalHabits);
    const prevWeek = recaps[recaps.length - 1];

    const narrativeState: WeeklyNarrativeState = getWeeklyNarrativeState(
      resetsCompleted,
      recappedWeekNumber,
      prevWeek?.resetsCompleted,
    );

    const recap: WeeklyRecapData = {
      weekNumber: recappedWeekNumber,
      weekLabel: weekLabel(recappedWeekNumber),
      dateLabel: getWeekDateLabel(),
      resetsCompleted,
      streakAtEnd: progress.streak,
      bestStreakAtEnd: progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt: new Date().toISOString(),
    };

    const updated = [...recaps, recap];
    await Promise.all([
      setItem(StorageKeys.WEEKLY_RECAPS, updated),
      setItem(StorageKeys.LAST_RECAP_WEEK, recappedWeekNumber),
    ]);
    setRecaps(updated);
    return recap;
  }, [progress, weeklyScore, habitLog, totalHabits, recaps]);

  /**
   * Generate a "live" (unsaved) recap for the current week in progress.
   * Used when the user manually opens the recap from the Progress tab mid-week.
   */
  const generateCurrentWeekPreview = useCallback((): WeeklyRecapData => {
    const weekNumber = Math.ceil(progress.currentDay / 7);
    const resetsCompleted = weeklyScore;
    const weeklyHabitRate = computeWeeklyHabitRate(habitLog, totalHabits);
    const prevWeek = recaps[recaps.length - 1];

    const narrativeState = getWeeklyNarrativeState(
      resetsCompleted,
      weekNumber,
      prevWeek?.resetsCompleted,
    );

    return {
      weekNumber,
      weekLabel: weekLabel(weekNumber),
      dateLabel: getWeekDateLabel(),
      resetsCompleted,
      streakAtEnd: progress.streak,
      bestStreakAtEnd: progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt: new Date().toISOString(),
    };
  }, [progress, weeklyScore, habitLog, totalHabits, recaps]);

  const dismissAutoTrigger = useCallback(async () => {
    const weekNumber = Math.ceil(progress.currentDay / 7);
    await setItem(StorageKeys.LAST_RECAP_WEEK, weekNumber - 1);
    setShouldShowRecap(false);
  }, [progress.currentDay]);

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

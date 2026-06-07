import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';
import {
  WeeklyRecapData,
  WeeklyNarrativeState,
  computeWeeklyHabitRate,
  getWeeklyNarrativeState,
  getJourneyStartDate,
  getJourneyWeekStart,
  getCurrentJourneyWeekIndex,
  countResetsInJourneyWeek,
  getJourneyWeekDateLabel,
  getPastJourneyWeeks,
} from '../utils/weeklyRecap';
import { ProgressState } from './useProgress';
import { isEs, isPt } from '../utils/langStore';
import { getAppNow } from '../utils/appDate';

function weekLabel(n: number): string {
  return isPt() || isEs() ? `Semana ${n}` : `Week ${n}`;
}

// ─── Auto-trigger logic ───────────────────────────────────────────────────────
// Fires on the first or last day of a journey week when the previous journey
// week has not been recapped yet. Does NOT require 7 completed resets.

function shouldAutoTrigger(
  lastRecapWeekStartKey: string,
  completedByDate: Record<string, true>,
): boolean {
  if (Object.keys(completedByDate).length === 0) return false;

  const now = getAppNow();
  const journeyStart = getJourneyStartDate(completedByDate);
  const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);

  if (currentWeekIndex <= 1) return false;

  const lastCompletedWeekStart = getJourneyWeekStart(journeyStart, currentWeekIndex - 1);
  const lastCompletedWeekStartKey = getLocalDateKey(lastCompletedWeekStart);

  if (lastRecapWeekStartKey !== '' && lastRecapWeekStartKey >= lastCompletedWeekStartKey) {
    return false;
  }

  // Trigger on first day (day 0) or last day (day 6) of the current journey week
  const msPerDay = 24 * 60 * 60 * 1000;
  const startOfJourney = new Date(journeyStart);
  startOfJourney.setHours(0, 0, 0, 0);
  const startOfNow = new Date(now);
  startOfNow.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.floor(
    (startOfNow.getTime() - startOfJourney.getTime()) / msPerDay,
  );
  const positionInWeek = daysSinceStart % 7;

  return positionInWeek === 0 || positionInWeek === 6;
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
    const [storedRecaps, lastRecapWeekStartKey] = await Promise.all([
      getItem<WeeklyRecapData[]>(StorageKeys.WEEKLY_RECAPS, []),
      getItem<string>(StorageKeys.LAST_RECAP_WEEK_MONDAY, ''),
    ]);

    // ── Journey week backfill ──────────────────────────────────────────────────
    // For every past journey week that has completions but no saved recap,
    // generate a recap entry so history always reflects all available data.
    // Old calendar-week recaps (weekMonday = actual Monday key) won't match
    // journey-week start keys and are cleanly superseded on first migration.
    let baseRecaps = storedRecaps ?? [];
    const journeyStart = getJourneyStartDate(progress.completedByDate);
    const pastWeeks = getPastJourneyWeeks(progress.completedByDate, journeyStart);

    const savedStartKeys = new Set(
      baseRecaps.map(r => r.weekMonday).filter((k): k is string => !!k),
    );
    const missingWeeks = pastWeeks.filter(w => !savedStartKeys.has(w.weekStartKey));

    if (missingWeeks.length > 0) {
      const rebuilt: WeeklyRecapData[] = [];

      for (let i = 0; i < pastWeeks.length; i++) {
        const w = pastWeeks[i];
        const weekNumber = i + 1;
        const existing = baseRecaps.find(r => r.weekMonday === w.weekStartKey);
        const prevWeek = rebuilt[rebuilt.length - 1];

        if (existing) {
          rebuilt.push({ ...existing, weekNumber, weekLabel: weekLabel(weekNumber) });
        } else {
          rebuilt.push({
            weekNumber,
            weekLabel: weekLabel(weekNumber),
            dateLabel: getJourneyWeekDateLabel(w.weekStart),
            weekMonday: w.weekStartKey,
            resetsCompleted: w.count,
            streakAtEnd: progress.streak,
            bestStreakAtEnd: progress.bestStreak,
            weeklyHabitRate: 0,
            totalDaysCompleted: progress.completedDays.length,
            narrativeState: getWeeklyNarrativeState(
              w.count,
              weekNumber,
              prevWeek?.resetsCompleted,
            ),
            savedAt: new Date().toISOString(),
          });
        }
      }

      baseRecaps = rebuilt;
      await setItem(StorageKeys.WEEKLY_RECAPS, rebuilt);
    }

    // ── Freshen count for the most recently completed journey week ─────────────
    const now = getAppNow();
    const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);
    let freshenedRecaps = baseRecaps;

    if (currentWeekIndex > 1) {
      const lastWeekStart = getJourneyWeekStart(journeyStart, currentWeekIndex - 1);
      const lastWeekStartKey = getLocalDateKey(lastWeekStart);
      const staleIdx = baseRecaps.findIndex(r => r.weekMonday === lastWeekStartKey);

      if (staleIdx !== -1) {
        const freshCount = countResetsInJourneyWeek(progress.completedByDate, lastWeekStart);
        if (freshCount > baseRecaps[staleIdx].resetsCompleted) {
          freshenedRecaps = baseRecaps.map((r, i) =>
            i === staleIdx ? { ...r, resetsCompleted: freshCount } : r,
          );
          await setItem(StorageKeys.WEEKLY_RECAPS, freshenedRecaps);
        }
      }
    }

    setRecaps(freshenedRecaps);
    setShouldShowRecap(shouldAutoTrigger(lastRecapWeekStartKey, progress.completedByDate));
    setLoading(false);
  }, [
    progress.completedByDate,
    progress.streak,
    progress.bestStreak,
    progress.completedDays.length,
  ]);

  useEffect(() => { load(); }, [load]);

  /** Generate and persist a recap snapshot for the just-finished journey week. */
  const generateAndSave = useCallback(async (): Promise<WeeklyRecapData> => {
    const now = getAppNow();
    const journeyStart = getJourneyStartDate(progress.completedByDate);
    const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);

    // If still in the first journey week, return a live preview (nothing to save yet)
    if (currentWeekIndex <= 1) {
      const weekStart = getJourneyWeekStart(journeyStart, 1);
      const resetsCompleted = countResetsInJourneyWeek(progress.completedByDate, weekStart);
      return {
        weekNumber: 1,
        weekLabel: weekLabel(1),
        dateLabel: getJourneyWeekDateLabel(weekStart),
        weekMonday: getLocalDateKey(weekStart),
        resetsCompleted,
        streakAtEnd: progress.streak,
        bestStreakAtEnd: progress.bestStreak,
        weeklyHabitRate: computeWeeklyHabitRate(habitLog, totalHabits),
        totalDaysCompleted: progress.completedDays.length,
        narrativeState: getWeeklyNarrativeState(resetsCompleted, 1, undefined),
        savedAt: new Date().toISOString(),
      };
    }

    const lastCompletedWeekIndex = currentWeekIndex - 1;
    const weekStart = getJourneyWeekStart(journeyStart, lastCompletedWeekIndex);
    const weekStartKey = getLocalDateKey(weekStart);

    const freshCount = countResetsInJourneyWeek(progress.completedByDate, weekStart);
    const existingIdx = recaps.findIndex(r => r.weekMonday === weekStartKey);

    if (existingIdx !== -1 && freshCount <= recaps[existingIdx].resetsCompleted) {
      return recaps[existingIdx];
    }

    const weekNumber = existingIdx !== -1 ? recaps[existingIdx].weekNumber : lastCompletedWeekIndex;
    const weeklyHabitRate = computeWeeklyHabitRate(habitLog, totalHabits);
    const prevWeek = existingIdx > 0 ? recaps[existingIdx - 1] : recaps[recaps.length - 1];

    const narrativeState: WeeklyNarrativeState = getWeeklyNarrativeState(
      freshCount,
      weekNumber,
      prevWeek?.resetsCompleted,
    );

    const recap: WeeklyRecapData = {
      weekNumber,
      weekLabel: weekLabel(weekNumber),
      dateLabel: getJourneyWeekDateLabel(weekStart),
      weekMonday: weekStartKey,
      resetsCompleted: freshCount,
      streakAtEnd: progress.streak,
      bestStreakAtEnd: progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt: new Date().toISOString(),
    };

    const updated = existingIdx !== -1
      ? recaps.map((r, i) => i === existingIdx ? recap : r)
      : [...recaps, recap];

    await Promise.all([
      setItem(StorageKeys.WEEKLY_RECAPS, updated),
      setItem(StorageKeys.LAST_RECAP_WEEK_MONDAY, weekStartKey),
    ]);
    setRecaps(updated);
    return recap;
  }, [progress, habitLog, totalHabits, recaps]);

  /**
   * Generate a "live" (unsaved) recap for the current journey week in progress.
   * Used when the user manually opens the recap from the Progress tab mid-week.
   */
  const generateCurrentWeekPreview = useCallback((): WeeklyRecapData => {
    const now = getAppNow();
    const journeyStart = getJourneyStartDate(progress.completedByDate);
    const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);
    const weekStart = getJourneyWeekStart(journeyStart, currentWeekIndex);
    const weekStartKey = getLocalDateKey(weekStart);

    const weekNumber = currentWeekIndex;
    const resetsCompleted = countResetsInJourneyWeek(progress.completedByDate, weekStart);
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
      dateLabel: getJourneyWeekDateLabel(weekStart),
      weekMonday: weekStartKey,
      resetsCompleted,
      streakAtEnd: progress.streak,
      bestStreakAtEnd: progress.bestStreak,
      weeklyHabitRate,
      totalDaysCompleted: progress.completedDays.length,
      narrativeState,
      savedAt: new Date().toISOString(),
    };
  }, [progress, habitLog, totalHabits, recaps]);

  const dismissAutoTrigger = useCallback(async () => {
    const now = getAppNow();
    const journeyStart = getJourneyStartDate(progress.completedByDate);
    const currentWeekIndex = getCurrentJourneyWeekIndex(journeyStart, now);
    if (currentWeekIndex > 1) {
      const lastWeekStart = getJourneyWeekStart(journeyStart, currentWeekIndex - 1);
      await setItem(StorageKeys.LAST_RECAP_WEEK_MONDAY, getLocalDateKey(lastWeekStart));
    }
    setShouldShowRecap(false);
  }, [progress.completedByDate]);

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

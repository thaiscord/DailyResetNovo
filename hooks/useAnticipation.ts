// ─── useAnticipation ──────────────────────────────────────────────────────────
// Single hook for all future-facing, anticipation-driven copy.
// Reads live progress + profile; computes all anticipation context.

import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { useEmotionalProfile } from './useEmotionalProfile';
import { isEs, isPt } from '../utils/langStore';
import {
  getJourneyChapter,
  getNextChapter,
  getDaysUntilNextChapter,
  getUnlockPreview,
  getRitualEvolutionPreview,
  getQuietMystery,
  getChapterProgressionPreview,
  getMilestoneAnticipation,
  getReturnSafetyMessage,
  getNextStepCopy,
  getWeeklyRecapAnticipation,
  getChapterFutureSelfMessage,
  type JourneyChapter,
  type AppScreen,
} from '../utils/anticipationEngine';

export interface AnticipationContext {
  // Journey chapter state
  chapter:            JourneyChapter;
  nextChapter:        JourneyChapter | null;
  daysUntilNextChapter: number | null;

  // Copy helpers
  unlockPreview:      string | null;
  ritualEvolution:    string;
  quietMystery:       string | null;
  chapterPreview:     string | null;
  futureSelf:         string;
  weeklyRecapTeaser:  string | null;

  // Contextual helpers
  getMilestoneAnticipation: (nextMilestone: number | null, daysToNext: number | null) => string | null;
  getNextStepCopy:    (screen: AppScreen) => string;
  getReturnSafety:    (seed?: number) => string;

  // Raw state
  totalDays:          number;
  loading:            boolean;
}

export function useAnticipation(): AnticipationContext {
  const { progress, loading: progressLoading, weeklyScore } = useProgress();
  const { profile, loading: profileLoading }               = useEmotionalProfile();

  const loading    = progressLoading || profileLoading;
  const totalDays  = progress.completedDays.length;
  const streak     = progress.streak;
  const currentDay = progress.currentDay;

  const chapter = useMemo(() => getJourneyChapter(totalDays), [totalDays]);
  const nextChapter = useMemo(() => getNextChapter(totalDays), [totalDays]);
  const daysUntilNextChapter = useMemo(() => getDaysUntilNextChapter(totalDays), [totalDays]);

  const unlockPreview   = useMemo(() => getUnlockPreview(totalDays), [totalDays]);
  const ritualEvolution = useMemo(() => getRitualEvolutionPreview(totalDays), [totalDays]);
  const quietMystery    = useMemo(() => getQuietMystery(totalDays), [totalDays]);
  const chapterPreview  = useMemo(() => getChapterProgressionPreview(totalDays), [totalDays]);
  const futureSelf      = useMemo(() => getChapterFutureSelfMessage(totalDays, currentDay), [totalDays, currentDay]);
  const weeklyRecapTeaser = useMemo(() => getWeeklyRecapAnticipation(totalDays, weeklyScore), [totalDays, weeklyScore]);

  const getMilestoneAnticipationFn = useMemo(() => {
    return (nextMilestone: number | null, daysToNext: number | null) =>
      getMilestoneAnticipation(streak, nextMilestone, daysToNext);
  }, [streak]);

  const getNextStepCopyFn = useMemo(() => {
    return (screen: AppScreen) => getNextStepCopy(screen, totalDays, profile);
  }, [totalDays, profile]);

  const getReturnSafetyFn = useMemo(() => {
    return (seed = 0) => profile
      ? getReturnSafetyMessage(profile, seed)
      : isEs() ? 'Tu capítulo todavía te espera.'
      : isPt() ? 'Seu capítulo ainda te espera.'
      : 'Your chapter still waits for you.';
  }, [profile]);

  return {
    chapter,
    nextChapter,
    daysUntilNextChapter,
    unlockPreview,
    ritualEvolution,
    quietMystery,
    chapterPreview,
    futureSelf,
    weeklyRecapTeaser,
    getMilestoneAnticipation: getMilestoneAnticipationFn,
    getNextStepCopy: getNextStepCopyFn,
    getReturnSafety: getReturnSafetyFn,
    totalDays,
    loading,
  };
}

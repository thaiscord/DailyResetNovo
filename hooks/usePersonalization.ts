// ─── usePersonalization ───────────────────────────────────────────────────────
// Combines profile + journey stage into a single archetype-driven context.
// Single source of truth for all adaptive copy across the app.

import { useMemo } from 'react';
import { useEmotionalProfile } from './useEmotionalProfile';
import { useProgress } from './useProgress';
import { useRitualIntention } from './useRitualIntention';
import {
  getJourneyStage,
  getEmotionalArchetype,
  getProgressHeading,
  getPersonalizedMilestoneMessage,
  getPersonalizedReflection,
  type JourneyStage,
  type EmotionalArchetype,
} from '../utils/personalizationEngine';

export interface PersonalizationContext {
  // Raw state
  profile: ReturnType<typeof useEmotionalProfile>['profile'];
  intention: ReturnType<typeof useRitualIntention>['intention'];
  totalDays: number;
  loading: boolean;

  // Derived
  stage: JourneyStage | null;
  archetype: EmotionalArchetype | null;

  // Helpers — null-safe (return null/generic when profile not yet set)
  progressHeading: ReturnType<typeof getProgressHeading> | null;
  getMilestoneMessage: (milestone: number) => ReturnType<typeof getPersonalizedMilestoneMessage>;
  getReflection: (seed: number) => string | null;
}

export function usePersonalization(): PersonalizationContext {
  const { profile, loading: profileLoading } = useEmotionalProfile();
  const { progress, loading: progressLoading } = useProgress();
  const { intention } = useRitualIntention();

  const totalDays = progress.completedDays.length;
  const loading   = profileLoading || progressLoading;

  const stage = useMemo<JourneyStage | null>(() => {
    if (!profile) return null;
    return getJourneyStage(totalDays);
  }, [profile, totalDays]);

  const archetype = useMemo<EmotionalArchetype | null>(() => {
    if (!profile || !stage) return null;
    return getEmotionalArchetype(profile, stage);
  }, [profile, stage]);

  const progressHeading = useMemo(() => {
    if (!archetype) return null;
    return getProgressHeading(archetype);
  }, [archetype]);

  const getMilestoneMessage = useMemo(() => {
    return (milestone: number) => {
      if (!archetype) return null;
      return getPersonalizedMilestoneMessage(milestone, archetype);
    };
  }, [archetype]);

  const getReflection = useMemo(() => {
    return (seed: number): string | null => {
      if (!archetype) return null;
      return getPersonalizedReflection(archetype, seed);
    };
  }, [archetype]);

  return {
    profile,
    intention,
    totalDays,
    loading,
    stage,
    archetype,
    progressHeading,
    getMilestoneMessage,
    getReflection,
  };
}

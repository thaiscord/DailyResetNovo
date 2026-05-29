// ─── Content System — Unified Facade ─────────────────────────────────────────
// Single import point for all content generation across the app.
// Every component that needs copy should import from here, not from individual
// utils — this ensures consistency, phase-awareness, and quality.
//
// Architecture: this module delegates to specialized utils, adds routing logic,
// and enforces content quality rules. It does NOT contain copy itself.

import {
  getIdentityStatement,
  getEmotionalMemory,
  getJourneyPhase,
  getIdentityReflections,
  getMomentumNarrative,
  getFutureSelfNarrative,
  getProgressQuote,
  getDailyNarrative,
  getDynamicHeadline,
  getPreCompletionBanner,
  getCompletionMessage,
  getStreakPhrase,
  getAfterCompletionAnticipation,
  type EmotionalState,
} from './streakCopy';

import {
  getFutureIdentityPhase,
  getFutureSelfNarrativeLocal,
  getTransformationProjection,
  getFutureReflectionPrompt,
  getComebackFutureNarrative,
  type FuturePhase,
} from './futureSelf';

import {
  detectComebackState,
  getComebackNarrativeContent,
  getResilienceMessage,
  getSoftStreakLabel,
  getComebackMilestone,
  type ComebackState,
  type ComebackData,
} from './comebackSystem';

import {
  getMilestoneCeremony,
  getUpcomingMilestonePreview,
  getEarnedMilestones,
  type MilestoneCeremony,
} from './milestoneSystem';

import {
  selectContextualNotification,
  type NotifContext,
  type NotifMessage,
  type NotificationPeriod,
} from './notificationContent';

import {
  selectReflectionPrompt,
  getReflectionPhase,
  type ReflectionPhase,
} from '../data';

import { getWeeklyNarrative, getWeeklyHighlights, getWeeklyFutureMomentum } from './weeklyRecap';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentPhase = ReflectionPhase; // 'beginning' | 'momentum' | 'consistency' | 'transformation' | 'identity'

export interface ContentContext {
  streak: number;
  totalDays: number;
  weeklyScore: number;
  daysMissed: number;
  currentDay: number;
  goals: string[];
  seed: number;
  completedByDate?: Record<string, true>;
}

export interface NarrativeContent {
  headline: string;
  sub: string;
  phase: ContentPhase;
  identity: string;
  memory: string;
  momentum: string;
}

export interface FutureSelfCopy {
  headline: string;
  body: string;
  phase: FuturePhase;
  phaseLabel: string;
  reflection: string;
}

export interface ComebackContent {
  isComeback: boolean;
  state: ComebackState;
  headline: string;
  body: string;
  subtext: string;
  resilience: string;
  milestone: string | null;
}

export interface CompletionContent {
  title: string;
  sub: string;
  streak: string;
  reflection: string;
  futureHook: string;
}

// ─── Phase detection ──────────────────────────────────────────────────────────

export function getContentPhase(ctx: Pick<ContentContext, 'streak' | 'totalDays'>): ContentPhase {
  return getReflectionPhase(ctx.streak, ctx.totalDays);
}

// ─── Narrative content (Today screen header + hero copy) ─────────────────────

export function getNarrativeContent(ctx: ContentContext): NarrativeContent {
  const phase = getContentPhase(ctx);
  const journeyPhase = getJourneyPhase(ctx.streak, ctx.totalDays);

  return {
    headline: getDynamicHeadline('building', ctx.currentDay),
    sub: getDailyNarrative(ctx.currentDay, ctx.streak),
    phase,
    identity: getIdentityStatement(ctx.streak, ctx.totalDays),
    memory: getEmotionalMemory(ctx.streak, ctx.weeklyScore, ctx.totalDays, ctx.weeklyScore * 4),
    momentum: getMomentumNarrative(ctx.weeklyScore, ctx.streak),
  };
}

// ─── Completion content ───────────────────────────────────────────────────────

export function getCompletionContent(
  ctx: ContentContext,
  recentReflectionIds: string[] = [],
): CompletionContent {
  const msg        = getCompletionMessage(ctx.streak, ctx.currentDay);
  const reflection = selectReflectionPrompt(ctx.streak, ctx.totalDays, ctx.seed, recentReflectionIds);
  const afterCopy  = getAfterCompletionAnticipation(ctx.streak, null, null);
  const future     = getFutureSelfNarrativeLocal(ctx.streak, ctx.totalDays);

  return {
    title: msg.title,
    sub: msg.sub,
    streak: getStreakPhrase(ctx.streak, ctx.currentDay),
    reflection: reflection.prompt,
    futureHook: future.headline,
  };
}

// ─── Reflection prompt (single, phase-aware, deduplicated) ───────────────────

export function getReflectionPrompt(
  ctx: Pick<ContentContext, 'streak' | 'totalDays' | 'seed'>,
  recentIds: string[] = [],
): string {
  return selectReflectionPrompt(ctx.streak, ctx.totalDays, ctx.seed, recentIds).prompt;
}

export function getReflectionWithId(
  ctx: Pick<ContentContext, 'streak' | 'totalDays' | 'seed'>,
  recentIds: string[] = [],
): { id: string; prompt: string } {
  const r = selectReflectionPrompt(ctx.streak, ctx.totalDays, ctx.seed, recentIds);
  return { id: r.id, prompt: r.prompt };
}

// ─── Future self copy ─────────────────────────────────────────────────────────

export function getFutureSelfCopy(
  ctx: Pick<ContentContext, 'streak' | 'totalDays' | 'seed'>,
): FutureSelfCopy {
  const phaseData = getFutureIdentityPhase(ctx.streak, ctx.totalDays);
  const narrative = getFutureSelfNarrativeLocal(ctx.streak, ctx.totalDays);
  const reflection = getFutureReflectionPrompt(ctx.streak, ctx.totalDays);

  return {
    headline: narrative.headline,
    body: narrative.body,
    phase: phaseData.phase,
    phaseLabel: phaseData.label,
    reflection,
  };
}

// ─── Comeback copy ────────────────────────────────────────────────────────────

export function getComebackCopy(
  ctx: Pick<ContentContext, 'streak' | 'totalDays' | 'completedByDate'>,
  comebackCount: number,
): ComebackContent {
  const comeback = detectComebackState(ctx.completedByDate ?? {}, ctx.totalDays);

  if (!comeback.isComeback) {
    return {
      isComeback: false,
      state: 'none',
      headline: '', body: '', subtext: '', resilience: '', milestone: null,
    };
  }

  const content   = getComebackNarrativeContent(comeback, comebackCount);
  const resilience = getResilienceMessage(comebackCount, ctx.totalDays);
  const milestone  = getComebackMilestone(comebackCount);

  return {
    isComeback: true,
    state: comeback.state,
    headline: content.headline,
    body: content.body,
    subtext: content.subtext,
    resilience,
    milestone,
  };
}

// ─── Milestone content ────────────────────────────────────────────────────────

export function getMilestoneContent(streak: number): MilestoneCeremony | null {
  return getMilestoneCeremony(streak);
}

export { getEarnedMilestones, getUpcomingMilestonePreview };

// ─── Notification copy ────────────────────────────────────────────────────────

export function getNotificationCopy(
  ctx: ContentContext & { period: NotificationPeriod },
): NotifMessage {
  return selectContextualNotification({
    period: ctx.period,
    streak: ctx.streak,
    daysMissed: ctx.daysMissed,
    weeklyScore: ctx.weeklyScore,
    totalDays: ctx.totalDays,
    goals: ctx.goals,
    seed: ctx.seed,
  });
}

// ─── Progress copy ────────────────────────────────────────────────────────────

export function getProgressCopy(ctx: ContentContext) {
  const journeyPhase   = getJourneyPhase(ctx.streak, ctx.totalDays);
  const futurePhaseDat = getFutureIdentityPhase(ctx.streak, ctx.totalDays);
  const projection     = getTransformationProjection(ctx.currentDay, ctx.streak);
  const softStreak     = getSoftStreakLabel(ctx.totalDays);
  const comeback       = ctx.completedByDate
    ? detectComebackState(ctx.completedByDate, ctx.totalDays)
    : { isComeback: false, state: 'none' as ComebackState, daysMissed: 0 };

  return {
    journeyPhase,
    futurePhase: futurePhaseDat,
    projection,
    softStreak,
    isComeback: comeback.isComeback,
    quote: getProgressQuote(ctx.streak, journeyPhase.phase),
    identityReflections: getIdentityReflections(ctx.streak, ctx.weeklyScore, null, null),
  };
}

// ─── Weekly recap copy ────────────────────────────────────────────────────────

export function getWeeklyRecapCopy(
  narrativeState: Parameters<typeof getWeeklyNarrative>[0],
  resetsCompleted: number,
  streakAtEnd: number,
  totalDaysCompleted: number,
) {
  return {
    narrative: getWeeklyNarrative(narrativeState, resetsCompleted),
    highlights: getWeeklyHighlights(resetsCompleted, streakAtEnd, 0, 1),
    futureMomentum: getWeeklyFutureMomentum(narrativeState),
    reflection: getFutureReflectionPrompt(streakAtEnd, totalDaysCompleted),
  };
}

// ─── Helper: import these directly from streakCopy (re-export for convenience) ─

export {
  getIdentityStatement,
  getStreakPhrase,
  getCompletionMessage,
  getJourneyPhase,
  getDailyNarrative,
  getPreCompletionBanner,
};

// ─── Content quality guard ────────────────────────────────────────────────────
// Internal check — catches content that slipped through violating quality rules.
// Logs a warning (dev only) but never throws.

const BANNED_PHRASES = [
  'you can do it', 'never give up', 'grind harder', 'push yourself',
  'hustle', 'stay motivated', 'be productive', 'success requires',
  'work hard', 'no pain no gain',
];

export function validateContentQuality(text: string): boolean {
  const lower = text.toLowerCase();
  const failed = BANNED_PHRASES.find(p => lower.includes(p));
  if (failed && __DEV__) {
    console.warn(`[ContentSystem] Quality violation: "${failed}" in "${text.slice(0, 60)}"`);
  }
  return !failed;
}

// ─── Re-export commonly needed types ─────────────────────────────────────────
export type { ComebackData, ComebackState };
export type { FuturePhase };
export type { MilestoneCeremony };
export type { NotifMessage, NotificationPeriod };

// Declare __DEV__ for TypeScript
declare const __DEV__: boolean;

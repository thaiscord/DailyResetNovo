// ─── Review Request System ────────────────────────────────────────────────────
// Asks for App Store reviews only at emotionally meaningful moments.
// Philosophy: the review moment should feel EARNED, not engineered.
//
// Trigger moments (in order of emotional intensity):
// 1. Day 7 milestone — first full week, highest early emotional state
// 2. Day 30 milestone — real commitment signal
// 3. After weekly recap with score ≥ 5 days — pride moment
// 4. After comeback + 3 more completions — resilience celebration
//
// Rules:
// - Never ask within 30 days of last request
// - Never ask in first 7 days
// - Never ask after missed days / low streak moments
// - Never ask during Reset Ritual

import * as StoreReview from 'expo-store-review';
import { getItem, setItem, StorageKeys } from '../hooks/useStorage';

export type ReviewTrigger =
  | 'milestone_7'
  | 'milestone_14'
  | 'milestone_30'
  | 'milestone_90'
  | 'weekly_recap_strong'  // weeklyScore >= 5
  | 'comeback_continued';  // returned after 3+ missed AND then completed 3 more

const REVIEW_COOLDOWN_DAYS = 30;

// ─── Eligibility check ────────────────────────────────────────────────────────

async function isEligibleForReview(): Promise<boolean> {
  const [lastDateStr, count] = await Promise.all([
    getItem<string | null>(StorageKeys.LAST_REVIEW_REQUEST, null),
    getItem<number>(StorageKeys.REVIEW_TRIGGER_COUNT, 0),
  ]);

  // Never been asked — eligible after first trigger
  if (!lastDateStr) return true;

  const daysSince = (Date.now() - new Date(lastDateStr).getTime()) / 86_400_000;
  return daysSince >= REVIEW_COOLDOWN_DAYS;
}

async function markRequested(): Promise<void> {
  const count = await getItem<number>(StorageKeys.REVIEW_TRIGGER_COUNT, 0);
  await Promise.all([
    setItem(StorageKeys.LAST_REVIEW_REQUEST, new Date().toISOString()),
    setItem(StorageKeys.REVIEW_TRIGGER_COUNT, count + 1),
  ]);
}

// ─── Main request function ────────────────────────────────────────────────────

/**
 * Attempts to show the native App Store review dialog.
 * Only fires if:
 * - The device/platform supports it
 * - The 30-day cooldown has passed
 * - The trigger is emotionally appropriate
 *
 * Apple controls whether the actual dialog appears (max 3×/year).
 * We control WHEN we attempt it — at the right emotional moment.
 */
export async function requestReviewIfAppropriate(
  trigger: ReviewTrigger,
  streak: number,
  totalDays: number,
): Promise<void> {
  try {
    // Never ask in first 7 days
    if (totalDays < 7) return;

    // Check if device supports Store Review
    const isAvailable = await StoreReview.isAvailableAsync();
    if (!isAvailable) return;

    // Check cooldown
    const eligible = await isEligibleForReview();
    if (!eligible) return;

    // Trigger-specific guards
    if (trigger === 'milestone_7'  && streak < 7)  return;
    if (trigger === 'milestone_30' && streak < 30) return;
    if (trigger === 'milestone_90' && streak < 90) return;

    // Small delay — let the current UI moment complete first
    await new Promise(resolve => setTimeout(resolve, 1500));

    await StoreReview.requestReview();
    await markRequested();
  } catch {
    // Silently fail — never crash the app for reviews
  }
}

// ─── Weekly recap trigger ─────────────────────────────────────────────────────

export async function maybeRequestReviewAfterRecap(
  weeklyScore: number,
  totalDays: number,
): Promise<void> {
  if (weeklyScore >= 5) {
    await requestReviewIfAppropriate('weekly_recap_strong', weeklyScore, totalDays);
  }
}

// ─── Comeback trigger ─────────────────────────────────────────────────────────

export async function maybeRequestReviewAfterComeback(
  streak: number,
  totalDays: number,
): Promise<void> {
  // User returned AND kept going for 3 more days
  if (streak >= 3) {
    await requestReviewIfAppropriate('comeback_continued', streak, totalDays);
  }
}

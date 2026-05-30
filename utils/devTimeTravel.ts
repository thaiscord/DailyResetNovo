// ─── DEV ONLY — Time Travel Engine ───────────────────────────────────────────
// Simulates time passage for testing daily content, rituals, milestones, etc.
// Each "advance" produces a FRESH, UNCOMPLETED day — not a completed one.
// All exports are no-ops when __DEV__ is false.
//
// How it works internally:
//   • CURRENT_DAY is written directly (N → N+n).
//   • LAST_COMPLETED_DATE is removed (set to null).
//   • When useProgress.load() runs with lastCompletedDate === null, the
//     auto-advance block is skipped (condition: lastCompletedDate !== null).
//   • So currentDay stays exactly at the value we wrote.
//   • completedByDate[today] is not set → isCompletedToday = false.
//   • The reset/habits/mindset/reflection all appear fresh and untouched.
//   • Streak and completedDays are NEVER modified by time travel.
//
// When the user actually completes the day after time travel:
//   • completeDay() fires normally.
//   • Since lastCompletedDate is null (≠ today), streak starts at 1.
//   • completedDays grows, completedByDate[today] is marked — real data only.

import {
  getItem,
  setItem,
  removeItem,
  StorageKeys,
  getLocalDateKey,
  clearAllProgressStorage,
} from '../hooks/useStorage';
import {
  setAppDateOffset,
  getAppDateOffset,
  getAppNow,
} from './appDate';

declare const __DEV__: boolean;

// ─── Status (for panel display) ───────────────────────────────────────────────

export interface DevStatus {
  currentDay: number;
  streak: number;
  bestStreak: number;
  totalCompleted: number;
  lastCompletedDate: string | null;
  isPremium: boolean;
}

export async function getDevStatus(): Promise<DevStatus> {
  const [currentDay, completedDays, streak, bestStreak, lastCompletedDate, isPremium] =
    await Promise.all([
      getItem<number>(StorageKeys.CURRENT_DAY, 1),
      getItem<number[]>(StorageKeys.COMPLETED_DAYS, []),
      getItem<number>(StorageKeys.STREAK, 0),
      getItem<number>(StorageKeys.BEST_STREAK, 0),
      getItem<string | null>(StorageKeys.LAST_COMPLETED_DATE, null),
      getItem<boolean>(StorageKeys.IS_PREMIUM, false),
    ]);
  return { currentDay, streak, bestStreak, totalCompleted: completedDays.length, lastCompletedDate, isPremium };
}

// ─── Core: Advance N Days ─────────────────────────────────────────────────────

/**
 * Advance the app forward by N days, producing a FRESH uncompleted day.
 *
 * What changes:
 *   - CURRENT_DAY → currentDay + n  (app shows new day content)
 *   - LAST_COMPLETED_DATE → removed  (null stops auto-advance on next load)
 *   - RITUAL_INTENTION_TODAY → removed  (clears stale intention)
 *
 * What does NOT change:
 *   - completedDays       (no fake completions)
 *   - streak              (no fake streak increase)
 *   - bestStreak          (unchanged)
 *   - completedByDate     (today stays unmarked → reset appears uncompleted)
 *
 * Result: the user arrives on day N as a real user would on a fresh morning —
 * reset not done, habits unchecked, reflection untouched, mindset unread.
 */
export async function advanceDays(n: number): Promise<void> {
  if (!__DEV__) return;

  const currentDay = await getItem<number>(StorageKeys.CURRENT_DAY, 1);
  const newCurrentDay = Math.min(currentDay + n, 365);
  const newOffset = getAppDateOffset() + n;

  // 1. Advance the day number (drives which content is shown)
  // 2. Advance the date offset (drives all date-keyed operations)
  // 3. Remove today's intention (fresh day = fresh intention)
  // LAST_COMPLETED_DATE is left untouched: the offset shifts "today" forward
  // so the lastCompletedDate comparison in useProgress.load() works naturally.
  await Promise.all([
    setItem(StorageKeys.CURRENT_DAY, newCurrentDay),
    setAppDateOffset(newOffset),
    removeItem(StorageKeys.RITUAL_INTENTION_TODAY),
  ]);
}

// ─── Simulate Streak Break ───────────────────────────────────────────────────

/**
 * Simulates a gap of `gapDays` since the last completion.
 * Triggers the comeback system (ComebackCard) on the Today screen.
 *
 * Writes a fake completion entry gapDays+1 days ago so the comeback detector
 * finds a real history entry when walking backwards through completedByDate.
 * Sets streak to 0. Does NOT change currentDay or completedDays count.
 */
export async function simulateStreakBreak(gapDays = 3): Promise<void> {
  if (!__DEV__) return;

  const [completedDays, completedByDate] = await Promise.all([
    getItem<number[]>(StorageKeys.COMPLETED_DAYS, []),
    getItem<Record<string, true>>(StorageKeys.COMPLETED_BY_DATE, {}),
  ]);

  // Place a historical entry just beyond the gap so comeback detection fires
  const pastDate = getAppNow();
  pastDate.setDate(pastDate.getDate() - (gapDays + 1));
  const pastKey = getLocalDateKey(pastDate);
  const pastStr = pastDate.toDateString();

  const newByDate = { ...completedByDate, [pastKey]: true };
  // completedDays needs at least one entry for comeback detection to run
  const newCompleted = completedDays.length > 0 ? completedDays : [1];

  await Promise.all([
    setItem(StorageKeys.STREAK, 0),
    setItem(StorageKeys.COMPLETED_BY_DATE, newByDate),
    setItem(StorageKeys.COMPLETED_DAYS, newCompleted),
    setItem(StorageKeys.LAST_COMPLETED_DATE, pastStr),
    removeItem(StorageKeys.RITUAL_INTENTION_TODAY),
  ]);
}

// ─── Return to Real Today ─────────────────────────────────────────────────────

/**
 * Undo time travel: recalculates the correct currentDay from actual
 * completions and resets the day pointer, leaving all real data intact.
 */
export async function returnToRealToday(): Promise<void> {
  if (!__DEV__) return;

  const completedDays = await getItem<number[]>(StorageKeys.COMPLETED_DAYS, []);
  const realCurrentDay = completedDays.length + 1;

  await Promise.all([
    setItem(StorageKeys.CURRENT_DAY, realCurrentDay),
    setAppDateOffset(0),                            // restore real date
    removeItem(StorageKeys.RITUAL_INTENTION_TODAY),
  ]);
}

// ─── Reset Dev Time ───────────────────────────────────────────────────────────

/**
 * Full user data wipe — clears ALL user-specific storage, returns to Day 1.
 * Keeps ONBOARDING_DONE (no replay), IS_PREMIUM, LANGUAGE, and
 * notification preferences. Everything else is cleared for a clean slate.
 */
export async function resetDevTime(): Promise<void> {
  if (!__DEV__) return;

  await setAppDateOffset(0); // restore real date before wiping progress

  const keysToReset = [
    // ── Progress & streaks ────────────────────────────────────────────────
    StorageKeys.CURRENT_DAY,
    StorageKeys.COMPLETED_DAYS,
    StorageKeys.STREAK,
    StorageKeys.BEST_STREAK,
    StorageKeys.LAST_COMPLETED_DATE,
    StorageKeys.COMPLETED_BY_DATE,
    StorageKeys.COMEBACK_COUNT,
    // ── Milestones ────────────────────────────────────────────────────────
    StorageKeys.MILESTONE_CEREMONIES_SEEN,
    StorageKeys.MILESTONE_HISTORY,
    // ── Recaps & reflections ──────────────────────────────────────────────
    StorageKeys.WEEKLY_RECAPS,
    StorageKeys.LAST_RECAP_WEEK,
    StorageKeys.LAST_RECAP_WEEK_MONDAY,
    StorageKeys.REFLECTIONS,
    // ── Habits ────────────────────────────────────────────────────────────
    StorageKeys.HABIT_LOG,
    StorageKeys.HABITS,
    // ── Ritual & intentions ───────────────────────────────────────────────
    StorageKeys.RITUAL_INTENTION_TODAY,
    StorageKeys.RITUAL_HISTORY,
    // ── Onboarding personalization ────────────────────────────────────────
    StorageKeys.EMOTIONAL_PROFILE,
    StorageKeys.ONBOARDING_ANSWERS,
    StorageKeys.USER_NAME,
    StorageKeys.USER_GOALS,
    // ── Review prompts ────────────────────────────────────────────────────
    StorageKeys.LAST_REVIEW_REQUEST,
    StorageKeys.REVIEW_TRIGGER_COUNT,
  ];

  await Promise.all(keysToReset.map(k => removeItem(k)));
}

// ─── Premium Toggles ─────────────────────────────────────────────────────────

export async function grantPremium(): Promise<void> {
  if (!__DEV__) return;
  await setItem(StorageKeys.IS_PREMIUM, true);
}

export async function revokePremium(): Promise<void> {
  if (!__DEV__) return;
  await setItem(StorageKeys.IS_PREMIUM, false);
}

// ─── Progress-only reset (keeps onboarding/profile) ─────────────────────────

export async function resetProgressOnly(): Promise<void> {
  if (!__DEV__) return;
  const progressKeys = [
    StorageKeys.CURRENT_DAY,
    StorageKeys.COMPLETED_DAYS,
    StorageKeys.STREAK,
    StorageKeys.BEST_STREAK,
    StorageKeys.LAST_COMPLETED_DATE,
    StorageKeys.COMPLETED_BY_DATE,
    StorageKeys.COMEBACK_COUNT,
    StorageKeys.MILESTONE_CEREMONIES_SEEN,
    StorageKeys.MILESTONE_HISTORY,
    StorageKeys.WEEKLY_RECAPS,
    StorageKeys.LAST_RECAP_WEEK,
    StorageKeys.LAST_RECAP_WEEK_MONDAY,
    StorageKeys.REFLECTIONS,
    StorageKeys.HABIT_LOG,
    StorageKeys.HABITS,
    StorageKeys.RITUAL_INTENTION_TODAY,
    StorageKeys.RITUAL_HISTORY,
    StorageKeys.LAST_REVIEW_REQUEST,
    StorageKeys.REVIEW_TRIGGER_COUNT,
  ];
  await Promise.all(progressKeys.map(k => removeItem(k)));
}

// ─── Full Wipe (nuclear) ─────────────────────────────────────────────────────

export async function resetEverything(): Promise<void> {
  if (!__DEV__) return;
  await clearAllProgressStorage();
}

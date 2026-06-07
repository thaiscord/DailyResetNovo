// ─── Mantra Echo — Personal Mantra Display Logic ─────────────────────────────
// Governs when and how the personal mantra chosen at onboarding re-surfaces.
// Core principle: rarity is the point. The mantra should feel like a memory,
// not a fixture. It should appear rarely enough that the user thinks:
// "I had almost forgotten I chose this."

import { getItem, setItem } from '../hooks/useStorage';

const LAST_MANTRA_RETURN_KEY = 'mantra_return_last_shown_v1';

// ─── Deterministic seed ───────────────────────────────────────────────────────
// No true randomness — behavior is stable per day/week/user so it doesn't
// flicker on re-render and doesn't surprise the user with inconsistency.

function digitSum(n: number): number {
  return String(Math.abs(Math.round(n)))
    .split('')
    .reduce((s, c) => s + parseInt(c, 10), 0);
}

function todayHash(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ─── Weekly Summary ───────────────────────────────────────────────────────────
// Shown in ~30% of weekly summaries. Hash on weekNumber → stable per week.
// Requires at least 7 completed days (can't echo what hasn't had time to resonate).

export function shouldShowMantraInWeekly(weekNumber: number, totalDays: number): boolean {
  if (totalDays < 7) return false;
  return digitSum(weekNumber * 31 + 17) % 10 < 3;
}

// Which of the 5 copy variants to show (stable per week).
export function mantraWeeklyVariant(weekNumber: number): number {
  return digitSum(weekNumber * 7 + 3) % 5;
}

// ─── Progress Card ────────────────────────────────────────────────────────────
// Shown on ~25% of days. Requires ≥14 completed days.
// Seeded by today's date + totalDays → changes day-to-day, never mid-session.

export function shouldShowMantraInProgress(totalDays: number): boolean {
  if (totalDays < 14) return false;
  return digitSum(todayHash() * 13 + totalDays * 7) % 4 === 0;
}

// Which of the 3 copy variants to show (stable per totalDays count).
export function mantraProgressVariant(totalDays: number): number {
  return digitSum(totalDays * 11 + 5) % 3;
}

// ─── Return After Absence ─────────────────────────────────────────────────────
// Shown at most once every 30 days. Requires 7+ days absent.
// Reads and writes to AsyncStorage to enforce the throttle.

export async function shouldShowMantraOnReturn(daysMissed: number): Promise<boolean> {
  if (daysMissed < 7) return false;
  const lastShown = await getItem<string | null>(LAST_MANTRA_RETURN_KEY, null);
  if (!lastShown) return true;
  const diffDays = (Date.now() - new Date(lastShown).getTime()) / 86_400_000;
  return diffDays >= 30;
}

export async function recordMantraReturnShown(): Promise<void> {
  await setItem(LAST_MANTRA_RETURN_KEY, new Date().toISOString());
}

// Which of the 3 copy variants to show (seeded by daysMissed).
export function mantraReturnVariant(daysMissed: number): number {
  return digitSum(daysMissed * 7 + 13) % 3;
}

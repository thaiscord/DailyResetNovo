// ─── Welcome Back Experience ──────────────────────────────────────────────────
// Determines whether and when to show the returning user entry experience.
// Messages live in locales/translations.ts (wb.* keys) — no hardcoded copy here.

import { getItem, setItem } from '../hooks/useStorage';

const STORAGE_KEY = 'welcome_back_last_shown_v1';
const MIN_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours

export type WelcomeBackState = 'active' | 'returning' | 'first_of_day' | 'late_night';

const POOL_SIZE = 5; // matches wb.*.0 through wb.*.4 in translations

export async function shouldShowWelcomeBack(): Promise<boolean> {
  const lastShown = await getItem<number | null>(STORAGE_KEY, null);
  if (lastShown === null) return true;
  return (Date.now() - lastShown) >= MIN_INTERVAL_MS;
}

export async function markWelcomeBackShown(): Promise<void> {
  await setItem(STORAGE_KEY, Date.now());
}

export function getWelcomeBackState(
  streak: number,
  daysMissed: number,
  hour: number,
): WelcomeBackState {
  if (hour >= 22 || hour < 6) return 'late_night';
  if (daysMissed >= 3) return 'returning';
  if (streak >= 7) return 'active';
  return 'first_of_day';
}

// Maps state to the i18n key prefix. first_of_day reuses the normal pool.
function stateToPool(state: WelcomeBackState): string {
  if (state === 'returning')  return 'returning';
  if (state === 'active')     return 'active';
  if (state === 'late_night') return 'late_night';
  return 'normal'; // first_of_day and normal both use the normal pool
}

/** Returns the full i18n key for a welcome-back message, e.g. "wb.normal.2" */
export function getWelcomeMessageKey(state: WelcomeBackState, seed: number): string {
  const pool  = stateToPool(state);
  const index = Math.abs(seed) % POOL_SIZE;
  return `wb.${pool}.${index}`;
}

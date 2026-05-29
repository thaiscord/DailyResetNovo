// ─── Private Space Prompts ────────────────────────────────────────────────────
// Manages the stable daily question key for the "Seu espaço particular" card.
// Returns translation keys (e.g. 'progress.privateSpace.focus.q3') so the
// caller resolves text via t(key) — language-switch safe, no text stored.

import type { EmotionalProfile } from './emotionalProfile';
import { getItem, setItem, StorageKeys, getLocalDateKey } from '../hooks/useStorage';

type KeyPool = Record<EmotionalProfile, string[]>;

// Build key arrays once — same order as the translations file (q1..q25).
function buildPool(profile: EmotionalProfile): string[] {
  return Array.from({ length: 25 }, (_, i) => `progress.privateSpace.${profile}.q${i + 1}`);
}

const POOL: KeyPool = {
  focus:      buildPool('focus'),
  calm:       buildPool('calm'),
  confidence: buildPool('confidence'),
  burnout:    buildPool('burnout'),
};

const DEFAULT_KEY = 'progress.privateSpace.default';

// ─── Smart async selector ─────────────────────────────────────────────────────

type StoredTodayPrompt = { date: string; profile: string | null; key: string };

/**
 * Returns the daily private-space question KEY for the given profile.
 * - Stable for the same day + profile combination (cached in AsyncStorage)
 * - Avoids repeating any of the last 7 keys shown
 * - Returns DEFAULT_KEY when no profile is set
 *
 * Callers should resolve the key to text via t(key) for language-switch support.
 */
export async function selectPrivateSpacePrompt(
  profile: EmotionalProfile | null,
  _lang?: string,   // kept for API compatibility; no longer used for selection
): Promise<string> {
  const today = getLocalDateKey();

  const cached = await getItem<StoredTodayPrompt | null>(StorageKeys.SPACE_PROMPT_TODAY, null);
  if (cached && cached.date === today && cached.profile === profile) {
    return cached.key;
  }

  if (!profile) {
    await setItem(StorageKeys.SPACE_PROMPT_TODAY, { date: today, profile: null, key: DEFAULT_KEY });
    return DEFAULT_KEY;
  }

  const pool = POOL[profile];

  const history = await getItem<string[]>(StorageKeys.SPACE_PROMPT_HISTORY, []);
  const recentSet = new Set(history);
  const available = pool.filter(k => !recentSet.has(k));
  const source = available.length > 0 ? available : pool;
  const chosen = source[Math.floor(Math.random() * source.length)]!;

  await setItem(StorageKeys.SPACE_PROMPT_TODAY, { date: today, profile, key: chosen });

  const updated = [chosen, ...history.filter(h => h !== chosen)].slice(0, 7);
  await setItem(StorageKeys.SPACE_PROMPT_HISTORY, updated);

  return chosen;
}

// ─── Legacy sync selector (kept for backward compat) ─────────────────────────

/** @deprecated Use selectPrivateSpacePrompt (async) instead. */
export function getPrivateSpacePrompt(
  profile: EmotionalProfile | null,
  _lang: string,
  seed: number,
): string | null {
  if (!profile) return null;
  const pool = POOL[profile];
  return pool[Math.abs(seed) % pool.length] ?? null;
}

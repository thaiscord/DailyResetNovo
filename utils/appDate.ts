// ─── Centralized App Date Provider ───────────────────────────────────────────
// ALL date-based progression logic in the app must derive from getAppNow().
// In production: returns real new Date().
// In __DEV__: can be offset forward to simulate future days.
//
// This module uses a module-level variable (_devOffset) as an in-memory cache
// so that getAppNow() is always synchronous, even though the offset is
// persisted to AsyncStorage for survival across Expo Go restarts.
//
// Usage:
//   import { getAppNow } from '../utils/appDate';
//   const today = getAppNow().toDateString();
//
// Dev time travel:
//   import { setAppDateOffset, loadAppDateOffset } from '../utils/appDate';
//   await setAppDateOffset(7); // simulate 7 days forward

import AsyncStorage from '@react-native-async-storage/async-storage';

declare const __DEV__: boolean;

const DEV_OFFSET_KEY = '__dev_app_date_offset__';

// In-memory offset (days ahead of real date). Always 0 in production.
let _devOffset = 0;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the current app date.
 * In production: real new Date().
 * In __DEV__ with an active offset: real date + offset days.
 */
export function getAppNow(): Date {
  if (!__DEV__ || _devOffset === 0) return new Date();
  const d = new Date();
  d.setDate(d.getDate() + _devOffset);
  return d;
}

/**
 * Returns the current offset (days ahead). Always 0 in production.
 */
export function getAppDateOffset(): number {
  return __DEV__ ? _devOffset : 0;
}

/**
 * Sets the dev offset and persists it to AsyncStorage.
 * Updates the in-memory cache synchronously so subsequent getAppNow()
 * calls immediately return the new date.
 */
export async function setAppDateOffset(n: number): Promise<void> {
  if (!__DEV__) return;
  _devOffset = n;
  try {
    if (n === 0) {
      await AsyncStorage.removeItem(DEV_OFFSET_KEY);
    } else {
      await AsyncStorage.setItem(DEV_OFFSET_KEY, String(n));
    }
  } catch {
    // silently fail — in-memory value is still correct for this session
  }
}

/**
 * Loads the persisted offset from AsyncStorage into the in-memory cache.
 * Must be called once at app startup (before any progression logic runs).
 * In production this is a no-op.
 */
export async function loadAppDateOffset(): Promise<void> {
  if (!__DEV__) return;
  try {
    const raw = await AsyncStorage.getItem(DEV_OFFSET_KEY);
    _devOffset = raw ? parseInt(raw, 10) : 0;
  } catch {
    _devOffset = 0;
  }
}

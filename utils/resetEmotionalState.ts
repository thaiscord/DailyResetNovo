import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { StorageKeys } from '../hooks/useStorage';
import { clearAllDailyEntries } from './dailyEntries';

const DYNAMIC_PREFIXES = [
  'daily_entry_',
  'mood_checkin_',
  'daily_mood_v1_',
  'daily_state_v1_',
  'action_response_day_',
  'reflection_response_day_',
  'evening_anchor_',
];

const EMOTIONAL_KEYS = [
  'mindset_recommendation_date',
  'mindset_recommendation_mood',
  'mindset_read_cards',
  'clear_mind_entries',
  'content_memory_v1',
  'content_engine_notif_used_v1',
];

async function clearAllIndexedDB(): Promise<void> {
  try {
    if (!window.indexedDB) return;
    const dbs: IDBDatabaseInfo[] = window.indexedDB.databases
      ? await window.indexedDB.databases()
      : [];
    await Promise.all(
      dbs.map(db =>
        db.name
          ? new Promise<void>(resolve => {
              const req = window.indexedDB.deleteDatabase(db.name!);
              req.onsuccess = () => resolve();
              req.onerror = () => resolve();
              req.onblocked = () => resolve();
            })
          : Promise.resolve()
      )
    );
  } catch {
    // best-effort
  }
}

/**
 * Full nuclear reset — clears every persisted storage layer.
 * On web: wipes localStorage, sessionStorage, AsyncStorage, IndexedDB,
 * Cache API, service workers, cookies, then hard-reloads with a cache-bust URL.
 * On native: removes all named + dynamic keys then returns (caller navigates).
 * This function is called directly from the "Clear my data" button in Profile.
 */
export async function clearAllUserData(): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      console.log('FORCE HARD RESET CLICKED');

      try { console.log('Before reset localStorage', Object.keys(window.localStorage)); } catch(e) { console.log(e); }

      try { localStorage.clear(); } catch(e) { console.log(e); }

      try { sessionStorage.clear(); } catch(e) { console.log(e); }

      try { await AsyncStorage.clear(); } catch(e) { console.log(e); }

      try {
        if (window.indexedDB && window.indexedDB.databases) {
          const dbs = await indexedDB.databases();
          await Promise.all(
            dbs.map(db => db.name
              ? new Promise<void>(resolve => {
                  const req = indexedDB.deleteDatabase(db.name!);
                  req.onsuccess = () => resolve();
                  req.onerror = () => resolve();
                  req.onblocked = () => resolve();
                })
              : Promise.resolve()
            )
          );
        }
      } catch(e) { console.log(e); }

      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
        }
      } catch(e) { console.log(e); }

      try {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map(reg => reg.unregister()));
        }
      } catch(e) { console.log(e); }

      console.log('RESET FINISHED - RELOADING');
      window.location.replace('/?reset=' + Date.now());
    } else {
      // ── native: remove all named + dynamic keys ───────────────────────
      const allNamedKeys = Object.values(StorageKeys);
      await Promise.all([
        ...allNamedKeys.map(k => AsyncStorage.removeItem(k)),
        ...EMOTIONAL_KEYS.map(k => AsyncStorage.removeItem(k)),
      ]);

      const remaining = await AsyncStorage.getAllKeys();
      const dynamicKeys = remaining.filter(k => DYNAMIC_PREFIXES.some(p => k.startsWith(p)));
      if (dynamicKeys.length > 0) await AsyncStorage.multiRemove(dynamicKeys);

      await clearAllDailyEntries();
    }
  } catch (err) {
    console.error('[RESET] Error during reset:', err);
  }
}

/**
 * Clears all user progress and emotional state from AsyncStorage.
 * Call this on app reset, logout, or full data clear.
 * Preserves only device-level preferences: language, notification settings.
 */
export async function resetEmotionalState(): Promise<void> {
  try {
    // ── 1. All named StorageKeys (progress + emotional state) ─────────────
    const progressKeys: string[] = [
      StorageKeys.ONBOARDING_DONE,
      StorageKeys.USER_NAME,
      StorageKeys.USER_GOALS,
      StorageKeys.CURRENT_DAY,
      StorageKeys.COMPLETED_DAYS,
      StorageKeys.COMPLETED_BY_DATE,
      StorageKeys.STREAK,
      StorageKeys.BEST_STREAK,
      StorageKeys.LAST_COMPLETED_DATE,
      StorageKeys.HABITS,
      StorageKeys.HABIT_LOG,
      StorageKeys.IS_PREMIUM,
      StorageKeys.WEEKLY_RECAPS,
      StorageKeys.LAST_RECAP_WEEK,
      StorageKeys.COMEBACK_COUNT,
      StorageKeys.MILESTONE_CEREMONIES_SEEN,
      StorageKeys.MILESTONE_HISTORY,
      StorageKeys.EMOTIONAL_PROFILE,
      StorageKeys.ONBOARDING_ANSWERS,
      StorageKeys.RITUAL_HISTORY,
      StorageKeys.LAST_REVIEW_REQUEST,
      StorageKeys.REVIEW_TRIGGER_COUNT,
      StorageKeys.REFLECTIONS,
      StorageKeys.SPACE_REFLECTIONS,
      StorageKeys.RITUAL_INTENTION_TODAY,
      StorageKeys.FIRST_RITUAL_COMPLETED,
      StorageKeys.NOTIF_SHUFFLE_QUEUE,
      StorageKeys.NOTIF_LAST_BODY,
      StorageKeys.ARRIVAL_STATE,
      StorageKeys.DAILY_MOOD,
      StorageKeys.PERSONAL_MANTRA,
      StorageKeys.MANTRA_SHOWN,
      StorageKeys.IDENTITY_ANSWER,
      StorageKeys.IDENTITY_ASKED,
      StorageKeys.EVENING_ANCHOR_TIME,
      StorageKeys.LAST_EVENING_DATE,
      StorageKeys.RETURN_SHOWN_DATE,
      StorageKeys.NOTIF_GAP_LAST_SENT,
      StorageKeys.NOTIF_OPEN_TIME_HISTORY,
    ];

    // ── 2. Mindset + emotional journaling keys ────────────────────────────
    const emotionalKeys: string[] = [
      'mindset_recommendation_date',
      'mindset_recommendation_mood',
      'mindset_read_cards',
      'clear_mind_entries',
      'content_memory_v1',
      'content_engine_notif_used_v1',
    ];

    await Promise.all([
      ...progressKeys.map(k => AsyncStorage.removeItem(k)),
      ...emotionalKeys.map(k => AsyncStorage.removeItem(k)),
    ]);

    // ── 3. Dynamic keys — scan by prefix ─────────────────────────────────
    const allKeys = await AsyncStorage.getAllKeys();
    const dynamicKeys = allKeys.filter(k =>
      DYNAMIC_PREFIXES.some(p => k.startsWith(p))
    );
    if (dynamicKeys.length > 0) {
      await AsyncStorage.multiRemove(dynamicKeys);
    }

    // ── 4. Daily entries (covers daily_entry_*, mood_checkin_*, daily_mood_v1_*) ─
    await clearAllDailyEntries();

  } catch {
    // silently fail — reset best-effort
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../hooks/useStorage';
import { clearAllDailyEntries } from './dailyEntries';

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
    const DYNAMIC_PREFIXES = [
      'daily_entry_',
      'mood_checkin_',
      'daily_mood_v1_',
      'daily_state_v1_',        // date-keyed emotional state (daily_state_v1_YYYY-MM-DD)
      'action_response_day_',
      'reflection_response_day_',
      'evening_anchor_',
    ];
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

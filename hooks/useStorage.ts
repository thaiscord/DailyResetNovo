import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppNow } from '../utils/appDate';

export const StorageKeys = {
  ONBOARDING_DONE: 'onboarding_done',
  USER_NAME: 'user_name',
  USER_GOALS: 'user_goals',
  NOTIFICATION_TIME: 'notification_time',
  NOTIFICATION_EXACT_TIME: 'notification_exact_time',
  CURRENT_DAY: 'current_day',
  COMPLETED_DAYS: 'completed_days',
  HABITS: 'habits',
  HABIT_LOG: 'habit_log',
  STREAK: 'streak',
  BEST_STREAK: 'best_streak',
  LAST_COMPLETED_DATE: 'last_completed_date',
  COMPLETED_BY_DATE: 'completed_by_date',
  IS_PREMIUM: 'is_premium',
  LANGUAGE: 'language',
  WEEKLY_RECAPS: 'weekly_recaps_v1',
  LAST_RECAP_WEEK: 'last_recap_week_v1',
  LAST_RECAP_WEEK_MONDAY: 'last_recap_week_monday_v2', // YYYY-MM-DD of last recap's Monday
  COMEBACK_COUNT: 'comeback_count',
  MILESTONE_CEREMONIES_SEEN: 'milestone_ceremonies_seen_v1',
  MILESTONE_HISTORY: 'milestone_history_v1',
  EMOTIONAL_PROFILE: 'emotional_profile_v1',
  ONBOARDING_ANSWERS: 'onboarding_answers_v1',
  RITUAL_HISTORY: 'ritual_history_v1',
  LAST_REVIEW_REQUEST: 'last_review_request',
  REVIEW_TRIGGER_COUNT: 'review_trigger_count',
  REFLECTIONS: 'daily_reflections_v1',
  SPACE_REFLECTIONS: 'space_reflections_v1',
  RITUAL_INTENTION_TODAY: 'ritual_intention_today',
  FIRST_RITUAL_COMPLETED: 'firstRitualCompleted',
  NOTIF_SHUFFLE_QUEUE: 'notif_shuffle_queue',
  NOTIF_LAST_BODY: 'notif_last_body',
  ARRIVAL_STATE: 'arrival_state_v1',
  DAILY_MOOD: 'daily_mood_v1',
  // Retention layer (Prompt 4)
  PERSONAL_MANTRA: 'personal_mantra_v1',
  MANTRA_SHOWN: 'mantra_shown_v1',
  IDENTITY_ANSWER: 'identity_answer_v1',
  IDENTITY_ASKED: 'identity_asked_v1',
  EVENING_ANCHOR_TIME: 'evening_anchor_time_v1',
  LAST_EVENING_DATE: 'last_evening_date_v1',
  RETURN_SHOWN_DATE: 'return_shown_date_v1',
  // Daily emotional state (Prompt 9 System 6)
  DAILY_STATE: 'daily_state_v1',
  // Welcome back experience (Prompt 4)
  WELCOME_BACK_LAST_SHOWN: 'welcome_back_last_shown_v1',
  // Notification intelligence layer (Prompt 5)
  NOTIF_WORD_ENABLED: 'notif_word_enabled_v1',
  NOTIF_EVENING_ENABLED: 'notif_evening_enabled_v1',
  NOTIF_EVENING_EXACT_TIME: 'notif_evening_exact_time_v1',
  NOTIF_MILESTONE_ENABLED: 'notif_milestone_enabled_v1',
  NOTIF_QUIET_DAYS: 'notif_quiet_days_v1',
  NOTIF_GAP_LAST_SENT: 'notif_gap_last_sent_v1',
  NOTIF_PERMISSION_ASKED: 'notif_permission_asked_v1',
  NOTIF_OPEN_TIME_HISTORY: 'notif_open_time_history_v1',
  // Private space prompts
  SPACE_PROMPT_TODAY: 'space_prompt_today_v1',
  SPACE_PROMPT_HISTORY: 'space_prompt_history_v1',
  // Path memories — tracks which memories have been surfaced
  PATH_MEMORY_SEEN: 'path_memory_seen_v1',
};

/**
 * Returns YYYY-MM-DD for the given date.
 * When called with NO argument: uses getAppNow() — the centralized app date
 * that applies the dev time-travel offset in __DEV__ mode.
 * When called WITH an explicit date (e.g., for historical lookups): uses
 * that exact date as-is, without any offset.
 */
export function getLocalDateKey(date?: Date): string {
  const d = date !== undefined ? date : getAppNow();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val === null) return fallback;
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // silently fail
  }
}

/** Apaga todos os dados de progresso — use para limpar state corrompido durante testes */
export async function clearAllProgressStorage(): Promise<void> {
  // Remove all static named keys
  await Promise.all(
    Object.values(StorageKeys).map(key => AsyncStorage.removeItem(key))
  );
  // Remove dynamic date-keyed entries (e.g. daily_state_v1_YYYY-MM-DD)
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const DYNAMIC_PREFIXES = [
      'daily_entry_',
      'mood_checkin_',
      'daily_mood_v1_',
      'daily_state_v1_',
      'action_response_day_',
      'reflection_response_day_',
      'evening_anchor_',
    ];
    const dynamic = allKeys.filter(k => DYNAMIC_PREFIXES.some(p => k.startsWith(p)));
    if (dynamic.length > 0) await AsyncStorage.multiRemove(dynamic);
  } catch {
    // silently fail
  }
}

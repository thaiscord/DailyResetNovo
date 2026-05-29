import { useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getItem, StorageKeys, getLocalDateKey } from './useStorage';
import {
  parseExactTime,
  scheduleAllNotifications,
  cancelComebackReminders,
  scheduleComebackReminders,
  type NotifAllContext,
} from '../utils/notifications';
import { detectComebackState } from '../utils/comebackSystem';
import { ProgressState } from './useProgress';

/**
 * Reschedules all notifications with full context on Today tab focus.
 * Runs at most ONCE per calendar day to avoid flooding the notification system.
 * Direct scheduling calls (settings save, language change, reset completion)
 * bypass this guard and always run immediately.
 */
export function useNotificationScheduler(
  progress: ProgressState,
  weeklyScore: number,
) {
  const lastScheduledDate = useRef('');

  useFocusEffect(useCallback(() => {
    const today = getLocalDateKey();
    if (lastScheduledDate.current === today) return;

    async function schedule() {
      // expo-notifications scheduling is not supported on web
      if (Platform.OS === 'web') {
        console.log('[notif] useNotificationScheduler — web, skipping');
        return;
      }
      try {
        const exactTime = await getItem<string | null>(StorageKeys.NOTIFICATION_EXACT_TIME, null);
        if (!exactTime) {
          console.log('[notif] useNotificationScheduler — no NOTIFICATION_EXACT_TIME, skipping');
          return;
        }
        console.log('[notif] useNotificationScheduler — scheduling for date', today);

        const { hour, minute } = parseExactTime(exactTime);
        const comeback = detectComebackState(progress.completedByDate, progress.completedDays.length);

        const [period, eveningEnabled, eveningTimeStr, wordEnabled, milestoneEnabled, quietDays, lastMoodRaw] = await Promise.all([
          getItem<string>(StorageKeys.NOTIFICATION_TIME, 'morning'),
          getItem<boolean>(StorageKeys.NOTIF_EVENING_ENABLED, false),
          getItem<string | null>(StorageKeys.NOTIF_EVENING_EXACT_TIME, null),
          getItem<boolean>(StorageKeys.NOTIF_WORD_ENABLED, true),
          getItem<boolean>(StorageKeys.NOTIF_MILESTONE_ENABLED, true),
          getItem<number[]>(StorageKeys.NOTIF_QUIET_DAYS, []),
          getItem<number | null>(StorageKeys.DAILY_MOOD, null),
        ]);

        const { hour: eveningHour, minute: eveningMinute } = eveningTimeStr
          ? parseExactTime(eveningTimeStr)
          : { hour: 21, minute: 0 };

        const safePeriod = (['morning', 'afternoon', 'evening'].includes(period ?? '')
          ? period
          : 'morning') as 'morning' | 'afternoon' | 'evening';

        const todayKey = getLocalDateKey();
        const ritualDoneToday = (progress.completedByDate as Record<string, boolean>)[todayKey] ?? false;

        const ctx: NotifAllContext = {
          ritualHour: hour,
          ritualMinute: minute,
          ritualPeriod: safePeriod,
          streak: progress.streak,
          daysMissed: comeback.daysMissed,
          totalDays: progress.completedDays.length,
          currentDay: progress.currentDay,
          lastMood: (lastMoodRaw as 0 | 1 | 2 | null) ?? null,
          eveningEnabled: eveningEnabled ?? false,
          eveningHour,
          eveningMinute,
          wordEnabled: wordEnabled ?? true,
          milestoneEnabled: milestoneEnabled ?? true,
          quietDays: quietDays ?? [],
          ritualDoneToday,
          seed: new Date().getDate(),
        };

        await scheduleAllNotifications(ctx);

        // User is active → cancel stale comeback reminders, schedule fresh ones
        await cancelComebackReminders();
        await scheduleComebackReminders(new Date().getDate());

        lastScheduledDate.current = today;
      } catch {
        // Never crash the app for notification scheduling
      }
    }

    schedule();
  }, [progress.streak, progress.currentDay, progress.completedDays.length, weeklyScore]));
}

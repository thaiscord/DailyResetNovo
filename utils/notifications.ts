import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  NotifMessage,
  NotifContext,
  selectContextualNotification,
  selectWeeklyRecapNotification,
  selectMilestoneNotification,
  SMART_DAILY,
  SMART_DAILY_ES,
  SMART_DAILY_PT,
  SMART_COMEBACK_1D,
  SMART_COMEBACK_1D_ES,
  SMART_COMEBACK_1D_PT,
  SMART_COMEBACK_2_3D,
  SMART_COMEBACK_2_3D_ES,
  SMART_COMEBACK_2_3D_PT,
  SMART_COMEBACK_4D_PLUS,
  SMART_COMEBACK_4D_PLUS_ES,
  SMART_COMEBACK_4D_PLUS_PT,
  SMART_MILESTONE_NOTIFICATIONS,
  SMART_MILESTONE_NOTIFICATIONS_ES,
  SMART_MILESTONE_NOTIFICATIONS_PT,
  selectIntelligentDailyNotification,
  selectEveningNotification,
  selectGapNudge,
  selectWordOfDayNotification,
  MILESTONE_DELIVERY,
  MILESTONE_DELIVERY_PT,
  selectMilestoneDelivery,
  selectComebackReminderNotification,
} from './notificationContent';
import { getDayWord } from './homeGreeting';
import { getItem, setItem, StorageKeys } from '../hooks/useStorage';
import { isEs, isPt, getActiveLang } from './langStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// ── Fixed notification identifiers ────────────────────────────────────────────
export const NOTIF_IDS = {
  DAILY:        'daily_reset_reminder',
  EVENING:      'night_checkin',
  WORD:         'word_of_day',
  MILESTONE_3:  'milestone_day_3',
  MILESTONE_7:  'milestone_day_7',
  MILESTONE_14: 'milestone_day_14',
  MILESTONE_30: 'milestone_day_30',
  INACTIVITY_2: 'inactivity_day_2',
  INACTIVITY_3: 'inactivity_day_3',
} as const;

// Legacy IDs that need to be cleaned up on migration
const LEGACY_IDS = [
  'daily-main', 'evening-anchor', 'word-of-day', 'weekly-recap',
  'comebackReminder2Days', 'comebackReminder3Days',
  'comebackReminder5Days', 'comebackReminder7Days',
  'gap-2d', 'gap-5d', 'gap-14d', 'gap-30d',
  'inactivity-2d', 'inactivity-5d', 'comeback-reminder',
];

// Maps streak day to fixed milestone ID
const MILESTONE_ID_MAP: Record<number, string> = {
  3:  NOTIF_IDS.MILESTONE_3,
  7:  NOTIF_IDS.MILESTONE_7,
  14: NOTIF_IDS.MILESTONE_14,
  30: NOTIF_IDS.MILESTONE_30,
};

// ── Android channel ───────────────────────────────────────────────────────────
async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('daily-reset', {
    name: 'Daily Reset',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#EFC94C',
  });
}

// ── Cancel all Daily Reset notifications (new + legacy) ───────────────────────
export async function cancelAllDailyResetNotifications(): Promise<void> {
  const allIds = [
    ...Object.values(NOTIF_IDS),
    ...LEGACY_IDS,
    ...[3, 7, 14, 30, 100].map(n => `milestone-${n}`),
    ...[3, 7, 14, 30].map(n => `milestone-delivery-${n}`),
  ];
  await Promise.all(allIds.map(id =>
    Notifications.cancelScheduledNotificationAsync(id).catch(() => null)
  ));
  console.log('[notif] cancelled all daily reset notifications');
}

// ── Permission ────────────────────────────────────────────────────────────────
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: current } = await Notifications.getPermissionsAsync();
    console.log('[notif] current permission status:', current);
    if (current === 'granted') return true;
    const { status: requested } = await Notifications.requestPermissionsAsync();
    console.log('[notif] requested permission status:', requested);
    return requested === 'granted';
  } catch {
    return false;
  }
}

// ─── Core scheduler (identifier-safe) ────────────────────────────────────────

async function scheduleDailyAt(
  identifier: string,
  hour: number,
  minute: number,
  message: NotifMessage,
): Promise<string | null> {
  try {
    await ensureAndroidChannel();
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => null);

    const id = await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title: message.title, body: message.body, sound: true },
      trigger: Platform.OS === 'android'
        ? { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, channelId: 'daily-reset' }
        : { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
    });
    console.log('[notif] scheduled daily:', identifier, `${hour}:${minute.toString().padStart(2, '0')}`, '|', message.body);
    return id;
  } catch (e) {
    console.log('[notif] error scheduling daily:', identifier, e);
    return null;
  }
}

async function scheduleOnceIn(
  identifier: string,
  seconds: number,
  message: NotifMessage,
): Promise<void> {
  try {
    await ensureAndroidChannel();
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => null);

    await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title: message.title, body: message.body, sound: true },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        repeats: false,
      },
    });
    console.log('[notif] scheduled once-in:', identifier, `${seconds}s`);
  } catch (e) {
    console.log('[notif] error scheduling once-in:', identifier, e);
  }
}

// ─── Main contextual daily notification ──────────────────────────────────────

export async function scheduleContextualDailyNotification(
  hour: number,
  minute: number,
  ctx: NotifContext,
): Promise<{ success: boolean }> {
  try {
    const message = selectContextualNotification(ctx);
    await scheduleDailyAt(NOTIF_IDS.DAILY, hour, minute, message);
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function scheduleInactivityNotifications(
  ctx: Pick<NotifContext, 'streak' | 'totalDays' | 'goals' | 'seed'>,
): Promise<void> {
  const short = selectContextualNotification({
    ...ctx, period: 'morning', daysMissed: 2, weeklyScore: 0,
  });
  const long = selectContextualNotification({
    ...ctx, period: 'morning', daysMissed: 3, weeklyScore: 0,
  });

  const TWO_DAYS   = 2 * 24 * 60 * 60;
  const THREE_DAYS = 3 * 24 * 60 * 60;

  await Promise.all([
    scheduleOnceIn(NOTIF_IDS.INACTIVITY_2, TWO_DAYS,   short),
    scheduleOnceIn(NOTIF_IDS.INACTIVITY_3, THREE_DAYS, long),
  ]);
}

export async function cancelInactivityNotifications(): Promise<void> {
  await Promise.all([
    Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.INACTIVITY_2).catch(() => null),
    Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.INACTIVITY_3).catch(() => null),
    // Legacy cleanup
    Notifications.cancelScheduledNotificationAsync('inactivity-2d').catch(() => null),
    Notifications.cancelScheduledNotificationAsync('inactivity-5d').catch(() => null),
    Notifications.cancelScheduledNotificationAsync('comeback-reminder').catch(() => null),
  ]);
  console.log('[notif] cancelled inactivity notifications');
}

// ─── Comeback reminders ───────────────────────────────────────────────────────

const COMEBACK_IDS = [
  'comebackReminder2Days',
  'comebackReminder3Days',
  'comebackReminder5Days',
  'comebackReminder7Days',
] as const;

export async function cancelComebackReminders(): Promise<void> {
  await Promise.all([
    ...COMEBACK_IDS.map(id =>
      Notifications.cancelScheduledNotificationAsync(id).catch(() => null)
    ),
    Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.INACTIVITY_2).catch(() => null),
    Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.INACTIVITY_3).catch(() => null),
    Notifications.cancelScheduledNotificationAsync('inactivity-2d').catch(() => null),
    Notifications.cancelScheduledNotificationAsync('inactivity-5d').catch(() => null),
    Notifications.cancelScheduledNotificationAsync('comeback-reminder').catch(() => null),
  ]);
  console.log('[notif] cancelled comeback reminders');
}

export async function scheduleComebackReminders(seed: number): Promise<void> {
  try {
    const exactTime = await getItem<string | null>(StorageKeys.NOTIFICATION_EXACT_TIME, null);
    if (!exactTime) return;

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;

    const quietDays = await getItem<number[]>(StorageKeys.NOTIF_QUIET_DAYS, []);
    await ensureAndroidChannel();

    const now  = new Date();
    const days = [2, 3, 5, 7] as const;

    await Promise.all(
      days.map((d, i) => {
        const target = new Date(now.getTime() + d * 86_400_000);
        if (quietDays.includes(target.getDay())) return Promise.resolve();

        const message = selectComebackReminderNotification(d, seed);
        return Notifications.scheduleNotificationAsync({
          identifier: COMEBACK_IDS[i]!,
          content: { title: message.title, body: message.body, sound: true },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: d * 24 * 60 * 60,
            repeats: false,
          },
        }).catch(() => null);
      })
    );
    console.log('[notif] scheduled comeback reminders');
  } catch {
    // Silently fail
  }
}

// ─── Milestone notifications (fixed IDs) ─────────────────────────────────────

export async function sendMilestoneNotification(streak: number): Promise<void> {
  try {
    await ensureAndroidChannel();
    const message = selectMilestoneNotification(streak);
    const identifier = MILESTONE_ID_MAP[streak] ?? `milestone_day_${streak}`;
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => null);
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title: message.title, body: message.body, sound: true },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 1, repeats: false },
    });
    console.log('[notif] sent milestone notification:', identifier);
  } catch {
    // Silently fail
  }
}

export async function scheduleWeeklyRecapNotification(
  hour: number,
  minute: number,
  seed: number,
): Promise<void> {
  const message = selectWeeklyRecapNotification(seed);
  await scheduleDailyAt('weekly-recap', hour, minute, message);
}

// ─── Smart notification system ────────────────────────────────────────────────

const SMART_MILESTONE_DAYS = new Set([3, 7, 14, 30]);

function notifKey(m: NotifMessage): string {
  return m.body || m.title;
}

function pickAvoidRepeat(pool: NotifMessage[], lastBody: string): NotifMessage {
  const filtered = pool.filter(m => notifKey(m) !== lastBody);
  const source = filtered.length > 0 ? filtered : pool;
  return source[Math.floor(Math.random() * source.length)]!;
}

function shuffleIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export async function scheduleSmartDailyNotification(
  hour: number,
  minute: number,
  daysMissed: number,
  streak: number,
): Promise<{ success: boolean }> {
  try {
    const lastBody = await getItem<string>(StorageKeys.NOTIF_LAST_BODY, '');

    let message: NotifMessage;

    const es = isEs();
    const pt = isPt();
    const milestoneMap   = es ? SMART_MILESTONE_NOTIFICATIONS_ES : pt ? SMART_MILESTONE_NOTIFICATIONS_PT : SMART_MILESTONE_NOTIFICATIONS;
    const comeback1d     = es ? SMART_COMEBACK_1D_ES    : pt ? SMART_COMEBACK_1D_PT    : SMART_COMEBACK_1D;
    const comeback2_3d   = es ? SMART_COMEBACK_2_3D_ES  : pt ? SMART_COMEBACK_2_3D_PT  : SMART_COMEBACK_2_3D;
    const comeback4dPlus = es ? SMART_COMEBACK_4D_PLUS_ES : pt ? SMART_COMEBACK_4D_PLUS_PT : SMART_COMEBACK_4D_PLUS;
    const dailyPool      = es ? SMART_DAILY_ES : pt ? SMART_DAILY_PT : SMART_DAILY;

    if (SMART_MILESTONE_DAYS.has(streak)) {
      message = milestoneMap[streak] ??
        { title: es ? `Día ${streak}.` : pt ? `Dia ${streak}.` : `Day ${streak}.`, body: es ? 'Seguiste volviendo.' : pt ? 'Você continuou voltando.' : 'You kept showing up.' };
    } else if (daysMissed >= 4) {
      message = pickAvoidRepeat(comeback4dPlus, lastBody);
    } else if (daysMissed >= 2) {
      message = pickAvoidRepeat(comeback2_3d, lastBody);
    } else if (daysMissed === 1) {
      message = pickAvoidRepeat(comeback1d, lastBody);
    } else {
      let queue = await getItem<number[]>(StorageKeys.NOTIF_SHUFFLE_QUEUE, []);
      if (queue.length === 0) {
        queue = shuffleIndices(dailyPool.length);
      }
      const pickIdx = queue.findIndex(i => notifKey(dailyPool[i]!) !== lastBody);
      const useIdx = pickIdx >= 0 ? pickIdx : 0;
      const chosen = queue[useIdx]!;
      queue.splice(useIdx, 1);
      await setItem(StorageKeys.NOTIF_SHUFFLE_QUEUE, queue);
      message = dailyPool[chosen]!;
    }

    await setItem(StorageKeys.NOTIF_LAST_BODY, notifKey(message));
    await scheduleDailyAt(NOTIF_IDS.DAILY, hour, minute, message);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATION INTELLIGENCE LAYER
// ═══════════════════════════════════════════════════════════════════════════════

export interface NotifAllContext {
  ritualHour: number;
  ritualMinute: number;
  ritualPeriod: 'morning' | 'afternoon' | 'evening';
  streak: number;
  daysMissed: number;
  totalDays: number;
  currentDay: number;
  lastMood: 0 | 1 | 2 | null;
  eveningEnabled: boolean;
  eveningHour: number;
  eveningMinute: number;
  wordEnabled: boolean;
  milestoneEnabled: boolean;
  quietDays: number[];
  ritualDoneToday: boolean;
  seed: number;
}

// ─── Type 2: Evening Anchor / Night Check-in ──────────────────────────────────

export async function scheduleEveningAnchorNotification(
  hour: number,
  minute: number,
  ctx: { ritualDone: boolean; lastMood: 0 | 1 | 2 | null; seed: number },
): Promise<void> {
  try {
    await ensureAndroidChannel();
    // Cancel both new and legacy identifiers
    await Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.EVENING).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync('evening-anchor').catch(() => null);

    const message = selectEveningNotification(ctx);
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIF_IDS.EVENING,
      content: { title: message.title, body: message.body, sound: true },
      trigger: Platform.OS === 'android'
        ? { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, channelId: 'daily-reset' }
        : { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
    });
    console.log('[notif] scheduled night check-in:', `${hour}:${minute.toString().padStart(2, '0')}`);
  } catch (e) {
    console.log('[notif] error scheduling evening:', e);
  }
}

// ─── Type 3: Gap nudges ───────────────────────────────────────────────────────

const GAP_IDS = ['gap-2d', 'gap-5d', 'gap-14d', 'gap-30d'];

export async function cancelGapNudges(): Promise<void> {
  await Promise.all(GAP_IDS.map(id =>
    Notifications.cancelScheduledNotificationAsync(id).catch(() => null)
  ));
}

export async function scheduleGapNudges(
  usualHour: number,
  usualMinute: number,
  seed: number,
): Promise<void> {
  try {
    await ensureAndroidChannel();
    const [lastSentStr, quietDays] = await Promise.all([
      getItem<string>(StorageKeys.NOTIF_GAP_LAST_SENT, ''),
      getItem<number[]>(StorageKeys.NOTIF_QUIET_DAYS, []),
    ]);
    const now = new Date();

    const daysSinceLast = lastSentStr
      ? Math.floor((now.getTime() - new Date(lastSentStr).getTime()) / 86400000)
      : 999;

    if (daysSinceLast < 7) return;

    const scheduleAt = (id: string, delayDays: number) => {
      const targetDate = new Date(now.getTime() + delayDays * 86400000);
      if (quietDays.includes(targetDate.getDay())) return Promise.resolve(null);
      const message = selectGapNudge(delayDays, seed);
      return Notifications.scheduleNotificationAsync({
        identifier: id,
        content: { title: message.title, body: message.body, sound: true },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: delayDays * 24 * 60 * 60, repeats: false },
      }).catch(() => null);
    };

    await Promise.all([
      scheduleAt('gap-2d',  2),
      scheduleAt('gap-5d',  5),
      scheduleAt('gap-14d', 14),
      scheduleAt('gap-30d', 30),
    ]);
  } catch {
    // Silently fail
  }
}

// ─── Type 4: Milestone Delivery ───────────────────────────────────────────────

export async function scheduleMilestoneDeliveryNotification(streak: number): Promise<void> {
  try {
    const message = selectMilestoneDelivery(streak);
    if (!message) return;

    await ensureAndroidChannel();
    const identifier = MILESTONE_ID_MAP[streak] ?? `milestone_day_${streak}`;
    // Cancel new and legacy
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync(`milestone-delivery-${streak}`).catch(() => null);

    const tomorrow8am = new Date();
    tomorrow8am.setDate(tomorrow8am.getDate() + 1);
    tomorrow8am.setHours(8, 0, 0, 0);
    const secondsUntil = Math.max(60, Math.floor((tomorrow8am.getTime() - Date.now()) / 1000));

    await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title: message.title, body: message.body, sound: true },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: secondsUntil, repeats: false },
    });
    console.log('[notif] scheduled milestone delivery:', identifier, 'tomorrow 8am');
  } catch {
    // Silently fail
  }
}

// ─── Type 5: Word of the Day ──────────────────────────────────────────────────

export async function scheduleWordOfDayNotification(
  ritualHour: number,
  ritualMinute: number,
  currentDay: number,
): Promise<void> {
  try {
    await ensureAndroidChannel();
    await Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.WORD).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync('word-of-day').catch(() => null); // legacy

    let wHour = ritualHour;
    let wMin  = ritualMinute - 30;
    if (wMin < 0) { wMin += 60; wHour = (wHour - 1 + 24) % 24; }

    const { word } = getDayWord(currentDay + 1);
    const message  = selectWordOfDayNotification(word);

    await Notifications.scheduleNotificationAsync({
      identifier: NOTIF_IDS.WORD,
      content: { title: message.title, body: message.body, sound: true },
      trigger: Platform.OS === 'android'
        ? { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: wHour, minute: wMin, channelId: 'daily-reset' }
        : { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: wHour, minute: wMin },
    });
    console.log('[notif] scheduled word of day:', `${wHour}:${wMin.toString().padStart(2, '0')}`, '|', message.body);
  } catch (e) {
    console.log('[notif] error scheduling word of day:', e);
  }
}

// ─── Master Orchestrator ──────────────────────────────────────────────────────

export async function scheduleAllNotifications(ctx: NotifAllContext): Promise<void> {
  const {
    ritualHour, ritualMinute, ritualPeriod,
    streak, daysMissed, currentDay,
    lastMood,
    eveningEnabled, eveningHour, eveningMinute,
    wordEnabled, milestoneEnabled,
    quietDays,
    ritualDoneToday, seed,
  } = ctx;

  console.log('[notif] scheduleAllNotifications — lang:', getActiveLang());
  console.log('[notif] toggles → evening:', eveningEnabled, '| word:', wordEnabled, '| milestone:', milestoneEnabled);
  console.log('[notif] ritual time:', `${ritualHour}:${ritualMinute.toString().padStart(2, '0')}`, '| period:', ritualPeriod);
  console.log('[notif] evening time:', `${eveningHour}:${eveningMinute.toString().padStart(2, '0')}`);
  console.log('[notif] state → streak:', streak, '| daysMissed:', daysMissed, '| ritualDoneToday:', ritualDoneToday, '| quietDays:', quietDays);

  // Check + request permission
  let permStatus = (await Notifications.getPermissionsAsync()).status;
  console.log('[notif] permission status:', permStatus);
  if (permStatus !== 'granted') {
    if (permStatus === 'undetermined') {
      const { status: requested } = await Notifications.requestPermissionsAsync();
      permStatus = requested;
      console.log('[notif] requested permission:', permStatus);
    }
    if (permStatus !== 'granted') {
      console.log('[notif] no permission — skipping scheduling');
      return;
    }
  }

  const todayDow = new Date().getDay();
  const isQuietToday = quietDays.includes(todayDow);

  // --- TYPE 1: Daily ritual reminder ---
  if (!isQuietToday && !ritualDoneToday) {
    const message = selectIntelligentDailyNotification({
      period: ritualPeriod,
      streak,
      daysMissed,
      lastMood,
      seed,
    });
    await setItem(StorageKeys.NOTIF_LAST_BODY, message.body);
    await scheduleDailyAt(NOTIF_IDS.DAILY, ritualHour, ritualMinute, message);
  } else {
    await Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.DAILY).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync('daily-main').catch(() => null); // legacy
    console.log('[notif] cancelled daily reminder (done today or quiet day)');
  }

  // --- TYPE 2: Evening / night check-in ---
  if (eveningEnabled && !isQuietToday) {
    await scheduleEveningAnchorNotification(eveningHour, eveningMinute, {
      ritualDone: ritualDoneToday,
      lastMood,
      seed,
    });
  } else {
    await Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.EVENING).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync('evening-anchor').catch(() => null); // legacy
    console.log('[notif] cancelled evening check-in (disabled or quiet day)');
  }

  // --- TYPE 5: Word of the day ---
  if (wordEnabled && !ritualDoneToday) {
    await scheduleWordOfDayNotification(ritualHour, ritualMinute, currentDay);
  } else {
    await Notifications.cancelScheduledNotificationAsync(NOTIF_IDS.WORD).catch(() => null);
    await Notifications.cancelScheduledNotificationAsync('word-of-day').catch(() => null); // legacy
    console.log('[notif] cancelled word of day (disabled or ritual done)');
  }

  // --- TYPE 4: Milestone ---
  // If toggle is off, cancel any pending milestone notifications
  if (!milestoneEnabled) {
    await Promise.all(
      Object.values(MILESTONE_ID_MAP).map(id =>
        Notifications.cancelScheduledNotificationAsync(id).catch(() => null)
      )
    );
    console.log('[notif] cancelled milestones (toggle off)');
  }
  // When enabled, milestones are scheduled via scheduleMilestoneDeliveryNotification()
  // called from today.tsx when a milestone streak is reached

  // Log final pending list
  try {
    const pending = await Notifications.getAllScheduledNotificationsAsync();
    console.log('[notif] scheduled:', pending.map(n => n.identifier));
  } catch {
    // ignore
  }
}

// ─── Language change reschedule ───────────────────────────────────────────────

export async function cancelNotificationsForLanguageChange(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => null);
    await setItem(StorageKeys.NOTIF_SHUFFLE_QUEUE, []);
    console.log('[notif] cancelled all for language change');
  } catch {
    // Silently fail
  }
}

export async function rescheduleNotificationsForLanguageChange(
  ctx: NotifAllContext,
): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => null);
    await setItem(StorageKeys.NOTIF_SHUFFLE_QUEUE, []);
    console.log('[notif] rescheduling for new lang:', getActiveLang());
    await scheduleAllNotifications(ctx);
  } catch {
    // Silently fail
  }
}

// ─── Legacy API — backward compatibility ─────────────────────────────────────

/** @deprecated Use scheduleContextualDailyNotification instead. */
export async function scheduleNotificationAtTime(
  hour: number,
  minute: number,
  period: 'morning' | 'afternoon' | 'evening',
): Promise<{ success: boolean; notificationId?: string; error?: string }> {
  try {
    const ctx: NotifContext = { period, streak: 0, daysMissed: 0, weeklyScore: 0, totalDays: 0, goals: [], seed: new Date().getDate() };
    const message = selectContextualNotification(ctx);
    const id = await scheduleDailyAt(NOTIF_IDS.DAILY, hour, minute, message);
    return { success: true, notificationId: id ?? undefined };
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) };
  }
}

/** @deprecated Use scheduleContextualDailyNotification instead. */
export async function scheduleDailyNotification(
  time: 'morning' | 'afternoon' | 'evening',
): Promise<void> {
  const defaults: Record<string, [number, number]> = {
    morning: [7, 0], afternoon: [12, 0], evening: [20, 0],
  };
  const [hour, minute] = defaults[time] ?? [7, 0];
  await scheduleNotificationAtTime(hour, minute, time);
}

/** @deprecated Kept for ComebackSystem backward compat. */
export async function scheduleComebackReminder(): Promise<void> {
  const message = { title: 'You can continue from here.', body: 'One reset today is enough.' };
  await scheduleOnceIn('comeback-reminder', 24 * 60 * 60, message);
}

/** @deprecated Use cancelInactivityNotifications instead. */
export async function cancelComebackReminder(): Promise<void> {
  await cancelInactivityNotifications();
}

// ─── Display helpers ──────────────────────────────────────────────────────────

const PT_PERIOD_LABELS: Record<string, string> = {
  morning:   'Manhã',
  afternoon: 'Tarde',
  evening:   'Noite',
};

const DE_PERIOD_LABELS: Record<string, string> = {
  morning:   'Morgens',
  afternoon: 'Nachmittags',
  evening:   'Abends',
};

export function formatNotifDisplay(period: string, exactTime: string | null, lang?: string): string {
  const isPt = lang === 'pt';
  const isDe = lang === 'de';
  const label = isPt
    ? (PT_PERIOD_LABELS[period.toLowerCase()] ?? period)
    : isDe
    ? (DE_PERIOD_LABELS[period.toLowerCase()] ?? period)
    : period.charAt(0).toUpperCase() + period.slice(1);
  if (!exactTime) return label;
  const parts = exactTime.split(':');
  const h = parseInt(parts[0] ?? '7', 10);
  const m = parseInt(parts[1] ?? '0', 10);
  const displayM = m.toString().padStart(2, '0');
  if (isPt || isDe) {
    return `${label} • ${h.toString().padStart(2, '0')}:${displayM}`;
  }
  const isPM = h >= 12;
  const displayH = h % 12 || 12;
  return `${label} • ${displayH}:${displayM} ${isPM ? 'PM' : 'AM'}`;
}

export function toExactTimeString(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function parseExactTime(timeStr: string): { hour: number; minute: number } {
  const parts = timeStr.split(':');
  return { hour: parseInt(parts[0] ?? '7', 10), minute: parseInt(parts[1] ?? '0', 10) };
}

// ─── ContentEngine-sourced daily notification ────────────────────────────────
import { getNotification } from './ContentEngine';
import type { Mood } from '../types/content';

export async function scheduleContentEngineDailyNotification(opts: {
  hour: number;
  minute: number;
  day: number;
  theme: string;
  mood?: Mood;
  wordEnabled?: boolean;
}): Promise<{ success: boolean }> {
  try {
    const mood = opts.mood ?? 1;
    const notif = await getNotification(opts.day, opts.theme, mood);
    const body = opts.wordEnabled ? notif.word_hook : notif.copy;
    await scheduleDailyAt(NOTIF_IDS.DAILY, opts.hour, opts.minute, {
      title: 'Daily Reset',
      body,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Re-exports for backward compat ──────────────────────────────────────────
export { selectContextualNotification, selectMilestoneNotification, selectWeeklyRecapNotification };
export type { NotifMessage, NotifContext };

export const futureSelfMessages = [] as NotifMessage[];
export const comebackNotificationMessages = [] as NotifMessage[];
export function getTodayFutureSelfNotification(): NotifMessage {
  return selectContextualNotification({ period: 'morning', streak: 0, daysMissed: 0, weeklyScore: 0, totalDays: 0, goals: [], seed: new Date().getDate() });
}

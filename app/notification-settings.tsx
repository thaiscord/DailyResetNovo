import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Alert, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getItem, setItem, StorageKeys } from '../hooks/useStorage';
import {
  scheduleAllNotifications,
  toExactTimeString,
  parseExactTime,
} from '../utils/notifications';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { useLanguage } from '../hooks/useLanguage';

type Period = 'morning' | 'afternoon' | 'evening';

const PERIODS: { id: Period; icon: string; defaultHour: number; defaultMinute: number }[] = [
  { id: 'morning',   icon: 'sunny-outline',        defaultHour: 7,  defaultMinute: 0 },
  { id: 'afternoon', icon: 'partly-sunny-outline', defaultHour: 12, defaultMinute: 0 },
  { id: 'evening',   icon: 'moon-outline',         defaultHour: 20, defaultMinute: 0 },
];

// ── Animated time button ───────────────────────────────────────────────────────
function TimeControl({
  display,
  onIncrement,
  onDecrement,
}: {
  display: string;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const scaleUp   = useRef(new Animated.Value(1)).current;
  const scaleDown = useRef(new Animated.Value(1)).current;

  const pressAnim = (anim: Animated.Value, fn: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.88, duration: 70, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, friction: 5, tension: 200, useNativeDriver: true }),
    ]).start();
    fn();
  };

  return (
    <View style={styles.timeCol}>
      <Animated.View style={{ transform: [{ scale: scaleUp }] }}>
        <TouchableOpacity
          style={styles.timeBtn}
          onPress={() => pressAnim(scaleUp, onIncrement)}
          activeOpacity={1}
        >
          <Ionicons name="chevron-up" size={18} color={Colors.charcoalLight} />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.timeValue}>{display}</Text>

      <Animated.View style={{ transform: [{ scale: scaleDown }] }}>
        <TouchableOpacity
          style={styles.timeBtn}
          onPress={() => pressAnim(scaleDown, onDecrement)}
          activeOpacity={1}
        >
          <Ionicons name="chevron-down" size={18} color={Colors.charcoalLight} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ── Day selector ──────────────────────────────────────────────────────────────
// Localized inside the component via t(); these are placeholders for typing only.

// ── Main screen ───────────────────────────────────────────────────────────────
export default function NotificationSettings() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const is24h = lang === 'pt';
  const DAY_FULL   = [0,1,2,3,4,5,6].map(i => t(`notif.day.${i}`));
  const DAY_LABELS = DAY_FULL.map(d => d.charAt(0));

  const [period, setPeriod]   = useState<Period>('morning');
  const [hour24, setHour24]   = useState(7);
  const [minute, setMinute]   = useState(0);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  // Extended settings (Prompt 5)
  const [eveningEnabled, setEveningEnabled]   = useState(false);
  const [eveningHour, setEveningHour]         = useState(21);
  const [eveningMinute, setEveningMinute]     = useState(0);
  const [wordEnabled, setWordEnabled]         = useState(true);
  const [milestoneEnabled, setMilestoneEnabled] = useState(true);
  const [quietDays, setQuietDays]             = useState<number[]>([]);

  const fadeAnim    = useRef(new Animated.Value(0)).current;
  const slideAnim   = useRef(new Animated.Value(16)).current;
  const tickAnim    = useRef(new Animated.Value(0)).current;
  const ampmScale   = useRef(new Animated.Value(1)).current;

  // Per-card scale animations for period selection microinteraction
  const periodScales = useRef(
    Object.fromEntries(PERIODS.map(p => [p.id, new Animated.Value(1)])) as Record<Period, Animated.Value>
  ).current;

  useEffect(() => {
    (async () => {
      const [p, t, eEn, eTime, wEn, mEn, qd] = await Promise.all([
        getItem<string>(StorageKeys.NOTIFICATION_TIME, 'morning'),
        getItem<string | null>(StorageKeys.NOTIFICATION_EXACT_TIME, null),
        getItem<boolean>(StorageKeys.NOTIF_EVENING_ENABLED, false),
        getItem<string | null>(StorageKeys.NOTIF_EVENING_EXACT_TIME, null),
        getItem<boolean>(StorageKeys.NOTIF_WORD_ENABLED, true),
        getItem<boolean>(StorageKeys.NOTIF_MILESTONE_ENABLED, true),
        getItem<number[]>(StorageKeys.NOTIF_QUIET_DAYS, []),
      ]);
      const safePeriod = (['morning', 'afternoon', 'evening'].includes(p) ? p : 'morning') as Period;
      setPeriod(safePeriod);
      if (t) {
        const { hour, minute: min } = parseExactTime(t);
        setHour24(hour);
        setMinute(min);
      } else {
        const def = PERIODS.find(p2 => p2.id === safePeriod);
        if (def) { setHour24(def.defaultHour); setMinute(def.defaultMinute); }
      }
      setEveningEnabled(eEn);
      if (eTime) {
        const { hour, minute: min } = parseExactTime(eTime);
        setEveningHour(hour); setEveningMinute(min);
      }
      setWordEnabled(wEn);
      setMilestoneEnabled(mEn);
      setQuietDays(qd);
    })();

    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePeriodSelect = useCallback((p: Period) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Scale bounce on selected card
    const anim = periodScales[p];
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, friction: 5, tension: 220, useNativeDriver: true }),
    ]).start();
    setPeriod(p);
    const def = PERIODS.find(item => item.id === p);
    if (def) { setHour24(def.defaultHour); setMinute(def.defaultMinute); }
  }, [periodScales]);

  const displayHour = is24h ? hour24 : (hour24 % 12 || 12);
  const isPM = hour24 >= 12;

  const incrementHour   = () => setHour24(h => (h + 1) % 24);
  const decrementHour   = () => setHour24(h => (h - 1 + 24) % 24);
  const incrementMinute = () => setMinute(m => (m + 5) % 60);
  const decrementMinute = () => setMinute(m => (m - 5 + 60) % 60);

  const toggleAMPM = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(ampmScale, { toValue: 0.93, duration: 70, useNativeDriver: true }),
      Animated.spring(ampmScale, { toValue: 1, friction: 5, tension: 200, useNativeDriver: true }),
    ]).start();
    setHour24(h => (h + 12) % 24);
  };

  const handleSave = async () => {
    setSaving(true);
    const exactTime = toExactTimeString(hour24, minute);
    const eveningExact = toExactTimeString(eveningHour, eveningMinute);

    try {
      await Promise.all([
        setItem(StorageKeys.NOTIFICATION_TIME, period),
        setItem(StorageKeys.NOTIFICATION_EXACT_TIME, exactTime),
        setItem(StorageKeys.NOTIF_EVENING_ENABLED, eveningEnabled),
        setItem(StorageKeys.NOTIF_EVENING_EXACT_TIME, eveningExact),
        setItem(StorageKeys.NOTIF_WORD_ENABLED, wordEnabled),
        setItem(StorageKeys.NOTIF_MILESTONE_ENABLED, milestoneEnabled),
        setItem(StorageKeys.NOTIF_QUIET_DAYS, quietDays),
      ]);
    } catch (err: any) {
      console.error('[DR] Failed to save notification preferences:', err?.message ?? err);
      setSaving(false);
      Alert.alert('Error', 'Could not save settings. Please try again.');
      return;
    }

    console.log('[notif] settings save → evening:', eveningEnabled, '| word:', wordEnabled, '| milestone:', milestoneEnabled);
    console.log('[notif] settings save → ritual time:', `${hour24}:${minute.toString().padStart(2, '0')}`, '| evening time:', `${eveningHour}:${eveningMinute.toString().padStart(2, '0')}`);

    // Load progress context to build full notification context
    const [currentDay, streak, lastMoodRaw, completedByDate] = await Promise.all([
      getItem<number>(StorageKeys.CURRENT_DAY, 1),
      getItem<number>(StorageKeys.STREAK, 0),
      getItem<number | null>(StorageKeys.DAILY_MOOD, null),
      getItem<Record<string, boolean>>(StorageKeys.COMPLETED_BY_DATE, {}),
    ]);

    const todayKey = new Date().toISOString().split('T')[0]!;
    const ritualDoneToday = (completedByDate as Record<string, boolean>)[todayKey] ?? false;

    // scheduleAllNotifications handles permission check + cancel + reschedule atomically
    await scheduleAllNotifications({
      ritualHour: hour24,
      ritualMinute: minute,
      ritualPeriod: period,
      streak: streak ?? 0,
      daysMissed: 0,
      totalDays: currentDay ?? 1,
      currentDay: currentDay ?? 1,
      lastMood: (lastMoodRaw as 0 | 1 | 2 | null) ?? null,
      eveningEnabled,
      eveningHour,
      eveningMinute,
      wordEnabled,
      milestoneEnabled,
      quietDays,
      ritualDoneToday,
      seed: new Date().getDate(),
    });

    setSaving(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSaved(true);
    Animated.sequence([
      Animated.timing(tickAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.timing(tickAnim, { toValue: 0, duration: 180, delay: 1600, useNativeDriver: true }),
    ]).start(() => { setSaved(false); router.back(); });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.65}>
          <Ionicons name="chevron-back" size={20} color={Colors.charcoal} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerEyebrow}>{t('notif.settings.eyebrow')}</Text>
          <Text style={styles.headerTitle}>{t('notif.settings.title')}</Text>
        </View>
        <View style={styles.backBtn} />
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <Text style={styles.subtitle}>{t('notif.settings.sub')}</Text>

        {/* Period Selector */}
        <Text style={styles.sectionLabel}>{t('notif.period.label')}</Text>
        <View style={styles.periodList}>
          {PERIODS.map(opt => {
            const sel = period === opt.id;
            return (
              <Animated.View key={opt.id} style={{ transform: [{ scale: periodScales[opt.id] }] }}>
                <TouchableOpacity
                  style={[styles.periodOption, sel && styles.periodOptionSelected]}
                  onPress={() => handlePeriodSelect(opt.id)}
                  activeOpacity={1}
                >
                  <View style={[styles.periodIconWrap, sel && styles.periodIconWrapSelected]}>
                    <Ionicons
                      name={opt.icon as any}
                      size={20}
                      color={sel ? Colors.charcoal : '#8A8A8A'}
                    />
                  </View>
                  <View style={styles.periodTextWrap}>
                    <Text style={[styles.periodLabel, sel && styles.periodLabelSelected]}>
                      {t(`notif.period.${opt.id}.label`)}
                    </Text>
                    <Text style={styles.periodSub}>{t(`notif.period.${opt.id}.sub`)}</Text>
                  </View>
                  {/* Refined radio button */}
                  <View style={[styles.radio, sel && styles.radioSelected]}>
                    {sel && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Time Picker */}
        <Text style={styles.sectionLabel}>{t('notif.hour.label')}</Text>
        <View style={styles.timeCard}>
          <TimeControl
            display={displayHour.toString().padStart(2, '0')}
            onIncrement={incrementHour}
            onDecrement={decrementHour}
          />

          <Text style={styles.timeSeparator}>:</Text>

          <TimeControl
            display={minute.toString().padStart(2, '0')}
            onIncrement={incrementMinute}
            onDecrement={decrementMinute}
          />

          {/* AMPM Toggle — hidden in 24h mode */}
          {!is24h && (
            <Animated.View style={{ transform: [{ scale: ampmScale }] }}>
              <TouchableOpacity style={styles.ampmBtn} onPress={toggleAMPM} activeOpacity={1}>
                <Text style={[styles.ampmText, !isPM && styles.ampmActive]}>AM</Text>
                <View style={styles.ampmDivider} />
                <Text style={[styles.ampmText, isPM && styles.ampmActive]}>PM</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Preview */}
        <View style={styles.previewRow}>
          <Ionicons name="notifications-outline" size={13} color={Colors.gold} />
          <Text style={styles.previewText}>
            {t('notif.preview.text')}{' '}
            <Text style={styles.previewBold}>
              {displayHour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}{is24h ? '' : ` ${isPM ? 'PM' : 'AM'}`}
            </Text>
          </Text>
        </View>

        {/* ── Evening Anchor ──────────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>{t('notif.evening.sectionLabel')}</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Ionicons name="moon-outline" size={16} color={Colors.textSecondary} />
            <View>
              <Text style={styles.toggleLabel}>{t('notif.evening.toggleLabel')}</Text>
              <Text style={styles.toggleSub}>{t('notif.evening.toggleSub')}</Text>
            </View>
          </View>
          <Switch
            value={eveningEnabled}
            onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setEveningEnabled(v); }}
            trackColor={{ false: Colors.border, true: Colors.accent }}
            thumbColor={Colors.white}
          />
        </View>

        {eveningEnabled && (
          <View style={[styles.timeCard, { marginBottom: Spacing.xl }]}>
            <TimeControl
              display={(is24h ? eveningHour : (eveningHour % 12 || 12)).toString().padStart(2, '0')}
              onIncrement={() => setEveningHour(h => (h + 1) % 24)}
              onDecrement={() => setEveningHour(h => (h - 1 + 24) % 24)}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TimeControl
              display={eveningMinute.toString().padStart(2, '0')}
              onIncrement={() => setEveningMinute(m => (m + 5) % 60)}
              onDecrement={() => setEveningMinute(m => (m - 5 + 60) % 60)}
            />
            {!is24h && (
              <TouchableOpacity
                style={styles.ampmBtn}
                onPress={() => setEveningHour(h => (h + 12) % 24)}
                activeOpacity={1}
              >
                <Text style={[styles.ampmText, eveningHour < 12 && styles.ampmActive]}>AM</Text>
                <View style={styles.ampmDivider} />
                <Text style={[styles.ampmText, eveningHour >= 12 && styles.ampmActive]}>PM</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* ── Word of the Day ─────────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>{t('notif.word.sectionLabel')}</Text>
        <View style={[styles.toggleRow, { marginBottom: Spacing.xl }]}>
          <View style={styles.toggleLeft}>
            <Ionicons name="text-outline" size={16} color={Colors.textSecondary} />
            <View>
              <Text style={styles.toggleLabel}>{t('notif.word.toggleLabel')}</Text>
              <Text style={styles.toggleSub}>{t('notif.word.toggleSub')}</Text>
            </View>
          </View>
          <Switch
            value={wordEnabled}
            onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setWordEnabled(v); }}
            trackColor={{ false: Colors.border, true: Colors.accent }}
            thumbColor={Colors.white}
          />
        </View>

        {/* ── Milestone moments ───────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>{t('notif.milestone.sectionLabel')}</Text>
        <View style={[styles.toggleRow, { marginBottom: Spacing.xl }]}>
          <View style={styles.toggleLeft}>
            <Ionicons name="star-outline" size={16} color={Colors.textSecondary} />
            <View>
              <Text style={styles.toggleLabel}>{t('notif.milestone.toggleLabel')}</Text>
              <Text style={styles.toggleSub}>{t('notif.milestone.toggleSub')}</Text>
            </View>
          </View>
          <Switch
            value={milestoneEnabled}
            onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setMilestoneEnabled(v); }}
            trackColor={{ false: Colors.border, true: Colors.accent }}
            thumbColor={Colors.white}
          />
        </View>

        {/* ── Quiet days ──────────────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>{t('notif.quiet.sectionLabel')}</Text>
        <Text style={styles.quietSub}>{t('notif.quiet.sub')}</Text>
        <View style={[styles.quietDaysRow, { marginBottom: Spacing.xl }]}>
          {DAY_LABELS.map((label, index) => {
            const active = quietDays.includes(index);
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayBtn, active && styles.dayBtnActive]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setQuietDays(prev =>
                    prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index]
                  );
                }}
                activeOpacity={0.75}
              >
                <Text style={[styles.dayBtnText, active && styles.dayBtnTextActive]}>
                  {label}
                </Text>
                <Text style={[styles.dayFullText, active && styles.dayFullTextActive]}>
                  {DAY_FULL[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Promise ─────────────────────────────────────────────────────────── */}
        <View style={styles.promiseCard}>
          <Ionicons name="shield-checkmark-outline" size={14} color={Colors.gold} />
          <Text style={styles.promiseText}>{t('notif.promise.text')}</Text>
        </View>

      </Animated.ScrollView>

      {/* Footer / CTA */}
      <View style={styles.footer}>
        {saved ? (
          <Animated.View style={[styles.savedBanner, { opacity: tickAnim }]}>
            <Ionicons name="checkmark-circle" size={17} color={Colors.success} />
            <Text style={styles.savedText}>{t('notif.saved')}</Text>
          </Animated.View>
        ) : (
          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.86}
          >
            <View style={styles.saveBtnInner}>
              <Ionicons name="notifications" size={17} color={Colors.white} />
              <Text style={styles.saveBtnText}>
                {saving ? t('notif.saving') : t('notif.save')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 130 },

  // ── Header ────────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 58,
    paddingBottom: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(28,28,28,0.10)',
  },
  backBtn: {
    width: 34, height: 34,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: Colors.backgroundSecondary,
  },
  headerCenter: { alignItems: 'center' },
  headerEyebrow: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 2,
  },
  headerTitle: {
    fontSize: Typography.sizes.base, fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary, marginTop: 2, letterSpacing: -0.2,
  },

  subtitle: {
    fontSize: Typography.sizes.sm,
    color: '#6B6B6B',
    lineHeight: 22,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    letterSpacing: 0.1,
  },

  // ── Section label ──────────────────────────────────────────────────────────────
  sectionLabel: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 2, marginBottom: Spacing.md,
  },

  // ── Period cards ───────────────────────────────────────────────────────────────
  periodList: { gap: 10, marginBottom: Spacing.xl },
  periodOption: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(28,28,28,0.07)',
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  periodOptionSelected: {
    borderColor: Colors.accent,
    borderWidth: 1.5,
    backgroundColor: Colors.accentDim,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  periodIconWrap: {
    width: 44, height: 44,
    borderRadius: Radii.lg,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center',
  },
  periodIconWrapSelected: { backgroundColor: Colors.accent },
  periodTextWrap: { flex: 1 },
  periodLabel: {
    fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold,
    color: '#8A8A8A', marginBottom: 2,
  },
  periodLabelSelected: { color: Colors.textPrimary },
  periodSub: { fontSize: Typography.sizes.xs, color: '#8A8A8A', lineHeight: 16 },

  // Refined radio — Apple-like minimal
  radio: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1.5, borderColor: 'rgba(28,28,28,0.18)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  radioSelected: { borderColor: Colors.charcoal, borderWidth: 1.5 },
  radioDot: {
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: Colors.charcoal,
  },

  // ── Time picker ────────────────────────────────────────────────────────────────
  timeCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.xxl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.08)',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 8,
  },
  timeCol: { alignItems: 'center', gap: Spacing.sm },
  timeBtn: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.07)',
  },
  // Reduced from 48 → 36 for elegant balance
  timeValue: {
    fontSize: 36,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -1,
    lineHeight: 44,
    minWidth: 54,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 28,
    fontWeight: Typography.weights.black,
    color: '#CACACA',
    marginBottom: Spacing.sm,
    lineHeight: 36,
  },
  ampmBtn: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: 6,
    alignItems: 'center',
    marginLeft: Spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.10)',
    minWidth: 46,
  },
  ampmDivider: { height: StyleSheet.hairlineWidth, width: '85%', backgroundColor: 'rgba(28,28,28,0.12)' },
  ampmText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: '#A0A0A0',
    letterSpacing: 0.5,
  },
  ampmActive: { color: Colors.charcoal, fontWeight: Typography.weights.heavy },

  // ── Preview row ────────────────────────────────────────────────────────────────
  previewRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.06)',
  },
  previewText: {
    flex: 1,
    fontSize: Typography.sizes.xs,
    color: '#7A7A7A',
    lineHeight: 18,
  },
  previewBold: { color: Colors.textPrimary, fontWeight: Typography.weights.semibold },

  // ── Footer ─────────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 50,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(28,28,28,0.08)',
  },
  saveBtn: {
    borderRadius: Radii.full,
    backgroundColor: Colors.charcoal,
    // Refined premium shadow — subtle golden warmth
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  saveBtnDisabled: { opacity: 0.55 },
  saveBtnInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 17,
    gap: Spacing.sm,
  },
  saveBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  savedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, paddingVertical: 17,
    backgroundColor: Colors.card,
    borderRadius: Radii.full,
    borderWidth: 1, borderColor: Colors.success,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  savedText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.success,
  },

  // ── Toggle rows (evening, word, milestone) ─────────────────────────────────
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.08)',
    ...Shadows.card,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  toggleLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  toggleSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },

  // ── Quiet days ────────────────────────────────────────────────────────────
  quietSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
    marginTop: -Spacing.sm,
  },
  quietDaysRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  dayBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radii.md,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 2,
  },
  dayBtnActive: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accent,
  },
  dayBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
  },
  dayBtnTextActive: {
    color: Colors.charcoal,
  },
  dayFullText: {
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  dayFullTextActive: {
    color: Colors.charcoal,
  },

  // ── Promise card ──────────────────────────────────────────────────────────
  promiseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(239,201,76,0.25)',
  },
  promiseText: {
    flex: 1,
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

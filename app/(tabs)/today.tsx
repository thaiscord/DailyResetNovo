import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing, AppState, AppStateStatus, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getDayContent, type Ritual } from '../../data';
import { useProgress } from '../../hooks/useProgress';
import { useHabits } from '../../hooks/useHabits';
import { useWeeklyRecap } from '../../hooks/useWeeklyRecap';
import { getItem, setItem, StorageKeys, getLocalDateKey } from '../../hooks/useStorage';
import { saveDailyEntry, getDailyEntry, type DailyEntry } from '../../utils/dailyEntries';
import { DAILY_STATE_OPTIONS, getDailyStateBanner, getAdaptiveWord, getAdaptiveDepth, getStateCategory, type DailyState } from '../../utils/dailyState';
import { getCurrentChapterName, CEREMONY_MILESTONES } from '../../utils/milestoneSystem';
import { getActionPlaceholder } from '../../utils/writingPlaceholders';
import { Colors, Typography, Spacing, Radii, Shadows } from '../../theme';
import {
  getStreakPhrase,
  getCompletionMessage,
  getIdentityLabel,
  getStreakBadgeLabel,
  getTomorrowAnticipateCopy,
  getDynamicHeadline,
  getPreCompletionBanner,
  getEmotionalState,
  getCategoryTheme,
  type DailyCategory,
  type EmotionalState,
} from '../../utils/streakCopy';

import { didReturnAfterAbsence, getContinuityPhrase } from '../../utils/progressionEngine';
import { getAppNow } from '../../utils/appDate';
import ComebackCard from '../../components/ComebackCard';
import { useContentMemory } from '../../hooks/useContentMemory';
import { getReflectionWithId } from '../../utils/contentSystem';
import { getInsightForContext, shouldShowCompletionInsight } from '../../utils/socialProof';
import { detectComebackState } from '../../utils/comebackSystem';
import {
  cancelInactivityNotifications,
  scheduleInactivityNotifications,
  cancelGapNudges,
  scheduleGapNudges,
  scheduleMilestoneDeliveryNotification,
} from '../../utils/notifications';
import { track } from '../../utils/analytics';
import { getDayWord } from '../../utils/homeGreeting';
import { useMoodHistory } from '../../hooks/useMoodHistory';
import { MoodBadge } from '../../components/ui/MoodBadge';
import { maybeRequestReviewAfterComeback } from '../../utils/reviewRequest';
import { useNotificationScheduler } from '../../hooks/useNotificationScheduler';
import { useEmotionalProfile } from '../../hooks/useEmotionalProfile';
import { getProfileBanner, getHeavyMoodAdaptiveBanner } from '../../utils/emotionalProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { useRitualIntention } from '../../hooks/useRitualIntention';
import { getIntentionBanner } from '../../utils/ritualIntention';
import { useMilestones } from '../../hooks/useMilestones';
import {
  hapticLight,
  hapticSuccess,
  hapticMilestone,
  bounceAnim,
  createIdlePulse,
  createBreatheAnim,
  createRitualGlowPulse,
  accordionOpen,
  accordionClose,
  fadeSlideIn,
} from '../../utils/animations';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SUBHEADLINE_KEYS = [
  'today.subheadline.0',
  'today.subheadline.1',
  'today.subheadline.2',
  'today.subheadline.3',
  'today.subheadline.4',
  'today.subheadline.5',
  'today.subheadline.6',
];

const CHECKLIST_KEYS = [
  { id: 'morning',        tKey: 'today.checklist.morning',        icon: 'sunny-outline' },
  { id: 'action',         tKey: 'today.checklist.action',         icon: 'flash-outline' },
  { id: 'deepwork',       tKey: 'today.checklist.deepwork',       icon: 'laptop-outline' },
  { id: 'nodistractions', tKey: 'today.checklist.nodistractions', icon: 'notifications-off-outline' },
  { id: 'evening',        tKey: 'today.checklist.evening',        icon: 'moon-outline' },
];

export default function TodayScreen() {
  const router = useRouter();
  const { progress, completeDay, weeklyScore, loading, reload, comebackCount } = useProgress();
  const { hasSeen } = useMilestones();
  const { recentIds, markAsSeen } = useContentMemory();

  // Auto-reschedules the daily notification with fresh contextual copy on focus
  useNotificationScheduler(progress, weeklyScore);

  const { profile } = useEmotionalProfile();
  const { intention, reload: reloadIntention } = useRitualIntention();
  const moodHistory = useMoodHistory(7);
  const { t, lang } = useLanguage();

  // Reflection prompt for today — picked once, avoids recently seen
  const todayReflection = getReflectionWithId(
    { streak: progress.streak, totalDays: progress.completedDays.length, seed: progress.currentDay },
    recentIds,
  );

  // Community insight — shown every 3 completions (seed-based, not random)
  const showCompletionInsight = shouldShowCompletionInsight(progress.currentDay);
  const completionInsight = showCompletionInsight
    ? getInsightForContext('completion', progress.currentDay, lang)
    : null;
  // Daily Checklist — persiste via useHabits (mesma fonte de verdade da tela Habits)
  const { todayCompleted: checkItems, toggleHabit: persistToggle, habitLog, habits } = useHabits();
  // Weekly recap auto-trigger
  const { shouldShowRecap, loading: recapLoading } = useWeeklyRecap(progress, weeklyScore, habitLog, habits.length);
  const recapNavigatedRef = useRef(false);
  // todayKey é REATIVO — atualiza quando o dia vira (AppState ou foco)
  const [todayKey, setTodayKey] = useState(() => getLocalDateKey());
  // ÚNICA fonte de verdade: completedByDate[todayKey] do storage
  // NÃO usa nenhum boolean local — elimina contaminação de sessão anterior
  const isCompletedToday = !loading && !!progress.completedByDate?.[todayKey];
  const completed = isCompletedToday;

  // ── Hydration gate ────────────────────────────────────────────────────────────
  // Prevents the pre-reset UI from flashing on app open before AsyncStorage loads.
  // The ref ensures we only gate the very first load; tab-switches are unaffected
  // because useProgress.load() never resets `loading` to true after the first call.
  const hydratedRef = useRef(false);
  const [isTodayHydrated, setIsTodayHydrated] = useState(false);

  useEffect(() => {
    if (!loading && !hydratedRef.current) {
      hydratedRef.current = true;
      setIsTodayHydrated(true);
    }
  }, [loading]);
  // justCompleted: APENAS para saber se animamos o card (não controla renderização)
  const [justCompleted, setJustCompleted] = useState(false);
  const [_timerMode, _setTimerMode] = useState<'focus' | 'detox' | null>(null);
  const [_userName, setUserName] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<'hard' | 'okay' | 'good' | null>(null);
  const [wordExpanded, setWordExpanded] = useState(false);
  const [yesterdayEntry, setYesterdayEntry] = useState<DailyEntry | null>(null);
  const [dailyState, setDailyState] = useState<DailyState>(null);
  const scaleAnim        = useRef(new Animated.Value(1)).current;
  const completedAnim    = useRef(new Animated.Value(0)).current;
  const pulseAnim        = useRef(new Animated.Value(1)).current;
  const breatheAnim      = useRef(new Animated.Value(1)).current;
  const btnSlideAnim     = useRef(new Animated.Value(100)).current;
  const btnOpacity       = useRef(new Animated.Value(0)).current;
  const _glowAnim        = useRef(new Animated.Value(0)).current;
  const pulseLoop        = useRef<Animated.CompositeAnimation | null>(null);
  const breatheLoop      = useRef<Animated.CompositeAnimation | null>(null);
  const lastTrackedDayRef = useRef('');
  const ritualGlowAnim      = useRef(new Animated.Value(0)).current;
  const ritualPressAnim     = useRef(new Animated.Value(1)).current;
  const ritualGlowLoop      = useRef<Animated.CompositeAnimation | null>(null);
  const wordExpandAnim      = useRef(new Animated.Value(0)).current;
  const completionOverlay   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getItem<string>(StorageKeys.USER_NAME, '').then(name => setUserName(name ?? ''));
    // Load today's entry (mood + responses)
    getDailyEntry(getLocalDateKey()).then(entry => {
      if (entry?.mood) setSelectedMood(entry.mood);
    });
    // Load yesterday's entry for emotional continuity card
    const yesterday = getAppNow();
    yesterday.setDate(yesterday.getDate() - 1);
    getDailyEntry(getLocalDateKey(yesterday)).then(entry => {
      if (entry && (entry.action_response || entry.reflection_response)) {
        setYesterdayEntry(entry);
      }
    });
    // Load today's daily state selection
    getItem<DailyState>(StorageKeys.DAILY_STATE + '_' + getLocalDateKey(), null).then(state => {
      if (state) setDailyState(state);
    });
  }, []);

  useEffect(() => {
    Animated.timing(wordExpandAnim, {
      toValue: wordExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordExpanded]);

  // Auto-navigate to weekly recap when Sunday evening / Monday trigger fires
  useEffect(() => {
    if (shouldShowRecap && !loading && !recapLoading && !recapNavigatedRef.current) {
      recapNavigatedRef.current = true;
      const timer = setTimeout(() => router.push('/weekly-recap'), 1400);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowRecap, loading, recapLoading]);


  // Recarrega progresso ao focar na aba Today
  useFocusEffect(useCallback(() => {
    const key = getLocalDateKey();
    setTodayKey(key);
    reload();
    reloadIntention();
    if (lastTrackedDayRef.current !== key) {
      lastTrackedDayRef.current = key;
      track('daily_reset_viewed', { day: progress.currentDay });
    }
  }, [reload, reloadIntention, progress.currentDay]));


  // Recarrega e atualiza todayKey ao voltar do background
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        const key = getLocalDateKey();
        setTodayKey(key);
        reload();
        reloadIntention();
      }
    };
    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Se carregou como já-completado (sessão anterior), mostra card sem animação
  useEffect(() => {
    if (isCompletedToday && !justCompleted) {
      completedAnim.setValue(1);
    }
    // Se dia virou (isCompletedToday = false), resetar anim para próxima conclusão
    if (!isCompletedToday) {
      completedAnim.setValue(0);
      setJustCompleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompletedToday]);

  const dayData        = getDayContent(progress.currentDay) ?? getDayContent(1)!;
  const tomorrowData   = getDayContent(progress.currentDay + 1) ?? null;
  const canAccess      = true;
  const emotionalState = getEmotionalState(progress.streak, progress.completedDays, weeklyScore);
  const _returnedAfterAbsence = didReturnAfterAbsence(progress.completedDays, progress.currentDay);
  const comeback = detectComebackState(progress.completedByDate, progress.completedDays.length);

  // Retention routing: return experience → mantra selection → identity question
  // Must be declared AFTER comeback so the closure captures it correctly.
  useEffect(() => {
    if (loading) return;
    const _daysMissed = comeback.daysMissed;
    const streak = progress.streak;
    async function checkRetentionRouting() {
      const _todayStr = getLocalDateKey();
      // System 7: mantra selection after Day 3
      if (streak >= 3) {
        const shown = await getItem<boolean>(StorageKeys.MANTRA_SHOWN, false);
        if (!shown) { router.push('/mantra-selection'); return; }
      }
      // System 7: identity question after Day 7
      if (streak >= 7) {
        const asked = await getItem<boolean>(StorageKeys.IDENTITY_ASKED, false);
        if (!asked) { router.push('/identity-question'); return; }
      }
    }
    checkRetentionRouting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, comeback.daysMissed, progress.streak]);

  // Banner priority: comeback → daily state → heavy mood → intention (ritual) → profile → generic
  const dailyStateBanner = getDailyStateBanner(dailyState);
  const heavyMoodBanner = getHeavyMoodAdaptiveBanner(moodHistory.heavyDayCount, progress.currentDay);
  const _preCompletionBanner = comeback.isComeback
    ? null
    : dailyStateBanner
    ? dailyStateBanner
    : heavyMoodBanner
    ? heavyMoodBanner
    : intention
    ? getIntentionBanner(intention, progress.currentDay, lang)
    : profile
    ? getProfileBanner(profile, progress.currentDay)
    : getPreCompletionBanner(emotionalState, progress.streak, weeklyScore);

  const STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];

  // Track streak milestones for analytics
  const prevStreakRef = useRef(progress.streak);
  useEffect(() => {
    const prev = prevStreakRef.current;
    const curr = progress.streak;
    prevStreakRef.current = curr;
    if (curr > prev && [3, 7, 14, 30].includes(curr)) {
      track('streak_milestone_reached', { milestone: curr });
    }
  }, [progress.streak]);

  // Entrada do botão ao montar e ao mudar de dia (slide-up + fade-in)
  // todayKey na dependência garante re-entrada quando o dia avança (dev ou real)
  useEffect(() => {
    if (canAccess && !completed) {
      // Resetar posição antes de animar — evita botão invisível após avanço de dia
      btnSlideAnim.setValue(100);
      btnOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(btnSlideAnim, {
          toValue: 0, duration: 500, delay: 350,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          useNativeDriver: true,
        }),
        Animated.timing(btnOpacity, {
          toValue: 1, duration: 400, delay: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAccess, todayKey]);

  // Idle pulse + breathe no botão enquanto não completado
  useEffect(() => {
    if (!completed && canAccess) {
      pulseLoop.current = createIdlePulse(pulseAnim);
      pulseLoop.current.start();
      breatheLoop.current = createBreatheAnim(breatheAnim);
      breatheLoop.current.start();
    } else {
      pulseLoop.current?.stop();
      breatheLoop.current?.stop();
      pulseAnim.setValue(1);
      breatheAnim.setValue(1);
    }
    return () => {
      pulseLoop.current?.stop();
      breatheLoop.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, canAccess]);

  // Ritual card slow breathing glow — always active (card is always visible)
  useEffect(() => {
    ritualGlowLoop.current = createRitualGlowPulse(ritualGlowAnim);
    ritualGlowLoop.current.start();
    return () => ritualGlowLoop.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MILESTONES     = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];
  const nextMilestone  = MILESTONES.find(m => m > progress.streak) ?? null;
  const daysToNext     = nextMilestone ? nextMilestone - progress.streak : null;

  const checklist = CHECKLIST_KEYS.map(c => ({ ...c, label: t(c.tKey) }));

  // Per-item animation refs for checklist
  const checkAnims = useRef<Record<string, Animated.Value>>(
    Object.fromEntries(CHECKLIST_KEYS.map(c => [c.id, new Animated.Value(1)]))
  ).current;


  const _toggleCheck = (id: string) => {
    hapticLight();
    const anim = checkAnims[id];
    if (anim) bounceAnim(anim).start();
    // Persiste no AsyncStorage via useHabits (mesma chave usada pela tela Habits)
    persistToggle(id);
  };

  const handleComplete = async () => {
    // Stop idle animations immediately
    pulseLoop.current?.stop();
    breatheLoop.current?.stop();
    pulseAnim.setValue(1);
    breatheAnim.setValue(1);

    // Haptic: milestone = double pulse, normal = single success
    const nextStreak = progress.streak + 1;
    const isMilestone = STREAK_MILESTONES.includes(nextStreak);
    if (isMilestone) {
      hapticMilestone();
    } else {
      hapticSuccess();
    }

    // Press feedback on button
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    // IMMEDIATELY start dark overlay — covers Today before any state re-render
    // Duration 500ms: fully opaque well before completeDay resolves (~150ms)
    Animated.timing(completionOverlay, {
      toValue: 1, duration: 500,
      easing: Easing.in(Easing.cubic), useNativeDriver: true,
    }).start();

    // Slide button out downward
    Animated.parallel([
      Animated.timing(btnSlideAnim, {
        toValue: 100, duration: 280,
        easing: (t: number) => t * t,
        useNativeDriver: true,
      }),
      Animated.timing(btnOpacity, {
        toValue: 0, duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const result = await completeDay(progress.currentDay);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    saveDailyEntry({
      date: getLocalDateKey(),
      day: progress.currentDay,
      completed: true,
      category: dayData.theme,
      resetTitle: dayData.title,
      actionPrompt: dayData.today_action?.content,
      reflectionPrompt: dayData.reflection?.content,
      whyItMatters: dayData.why_it_matters?.content,
    });
    track('daily_reset_completed', { day: progress.currentDay, streak: result.newStreak ?? progress.streak });
    setJustCompleted(true);

    // Mark today's reflection as seen so it won't repeat soon
    markAsSeen(todayReflection.id);

    // Cancel any pending inactivity/gap notifications — user just showed up
    cancelInactivityNotifications();
    cancelGapNudges();

    // Schedule new inactivity notifications in case user doesn't come back tomorrow
    scheduleInactivityNotifications({
      streak: result.newStreak ?? progress.streak,
      totalDays: progress.completedDays.length + 1,
      goals: [],
      seed: progress.currentDay,
    });

    // Schedule gap nudges for if the user goes quiet after today
    scheduleGapNudges(
      7, 0,  // default 7:00 AM open time
      progress.currentDay,
    );

    // Milestone delivery notification (next morning) if this streak is a milestone
    const newStreak = result.newStreak ?? progress.streak;
    const milestoneEnabled = await getItem<boolean>(StorageKeys.NOTIF_MILESTONE_ENABLED, true);
    if (milestoneEnabled && [3, 7, 14, 21, 30, 60, 90, 100].includes(newStreak)) {
      scheduleMilestoneDeliveryNotification(newStreak);
    }

    // Review request after comeback continuation (streak 3+ after returning)
    if (result.isComebackCompletion === false && result.newStreak && result.newStreak >= 3 && comeback.isComeback) {
      maybeRequestReviewAfterComeback(result.newStreak, progress.completedDays.length);
    }

    // Determine milestone
    const milestoneForCeremony =
      result.newStreak &&
      (CEREMONY_MILESTONES as readonly number[]).includes(result.newStreak) &&
      !hasSeen(result.newStreak)
        ? result.newStreak
        : 0;

    // Navigate once overlay is fully opaque — no Today flash, no completed card visible
    // completedAnim stays at 0; when user returns, setValue(1) shows card instantly
    setTimeout(() => {
      router.push(
        `/completion-ceremony?streak=${result.newStreak ?? 0}&day=${progress.currentDay}&isFirst=${!!(result.isFirstCompletion && progress.completedDays.length === 0)}&milestone=${milestoneForCeremony}`
      );
    }, 550);
  };

  // Hydration guard: show blank background until storage is loaded.
  // Prevents the pre-reset UI from flashing when the app opens and the user
  // has already completed today's reset.
  if (!isTodayHydrated) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.ambientTop} />
      <View pointerEvents="none" style={styles.ambientBottom} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        decelerationRate="normal"
        scrollEventThrottle={16}
      >

        {/* Header emocional */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>
              {completed ? t('today.greeting.done') : (() => {
                const h = new Date().getHours();
                if (h < 12) return t('today.greeting.morning');
                if (h < 18) return t('today.greeting.afternoon');
                return t('today.greeting.evening');
              })()}
            </Text>

            {/* Headline + streak badge */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={[styles.title, { flex: 1 }]}>
                {getDynamicHeadline(emotionalState, progress.currentDay)}
              </Text>
              {progress.streak > 0 && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FAF7F2',
                  borderRadius: 20,
                  paddingHorizontal: 11,
                  paddingVertical: 7,
                  marginLeft: 12,
                  marginTop: 2,
                  borderWidth: 1,
                  borderColor: 'rgba(201,167,76,0.25)',
                  gap: 5,
                }}>
                  <Ionicons name="flame" size={11} color="#C9973A" />
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#3D3530' }}>
                    {progress.streak}
                  </Text>
                  <Text style={{ fontSize: 8, color: '#A09080', letterSpacing: 1, fontWeight: '600' }}>
                    {getStreakBadgeLabel(progress.streak).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.subtitle}>
              {t(SUBHEADLINE_KEYS[progress.currentDay % SUBHEADLINE_KEYS.length])}
            </Text>

            {/* Mood check-in */}
            <Text style={{ fontSize: 11, color: Colors.textMuted, letterSpacing: 0.8, marginTop: 2, marginBottom: 6, fontStyle: 'italic' }}>
              {t('today.mood.label')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 0, marginBottom: 2 }}>
              {(['hard', 'okay', 'good'] as const).map((key) => (
                <MoodBadge
                  key={key}
                  mood={key}
                  selected={selectedMood === key}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedMood(key);
                    setItem(`mood_checkin_${getLocalDateKey()}`, key);
                    setItem(`${StorageKeys.DAILY_MOOD}_${getLocalDateKey()}`, ['hard','okay','good'].indexOf(key));
                    saveDailyEntry({ date: getLocalDateKey(), mood: key });
                    track('mood_checkin', { mood: key, day: progress.currentDay });
                  }}
                />
              ))}
            </View>

            {/* Daily emotional state picker — always visible, even after reset completion */}
            <View style={{ marginTop: 6 }}>
                <Text style={{ fontSize: 11, color: Colors.textMuted, letterSpacing: 0.8, marginBottom: 6, fontStyle: 'italic' }}>
                  {lang === 'pt' ? 'Como está sua mente hoje?' : lang === 'es' ? '¿Cómo está tu mente hoy?' : lang === 'fr' ? 'Comment va ton esprit aujourd\'hui ?' : lang === 'de' ? 'Wie fühlt sich dein Kopf gerade an?' : 'How does your mind feel?'}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {DAILY_STATE_OPTIONS.map(opt => {
                    const sel = dailyState === opt.key;
                    return (
                      <TouchableOpacity
                        key={opt.key}
                        onPress={() => {
                          const next = dailyState === opt.key ? null : opt.key as DailyState;
                          setDailyState(next);
                          setItem(StorageKeys.DAILY_STATE + '_' + getLocalDateKey(), next);
                          track('daily_state_selected', { state: next, day: progress.currentDay });
                        }}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderRadius: 20,
                          backgroundColor: sel ? '#F5EDD8' : Colors.backgroundSecondary,
                          borderWidth: 1,
                          borderColor: sel ? Colors.gold : 'rgba(180,168,154,0.22)',
                        }}
                      >
                        <Ionicons name={opt.icon as any} size={11} color={sel ? Colors.gold : Colors.textMuted} />
                        <Text style={{
                          fontSize: 11,
                          color: sel ? Colors.gold : Colors.textMuted,
                          fontWeight: sel ? '600' : '400',
                        }}>
                          {lang === 'pt' ? opt.labelPt : lang === 'es' ? opt.labelEs : lang === 'fr' ? (opt.labelFr ?? opt.label) : lang === 'de' ? (opt.labelDe ?? opt.label) : opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

            {/* Word of the day — tap to expand meaning */}
            {(() => {
              const adaptiveWord = getAdaptiveWord(dailyState, lang, progress.currentDay);
              const adaptiveDepth = getAdaptiveDepth(dailyState, lang, progress.currentDay);
              const { word: fixedWord, meaning: fixedMeaning } = getDayWord(progress.currentDay);
              const word = adaptiveWord ?? fixedWord;
              const meaning = (adaptiveWord && adaptiveDepth) ? adaptiveDepth : fixedMeaning;
              return (
                <View>
                  <Text style={{ fontSize: 10, color: '#9B9590', letterSpacing: 1, marginBottom: 4 }}>
                    {t('today.word.label')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setWordExpanded(e => !e)}
                    activeOpacity={0.75}
                    style={styles.wordPill}
                  >
                    <Text style={styles.wordText}>{word}</Text>
                  </TouchableOpacity>
                  <Animated.View style={{
                    maxHeight: wordExpandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }),
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      backgroundColor: '#F5EDD8',
                      borderRadius: 16,
                      padding: 16,
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: '#E8D9B5',
                    }}>
                      <Text style={{
                        fontSize: 11,
                        fontWeight: '700',
                        letterSpacing: 2,
                        color: '#C9973A',
                        marginBottom: 6,
                      }}>
                        {word}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#5C4F3A',
                        lineHeight: 20,
                        fontStyle: 'italic',
                      }}>
                        {meaning}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              );
            })()}
          </View>

          {/* Chapter name badge — shows emotional chapter at milestone streaks */}
          {(() => {
            const chapter = getCurrentChapterName(progress.streak);
            if (!chapter || progress.streak === 0) return null;
            return (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginTop: 6,
                alignSelf: 'flex-start',
                backgroundColor: Colors.accentDim,
                borderRadius: Radii.full,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderColor: 'rgba(201,168,76,0.20)',
              }}>
                <Text style={{
                  fontSize: 9,
                  fontWeight: '700',
                  color: Colors.gold,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}>
                  {lang === 'pt' ? 'CAPÍTULO' : lang === 'es' ? 'CAPÍTULO' : lang === 'fr' ? 'CHAPITRE' : lang === 'de' ? 'KAPITEL' : 'CHAPTER'}
                </Text>
                <View style={{ width: 1, height: 10, backgroundColor: 'rgba(201,168,76,0.30)' }} />
                <Text style={{
                  fontSize: 11,
                  color: Colors.gold,
                  fontWeight: '500',
                  fontStyle: 'italic',
                }}>
                  {chapter}
                </Text>
              </View>
            );
          })()}

          {/* Continuity phrase — quiet emotional memory for returning users */}
          {progress.completedDays.length >= 3 && completed && (() => {
            const phrase = getContinuityPhrase(progress.completedDays.length);
            return (
              <View style={{ marginTop: 8, paddingTop: 6, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight }}>
                <Text style={{ fontSize: 12, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 18 }}>
                  {lang === 'pt' ? phrase.pt : lang === 'es' ? phrase.es ?? phrase.en : lang === 'fr' ? phrase.fr ?? phrase.en : phrase.en}
                </Text>
              </View>
            );
          })()}

        </View>

        {/* Emotional continuity card — "Yesterday you wrote..." creates memory feeling */}
        {!completed && !comeback.isComeback && yesterdayEntry && (
          <YesterdayEchoCard entry={yesterdayEntry} lang={lang} />
        )}

        {/* Comeback card — aparece quando usuário retorna após ausência */}
        {!completed && comeback.isComeback && (
          <ComebackCard
            comeback={comeback}
            comebackCount={comebackCount}
            totalDaysCompleted={progress.completedDays.length}
          />
        )}


        {/* Card do dia */}
        {completed ? (
          <Animated.View style={{
            opacity: completedAnim,
            transform: [{ scale: completedAnim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }],
          }}>
            <CompletedCard
              day={dayData.day}
              streak={progress.streak}
              totalDays={progress.completedDays.length}
              tomorrow={tomorrowData}
              nextMilestone={nextMilestone}
              daysToNext={daysToNext}
              returnedAfterAbsence={didReturnAfterAbsence(progress.completedDays, progress.currentDay)}
              checklistComplete={checkItems.length === checklist.length}
              reflection={todayReflection.prompt}
              reflectionPromptId={todayReflection.id}
              communityInsight={completionInsight?.text ?? null}
            />
          </Animated.View>
        ) : (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <DailyResetCard
              data={dayData}
              categoryOverride={getStateCategory(dailyState) ?? undefined}
              onActionSave={(text) => saveDailyEntry({
                date: getLocalDateKey(),
                day: progress.currentDay,
                action_response: text,
                word_of_day: getDayWord(progress.currentDay).word,
                category: dayData.theme,
                resetTitle: dayData.title,
                actionPrompt: dayData.today_action?.content,
                reflectionPrompt: dayData.reflection?.content,
                whyItMatters: dayData.why_it_matters?.content,
              })}
              onReflectionSave={(text) => saveDailyEntry({
                date: getLocalDateKey(),
                day: progress.currentDay,
                reflection_response: text,
                category: dayData.theme,
                resetTitle: dayData.title,
                actionPrompt: dayData.today_action?.content,
                reflectionPrompt: dayData.reflection.content,
                whyItMatters: dayData.why_it_matters?.content,
              })}
            />
          </Animated.View>
        )}

        {/* Reset Ritual entry card — the emotional core feature */}
        <AnimatedTouchable
          style={[styles.ritualCard, { transform: [{ scale: ritualPressAnim }] }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/reset-ritual');
          }}
          activeOpacity={1}
          onPressIn={() => Animated.spring(ritualPressAnim, { toValue: 0.97, friction: 12, tension: 300, useNativeDriver: true }).start()}
          onPressOut={() => Animated.spring(ritualPressAnim, { toValue: 1, friction: 6, tension: 180, useNativeDriver: true }).start()}
        >
          {/* Slow breathing glow overlay — draws attention to the signature feature */}
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: Radii.xl, backgroundColor: 'rgba(255,255,255,0.20)', opacity: ritualGlowAnim },
            ]}
          />
          <View style={styles.ritualCardLeft}>
            <View style={styles.ritualIconWrap}>
              <Ionicons name="sparkles" size={16} color="rgba(28,28,28,0.65)" />
            </View>
            <View style={styles.ritualCardText}>
              <Text style={styles.ritualCardTitle}>{t('today.ritual.name')}</Text>
              <Text style={styles.ritualCardSub}>{t('today.ritual.sub')}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.charcoal} />
        </AnimatedTouchable>

        {/* Tomorrow Anticipation — always visible, creates pull toward next day */}
        {!completed && tomorrowData && (
          <TomorrowAnticipationCard
            tomorrow={tomorrowData}
            streak={progress.streak}
            nextMilestone={nextMilestone}
            daysToNext={daysToNext}
            emotionalState={emotionalState}
          />
        )}

        {/* Finish button — inline in the scroll flow, appears after all reset content */}
        {!completed && (
          <Animated.View style={[
            styles.stickyBtnWrap,
            {
              opacity: btnOpacity,
              transform: [{ translateY: btnSlideAnim }],
            },
          ]}>
            <Animated.View style={[styles.completeBtn, { opacity: pulseAnim, transform: [{ scale: breatheAnim }] }]}>
              <TouchableOpacity
                onPress={handleComplete}
                activeOpacity={1}
                onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.97, friction: 12, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }).start()}
              >
                <Animated.View style={[styles.completeBtnInner, { transform: [{ scale: scaleAnim }] }]}>
                  <Ionicons name="checkmark-circle" size={17} color="rgba(255,255,255,0.90)" />
                  <Text style={styles.completeBtnText}>{t('today.cta.complete')}</Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        )}

        <View style={styles.quickRowBottomSpacer} />
      </ScrollView>

      {/* Dark completion overlay — covers Today re-renders during ceremony transition */}
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: Colors.charcoal,
          opacity: completionOverlay,
        }}
      />
    </View>
  );
}

// ─── Tomorrow Anticipation Card ──────────────────────────────────────────────
const tomorrowCatColorMap: Record<string, string> = {
  Focus: '#4A90D9', Rhythm: '#E8B840', Discipline: '#E8B840',
  Courage: '#8B5CF6', Momentum: '#3DB86A', Calm: '#5BAA96',
  Clarity: '#14B8A6', Rest: '#7B8CC8',
};
const tomorrowCatBgMap: Record<string, string> = {
  Focus: 'rgba(74,144,217,0.10)', Rhythm: 'rgba(232,184,64,0.14)',
  Discipline: 'rgba(232,184,64,0.14)', Courage: 'rgba(139,92,246,0.10)',
  Momentum: 'rgba(61,184,106,0.10)', Calm: 'rgba(91,170,150,0.10)',
  Clarity: 'rgba(20,184,166,0.10)', Rest: 'rgba(123,140,200,0.10)',
};
const _tomorrowCatLabelMap: Record<string, string> = {
  Focus: 'Focus', Rhythm: 'Rhythm', Discipline: 'Discipline',
  Courage: 'Courage', Momentum: 'Momentum', Calm: 'Calm',
  Clarity: 'Clarity', Rest: 'Rest',
};

function TomorrowAnticipationCard({
  tomorrow,
  streak,
  nextMilestone,
  daysToNext,
  emotionalState,
}: {
  tomorrow: Ritual | null;
  streak: number;
  nextMilestone: number | null;
  daysToNext: number | null;
  emotionalState?: EmotionalState;
}) {
  const { t: tCard } = useLanguage();
  const dotPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1.5, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 1,   duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!tomorrow) return null;

  const cat      = tomorrow.theme as DailyCategory;
  const copy     = getTomorrowAnticipateCopy(streak, nextMilestone, daysToNext, cat, emotionalState);
  const color    = tomorrowCatColorMap[cat] ?? Colors.gold;
  const bg       = tomorrowCatBgMap[cat] ?? Colors.accentDim;
  const headline = tomorrow.day === 2
    ? tCard('today.tomorrow.day2begins')
    : tCard('today.tomorrow.dayArrives', { day: tomorrow.day });

  return (
    <View style={anticipationStyles.card}>
      {/* Header */}
      <View style={anticipationStyles.header}>
        <Text style={anticipationStyles.eyebrow}>{tCard('today.tomorrow.label')}</Text>
        <View style={[anticipationStyles.catPill, { backgroundColor: bg }]}>
          <Animated.View style={[anticipationStyles.catDot, { backgroundColor: color, transform: [{ scale: dotPulse }] }]} />
          <Text style={[anticipationStyles.catLabel, { color }]}>
            {tCard('today.cat.' + cat)}
          </Text>
        </View>
      </View>

      {/* Headline — day number correto do programa */}
      <Text style={anticipationStyles.headline}>{headline}</Text>

      {/* Category theme — the curiosity hook */}
      <Text style={anticipationStyles.theme}>{copy.sub}</Text>

      {/* Message teaser — first line only */}
      <Text style={anticipationStyles.teaser} numberOfLines={1}>
        {`"${tomorrow.home_card.headline.length > 55 ? tomorrow.home_card.headline.slice(0, 53) + '…' : tomorrow.home_card.headline}"`}
      </Text>

      {/* Continuity copy — the retention hook */}
      <View style={anticipationStyles.continuityRow}>
        <View style={anticipationStyles.continuityDot} />
        <Text style={anticipationStyles.continuityCopy}>{tCard('today.tomorrow.nopressure')}</Text>
      </View>
    </View>
  );
}

const anticipationStyles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    gap: 6,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 2,
  },
  catPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: Radii.full, paddingHorizontal: Spacing.md, paddingVertical: 4,
  },
  catDot: { width: 6, height: 6, borderRadius: 3 },
  catLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, textTransform: 'capitalize' },
  headline: {
    fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary, letterSpacing: -0.1,
  },
  theme: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
  teaser: {
    fontSize: Typography.sizes.sm, color: Colors.textPrimary,
    fontStyle: 'italic', lineHeight: 20,
  },
  continuityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  continuityDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.accent },
  continuityCopy: { fontSize: Typography.sizes.xs, color: Colors.textMuted, flex: 1, lineHeight: 16 },
});

// ─── Yesterday Echo Card — Emotional Continuity (Prompt 9 System 1) ─────────

function YesterdayEchoCard({ entry, lang }: { entry: DailyEntry; lang: string }) {
  const snippet = entry.action_response || entry.reflection_response || '';
  const truncated = snippet.length > 80 ? snippet.slice(0, 78) + '…' : snippet;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const yesterday = lang === 'pt' ? 'Ontem você escreveu:' : lang === 'es' ? 'Ayer escribiste:' : lang === 'fr' ? 'Hier tu as écrit :' : lang === 'de' ? 'Gestern hast du geschrieben:' : 'Yesterday you wrote:';
  const continuity = lang === 'pt' ? 'Seu espaço continua aqui.' : lang === 'es' ? 'Tu espacio sigue aquí.' : lang === 'fr' ? 'Ton espace est toujours là.' : lang === 'de' ? 'Dein Raum ist noch hier.' : 'Your space continues here.';

  return (
    <Animated.View style={[echoStyles.card, { opacity: fadeAnim }]}>
      <View style={echoStyles.accentDot} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={echoStyles.eyebrow}>{yesterday}</Text>
        <Text style={echoStyles.quote} numberOfLines={2}>{`"${truncated}"`}</Text>
        <Text style={echoStyles.continuity}>{continuity}</Text>
      </View>
    </Animated.View>
  );
}

const echoStyles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  accentDot: {
    width: 3,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    alignSelf: 'stretch',
    opacity: 0.55,
    marginTop: 2,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.80,
  },
  quote: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  continuity: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
});

// ─── Componentes do card ──────────────────────────────────────────────────────

function DailyResetCard({ data, categoryOverride, onActionSave, onReflectionSave: _onReflectionSave }: {
  data: Ritual;
  categoryOverride?: string;
  onActionSave?: (text: string) => void;
  onReflectionSave?: (text: string) => void;
}) {
  const { t: cardT } = useLanguage();
  const activeTheme = categoryOverride ?? data.theme;
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => {
    setExpanded(prev => {
      const next = prev === key ? null : key;
      if (next !== null) {
        if (key === 'action')     track('action_expanded',     { day: data.day });
        if (key === 'reflection') track('reflection_expanded', { day: data.day });
      }
      return next;
    });
  };
  const cardOpacity    = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    fadeSlideIn(cardOpacity, cardTranslateY, 80).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[cardStyles.card, { opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }]}>
      <View style={cardStyles.row}>
        <View style={cardStyles.dayPill}>
          <Text style={cardStyles.dayText}>{cardT('today.day.label', { day: data.day })}</Text>
        </View>
        <View style={[cardStyles.catPill, { backgroundColor: catColors[activeTheme] }]}>
          <Text style={cardStyles.catText}>{cardT('today.cat.' + activeTheme)}</Text>
        </View>
      </View>

      <Text style={cardStyles.message}>{data.home_card.headline}</Text>
      <View style={cardStyles.divider} />

      <Section icon="leaf-outline" title={cardT('today.section.action')} content={data.today_action.content}
        open={expanded === 'action'} onToggle={() => toggle('action')}
        inputKey={`action_response_day_${data.day}`}
        inputPlaceholder={getActionPlaceholder(data.theme, data.day)}
        onSave={onActionSave} />
      <Section icon="heart-outline" title={cardT('today.section.why')} content={data.why_it_matters.content}
        open={expanded === 'why'} onToggle={() => toggle('why')} />
    </Animated.View>
  );
}

function Section({ icon, title, content, open, onToggle, inputKey, inputPlaceholder, onSave }: {
  icon: string; title: string; content: string; open: boolean; onToggle: () => void;
  inputKey?: string; inputPlaceholder?: string; onSave?: (text: string) => void;
}) {
  const opacity     = useRef(new Animated.Value(0)).current;
  const translateY  = useRef(new Animated.Value(-6)).current;
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (inputKey) {
      getItem<string>(inputKey, '').then(val => { if (val) setResponse(val); });
    }
  }, [inputKey]);

  useEffect(() => {
    Animated.timing(chevronAnim, {
      toValue: open ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    if (open) {
      setVisible(true);
      accordionOpen(opacity, translateY).start();
    } else {
      accordionClose(opacity, translateY).start(() => setVisible(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const chevronRotate = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={cardStyles.section}>
      <TouchableOpacity style={cardStyles.sectionRow} onPress={onToggle} activeOpacity={0.65}>
        <View style={cardStyles.sectionIconCol}>
          <View style={cardStyles.sectionIconWrap}>
            <Ionicons name={icon as any} size={13} color={Colors.gold} />
          </View>
        </View>
        <Text style={cardStyles.sectionTitle}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <Ionicons name="chevron-down" size={13} color={Colors.textMuted} style={{ opacity: 0.7 }} />
        </Animated.View>
      </TouchableOpacity>
      {visible && (
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <View style={cardStyles.sectionBody}>
            <Text style={cardStyles.sectionContent}>{content}</Text>
            {inputKey && (
              <TextInput
                placeholder={inputPlaceholder}
                placeholderTextColor="#B0A89E"
                selectionColor={Colors.gold}
                multiline
                value={response}
                onChangeText={(text) => {
                  setResponse(text);
                  setItem(inputKey, text);
                  onSave?.(text);
                }}
                style={{
                  padding: 12,
                  paddingTop: 10,
                  backgroundColor: Colors.backgroundSecondary,
                  borderRadius: Radii.md,
                  fontSize: 14,
                  color: Colors.textPrimary,
                  lineHeight: 23,
                  minHeight: 52,
                  textAlignVertical: 'top',
                }}
              />
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const _tomorrowCatLabel: Record<string, string> = {
  Focus: 'Focus', Rhythm: 'Rhythm', Discipline: 'Discipline',
  Courage: 'Courage', Momentum: 'Momentum', Calm: 'Calm',
  Clarity: 'Clarity', Rest: 'Rest',
};
const tomorrowCatColor: Record<string, string> = {
  Focus: '#4A90D9', Rhythm: '#E8B840', Discipline: '#E8B840',
  Courage: '#8B5CF6', Momentum: '#3DB86A', Calm: '#5BAA96',
  Clarity: '#14B8A6', Rest: '#7B8CC8',
};
const tomorrowCatBg: Record<string, string> = {
  Focus: 'rgba(74,144,217,0.12)', Rhythm: 'rgba(232,184,64,0.18)',
  Discipline: 'rgba(232,184,64,0.18)', Courage: 'rgba(139,92,246,0.12)',
  Momentum: 'rgba(61,184,106,0.12)', Calm: 'rgba(91,170,150,0.12)',
  Clarity: 'rgba(20,184,166,0.12)', Rest: 'rgba(123,140,200,0.12)',
};

function CompletedCard({ day, streak, totalDays: _totalDays, tomorrow, nextMilestone: _nextMilestone, daysToNext: _daysToNext, returnedAfterAbsence: _returnedAfterAbsence, checklistComplete: _checklistComplete, reflection, communityInsight, reflectionPromptId }: {
  day: number;
  streak: number;
  totalDays: number;
  tomorrow: Ritual | null;
  nextMilestone: number | null;
  daysToNext: number | null;
  returnedAfterAbsence?: boolean;
  checklistComplete?: boolean;
  reflection?: string;
  communityInsight?: string | null;
  reflectionPromptId?: string;
}) {
  const cardRouter = useRouter();
  const { t: cardT } = useLanguage();
  const msg    = getCompletionMessage(streak, day);
  const phrase = getStreakPhrase(streak, day);

  const contextualMsg = null;

  return (
    <>
    <View style={cardStyles.completedCard}>

      {/* ── Completion confirmation ──────────────────────────────── */}
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#3D3530', lineHeight: 28, marginBottom: 6, alignSelf: 'stretch' }}>
        {msg.title}
      </Text>

      {msg.sub ? <Text style={[cardStyles.completedSub, { marginBottom: 12, alignSelf: 'stretch' }]}>{msg.sub}</Text> : null}

      {/* ── Streak identity ───────────────────────────────────── */}
      {streak > 0 && (
        <View style={cardStyles.completedStreakRow}>
          <Ionicons name="flame" size={14} color={Colors.streak} />
          <Text style={cardStyles.completedStreakNum}>{streak}</Text>
          <Text style={cardStyles.completedStreakLabel}>
            {getIdentityLabel(streak)} — {phrase}
          </Text>
        </View>
      )}

      {/* ── Contextual feedback ──────────────────────────────── */}
      {contextualMsg && (
        <View style={cardStyles.contextualRow}>
          <View style={cardStyles.contextualDot} />
          <Text style={cardStyles.contextualMsg}>{contextualMsg}</Text>
        </View>
      )}

      {/* ── Reflection prompt ────────────────────────────────── */}
      {reflection && (
        <TouchableOpacity
          style={cardStyles.reflectionRow}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const params: Record<string, string> = { prompt: reflection, source: 'moment' };
            if (reflectionPromptId) params.promptId = reflectionPromptId;
            cardRouter.push({ pathname: '/reflection', params });
          }}
          activeOpacity={0.82}
        >
          <View style={cardStyles.reflectionRowInner}>
            <Text style={cardStyles.reflectionEyebrow}>{cardT('today.reflect.eyebrow')}</Text>
            <Text style={cardStyles.reflectionPrompt}>{`"${reflection}"`}</Text>
          </View>
          <Ionicons name="create-outline" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      )}

      {/* ── Community insight ─────────────────────────────────── */}
      {communityInsight && (
        <View style={cardStyles.communityRow}>
          <Ionicons name="people-outline" size={11} color={Colors.textMuted} />
          <Text style={cardStyles.communityText}>{communityInsight}</Text>
        </View>
      )}
    </View>

    {/* ── Tomorrow's Reset — standalone modular card ────────── */}
    {tomorrow ? (
      <View style={cardStyles.tomorrowCard}>
        <View style={cardStyles.tomorrowHeaderRow}>
          <Text style={cardStyles.tomorrowEyebrow}>{cardT('today.tomorrow.eyebrow')}</Text>
          <View style={[
            cardStyles.tomorrowCatPill,
            { backgroundColor: tomorrowCatBg[tomorrow.theme] }
          ]}>
            <View style={[cardStyles.tomorrowCatDot, { backgroundColor: tomorrowCatColor[tomorrow.theme] }]} />
            <Text style={[cardStyles.tomorrowCatLabel, { color: tomorrowCatColor[tomorrow.theme] }]}>
              {cardT('today.cat.' + tomorrow.theme)}
            </Text>
          </View>
        </View>
        <Text style={cardStyles.tomorrowTheme}>
          {getCategoryTheme(tomorrow.theme as DailyCategory)}
        </Text>
        <Text style={cardStyles.tomorrowMessage} numberOfLines={2}>
          {`"${tomorrow.home_card.headline.length > 65 ? tomorrow.home_card.headline.slice(0, 63) + '…' : tomorrow.home_card.headline}"`}
        </Text>
        <Text style={cardStyles.tomorrowNoPressure}>{cardT('today.tomorrow.nopressure')}</Text>
      </View>
    ) : (
      <View style={cardStyles.tomorrowCard}>
        <Text style={cardStyles.tomorrowEyebrow}>{cardT('today.tomorrow.continues.top')}</Text>
        <Text style={cardStyles.tomorrowMessage}>{cardT('today.tomorrow.continues.msg')}</Text>
        <View style={cardStyles.tomorrowRetentionRow}>
          <View style={cardStyles.tomorrowRetentionDot} />
          <Text style={cardStyles.tomorrowCta}>{cardT('today.tomorrow.continues.cta')}</Text>
        </View>
      </View>
    )}
  </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LockedCard({ day, onUnlock }: { day: number; onUnlock: () => void }) {
  const { t } = useLanguage();
  return (
    <TouchableOpacity style={cardStyles.lockedCard} onPress={onUnlock} activeOpacity={0.86}>
      <View style={cardStyles.lockedIconPill}>
        <Ionicons name="lock-closed" size={28} color={Colors.charcoal} />
      </View>
      <Text style={cardStyles.lockedTitle}>{t('today.locked.title', { day })}</Text>
      <Text style={cardStyles.lockedSub}>{t('today.locked.sub')}</Text>
      <View style={cardStyles.unlockBtn}>
        <Text style={cardStyles.unlockText}>{t('today.locked.cta')}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Paleta de categorias — cores suaves sobre branco (Imagem 1)
const catColors: Record<string, string> = {
  Focus:      'rgba(74,144,217,0.15)',
  Rhythm:     'rgba(239,201,76,0.25)',
  Discipline: 'rgba(239,201,76,0.25)',
  Courage:    'rgba(130,100,230,0.15)',
  Momentum:   'rgba(61,184,106,0.15)',
  Calm:       'rgba(91,170,150,0.15)',
  Clarity:    'rgba(80,200,200,0.15)',
  Rest:       'rgba(123,140,200,0.15)',
};

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 120 },
  ambientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 320, backgroundColor: 'rgba(201,151,58,0.022)', zIndex: 0 },
  ambientBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(201,151,58,0.016)', zIndex: 0 },

  header: { paddingHorizontal: Spacing.xl, paddingTop: 44, paddingBottom: Spacing.lg },
  headerTop: { flexDirection: 'column', gap: 9 },
  headerGreetingRow: { marginBottom: 2 },

  greeting: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.gold,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 6,
    opacity: 0.88,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: { fontSize: Typography.sizes.sm, color: Colors.textMuted, lineHeight: 20 },


  // ── Mood check-in ─────────────────────────────────────────────────────────────
  moodRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  moodBtn: {
    padding: 4,
  },
  moodCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(28,28,28,0.18)',
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  moodCircleSelected: {
    borderColor: Colors.charcoal,
    backgroundColor: Colors.backgroundSecondary,
  },
  moodFill: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.charcoal,
  },

  // ── Word of the day ───────────────────────────────────────────────────────────
  wordPill: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  wordText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  wordMeaning: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 17,
    maxWidth: 220,
  },

  // Frase emocional do streak (banner suave abaixo do header)
  streakPhraseRow: {
    marginTop: Spacing.md,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  streakPhrase: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  // Gentle Streak state variants (System 1)
  streakStateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakStatePaused: {
    fontSize: Typography.sizes.sm,
    color: '#A09080',
    fontStyle: 'italic',
  },
  streakStateResting: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  streakStateReturning: {
    fontSize: Typography.sizes.sm,
    color: Colors.gold,
    fontWeight: Typography.weights.semibold,
  },

  // Mensagem de milestone especial
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
    backgroundColor: Colors.accentDim,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  milestoneText: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    fontWeight: Typography.weights.semibold,
  },

  // Finish button wrapper — inline in the scroll, not fixed/sticky
  stickyBtnWrap: {
    paddingHorizontal: 20,
    marginTop: Spacing.lg,
  },
  // CTA flutuante — calmo, premium, não dominante
  completeBtn: {
    borderRadius: Radii.full,
    backgroundColor: '#4A4039',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  completeBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: Spacing.sm,
  },
  completeBtnText: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semibold, color: Colors.white },
  scrollWithBtn: { paddingBottom: 120 },

  contextualBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.base,
    marginBottom: Spacing.xs,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  contextualBannerDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent, flexShrink: 0,
  },
  contextualBannerText: {
    flex: 1,
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // ── Reset Ritual entry ────────────────────────────────────────────────────────
  ritualCard: {
    marginHorizontal: Spacing.xl,
    marginTop: 18,
    marginBottom: 18,
    backgroundColor: Colors.accent,
    borderRadius: Radii.xl,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  ritualCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  ritualIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(28,28,28,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ritualCardText: { flex: 1, gap: 1 },
  ritualCardTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(28,28,28,0.82)',
    letterSpacing: -0.1,
  },
  ritualCardSub: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(28,28,28,0.60)',
    fontStyle: 'italic',
  },

  quickRow: { flexDirection: 'row', marginHorizontal: Spacing.xl, marginTop: Spacing.lg, gap: Spacing.md },
  quickRowBottomSpacer: { height: Spacing.xxl },
  quickCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: 22,
    paddingBottom: 22,
    minHeight: 108,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  quickIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { flex: 1, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.heavy, color: Colors.textPrimary },
  quickLabelFocus: { color: Colors.charcoal },

  section: { marginHorizontal: Spacing.xl, marginTop: Spacing.xl },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },
  checkItemDone: { borderColor: Colors.accent, backgroundColor: Colors.accentDim },
  checkIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconDone: { backgroundColor: Colors.accent },
  checkLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textSecondary },
  checkLabelDone: { color: Colors.textPrimary, textDecorationLine: 'line-through' },
});

const cardStyles = StyleSheet.create({
  // Unified soft card — the entire daily experience in one quiet surface
  card: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.04)',
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },

  // Pill charcoal — estilo "Dashboard" ativo (Imagem 1)
  dayPill: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  dayText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.white, letterSpacing: 1.5 },

  catPill: { borderRadius: Radii.full, paddingHorizontal: Spacing.md, paddingVertical: 4 },
  catText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.medium, color: Colors.textPrimary, textTransform: 'capitalize' },

  message: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: Spacing.xs,
    letterSpacing: -0.1,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.borderLight, marginBottom: Spacing.xs },

  section: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(28,28,28,0.04)',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  // Icon column — 38px
  sectionIconCol: {
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Icon — minimal warm circle
  sectionIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(239,201,76,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    letterSpacing: 0.1,
  },
  // Expanded body — clean indented flow, no container
  sectionBody: {
    marginLeft: 38,
    marginTop: 4,
    marginBottom: 8,
    paddingBottom: 14,
  },
  sectionContent: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },

  completedCard: {
    marginHorizontal: Spacing.xl,
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: 18,
    paddingBottom: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.05)',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  completedIconPill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  // Completed card — premium emotional experience
  completedTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  completedCopy: { flex: 1 },
  completedTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold, color: Colors.textPrimary, letterSpacing: -0.2, marginBottom: 4 },
  completedSub: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, lineHeight: 20 },

  completedStreakRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg, paddingHorizontal: 14, paddingVertical: 10,
    marginBottom: 8,
  },
  completedStreakNum: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.black, color: Colors.textPrimary },
  completedStreakLabel: { flex: 1, fontSize: Typography.sizes.xs, color: Colors.textSecondary, lineHeight: 16 },

  contextualRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.md, paddingHorizontal: 12, paddingVertical: 9,
    marginBottom: 6,
  },
  contextualDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent, flexShrink: 0 },
  contextualMsg: { flex: 1, fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 20 },

  reflectionRow: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  reflectionRowInner: {
    flex: 1,
    gap: 5,
  },
  reflectionEyebrow: {
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  reflectionPrompt: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  communityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    paddingTop: Spacing.xs,
  },
  communityText: {
    flex: 1,
    fontSize: 10,
    color: Colors.textMuted,
    lineHeight: 15,
    fontStyle: 'italic',
  },
  completedDivider: { height: 1, backgroundColor: Colors.borderLight, marginVertical: Spacing.base },

  // Tomorrow — standalone modular card
  tomorrowCard: {
    marginHorizontal: Spacing.xl,
    marginTop: 14,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.09)',
    gap: 5,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 5,
  },
  tomorrowSection: { gap: Spacing.sm },
  tomorrowHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tomorrowEyebrow: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 2,
  },
  tomorrowCatPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: Radii.full, paddingHorizontal: Spacing.md, paddingVertical: 4,
  },
  tomorrowCatDot: { width: 6, height: 6, borderRadius: 3 },
  tomorrowCatLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, textTransform: 'capitalize' },
  tomorrowTheme: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
  tomorrowMessage: {
    fontSize: Typography.sizes.sm, color: Colors.textPrimary,
    fontStyle: 'italic', lineHeight: 20,
  },
  tomorrowRetentionRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  tomorrowRetentionDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.accent, flexShrink: 0 },
  tomorrowCta: { fontSize: Typography.sizes.xs, color: Colors.textMuted, lineHeight: 16, flex: 1 },
  tomorrowNoPressure: { fontSize: 13, color: '#9B9590', marginTop: 4 },

  lockedCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.base,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.cardStrong,
  },
  lockedIconPill: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  lockedTitle: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy, color: Colors.textPrimary, marginBottom: Spacing.sm, letterSpacing: -0.3 },
  lockedSub: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.lg },
  unlockBtn: { backgroundColor: Colors.charcoal, borderRadius: Radii.full, paddingHorizontal: Spacing.xl, paddingVertical: 12 },
  unlockText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.white },
});

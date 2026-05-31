import { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
  AccessibilityInfo,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../../hooks/useProgress';
import { getQuietMilestoneCopy } from '../../utils/milestoneSystem';
import { useSpaceReflections, type ReflectionEntry } from '../../hooks/useSpaceReflections';
import { useLanguage } from '../../hooks/useLanguage';
import { useEmotionalProfile } from '../../hooks/useEmotionalProfile';
import { selectPrivateSpacePrompt } from '../../utils/privateSpacePrompts';
import { Colors, Typography, Spacing, Radii, Shadows } from '../../theme';

// ─── Animated SVG Circle ──────────────────────────────────────────────────────

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function RingProgress({ percent, size = 100, strokeWidth = 7 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const anim = useRef(new Animated.Value(0)).current;
  const outerRingOpacity = useRef(new Animated.Value(0.32)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: percent,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(outerRingOpacity, { toValue: 0.52, duration: 6200, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
          Animated.timing(outerRingOpacity, { toValue: 0.26, duration: 6200, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const center = size / 2;

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <AnimatedCircle
        cx={center}
        cy={center}
        r={radius}
        stroke={Colors.accentDim}
        strokeWidth={strokeWidth}
        fill="none"
        strokeOpacity={outerRingOpacity}
      />
      <AnimatedCircle
        cx={center}
        cy={center}
        r={radius}
        stroke={Colors.gold}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── ProgressHero ─────────────────────────────────────────────────────────────

function ProgressHero({ fadeAnim, seed }: { fadeAnim: Animated.Value; seed: number }) {
  const { t } = useLanguage();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  const variationIndex = seed % 6;

  const atmosphereAnim     = useRef(new Animated.Value(0.035)).current;
  const atmosphereDeepAnim = useRef(new Animated.Value(0.015)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(atmosphereAnim, { toValue: 0.060, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(atmosphereAnim, { toValue: 0.035, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(atmosphereDeepAnim, { toValue: 0.030, duration: 10400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(atmosphereDeepAnim, { toValue: 0.015, duration: 10400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.heroContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <Animated.View style={[styles.heroAtmosphere, { opacity: atmosphereAnim }]} />
      <Animated.View style={[styles.heroAtmosphereDeep, { opacity: atmosphereDeepAnim }]} />
      <Text style={styles.heroTitle}>{t('progress2.hero.title')}</Text>
      <Text style={styles.heroSubtitle}>{t(`progress2.hero.variation.${variationIndex}`)}</Text>
    </Animated.View>
  );
}

// ─── WeeklyRhythmCard ─────────────────────────────────────────────────────────

function WeeklyRhythmCard({
  percent,
  totalDays: _totalDays,
  hasData,
  fadeAnim,
}: {
  percent: number;
  totalDays: number;
  hasData: boolean;
  fadeAnim: Animated.Value;
}) {
  const { t } = useLanguage();
  const breathScale    = useRef(new Animated.Value(1)).current;
  const glowOpacity    = useRef(new Animated.Value(0.08)).current;
  const innerGlowOpacity = useRef(new Animated.Value(0.05)).current;
  const translateY     = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathScale, { toValue: 1.012, duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(breathScale, { toValue: 1.0,   duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, { toValue: 0.24, duration: 4600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.08, duration: 4600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(innerGlowOpacity, { toValue: 0.18, duration: 5200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(innerGlowOpacity, { toValue: 0.05, duration: 5200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.card, styles.rhythmCard, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <Text style={styles.cardEyebrow}>{t('progress2.rhythm.title')}</Text>
      {hasData ? (
        <View style={styles.rhythmContent}>
          <Animated.View style={[styles.ringWrapper, { transform: [{ scale: breathScale }] }]}>
            <Animated.View style={[styles.ringAmbientGlow, { opacity: glowOpacity }]} />
            <Animated.View style={[styles.ringInnerGlow, { opacity: innerGlowOpacity }]} />
            <RingProgress percent={percent} size={100} strokeWidth={7} />
            <View style={styles.ringCenter}>
              <Text style={styles.ringReturnText}>{t('progress2.rhythm.returnMain')}</Text>
              <Text style={styles.ringLabel}>{t('progress2.rhythm.returnLabel')}</Text>
            </View>
          </Animated.View>
          <Text style={styles.rhythmDescription}>{t('progress2.rhythm.tagline')}</Text>
        </View>
      ) : (
        <>
          <Text style={styles.rhythmEmptyTitle}>{t('progress2.rhythm.emptyTitle')}</Text>
          <Text style={styles.rhythmEmptyDesc}>{t('progress2.rhythm.emptyDescription')}</Text>
        </>
      )}
    </Animated.View>
  );
}

// ─── RealSignalsSection ───────────────────────────────────────────────────────

const SIGNAL_MARKS = ['radio-button-off-outline', 'ellipse-outline', 'git-commit-outline'] as const;

function SignalCard({ title, text, index }: { title: string; text: string; index: number }) {
  const slideAnim = useRef(new Animated.Value(20)).current;
  const opacAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 600, delay: index * 120, useNativeDriver: true }),
      Animated.timing(opacAnim, { toValue: 1, duration: 600, delay: index * 120, useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.signalCard, { opacity: opacAnim, transform: [{ translateY: slideAnim }] }]}>
      <Ionicons
        name={SIGNAL_MARKS[index % 3]}
        size={9}
        color={Colors.gold}
        style={styles.signalCardMark}
      />
      <Text style={styles.signalCardTitle}>{title}</Text>
      <Text style={styles.signalCardText}>{text}</Text>
    </Animated.View>
  );
}

function RealSignalsSection({ hasData, fadeAnim }: { hasData: boolean; fadeAnim: Animated.Value }) {
  const { t } = useLanguage();
  if (!hasData) return null;

  const signals = [
    { title: t('progress2.signals.return.title'), text: t('progress2.signals.return.text') },
    { title: t('progress2.signals.presence.title'), text: t('progress2.signals.presence.text') },
    { title: t('progress2.signals.stability.title'), text: t('progress2.signals.stability.text') },
  ];

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.sectionTitle}>{t('progress2.signals.title')}</Text>
      <View style={styles.signalsRow}>
        {signals.map((s, i) => (
          <SignalCard key={i} title={s.title} text={s.text} index={i} />
        ))}
      </View>
    </Animated.View>
  );
}

// ─── PatternsSection ──────────────────────────────────────────────────────────

function PatternsSection({ seed, hasData, fadeAnim }: { seed: number; hasData: boolean; fadeAnim: Animated.Value }) {
  const { t } = useLanguage();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  const patterns = useMemo(() => {
    const all = [
      t('progress2.patterns.1'),
      t('progress2.patterns.2'),
      t('progress2.patterns.3'),
      t('progress2.patterns.4'),
      t('progress2.patterns.5'),
      t('progress2.patterns.6'),
      t('progress2.patterns.7'),
      t('progress2.patterns.8'),
      t('progress2.patterns.9'),
      t('progress2.patterns.10'),
    ];
    const i1 = seed % all.length;
    const i2 = (seed + 3) % all.length === i1 ? (seed + 4) % all.length : (seed + 3) % all.length;
    return [all[i1], all[i2]];
  }, [seed, t]);

  const onPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <Text style={styles.sectionTitle}>{t('progress2.patterns.title')}</Text>
      {hasData ? (
        patterns.map((p, i) => (
          <TouchableOpacity key={i} activeOpacity={0.75} onPress={onPress} style={styles.patternCard}>
            <View style={styles.patternDot} />
            <Text style={styles.patternText}>{p}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.patternEmptyText}>{t('progress2.patterns.empty')}</Text>
        </View>
      )}
    </Animated.View>
  );
}

// ─── RebuildingTimeline ───────────────────────────────────────────────────────

function MilestoneDot({ reached, isNext, isFar, isLatest }: { reached: boolean; isNext?: boolean; isFar?: boolean; isLatest?: boolean }) {
  const glowAnim      = useRef(new Animated.Value(0)).current;
  const outerGlowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!reached) return;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reached]);

  useEffect(() => {
    if (!isLatest) return;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(outerGlowAnim, { toValue: 0.35, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(outerGlowAnim, { toValue: 0.05, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLatest]);

  if (!reached) {
    const dotStyle = isFar ? styles.timelineDotFar : isNext ? styles.timelineDotNext : styles.timelineDot;
    return <View style={dotStyle} />;
  }

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  if (isLatest) {
    return (
      <View style={styles.timelineDotContainer}>
        <Animated.View style={[styles.timelineDotLatestGlow, { opacity: outerGlowAnim }]} />
        <Animated.View style={[styles.timelineDot, styles.timelineDotReached, { opacity: glowOpacity }]} />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.timelineDot, styles.timelineDotReached, { opacity: glowOpacity }]} />
  );
}

function RebuildingTimeline({ totalDays, fadeAnim }: { totalDays: number; fadeAnim: Animated.Value }) {
  const { t } = useLanguage();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  const milestones = [
    { day: 1,  key: 'progress2.timeline.day1',  reached: totalDays >= 1 },
    { day: 7,  key: 'progress2.timeline.day7',  reached: totalDays >= 7 },
    { day: 14, key: 'progress2.timeline.day14', reached: totalDays >= 14 },
    { day: 30, key: 'progress2.timeline.day30', reached: totalDays >= 30 },
    { day: 60, key: 'progress2.timeline.day60', reached: totalDays >= 60 },
    { day: 90, key: 'progress2.timeline.day90', reached: totalDays >= 90 },
  ];

  const firstUnreachedIdx = milestones.findIndex(m => !m.reached);
  const lastReachedIdx    = milestones.reduce((acc, m, i) => m.reached ? i : acc, -1);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <Text style={styles.sectionTitle}>{t('progress2.timeline.title')}</Text>
      <View style={styles.card}>
        {milestones.map((m, i) => {
          const isNext   = i === firstUnreachedIdx;
          const isFar    = firstUnreachedIdx !== -1 && i > firstUnreachedIdx;
          const isLatest = i === lastReachedIdx && lastReachedIdx !== -1;
          return (
            <View key={m.day} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <MilestoneDot reached={m.reached} isNext={isNext} isFar={isFar} isLatest={isLatest} />
                {i < milestones.length - 1 && (
                  <View style={[styles.timelineLine, milestones[i + 1].reached && styles.timelineLineReached]} />
                )}
              </View>
              <View style={styles.timelineRight}>
                <Text style={[
                  styles.timelineDay,
                  m.reached && styles.timelineDayReached,
                  isFar && styles.timelineDayFar,
                ]}>
                  {m.day === 1 ? 'Dia 1' : `${m.day} dias`}
                </Text>
                <Text style={[
                  styles.timelineText,
                  m.reached ? styles.timelineTextReached : styles.timelineTextLocked,
                  isFar && styles.timelineTextFar,
                ]}>
                  {t(m.key)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ─── Quiet Milestone Card ─────────────────────────────────────────────────────
// Rare, calm recognition — never celebratory. Based on total completions (not streak).
// Shows within a 3-day window of each milestone (m, m+1, m+2).

function SilentReward({ totalDays, fadeAnim }: { totalDays: number; fadeAnim: Animated.Value }) {
  const { lang } = useLanguage();
  const breathAnim = useRef(new Animated.Value(0.5)).current;

  const milestone = getQuietMilestoneCopy(totalDays, lang);

  useEffect(() => {
    if (!milestone) return;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (reduced) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnim, { toValue: 0.90, duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(breathAnim, { toValue: 0.45, duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!milestone]);

  if (!milestone) return null;

  const combinedOpacity = Animated.multiply(fadeAnim, breathAnim);

  return (
    <Animated.View style={[styles.quietMilestone, { opacity: combinedOpacity }]}>
      <View style={styles.quietMilestoneLine} />
      <Text style={styles.quietMilestoneLine1}>{milestone.line1}</Text>
      <Text style={styles.quietMilestoneLine2}>{milestone.line2}</Text>
      <View style={styles.quietMilestoneLine} />
    </Animated.View>
  );
}

// ─── QuietSummary ─────────────────────────────────────────────────────────────

function QuietSummary({
  resets,
  journal,
  returnDays,
  weeks,
  fadeAnim,
}: {
  resets: number;
  journal: number;
  returnDays: number;
  weeks: number;
  fadeAnim: Animated.Value;
}) {
  const { t } = useLanguage();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  const singularKeys: Record<string, string> = {
    'progress2.summary.resets':      'progress2.summary.resets.one',
    'progress2.summary.journal':     'progress2.summary.journal.one',
    'progress2.summary.returnDays':  'progress2.summary.returnDays.one',
  };

  const label = (baseKey: string, value: number) =>
    value === 1 && singularKeys[baseKey] ? t(singularKeys[baseKey]) : t(baseKey);

  const items = [
    { value: resets,     baseKey: 'progress2.summary.resets' },
    { value: journal,    baseKey: 'progress2.summary.journal' },
    { value: returnDays, baseKey: 'progress2.summary.returnDays' },
    { value: weeks,      baseKey: 'progress2.summary.weeks' },
  ];

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <Text style={styles.sectionTitle}>{t('progress2.summary.title')}</Text>
      <View style={[styles.card, styles.summaryCard]}>
        {items.map((item, i) => (
          <View key={i} style={styles.summaryItem}>
            <Text style={[styles.summaryValue, item.value === 0 && styles.summaryValueEmpty]}>
              {item.value === 0 ? '—' : item.value}
            </Text>
            <Text style={styles.summaryLabel}>{label(item.baseKey, item.value)}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── PrivateSpaceCard ─────────────────────────────────────────────────────────

function PrivateSpaceCard({
  saveEntry,
  streak,
  totalDays,
  fadeAnim,
}: {
  saveEntry: (e: Omit<ReflectionEntry, 'id' | 'date' | 'createdAt'>) => Promise<ReflectionEntry>;
  streak: number;
  totalDays: number;
  fadeAnim: Animated.Value;
}) {
  const { t, lang } = useLanguage();
  const { profile } = useEmotionalProfile();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  const [text, setText]         = useState('');
  const [isFocused, setFocused] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState<'kept' | 'released' | null>(null);
  const [dailyPrompt, setDailyPrompt] = useState('');

  const borderAnim     = useRef(new Animated.Value(0)).current;
  const feedbackAnim   = useRef(new Animated.Value(0)).current;
  const restingOpacity = useRef(new Animated.Value(0)).current;
  const textFadeAnim   = useRef(new Animated.Value(1)).current;

  // Load profile-specific prompt for today (stable per day + profile)
  useEffect(() => {
    selectPrivateSpacePrompt(profile, lang).then(p => setDailyPrompt(p));
  }, [profile, lang]);

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0, duration: 300,
      easing: Easing.out(Easing.cubic), useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const showFeedback = useCallback((key: 'kept' | 'released') => {
    setFeedbackKey(key);
    feedbackAnim.setValue(0);
    restingOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(feedbackAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(2200),
      Animated.timing(feedbackAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => setFeedbackKey(null));
    Animated.sequence([
      Animated.timing(restingOpacity, { toValue: 1, duration: 700, useNativeDriver: false }),
      Animated.delay(1800),
      Animated.timing(restingOpacity, { toValue: 0, duration: 1000, useNativeDriver: false }),
    ]).start();
  }, [feedbackAnim, restingOpacity]);

  const handleAction = useCallback(async (type: 'kept' | 'released') => {
    const trimmed = text.trim();
    if (!trimmed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise<void>(resolve =>
      Animated.timing(textFadeAnim, { toValue: 0, duration: 350, useNativeDriver: true }).start(() => resolve())
    );
    await saveEntry({
      prompt: dailyPrompt,
      promptId: dailyPrompt,
      text: trimmed,
      profile,
      streak,
      dayNumber: totalDays,
    });
    setText('');
    textFadeAnim.setValue(1);
    showFeedback(type);
  }, [text, dailyPrompt, profile, streak, totalDays, saveEntry, showFeedback, textFadeAnim]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, `${Colors.gold}55`],
  });

  const inputBgColor = restingOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [`${Colors.gold}07`, `${Colors.gold}1A`],
  });

  const hasText = text.trim().length > 0;

  return (
    <Animated.View style={[styles.card, styles.spaceCard, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <Text style={styles.cardEyebrow}>{t('progress2.space.eyebrow')}</Text>
      <Text style={styles.spaceTitle}>{t('progress2.space.title')}</Text>
      <Text style={styles.spacePrompt}>{t(dailyPrompt)}</Text>
      <Animated.View style={[styles.spaceInputWrap, { borderColor, backgroundColor: inputBgColor }]}>
        <Animated.View style={{ opacity: textFadeAnim }}>
          <TextInput
            style={styles.spaceInput}
            placeholder={t('progress2.space.placeholder')}
            placeholderTextColor={Colors.textMuted}
            value={text}
            onChangeText={setText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            multiline
            maxLength={500}
            textAlignVertical="top"
          />
        </Animated.View>
      </Animated.View>
      {hasText && (
        <View style={styles.spaceActions}>
          <TouchableOpacity onPress={() => handleAction('kept')} activeOpacity={0.7}>
            <Text style={styles.spaceActionKeep}>{t('progress2.space.action.keep')}</Text>
          </TouchableOpacity>
          <Text style={styles.spaceActionDivider}>·</Text>
          <TouchableOpacity onPress={() => handleAction('released')} activeOpacity={0.7}>
            <Text style={styles.spaceActionRelease}>{t('progress2.space.action.release')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {feedbackKey && (
        <Animated.Text style={[styles.spaceSaved, { opacity: feedbackAnim }]}>
          {feedbackKey === 'kept'
            ? t('progress2.space.feedback.kept')
            : t('progress2.space.feedback.released')}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

// ─── YourHistorySection ───────────────────────────────────────────────────────

function YourHistorySection({
  fadeAnim,
  weeklyScore,
  totalEntries,
  totalDays,
  currentDay,
}: {
  fadeAnim: Animated.Value;
  weeklyScore: number;
  totalEntries: number;
  totalDays: number;
  currentDay: number;
}) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const translateY = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  const weeklyBadgeLabel =
    lang === 'pt' ? 'Semanal' :
    lang === 'es' ? 'Semanal' :
    lang === 'fr' ? 'Semaine' :
    lang === 'de' ? 'Woche'   : 'Weekly';

  // For the first 7 resets use totalDays so the card always reflects how many
  // resets the user has actually done, regardless of which calendar week each
  // fell in. After 7+ resets a full recap exists and we switch to weeklyScore
  // so the card tracks the current calendar-week progress.
  const weekCardCount = totalDays <= 7 ? totalDays : weeklyScore;
  const weekRecapSub  = t(`progress2.weekrecap.n${Math.min(weekCardCount, 7)}`);

  const quietRefSub = totalEntries === 0
    ? t('qr.subtitle')
    : totalEntries === 1
      ? t('progress2.quietref.countOne')
      : t('progress2.quietref.countMany', { n: totalEntries });

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <Text style={styles.sectionTitle}>{t('progress.section.yourStory')}</Text>
      {/* Weekly Recap — shown from Day 1 in progressive state */}
      <TouchableOpacity
        style={[styles.card, styles.historyNavCard, styles.weeklyRecapCard]}
        activeOpacity={0.82}
        onPress={() => router.push('/weekly-recap-history' as never)}
      >
        <View style={styles.weeklyRecapIcon}>
          <Ionicons name="calendar-outline" size={20} color={Colors.gold} />
        </View>
        <View style={styles.historyNavText}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.weeklyRecapTitle}>{t('progress2.history.weekrecap.title')}</Text>
            <View style={styles.weeklyBadge}>
              <Text style={styles.weeklyBadgeText}>{weeklyBadgeLabel}</Text>
            </View>
          </View>
          <Text style={styles.historyNavSub}>{weekRecapSub}</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={Colors.gold} style={{ opacity: 0.5 }} />
      </TouchableOpacity>

      {/* Quiet Reflections — secondary card: ivory surface, filled moon, entry count */}
      <TouchableOpacity
        style={[styles.card, styles.historyNavCard, styles.quietRefNavCard]}
        activeOpacity={0.82}
        onPress={() => router.push('/quiet-reflections' as never)}
      >
        <View style={styles.quietRefNavIcon}>
          <Ionicons name="moon" size={18} color={Colors.gold} />
        </View>
        <View style={styles.historyNavText}>
          <Text style={styles.quietRefNavTitle}>{t('qr.title')}</Text>
          <Text style={[styles.historyNavSub, totalEntries > 0 ? styles.historyNavSubData : undefined]}>
            {quietRefSub}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} style={{ opacity: 0.5 }} />
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProgressScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;
  const { progress, weeklyScore, comebackCount, reload } = useProgress();
  const { totalEntries, saveEntry } = useSpaceReflections();

  // On web, start at 1 (fully visible) so there's no staggered pop-in on tab switch.
  const FADE_INIT = Platform.OS === 'web' ? 1 : 0;
  const heroFade     = useRef(new Animated.Value(FADE_INIT)).current;
  const spaceFade    = useRef(new Animated.Value(FADE_INIT)).current;
  const rhythmFade   = useRef(new Animated.Value(FADE_INIT)).current;
  const historyFade  = useRef(new Animated.Value(FADE_INIT)).current;
  const signalsFade  = useRef(new Animated.Value(FADE_INIT)).current;
  const patternsFade = useRef(new Animated.Value(FADE_INIT)).current;
  const timelineFade = useRef(new Animated.Value(FADE_INIT)).current;
  const summaryFade  = useRef(new Animated.Value(FADE_INIT)).current;

  const runEntranceAnimations = useCallback(() => {
    [heroFade, rhythmFade, signalsFade, patternsFade, timelineFade, summaryFade, spaceFade, historyFade].forEach(a => a.setValue(0));
    Animated.stagger(100, [
      Animated.timing(heroFade,     { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(rhythmFade,   { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(signalsFade,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(patternsFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(timelineFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(summaryFade,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(spaceFade,    { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(historyFade,  { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(useCallback(() => {
    reload();
    // On web, sections start at opacity 1 (FADE_INIT above). Replaying the
    // staggered entrance on every tab switch causes visible flicker — skip it.
    if (Platform.OS !== 'web') { runEntranceAnimations(); }
  }, [reload, runEntranceAnimations]));

  const totalDays = progress.completedDays.length;
  const hasData   = totalDays >= 1;

  const presencePercent = useMemo(() => {
    if (!hasData) return 0;
    const activeDays = Math.max(1, progress.currentDay);
    return Math.min(100, Math.round((totalDays / activeDays) * 100));
  }, [totalDays, progress.currentDay, hasData]);

  const weeksInMotion = Math.max(0, Math.floor(totalDays / 7));
  const returnDays    = Math.max(comebackCount, progress.streak);
  const patternSeed   = totalDays + weeklyScore;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isTablet && { maxWidth: 640, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <ProgressHero fadeAnim={heroFade} seed={patternSeed} />
        <SilentReward totalDays={totalDays} fadeAnim={heroFade} />
        <WeeklyRhythmCard percent={presencePercent} totalDays={totalDays} hasData={hasData} fadeAnim={rhythmFade} />
        <RealSignalsSection hasData={hasData} fadeAnim={signalsFade} />
        <PatternsSection seed={patternSeed} hasData={hasData} fadeAnim={patternsFade} />
        <RebuildingTimeline totalDays={totalDays} fadeAnim={timelineFade} />
        <QuietSummary
          resets={totalDays}
          journal={totalEntries}
          returnDays={returnDays}
          weeks={weeksInMotion}
          fadeAnim={summaryFade}
        />
        <PrivateSpaceCard
          saveEntry={saveEntry}
          streak={progress.streak}
          totalDays={totalDays}
          fadeAnim={spaceFade}
        />
        <View style={{ height: Spacing.md }} />
        <YourHistorySection
          fadeAnim={historyFade}
          weeklyScore={weeklyScore}
          totalEntries={totalEntries}
          totalDays={totalDays}
          currentDay={progress.currentDay}
        />
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },

  // Hero
  heroContainer: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  heroAtmosphere: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.gold,
  },
  heroAtmosphereDeep: {
    position: 'absolute',
    top: 20,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.gold,
  },
  heroTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    maxWidth: 280,
  },

  // Card base
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: `${Colors.gold}14`,
    ...Shadows.card,
  },

  // Card eyebrow
  cardEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.gold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.base,
  },

  // Rhythm card
  rhythmCard: {
    marginBottom: Spacing.xl,
  },
  rhythmContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  ringWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ringAmbientGlow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.gold,
  },
  ringInnerGlow: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.gold,
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringReturnText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    maxWidth: 64,
    lineHeight: 15,
  },
  ringLabel: {
    fontSize: 9,
    fontWeight: Typography.weights.medium,
    color: Colors.textMuted,
    textAlign: 'center',
    letterSpacing: 0.3,
    maxWidth: 56,
  },
  rhythmDescription: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  rhythmEmptyTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  rhythmEmptyDesc: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    lineHeight: 20,
  },

  // Section title
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },

  // Signals
  signalsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  signalCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    position: 'relative',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: `${Colors.gold}14`,
    ...Shadows.card,
  },
  signalCardMark: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    opacity: 0.22,
  },
  signalCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  signalCardText: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  // Patterns
  patternCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: `${Colors.gold}14`,
    ...Shadows.card,
  },
  patternDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    marginTop: 7,
    flexShrink: 0,
  },
  patternText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  patternEmptyText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // Timeline
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
    paddingTop: 4,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  timelineDotReached: {
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
  },
  timelineLine: {
    width: 2,
    height: 38,
    backgroundColor: Colors.borderLight,
    marginTop: 2,
  },
  timelineLineReached: {
    backgroundColor: Colors.accentDim,
  },
  timelineDotNext: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: `${Colors.gold}55`,
    backgroundColor: Colors.background,
    opacity: 0.70,
  },
  timelineDotFar: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    opacity: 0.42,
  },
  timelineDotContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotLatestGlow: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.gold,
  },
  timelineRight: {
    flex: 1,
    paddingLeft: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  timelineDay: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  timelineDayReached: {
    color: Colors.gold,
  },
  timelineText: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  timelineTextReached: {
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  timelineTextLocked: {
    color: Colors.textMuted,
    opacity: 0.62,
  },
  timelineDayFar: {
    opacity: 0.50,
  },
  timelineTextFar: {
    opacity: 0.48,
  },

  // Summary
  summaryCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  summaryItem: {
    width: '45%',
  },
  summaryValue: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.3,
  },

  bottomPadding: {
    height: Spacing.xxl,
  },

  // Private space card
  spaceCard: {
    marginBottom: Spacing.xl,
  },
  spaceTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  spacePrompt: {
    fontSize: Typography.sizes.sm,
    color: Colors.gold,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: Spacing.base,
    letterSpacing: 0.2,
  },
  spaceInputWrap: {
    borderWidth: 1,
    borderRadius: Radii.lg,
  },
  spaceInput: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    lineHeight: 22,
    minHeight: 130,
    maxHeight: 200,
  },
  spaceActions: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: Spacing.md,
    marginTop: Spacing.base,
  },
  spaceActionKeep: {
    fontSize: Typography.sizes.sm,
    color: Colors.gold,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
  spaceActionDivider: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    opacity: 0.5,
  },
  spaceActionRelease: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic' as const,
  },
  spaceSaved: {
    alignSelf: 'flex-end' as const,
    marginTop: Spacing.sm,
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    fontStyle: 'italic' as const,
    letterSpacing: 0.3,
  },

  // Weekly recap card
  weekRecapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  weekRecapSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  weekRecapItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  weekRecapDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    marginTop: 8,
    flexShrink: 0,
  },
  weekRecapText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    lineHeight: 22,
  },

  // Your History section nav cards
  historyNavCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  historyNavCardWarm: {
    backgroundColor: `${Colors.gold}0A`,
  },
  historyNavIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.gold}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyNavText: {
    flex: 1,
    gap: 4,
  },
  historyNavTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '400' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.1,
  },
  historyNavSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic' as const,
    lineHeight: 17,
  },
  historyNavSubData: {
    color: Colors.textSecondary,
    fontStyle: 'normal' as const,
  },

  // Weekly Recap — same surface token as Quiet Reflections (Colors.card)
  weeklyRecapCard: {
    backgroundColor: Colors.card,
    shadowColor: Colors.gold,
    shadowOpacity: 0.14,
    borderColor: `${Colors.gold}28`,
  },
  weeklyRecapIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: `${Colors.gold}18`,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  weeklyRecapTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  weeklyBadge: {
    backgroundColor: `${Colors.gold}16`,
    borderRadius: Radii.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  weeklyBadgeText: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: Colors.gold,
    letterSpacing: 0.5,
  },

  // Quiet Reflections — secondary card (ivory surface, standard shadow)
  quietRefNavCard: {
    marginTop: Spacing.sm,
    borderColor: `${Colors.gold}18`,
  },
  quietRefNavIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: `${Colors.gold}12`,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  quietRefNavTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '500' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.1,
  },

  // Quiet reflections card
  quietRefHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  quietRefSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  quietRefSeeAll: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 0.4,
  },
  quietRefCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  quietRefEmpty: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  quietRefEntry: {
    paddingVertical: Spacing.md,
  },
  quietRefEntryBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  quietRefDate: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  quietRefPrompt: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 4,
    lineHeight: 16,
  },
  quietRefText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
  },

  // Quiet Milestone Card
  quietMilestone: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  quietMilestoneLine: {
    width: 24,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gold,
    opacity: 0.35,
  },
  quietMilestoneLine1: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    letterSpacing: 0.3,
    textAlign: 'center',
    lineHeight: 22,
  },
  quietMilestoneLine2: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.6,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Summary empty value
  summaryValueEmpty: {
    color: Colors.textMuted,
    fontWeight: Typography.weights.regular,
  },
});

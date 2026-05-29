import { useRef, useEffect, useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useProgress } from '../hooks/useProgress';
import { useHabits } from '../hooks/useHabits';
import { useLanguage } from '../hooks/useLanguage';
import { useWeeklyRecap } from '../hooks/useWeeklyRecap';
import { getFutureReflectionPrompt, getFutureIdentityPhase } from '../utils/futureSelf';
import CommunityInsightCard from '../components/CommunityInsightCard';
import { MoodBadge } from '../components/ui/MoodBadge';
import { getInsightForContext } from '../utils/socialProof';
import { maybeRequestReviewAfterRecap } from '../utils/reviewRequest';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { getWeekEntries, DailyEntry } from '../utils/dailyEntries';
import {
  WeeklyRecapData,
  getWeeklyNarrative,
  getEmotionalMetrics,
  getWeeklyHighlights,
  getWeeklyFutureMomentum,
  getCelebrationLevel,
  CelebrationLevel,
} from '../utils/weeklyRecap';

const { width } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Animated SVG Ring ────────────────────────────────────────────────────────
function RecapRing({ pct, size = 140, stroke = 12 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: pct,
      duration: 1400,
      delay: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [pct]);

  const offset = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [circ, 0],
    extrapolate: 'clamp',
  });

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} fill="none"
      />
      <AnimatedCircle
        cx={size / 2} cy={size / 2} r={r}
        stroke={Colors.accent} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

// ─── Staggered fade-in ────────────────────────────────────────────────────────
function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0, duration: 500, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>{children}</Animated.View>;
}

// ─── Golden glow overlay (exceptional weeks) ──────────────────────────────────
function GoldenGlow({ level }: { level: CelebrationLevel }) {
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (level === 'none') return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.4, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, [level]);

  if (level === 'none') return null;

  const opacity = level === 'exceptional' ? 0.18 : level === 'strong' ? 0.11 : 0.07;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0, opacity] }) },
      ]}
    >
      <LinearGradient
        colors={['transparent', Colors.accent, 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function WeeklyRecapScreen() {
  const router = useRouter();
  const { week: weekParam } = useLocalSearchParams<{ week?: string }>();
  const isHistorical = !!weekParam;

  const { progress, weeklyScore, loading: progressLoading } = useProgress();
  const { habitLog, habits, loading: habitsLoading } = useHabits();
  const { t, lang } = useLanguage();
  const { generateAndSave, generateCurrentWeekPreview, dismissAutoTrigger, getRecapForWeek, loading: recapLoading } =
    useWeeklyRecap(progress, weeklyScore, habitLog, habits.length);

  const [recap, setRecap] = useState<WeeklyRecapData | null>(null);
  const [weekEntries, setWeekEntries] = useState<DailyEntry[]>([]);
  const dataLoading = progressLoading || habitsLoading || recapLoading;

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);
    const startDate = monday.toISOString().split('T')[0];
    getWeekEntries(startDate).then(setWeekEntries);
  }, []);

  // Resolve which recap to display
  useEffect(() => {
    if (dataLoading) return;

    if (isHistorical && weekParam) {
      const stored = getRecapForWeek(parseInt(weekParam, 10));
      if (stored) {
        setRecap(stored);
        return;
      }
    }

    // Auto-triggered: generate & save last week's recap
    generateAndSave().then(setRecap);
  }, [dataLoading, isHistorical, weekParam]);

  const handleClose = useCallback(async () => {
    if (!isHistorical) {
      await dismissAutoTrigger();
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }, [isHistorical, dismissAutoTrigger, router]);

  const handleReady = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Request review after a strong week — feels earned, not engineered
    if (recap) {
      maybeRequestReviewAfterRecap(recap.resetsCompleted, recap.totalDaysCompleted);
    }

    handleClose();
  }, [handleClose, recap]);

  if (!recap) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('recap.loading')}</Text>
      </View>
    );
  }

  // ── Compute all display values ──────────────────────────────────────────────
  const narrative        = getWeeklyNarrative(recap.narrativeState, recap.resetsCompleted);
  const metrics          = getEmotionalMetrics(recap.resetsCompleted, recap.streakAtEnd, recap.weekNumber);
  const highlights       = getWeeklyHighlights(recap.resetsCompleted, recap.streakAtEnd, recap.weeklyHabitRate, recap.weekNumber);
  const futureMomentum   = getWeeklyFutureMomentum(recap.narrativeState);
  const celebration      = getCelebrationLevel(recap.resetsCompleted, recap.streakAtEnd);
  const ringPct          = Math.round((recap.resetsCompleted / 7) * 100);
  const reflectionPrompt = getFutureReflectionPrompt(recap.streakAtEnd, recap.totalDaysCompleted);
  const futurePhase      = getFutureIdentityPhase(recap.streakAtEnd, recap.totalDaysCompleted);
  const recapInsight     = getInsightForContext('recap', recap.weekNumber, lang);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── DARK IMMERSIVE HEADER ──────────────────────────────────────────── */}
      <View style={styles.header}>
        <GoldenGlow level={celebration} />

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={handleClose} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        {/* Eyebrow */}
        <FadeIn delay={0}>
          <Text style={styles.headerEyebrow}>{t('recap.eyebrow')}</Text>
        </FadeIn>

        {/* Ring + Week number */}
        <FadeIn delay={100}>
          <View style={styles.headerRingRow}>
            <View style={styles.headerRingWrap}>
              <RecapRing pct={ringPct} />
              <View style={styles.ringCenter}>
                <Text style={styles.ringNumber}>{recap.resetsCompleted}</Text>
                <Text style={styles.ringDenom}>/7</Text>
              </View>
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerWeekLabel}>{t('recap.week.label')} {recap.weekNumber}</Text>
              <Text style={styles.headerDateLabel}>{recap.dateLabel}</Text>
              {celebration !== 'none' && (
                <View style={styles.celebrationPill}>
                  <Ionicons name="star" size={10} color={Colors.charcoal} />
                  <Text style={styles.celebrationPillText}>
                    {celebration === 'exceptional' ? t('recap.cel.outstanding') : celebration === 'strong' ? t('recap.cel.strong') : t('recap.cel.good')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </FadeIn>

        {/* Headline copy */}
        <FadeIn delay={220}>
          <Text style={styles.headerHeadline}>{narrative.headline}</Text>
        </FadeIn>
      </View>

      {/* ── SCROLLABLE BODY ────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1 ── NARRATIVE CARD */}
        <FadeIn delay={320}>
          <View style={styles.narrativeCard}>
            <View style={styles.narrativeAccentBar} />
            <Text style={styles.narrativeBody}>{narrative.body}</Text>
            <View style={styles.narrativeDivider} />
            <Text style={styles.narrativeSubtext}>{narrative.subtext}</Text>
          </View>
        </FadeIn>

        {/* 2 ── EMOTIONAL METRICS */}
        <FadeIn delay={420}>
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>{t('recap.section.focus')}</Text>
            <View style={styles.metricsRow}>
              {metrics.map((m, i) => (
                <View key={i} style={[styles.metricCard, i === 0 && styles.metricCardPrimary]}>
                  <Ionicons
                    name={m.icon as any}
                    size={18}
                    color={i === 0 ? Colors.charcoal : Colors.gold}
                  />
                  <Text style={[styles.metricEmotional, i === 0 && styles.metricEmotionalPrimary]}>
                    {m.emotional}
                  </Text>
                  <Text style={[styles.metricRaw, i === 0 && styles.metricRawPrimary]}>
                    {m.raw}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* 3 ── HIGHLIGHTS */}
        <FadeIn delay={520}>
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>{t('recap.section.highlights')}</Text>
            <View style={styles.highlightsCard}>
              {highlights.map((h, i) => (
                <View key={i}>
                  {i > 0 && <View style={styles.highlightDivider} />}
                  <View style={styles.highlightRow}>
                    <View style={styles.highlightIconWrap}>
                      <Ionicons name={h.icon as any} size={16} color={Colors.gold} />
                    </View>
                    <View style={styles.highlightTextWrap}>
                      <Text style={styles.highlightEmotional}>{h.emotional}</Text>
                      <Text style={styles.highlightLabel}>{h.label} · {h.value}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* Daily entries — mood, action, reflection per day */}
        {weekEntries.length > 0 && (
          <FadeIn delay={560}>
            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>
                {lang === 'de' ? 'EINTRÄGE DIESER WOCHE' : lang === 'es' ? 'REGISTROS DE LA SEMANA' : lang === 'pt' ? 'REGISTROS DA SEMANA' : "THIS WEEK'S ENTRIES"}
              </Text>
              {weekEntries.map((entry) => {
                const dateObj = new Date(entry.date + 'T12:00:00');
                const formattedDate = lang === 'de'
                  ? dateObj.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
                  : lang === 'pt'
                  ? dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
                  : lang === 'es'
                  ? dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
                  : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                return (
                  <View key={entry.date} style={{
                    backgroundColor: Colors.card,
                    borderRadius: Radii.lg,
                    padding: Spacing.base,
                    marginBottom: Spacing.md,
                    borderWidth: 1,
                    borderColor: Colors.borderLight,
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                      <Text style={{ fontWeight: '700', fontSize: 15, color: Colors.textPrimary }}>
                        {lang === 'de' ? `Tag ${entry.day}` : lang === 'es' ? `Día ${entry.day}` : lang === 'pt' ? `Dia ${entry.day}` : `Day ${entry.day}`} — {formattedDate}
                      </Text>
                      {entry.completed && (
                        <Text style={{ color: Colors.gold, fontSize: 12 }}>
                          {lang === 'de' ? '✓ Abgeschlossen' : lang === 'es' ? '✓ Completado' : lang === 'pt' ? '✓ Concluído' : '✓ Completed'}
                        </Text>
                      )}
                    </View>
                    {entry.mood && (
                      <View style={{ marginTop: Spacing.xs }}>
                        <MoodBadge mood={entry.mood} />
                      </View>
                    )}
                    {!!entry.action_response && (
                      <Text numberOfLines={2} style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 6, fontStyle: 'italic' }}>
                        "{entry.action_response}"
                      </Text>
                    )}
                    {!!entry.reflection_response && (
                      <Text numberOfLines={2} style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 4, fontStyle: 'italic' }}>
                        "{entry.reflection_response}"
                      </Text>
                    )}
                  </View>
                );
              })}
              {/* Weekly summary */}
              {(() => {
                const completed = weekEntries.filter(e => e.completed).length;
                const moods = weekEntries.map(e => e.mood).filter(Boolean);
                const moodCounts = moods.reduce<Record<string, number>>((acc, m) => {
                  if (m) acc[m] = (acc[m] ?? 0) + 1;
                  return acc;
                }, {});
                const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
                const bestReflection = weekEntries.find(e => !!e.reflection_response)?.reflection_response;
                return (
                  <View style={{ backgroundColor: Colors.backgroundSecondary, borderRadius: Radii.md, padding: Spacing.base, gap: Spacing.xs }}>
                    <Text style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 1.5 }}>
                      {lang === 'es' ? 'RESUMEN DE LA SEMANA' : lang === 'pt' ? 'RESUMO DA SEMANA' : lang === 'de' ? 'WOCHENZUSAMMENFASSUNG' : 'WEEK SUMMARY'}
                    </Text>
                    <Text style={{ fontSize: Typography.sizes.sm, color: Colors.textSecondary }}>
                      {lang === 'es' ? `Días completados: ${completed}/${weekEntries.length}` : lang === 'pt' ? `Dias concluídos: ${completed}/${weekEntries.length}` : lang === 'de' ? `Abgeschlossene Tage: ${completed}/${weekEntries.length}` : `Days completed: ${completed}/${weekEntries.length}`}
                    </Text>
                    {topMood && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
                        <Text style={{ fontSize: Typography.sizes.sm, color: Colors.textSecondary }}>
                          {lang === 'es' ? 'Estado más frecuente:' : lang === 'pt' ? 'Estado mais frequente:' : lang === 'de' ? 'Häufigste Stimmung:' : 'Most common mood:'}
                        </Text>
                        <MoodBadge mood={topMood as 'hard' | 'okay' | 'good'} />
                      </View>
                    )}
                    {bestReflection && (
                      <Text numberOfLines={3} style={{ fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontStyle: 'italic', marginTop: 4 }}>
                        {lang === 'es' ? 'Un momento para reflexionar:' : lang === 'pt' ? 'Um momento para refletir:' : lang === 'de' ? 'Ein Moment zum Reflektieren:' : 'A moment to reflect:'} "{bestReflection}"
                      </Text>
                    )}
                  </View>
                );
              })()}
            </View>
          </FadeIn>
        )}

        {/* Community insight — subtle normalization in recap */}
        <FadeIn delay={580}>
          <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.md }}>
            <CommunityInsightCard insight={recapInsight} variant="subtle" />
          </View>
        </FadeIn>

        {/* 4 ── HABIT RHYTHM (if data available) */}
        {recap.weeklyHabitRate > 0 && (
          <FadeIn delay={600}>
            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>{t('recap.section.habits')}</Text>
              <View style={styles.habitCard}>
                <View style={styles.habitBar}>
                  <View
                    style={[
                      styles.habitBarFill,
                      { width: `${Math.max(recap.weeklyHabitRate, 2)}%` as any },
                    ]}
                  />
                </View>
                <Text style={styles.habitRate}>{recap.weeklyHabitRate}%</Text>
                <Text style={styles.habitEmotional}>
                  {recap.weeklyHabitRate >= 70
                    ? t('recap.habit.automatic')
                    : recap.weeklyHabitRate >= 40
                    ? t('recap.habit.growing')
                    : t('recap.habit.small')}
                </Text>
              </View>
            </View>
          </FadeIn>
        )}

        {/* 5 ── REFLECTION PROMPT */}
        <FadeIn delay={650}>
          <View style={styles.reflectionSection}>
            <Text style={styles.reflectionEyebrow}>{t('recap.section.reflection')}</Text>
            <Text style={styles.reflectionQuestion}>{reflectionPrompt}</Text>
            <View style={styles.reflectionPhaseRow}>
              <View style={styles.reflectionPhasePill}>
                <Text style={styles.reflectionPhaseText}>{futurePhase.label.toUpperCase()}</Text>
              </View>
              <Text style={styles.reflectionPhaseMessage}>{futurePhase.message}</Text>
            </View>
          </View>
        </FadeIn>

        {/* 6 ── FUTURE MOMENTUM */}
        <FadeIn delay={680}>
          <View style={styles.momentumSection}>
            {futureMomentum.map((line, i) => (
              <Text
                key={i}
                style={[
                  styles.momentumLine,
                  i === 0 && styles.momentumLineFirst,
                  i === futureMomentum.length - 1 && styles.momentumLineLast,
                ]}
              >
                {line}
              </Text>
            ))}
          </View>
        </FadeIn>

        {/* 6 ── CTA BUTTON */}
        <FadeIn delay={800}>
          <View style={styles.ctaSection}>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={handleReady}
              activeOpacity={0.82}
            >
              <Text style={styles.ctaText}>
                {isHistorical ? t('recap.cta.close') : t('recap.cta.ready')}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.charcoal} />
            </TouchableOpacity>

            {!isHistorical && (
              <TouchableOpacity onPress={handleClose} style={styles.skipBtn} activeOpacity={0.6}>
                <Text style={styles.skipText}>{t('recap.cta.close')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </FadeIn>

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  loadingContainer: {
    flex: 1, backgroundColor: Colors.charcoal,
    alignItems: 'center', justifyContent: 'center',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.5)', fontSize: Typography.sizes.sm,
    fontStyle: 'italic',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: Colors.charcoal,
    paddingTop: 56,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: Spacing.lg,
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 10,
  },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  headerRingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  headerRingWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ringNumber: {
    fontSize: 38,
    fontWeight: Typography.weights.black,
    color: Colors.white,
    letterSpacing: -1,
  },
  ringDenom: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(255,255,255,0.45)',
    marginLeft: 1,
  },
  headerTextCol: {
    flex: 1,
    gap: Spacing.xs,
  },
  headerWeekLabel: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.black,
    color: Colors.white,
    letterSpacing: -1,
    lineHeight: 40,
  },
  headerDateLabel: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.3,
  },
  celebrationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },
  celebrationPillText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
    letterSpacing: 0.5,
  },
  headerHeadline: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255,255,255,0.65)',
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: Spacing.sm,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: { paddingTop: Spacing.xl },

  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  sectionEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },

  // ── Narrative Card ────────────────────────────────────────────────────────────
  narrativeCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.cardStrong,
  },
  narrativeAccentBar: {
    width: 32,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    marginBottom: Spacing.base,
  },
  narrativeBody: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: Spacing.base,
  },
  narrativeDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginBottom: Spacing.base,
  },
  narrativeSubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // ── Metrics ───────────────────────────────────────────────────────────────────
  metricsRow: {
    gap: Spacing.md,
  },
  metricCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.card,
  },
  metricCardPrimary: {
    backgroundColor: Colors.charcoal,
    borderColor: Colors.charcoal,
  },
  metricEmotional: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  metricEmotionalPrimary: {
    color: Colors.white,
  },
  metricRaw: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  metricRawPrimary: {
    color: 'rgba(255,255,255,0.45)',
  },

  // ── Highlights ─────────────────────────────────────────────────────────────────
  highlightsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  highlightIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  highlightTextWrap: {
    flex: 1,
    gap: 2,
  },
  highlightEmotional: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  highlightLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  highlightDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginLeft: 46,
  },

  // ── Habit Card ─────────────────────────────────────────────────────────────────
  habitCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.sm,
    ...Shadows.card,
  },
  habitBar: {
    height: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    overflow: 'hidden',
  },
  habitBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
  },
  habitRate: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  habitEmotional: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // ── Future Momentum ────────────────────────────────────────────────────────────
  // ── Reflection Section ────────────────────────────────────────────────────────
  reflectionSection: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.md,
    ...Shadows.card,
  },
  reflectionEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  reflectionQuestion: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 26,
  },
  reflectionPhaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    flexWrap: 'wrap',
  },
  reflectionPhasePill: {
    backgroundColor: Colors.accentDim,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  reflectionPhaseText: {
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.5,
  },
  reflectionPhaseMessage: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    flex: 1,
  },

  momentumSection: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  momentumLine: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  momentumLineFirst: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
  momentumLineLast: {
    color: Colors.gold,
    fontStyle: 'normal',
    fontWeight: Typography.weights.bold,
    letterSpacing: 1,
    fontSize: Typography.sizes.xs,
    textTransform: 'uppercase',
  },

  // ── CTA ────────────────────────────────────────────────────────────────────────
  ctaSection: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadows.accent,
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
    letterSpacing: 0.2,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },

  bottomPad: { height: Spacing.xxl },
});

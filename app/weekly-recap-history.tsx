import { useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useProgress } from '../hooks/useProgress';
import { useHabits } from '../hooks/useHabits';
import { useWeeklyRecap } from '../hooks/useWeeklyRecap';
import { useLanguage } from '../hooks/useLanguage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import {
  WeeklyRecapData,
  getCelebrationLevel,
  getWeeklyNarrative,
} from '../utils/weeklyRecap';

// ─── Staggered fade-in ────────────────────────────────────────────────────────
function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(14)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(ty,      { toValue: 0, duration: 400, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>{children}</Animated.View>;
}

// ─── Insight generators (locale-aware) ───────────────────────────────────────

function useWeekInsight(weeklyScore: number, streak: number) {
  const { t } = useLanguage();
  if (weeklyScore === 7) return t('recap.insight.sevenForSeven');
  if (weeklyScore >= 5) return t('recap.insight.showedUpN', { n: weeklyScore });
  if (weeklyScore >= 3) return t('recap.insight.nResets', { n: weeklyScore });
  if (weeklyScore === 2) return t('recap.insight.twoReturns');
  if (weeklyScore === 1) return streak > 0 ? t('recap.insight.cameBackStreak') : t('recap.insight.cameBack');
  return t('recap.insight.stillYours');
}

function useWeekSubInsight(weeklyScore: number, streak: number, totalDays: number) {
  const { t } = useLanguage();
  if (weeklyScore === 7) return t('recap.subinsight.remarkable');
  if (weeklyScore >= 5) return t('recap.subinsight.strong');
  if (streak >= 7) return t('recap.subinsight.streakHolding');
  if (streak >= 3 && weeklyScore >= 2) return t('recap.subinsight.repetition');
  if (totalDays >= 1 && weeklyScore >= 1) return t('recap.subinsight.eachReset');
  return null;
}

// ─── Current week preview card ────────────────────────────────────────────────

function CurrentWeekCard({ weeklyScore, streak, totalDays }: {
  weeklyScore: number;
  streak: number;
  totalDays: number;
}) {
  const { t } = useLanguage();
  const ringPct  = weeklyScore / 7;
  const insight  = useWeekInsight(weeklyScore, streak);
  const subline  = useWeekSubInsight(weeklyScore, streak, totalDays);

  return (
    <FadeIn delay={80}>
      <View style={styles.currentWeekCard}>
        <View style={styles.currentWeekEyebrowRow}>
          <View style={styles.currentWeekLiveDot} />
          <Text style={styles.currentWeekEyebrow}>{t('recap.history.current.eyebrow')}</Text>
        </View>

        {/* Progress row */}
        <View style={styles.currentWeekBody}>
          <View style={styles.currentWeekTextWrap}>
            <Text style={styles.currentWeekInsight}>{insight}</Text>
            {subline && (
              <Text style={styles.currentWeekSub}>{subline}</Text>
            )}
          </View>

          {/* Mini progress bar */}
          <View style={styles.currentWeekRingWrap}>
            <View style={styles.currentWeekRingTrack}>
              <View style={[styles.currentWeekRingFill, { width: `${Math.max(ringPct * 100, weeklyScore > 0 ? 8 : 0)}%` as any }]} />
            </View>
            <Text style={styles.currentWeekRingText}>{weeklyScore}/7</Text>
          </View>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Narrative state accent color ─────────────────────────────────────────────
function narrativeAccentColor(state: WeeklyRecapData['narrativeState']): string {
  switch (state) {
    case 'breakthrough':      return Colors.accent;
    case 'high_consistency':  return Colors.success;
    case 'first_week':        return Colors.gold;
    case 'momentum':          return '#4A90D9';
    case 'comeback':          return Colors.streak;
    default:                  return Colors.border;
  }
}

// ─── Single recap card ────────────────────────────────────────────────────────
function RecapCard({ recap, index, onPress }: {
  recap: WeeklyRecapData;
  index: number;
  onPress: () => void;
}) {
  const { t } = useLanguage();
  const celebration = getCelebrationLevel(recap.resetsCompleted, recap.streakAtEnd);
  const narrative   = getWeeklyNarrative(recap.narrativeState, recap.resetsCompleted);
  const accent      = narrativeAccentColor(recap.narrativeState);
  const ringPct     = recap.resetsCompleted / 7;

  return (
    <FadeIn delay={index * 80}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }}
        activeOpacity={0.82}
      >
        <View style={[styles.cardAccentBar, { backgroundColor: accent }]} />
        <View style={styles.cardBody}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardWeekLabel}>{t('recap.week.label')} {recap.weekNumber}</Text>
              <Text style={styles.cardDateLabel}>{recap.dateLabel}</Text>
            </View>
            <View style={styles.miniRingWrap}>
              <View style={styles.miniRingOuter}>
                <View style={[styles.miniRingFill, { width: `${ringPct * 100}%` as any, backgroundColor: accent }]} />
              </View>
              <Text style={styles.miniRingText}>{recap.resetsCompleted}/7</Text>
            </View>
          </View>
          <Text style={styles.cardHeadline} numberOfLines={2}>{narrative.headline}</Text>
          {celebration !== 'none' && (
            <View style={[styles.celebrationPill, { backgroundColor: `${accent}22`, borderColor: `${accent}55` }]}>
              <Ionicons name="star" size={9} color={accent} />
              <Text style={[styles.celebrationText, { color: accent }]}>
                {celebration === 'exceptional' ? t('recap.cel.outstanding') : celebration === 'strong' ? t('recap.cel.strong') : t('recap.cel.good')}
              </Text>
            </View>
          )}
          <View style={styles.cardFooter}>
            {recap.streakAtEnd > 0 && (
              <View style={styles.statChip}>
                <Ionicons name="flame" size={11} color={Colors.streak} />
                <Text style={styles.statChipText}>{recap.streakAtEnd} {t('recap.card.streakLabel')}</Text>
              </View>
            )}
            {recap.weeklyHabitRate > 0 && (
              <View style={styles.statChip}>
                <Ionicons name="checkmark-circle" size={11} color={Colors.success} />
                <Text style={styles.statChipText}>{recap.weeklyHabitRate}{t('recap.card.habitsLabel')}</Text>
              </View>
            )}
            <View style={styles.cardChevron}>
              <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
}

// ─── Empty state (zero activity) ──────────────────────────────────────────────
function EmptyState() {
  const { t } = useLanguage();
  return (
    <FadeIn delay={200}>
      <View style={styles.emptyWrap}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="calendar-outline" size={36} color={Colors.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>{t('recap.history.empty.title')}</Text>
        <Text style={styles.emptyText}>{t('recap.history.empty.text')}</Text>
      </View>
    </FadeIn>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function WeeklyRecapHistoryScreen() {
  const router = useRouter();
  const { progress, weeklyScore } = useProgress();
  const { habitLog, habits }      = useHabits();
  const { recaps } = useWeeklyRecap(progress, weeklyScore, habitLog, habits.length);

  const handleBack = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }, [router]);

  const handleViewRecap = useCallback((weekNumber: number) => {
    router.push({ pathname: '/weekly-recap', params: { week: String(weekNumber) } });
  }, [router]);

  const { t } = useLanguage();
  const sortedRecaps  = [...recaps].sort((a, b) => b.weekNumber - a.weekNumber);
  const hasAnyData    = weeklyScore > 0 || progress.completedDays.length > 0;
  const totalDays     = progress.completedDays.length;

  return (
    <View style={styles.root}>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <FadeIn delay={0}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerEyebrow}>{t('recap.history.eyebrow')}</Text>
            <Text style={styles.headerTitle}>{t('recap.history.title')}</Text>
            <Text style={styles.headerSub}>
              {recaps.length === 0
                ? hasAnyData ? t('recap.history.sub.nodata') : t('recap.history.sub.building')
                : t('recap.history.sub.count', { n: recaps.length, s: recaps.length !== 1 ? 's' : '' })}
            </Text>
          </View>
        </FadeIn>
      </View>

      {/* ── LIST ────────────────────────────────────────────────────────────── */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>

        {/* Current week preview — always shown if there's any activity */}
        {hasAnyData && (
          <CurrentWeekCard
            weeklyScore={weeklyScore}
            streak={progress.streak}
            totalDays={totalDays}
          />
        )}

        {sortedRecaps.length === 0 ? (
          !hasAnyData ? <EmptyState /> : (
            <FadeIn delay={180}>
              <View style={styles.comingSoonWrap}>
                <Text style={styles.comingSoonTitle}>{t('recap.history.coming.title')}</Text>
                <Text style={styles.comingSoonSub}>{t('recap.history.coming.sub')}</Text>
              </View>
            </FadeIn>
          )
        ) : (
          <>
            {/* Journey summary */}
            <FadeIn delay={60}>
              <View style={styles.journeySummary}>
                <View style={styles.journeySummaryItem}>
                  <Text style={styles.journeySummaryValue}>{recaps.length}</Text>
                  <Text style={styles.journeySummaryLabel}>{t('recap.history.sum.weeks')}</Text>
                </View>
                <View style={styles.journeySummaryDivider} />
                <View style={styles.journeySummaryItem}>
                  <Text style={styles.journeySummaryValue}>
                    {recaps.reduce((acc, r) => acc + r.resetsCompleted, 0)}
                  </Text>
                  <Text style={styles.journeySummaryLabel}>{t('recap.history.sum.resets')}</Text>
                </View>
                <View style={styles.journeySummaryDivider} />
                <View style={styles.journeySummaryItem}>
                  <Text style={styles.journeySummaryValue}>
                    {Math.max(...recaps.map(r => r.streakAtEnd), 0)}
                  </Text>
                  <Text style={styles.journeySummaryLabel}>{t('recap.history.sum.streak')}</Text>
                </View>
              </View>
            </FadeIn>

            {sortedRecaps.map((recap, i) => (
              <RecapCard
                key={recap.weekNumber}
                recap={recap}
                index={i}
                onPress={() => handleViewRecap(recap.weekNumber)}
              />
            ))}

            <FadeIn delay={sortedRecaps.length * 80 + 100}>
              <Text style={styles.bottomQuote}>{t('recap.history.quote')}</Text>
            </FadeIn>
          </>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingTop: 56, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.xl,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  backBtn: {
    position: 'absolute', top: 56, left: Spacing.lg,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },
  headerTextBlock: { paddingHorizontal: 44 },
  headerEyebrow: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 2, marginBottom: Spacing.xs, textAlign: 'center' },
  headerTitle: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -0.5, textAlign: 'center', marginBottom: Spacing.xs },
  headerSub: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic' },

  // ── List ─────────────────────────────────────────────────────────────────────
  listContent: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },

  // ── Current week preview card ─────────────────────────────────────────────────
  currentWeekCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    gap: Spacing.md,
  },
  currentWeekEyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  currentWeekLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent },
  currentWeekEyebrow: { fontSize: 9, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 2 },
  currentWeekBody: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  currentWeekTextWrap: { flex: 1, gap: 4 },
  currentWeekInsight: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textPrimary, lineHeight: 20 },
  currentWeekSub: { fontSize: Typography.sizes.xs, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 17 },
  currentWeekRingWrap: { alignItems: 'flex-end', gap: 4, minWidth: 60 },
  currentWeekRingTrack: { height: 4, width: 60, backgroundColor: Colors.backgroundSecondary, borderRadius: Radii.full, overflow: 'hidden' },
  currentWeekRingFill: { height: '100%', backgroundColor: Colors.accent, borderRadius: Radii.full },
  currentWeekRingText: { fontSize: 10, fontWeight: Typography.weights.bold, color: Colors.textMuted },

  // ── Coming soon (has data but no full week) ───────────────────────────────────
  comingSoonWrap: {
    alignItems: 'center', paddingVertical: Spacing.xl,
    gap: Spacing.sm, paddingHorizontal: Spacing.lg,
  },
  comingSoonTitle: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textSecondary, textAlign: 'center' },
  comingSoonSub: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', lineHeight: 20, fontStyle: 'italic' },

  // ── Journey summary ───────────────────────────────────────────────────────────
  journeySummary: {
    backgroundColor: Colors.charcoal, borderRadius: Radii.xl, padding: Spacing.lg,
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl, ...Shadows.charcoal,
  },
  journeySummaryItem: { flex: 1, alignItems: 'center' },
  journeySummaryValue: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.black, color: Colors.white, letterSpacing: -0.5 },
  journeySummaryLabel: { fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },
  journeySummaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' },

  // ── Recap card ────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: Colors.card, borderRadius: Radii.xl, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.borderLight, flexDirection: 'row', overflow: 'hidden', ...Shadows.card,
  },
  cardAccentBar: { width: 4, borderTopLeftRadius: Radii.xl, borderBottomLeftRadius: Radii.xl },
  cardBody: { flex: 1, padding: Spacing.base, gap: Spacing.sm },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardHeaderLeft: { flex: 1, gap: 2 },
  cardWeekLabel: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -0.3 },
  cardDateLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  miniRingWrap: { alignItems: 'flex-end', gap: 4 },
  miniRingOuter: { width: 60, height: 5, backgroundColor: Colors.backgroundSecondary, borderRadius: Radii.full, overflow: 'hidden' },
  miniRingFill: { height: '100%', borderRadius: Radii.full },
  miniRingText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.textSecondary },
  cardHeadline: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 20 },
  celebrationPill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: Radii.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', borderWidth: 1 },
  celebrationText: { fontSize: 10, fontWeight: Typography.weights.bold, letterSpacing: 0.3 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 2 },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.backgroundSecondary, borderRadius: Radii.full, paddingHorizontal: Spacing.sm, paddingVertical: 3 },
  statChipText: { fontSize: 10, color: Colors.textSecondary, fontWeight: Typography.weights.medium },
  cardChevron: { marginLeft: 'auto' as any },

  // ── Empty state ────────────────────────────────────────────────────────────────
  emptyWrap: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.md },
  emptyIconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  emptyTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textSecondary, textAlign: 'center' },
  emptyText: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, fontStyle: 'italic' },

  // ── Bottom ─────────────────────────────────────────────────────────────────────
  bottomQuote: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic', paddingVertical: Spacing.xl, lineHeight: 20 },
  bottomPad: { height: Spacing.xl },
});

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

// ─── Current week preview card ────────────────────────────────────────────────

function currentWeekLine(n: number, lang: string): string {
  if (n === 0) {
    if (lang === 'pt') return 'A semana ainda está se formando.';
    if (lang === 'es') return 'La semana aún está tomando forma.';
    if (lang === 'fr') return 'La semaine prend encore forme.';
    if (lang === 'de') return 'Die Woche nimmt noch Form an.';
    return 'The week is still taking shape.';
  }
  if (n === 1) {
    if (lang === 'pt') return 'Um retorno até agora.';
    if (lang === 'es') return 'Un regreso hasta ahora.';
    if (lang === 'fr') return 'Un retour jusqu\'ici.';
    if (lang === 'de') return 'Eine Rückkehr bisher.';
    return 'One return so far.';
  }
  if (lang === 'pt') return `${n} retornos até agora.`;
  if (lang === 'es') return `${n} regresos hasta ahora.`;
  if (lang === 'fr') return `${n} retours jusqu'ici.`;
  if (lang === 'de') return `${n} Rückkehren bisher.`;
  return `${n} returns so far.`;
}

function CurrentWeekCard({ weeklyScore }: { weeklyScore: number }) {
  const { t, lang } = useLanguage();
  const ringPct = weeklyScore / 7;
  const line    = currentWeekLine(weeklyScore, lang);

  return (
    <FadeIn delay={80}>
      <View style={styles.currentWeekCard}>
        <View style={styles.currentWeekEyebrowRow}>
          <View style={styles.currentWeekLiveDot} />
          <Text style={styles.currentWeekEyebrow}>{t('recap.history.current.eyebrow')}</Text>
        </View>
        <View style={styles.currentWeekBody}>
          <Text style={styles.currentWeekInsight}>{line}</Text>
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
    case 'breakthrough':      return Colors.gold;
    case 'high_consistency':  return Colors.success;
    case 'first_week':        return Colors.gold;
    case 'momentum':          return '#4A90D9';
    case 'comeback':          return Colors.streak;
    default:                  return Colors.border;
  }
}

// Calm week descriptor based on narrative state — no achievement language
function weekDescriptor(state: WeeklyRecapData['narrativeState'], lang: string): string | null {
  const map: Record<WeeklyRecapData['narrativeState'], Record<string, string>> = {
    breakthrough:     { en: 'A full week', pt: 'Uma semana completa', es: 'Una semana completa', fr: 'Une semaine complète', de: 'Eine volle Woche' },
    high_consistency: { en: 'Steady presence', pt: 'Presença constante', es: 'Presencia constante', fr: 'Présence constante', de: 'Beständige Präsenz' },
    momentum:         { en: 'You kept returning', pt: 'Você continuou voltando', es: 'Seguiste volviendo', fr: 'Tu as continué à revenir', de: 'Du bist zurückgekehrt' },
    comeback:         { en: 'Finding your way back', pt: 'Encontrando seu caminho', es: 'Encontrando tu camino', fr: 'Retrouvant ton chemin', de: 'Deinen Weg zurückfinden' },
    first_week:       { en: 'The beginning', pt: 'O começo', es: 'El comienzo', fr: 'Le début', de: 'Der Anfang' },
    low_activity:     null as any, // not shown for quiet weeks
  };
  if (state === 'low_activity') return null;
  const entry = map[state];
  return entry ? (entry[lang] ?? entry.en) : null;
}

// ─── Single recap card ────────────────────────────────────────────────────────
function RecapCard({ recap, index, onPress }: {
  recap: WeeklyRecapData;
  index: number;
  onPress: () => void;
}) {
  const { lang } = useLanguage();
  const narrative   = getWeeklyNarrative(recap.narrativeState, recap.resetsCompleted);
  const accent      = narrativeAccentColor(recap.narrativeState);
  const descriptor  = weekDescriptor(recap.narrativeState, lang);
  const ringPct     = recap.resetsCompleted / 7;
  const weekLabel   = lang === 'pt' || lang === 'es' ? 'Semana' : lang === 'fr' ? 'Semaine' : lang === 'de' ? 'Woche' : 'Week';

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
              <Text style={styles.cardWeekLabel}>{weekLabel} {recap.weekNumber}</Text>
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
          {descriptor ? (
            <View style={[styles.descriptorPill, { borderColor: `${accent}44` }]}>
              <Text style={[styles.descriptorText, { color: accent }]}>{descriptor}</Text>
            </View>
          ) : null}
          <View style={styles.cardChevron}>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
}

// ─── Chapter summary (replaces dark stats dashboard) ──────────────────────────

function chapterPhrase(weeks: number, lang: string): string {
  if (weeks === 1) {
    if (lang === 'pt') return 'Um ritmo começando a se formar.';
    if (lang === 'es') return 'Un ritmo comenzando a tomar forma.';
    if (lang === 'fr') return 'Un rythme qui commence à prendre forme.';
    if (lang === 'de') return 'Ein Rhythmus beginnt sich zu formen.';
    return 'A rhythm beginning to form.';
  }
  if (weeks <= 3) {
    if (lang === 'pt') return 'Algo está se estabelecendo.';
    if (lang === 'es') return 'Algo se está estableciendo.';
    if (lang === 'fr') return 'Quelque chose se stabilise.';
    if (lang === 'de') return 'Etwas beginnt sich einzupendeln.';
    return 'Something is settling in.';
  }
  if (weeks <= 7) {
    if (lang === 'pt') return 'Um padrão tomando forma, semana por semana.';
    if (lang === 'es') return 'Un patrón tomando forma, semana a semana.';
    if (lang === 'fr') return 'Un fil qui se tisse, semaine après semaine.';
    if (lang === 'de') return 'Ein Muster, das sich Woche für Woche zeigt.';
    return 'A pattern taking shape, week by week.';
  }
  if (lang === 'pt') return 'Uma prática que continua.';
  if (lang === 'es') return 'Una práctica que continúa.';
  if (lang === 'fr') return 'Une pratique qui se poursuit.';
  if (lang === 'de') return 'Eine Praxis, die weitergeht.';
  return 'A sustained practice.';
}

function ChapterSummary({ recaps, lang }: { recaps: WeeklyRecapData[]; lang: string }) {
  const totalResets = recaps.reduce((acc, r) => acc + r.resetsCompleted, 0);
  const weeks = recaps.length;
  const phrase = chapterPhrase(weeks, lang);

  const chapterLabel  = lang === 'pt' ? 'Este capítulo até agora' : lang === 'es' ? 'Este capítulo hasta ahora' : lang === 'fr' ? 'Ce chapitre jusqu\'ici' : lang === 'de' ? 'Dieses Kapitel bisher' : 'This chapter so far';
  const weeksLabel    = lang === 'pt' ? weeks === 1 ? '1 semana vivida' : `${weeks} semanas vividas` : lang === 'es' ? weeks === 1 ? '1 semana vivida' : `${weeks} semanas vividas` : lang === 'fr' ? weeks === 1 ? '1 semaine vécue' : `${weeks} semaines vécues` : lang === 'de' ? weeks === 1 ? '1 Woche gelebt' : `${weeks} Wochen gelebt` : weeks === 1 ? '1 week lived' : `${weeks} weeks lived`;
  const returnsLabel  = lang === 'pt' ? `${totalResets} retornos quietos` : lang === 'es' ? `${totalResets} regresos tranquilos` : lang === 'fr' ? `${totalResets} retours calmes` : lang === 'de' ? `${totalResets} stille Rückkehren` : `${totalResets} quiet returns`;

  return (
    <View style={styles.chapterCard}>
      <Text style={styles.chapterTitle}>{chapterLabel}</Text>
      <View style={styles.chapterStats}>
        <Text style={styles.chapterStat}>{weeksLabel}</Text>
        <Text style={styles.chapterStatSep}>·</Text>
        <Text style={styles.chapterStat}>{returnsLabel}</Text>
      </View>
      <Text style={styles.chapterPhrase}>{phrase}</Text>
    </View>
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

  const { t, lang } = useLanguage();
  const sortedRecaps = [...recaps].sort((a, b) => b.weekNumber - a.weekNumber);
  const hasAnyData   = weeklyScore > 0 || progress.completedDays.length > 0;

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
          <CurrentWeekCard weeklyScore={weeklyScore} />
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
            {/* Chapter summary — soft narrative, not a stats dashboard */}
            <FadeIn delay={60}>
              <ChapterSummary recaps={recaps} lang={lang} />
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
  currentWeekBody: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md },
  currentWeekInsight: { flex: 1, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textPrimary, lineHeight: 20 },
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

  // ── Chapter summary (soft cream card) ────────────────────────────────────────
  chapterCard: {
    backgroundColor: Colors.card, borderRadius: Radii.xl, padding: Spacing.lg,
    marginBottom: Spacing.xl, borderWidth: 1, borderColor: Colors.borderLight,
    gap: Spacing.sm, ...Shadows.card,
  },
  chapterTitle: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 1.8, marginBottom: 2,
  },
  chapterStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  chapterStat: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textPrimary },
  chapterStatSep: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
  chapterPhrase: { fontSize: Typography.sizes.sm, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 20, marginTop: 2 },

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
  descriptorPill: {
    borderRadius: Radii.full, paddingHorizontal: Spacing.sm, paddingVertical: 3,
    alignSelf: 'flex-start', borderWidth: 1, backgroundColor: 'transparent',
  },
  descriptorText: { fontSize: 10, fontWeight: Typography.weights.medium, letterSpacing: 0.2 },
  cardChevron: { alignSelf: 'flex-end', marginTop: 2 },

  // ── Empty state ────────────────────────────────────────────────────────────────
  emptyWrap: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.md },
  emptyIconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  emptyTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textSecondary, textAlign: 'center' },
  emptyText: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, fontStyle: 'italic' },

  // ── Bottom ─────────────────────────────────────────────────────────────────────
  bottomQuote: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic', paddingVertical: Spacing.xl, lineHeight: 20 },
  bottomPad: { height: Spacing.xl },
});

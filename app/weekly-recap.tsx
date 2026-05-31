import { useRef, useEffect, useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing, StatusBar, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useProgress } from '../hooks/useProgress';
import { useHabits } from '../hooks/useHabits';
import { useLanguage } from '../hooks/useLanguage';
import { useWeeklyRecap } from '../hooks/useWeeklyRecap';
import { maybeRequestReviewAfterRecap } from '../utils/reviewRequest';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { getWeekAllDays, getDailyStatesForWeek } from '../utils/dailyEntries';
import { getAppNow } from '../utils/appDate';
import { getWeekMonday } from '../utils/weeklyRecap';
import {
  buildWeekInsights,
  WeekInsights,
  getDayName,
  getMoodLabel,
  getStateLabel,
  STATE_DOT_COLOR,
  getCategoryLabel,
  getRhythmCopy,
  getWeekOverviewLines,
  getWeekWords,
  getTrendCopy,
  getQuietObservation,
  getLookingAhead,
  getSmallMoments,
  getHowYouArrivedNote,
  getCategoryContextNote,
} from '../utils/weeklyInsights';

// ─── Staggered fade-in ────────────────────────────────────────────────────────

function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 480, delay, useNativeDriver: true }),
      Animated.timing(ty,      { toValue: 0, duration: 480, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>{children}</Animated.View>;
}

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

// ─── Shared chip — single source of truth for all recap chips ─────────────────

function RecapChip({ label, primary = false }: { label: string; primary?: boolean }) {
  return (
    <View style={[styles.chip, primary && styles.chipPrimary]}>
      <Text style={[styles.chipText, primary && styles.chipTextPrimary]}>{label}</Text>
    </View>
  );
}

// ─── Section 1 — Week Overview ────────────────────────────────────────────────

function SectionOverview({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const { intro, narrative } = getWeekOverviewLines(insights, lang, weekNumber);
  const returnsLabel = lang === 'pt' ? 'retornos' : lang === 'es' ? 'retornos' : lang === 'fr' ? 'retours' : lang === 'de' ? 'Rückkehren' : 'returns';
  const quietLabel   = lang === 'pt' ? 'dias quietos' : lang === 'es' ? 'días tranquilos' : lang === 'fr' ? 'jours calmes' : lang === 'de' ? 'stille Tage' : 'quiet days';

  return (
    <FadeIn delay={80}>
      <View style={styles.card}>
        <Text style={styles.overviewIntro}>{intro}</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStatItem}>
            <Text style={styles.overviewStatNum}>{insights.resetsCompleted}</Text>
            <Text style={styles.overviewStatLabel}>{returnsLabel}</Text>
          </View>
          <View style={styles.overviewStatDivider} />
          <View style={styles.overviewStatItem}>
            <Text style={styles.overviewStatNum}>{insights.skippedCount}</Text>
            <Text style={styles.overviewStatLabel}>{quietLabel}</Text>
          </View>
        </View>
        {narrative ? (
          <Text style={styles.overviewNarrative}>{narrative}</Text>
        ) : null}
      </View>
    </FadeIn>
  );
}

// ─── Section 2 — Your Rhythm ──────────────────────────────────────────────────

function SectionRhythm({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const title = lang === 'pt' ? 'SEU RITMO' : lang === 'es' ? 'TU RITMO' : lang === 'fr' ? 'TON RYTHME' : lang === 'de' ? 'DEIN RHYTHMUS' : 'YOUR RHYTHM';
  const copy  = getRhythmCopy(insights.rhythmPattern, lang, weekNumber);
  const dayLetters = lang === 'pt'
    ? ['S','T','Q','Q','S','S','D']
    : lang === 'es' || lang === 'fr'
    ? ['L','M','M','J','V','S','D']
    : lang === 'de'
    ? ['M','D','M','D','F','S','S']
    : ['M','T','W','T','F','S','S'];

  return (
    <FadeIn delay={160}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          {/* Dot grid */}
          <View style={styles.rhythmRow}>
            {insights.days.map((d, i) => (
              <View key={i} style={styles.rhythmCell}>
                <View style={[styles.rhythmDot, d.completed && styles.rhythmDotFilled]} />
                <Text style={[styles.rhythmDayLetter, d.completed && styles.rhythmDayLetterActive]}>
                  {dayLetters[i]}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.rhythmCopy}>{copy}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 3 — Small Moments ───────────────────────────────────────────────

function SectionSmallMoments({ insights, lang }: { insights: WeekInsights; lang: string }) {
  const title  = lang === 'pt' ? 'PEQUENOS MOMENTOS DESTA SEMANA' : lang === 'es' ? 'PEQUEÑOS MOMENTOS DE ESTA SEMANA' : lang === 'fr' ? 'PETITS MOMENTS DE CETTE SEMAINE' : lang === 'de' ? 'KLEINE MOMENTE DIESER WOCHE' : 'SMALL MOMENTS FROM THIS WEEK';
  const lines  = getSmallMoments(insights, lang);
  if (lines.length === 0) return null;

  return (
    <FadeIn delay={220}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          {lines.map((line, i) => (
            <View key={i} style={[styles.smallMomentRow, i > 0 && styles.smallMomentRowGap]}>
              <View style={styles.smallMomentDot} />
              <Text style={styles.smallMomentText}>{line}</Text>
            </View>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 4 — How You Arrived ─────────────────────────────────────────────
// Prefers real daily state check-ins (Racing Mind, Tired, Overwhelmed…).
// Falls back to mood data (Difficult, Steady, Lighter) when no state data exists.

function SectionMood({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const useStates = insights.stateTotal > 0;

  // Section title changes based on data source
  const title = useStates
    ? (lang === 'pt' ? 'COMO VOCÊ CHEGOU' : lang === 'es' ? 'CÓMO LLEGASTE' : lang === 'fr' ? 'COMMENT TU ES ARRIVÉ' : lang === 'de' ? 'WIE DU ANKAMST' : 'HOW YOU ARRIVED')
    : (lang === 'pt' ? 'COMO OS DIAS PARECERAM' : lang === 'es' ? 'CÓMO SE SINTIERON LOS DÍAS' : lang === 'fr' ? 'COMMENT LES JOURS ONT SEMBLÉ' : lang === 'de' ? 'WIE SICH DIE TAGE ANFÜHLTEN' : 'HOW THE DAYS FELT');

  const mostLabel = lang === 'pt' ? 'Mais presente' : lang === 'es' ? 'Más presente' : lang === 'fr' ? 'Le plus présent' : lang === 'de' ? 'Am häufigsten' : 'Most present';
  const alsoLabel = lang === 'pt' ? 'Também apareceu' : lang === 'es' ? 'También apareció' : lang === 'fr' ? 'Aussi apparu' : lang === 'de' ? 'Auch erschienen' : 'Also appeared';
  const timesLabel = (n: number) =>
    lang === 'pt' ? `${n}×` : lang === 'es' ? `${n}×` : lang === 'fr' ? `${n}×` : lang === 'de' ? `${n}×` : `${n}×`;

  const MOOD_DOT: Record<string, string> = { hard: '#C9806A', okay: '#C9A84C', good: '#7FAF7A' };

  if (useStates) {
    // Show real emotional check-in states
    const { stateCounts, dominantState, secondaryStates } = insights;
    return (
      <FadeIn delay={240}>
        <View style={styles.section}>
          <SectionLabel>{title}</SectionLabel>
          <View style={styles.card}>
            {dominantState && (
              <View style={styles.moodPrimary}>
                <Text style={styles.moodPrimaryLabel}>{mostLabel}</Text>
                <View style={styles.moodRow}>
                  <View style={[styles.moodDot, { backgroundColor: STATE_DOT_COLOR[dominantState] ?? '#A8A8A8' }]} />
                  <Text style={styles.moodName}>{getStateLabel(dominantState, lang)}</Text>
                  <Text style={styles.moodCount}>{timesLabel(stateCounts[dominantState])}</Text>
                </View>
              </View>
            )}
            {secondaryStates.length > 0 && (
              <View style={styles.moodSecondary}>
                <Text style={styles.moodSecondaryLabel}>{alsoLabel}</Text>
                {secondaryStates.slice(0, 3).map(s => (
                  <View key={s} style={styles.moodRow}>
                    <View style={[styles.moodDot, styles.moodDotSmall, { backgroundColor: STATE_DOT_COLOR[s] ?? '#A8A8A8' }]} />
                    <Text style={styles.moodNameSmall}>{getStateLabel(s, lang)}</Text>
                    <Text style={styles.moodCountSmall}>{timesLabel(stateCounts[s])}</Text>
                  </View>
                ))}
              </View>
            )}
            {(() => {
              const note = getHowYouArrivedNote(insights, lang, weekNumber);
              return note ? <Text style={styles.arrivedNote}>{note}</Text> : null;
            })()}
          </View>
        </View>
      </FadeIn>
    );
  }

  // Fallback: show mood data
  const { moodCounts, dominantMood, secondaryMoods, moodTotal } = insights;
  if (moodTotal === 0) return null;

  return (
    <FadeIn delay={240}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          {dominantMood && (
            <View style={styles.moodPrimary}>
              <Text style={styles.moodPrimaryLabel}>{mostLabel}</Text>
              <View style={styles.moodRow}>
                <View style={[styles.moodDot, { backgroundColor: MOOD_DOT[dominantMood] }]} />
                <Text style={styles.moodName}>{getMoodLabel(dominantMood, lang)}</Text>
                <Text style={styles.moodCount}>{timesLabel(moodCounts[dominantMood])}</Text>
              </View>
            </View>
          )}
          {secondaryMoods.length > 0 && (
            <View style={styles.moodSecondary}>
              <Text style={styles.moodSecondaryLabel}>{alsoLabel}</Text>
              {secondaryMoods.map(m => (
                <View key={m} style={styles.moodRow}>
                  <View style={[styles.moodDot, styles.moodDotSmall, { backgroundColor: MOOD_DOT[m] }]} />
                  <Text style={styles.moodNameSmall}>{getMoodLabel(m, lang)}</Text>
                  <Text style={styles.moodCountSmall}>{timesLabel(moodCounts[m])}</Text>
                </View>
              ))}
            </View>
          )}
          {(() => {
            const note = getHowYouArrivedNote(insights, lang, weekNumber);
            return note ? <Text style={styles.arrivedNote}>{note}</Text> : null;
          })()}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 4 — What Your Mind Was Asking For ────────────────────────────────

function SectionCategories({ insights, lang }: { insights: WeekInsights; lang: string }) {
  const title  = lang === 'pt' ? 'O QUE SUA MENTE PEDIA' : lang === 'es' ? 'LO QUE TU MENTE PEDÍA' : lang === 'fr' ? 'CE QUE TON ESPRIT DEMANDAIT' : lang === 'de' ? 'WONACH DEIN GEIST FRAGTE' : 'WHAT YOUR MIND WAS ASKING FOR';
  const subKey = lang === 'pt' ? 'apareceu mais vezes' : lang === 'es' ? 'apareció más veces' : lang === 'fr' ? 'est apparu le plus souvent' : lang === 'de' ? 'kam am häufigsten vor' : 'appeared most often';

  const { topCategories, categoryCounts } = insights;
  if (topCategories.length === 0) return null;
  const dominant = topCategories[0];
  const contextNote = getCategoryContextNote(insights, lang);

  return (
    <FadeIn delay={300}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          <View style={styles.chipRow}>
            {topCategories.map(cat => (
              <RecapChip key={cat} label={getCategoryLabel(cat, lang)} primary={cat === dominant} />
            ))}
          </View>
          {dominant && categoryCounts[dominant] > 1 && (
            <Text style={styles.categoryNote}>
              {contextNote || `${getCategoryLabel(dominant, lang)} ${subKey}.`}
            </Text>
          )}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 5 — Words of the Week ────────────────────────────────────────────

function SectionWords({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const title    = lang === 'pt' ? 'PALAVRAS DA SEMANA' : lang === 'es' ? 'PALABRAS DE LA SEMANA' : lang === 'fr' ? 'MOTS DE LA SEMAINE' : lang === 'de' ? 'WORTE DER WOCHE' : 'WORDS OF THE WEEK';
  const manyLabel = lang === 'pt' ? 'Palavras que foram aparecendo' : lang === 'es' ? 'Palabras que siguieron apareciendo' : lang === 'fr' ? 'Mots qui revenaient sans cesse' : lang === 'de' ? 'Wörter, die immer wieder auftauchten' : 'Words that kept appearing';

  // Derive words from actual week data (real word_of_day first, then context)
  const words = getWeekWords(insights, lang, weekNumber);
  if (words.length === 0) return null;

  return (
    <FadeIn delay={360}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          <Text style={styles.wordsNote}>{manyLabel}</Text>
          <View style={styles.chipRow}>
            {words.map((w, i) => (
              <RecapChip key={i} label={w} primary={i === 0} />
            ))}
          </View>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 6 — A Moment That Stood Out ──────────────────────────────────────

function SectionHighlight({ insights, lang }: { insights: WeekInsights; lang: string }) {
  const title    = lang === 'pt' ? 'UM MOMENTO QUE SE DESTACOU' : lang === 'es' ? 'UN MOMENTO QUE DESTACÓ' : lang === 'fr' ? 'UN MOMENT QUI S\'EST DÉMARQUÉ' : lang === 'de' ? 'EIN MOMENT DER HERVORSTACH' : 'A MOMENT THAT STOOD OUT';
  const onLabel  = lang === 'pt' ? 'Na' : lang === 'es' ? 'El' : lang === 'fr' ? 'Le' : lang === 'de' ? 'Am' : 'On';
  const youWrote = lang === 'pt' ? 'você escreveu' : lang === 'es' ? 'escribiste' : lang === 'fr' ? 'tu as écrit' : lang === 'de' ? 'hast du geschrieben' : 'you wrote';

  const { highlight } = insights;
  if (!highlight) return null;

  const dayName = getDayName(highlight.dayIndex, lang);
  const preview = highlight.text.length > 140 ? highlight.text.slice(0, 137) + '…' : highlight.text;

  return (
    <FadeIn delay={420}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.highlightMeta}>
            {onLabel} {dayName}, {youWrote}:
          </Text>
          <View style={styles.highlightQuoteBar} />
          <Text style={styles.highlightQuote}>{`"${preview}"`}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 7 — What Changed ─────────────────────────────────────────────────

function SectionTrend({ insights, lang }: { insights: WeekInsights; lang: string }) {
  const title = lang === 'pt' ? 'O QUE MUDOU' : lang === 'es' ? 'QUÉ CAMBIÓ' : lang === 'fr' ? 'CE QUI A CHANGÉ' : lang === 'de' ? 'WAS SICH VERÄNDERTE' : 'WHAT CHANGED';

  const copy = getTrendCopy(insights, lang);
  if (!copy) return null;

  return (
    <FadeIn delay={480}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          <Text style={styles.trendBeginning}>{copy.beginning}</Text>
          <View style={styles.trendDivider} />
          <Text style={styles.trendEnding}>{copy.ending}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 8 — A Quiet Observation ──────────────────────────────────────────

function SectionObservation({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const title = lang === 'pt' ? 'UMA OBSERVAÇÃO QUIETA' : lang === 'es' ? 'UNA OBSERVACIÓN TRANQUILA' : lang === 'fr' ? 'UNE OBSERVATION CALME' : lang === 'de' ? 'EINE STILLE BEOBACHTUNG' : 'A QUIET OBSERVATION';
  const lines = getQuietObservation(insights, lang, weekNumber);

  return (
    <FadeIn delay={540}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={[styles.card, styles.observationCard]}>
          {lines.map((line, i) => (
            <Text key={i} style={[styles.observationLine, i > 0 && styles.observationLineGap]}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 9 — Looking Ahead ────────────────────────────────────────────────

function SectionLookingAhead({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const title = lang === 'pt' ? 'OLHANDO ADIANTE' : lang === 'es' ? 'MIRANDO ADELANTE' : lang === 'fr' ? 'EN REGARDANT DEVANT' : lang === 'de' ? 'NACH VORNE SCHAUEN' : 'LOOKING AHEAD';
  const lines = getLookingAhead(insights, lang, weekNumber);

  return (
    <FadeIn delay={600}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          {lines.map((line, i) => (
            <Text key={i} style={[styles.lookingAheadLine, i > 0 && styles.lookingAheadLineGap]}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function WeeklyRecapScreen() {
  const router      = useRouter();
  const insets      = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;
  const hPad = screenWidth < 360 ? 16 : screenWidth < 430 ? 20 : 32;
  const { week: weekParam } = useLocalSearchParams<{ week?: string }>();
  const isHistorical = !!weekParam;

  const { progress, weeklyScore, loading: progressLoading } = useProgress();
  const { habitLog, habits, loading: habitsLoading }        = useHabits();
  const { lang }                                            = useLanguage();
  const {
    generateAndSave, generateCurrentWeekPreview,
    dismissAutoTrigger, getRecapForWeek, loading: recapLoading,
  } = useWeeklyRecap(progress, weeklyScore, habitLog, habits.length);

  const [recap,    setRecap]    = useState<ReturnType<typeof generateCurrentWeekPreview> | null>(null);
  const [insights, setInsights] = useState<WeekInsights | null>(null);
  const dataLoading = progressLoading || habitsLoading || recapLoading;

  // ── Resolve recap ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (dataLoading) return;
    if (isHistorical && weekParam) {
      const stored = getRecapForWeek(parseInt(weekParam, 10));
      if (stored) { setRecap(stored); return; }
    }
    generateAndSave().then(setRecap);
  }, [dataLoading, isHistorical, weekParam]);

  // ── Load week entries once recap (and weekMonday) is known ───────────────────
  useEffect(() => {
    if (!recap) return;

    // Resolve the Monday for this recap
    let mondayKey = (recap as any).weekMonday as string | undefined;
    if (!mondayKey) {
      // Fallback: use getAppNow() for current recap, savedAt for historical
      const base = isHistorical && (recap as any).savedAt
        ? new Date((recap as any).savedAt)
        : getAppNow();
      mondayKey = (() => {
        const monday = getWeekMonday(base);
        return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
      })();
    }

    Promise.all([
      getWeekAllDays(mondayKey),
      getDailyStatesForWeek(mondayKey),
    ]).then(([allDays, dailyStates]) => {
      const [y, m, d] = mondayKey!.split('-').map(Number);
      const monday = new Date(y, m - 1, d);
      setInsights(buildWeekInsights(allDays, monday, dailyStates));
    });
  }, [recap]);

  const handleClose = useCallback(async () => {
    if (!isHistorical) await dismissAutoTrigger();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }, [isHistorical, dismissAutoTrigger, router]);

  const handleReady = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (recap) maybeRequestReviewAfterRecap(recap.resetsCompleted, recap.totalDaysCompleted);
    handleClose();
  }, [handleClose, recap]);

  const loadingLabel =
    lang === 'pt' ? 'Carregando...' :
    lang === 'es' ? 'Cargando...' :
    lang === 'fr' ? 'Chargement...' :
    lang === 'de' ? 'Laden...' : 'Loading...';

  if (!recap || !insights) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>{loadingLabel}</Text>
      </View>
    );
  }

  const weekTitle    = lang === 'pt' || lang === 'es' ? `Semana ${recap.weekNumber}` : lang === 'fr' ? `Semaine ${recap.weekNumber}` : lang === 'de' ? `Woche ${recap.weekNumber}` : `Week ${recap.weekNumber}`;
  const closeLabel   = lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : lang === 'fr' ? 'Fermer' : lang === 'de' ? 'Schließen' : 'Close';
  const readyLabel   = lang === 'pt' ? 'Pronto' : lang === 'es' ? 'Listo' : lang === 'fr' ? 'Prêt' : lang === 'de' ? 'Bereit' : 'I\'m ready';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* ── LIGHT HEADER ──────────────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: insets.top + 12, paddingHorizontal: hPad }]}>
        <TouchableOpacity style={styles.backBtn} onPress={handleClose} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>

        <FadeIn delay={0}>
          <View style={styles.headerContent}>
            <Text style={styles.headerWeekLabel}>{weekTitle}</Text>
            <Text style={styles.headerDateLabel}>{recap.dateLabel}</Text>
          </View>
        </FadeIn>
      </View>

      {/* ── SCROLLABLE BODY ───────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 48, paddingHorizontal: hPad },
          isTablet && { maxWidth: 640, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1 — Week Overview */}
        <SectionOverview insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* 2 — Your Rhythm */}
        <SectionRhythm insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* 3 — Small Moments */}
        <SectionSmallMoments insights={insights} lang={lang} />

        {/* 4 — How You Arrived */}
        {(insights.stateTotal > 0 || insights.moodTotal > 0) && <SectionMood insights={insights} lang={lang} weekNumber={recap.weekNumber} />}

        {/* 5 — What Your Mind Was Asking For */}
        {insights.topCategories.length > 0 && <SectionCategories insights={insights} lang={lang} />}

        {/* 6 — Words of the Week (always shown — derived from context when no word_of_day) */}
        <SectionWords insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* 7 — A Moment That Stood Out */}
        {insights.highlight && <SectionHighlight insights={insights} lang={lang} />}

        {/* 8 — What Changed */}
        {insights.trendDirection && <SectionTrend insights={insights} lang={lang} />}

        {/* 9 — A Quiet Observation */}
        <SectionObservation insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* 10 — Looking Ahead */}
        <SectionLookingAhead insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* CTA */}
        <FadeIn delay={680}>
          <View style={styles.ctaSection}>
            <TouchableOpacity style={styles.ctaButton} onPress={handleReady} activeOpacity={0.82}>
              <Text style={styles.ctaText}>{isHistorical ? closeLabel : readyLabel}</Text>
            </TouchableOpacity>
            {!isHistorical && (
              <TouchableOpacity onPress={handleClose} style={styles.skipBtn} activeOpacity={0.6}>
                <Text style={styles.skipText}>{closeLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </FadeIn>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerContent: {
    gap: 4,
  },
  headerWeekLabel: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  headerDateLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },

  // ── Shared section ───────────────────────────────────────────────────────────
  section: { gap: Spacing.sm },

  sectionLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.8,
    marginBottom: 2,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },

  // ── Section 1 — Overview ─────────────────────────────────────────────────────
  overviewIntro: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
    marginBottom: Spacing.md,
  },
  overviewStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    marginBottom: Spacing.base,
  },
  overviewStatItem: { alignItems: 'center', flex: 1 },
  overviewStatNum: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -1,
    lineHeight: 44,
  },
  overviewStatLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.3,
    marginTop: 1,
  },
  overviewStatDivider: {
    width: 1,
    height: 44,
    backgroundColor: Colors.border,
  },
  overviewNarrative: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },

  // ── Section 2 — Rhythm ───────────────────────────────────────────────────────
  rhythmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  rhythmCell: { alignItems: 'center', gap: 6, flex: 1 },
  rhythmDot: {
    width: 28, height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rhythmDotFilled: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  rhythmDayLetter: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  rhythmDayLetterActive: { color: Colors.gold },
  rhythmCopy: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // ── Section 3 — Mood ─────────────────────────────────────────────────────────
  moodPrimary: { marginBottom: Spacing.md },
  moodPrimaryLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  moodSecondary: {
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  moodSecondaryLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  moodDot: {
    width: 12, height: 12,
    borderRadius: 6,
  },
  moodDotSmall: { width: 9, height: 9, borderRadius: 5 },
  moodName: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
  },
  moodCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  moodNameSmall: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  moodCountSmall: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  arrivedNote: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
    paddingTop: Spacing.sm,
    marginTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },

  // ── Section 3 — Small Moments ─────────────────────────────────────────────────
  smallMomentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  smallMomentRowGap: { marginTop: Spacing.md },
  smallMomentDot: {
    width: 5, height: 5, borderRadius: 3,
    backgroundColor: Colors.gold,
    marginTop: 7, flexShrink: 0,
  },
  smallMomentText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  // ── Section 5 — Categories ────────────────────────────────────────────────────
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  chip: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 64,
    alignItems: 'center',
  },
  chipPrimary: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accent,
  },
  chipText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  chipTextPrimary: { color: Colors.gold },
  categoryNote: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 2,
  },

  // ── Section 5 — Words ─────────────────────────────────────────────────────────
  wordsNote: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.3,
    marginBottom: Spacing.sm,
  },

  // ── Section 6 — Highlight ──────────────────────────────────────────────────────
  highlightCard: {
    backgroundColor: Colors.backgroundSecondary,
  },
  highlightMeta: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  highlightQuoteBar: {
    width: 28, height: 2,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    marginBottom: Spacing.md,
  },
  highlightQuote: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 28,
    letterSpacing: 0.1,
  },

  // ── Section 7 — Trend ─────────────────────────────────────────────────────────
  trendBeginning: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  trendDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginBottom: Spacing.base,
  },
  trendEnding: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
    lineHeight: 22,
  },

  // ── Section 8 — Observation ───────────────────────────────────────────────────
  observationCard: {
    backgroundColor: Colors.charcoal,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: 0,
  },
  observationLine: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255,255,255,0.82)',
    fontStyle: 'italic',
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  observationLineGap: { marginTop: Spacing.base },

  // ── Section 9 — Looking Ahead ─────────────────────────────────────────────────
  lookingAheadLine: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  lookingAheadLineGap: { marginTop: Spacing.sm },

  // ── CTA ────────────────────────────────────────────────────────────────────────
  ctaSection: { gap: Spacing.md },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.accent,
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
    letterSpacing: 0.2,
  },
  skipBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipText: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
});

import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
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
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import type { EmotionalProfile } from '../utils/emotionalProfile';
import { pickRelevantGoal } from '../utils/weeklyInsights';
import type { UserGoal } from '../utils/weeklyInsights';
import { maybeRequestReviewAfterRecap } from '../utils/reviewRequest';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { getWeekAllDays, getDailyStatesForWeek, type DailyEntry } from '../utils/dailyEntries';
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
  getCrossWeekMemory,
  getHabitPresenceLines,
} from '../utils/weeklyInsights';
import { generateWeekNote } from '../utils/weekNote';
import { getItem, StorageKeys } from '../hooks/useStorage';
import { shouldShowMantraInWeekly, mantraWeeklyVariant } from '../utils/mantraEcho';

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

// ─── Section 3b — Connecting the Dots ───────────────────────────────────────
// Generates 2–3 short sentences that connect the week's real events.
// Data-driven, template-based, never interpretive. No raw state keys ever shown.

// Natural-language arrival sentences per state — never interpolates state keys or labels
const STATE_ARRIVAL_LINES: Record<string, Record<string, string>> = {
  unclear:     { en: 'Some moments this week had less clarity than others.',                          pt: 'Em alguns momentos desta semana, a falta de clareza esteve mais presente.',          es: 'Algunos momentos de esta semana tuvieron menos claridad que otros.',              fr: 'Certains moments de cette semaine manquaient un peu de clarté.',                  de: 'Einige Momente dieser Woche hatten weniger Klarheit als andere.'          },
  drained:     { en: 'Tiredness was present in more moments than usual this week.',                   pt: 'O cansaço esteve mais presente em alguns momentos desta semana.',                  es: 'El cansancio estuvo más presente en algunos momentos de esta semana.',           fr: "La fatigue a été plus présente qu'à l'habitude cette semaine.",                   de: 'Erschöpfung war diese Woche in mehr Momenten als sonst spürbar.'          },
  overwhelmed: { en: 'There were moments when everything seemed to ask more than usual.',             pt: 'Houve momentos em que tudo pareceu exigir mais do que o normal.',                  es: 'Hubo momentos en que todo pareció exigir más de lo normal.',                     fr: "Il y a eu des moments où tout semblait demander plus qu'à l'accoutumée.",         de: 'Es gab Momente, in denen alles mehr als sonst zu verlangen schien.'       },
  balanced:    { en: 'Even with its ups and downs, the week found some steadiness.',                  pt: 'Mesmo com altos e baixos, algum equilíbrio apareceu ao longo da semana.',          es: 'Incluso con sus altibajos, la semana encontró cierto equilibrio.',               fr: 'Même avec ses hauts et ses bas, la semaine a trouvé un certain équilibre.',       de: 'Auch mit seinen Höhen und Tiefen fand die Woche ein gewisses Gleichgewicht.' },
  tired:       { en: 'Tiredness ran through most of this week.',                                     pt: 'O cansaço foi o fio condutor desta semana.',                                       es: 'El cansancio fue el hilo conductor de esta semana.',                             fr: 'La fatigue a été le fil conducteur de cette semaine.',                            de: 'Müdigkeit war der Hauptfaden dieser Woche.'                               },
  racing:      { en: 'The mind was busier than quiet through much of this week.',                     pt: 'A mente esteve mais agitada do que quieta durante boa parte desta semana.',        es: 'La mente estuvo más agitada que tranquila durante gran parte de esta semana.',   fr: "L'esprit était plus agité que calme pendant une bonne partie de cette semaine.", de: 'Der Geist war einen Großteil dieser Woche beschäftigt.'                   },
};

const MOOD_ARRIVAL_LINES: Record<string, Record<string, string>> = {
  hard: { en: 'Some days carried more weight than others this week.', pt: 'Alguns dias desta semana foram mais pesados do que outros.',    es: 'Algunos días de esta semana fueron más pesados que otros.',      fr: 'Certains jours de cette semaine ont été plus lourds que d\'autres.', de: 'Einige Tage dieser Woche waren schwerer als andere.'         },
  okay: { en: 'The days moved at an even pace for the most part.',    pt: 'Os dias seguiram um ritmo relativamente estável.',             es: 'Los días transcurrieron a un ritmo bastante estable.',           fr: 'Les jours se sont écoulés à un rythme assez régulier.',              de: 'Die Tage verliefen größtenteils gleichmäßig.'               },
  good: { en: 'There was a lightness to some days this week.',        pt: 'Alguns dias desta semana tiveram uma leveza própria.',         es: 'Algunos días de esta semana tuvieron una ligereza propia.',      fr: 'Certains jours de cette semaine avaient une légèreté particulière.', de: 'Einige Tage dieser Woche hatten eine besondere Leichtigkeit.' },
};

function getConnectionLines(insights: WeekInsights, lang: string): string[] {
  const lines: string[] = [];

  // Line 1 — arrival state / mood (natural language only — no raw keys or label interpolation)
  if (insights.dominantState) {
    const map = STATE_ARRIVAL_LINES[insights.dominantState];
    if (map) lines.push(map[lang] ?? map.en);
  } else if (insights.dominantMood) {
    const map = MOOD_ARRIVAL_LINES[insights.dominantMood];
    if (map) lines.push(map[lang] ?? map.en);
  }

  // Line 2 — return count / consistency pattern
  // For n===7: Overview already owns "returned every day" — pivot to emotional quality of the pattern.
  const n = insights.resetsCompleted;
  if (n === 7) {
    const l2: Record<string, string> = {
      pt: 'O ritmo se sustentou ao longo dos sete dias.',
      en: 'The rhythm held through all seven days.',
      es: 'El ritmo se sostuvo a lo largo de los siete días.',
      fr: 'Le rythme a tenu tout au long des sept jours.',
      de: 'Der Rhythmus hielt sich durch alle sieben Tage.',
    };
    lines.push(l2[lang] ?? l2.en);
  } else if (n > 0) {
    const l2: Record<string, string> =
      n >= 5
        ? { pt: `Você voltou ${n} vezes.`, en: `You showed up ${n} times.`, es: `Te mostraste ${n} veces.`, fr: `Tu es revenu ${n} fois.`, de: `Du bist ${n} Mal zurückgekehrt.` }
        : n === 1
        ? { pt: 'Você voltou uma vez.', en: 'You came back once.', es: 'Volviste una vez.', fr: 'Tu es revenu une fois.', de: 'Du bist einmal zurückgekehrt.' }
        : { pt: `Você voltou ${n} vezes.`, en: `You came back ${n} times.`, es: `Regresaste ${n} veces.`, fr: `Tu es revenu ${n} fois.`, de: `Du bist ${n} Mal zurückgekehrt.` };
    lines.push(l2[lang] ?? l2.en);
  }

  // Line 3 — dominant theme or highlight
  if (insights.topCategories.length > 0) {
    const cat = getCategoryLabel(insights.topCategories[0], lang);
    const l3: Record<string, string> = {
      pt: `${cat} apareceu com mais frequência.`,
      en: `${cat} kept coming back.`,
      es: `${cat} siguió apareciendo.`,
      fr: `${cat} est revenu le plus souvent.`,
      de: `${cat} tauchte am häufigsten auf.`,
    };
    lines.push(l3[lang] ?? l3.en);
  } else if (insights.highlight) {
    const l3: Record<string, string> = {
      pt: 'Algo ficou registrado ao longo do caminho.',
      en: 'Something stayed along the way.',
      es: 'Algo se quedó en el camino.',
      fr: 'Quelque chose est resté en chemin.',
      de: 'Etwas ist unterwegs geblieben.',
    };
    lines.push(l3[lang] ?? l3.en);
  }

  // Line 4 — mood arc (only if meaningful)
  if (insights.trendDirection === 'improved' && lines.length < 4) {
    const l4: Record<string, string> = {
      pt: 'Algo mudou ao longo do caminho.',
      en: 'Something shifted along the way.',
      es: 'Algo cambió en el camino.',
      fr: 'Quelque chose a changé en chemin.',
      de: 'Etwas hat sich unterwegs verändert.',
    };
    lines.push(l4[lang] ?? l4.en);
  }

  return lines.slice(0, 3);
}

function SectionConnections({ insights, lang }: { insights: WeekInsights; lang: string }) {
  const title: Record<string, string> = {
    pt: 'COMO A SEMANA SE CONECTOU',
    en: 'HOW THE WEEK CONNECTED',
    es: 'CÓMO SE CONECTÓ LA SEMANA',
    fr: 'LES FILS DE LA SEMAINE',
    de: 'WIE DIE WOCHE ZUSAMMENHING',
  };

  const lines = getConnectionLines(insights, lang);
  if (lines.length < 2) return null;

  return (
    <FadeIn delay={230}>
      <View style={styles.section}>
        <SectionLabel>{title[lang] ?? title.en}</SectionLabel>
        <View style={[styles.card, connectionCardStyle]}>
          {lines.map((line, i) => (
            <View key={i} style={i > 0 ? connectionLineGap : undefined}>
              <Text style={connectionLineStyle}>{line}</Text>
            </View>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

const connectionCardStyle = {
  gap: 0 as const,
};
const connectionLineStyle = {
  fontSize: 14,
  color: '#5A524A',
  lineHeight: 24 as const,
  fontStyle: 'italic' as const,
  letterSpacing: 0.1,
};
const connectionLineGap = {
  marginTop: 10,
};

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

// ─── Section 4b — What Was Present (habits, emotional) ───────────────────────

// Short acknowledgment line — rotates by weekNumber
const IDENTITY_INTRO: Record<string, string[]> = {
  pt: [
    'Você escreveu isso há alguns dias.',
    'Essa direção foi escolhida por você.',
    'Essa intenção apareceu no início do caminho.',
  ],
  en: [
    'You wrote this a few days ago.',
    'You chose this direction.',
    'This intention appeared early on.',
  ],
  es: [
    'Escribiste esto hace algunos días.',
    'Elegiste esta dirección.',
    'Esta intención apareció al principio del camino.',
  ],
  fr: [
    'Tu as écrit ceci il y a quelques jours.',
    'Tu as choisi cette direction.',
    'Cette intention est apparue au début du chemin.',
  ],
  de: [
    'Du hast das vor einigen Tagen geschrieben.',
    'Du hast diese Richtung gewählt.',
    'Diese Absicht erschien am Anfang des Weges.',
  ],
};

// Single connection line — offset rotation so it doesn't always pair with the same intro
const IDENTITY_CONNECTION: Record<string, string[]> = {
  pt: [
    'Esta semana aconteceu entre essa intenção e os seus retornos.',
    'Os dias passaram, mas essa direção continuou aqui.',
    'Parte desta semana aconteceu ao redor dessa escolha.',
  ],
  en: [
    'This week happened between that intention and your returns.',
    'The days passed, but that direction stayed.',
    'Part of this week happened around that choice.',
  ],
  es: [
    'Esta semana ocurrió entre esa intención y tus regresos.',
    'Los días pasaron, pero esa dirección se mantuvo.',
    'Parte de esta semana ocurrió alrededor de esa elección.',
  ],
  fr: [
    "Cette semaine s'est déroulée entre cette intention et tes retours.",
    'Les jours ont passé, mais cette direction est restée.',
    "Une partie de cette semaine s'est passée autour de ce choix.",
  ],
  de: [
    'Diese Woche geschah zwischen dieser Absicht und deinen Rückkehren.',
    'Die Tage vergingen, aber diese Richtung blieb.',
    'Ein Teil dieser Woche geschah um diese Wahl herum.',
  ],
};

// Quality gate: returns false for placeholder answers with no real content.
function isIdentityAnswerMeaningful(answer: string): boolean {
  const trimmed = answer.trim();
  if (trimmed.replace(/\s+/g, '').length < 10) return false;
  if (trimmed.split(/\s+/).filter(Boolean).length < 3) return false;
  const filler = /^(h+|ok+|teste|test|\.*|não sei|nao sei|sei l[aá]|nada|qualquer coisa|nenhuma|none|nothing|idk|dunno|skip|pass|n\/a|na|no idea)$/i;
  return !filler.test(trimmed);
}

function SectionHabitPresence({ topHabits, lang, weekNumber }: { topHabits: { id: string; name: string; count: number }[]; lang: string; weekNumber: number }) {
  const title: Record<string, string> = {
    pt: 'O QUE ESTEVE PRESENTE',
    en: 'WHAT WAS PRESENT',
    es: 'LO QUE ESTUVO PRESENTE',
    fr: 'CE QUI ÉTAIT PRÉSENT',
    de: 'WAS PRÄSENT WAR',
  };
  const lines = getHabitPresenceLines(topHabits, lang, weekNumber);
  if (lines.length === 0) return null;
  return (
    <FadeIn delay={310}>
      <View style={styles.section}>
        <SectionLabel>{title[lang] ?? title.en}</SectionLabel>
        <View style={[styles.card, connectionCardStyle]}>
          {lines.map((line, i) => (
            <View key={i} style={i > 0 ? connectionLineGap : undefined}>
              <Text style={connectionLineStyle}>{line}</Text>
            </View>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 10b — On Who You Are Becoming ────────────────────────────────────

function SectionIdentityAnchor({ answer, lang, weekNumber }: { answer: string; lang: string; weekNumber: number }) {
  const title: Record<string, string> = {
    pt: 'SOBRE QUEM VOCÊ ESTÁ SE TORNANDO',
    en: 'ON WHO YOU ARE BECOMING',
    es: 'SOBRE QUIÉN TE ESTÁS CONVIRTIENDO',
    fr: 'SUR QUI TU DEVIENS',
    de: 'ÜBER WEN DU WIRST',
  };
  const introPool = IDENTITY_INTRO[lang] ?? IDENTITY_INTRO.en;
  const connPool  = IDENTITY_CONNECTION[lang] ?? IDENTITY_CONNECTION.en;
  const intro = introPool[(weekNumber - 1) % introPool.length];
  const conn  = connPool[weekNumber % connPool.length]; // offset so pairs vary across weeks
  return (
    <FadeIn delay={620}>
      <View style={styles.section}>
        <SectionLabel>{title[lang] ?? title.en}</SectionLabel>
        <View style={[styles.card, styles.identityCard]}>
          <Text style={styles.identityQuote}>{`"${answer}"`}</Text>
          <Text style={styles.identityFraming}>{intro}</Text>
          <Text style={styles.identityFraming}>{conn}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 5 — Words of the Week ────────────────────────────────────────────

function SectionWords({ insights, lang, weekNumber }: { insights: WeekInsights; lang: string; weekNumber: number }) {
  const title    = lang === 'pt' ? 'PALAVRAS DA SEMANA' : lang === 'es' ? 'PALABRAS DE LA SEMANA' : lang === 'fr' ? 'MOTS DE LA SEMAINE' : lang === 'de' ? 'WORTE DER WOCHE' : 'WORDS OF THE WEEK';
  const manyLabel =
    lang === 'pt' ? 'Palavras que estiveram presentes nos seus retornos.' :
    lang === 'es' ? 'Palabras que estuvieron presentes en tus retornos.' :
    lang === 'fr' ? 'Mots apparus au fil de tes retours.' :
    lang === 'de' ? 'Wörter, die in deinen Rückkehren aufgetaucht sind.' :
    'Words that appeared across your returns.';

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

function SectionTrend({ insights, lang, prevInsights, weekNumber }: { insights: WeekInsights; lang: string; prevInsights?: WeekInsights | null; weekNumber: number }) {
  const title = lang === 'pt' ? 'O QUE MUDOU' : lang === 'es' ? 'QUÉ CAMBIÓ' : lang === 'fr' ? 'CE QUI A CHANGÉ' : lang === 'de' ? 'WAS SICH VERÄNDERTE' : 'WHAT CHANGED';

  // Cross-week memory takes priority when previous week data is available
  const crossWeekLine = prevInsights
    ? getCrossWeekMemory(insights, prevInsights, lang, weekNumber)
    : null;

  // Intra-week trend as fallback (first half vs. second half of current week)
  const intraCopy = getTrendCopy(insights, lang);

  if (!crossWeekLine && !intraCopy) return null;

  return (
    <FadeIn delay={480}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={styles.card}>
          {crossWeekLine ? (
            <Text style={styles.trendBeginning}>{crossWeekLine}</Text>
          ) : (
            <>
              <Text style={styles.trendBeginning}>{intraCopy!.beginning}</Text>
              <View style={styles.trendDivider} />
              <Text style={styles.trendEnding}>{intraCopy!.ending}</Text>
            </>
          )}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 8 — A Quiet Observation ──────────────────────────────────────────

function SectionObservation({ insights, lang, weekNumber, profile, narrativeState, usedThemes }: { insights: WeekInsights; lang: string; weekNumber: number; profile?: EmotionalProfile | null; narrativeState?: string | null; usedThemes?: Set<string> }) {
  const title = lang === 'pt' ? 'UMA OBSERVAÇÃO QUIETA' : lang === 'es' ? 'UNA OBSERVACIÓN TRANQUILA' : lang === 'fr' ? 'UNE OBSERVATION CALME' : lang === 'de' ? 'EINE STILLE BEOBACHTUNG' : 'A QUIET OBSERVATION';
  const lines = getQuietObservation(insights, lang, weekNumber, profile, narrativeState, usedThemes);

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

function SectionLookingAhead({ insights, lang, weekNumber, profile, goal, narrativeState }: { insights: WeekInsights; lang: string; weekNumber: number; profile?: EmotionalProfile | null; goal?: UserGoal | null; narrativeState?: string | null }) {
  const title = lang === 'pt' ? 'OLHANDO ADIANTE' : lang === 'es' ? 'MIRANDO ADELANTE' : lang === 'fr' ? 'EN REGARDANT DEVANT' : lang === 'de' ? 'NACH VORNE SCHAUEN' : 'LOOKING AHEAD';
  const lines = getLookingAhead(insights, lang, weekNumber, profile, goal, narrativeState);

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
  const { profile }                                         = useEmotionalProfile();
  const {
    recaps,
    generateAndSave, generateCurrentWeekPreview,
    dismissAutoTrigger, getRecapForWeek, loading: recapLoading,
  } = useWeeklyRecap(progress, weeklyScore, habitLog, habits.length);

  const [recap,        setRecap]        = useState<ReturnType<typeof generateCurrentWeekPreview> | null>(null);
  const [insights,     setInsights]     = useState<WeekInsights | null>(null);
  const [prevInsights, setPrevInsights] = useState<WeekInsights | null>(null);
  const [weekDays,     setWeekDays]     = useState<(DailyEntry | null)[] | null>(null);
  const [weekStates,   setWeekStates]   = useState<(string | null)[] | null>(null);
  const [weekMonday,   setWeekMonday]   = useState<Date | null>(null);
  const [personalMantra,  setPersonalMantra]  = useState<string | null>(null);
  const [identityAnswer,  setIdentityAnswer]  = useState<string | null>(null);
  const [rawGoals,        setRawGoals]        = useState<string[]>([]);
  const dataLoading = progressLoading || habitsLoading || recapLoading;

  useEffect(() => {
    getItem<string | null>(StorageKeys.PERSONAL_MANTRA, null).then(setPersonalMantra);
    getItem<string | null>(StorageKeys.IDENTITY_ANSWER, null).then(setIdentityAnswer);
    getItem<string[]>(StorageKeys.USER_GOALS, []).then(g => setRawGoals(g ?? []));
  }, []);

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

    let mondayKey = (recap as any).weekMonday as string | undefined;
    if (!mondayKey) {
      const base = isHistorical && (recap as any).savedAt
        ? new Date((recap as any).savedAt)
        : getAppNow();
      const m = getWeekMonday(base);
      mondayKey = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`;
    }

    Promise.all([
      getWeekAllDays(mondayKey),
      getDailyStatesForWeek(mondayKey),
    ]).then(([allDays, dailyStates]) => {
      const [y, mo, d] = mondayKey!.split('-').map(Number);
      setWeekMonday(new Date(y, mo - 1, d));
      setWeekDays(allDays);
      setWeekStates(dailyStates);
    });
  }, [recap]);

  // ── Rebuild insights whenever entries or completions change ──────────────────
  useEffect(() => {
    if (!weekDays || !weekStates || !weekMonday) return;
    setInsights(buildWeekInsights(weekDays, weekMonday, weekStates, progress.completedByDate));
  }, [weekDays, weekStates, weekMonday, progress.completedByDate]);

  // ── Load previous week's insights for cross-week memory ──────────────────────
  useEffect(() => {
    if (!recap || recap.weekNumber <= 1) { setPrevInsights(null); return; }
    const prevRecap = recaps.find(r => r.weekNumber === recap.weekNumber - 1);
    if (!prevRecap?.weekMonday) { setPrevInsights(null); return; }

    Promise.all([
      getWeekAllDays(prevRecap.weekMonday),
      getDailyStatesForWeek(prevRecap.weekMonday),
    ]).then(([prevDays, prevStates]) => {
      const [y, mo, d] = prevRecap.weekMonday!.split('-').map(Number);
      const prevMonday = new Date(y, mo - 1, d);
      setPrevInsights(buildWeekInsights(prevDays, prevMonday, prevStates, progress.completedByDate));
    });
  }, [recap, recaps, progress.completedByDate]);

  const goal = useMemo<UserGoal | null>(
    () => insights ? pickRelevantGoal(rawGoals, insights) : null,
    [rawGoals, insights],
  );

  // Tracks which narrative themes the early sections (Overview, Connections, Mood) have already
  // claimed as protagonists. Later sections (Observation, LookingAhead) receive this set and
  // can select alternative angles to avoid repeating the same central message.
  const usedThemes = useMemo<Set<string>>(() => {
    if (!insights) return new Set<string>();
    const t = new Set<string>();
    if (insights.resetsCompleted >= 6) t.add('return');
    if (insights.resetsCompleted >= 5) t.add('consistency');
    if (insights.dominantState) t.add(insights.dominantState);
    if (insights.dominantMood) t.add(insights.dominantMood);
    if (insights.topCategories[0]) t.add('category_' + insights.topCategories[0]);
    return t;
  }, [insights]);

  // Top habits completed ≥ 2 days in the recap week, sorted by frequency desc.
  const weekHabitData = useMemo(() => {
    if (!weekMonday || !habits.length) return [];
    const counts: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekMonday);
      d.setDate(weekMonday.getDate() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      for (const id of habitLog[key] ?? []) {
        counts[id] = (counts[id] ?? 0) + 1;
      }
    }
    return habits
      .filter(h => (counts[h.id] ?? 0) >= 2)
      .map(h => ({ id: h.id, name: h.name, count: counts[h.id] ?? 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 2);
  }, [habitLog, habits, weekMonday]);

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

        {/* 3b — Connecting the Dots */}
        {insights.resetsCompleted >= 2 && (
          <SectionConnections insights={insights} lang={lang} />
        )}

        {/* 4 — How You Arrived */}
        {(insights.stateTotal > 0 || insights.moodTotal > 0) && <SectionMood insights={insights} lang={lang} weekNumber={recap.weekNumber} />}

        {/* 4b — What Was Present (emotional habit observation, ≥ 2 completions) */}
        {weekHabitData.length > 0 && <SectionHabitPresence topHabits={weekHabitData} lang={lang} weekNumber={recap.weekNumber} />}

        {/* 5 — What Your Mind Was Asking For */}
        {insights.topCategories.length > 0 && <SectionCategories insights={insights} lang={lang} />}

        {/* 6 — Words of the Week (always shown — derived from context when no word_of_day) */}
        <SectionWords insights={insights} lang={lang} weekNumber={recap.weekNumber} />

        {/* 7 — A Moment That Stood Out */}
        {insights.highlight && <SectionHighlight insights={insights} lang={lang} />}

        {/* 8 — What Changed (cross-week memory when prev exists; intra-week trend as fallback) */}
        {(insights.trendDirection || prevInsights) && (
          <SectionTrend insights={insights} lang={lang} prevInsights={prevInsights} weekNumber={recap.weekNumber} />
        )}

        {/* 9 — A Quiet Observation */}
        <SectionObservation insights={insights} lang={lang} weekNumber={recap.weekNumber} profile={profile} narrativeState={recap.narrativeState} usedThemes={usedThemes} />

        {/* 10 — Looking Ahead */}
        <SectionLookingAhead insights={insights} lang={lang} weekNumber={recap.weekNumber} profile={profile} goal={goal} narrativeState={recap.narrativeState} />

        {/* 10b — On Who You Are Becoming (only if answer is meaningful) */}
        {identityAnswer && isIdentityAnswerMeaningful(identityAnswer)
          ? <SectionIdentityAnchor answer={identityAnswer} lang={lang} weekNumber={recap.weekNumber} />
          : null}

        {/* 11 — A Note From Your Week (requires ≥ 4 resets and ≥ 7 days) */}
        {progress.completedDays.length >= 4 && progress.currentDay >= 7 && (
          <SectionNoteFromWeek insights={insights} lang={lang} profile={profile} weekNumber={recap.weekNumber} goal={goal} mantra={personalMantra} narrativeState={recap.narrativeState} />
        )}

        {/* 12 — A Word From Your Arrival — hidden when mantra already appears in SectionNoteFromWeek
             or when the mantra word is present in the identity answer */}
        {personalMantra
          && shouldShowMantraInWeekly(recap.weekNumber, progress.completedDays.length)
          && !(progress.completedDays.length >= 4 && progress.currentDay >= 7)
          && !(identityAnswer && identityAnswer.toLowerCase().includes(personalMantra.toLowerCase()))
          && <SectionMantraEcho mantra={personalMantra} weekNumber={recap.weekNumber} />}

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

// ─── Section 11 — A Note From Your Week ──────────────────────────────────────

function SectionNoteFromWeek({ insights, lang, profile, weekNumber, goal, mantra, narrativeState }: { insights: WeekInsights; lang: string; profile?: EmotionalProfile | null; weekNumber?: number; goal?: UserGoal | null; mantra?: string | null; narrativeState?: string | null }) {
  const title =
    lang === 'pt' ? 'UMA NOTA DA SUA SEMANA' :
    lang === 'es' ? 'UNA NOTA DE TU SEMANA' :
    lang === 'fr' ? 'UNE NOTE DE TA SEMAINE' :
    lang === 'de' ? 'EIN WOCHENRÜCKBLICK' :
    'A NOTE FROM YOUR WEEK';

  const note = generateWeekNote(insights, lang, profile, weekNumber, goal, mantra, narrativeState);
  if (!note) return null;

  return (
    <FadeIn delay={760}>
      <View style={styles.section}>
        <SectionLabel>{title}</SectionLabel>
        <View style={[styles.card, styles.weekNoteCard]}>
          {note.lines.map((line, i) => (
            <Text
              key={i}
              style={[styles.weekNoteLine, i > 0 && styles.weekNoteLineIndent]}
            >
              {line}
            </Text>
          ))}
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Section 12 — A Word From Your Arrival ───────────────────────────────────
// Surfaces the personal mantra chosen at onboarding. Rare — ~30% of weeks.
// The user should feel remembered, not profiled.

function SectionMantraEcho({
  mantra,
  weekNumber,
}: {
  mantra: string;
  weekNumber: number;
}) {
  const { t } = useLanguage();
  const variant = mantraWeeklyVariant(weekNumber);
  const key = `mantra.weekly.v${variant}` as const;
  const body = t(key, { mantra });
  const label = t('mantra.weekly.label');

  return (
    <FadeIn delay={840}>
      <View style={styles.section}>
        <SectionLabel>{label}</SectionLabel>
        <View style={[styles.card, mantraStyles.card]}>
          <Text style={mantraStyles.body}>{body}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

const mantraStyles = StyleSheet.create({
  card: {
    borderColor: 'rgba(201,151,58,0.10)',
    backgroundColor: 'rgba(201,151,58,0.03)',
  },
  body: {
    fontSize: 15,
    color: '#6B6B6B',
    lineHeight: 26,
    letterSpacing: 0.1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

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

  // ── A Note From Your Week ────────────────────────────────────────────────────
  weekNoteCard: {
    borderColor: `${Colors.gold}22`,
    backgroundColor: `${Colors.gold}06`,
    gap: Spacing.sm,
  },
  weekNoteLine: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  weekNoteLineIndent: {
    paddingTop: 2,
  },

  // ── Identity Anchor ──────────────────────────────────────────────────────────
  identityCard: {
    gap: Spacing.md,
  },
  identityQuote: {
    fontSize: Typography.sizes.sm + 1,
    color: Colors.textPrimary,
    lineHeight: 26,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  identityFraming: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
});

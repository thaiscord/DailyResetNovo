// ─── milestone-ceremony.tsx ───────────────────────────────────────────────────
// Cinematic emotional milestone moment — felt, not seen.
// Visual depth evolves with milestone magnitude.
// Copy personalizes to emotional archetype when profile is set.

import { useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii } from '../theme';
import {
  getMilestoneCeremonyOrNearest,
} from '../utils/milestoneSystem';
import { useMilestones } from '../hooks/useMilestones';
import { useProgress } from '../hooks/useProgress';
import { usePersonalization } from '../hooks/usePersonalization';
import { useAnticipation } from '../hooks/useAnticipation';
import { requestReviewIfAppropriate } from '../utils/reviewRequest';
import { getActiveLang } from '../utils/langStore';

const { width, height } = Dimensions.get('window');

// ─── Visual depth ─────────────────────────────────────────────────────────────
// Communicates emotional maturity without announcing it.
// Higher milestones get richer ambient presence.

function getDepthLevel(streak: number): 0 | 1 | 2 | 3 {
  if (streak >= 90) return 3;
  if (streak >= 30) return 2;
  if (streak >= 7)  return 1;
  return 0;
}

// [outer, middle, inner] glow hex opacities per depth level
const GLOW_HEX: [string, string, string][] = [
  ['20', '12', '09'],  // depth 0 — barely-there warmth
  ['32', '1E', '14'],  // depth 1 — warmer presence
  ['50', '30', '22'],  // depth 2 — rich ambient
  ['70', '4A', '35'],  // depth 3 — cinematic depth
];

// ─── Ambient particles ────────────────────────────────────────────────────────
// Density scales with depth — subconsciously signals emotional weight.

const ALL_PARTICLES = [
  { rx: 0.12, ry: 0.10, size: 2, duration: 5200, delay: 0 },
  { rx: 0.83, ry: 0.18, size: 3, duration: 6800, delay: 900 },
  { rx: 0.55, ry: 0.07, size: 2, duration: 4900, delay: 1700 },
  { rx: 0.22, ry: 0.38, size: 2, duration: 7200, delay: 400 },
  { rx: 0.76, ry: 0.44, size: 3, duration: 5600, delay: 2100 },
  { rx: 0.08, ry: 0.62, size: 2, duration: 6400, delay: 1300 },
  { rx: 0.66, ry: 0.71, size: 3, duration: 5800, delay: 600 },
  { rx: 0.40, ry: 0.84, size: 2, duration: 7000, delay: 1900 },
  { rx: 0.30, ry: 0.25, size: 2, duration: 6200, delay: 2400 },
  { rx: 0.70, ry: 0.60, size: 3, duration: 5400, delay: 800 },
  { rx: 0.15, ry: 0.75, size: 2, duration: 7400, delay: 1500 },
  { rx: 0.90, ry: 0.35, size: 3, duration: 6000, delay: 2800 },
];

const PARTICLE_COUNTS: [4, 6, 9, 12] = [4, 6, 9, 12];

function ParticleItem({
  rx, ry, size, duration, delay, color,
}: { rx: number; ry: number; size: number; duration: number; delay: number; color: string }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;
    const timeout = setTimeout(() => {
      loop = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0.18 + size * 0.06,
              duration: duration * 0.4,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(ty, {
              toValue: -8 - size * 2,
              duration: duration * 0.5,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: duration * 0.6,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(ty, {
              toValue: 0,
              duration: duration * 0.5,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      loop.start();
    }, delay);

    return () => {
      clearTimeout(timeout);
      loop?.stop();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: rx * width,
        top: ry * height,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY: ty }],
      }}
    />
  );
}

function AmbientParticles({ depth, color }: { depth: 0 | 1 | 2 | 3; color: string }) {
  const count = PARTICLE_COUNTS[depth];
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {ALL_PARTICLES.slice(0, count).map((p, i) => (
        <ParticleItem key={i} {...p} color={color} />
      ))}
    </View>
  );
}

// ─── Timed fade-in + lift ─────────────────────────────────────────────────────
function FadeUp({
  delay = 0,
  duration = 600,
  children,
}: {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Divider that draws in from center ───────────────────────────────────────
function GoldDivider({ delay = 0, color }: { delay?: number; color: string }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleX  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(scaleX,   { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        height: 2, width: 40,
        backgroundColor: color,
        borderRadius: 1,
        opacity,
        transform: [{ scaleX }],
        alignSelf: 'center',
      }}
    />
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function MilestoneCeremonyScreen() {
  const router = useRouter();
  const { streak: streakParam } = useLocalSearchParams<{ streak?: string }>();
  const streak = streakParam ? parseInt(streakParam, 10) : 0;

  const { markSeen } = useMilestones();
  const { progress } = useProgress();
  const { getMilestoneMessage, getReflection } = usePersonalization();
  const { chapter } = useAnticipation();

  const ceremony     = getMilestoneCeremonyOrNearest(streak);
  const depth        = getDepthLevel(streak);
  const accentColor  = ceremony.accentColor;

  // Personalized copy — falls back to ceremony defaults gracefully
  const personalMsg  = getMilestoneMessage(streak);
  const headline     = personalMsg?.title  ?? ceremony.headline;
  const narrative    = personalMsg?.sub    ?? ceremony.narrative;
  const reflection   = getReflection(streak) ?? ceremony.reflection;

  // Comeback detection: many past days, low current streak → returning user
  const totalDays    = progress.completedDays.length;
  const isComeback   = totalDays > streak + 5 && streak <= 14;

  // Chapter context: quiet frame for the journey (not on very first chapter)
  const showChapterContext = streak >= 7 && chapter.id !== 'first-steps';

  // ── Glow animation ─────────────────────────────────────────────────────────
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale   = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Immediate haptic: something is beginning
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // 800ms: silence gives way — moment of stillness complete
    const hapticTimer = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 800);

    // Glow rises slowly — cinematic, not abrupt
    Animated.parallel([
      Animated.timing(glowOpacity, {
        toValue: 1, duration: 1800, delay: 100,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(glowScale, {
        toValue: 1, duration: 1800, delay: 100,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start(() => {
      // Breathing — wider amplitude at deeper levels
      const breathMin = depth >= 2 ? 0.5 : 0.65;
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: breathMin, duration: 3500,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 1, duration: 3500,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    return () => clearTimeout(hapticTimer);
  }, []);

  const handleContinue = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await markSeen(streak, ceremony.label);

    if ([7, 30, 90].includes(streak)) {
      const trigger = streak === 7 ? 'milestone_7' :
                      streak === 30 ? 'milestone_30' : 'milestone_90';
      requestReviewIfAppropriate(trigger, streak, progress.completedDays.length);
    }

    router.back();
  }, [streak, ceremony.label, markSeen, router, progress.completedDays.length]);

  const [outerHex, middleHex, innerHex] = GLOW_HEX[depth];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── AMBIENT PARTICLES ─────────────────────────────────────────────── */}
      <AmbientParticles depth={depth} color={accentColor} />

      {/* ── RADIAL GLOW (depth-scaled intensity) ──────────────────────────── */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glowContainer,
          { opacity: glowOpacity, transform: [{ scale: glowScale }] },
        ]}
      >
        <LinearGradient
          colors={[`${accentColor}${outerHex}`, `${accentColor}00`]}
          style={styles.glowOuter}
        />
        <LinearGradient
          colors={[`${accentColor}${middleHex}`, `${accentColor}00`]}
          style={styles.glowMiddle}
        />
        <LinearGradient
          colors={[`${accentColor}${innerHex}`, `${accentColor}00`]}
          style={styles.glowInner}
        />
      </Animated.View>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      {/*
        Timing: 0–1000ms is the moment of stillness — only glow + particles.
        Text reveals begin at 1000ms, spaced to feel intentional, never abrupt.
      */}
      <View style={styles.content}>

        {/* Eyebrow */}
        <FadeUp delay={1000} duration={500}>
          <Text style={styles.eyebrow}>{ceremony.eyebrow}</Text>
        </FadeUp>

        {/* Divider draws in */}
        <View style={{ height: Spacing.lg, justifyContent: 'center' }}>
          <GoldDivider delay={1200} color={accentColor} />
        </View>

        {/* Big milestone number or symbolic label */}
        <FadeUp delay={1400} duration={700}>
          <Text style={[styles.bigNumber, { color: Colors.white }]}>
            {streak <= 21 ? streak : ceremony.label}
          </Text>
          {streak <= 21 && (
            <Text style={[styles.daysLabel, { color: accentColor }]}>
              {getActiveLang() === 'de' ? 'TAGE'
                : getActiveLang() === 'es' ? 'DÍAS'
                : getActiveLang() === 'pt' ? 'DIAS'
                : getActiveLang() === 'fr' ? 'JOURS'
                : 'DAYS'}
            </Text>
          )}
        </FadeUp>

        {/* Second divider — softer */}
        <View style={{ height: Spacing.xl, justifyContent: 'center' }}>
          <GoldDivider delay={1700} color={`${accentColor}55`} />
        </View>

        {/* Headline — personalized when archetype is known */}
        <FadeUp delay={1900} duration={600}>
          <Text style={styles.headline}>{headline}</Text>
        </FadeUp>

        {/* Narrative — personalized when archetype is known */}
        <FadeUp delay={2150} duration={600}>
          <Text style={styles.narrative}>{narrative}</Text>
        </FadeUp>

        {/* Identity shift — quiet, italic, second voice */}
        <FadeUp delay={2400} duration={600}>
          <View style={styles.identityRow}>
            <View style={[styles.identityDot, { backgroundColor: accentColor }]} />
            <Text style={styles.identityText}>{ceremony.identityShift}</Text>
          </View>
        </FadeUp>

        {/* Comeback whisper — non-punishing, only for returning users */}
        {isComeback && (
          <FadeUp delay={2550} duration={500}>
            <Text style={styles.comebackText}>
              {getActiveLang() === 'de' ? 'Du bist zurückgekehrt. Das zählt.'
                : getActiveLang() === 'pt' ? 'Você voltou. Isso importa.'
                : getActiveLang() === 'es' ? 'Volviste. Eso importa.'
                : getActiveLang() === 'fr' ? 'Tu es revenu ici. Ça compte.'
                : 'You came back. That matters.'}
            </Text>
          </FadeUp>
        )}

        {/* Chapter context — places the milestone in the larger journey */}
        {showChapterContext && (
          <FadeUp delay={2650} duration={600}>
            <View style={styles.chapterWrap}>
              <Text style={styles.chapterEyebrow}>{chapter.eyebrow}</Text>
              <Text style={styles.chapterTagline}>{chapter.tagline}</Text>
            </View>
          </FadeUp>
        )}

        {/* Reflection card */}
        <FadeUp delay={2900} duration={700}>
          <View style={styles.reflectionCard}>
            <Text style={[styles.reflectionEyebrow, { color: accentColor }]}>
              {getActiveLang() === 'de' ? 'EINE FRAGE FÜR DICH'
                : getActiveLang() === 'es' ? 'UNA PREGUNTA PARA TI'
                : getActiveLang() === 'pt' ? 'UMA PERGUNTA PARA VOCÊ'
                : getActiveLang() === 'fr' ? 'UNE QUESTION POUR TOI'
                : 'A QUESTION FOR YOU'}
            </Text>
            <Text style={styles.reflectionText}>{`"${reflection}"`}</Text>
          </View>
        </FadeUp>

      </View>

      {/* ── CONTINUE BUTTON ─────────────────────────────────────────────────── */}
      <FadeUp delay={3300} duration={600}>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={[styles.continueBtn, { shadowColor: accentColor }]}
            onPress={handleContinue}
            activeOpacity={0.82}
          >
            <Text style={styles.continueBtnText}>
              {getActiveLang() === 'de' ? 'Weiter'
                : getActiveLang() === 'es' ? 'Continuar'
                : getActiveLang() === 'pt' ? 'Continuar'
                : getActiveLang() === 'fr' ? 'Continuer'
                : 'Continue'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.continueHint}>
            {ceremony.label}
          </Text>
        </View>
      </FadeUp>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // ── Glow ──────────────────────────────────────────────────────────────────────
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  glowOuter: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
  },
  glowMiddle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  glowInner: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
  },

  // ── Content ───────────────────────────────────────────────────────────────────
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    width: '100%',
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 3,
    textAlign: 'center',
  },
  bigNumber: {
    fontSize: 96,
    fontWeight: Typography.weights.black,
    letterSpacing: -4,
    lineHeight: 96,
    textAlign: 'center',
  },
  daysLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  headline: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 32,
  },
  narrative: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: Spacing.sm,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  identityDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  identityText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.40)',
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'left',
  },

  // ── Comeback whisper ──────────────────────────────────────────────────────────
  comebackText: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: 0.4,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },

  // ── Chapter context ───────────────────────────────────────────────────────────
  chapterWrap: {
    alignItems: 'center',
    gap: 3,
    marginTop: Spacing.md,
    opacity: 0.32,
  },
  chapterEyebrow: {
    fontSize: 7,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 2.5,
  },
  chapterTagline: {
    fontSize: Typography.sizes.xs,
    color: Colors.white,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },

  // ── Reflection card ───────────────────────────────────────────────────────────
  reflectionCard: {
    marginTop: Spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: Spacing.lg,
    gap: Spacing.sm,
    width: '100%',
  },
  reflectionEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 2,
  },
  reflectionText: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.70)',
    fontStyle: 'italic',
    lineHeight: 26,
  },

  // ── Button ────────────────────────────────────────────────────────────────────
  buttonWrap: {
    width: '100%',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  continueBtn: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius: 20,
    elevation: 10,
  },
  continueBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
    letterSpacing: 0.3,
  },
  continueHint: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 1,
  },
});

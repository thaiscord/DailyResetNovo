import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { useLanguage } from '../hooks/useLanguage';
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import { getProfileFutureSelfMessage } from '../utils/emotionalProfile';
import {
  getFutureIdentityPhase,
  getFutureReflectionPrompt,
  getComebackFutureNarrative,
  getFutureSelfNarrativeLocal,
  getCuratedFutureSelfMessage,
} from '../utils/futureSelf';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FutureSelfCardVariant =
  | 'dynamic'      // today screen — evolving curated emotional identity card
  | 'standard'     // after daily completion — future self message
  | 'reflection'   // weekly recap — reflective question
  | 'comeback'     // after absence — compassionate future framing
  | 'phase';       // progress screen — current identity phase

interface Props {
  streak: number;
  totalDays: number;
  variant?: FutureSelfCardVariant;
  delay?: number;
  style?: object;
  hideBody?: boolean;
  daysMissed?: number;      // for 'dynamic' variant
  seed?: number;            // for 'dynamic' variant — typically currentDay
  customHeadline?: string;  // intention override — replaces computed headline
}

// ─── Animation wrapper ────────────────────────────────────────────────────────

function FadeSlide({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function FutureSelfCard({
  streak,
  totalDays,
  variant = 'standard',
  delay = 0,
  style,
  hideBody = false,
  daysMissed = 0,
  seed,
  customHeadline,
}: Props) {
  const { t } = useLanguage();
  const { profile } = useEmotionalProfile();
  const phase = getFutureIdentityPhase(streak, totalDays);

  let eyebrow = t('future.self.eyebrow');
  let headline = '';
  let body = '';
  let showAccentBar = true;

  switch (variant) {
    case 'dynamic': {
      const msg = getCuratedFutureSelfMessage(streak, totalDays, daysMissed, seed ?? streak);
      headline = msg.headline;
      body = profile
        ? getProfileFutureSelfMessage(profile, seed ?? streak)
        : (msg.body ?? '');
      break;
    }
    case 'standard': {
      const msg = getFutureSelfNarrativeLocal(streak, totalDays);
      headline = msg.headline;
      body = profile
        ? getProfileFutureSelfMessage(profile, streak)
        : msg.body;
      break;
    }
    case 'reflection': {
      const prompt = getFutureReflectionPrompt(streak, totalDays);
      eyebrow = t('future.self.question');
      headline = prompt;
      body = t('future.self.prompt.sub');
      showAccentBar = false;
      break;
    }
    case 'comeback': {
      const msg = getComebackFutureNarrative(totalDays);
      headline = msg.headline;
      body = msg.body;
      break;
    }
    case 'phase': {
      eyebrow = phase.label.toUpperCase();
      headline = phase.message;
      body = phase.subtext;
      break;
    }
  }

  // Intention override takes priority over computed headline
  const displayHeadline = customHeadline ?? headline;

  return (
    <FadeSlide delay={delay}>
      <View style={[styles.card, style]}>
        {showAccentBar && <View style={styles.accentBar} />}
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.headline}>{displayHeadline}</Text>
        {body && !hideBody ? <Text style={styles.body}>{body}</Text> : null}
      </View>
    </FadeSlide>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    gap: 6,
    ...Shadows.charcoal,
  },
  accentBar: {
    width: 24,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    marginBottom: 2,
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  headline: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  body: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.50)',
    lineHeight: 20,
  },
});

import { useRef, useEffect, useCallback } from 'react';
import { track } from '../utils/analytics';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { EmotionalProfile } from './emotional-onboarding';
import { DailyResetLogo } from '../components/DailyResetLogo';

const { width } = Dimensions.get('window');

// ─── Profile-based personalized messages ─────────────────────────────────────

interface ProfileMessage {
  eyebrow:  string;
  title:    string;
  subtitle: string;
  microcopy: string;
}

const PROFILE_MESSAGES: Record<EmotionalProfile, ProfileMessage> = {
  focus: {
    eyebrow:   'YOUR RESET BEGINS',
    title:     'We\'ll help you protect\nyour attention.',
    subtitle:  'One focused reset at a time.',
    microcopy: 'Your attention is worth protecting. That\'s what we\'re here for.',
  },
  calm: {
    eyebrow:   'YOUR RESET BEGINS',
    title:     'We\'ll help you find\ncalm again.',
    subtitle:  'Slowly. Without pressure.',
    microcopy: 'There\'s no rush here. We\'ll move at your pace.',
  },
  confidence: {
    eyebrow:   'YOUR RESET BEGINS',
    title:     'We\'ll help you trust\nyourself again.',
    subtitle:  'One small action at a time.',
    microcopy: 'Trust is built in small moments. Starting with today.',
  },
  burnout: {
    eyebrow:   'YOUR RESET BEGINS',
    title:     'We\'ll help you rebuild\nslowly.',
    subtitle:  'There\'s no pressure here.',
    microcopy: 'You don\'t need to carry everything today. Just one small reset.',
  },
};

// ─── Timed fade-in ────────────────────────────────────────────────────────────

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
  const ty      = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ty,      { toValue: 0, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function OnboardingComplete() {
  const router = useRouter();
  const { profile: profileParam } = useLocalSearchParams<{ profile?: string }>();
  const profile = (profileParam as EmotionalProfile) ?? 'calm';
  const msg = PROFILE_MESSAGES[profile] ?? PROFILE_MESSAGES.calm;

  useEffect(() => {
    track('onboarding_completed');
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 800);
  }, []);

  const ctaScale = useRef(new Animated.Value(1)).current;
  const handleCtaPressIn  = () => Animated.timing(ctaScale, { toValue: 0.98, duration: 90, useNativeDriver: true }).start();
  const handleCtaPressOut = () => Animated.spring(ctaScale, { toValue: 1, friction: 9, useNativeDriver: true }).start();

  const handleStart = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/notification-setup');
  }, [router]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* ── Subtle accent glow ───────────────────────────────────────────────── */}
      <View style={styles.glowWrap} pointerEvents="none">
        <View style={styles.glowOuter} />
        <View style={styles.glowInner} />
      </View>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <View style={styles.content}>

        {/* Logo */}
        <FadeUp delay={0}>
          <DailyResetLogo width={260} height={130} />
        </FadeUp>

        {/* Eyebrow */}
        <FadeUp delay={300}>
          <Text style={styles.eyebrow}>{msg.eyebrow}</Text>
        </FadeUp>

        {/* Title */}
        <FadeUp delay={500} duration={700}>
          <Text style={styles.title}>{msg.title}</Text>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={750} duration={600}>
          <Text style={styles.subtitle}>{msg.subtitle}</Text>
        </FadeUp>

        {/* Gold divider */}
        <FadeUp delay={950}>
          <View style={styles.divider} />
        </FadeUp>

        {/* Microcopy */}
        <FadeUp delay={1100} duration={600}>
          <Text style={styles.microcopy}>{msg.microcopy}</Text>
        </FadeUp>

        {/* Principles */}
        <FadeUp delay={1350} duration={600}>
          <View style={styles.pillsRow}>
            {['One reset daily', 'No pressure', 'At your pace'].map(p => (
              <View key={p} style={styles.pill}>
                <Text style={styles.pillText}>{p}</Text>
              </View>
            ))}
          </View>
        </FadeUp>

      </View>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <FadeUp delay={1700} duration={600}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={handleStart}
            onPressIn={handleCtaPressIn}
            onPressOut={handleCtaPressOut}
            activeOpacity={1}
          >
            <Animated.View style={{ transform: [{ scale: ctaScale }], alignItems: 'center', width: '100%' }}>
            <Text style={styles.ctaText}>Begin My Reset</Text>
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.ctaHint}>
            One small intentional step at a time.
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
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: 72,
    paddingBottom: 48,
  },

  // ── Glow ─────────────────────────────────────────────────────────────────────
  glowWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '30%',
  },
  glowOuter: {
    position: 'absolute',
    top: '20%',
    width: width * 0.74,
    height: width * 0.74,
    borderRadius: width * 0.37,
    backgroundColor: `${Colors.accent}09`,
  },
  glowInner: {
    position: 'absolute',
    top: '28%',
    width: width * 0.42,
    height: width * 0.42,
    borderRadius: width * 0.21,
    backgroundColor: `${Colors.accent}07`,
  },

  // ── Content ───────────────────────────────────────────────────────────────────
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
  },
  microcopy: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
    fontStyle: 'italic',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  pill: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pillText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },

  // ── Footer ────────────────────────────────────────────────────────────────────
  footer: {
    gap: Spacing.md,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 19,
    alignItems: 'center',
    ...Shadows.charcoal,
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  ctaHint: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});

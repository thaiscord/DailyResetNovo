// ─── Onboarding Screen 1: The Mirror ─────────────────────────────────────────
// Dark. Quiet. No progress indicator. No skip.
// Lines appear one by one — like someone quietly acknowledging what you carry.
// Button appears after text settles. Tap fades like an exhale.

import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Platform, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { track } from '../../utils/analytics';

const DARK_BG = '#1A1A18';
const GOLD    = '#C9A84C';

function FadeIn({
  delay = 0,
  duration = 420,
  children,
}: {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, duration, delay,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

export default function OnboardingMirror() {
  const router = useRouter();
  const btnOpacity  = useRef(new Animated.Value(0)).current;
  const btnTransY   = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    track('onboarding_started');
    // Button enters after text settles (~1.8s total)
    Animated.parallel([
      Animated.timing(btnOpacity, {
        toValue: 1, duration: 500, delay: 1800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(btnTransY, {
        toValue: 0, duration: 500, delay: 1800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    track('onboarding_mirror_tapped');
    router.push('/onboarding/language');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Text — centered, unhurried */}
      <View style={styles.content}>
        <FadeIn delay={400}>
          <Text style={styles.eyebrow}>BEFORE WE START</Text>
        </FadeIn>

        <FadeIn delay={820}>
          <Text style={styles.headline}>{"You're carrying\na lot right now."}</Text>
        </FadeIn>

        <FadeIn delay={1240}>
          <Text style={styles.body}>
            {"That's not a problem to fix.\nThat's just where you are."}
          </Text>
        </FadeIn>
      </View>

      {/* Full-width gold button — appears after text settles */}
      <Animated.View
        style={[styles.footer, { opacity: btnOpacity, transform: [{ translateY: btnTransY }] }]}
      >
        <TouchableOpacity style={styles.btn} onPress={handlePress} activeOpacity={0.82}>
          <Text style={styles.btnText}>I know this feeling</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 28,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 3.2,
  },
  headline: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.52)',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  btn: {
    backgroundColor: GOLD,
    borderRadius: 999,
    paddingVertical: 19,
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A18',
    letterSpacing: 0.1,
  },
});

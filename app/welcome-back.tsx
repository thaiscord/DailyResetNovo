// ─── Welcome Back Experience ──────────────────────────────────────────────────
// Gentle re-entry ritual for returning users. Shown before the Today screen.
// 3–7 seconds total. Tap anywhere to skip instantly.
// Tone: calm, grounding, premium, emotionally warm. Never motivational.
// All copy comes from locales/translations.ts (wb.* keys).

import { useRef, useEffect, useCallback } from 'react';
import {
  View, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { DailyResetLogo } from '../components/DailyResetLogo';
import { useLanguage } from '../hooks/useLanguage';
import { getWelcomeMessageKey, type WelcomeBackState } from '../utils/welcomeBack';

const { width } = Dimensions.get('window');

export default function WelcomeBackScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { state: rawState, seed: rawSeed } = useLocalSearchParams<{
    state?: string;
    seed?: string;
  }>();

  const state = (rawState ?? 'first_of_day') as WelcomeBackState;
  const seed  = parseInt(rawSeed ?? '0', 10);
  const messageKey = getWelcomeMessageKey(state, seed);
  const message = t(messageKey);

  const screenOpacity = useRef(new Animated.Value(1)).current;
  const glowOpacity   = useRef(new Animated.Value(0)).current;
  const logoOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale     = useRef(new Animated.Value(0.94)).current;
  const msgOpacity    = useRef(new Animated.Value(0)).current;
  const msgSlide      = useRef(new Animated.Value(10)).current;

  // Outer halo — opacity + scale breathe together
  const glowPulse  = useRef(new Animated.Value(0.7)).current;
  const glowScale  = useRef(new Animated.Value(1.0)).current;

  // Inner halo — same cycle, ~1.1s phase offset so they never breathe in unison
  const innerPulse = useRef(new Animated.Value(0.45)).current;
  const innerScale = useRef(new Animated.Value(1.0)).current;

  const hasNavigated   = useRef(false);
  const innerTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateAway = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 380,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => router.replace('/(tabs)/today'));
  }, [router, screenOpacity]);

  useEffect(() => {
    // ── Entry sequence: glow → logo → message → hold → exit ─────────────────
    Animated.sequence([
      Animated.timing(glowOpacity, {
        toValue: 1, duration: 600,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 900,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1, duration: 900,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(msgOpacity, {
          toValue: 1, duration: 700,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(msgSlide, {
          toValue: 0, duration: 700,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
      ]),
      Animated.delay(3800),
    ]).start(navigateAway);

    // ── Outer halo breathing — 5.5s cycle, ±2.5% scale ──────────────────────
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, {
          toValue: 1.025, duration: 2750,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(glowScale, {
          toValue: 1.0, duration: 2750,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1.0, duration: 2750,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.65, duration: 2750,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ])
    ).start();

    // ── Inner halo breathing — same cycle, ~1.1s phase offset ────────────────
    innerTimerRef.current = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(innerScale, {
            toValue: 1.02, duration: 2750,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
          Animated.timing(innerScale, {
            toValue: 1.0, duration: 2750,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(innerPulse, {
            toValue: 0.85, duration: 2750,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
          Animated.timing(innerPulse, {
            toValue: 0.45, duration: 2750,
            easing: Easing.inOut(Easing.sin), useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1100);

    return () => {
      if (innerTimerRef.current) clearTimeout(innerTimerRef.current);
      glowScale.stopAnimation();
      glowPulse.stopAnimation();
      innerScale.stopAnimation();
      innerPulse.stopAnimation();
    };
  }, []);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={1}
      onPress={navigateAway}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: screenOpacity }]}>
        <StatusBar barStyle="light-content" />

        {/* Soft ambient warmth — very low opacity radial-ish glow behind the rings */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ambientContainer,
            { opacity: Animated.multiply(glowOpacity, 0.9 as any) },
          ]}
        >
          <LinearGradient
            colors={['rgba(201,168,76,0.08)', 'rgba(201,168,76,0.00)']}
            style={styles.ambient}
          />
        </Animated.View>

        {/* Outer halo ring — translucent edge, near-invisible center, breathes */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.outerHaloContainer,
            {
              opacity: Animated.multiply(glowOpacity, glowPulse),
              transform: [{ translateY: -20 }, { scale: glowScale }],
            },
          ]}
        >
          <View style={styles.outerHalo} />
        </Animated.View>

        {/* Inner halo ring — slightly smaller, phase-offset breathing */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.innerHaloContainer,
            {
              opacity: Animated.multiply(glowOpacity, innerPulse),
              transform: [{ translateY: 28 }, { scale: innerScale }],
            },
          ]}
        >
          <View style={styles.innerHalo} />
        </Animated.View>

        {/* Content centered */}
        <View style={styles.content}>
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}
          >
            <DailyResetLogo
              width={Math.round(width * 1.05)}
              height={Math.round(width * 0.52)}
            />
          </Animated.View>

          <Animated.Text
            style={[
              styles.message,
              {
                opacity: msgOpacity,
                transform: [{ translateY: msgSlide }],
              },
            ]}
          >
            {message}
          </Animated.Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1A1A18',
  },

  // Soft gradient blob — ambient golden warmth, very faint
  ambientContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ambient: {
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
  },

  // Outer halo ring — thin translucent border, nearly transparent fill
  outerHaloContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerHalo: {
    width: width * 1.25,
    height: width * 1.25,
    borderRadius: width * 0.625,
    borderWidth: 1.5,
    borderColor: 'rgba(201,168,76,0.20)',
    backgroundColor: 'rgba(201,168,76,0.03)',
  },

  // Inner halo ring — slightly smaller, thinner border
  innerHaloContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerHalo: {
    width: width * 0.78,
    height: width * 0.78,
    borderRadius: width * 0.39,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.13)',
    backgroundColor: 'rgba(201,168,76,0.04)',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  message: {
    marginTop: -18,
    fontSize: 19,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.52)',
    letterSpacing: 0.6,
    textAlign: 'center',
    lineHeight: 28,
  },
});

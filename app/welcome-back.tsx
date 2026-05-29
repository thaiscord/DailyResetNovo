// ─── Welcome Back Experience ──────────────────────────────────────────────────
// Gentle re-entry ritual for returning users. Shown before the Today screen.
// 3–7 seconds total. Tap anywhere to skip instantly.
// Tone: calm, grounding, premium, emotionally warm. Never motivational.
// All copy comes from locales/translations.ts (wb.* keys).

import { useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
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
  const glowPulse     = useRef(new Animated.Value(0.55)).current;
  const glowScale     = useRef(new Animated.Value(1)).current;

  const hasNavigated = useRef(false);

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
    // Entry sequence: glow → logo → message → hold → exit
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

    // Opacity breathing — calming pulse on glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1, duration: 3200,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.45, duration: 3200,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ]),
    ).start();

    // Scale breathing — imperceptibly slow, like the room breathing (12s cycle)
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, {
          toValue: 1.03, duration: 6000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(glowScale, {
          toValue: 1.0, duration: 6000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={1}
      onPress={navigateAway}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: screenOpacity }]}>
        <StatusBar barStyle="light-content" />

        {/* Ambient warm glow — breathes via opacity + scale */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowContainer,
            {
              opacity: Animated.multiply(glowOpacity, glowPulse),
              transform: [{ translateY: -20 }, { scale: glowScale }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(201,168,76,0.34)', 'rgba(201,168,76,0.00)']}
            style={styles.glow}
          />
        </Animated.View>

        {/* Secondary deeper glow — scale-breathes in sync */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowContainerDeep,
            {
              opacity: Animated.multiply(glowOpacity, 0.55 as any),
              transform: [{ translateY: 40 }, { scale: glowScale }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(180,120,30,0.21)', 'rgba(180,120,30,0.00)']}
            style={styles.glowDeep}
          />
        </Animated.View>

        {/* Content centered */}
        <View style={styles.content}>
          {/* Logo with scale-in */}
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

          {/* Contextual message from i18n */}
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
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -20 }],
  },
  glow: {
    width: width * 1.25,
    height: width * 1.25,
    borderRadius: width * 0.625,
  },
  glowContainerDeep: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: 40 }],
  },
  glowDeep: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
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

// ─── Welcome Back Experience ──────────────────────────────────────────────────
// Gentle re-entry ritual for returning users. Shown before the Today screen.
// ~5s total. Tap anywhere to skip instantly.
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
  const glowBreath    = useRef(new Animated.Value(0.8)).current;
  const logoOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale     = useRef(new Animated.Value(0.96)).current;
  const msgOpacity    = useRef(new Animated.Value(0)).current;
  const msgSlide      = useRef(new Animated.Value(8)).current;

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
    // Glow + logo fade in together, then message, then hold and exit
    Animated.sequence([
      Animated.parallel([
        Animated.timing(glowOpacity, {
          toValue: 1, duration: 500,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 600,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1, duration: 700,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
      ]),
      Animated.delay(350),
      Animated.parallel([
        Animated.timing(msgOpacity, {
          toValue: 1, duration: 600,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(msgSlide, {
          toValue: 0, duration: 600,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
      ]),
      Animated.delay(3200),
    ]).start(navigateAway);

    // Very slow glow breath — almost imperceptible, 6s cycle
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowBreath, {
          toValue: 1.0, duration: 3000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(glowBreath, {
          toValue: 0.75, duration: 3000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ])
    ).start();

    return () => { glowBreath.stopAnimation(); };
  }, []);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={1}
      onPress={navigateAway}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: screenOpacity }]}>
        <StatusBar barStyle="light-content" />

        {/* Soft golden glow — small, centered behind the logo, breathes gently */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowContainer,
            { opacity: Animated.multiply(glowOpacity, glowBreath) },
          ]}
        >
          <LinearGradient
            colors={['rgba(201,168,76,0.13)', 'rgba(201,168,76,0.00)']}
            style={styles.glow}
          />
        </Animated.View>

        {/* Logo + message, centered */}
        <View style={styles.content}>
          <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
            <DailyResetLogo
              width={Math.round(width * 1.05)}
              height={Math.round(width * 0.52)}
            />
          </Animated.View>

          <Animated.Text
            style={[
              styles.message,
              { opacity: msgOpacity, transform: [{ translateY: msgSlide }] },
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

  // Small soft glow — sits behind the logo area, not a giant graphic
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    transform: [{ translateY: -(width * 0.06) }],
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

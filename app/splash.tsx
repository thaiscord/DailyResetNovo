// ─── Splash Screen ────────────────────────────────────────────────────────────
// Cinematic layering: glow → text (floating) → logo (true center).
// Text overlaps the upper glow zone — text and logo feel like one composition.

import { useRef, useEffect } from 'react';
import {
  View, StyleSheet, Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { DailyResetLogo } from '../components/DailyResetLogo';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const glowOpacity  = useRef(new Animated.Value(0)).current;
  const line1Opacity = useRef(new Animated.Value(0)).current;
  const line2Opacity = useRef(new Animated.Value(0)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Warm glow rises first (~300ms)
      Animated.timing(glowOpacity, {
        toValue: 1, duration: 300,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      // "You can slow down now." — soft fade
      Animated.timing(line1Opacity, {
        toValue: 1, duration: 500,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.delay(100),
      // "That already matters." — quieter arrival
      Animated.timing(line2Opacity, {
        toValue: 1, duration: 400,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.delay(200),
      // Logo fades into center at ~1.5s
      Animated.timing(logoOpacity, {
        toValue: 1, duration: 500,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      // Hold ~2.5s then navigate
      Animated.delay(2500),
    ]).start(() => router.replace('/onboarding/language'));
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Layer 1 — warm ambient glow */}
      <Animated.View
        pointerEvents="none"
        style={[styles.glowWrap, { opacity: glowOpacity }]}
      >
        <LinearGradient
          colors={['rgba(201,168,76,0.20)', 'rgba(201,168,76,0.00)']}
          style={styles.glow}
        />
      </Animated.View>

      {/* Layer 2 — logo, true visual center of the screen */}
      <Animated.View style={[styles.logoLayer, { opacity: logoOpacity }]}>
        <DailyResetLogo width={Math.round(width * 1.4)} height={Math.round(width * 0.7)} />
      </Animated.View>

      {/* Layer 3 — text floats in the upper glow zone, overlapping logo area */}
      <View style={styles.textLayer} pointerEvents="none">
        <Animated.Text style={[styles.line1, { opacity: line1Opacity }]}>
          You can slow down now.
        </Animated.Text>
        <Animated.Text style={[styles.line2, { opacity: line2Opacity }]}>
          That already matters.
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1A1A18',
  },
  glowWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: 20 }],
  },
  glow: {
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: width * 0.55,
  },
  logoLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 34 }],
  },
  textLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -Math.round(height * 0.12) + 58 }],
  },
  line1: {
    fontSize: 21,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.78)',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  line2: {
    fontSize: 17,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.28)',
    fontStyle: 'italic',
    letterSpacing: 0.4,
    textAlign: 'center',
    marginTop: 10,
  },
});

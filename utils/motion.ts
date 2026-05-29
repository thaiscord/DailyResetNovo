import { Animated, Easing } from 'react-native';

// ─── Duration tokens ──────────────────────────────────────────────────────────
export const MotionDuration = {
  fast:    280,
  base:    420,
  slow:    600,
  shimmer: 2600,
} as const;

// ─── Easing tokens ────────────────────────────────────────────────────────────
export const MotionEasing = {
  soft:   Easing.out(Easing.cubic),
  calm:   Easing.inOut(Easing.ease),
  gentle: Easing.out(Easing.quad),
  reveal: Easing.out(Easing.exp),
} as const;

// ─── Fade in from rest ────────────────────────────────────────────────────────
export function fadeInSoft(opacity: Animated.Value, delay = 0): Animated.CompositeAnimation {
  return Animated.timing(opacity, {
    toValue: 1,
    duration: MotionDuration.base,
    delay,
    easing: MotionEasing.soft,
    useNativeDriver: true,
  });
}

// ─── Staggered card reveal: opacity + slight upward drift ────────────────────
export function softCardReveal(
  opacity: Animated.Value,
  translateY: Animated.Value,
  delay = 0,
): Animated.CompositeAnimation {
  return Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1,
      duration: MotionDuration.base,
      delay,
      easing: MotionEasing.soft,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: MotionDuration.base,
      delay,
      easing: MotionEasing.soft,
      useNativeDriver: true,
    }),
  ]);
}

// ─── Unlock fade: content gently opens (8px drift, slow ease) ─────────────────
export function unlockFade(
  opacity: Animated.Value,
  translateY: Animated.Value,
): Animated.CompositeAnimation {
  opacity.setValue(0);
  translateY.setValue(8);
  return Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1,
      duration: MotionDuration.slow,
      easing: MotionEasing.gentle,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: MotionDuration.slow,
      easing: MotionEasing.gentle,
      useNativeDriver: true,
    }),
  ]);
}

// ─── Soft press: scale down on touch, spring back on release ─────────────────
export function createSoftPress(scale: Animated.Value) {
  return {
    onPressIn: () =>
      Animated.spring(scale, {
        toValue: 0.97,
        friction: 10,
        tension: 300,
        useNativeDriver: true,
      }).start(),
    onPressOut: () =>
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 180,
        useNativeDriver: true,
      }).start(),
  };
}

// ─── Slow shimmer loop: very restrained white pulse on premium elements ───────
export function startShimmerLoop(anim: Animated.Value): Animated.CompositeAnimation {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: MotionDuration.shimmer,
        easing: MotionEasing.calm,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: MotionDuration.shimmer,
        easing: MotionEasing.calm,
        useNativeDriver: true,
      }),
      Animated.delay(1800),
    ]),
  );
}

// ─── Calm transition: opacity only, used for screen/section reveals ───────────
export function calmTransition(
  opacity: Animated.Value,
  delay = 0,
): Animated.CompositeAnimation {
  return Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    delay,
    easing: MotionEasing.calm,
    useNativeDriver: true,
  });
}

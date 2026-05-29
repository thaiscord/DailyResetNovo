// ─── Premium Micro-Animation System ─────────────────────────────────────────
// Philosophy: calm, elegant, Apple-quality feel.
// Never gamified, never loud. Every animation has purpose.

import { Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';

// ── Spring presets ────────────────────────────────────────────────────────────
export const Springs = {
  // Subtle — barely perceptible, just enough to feel premium
  gentle: { friction: 10, tension: 120 },
  // Standard — confident, clean, no bounce
  standard: { friction: 8, tension: 160 },
  // Satisfying — slight bounce for completion moments
  satisfying: { friction: 6, tension: 180 },
  // Micro — fast micro-interaction (button press)
  micro: { friction: 12, tension: 300 },
};

// ── Timing presets ────────────────────────────────────────────────────────────
export const Timing = {
  fast:   150,  // Button response
  normal: 300,  // UI transitions
  slow:   600,  // Progress fills
  gentle: 800,  // Emotional moments
};

// ── Easing presets ────────────────────────────────────────────────────────────
export const Easings = {
  out:    Easing.out(Easing.cubic),
  inOut:  Easing.inOut(Easing.cubic),
  smooth: Easing.bezier(0.25, 0.46, 0.45, 0.94),
};

// ── Haptic helpers ────────────────────────────────────────────────────────────

// Light tap — habit check, checklist item
export const hapticLight = () =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium — button press, selection
export const hapticMedium = () =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Success — reset completion, streak milestone
export const hapticSuccess = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Warning — error or caution moment
export const hapticWarning = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

// ── Animation builders ────────────────────────────────────────────────────────

// Press animation — scale down on press, spring back on release
export function createPressAnim(anim: Animated.Value, toValue = 0.96) {
  return {
    onPressIn: () => Animated.spring(anim, {
      toValue,
      ...Springs.micro,
      useNativeDriver: true,
    }).start(),
    onPressOut: () => Animated.spring(anim, {
      toValue: 1,
      ...Springs.satisfying,
      useNativeDriver: true,
    }).start(),
  };
}

// Bounce — quick scale down → spring back (completion feedback)
export function bounceAnim(anim: Animated.Value, toValue = 0.93) {
  return Animated.sequence([
    Animated.spring(anim, { toValue, ...Springs.micro, useNativeDriver: true }),
    Animated.spring(anim, { toValue: 1, ...Springs.satisfying, useNativeDriver: true }),
  ]);
}

// Fade in from below — card/section entrance
export function fadeSlideIn(
  opacity: Animated.Value,
  translateY: Animated.Value,
  delay = 0
) {
  return Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1, duration: Timing.normal, delay,
      easing: Easings.smooth, useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0, duration: Timing.normal, delay,
      easing: Easings.out, useNativeDriver: true,
    }),
  ]);
}

// Gentle pulse — idle state attention (complete button)
export function createIdlePulse(anim: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.88, duration: 1800,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1, duration: 1800,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
    ]),
    { iterations: -1 }
  );
}

// Animated progress bar value (not native driver — width animation)
export function animateProgressBar(
  anim: Animated.Value,
  toValue: number,
  duration = Timing.gentle
) {
  return Animated.timing(anim, {
    toValue,
    duration,
    easing: Easings.smooth,
    useNativeDriver: false,
  });
}

// Check animation — scale up then settle (habit done)
export function checkAnim(anim: Animated.Value) {
  return Animated.sequence([
    Animated.timing(anim, { toValue: 1.06, duration: 100, useNativeDriver: true }),
    Animated.spring(anim, { toValue: 1, ...Springs.satisfying, useNativeDriver: true }),
  ]);
}

// Milestone pulse — golden scale ring for streak milestone moments
export function createMilestonePulse(anim: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.1, duration: 850,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1, duration: 850,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
    ]),
    { iterations: -1 }
  );
}

// Milestone celebration haptic — double pulse (success → medium)
export async function hapticMilestone() {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  await new Promise<void>(r => setTimeout(r, 200));
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

// CTA breathe — ultra-subtle scale breathing (ritual feel)
export function createBreatheAnim(anim: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.013, duration: 2400,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1, duration: 2400,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
    ]),
    { iterations: -1 }
  );
}

// Accordion open — slow soft reveal, premium feel
export function accordionOpen(opacity: Animated.Value, translateY: Animated.Value) {
  return Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1, duration: 360,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0, duration: 340,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }),
  ]);
}

// Accordion close — calm, unhurried
export function accordionClose(opacity: Animated.Value, translateY: Animated.Value) {
  return Animated.parallel([
    Animated.timing(opacity, {
      toValue: 0, duration: 240,
      easing: Easing.in(Easing.cubic), useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: -8, duration: 240,
      easing: Easing.in(Easing.cubic), useNativeDriver: true,
    }),
  ]);
}

// Ritual card glow pulse — very slow soft glow, draws attention to signature feature
export function createRitualGlowPulse(anim: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1, duration: 2800,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0, duration: 2800,
        easing: Easing.inOut(Easing.sin), useNativeDriver: true,
      }),
    ]),
    { iterations: -1 }
  );
}

// Staggered list entrance — returns timing for index-based delay
export function staggerDelay(index: number, baseDelay = 60, startDelay = 80): number {
  return startDelay + index * baseDelay;
}

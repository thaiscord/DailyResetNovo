// ─── FloatingMomentumBadge ────────────────────────────────────────────────────
// Floating, absolutely-positioned indicator of quiet momentum.
// Sits in the top-right corner of the Today screen, above the scroll content.
//
// Design intent: not a streak counter — a quiet signal that the user is returning.
// Animation model: ONE scale value drives both breathing and milestone pulse.
// No Animated.multiply, no composition — zero render-crash risk.

import { useRef, useEffect } from 'react';
import {
  Animated, Easing, StyleSheet, View, Text, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii } from '../../theme';
import { getStreakBadgeLabel } from '../../utils/streakCopy';
import { getActiveLang } from '../../utils/langStore';

interface FloatingMomentumBadgeProps {
  streak:    number;
  totalDays: number;
  loading?:  boolean;
}

const STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];

export default function FloatingMomentumBadge({
  streak,
  totalDays,
  loading = false,
}: FloatingMomentumBadgeProps) {
  // Expo Router wraps the entire app in SafeAreaProvider — insets are always available.
  const insets = useSafeAreaInsets();
  // Add breathing room above the system UI (notch / Dynamic Island).
  const safeTop = (insets.top > 0 ? insets.top : Platform.OS === 'ios' ? 44 : 24)
    + (Platform.OS === 'ios' ? 10 : 12);

  const showStreak    = !loading && streak >= 1;
  const showReturning = !loading && streak === 0 && totalDays > 0;
  const visible       = showStreak || showReturning;

  // ── Entrance: fade in + gentle settle from above ──────────────────────────
  const fadeAnim    = useRef(new Animated.Value(0)).current;
  const slideAnim   = useRef(new Animated.Value(-10)).current;
  const hasEntered  = useRef(false);

  useEffect(() => {
    if (!visible || hasEntered.current) return;
    hasEntered.current = true;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 480, delay: 640,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, friction: 9, tension: 70,
        useNativeDriver: true,
        // @ts-ignore — delay is valid for spring in newer RN but typing may lag
        delay: 640,
      }),
    ]).start();
  }, [visible]);

  // ── Single scale animation: breathing by default, milestone pulse on event ─
  // ONE Animated.Value drives everything — no Animated.multiply, no composition.
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleLoop = useRef<Animated.CompositeAnimation | null>(null);
  const prevStreakRef = useRef(streak);

  // Start breathing loop (restartable)
  const startBreathing = () => {
    scaleLoop.current?.stop();
    scaleLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.016, duration: 3000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, duration: 3000,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ])
    );
    scaleLoop.current.start();
  };

  // Begin breathing once visible (after entrance settles)
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(startBreathing, 1400);
    return () => {
      clearTimeout(timer);
      scaleLoop.current?.stop();
    };
  }, [visible]);

  // Milestone pulse: overrides breathing, then resumes it
  useEffect(() => {
    const prev = prevStreakRef.current;
    prevStreakRef.current = streak;
    if (streak <= prev || !STREAK_MILESTONES.includes(streak)) return;

    scaleLoop.current?.stop();
    scaleAnim.setValue(1);

    // 5 pulses to 1.10, then resume breathing
    const pulse = () =>
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.10, duration: 850,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, duration: 850,
          easing: Easing.inOut(Easing.sin), useNativeDriver: true,
        }),
      ]);

    const milestoneSeq = Animated.sequence([
      pulse(), pulse(), pulse(), pulse(), pulse(),
    ]);
    scaleLoop.current = milestoneSeq;
    milestoneSeq.start(({ finished }) => {
      if (finished) startBreathing();
    });
  }, [streak]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.badge,
        showReturning && styles.badgeReturning,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      {showStreak ? (
        <>
          <Ionicons name="flame" size={13} color={Colors.charcoal} style={styles.icon} />
          <View style={styles.textGroup}>
            <Text style={styles.number}>{streak}</Text>
            <Text style={styles.label}>
              {getStreakBadgeLabel(streak).toUpperCase()}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Ionicons name="refresh" size={11} color={Colors.textMuted} style={styles.icon} />
          <Text style={styles.returningLabel}>
            {getActiveLang() === 'es' ? 'VOLVIENDO' : getActiveLang() === 'pt' ? 'VOLTANDO' : 'RETURNING'}
          </Text>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   Colors.backgroundSecondary,
    borderRadius:      Radii.full,
    paddingHorizontal: 10,
    paddingVertical:   6,
    borderWidth:       1,
    borderColor:       'rgba(201,168,76,0.22)',
    shadowColor:       '#1C1C1C',
    shadowOffset:      { width: 0, height: 2 },
    shadowOpacity:     0.06,
    shadowRadius:      6,
    elevation:         2,
  },
  badgeReturning: {
    backgroundColor: Colors.card,
    borderColor:     Colors.border,
    shadowColor:     '#1C1C1C',
    shadowOpacity:   0.07,
    shadowRadius:    8,
    elevation:       2,
  },
  icon: {
    marginRight: 4,
  },
  textGroup: {
    alignItems: 'center',
    gap:        1,
  },
  number: {
    fontSize:      16,
    fontWeight:    Typography.weights.black,
    color:         Colors.charcoal,
    lineHeight:    17,
    letterSpacing: -0.3,
  },
  label: {
    fontSize:      7,
    fontWeight:    Typography.weights.bold,
    color:         'rgba(28,28,28,0.50)',
    letterSpacing: 0.8,
    lineHeight:    8,
  },
  returningLabel: {
    fontSize:      8,
    fontWeight:    Typography.weights.medium,
    color:         Colors.textMuted,
    letterSpacing: 0.6,
  },
});

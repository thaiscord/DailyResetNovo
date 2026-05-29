import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { CommunityInsight } from '../utils/socialProof';

// ─── Variants ─────────────────────────────────────────────────────────────────

export type InsightVariant =
  | 'subtle'   // single line with people icon — minimal, for inside cards
  | 'card';    // standalone card with eyebrow — for between sections

interface Props {
  insight: CommunityInsight;
  variant?: InsightVariant;
  delay?: number;
  style?: object;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CommunityInsightCard({
  insight,
  variant = 'subtle',
  delay = 0,
  style,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 500, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0, duration: 500, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (variant === 'subtle') {
    return (
      <Animated.View
        style={[styles.subtle, style, { opacity, transform: [{ translateY: ty }] }]}
      >
        <Ionicons name="people-outline" size={12} color={Colors.textMuted} />
        <Text style={styles.subtleText}>{insight.text}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[styles.card, style, { opacity, transform: [{ translateY: ty }] }]}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="people-outline" size={13} color={Colors.gold} />
        <Text style={styles.cardEyebrow}>YOU ARE NOT ALONE</Text>
      </View>
      <Text style={styles.cardText}>{insight.text}</Text>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Subtle — one liner, barely noticeable
  subtle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  subtleText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    fontStyle: 'italic',
  },

  // Card — standalone section
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  cardEyebrow: {
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  cardText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

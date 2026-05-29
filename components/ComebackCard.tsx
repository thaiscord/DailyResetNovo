import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import {
  ComebackData,
  getComebackNarrativeContent,
  getComebackMilestone,
  getResilienceMessage,
} from '../utils/comebackSystem';
import { getInsightForContext } from '../utils/socialProof';
import { useLanguage } from '../hooks/useLanguage';
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import { getProfileComebackMessage } from '../utils/emotionalProfile';

interface Props {
  comeback: ComebackData;
  comebackCount: number;
  totalDaysCompleted: number;
  delay?: number;
}

export default function ComebackCard({
  comeback,
  comebackCount,
  totalDaysCompleted,
  delay = 0,
}: Props) {
  const { t } = useLanguage();
  const { profile } = useEmotionalProfile();
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(12)).current;

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

  const content   = getComebackNarrativeContent(comeback, comebackCount);
  const milestone  = getComebackMilestone(comebackCount);
  const resilience = getResilienceMessage(comebackCount, totalDaysCompleted);
  const insight    = getInsightForContext('comeback', totalDaysCompleted);

  // Subtle left border color by severity
  const accentColor =
    comeback.state === 'soft'     ? Colors.success :
    comeback.state === 'medium'   ? Colors.accent  :
    comeback.state === 'major'    ? Colors.streak  :
    Colors.gold;                   // extended

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY: ty }] }]}>
      {/* Left accent bar by severity */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={styles.body}>
        {/* Eyebrow */}
        <View style={styles.eyebrowRow}>
          <Ionicons name="refresh" size={11} color={Colors.gold} />
          <Text style={styles.eyebrow}>{t('today.messages.welcomeBack')}</Text>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>{content.headline}</Text>

        {/* Body */}
        <Text style={styles.bodyText}>{content.body}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Subtext — profile-aware when a recovery path is set */}
        <Text style={styles.subtext}>
          {profile
            ? getProfileComebackMessage(profile, comebackCount)
            : (resilience || content.subtext)}
        </Text>

        {/* Comeback milestone celebration */}
        {milestone && (
          <View style={styles.milestoneRow}>
            <Ionicons name="star" size={11} color={Colors.gold} />
            <Text style={styles.milestoneText}>{milestone}</Text>
          </View>
        )}

        {/* Community normalization — "you are not alone" */}
        <View style={styles.insightRow}>
          <Ionicons name="people-outline" size={11} color="rgba(255,255,255,0.25)" />
          <Text style={styles.insightText}>{insight.text}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadows.charcoal,
  },
  accentBar: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  headline: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  subtext: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: Radii.md,
    padding: Spacing.sm,
  },
  milestoneText: {
    flex: 1,
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    lineHeight: 17,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  insightText: {
    flex: 1,
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
    lineHeight: 15,
    fontStyle: 'italic',
  },
});

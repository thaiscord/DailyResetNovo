// ─── Return Experience ─────────────────────────────────────────────────────────
// Full-screen compassionate moment shown when user returns after 3+ day absence.
// System 5 from the retention spec.
// Tone: no guilt, no catching up, no shame. Just welcome.

import { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { useLanguage } from '../hooks/useLanguage';
import { getItem, StorageKeys } from '../hooks/useStorage';
import {
  shouldShowMantraOnReturn,
  recordMantraReturnShown,
  mantraReturnVariant,
} from '../utils/mantraEcho';

const { width } = Dimensions.get('window');

export default function ReturnExperienceScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { daysMissed: rawDays } = useLocalSearchParams<{ daysMissed?: string }>();
  const daysMissed = parseInt(rawDays ?? '3', 10);

  const heading = t('return.heading');
  const body = daysMissed >= 30
    ? t('return.30plus.body')
    : daysMissed >= 7
    ? t('return.7plus.body')
    : t('return.3plus.body');
  const extra = daysMissed >= 30 ? t('return.30plus.extra') : undefined;
  const button = t('return.cta');

  const [mantraText, setMantraText] = useState<string | null>(null);

  const fadeAnim      = useRef(new Animated.Value(0)).current;
  const slideAnim     = useRef(new Animated.Value(24)).current;
  const mantraFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 700, delay: 200,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 600, delay: 200,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    shouldShowMantraOnReturn(daysMissed).then(async (show) => {
      if (!show) return;
      const mantra = await getItem<string | null>(StorageKeys.PERSONAL_MANTRA, null);
      if (!mantra) return;
      const variant = mantraReturnVariant(daysMissed);
      setMantraText(t(`mantra.return.v${variant}` as any, { mantra }));
      await recordMantraReturnShown();
      Animated.timing(mantraFadeAnim, {
        toValue: 1, duration: 600, delay: 900,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }).start();
    });
  }, [daysMissed]);

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Gold accent line */}
        <View style={styles.goldLine} />

        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.body}>{body}</Text>

        {extra && (
          <Text style={styles.extra}>{extra}</Text>
        )}

        {mantraText && (
          <Animated.View style={[returnMantraStyles.container, { opacity: mantraFadeAnim }]}>
            <View style={returnMantraStyles.divider} />
            <Text style={returnMantraStyles.text}>{mantraText}</Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.btn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>{button}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
    gap: Spacing.lg,
  },
  goldLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    opacity: 0.7,
    marginBottom: Spacing.sm,
  },
  heading: {
    fontSize: 34,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.6,
    lineHeight: 42,
  },
  body: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.1,
  },
  extra: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    marginTop: -Spacing.sm,
  },
  btn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  btnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});

const returnMantraStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  divider: {
    width: 28,
    height: 1,
    backgroundColor: Colors.border,
    opacity: 0.6,
  },
  text: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
});

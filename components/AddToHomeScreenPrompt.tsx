import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { useAddToHomeScreen } from '../hooks/useAddToHomeScreen';
import { useLanguage } from '../hooks/useLanguage';

interface Props {
  /** Delay in ms before the card fades in */
  delay?: number;
}

export default function AddToHomeScreenPrompt({ delay = 600 }: Props) {
  const { status, accept, dismiss } = useAddToHomeScreen();
  const { t } = useLanguage();
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (status === 'hidden') return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 400, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0, duration: 400, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, [status]);

  // Only renders on web; never blocks native builds
  if (Platform.OS !== 'web') return null;
  if (status === 'hidden') return null;

  const isIos = status === 'ios';

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY: ty }] }]}>

      <View style={styles.iconRow}>
        <View style={styles.iconWrap}>
          <Ionicons name="phone-portrait-outline" size={18} color={Colors.gold} />
        </View>
        <TouchableOpacity onPress={dismiss} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} style={styles.closeBtn}>
          <Ionicons name="close" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{t('ath.title')}</Text>

      <Text style={styles.body}>{t('ath.body')}</Text>

      {isIos && (
        <View style={styles.iosHint}>
          <Ionicons name="share-outline" size={13} color={Colors.textSecondary} style={{ marginTop: 1 }} />
          <Text style={styles.iosHintText}>{t('ath.ios.hint')}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={accept} activeOpacity={0.8}>
          <Text style={styles.btnPrimaryText}>
            {isIos ? t('ath.cta.ios') : t('ath.cta.android')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={dismiss} activeOpacity={0.7}>
          <Text style={styles.btnSecondaryText}>{t('ath.dismiss')}</Text>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.18)',
    padding: Spacing.lg,
    gap: Spacing.sm,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(201,168,76,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    padding: 2,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  body: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  iosHint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.md,
    padding: Spacing.sm + 2,
    marginTop: 2,
  },
  iosHintText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'column',
    gap: Spacing.xs + 2,
    marginTop: Spacing.xs,
  },
  btnPrimary: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textInverse,
    letterSpacing: 0.2,
  },
  btnSecondary: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
});

import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { setItem, StorageKeys } from '../hooks/useStorage';
import {
  requestNotificationPermissions,
  scheduleDailyNotification,
  toExactTimeString,
} from '../utils/notifications';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';

const OPTION_KEYS = [
  { id: 'morning',   labelKey: 'notif.morning',   sublabelKey: 'notif.morning.sublabel',   icon: 'sunny' },
  { id: 'afternoon', labelKey: 'notif.afternoon', sublabelKey: 'notif.afternoon.sublabel', icon: 'partly-sunny' },
  { id: 'evening',   labelKey: 'notif.evening',   sublabelKey: 'notif.evening.sublabel',   icon: 'moon' },
];

export default function NotificationSetup() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState('morning');
  const options = OPTION_KEYS.map(o => ({ ...o, label: t(o.labelKey), sublabel: t(o.sublabelKey) }));
  const ctaScale = useRef(new Animated.Value(1)).current;
  const handlePressIn  = () => Animated.timing(ctaScale, { toValue: 0.98, duration: 90, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(ctaScale, { toValue: 1, friction: 9, useNativeDriver: true }).start();

  const handleContinue = async () => {
    const defaults: Record<string, [number, number]> = {
      morning: [7, 0], afternoon: [12, 0], evening: [20, 0],
    };
    const [hour, minute] = defaults[selected] ?? [7, 0];
    const exactTime = toExactTimeString(hour, minute);

    await Promise.all([
      setItem(StorageKeys.NOTIFICATION_TIME, selected),
      setItem(StorageKeys.NOTIFICATION_EXACT_TIME, exactTime),
      setItem(StorageKeys.ONBOARDING_DONE, true),
    ]);

    // Agenda a notificação (solicita permissão se necessário)
    const granted = await requestNotificationPermissions();
    if (granted) {
      await scheduleDailyNotification(selected as any);
    }

    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.step}>{t('notif.step')}</Text>
        <Text style={styles.title}>{t('notif.title')}</Text>
        <Text style={styles.subtitle}>{t('notif.subtitle')}</Text>
        <Text style={styles.bridge}>{t('notif.bridge') || 'Consistency begins with timing.'}</Text>

        <View style={styles.options}>
          {options.map(opt => {
            const sel = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.option, sel && styles.optionSelected]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.82}
              >
                {/* Ícone — pill amarelo quando selecionado (Imagem 1) */}
                <View style={[styles.iconPill, sel && styles.iconPillSelected]}>
                  <Ionicons
                    name={opt.icon as any}
                    size={24}
                    color={sel ? Colors.charcoal : Colors.textSecondary}
                  />
                </View>

                <View style={styles.optText}>
                  <Text style={[styles.optLabel, sel && styles.optLabelSelected]}>{opt.label}</Text>
                  <Text style={styles.optSublabel}>{opt.sublabel}</Text>
                </View>

                {/* Radio circular */}
                <View style={[styles.radio, sel && styles.radioSelected]}>
                  {sel && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={handleContinue}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Animated.View style={[styles.ctaInner, { transform: [{ scale: ctaScale }] }]}>
            <Text style={styles.ctaText}>{t('notif.cta')}</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: 72 },

  step: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 2, marginBottom: Spacing.md },
  title: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    lineHeight: 48,
    marginBottom: Spacing.sm,
    letterSpacing: -1,
  },
  subtitle: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, marginBottom: Spacing.sm },
  bridge: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.xl,
    letterSpacing: 0.2,
  },

  options: { gap: Spacing.md },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    gap: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },
  optionSelected: { borderColor: Colors.accent },

  iconPill: {
    width: 52,
    height: 52,
    borderRadius: Radii.md,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPillSelected: { backgroundColor: Colors.accent },

  optText: { flex: 1 },
  optLabel: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textSecondary, marginBottom: 2 },
  optLabelSelected: { color: Colors.textPrimary },
  optSublabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  radioSelected: { borderColor: Colors.charcoal },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: Colors.charcoal },

  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Platform.OS === 'ios' ? 52 : 40, paddingTop: Spacing.md },
  ctaBtn: { borderRadius: Radii.full, backgroundColor: Colors.charcoal, ...Shadows.charcoal },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 19,
    gap: Spacing.sm,
  },
  ctaText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.white },
});

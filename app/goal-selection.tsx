import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { useLanguage } from '../hooks/useLanguage';

const GOAL_CONFIGS = [
  { id: 'procrastination', labelKey: 'goal.procrastination', icon: 'timer-outline' },
  { id: 'discipline',      labelKey: 'goal.discipline',      icon: 'barbell-outline' },
  { id: 'distractions',   labelKey: 'goal.distractions',   icon: 'notifications-off-outline' },
  { id: 'routine',        labelKey: 'goal.routine',         icon: 'calendar-outline' },
  { id: 'control',        labelKey: 'goal.control',         icon: 'compass-outline' },
];

export default function GoalSelection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);

  const goals = GOAL_CONFIGS.map(g => ({ ...g, label: t(g.labelKey) }));

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  const handleContinue = async () => {
    if (!selected.length) {
      Alert.alert(t('goals.alert.title'), t('goals.alert.msg'));
      return;
    }
    await setItem(StorageKeys.USER_GOALS, selected);
    router.replace('/notification-setup');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>{t('goals.step')}</Text>
        <Text style={styles.title}>{t('goals.title')}</Text>
        <Text style={styles.subtitle}>{t('goals.subtitle')}</Text>

        <View style={styles.goals}>
          {goals.map(goal => {
            const sel = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.card, sel && styles.cardSelected]}
                onPress={() => toggle(goal.id)}
                activeOpacity={0.82}
              >
                {/* Ícone — pill amarelo quando selecionado (Imagem 1) */}
                <View style={[styles.iconWrap, sel && styles.iconWrapSelected]}>
                  <Ionicons
                    name={goal.icon as any}
                    size={20}
                    color={sel ? Colors.charcoal : Colors.textSecondary}
                  />
                </View>

                <Text style={[styles.label, sel && styles.labelSelected]}>
                  {goal.label}
                </Text>

                {/* Check pill charcoal quando selecionado */}
                <View style={[styles.check, sel && styles.checkSelected]}>
                  <Ionicons name="checkmark" size={13} color={sel ? Colors.white : Colors.border} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer com contagem + botão */}
      <View style={styles.footer}>
        <Text style={styles.count}>{t('goals.selected', { n: selected.length })}</Text>
        <TouchableOpacity style={styles.ctaBtn} onPress={handleContinue} activeOpacity={0.88}>
          <View style={styles.ctaInner}>
            <Text style={styles.ctaText}>{t('goals.cta')}</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.xl, paddingTop: 72, paddingBottom: 140 },

  step: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    lineHeight: 48,
    marginBottom: Spacing.sm,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },

  goals: { gap: Spacing.sm },
  // Card branco flutuante (Imagem 1)
  card: {
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
  cardSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentDim,
  },
  // Pill do ícone — amarelo quando selecionado
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: { backgroundColor: Colors.accent },
  label: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  labelSelected: { color: Colors.textPrimary, fontWeight: Typography.weights.semibold },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  checkSelected: { backgroundColor: Colors.charcoal, borderColor: Colors.charcoal },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 48,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  count: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    fontWeight: Typography.weights.medium,
  },
  ctaBtn: { borderRadius: Radii.full, backgroundColor: Colors.charcoal, ...Shadows.charcoal },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: Spacing.sm,
  },
  ctaText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.white },
});

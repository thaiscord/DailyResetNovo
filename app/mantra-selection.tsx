// ─── Mantra Selection ─────────────────────────────────────────────────────────
// Shown after Day 3 ritual completion. System 7 — Identity Layer.
// The selected word becomes theirs: appears on home, in rituals, in milestones.

import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { track } from '../utils/analytics';
import { useLanguage } from '../hooks/useLanguage';

const MANTRAS = [
  { word: 'STEADY',    meaning: 'Consistency is quiet. That\'s its power.' },
  { word: 'ENOUGH',    meaning: 'What you are is already sufficient.' },
  { word: 'PRESENT',   meaning: 'This moment is where you actually live.' },
  { word: 'RETURNING', meaning: 'Every return is a small act of self-trust.' },
  { word: 'BECOMING',  meaning: 'You are always in the process. That\'s enough.' },
  { word: 'GROUNDED',  meaning: 'You don\'t have to rise. You just have to stay.' },
];

const MANTRAS_ES = [
  { word: 'CONSTANTE',   meaning: 'La constancia casi nunca hace ruido.' },
  { word: 'SUFICIENTE',  meaning: 'No tienes que demostrar tanto.' },
  { word: 'PRESENTE',    meaning: 'Aquí es donde tu vida ocurre.' },
  { word: 'VOLVIENDO',   meaning: 'Cada regreso también es confianza.' },
  { word: 'FLORECIENDO', meaning: 'Todavía te estás convirtiendo en ti.' },
  { word: 'ENRAIZADA',   meaning: 'No todo tiene que acelerarse.' },
];

const MANTRAS_PT = [
  { word: 'CONSTANTE',   meaning: 'A constância quase nunca faz barulho.' },
  { word: 'SUFICIENTE',  meaning: 'Você não precisa se provar o tempo inteiro.' },
  { word: 'PRESENTE',    meaning: 'É aqui que sua vida realmente acontece.' },
  { word: 'VOLTANDO',    meaning: 'Cada retorno também é confiança.' },
  { word: 'FLORESCENDO', meaning: 'Você ainda está se tornando.' },
  { word: 'ENRAIZADA',   meaning: 'Nem tudo precisa acelerar.' },
];

export default function MantraSelectionScreen() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const mantras = isEs ? MANTRAS_ES : isPt ? MANTRAS_PT : MANTRAS;
  const [selected, setSelected] = useState<string | null>(null);
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 600, delay: 150,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 500, delay: 150,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelect = (word: string) => {
    Haptics.selectionAsync();
    setSelected(word);
  };

  const handleConfirm = async () => {
    if (!selected) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Promise.all([
      setItem(StorageKeys.PERSONAL_MANTRA, selected),
      setItem(StorageKeys.MANTRA_SHOWN, true),
    ]);
    track('mantra_selected', { word: selected });
    router.replace('/(tabs)/today');
  };

  const handleSkip = async () => {
    await setItem(StorageKeys.MANTRA_SHOWN, true);
    track('mantra_skipped');
    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.goldLine} />

        <Text style={styles.eyebrow}>{isEs ? 'DÍA 3' : isPt ? 'DIA 3' : 'DAY 3'}</Text>
        <Text style={styles.heading}>
          {isEs
            ? '¿Una palabra solo para ti?'
            : isPt
            ? 'Quer escolher uma palavra\nsó sua?'
            : "Would you like a word\nthat's just yours?"}
        </Text>
        <Text style={styles.sub}>
          {isEs
            ? 'Irá apareciendo en silencio a lo largo del camino.'
            : isPt
            ? 'Ela vai aparecer em silêncio, ao longo do caminho.'
            : 'It will appear quietly throughout your journey.'}
        </Text>

        <View style={styles.grid}>
          {mantras.map(({ word, meaning }) => {
            const isSelected = selected === word;
            return (
              <TouchableOpacity
                key={word}
                style={[styles.mantraCard, isSelected && styles.mantraCardSelected]}
                onPress={() => handleSelect(word)}
                activeOpacity={0.8}
              >
                <Text style={[styles.mantraWord, isSelected && styles.mantraWordSelected]}>
                  {word}
                </Text>
                {isSelected && (
                  <Text style={styles.mantraMeaning}>{meaning}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {selected ? (
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
            <Text style={styles.confirmBtnText}>{isEs ? 'Quedarme con esta' : isPt ? 'Essa é a minha palavra' : 'This is my word'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.skipLink} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>{isEs ? 'Ahora no' : isPt ? 'Agora não' : 'Not now'}</Text>
          </TouchableOpacity>
        )}
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
    width: '100%',
    gap: Spacing.lg,
  },
  goldLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    opacity: 0.7,
    marginBottom: -Spacing.xs,
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 3,
  },
  heading: {
    fontSize: 26,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.4,
  },
  sub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: -Spacing.sm,
    fontStyle: 'italic',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  mantraCard: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    padding: Spacing.base,
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: 64,
    justifyContent: 'center',
  },
  mantraCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201,168,76,0.08)',
  },
  mantraWord: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.black,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  mantraWordSelected: {
    color: Colors.gold,
  },
  mantraMeaning: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  confirmBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: Spacing.sm,
  },
  confirmBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  skipLink: {
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
});

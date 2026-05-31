// ─── Identity Question ─────────────────────────────────────────────────────────
// Shown on Day 7. System 7 — Identity Layer.
// Optional. "Who are you becoming?" stored as personal north star.

import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Animated, Easing, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { setItem, StorageKeys, getLocalDateKey } from '../hooks/useStorage';
import { getItem } from '../hooks/useStorage';
import { track } from '../utils/analytics';
import { isEs, isPt, isFr, isDe } from '../utils/langStore';
import type { ReflectionEntry } from '../hooks/useReflections';

export default function IdentityQuestionScreen() {
  const router = useRouter();
  const es = isEs();
  const pt = isPt();
  const [answer, setAnswer] = useState('');
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 600, delay: 200,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 500, delay: 200,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSave = async () => {
    const trimmed = answer.trim();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const prompt =
      isDe() ? 'Wer wirst du gerade?'
      : isFr() ? 'Qui es-tu en train de devenir ?'
      : es     ? '¿En quién te estás convirtiendo?'
      : pt     ? 'Em quem você está se tornando?'
      : 'Who are you becoming?';

    // Save to identity storage (primary) + reflections journal (visible in Journal tab)
    await Promise.all([
      trimmed ? setItem(StorageKeys.IDENTITY_ANSWER, trimmed) : Promise.resolve(),
      setItem(StorageKeys.IDENTITY_ASKED, true),
      trimmed
        ? (async () => {
            const current = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
            const entry: ReflectionEntry = {
              id: `identity_${Date.now()}`,
              date: getLocalDateKey(),
              promptId: 'identity_question_day7',
              prompt,
              text: trimmed,
              createdAt: new Date().toISOString(),
            };
            await setItem(StorageKeys.REFLECTIONS, [...current, entry]);
          })()
        : Promise.resolve(),
    ]);

    track('identity_question_answered', { answered: !!trimmed });
    router.replace('/(tabs)/today');
  };

  const handleSkip = async () => {
    await setItem(StorageKeys.IDENTITY_ASKED, true);
    track('identity_question_skipped');
    router.replace('/(tabs)/today');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.goldLine} />

        <Text style={styles.eyebrow}>
          {es ? 'UNA SEMANA' : pt ? 'UMA SEMANA' : 'ONE WEEK'}
        </Text>
        <Text style={styles.heading}>
          {es ? '¿En quién te estás convirtiendo?' : pt ? 'Em quem você está se tornando?' : 'Who are you becoming?'}
        </Text>
        <Text style={styles.sub}>
          {es
            ? 'Esto es solo tuyo.\nNo tiene que ser perfecto.'
            : pt
            ? 'Isso é só para você.\nNão precisa ser perfeito.'
            : 'This is just for you. No right answer.\nYou can change it anytime.'}
        </Text>

        <TextInput
          style={styles.textInput}
          value={answer}
          onChangeText={setAnswer}
          placeholder={es ? 'Escribe algo para ti…' : pt ? 'Escreva algo para você…' : 'This is just for you...'}
          placeholderTextColor={Colors.textMuted}
          multiline
          maxLength={200}
          autoFocus
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.saveBtn, !answer.trim() && styles.saveBtnDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>
            {answer.trim()
              ? (es ? 'Guardar esto' : pt ? 'Guardar isso' : 'Keep this')
              : (es ? 'Ahora no' : pt ? 'Agora não' : 'Skip for now')}
          </Text>
        </TouchableOpacity>

        {answer.trim() !== '' && (
          <TouchableOpacity style={styles.skipLink} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>
              {es ? 'Ahora no' : pt ? 'Agora não' : 'Skip for now'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
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
    maxWidth: 340,
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
    fontSize: 32,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  sub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    marginTop: -Spacing.sm,
  },
  textInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.base,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  saveBtn: {
    width: '100%',
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  saveBtnDisabled: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  saveBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  skipLink: {
    paddingVertical: Spacing.sm,
    marginTop: -Spacing.sm,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
});

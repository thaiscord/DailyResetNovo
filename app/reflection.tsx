import { useRef, useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Animated, Easing, KeyboardAvoidingView, Platform,
  ScrollView, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useProgress } from '../hooks/useProgress';
import { useReflections } from '../hooks/useReflections';
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import { useContentMemory } from '../hooks/useContentMemory';
import { useLanguage } from '../hooks/useLanguage';
import { saveDailyEntry } from '../utils/dailyEntries';
import { getLocalDateKey } from '../hooks/useStorage';
import { Colors, Typography, Spacing, Radii } from '../theme';

export default function ReflectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    prompt?: string;
    promptId?: string;
    source?: string;
  }>();

  const { progress } = useProgress();
  const { saveEntry }  = useReflections();
  const { profile }    = useEmotionalProfile();
  const { markAsSeen } = useContentMemory();
  const { t } = useLanguage();

  const prompt   = params.prompt ?? 'What felt different today?';
  const promptId = params.promptId;
  const isMoment = params.source === 'moment';

  const [text, setText]       = useState('');
  const [saved, setSaved]     = useState(false);
  const [focused, setFocused] = useState(false);

  const inputRef   = useRef<TextInput>(null);
  const saveScale  = useRef(new Animated.Value(1)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(16)).current;

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Auto-focus after entrance
    const t = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSave = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      router.back();
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Bounce animation on save button
    Animated.sequence([
      Animated.timing(saveScale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.spring(saveScale, { toValue: 1, friction: 8, useNativeDriver: true }),
    ]).start();

    await saveEntry({
      prompt,
      promptId,
      text: trimmed,
      profile,
      streak: progress.streak,
      dayNumber: progress.currentDay,
    });

    // When coming from the "A moment to reflect" card, also persist to the
    // daily entry so the Journal tab can display it with its prompt context.
    if (isMoment) {
      await saveDailyEntry({
        date: getLocalDateKey(),
        momentReflection: trimmed,
        momentPrompt: prompt,
      });
    }

    if (promptId) await markAsSeen(promptId);

    setSaved(true);
    setTimeout(() => router.back(), 900);
  }, [text, prompt, promptId, isMoment, profile, progress, saveEntry, markAsSeen, router]);

  const handleClose = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }, [router]);

  const charCount = text.length;
  const hasText   = charCount > 0;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.6}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerEyebrow}>{t('reflect.eyebrow')}</Text>
        <Animated.View style={{ transform: [{ scale: saveScale }] }}>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveBtn, saved && styles.saveBtnDone]}
            activeOpacity={0.82}
          >
            <Text style={[styles.saveBtnText, saved && styles.saveBtnTextDone]}>
              {saved ? t('reflect.saved') : hasText ? t('reflect.save') : t('reflect.skip')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Gold accent line */}
          <View style={styles.accentLine} />

          {/* Prompt */}
          <Text style={styles.prompt}>{`"${prompt}"`}</Text>

          {/* Microcopy */}
          <Text style={styles.microcopy}>{t('reflect.microcopy')}</Text>

          {/* Writing area */}
          <TextInput
            ref={inputRef}
            style={[styles.input, focused && styles.inputFocused]}
            value={text}
            onChangeText={setText}
            multiline
            placeholder={t('reflect.placeholder')}
            placeholderTextColor={Colors.textMuted}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            textAlignVertical="top"
            scrollEnabled={false}
            maxLength={1000}
          />

          {/* Char count + privacy note */}
          <View style={styles.footerRow}>
            <Text style={styles.privacy}>{t('reflect.privacy')}</Text>
            {hasText && (
              <Text style={styles.charCount}>{charCount}</Text>
            )}
          </View>

        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 56,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  closeBtn: {
    width: 34, height: 34,
    borderRadius: 17,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontWeight: Typography.weights.semibold,
  },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2.5,
  },
  saveBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  saveBtnDone: {
    backgroundColor: Colors.success,
  },
  saveBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  saveBtnTextDone: {
    color: Colors.white,
  },

  // ── Content ───────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  accentLine: {
    width: 36,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    marginBottom: Spacing.xl,
  },
  prompt: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  microcopy: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.xl,
  },
  input: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    lineHeight: 28,
    minHeight: 200,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.md,
  },
  inputFocused: {
    borderColor: `${Colors.accent}60`,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacy: {
    fontSize: 10,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  charCount: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});

// ─── Evening Anchor ────────────────────────────────────────────────────────────
// 60-second evening check-in. System 4 from the retention spec.
// 3 steps: Arrival → 3 Questions → Close
// Tone: reflective, no judgment. All answers are valid.

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Animated, Easing, KeyboardAvoidingView, Platform,
  ScrollView, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { getItem, setItem, StorageKeys, getLocalDateKey } from '../hooks/useStorage';
import { getDayWord } from '../utils/homeGreeting';
import { track } from '../utils/analytics';
import { getEveningPrompt } from '../utils/ContentEngine';
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import type { EmotionalProfile } from '../utils/emotionalProfile';

// Map the user's emotional profile to a ContentEngine theme.
const PROFILE_TO_THEME: Record<EmotionalProfile, string> = {
  focus:      'Focus',
  calm:       'Calm',
  confidence: 'Courage',
  burnout:    'Rest',
};

type Step = 'arrival' | 'q1' | 'q2' | 'q3' | 'close';

const MOOD_ICONS = ['🌑', '🌓', '🌕'];

const Q2_OPTIONS = [
  'Yes, it helped',
  'Not really',
  'I forgot, honestly',
];

export default function EveningAnchorScreen() {
  const router = useRouter();
  const { ritualDone: rawDone, intention: rawIntention, day: rawDay } =
    useLocalSearchParams<{ ritualDone?: string; intention?: string; day?: string }>();

  const ritualDone = rawDone === 'true';
  const intention  = rawIntention ?? null;
  const currentDay = parseInt(rawDay ?? '1', 10);

  const [step, setStep]     = useState<Step>('arrival');
  const [q1Mood, setQ1Mood] = useState<number | null>(null);
  const [q2Ans, setQ2Ans]   = useState<string | null>(null);
  const [q3Text, setQ3Text] = useState('');

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const animateIn = useCallback(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animateIn();
    setItem(StorageKeys.LAST_EVENING_DATE, getLocalDateKey());
    track('evening_anchor_started', { ritualDone });
  }, []);

  const advance = useCallback((next: Step) => {
    Animated.timing(fadeAnim, {
      toValue: 0, duration: 200, useNativeDriver: true,
    }).start(() => {
      setStep(next);
      animateIn();
    });
  }, [fadeAnim, animateIn]);

  const handleQ1 = (level: number) => {
    Haptics.selectionAsync();
    setQ1Mood(level);
    // Save evening mood
    const key = `${StorageKeys.DAILY_MOOD}_evening_${getLocalDateKey()}`;
    setItem(key, level);
    track('evening_mood_checked', { level });
    setTimeout(() => advance('q2'), 400);
  };

  const handleQ2 = (ans: string) => {
    Haptics.selectionAsync();
    setQ2Ans(ans);
    track('evening_q2_answered', { answer: ans });
    setTimeout(() => advance('q3'), 300);
  };

  const handleQ3Done = () => {
    if (q3Text.trim()) {
      const key = `evening_reflection_${getLocalDateKey()}`;
      setItem(key, q3Text.trim());
      track('evening_q3_written');
    }
    advance('close');
  };

  const handleSkipQ3 = () => {
    track('evening_q3_skipped');
    advance('close');
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    track('evening_anchor_completed');
    router.replace('/(tabs)/today');
  };

  const tomorrow = getDayWord(currentDay + 1);
  const { profile } = useEmotionalProfile();
  const todayTheme = profile ? PROFILE_TO_THEME[profile] : 'Focus';
  const eveningContent = getEveningPrompt(currentDay, todayTheme);

  // ── Arrival ─────────────────────────────────────────────────────────────────
  if (step === 'arrival') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.eyebrow}>END OF DAY</Text>
          <Text style={styles.heading}>
            {ritualDone
              ? 'You did the thing today.'
              : 'Today was today.\nTomorrow is separate.'}
          </Text>
          <TouchableOpacity style={styles.tapBtn} onPress={() => advance('q1')} activeOpacity={0.8}>
            <Text style={styles.tapBtnText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // ── Q1: How did today go? ────────────────────────────────────────────────────
  if (step === 'q1') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.question}>How did today actually go?</Text>
          <View style={styles.moodRow}>
            {MOOD_ICONS.map((icon, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.moodBtn, q1Mood === i && styles.moodBtnSelected]}
                onPress={() => handleQ1(i)}
                activeOpacity={0.75}
              >
                <Text style={styles.moodIcon}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    );
  }

  // ── Q2: Did you feel your intention? ────────────────────────────────────────
  if (step === 'q2') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {intention ? (
            <>
              <Text style={styles.questionSub}>This morning you chose:</Text>
              <Text style={styles.intentionWord}>{intention.toUpperCase()}</Text>
              <Text style={styles.question}>Did you feel it today?</Text>
            </>
          ) : (
            <Text style={styles.question}>Did you move through the day with intention?</Text>
          )}
          <View style={styles.optionsList}>
            {Q2_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={styles.optionBtn}
                onPress={() => handleQ2(opt)}
                activeOpacity={0.75}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    );
  }

  // ── Q3: One good thing ───────────────────────────────────────────────────────
  if (step === 'q3') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.question}>{eveningContent.word_prompt}</Text>
          <Text style={styles.questionSub}>{eveningContent.theme_reflection}</Text>
          <TextInput
            style={styles.textInput}
            value={q3Text}
            onChangeText={setQ3Text}
            placeholder="Even something tiny counts..."
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={240}
            autoFocus
          />
          <TouchableOpacity style={styles.tapBtn} onPress={handleQ3Done} activeOpacity={0.8}>
            <Text style={styles.tapBtnText}>{q3Text.trim() ? 'Save it' : 'Skip'}</Text>
          </TouchableOpacity>
          {!q3Text.trim() && (
            <TouchableOpacity style={styles.skipLink} onPress={handleSkipQ3} activeOpacity={0.7}>
              <Text style={styles.skipText}>Nothing comes to mind</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }

  // ── Close ────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {q3Text.trim() ? (
          <>
            <Text style={styles.closeSaved}>{`"${q3Text.trim()}"`}</Text>
            <Text style={styles.closeBody}>{"— that's yours."}</Text>
            <Text style={styles.closeCarry}>Carry that into tomorrow.</Text>
          </>
        ) : (
          <>
            <Text style={styles.closeBody}>{"That's okay."}</Text>
            <Text style={styles.closeCarry}>Rest is enough.</Text>
          </>
        )}

        <View style={styles.tomorrowCard}>
          <Text style={styles.tomorrowLabel}>Tomorrow</Text>
          <Text style={styles.tomorrowWord}>{tomorrow.word}</Text>
        </View>

        <TouchableOpacity style={styles.restBtn} onPress={handleClose} activeOpacity={0.85}>
          <Text style={styles.restBtnText}>Rest now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  center: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    gap: Spacing.lg,
  },
  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
    letterSpacing: 3,
    marginBottom: -Spacing.sm,
  },
  heading: {
    fontSize: 28,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.4,
  },
  question: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  questionSub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  intentionWord: {
    fontSize: 28,
    fontWeight: Typography.weights.black,
    color: Colors.gold,
    letterSpacing: 3,
    marginVertical: -Spacing.xs,
  },
  moodRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
    marginTop: Spacing.sm,
  },
  moodBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodBtnSelected: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201,168,76,0.12)',
  },
  moodIcon: {
    fontSize: 28,
  },
  optionsList: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  optionBtn: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  optionText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  textInput: {
    width: '100%',
    minHeight: 100,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.base,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  tapBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: Spacing.sm,
  },
  tapBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  skipLink: {
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
  closeSaved: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 26,
  },
  closeBody: {
    fontSize: 26,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  closeCarry: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: -Spacing.sm,
  },
  tomorrowCard: {
    width: '100%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  tomorrowLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  tomorrowWord: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.black,
    color: Colors.gold,
    letterSpacing: 2,
  },
  restBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: Spacing.sm,
  },
  restBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});

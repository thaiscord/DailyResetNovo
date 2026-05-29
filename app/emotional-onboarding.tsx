import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, ScrollView, Dimensions, StatusBar, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../hooks/useLanguage';
import * as Haptics from 'expo-haptics';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';

const { height } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmotionalProfile = 'focus' | 'calm' | 'confidence' | 'burnout';

interface OnboardingAnswers {
  challenges:   string[];
  rebuild:      string[];
  distractions: string[];
  feelings:     string[];
}

interface Step {
  id: keyof OnboardingAnswers;
  question:   string;
  microcopy:  string;
  options:    Array<{ id: string; label: string }>;
  multi:      boolean; // allow multiple selections
}

// ─── Question config (IDs + keys only — strings resolved via t() in component) ─

const STEP_CONFIGS = [
  // Q1 — What feels heaviest lately? (single select, 7 options)
  { id: 'challenges', qKey: 'emotional.q1.question', mKey: 'emotional.q1.micro', multi: false,
    opts: ['overload','anxiety','exhaustion','rhythm','continuing','focus','disconnected'].map((id,i) => ({ id, lKey: `emotional.q1.opt${i+1}` })) },
  // Q2 — What do you feel you've been missing? (multi-select, 6 options)
  { id: 'rebuild',    qKey: 'emotional.q2.question', mKey: 'emotional.q2.micro', multi: true,
    opts: ['calm','clarity','confidence','consistency','presence','balance'].map((id,i) => ({ id, lKey: `emotional.q2.opt${i+1}` })) },
  // Q3 — How would you like life to feel again? (multi-select, 6 options)
  { id: 'feelings',   qKey: 'emotional.q3.question', mKey: 'emotional.q3.micro', multi: true,
    opts: ['lighter','calmer','slower','clearer','grounded','organized'].map((id,i) => ({ id, lKey: `emotional.q3.opt${i+1}` })) },
  // Q4 — What pulls you away from yourself most often? (single select, 6 options)
  { id: 'distractions', qKey: 'emotional.q4.question', mKey: 'emotional.q4.micro', multi: false,
    opts: ['screens','work','anxiety','overthinking','fatigue','routine'].map((id,i) => ({ id, lKey: `emotional.q4.opt${i+1}` })) },
] as const;

// ─── Emotional profile detection ─────────────────────────────────────────────

function detectEmotionalProfile(answers: OnboardingAnswers): EmotionalProfile {
  const { challenges, rebuild, feelings, distractions } = answers;

  const scores: Record<EmotionalProfile, number> = {
    focus:      0,
    calm:       0,
    confidence: 0,
    burnout:    0,
  };

  // Q1 — What feels heaviest
  if (challenges.includes('overload'))     scores.burnout++;
  if (challenges.includes('anxiety'))      scores.calm++;
  if (challenges.includes('exhaustion'))   { scores.burnout++; scores.burnout++; }
  if (challenges.includes('rhythm'))       scores.burnout++;
  if (challenges.includes('continuing'))   scores.burnout++;
  if (challenges.includes('focus'))        scores.focus++;
  if (challenges.includes('disconnected')) scores.calm++;

  // Q2 — What you've been missing
  if (rebuild.includes('calm'))        scores.calm++;
  if (rebuild.includes('clarity'))     { scores.calm++; scores.focus++; }
  if (rebuild.includes('confidence'))  scores.confidence++;
  if (rebuild.includes('consistency')) scores.focus++;
  if (rebuild.includes('presence'))    scores.calm++;
  if (rebuild.includes('balance'))     scores.burnout++;

  // Q3 — How to feel
  if (feelings.includes('lighter'))    scores.burnout++;
  if (feelings.includes('calmer'))     scores.calm++;
  if (feelings.includes('slower'))     { scores.calm++; scores.burnout++; }
  if (feelings.includes('clearer'))    scores.focus++;
  if (feelings.includes('grounded'))   scores.calm++;
  if (feelings.includes('organized'))  scores.focus++;

  // Q4 — What pulls away
  if (distractions.includes('screens'))      scores.focus++;
  if (distractions.includes('work'))         scores.burnout++;
  if (distractions.includes('anxiety'))      scores.calm++;
  if (distractions.includes('overthinking')) scores.calm++;
  if (distractions.includes('fatigue'))      { scores.burnout++; scores.burnout++; }
  if (distractions.includes('routine'))      scores.focus++;

  const [top] = Object.entries(scores).sort(([, a], [, b]) => b - a);
  return (top[0] as EmotionalProfile) ?? 'burnout';
}

// ─── Animation wrapper ────────────────────────────────────────────────────────

function FadeSlide({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const ty      = useRef(new Animated.Value(visible ? 0 : 16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: visible ? 0 : -12,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { opacity, transform: [{ translateY: ty }] },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {children}
    </Animated.View>
  );
}

// ─── Option pill ──────────────────────────────────────────────────────────────

function OptionPill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 90, useNativeDriver: true }),
      Animated.spring(scale,  { toValue: 1, friction: 9, tension: 160, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View
        style={[
          styles.option,
          selected && styles.optionSelected,
          { transform: [{ scale }] },
        ]}
      >
        <View style={[styles.optionDot, selected && styles.optionDotSelected]}>
          {selected && <View style={styles.optionDotFill} />}
        </View>
        <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < current  && styles.dotDone,
            i === current && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function EmotionalOnboarding() {
  const router = useRouter();
  const { t } = useLanguage();
  // Build translated steps from config keys
  const STEPS = STEP_CONFIGS.map(cfg => ({
    id: cfg.id as keyof OnboardingAnswers,
    question: t(cfg.qKey),
    microcopy: t(cfg.mKey),
    multi: cfg.multi,
    options: cfg.opts.map(o => ({ id: o.id, label: t(o.lKey) })),
  }));
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    challenges: [], rebuild: [], distractions: [], feelings: [],
  });
  const [transitioning, setTransitioning] = useState(false);
  const ctaScale = useRef(new Animated.Value(1)).current;
  const handleCtaPressIn  = () => Animated.timing(ctaScale, { toValue: 0.98, duration: 90, useNativeDriver: true }).start();
  const handleCtaPressOut = () => Animated.spring(ctaScale, { toValue: 1, friction: 9, useNativeDriver: true }).start();

  const current = STEPS[step];
  const selected = answers[current.id];
  const canContinue = selected.length > 0;

  const toggle = useCallback((id: string) => {
    setAnswers(prev => {
      const list = prev[current.id];
      if (current.multi) {
        const updated = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
        return { ...prev, [current.id]: updated };
      }
      return { ...prev, [current.id]: list.includes(id) ? [] : [id] };
    });
  }, [current]);

  const handleNext = useCallback(async () => {
    if (transitioning) return;

    if (step < STEPS.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setStep(s => s + 1);
        setTransitioning(false);
      }, 280);
    } else {
      // Final step — save everything and navigate
      const profile = detectEmotionalProfile(answers);

      // Map rebuild answers to USER_GOALS for backward compat
      const goalIds = answers.rebuild.length > 0 ? answers.rebuild : ['discipline'];

      await Promise.all([
        setItem(StorageKeys.USER_GOALS, goalIds),
        setItem(StorageKeys.EMOTIONAL_PROFILE, profile),
        setItem(StorageKeys.ONBOARDING_ANSWERS, answers),
      ]);

      router.replace({ pathname: '/onboarding-complete', params: { profile } });
    }
  }, [step, answers, transitioning, router]);

  const handleSkip = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleNext();
    }
  }, [step, handleNext]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <ProgressDots total={STEPS.length} current={step} />
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn} activeOpacity={0.6}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* ── Question steps ──────────────────────────────────────────────────── */}
      <View style={styles.body}>
        {STEPS.map((s, i) => (
          <FadeSlide key={s.id} visible={i === step && !transitioning}>
            <ScrollView
              contentContainerStyle={styles.stepContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Question */}
              <Text style={styles.stepNumber}>{t('emotional.step', { i: i + 1, total: STEPS.length })}</Text>
              <Text style={styles.question}>{s.question}</Text>
              <Text style={styles.microcopy}>{s.microcopy}</Text>

              {/* Options */}
              <View style={styles.options}>
                {s.options.map(opt => (
                  <OptionPill
                    key={opt.id}
                    label={opt.label}
                    selected={answers[s.id].includes(opt.id)}
                    onPress={() => toggle(opt.id)}
                  />
                ))}
              </View>
            </ScrollView>
          </FadeSlide>
        ))}
      </View>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.ctaBtn, !canContinue && styles.ctaBtnDisabled]}
          onPress={canContinue ? handleNext : undefined}
          onPressIn={canContinue ? handleCtaPressIn : undefined}
          onPressOut={canContinue ? handleCtaPressOut : undefined}
          activeOpacity={1}
        >
          <Animated.View style={{ transform: [{ scale: ctaScale }], alignItems: 'center' }}>
          <Text style={[styles.ctaText, !canContinue && styles.ctaTextDisabled]}>
            {step < STEPS.length - 1 ? t('emotional.cta.continue') : t('emotional.cta.seeReset')}
          </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  dots: { flexDirection: 'row', gap: 6 },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: 'rgba(28,28,28,0.12)',
  },
  dotDone: { backgroundColor: Colors.accent },
  dotActive: { width: 24, height: 7, borderRadius: 3.5, backgroundColor: Colors.charcoal },
  skipBtn: { padding: Spacing.sm },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontWeight: Typography.weights.medium,
  },

  // ── Body ─────────────────────────────────────────────────────────────────────
  body: {
    flex: 1,
    position: 'relative',
  },
  stepContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 120,
  },
  stepNumber: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.8,
    marginBottom: Spacing.md,
    opacity: 0.55,
  },
  question: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  microcopy: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.xl,
  },

  // ── Options ───────────────────────────────────────────────────────────────────
  options: { gap: 6 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },
  optionSelected: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accent,
  },
  optionDot: {
    width: 19, height: 19, borderRadius: 9.5,
    borderWidth: 1.5,
    borderColor: 'rgba(28,28,28,0.18)',
    backgroundColor: '#F5EFE0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionDotSelected: {
    borderColor: Colors.charcoal,
    backgroundColor: Colors.charcoal,
  },
  optionDotFill: {
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: Colors.accent,
  },
  optionLabel: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  optionLabelSelected: {
    color: Colors.textPrimary,
    fontWeight: Typography.weights.semibold,
  },

  // ── Footer ────────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 52 : 40,
    paddingTop: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  ctaBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 19,
    alignItems: 'center',
    ...Shadows.charcoal,
  },
  ctaBtnDisabled: {
    backgroundColor: '#EAE4D3',
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  ctaTextDisabled: {
    color: '#9E9485',
  },
});

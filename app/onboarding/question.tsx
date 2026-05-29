// ─── Onboarding Screen 2: The One Question ───────────────────────────────────
// Dark, slightly warmer background. Single question. Five card options.
// No radio buttons — full card tap. Selected = warm gold border.
// Only one selection allowed. Button appears after selection.
// Answer maps to emotional profile and arrival state, stored for personalization.

import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Platform, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { setItem, StorageKeys } from '../../hooks/useStorage';
import { track } from '../../utils/analytics';
import { useLanguage } from '../../hooks/useLanguage';
import type { EmotionalProfile } from '../emotional-onboarding';

const DARK_BG = '#1D1A14'; // slightly warmer than Screen 1
const GOLD    = '#C9A84C';

interface ArrivalOption {
  id:      string;
  profile: EmotionalProfile;
}

// Option ids and emotional profiles — language-independent
const OPTIONS: ArrivalOption[] = [
  { id: 'exhausted_still_here', profile: 'burnout' },
  { id: 'anxious_scattered',    profile: 'calm'    },
  { id: 'running_on_empty',     profile: 'burnout' },
  { id: 'just_breathe',         profile: 'calm'    },
  { id: 'finding_way_back',     profile: 'focus'   },
];

// Maps option id → translation key
const OPTION_KEY: Record<string, string> = {
  exhausted_still_here: 'onboarding.arrival.options.exhausted',
  anxious_scattered:    'onboarding.arrival.options.anxious',
  running_on_empty:     'onboarding.arrival.options.empty',
  just_breathe:         'onboarding.arrival.options.breathe',
  finding_way_back:     'onboarding.arrival.options.returning',
};

function FadeIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, duration: 420, delay,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

function OptionCard({
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
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.spring(scale,  { toValue: 1, friction: 9, tension: 200, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View
        style={[
          styles.optionCard,
          selected && styles.optionCardSelected,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function OnboardingQuestion() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnTransY  = useRef(new Animated.Value(10)).current;

  // Button fades in when an option is selected
  useEffect(() => {
    if (selected) {
      Animated.parallel([
        Animated.timing(btnOpacity, {
          toValue: 1, duration: 280,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
        Animated.timing(btnTransY, {
          toValue: 0, duration: 280,
          easing: Easing.out(Easing.cubic), useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(btnOpacity, { toValue: 0, duration: 180, useNativeDriver: true }).start();
    }
  }, [selected]);

  const handleContinue = async () => {
    if (!selected) return;
    const option = OPTIONS.find(o => o.id === selected);
    if (!option) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    track('onboarding_arrival_selected', { arrival: selected, profile: option.profile });

    await Promise.all([
      setItem(StorageKeys.ARRIVAL_STATE, selected),
      setItem(StorageKeys.EMOTIONAL_PROFILE, option.profile),
    ]);

    router.push('/onboarding/promise');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <FadeIn delay={200}>
          <Text style={styles.eyebrow}>{t('onboarding.arrival.label')}</Text>
        </FadeIn>

        <FadeIn delay={520}>
          <Text style={styles.headline}>{t('onboarding.arrival.title')}</Text>
        </FadeIn>

        <FadeIn delay={760}>
          <Text style={styles.sub}>{t('onboarding.arrival.subtitle')}</Text>
        </FadeIn>

        <FadeIn delay={980}>
          <View style={styles.options}>
            {OPTIONS.map(opt => (
              <OptionCard
                key={opt.id}
                label={t(OPTION_KEY[opt.id] ?? opt.id)}
                selected={selected === opt.id}
                onPress={() => setSelected(opt.id)}
              />
            ))}
          </View>
        </FadeIn>
      </View>

      {/* Button only appears after selection */}
      <Animated.View
        style={[styles.footer, { opacity: btnOpacity, transform: [{ translateY: btnTransY }] }]}
        pointerEvents={selected ? 'auto' : 'none'}
      >
        <TouchableOpacity style={styles.btn} onPress={handleContinue} activeOpacity={0.82}>
          <Text style={styles.btnText}>{t('onboarding.arrival.cta')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'ios' ? 52 : 40,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    gap: 22,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 3.2,
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.42)',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  options: {
    gap: 9,
    marginTop: 4,
  },
  optionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  optionCardSelected: {
    backgroundColor: 'rgba(201,168,76,0.13)',
    borderColor: GOLD,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  btn: {
    backgroundColor: GOLD,
    borderRadius: 999,
    paddingVertical: 19,
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A18',
    letterSpacing: 0.1,
  },
});

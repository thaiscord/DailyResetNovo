// ─── Onboarding Screen 1b: Language Selection ────────────────────────────────
// Premium emotional space — choosing your language feels like choosing a tone.
// No flags, no dropdowns, no settings feel.
// Dark background · gold accent · soft selected state · fade animations.

import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '../../hooks/useLanguage';
import type { Lang } from '../../hooks/useLanguage';
import { translations } from '../../locales/translations';
import { track } from '../../utils/analytics';

function tLocal(lang: Lang, key: string): string {
  const dict = translations[lang] as Record<string, string>;
  return dict[key] ?? (translations['en'] as Record<string, string>)[key] ?? key;
}

const DARK_BG = '#1A1A18';
const GOLD    = '#C9A84C';

interface LangOption {
  code: Lang;
  label: string;
  native: string;
}

const OPTIONS: LangOption[] = [
  { code: 'pt', label: 'Português', native: 'Português' },
  { code: 'en', label: 'English',   native: 'English'   },
  { code: 'es', label: 'Español',   native: 'Español'   },
  { code: 'fr', label: 'Français',  native: 'Français'  },
  { code: 'de', label: 'Deutsch',   native: 'Deutsch'   },
];

function FadeIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 420, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, duration: 420, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export default function OnboardingLanguage() {
  const router = useRouter();
  const { setLang, lang: currentLang } = useLanguage();
  const [selected, setSelected] = useState<Lang>(currentLang);

  // Button fade-in after options settle
  const btnOpacity  = useRef(new Animated.Value(0)).current;
  const btnTransY   = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    track('onboarding_language_viewed');
    Animated.parallel([
      Animated.timing(btnOpacity, {
        toValue: 1, duration: 500, delay: 1600,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(btnTransY, {
        toValue: 0, duration: 500, delay: 1600,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Animated selected border for each option
  const selAnims = useRef(
    Object.fromEntries(OPTIONS.map(o => [o.code, new Animated.Value(o.code === currentLang ? 1 : 0)]))
  ).current;

  const handleSelect = (code: Lang) => {
    if (code === selected) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Fade out previous
    Animated.timing(selAnims[selected]!, {
      toValue: 0, duration: 200, useNativeDriver: false,
    }).start();

    // Fade in new
    Animated.timing(selAnims[code]!, {
      toValue: 1, duration: 220, useNativeDriver: false,
    }).start();

    setSelected(code);
  };

  const handleContinue = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await setLang(selected);
    track('onboarding_language_selected', { lang: selected });
    router.push('/onboarding/question');
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" />

      <View style={S.content}>
        {/* Header */}
        <FadeIn delay={300}>
          <Text style={S.eyebrow}>{tLocal(selected, 'lang.eyebrow')}</Text>
        </FadeIn>

        <FadeIn delay={560}>
          <Text style={S.title}>{tLocal(selected, 'lang.chooseLangTitle')}.</Text>
        </FadeIn>

        <FadeIn delay={760}>
          <Text style={S.sub}>{tLocal(selected, 'lang.sub')}</Text>
        </FadeIn>

        {/* Language options */}
        <View style={S.options}>
          {OPTIONS.map((opt, i) => {
            const borderColor = selAnims[opt.code]!.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255,255,255,0.08)', GOLD],
            });
            const bgColor = selAnims[opt.code]!.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255,255,255,0.03)', 'rgba(201,168,76,0.08)'],
            });

            return (
              <FadeIn key={opt.code} delay={880 + i * 90}>
                <TouchableOpacity
                  onPress={() => handleSelect(opt.code)}
                  activeOpacity={0.75}
                >
                  <Animated.View style={[S.option, { borderColor, backgroundColor: bgColor }]}>
                    <Text style={[
                      S.optionText,
                      selected === opt.code && S.optionTextSelected,
                    ]}>
                      {opt.native}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </FadeIn>
            );
          })}
        </View>
      </View>

      {/* Continue button */}
      <Animated.View style={[S.footer, { opacity: btnOpacity, transform: [{ translateY: btnTransY }] }]}>
        <TouchableOpacity
          style={[S.btn, !selected && S.btnDisabled]}
          onPress={handleContinue}
          activeOpacity={0.82}
          disabled={!selected}
        >
          <Text style={S.btnText}>{tLocal(selected, 'common.continue')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 72,
    gap: 0,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 3.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    lineHeight: 40,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.42)',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 40,
  },

  // ── Options ────────────────────────────────────────────────────────────────
  options: {
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.1,
  },
  optionTextSelected: {
    color: GOLD,
    fontWeight: '600',
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
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
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A18',
    letterSpacing: 0.1,
  },
});

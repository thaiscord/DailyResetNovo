import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar,
  TextInput, KeyboardAvoidingView, Platform,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useEmotionalProfile } from '../hooks/useEmotionalProfile';
import { useProgress } from '../hooks/useProgress';
import { useRitualMemory } from '../hooks/useRitualMemory';
import { useRitualIntention } from '../hooks/useRitualIntention';
import { useLanguage } from '../hooks/useLanguage';
import { getItem, setItem, StorageKeys, getLocalDateKey } from '../hooks/useStorage';
import { getAppNow } from '../utils/appDate';
import { track } from '../utils/analytics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import {
  getIntentionOptions,
  RitualStep,
} from '../utils/resetRitual';
import {
  getIntentionCompletionMessage,
  getIntentionReflectQuestion,
  RitualIntention,
} from '../utils/ritualIntention';
import {
  getRitualByMood,
  buildVariantRitualSteps,
  type RitualVariant,
} from '../utils/resetRitualConfigs';
import { type DailyState } from '../utils/dailyState';

const { width, height } = Dimensions.get('window');

// ─── Ambient particles ────────────────────────────────────────────────────────

const PARTICLE_DATA = [
  { rx: 0.12, ry: 0.10, size: 2, duration: 5200, delay: 0 },
  { rx: 0.83, ry: 0.18, size: 3, duration: 6800, delay: 900 },
  { rx: 0.55, ry: 0.07, size: 2, duration: 4900, delay: 1700 },
  { rx: 0.22, ry: 0.38, size: 2, duration: 7200, delay: 400 },
  { rx: 0.76, ry: 0.44, size: 3, duration: 5600, delay: 2100 },
  { rx: 0.08, ry: 0.62, size: 2, duration: 6400, delay: 1300 },
  { rx: 0.66, ry: 0.71, size: 3, duration: 5800, delay: 600 },
  { rx: 0.40, ry: 0.84, size: 2, duration: 7000, delay: 1900 },
];

function ParticleItem({
  rx, ry, size, duration, delay,
}: { rx: number; ry: number; size: number; duration: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;
    const timeout = setTimeout(() => {
      loop = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0.18 + size * 0.06,
              duration: duration * 0.4,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(ty, {
              toValue: -8 - size * 2,
              duration: duration * 0.5,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: duration * 0.6,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(ty, {
              toValue: 0,
              duration: duration * 0.5,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      loop.start();
    }, delay);

    return () => {
      clearTimeout(timeout);
      loop?.stop();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: rx * width,
        top: ry * height,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.gold,
        opacity,
        transform: [{ translateY: ty }],
      }}
    />
  );
}

function AmbientParticles({ dimAnim }: { dimAnim: Animated.Value }) {
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { opacity: dimAnim }]}
      pointerEvents="none"
    >
      {PARTICLE_DATA.map((p, i) => (
        <ParticleItem key={i} {...p} />
      ))}
    </Animated.View>
  );
}

// ─── Ambient orb (arrive / return steps) ─────────────────────────────────────

function AmbientOrb({ active, large = false }: { active: boolean; large?: boolean }) {
  const wrapOpacity = useRef(new Animated.Value(0)).current;
  const glowScale   = useRef(new Animated.Value(0.88)).current;
  const glowOpacity = useRef(new Animated.Value(0.04)).current;

  useEffect(() => {
    if (!active) return;
    Animated.timing(wrapOpacity, {
      toValue: 1, duration: 1400, delay: 700,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale,   { toValue: 1.14, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: large ? 0.26 : 0.16, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale,   { toValue: 0.88, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.04, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [active]);

  const s = large ? 200 : 160;

  return (
    <Animated.View style={[styles.ambientOrb, { width: s, height: s, borderRadius: s / 2, opacity: wrapOpacity }]}>
      <Animated.View style={[
        styles.ambientOrbInner,
        { width: s, height: s, borderRadius: s / 2, opacity: glowOpacity, transform: [{ scale: glowScale }] },
      ]} />
    </Animated.View>
  );
}

// ─── Step content ─────────────────────────────────────────────────────────────

function StepContent({
  step,
  hideHeadline,
  children,
}: {
  step: RitualStep;
  hideHeadline?: boolean;
  children?: React.ReactNode;
}) {
  const { width: sw } = useWindowDimensions();
  const hPad = sw < 360 ? Spacing.xl : Spacing.xxl;
  return (
    <View style={[styles.stepWrap, { paddingHorizontal: hPad }]}>
      {step.streakNote ? (
        <Text style={styles.streakNote}>{step.streakNote}</Text>
      ) : null}
      <Text style={styles.eyebrow}>{step.eyebrow}</Text>
      {!hideHeadline ? <Text style={styles.headline}>{step.headline}</Text> : null}
      {children}
      {step.subtext ? <Text style={styles.subtext}>{step.subtext}</Text> : null}
    </View>
  );
}

// ─── Breath circle (3-phase: 4s inhale / 2s hold / 6s exhale) ────────────────

function BreathCircle({
  active,
  onCycleComplete,
  lang,
}: {
  active: boolean;
  onCycleComplete: () => void;
  lang?: string;
}) {
  const wrapOpacity    = useRef(new Animated.Value(0)).current;
  const ambientScale   = useRef(new Animated.Value(1)).current;
  const ambientOpacity = useRef(new Animated.Value(0.08)).current;
  const outerScale     = useRef(new Animated.Value(1)).current;
  const innerScale     = useRef(new Animated.Value(1)).current;
  const innerOpacity   = useRef(new Animated.Value(0.45)).current;
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const mountedRef     = useRef(true);
  const ambientLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const breathAnimRef  = useRef<Animated.CompositeAnimation | null>(null);
  const holdTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!active) return;

    Animated.timing(wrapOpacity, {
      toValue: 1, duration: 1100, useNativeDriver: true,
    }).start();

    ambientLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ambientScale, { toValue: 1.20, duration: 5800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(ambientOpacity, { toValue: 0.32, duration: 5800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(ambientScale, { toValue: 1, duration: 5800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(ambientOpacity, { toValue: 0.08, duration: 5800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ]),
    );
    ambientLoopRef.current.start();

    let firstCycleReported = false;

    const runCycle = () => {
      if (!mountedRef.current) return;

      // Inhale: 4s
      setPhase('inhale');
      breathAnimRef.current = Animated.parallel([
        Animated.timing(outerScale, { toValue: 1.55, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(innerScale, { toValue: 1.28, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(innerOpacity, { toValue: 0.80, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]);
      breathAnimRef.current.start(({ finished }) => {
        if (!finished || !mountedRef.current) return;

        // Hold: 2s
        setPhase('hold');
        holdTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return;

          // Exhale: 6s
          setPhase('exhale');
          breathAnimRef.current = Animated.parallel([
            Animated.timing(outerScale, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(innerScale, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(innerOpacity, { toValue: 0.45, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ]);
          breathAnimRef.current.start(({ finished: f2 }) => {
            if (!f2 || !mountedRef.current) return;
            if (!firstCycleReported) {
              firstCycleReported = true;
              onCycleComplete();
            }
            runCycle();
          });
        }, 2000);
      });
    };

    runCycle();

    return () => {
      ambientLoopRef.current?.stop();
      breathAnimRef.current?.stop();
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, [active]);

  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFrLang = lang === 'fr';
  const isDeLang = lang === 'de';
  const phaseLabel =
    phase === 'inhale' ? (isEs ? 'Inhala despacio...' : isPt ? 'Inspire devagar...' : isFrLang ? 'Inspire doucement...' : isDeLang ? 'Einatmen...' : 'Inhale slowly...') :
    phase === 'hold'   ? (isEs ? 'Sostén.'            : isPt ? 'Segure.'            : isFrLang ? 'Retiens.'             : isDeLang ? 'Halten.'    : 'Hold.')            :
                         (isEs ? 'Suelta.'             : isPt ? 'Solte.'             : isFrLang ? 'Relâche.'             : isDeLang ? 'Loslassen.' : 'Let go.');

  return (
    <Animated.View style={[styles.breathWrap, { opacity: wrapOpacity }]}>
      <Animated.View
        style={[
          styles.breathAmbient,
          { opacity: ambientOpacity, transform: [{ scale: ambientScale }] },
        ]}
      />
      <Animated.View style={[styles.breathOuter, { transform: [{ scale: outerScale }] }]} />
      <Animated.View
        style={[
          styles.breathInner,
          { opacity: innerOpacity, transform: [{ scale: innerScale }] },
        ]}
      />
      <View style={styles.breathTextWrap} pointerEvents="none">
        <Text style={styles.breathPhaseText}>{phaseLabel}</Text>
      </View>
    </Animated.View>
  );
}

// ─── Release input (text field → dissolution → "Gone.") ──────────────────────

function ReleaseInput({
  active,
  onAdvance,
  lang,
}: {
  active: boolean;
  onAdvance: () => void;
  lang?: string;
}) {
  const [text, setText] = useState('');
  const [state, setState] = useState<'input' | 'dissolving' | 'gone'>('input');
  const wrapOpacity     = useRef(new Animated.Value(0)).current;
  const wrapTy          = useRef(new Animated.Value(12)).current;
  const dissolveOpacity = useRef(new Animated.Value(1)).current;
  const dissolveTy      = useRef(new Animated.Value(0)).current;
  const goneOpacity     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    Animated.parallel([
      Animated.timing(wrapOpacity, {
        toValue: 1, duration: 700, delay: 800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(wrapTy, {
        toValue: 0, duration: 700, delay: 800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, [active]);

  const handleRelease = useCallback(() => {
    if (state !== 'input') return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState('dissolving');
    Animated.parallel([
      Animated.timing(dissolveOpacity, {
        toValue: 0, duration: 550,
        easing: Easing.in(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(dissolveTy, {
        toValue: -24, duration: 550,
        easing: Easing.in(Easing.cubic), useNativeDriver: true,
      }),
    ]).start(() => {
      setState('gone');
      Animated.timing(goneOpacity, {
        toValue: 0.38, duration: 700,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }).start();
      setTimeout(onAdvance, 2400);
    });
  }, [state, onAdvance]);

  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFrLang = lang === 'fr';
  const isDeLang = lang === 'de';

  if (state === 'gone') {
    return (
      <Animated.Text style={[styles.releaseGoneText, { opacity: goneOpacity }]}>
        {isEs ? 'Fue.' : isPt ? 'Tudo bem.' : isFrLang ? 'C\'est parti.' : isDeLang ? 'Weg.' : 'Gone.'}
      </Animated.Text>
    );
  }

  return (
    <Animated.View
      style={[
        styles.releaseInputWrap,
        { opacity: wrapOpacity, transform: [{ translateY: wrapTy }] },
      ]}
    >
      <Animated.View
        style={{ opacity: dissolveOpacity, transform: [{ translateY: dissolveTy }] }}
      >
        <TextInput
          style={styles.releaseInput}
          placeholder={isEs ? '¿Qué estás soltando?' : isPt ? 'O que você está soltando?' : isFrLang ? 'Qu\'est-ce que tu lâches ?' : isDeLang ? 'Was lässt du gerade los?' : 'What are you releasing?'}
          placeholderTextColor="rgba(255,255,255,0.18)"
          value={text}
          onChangeText={setText}
          multiline
          maxLength={200}
          keyboardAppearance="dark"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={handleRelease}
        />
        <TouchableOpacity
          style={[
            styles.releaseLetGoBtn,
            !text.trim() && styles.releaseLetGoBtnDisabled,
          ]}
          onPress={handleRelease}
          activeOpacity={0.7}
          disabled={!text.trim()}
        >
          <Text style={styles.releaseLetGoBtnText}>{isEs ? 'Soltarlo →' : isPt ? 'Solte →' : isFrLang ? 'Lâche-le →' : isDeLang ? 'Loslassen →' : 'Let it go →'}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Note input (optional write — balanced ritual) ────────────────────────────

function NoteInput({
  active,
  onAdvance,
  lang,
}: {
  active: boolean;
  onAdvance: () => void;
  lang?: string;
}) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const wrapOpacity  = useRef(new Animated.Value(0)).current;
  const wrapTy       = useRef(new Animated.Value(12)).current;
  const savedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    Animated.parallel([
      Animated.timing(wrapOpacity, {
        toValue: 1, duration: 700, delay: 800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(wrapTy, {
        toValue: 0, duration: 700, delay: 800,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, [active]);

  const handleSave = useCallback(() => {
    if (saved || !text.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSaved(true);
    Animated.timing(savedOpacity, {
      toValue: 0.55, duration: 700,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
    setTimeout(onAdvance, 2000);
  }, [saved, text, onAdvance, savedOpacity]);

  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFrLang = lang === 'fr';
  const isDeLang = lang === 'de';

  const placeholder = isEs ? '¿Qué te ayudó a llegar hasta aquí hoy?' :
                      isPt ? 'O que ajudou você a chegar até aqui hoje?' :
                      isFrLang ? "Qu'est-ce qui t'a aidé à arriver jusqu'ici aujourd'hui ?" :
                      isDeLang ? 'Was hat dir heute geholfen, hierher zu kommen?' :
                                 'What helped you get here today?';

  const saveLabel = isEs ? 'Guardar →' : isPt ? 'Guardar →' : isFrLang ? 'Garder →' : isDeLang ? 'Speichern →' : 'Save →';
  const savedLabel = isEs ? 'Guardado.' : isPt ? 'Guardado.' : isFrLang ? 'Gardé.' : isDeLang ? 'Gespeichert.' : 'Noted.';

  if (saved) {
    return (
      <Animated.Text style={[styles.releaseGoneText, { opacity: savedOpacity }]}>
        {savedLabel}
      </Animated.Text>
    );
  }

  return (
    <Animated.View style={[styles.releaseInputWrap, { opacity: wrapOpacity, transform: [{ translateY: wrapTy }] }]}>
      <TextInput
        style={styles.releaseInput}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.18)"
        value={text}
        onChangeText={setText}
        multiline
        maxLength={200}
        keyboardAppearance="dark"
        returnKeyType="done"
        blurOnSubmit
        onSubmitEditing={handleSave}
      />
      {text.trim().length > 0 && (
        <TouchableOpacity
          style={styles.releaseLetGoBtn}
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <Text style={styles.releaseLetGoBtnText}>{saveLabel}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

// ─── Word-by-word reveal (reflect headline) ───────────────────────────────────

function WordReveal({ text, active }: { text: string; active: boolean }) {
  const lines    = useMemo(() => text.split('\n'), [text]);
  const wordList = useMemo(() => {
    const list: Array<{ word: string; line: number }> = [];
    lines.forEach((line, li) => {
      line.split(' ').filter(Boolean).forEach(word => {
        list.push({ word, line: li });
      });
    });
    return list;
  }, [lines]);

  // Recreate animated values whenever the word count changes so anims[idx]
  // is never undefined when wordList grows or shrinks between renders.
  const anims = useMemo(
    () => wordList.map(() => new Animated.Value(0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wordList.length],
  );

  useEffect(() => {
    if (!active) return;
    // Reset all values before staggering so re-activating the same step
    // replays the reveal animation cleanly.
    anims.forEach(a => a.setValue(0));
    Animated.stagger(
      140,
      anims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      ),
    ).start();
  }, [active, anims]);

  const byLine = useMemo(() => {
    const result: Array<Array<{ word: string; idx: number }>> = lines.map(() => []);
    wordList.forEach((item, idx) => {
      result[item.line].push({ word: item.word, idx });
    });
    return result;
  }, [lines, wordList]);

  return (
    <View style={styles.wordRevealWrap}>
      {byLine.map((words, li) => (
        <View key={li} style={styles.wordRevealLine}>
          {words.map(({ word, idx }) => (
            <Animated.Text
              key={idx}
              style={[
                styles.headline,
                styles.wordRevealWord,
                {
                  opacity: anims[idx],
                  transform: [{
                    translateY: anims[idx].interpolate({
                      inputRange: [0, 1],
                      outputRange: [8, 0],
                    }),
                  }],
                },
              ]}
            >
              {word}
            </Animated.Text>
          ))}
        </View>
      ))}
    </View>
  );
}

// ─── Progress segments ────────────────────────────────────────────────────────

function ProgressSegments({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.progressBar}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.progressSegment,
            i < current && styles.progressSegmentDone,
            i === current && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Return glow (completion ripple) ─────────────────────────────────────────

function ReturnGlow({ active }: { active: boolean }) {
  const centerOpacity = useRef(new Animated.Value(0)).current;
  const ring1Scale    = useRef(new Animated.Value(0.2)).current;
  const ring1Opacity  = useRef(new Animated.Value(0)).current;
  const ring2Scale    = useRef(new Animated.Value(0.2)).current;
  const ring2Opacity  = useRef(new Animated.Value(0)).current;
  const ring3Scale    = useRef(new Animated.Value(0.2)).current;
  const ring3Opacity  = useRef(new Animated.Value(0)).current;
  const ring4Scale    = useRef(new Animated.Value(0.2)).current;
  const ring4Opacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;

    Animated.timing(centerOpacity, {
      toValue: 1, duration: 2800, delay: 300,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(centerOpacity, { toValue: 0.55, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(centerOpacity, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ).start();
    });

    const ripple = (
      scale: Animated.Value,
      opacity: Animated.Value,
      delay: number,
    ) => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1, duration: 2800,
            easing: Easing.out(Easing.cubic), useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.50, duration: 400, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 2400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          ]),
        ]),
      ]).start();
    };

    ripple(ring1Scale, ring1Opacity, 400);
    ripple(ring2Scale, ring2Opacity, 950);
    ripple(ring3Scale, ring3Opacity, 1600);
    ripple(ring4Scale, ring4Opacity, 2300);
  }, [active]);

  if (!active) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Animated.View style={[styles.returnGlowCenter, { opacity: centerOpacity }]}>
        <LinearGradient
          colors={[`${Colors.gold}1A`, `${Colors.accent}0C`, 'transparent']}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      <View style={styles.returnRippleWrap}>
        <Animated.View style={[styles.rippleRing, { opacity: ring1Opacity, transform: [{ scale: ring1Scale }] }]} />
        <Animated.View style={[styles.rippleRing, { opacity: ring2Opacity, transform: [{ scale: ring2Scale }] }]} />
        <Animated.View style={[styles.rippleRing, { opacity: ring3Opacity, transform: [{ scale: ring3Scale }] }]} />
        <Animated.View style={[styles.rippleRing, { opacity: ring4Opacity, transform: [{ scale: ring4Scale }] }]} />
      </View>
    </View>
  );
}

// ─── Intention grid with entrance animations ──────────────────────────────────

function IntentionGrid({
  options,
  selectedId,
  onSelect,
}: {
  options: Array<{ id: string; label: string; sub: string }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const anims = useMemo(
    () => options.map(() => new Animated.Value(0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.length],
  );

  const dimAnims = useMemo(
    () => options.map(() => new Animated.Value(1)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.length],
  );

  const combinedOpacities = useMemo(
    () => anims.map((a, i) => Animated.multiply(a, dimAnims[i])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [anims, dimAnims],
  );

  useEffect(() => {
    anims.forEach(a => a.setValue(0));
    dimAnims.forEach(a => a.setValue(1));
    Animated.stagger(
      90,
      anims.map(a =>
        Animated.timing(a, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [anims, dimAnims]);

  useEffect(() => {
    if (!selectedId) return;
    options.forEach((opt, i) => {
      Animated.timing(dimAnims[i], {
        toValue: opt.id === selectedId ? 1 : 0.25,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  }, [selectedId, options, dimAnims]);

  return (
    <View style={styles.intentionGrid}>
      {options.map((opt, i) => (
        <Animated.View
          key={opt.id}
          style={{
            width: '100%',
            opacity: combinedOpacities[i],
            transform: [{
              translateY: anims[i].interpolate({ inputRange: [0, 1], outputRange: [14, 0] }),
            }],
          }}
        >
          <TouchableOpacity
            style={[
              styles.intentionOption,
              selectedId === opt.id && styles.intentionOptionSelected,
            ]}
            onPress={() => onSelect(opt.id)}
            activeOpacity={0.78}
          >
            <Text style={[
              styles.intentionLabel,
              selectedId === opt.id && styles.intentionLabelSelected,
            ]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

// ─── Focus visual (for mood-based ritual variants) ───────────────────────────

function FocusVisual({ centerText, active }: { centerText?: string; active: boolean }) {
  const wrapOpacity = useRef(new Animated.Value(0)).current;
  const glowScale   = useRef(new Animated.Value(0.85)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    Animated.timing(wrapOpacity, {
      toValue: 1, duration: 900, delay: 400,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale,   { toValue: 1.10, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.20, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale,   { toValue: 0.85, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.06, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ]),
    ).start();
  }, [active]);

  if (!centerText) return null;

  return (
    <Animated.View style={[styles.focusWrap, { opacity: wrapOpacity }]}>
      <Animated.View
        style={[
          styles.focusGlow,
          { opacity: glowOpacity, transform: [{ scale: glowScale }] },
        ]}
      />
      <Text style={styles.focusCenterText}>{centerText}</Text>
    </Animated.View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ResetRitualScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lang } = useLanguage();
  const { profile } = useEmotionalProfile();
  const { progress } = useProgress();
  const { saveRitual } = useRitualMemory();
  const { setIntention } = useRitualIntention();

  // Load today's daily state once at mount and lock it for the session
  const [ritualVariant, setRitualVariant] = useState<RitualVariant>('breathing');
  useEffect(() => {
    getItem<DailyState>(StorageKeys.DAILY_STATE + '_' + getLocalDateKey(), null)
      .then(state => setRitualVariant(getRitualByMood(state)));
  }, []);

  const [stepIndex, setStepIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  const [intentionConfirm, setIntentionConfirm] = useState<string | null>(null);
  const [breathCycleComplete, setBreathCycleComplete] = useState(false);
  const [breathKey, setBreathKey] = useState(0);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmFadeAnim = useRef(new Animated.Value(0)).current;

  const mountAnim      = useRef(new Animated.Value(0)).current;
  const contentFade    = useRef(new Animated.Value(1)).current;
  const ambientDimAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1, duration: 1000, delay: 120,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    track('reset_ritual_started', { day: progress.completedDays.length + 1 });
  }, []);

  // How many consecutive days before today had no completion
  const daysMissed = useMemo(() => {
    if (!progress.completedDays || progress.completedDays.length === 0) return 0;
    const byDate = (progress.completedByDate ?? {}) as Record<string, boolean>;
    let missed = 0;
    const d = new Date(getAppNow());
    d.setDate(d.getDate() - 1);
    for (let i = 0; i < 7; i++) {
      const key = getLocalDateKey(d);
      if (byDate[key]) break;
      missed++;
      d.setDate(d.getDate() - 1);
    }
    return missed;
  }, [progress.completedDays, progress.completedByDate]);

  const intentionOptions = useMemo(() => getIntentionOptions(lang), [lang]);

  const steps = useMemo(() => {
    const raw = buildVariantRitualSteps(
      ritualVariant,
      profile,
      new Date().getHours(),
      progress.streak ?? 0,
      daysMissed,
      lang,
      progress.completedDays.length,
    );
    if (!selectedIntention) return raw;
    const intention = selectedIntention as RitualIntention;
    return raw.map(s => {
      if (s.id === 'reflect') return { ...s, headline: getIntentionReflectQuestion(intention, lang) };
      if (s.id === 'return')  return { ...s, headline: getIntentionCompletionMessage(intention, lang) };
      return s;
    });
  }, [ritualVariant, profile, selectedIntention, progress.streak, daysMissed, lang]);

  const currentStep = steps[stepIndex];
  const isLast      = stepIndex === steps.length - 1;
  const isRecenter  = currentStep?.id === 'recenter';
  const isBreathe   = currentStep?.id === 'breathe';
  const isFocus     = currentStep?.id === 'focus';
  const isNote      = currentStep?.id === 'note';

  // Use step-specific intention options when provided (mood-based rituals), else fall back to default
  const activeIntentionOptions = useMemo(
    () => currentStep?.intentionOptions ?? intentionOptions,
    [currentStep?.intentionOptions, intentionOptions],
  );

  useEffect(() => {
    const map: Record<number, () => void> = {
      0: () => setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),  300),
      1: () => setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 800),
      3: () => setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),  300),
      4: () => setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),  300),
      5: () => setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 400),
    };
    map[stepIndex]?.();
  }, [stepIndex]);

  // Fade ambient particles out gently when reaching the final step
  useEffect(() => {
    if (!isLast) return;
    Animated.timing(ambientDimAnim, {
      toValue: 0.18,
      duration: 2200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isLast, ambientDimAnim]);

  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    const ms = currentStep?.autoAdvanceMs ?? 0;
    if (ms > 0) autoTimer.current = setTimeout(advance, ms);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [stepIndex]);

  const advance = useCallback(() => {
    if (transitioning || stepIndex >= steps.length - 1) return;
    setTransitioning(true);
    // Stage 1: dissolve out (450ms — slow, atmospheric)
    Animated.timing(contentFade, {
      toValue: 0, duration: 450,
      easing: Easing.inOut(Easing.sin), useNativeDriver: true,
    }).start(() => {
      // Stage 2: minimal pause, then swap step
      setTimeout(() => {
        setStepIndex(i => i + 1);
        setTransitioning(false);
        // Stage 3: dissolve in (600ms — soft, cinematic)
        Animated.timing(contentFade, {
          toValue: 1, duration: 600,
          easing: Easing.out(Easing.sin), useNativeDriver: true,
        }).start();
      }, 40);
    });
  }, [stepIndex, transitioning, steps.length, contentFade]);

  const handleCycleComplete = useCallback(() => {
    setBreathCycleComplete(true);
  }, []);

  const handleOneMore = useCallback(() => {
    setBreathCycleComplete(false);
    setBreathKey(k => k + 1);
  }, []);

  const handleReleaseAdvance = useCallback(() => {
    advance();
  }, [advance]);

  const handleIntentionSelect = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedIntention(id);
    setIntention(id as RitualIntention);

    const balancedPhrases =
      lang === 'pt' ? ['Isso vale notar.', 'Faz sentido levar isso.', 'Você pode manter isso.', 'Bom continuar com isso.'] :
      lang === 'es' ? ['Vale la pena guardarlo.', 'Tiene sentido llevarlo.', 'Puedes mantener eso.', 'Bien continuar con esto.'] :
      lang === 'fr' ? ['Ça vaut la peine de le garder.', 'Ça a du sens de l\'emporter.', 'Tu peux garder ça.', 'Bien de continuer avec ça.'] :
      lang === 'de' ? ['Das ist es wert, es zu behalten.', 'Es macht Sinn, das mitzunehmen.', 'Das kannst du festhalten.', 'Gut, damit weiterzumachen.'] :
                      ['That\'s worth keeping.', 'Good to carry that forward.', 'You can hold onto this.', 'That makes sense.'];

    const phrases = ritualVariant === 'balanced' ? balancedPhrases :
      lang === 'pt' ? [
        'Tudo bem começar por aí.',
        'Isso já é suficiente.',
        'Sem pressa.',
        'Pequeno também conta.',
        'Você não precisa resolver tudo hoje.',
      ] : lang === 'es' ? [
        'Está bien empezar por ahí.',
        'Eso ya es suficiente.',
        'Sin prisa.',
        'Lo pequeño también cuenta.',
        'No necesitas resolverlo todo hoy.',
      ] : lang === 'fr' ? [
        'C\'est suffisant pour commencer.',
        'Ça suffit déjà.',
        'Sans précipitation.',
        'Petit compte aussi.',
        'Tu n\'as pas besoin de tout résoudre aujourd\'hui.',
      ] : lang === 'de' ? [
        'Das reicht, um anzufangen.',
        'Das ist bereits genug.',
        'Keine Eile.',
        'Kleines zählt auch.',
        'Du musst heute nicht alles lösen.',
      ] : [
        "That's enough to start.",
        'This is already enough.',
        'No rush.',
        'Small counts too.',
        "You don't need to solve everything today.",
      ];

    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    setIntentionConfirm(phrase);
    confirmFadeAnim.setValue(0);
    Animated.timing(confirmFadeAnim, {
      toValue: 1, duration: 500,
      easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();

    // Ambient environment gently calms on selection
    Animated.timing(ambientDimAnim, {
      toValue: 0.55,
      duration: 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    setTimeout(advance, 1600);
  }, [advance, setIntention, lang, confirmFadeAnim, ambientDimAnim]);

  const handleClose = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLast) {
      await saveRitual(selectedIntention, profile, progress.completedDays.length);
      const alreadySeen = await getItem<boolean>(StorageKeys.FIRST_RITUAL_COMPLETED, false);
      track('reset_ritual_completed', {
        day: progress.completedDays.length + 1,
        isFirstTime: !alreadySeen,
      });
      if (!alreadySeen) {
        await setItem(StorageKeys.FIRST_RITUAL_COMPLETED, true);
      }
    } else {
      track('reset_ritual_skipped');
    }
    router.back();
  }, [isLast, selectedIntention, profile, progress, saveRitual, router]);

  const mountScale = mountAnim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#17130E', '#1C1C1C', '#1B1710']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <AmbientParticles dimAnim={ambientDimAnim} />
      <ReturnGlow active={isLast} />

      <TouchableOpacity style={[styles.closeBtn, { top: Math.max(insets.top + 12, 56) }]} onPress={handleClose} activeOpacity={0.7}>
        <Ionicons name="close" size={18} color="rgba(255,255,255,0.30)" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.stepsArea,
          { opacity: mountAnim, transform: [{ scale: mountScale }] },
        ]}
      >
        {/* Single content layer — opacity controlled by contentFade for staged transitions */}
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: contentFade }]}>
          {currentStep && (
            <StepContent
              step={currentStep}
              hideHeadline={currentStep.id === 'reflect'}
            >
              {currentStep.id === 'arrive' && (
                <AmbientOrb active={!transitioning} />
              )}

              {currentStep.id === 'return' && (
                <AmbientOrb active={!transitioning} large />
              )}

              {currentStep.id === 'breathe' && (
                <BreathCircle
                  key={breathKey}
                  active={!transitioning}
                  onCycleComplete={handleCycleComplete}
                  lang={lang}
                />
              )}

              {currentStep.id === 'focus' && (
                <FocusVisual
                  centerText={currentStep.centerText}
                  active={!transitioning}
                />
              )}

              {currentStep.id === 'recenter' && (
                <>
                  <IntentionGrid
                    options={activeIntentionOptions}
                    selectedId={selectedIntention}
                    onSelect={handleIntentionSelect}
                  />
                  {intentionConfirm != null && (
                    <Animated.Text style={[styles.intentionConfirmText, { opacity: confirmFadeAnim }]}>
                      {intentionConfirm}
                    </Animated.Text>
                  )}
                </>
              )}

              {currentStep.id === 'release' && (
                <ReleaseInput
                  active={!transitioning}
                  onAdvance={handleReleaseAdvance}
                  lang={lang}
                />
              )}

              {currentStep.id === 'reflect' && (
                <WordReveal
                  text={currentStep.headline}
                  active={!transitioning}
                />
              )}

              {currentStep.id === 'note' && (
                <NoteInput
                  active={!transitioning}
                  onAdvance={advance}
                  lang={lang}
                />
              )}
            </StepContent>
          )}
        </Animated.View>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <ProgressSegments current={stepIndex} total={steps.length} />

        {isLast ? (
          <TouchableOpacity style={styles.returnBtn} onPress={handleClose} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.accentLight, Colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.returnBtnInner}
            >
              <Text style={styles.returnBtnText}>{(() => {
              if (ritualVariant === 'balanced') {
                const opts =
                  lang === 'pt' ? ['Levar isso comigo', 'Continuar com isso', 'Seguir no meu ritmo'] :
                  lang === 'es' ? ['Llevar esto conmigo', 'Continuar con esto', 'Seguir en mi ritmo'] :
                  lang === 'fr' ? ['Emporter ça avec moi', 'Continuer avec ça', 'Garder mon rythme'] :
                  lang === 'de' ? ['Das mitnehmen', 'Damit weitermachen', 'In meinem Rhythmus bleiben'] :
                                  ['Take this with me', 'Keep going with this', 'Stay in my rhythm'];
                return opts[progress.currentDay % opts.length];
              }
              return lang === 'es' ? 'Lleva esta calma contigo' : lang === 'pt' ? 'Leve essa calma com você' : lang === 'fr' ? 'Emporte ce calme avec toi' : lang === 'de' ? 'Nimm diese Ruhe mit dir' : 'Carry this with you';
            })()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : isRecenter ? null : isFocus ? (
          <TouchableOpacity style={styles.continueHint} onPress={advance} activeOpacity={0.6}>
            <Text style={styles.continueHintText}>{lang === 'es' ? 'Continúa cuando puedas.' : lang === 'pt' ? 'Continue no seu tempo.' : lang === 'fr' ? 'Avance quand tu veux.' : lang === 'de' ? 'Weiter, wenn du bereit bist.' : 'Continue when ready'}</Text>
          </TouchableOpacity>
        ) : isBreathe ? (
          breathCycleComplete ? (
            <View style={styles.breathCompleteRow}>
              <TouchableOpacity
                style={styles.breathOneMoreBtn}
                onPress={handleOneMore}
                activeOpacity={0.7}
              >
                <Text style={styles.breathOneMoreText}>{lang === 'es' ? '+1 poco' : lang === 'pt' ? '+1 pouco' : lang === 'fr' ? '+1 encore' : lang === 'de' ? '+1 mehr' : '+1 more'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.breathContinueBtn}
                onPress={advance}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-forward" size={18} color={Colors.charcoal} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.continueHint} onPress={advance} activeOpacity={0.6}>
              <Text style={styles.continueHintText}>{lang === 'es' ? 'Saltar respiración' : lang === 'pt' ? 'Pular respiração' : lang === 'fr' ? 'Passer la respiration' : lang === 'de' ? 'Atmung überspringen' : 'Skip breathing'}</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.continueHint} onPress={advance} activeOpacity={0.6}>
            <Text style={styles.continueHintText}>{lang === 'es' ? 'Continúa cuando puedas.' : lang === 'pt' ? 'Continue no seu tempo.' : lang === 'fr' ? 'Avance quand tu veux.' : lang === 'de' ? 'Weiter, wenn du bereit bist.' : 'Continue when ready'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Close ─────────────────────────────────────────────────────────────────
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: Spacing.xl,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  // ── Steps ─────────────────────────────────────────────────────────────────
  stepsArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  stepWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.lg,
  },
  streakNote: {
    fontSize: 10,
    color: `${Colors.gold}70`,
    letterSpacing: 1.5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 4,
    textAlign: 'center',
    opacity: 0.75,
  },
  headline: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 40,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  subtext: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.32)',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    letterSpacing: 0.4,
  },


  // ── Ambient orb (arrive / return) ─────────────────────────────────────────
  ambientOrb: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  ambientOrbInner: {
    position: 'absolute',
    backgroundColor: `${Colors.gold}16`,
    borderWidth: 1,
    borderColor: `${Colors.gold}20`,
  },

  // ── Breathing ─────────────────────────────────────────────────────────────
  breathWrap: {
    width: 210,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.lg,
  },
  breathAmbient: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${Colors.gold}0C`,
  },
  breathOuter: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: `${Colors.accent}0E`,
    borderWidth: 1,
    borderColor: `${Colors.gold}28`,
  },
  breathInner: {
    position: 'absolute',
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: `${Colors.accent}20`,
    borderWidth: 1.5,
    borderColor: `${Colors.accent}50`,
  },
  breathTextWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  breathPhaseText: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.45)',
    fontStyle: 'italic',
    letterSpacing: 0.8,
  },

  // ── Release input ──────────────────────────────────────────────────────────
  releaseInputWrap: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  releaseInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
    fontStyle: 'italic',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  releaseLetGoBtn: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs,
  },
  releaseLetGoBtnDisabled: {
    opacity: 0.25,
  },
  releaseLetGoBtnText: {
    fontSize: Typography.sizes.xs,
    color: `${Colors.gold}CC`,
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  releaseGoneText: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    fontStyle: 'italic',
    letterSpacing: 1,
    textAlign: 'center',
  },

  // ── Word reveal ────────────────────────────────────────────────────────────
  wordRevealWrap: {
    gap: 4,
    alignItems: 'center',
  },
  wordRevealLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  wordRevealWord: {
    // inherits styles.headline, override static values that conflict with flex layout
    lineHeight: 46,
  },

  // ── Intentions — full-width vertical stack ────────────────────────────────
  intentionGrid: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    marginTop: Spacing.md,
  },
  intentionOption: {
    height: 62,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intentionOptionSelected: {
    backgroundColor: 'rgba(201,168,76,0.13)',
    borderColor: `${Colors.gold}80`,
  },
  intentionLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(255,255,255,0.62)',
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 18,
  },
  intentionLabelSelected: {
    color: Colors.white,
  },
  intentionConfirmText: {
    fontSize: Typography.sizes.sm,
    color: `${Colors.gold}90`,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    marginTop: Spacing.lg,
    lineHeight: 22,
  },

  // ── Focus visual ──────────────────────────────────────────────────────────
  focusWrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.lg,
  },
  focusGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${Colors.gold}12`,
    borderWidth: 1,
    borderColor: `${Colors.gold}20`,
  },
  focusCenterText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: `${Colors.gold}CC`,
    fontStyle: 'italic',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // ── Return glow ───────────────────────────────────────────────────────────
  returnGlowCenter: {
    ...StyleSheet.absoluteFillObject,
  },
  returnRippleWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleRing: {
    position: 'absolute',
    width: width * 0.70,
    height: width * 0.70,
    borderRadius: width * 0.35,
    borderWidth: 1,
    borderColor: `${Colors.gold}70`,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 56,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  progressSegment: {
    flex: 1,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  progressSegmentDone: {
    backgroundColor: `${Colors.gold}60`,
  },
  progressSegmentActive: {
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  continueHint: {
    paddingVertical: Spacing.sm,
  },
  continueHintText: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.20)',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  breathCompleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  breathOneMoreBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  breathOneMoreText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.50)',
    letterSpacing: 0.4,
  },
  breathContinueBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnBtn: {
    width: '100%',
    borderRadius: Radii.full,
    overflow: 'hidden',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 10,
  },
  returnBtnInner: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: Radii.full,
  },
  returnBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
    letterSpacing: 0.5,
  },
});

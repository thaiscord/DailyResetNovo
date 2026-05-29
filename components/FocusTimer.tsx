import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
  Animated, Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { useLanguage } from '../hooks/useLanguage';

const FOCUS = [15, 25, 45, 60];
const DETOX = [15, 30, 60, 120];

interface Props { visible: boolean; onClose: () => void; mode: 'focus' | 'detox'; }

// ─── Animated SVG ring ────────────────────────────────────────────────────────

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function Ring({
  progressAnim, size, color, strokeWidth = 12,
}: {
  progressAnim: Animated.Value;
  size: number;
  color: string;
  strokeWidth?: number;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={Colors.backgroundSecondary}
        strokeWidth={strokeWidth} fill="none"
      />
      <AnimatedCircle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FocusTimerModal({ visible, onClose, mode }: Props) {
  const durations = mode === 'focus' ? FOCUS : DETOX;
  const [mins, setMins]       = useState(durations[1]);
  const [secs, setSecs]       = useState(durations[1] * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone]       = useState(false);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const glowLoopRef  = useRef<Animated.CompositeAnimation | null>(null);

  // ── Animated values ──────────────────────────────────────────────────────────
  const progressAnim   = useRef(new Animated.Value(1)).current;
  const pulseScale     = useRef(new Animated.Value(1)).current;
  const pillsOpacity   = useRef(new Animated.Value(1)).current;
  const completionFade = useRef(new Animated.Value(0)).current;
  const bgDim          = useRef(new Animated.Value(0)).current;
  // Glow
  const glowOpacity    = useRef(new Animated.Value(0)).current;
  const glowScale      = useRef(new Animated.Value(0.85)).current;
  // Play button
  const playBtnScale   = useRef(new Animated.Value(1)).current;

  // ── Countdown ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (running && secs > 0) {
      intervalRef.current = setInterval(() => {
        setSecs(p => {
          if (p <= 1) {
            setRunning(false);
            setDone(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  // ── Smooth ring progress ──────────────────────────────────────────────────────
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: mins > 0 ? secs / (mins * 60) : 0,
      duration: running ? 900 : 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [secs, mins]);

  // ── Idle pulse ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!running && !done) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, { toValue: 1.018, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(pulseScale, { toValue: 1,     duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => { loop.stop(); pulseScale.setValue(1); };
    } else {
      pulseScale.setValue(1);
    }
  }, [running, done]);

  // ── Ambient glow ──────────────────────────────────────────────────────────────
  useEffect(() => {
    glowLoopRef.current?.stop();

    if (running && !done) {
      // Fade in glow, then breathe
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 0.85, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(glowScale,   { toValue: 1,    duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start(() => {
        glowLoopRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, { toValue: 0.45, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(glowOpacity, { toValue: 0.85, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ]),
        );
        glowLoopRef.current.start();
      });
    } else if (done) {
      // Completion expansion — glow blooms out, then softly settles
      glowScale.setValue(1);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
          Animated.spring(glowScale, { toValue: 1.4, friction: 6, tension: 35, useNativeDriver: true }),
        ]),
        Animated.timing(glowOpacity, { toValue: 0.22, duration: 1600, delay: 100, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else {
      // Fade out (paused or idle)
      Animated.timing(glowOpacity, { toValue: 0, duration: 450, useNativeDriver: true }).start();
    }

    return () => { glowLoopRef.current?.stop(); };
  }, [running, done]);

  // ── Dim pills when running ────────────────────────────────────────────────────
  useEffect(() => {
    Animated.timing(pillsOpacity, {
      toValue: running ? 0.25 : 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [running]);

  // ── Background dim when running ───────────────────────────────────────────────
  useEffect(() => {
    Animated.timing(bgDim, {
      toValue: running ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [running]);

  // ── Completion fade-in ────────────────────────────────────────────────────────
  useEffect(() => {
    if (done) {
      Animated.timing(completionFade, {
        toValue: 1,
        duration: 700,
        delay: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      completionFade.setValue(0);
    }
  }, [done]);

  // ── Actions ───────────────────────────────────────────────────────────────────
  const pick = useCallback((m: number) => {
    if (running) return;
    setMins(m);
    setSecs(m * 60);
    setDone(false);
    progressAnim.setValue(1);
  }, [running]);

  const handlePlayPressIn  = useCallback(() =>
    Animated.timing(playBtnScale, { toValue: 0.90, duration: 90, useNativeDriver: true }).start(),
  []);
  const handlePlayPressOut = useCallback(() =>
    Animated.spring(playBtnScale, { toValue: 1, friction: 8, tension: 180, useNativeDriver: true }).start(),
  []);

  const toggleRunning = useCallback(() => {
    if (!running) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRunning(r => !r);
  }, [running]);

  const reset = useCallback(() => {
    setRunning(false);
    setDone(false);
    setSecs(mins * 60);
    Animated.timing(progressAnim, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    glowScale.setValue(0.85);
  }, [mins]);

  // ── Copy ──────────────────────────────────────────────────────────────────────
  const { t } = useLanguage();
  const color   = mode === 'focus' ? Colors.accent : Colors.success;
  const title   = t(mode === 'focus' ? 'timer.focus.title' : 'timer.detox.title');
  const glowColor = mode === 'focus'
    ? 'rgba(239,201,76,0.18)'   // warm golden
    : 'rgba(61,184,106,0.15)';  // soft green

  const idleMsg    = t('timer.idle');
  const runningMsg = t(mode === 'focus' ? 'timer.focus.running' : 'timer.detox.running');
  const doneMsg    = mode === 'focus' ? 'Attention protected.' : 'Clarity returns quietly.';
  const doneSub    = mode === 'focus' ? 'You stayed with yourself.' : 'You disconnected with intention.';
  const msg = done ? doneMsg : running ? runningMsg : idleMsg;

  const bgColor = bgDim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.background, '#F0EBE0'],
    extrapolate: 'clamp',
  });

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: mode === 'focus' ? Colors.accentDim : Colors.successDim }]}>
            <Ionicons name={mode === 'focus' ? 'timer-outline' : 'leaf-outline'} size={18} color={color} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeWrap}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={17} color={Colors.textPrimary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Duration pills — fade when running */}
        <Animated.View style={[styles.pills, { opacity: pillsOpacity }]} pointerEvents={running ? 'none' : 'auto'}>
          {durations.map(d => {
            const active = mins === d;
            return (
              <TouchableOpacity
                key={d}
                style={[styles.pill, active && { backgroundColor: color, borderColor: color }]}
                onPress={() => pick(d)}
                activeOpacity={0.8}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>
                  {d < 60 ? `${d}m` : `${d / 60}h`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Timer section */}
        <View style={styles.timerSection}>
          {/* Ambient glow — behind everything */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.glow,
              { backgroundColor: glowColor, opacity: glowOpacity, transform: [{ scale: glowScale }] },
            ]}
          />

          {/* Ring with idle pulse */}
          <Animated.View style={[styles.ringWrap, { transform: [{ scale: pulseScale }] }]}>
            <Ring progressAnim={progressAnim} size={220} color={color} />
            <View style={styles.ringCenter}>
              <Text style={[styles.time, { color }]}>{fmt(secs)}</Text>
              <Text style={styles.msg}>{msg}</Text>
            </View>
          </Animated.View>
        </View>

        {/* Controls */}
        {!done && (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
              <Ionicons name="refresh" size={19} color={Colors.textSecondary} />
            </TouchableOpacity>

            {/* Play/pause with press-scale feedback */}
            <Animated.View style={{ transform: [{ scale: playBtnScale }] }}>
              <TouchableOpacity
                style={[styles.playBtn, { backgroundColor: color }]}
                onPress={toggleRunning}
                onPressIn={handlePlayPressIn}
                onPressOut={handlePlayPressOut}
                activeOpacity={1}
              >
                <Ionicons name={running ? 'pause' : 'play'} size={28} color={Colors.charcoal} />
              </TouchableOpacity>
            </Animated.View>

            <View style={{ width: 52 }} />
          </View>
        )}

        {/* Completion overlay */}
        {done && (
          <Animated.View style={[styles.completion, { opacity: completionFade }]}>
            <Text style={[styles.completionEyebrow, { color }]}>COMPLETED</Text>
            <Text style={styles.completionHeadline}>{doneMsg}</Text>
            <Text style={styles.completionSub}>{doneSub}</Text>
            <TouchableOpacity
              style={[styles.completionBtn, { borderColor: color }]}
              onPress={reset}
              activeOpacity={0.88}
            >
              <Text style={[styles.completionBtnText, { color }]}>Begin Again</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
    gap: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.card,
  },
  headerIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.textPrimary, letterSpacing: -0.2 },
  closeWrap: { padding: Spacing.xs },
  closeBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center' },

  pills: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.md, paddingVertical: Spacing.xl },
  pill: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radii.full, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.card, minWidth: 52, alignItems: 'center', ...Shadows.card },
  pillText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textSecondary },
  pillTextActive: { color: Colors.charcoal },

  timerSection: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Ambient glow orb — larger than ring, centered behind it
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },

  ringWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ringCenter: { position: 'absolute', alignItems: 'center', paddingHorizontal: Spacing.lg },
  time: { fontSize: 50, fontWeight: Typography.weights.black, letterSpacing: 0 },
  msg:  { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 6, fontStyle: 'italic', lineHeight: 18 },

  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 60, gap: Spacing.xl },
  resetBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, ...Shadows.card },
  playBtn: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', ...Shadows.accent },

  // Completion overlay
  completion: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    alignItems: 'center', paddingHorizontal: Spacing.xl, paddingBottom: 64, paddingTop: Spacing.xl,
    gap: Spacing.md, backgroundColor: Colors.background,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight,
  },
  completionEyebrow: { fontSize: 9, fontWeight: Typography.weights.bold, letterSpacing: 2.5 },
  completionHeadline: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -0.4, textAlign: 'center', fontStyle: 'italic' },
  completionSub: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22 },
  completionBtn: { marginTop: Spacing.sm, width: '100%', borderRadius: Radii.full, borderWidth: 1.5, paddingVertical: 16, alignItems: 'center' },
  completionBtnText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
});

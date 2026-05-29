import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { requestNotificationPermissions } from '../utils/notifications';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';

// ─── iPhone notification mockup ───────────────────────────────────────────────
function NotifMockup() {
  return (
    <View style={styles.mockupWrap}>
      <View style={styles.mockupPhone}>
        <View style={styles.mockupIsland} />
        <View style={styles.mockupNotif}>
          <View style={styles.mockupAppRow}>
            <View style={styles.mockupIcon}>
              <Text style={styles.mockupIconText}>☀</Text>
            </View>
            <Text style={styles.mockupAppName}>Daily Reset</Text>
            <Text style={styles.mockupTime}>now</Text>
          </View>
          <Text style={styles.mockupTitle}>The chaos is still there.</Text>
          <Text style={styles.mockupBody}>So is this moment.</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function NotificationPermission() {
  const router = useRouter();

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const mockupAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim,   { toValue: 1, duration: 480, useNativeDriver: true }),
        Animated.timing(slideAnim,  { toValue: 0, duration: 480, useNativeDriver: true }),
      ]),
      Animated.timing(mockupAnim, { toValue: 1, duration: 360, delay: 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleYes = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setItem(StorageKeys.NOTIF_PERMISSION_ASKED, true);
    const granted = await requestNotificationPermissions();
    void granted; // grant tracked by expo internally
    router.replace('/(tabs)/today');
  };

  const handleSkip = async () => {
    await setItem(StorageKeys.NOTIF_PERMISSION_ASKED, true);
    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Eyebrow */}
        <Text style={styles.eyebrow}>YOUR DAILY COMPANION</Text>

        {/* Heading */}
        <Text style={styles.heading}>Stay connected{'\n'}to this.</Text>

        {/* Body */}
        <Text style={styles.body}>
          We'll send one gentle reminder each day.{'\n'}
          No spam. No guilt.{'\n'}
          Just a moment waiting for you.
        </Text>

        {/* iPhone mockup */}
        <Animated.View style={{ opacity: mockupAnim, transform: [{ scale: mockupAnim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] }}>
          <NotifMockup />
        </Animated.View>

        {/* Promise */}
        <Text style={styles.promise}>One notification per day, maximum.{'\n'}Never more. That's a promise.</Text>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.yesBtn} onPress={handleYes} activeOpacity={0.86}>
          <View style={styles.yesBtnInner}>
            <Text style={styles.yesBtnText}>Yes, remind me</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.6} style={styles.skipRow}>
          <Text style={styles.skipText}>I'll remember on my own</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 80 : 56,
    gap: Spacing.lg,
  },

  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
  },
  heading: {
    fontSize: 38,
    fontWeight: Typography.weights.black,
    color: Colors.white,
    lineHeight: 44,
    letterSpacing: -1,
  },
  body: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 26,
  },

  // ── Mockup ──────────────────────────────────────────────────────────────────
  mockupWrap: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  mockupPhone: {
    width: 280,
    backgroundColor: '#1C1C1E',
    borderRadius: 32,
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 20,
  },
  mockupIsland: {
    width: 100,
    height: 28,
    backgroundColor: '#000',
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: 16,
  },
  mockupNotif: {
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderRadius: 16,
    padding: 14,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  mockupAppRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  mockupIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockupIconText: { fontSize: 12 },
  mockupAppName: {
    flex: 1,
    fontSize: 12,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(255,255,255,0.7)',
  },
  mockupTime: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
  mockupTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
  mockupBody: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
  },

  promise: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 52 : 40,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  yesBtn: {
    borderRadius: Radii.full,
    backgroundColor: Colors.gold,
    ...Shadows.accent,
  },
  yesBtnInner: {
    paddingVertical: 19,
    alignItems: 'center',
  },
  yesBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
    letterSpacing: 0.2,
  },
  skipRow: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.45)',
    textDecorationLine: 'underline',
  },
});

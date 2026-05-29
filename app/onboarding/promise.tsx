// ─── Onboarding Screen 3: The Promise ────────────────────────────────────────
// Clean cream background. Small logo as brand mark. Heading is the hero.

import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { track } from '../../utils/analytics';
import { DailyResetLogo } from '../../components/DailyResetLogo';
import { useLanguage } from '../../hooks/useLanguage';

function FadeUp({
  delay = 0,
  duration = 520,
  children,
}: {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

export default function OnboardingPromise() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    track('onboarding_promise_completed');
    router.replace('/notification-setup');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* TOP SECTION — logo + content, centered vertically */}
      <View style={styles.topSection}>
        <FadeUp delay={120}>
          <View style={styles.logoSection}>
            <DailyResetLogo width={400} height={200} variant="light" />
          </View>
        </FadeUp>

        <View style={styles.contentBlock}>
          <FadeUp delay={380} duration={600}>
            <Text style={styles.heading}>{t('onboarding.promise.heading')}</Text>
          </FadeUp>

          <FadeUp delay={680} duration={600}>
            <Text style={styles.body}>{t('onboarding.promise.body')}</Text>
          </FadeUp>

          <FadeUp delay={940} duration={500}>
            <View style={styles.pills}>
              {([
                t('onboarding.promise.pill.nopressure'),
                t('onboarding.promise.pill.minutes'),
                t('onboarding.promise.pill.pace'),
              ]).map(p => (
                <View key={p} style={styles.pill}>
                  <Text style={styles.pillText}>{p}</Text>
                </View>
              ))}
            </View>
          </FadeUp>
        </View>
      </View>

      {/* BOTTOM SECTION — button anchored to bottom */}
      <View style={styles.bottomSection}>
        <FadeUp delay={1320} duration={600}>
          <TouchableOpacity style={styles.btn} onPress={handleBegin} activeOpacity={0.84}>
            <Text style={styles.btnText}>{t('onboarding.promise.cta')}</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>{t('onboarding.promise.hint')}</Text>
        </FadeUp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAF6EF',
    paddingHorizontal: 28,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  bottomSection: {
    paddingBottom: 32,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contentBlock: {
    marginTop: -55,
  },
  heading: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1A1A18',
    lineHeight: 46,
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: '#6B6560',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  pills: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDE8DF',
  },
  pillText: {
    fontSize: 13,
    color: '#8B7355',
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    color: '#9B9590',
    letterSpacing: 0.3,
    marginTop: 8,
  },
});

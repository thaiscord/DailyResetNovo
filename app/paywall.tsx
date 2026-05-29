import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing, Dimensions, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../hooks/useLanguage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';
import { paywallAnalytics } from '../utils/paywallAnalytics';
import { track } from '../utils/analytics';
import { recordShown, recordDismissed, recordSubscribed } from '../utils/paywallState';

const { width, height } = Dimensions.get('window');

// ─── Screen type ──────────────────────────────────────────────────────────────

type ScreenType = 'soft' | 'medium' | 'direct';

function getScreenType(trigger: string | undefined): ScreenType {
  if (trigger === 'first_ritual') return 'soft';
  if (trigger === 'day3_return')  return 'medium';
  return 'direct';
}

function getLockedFeatureName(trigger: string | undefined): string {
  if (trigger === 'mindset_locked') return 'Mindset Library';
  if (trigger === 'ritual_locked')  return 'Ritual Variants';
  return 'Full Refuge';
}

// ─── Static data ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { quote: 'I open this before every stressful meeting.', name: 'Sarah, 34' },
  { quote: "It's the only app I haven't deleted in a year.",   name: 'Marcus, 41' },
  { quote: 'Feels like someone finally gets it.',             name: 'Priya, 29' },
];

const FEATURE_GRID = [
  { icon: 'cloud-outline',        label: 'mind feels loud' },
  { icon: 'warning-outline',      label: 'emotionally tired' },
  { icon: 'refresh-outline',      label: 'trying again' },
  { icon: 'leaf-outline',         label: 'need calm' },
  { icon: 'sparkles-outline',     label: 'starting over' },
  { icon: 'moon-outline',         label: 'hard week' },
];

const PREMIUM_RITUALS = [
  { icon: 'cloud-outline',        name: 'mind feels loud' },
  { icon: 'warning-outline',      name: 'emotionally tired' },
  { icon: 'refresh-outline',      name: 'trying again' },
  { icon: 'leaf-outline',         name: 'need calm' },
  { icon: 'sparkles-outline',     name: 'starting over' },
  { icon: 'moon-outline',         name: 'hard week' },
];

const ALL_FEATURES = [
  'More calm on difficult days.',
  'More clarity when your mind feels scattered.',
  'More trust in yourself after setbacks.',
  'A softer return to routine.',
];

// ─── Shared pricing section ───────────────────────────────────────────────────

function PricingSection({
  sel,
  onSelect,
  t,
}: {
  sel: 'annual' | 'monthly';
  onSelect: (plan: 'annual' | 'monthly') => void;
  t: (key: string) => string;
}) {
  return (
    <View style={styles.plansWrap}>
      {/* Annual — default selected */}
      <TouchableOpacity
        style={[styles.planCard, sel === 'annual' && styles.planCardSelected]}
        onPress={() => onSelect('annual')}
        activeOpacity={0.85}
      >
        <View style={styles.planBadge}>
          <Text style={styles.planBadgeText}>{t('paywall.plan.badge')}</Text>
        </View>
        <View style={styles.planRow}>
          <View style={[styles.radio, sel === 'annual' && styles.radioActive]}>
            {sel === 'annual' && <View style={styles.radioDot} />}
          </View>
          <View style={styles.planTextWrap}>
            <Text style={[styles.planName, sel === 'annual' && styles.planNameActive]}>
              {t('paywall.plan.annual.name')}
            </Text>
            <Text style={styles.planNote}>{t('paywall.plan.annual.note')}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Monthly */}
      <TouchableOpacity
        style={[styles.planCard, sel === 'monthly' && styles.planCardMonthly]}
        onPress={() => onSelect('monthly')}
        activeOpacity={0.85}
      >
        <View style={styles.planRow}>
          <View style={[styles.radio, sel === 'monthly' && styles.radioActive]}>
            {sel === 'monthly' && <View style={styles.radioDot} />}
          </View>
          <View style={styles.planTextWrap}>
            <Text style={[styles.planName, sel === 'monthly' && styles.planNameActive]}>
              {t('paywall.plan.monthly.name')}
            </Text>
            <Text style={styles.planNote}>{t('paywall.plan.monthly.note')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function PaywallScreen() {
  const router = useRouter();
  const { trigger } = useLocalSearchParams<{ trigger?: string }>();
  const { unlockPremium } = useProgress();
  const { t } = useLanguage();

  const insets = useSafeAreaInsets();
  const [sel, setSel]               = useState<'annual' | 'monthly'>('annual');
  const [loading, setLoading]       = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const screenType  = getScreenType(trigger);
  const viewStart   = useRef(Date.now());
  const mountAnim   = useRef(new Animated.Value(0)).current;
  const sheetAnim   = useRef(new Animated.Value(height * 0.6)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    recordShown(trigger ?? 'unknown');
    paywallAnalytics.viewed(trigger ?? 'unknown');
    track('paywall_shown', { trigger: trigger ?? 'direct', screen: screenType });

    if (screenType === 'soft') {
      Animated.spring(sheetAnim, {
        toValue: 0, tension: 65, friction: 11, useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(mountAnim, {
        toValue: 1, duration: 500, delay: 80,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }).start();
    }

    // Subtle slow shimmer pulse on CTA — restrained, premium
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.delay(1800),
      ])
    ).start();
  }, []);

  const handlePlanSelect = useCallback((plan: 'annual' | 'monthly') => {
    Haptics.selectionAsync();
    setSel(plan);
    track(plan === 'annual' ? 'paywall_annual_selected' : 'paywall_monthly_selected');
  }, []);

  const handleSubscribe = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    paywallAnalytics.ctaTapped(trigger ?? 'unknown', undefined, sel);
    track('paywall_cta_tapped', { trigger: trigger ?? 'direct', plan: sel });

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    await unlockPremium();
    await recordSubscribed(sel);

    if (sel === 'annual') {
      paywallAnalytics.trialStarted(sel);
      track('trial_started', { plan: sel });
    }
    track('paywall_purchase_completed', { plan: sel });
    setLoading(false);

    Alert.alert(
      sel === 'annual' ? t('paywall.alert.trial.title') : t('paywall.alert.monthly.title'),
      sel === 'annual' ? t('paywall.alert.trial.msg') : t('paywall.alert.monthly.msg'),
      [{ text: t('common.continue'), onPress: () => router.replace('/(tabs)/today') }],
    );
  }, [sel, trigger, unlockPremium, router]);

  const handleClose = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - viewStart.current) / 1000);
    await recordDismissed(trigger ?? 'unknown');
    paywallAnalytics.dismissed(trigger ?? 'unknown', undefined, timeSpent);
    track('paywall_dismissed', { trigger: trigger ?? 'direct', time_spent: timeSpent });
    router.replace('/(tabs)/today');
  }, [trigger, router]);

  // ── Trigger 1: Soft (post-ritual bottom sheet) ─────────────────────────────
  if (screenType === 'soft') {
    return (
      <View style={styles.softRoot}>
        {/* Warm ambient top (echoes ritual end) */}
        <View style={styles.softBackdrop} pointerEvents="none">
          <LinearGradient
            colors={['rgba(201,168,76,0.06)', 'transparent']}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        {/* Dismiss tap area */}
        <TouchableOpacity style={styles.softTapZone} onPress={handleClose} activeOpacity={1} />

        {/* Sheet */}
        <Animated.View style={[styles.softSheet, { transform: [{ translateY: sheetAnim }] }]}>
          {/* Gold decorative line */}
          <View style={styles.softGoldLine} />

          <Text style={styles.softHeading}>{t('paywall.v1.heading')}</Text>

          <Text style={styles.softBody}>{t('paywall.v1.body')}</Text>

          {/* Primary CTA */}
          <TouchableOpacity
            style={[styles.softPrimaryBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubscribe}
            disabled={loading}
            activeOpacity={0.88}
          >
            {loading ? (
              <Text style={styles.softPrimaryBtnLabel}>{t('paywall.loading')}</Text>
            ) : (
              <>
                <Text style={styles.softPrimaryBtnLabel}>{t('paywall.v1.cta')}</Text>
                <Text style={styles.softPrimaryBtnSub}>{t('paywall.v1.ctaSub')}</Text>
                <Text style={styles.softPrimaryBtnCancel}>{t('paywall.v1.cancel')}</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Dismiss */}
          <TouchableOpacity style={styles.softMaybeLater} onPress={handleClose} activeOpacity={0.7}>
            <Text style={styles.softMaybeLaterText}>{t('paywall.v1.maybe')}</Text>
          </TouchableOpacity>

          <Text style={styles.softFooter}>{t('paywall.v1.footer')}</Text>
        </Animated.View>
      </View>
    );
  }

  // ── Trigger 2: Medium (day 3 return, full screen) ──────────────────────────
  if (screenType === 'medium') {
    return (
      <View style={styles.fullRoot}>
        {/* Close — always visible, no delay */}
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose} activeOpacity={0.7}>
          <Ionicons name="close" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.fullScroll}
          style={{ opacity: mountAnim }}
        >
          {/* Hero */}
          <View style={styles.medHero}>
            <Text style={styles.medEyebrow}>{t('paywall.v2.eyebrow')}</Text>
            <Text style={styles.medHeading}>{t('paywall.v2.heading')}</Text>
            <Text style={styles.medSubheading}>{t('paywall.v2.sub')}</Text>
            <View style={styles.goldDivider} />
          </View>

          {/* Social proof */}
          <View style={styles.testimonialsWrap}>
            {([
              { quoteKey: 'paywall.t1.quote', nameKey: 'paywall.t1.name' },
              { quoteKey: 'paywall.t2.quote', nameKey: 'paywall.t2.name' },
              { quoteKey: 'paywall.t3.quote', nameKey: 'paywall.t3.name' },
            ]).map((item, i) => (
              <View key={i} style={styles.testimonialRow}>
                <Text style={styles.testimonialQuote}>"{t(item.quoteKey)}"</Text>
                <Text style={styles.testimonialName}>— {t(item.nameKey)}</Text>
              </View>
            ))}
          </View>

          {/* Feature grid 2×3 */}
          <View style={styles.featureGrid}>
            {([
              { icon: 'cloud-outline',    labelKey: 'paywall.feat.mindLoud' },
              { icon: 'warning-outline',  labelKey: 'paywall.feat.emoTired' },
              { icon: 'refresh-outline',  labelKey: 'paywall.feat.tryingAgain' },
              { icon: 'leaf-outline',     labelKey: 'paywall.feat.needCalm' },
              { icon: 'sparkles-outline', labelKey: 'paywall.feat.startingOver' },
              { icon: 'moon-outline',     labelKey: 'paywall.feat.hardWeek' },
            ]).map((f, i) => (
              <View key={i} style={styles.featureCell}>
                <View style={styles.featureCellIcon}>
                  <Ionicons name={f.icon as any} size={18} color={Colors.textSecondary} />
                </View>
                <Text style={styles.featureCellLabel}>{t(f.labelKey)}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.medTagline}>{t('paywall.v2.tagline')}</Text>

          {/* Emotional bridge before pricing */}
          <View style={styles.whyNowWrap}>
            <Text style={styles.whyNowText}>{t('paywall.v2.why1')}</Text>
            <Text style={[styles.whyNowText, { marginTop: 10, opacity: 0.7 }]}>
              {t('paywall.v2.why2')}
            </Text>
          </View>

          {/* Pricing */}
          <PricingSection sel={sel} onSelect={handlePlanSelect} t={t} />

          {/* CTA */}
          <View style={styles.ctaWrap}>
            <TouchableOpacity
              style={[styles.fullCtaBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubscribe}
              disabled={loading}
              activeOpacity={0.88}
            >
              <Animated.View
                pointerEvents="none"
                style={[StyleSheet.absoluteFillObject, {
                  borderRadius: Radii.full,
                  backgroundColor: '#FFFFFF',
                  opacity: shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.07] }),
                }]}
              />
              <Text style={styles.fullCtaBtnText}>
                {loading ? t('paywall.loading') : t('paywall.v2.cta')}
              </Text>
            </TouchableOpacity>
            <Text style={styles.ctaSubNote}>{t('paywall.v2.ctaSub')}</Text>
          </View>

          <Text style={styles.legalNote}>{t('paywall.legal.full')}</Text>
        </Animated.ScrollView>
      </View>
    );
  }

  // ── Trigger 3: Direct (content gate) ──────────────────────────────────────
  return (
    <View style={styles.fullRoot}>
      {/* Close button — floats above scroll */}
      <TouchableOpacity
        style={[styles.directCloseBtn, { top: insets.top + 12 }]}
        onPress={handleClose}
        activeOpacity={0.7}
      >
        <Text style={styles.directCloseBtnText}>×</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.directScroll, { paddingTop: insets.top + 20, paddingBottom: 80 }]}
        style={{ opacity: mountAnim }}
      >
        {/* Section 1 — Hook */}
        <View style={styles.d3Hero}>
          <Text style={styles.d3Eyebrow}>{t('paywall.v3.eyebrow')}</Text>
          <Text style={styles.d3Headline}>{t('paywall.v3.heading')}</Text>
          <Text style={styles.d3Subtitle}>{t('paywall.v3.sub')}</Text>
        </View>

        {/* Section 2 — 3 benefits */}
        <View style={styles.d3Benefits}>
          {([
            { icon: '✦', titleKey: 'paywall.v3.b1.title', subKey: 'paywall.v3.b1.sub' },
            { icon: '◎', titleKey: 'paywall.v3.b2.title', subKey: 'paywall.v3.b2.sub' },
            { icon: '◐', titleKey: 'paywall.v3.b3.title', subKey: 'paywall.v3.b3.sub' },
          ]).map((item, i) => (
            <View key={i} style={styles.d3BenefitRow}>
              <Text style={styles.d3BenefitIcon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.d3BenefitTitle}>{t(item.titleKey)}</Text>
                <Text style={styles.d3BenefitSub}>{t(item.subKey)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Section 3 — Plans */}
        <View style={styles.d3Plans}>
          {/* Annual */}
          <TouchableOpacity
            style={[styles.d3PlanCard, sel === 'annual' && styles.d3PlanCardAnnual]}
            onPress={() => handlePlanSelect('annual')}
            activeOpacity={0.85}
          >
            <View style={styles.d3PlanTopRow}>
              <Text style={styles.d3PlanName}>{t('paywall.v3.annual.name')}</Text>
              <View style={styles.d3FreePill}>
                <Text style={styles.d3FreePillText}>{t('paywall.v3.annual.free')}</Text>
              </View>
            </View>
            <View style={styles.d3PlanPriceRow}>
              <Text style={styles.d3PlanPrice}>{t('paywall.v3.annual.price')}</Text>
              <Text style={styles.d3PlanPriceSub}>{t('paywall.v3.annual.priceSub')}</Text>
            </View>
            <Text style={styles.d3PlanNote}>{t('paywall.v3.annual.note')}</Text>
          </TouchableOpacity>

          {/* Monthly */}
          <TouchableOpacity
            style={[styles.d3PlanCard, styles.d3PlanCardMonthly, sel === 'monthly' && styles.d3PlanCardMonthlySelected]}
            onPress={() => handlePlanSelect('monthly')}
            activeOpacity={0.85}
          >
            <Text style={styles.d3PlanName}>{t('paywall.v3.monthly.name')}</Text>
            <Text style={[styles.d3PlanPrice, { marginTop: 6, color: '#6B6560' }]}>{t('paywall.v3.monthly.price')}</Text>
            <Text style={styles.d3PlanNote}>{t('paywall.v3.monthly.note')}</Text>
          </TouchableOpacity>
        </View>

        {/* Section 4 — CTA */}
        <View style={styles.d3CtaWrap}>
          <TouchableOpacity
            style={[styles.d3CtaBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubscribe}
            disabled={loading}
            activeOpacity={0.88}
          >
            <Animated.View
              pointerEvents="none"
              style={[StyleSheet.absoluteFillObject, {
                borderRadius: 30,
                backgroundColor: '#FFFFFF',
                opacity: shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.07] }),
              }]}
            />
            <Text style={styles.d3CtaBtnText}>
              {loading ? t('paywall.loading') : sel === 'annual' ? t('paywall.v3.cta.free') : t('paywall.v3.cta.today')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.d3CtaSub}>{t('paywall.v3.ctaSub')}</Text>
        </View>

        {/* Section 5 — What changes */}
        <View style={styles.d3WhatChanges}>
          <Text style={styles.d3WhatLabel}>{t('paywall.v3.whatLabel')}</Text>
          {(['paywall.v3.what1', 'paywall.v3.what2', 'paywall.v3.what3'] as const).map((key, i) => (
            <View key={i} style={styles.d3WhatRow}>
              <Text style={styles.d3WhatText}>{t(key)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.legalNote}>{t('paywall.legal.full')}</Text>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Trigger 1 — Soft ──────────────────────────────────────────────────────
  softRoot: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'flex-end',
  },
  softBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  softTapZone: {
    flex: 1,
  },
  softSheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 56,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
    borderTopWidth: 1,
    borderColor: Colors.borderLight,
  },
  softGoldLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
    opacity: 0.7,
  },
  softHeading: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  softBody: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  softPrimaryBtn: {
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.xl,
    paddingVertical: 18,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
    ...Shadows.charcoal,
  },
  softPrimaryBtnLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  softPrimaryBtnSub: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.2,
  },
  softPrimaryBtnCancel: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.35)',
  },
  softMaybeLater: {
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
  },
  softMaybeLaterText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  softFooter: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // ── Trigger 2 & 3 — Full screen ───────────────────────────────────────────
  fullRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: Spacing.xl,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScroll: {
    paddingTop: 56,
    paddingBottom: 48,
  },

  // ── Trigger 2: Hero ────────────────────────────────────────────────────────
  medHero: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  medEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 3,
  },
  medHeading: {
    fontSize: 34,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    lineHeight: 42,
    letterSpacing: -0.8,
  },
  medSubheading: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  goldDivider: {
    width: 48,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.gold,
    opacity: 0.6,
    marginTop: Spacing.sm,
  },

  // ── Testimonials ───────────────────────────────────────────────────────────
  testimonialsWrap: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  testimonialRow: {
    gap: 4,
  },
  testimonialQuote: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  testimonialName: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },

  // ── Feature grid ──────────────────────────────────────────────────────────
  featureGrid: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  featureCell: {
    width: (width - Spacing.xl * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.base,
    gap: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCellIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureCellLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },

  medTagline: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Trigger 3: Direct ─────────────────────────────────────────────────────
  directHero: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  directLockedIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  directFeatureName: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  directIsPartOf: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    letterSpacing: 0.1,
  },
  directSubheading: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },

  // ── Emotional pills (replaces ritual cards) ───────────────────────────────
  pillsScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.base,
    gap: Spacing.sm,
  },
  emotionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  emotionPillText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  directHeading: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
    paddingHorizontal: Spacing.md,
  },

  // ── Ritual cards horizontal scroll ────────────────────────────────────────
  ritualsScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  ritualCard: {
    backgroundColor: Colors.card,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.07)',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    gap: 5,
    width: 84,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ritualCardIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ritualCardName: {
    fontSize: 10,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 13,
  },

  directAnd: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Why Now — emotional bridge (medium screen) ───────────────────────────
  whyNowWrap: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  whyNowText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },

  // ── Transition moment — editorial bridge before pricing (direct screen) ───
  transitionMoment: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  transitionLine: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },

  // ── Shared: Pricing ───────────────────────────────────────────────────────
  plansWrap: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  planCard: {
    backgroundColor: '#FDFAF5',
    borderRadius: Radii.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,24,0.10)',
    position: 'relative',
    overflow: 'visible',
    shadowColor: '#2A2018',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  planCardSelected: {
    borderColor: 'rgba(28,28,28,0.25)',
    borderWidth: 1,
  },
  planCardMonthly: {
    borderColor: Colors.border,
  },
  planBadge: {
    position: 'absolute',
    top: -11,
    left: Spacing.base,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 3,
    zIndex: 1,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: Typography.weights.heavy,
    color: Colors.charcoal,
    letterSpacing: 0.3,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioActive: { borderColor: Colors.charcoal },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.charcoal,
  },
  planTextWrap: { flex: 1 },
  planName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  planNameActive: { color: Colors.textPrimary },
  planNote: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },

  // ── Shared: CTA ───────────────────────────────────────────────────────────
  ctaWrap: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'center',
  },
  fullCtaBtn: {
    width: '100%',
    backgroundColor: Colors.charcoal,
    borderRadius: Radii.full,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  fullCtaBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  ctaSubNote: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  // ── See all features (T3) ─────────────────────────────────────────────────
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: Spacing.xs,
  },
  seeAllText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
  allFeaturesList: {
    width: '100%',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  allFeaturesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  allFeaturesText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Trigger 3 Direct — full redesign ─────────────────────────────────────
  directCloseBtn: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EAE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  directCloseBtnText: {
    fontSize: 20,
    color: '#6B6560',
    lineHeight: 24,
  },
  directScroll: {
    paddingHorizontal: 0,
  },
  d3Hero: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    alignItems: 'center',
  },
  d3Eyebrow: {
    fontSize: 11,
    letterSpacing: 1.8,
    color: '#C9973A',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  d3Headline: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3D3530',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  d3Subtitle: {
    fontSize: 16,
    color: '#6B6560',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 14,
  },
  d3Benefits: {
    paddingHorizontal: 28,
    marginTop: 32,
    marginBottom: 28,
    gap: 16,
  },
  d3BenefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  d3BenefitIcon: {
    fontSize: 20,
    width: 32,
    color: '#C9973A',
  },
  d3BenefitTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3530',
  },
  d3BenefitSub: {
    fontSize: 13,
    color: '#6B6560',
    marginTop: 2,
    lineHeight: 18,
  },
  d3Plans: {
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 10,
  },
  d3PlanCard: {
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E0D5',
  },
  d3PlanCardAnnual: {
    borderWidth: 2,
    borderColor: '#C9973A',
    backgroundColor: '#FFFDF9',
  },
  d3PlanCardMonthly: {
    borderWidth: 1,
    borderColor: '#E8E0D5',
    backgroundColor: '#FFFFFF',
  },
  d3PlanCardMonthlySelected: {
    borderColor: '#C9973A',
    borderWidth: 1.5,
  },
  d3PlanTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  d3PlanName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3D3530',
  },
  d3FreePill: {
    backgroundColor: '#C9973A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  d3FreePillText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  d3PlanPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  d3PlanPrice: {
    fontSize: 15,
    color: '#3D3530',
    fontWeight: '500',
  },
  d3PlanPriceSub: {
    fontSize: 13,
    color: '#9B9590',
  },
  d3PlanNote: {
    fontSize: 12,
    color: '#9B9590',
    marginTop: 4,
    fontStyle: 'italic',
  },
  d3CtaWrap: {
    paddingHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
    gap: 10,
  },
  d3CtaBtn: {
    width: '100%',
    backgroundColor: '#1A1A18',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  d3CtaBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  d3CtaSub: {
    fontSize: 12,
    color: '#9B9590',
    textAlign: 'center',
  },
  d3WhatChanges: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  d3WhatLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#9B9590',
    fontWeight: '600',
    marginBottom: 16,
  },
  d3WhatRow: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0EAE0',
  },
  d3WhatText: {
    fontSize: 14,
    color: '#6B6560',
    lineHeight: 20,
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalNote: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    lineHeight: 16,
    opacity: 0.6,
  },
});

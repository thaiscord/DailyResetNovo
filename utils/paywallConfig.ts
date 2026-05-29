// ─── Paywall Testing & Variant System ────────────────────────────────────────
// Manages A/B variant assignment for the paywall.
// Assignment is random on first install and persisted so the user always
// sees the same variant (no flickering between sessions).
//
// Future: replace with RevenueCat Experiments or Firebase Remote Config.

import { getItem, setItem } from '../hooks/useStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaywallVariant = 'A' | 'B' | 'C' | 'D';

export type PaywallEmotionalTheme =
  | 'transformation'  // A — rebuild yourself
  | 'future_self'     // B — who you'll become
  | 'calm'            // C — consistency without pressure
  | 'trial';          // D — free trial prominent

export interface PlanOption {
  id: string;
  label: string;
  price: string;
  per: string;
  badge: string | null;
  saving: string | null;
  framing: string | null;
  isTrial: boolean;
}

export interface PaywallConfig {
  variant: PaywallVariant;
  theme: PaywallEmotionalTheme;
  heroTitle: string;
  heroSub: string;
  ctaText: Record<string, string>;
  urgencyText: string;
  plans: PlanOption[];
}

// ─── Plans ────────────────────────────────────────────────────────────────────

const ANNUAL_PLAN: PlanOption = {
  id: 'annual',
  label: 'Annual',
  price: '$34.99',
  per: '$2.91 / month',
  badge: 'MOST POPULAR',
  saving: 'Save 41%',
  framing: 'Less than a coffee per week',
  isTrial: false,
};

const MONTHLY_PLAN: PlanOption = {
  id: 'monthly',
  label: 'Monthly',
  price: '$6.99',
  per: 'per month',
  badge: null,
  saving: null,
  framing: null,
  isTrial: false,
};

const TRIAL_ANNUAL_PLAN: PlanOption = {
  id: 'trial_annual',
  label: '7-Day Free Trial',
  price: 'Free',
  per: 'then $34.99 / year',
  badge: 'START FREE',
  saving: 'Cancel anytime before trial ends',
  framing: 'No charge until trial ends',
  isTrial: true,
};

// ─── Variant configs ──────────────────────────────────────────────────────────

const VARIANT_CONFIGS: Record<PaywallVariant, Omit<PaywallConfig, 'variant'>> = {
  A: {
    theme: 'transformation',
    heroTitle: 'Rebuild yourself.\nOne day at a time.',
    heroSub: 'Daily rituals shape who you become.',
    ctaText: {
      annual:  'Begin My Transformation',
      monthly: 'Start My Reset Journey',
    },
    urgencyText: 'Your next reset is waiting. Start today.',
    plans: [ANNUAL_PLAN, MONTHLY_PLAN],
  },

  B: {
    theme: 'future_self',
    heroTitle: 'Who will you be\nin 90 days?',
    heroSub: 'The version of you that is calmer, more focused and more consistent is being built one day at a time.',
    ctaText: {
      annual:  'Build My Future Self',
      monthly: 'Start My Journey',
    },
    urgencyText: 'Your future self is shaped by what you do today.',
    plans: [ANNUAL_PLAN, MONTHLY_PLAN],
  },

  C: {
    theme: 'calm',
    heroTitle: 'Consistency without\nthe pressure.',
    heroSub: 'Daily Reset is designed for the person who wants to change — slowly, intentionally, at their own pace.',
    ctaText: {
      annual:  'Continue My Journey',
      monthly: 'Begin Gently',
    },
    urgencyText: 'Small consistency becomes identity. Begin today.',
    plans: [ANNUAL_PLAN, MONTHLY_PLAN],
  },

  D: {
    theme: 'trial',
    heroTitle: 'Try Daily Reset\nfree for 7 days.',
    heroSub: 'Experience the full emotional reset journey — no charge until your trial ends. Cancel anytime.',
    ctaText: {
      trial_annual: 'Start 7-Day Free Trial',
      monthly:      'Subscribe Monthly',
    },
    urgencyText: 'Begin your free trial. Change starts today.',
    plans: [TRIAL_ANNUAL_PLAN, MONTHLY_PLAN],
  },
};

// ─── Variant assignment ───────────────────────────────────────────────────────

const VARIANT_KEY = 'paywall_variant_v1';
const VARIANTS: PaywallVariant[] = ['A', 'B', 'C', 'D'];

/** Returns a persisted variant assignment, assigning randomly on first call. */
export async function getPaywallVariant(): Promise<PaywallVariant> {
  const stored = await getItem<PaywallVariant | null>(VARIANT_KEY, null);
  if (stored && VARIANTS.includes(stored)) return stored;

  // Random assignment — weighted: 40% A, 20% B, 20% C, 20% D
  const rand = Math.random();
  const variant: PaywallVariant =
    rand < 0.40 ? 'A' :
    rand < 0.60 ? 'B' :
    rand < 0.80 ? 'C' :
    'D';

  await setItem(VARIANT_KEY, variant);
  return variant;
}

/** Returns the full config for a given variant. */
export function getPaywallConfig(variant: PaywallVariant): PaywallConfig {
  return { variant, ...VARIANT_CONFIGS[variant] };
}

/** Forces a specific variant (for testing). */
export async function forcePaywallVariant(variant: PaywallVariant): Promise<void> {
  await setItem(VARIANT_KEY, variant);
}

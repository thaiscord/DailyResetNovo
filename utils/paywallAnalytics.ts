// ─── Paywall Analytics ────────────────────────────────────────────────────────
// Tracks paywall events locally for conversion analysis.
// Production: replace with RevenueCat + Mixpanel/Firebase Analytics.
//
// Events tracked (aligned with Prompt 3 spec):
// - paywall_viewed       { trigger, variant }
// - paywall_dismissed    { trigger, variant, time_spent }
// - paywall_cta_tapped   { trigger, variant, plan }
// - trial_started        { plan }
// - trial_converted      { days_into_trial }
// - trial_churned        { days_into_trial }
// - subscription_cancelled { days_since_start }

import { getItem, setItem } from '../hooks/useStorage';
import { PaywallVariant } from './paywallConfig';

const ANALYTICS_KEY = 'paywall_analytics_v2';

export interface PaywallEvent {
  event: string;
  trigger?: string;
  variant?: PaywallVariant;
  plan?: string;
  time_spent?: number;
  days_into_trial?: number;
  days_since_start?: number;
  timestamp: string;
}

async function logEvent(event: string, meta: Omit<PaywallEvent, 'event' | 'timestamp'> = {}) {
  try {
    const existing = await getItem<PaywallEvent[]>(ANALYTICS_KEY, []);
    const record: PaywallEvent = { event, ...meta, timestamp: new Date().toISOString() };
    const updated = [...existing, record].slice(-300);
    await setItem(ANALYTICS_KEY, updated);
  } catch {
    // Never crash for analytics
  }
}

export const paywallAnalytics = {
  viewed:      (trigger: string, variant?: PaywallVariant) =>
    logEvent('paywall_viewed', { trigger, variant }),

  dismissed:   (trigger: string, variant: PaywallVariant | undefined, time_spent: number) =>
    logEvent('paywall_dismissed', { trigger, variant, time_spent }),

  ctaTapped:   (trigger: string, variant: PaywallVariant | undefined, plan: string) =>
    logEvent('paywall_cta_tapped', { trigger, variant, plan }),

  trialStarted: (plan: string) =>
    logEvent('trial_started', { plan }),

  trialConverted: (days_into_trial: number) =>
    logEvent('trial_converted', { days_into_trial }),

  trialChurned: (days_into_trial: number) =>
    logEvent('trial_churned', { days_into_trial }),

  subscriptionCancelled: (days_since_start: number) =>
    logEvent('subscription_cancelled', { days_since_start }),

  // Legacy compat
  planSelected: (variant: PaywallVariant, plan: string) =>
    logEvent('plan_selected', { variant, plan }),
  subscribed:   (variant: PaywallVariant, plan: string) =>
    logEvent('subscribed', { variant, plan }),
};

/** Returns a summary of paywall analytics for debugging. */
export async function getPaywallAnalyticsSummary(): Promise<{
  totalViews: number;
  ctaTaps: number;
  subscriptions: number;
  conversionRate: number;
  byVariant: Record<string, { views: number; subs: number }>;
}> {
  const events = await getItem<PaywallEvent[]>(ANALYTICS_KEY, []);
  const views = events.filter(e => e.event === 'paywall_viewed').length;
  const taps  = events.filter(e => e.event === 'cta_tapped').length;
  const subs  = events.filter(e => e.event === 'subscribed').length;

  const byVariant: Record<string, { views: number; subs: number }> = {};
  events.forEach(e => {
    const v = e.variant ?? 'unknown';
    if (!byVariant[v]) byVariant[v] = { views: 0, subs: 0 };
    if (e.event === 'paywall_viewed') byVariant[v].views++;
    if (e.event === 'subscribed')     byVariant[v].subs++;
  });

  return {
    totalViews: views,
    ctaTaps: taps,
    subscriptions: subs,
    conversionRate: views > 0 ? Math.round((subs / views) * 100) : 0,
    byVariant,
  };
}

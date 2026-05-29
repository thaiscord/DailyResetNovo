// ─── Paywall State — trigger logic, cooldowns, dismissal tracking ─────────────

import { getItem, setItem } from '../hooks/useStorage';

const KEY = 'paywall_state_v2';

export interface PaywallState {
  trigger1Shown:      boolean;
  trigger2Shown:      boolean;
  trigger3Shown:      boolean;
  lastShownDate:      string | null;
  dismissalCount:     number;
  subscriptionStatus: 'free' | 'trial' | 'premium';
  trialStartDate:     string | null;
  trialEndDate:       string | null;
}

const DEFAULTS: PaywallState = {
  trigger1Shown:      false,
  trigger2Shown:      false,
  trigger3Shown:      false,
  lastShownDate:      null,
  dismissalCount:     0,
  subscriptionStatus: 'free',
  trialStartDate:     null,
  trialEndDate:       null,
};

export async function getPaywallState(): Promise<PaywallState> {
  return getItem<PaywallState>(KEY, DEFAULTS);
}

async function patch(updates: Partial<PaywallState>): Promise<void> {
  const current = await getPaywallState();
  await setItem(KEY, { ...current, ...updates });
}

// Determines whether the paywall should be shown for a given trigger.
// Rules:
//  - Never show to premium users
//  - Never show within 48h of last paywall (96h after 3+ dismissals)
//  - After 5 dismissals: only content-gate triggers remain active
//  - Triggers 1 and 2 are shown at most once each
export async function canShowPaywall(trigger: string, isPremium: boolean): Promise<boolean> {
  if (isPremium) return false;

  const state = await getPaywallState();
  if (state.subscriptionStatus === 'premium') return false;

  const isContentGate = trigger === 'mindset_locked' || trigger === 'content_gate' || trigger === 'ritual_locked';

  // After 5 dismissals, only content gate can trigger
  if (state.dismissalCount >= 5 && !isContentGate) return false;

  // 48h cooldown (doubled after 3+ dismissals)
  if (state.lastShownDate) {
    const cooldownHours = state.dismissalCount >= 3 ? 96 : 48;
    const elapsed = Date.now() - new Date(state.lastShownDate).getTime();
    if (elapsed < cooldownHours * 60 * 60 * 1000) {
      if (!isContentGate) return false;
    }
  }

  // Triggers 1 and 2 are one-time each
  if (trigger === 'first_ritual' && state.trigger1Shown) return false;
  if (trigger === 'day3_return'  && state.trigger2Shown) return false;

  return true;
}

export async function recordShown(trigger: string): Promise<void> {
  const updates: Partial<PaywallState> = {
    lastShownDate: new Date().toISOString(),
  };
  if (trigger === 'first_ritual') updates.trigger1Shown = true;
  if (trigger === 'day3_return')  updates.trigger2Shown = true;
  await patch(updates);
}

export async function recordDismissed(trigger: string): Promise<void> {
  const state = await getPaywallState();
  const updates: Partial<PaywallState> = {
    dismissalCount: state.dismissalCount + 1,
  };
  if (trigger === 'mindset_locked' || trigger === 'content_gate' || trigger === 'ritual_locked') {
    updates.trigger3Shown = true;
  }
  await patch(updates);
}

export async function recordSubscribed(plan: string): Promise<void> {
  const isTrial = plan === 'annual'; // annual has free trial
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  await patch({
    subscriptionStatus: isTrial ? 'trial' : 'premium',
    trialStartDate:     isTrial ? now.toISOString() : null,
    trialEndDate:       isTrial ? trialEnd.toISOString() : null,
  });
}

export async function resetPaywallState(): Promise<void> {
  await setItem(KEY, DEFAULTS);
}

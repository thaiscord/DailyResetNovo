import AsyncStorage from '@react-native-async-storage/async-storage';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: paste your Mixpanel Project Token below.
// Get it at: mixpanel.com → your project → Settings → Project Token
// While the placeholder is set, all calls are no-ops (won't crash, won't send).
// ─────────────────────────────────────────────────────────────────────────────
const MIXPANEL_TOKEN = 'COLE_SEU_TOKEN_AQUI';

const ENDPOINT = 'https://api.mixpanel.com/track';
const DEVICE_ID_KEY = '_analytics_device_id';
const LAST_OPEN_KEY  = '_analytics_last_open';

// ─── Device ID ───────────────────────────────────────────────────────────────

async function getDistinctId(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (stored) return stored;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    await AsyncStorage.setItem(DEVICE_ID_KEY, id);
    return id;
  } catch {
    return 'anon';
  }
}

// ─── Core track ──────────────────────────────────────────────────────────────

export async function track(
  event: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  if (MIXPANEL_TOKEN === 'COLE_SEU_TOKEN_AQUI') return;
  try {
    const distinctId = await getDistinctId();
    const payload = [{
      event,
      properties: {
        token: MIXPANEL_TOKEN,
        distinct_id: distinctId,
        time: Math.floor(Date.now() / 1000),
        app_version: '2.0',
        ...properties,
      },
    }];
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/plain' },
      body: JSON.stringify(payload),
    });
  } catch {
    // never crash the app for analytics
  }
}

// ─── App open with days-since-last-open ──────────────────────────────────────

export async function trackAppOpen(currentStreak: number): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(LAST_OPEN_KEY);
    const last = raw ? parseInt(raw, 10) : 0;
    const now = Date.now();
    const daysSinceLastOpen = last > 0
      ? Math.floor((now - last) / 86_400_000)
      : 0;
    await AsyncStorage.setItem(LAST_OPEN_KEY, String(now));
    track('app_opened', { daysSinceLastOpen, currentStreak });
  } catch {
    // never crash for analytics
  }
}

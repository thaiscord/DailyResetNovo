import { Platform } from 'react-native';

/**
 * True when running inside an iPhone or iPad browser (Safari or WKWebView).
 * This check is only meaningful on web (Platform.OS === 'web').
 */
export function isIosWebEnvironment(): boolean {
  if (Platform.OS !== 'web') return false;
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * True when the web app is running in standalone (PWA installed to home screen) mode.
 * Uses the iOS `navigator.standalone` property as well as the standard
 * `display-mode: standalone` media query (works on Android Chrome too).
 */
export function isStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  const iosStandalone = (window.navigator as any).standalone === true;
  const mq =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches;
  return iosStandalone || mq;
}

/**
 * True when the browser exposes the full Web Push API surface:
 * Notification, ServiceWorkerContainer, and PushManager.
 * Returns true on native (non-web) platforms unconditionally.
 */
export function isWebPushSupported(): boolean {
  if (Platform.OS !== 'web') return true;
  if (typeof window === 'undefined') return false;
  return (
    typeof (window as any).Notification !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

/**
 * Returns true when we are in a web environment where scheduled push
 * notifications are unavailable or unreliable — concretely:
 *   • Any iOS web (Safari on iPhone/iPad does not reliably deliver web push
 *     outside of a home-screen-installed PWA, and older iOS lacks it entirely)
 *   • Any web environment missing PushManager support
 *
 * Used to decide whether to show the "install the app" gentle message instead
 * of the normal notification permission flow.
 *
 * NOTE: Returns false on native builds — native notifications are unaffected.
 */
export function shouldShowWebPushWarning(): boolean {
  if (Platform.OS !== 'web') return false;
  return isIosWebEnvironment() || !isWebPushSupported();
}

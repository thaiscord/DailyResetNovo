import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { getItem, setItem, StorageKeys } from './useStorage';
import { isIosWebEnvironment, isStandaloneMode } from '../utils/webPushDetect';

export type ATHStatus = 'android' | 'ios' | 'hidden';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Days before re-showing the prompt after a dismissal
const REDISPLAY_DAYS = 7;

function isAndroidWebEnvironment(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
}

export function useAddToHomeScreen() {
  const [status, setStatus] = useState<ATHStatus>('hidden');
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (typeof window === 'undefined') return;

    // Already running as installed PWA — never show
    if (isStandaloneMode()) return;

    let cancelled = false;

    async function init() {
      const accepted = await getItem<boolean>(StorageKeys.ATH_ACCEPTED, false);
      if (accepted || cancelled) return;

      const dismissedAt = await getItem<string | null>(StorageKeys.ATH_DISMISSED_AT, null);
      if (dismissedAt) {
        const daysSince = (Date.now() - new Date(dismissedAt).getTime()) / 86_400_000;
        if (daysSince < REDISPLAY_DAYS) return;
      }

      if (cancelled) return;

      if (isIosWebEnvironment()) {
        setStatus('ios');
        return;
      }

      if (!isAndroidWebEnvironment()) {
        // Desktop — don't show
        return;
      }

      // Android Chrome: check if the event was already captured globally before
      // React mounted (inline script in +html.tsx stores it in window.__ath_deferred)
      const already = (window as any).__ath_deferred as BeforeInstallPromptEvent | null;
      if (already) {
        deferredRef.current = already;
        if (!cancelled) setStatus('android');
        return;
      }

      // Event hasn't fired yet — register a listener for when it does
      const onPrompt = (e: Event) => {
        e.preventDefault();
        deferredRef.current = e as BeforeInstallPromptEvent;
        if (!cancelled) setStatus('android');
      };

      window.addEventListener('beforeinstallprompt', onPrompt);
      return () => window.removeEventListener('beforeinstallprompt', onPrompt);
    }

    const cleanup = init();
    return () => {
      cancelled = true;
      cleanup.then(fn => fn?.());
    };
  }, []);

  async function accept() {
    if (status === 'android' && deferredRef.current) {
      await deferredRef.current.prompt();
      const { outcome } = await deferredRef.current.userChoice;
      deferredRef.current = null;
      if (outcome === 'accepted') {
        await setItem(StorageKeys.ATH_ACCEPTED, true);
      } else {
        await setItem(StorageKeys.ATH_DISMISSED_AT, new Date().toISOString());
      }
    } else if (status === 'ios') {
      // User acknowledged the iOS instructions — optimistically mark as accepted
      await setItem(StorageKeys.ATH_ACCEPTED, true);
    }
    setStatus('hidden');
  }

  async function dismiss() {
    await setItem(StorageKeys.ATH_DISMISSED_AT, new Date().toISOString());
    setStatus('hidden');
  }

  return { status, accept, dismiss };
}

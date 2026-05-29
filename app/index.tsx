import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem, StorageKeys } from '../hooks/useStorage';
import { Colors } from '../theme';
import {
  shouldShowWelcomeBack,
  markWelcomeBackShown,
  getWelcomeBackState,
} from '../utils/welcomeBack';

export default function Entry() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const done = await getItem<boolean>(StorageKeys.ONBOARDING_DONE, false);
      if (!done) {
        router.replace('/splash');
        return;
      }

      const show = await shouldShowWelcomeBack();
      if (!show) {
        router.replace('/(tabs)/today');
        return;
      }

      // Read streak and last completed date to determine emotional state
      const [streakRaw, lastCompletedRaw] = await Promise.all([
        AsyncStorage.getItem(StorageKeys.STREAK),
        AsyncStorage.getItem(StorageKeys.LAST_COMPLETED_DATE),
      ]);

      const streak = streakRaw ? (JSON.parse(streakRaw) as number) : 0;

      let daysMissed = 0;
      if (lastCompletedRaw) {
        const lastCompleted: string = JSON.parse(lastCompletedRaw);
        const todayMs = new Date().setHours(0, 0, 0, 0);
        const lastMs  = new Date(lastCompleted + 'T00:00:00').setHours(0, 0, 0, 0);
        daysMissed = Math.max(0, Math.round((todayMs - lastMs) / 86400000) - 1);
      }

      const hour  = new Date().getHours();
      const state = getWelcomeBackState(streak, daysMissed, hour);
      const seed  = new Date().getDate() + streak; // deterministic within a day

      await markWelcomeBackShown();
      router.replace(`/welcome-back?state=${state}&seed=${seed}`);
    })();
  }, []);

  return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
}

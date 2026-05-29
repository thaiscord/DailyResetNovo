import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../theme';
import { LanguageProvider } from '../hooks/useLanguage';
import { EmotionalProfileProvider } from '../hooks/useEmotionalProfile';
import { loadAppDateOffset } from '../utils/appDate';
import { trackAppOpen } from '../utils/analytics';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    loadAppDateOffset().finally(() => {
      SplashScreen.hideAsync();
    });

    AsyncStorage.getItem('streak')
      .then(raw => {
        const streak = raw ? (JSON.parse(raw) as number) : 0;
        trackAppOpen(typeof streak === 'number' ? streak : 0);
      })
      .catch(() => trackAppOpen(0));
  }, []);

  return (
    <LanguageProvider>
      <EmotionalProfileProvider>
      {/* dark = ícones escuros sobre fundo creme (Imagem 1) */}
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="welcome-back"
          options={{
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#1A1A18' },
          }}
        />
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding/index" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding/language" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding/question" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding/promise" options={{ animation: 'fade' }} />
        <Stack.Screen name="goal-selection" />
        <Stack.Screen name="emotional-onboarding" />
        <Stack.Screen
          name="onboarding-complete"
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="notification-setup" />
        <Stack.Screen name="notification-settings" />
        <Stack.Screen name="paywall" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="reflection"
          options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
        />
        <Stack.Screen
          name="reflection-history"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="reset-ritual"
          options={{
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: { backgroundColor: Colors.charcoal },
          }}
        />
        <Stack.Screen
          name="completion-ceremony"
          options={{
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: { backgroundColor: Colors.charcoal },
          }}
        />
        <Stack.Screen
          name="milestone-ceremony"
          options={{
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: { backgroundColor: Colors.charcoal },
          }}
        />
        <Stack.Screen
          name="weekly-recap"
          options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
        />
        <Stack.Screen
          name="weekly-recap-history"
          options={{ animation: 'slide_from_right' }}
        />
      </Stack>
      </EmotionalProfileProvider>
    </LanguageProvider>
  );
}

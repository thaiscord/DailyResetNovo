import { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '../../hooks/useLanguage';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { name: 'today',    label: 'Today',    icon: 'sunny'     },
  { name: 'journal',  label: 'Journal',  icon: 'book'      },
  { name: 'progress', label: 'Progress', icon: 'bar-chart' },
  { name: 'mindset',  label: 'Mindset',  icon: 'bulb'      },
  { name: 'profile',  label: 'You',      icon: 'person'    },
] as const;

// ─── Localized tab labels ─────────────────────────────────────────────────────
const TAB_LABELS: Record<string, Partial<Record<string, string>>> = {
  today:    { pt: 'Hoje',      es: 'Hoy',      fr: "Aujourd'hui", de: 'Heute'       },
  journal:  { pt: 'Diário',    es: 'Diario',   fr: 'Journal',     de: 'Tagebuch'    },
  progress: { pt: 'Progresso', es: 'Progreso',  fr: 'Progrès',     de: 'Fortschritt' },
  mindset:  { pt: 'Mindset',   es: 'Mindset',  fr: 'Mindset',     de: 'Mindset'     },
  profile:  { pt: 'Você',      es: 'Tú',       fr: 'Moi',         de: 'Ich'         },
};

function getTabLabel(tabName: string, defaultLabel: string, lang: string): string {
  return TAB_LABELS[tabName]?.[lang] ?? defaultLabel;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const GOLD       = '#C9973A';
const MUTED      = '#A89F94';
const NAV_BG     = '#FAF6EF';
const NAV_BORDER = 'rgba(201, 151, 58, 0.12)';

// ─── Tab icon with spring animation ──────────────────────────────────────────
function TabIcon({ iconName, focused }: { iconName: string; focused: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.94,
      friction: 11,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons
        name={(focused ? iconName : `${iconName}-outline`) as IoniconsName}
        size={22}
        color={focused ? GOLD : MUTED}
      />
    </Animated.View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TabsLayout() {
  const { lang } = useLanguage();
  const insets = useSafeAreaInsets();

  // Web/PWA: respect iPhone home-indicator safe area.
  // viewport-fit=cover (app/+html.tsx) makes env(safe-area-inset-bottom) non-zero
  // in standalone PWA mode; useSafeAreaInsets() reads that value on web.
  // Minimum 12px so the bar never sits flush against the bottom on any device.
  const webBottomInset = Math.max(insets.bottom, 12);

  const tabBarHeight      = Platform.OS === 'ios' ? 84  : Platform.OS === 'web' ? 56 + webBottomInset : 64;
  const tabBarPaddingBottom = Platform.OS === 'ios' ? 26  : Platform.OS === 'web' ? webBottomInset     : 8;

  return (
    <Tabs
      // Pre-render all tabs on web so switching never shows a blank screen.
      // On native the default lazy:true is kept for faster initial load.
      lazy={Platform.OS !== 'web'}
      screenOptions={{
        headerShown: false,
        // Pin every tab's content area to the app background so no white bleeds
        // through between renders. contentStyle is the correct Bottom Tab prop.
        contentStyle: { backgroundColor: '#FEF9EC' },
        tabBarStyle: {
          backgroundColor: NAV_BG,
          borderTopColor: NAV_BORDER,
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: tabBarPaddingBottom,
          paddingTop: 10,
          shadowColor: '#C9973A',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 6,
        },
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: MUTED,
        tabBarButton: (props) => (
          <TouchableOpacity
            {...(props as any)}
            onPress={(e: any) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              (props as any).onPress?.(e);
            }}
            activeOpacity={1}
          />
        ),
      }}
    >
      {TABS.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon iconName={tab.icon} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{
                fontSize: 10,
                fontWeight: focused ? '600' : '400',
                color: focused ? GOLD : MUTED,
                letterSpacing: 0.15,
                marginTop: 2,
              }}>
                {getTabLabel(tab.name, tab.label, lang)}
              </Text>
            ),
          }}
        />
      ))}

      {/* habits route kept internally — hidden from nav */}
      <Tabs.Screen name="habits" options={{ href: null }} />
    </Tabs>
  );
}

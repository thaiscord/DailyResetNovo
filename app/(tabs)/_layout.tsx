import { useRef, useEffect, useMemo } from 'react';
import { Animated, TouchableOpacity, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs, useRouter } from 'expo-router';
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

// ─── Tab bar button ────────────────────────────────────────────────────────────
// On web, React Navigation passes an `href` prop to the tab button which React
// Native Web renders as an <a href> element. Clicking it causes a real browser
// navigation (page reload) instead of client-side routing.
//
// Fix: extract `href` from the spread so it is never passed to TouchableOpacity
// (preventing the <a> from being rendered), then use router.navigate() to drive
// client-side navigation on web. Native behaviour is unchanged.
function TabBarButton({ href, onPress, children, ...rest }: any) {
  const router = useRouter();

  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (Platform.OS === 'web' && href) {
      // Stop the browser from following the link as a real page load
      if (e?.preventDefault) e.preventDefault();
      // Client-side navigation — no page reload, no component remount
      router.navigate(href as any);
    } else {
      // Native: let React Navigation handle it as usual
      onPress?.(e);
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      // href is intentionally excluded from the spread above so that
      // TouchableOpacity renders as a <div> on web, not <a href>.
      onPress={handlePress}
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Web tab bar dimensions driven by the actual bottom safe-area inset so
  // icons always sit naturally above the iPhone home indicator.
  // IMPORTANT: tabBarSafeAreaInsets={bottom:0} in screenOptions (below) tells
  // React Navigation NOT to add env(safe-area-inset-bottom) a second time.
  // Without that guard, total bottom space = webBottomInset + RN auto-inset
  // ≈ 34 + 34 = 68 px on iPhone PWA — the "pushed down" regression.
  const webBottomInset    = Math.max(insets.bottom, 12);
  const tabBarHeight      = Platform.OS === 'ios' ? 84 : Platform.OS === 'web' ? 56 + webBottomInset : 64;
  const tabBarPaddingBottom = Platform.OS === 'ios' ? 26 : Platform.OS === 'web' ? webBottomInset     : 8;

  const screenOptions = useMemo(() => ({
    headerShown: false,
    contentStyle: { backgroundColor: '#FEF9EC' },
    freezeOnBlur: Platform.OS === 'web',
    tabBarActiveTintColor: GOLD,
    tabBarInactiveTintColor: MUTED,
    tabBarButton: TabBarButton,
    // Prevent React Navigation from adding env(safe-area-inset-bottom) on top
    // of our own paddingBottom — we already account for it in webBottomInset.
    tabBarSafeAreaInsets: Platform.OS === 'web' ? { bottom: 0 } : undefined,
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
  }), [tabBarHeight, tabBarPaddingBottom]);

  return (
    <Tabs
      screenOptions={screenOptions}
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

// ─── DEV ONLY — Time Travel Panel ────────────────────────────────────────────
// This screen is only reachable in __DEV__ builds.
// Access: long-press the version string on the Profile tab.

import { useState, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  advanceDays,
  simulateStreakBreak,
  grantPremium,
  revokePremium,
  resetProgressOnly,
  resetEverything,
  getDevStatus,
  DevStatus,
} from '../utils/devTimeTravel';

declare const __DEV__: boolean;

// Hard-block in production
if (!__DEV__) {
  throw new Error('[DevPanel] This screen must not exist in production builds.');
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Action {
  label: string;
  icon: string;
  color: string;
  onPress: () => Promise<void>;
  confirm?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DevPanel() {
  const router = useRouter();
  const [status, setStatus] = useState<DevStatus | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const s = await getDevStatus();
    setStatus(s);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const run = useCallback(async (action: () => Promise<void>, confirm?: string) => {
    if (confirm) {
      Alert.alert('Confirm', confirm, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed', style: 'destructive',
          onPress: async () => {
            setBusy(true);
            await action();
            await refresh();
            setBusy(false);
          },
        },
      ]);
    } else {
      setBusy(true);
      await action();
      await refresh();
      setBusy(false);
    }
  }, [refresh]);

  const actions: Action[] = [
    {
      label: '+1 Day',
      icon: 'calendar-outline',
      color: '#4A90D9',
      onPress: () => advanceDays(1),
    },
    {
      label: '+7 Days  (1 week)',
      icon: 'calendar-outline',
      color: '#4A90D9',
      onPress: () => advanceDays(7),
    },
    {
      label: '+30 Days  (1 month)',
      icon: 'calendar-outline',
      color: '#4A90D9',
      onPress: () => advanceDays(30),
    },
    {
      label: '+90 Days  (3 months)',
      icon: 'calendar-outline',
      color: '#4A90D9',
      onPress: () => advanceDays(90),
    },
    {
      label: 'Simulate Streak Break',
      icon: 'flame-outline',
      color: '#E8B840',
      onPress: () => simulateStreakBreak(4),
    },
    {
      label: 'Grant Premium',
      icon: 'star-outline',
      color: '#C9A84C',
      onPress: grantPremium,
    },
    {
      label: 'Revoke Premium',
      icon: 'star-half-outline',
      color: '#888',
      onPress: revokePremium,
    },
    {
      label: 'Reset Progress  (keep onboarding)',
      icon: 'refresh-outline',
      color: '#E04040',
      onPress: resetProgressOnly,
      confirm: 'This will wipe all progress and restart from Day 1. Onboarding will not replay.',
    },
    {
      label: 'Reset Everything',
      icon: 'trash-outline',
      color: '#E04040',
      onPress: resetEverything,
      confirm: 'This will erase ALL data including onboarding. The app will restart from scratch.',
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={20} color="#E8B840" />
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.badge}>DEV</Text>
          <Text style={styles.title}>Time Travel</Text>
        </View>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Status Card ───────────────────────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CURRENT STATE</Text>
          {status ? (
            <View style={styles.statusGrid}>
              <StatusRow label="Day"         value={String(status.currentDay)} />
              <StatusRow label="Streak"      value={`${status.streak} days`} />
              <StatusRow label="Best Streak" value={`${status.bestStreak} days`} />
              <StatusRow label="Total Resets"value={String(status.totalCompleted)} />
              <StatusRow label="Premium"     value={status.isPremium ? 'YES ✦' : 'No'} />
              <StatusRow
                label="Last Completed"
                value={status.lastCompletedDate ?? '—'}
              />
            </View>
          ) : (
            <ActivityIndicator color="#E8B840" style={{ marginTop: 12 }} />
          )}
        </View>

        {/* ── How To Use ────────────────────────────────────────────────── */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            After each action, go back and reload the Today tab to see the new state.
            The app behaves exactly as if real days had passed.
          </Text>
        </View>

        {/* ── Time Controls ─────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>TIME CONTROLS</Text>
        {actions.map(a => (
          <TouchableOpacity
            key={a.label}
            style={[styles.btn, busy && styles.btnDisabled]}
            onPress={() => !busy && run(a.onPress, a.confirm)}
            activeOpacity={0.75}
          >
            <View style={[styles.btnIcon, { backgroundColor: `${a.color}22` }]}>
              <Ionicons name={a.icon as any} size={18} color={a.color} />
            </View>
            <Text style={[styles.btnLabel, { color: a.color }]}>{a.label}</Text>
            {busy && <ActivityIndicator size="small" color={a.color} style={{ marginLeft: 'auto' }} />}
          </TouchableOpacity>
        ))}

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            DEV ONLY — invisible in production builds
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Status Row ───────────────────────────────────────────────────────────────

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statusRow}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={styles.statusValue}>{value}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 64,
  },
  backLabel: {
    color: '#E8B840',
    fontSize: 14,
    fontWeight: '500',
  },
  headerTitle: {
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E8B840',
    letterSpacing: 2,
    backgroundColor: '#E8B84020',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
    gap: 12,
  },
  card: {
    backgroundColor: '#181818',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#282828',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E8B840',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  statusGrid: {
    gap: 6,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  statusLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 13,
    color: '#E8E8E8',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E8B84010',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8B84030',
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#E8B840',
    lineHeight: 18,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#555',
    letterSpacing: 1.5,
    marginTop: 8,
    marginBottom: 4,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#282828',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 11,
    color: '#444',
    fontStyle: 'italic',
  },
});

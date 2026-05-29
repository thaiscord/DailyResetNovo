// ─── Mood History Hook ────────────────────────────────────────────────────────
// Reads last N days of mood data and computes trend for personalization.
// Powers System 2 (Mood Memory Engine) from the retention spec.

import { useState, useEffect } from 'react';
import { getItem, StorageKeys, getLocalDateKey } from './useStorage';
import { getAppNow } from '../utils/appDate';

export type MoodTrend = 'improving' | 'declining' | 'stable' | 'heavy' | 'unknown';

export interface MoodEntry {
  date: string;       // YYYY-MM-DD
  mood: 0 | 1 | 2;   // 0=dark, 1=half, 2=full
}

export interface MoodHistory {
  entries: MoodEntry[];         // last 7 days with mood set, newest first
  last3: (0 | 1 | 2 | null)[]; // last 3 calendar days (null = not set)
  trend: MoodTrend;
  latestMood: 0 | 1 | 2 | null;
  heavyDayCount: number;        // # of dark (0) days in last 7
}

const EMPTY: MoodHistory = {
  entries: [],
  last3: [null, null, null],
  trend: 'unknown',
  latestMood: null,
  heavyDayCount: 0,
};

function computeTrend(last3: (0 | 1 | 2 | null)[]): MoodTrend {
  const set = last3.filter((m): m is 0 | 1 | 2 => m !== null);
  if (set.length < 2) return 'unknown';

  // All heavy
  if (set.every(m => m === 0)) return 'heavy';

  // Compare most recent pair
  const [newest, prev] = set;
  if (newest > prev) return 'improving';
  if (newest < prev) return 'declining';
  return 'stable';
}

export function useMoodHistory(days = 7): MoodHistory {
  const [history, setHistory] = useState<MoodHistory>(EMPTY);

  useEffect(() => {
    async function load() {
      const entries: MoodEntry[] = [];
      const last3: (0 | 1 | 2 | null)[] = [];

      for (let i = 1; i <= days; i++) {
        const d = getAppNow();
        d.setDate(d.getDate() - i);
        const dateKey = getLocalDateKey(d);
        const key = `${StorageKeys.DAILY_MOOD}_${dateKey}`;
        const val = await getItem<number>(key, -1);
        const mood = (val >= 0 && val <= 2) ? (val as 0 | 1 | 2) : null;

        if (mood !== null) entries.push({ date: dateKey, mood });
        if (i <= 3) last3.push(mood);
      }

      const trend = computeTrend(last3);
      const heavyDayCount = entries.filter(e => e.mood === 0).length;

      setHistory({
        entries,
        last3,
        trend,
        latestMood: entries[0]?.mood ?? null,
        heavyDayCount,
      });
    }

    load();
  }, [days]);

  return history;
}

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';
import { RitualRecord } from '../utils/resetRitual';
import { EmotionalProfile } from '../utils/emotionalProfile';

/**
 * Tracks Reset Ritual completions persistently.
 * History is used in Weekly Recap and Future Self system.
 */
export function useRitualMemory() {
  const [history, setHistory] = useState<RitualRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem<RitualRecord[]>(StorageKeys.RITUAL_HISTORY, []).then(h => {
      setHistory(h);
      setLoading(false);
    });
  }, []);

  const saveRitual = useCallback(async (
    intention: string | null,
    profile: EmotionalProfile | null,
    totalDays: number,
  ) => {
    const record: RitualRecord = {
      completedAt: new Date().toISOString(),
      intention,
      profile,
      totalDays,
    };
    const updated = [...history, record];
    setHistory(updated);
    await setItem(StorageKeys.RITUAL_HISTORY, updated);
  }, [history]);

  const totalRituals = history.length;
  const lastRitual   = history[history.length - 1] ?? null;

  // Most common intention across all rituals
  const favoriteIntention = (() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    history.forEach(r => { if (r.intention) counts[r.intention] = (counts[r.intention] ?? 0) + 1; });
    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;
  })();

  return { history, totalRituals, lastRitual, favoriteIntention, saveRitual, loading };
}

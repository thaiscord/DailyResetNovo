import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReflectionEntry {
  id: string;
  date: string;           // YYYY-MM-DD
  prompt: string;         // the question shown
  promptId?: string;      // links to data/reflections.ts id
  text: string;           // user's written response
  profile?: string | null;// emotional profile at time of writing
  streak: number;
  dayNumber: number;
  createdAt: string;      // ISO timestamp
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useReflections() {
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const saved = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
    setEntries(saved);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveEntry = useCallback(async (
    entry: Omit<ReflectionEntry, 'id' | 'date' | 'createdAt'>,
  ): Promise<ReflectionEntry> => {
    const now = new Date();
    const full: ReflectionEntry = {
      ...entry,
      id: `${now.getTime()}`,
      date: getLocalDateKey(now),
      createdAt: now.toISOString(),
    };

    // Read fresh from storage to avoid stale-closure overwrite on Day 2+.
    // If the component saves before the async load() settles, `entries` is []
    // and we would clobber all prior entries. Reading from storage is the
    // single source of truth.
    const current = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
    const updated = [...(current ?? []), full];
    setEntries(updated);
    await setItem(StorageKeys.REFLECTIONS, updated);
    return full;
  }, []);

  const getTodayEntry = useCallback((): ReflectionEntry | undefined => {
    const today = getLocalDateKey();
    return entries.findLast(e => e.date === today);
  }, [entries]);

  const getEntriesForDateRange = useCallback((
    start: string,
    end: string,
  ): ReflectionEntry[] => {
    return entries.filter(e => e.date >= start && e.date <= end);
  }, [entries]);

  const updateEntry = useCallback(async (id: string, newText: string): Promise<void> => {
    const current = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
    const next = (current ?? []).map(e => e.id === id ? { ...e, text: newText } : e);
    setEntries(next);
    await setItem(StorageKeys.REFLECTIONS, next);
  }, []);

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    const current = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
    const next = (current ?? []).filter(e => e.id !== id);
    setEntries(next);
    await setItem(StorageKeys.REFLECTIONS, next);
  }, []);

  const totalEntries = entries.length;
  const lastEntry    = entries[entries.length - 1] ?? null;

  return {
    entries,
    loading,
    saveEntry,
    updateEntry,
    deleteEntry,
    getTodayEntry,
    getEntriesForDateRange,
    totalEntries,
    lastEntry,
    reload: load,
  };
}

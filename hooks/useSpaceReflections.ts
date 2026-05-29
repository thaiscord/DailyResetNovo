import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';

export type { ReflectionEntry } from './useReflections';
import type { ReflectionEntry } from './useReflections';

export function useSpaceReflections() {
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const saved = await getItem<ReflectionEntry[]>(StorageKeys.SPACE_REFLECTIONS, []);
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
      id: `space_${now.getTime()}`,
      date: getLocalDateKey(now),
      createdAt: now.toISOString(),
    };
    const current = await getItem<ReflectionEntry[]>(StorageKeys.SPACE_REFLECTIONS, []);
    const updated = [...(current ?? []), full];
    setEntries(updated);
    await setItem(StorageKeys.SPACE_REFLECTIONS, updated);
    return full;
  }, []);

  const updateEntry = useCallback(async (id: string, newText: string): Promise<void> => {
    const current = await getItem<ReflectionEntry[]>(StorageKeys.SPACE_REFLECTIONS, []);
    const next = (current ?? []).map(e => e.id === id ? { ...e, text: newText } : e);
    setEntries(next);
    await setItem(StorageKeys.SPACE_REFLECTIONS, next);
  }, []);

  const getTodayEntry = useCallback((): ReflectionEntry | undefined => {
    const today = getLocalDateKey();
    return entries.findLast(e => e.date === today);
  }, [entries]);

  const totalEntries = entries.length;

  return {
    entries,
    loading,
    saveEntry,
    updateEntry,
    getTodayEntry,
    totalEntries,
    reload: load,
  };
}

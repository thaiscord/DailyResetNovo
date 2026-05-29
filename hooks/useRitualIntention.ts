import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';
import { RitualIntention } from '../utils/ritualIntention';

interface IntentionRecord {
  intention: RitualIntention;
  date: string; // YYYY-MM-DD
}

export function useRitualIntention() {
  const [intention, setIntentionState] = useState<RitualIntention | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Stable reload — safe to call from useFocusEffect
  const reload = useCallback(async () => {
    const record = await getItem<IntentionRecord | null>(
      StorageKeys.RITUAL_INTENTION_TODAY, null,
    );
    const today = getLocalDateKey();
    if (record && record.date === today) {
      setIntentionState(record.intention);
    } else {
      setIntentionState(null);
    }
    setLoaded(true);
  }, []);

  // Initial load on mount
  useEffect(() => { reload(); }, [reload]);

  const setIntention = useCallback(async (value: RitualIntention) => {
    const today = getLocalDateKey();
    await setItem(StorageKeys.RITUAL_INTENTION_TODAY, { intention: value, date: today });
    setIntentionState(value);
  }, []);

  const clearIntention = useCallback(async () => {
    await setItem(StorageKeys.RITUAL_INTENTION_TODAY, null);
    setIntentionState(null);
  }, []);

  return {
    intention,
    hasIntention: intention !== null,
    setIntention,
    clearIntention,
    reload,
    loaded,
  };
}

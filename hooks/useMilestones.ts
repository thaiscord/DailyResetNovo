import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';
import { MilestoneRecord } from '../utils/milestoneSystem';

export function useMilestones() {
  const [seenCeremonies, setSeenCeremonies] = useState<number[]>([]);
  const [history, setHistory] = useState<MilestoneRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [seen, hist] = await Promise.all([
      getItem<number[]>(StorageKeys.MILESTONE_CEREMONIES_SEEN, []),
      getItem<MilestoneRecord[]>(StorageKeys.MILESTONE_HISTORY, []),
    ]);
    setSeenCeremonies(seen);
    setHistory(hist);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const hasSeen = useCallback(
    (streak: number) => seenCeremonies.includes(streak),
    [seenCeremonies],
  );

  const markSeen = useCallback(
    async (streak: number, label: string, type: MilestoneRecord['type'] = 'streak') => {
      const record: MilestoneRecord = {
        streak,
        type,
        label,
        earnedAt: new Date().toISOString(),
      };
      const newSeen = seenCeremonies.includes(streak)
        ? seenCeremonies
        : [...seenCeremonies, streak];
      const newHistory = [...history, record];

      await Promise.all([
        setItem(StorageKeys.MILESTONE_CEREMONIES_SEEN, newSeen),
        setItem(StorageKeys.MILESTONE_HISTORY, newHistory),
      ]);
      setSeenCeremonies(newSeen);
      setHistory(newHistory);
    },
    [seenCeremonies, history],
  );

  return { seenCeremonies, history, hasSeen, markSeen, loading, reload: load };
}

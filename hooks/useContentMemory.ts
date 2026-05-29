import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from './useStorage';

const MEMORY_KEY = 'content_memory_v1';
const MAX_REMEMBERED = 20; // keep last 20 content IDs — enough to prevent repetition

/**
 * Tracks recently shown content IDs (reflection prompts, narratives, etc.)
 * so the app avoids showing the same content too close together.
 *
 * IDs are stored as a sliding window of the last MAX_REMEMBERED items.
 * Each ID should be the unique `id` field from the content object (e.g. 'c07', 'b03').
 */
export function useContentMemory() {
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getItem<string[]>(MEMORY_KEY, []).then(ids => {
      setRecentIds(ids);
      setLoaded(true);
    });
  }, []);

  const wasRecentlySeen = useCallback(
    (id: string) => recentIds.includes(id),
    [recentIds],
  );

  const markAsSeen = useCallback(async (id: string) => {
    if (recentIds.includes(id)) return; // already tracked

    const updated = [...recentIds, id].slice(-MAX_REMEMBERED); // sliding window
    setRecentIds(updated);
    await setItem(MEMORY_KEY, updated);
  }, [recentIds]);

  const clearMemory = useCallback(async () => {
    setRecentIds([]);
    await setItem(MEMORY_KEY, []);
  }, []);

  return { recentIds, wasRecentlySeen, markAsSeen, clearMemory, loaded };
}

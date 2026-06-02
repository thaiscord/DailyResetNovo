import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';
import { getAppNow } from '../utils/appDate';
import type { ReflectionEntry } from './useReflections';
import { getAllDailyEntries } from '../utils/dailyEntries';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PathMemory {
  id: string;
  text: string;
  date: string;          // YYYY-MM-DD
  prompt?: string;       // optional prompt that produced the text
  source: 'reflection' | 'space' | 'action' | 'moment';
  daysAgo: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dateDaysAgo(dateStr: string): number {
  const now    = getAppNow();
  const target = new Date(dateStr + 'T12:00:00');
  return Math.floor((now.getTime() - target.getTime()) / 86400000);
}

// Show on 5 out of 7 days — deterministic, stable per calendar day.
function shouldShowToday(): boolean {
  const today = getLocalDateKey();
  const hash  = today.replace(/-/g, '').split('').reduce((s, c) => s + (parseInt(c) || 0), 0);
  return hash % 7 < 5;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePathMemory() {
  const [memory, setMemory] = useState<PathMemory | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!shouldShowToday()) {
      setLoaded(true);
      return;
    }

    const today      = getLocalDateKey();
    const candidates: PathMemory[] = [];

    // ── 1. Daily reflections ────────────────────────────────────────────────
    const reflections = await getItem<ReflectionEntry[]>(StorageKeys.REFLECTIONS, []);
    for (const r of reflections ?? []) {
      if (!r.text?.trim() || r.text.trim().length < 25) continue;
      const days = dateDaysAgo(r.date);
      if (days < 7 || r.date === today) continue;
      candidates.push({
        id:     `refl_${r.id}`,
        text:   r.text.trim(),
        date:   r.date,
        prompt: r.prompt?.trim() || undefined,
        source: 'reflection',
        daysAgo: days,
      });
    }

    // ── 2. Private space entries ─────────────────────────────────────────────
    const spaceEntries = await getItem<ReflectionEntry[]>(StorageKeys.SPACE_REFLECTIONS, []);
    for (const r of spaceEntries ?? []) {
      if (!r.text?.trim() || r.text.trim().length < 25) continue;
      const days = dateDaysAgo(r.date);
      if (days < 7 || r.date === today) continue;
      candidates.push({
        id:     `space_${r.id}`,
        text:   r.text.trim(),
        date:   r.date,
        source: 'space',
        daysAgo: days,
      });
    }

    // ── 3. Daily entries — action and moment reflection responses ─────────────
    const dailyEntries = await getAllDailyEntries();
    for (const entry of dailyEntries) {
      const days = dateDaysAgo(entry.date);
      if (days < 7 || entry.date === today) continue;

      if (entry.action_response?.trim() && entry.action_response.trim().length >= 25) {
        candidates.push({
          id:     `action_${entry.date}`,
          text:   entry.action_response.trim(),
          date:   entry.date,
          prompt: entry.actionPrompt?.trim() || undefined,
          source: 'action',
          daysAgo: days,
        });
      }

      if (entry.momentReflection?.trim() && entry.momentReflection.trim().length >= 25) {
        candidates.push({
          id:     `moment_${entry.date}`,
          text:   entry.momentReflection.trim(),
          date:   entry.date,
          prompt: entry.momentPrompt?.trim() || undefined,
          source: 'moment',
          daysAgo: days,
        });
      }
    }

    if (candidates.length === 0) {
      setLoaded(true);
      return;
    }

    // ── Filter out memories shown in the last 21 days ─────────────────────────
    const seen = await getItem<{ id: string; shownAt: string }[]>(
      StorageKeys.PATH_MEMORY_SEEN, [],
    );
    const recentIds = new Set(
      (seen ?? [])
        .filter(s => dateDaysAgo(s.shownAt) < 21)
        .map(s => s.id),
    );

    const fresh = candidates.filter(c => !recentIds.has(c.id));
    const pool  = fresh.length > 0 ? fresh : candidates;

    // ── Stable per-day pick (seed = digit-sum of today's date) ───────────────
    const seed   = today.replace(/-/g, '').split('').reduce((s, c) => s + (parseInt(c) || 0), 0);
    const chosen = pool[seed % pool.length];

    // ── Record as seen ────────────────────────────────────────────────────────
    const cleaned = (seen ?? []).filter(s => dateDaysAgo(s.shownAt) < 60);
    await setItem(StorageKeys.PATH_MEMORY_SEEN, [
      ...cleaned,
      { id: chosen.id, shownAt: today },
    ]);

    setMemory(chosen);
    setLoaded(true);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { memory, loaded };
}

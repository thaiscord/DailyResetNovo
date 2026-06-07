import AsyncStorage from '@react-native-async-storage/async-storage';

export type DailyEntry = {
  date: string;
  day: number;
  mood: 'hard' | 'okay' | 'good' | null;
  action_response: string;
  reflection_response: string;
  word_of_day: string;
  completed: boolean;
  // Context fields — saved alongside user responses so the entry is self-contained
  category?: string;
  resetTitle?: string;
  actionPrompt?: string;
  reflectionPrompt?: string;
  whyItMatters?: string;
  momentReflection?: string;
  momentPrompt?: string;
};

export async function saveDailyEntry(
  entry: Partial<DailyEntry> & { date: string }
): Promise<void> {
  const key = `daily_entry_${entry.date}`;
  const existing = await AsyncStorage.getItem(key);
  const current: Partial<DailyEntry> = existing ? JSON.parse(existing) : {};
  const updated = { ...current, ...entry };
  await AsyncStorage.setItem(key, JSON.stringify(updated));
}

export async function getDailyEntry(date: string): Promise<DailyEntry | null> {
  const key = `daily_entry_${date}`;
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export async function getAllDailyEntries(): Promise<DailyEntry[]> {
  const keys = await AsyncStorage.getAllKeys();
  const entryKeys = keys.filter(k => k.startsWith('daily_entry_'));
  if (entryKeys.length === 0) return [];
  const pairs = await AsyncStorage.multiGet(entryKeys);
  const entries: DailyEntry[] = pairs
    .map(([, value]) => (value ? JSON.parse(value) as DailyEntry : null))
    .filter((e): e is DailyEntry => e !== null);
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export async function clearAllDailyEntries(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const toRemove = keys.filter(
    k => k.startsWith('daily_entry_') ||
         k.startsWith('mood_checkin_') ||
         k.startsWith('daily_mood_v1_')
  );
  if (toRemove.length > 0) {
    await AsyncStorage.multiRemove(toRemove);
  }
}

export async function getWeekEntries(startDate: string): Promise<DailyEntry[]> {
  const entries: DailyEntry[] = [];
  const [y, m, d] = startDate.split('-').map(Number);
  const start = new Date(y, m - 1, d);
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const entry = await getDailyEntry(dateStr);
    if (entry) entries.push(entry);
  }
  return entries;
}

/**
 * Returns all 7 days of a Mon-Sun week as an array of (DailyEntry | null).
 * Index 0 = Monday, index 6 = Sunday. Null means the day was skipped.
 * Uses local-timezone date arithmetic to match stored YYYY-MM-DD keys.
 */
export async function getWeekAllDays(mondayKey: string): Promise<(DailyEntry | null)[]> {
  const [y, m, d] = mondayKey.split('-').map(Number);
  const monday = new Date(y, m - 1, d);
  const result: (DailyEntry | null)[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    result.push(await getDailyEntry(dateStr));
  }
  return result;
}

/**
 * Returns the daily emotional state ('racing'|'tired'|'overwhelmed'|'unclear'|'drained')
 * for each of the 7 days in the Mon-Sun week starting at mondayKey.
 * Index 0 = Monday. Null means no state was selected that day.
 *
 * Reads from the per-day key written by today.tsx:
 *   setItem(StorageKeys.DAILY_STATE + '_' + dateKey, state)
 *   → key: 'daily_state_v1_YYYY-MM-DD'
 */
export async function getDailyStatesForWeek(mondayKey: string): Promise<(string | null)[]> {
  const [y, m, d] = mondayKey.split('-').map(Number);
  const monday = new Date(y, m - 1, d);
  const STATE_PREFIX = 'daily_state_v1_';
  const result: (string | null)[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const raw = await AsyncStorage.getItem(`${STATE_PREFIX}${dateStr}`);
    if (raw === null) {
      result.push(null);
    } else {
      try {
        // setItem JSON.stringifies, so the stored value is '"racing"' not 'racing'.
        // JSON.parse unwraps the outer quotes. Fallback keeps raw value for legacy data.
        const parsed = JSON.parse(raw);
        result.push(typeof parsed === 'string' ? parsed : null);
      } catch {
        result.push(raw);
      }
    }
  }
  return result;
}

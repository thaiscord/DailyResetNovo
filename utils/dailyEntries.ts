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
  const start = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const entry = await getDailyEntry(dateStr);
    if (entry) entries.push(entry);
  }
  return entries;
}

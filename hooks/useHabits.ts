import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
}

export interface HabitLog {
  [dateKey: string]: string[];  // chave: YYYY-MM-DD
}

const defaultHabits: Habit[] = [
  { id: 'morning',        name: 'Morning Routine',    icon: 'sunny-outline',             isDefault: true },
  { id: 'workout',        name: 'Workout',             icon: 'barbell-outline',           isDefault: true },
  { id: 'deepwork',       name: 'Deep Work',           icon: 'laptop-outline',            isDefault: true },
  { id: 'read',           name: 'Read 20 Pages',       icon: 'book-outline',              isDefault: true },
  { id: 'water',          name: 'Drink Water',         icon: 'water-outline',             isDefault: true },
  { id: 'nodistractions', name: 'No Distractions',     icon: 'notifications-off-outline', isDefault: true },
  { id: 'sleep',          name: 'Sleep Earlier',       icon: 'moon-outline',              isDefault: true },
  { id: 'plan',           name: 'Plan Tomorrow',       icon: 'calendar-outline',          isDefault: true },
  { id: 'gratitude',      name: 'Gratitude',           icon: 'heart-outline',             isDefault: true },
  { id: 'detox',          name: 'Digital Detox',       icon: 'phone-portrait-outline',    isDefault: true },
];

export function useHabits() {
  const [habits, setHabits]     = useState<Habit[]>(defaultHabits);
  const [habitLog, setHabitLog] = useState<HabitLog>({});
  const [loading, setLoading]   = useState(true);

  // todayKey usa YYYY-MM-DD (formato ISO, sem dependência de locale)
  const [todayKey, setTodayKey] = useState<string>(getLocalDateKey());
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    const [savedHabits, savedLog] = await Promise.all([
      getItem<Habit[]>(StorageKeys.HABITS, defaultHabits),
      getItem<HabitLog>(StorageKeys.HABIT_LOG, {}),
    ]);
    setHabits(savedHabits);
    setHabitLog(savedLog);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Verifica a cada minuto se o dia mudou (enquanto app está em foreground)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const current = getLocalDateKey();
      setTodayKey(prev => (prev !== current ? current : prev));
    }, 60_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Detecta quando app volta do background: atualiza todayKey E recarrega habitLog
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        const current = getLocalDateKey();
        setTodayKey(current);
        load(); // recarrega habitLog do AsyncStorage para refletir novo dia
      }
    };

    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, [load]);

  const toggleHabit = useCallback(async (habitId: string) => {
    const key = getLocalDateKey(); // sempre usa a data local atual
    const todayDone = habitLog[key] || [];
    const updated = todayDone.includes(habitId)
      ? todayDone.filter(id => id !== habitId)
      : [...todayDone, habitId];
    const newLog = { ...habitLog, [key]: updated };
    await setItem(StorageKeys.HABIT_LOG, newLog);
    setHabitLog(newLog);
    // Debug — remover antes de publicar
    console.log('[DR] HABIT UPDATED', habitId, 'key:', key);
    console.log('[DR] GLOBAL COMPLETED HABITS', updated);
  }, [habitLog]);

  const todayCompleted = habitLog[todayKey] || [];
  const completionRate = habits.length > 0
    ? (todayCompleted.length / habits.length) * 100
    : 0;

  return {
    habits,
    habitLog,
    todayKey,
    todayCompleted,
    completionRate,
    loading,
    toggleHabit,
    reload: load,
  };
}

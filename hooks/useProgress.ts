import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getItem, setItem, StorageKeys, getLocalDateKey } from './useStorage';
import { getAppNow } from '../utils/appDate';
import { getWeekMonday } from '../utils/weeklyRecap';

export interface ProgressState {
  currentDay: number;
  completedDays: number[];
  streak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  completedByDate: Record<string, true>;
  isPremium: boolean;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    currentDay: 1,
    completedDays: [],
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    completedByDate: {},
    isPremium: true,
  });
  const [loading, setLoading] = useState(true);
  const [comebackCount, setComebackCount] = useState(0);

  const load = useCallback(async () => {
    const [currentDay, completedDays, streak, bestStreak, lastCompletedDate, completedByDate, isPremium, storedComebackCount] = await Promise.all([
      getItem<number>(StorageKeys.CURRENT_DAY, 1),
      getItem<number[]>(StorageKeys.COMPLETED_DAYS, []),
      getItem<number>(StorageKeys.STREAK, 0),
      getItem<number>(StorageKeys.BEST_STREAK, 0),
      getItem<string | null>(StorageKeys.LAST_COMPLETED_DATE, null),
      getItem<Record<string, true>>(StorageKeys.COMPLETED_BY_DATE, {}),
      getItem<boolean>(StorageKeys.IS_PREMIUM, false),
      getItem<number>(StorageKeys.COMEBACK_COUNT, 0),
    ]);
    setComebackCount(storedComebackCount);

    // ── Avança currentDay automaticamente no início de um novo dia ─────────────
    // Regra: currentDay só avança quando o calendário muda (não na conclusão do reset).
    // Se o lastCompletedDate NÃO é hoje, e os completedDays indicam um dia a mais,
    // significa que o usuário está num novo dia de calendário → avança.
    const today = getAppNow().toDateString();
    let resolvedCurrentDay = currentDay;

    if (lastCompletedDate !== null && lastCompletedDate !== today) {
      // O usuário completou em algum dia anterior — verifica se currentDay precisa avançar
      const expectedNextDay = completedDays.length + 1;
      if (expectedNextDay > resolvedCurrentDay) {
        resolvedCurrentDay = expectedNextDay;
        // Persiste o avanço para que futuras cargas comecem no dia correto
        await setItem(StorageKeys.CURRENT_DAY, resolvedCurrentDay);
      }
    }

    setProgress({ currentDay: resolvedCurrentDay, completedDays, streak, bestStreak, lastCompletedDate, completedByDate, isPremium: true });
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Recarrega quando app volta do background — novo dia é detectado automaticamente
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active') load();
    };
    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, [load]);

  const completeDay = useCallback(async (day: number) => {
    const today = getAppNow().toDateString();
    const todayKey = getLocalDateKey();

    // Evita re-completar o mesmo dia
    if (progress.completedByDate[todayKey]) {
      return { isFirstCompletion: false };
    }

    const newCompleted = progress.completedDays.includes(day)
      ? progress.completedDays
      : [...progress.completedDays, day];

    let newStreak = progress.streak;
    let newBestStreak = progress.bestStreak;

    let isComebackCompletion = false;

    if (progress.lastCompletedDate !== today) {
      // Compute calendar days elapsed since last completion.
      // daysMissed = 0 → completed yesterday (streak flows normally)
      // daysMissed 1-6 → grace period: streak is preserved, not broken
      // daysMissed 7+ → returning after long absence: new streak starts
      let daysMissed = 0;
      if (progress.lastCompletedDate) {
        const last = new Date(progress.lastCompletedDate);
        const now = getAppNow();
        const lastNorm = new Date(last.getFullYear(), last.getMonth(), last.getDate());
        const todayNorm = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        daysMissed = Math.round((todayNorm.getTime() - lastNorm.getTime()) / 86400000) - 1;
      }

      if (daysMissed >= 7) {
        // Returning after long absence: new streak, but preserve best
        newStreak = 1;
        newBestStreak = Math.max(progress.streak, progress.bestStreak);
      } else {
        // Active (0 missed) + Paused (1-2 missed) + Resting (3-6 missed): streak preserved
        newStreak = progress.streak + 1;
        newBestStreak = Math.max(newStreak, progress.bestStreak);
      }

      // Any gap with prior history is a comeback
      if (daysMissed > 0 && progress.completedDays.length > 0) {
        isComebackCompletion = true;
      }
    }

    const newCompletedByDate = { ...progress.completedByDate, [todayKey]: true as const };
    const newComebackCount = isComebackCompletion ? comebackCount + 1 : comebackCount;

    // currentDay NÃO avança aqui — avança apenas quando o dia do calendário virar
    // (detectado em load() via lastCompletedDate !== today no próximo carregamento)
    await Promise.all([
      setItem(StorageKeys.COMPLETED_DAYS, newCompleted),
      setItem(StorageKeys.STREAK, newStreak),
      setItem(StorageKeys.BEST_STREAK, newBestStreak),
      setItem(StorageKeys.LAST_COMPLETED_DATE, today),
      setItem(StorageKeys.COMPLETED_BY_DATE, newCompletedByDate),
      isComebackCompletion
        ? setItem(StorageKeys.COMEBACK_COUNT, newComebackCount)
        : Promise.resolve(),
    ]);

    if (isComebackCompletion) setComebackCount(newComebackCount);

    setProgress(prev => ({
      ...prev,
      completedDays: newCompleted,
      streak: newStreak,
      bestStreak: newBestStreak,
      lastCompletedDate: today,
      completedByDate: newCompletedByDate,
    }));

    return {
      isFirstCompletion: !progress.completedDays.includes(day),
      isComebackCompletion,
      newStreak,
    };
  }, [progress]);

  const unlockPremium = useCallback(async () => {
    await setItem(StorageKeys.IS_PREMIUM, true);
    setProgress(prev => ({ ...prev, isPremium: true }));
  }, []);

  // Count completions in the current Mon-Sun calendar week using completedByDate
  // (YYYY-MM-DD keys). Uses getAppNow() so dev time-travel is respected.
  const weeklyScore = (() => {
    const monday = getWeekMonday(getAppNow());
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      if (progress.completedByDate[getLocalDateKey(d)]) count++;
    }
    return count;
  })();

  const monthlyScore = progress.completedDays.filter(d => {
    const now = getAppNow();
    const dayOfMonth = now.getDate();
    return d >= progress.currentDay - dayOfMonth && d <= progress.currentDay;
  }).length;

  return { progress, loading, completeDay, unlockPremium, reload: load, weeklyScore, monthlyScore, comebackCount };
}

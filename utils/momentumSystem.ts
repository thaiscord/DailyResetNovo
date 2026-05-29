// ─── Momentum System ──────────────────────────────────────────────────────────
// Emotional continuity over streak numbers.
// Core philosophy: progress never fully disappears.
// Even after missed days, the user's identity and effort remain real.
//
// This system provides the language and logic that keeps users emotionally
// grounded when streaks break — replacing punishment with continuity.

import { getLocalDateKey } from '../hooks/useStorage';
import { getAppNow } from './appDate';
import { isPt, isEs, isFr } from './langStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MomentumLevel =
  | 'exceptional'  // streak 14+, weeklyScore 6+ — rare, celebrate quietly
  | 'strong'       // streak 7+, weeklyScore 5+
  | 'building'     // streak 3+, weeklyScore 3+
  | 'returning'    // has history, daysMissed < 7 — came back
  | 'rebuilding'   // has history, daysMissed 7+ — needs warmth
  | 'beginning';   // no history — very first steps

export type ConsistencyTrend = 'improving' | 'steady' | 'rebuilding';

export interface MomentumState {
  level: MomentumLevel;
  label: string;
  narrative: string;
}

export interface ConsistencyTrendData {
  trend: ConsistencyTrend;
  recentScore: number;    // completions in last 14 days
  previousScore: number;  // completions in days 15-28
  message: string;
}

export interface ConsistencyScore {
  score: number;
  outOf: number;
  percent: number;
  label: string;
}

export interface SoftRecoveryState {
  label: string;
  message: string;
  icon: string;
}

export interface EmotionalProgress {
  headline: string;
  sub: string;
}

// ─── Momentum State ───────────────────────────────────────────────────────────

/**
 * Returns the comprehensive momentum level based on multiple factors.
 * Uses emotional logic, not just consecutive-day counting.
 */
export function getMomentumState(
  streak: number,
  totalDays: number,
  weeklyScore: number,
  daysMissed: number,
): MomentumState {
  if (totalDays === 0) {
    return {
      level: 'beginning',
      label: 'Beginning',
      narrative: 'Every journey starts exactly here.',
    };
  }

  if (daysMissed >= 7 && streak === 0) {
    return {
      level: 'rebuilding',
      label: 'Rebuilding',
      narrative: 'You are not starting from zero. You are continuing.',
    };
  }

  if (daysMissed >= 2 && streak <= 2) {
    return {
      level: 'returning',
      label: 'Returning',
      narrative: 'You returned. That is where momentum restarts.',
    };
  }

  if (streak >= 14 && weeklyScore >= 5) {
    return {
      level: 'exceptional',
      label: 'Exceptional',
      narrative: 'Momentum is becoming your identity.',
    };
  }

  if (streak >= 7 && weeklyScore >= 4) {
    return {
      level: 'strong',
      label: 'Strong',
      narrative: 'Your consistency is real and growing.',
    };
  }

  if (streak >= 3 || weeklyScore >= 3) {
    return {
      level: 'building',
      label: 'Building',
      narrative: 'The foundation is forming quietly.',
    };
  }

  return {
    level: 'returning',
    label: 'Continuing',
    narrative: 'Every completed reset adds to what you are building.',
  };
}

// ─── Consistency Trend ────────────────────────────────────────────────────────

/**
 * Compares completions in the last 14 days vs the 14 days before that.
 * Returns an honest, non-punishing trend assessment.
 */
export function getConsistencyTrend(
  completedByDate: Record<string, true>,
): ConsistencyTrendData {
  let recentScore = 0;
  let previousScore = 0;

  for (let i = 1; i <= 28; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = getLocalDateKey(d);
    if (completedByDate[key]) {
      if (i <= 14) recentScore++;
      else previousScore++;
    }
  }

  const trend: ConsistencyTrend =
    recentScore > previousScore  ? 'improving' :
    recentScore === previousScore ? 'steady'    :
    'rebuilding';

  const message = isEs()
    ? (trend === 'improving'  ? 'La consistencia está creciendo.' :
       trend === 'steady'     ? 'Tu ritmo se mantiene estable.' :
       'Reconstruyendo. El progreso continúa.')
    : isFr()
    ? (trend === 'improving'  ? 'La constance grandit.' :
       trend === 'steady'     ? 'Ton rythme tient.' :
       'En reconstruction. Le progrès continue.')
    : (trend === 'improving'  ? 'Consistency is growing.' :
       trend === 'steady'     ? 'Your rhythm is holding steady.' :
       'Rebuilding. Progress continues.');

  return { trend, recentScore, previousScore, message };
}

// ─── Consistency Score ────────────────────────────────────────────────────────

/**
 * Returns a concrete consistency score for the last N days.
 * Used to show honest, non-alarming completion data.
 */
export function getConsistencyScore(
  completedByDate: Record<string, true>,
  days: number = 14,
): ConsistencyScore {
  let score = 0;
  for (let i = 1; i <= days; i++) {
    const d = getAppNow();           // simulated "today" as reference point
    d.setDate(d.getDate() - i);
    if (completedByDate[getLocalDateKey(d)]) score++;
  }

  const percent = Math.round((score / days) * 100);
  const label =
    percent >= 70 ? 'Consistent' :
    percent >= 40 ? 'Building'   :
    percent >= 15 ? 'Returning'  :
    'Beginning';

  return { score, outOf: days, percent, label };
}

// ─── Soft Recovery State ──────────────────────────────────────────────────────

/**
 * Gentle framing for when a user has missed days.
 * Never uses failure language. Always forward-looking.
 */
export function getSoftRecoveryState(
  daysMissed: number,
  totalDays: number,
): SoftRecoveryState {
  if (totalDays === 0) {
    return {
      label: 'Beginning',
      message: 'Every journey starts with one step.',
      icon: 'sparkles-outline',
    };
  }

  if (daysMissed === 1) {
    return {
      label: 'One Day Paused',
      message: 'One day off is part of any journey.',
      icon: 'pause-circle-outline',
    };
  }

  if (daysMissed <= 3) {
    return {
      label: 'Brief Rest',
      message: 'A few days away. Momentum returns with one reset.',
      icon: 'refresh-outline',
    };
  }

  if (daysMissed <= 7) {
    return {
      label: 'Rebuilding',
      message: 'A difficult week. Returning after hard days is strength.',
      icon: 'trending-up-outline',
    };
  }

  return {
    label: 'New Chapter',
    message: 'You are not starting from zero. Your journey still exists.',
    icon: 'sparkles-outline',
  };
}

// ─── Emotional Progress ───────────────────────────────────────────────────────

/**
 * A holistic emotional progress summary — uses streak, total days,
 * comeback count and weekly score together for the most honest picture.
 */
export function getEmotionalProgress(
  streak: number,
  totalDays: number,
  comebackCount: number,
  weeklyScore: number,
  daysMissed: number = 0,
): EmotionalProgress {
  if (totalDays === 0) {
    return {
      headline: 'Something is beginning here.',
      sub: 'Every transformation starts with one step.',
    };
  }

  if (streak >= 14 && weeklyScore >= 5) {
    return {
      headline: 'Consistency is becoming your identity.',
      sub: 'What you are building now is permanent.',
    };
  }

  if (streak >= 7 && weeklyScore >= 4) {
    return {
      headline: 'Momentum is becoming real.',
      sub: 'Your consistency is growing day by day.',
    };
  }

  if (streak >= 3 && weeklyScore >= 3) {
    return {
      headline: 'You are building consistency.',
      sub: 'Small repetition becomes real change.',
    };
  }

  if (daysMissed >= 2 && totalDays > 0) {
    return {
      headline: 'You returned.',
      sub: comebackCount > 1
        ? `You've come back ${comebackCount} times. That's resilience.`
        : `That's the most important part.`,
    };
  }

  if (totalDays >= 7) {
    return {
      headline: 'Progress continues.',
      sub: 'Small steps still count. Keep going.',
    };
  }

  return {
    headline: 'The beginning matters.',
    sub: 'Every large consistency starts exactly here.',
  };
}

// ─── Streak Flexibility Label ─────────────────────────────────────────────────

/**
 * Returns a compassionate label for the streak state.
 * When streak resets, never says "0" — uses emotionally safe language.
 */
export function getStreakFlexibilityLabel(
  streak: number,
  daysMissed: number,
  totalDays: number,
): string {
  if (streak > 0) return `${streak} day${streak !== 1 ? 's' : ''}`;
  if (totalDays === 0) return 'Beginning';
  if (daysMissed <= 1) return 'One day rest';
  if (daysMissed <= 3) return 'Brief pause';
  if (daysMissed <= 7) return 'Rebuilding';
  return 'New chapter';
}

// ─── Resilience Tracking ──────────────────────────────────────────────────────

/**
 * Returns emotional framing for the comeback count —
 * celebrating resilience as a genuine form of consistency.
 */
export function getResilienceNarrative(
  comebackCount: number,
  totalDays: number,
): string | null {
  if (comebackCount === 0 || totalDays < 3) return null;

  if (comebackCount === 1) return 'You returned when it was hard. That\'s not nothing.';
  if (comebackCount === 2) return 'You\'ve returned twice. Resilience is part of your story.';
  if (comebackCount >= 3) return `You\'ve returned ${comebackCount} times. That consistency is real.`;

  return null;
}

// ─── "Progress never disappears" philosophy ───────────────────────────────────

/**
 * Returns a message reinforcing that past work remains real.
 * Used when streak resets to reassure the user.
 */
export function getProgressContinuityMessage(totalDays: number): string {
  if (isPt()) {
    if (totalDays === 0) return 'Hoje é onde tudo começa.';
    if (totalDays >= 30) return `${totalDays} resets concluídos. Esse progresso é permanente.`;
    if (totalDays >= 7)  return `${totalDays} resets concluídos. Nada disso desaparece.`;
    return 'O que você construiu esta semana ainda importa.';
  }
  if (isEs()) {
    if (totalDays === 0) return 'Hoy es donde todo comienza.';
    if (totalDays >= 30) return `${totalDays} resets completados. Ese progreso es permanente.`;
    if (totalDays >= 7)  return `${totalDays} resets completados. Nada de eso desaparece.`;
    return 'Lo que construiste esta semana todavía importa.';
  }
  if (isFr()) {
    if (totalDays === 0) return 'Aujourd\'hui, tout commence.';
    if (totalDays >= 30) return `${totalDays} resets complétés. Ce progrès est permanent.`;
    if (totalDays >= 7)  return `${totalDays} resets complétés. Rien de tout ça ne disparaît.`;
    return 'Ce que tu as construit cette semaine compte encore.';
  }
  if (totalDays === 0) return 'Today is where everything begins.';
  if (totalDays >= 30) return `${totalDays} resets completed. That progress is permanent.`;
  if (totalDays >= 7)  return `${totalDays} resets completed. None of that disappears.`;
  return 'What you built this week still matters.';
}

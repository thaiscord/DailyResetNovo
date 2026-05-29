// ─── homeGreeting.ts ──────────────────────────────────────────────────────────
// Time-based contextual greetings for the Today screen.
// Tone: calm, witnessing, never cheerful — like a friend who gets it.
// Word-of-day: single grounding words that echo through the daily reset.

import { getActiveLang } from './langStore';

// ─── Time-based greeting ──────────────────────────────────────────────────────

export function getTimeGreeting(): string {
  const h = new Date().getHours();
  const lang = getActiveLang();

  if (lang === 'pt') {
    if (h >= 5 && h < 12)  return 'Antes dos emails —';
    if (h >= 12 && h < 17) return 'Meio-dia. Você tem ido.';
    if (h >= 17 && h < 21) return 'Você passou por mais um.';
    return 'Ainda acordada? Tudo bem.';
  }

  if (lang === 'es') {
    if (h >= 5 && h < 12)  return 'Antes de los correos —';
    if (h >= 12 && h < 17) return 'Mediodía. Has estado yendo.';
    if (h >= 17 && h < 21) return 'Lo lograste con otro más.';
    return '¿Aún despierto? Está bien.';
  }

  if (lang === 'fr') {
    if (h >= 5 && h < 12)  return 'Avant les emails —';
    if (h >= 12 && h < 17) return 'Milieu de journée. Tu avances.';
    if (h >= 17 && h < 21) return 'Tu as traversé un autre.';
    return 'Encore là ? C\'est bien.';
  }

  if (lang === 'de') {
    if (h >= 5 && h < 12)  return 'Bevor die Emails kommen —';
    if (h >= 12 && h < 17) return 'Mittag. Du bist durchgekommen.';
    if (h >= 17 && h < 21) return 'Du hast noch einen Tag geschafft.';
    return 'Noch wach? Das ist in Ordnung.';
  }

  if (h >= 5 && h < 12)  return 'Before the emails —';
  if (h >= 12 && h < 17) return "Midday. You've been going.";
  if (h >= 17 && h < 21) return 'You made it through another one.';
  return "Still awake? That's okay.";
}

// ─── Word of the day ──────────────────────────────────────────────────────────
// Grounding single words. Rotate by day number — never random.
// Source: ContentEngine's 365-word library (data/words_365.json).
// The existing { word, meaning } shape is preserved for backward compat.
import { getWordOfDay } from './ContentEngine';

export function getDayWord(day: number): { word: string; meaning: string } {
  const w = getWordOfDay(day);
  return { word: w.word, meaning: w.meaning };
}

// ─── Mood-aware greeting (System 2 — Mood Memory Engine) ─────────────────────
// Returns a contextual greeting line based on last 3 days of mood.

export type MoodTrend = 'improving' | 'declining' | 'stable' | 'heavy' | 'unknown';

export function getMoodAwareGreeting(
  last3: (0 | 1 | 2 | null)[],
  trend: MoodTrend,
  daysMissed: number,
): string | null {
  const lang = getActiveLang();
  const isPt = lang === 'pt';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';
  const isDe = lang === 'de';

  // Return after absence takes priority
  if (daysMissed === 1 || daysMissed === 2) {
    if (isPt) return 'Você esteve ausente. Bem-vinda de volta.';
    if (isEs) return 'Estuviste fuera. Bienvenida de vuelta.';
    if (isFr) return 'Tu étais absent. Bon retour.';
    if (isDe) return 'Du warst weg. Willkommen zurück.';
    return 'You were away. Welcome back.';
  }

  const [today, yesterday, dayBefore] = last3;

  // Three heavy days
  if (today === 0 && yesterday === 0 && dayBefore === 0) {
    if (isPt) return 'Três dias pesados. Você ainda está aqui. Isso é força.';
    if (isEs) return 'Tres días pesados. Sigues aquí. Eso es fortaleza.';
    if (isFr) return 'Trois jours lourds. Tu es encore là. C\'est de la force.';
    if (isDe) return 'Drei schwere Tage. Du bist noch hier. Das ist Stärke.';
    return "Three heavy days. You're still here. That's strength.";
  }

  // Improving arc (got lighter)
  if (trend === 'improving' && today !== null && today > 0) {
    if (isPt) return 'Algo está mudando. Você consegue sentir?';
    if (isEs) return 'Algo está cambiando. ¿Puedes sentirlo?';
    if (isFr) return 'Quelque chose change. Tu le ressens ?';
    if (isDe) return 'Etwas verändert sich. Kannst du es spüren?';
    return 'Something is shifting. Can you feel it?';
  }

  // Declining arc (got heavier)
  if (trend === 'declining' && today === 0) {
    if (isPt) return 'O peso voltou. Este momento ainda é seu.';
    if (isEs) return 'El peso volvió. Este momento sigue siendo tuyo.';
    if (isFr) return 'Le poids est revenu. Ce moment reste le tien.';
    if (isDe) return 'Das Gewicht ist zurück. Dieser Moment gehört noch dir.';
    return 'The weight is back. This moment is still yours.';
  }

  // Hard yesterday, here today
  if (yesterday === 0 && today === null) {
    if (isPt) return 'Ontem foi muito. Hoje é diferente.';
    if (isEs) return 'Ayer fue mucho. Hoy es diferente.';
    if (isFr) return 'Hier, c\'était beaucoup. Aujourd\'hui est différent.';
    if (isDe) return 'Gestern war viel. Heute ist anders.';
    return 'Yesterday was a lot. Today is separate.';
  }

  return null; // fall through to default time greeting
}

// Single entry point for all app content.
// All screens import from here — never directly from individual content files.

import { getActiveLang } from '../utils/langStore';

// ── Daily rituals ─────────────────────────────────────────────────────────────
export { rituals, getRitualForDay, getRitualArc, getRitualWordOfDay } from './rituals';
export { dailyResetsExtended } from './dailyResetsExtended';

// ── Mindset library ───────────────────────────────────────────────────────────
export { mindsetCards, mindsetCategories } from './mindsetContent';

// ── Reflection prompts ────────────────────────────────────────────────────────
export { ALL_REFLECTIONS, selectReflectionPrompt, getReflectionPhase } from './reflections';

// ── Types ─────────────────────────────────────────────────────────────────────
export type { Ritual, RitualTheme, RitualArc, RitualsData } from './rituals';
export type { MindsetCard, MindsetCategory } from './mindsetContent';
export type { Reflection, ReflectionPhase, ReflectionCategory } from './reflections';

// ── Unified day content accessor ──────────────────────────────────────────────
import { rituals } from './rituals';
import { dailyResetsExtended } from './dailyResetsExtended';
import type { Ritual } from './rituals';

import ritualsPtData from './rituals.pt.json';
import ritualsEsData from './rituals.es.json';
import ritualsFrData from './rituals.fr.json';
import ritualsDeData from './rituals.de.json';

type RitualPatch = {
  day: number;
  title?: string;
  home_card_headline?: string;
  today_action_content?: string;
  why_it_matters_content?: string;
  reflection_content?: string;
};
const ritualsPt: RitualPatch[] = ritualsPtData as RitualPatch[];
const ritualsEs: RitualPatch[] = ritualsEsData as RitualPatch[];
const ritualsFr: RitualPatch[] = ritualsFrData as RitualPatch[];
const ritualsDe: RitualPatch[] = ritualsDeData as RitualPatch[];

function applyPtPatch(base: Ritual, patch: RitualPatch): Ritual {
  return {
    ...base,
    ...(patch.title ? { title: patch.title } : {}),
    home_card: {
      ...base.home_card,
      ...(patch.home_card_headline ? { headline: patch.home_card_headline } : {}),
    },
    today_action: {
      ...base.today_action,
      ...(patch.today_action_content ? { content: patch.today_action_content } : {}),
    },
    why_it_matters: {
      ...base.why_it_matters,
      ...(patch.why_it_matters_content ? { content: patch.why_it_matters_content } : {}),
    },
    reflection: {
      ...base.reflection,
      ...(patch.reflection_content ? { content: patch.reflection_content } : {}),
    },
  };
}

export function getDayContent(day: number): Ritual | undefined {
  let base: Ritual | undefined;
  if (day <= 30) {
    base = rituals.find(r => r.day === day);
  } else if (day <= 100) {
    base = dailyResetsExtended.find(r => r.day === day);
  } else {
    // Days 101+: wrap back using days 1-30 cycle
    const wrappedDay = ((day - 1) % 30) + 1;
    base = rituals.find(r => r.day === wrappedDay);
  }

  if (!base) return undefined;

  const normalizedDay = day <= 30 ? day : ((day - 1) % 30) + 1;

  if (getActiveLang() === 'pt') {
    const patch = ritualsPt.find(p => p.day === normalizedDay);
    if (patch) return applyPtPatch(base, patch);
  }

  if (getActiveLang() === 'es') {
    const patch = ritualsEs.find(p => p.day === normalizedDay);
    if (patch) return applyPtPatch(base, patch);
  }

  if (getActiveLang() === 'fr') {
    const patch = ritualsFr.find(p => p.day === normalizedDay);
    if (patch) return applyPtPatch(base, patch);
  }

  if (getActiveLang() === 'de') {
    const patch = ritualsDe.find(p => p.day === normalizedDay);
    if (patch) return applyPtPatch(base, patch);
  }

  return base;
}

// ── Phase helper ──────────────────────────────────────────────────────────────
export function getPhaseForDay(day: number): string {
  if (day <= 7)  return 'beginning';
  if (day <= 21) return 'momentum';
  if (day <= 59) return 'consistency';
  if (day <= 89) return 'transformation';
  return 'identity';
}

// ── Words 365 ─────────────────────────────────────────────────────────────────
import words365Data from './words_365.json';
import wordsPtData from './words_pt.json';
import wordsEsData from './words_es.json';
import wordsFrData from './words_fr.json';
import wordsDeData from './words_de.json';
import type { WordOfDay, ThemeFile } from '../types/content';

export const words365: WordOfDay[] = words365Data.words as WordOfDay[];

type WordPatch = { day: number; word: string; meaning: string };
const wordsPt: WordPatch[] = wordsPtData as WordPatch[];
const wordsEs: WordPatch[] = wordsEsData as WordPatch[];
const wordsFr: WordPatch[] = wordsFrData as WordPatch[];
const wordsDe: WordPatch[] = wordsDeData as WordPatch[];

export function getWordForDay(day: number): WordOfDay {
  const normalizedDay = day > 365 ? ((day - 1) % 365) + 1 : day;
  const base = words365.find(w => w.day === normalizedDay) ?? words365[0];

  if (getActiveLang() === 'pt') {
    const patch = wordsPt.find(w => w.day === normalizedDay);
    if (patch) return { ...base, word: patch.word, meaning: patch.meaning };
  }

  if (getActiveLang() === 'es') {
    const cycledDay = normalizedDay > 30 ? ((normalizedDay - 1) % 30) + 1 : normalizedDay;
    const patch = wordsEs.find(w => w.day === cycledDay);
    if (patch) return { ...base, word: patch.word, meaning: patch.meaning };
  }

  if (getActiveLang() === 'fr') {
    const cycledDay = normalizedDay > 30 ? ((normalizedDay - 1) % 30) + 1 : normalizedDay;
    const patch = wordsFr.find(w => w.day === cycledDay);
    if (patch) return { ...base, word: patch.word, meaning: patch.meaning };
  }

  if (getActiveLang() === 'de') {
    const cycledDay = normalizedDay > 30 ? ((normalizedDay - 1) % 30) + 1 : normalizedDay;
    const patch = wordsDe.find(w => w.day === cycledDay);
    if (patch) return { ...base, word: patch.word, meaning: patch.meaning };
  }

  return base;
}

// ── Theme files ───────────────────────────────────────────────────────────────
import themeFocus from './themes/theme_focus.json';
import themeCalm from './themes/theme_calm.json';
import themeCourage from './themes/theme_courage.json';
import themeRest from './themes/theme_rest.json';
import themeClarity from './themes/theme_clarity.json';
import themeMomentum from './themes/theme_momentum.json';
import themeRhythm from './themes/theme_rhythm.json';

export const themeFiles: Record<string, ThemeFile> = {
  Focus:    themeFocus as ThemeFile,
  Calm:     themeCalm as ThemeFile,
  Courage:  themeCourage as ThemeFile,
  Rest:     themeRest as ThemeFile,
  Clarity:  themeClarity as ThemeFile,
  Momentum: themeMomentum as ThemeFile,
  Rhythm:   themeRhythm as ThemeFile,
};

export function getThemeFile(theme: string): ThemeFile {
  return themeFiles[theme] ?? themeFiles.Focus;
}

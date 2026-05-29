import rawRituals from './rituals.json';

export type RitualTheme = 'Focus' | 'Calm' | 'Courage' | 'Rest' | 'Clarity' | 'Momentum' | 'Discipline' | 'Rhythm';
export type RitualArc = 'RETURNING' | 'STEADYING' | 'REBUILDING' | 'ROOTING' | 'DEEPENING' | 'TRANSFORMING' | 'BECOMING';

export interface RitualArrivalScreen {
  label: string;
  heading: string;
  subheading: string;
}

export interface RitualReleaseScreen {
  label: string;
  heading: string;
  subheading: string;
  field_placeholder: string;
}

export interface RitualBreathScreen {
  label: string;
  heading: string;
  instruction: string;
  cycles: number;
  skip_label: string;
}

export interface RitualIntentionScreen {
  label: string;
  heading: string;
  subheading: string;
  suggested: string;
}

export interface RitualMomentScreen {
  label: string;
  heading: string;
  subheading: string;
}

export interface RitualCompletionScreen {
  label: string;
  heading: string;
  subheading: string;
  button: string;
}

export interface RitualScreens {
  arrival: RitualArrivalScreen;
  release: RitualReleaseScreen;
  breath: RitualBreathScreen;
  intention: RitualIntentionScreen;
  moment: RitualMomentScreen;
  completion: RitualCompletionScreen;
}

export interface RitualHomeCard {
  day_label: string;
  theme_tag: string;
  headline: string;
  duration: string;
}

export interface RitualTextBlock {
  title: string;
  content: string;
}

export interface RitualCompletionMessage {
  day_label: string;
  heading: string;
  subheading: string;
  whats_ahead: string;
}

export interface Ritual {
  id: string;
  day: number;
  theme: RitualTheme;
  arc: RitualArc;
  title: string;
  subtitle: string;
  screens: RitualScreens;
  home_card: RitualHomeCard;
  today_action: RitualTextBlock;
  why_it_matters: RitualTextBlock;
  reflection: RitualTextBlock;
  word_of_day: string;
  notification_copy: string;
  evening_reflection: string;
  completion_message: RitualCompletionMessage;
}

export interface RitualArcMeta {
  days: string;
  theme: string;
}

export interface RitualsData {
  version: string;
  total_days: number;
  arcs: Record<string, RitualArcMeta>;
  rituals: Ritual[];
}

const data = rawRituals as unknown as RitualsData;

export const rituals: Ritual[] = data.rituals;
export const ritualsVersion: string = data.version;

export function getRitualForDay(day: number): Ritual | undefined {
  return rituals.find(r => r.day === day);
}

export function getRitualArc(day: number): RitualArc {
  if (day <= 7) return 'RETURNING';
  if (day <= 14) return 'STEADYING';
  if (day <= 21) return 'REBUILDING';
  return 'ROOTING';
}

export function getRitualWordOfDay(day: number): string {
  const ritual = getRitualForDay(day);
  return ritual?.word_of_day ?? 'PRESENT';
}

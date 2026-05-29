// ─── Progression Engine ───────────────────────────────────────────────────────
// Single source of truth for all user evolution logic.
// Drives: Today, Progress, Profile, Reset Completed.

import { isPt, isEs, isFr, isDe } from './langStore';

const FR_STAGE_LABELS: Record<EvolutionStage, string> = {
  unstoppable: 'Inarrêtable',
  disciplined: 'Discipliné',
  focused:     'Concentré',
  consistent:  'Constant',
  rebuilding:  'En reconstruction',
  stabilizing: 'En stabilisation',
  starting:    'Premier pas',
};

const FR_STAGE_TAGLINES: Record<EvolutionStage, string[]> = {
  unstoppable: ['C\'est de l\'identité maintenant.',          'Tu es devenu celui que tu construisais.'],
  disciplined: ['La discipline est ton état naturel.',        'La discipline ne demande plus d\'effort.'],
  focused:     ['Ta constance est en train de te transformer.', 'Le focus est devenu ta façon d\'être.'],
  consistent:  ['L\'élan est devenu ta normale.',             'La constance est une présence qui s\'accumule.'],
  rebuilding:  ['Le rythme devient routine.',                 'Chaque retour construit quelque chose de réel.'],
  stabilizing: ['La base se forme.',                          'Tes retours prennent forme.'],
  starting:    ['Tout commence en silence.',                  'Un pas est aussi du mouvement.'],
};

const DE_STAGE_LABELS: Record<EvolutionStage, string> = {
  unstoppable: 'Unaufhaltsam',
  disciplined: 'Diszipliniert',
  focused:     'Fokussiert',
  consistent:  'Beständig',
  rebuilding:  'Wiederaufbau',
  stabilizing: 'Stabilisierung',
  starting:    'Erster Schritt',
};

const DE_STAGE_TAGLINES: Record<EvolutionStage, string[]> = {
  unstoppable: ['Das ist jetzt Identität.',                          'Du bist die Person geworden, die du aufgebaut hast.'],
  disciplined: ['Disziplin ist dein natürlicher Zustand.',           'Disziplin braucht keine Anstrengung mehr.'],
  focused:     ['Deine Beständigkeit verändert dich.',               'Fokus ist zu deiner Art geworden.'],
  consistent:  ['Schwung ist zu deiner Normalität geworden.',        'Beständigkeit ist Präsenz, die sich ansammelt.'],
  rebuilding:  ['Rhythmus wird zur Routine.',                        'Jede Rückkehr baut etwas Echtes auf.'],
  stabilizing: ['Die Grundlage formt sich.',                         'Deine Rückkehren nehmen Form an.'],
  starting:    ['Alles beginnt in der Stille.',                      'Ein Schritt ist auch Bewegung.'],
};

const ES_STAGE_LABELS: Record<EvolutionStage, string> = {
  unstoppable: 'Imparable',
  disciplined: 'Disciplinado',
  focused:     'Enfocado',
  consistent:  'Constante',
  rebuilding:  'Reconstruyendo',
  stabilizing: 'Volviendo poco a poco',
  starting:    'Primer día',
};

const ES_STAGE_TAGLINES: Record<EvolutionStage, string[]> = {
  unstoppable: ['Esto es identidad ahora.',              'Te convertiste en quien estabas construyendo.'],
  disciplined: ['La disciplina es tu estado natural.',   'La disciplina ya no necesita esfuerzo.'],
  focused:     ['Tu constancia te está cambiando.',      'El enfoque se volvió tu manera de estar.'],
  consistent:  ['El impulso se volvió tu normalidad.',   'La constancia es presencia que se acumula.'],
  rebuilding:  ['El ritmo se está volviendo rutina.',    'Cada regreso construye algo real.'],
  stabilizing: ['La base se está formando.',             'Tus regresos están tomando forma.'],
  starting:    ['Todo comienza en silencio.',            'Un paso también es movimiento.'],
};

export type EvolutionStage =
  | 'starting'
  | 'stabilizing'
  | 'rebuilding'
  | 'consistent'
  | 'focused'
  | 'disciplined'
  | 'unstoppable';

export interface StageInfo {
  key: EvolutionStage;
  label: string;
  tagline: string;
}

// ── Stage boundaries (based on streak, not currentDay) ────────────────────────
const PT_STAGE_LABELS: Record<EvolutionStage, string> = {
  unstoppable: 'Imparável',
  disciplined: 'Disciplinada',
  focused:     'Focada',
  consistent:  'Constante',
  rebuilding:  'Reconstruindo',
  stabilizing: 'Voltando aos poucos',
  starting:    'Começando',
};

const PT_STAGE_TAGLINES: Record<EvolutionStage, string[]> = {
  unstoppable: ['Isso é identidade agora.',          'Você se tornou quem estava construindo.'],
  disciplined: ['A disciplina é o seu padrão.',      'Disciplina já não precisa de esforço.'],
  focused:     ['Sua constância está te mudando.',   'O foco virou seu jeito de estar.'],
  consistent:  ['O momentum se tornou seu normal.',  'Constância é presença que se acumula.'],
  rebuilding:  ['O ritmo está se tornando rotina.',  'Cada retorno constrói algo real.'],
  stabilizing: ['A base está se formando.',          'Seus retornos estão criando forma.'],
  starting:    ['Tudo começa em silêncio.',          'Um passo também é movimento.'],
};

export function getEvolutionStage(streak: number, seed = 0): StageInfo {
  function mk(key: EvolutionStage, enLabel: string, enTagline: string): StageInfo {
    if (isPt()) {
      const taglines = PT_STAGE_TAGLINES[key];
      return { key, label: PT_STAGE_LABELS[key], tagline: taglines[seed % taglines.length] };
    }
    if (isEs()) {
      const taglines = ES_STAGE_TAGLINES[key];
      return { key, label: ES_STAGE_LABELS[key], tagline: taglines[seed % taglines.length] };
    }
    if (isFr()) {
      const taglines = FR_STAGE_TAGLINES[key];
      return { key, label: FR_STAGE_LABELS[key], tagline: taglines[seed % taglines.length] };
    }
    if (isDe()) {
      const taglines = DE_STAGE_TAGLINES[key];
      return { key, label: DE_STAGE_LABELS[key], tagline: taglines[seed % taglines.length] };
    }
    return { key, label: enLabel, tagline: enTagline };
  }

  if (streak >= 90) return mk('unstoppable', 'Unstoppable', 'This is identity now.');
  if (streak >= 60) return mk('disciplined', 'Disciplined', 'Discipline is your default.');
  if (streak >= 30) return mk('focused',     'Focused',     'Your consistency is changing you.');
  if (streak >= 14) return mk('consistent',  'Consistent',  'Momentum is your new normal.');
  if (streak >= 7)  return mk('rebuilding',  'Rebuilding',  'Momentum is becoming routine.');
  if (streak >= 3)  return mk('stabilizing', 'Stabilizing', 'The foundation is forming.');
  if (streak >= 1)  return mk('starting',    'Starting',    'A quiet beginning.');
  return                    mk('starting',    'Starting',    'One action is enough.');
}

// ── Rotating phrase pools per stage ───────────────────────────────────────────
const stagePhrases: Record<EvolutionStage, string[]> = {
  starting: [
    'The first step matters.',
    'Small beginnings matter.',
    'Every great journey begins with one reset.',
    'You showed up. That is already rare.',
    'Something is quietly shifting.',
  ],
  stabilizing: [
    'Momentum is quietly building.',
    'You are proving something to yourself.',
    'The habit is starting to take shape.',
    'You are becoming someone who follows through.',
    'Consistency is a skill. You are learning it.',
  ],
  rebuilding: [
    'One week changes how you see yourself.',
    'You are not the same person as last week.',
    'This is where most people give up. You didn\'t.',
    'Your discipline is becoming visible.',
    'Consistency is a choice you keep making.',
  ],
  consistent: [
    'Consistency is becoming identity.',
    'Your future is responding to your habits.',
    'Two weeks of showing up. This is rare.',
    'You are building something that lasts.',
    'The compound effect is working for you.',
  ],
  focused: [
    'You are no longer starting — you are continuing.',
    'Focus is your new superpower.',
    'What you\'re building now is permanent.',
    'Real transformation looks exactly like this.',
    'Thirty days rewires the brain.',
  ],
  disciplined: [
    'Discipline now feels natural.',
    'You are becoming harder to distract.',
    'This is not willpower anymore. It\'s who you are.',
    'Your identity has quietly changed.',
    'Sixty days of choosing yourself. Every day.',
  ],
  unstoppable: [
    'This is no longer motivation. This is identity.',
    'You have become the person you were building.',
    'Most people dream about what you\'re doing.',
    'Ninety days of identity, not habit.',
    'This is who you are.',
  ],
};

const stagePhrases_ES: Record<EvolutionStage, string[]> = {
  starting: [
    'El primer paso importa.',
    'Los comienzos pequeños importan.',
    'Todo gran camino empieza con un reset.',
    'Apareciste. Eso ya es algo raro.',
    'Algo está cambiando en silencio.',
  ],
  stabilizing: [
    'El impulso se está formando en silencio.',
    'Te estás demostrando algo.',
    'El hábito está empezando a tomar forma.',
    'Te estás convirtiendo en alguien que cumple.',
    'La constancia es una habilidad. Estás aprendiéndola.',
  ],
  rebuilding: [
    'Una semana cambia cómo te ves a ti mismo.',
    'Ya no eres la misma persona de la semana pasada.',
    'Aquí es donde la mayoría abandona. Tú no.',
    'Tu disciplina se está volviendo visible.',
    'La constancia es una elección que sigues tomando.',
  ],
  consistent: [
    'La constancia se está convirtiendo en identidad.',
    'Tu futuro responde a tus hábitos.',
    'Dos semanas apareciendo. Esto es algo raro.',
    'Estás construyendo algo que dura.',
    'El efecto compuesto está trabajando para ti.',
  ],
  focused: [
    'Ya no estás empezando — estás continuando.',
    'El enfoque es tu nuevo superpoder.',
    'Lo que estás construyendo ahora es permanente.',
    'La transformación real se parece exactamente a esto.',
    'Treinta días recablea el cerebro.',
  ],
  disciplined: [
    'La disciplina se siente natural ahora.',
    'Te estás volviendo más difícil de distraer.',
    'Esto ya no es fuerza de voluntad. Es quien eres.',
    'Tu identidad ha cambiado en silencio.',
    'Sesenta días eligiéndote. Cada día.',
  ],
  unstoppable: [
    'Esto ya no es motivación. Es identidad.',
    'Te convertiste en la persona que estabas construyendo.',
    'La mayoría sueña con lo que tú estás haciendo.',
    'Noventa días de identidad, no de hábito.',
    'Esto es quien eres.',
  ],
};

const stagePhrases_FR: Record<EvolutionStage, string[]> = {
  starting: [
    'Ce premier pas compte.',
    'Les petits débuts comptent.',
    'Tout grand chemin commence par un reset.',
    'Tu t\'es présenté. C\'est déjà rare.',
    'Quelque chose change tranquillement.',
  ],
  stabilizing: [
    'L\'élan se construit silencieusement.',
    'Tu te prouves quelque chose.',
    'L\'habitude commence à prendre forme.',
    'Tu deviens quelqu\'un qui s\'engage.',
    'La constance est une compétence. Tu l\'apprends.',
  ],
  rebuilding: [
    'Une semaine change la façon dont tu te vois.',
    'Tu n\'es plus la même personne que la semaine passée.',
    'C\'est là que la plupart abandonnent. Pas toi.',
    'Ta discipline devient visible.',
    'La constance est un choix que tu continues de faire.',
  ],
  consistent: [
    'La constance est en train de devenir une identité.',
    'Ton futur répond à tes habitudes.',
    'Deux semaines à te présenter. C\'est rare.',
    'Tu construis quelque chose qui dure.',
    'L\'effet composé travaille pour toi.',
  ],
  focused: [
    'Tu ne commences plus — tu continues.',
    'Le focus est ton nouveau pouvoir.',
    'Ce que tu construis maintenant est permanent.',
    'La vraie transformation ressemble exactement à ça.',
    'Trente jours recâblent le cerveau.',
  ],
  disciplined: [
    'La discipline se sent naturelle maintenant.',
    'Tu deviens plus difficile à distraire.',
    'Ce n\'est plus de la volonté. C\'est qui tu es.',
    'Ton identité a changé tranquillement.',
    'Soixante jours à te choisir. Chaque jour.',
  ],
  unstoppable: [
    'Ce n\'est plus de la motivation. C\'est de l\'identité.',
    'Tu es devenu la personne que tu construisais.',
    'La plupart rêvent de ce que tu fais.',
    'Quatre-vingt-dix jours d\'identité, pas d\'habitude.',
    'C\'est qui tu es.',
  ],
};

const stagePhrases_DE: Record<EvolutionStage, string[]> = {
  starting: [
    'Der erste Schritt zählt.',
    'Kleine Anfänge zählen.',
    'Jede große Reise beginnt mit einem Reset.',
    'Du bist erschienen. Das ist schon selten.',
    'Etwas verändert sich still.',
  ],
  stabilizing: [
    'Schwung baut sich still auf.',
    'Du beweist dir selbst etwas.',
    'Die Gewohnheit beginnt Form anzunehmen.',
    'Du wirst jemand, der durchhält.',
    'Beständigkeit ist eine Fähigkeit. Du lernst sie.',
  ],
  rebuilding: [
    'Eine Woche verändert, wie du dich siehst.',
    'Du bist nicht mehr dieselbe Person wie letzte Woche.',
    'Hier geben die meisten auf. Du nicht.',
    'Deine Disziplin wird sichtbar.',
    'Beständigkeit ist eine Wahl, die du weiter triffst.',
  ],
  consistent: [
    'Beständigkeit wird zur Identität.',
    'Deine Zukunft antwortet auf deine Gewohnheiten.',
    'Zwei Wochen dabei bleiben. Das ist selten.',
    'Du baust etwas, das hält.',
    'Der Zinseszinseffekt arbeitet für dich.',
  ],
  focused: [
    'Du fängst nicht mehr an — du machst weiter.',
    'Fokus ist deine neue Stärke.',
    'Was du jetzt aufbaust, ist dauerhaft.',
    'Echte Transformation sieht genau so aus.',
    'Dreißig Tage verdrahten das Gehirn um.',
  ],
  disciplined: [
    'Disziplin fühlt sich jetzt natürlich an.',
    'Du wirst schwerer ablenkbar.',
    'Das ist keine Willenskraft mehr. Das bist du.',
    'Deine Identität hat sich still verändert.',
    'Sechzig Tage, an denen du dich gewählt hast. Jeden Tag.',
  ],
  unstoppable: [
    'Das ist keine Motivation mehr. Das ist Identität.',
    'Du bist die Person geworden, die du aufgebaut hast.',
    'Die meisten träumen von dem, was du tust.',
    'Neunzig Tage Identität, keine Gewohnheit.',
    'Das bist du.',
  ],
};

// seed = currentDay keeps phrases rotating daily without repeating
export function getRotatingPhrase(streak: number, seed: number): string {
  const { key } = getEvolutionStage(streak);
  if (isEs()) {
    const pool = stagePhrases_ES[key];
    return pool[seed % pool.length];
  }
  if (isFr()) {
    const pool = stagePhrases_FR[key];
    return pool[seed % pool.length];
  }
  if (isDe()) {
    const pool = stagePhrases_DE[key];
    return pool[seed % pool.length];
  }
  const pool = stagePhrases[key];
  return pool[seed % pool.length];
}

// ── Milestone labels ───────────────────────────────────────────────────────────
export function getMilestoneLabel(n: number): string {
  const labels: Record<number, string> = {
    3:   'first momentum milestone',
    7:   '7-day streak',
    14:  '2-week milestone',
    21:  '3-week milestone',
    30:  '30-day transformation',
    60:  '2-month milestone',
    90:  '90-day identity milestone',
    100: '100-day milestone',
    180: '6-month milestone',
    365: '1-year milestone',
  };
  return labels[n] ?? `${n}-day milestone`;
}

const PROG_MILESTONES = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];

// ── Dynamic milestone message (shows on milestone days + proximity window) ────
export function getDynamicMilestoneMessage(streak: number): string | null {
  if (streak <= 0) return null;

  if (isPt()) {
    const exactPt: Record<number, string> = {
      3:   'Três dias. O ritmo está se formando.',
      7:   'Uma semana. Algo começou a se firmar.',
      14:  'Duas semanas. O ritmo parece menos distante.',
      21:  'Três semanas. O padrão está aqui.',
      30:  'Um mês. Os retornos viraram continuidade.',
      60:  'Dois meses. Você continuou voltando.',
      90:  'Noventa dias. Algo real foi construído aqui.',
      100: 'Cem dias. Houve presença em cada um.',
      180: 'Meio ano. Um retorno de cada vez.',
      365: 'Um ano inteiro. O espaço continuou aqui.',
    };
    if (exactPt[streak]) return exactPt[streak];
    const nextPt = PROG_MILESTONES.find(m => m > streak);
    if (!nextPt) return null;
    const awayPt = nextPt - streak;
    if (awayPt === 1) return 'Amanhã a jornada continua.';
    if (awayPt === 2) return 'Outro pequeno passo aparece em breve.';
    if (awayPt === 3 && nextPt === 7) return 'Você continua voltando.';
    if (awayPt <= 5 && nextPt <= 30) return 'A continuidade segue.';
    if (awayPt <= 3) return 'O próximo momento chega em breve.';
    return null;
  }

  if (isEs()) {
    const exactEs: Record<number, string> = {
      3:   'Tres días. El ritmo está tomando forma.',
      7:   'Una semana. Algo comenzó a asentarse.',
      14:  'Dos semanas. El ritmo se siente menos lejano.',
      21:  'Tres semanas. El patrón está aquí.',
      30:  'Un mes. Los regresos se convirtieron en continuidad.',
      60:  'Dos meses. Seguiste volviendo.',
      90:  'Noventa días. Algo real fue construido aquí.',
      100: 'Cien días. Hubo presencia en cada uno.',
      180: 'Medio año. Un regreso a la vez.',
      365: 'Un año entero. El espacio se sostuvo.',
    };
    if (exactEs[streak]) return exactEs[streak];
    const nextEs = PROG_MILESTONES.find(m => m > streak);
    if (!nextEs) return null;
    const awayEs = nextEs - streak;
    if (awayEs === 1) return 'La jornada continúa mañana.';
    if (awayEs === 2) return 'Lo siguiente llegará a su tiempo.';
    if (awayEs === 3 && nextEs === 7) return 'Sigues volviendo.';
    if (awayEs <= 5 && nextEs <= 30) return 'La continuidad sigue su curso.';
    if (awayEs <= 3) return 'El próximo momento llega pronto.';
    return null;
  }

  if (isFr()) {
    const exactFr: Record<number, string> = {
      3:   'Trois jours. Le rythme se forme.',
      7:   'Une semaine. Quelque chose a commencé à se stabiliser.',
      14:  'Deux semaines. Le rythme semble moins lointain.',
      21:  'Trois semaines. Le schéma est là.',
      30:  'Un mois. Les retours sont devenus continuité.',
      60:  'Deux mois. Tu as continué à revenir.',
      90:  'Quatre-vingt-dix jours. Quelque chose de réel a été construit ici.',
      100: 'Cent jours. Il y avait de la présence dans chacun.',
      180: 'Six mois. Un retour à la fois.',
      365: 'Une année entière. L\'espace a tenu.',
    };
    if (exactFr[streak]) return exactFr[streak];
    const nextFr = PROG_MILESTONES.find(m => m > streak);
    if (!nextFr) return null;
    const awayFr = nextFr - streak;
    if (awayFr === 1) return 'Le chemin continue demain.';
    if (awayFr === 2) return 'Le prochain moment arrive bientôt.';
    if (awayFr === 3 && nextFr === 7) return 'Tu continues à revenir.';
    if (awayFr <= 5 && nextFr <= 30) return 'La continuité se déploie.';
    if (awayFr <= 3) return 'Le prochain moment arrive bientôt.';
    return null;
  }

  if (isDe()) {
    const exactDe: Record<number, string> = {
      3:   'Drei Tage. Der Rhythmus formt sich.',
      7:   'Eine Woche. Etwas hat sich zu setzen begonnen.',
      14:  'Zwei Wochen. Der Rhythmus fühlt sich weniger weit weg an.',
      21:  'Drei Wochen. Das Muster ist da.',
      30:  'Ein Monat. Rückkehren wurde zur Kontinuität.',
      60:  'Zwei Monate. Du bist weiter zurückgekommen.',
      90:  'Neunzig Tage. Hier wurde etwas Echtes aufgebaut.',
      100: 'Hundert Tage. In jedem war Präsenz.',
      180: 'Ein halbes Jahr. Eine Rückkehr nach der anderen.',
      365: 'Ein ganzes Jahr. Der Raum hat gehalten.',
    };
    if (exactDe[streak]) return exactDe[streak];
    const nextDe = PROG_MILESTONES.find(m => m > streak);
    if (!nextDe) return null;
    const awayDe = nextDe - streak;
    if (awayDe === 1) return 'Die Reise geht morgen weiter.';
    if (awayDe === 2) return 'Der nächste Moment kommt bald.';
    if (awayDe === 3 && nextDe === 7) return 'Du kommst weiter zurück.';
    if (awayDe <= 5 && nextDe <= 30) return 'Die Kontinuität entfaltet sich.';
    if (awayDe <= 3) return 'Der nächste Moment kommt bald.';
    return null;
  }

  const exact: Record<number, string> = {
    3:   'Three days. The rhythm is forming.',
    7:   'One week. Something began to settle.',
    14:  'Two weeks. The rhythm feels less distant.',
    21:  'Three weeks. The pattern is here.',
    30:  'One month. Returns became continuity.',
    60:  'Two months. You kept coming back.',
    90:  'Ninety days. Something real was built here.',
    100: 'One hundred days. There was presence in each one.',
    180: 'Half a year. One return at a time.',
    365: 'One full year. The space held.',
  };
  if (exact[streak]) return exact[streak];

  const next = PROG_MILESTONES.find(m => m > streak);
  if (!next) return null;
  const away = next - streak;

  if (away === 1) return 'The journey continues tomorrow.';
  if (away === 2) return 'Another small step is near.';
  if (away <= 5 && next <= 30) return 'Continuity is unfolding.';
  if (away <= 3) return 'The next moment arrives soon.';

  return null;
}

// ── Return-after-absence detection ────────────────────────────────────────────
// True when the user has prior completions but broke their streak
export function didReturnAfterAbsence(completedDays: number[], currentDay: number): boolean {
  if (completedDays.length === 0) return false;
  return !completedDays.includes(currentDay - 1);
}

// ── Emotional Progression Phases (Prompt 10 Section 3) ────────────────────────
// Phases based on total completed days (never resets on comebacks).
// Emotional language evolves as the user deepens their practice.

export type EmotionalPhase =
  | 'beginning'
  | 'breathing'
  | 'rhythm'
  | 'grounding'
  | 'rebuilding'
  | 'continuity'
  | 'roots';

export function getEmotionalPhase(totalCompletedDays: number): EmotionalPhase {
  if (totalCompletedDays >= 90) return 'roots';
  if (totalCompletedDays >= 60) return 'continuity';
  if (totalCompletedDays >= 30) return 'rebuilding';
  if (totalCompletedDays >= 14) return 'grounding';
  if (totalCompletedDays >= 7)  return 'rhythm';
  if (totalCompletedDays >= 3)  return 'breathing';
  return 'beginning';
}

// Continuity phrases — short, quiet references to the user's journey.
// Used in Today screen to create the "app accompanies me" feeling.

const CONTINUITY_PHRASES: Record<EmotionalPhase, { en: string; pt: string; es: string; fr: string; de: string }> = {
  beginning:   { en: 'You started something.',                   pt: 'Você começou algo.',                    es: 'Empezaste algo.',                          fr: 'Tu as commencé quelque chose.',                       de: 'Du hast etwas begonnen.' },
  breathing:   { en: 'Something is beginning to settle.',        pt: 'Algo está começando a se firmar.',      es: 'Algo empieza a asentarse.',                fr: 'Quelque chose commence à se stabiliser.',              de: 'Etwas beginnt sich zu setzen.' },
  rhythm:      { en: 'The rhythm reappeared.',                   pt: 'O ritmo reapareceu.',                   es: 'El ritmo reapareció.',                     fr: 'Le rythme est réapparu.',                             de: 'Der Rhythmus ist zurückgekehrt.' },
  grounding:   { en: 'Something is becoming steadier.',          pt: 'Algo está ficando mais estável.',       es: 'Algo se está volviendo más estable.',      fr: 'Quelque chose devient plus stable.',                  de: 'Etwas wird stabiler.' },
  rebuilding:  { en: 'You continued showing up.',                pt: 'Você continuou aparecendo.',            es: 'Seguiste apareciendo.',                    fr: 'Tu as continué à te présenter.',                      de: 'Du bist weiter erschienen.' },
  continuity:  { en: 'The space feels more familiar now.',       pt: 'O espaço parece mais familiar agora.', es: 'Este espacio se siente más familiar ahora.', fr: 'Cet espace te semble plus familier maintenant.',     de: 'Dieser Raum fühlt sich vertrauter an.' },
  roots:       { en: 'You did not give up on yourself.',         pt: 'Você não desistiu de si.',              es: 'No te rendiste contigo mismo.',            fr: 'Tu ne t\'es pas abandonné.',                          de: 'Du hast dich nicht aufgegeben.' },
};

export function getContinuityPhrase(totalCompletedDays: number): { en: string; pt: string; es: string; fr: string; de: string } {
  const phase = getEmotionalPhase(totalCompletedDays);
  return CONTINUITY_PHRASES[phase];
}

// ── Emotional state detection ─────────────────────────────────────────────────
export type EmotionalState = 'beginner' | 'returning' | 'building' | 'struggling' | 'momentum';

export function getEmotionalState(
  streak: number,
  completedDays: number[],
  weeklyScore: number
): EmotionalState {
  if (completedDays.length === 0) return 'beginner';
  if (streak === 0) return 'returning';
  if (streak >= 14 || weeklyScore >= 6) return 'momentum';
  if (weeklyScore <= 1 && completedDays.length >= 5) return 'struggling';
  return 'building';
}

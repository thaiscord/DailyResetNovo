// ─── Anticipation Engine ──────────────────────────────────────────────────────
// Transforms the app from "today only" into "an unfolding emotional journey."
// Every function answers: what is the user moving toward?
//
// Design rules:
// — Never pressure. Never shame. Never urgency.
// — The future should feel alive, not demanding.
// — Locked things should feel earned, not blocked.
// — Mystery creates curiosity without anxiety.

import type { EmotionalProfile } from './emotionalProfile';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Journey Chapters ─────────────────────────────────────────────────────────
// The user's journey is framed as emotional chapters, not achievements.
// Chapters are named for how the experience FEELS, not what was accomplished.

export interface JourneyChapter {
  id:                 string;
  name:               string;        // "Momentum Forming"
  eyebrow:            string;        // "CHAPTER 3"
  tagline:            string;        // "Something is shifting."
  description:        string;        // longer emotional context
  dayRange:           [number, number | null];
  nextChapterTeaser:  string;        // what's quietly approaching
  ritualHint:         string;        // how rituals evolve in this chapter
  mysteryHint:        string | null; // soft undefined anticipation
}

const CHAPTER_TIMELINE: JourneyChapter[] = [
  {
    id:               'first-steps',
    name:             'First Steps',
    eyebrow:          'CHAPTER 1',
    tagline:          'Every beginning matters.',
    description:      'You are doing something most people never start.',
    dayRange:         [0, 3],
    nextChapterTeaser:'A rhythm begins forming ahead.',
    ritualHint:       'Your rituals deepen as you return.',
    mysteryHint:      'Something shifts on Day 7.',
  },
  {
    id:               'finding-rhythm',
    name:             'Finding Rhythm',
    eyebrow:          'CHAPTER 2',
    tagline:          'The pattern is waking up.',
    description:      'Repetition is doing something invisible — and real.',
    dayRange:         [4, 7],
    nextChapterTeaser:'Momentum arrives quietly.',
    ritualHint:       'A new ritual focus arrives this week.',
    mysteryHint:      'A deeper layer opens on Day 14.',
  },
  {
    id:               'momentum-forming',
    name:             'Momentum Forming',
    eyebrow:          'CHAPTER 3',
    tagline:          'Something is shifting.',
    description:      'What started as effort is becoming familiar.',
    dayRange:         [8, 14],
    nextChapterTeaser:'Trust begins rebuilding ahead.',
    ritualHint:       'Your ritual is entering a deeper phase.',
    mysteryHint:      'Your third week brings something new.',
  },
  {
    id:               'rebuilding-trust',
    name:             'Rebuilding Trust',
    eyebrow:          'CHAPTER 4',
    tagline:          'Consistency is becoming visible.',
    description:      'You are keeping quiet promises to yourself.',
    dayRange:         [15, 21],
    nextChapterTeaser:'Clarity is on its way.',
    ritualHint:       'Ritual depth grows with your consistency.',
    mysteryHint:      'Day 30 changes something quietly.',
  },
  {
    id:               'emotional-clarity',
    name:             'Emotional Clarity',
    eyebrow:          'CHAPTER 5',
    tagline:          'Clarity is arriving slowly.',
    description:      'The fog is lifting — not because you forced it.',
    dayRange:         [22, 30],
    nextChapterTeaser:'Discipline goes quiet ahead.',
    ritualHint:       'Your rituals are now shaped by your journey.',
    mysteryHint:      'At Day 60, something becomes effortless.',
  },
  {
    id:               'quiet-discipline',
    name:             'Quiet Discipline',
    eyebrow:          'CHAPTER 6',
    tagline:          'Effort is becoming instinct.',
    description:      'What once required willpower is now simply who you are.',
    dayRange:         [31, 60],
    nextChapterTeaser:'Identity is returning.',
    ritualHint:       'Every ritual carries your history now.',
    mysteryHint:      'Day 90 is a turning point.',
  },
  {
    id:               'identity-returning',
    name:             'Identity Returning',
    eyebrow:          'CHAPTER 7',
    tagline:          'Who you are becoming is visible.',
    description:      'The version of you that kept showing up is here.',
    dayRange:         [61, 90],
    nextChapterTeaser:'Stability deepens ahead.',
    ritualHint:       'Rituals are now a language your body understands.',
    mysteryHint:      null,
  },
  {
    id:               'inner-stability',
    name:             'Inner Stability',
    eyebrow:          'CHAPTER 8',
    tagline:          'You carry stillness within you.',
    description:      'Consistency has become your natural state.',
    dayRange:         [91, 180],
    nextChapterTeaser:'Something final completes.',
    ritualHint:       'Each ritual deepens what is already yours.',
    mysteryHint:      null,
  },
  {
    id:               'transformation',
    name:             'Transformation',
    eyebrow:          'CHAPTER 9',
    tagline:          'You have rebuilt yourself.',
    description:      'Not through force — through daily return.',
    dayRange:         [181, null],
    nextChapterTeaser:'',
    ritualHint:       'Rituals are now a conversation with who you have become.',
    mysteryHint:      null,
  },
];

const CHAPTER_TAGLINE_FR: Record<string, string> = {
  'first-steps':        'Chaque début compte.',
  'finding-rhythm':     'Le schéma s\'éveille.',
  'momentum-forming':   'Quelque chose se transforme.',
  'rebuilding-trust':   'La constance devient visible.',
  'emotional-clarity':  'La clarté arrive doucement.',
  'quiet-discipline':   'L\'effort devient instinct.',
  'identity-returning': 'Ce que tu deviens est visible.',
  'inner-stability':    'Tu portes la tranquillité en toi.',
  'transformation':     'Tu t\'es reconstruit.',
};

const CHAPTER_EYEBROW_FR: Record<string, string> = {
  'first-steps':        'CHAPITRE 1',
  'finding-rhythm':     'CHAPITRE 2',
  'momentum-forming':   'CHAPITRE 3',
  'rebuilding-trust':   'CHAPITRE 4',
  'emotional-clarity':  'CHAPITRE 5',
  'quiet-discipline':   'CHAPITRE 6',
  'identity-returning': 'CHAPITRE 7',
  'inner-stability':    'CHAPITRE 8',
  'transformation':     'CHAPITRE 9',
};

const CHAPTER_EYEBROW_PT: Record<string, string> = {
  'first-steps':        'CAPÍTULO 1',
  'finding-rhythm':     'CAPÍTULO 2',
  'momentum-forming':   'CAPÍTULO 3',
  'rebuilding-trust':   'CAPÍTULO 4',
  'emotional-clarity':  'CAPÍTULO 5',
  'quiet-discipline':   'CAPÍTULO 6',
  'identity-returning': 'CAPÍTULO 7',
  'inner-stability':    'CAPÍTULO 8',
  'transformation':     'CAPÍTULO 9',
};
const CHAPTER_TAGLINE_PT: Record<string, string> = {
  'first-steps':        'Todo começo importa.',
  'finding-rhythm':     'O padrão está despertando.',
  'momentum-forming':   'Algo está mudando.',
  'rebuilding-trust':   'A constância está se tornando visível.',
  'emotional-clarity':  'A clareza está chegando aos poucos.',
  'quiet-discipline':   'O esforço está se tornando instinto.',
  'identity-returning': 'Quem você está se tornando é visível.',
  'inner-stability':    'Você carrega a quietude dentro de você.',
  'transformation':     'Você se reconstruiu.',
};

const CHAPTER_EYEBROW_ES: Record<string, string> = {
  'first-steps':        'CAPÍTULO 1',
  'finding-rhythm':     'CAPÍTULO 2',
  'momentum-forming':   'CAPÍTULO 3',
  'rebuilding-trust':   'CAPÍTULO 4',
  'emotional-clarity':  'CAPÍTULO 5',
  'quiet-discipline':   'CAPÍTULO 6',
  'identity-returning': 'CAPÍTULO 7',
  'inner-stability':    'CAPÍTULO 8',
  'transformation':     'CAPÍTULO 9',
};
const CHAPTER_TAGLINE_ES: Record<string, string> = {
  'first-steps':        'Cada comienzo importa.',
  'finding-rhythm':     'El patrón está despertando.',
  'momentum-forming':   'Algo está cambiando.',
  'rebuilding-trust':   'La constancia se está volviendo visible.',
  'emotional-clarity':  'La claridad llega despacio.',
  'quiet-discipline':   'El esfuerzo se está volviendo instinto.',
  'identity-returning': 'Quien te estás convirtiendo es visible.',
  'inner-stability':    'Llevas la tranquilidad dentro de ti.',
  'transformation':     'Te has reconstruido.',
};

const CHAPTER_EYEBROW_DE: Record<string, string> = {
  'first-steps':        'KAPITEL 1',
  'finding-rhythm':     'KAPITEL 2',
  'momentum-forming':   'KAPITEL 3',
  'rebuilding-trust':   'KAPITEL 4',
  'emotional-clarity':  'KAPITEL 5',
  'quiet-discipline':   'KAPITEL 6',
  'identity-returning': 'KAPITEL 7',
  'inner-stability':    'KAPITEL 8',
  'transformation':     'KAPITEL 9',
};
const CHAPTER_TAGLINE_DE: Record<string, string> = {
  'first-steps':        'Jeder Anfang zählt.',
  'finding-rhythm':     'Das Muster erwacht.',
  'momentum-forming':   'Etwas verändert sich.',
  'rebuilding-trust':   'Beständigkeit wird sichtbar.',
  'emotional-clarity':  'Klarheit kommt langsam.',
  'quiet-discipline':   'Anstrengung wird Instinkt.',
  'identity-returning': 'Wer du wirst, ist sichtbar.',
  'inner-stability':    'Du trägst Stille in dir.',
  'transformation':     'Du hast dich neu aufgebaut.',
};

export function getLocalizedChapter(chapter: JourneyChapter): JourneyChapter {
  if (isPt()) {
    return {
      ...chapter,
      eyebrow: CHAPTER_EYEBROW_PT[chapter.id] ?? chapter.eyebrow,
      tagline: CHAPTER_TAGLINE_PT[chapter.id] ?? chapter.tagline,
    };
  }
  if (isEs()) {
    return {
      ...chapter,
      eyebrow: CHAPTER_EYEBROW_ES[chapter.id] ?? chapter.eyebrow,
      tagline: CHAPTER_TAGLINE_ES[chapter.id] ?? chapter.tagline,
    };
  }
  if (isFr()) {
    return {
      ...chapter,
      name: CHAPTER_NAME_FR[chapter.name] ?? chapter.name,
      eyebrow: CHAPTER_EYEBROW_FR[chapter.id] ?? chapter.eyebrow,
      tagline: CHAPTER_TAGLINE_FR[chapter.id] ?? chapter.tagline,
    };
  }
  if (isDe()) {
    return {
      ...chapter,
      eyebrow: CHAPTER_EYEBROW_DE[chapter.id] ?? chapter.eyebrow,
      tagline: CHAPTER_TAGLINE_DE[chapter.id] ?? chapter.tagline,
    };
  }
  return chapter;
}

export function getJourneyChapter(totalDays: number): JourneyChapter {
  for (const chapter of CHAPTER_TIMELINE) {
    const [min, max] = chapter.dayRange;
    if (max === null || totalDays <= max) return chapter;
    if (totalDays >= min) continue;
  }
  // Fallback: last chapter
  return CHAPTER_TIMELINE[CHAPTER_TIMELINE.length - 1];
}

export function getNextChapter(totalDays: number): JourneyChapter | null {
  const current = getJourneyChapter(totalDays);
  const idx = CHAPTER_TIMELINE.findIndex(c => c.id === current.id);
  return CHAPTER_TIMELINE[idx + 1] ?? null;
}

// Days remaining until the next chapter begins
export function getDaysUntilNextChapter(totalDays: number): number | null {
  const current = getJourneyChapter(totalDays);
  if (current.dayRange[1] === null) return null;
  return current.dayRange[1] - totalDays + 1;
}

// ─── Unlock Preview ───────────────────────────────────────────────────────────
// Features that unlock feel earned, not blocked.
// Copy creates curiosity and readiness, not frustration.

export function getUnlockPreview(totalDays: number): string | null {
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  if (totalDays < 7) {
    const daysLeft = 7 - totalDays;
    if (pt) return daysLeft === 1
      ? 'Seus hábitos desbloqueiam amanhã. A base está pronta.'
      : `Seus hábitos desbloqueiam em ${daysLeft} dias. A base está se formando quietamente.`;
    if (es) return daysLeft === 1
      ? 'Tus hábitos se desbloquean mañana. La base está lista.'
      : `Tus hábitos se desbloquean en ${daysLeft} días. La base se está formando en silencio.`;
    if (fr) return daysLeft === 1
      ? 'Tes habitudes se débloquent demain. La base est prête.'
      : `Tes habitudes se débloquent dans ${daysLeft} jours. La base se forme tranquillement.`;
    return daysLeft === 1
      ? 'Your habits unlock tomorrow. The foundation is ready.'
      : `Your habits unlock in ${daysLeft} days. The foundation is quietly forming.`;
  }
  if (totalDays < 14) {
    if (pt) return 'Seu primeiro resumo semanal chega neste domingo.';
    if (es) return 'Tu primer resumen semanal llega este domingo.';
    if (fr) return 'Ton premier récap hebdomadaire arrive ce dimanche.';
    return 'Your first weekly recap arrives this Sunday.';
  }
  if (totalDays < 21) {
    if (pt) return 'Um estilo de reflexão mais profundo está se abrindo esta semana.';
    if (es) return 'Un estilo de reflexión más profundo se está abriendo esta semana.';
    if (fr) return 'Un style de réflexion plus profond s\'ouvre cette semaine.';
    return 'A deeper reflection style is opening this week.';
  }
  if (totalDays < 30) {
    if (pt) return 'Os padrões emocionais semanais estão se tornando visíveis.';
    if (es) return 'Los patrones emocionales semanales se están volviendo visibles.';
    if (fr) return 'Les schémas émotionnels hebdomadaires deviennent visibles.';
    return 'Weekly emotional patterns are becoming visible.';
  }
  return null;
}

// ─── Ritual Evolution Preview ─────────────────────────────────────────────────
// Users feel their rituals evolve — creating ritual anticipation.

export function getRitualEvolutionPreview(totalDays: number): string {
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  if (totalDays < 4)  return pt ? 'Seus rituais se aprofundam conforme você retorna.' : es ? 'Tus rituales se fortalecen cada vez que vuelves.' : fr ? 'Tes rituels s\'approfondissent à chaque retour.' : 'Your rituals deepen as you return.';
  if (totalDays < 8)  return pt ? 'Um novo foco de ritual chega esta semana.' : es ? 'Un nuevo enfoque de ritual llega esta semana.' : fr ? 'Un nouvel angle de rituel arrive cette semaine.' : 'A new ritual focus arrives this week.';
  if (totalDays < 15) return pt ? 'Seu ritual está entrando em uma fase mais profunda.' : es ? 'Tu ritual está entrando en una fase más profunda.' : fr ? 'Ton rituel entre dans une phase plus profonde.' : 'Your ritual is entering a deeper phase.';
  if (totalDays < 22) return pt ? 'A profundidade do ritual cresce com sua constância.' : es ? 'La profundidad del ritual crece con tu constancia.' : fr ? 'La profondeur du rituel grandit avec ta constance.' : 'Ritual depth grows with your consistency.';
  if (totalDays < 31) return pt ? 'Seus rituais agora são moldados pela sua jornada.' : es ? 'Tus rituales están moldeados por tu jornada ahora.' : fr ? 'Tes rituels sont maintenant façonnés par ton chemin.' : 'Your rituals are now shaped by your journey.';
  return pt ? 'Cada ritual carrega sua história agora.' : es ? 'Cada ritual lleva tu historia ahora.' : fr ? 'Chaque rituel porte ton histoire maintenant.' : 'Every ritual carries your history now.';
}

// ─── Quiet Mystery ────────────────────────────────────────────────────────────
// Some anticipation stays emotionally undefined.
// Curiosity increases retention without pressure.

export function getQuietMystery(totalDays: number): string | null {
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  if (totalDays < 4)  return pt ? 'Algo muda no Dia 7.' : es ? 'Algo cambia en el Día 7.' : fr ? 'Quelque chose change au Jour 7.' : 'Something shifts on Day 7.';
  if (totalDays < 8)  return pt ? 'Uma camada mais profunda se abre no Dia 14.' : es ? 'Una capa más profunda se abre en el Día 14.' : fr ? 'Une couche plus profonde s\'ouvre au Jour 14.' : 'A deeper layer opens on Day 14.';
  if (totalDays < 15) return pt ? 'Sua terceira semana traz algo novo.' : es ? 'Tu tercera semana trae algo nuevo.' : fr ? 'Ta troisième semaine apporte quelque chose de nouveau.' : 'Your third week brings something new.';
  if (totalDays < 22) return pt ? 'O Dia 30 muda algo quietamente.' : es ? 'El Día 30 cambia algo en silencio.' : fr ? 'Le Jour 30 change quelque chose tranquillement.' : 'Day 30 changes something quietly.';
  if (totalDays < 31) return pt ? 'No Dia 60, algo se torna fácil.' : es ? 'En el Día 60, algo se vuelve fácil.' : fr ? 'Au Jour 60, quelque chose devient naturel.' : 'At Day 60, something becomes effortless.';
  if (totalDays < 61) return pt ? 'O Dia 90 é um ponto de virada.' : es ? 'El Día 90 es un punto de inflexión.' : fr ? 'Le Jour 90 est un tournant.' : 'Day 90 is a turning point.';
  return null;
}

// ─── Chapter Progression Preview ─────────────────────────────────────────────
// Shown near milestones — soft forward pull.

const CHAPTER_NAME_PT: Record<string, string> = {
  'First Steps':        'Primeiros Passos',
  'Finding Rhythm':     'Encontrando Ritmo',
  'Momentum Forming':   'Impulso se Formando',
  'Rebuilding Trust':   'Reconstruindo Confiança',
  'Emotional Clarity':  'Clareza Emocional',
  'Quiet Discipline':   'Disciplina Quieta',
  'Identity Returning': 'Identidade Retornando',
  'Inner Stability':    'Estabilidade Interior',
  'Transformation':     'Transformação',
};

const CHAPTER_NAME_ES: Record<string, string> = {
  'First Steps':        'Primeros Pasos',
  'Finding Rhythm':     'Encontrando el Ritmo',
  'Momentum Forming':   'El Impulso Toma Forma',
  'Rebuilding Trust':   'Reconstruyendo la Confianza',
  'Emotional Clarity':  'Claridad Emocional',
  'Quiet Discipline':   'Disciplina Silenciosa',
  'Identity Returning': 'La Identidad Regresa',
  'Inner Stability':    'Estabilidad Interior',
  'Transformation':     'Transformación',
};

const CHAPTER_NAME_FR: Record<string, string> = {
  'First Steps':        'Premiers Pas',
  'Finding Rhythm':     'Trouver le Rythme',
  'Momentum Forming':   "L'Élan Prend Forme",
  'Rebuilding Trust':   'Reconstruire la Confiance',
  'Emotional Clarity':  'Clarté Émotionnelle',
  'Quiet Discipline':   'Discipline Tranquille',
  'Identity Returning': "L'Identité Revient",
  'Inner Stability':    'Stabilité Intérieure',
  'Transformation':     'Transformation',
};

export function getChapterProgressionPreview(totalDays: number): string | null {
  const daysLeft = getDaysUntilNextChapter(totalDays);
  const next = getNextChapter(totalDays);
  if (!next || daysLeft === null) return null;
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  const name = pt ? (CHAPTER_NAME_PT[next.name] ?? next.name) : es ? (CHAPTER_NAME_ES[next.name] ?? next.name) : fr ? (CHAPTER_NAME_FR[next.name] ?? next.name) : next.name;
  if (daysLeft === 1) return pt ? `${name} começa amanhã.` : es ? `${name} comienza mañana.` : fr ? `${name} commence demain.` : `${name} begins tomorrow.`;
  if (daysLeft <= 3)  return pt ? `${name} chega em ${daysLeft} dias.` : es ? `Tu ritmo empieza a tomar forma en ${daysLeft} días.` : fr ? `${name} arrive dans ${daysLeft} jours.` : `${name} arrives in ${daysLeft} days.`;
  if (daysLeft <= 7)  return pt ? `Seu próximo capítulo se aproxima: ${name}.` : es ? `Tu próximo capítulo se acerca: ${name}.` : fr ? `Ton prochain chapitre approche : ${name}.` : `Your next chapter approaches: ${name}.`;
  return null;
}

// ─── Milestone Anticipation ───────────────────────────────────────────────────
// Build anticipation BEFORE milestones — not only after.

const MILESTONE_NAMES: Record<number, string> = {
  3: 'Momentum Forming', 7: 'One Week', 14: 'Two Weeks',
  21: 'Three Weeks', 30: 'One Month', 60: 'Two Months',
  90: 'Three Months', 100: 'One Hundred Days', 180: 'Half a Year', 365: 'A Full Year',
};

const MILESTONE_NAMES_PT: Record<number, string> = {
  3: 'Ritmo se Formando', 7: 'Uma Semana', 14: 'Duas Semanas',
  21: 'Três Semanas', 30: 'Um Mês', 60: 'Dois Meses',
  90: 'Três Meses', 100: 'Cem Dias', 180: 'Meio Ano', 365: 'Um Ano Inteiro',
};

const MILESTONE_NAMES_ES: Record<number, string> = {
  3: 'El Ritmo Toma Forma', 7: 'Una Semana', 14: 'Dos Semanas',
  21: 'Tres Semanas', 30: 'Un Mes', 60: 'Dos Meses',
  90: 'Tres Meses', 100: 'Cien Días', 180: 'Medio Año', 365: 'Un Año Entero',
};

const MILESTONE_NAMES_FR: Record<number, string> = {
  3: "L'Élan Prend Forme", 7: 'Une Semaine', 14: 'Deux Semaines',
  21: 'Trois Semaines', 30: 'Un Mois', 60: 'Deux Mois',
  90: 'Trois Mois', 100: 'Cent Jours', 180: 'Six Mois', 365: 'Une Année Entière',
};

export function getMilestoneAnticipation(
  streak: number,
  nextMilestone: number | null,
  daysToNext: number | null,
): string | null {
  if (!nextMilestone || !daysToNext) return null;
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  const name   = MILESTONE_NAMES[nextMilestone];
  const namePt = MILESTONE_NAMES_PT[nextMilestone];
  const nameEs = MILESTONE_NAMES_ES[nextMilestone];
  const nameFr = MILESTONE_NAMES_FR[nextMilestone];
  if (daysToNext === 1) {
    if (pt) return namePt ? `Amanhã é o seu momento de ${namePt}.` : 'Seu próximo capítulo completa amanhã.';
    if (es) return nameEs ? `Mañana es tu momento de ${nameEs}.` : 'Tu próximo capítulo completa mañana.';
    if (fr) return nameFr ? `Demain est ton moment de ${nameFr}.` : 'Ton prochain chapitre se complète demain.';
    return name ? `Tomorrow is your ${name} moment.` : 'Your next chapter completes tomorrow.';
  }
  if (daysToNext === 2) {
    if (pt) return `Em 2 dias, algo muda: ${namePt ?? 'seu próximo marco'}.`;
    if (es) return `En 2 días, algo cambia: ${nameEs ?? 'tu próximo hito'}.`;
    if (fr) return `Dans 2 jours, quelque chose change : ${nameFr ?? 'ton prochain jalon'}.`;
    return `In 2 days, something changes: ${name ?? 'your next milestone'}.`;
  }
  if (daysToNext === 3) {
    if (pt) return `3 dias para seu próximo marco.`;
    if (es) return `3 días para tu próximo hito.`;
    if (fr) return `3 jours avant ton prochain jalon.`;
    return `3 days until your next milestone.`;
  }
  return null;
}

// ─── Return Safety Messages ───────────────────────────────────────────────────
// If users disappear, the future system must not punish them.
// Critical for burnout users. Never: "You lost your streak."

const RETURN_SAFETY: Record<EmotionalProfile, string[]> = {
  focus: [
    'Your focus returns with one reset. Nothing is lost.',
    'One return rebuilds the momentum.',
    'Your attention finds its direction again — one day at a time.',
    'No restart needed. Just return.',
  ],
  calm: [
    'You can return softly. No rush.',
    'Your peace is still here. It never left.',
    'A quiet return is always enough.',
    'Stillness welcomes you back.',
  ],
  confidence: [
    'Your progress is still valid. Come back when you\'re ready.',
    'Trust is rebuilt one return at a time.',
    'Returning is the most trustworthy thing you can do.',
    'Nothing has been lost. Your journey continues.',
  ],
  burnout: [
    'Nothing is lost. Your chapter still waits for you.',
    'You can return gently — no restart needed.',
    'We can continue quietly, whenever you\'re ready.',
    'Your next chapter still waits for you.',
  ],
};

const RETURN_SAFETY_ES: Record<EmotionalProfile, string[]> = {
  focus: [
    'Tu enfoque regresa con un solo reset. Nada se ha perdido.',
    'Un regreso reconstruye el impulso.',
    'Tu atención encuentra su dirección — un día a la vez.',
    'No necesitas empezar de nuevo. Solo volver.',
  ],
  calm: [
    'Puedes volver suavemente. Sin prisa.',
    'Tu paz sigue aquí. Nunca se fue.',
    'Un regreso tranquilo siempre es suficiente.',
    'La quietud te da la bienvenida.',
  ],
  confidence: [
    'Tu progreso sigue siendo válido. Vuelve cuando estés listo.',
    'La confianza se reconstruye un regreso a la vez.',
    'Volver es lo más confiable que puedes hacer.',
    'Nada se ha perdido. Tu jornada continúa.',
  ],
  burnout: [
    'Nada se ha perdido. Tu capítulo todavía te espera.',
    'Puedes volver con gentileza — sin necesidad de empezar de nuevo.',
    'Podemos continuar en silencio, cuando estés listo.',
    'Tu próximo capítulo todavía te espera.',
  ],
};

const RETURN_SAFETY_FR: Record<EmotionalProfile, string[]> = {
  focus: [
    'Ton focus revient avec un seul reset. Rien n\'est perdu.',
    'Un retour suffit à relancer l\'élan.',
    'Ton attention retrouve sa direction — un jour à la fois.',
    'Pas besoin de recommencer. Juste revenir.',
  ],
  calm: [
    'Tu peux revenir doucement. Sans pression.',
    'Ta paix est toujours là. Elle n\'est pas partie.',
    'Un retour tranquille est toujours suffisant.',
    'Le calme t\'accueille.',
  ],
  confidence: [
    'Ton progrès reste valide. Reviens quand le moment sera juste.',
    'La confiance se reconstruit un retour à la fois.',
    'Revenir est la chose la plus solide que tu puisses faire.',
    'Rien n\'est perdu. Ton chemin continue.',
  ],
  burnout: [
    'Rien n\'est perdu. Ton chapitre t\'attend toujours.',
    'Tu peux revenir doucement — sans tout recommencer.',
    'On peut continuer tranquillement, quand tu seras prêt.',
    'Ton prochain chapitre t\'attend toujours.',
  ],
};

function pick<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

export function getReturnSafetyMessage(
  profile: EmotionalProfile,
  seed = 0,
): string {
  if (isEs()) return pick(RETURN_SAFETY_ES[profile], seed);
  if (isFr()) return pick(RETURN_SAFETY_FR[profile], seed);
  return pick(RETURN_SAFETY[profile], seed);
}

// ─── Next Step Energy ─────────────────────────────────────────────────────────
// Every screen quietly answers: "What comes next?"

export type AppScreen = 'today' | 'progress' | 'mindset' | 'habits' | 'profile' | 'completion';

export function getNextStepCopy(
  screen: AppScreen,
  totalDays: number,
  profile: EmotionalProfile | null,
): string {
  const chapter = getJourneyChapter(totalDays);
  const es = isEs();
  const pt = isPt();
  const fr = isFr();

  switch (screen) {
    case 'today':
      if (es) return totalDays < 7 ? 'El reset de mañana ya se está preparando.' : 'Cada regreso da forma a lo que viene después.';
      if (pt) return totalDays < 7 ? 'O reset de amanhã já está se preparando.' : 'Cada retorno molda o que vem a seguir.';
      if (fr) return totalDays < 7 ? 'Le reset de demain se prépare déjà.' : 'Chaque retour façonne ce qui vient ensuite.';
      return totalDays < 7 ? 'Tomorrow\'s reset is already preparing.' : 'Each return shapes what comes next.';
    case 'progress':
      return getChapterProgressionPreview(totalDays)
        ?? (es ? `Estás en ${CHAPTER_NAME_ES[chapter.name] ?? chapter.name}.` : pt ? `Você está em ${CHAPTER_NAME_PT[chapter.name] ?? chapter.name}.` : fr ? `Tu es dans ${CHAPTER_NAME_FR[chapter.name] ?? chapter.name}.` : `You are in ${chapter.name}. ${chapter.tagline}`);
    case 'mindset':
      if (es) return totalDays < 7 ? 'Nuevas perspectivas emocionales se desbloquean al volver.' : 'Tu biblioteca de mindset evoluciona con tu jornada.';
      if (pt) return totalDays < 7 ? 'Novos insights emocionais se desbloqueiam ao retornar.' : 'Sua biblioteca de mindset evolui com sua jornada.';
      if (fr) return totalDays < 7 ? 'De nouveaux insights émotionnels se débloquent en revenant.' : 'Ta bibliothèque mentalité évolue avec ton chemin.';
      return totalDays < 7 ? 'New emotional insights unlock as you return.' : 'Your mindset library evolves with your journey.';
    case 'habits':
      if (es) return totalDays < 7 ? 'Tus rutinas despiertan en el Día 7.' : 'Tus hábitos están moldeando tu próximo capítulo.';
      if (pt) return totalDays < 7 ? 'Suas rotinas despertam no Dia 7.' : 'Seus hábitos estão moldando seu próximo capítulo.';
      if (fr) return totalDays < 7 ? 'Tes habitudes s\'éveillent au Jour 7.' : 'Tes habitudes façonnent ton prochain chapitre.';
      return totalDays < 7 ? 'Your routines awaken on Day 7.' : 'Your habits are shaping your next chapter.';
    case 'profile':
      if (es) return getChapterProgressionPreview(totalDays) ?? 'Tu próximo capítulo se acerca en silencio.';
      if (pt) return getChapterProgressionPreview(totalDays) ?? 'Seu próximo capítulo se aproxima quietamente.';
      if (fr) return getChapterProgressionPreview(totalDays) ?? 'Ton prochain chapitre approche tranquillement.';
      return getChapterProgressionPreview(totalDays) ?? `Your next chapter approaches quietly.`;
    case 'completion':
      return getRitualEvolutionPreview(totalDays);
    default:
      return chapter.nextChapterTeaser;
  }
}

// ─── Weekly Recap Anticipation ────────────────────────────────────────────────
// Build emotional expectation for weekly recaps.

export function getWeeklyRecapAnticipation(totalDays: number, weeklyScore: number): string | null {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  if (totalDays < 3) return null;
  if (totalDays < 7) {
    if (es) return 'Tu primer resumen de reflexión llega este domingo.';
    if (pt) return 'Seu primeiro resumo de reflexão chega neste domingo.';
    if (fr) return 'Ton premier récap de réflexion arrive ce dimanche.';
    return 'Your first reflection recap arrives this Sunday.';
  }
  if (weeklyScore >= 5) {
    if (es) return 'Tu semana se está convirtiendo en una historia que vale la pena reflexionar.';
    if (pt) return 'Sua semana está se tornando uma história que vale a pena refletir.';
    if (fr) return 'Ta semaine devient une histoire qui mérite d\'être réfléchie.';
    return 'Your week is becoming a story worth reflecting on.';
  }
  if (weeklyScore >= 3) {
    if (es) return 'Tus patrones emocionales se están revelando esta semana.';
    if (pt) return 'Seus padrões emocionais estão se revelando esta semana.';
    if (fr) return 'Tes schémas émotionnels se révèlent cette semaine.';
    return 'Your emotional patterns are unfolding this week.';
  }
  if (es) return 'Tu historia semanal todavía está tomando forma.';
  if (pt) return 'Sua história semanal ainda está se formando.';
  if (fr) return 'Ton histoire hebdomadaire est encore en train de se former.';
  return 'Your weekly story is still forming.';
}

// ─── Future Self Messages ─────────────────────────────────────────────────────
// Subtle identity-based retention — a relationship with the future self.

const FUTURE_SELF_BY_CHAPTER: Record<string, string[]> = {
  'first-steps': [
    'Your future self is waiting quietly.',
    'You are becoming someone steadier.',
    'The version of you you miss is still here.',
  ],
  'finding-rhythm': [
    'Your future rhythm is forming.',
    'A calmer version of you is approaching.',
    'Nothing is ruined. Everything is unfolding.',
  ],
  'momentum-forming': [
    'You are becoming someone who follows through.',
    'Your future self thanks you for returning.',
    'The pattern you are building will carry you.',
  ],
  'rebuilding-trust': [
    'You are proving something to yourself.',
    'Your future self is more reliable than you think.',
    'Trust is forming through every return.',
  ],
  'emotional-clarity': [
    'Clarity is becoming your new normal.',
    'You are growing quieter and stronger.',
    'Your future self feels settled.',
  ],
  'quiet-discipline': [
    'You are no longer starting over — you are continuing.',
    'Discipline has become quiet in you.',
    'Your future self moves differently.',
  ],
  'identity-returning': [
    'You are someone who shows up. That is permanent.',
    'Your identity has been rebuilt through return.',
    'The person you are becoming is already here.',
  ],
  'inner-stability': [
    'Stability is your nature now, not your goal.',
    'Your future self carries ease.',
    'You have built something that belongs to you.',
  ],
  'transformation': [
    'You rebuilt yourself. Completely.',
    'This is no longer a journey. This is who you are.',
    'Your future self arrived.',
  ],
};

const FUTURE_SELF_BY_CHAPTER_ES: Record<string, string[]> = {
  'first-steps': [
    'Lo que estás construyendo espera en silencio.',
    'Te estás convirtiendo en alguien más estable.',
    'La versión de ti que extrañas sigue aquí.',
  ],
  'finding-rhythm': [
    'Tu ritmo futuro está tomando forma.',
    'Una versión más tranquila de ti se está acercando.',
    'Nada está arruinado. Todo se está desarrollando.',
  ],
  'momentum-forming': [
    'Te estás convirtiendo en alguien que cumple lo que se propone.',
    'Lo que construyes te agradece por haber vuelto.',
    'El patrón que estás construyendo te sostendrá.',
  ],
  'rebuilding-trust': [
    'Te estás demostrando algo a ti mismo.',
    'Lo que construyes es más sólido de lo que crees.',
    'La confianza se forma con cada regreso.',
  ],
  'emotional-clarity': [
    'La claridad se está convirtiendo en tu nueva normalidad.',
    'Te estás volviendo más tranquilo y más fuerte.',
    'Lo que estás construyendo se siente estable.',
  ],
  'quiet-discipline': [
    'Ya no estás empezando de nuevo — estás continuando.',
    'La disciplina se ha vuelto silenciosa en ti.',
    'Lo que construyes ya se mueve diferente.',
  ],
  'identity-returning': [
    'Eres alguien que aparece. Eso es permanente.',
    'Tu identidad ha sido reconstruida a través del regreso.',
    'La persona en quien te estás convirtiendo ya está aquí.',
  ],
  'inner-stability': [
    'La estabilidad es tu naturaleza ahora, no tu meta.',
    'Lo que construyes lleva calma.',
    'Has construido algo que te pertenece.',
  ],
  'transformation': [
    'Te reconstruiste. Completamente.',
    'Esto ya no es un camino. Es quien eres.',
    'Lo que construiste ya llegó.',
  ],
};

const FUTURE_SELF_BY_CHAPTER_FR: Record<string, string[]> = {
  'first-steps': [
    'Ton futur toi attend tranquillement.',
    'Tu deviens quelqu\'un de plus stable.',
    'La version de toi qui te manque est encore là.',
  ],
  'finding-rhythm': [
    'Ton rythme futur prend forme.',
    'Une version plus calme de toi s\'approche.',
    'Rien n\'est abîmé. Tout se déploie.',
  ],
  'momentum-forming': [
    'Tu deviens quelqu\'un qui tient ses engagements.',
    'Ton futur toi te remercie d\'être revenu.',
    'Le schéma que tu construis te portera.',
  ],
  'rebuilding-trust': [
    'Tu te prouves quelque chose à toi-même.',
    'Ce que tu construis est plus solide que tu ne le crois.',
    'La confiance se forme à chaque retour.',
  ],
  'emotional-clarity': [
    'La clarté devient ta nouvelle normalité.',
    'Tu deviens plus calme et plus solide.',
    'Ton futur toi se sent posé.',
  ],
  'quiet-discipline': [
    'Tu ne recommences plus — tu continues.',
    'La discipline est devenue tranquille en toi.',
    'Ton futur toi avance différemment.',
  ],
  'identity-returning': [
    'Tu es quelqu\'un qui se présente. C\'est permanent.',
    'Ton identité a été reconstruite à travers le retour.',
    'La personne que tu deviens est déjà là.',
  ],
  'inner-stability': [
    'La stabilité est ta nature maintenant, pas ton objectif.',
    'Ton futur toi porte la légèreté.',
    'Tu as construit quelque chose qui t\'appartient.',
  ],
  'transformation': [
    'Tu t\'es reconstruit. Complètement.',
    'Ce n\'est plus un chemin. C\'est qui tu es.',
    'Ton futur toi est arrivé.',
  ],
};

export function getChapterFutureSelfMessage(totalDays: number, seed = 0): string {
  const chapter = getJourneyChapter(totalDays);
  if (isEs()) {
    const pool = FUTURE_SELF_BY_CHAPTER_ES[chapter.id] ?? FUTURE_SELF_BY_CHAPTER_ES['first-steps'];
    return pick(pool, seed);
  }
  if (isFr()) {
    const pool = FUTURE_SELF_BY_CHAPTER_FR[chapter.id] ?? FUTURE_SELF_BY_CHAPTER_FR['first-steps'];
    return pick(pool, seed);
  }
  const pool = FUTURE_SELF_BY_CHAPTER[chapter.id] ?? FUTURE_SELF_BY_CHAPTER['first-steps'];
  return pick(pool, seed);
}

// ─── Premium Reflection Prompts ───────────────────────────────────────────────
import { isEs, isPt, isFr } from '../utils/langStore';
// Every prompt here should feel personally written — not templated.
// Tone: calm · intimate · probing but never pressuring · emotionally mature.
// Reference: how a thoughtful therapist or Stoic writer would ask questions.

export type ReflectionPhase =
  | 'beginning'      // days 1–7
  | 'momentum'       // days 8–21
  | 'consistency'    // days 22–59
  | 'transformation' // days 60–89
  | 'identity';      // days 90+

export type ReflectionCategory =
  | 'self-observation'
  | 'process'
  | 'identity'
  | 'difficulty'
  | 'growth'
  | 'future'
  | 'present'
  | 'calmness'
  | 'focus'
  | 'resilience';

export interface Reflection {
  id: string;
  prompt: string;
  phase: ReflectionPhase;
  category: ReflectionCategory;
}

// ─── Beginning phase (days 1–7, streak 0–2) ──────────────────────────────────
// Softer · exploratory · welcoming · no expectations

const BEGINNING: Reflection[] = [
  { id: 'b01', prompt: 'What made you start today?',                                     phase: 'beginning', category: 'self-observation' },
  { id: 'b02', prompt: 'What does showing up for yourself feel like right now?',          phase: 'beginning', category: 'self-observation' },
  { id: 'b03', prompt: 'What\'s one thing you want to protect this week?',                phase: 'beginning', category: 'present' },
  { id: 'b04', prompt: 'What part of you has been waiting for this?',                     phase: 'beginning', category: 'identity' },
  { id: 'b05', prompt: 'What would feel different if you kept going for a month?',        phase: 'beginning', category: 'future' },
  { id: 'b06', prompt: 'What feels different about today compared to yesterday?',         phase: 'beginning', category: 'self-observation' },
  { id: 'b07', prompt: 'What made you choose today to begin?',                            phase: 'beginning', category: 'self-observation' },
  { id: 'b08', prompt: 'What small thing did you notice about yourself today?',           phase: 'beginning', category: 'self-observation' },
  { id: 'b09', prompt: 'What do you want this habit to protect you from?',                phase: 'beginning', category: 'future' },
  { id: 'b10', prompt: 'What does beginning feel like this time — honestly?',             phase: 'beginning', category: 'process' },
  { id: 'b11', prompt: 'What\'s one reason you want to continue?',                        phase: 'beginning', category: 'present' },
  { id: 'b12', prompt: 'What would feel different if you didn\'t stop?',                  phase: 'beginning', category: 'future' },
  { id: 'b13', prompt: 'What did today ask of you?',                                      phase: 'beginning', category: 'difficulty' },
  { id: 'b14', prompt: 'What feels lighter since you started?',                           phase: 'beginning', category: 'growth' },
  { id: 'b15', prompt: 'What are you allowing yourself to hope for?',                     phase: 'beginning', category: 'future' },
];

// ─── Momentum phase (days 8–21, streak 3–6) ──────────────────────────────────
// Reinforcing · observational · grounding · noticing the shift

const MOMENTUM: Reflection[] = [
  { id: 'm01', prompt: 'What has changed in the last week that you almost didn\'t notice?', phase: 'momentum', category: 'growth' },
  { id: 'm02', prompt: 'When did you want to stop recently — and what made you continue?',  phase: 'momentum', category: 'difficulty' },
  { id: 'm03', prompt: 'What pattern are you starting to recognize in yourself?',            phase: 'momentum', category: 'self-observation' },
  { id: 'm04', prompt: 'What does consistency feel like in your body right now?',            phase: 'momentum', category: 'self-observation' },
  { id: 'm05', prompt: 'What are you protecting by showing up?',                             phase: 'momentum', category: 'present' },
  { id: 'm06', prompt: 'What surprised you about yourself this week?',                       phase: 'momentum', category: 'growth' },
  { id: 'm07', prompt: 'What are you more patient with than you were a week ago?',           phase: 'momentum', category: 'growth' },
  { id: 'm08', prompt: 'What would be different if you stopped today?',                      phase: 'momentum', category: 'future' },
  { id: 'm09', prompt: 'What habits from before no longer fit who you\'re becoming?',        phase: 'momentum', category: 'identity' },
  { id: 'm10', prompt: 'What feels easier than it did at the beginning?',                    phase: 'momentum', category: 'growth' },
  { id: 'm11', prompt: 'What are you starting to trust about yourself?',                     phase: 'momentum', category: 'self-observation' },
  { id: 'm12', prompt: 'What distracted you this week — and how did you handle it?',         phase: 'momentum', category: 'focus' },
  { id: 'm13', prompt: 'What did you protect this week?',                                    phase: 'momentum', category: 'process' },
  { id: 'm14', prompt: 'What would you do differently next week?',                           phase: 'momentum', category: 'process' },
  { id: 'm15', prompt: 'Where did your energy come from this week?',                         phase: 'momentum', category: 'self-observation' },
  { id: 'm16', prompt: 'What did you say no to this week?',                                  phase: 'momentum', category: 'focus' },
  { id: 'm17', prompt: 'What moment this week felt most like yourself?',                     phase: 'momentum', category: 'identity' },
];

// ─── Consistency phase (days 22–59, streak 7–29) ─────────────────────────────
// Deeper · identity-building · noticing what changed without forcing it

const CONSISTENCY: Reflection[] = [
  { id: 'c01', prompt: 'What is this habit protecting you from?',                          phase: 'consistency', category: 'identity' },
  { id: 'c02', prompt: 'What are you slowly becoming?',                                    phase: 'consistency', category: 'identity' },
  { id: 'c03', prompt: 'How has your relationship with difficulty changed?',                phase: 'consistency', category: 'growth' },
  { id: 'c04', prompt: 'What would you tell someone who just started the journey you\'re on?', phase: 'consistency', category: 'growth' },
  { id: 'c05', prompt: 'What no longer requires as much effort as it once did?',           phase: 'consistency', category: 'self-observation' },
  { id: 'c06', prompt: 'What belief about yourself has quietly changed?',                  phase: 'consistency', category: 'identity' },
  { id: 'c07', prompt: 'How do you talk to yourself differently now?',                     phase: 'consistency', category: 'self-observation' },
  { id: 'c08', prompt: 'What are you less afraid of than you were before?',               phase: 'consistency', category: 'growth' },
  { id: 'c09', prompt: 'What do you no longer need to force yourself to do?',             phase: 'consistency', category: 'process' },
  { id: 'c10', prompt: 'What has stayed the same even as things changed?',                phase: 'consistency', category: 'self-observation' },
  { id: 'c11', prompt: 'What does self-discipline feel like now compared to how it used to?', phase: 'consistency', category: 'self-observation' },
  { id: 'c12', prompt: 'What protected your peace this week?',                            phase: 'consistency', category: 'calmness' },
  { id: 'c13', prompt: 'What disturbed your calm — and how did you return to yourself?',  phase: 'consistency', category: 'calmness' },
  { id: 'c14', prompt: 'What part of your life feels more intentional now?',              phase: 'consistency', category: 'growth' },
  { id: 'c15', prompt: 'What helped you show up when you didn\'t feel like it?',          phase: 'consistency', category: 'resilience' },
  { id: 'c16', prompt: 'What would you not trade for what you\'ve built?',                phase: 'consistency', category: 'identity' },
  { id: 'c17', prompt: 'What does a good day look like for you now?',                     phase: 'consistency', category: 'present' },
  { id: 'c18', prompt: 'What\'s something you noticed in others this week that you recognize from your own journey?', phase: 'consistency', category: 'self-observation' },
  { id: 'c19', prompt: 'What are you more willing to protect than you were before?',      phase: 'consistency', category: 'identity' },
  { id: 'c20', prompt: 'What uncomfortable truth did you sit with this week?',            phase: 'consistency', category: 'difficulty' },
];

// ─── Transformation phase (days 60–89, streak 30–59) ─────────────────────────
// Profound · observational · future-oriented · honest without pressure

const TRANSFORMATION: Reflection[] = [
  { id: 't01', prompt: 'Who would be surprised by who you are today?',                    phase: 'transformation', category: 'identity' },
  { id: 't02', prompt: 'What version of difficulty has gotten quieter?',                  phase: 'transformation', category: 'growth' },
  { id: 't03', prompt: 'What have you let go of that you thought you\'d never release?', phase: 'transformation', category: 'identity' },
  { id: 't04', prompt: 'How has showing up daily changed how you see time?',              phase: 'transformation', category: 'self-observation' },
  { id: 't05', prompt: 'What are you more honest with yourself about now?',               phase: 'transformation', category: 'self-observation' },
  { id: 't06', prompt: 'What does self-trust feel like for you?',                         phase: 'transformation', category: 'identity' },
  { id: 't07', prompt: 'What would you say to the version of you who started this?',     phase: 'transformation', category: 'growth' },
  { id: 't08', prompt: 'What do you now know for certain about yourself?',               phase: 'transformation', category: 'identity' },
  { id: 't09', prompt: 'What has been the unexpected gift of consistency?',              phase: 'transformation', category: 'growth' },
  { id: 't10', prompt: 'What do you want to build in the next 30 days?',                 phase: 'transformation', category: 'future' },
  { id: 't11', prompt: 'What has this practice taught you about patience?',              phase: 'transformation', category: 'growth' },
  { id: 't12', prompt: 'What part of your past self do you understand better now?',     phase: 'transformation', category: 'self-observation' },
  { id: 't13', prompt: 'What relationship in your life has benefited from your consistency?', phase: 'transformation', category: 'identity' },
  { id: 't14', prompt: 'What are you less reactive to?',                                 phase: 'transformation', category: 'calmness' },
  { id: 't15', prompt: 'What small thing now carries more meaning than it used to?',    phase: 'transformation', category: 'present' },
  { id: 't16', prompt: 'What became easier because you stopped forcing it?',            phase: 'transformation', category: 'process' },
  { id: 't17', prompt: 'What would you not undo from these months?',                    phase: 'transformation', category: 'identity' },
  { id: 't18', prompt: 'What part of your identity feels more settled now?',            phase: 'transformation', category: 'identity' },
];

// ─── Identity phase (days 90+, streak 60+) ───────────────────────────────────
// Wise · mature · deeply reflective · no performance required

const IDENTITY: Reflection[] = [
  { id: 'i01', prompt: 'What parts of this practice have become non-negotiable?',         phase: 'identity', category: 'identity' },
  { id: 'i02', prompt: 'What does discipline feel like now compared to when you began?',  phase: 'identity', category: 'self-observation' },
  { id: 'i03', prompt: 'What have you learned about yourself that you couldn\'t have learned any other way?', phase: 'identity', category: 'growth' },
  { id: 'i04', prompt: 'What do you no longer need that you once thought you did?',       phase: 'identity', category: 'identity' },
  { id: 'i05', prompt: 'What would you sacrifice to protect what you\'ve built?',         phase: 'identity', category: 'identity' },
  { id: 'i06', prompt: 'What kind of person have you become that you hadn\'t planned on?', phase: 'identity', category: 'identity' },
  { id: 'i07', prompt: 'What does your relationship with yourself look like now?',        phase: 'identity', category: 'self-observation' },
  { id: 'i08', prompt: 'What do you see in others that you used to see in yourself?',    phase: 'identity', category: 'self-observation' },
  { id: 'i09', prompt: 'What does calm mean to you now?',                                phase: 'identity', category: 'calmness' },
  { id: 'i10', prompt: 'What are you still becoming?',                                   phase: 'identity', category: 'identity' },
  { id: 'i11', prompt: 'What does a full year of showing up feel like from the inside?', phase: 'identity', category: 'self-observation' },
  { id: 'i12', prompt: 'What have you forgiven yourself for along the way?',             phase: 'identity', category: 'growth' },
  { id: 'i13', prompt: 'What does your present self owe your past self?',                phase: 'identity', category: 'identity' },
  { id: 'i14', prompt: 'What do you want to pass forward from what you\'ve learned?',   phase: 'identity', category: 'future' },
  { id: 'i15', prompt: 'What quieted down that used to be loud?',                        phase: 'identity', category: 'calmness' },
  { id: 'i16', prompt: 'What story about yourself has changed?',                         phase: 'identity', category: 'identity' },
];

// ─── Universal prompts (any phase, any context) ───────────────────────────────
// Used as fallbacks or to blend between phases

export const UNIVERSAL: Reflection[] = [
  { id: 'u01', prompt: 'What helped you show up today?',                                  phase: 'beginning', category: 'process' },
  { id: 'u02', prompt: 'What feels different this week?',                                 phase: 'momentum', category: 'growth' },
  { id: 'u03', prompt: 'What are you slowly becoming?',                                   phase: 'consistency', category: 'identity' },
  { id: 'u04', prompt: 'What distracted you today?',                                      phase: 'beginning', category: 'focus' },
  { id: 'u05', prompt: 'What protected your peace today?',                                phase: 'consistency', category: 'calmness' },
  { id: 'u06', prompt: 'What moment today felt most like yourself?',                      phase: 'momentum', category: 'identity' },
  { id: 'u07', prompt: 'What do you want to carry into tomorrow?',                        phase: 'beginning', category: 'future' },
  { id: 'u08', prompt: 'What was harder today than yesterday?',                           phase: 'momentum', category: 'difficulty' },
  { id: 'u09', prompt: 'What did today require of you that you didn\'t expect?',          phase: 'consistency', category: 'difficulty' },
  { id: 'u10', prompt: 'What are you more grateful for than you expected to be?',         phase: 'transformation', category: 'growth' },
];

// ─── Full library ─────────────────────────────────────────────────────────────

export const ALL_REFLECTIONS: Reflection[] = [
  ...BEGINNING,
  ...MOMENTUM,
  ...CONSISTENCY,
  ...TRANSFORMATION,
  ...IDENTITY,
  ...UNIVERSAL,
];

// ─── Phase selector ───────────────────────────────────────────────────────────

export function getReflectionPhase(streak: number, totalDays: number): ReflectionPhase {
  if (totalDays >= 90 || streak >= 60) return 'identity';
  if (totalDays >= 60 || streak >= 30) return 'transformation';
  if (totalDays >= 22 || streak >= 7)  return 'consistency';
  if (totalDays >= 8  || streak >= 3)  return 'momentum';
  return 'beginning';
}

/**
 * Returns a reflection prompt appropriate for the user's phase and context.
 * Uses a seed for variation without randomness (same seed = same prompt).
 * Avoids recently seen prompt IDs.
 */
// ── Spanish reflection prompts (parallel pool keyed by phase) ─────────────────
const ES_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    '¿Qué te hizo empezar hoy?',
    '¿Cómo se siente elegirte hoy?',
    '¿Qué quieres proteger esta semana?',
    '¿Qué parte de ti ha estado esperando esto?',
    '¿Cómo se sentiría seguir durante un mes?',
    '¿Qué cambió en estos últimos días que casi no notaste?',
    '¿Por qué elegiste hoy para empezar?',
  ],
  momentum: [
    '¿Qué cambió en la última semana que casi no notaste?',
    '¿Cuándo quisiste parar recientemente — y qué te hizo continuar?',
    '¿Qué patrón estás empezando a reconocer en ti mismo?',
    '¿Qué se siente la consistencia en tu cuerpo ahora mismo?',
    '¿Qué estás protegiendo al mostrarte?',
    '¿Qué te sorprendió de ti mismo esta semana?',
  ],
  consistency: [
    '¿Qué está protegiendo este hábito?',
    '¿En quién te estás convirtiendo lentamente?',
    '¿Cómo ha cambiado tu relación con la dificultad?',
    '¿Qué ya no requiere tanto esfuerzo como antes?',
    '¿Qué creencia sobre ti mismo ha cambiado silenciosamente?',
    '¿Qué protegió tu paz hoy?',
  ],
  transformation: [
    '¿Quién se sorprendería por quien eres hoy?',
    '¿Qué versión de la dificultad se ha vuelto más silenciosa?',
    '¿Qué has soltado que pensabas que nunca liberarías?',
    '¿En qué eres más honesto contigo mismo ahora?',
    '¿Cómo se siente confiar en ti mismo ahora?',
  ],
  identity: [
    '¿Qué partes de esta práctica se han vuelto innegociables?',
    '¿Qué has aprendido sobre ti mismo que no podrías haber aprendido de otra manera?',
    '¿Qué ya no necesitas que antes pensabas que necesitabas?',
    '¿En qué tipo de persona te has convertido que no habías planeado?',
    '¿Qué silencio encontraste donde antes había ruido?',
  ],
  universal: [
    '¿Qué te ayudó a mostrarte hoy?',
    '¿Qué se siente diferente esta semana?',
    '¿En quién te estás convirtiendo lentamente?',
    '¿Qué te distrajo hoy?',
    '¿Qué protegió tu paz hoy?',
  ],
};

const PT_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    'O que fez você começar hoje?',
    'Como você tem se acolhido ultimamente?',
    'O que você quer proteger nesta semana?',
    'Que parte de você estava esperando por isso?',
    'Como seria diferente se você continuasse por um mês?',
    'O que mudou nos últimos dias que você quase não percebeu?',
    'Por que você escolheu hoje para começar?',
  ],
  momentum: [
    'O que mudou na última semana que você quase não percebeu?',
    'Quando você quis parar recentemente — e o que fez você continuar?',
    'Que padrão você está começando a reconhecer em você mesma?',
    'Como a constância se sente no seu corpo agora?',
    'O que muda quando você aparece?',
    'O que te surpreendeu sobre você mesma esta semana?',
  ],
  consistency: [
    'O que este hábito está protegendo?',
    'Em quem você está se tornando lentamente?',
    'Como sua relação com a dificuldade mudou?',
    'O que já não exige tanto esforço quanto antes?',
    'Que crença sobre você mesma mudou silenciosamente?',
    'O que protegeu sua paz hoje?',
  ],
  transformation: [
    'Quem ficaria surpreso com quem você é hoje?',
    'Que versão da dificuldade ficou mais silenciosa?',
    'O que você soltou que achava que nunca soltaria?',
    'Em que você é mais honesta consigo mesma agora?',
    'Como a confiança em você mesma parece para você?',
  ],
  identity: [
    'Que partes dessa prática se tornaram inegociáveis?',
    'O que você aprendeu sobre você mesma que não poderia ter aprendido de outra forma?',
    'O que você não precisa mais que antes achava que precisava?',
    'Em que tipo de pessoa você se tornou que não havia planejado?',
    'O que é quietude agora que antes era barulho?',
  ],
  universal: [
    'O que te ajudou a aparecer hoje?',
    'O que está diferente esta semana?',
    'Em quem você está se tornando lentamente?',
    'O que te distraiu hoje?',
    'O que protegeu sua paz hoje?',
  ],
};

const FR_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    'Qu\'est-ce qui t\'a amené à commencer aujourd\'hui ?',
    'Comment ça se sent, te choisir aujourd\'hui ?',
    'Quelle chose veux-tu préserver cette semaine ?',
    'Quelle partie de toi attendait ce moment ?',
    'Qu\'est-ce qui serait différent si tu continuais pendant un mois ?',
    'Qu\'est-ce qui a changé ces derniers jours, sans que tu t\'en rendes vraiment compte ?',
    'Pourquoi as-tu choisi aujourd\'hui pour commencer ?',
  ],
  momentum: [
    'Qu\'est-ce qui a changé la semaine dernière, sans que tu l\'aies vraiment remarqué ?',
    'Quand as-tu eu envie d\'arrêter dernièrement — et qu\'est-ce qui t\'a fait continuer ?',
    'Quel schéma commences-tu à reconnaître en toi ?',
    'Comment la régularité se ressent dans ton corps en ce moment ?',
    'Qu\'est-ce que tu protèges en te présentant ?',
    'Qu\'est-ce qui t\'a surpris chez toi cette semaine ?',
  ],
  consistency: [
    'Qu\'est-ce que cette habitude protège ?',
    'Qui es-tu en train de devenir, doucement ?',
    'Comment ton rapport à la difficulté a-t-il changé ?',
    'Qu\'est-ce qui ne demande plus autant d\'effort qu\'avant ?',
    'Quelle croyance sur toi a changé sans que tu l\'aies planifié ?',
    'Qu\'est-ce qui a protégé ta paix aujourd\'hui ?',
  ],
  transformation: [
    'Qui serait surpris de voir qui tu es aujourd\'hui ?',
    'Quelle difficulté est devenue plus silencieuse ?',
    'Qu\'as-tu lâché que tu pensais ne jamais pouvoir lâcher ?',
    'En quoi es-tu plus honnête avec toi-même maintenant ?',
    'Comment la confiance en toi se ressent aujourd\'hui ?',
  ],
  identity: [
    'Quelles parties de cette pratique sont devenues non négociables ?',
    'Qu\'as-tu appris sur toi que tu n\'aurais pas pu apprendre autrement ?',
    'De quoi n\'as-tu plus besoin, alors que tu pensais en avoir besoin ?',
    'En quel type de personne es-tu devenu, sans l\'avoir prévu ?',
    'Qu\'est-ce qui est devenu calme là où il y avait du bruit avant ?',
  ],
  universal: [
    'Qu\'est-ce qui t\'a aidé à te présenter aujourd\'hui ?',
    'Qu\'est-ce qui est différent cette semaine ?',
    'Qui es-tu en train de devenir, doucement ?',
    'Qu\'est-ce qui t\'a distrait aujourd\'hui ?',
    'Qu\'est-ce qui a protégé ta paix aujourd\'hui ?',
  ],
};

export function selectReflectionPrompt(
  streak: number,
  totalDays: number,
  seed: number,
  recentIds: string[] = [],
): Reflection {
  const phase = getReflectionPhase(streak, totalDays);

  if (isPt()) {
    const pool = PT_REFLECTIONS[phase] ?? PT_REFLECTIONS.universal;
    const prompt = pool[Math.abs(seed) % pool.length];
    return { id: `pt_${phase}_${seed % pool.length}`, prompt, phase, category: 'self-observation' };
  }

  if (isEs()) {
    const pool = ES_REFLECTIONS[phase] ?? ES_REFLECTIONS.universal;
    const prompt = pool[Math.abs(seed) % pool.length];
    return { id: `es_${phase}_${seed % pool.length}`, prompt, phase, category: 'self-observation' };
  }

  if (isFr()) {
    const pool = FR_REFLECTIONS[phase] ?? FR_REFLECTIONS.universal;
    const prompt = pool[Math.abs(seed) % pool.length];
    return { id: `fr_${phase}_${seed % pool.length}`, prompt, phase, category: 'self-observation' };
  }

  // Primary pool: phase-matched
  let pool = ALL_REFLECTIONS.filter(r => r.phase === phase);

  // Filter out recently shown
  const fresh = pool.filter(r => !recentIds.includes(r.id));

  // If all phase-matched have been shown, fall back to full pool
  const candidates = fresh.length > 0 ? fresh : pool;

  // If candidates empty, use universal
  const final = candidates.length > 0 ? candidates : UNIVERSAL;

  return final[seed % final.length];
}

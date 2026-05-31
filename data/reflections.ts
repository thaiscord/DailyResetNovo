// ─── Premium Reflection Prompts ───────────────────────────────────────────────
import { isEs, isPt, isFr, isDe } from '../utils/langStore';
// Tone: calm · human · simple · never coaching · never therapy.
// Questions should feel like something a thoughtful friend would ask —
// easy to answer quickly, grounded in real daily life.

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
// Soft · exploratory · welcoming · no expectations

const BEGINNING: Reflection[] = [
  { id: 'b01', prompt: 'What made you start today?',                                        phase: 'beginning', category: 'self-observation' },
  { id: 'b02', prompt: 'What space are you giving yourself today?',                         phase: 'beginning', category: 'present' },
  { id: 'b03', prompt: 'What\'s one thing you want to protect this week?',                  phase: 'beginning', category: 'present' },
  { id: 'b04', prompt: 'What would help today feel 1% lighter?',                            phase: 'beginning', category: 'calmness' },
  { id: 'b05', prompt: 'What surprised you about getting started?',                         phase: 'beginning', category: 'self-observation' },
  { id: 'b06', prompt: 'What feels different about today compared to yesterday?',           phase: 'beginning', category: 'self-observation' },
  { id: 'b07', prompt: 'What made you choose today to begin?',                              phase: 'beginning', category: 'self-observation' },
  { id: 'b08', prompt: 'What small thing did you notice about yourself today?',             phase: 'beginning', category: 'self-observation' },
  { id: 'b09', prompt: 'What do you hope to have more of?',                                 phase: 'beginning', category: 'future' },
  { id: 'b10', prompt: 'What does beginning feel like this time — honestly?',               phase: 'beginning', category: 'process' },
  { id: 'b11', prompt: 'What feels worth protecting right now?',                            phase: 'beginning', category: 'present' },
  { id: 'b12', prompt: 'What would you like to have less pressure around today?',           phase: 'beginning', category: 'calmness' },
  { id: 'b13', prompt: 'What did today ask of you?',                                        phase: 'beginning', category: 'difficulty' },
  { id: 'b14', prompt: 'What feels lighter since you started?',                             phase: 'beginning', category: 'growth' },
  { id: 'b15', prompt: 'What are you slowly letting yourself want?',                        phase: 'beginning', category: 'future' },
];

// ─── Momentum phase (days 8–21, streak 3–6) ──────────────────────────────────
// Reinforcing · observational · grounding · noticing the shift

const MOMENTUM: Reflection[] = [
  { id: 'm01', prompt: 'What has changed in the last week that you almost didn\'t notice?', phase: 'momentum', category: 'growth' },
  { id: 'm02', prompt: 'What almost got in the way this week?',                              phase: 'momentum', category: 'difficulty' },
  { id: 'm03', prompt: 'What pattern are you starting to recognize in yourself?',           phase: 'momentum', category: 'self-observation' },
  { id: 'm04', prompt: 'What does keeping up with yourself actually feel like today?',      phase: 'momentum', category: 'self-observation' },
  { id: 'm05', prompt: 'What are you protecting by being here?',                            phase: 'momentum', category: 'present' },
  { id: 'm06', prompt: 'What surprised you about yourself this week?',                      phase: 'momentum', category: 'growth' },
  { id: 'm07', prompt: 'What are you more patient with than you were a week ago?',          phase: 'momentum', category: 'growth' },
  { id: 'm08', prompt: 'What has been taking up too much space in your head?',              phase: 'momentum', category: 'focus' },
  { id: 'm09', prompt: 'What are you starting to need less of?',                            phase: 'momentum', category: 'identity' },
  { id: 'm10', prompt: 'What feels easier than it did at the beginning?',                   phase: 'momentum', category: 'growth' },
  { id: 'm11', prompt: 'What are you starting to trust about yourself?',                    phase: 'momentum', category: 'self-observation' },
  { id: 'm12', prompt: 'What pulled your attention this week — and how did you find your way back?', phase: 'momentum', category: 'focus' },
  { id: 'm13', prompt: 'What did you protect this week?',                                   phase: 'momentum', category: 'process' },
  { id: 'm14', prompt: 'What would you like to do with more calm next week?',               phase: 'momentum', category: 'calmness' },
  { id: 'm15', prompt: 'Where did your energy come from this week?',                        phase: 'momentum', category: 'self-observation' },
  { id: 'm16', prompt: 'What did you say no to this week?',                                 phase: 'momentum', category: 'focus' },
  { id: 'm17', prompt: 'What moment this week felt most like yourself?',                    phase: 'momentum', category: 'identity' },
];

// ─── Consistency phase (days 22–59, streak 7–29) ─────────────────────────────
// Deeper · identity-building · noticing what shifted without forcing it

const CONSISTENCY: Reflection[] = [
  { id: 'c01', prompt: 'What does showing up quietly protect?',                             phase: 'consistency', category: 'identity' },
  { id: 'c02', prompt: 'What are you slowly becoming?',                                     phase: 'consistency', category: 'identity' },
  { id: 'c03', prompt: 'What no longer drains you the way it used to?',                     phase: 'consistency', category: 'growth' },
  { id: 'c04', prompt: 'What do you wish you\'d been gentler with at the beginning?',       phase: 'consistency', category: 'growth' },
  { id: 'c05', prompt: 'What no longer requires as much effort as it once did?',            phase: 'consistency', category: 'self-observation' },
  { id: 'c06', prompt: 'What belief about yourself has quietly changed?',                   phase: 'consistency', category: 'identity' },
  { id: 'c07', prompt: 'What do you tell yourself now that you couldn\'t before?',          phase: 'consistency', category: 'self-observation' },
  { id: 'c08', prompt: 'What are you less afraid of than you were before?',                 phase: 'consistency', category: 'growth' },
  { id: 'c09', prompt: 'What do you no longer need to force yourself to do?',               phase: 'consistency', category: 'process' },
  { id: 'c10', prompt: 'What has stayed the same even as things changed?',                  phase: 'consistency', category: 'self-observation' },
  { id: 'c11', prompt: 'What feels less like effort now than it did a few weeks ago?',      phase: 'consistency', category: 'self-observation' },
  { id: 'c12', prompt: 'What protected your peace this week?',                              phase: 'consistency', category: 'calmness' },
  { id: 'c13', prompt: 'What knocked things off balance this week — and what helped you land back?', phase: 'consistency', category: 'resilience' },
  { id: 'c14', prompt: 'What are you doing with more care and attention now?',              phase: 'consistency', category: 'growth' },
  { id: 'c15', prompt: 'What helped you keep going when you didn\'t feel like it?',         phase: 'consistency', category: 'resilience' },
  { id: 'c16', prompt: 'What would you not trade for what you\'ve built?',                  phase: 'consistency', category: 'identity' },
  { id: 'c17', prompt: 'What does a good day look like for you now?',                       phase: 'consistency', category: 'present' },
  { id: 'c18', prompt: 'What did you notice in someone else this week that felt familiar?', phase: 'consistency', category: 'self-observation' },
  { id: 'c19', prompt: 'What are you more willing to protect than you were before?',        phase: 'consistency', category: 'identity' },
  { id: 'c20', prompt: 'What did you finally let yourself see this week?',                  phase: 'consistency', category: 'difficulty' },
];

// ─── Transformation phase (days 60–89, streak 30–59) ─────────────────────────
// Honest · observational · no performance required

const TRANSFORMATION: Reflection[] = [
  { id: 't01', prompt: 'Who would be surprised by who you are today?',                      phase: 'transformation', category: 'identity' },
  { id: 't02', prompt: 'What version of difficulty has gotten quieter?',                    phase: 'transformation', category: 'growth' },
  { id: 't03', prompt: 'What has lost its grip on you?',                                    phase: 'transformation', category: 'identity' },
  { id: 't04', prompt: 'How has being here daily changed how you see time?',                phase: 'transformation', category: 'self-observation' },
  { id: 't05', prompt: 'What are you more honest with yourself about now?',                 phase: 'transformation', category: 'self-observation' },
  { id: 't06', prompt: 'What does trusting yourself feel like now?',                        phase: 'transformation', category: 'identity' },
  { id: 't07', prompt: 'What would you say to the version of you who started this?',        phase: 'transformation', category: 'growth' },
  { id: 't08', prompt: 'What do you now know for certain about yourself?',                  phase: 'transformation', category: 'identity' },
  { id: 't09', prompt: 'What came out of keeping up with yourself that you didn\'t expect?', phase: 'transformation', category: 'growth' },
  { id: 't10', prompt: 'What deserves more of your attention right now?',                   phase: 'transformation', category: 'future' },
  { id: 't11', prompt: 'What has this taught you about patience?',                          phase: 'transformation', category: 'growth' },
  { id: 't12', prompt: 'What part of your past self do you understand better now?',         phase: 'transformation', category: 'self-observation' },
  { id: 't13', prompt: 'What around you has grown calmer as you\'ve grown calmer?',         phase: 'transformation', category: 'calmness' },
  { id: 't14', prompt: 'What are you less reactive to?',                                    phase: 'transformation', category: 'calmness' },
  { id: 't15', prompt: 'What small thing now carries more meaning than it used to?',        phase: 'transformation', category: 'present' },
  { id: 't16', prompt: 'What became easier because you stopped forcing it?',                phase: 'transformation', category: 'process' },
  { id: 't17', prompt: 'What would you not undo from these months?',                        phase: 'transformation', category: 'identity' },
  { id: 't18', prompt: 'What part of your identity feels more settled now?',                phase: 'transformation', category: 'identity' },
];

// ─── Identity phase (days 90+, streak 60+) ───────────────────────────────────
// Grounded · reflective · no performance required

const IDENTITY: Reflection[] = [
  { id: 'i01', prompt: 'What has become quietly essential for you?',                        phase: 'identity', category: 'identity' },
  { id: 'i02', prompt: 'What does effort feel like now compared to when you started?',      phase: 'identity', category: 'self-observation' },
  { id: 'i03', prompt: 'What have you learned about yourself that you couldn\'t have learned any other way?', phase: 'identity', category: 'growth' },
  { id: 'i04', prompt: 'What do you no longer need that you once thought you did?',         phase: 'identity', category: 'identity' },
  { id: 'i05', prompt: 'What are you clear about not letting go of?',                       phase: 'identity', category: 'identity' },
  { id: 'i06', prompt: 'What kind of person have you become that you hadn\'t planned on?',  phase: 'identity', category: 'identity' },
  { id: 'i07', prompt: 'How have you been treating yourself differently lately?',           phase: 'identity', category: 'self-observation' },
  { id: 'i08', prompt: 'What do you see in others that you used to see in yourself?',       phase: 'identity', category: 'self-observation' },
  { id: 'i09', prompt: 'What does calm mean to you now?',                                   phase: 'identity', category: 'calmness' },
  { id: 'i10', prompt: 'What are you still becoming?',                                      phase: 'identity', category: 'identity' },
  { id: 'i11', prompt: 'What does a full year of keeping this up actually feel like?',      phase: 'identity', category: 'self-observation' },
  { id: 'i12', prompt: 'What have you been easier on yourself about?',                      phase: 'identity', category: 'growth' },
  { id: 'i13', prompt: 'What does your present self owe your past self?',                   phase: 'identity', category: 'identity' },
  { id: 'i14', prompt: 'What would you want someone just starting to know?',                phase: 'identity', category: 'future' },
  { id: 'i15', prompt: 'What quieted down that used to be loud?',                           phase: 'identity', category: 'calmness' },
  { id: 'i16', prompt: 'What do you know about yourself now that you didn\'t before?',      phase: 'identity', category: 'identity' },
];

// ─── Universal prompts (any phase, any context) ───────────────────────────────

export const UNIVERSAL: Reflection[] = [
  { id: 'u01', prompt: 'What made today a little more manageable than you expected?',       phase: 'beginning',      category: 'process' },
  { id: 'u02', prompt: 'What feels different this week?',                                   phase: 'momentum',       category: 'growth' },
  { id: 'u03', prompt: 'What are you slowly becoming?',                                     phase: 'consistency',    category: 'identity' },
  { id: 'u04', prompt: 'What distracted you today?',                                        phase: 'beginning',      category: 'focus' },
  { id: 'u05', prompt: 'What protected your peace today?',                                  phase: 'consistency',    category: 'calmness' },
  { id: 'u06', prompt: 'What moment today felt most like yourself?',                        phase: 'momentum',       category: 'identity' },
  { id: 'u07', prompt: 'What do you want to carry into tomorrow?',                          phase: 'beginning',      category: 'future' },
  { id: 'u08', prompt: 'What was harder today than yesterday?',                             phase: 'momentum',       category: 'difficulty' },
  { id: 'u09', prompt: 'What did today require of you that you didn\'t expect?',            phase: 'consistency',    category: 'difficulty' },
  { id: 'u10', prompt: 'What brought a little relief recently?',                            phase: 'transformation', category: 'growth' },
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

// ─── Portuguese (PT) ──────────────────────────────────────────────────────────
const PT_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    'O que fez você começar hoje?',
    'Que espaço você está se dando hoje?',
    'O que você quer proteger nesta semana?',
    'O que ajudaria o seu dia a ficar um pouco mais leve?',
    'O que te surpreendeu em começar?',
    'O que está diferente hoje em relação a ontem?',
    'Por que você escolheu hoje para começar?',
    'Que coisa pequena você notou sobre você mesma hoje?',
    'O que você espera ter mais?',
    'Como está sendo esse começo, de verdade?',
    'O que vale a pena proteger agora?',
    'Sobre o que você gostaria de ter menos pressão hoje?',
    'O que o dia de hoje pediu de você?',
    'O que ficou mais leve desde que você começou?',
    'O que você está se permitindo querer, aos poucos?',
  ],
  momentum: [
    'O que mudou na última semana que você quase não percebeu?',
    'O que quase atrapalhou essa semana?',
    'Que padrão você está começando a reconhecer em você mesma?',
    'O que é manter-se nessa rotina, na prática, para você?',
    'O que muda quando você aparece para si mesma?',
    'O que te surpreendeu sobre você mesma esta semana?',
    'Com o que você tem sido mais paciente do que era antes?',
    'O que tem ocupado espaço demais na sua cabeça?',
    'O que você está precisando menos?',
    'O que ficou mais fácil do que no começo?',
    'Em que você está começando a confiar em você mesma?',
    'O que chamou sua atenção esta semana — e como você voltou?',
    'O que você protegeu esta semana?',
    'O que você gostaria de fazer com mais calma na próxima semana?',
    'De onde veio sua energia esta semana?',
    'Para o que você disse não esta semana?',
    'Que momento desta semana pareceu mais com você mesma?',
  ],
  consistency: [
    'O que aparecer, em silêncio, está protegendo?',
    'Em quem você está se tornando aos poucos?',
    'O que não te esgota mais como antes?',
    'O que você teria dito a si mesma no começo, com mais gentileza?',
    'O que já não exige tanto esforço quanto antes?',
    'Que crença sobre você mesma mudou sem você perceber?',
    'O que você diz para si mesma agora que antes não conseguia?',
    'Do que você está menos com medo do que estava antes?',
    'O que você não precisa mais se forçar a fazer?',
    'O que ficou igual mesmo enquanto tudo mudava?',
    'O que sente menos como esforço do que sentia há algumas semanas?',
    'O que protegeu sua paz esta semana?',
    'O que tirou você do seu eixo esta semana — e o que te ajudou a voltar?',
    'O que você está fazendo com mais cuidado e atenção agora?',
    'O que te ajudou a continuar quando você não estava com vontade?',
    'O que você não trocaria pelo que construiu?',
    'Como é um bom dia para você agora?',
    'O que você notou em alguém esta semana que pareceu familiar?',
    'O que você está mais disposta a proteger do que antes?',
    'O que você finalmente deixou enxergar esta semana?',
  ],
  transformation: [
    'Quem ficaria surpreso com quem você é hoje?',
    'Que versão da dificuldade ficou mais silenciosa?',
    'O que perdeu o poder sobre você?',
    'Como aparecer todo dia mudou a forma como você vê o tempo?',
    'Em que você está sendo mais honesta consigo mesma agora?',
    'Como é confiar em você mesma agora?',
    'O que você diria para a versão de você que começou tudo isso?',
    'O que você sabe com certeza sobre você mesma agora?',
    'O que aconteceu de bom por continuar que você não esperava?',
    'O que merece mais da sua atenção agora?',
    'O que tudo isso te ensinou sobre paciência?',
    'Que parte da sua versão anterior você entende melhor agora?',
    'O que ficou mais calmo ao seu redor enquanto você foi ficando mais calma?',
    'Do que você reage menos do que antes?',
    'Que coisa pequena passou a ter mais significado para você?',
    'O que ficou mais fácil quando você parou de forçar?',
    'O que desses meses você não voltaria atrás?',
    'Que parte de você se sente mais assentada agora?',
  ],
  identity: [
    'O que se tornou essencial para você, em silêncio?',
    'Como o esforço parece agora comparado ao começo?',
    'O que você aprendeu sobre você mesma que não poderia ter aprendido de outra forma?',
    'O que você não precisa mais que antes achava que precisava?',
    'O que você sabe claramente que não quer perder?',
    'Em que tipo de pessoa você se tornou sem ter planejado?',
    'Como você tem se tratado de forma diferente ultimamente?',
    'O que você vê nos outros que antes via em você mesma?',
    'O que calma significa para você agora?',
    'Em quem você ainda está se tornando?',
    'O que um ano mantendo isso realmente parece, por dentro?',
    'Com o que você tem sido mais fácil consigo mesma?',
    'O que o seu eu de agora deve ao seu eu de antes?',
    'O que você gostaria que alguém que está começando soubesse?',
    'O que ficou quieto onde antes era barulho?',
    'O que você sabe sobre si mesma agora que antes não sabia?',
  ],
  universal: [
    'O que tornou hoje um pouco mais administrável do que você esperava?',
    'O que está diferente esta semana?',
    'Em quem você está se tornando aos poucos?',
    'O que te distraiu hoje?',
    'O que protegeu sua paz hoje?',
    'Que momento de hoje pareceu mais com você mesma?',
    'O que você quer levar para amanhã?',
    'O que foi mais difícil hoje do que ontem?',
    'O que o dia pediu de você que você não esperava?',
    'O que trouxe um pouco de alívio recentemente?',
  ],
};

// ─── Spanish (ES) ─────────────────────────────────────────────────────────────
const ES_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    '¿Qué te hizo empezar hoy?',
    '¿Qué espacio te estás dando hoy?',
    '¿Qué quieres proteger esta semana?',
    '¿Qué ayudaría a que tu día fuera un poco más ligero?',
    '¿Qué te sorprendió al empezar?',
    '¿Qué se siente diferente hoy respecto a ayer?',
    '¿Por qué elegiste hoy para empezar?',
    '¿Qué cosa pequeña notaste sobre ti hoy?',
    '¿Qué esperas tener más?',
    '¿Cómo se siente este comienzo — siendo honesto?',
    '¿Qué vale la pena proteger ahora mismo?',
    '¿Sobre qué te gustaría tener menos presión hoy?',
    '¿Qué te pidió este día?',
    '¿Qué se siente más ligero desde que empezaste?',
    '¿Qué te estás permitiendo querer, poco a poco?',
  ],
  momentum: [
    '¿Qué cambió la semana pasada que casi no notaste?',
    '¿Qué casi se interpuso esta semana?',
    '¿Qué patrón empiezas a reconocer en ti?',
    '¿Qué significa mantenerte en esto, en la práctica?',
    '¿Qué cambia cuando estás ahí para ti?',
    '¿Qué te sorprendió de ti esta semana?',
    '¿Con qué eres más paciente que antes?',
    '¿Qué ha ocupado demasiado espacio en tu cabeza?',
    '¿Qué vas necesitando menos?',
    '¿Qué se siente más fácil que al principio?',
    '¿En qué empiezas a confiar en ti?',
    '¿Qué llamó tu atención esta semana — y cómo volviste?',
    '¿Qué protegiste esta semana?',
    '¿Qué te gustaría hacer con más calma la próxima semana?',
    '¿De dónde vino tu energía esta semana?',
    '¿A qué le dijiste que no esta semana?',
    '¿Qué momento de esta semana se sintió más como tú?',
  ],
  consistency: [
    '¿Qué está protegiendo en silencio el hecho de seguir aquí?',
    '¿En quién te estás convirtiendo lentamente?',
    '¿Qué ya no te agota como antes?',
    '¿Qué te habrías dicho al principio, con más gentileza?',
    '¿Qué ya no requiere tanto esfuerzo como antes?',
    '¿Qué creencia sobre ti ha cambiado sin que lo planearas?',
    '¿Qué te dices ahora que antes no podías?',
    '¿A qué le tienes menos miedo que antes?',
    '¿Qué ya no necesitas forzarte a hacer?',
    '¿Qué ha permanecido igual aunque todo cambió?',
    '¿Qué se siente menos como esfuerzo que hace unas semanas?',
    '¿Qué protegió tu paz esta semana?',
    '¿Qué te sacó del equilibrio esta semana — y qué te ayudó a volver?',
    '¿Qué estás haciendo con más cuidado y atención ahora?',
    '¿Qué te ayudó a continuar cuando no tenías ganas?',
    '¿Qué no cambiarías por lo que has construido?',
    '¿Cómo es un buen día para ti ahora?',
    '¿Qué notaste en alguien más esta semana que te resultó familiar?',
    '¿Qué estás más dispuesto a proteger que antes?',
    '¿Qué te permitiste ver por fin esta semana?',
  ],
  transformation: [
    '¿Quién se sorprendería de quien eres hoy?',
    '¿Qué versión de la dificultad se ha vuelto más silenciosa?',
    '¿Qué ha perdido poder sobre ti?',
    '¿Cómo cambió tu forma de ver el tiempo al estar aquí cada día?',
    '¿En qué eres más honesto contigo ahora?',
    '¿Cómo se siente confiar en ti mismo ahora?',
    '¿Qué le dirías a la versión de ti que empezó todo esto?',
    '¿Qué sabes con certeza sobre ti ahora?',
    '¿Qué bueno salió de mantenerte que no esperabas?',
    '¿Qué merece más de tu atención ahora?',
    '¿Qué te enseñó esto sobre la paciencia?',
    '¿Qué parte de tu yo anterior entiendes mejor ahora?',
    '¿Qué se calmó a tu alrededor mientras tú te calmabas?',
    '¿A qué reaccionas menos que antes?',
    '¿Qué cosa pequeña tiene más significado para ti ahora?',
    '¿Qué se volvió más fácil cuando dejaste de forzarlo?',
    '¿Qué de estos meses no deshacerías?',
    '¿Qué parte de ti se siente más asentada ahora?',
  ],
  identity: [
    '¿Qué se ha vuelto esencial para ti, en silencio?',
    '¿Cómo se siente el esfuerzo ahora comparado al principio?',
    '¿Qué aprendiste de ti que no habrías podido aprender de otra manera?',
    '¿Qué ya no necesitas y antes creías que sí?',
    '¿Qué sabes claramente que no quieres perder?',
    '¿En qué tipo de persona te convertiste sin haberlo planeado?',
    '¿Cómo te tratas diferente últimamente?',
    '¿Qué ves en otros que antes veías en ti?',
    '¿Qué significa la calma para ti ahora?',
    '¿En quién sigues convirtiéndote?',
    '¿Qué se siente un año manteniéndote, por dentro?',
    '¿Con qué has sido más fácil contigo?',
    '¿Qué te debe tu yo de ahora a tu yo de antes?',
    '¿Qué te gustaría que supiera alguien que está empezando?',
    '¿Qué se quedó callado donde antes había ruido?',
    '¿Qué sabes ahora de ti que antes no sabías?',
  ],
  universal: [
    '¿Qué hizo hoy un poco más llevadero de lo que esperabas?',
    '¿Qué se siente diferente esta semana?',
    '¿En quién te estás convirtiendo lentamente?',
    '¿Qué te distrajo hoy?',
    '¿Qué protegió tu paz hoy?',
    '¿Qué momento de hoy se sintió más como tú?',
    '¿Qué quieres llevarte para mañana?',
    '¿Qué fue más difícil hoy que ayer?',
    '¿Qué te pidió hoy que no esperabas?',
    '¿Qué trajo un poco de alivio recientemente?',
  ],
};

// ─── French (FR) ──────────────────────────────────────────────────────────────
const FR_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    'Qu\'est-ce qui t\'a amené à commencer aujourd\'hui ?',
    'Quel espace tu t\'accordes aujourd\'hui ?',
    'Quelle chose tu veux préserver cette semaine ?',
    'Qu\'est-ce qui aiderait ta journée à être un peu plus légère ?',
    'Qu\'est-ce qui t\'a surpris dans le fait de commencer ?',
    'Qu\'est-ce qui se sent différent aujourd\'hui par rapport à hier ?',
    'Pourquoi as-tu choisi aujourd\'hui pour commencer ?',
    'Quelle petite chose as-tu remarqué sur toi aujourd\'hui ?',
    'Qu\'est-ce que tu espères avoir plus ?',
    'Comment ça se passe, ce début — honnêtement ?',
    'Qu\'est-ce qui vaut la peine d\'être protégé maintenant ?',
    'Sur quoi tu voudrais avoir moins de pression aujourd\'hui ?',
    'Qu\'est-ce que cette journée t\'a demandé ?',
    'Qu\'est-ce qui se sent plus léger depuis que tu as commencé ?',
    'Qu\'est-ce que tu t\'autorises à vouloir, doucement ?',
  ],
  momentum: [
    'Qu\'est-ce qui a changé la semaine dernière sans que tu le remarques vraiment ?',
    'Qu\'est-ce qui a failli tout faire dérailler cette semaine ?',
    'Quel schéma commences-tu à reconnaître en toi ?',
    'Qu\'est-ce que ça veut dire pour toi de tenir, concrètement ?',
    'Qu\'est-ce qui change quand tu es là pour toi ?',
    'Qu\'est-ce qui t\'a surpris chez toi cette semaine ?',
    'Pour quoi es-tu plus patient qu\'avant ?',
    'Qu\'est-ce qui prend trop de place dans ta tête ?',
    'De quoi as-tu de moins en moins besoin ?',
    'Qu\'est-ce qui est plus facile qu\'au début ?',
    'En quoi commences-tu à te faire confiance ?',
    'Qu\'est-ce qui a capté ton attention cette semaine — et comment tu es revenu à toi ?',
    'Qu\'est-ce que tu as protégé cette semaine ?',
    'Qu\'est-ce que tu aimerais faire avec plus de calme la semaine prochaine ?',
    'D\'où est venue ton énergie cette semaine ?',
    'À quoi as-tu dit non cette semaine ?',
    'Quel moment de cette semaine t\'a semblé le plus comme toi ?',
  ],
  consistency: [
    'Qu\'est-ce que le fait de rester ici protège en silence ?',
    'Qui es-tu en train de devenir, doucement ?',
    'Qu\'est-ce qui ne t\'épuise plus comme avant ?',
    'Qu\'est-ce que tu te serais dit au début, avec plus de douceur ?',
    'Qu\'est-ce qui ne demande plus autant d\'effort qu\'avant ?',
    'Quelle croyance sur toi a changé sans que tu l\'aies voulu ?',
    'Qu\'est-ce que tu te dis maintenant que tu ne pouvais pas avant ?',
    'De quoi as-tu moins peur qu\'avant ?',
    'Qu\'est-ce que tu n\'as plus besoin de te forcer à faire ?',
    'Qu\'est-ce qui est resté pareil même quand tout changeait ?',
    'Qu\'est-ce qui ressemble moins à un effort que ces dernières semaines ?',
    'Qu\'est-ce qui a protégé ta paix cette semaine ?',
    'Qu\'est-ce qui t\'a déstabilisé cette semaine — et qu\'est-ce qui t\'a aidé à revenir ?',
    'Qu\'est-ce que tu fais avec plus de soin et d\'attention maintenant ?',
    'Qu\'est-ce qui t\'a aidé à tenir quand tu n\'en avais pas envie ?',
    'Qu\'est-ce que tu n\'échangerais pas contre ce que tu as construit ?',
    'À quoi ressemble une bonne journée pour toi maintenant ?',
    'Qu\'est-ce que tu as remarqué chez quelqu\'un d\'autre cette semaine qui te semblait familier ?',
    'Qu\'est-ce que tu es plus prêt à protéger qu\'avant ?',
    'Qu\'est-ce que tu t\'es finalement permis de voir cette semaine ?',
  ],
  transformation: [
    'Qui serait surpris de voir qui tu es aujourd\'hui ?',
    'Quelle forme de difficulté est devenue plus silencieuse ?',
    'Qu\'est-ce qui a perdu de son emprise sur toi ?',
    'Comment le fait d\'être là chaque jour a changé ta façon de voir le temps ?',
    'Sur quoi es-tu plus honnête avec toi maintenant ?',
    'Comment tu ressens le fait de te faire confiance maintenant ?',
    'Qu\'est-ce que tu dirais à la version de toi qui a commencé tout ça ?',
    'Qu\'est-ce que tu sais avec certitude sur toi maintenant ?',
    'Qu\'est-ce qui est sorti de tout ça que tu n\'attendais pas ?',
    'Qu\'est-ce qui mérite plus de ton attention maintenant ?',
    'Qu\'est-ce que tout ça t\'a appris sur la patience ?',
    'Quelle partie de ton ancien toi tu comprends mieux maintenant ?',
    'Qu\'est-ce qui s\'est apaisé autour de toi pendant que tu t\'apaisais ?',
    'À quoi tu réagis moins qu\'avant ?',
    'Quelle petite chose a plus de sens pour toi maintenant ?',
    'Qu\'est-ce qui est devenu plus facile quand tu as arrêté de forcer ?',
    'Qu\'est-ce que tu ne déferais pas de ces mois ?',
    'Quelle partie de toi se sent plus posée maintenant ?',
  ],
  identity: [
    'Qu\'est-ce qui est devenu essentiel pour toi, en silence ?',
    'Comment l\'effort se ressent maintenant par rapport au début ?',
    'Qu\'est-ce que tu as appris sur toi que tu n\'aurais pas pu apprendre autrement ?',
    'De quoi tu n\'as plus besoin alors que tu pensais en avoir besoin ?',
    'Qu\'est-ce que tu sais clairement ne pas vouloir perdre ?',
    'En quel type de personne tu t\'es transformé sans l\'avoir prévu ?',
    'Comment tu te traites différemment ces derniers temps ?',
    'Qu\'est-ce que tu vois chez les autres que tu voyais en toi avant ?',
    'Qu\'est-ce que le calme signifie pour toi maintenant ?',
    'Qui es-tu encore en train de devenir ?',
    'Qu\'est-ce que ça fait, un an à tenir tout ça, de l\'intérieur ?',
    'Pour quoi as-tu été plus indulgent avec toi ?',
    'Qu\'est-ce que ton toi d\'aujourd\'hui doit à ton toi d\'avant ?',
    'Qu\'est-ce que tu voudrais que quelqu\'un qui commence sache ?',
    'Qu\'est-ce qui s\'est tu là où il y avait du bruit avant ?',
    'Qu\'est-ce que tu sais sur toi maintenant que tu ne savais pas avant ?',
  ],
  universal: [
    'Qu\'est-ce qui a rendu aujourd\'hui un peu plus gérable que prévu ?',
    'Qu\'est-ce qui se sent différent cette semaine ?',
    'Qui es-tu en train de devenir, doucement ?',
    'Qu\'est-ce qui t\'a distrait aujourd\'hui ?',
    'Qu\'est-ce qui a protégé ta paix aujourd\'hui ?',
    'Quel moment aujourd\'hui t\'a semblé le plus comme toi ?',
    'Qu\'est-ce que tu veux emporter pour demain ?',
    'Qu\'est-ce qui a été plus dur aujourd\'hui qu\'hier ?',
    'Qu\'est-ce que cette journée t\'a demandé que tu n\'attendais pas ?',
    'Qu\'est-ce qui t\'a apporté un peu de soulagement récemment ?',
  ],
};

// ─── German (DE) ──────────────────────────────────────────────────────────────
const DE_REFLECTIONS: Record<string, string[]> = {
  beginning: [
    'Was hat dich heute dazu gebracht, anzufangen?',
    'Was gibst du dir heute an Raum?',
    'Was möchtest du diese Woche für dich bewahren?',
    'Was würde deinen Tag ein bisschen leichter machen?',
    'Was hat dich beim Anfangen überrascht?',
    'Was fühlt sich heute anders an als gestern?',
    'Warum hast du heute gewählt, anzufangen?',
    'Was hast du heute Kleines an dir selbst bemerkt?',
    'Was hoffst du, mehr davon zu haben?',
    'Wie fühlt sich dieser Anfang an — ehrlich gesagt?',
    'Was lohnt es sich gerade zu schützen?',
    'Worüber würdest du dir heute gerne weniger Druck machen?',
    'Was hat dieser Tag von dir verlangt?',
    'Was fühlt sich leichter an, seit du angefangen hast?',
    'Was erlaubst du dir langsam zu wollen?',
  ],
  momentum: [
    'Was hat sich letzte Woche verändert, ohne dass du es wirklich bemerkt hast?',
    'Was wäre diese Woche fast dazwischengekommen?',
    'Welches Muster fängst du an, bei dir zu erkennen?',
    'Was bedeutet es für dich, dran zu bleiben — konkret?',
    'Was verändert sich, wenn du für dich da bist?',
    'Was hat dich diese Woche an dir selbst überrascht?',
    'Womit bist du geduldiger als früher?',
    'Was nimmt gerade zu viel Platz in deinem Kopf ein?',
    'Was brauchst du immer weniger?',
    'Was fühlt sich leichter an als am Anfang?',
    'Worin fängst du an, dir selbst zu vertrauen?',
    'Was hat deine Aufmerksamkeit diese Woche gefordert — und wie bist du zurückgekehrt?',
    'Was hast du diese Woche geschützt?',
    'Was würdest du dir nächste Woche gerne ruhiger angehen?',
    'Woher kam deine Energie diese Woche?',
    'Wozu hast du diese Woche Nein gesagt?',
    'Welcher Moment diese Woche hat sich am meisten wie du angefühlt?',
  ],
  consistency: [
    'Was schützt das stille Dranbleiben?',
    'Wer wirst du gerade langsam?',
    'Was erschöpft dich nicht mehr wie früher?',
    'Was hättest du dir am Anfang — mit mehr Milde — gesagt?',
    'Was erfordert nicht mehr so viel Aufwand wie früher?',
    'Welche Überzeugung über dich hat sich still verändert?',
    'Was sagst du dir jetzt, was du früher nicht konntest?',
    'Wovor hast du weniger Angst als früher?',
    'Wozu musst du dich nicht mehr zwingen?',
    'Was ist gleich geblieben, während sich alles verändert hat?',
    'Was fühlt sich weniger wie Anstrengung an als noch vor ein paar Wochen?',
    'Was hat diese Woche deine Ruhe geschützt?',
    'Was hat dich diese Woche aus dem Gleichgewicht gebracht — und was hat geholfen, zurückzukommen?',
    'Was machst du jetzt mit mehr Sorgfalt und Aufmerksamkeit?',
    'Was hat dir geholfen, da zu sein, als du keine Lust hattest?',
    'Was würdest du nicht gegen das tauschen, was du aufgebaut hast?',
    'Wie sieht ein guter Tag für dich jetzt aus?',
    'Was hast du diese Woche bei jemandem bemerkt, das sich vertraut angefühlt hat?',
    'Was bist du mehr bereit zu schützen als früher?',
    'Was hast du diese Woche endlich sehen lassen?',
  ],
  transformation: [
    'Wen würde es überraschen, wer du heute bist?',
    'Welche Form von Schwierigkeit ist stiller geworden?',
    'Was hat seinen Griff auf dich verloren?',
    'Wie hat sich dein Blick auf Zeit verändert, seitdem du täglich hier bist?',
    'Womit bist du jetzt ehrlicher zu dir selbst?',
    'Wie fühlt es sich an, dir selbst zu vertrauen?',
    'Was würdest du der Version von dir sagen, die damit angefangen hat?',
    'Was weißt du jetzt mit Sicherheit über dich?',
    'Was Gutes ist durch das Dranbleiben entstanden, das du nicht erwartet hast?',
    'Was verdient jetzt mehr von deiner Aufmerksamkeit?',
    'Was hat dir das alles über Geduld beigebracht?',
    'Welchen Teil deines früheren Ichs verstehst du jetzt besser?',
    'Was hat sich um dich herum beruhigt, während du ruhiger geworden bist?',
    'Worauf reagierst du weniger als früher?',
    'Welche Kleinigkeit hat jetzt mehr Bedeutung für dich?',
    'Was ist leichter geworden, seit du aufgehört hast, es zu erzwingen?',
    'Was aus diesen Monaten würdest du nicht rückgängig machen?',
    'Welcher Teil von dir fühlt sich jetzt gefestigter an?',
  ],
  identity: [
    'Was ist für dich still unentbehrlich geworden?',
    'Wie fühlt sich Anstrengung jetzt an, verglichen mit dem Anfang?',
    'Was hast du über dich gelernt, das du sonst nicht hättest lernen können?',
    'Was brauchst du nicht mehr, obwohl du dachtest, du würdest es brauchen?',
    'Was weißt du klar, dass du nicht loslassen willst?',
    'Was für ein Mensch bist du geworden, ohne es geplant zu haben?',
    'Wie gehst du in letzter Zeit anders mit dir um?',
    'Was siehst du in anderen, das du früher in dir selbst gesehen hast?',
    'Was bedeutet Ruhe für dich jetzt?',
    'Wer bist du noch dabei zu werden?',
    'Wie fühlt sich ein Jahr Dranbleiben von innen an?',
    'Womit bist du nachsichtiger mit dir selbst geworden?',
    'Was schuldet dein heutiges Ich deinem früheren Ich?',
    'Was würdest du jemandem wünschen, der jetzt anfängt, zu wissen?',
    'Was ist still geworden, wo vorher Lärm war?',
    'Was weißt du jetzt über dich, was du vorher nicht wusstest?',
  ],
  universal: [
    'Was hat heute etwas leichter gemacht als erwartet?',
    'Was fühlt sich diese Woche anders an?',
    'Wer wirst du langsam?',
    'Was hat dich heute abgelenkt?',
    'Was hat heute deine Ruhe geschützt?',
    'Welcher Moment heute hat sich am meisten wie du angefühlt?',
    'Was möchtest du mit in den morgigen Tag nehmen?',
    'Was war heute schwieriger als gestern?',
    'Was hat dieser Tag von dir verlangt, das du nicht erwartet hast?',
    'Was hat kürzlich ein bisschen Erleichterung gebracht?',
  ],
};

/**
 * Returns a reflection prompt appropriate for the user's phase and context.
 * Uses a seed for variation without randomness (same seed = same prompt).
 * Avoids recently seen prompt IDs.
 */
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

  if (isDe()) {
    const pool = DE_REFLECTIONS[phase] ?? DE_REFLECTIONS.universal;
    const prompt = pool[Math.abs(seed) % pool.length];
    return { id: `de_${phase}_${seed % pool.length}`, prompt, phase, category: 'self-observation' };
  }

  // Primary pool: phase-matched English
  let pool = ALL_REFLECTIONS.filter(r => r.phase === phase);

  // Filter out recently shown
  const fresh = pool.filter(r => !recentIds.includes(r.id));

  // If all phase-matched have been shown, fall back to full pool
  const candidates = fresh.length > 0 ? fresh : pool;

  // If candidates empty, use universal
  const final = candidates.length > 0 ? candidates : UNIVERSAL;

  return final[seed % final.length];
}

// ─── Future Self System ───────────────────────────────────────────────────────
import { isEs, isPt, isFr, pickLocalized } from './langStore';
// Centralized engine for future identity messaging, transformation projections,
// comeback framing, and reflection prompts.
// Tone: calm · sophisticated · emotionally intelligent · premium · reflective

// ─── Types ────────────────────────────────────────────────────────────────────

export type FuturePhase =
  | 'beginning'
  | 'momentum'
  | 'consistency'
  | 'transformation'
  | 'identity_shift';

export interface FutureIdentityPhaseData {
  phase: FuturePhase;
  label: string;
  message: string;
  subtext: string;
}

export interface ProjectionLine {
  days: number;
  label: string;
  transformation: string;
  reached: boolean;
}

export interface TransformationProjection {
  header: string;
  intro: string;
  lines: ProjectionLine[];
  closing: string;
}

// ─── Future Identity Phase ────────────────────────────────────────────────────

export function getFutureIdentityPhase(
  streak: number,
  totalDays: number,
): FutureIdentityPhaseData {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  if (totalDays >= 90 || streak >= 60) {
    return {
      phase: 'identity_shift',
      label: es ? 'Cambio de Identidad' : pt ? 'Mudança de Identidade' : fr ? 'Changement d\'identité' : 'Identity Shift',
      message: es ? 'Esto ya no es temporal.' : pt ? 'Isso não é mais temporário.' : fr ? 'Ce n\'est plus temporaire.' : 'This is no longer temporary.',
      subtext: es ? 'Lo que comenzó como una intención se ha convertido en parte de quien eres.'
        : pt ? 'O que começou como uma intenção se tornou parte de quem você é.'
        : fr ? 'Ce qui a commencé comme une intention est devenu partie de qui tu es.'
        : 'What began as an intention has become part of who you are.',
    };
  }
  if (totalDays >= 60 || streak >= 30) {
    return {
      phase: 'transformation',
      label: es ? 'Transformación' : pt ? 'Transformação' : fr ? 'Transformation' : 'Transformation',
      message: es ? 'Te estás convirtiendo en la persona que necesitabas.'
        : pt ? 'Você está se tornando a pessoa de que precisava.'
        : fr ? 'Tu deviens la personne dont tu avais besoin.'
        : 'You are becoming the person you needed.',
      subtext: es ? 'La versión que se construye ahora es la que permanece.'
        : pt ? 'A versão de você que está sendo construída agora é a que fica.'
        : fr ? 'La version de toi qui se construit maintenant est celle qui reste.'
        : 'The version of you being built now is the one that lasts.',
    };
  }
  if (totalDays >= 22 || streak >= 7) {
    return {
      phase: 'consistency',
      label: es ? 'Consistencia' : pt ? 'Constância' : fr ? 'Constance' : 'Consistency',
      message: es ? 'La consistencia se está volviendo natural.'
        : pt ? 'A constância está se tornando natural.'
        : fr ? 'La constance devient naturelle.'
        : 'Consistency is becoming natural.',
      subtext: es ? 'Te estás demostrando algo — en silencio, cada día.'
        : pt ? 'Você está provando algo para si mesma — quietamente, a cada dia.'
        : fr ? 'Tu te prouves quelque chose — tranquillement, chaque jour.'
        : 'You are proving something to yourself — quietly, daily.',
    };
  }
  if (totalDays >= 8 || streak >= 3) {
    return {
      phase: 'momentum',
      label: es ? 'Impulso' : pt ? 'Impulso' : fr ? 'Élan' : 'Momentum',
      message: es ? 'Tu futuro está respondiendo a la repetición.'
        : pt ? 'Seu futuro está respondendo à repetição.'
        : fr ? 'Ton avenir répond à la répétition.'
        : 'Your future is responding to repetition.',
      subtext: es ? 'Algo está cambiando. Puede que aún no lo veas. Pero está pasando.'
        : pt ? 'Algo está mudando. Você pode não ver ainda. Mas está acontecendo.'
        : fr ? 'Quelque chose change. Tu ne le vois peut-être pas encore. Mais ça se passe.'
        : 'Something is changing. You may not see it yet. But it is.',
    };
  }
  return {
    phase: 'beginning',
    label: es ? 'Comienzo' : pt ? 'Início' : fr ? 'Début' : 'Beginning',
    message: es ? 'Tu futuro yo se construye en silencio.'
      : pt ? 'Seu eu futuro está sendo construído em silêncio.'
      : fr ? 'Ton futur se construit tranquillement.'
      : 'Your future self is built quietly.',
    subtext: es ? 'La consistencia pequeña cambia la identidad. Empieza aquí.'
      : pt ? 'A pequena constância muda a identidade. Começa aqui.'
      : fr ? 'La petite constance change l\'identité. Ça commence ici.'
      : 'Small consistency changes identity. It begins here.',
  };
}

// ─── Transformation Projection ────────────────────────────────────────────────

const PROJECTION_EN = [
  { days: 7,   label: '7 days',    transformation: 'momentum begins' },
  { days: 30,  label: '1 month',   transformation: 'focus becomes clearer' },
  { days: 60,  label: '2 months',  transformation: 'routines become natural' },
  { days: 90,  label: '3 months',  transformation: 'identity begins to shift' },
  { days: 180, label: '6 months',  transformation: 'this is who you are now' },
];
const PROJECTION_ES = [
  { days: 7,   label: '7 días',    transformation: 'el impulso comienza' },
  { days: 30,  label: '1 mes',     transformation: 'el enfoque se vuelve más claro' },
  { days: 60,  label: '2 meses',   transformation: 'las rutinas se vuelven naturales' },
  { days: 90,  label: '3 meses',   transformation: 'la identidad comienza a cambiar' },
  { days: 180, label: '6 meses',   transformation: 'esto es quien eres ahora' },
];
const PROJECTION_PT = [
  { days: 7,   label: '7 dias',    transformation: 'o impulso começa' },
  { days: 30,  label: '1 mês',     transformation: 'o foco fica mais claro' },
  { days: 60,  label: '2 meses',   transformation: 'as rotinas se tornam naturais' },
  { days: 90,  label: '3 meses',   transformation: 'a identidade começa a mudar' },
  { days: 180, label: '6 meses',   transformation: 'é quem você é agora' },
];
const PROJECTION_FR = [
  { days: 7,   label: '7 jours',   transformation: "l'élan commence" },
  { days: 30,  label: '1 mois',    transformation: 'la clarté se renforce' },
  { days: 60,  label: '2 mois',    transformation: 'les habitudes deviennent naturelles' },
  { days: 90,  label: '3 mois',    transformation: "l'identité commence à changer" },
  { days: 180, label: '6 mois',    transformation: "c'est qui tu es maintenant" },
];

export function getTransformationProjection(
  currentDay: number,
  streak: number,
): TransformationProjection {
  const milestones = isEs() ? PROJECTION_ES : isPt() ? PROJECTION_PT : isFr() ? PROJECTION_FR : PROJECTION_EN;
  const lines: ProjectionLine[] = milestones.map(m => ({
    ...m,
    reached: currentDay >= m.days,
  }));

  const reached = lines.filter(l => l.reached).length;

  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  const header =
    reached === 0
      ? (pt ? 'Se você continuar' : es ? 'Si continúas' : fr ? 'Si tu continues' : 'If you continue')
      : reached === lines.length
      ? (pt ? 'Onde você chegou' : es ? 'A dónde has llegado' : fr ? 'Où tu es arrivé' : 'Where you have arrived')
      : (pt ? 'Seu caminho à frente' : es ? 'Tu camino por delante' : fr ? 'Ton chemin devant toi' : 'Your path forward');

  const intro =
    reached === 0
      ? (pt ? 'Cada dia molda o que vem a seguir.' : es ? 'Cada día da forma a lo que viene después.' : fr ? 'Chaque jour façonne ce qui vient ensuite.' : 'Every day shapes what comes next.')
      : reached >= 4
      ? (pt ? 'Veja até onde você chegou.' : es ? 'Mira hasta dónde has llegado.' : fr ? 'Regarde jusqu\'où tu es arrivé.' : 'Look at how far you\'ve come.')
      : (pt ? 'Você já cruzou marcos reais.' : es ? 'Ya has cruzado hitos reales.' : fr ? 'Tu as déjà franchi de vrais jalons.' : 'You\'ve already crossed real thresholds.');

  const closing =
    reached === lines.length
      ? (pt ? 'Você voltou, de novo e de novo. Essa é a prática toda.' : es ? 'Volviste, una y otra vez. Esa es la práctica completa.' : fr ? 'Tu es revenu, encore et encore. C\'est toute la pratique.' : 'You returned, again and again. That is the whole practice.')
      : reached >= 3
      ? (pt ? 'O próximo capítulo já está se formando.' : es ? 'El próximo capítulo ya se está formando.' : fr ? 'Le prochain chapitre est déjà en train de se former.' : 'The next chapter is already forming.')
      : (pt ? 'O progresso se acumula. Cada retorno importa.' : es ? 'El progreso se acumula. Cada regreso importa.' : fr ? 'Le progrès se cumule. Chaque retour compte.' : 'Progress compounds. Each return matters.');

  return { header, intro, lines, closing };
}

// ─── Future Milestone Messages ────────────────────────────────────────────────

export function getFutureMilestoneMessage(milestone: number): {
  headline: string;
  body: string;
} {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  switch (milestone) {
    case 3:
      return {
        headline: es ? 'Algo estable ha comenzado.' : fr ? 'Quelque chose de stable a commencé.' : 'Something steady has started.',
        body: es ? 'Tres días es donde el ritmo empieza a formarse.' : fr ? 'Trois jours, c\'est là où le rythme commence à se former.' : 'Three days is where the rhythm begins to form.',
      };
    case 7:
      return {
        headline: es ? 'Una semana eligiéndote.' : fr ? 'Une semaine à te choisir.' : 'One week of choosing yourself.',
        body: es ? 'Aquí es donde el futuro empieza a sentirse real.' : fr ? 'C\'est ici que le futur commence à sembler réel.' : 'This is where the future starts to feel real.',
      };
    case 14:
      return {
        headline: es ? 'Dos semanas. Algo está cambiando.' : fr ? 'Deux semaines. Quelque chose change.' : 'Two weeks. Something is shifting.',
        body: es ? 'La constancia a este nivel reconfigura cómo te ves.' : fr ? 'La constance à ce niveau change la façon dont tu te vois.' : 'Consistency at this level rewires how you see yourself.',
      };
    case 21:
      return {
        headline: es ? 'Tres semanas. La constancia se vuelve natural.' : fr ? 'Trois semaines. La constance devient naturelle.' : 'Three weeks. Consistency is becoming natural.',
        body: es ? 'Tu cerebro está construyendo nuevos patrones. Esto es cambio real.' : fr ? 'Ton cerveau construit de nouveaux schémas. C\'est un vrai changement.' : 'Your brain is building new defaults. This is real change.',
      };
    case 30:
      return {
        headline: es ? 'Estás construyendo constancia.' : fr ? 'Tu construis une constance.' : 'You are building consistency.',
        body: es ? 'Un mes apareciendo. Esa versión de ti es permanente.' : fr ? 'Un mois à te montrer. Cette version de toi est permanente.' : 'A month of showing up. That version of you is permanent.',
      };
    case 60:
      return {
        headline: es ? 'Tus rutinas se están convirtiendo en tu futuro.' : fr ? 'Tes habitudes deviennent ton avenir.' : 'Your routines are becoming your future.',
        body: es ? 'Dos meses de repetición cambian más de lo que imaginas.' : fr ? 'Deux mois de répétition changent plus que tu ne l\'imagines.' : 'Two months of repetition changes more than you realise.',
      };
    case 90:
      return {
        headline: es ? 'Esto ya no es esfuerzo. Es quien eres.' : fr ? 'Ce n\'est plus un effort. C\'est qui tu es.' : 'This is no longer effort. It is who you are.',
        body: es ? 'Noventa días volviendo a ti. Eso es identidad.' : fr ? 'Quatre-vingt-dix jours à revenir à toi. C\'est une identité.' : 'Ninety days of returning to yourself. That is identity.',
      };
    case 100:
      return {
        headline: es ? 'Cien días.' : fr ? 'Cent jours.' : 'One hundred days.',
        body: es ? 'Este número es permanente. Nadie puede quitártelo.' : fr ? 'Ce nombre est permanent. Personne ne peut te l\'enlever.' : 'This number is permanent. No one can take it from you.',
      };
    case 180:
      return {
        headline: es ? 'Seis meses. Cambiaste.' : fr ? 'Six mois. Tu as changé.' : 'Six months. You changed.',
        body: es ? 'Esto ya no es algo que estás intentando. Es quien eres.' : fr ? 'Ce n\'est plus quelque chose que tu essaies. C\'est qui tu es.' : 'This is no longer something you\'re trying. It\'s who you are.',
      };
    case 365:
      return {
        headline: es ? 'Un año entero apareciendo.' : fr ? 'Une année entière à te montrer.' : 'A full year of showing up.',
        body: es ? 'Te convertiste en alguien diferente. Eso no es inspiración. Es real.' : fr ? 'Tu es devenu quelqu\'un de différent. Ce n\'est pas de l\'inspiration. C\'est réel.' : 'You became someone different. That\'s not inspiration. That\'s real.',
      };
    default:
      return {
        headline: es ? `Día ${milestone}.` : fr ? `Jour ${milestone}.` : `Day ${milestone}.`,
        body: es ? 'Cada hito es permanente. Este es tuyo.' : fr ? 'Chaque jalon est permanent. Celui-ci t\'appartient.' : 'Every milestone is permanent. This one is yours.',
      };
  }
}

// ─── Comeback Future Narrative ────────────────────────────────────────────────

export function getComebackFutureNarrative(totalDays: number): {
  headline: string;
  body: string;
} {
  const pt = isPt();
  const es = isEs();
  const fr = isFr();
  if (totalDays >= 30) {
    return {
      headline: pt ? 'Seu futuro ainda está esperando.' : es ? 'Tu futuro todavía te espera.' : fr ? 'Ton avenir t\'attend encore.' : 'Your future is still waiting.',
      body: pt ? 'O que você construiu antes ainda vive dentro de você. Pode continuar daqui.'
        : es ? 'Lo que construiste antes todavía vive dentro de ti. Puedes continuar desde aquí.'
        : fr ? 'Ce que tu as construit avant vit encore en toi. Tu peux continuer d\'ici.'
        : 'What you built before still lives inside you. You can continue from here.',
    };
  }
  if (totalDays >= 7) {
    return {
      headline: pt ? 'Uma semana difícil não apaga o progresso.' : es ? 'Una semana difícil no borra el progreso.' : fr ? 'Une semaine difficile n\'efface pas le progrès.' : 'A difficult week does not erase progress.',
      body: pt ? 'Os dias em que você apareceu são permanentes. Pode adicionar mais.'
        : es ? 'Los días en que apareciste son permanentes. Puedes agregar más.'
        : fr ? 'Les jours où tu t\'es montré sont permanents. Tu peux en ajouter.'
        : 'The days you showed up are permanent. You can add more.',
    };
  }
  return {
    headline: pt ? 'Você pode continuar daqui.' : es ? 'Puedes continuar desde aquí.' : fr ? 'Tu peux continuer d\'ici.' : 'You can continue from here.',
    body: pt ? 'Cada retorno é um novo começo. Seu futuro não mudou — só o caminho.'
      : es ? 'Cada regreso es un nuevo comienzo. Tu futuro no cambió — solo el camino.'
      : fr ? 'Chaque retour est un nouveau départ. Ton avenir n\'a pas changé — seulement le chemin.'
      : 'Every return is a fresh beginning. Your future didn\'t change — only the path.',
  };
}

// ─── Reflection Prompts ───────────────────────────────────────────────────────

const REFLECTION_PROMPTS_BEGINNING = [
  'What version of yourself are you building?',
  'What changes if you keep showing up?',
  'Who do you want to become this year?',
];
const REFLECTION_PROMPTS_BEGINNING_PT = [
  'Que versão de você mesma você está construindo?',
  'O que muda se você continuar aparecendo?',
  'Em quem você quer se tornar este ano?',
];

const REFLECTION_PROMPTS_MOMENTUM = [
  'How would future you feel about today?',
  'What becomes possible if this continues?',
  'What are you proving to yourself right now?',
];
const REFLECTION_PROMPTS_MOMENTUM_PT = [
  'Como o seu eu futuro se sentiria sobre hoje?',
  'O que se torna possível se isso continuar?',
  'O que você está provando para si mesma agora?',
];

const REFLECTION_PROMPTS_CONSISTENCY = [
  'What does your consistency say about who you\'re becoming?',
  'What would your future self want you to know today?',
  'What has changed in you that you almost didn\'t notice?',
];
const REFLECTION_PROMPTS_CONSISTENCY_PT = [
  'O que sua constância diz sobre quem você está se tornando?',
  'O que seu eu futuro gostaria que você soubesse hoje?',
  'O que mudou em você que você quase não percebeu?',
];

const REFLECTION_PROMPTS_TRANSFORMATION = [
  'How different is this version of you from six months ago?',
  'What would you tell the version of you who started this journey?',
  'What has showing up consistently taught you about yourself?',
];
const REFLECTION_PROMPTS_TRANSFORMATION_PT = [
  'Quão diferente é esta versão de você de seis meses atrás?',
  'O que você diria para a versão de você que começou essa jornada?',
  'O que aparecer consistentemente ensinou sobre você mesma?',
];

const REFLECTION_PROMPTS_BEGINNING_ES = [
  '¿Qué versión de ti mismo estás construyendo?',
  '¿Qué cambia si sigues apareciendo?',
  '¿En quién quieres convertirte este año?',
];

const REFLECTION_PROMPTS_MOMENTUM_ES = [
  '¿Cómo se sentiría tu yo futuro sobre hoy?',
  '¿Qué se vuelve posible si esto continúa?',
  '¿Qué te estás demostrando a ti mismo ahora mismo?',
];

const REFLECTION_PROMPTS_CONSISTENCY_ES = [
  '¿Qué dice tu constancia sobre en quién te estás convirtiendo?',
  '¿Qué querría que supieras tu yo futuro hoy?',
  '¿Qué ha cambiado en ti que casi no notaste?',
];

const REFLECTION_PROMPTS_TRANSFORMATION_ES = [
  '¿Cuán diferente es esta versión de ti de hace seis meses?',
  '¿Qué le dirías a la versión de ti que comenzó este camino?',
  '¿Qué te ha enseñado aparecer consistentemente sobre ti mismo?',
];

const REFLECTION_PROMPTS_BEGINNING_FR = [
  'Quelle version de toi es-tu en train de construire ?',
  'Qu\'est-ce qui change si tu continues à revenir ?',
  'Qui veux-tu devenir cette année ?',
];
const REFLECTION_PROMPTS_MOMENTUM_FR = [
  'Comment ton futur toi se sentirait par rapport à aujourd\'hui ?',
  'Qu\'est-ce qui devient possible si ça continue ?',
  'Que te prouves-tu en ce moment ?',
];
const REFLECTION_PROMPTS_CONSISTENCY_FR = [
  'Que dit ta constance sur qui tu deviens ?',
  'Qu\'est-ce que ton futur toi voudrait que tu saches aujourd\'hui ?',
  'Qu\'est-ce qui a changé en toi que tu n\'as presque pas remarqué ?',
];
const REFLECTION_PROMPTS_TRANSFORMATION_FR = [
  'En quoi cette version de toi est différente d\'il y a six mois ?',
  'Que dirais-tu à la version de toi qui a commencé ce chemin ?',
  'Qu\'est-ce que te montrer régulièrement t\'a appris sur toi ?',
];

export function getFutureReflectionPrompt(streak: number, totalDays: number): string {
  const phase = getFutureIdentityPhase(streak, totalDays);
  const pt = isPt();
  const es = isEs();
  const fr = isFr();

  if (pt) {
    const pool =
      phase.phase === 'identity_shift' || phase.phase === 'transformation'
        ? REFLECTION_PROMPTS_TRANSFORMATION_PT
        : phase.phase === 'consistency'
        ? REFLECTION_PROMPTS_CONSISTENCY_PT
        : phase.phase === 'momentum'
        ? REFLECTION_PROMPTS_MOMENTUM_PT
        : REFLECTION_PROMPTS_BEGINNING_PT;
    const seed = (streak + totalDays) % pool.length;
    return pool[seed];
  }

  if (es) {
    const pool =
      phase.phase === 'identity_shift' || phase.phase === 'transformation'
        ? REFLECTION_PROMPTS_TRANSFORMATION_ES
        : phase.phase === 'consistency'
        ? REFLECTION_PROMPTS_CONSISTENCY_ES
        : phase.phase === 'momentum'
        ? REFLECTION_PROMPTS_MOMENTUM_ES
        : REFLECTION_PROMPTS_BEGINNING_ES;
    const seed = (streak + totalDays) % pool.length;
    return pool[seed];
  }

  if (fr) {
    const pool =
      phase.phase === 'identity_shift' || phase.phase === 'transformation'
        ? REFLECTION_PROMPTS_TRANSFORMATION_FR
        : phase.phase === 'consistency'
        ? REFLECTION_PROMPTS_CONSISTENCY_FR
        : phase.phase === 'momentum'
        ? REFLECTION_PROMPTS_MOMENTUM_FR
        : REFLECTION_PROMPTS_BEGINNING_FR;
    const seed = (streak + totalDays) % pool.length;
    return pool[seed];
  }

  const pool =
    phase.phase === 'identity_shift' || phase.phase === 'transformation'
      ? REFLECTION_PROMPTS_TRANSFORMATION
      : phase.phase === 'consistency'
      ? REFLECTION_PROMPTS_CONSISTENCY
      : phase.phase === 'momentum'
      ? REFLECTION_PROMPTS_MOMENTUM
      : REFLECTION_PROMPTS_BEGINNING;

  const seed = (streak + totalDays) % pool.length;
  return pool[seed];
}

// ─── Future Self Notification Copy ───────────────────────────────────────────

export const futureSelfNotifications: Array<{ title: string; body: string }> = [
  {
    title: 'One small reset shapes tomorrow.',
    body: 'Your future is built quietly — one day at a time.',
  },
  {
    title: 'Your future is being built today.',
    body: 'Continue becoming who you want to be.',
  },
  {
    title: 'Small consistency changes identity.',
    body: 'Today still matters. Come back.',
  },
  {
    title: 'Your future is still waiting.',
    body: 'One reset. That\'s all it takes.',
  },
  {
    title: 'The person you want to become',
    body: 'is built daily. Today is part of that.',
  },
  {
    title: 'Future calmness begins here.',
    body: 'One action today. Your future self is watching.',
  },
  {
    title: 'You are becoming harder to distract.',
    body: 'Keep the thread going. Complete today\'s reset.',
  },
  {
    title: 'Progress compounds.',
    body: 'Your routines are quietly becoming your future.',
  },
];

// ─── Standard Future Self Narrative (for FutureSelfCard 'standard' variant) ──

interface FutureSelfMessage {
  headline: string;
  body: string;
}

const FUTURE_MESSAGES_BEGINNING: FutureSelfMessage[] = [
  {
    headline: 'Your future self is watching today.',
    body: 'Every small action compounds into who you become.',
  },
  {
    headline: 'The person you want to become is built daily.',
    body: 'Today was a quiet vote for that version of you.',
  },
  {
    headline: 'Every transformation starts exactly here.',
    body: 'Not with a dramatic change. With a single, consistent choice.',
  },
];

const FUTURE_MESSAGES_MOMENTUM: FutureSelfMessage[] = [
  {
    headline: 'Your future is responding to repetition.',
    body: 'You may not feel the change yet. But it is already happening.',
  },
  {
    headline: 'You are becoming harder to distract.',
    body: 'Each reset reinforces something deeper than habit.',
  },
  {
    headline: 'Small consistency changes identity.',
    body: 'This version of you is being built one day at a time.',
  },
];

const FUTURE_MESSAGES_CONSISTENCY: FutureSelfMessage[] = [
  {
    headline: 'Your routines are becoming your future.',
    body: 'What began as discipline is becoming instinct.',
  },
  {
    headline: 'Discipline is becoming natural.',
    body: 'You are proving something to yourself — quietly, daily.',
  },
  {
    headline: 'Future calmness begins here.',
    body: 'The calm you\'re building now will protect you later.',
  },
];

const FUTURE_MESSAGES_TRANSFORMATION: FutureSelfMessage[] = [
  {
    headline: 'You are becoming the person you needed.',
    body: 'That version of you is no longer a future idea. It\'s emerging.',
  },
  {
    headline: 'Progress compounds.',
    body: 'What you\'ve built so far is permanent. Keep adding to it.',
  },
  {
    headline: 'This version of you is real.',
    body: 'The transformation isn\'t coming. You\'re already inside it.',
  },
];

const FUTURE_MESSAGES_IDENTITY: FutureSelfMessage[] = [
  {
    headline: 'This is no longer temporary.',
    body: 'What started as effort has become who you are.',
  },
  {
    headline: 'Your future is shaped quietly.',
    body: 'And quietly, it already has been.',
  },
  {
    headline: 'You became someone different.',
    body: 'Not in a single moment. In every moment you chose to return.',
  },
];

const ES_MESSAGES: Record<string, FutureSelfMessage[]> = {
  beginning: [
    { headline: 'El futuro que estás creando empieza hoy.', body: 'Cada pequeña acción se acumula en quien te conviertes.' },
    { headline: 'La persona en quien quieres convertirte se construye diariamente.', body: 'Hoy fue un voto silencioso por esa versión de ti.' },
    { headline: 'Toda transformación comienza exactamente aquí.', body: 'No con un cambio dramático. Con una elección consistente.' },
  ],
  momentum: [
    { headline: 'Tu futuro responde a la repetición.', body: 'Puede que aún no sientas el cambio. Pero ya está ocurriendo.' },
    { headline: 'Te estás volviendo más difícil de distraer.', body: 'Cada reset refuerza algo más profundo que un hábito.' },
    { headline: 'La pequeña consistencia cambia la identidad.', body: 'Esta versión de ti se construye un día a la vez.' },
  ],
  consistency: [
    { headline: 'Tus rutinas están convirtiéndose en tu futuro.', body: 'Lo que comenzó como disciplina se está volviendo instinto.' },
    { headline: 'La disciplina se está volviendo natural.', body: 'Te estás demostrando algo — en silencio, cada día.' },
    { headline: 'La calma futura comienza aquí.', body: 'La calma que estás construyendo ahora te protegerá después.' },
  ],
  transformation: [
    { headline: 'Te estás convirtiendo en la persona que necesitabas.', body: 'Esa versión ya no es una idea futura. Está emergiendo.' },
    { headline: 'El progreso se acumula.', body: 'Lo que has construido hasta ahora es permanente.' },
    { headline: 'Esta versión de ti es real.', body: 'La transformación no viene. Ya estás dentro de ella.' },
  ],
  identity_shift: [
    { headline: 'Esto ya no es temporal.', body: 'Lo que empezó como esfuerzo se ha convertido en quien eres.' },
    { headline: 'Tu futuro se forma en silencio.', body: 'Y en silencio, ya lo ha sido.' },
    { headline: 'Te convertiste en alguien diferente.', body: 'No en un momento. En cada momento que elegiste volver.' },
  ],
};

const PT_MESSAGES: Record<string, FutureSelfMessage[]> = {
  beginning: [
    { headline: 'Seu eu futuro está observando hoje.', body: 'Cada pequena ação se acumula em quem você se torna.' },
    { headline: 'A pessoa em quem você quer se tornar é construída diariamente.', body: 'Hoje foi um voto quieto por essa versão de você.' },
    { headline: 'Toda transformação começa exatamente aqui.', body: 'Não com uma mudança dramática. Com uma escolha consistente.' },
  ],
  momentum: [
    { headline: 'Seu futuro está respondendo à repetição.', body: 'Pode ser que você ainda não sinta a mudança. Mas ela já está acontecendo.' },
    { headline: 'Você está se tornando mais difícil de distrair.', body: 'Cada reset reforça algo mais profundo do que hábito.' },
    { headline: 'A constância pequena muda a identidade.', body: 'Esta versão de você é construída um dia de cada vez.' },
  ],
  consistency: [
    { headline: 'Suas rotinas estão se tornando seu futuro.', body: 'O que começou como disciplina está se tornando instinto.' },
    { headline: 'A disciplina está se tornando natural.', body: 'Você está provando algo para si mesma — quietamente, a cada dia.' },
    { headline: 'A calma futura começa aqui.', body: 'A calma que você está construindo agora vai te proteger depois.' },
  ],
  transformation: [
    { headline: 'Você está se tornando a pessoa de que precisava.', body: 'Essa versão já não é uma ideia futura. Ela está emergindo.' },
    { headline: 'O progresso se acumula.', body: 'O que você construiu até agora é permanente. Continue acrescentando.' },
    { headline: 'Esta versão de você é real.', body: 'A transformação não está chegando. Você já está dentro dela.' },
  ],
  identity_shift: [
    { headline: 'Isso não é mais temporário.', body: 'O que começou como esforço se tornou quem você é.' },
    { headline: 'Seu futuro se forma quietamente.', body: 'E quietamente, ele já foi.' },
    { headline: 'Você se tornou alguém diferente.', body: 'Não em um momento. Em cada momento em que você escolheu voltar.' },
  ],
};

const FR_MESSAGES: Record<string, FutureSelfMessage[]> = {
  beginning: [
    { headline: 'Ton futur toi observe aujourd\'hui.', body: 'Chaque petite action se cumule en qui tu deviens.' },
    { headline: 'La personne que tu veux devenir se construit quotidiennement.', body: 'Aujourd\'hui était un vote tranquille pour cette version de toi.' },
    { headline: 'Toute transformation commence exactement ici.', body: 'Pas avec un grand changement. Avec un choix constant.' },
  ],
  momentum: [
    { headline: 'Ton avenir répond à la répétition.', body: 'Tu ne ressens peut-être pas encore le changement. Mais il est déjà là.' },
    { headline: 'Tu deviens plus difficile à distraire.', body: 'Chaque reset renforce quelque chose de plus profond qu\'une habitude.' },
    { headline: 'La petite constance change l\'identité.', body: 'Cette version de toi se construit un jour à la fois.' },
  ],
  consistency: [
    { headline: 'Tes habitudes deviennent ton avenir.', body: 'Ce qui a commencé comme discipline devient instinct.' },
    { headline: 'La discipline devient naturelle.', body: 'Tu te prouves quelque chose — tranquillement, chaque jour.' },
    { headline: 'Le calme futur commence ici.', body: 'Le calme que tu construis maintenant te protégera plus tard.' },
  ],
  transformation: [
    { headline: 'Tu deviens la personne dont tu avais besoin.', body: 'Cette version n\'est plus une idée future. Elle émerge.' },
    { headline: 'Le progrès se cumule.', body: 'Ce que tu as construit jusqu\'ici est permanent. Continue.' },
    { headline: 'Cette version de toi est réelle.', body: 'La transformation n\'arrive pas. Tu es déjà dedans.' },
  ],
  identity_shift: [
    { headline: 'Ce n\'est plus temporaire.', body: 'Ce qui a commencé comme effort est devenu qui tu es.' },
    { headline: 'Ton avenir se forme tranquillement.', body: 'Et tranquillement, il l\'a déjà été.' },
    { headline: 'Tu es devenu quelqu\'un de différent.', body: 'Pas en un instant. À chaque instant où tu as choisi de revenir.' },
  ],
};

export function getFutureSelfNarrativeLocal(
  streak: number,
  totalDays: number,
): FutureSelfMessage {
  const phase = getFutureIdentityPhase(streak, totalDays);
  const seed = (streak + totalDays * 2);
  if (isEs()) {
    const pool = ES_MESSAGES[phase.phase] ?? ES_MESSAGES.beginning;
    return pool[seed % pool.length];
  }
  if (isPt()) {
    const pool = PT_MESSAGES[phase.phase] ?? PT_MESSAGES.beginning;
    return pool[seed % pool.length];
  }
  if (isFr()) {
    const pool = FR_MESSAGES[phase.phase] ?? FR_MESSAGES.beginning;
    return pool[seed % pool.length];
  }
  const pool =
    phase.phase === 'identity_shift' ? FUTURE_MESSAGES_IDENTITY :
    phase.phase === 'transformation' ? FUTURE_MESSAGES_TRANSFORMATION :
    phase.phase === 'consistency'    ? FUTURE_MESSAGES_CONSISTENCY :
    phase.phase === 'momentum'       ? FUTURE_MESSAGES_MOMENTUM :
    FUTURE_MESSAGES_BEGINNING;
  return pool[seed % pool.length];
}

// ─── Seeded selector ──────────────────────────────────────────────────────────

// ─── Curated dynamic identity card messages ───────────────────────────────────
// A small premium collection of emotionally intelligent messages.
// Tone: quiet · calm · grounded · intimate · non-coachy.
// Rotates by seed so variety feels natural, never random.

interface CuratedMessage {
  headline: string;
  body?: string;
}

const CURATED_COMEBACK: CuratedMessage[] = [
  { headline: 'You came back.',           body: 'That matters.' },
  { headline: 'Nothing is ruined.',        body: 'Return when ready.' },
  { headline: 'Returning is the practice.' },
  { headline: 'Hard weeks end.',           body: 'You are still here.' },
];

const CURATED_COMEBACK_ES: CuratedMessage[] = [
  { headline: 'Volviste.',                body: 'Eso importa.' },
  { headline: 'Nada está arruinado.',      body: 'Continúa desde aquí.' },
  { headline: 'Regresar es la práctica.' },
  { headline: 'Las semanas difíciles terminan.', body: 'Sigues aquí.' },
];

const CURATED_COMEBACK_PT: CuratedMessage[] = [
  { headline: 'Você voltou.',             body: 'Isso importa.' },
  { headline: 'Nada está perdido.',        body: 'Volte quando estiver pronta.' },
  { headline: 'Voltar é a prática.' },
  { headline: 'Semanas difíceis acabam.', body: 'Você ainda está aqui.' },
];

const CURATED_COMEBACK_FR: CuratedMessage[] = [
  { headline: 'Tu es revenu.',            body: 'Ça compte.' },
  { headline: 'Rien n\'est perdu.',       body: 'Reviens quand tu veux.' },
  { headline: 'Revenir, c\'est la pratique.' },
  { headline: 'Les semaines difficiles se terminent.', body: 'Tu es encore là.' },
];

const CURATED_BURNOUT_RECOVERY_PT: CuratedMessage[] = [
  { headline: 'Nada está perdido. Volte quando estiver pronta.' },
  { headline: 'Você tem liberado espaço.', body: 'A clareza vem a seguir.' },
  { headline: 'O começo já é progresso.' },
  { headline: 'Descansar e voltar.', body: 'Os dois fazem parte disso.' },
  { headline: 'Você não precisa consertar tudo hoje.' },
  { headline: 'Pequenas escolhas repetidas moldam quem você se torna.' },
  { headline: 'Você está se tornando alguém que não desiste.' },
  { headline: 'Todo dia quieto ainda conta.' },
  { headline: 'Reconstruir leva mais tempo do que quebrar.', body: 'Seja paciente.' },
  { headline: 'Você apareceu.', body: 'Isso já é suficiente para hoje.' },
  { headline: 'Seu eu futuro é grato por você não ter desistido.' },
  { headline: 'Progresso lento ainda é progresso.' },
  { headline: 'Você tem permissão para ir no seu ritmo.' },
  { headline: 'A versão de você que continuou — é quem você está se tornando.' },
];

const CURATED_BURNOUT_RECOVERY_ES: CuratedMessage[] = [
  { headline: 'Nada está perdido. Vuelve cuando estés listo.' },
  { headline: 'Has estado haciendo espacio.', body: 'La claridad llega después.' },
  { headline: 'El comienzo ya es progreso.' },
  { headline: 'Descansar y volver.', body: 'Los dos son parte de esto.' },
  { headline: 'No tienes que arreglar todo hoy.' },
  { headline: 'Las pequeñas elecciones repetidas dan forma a quien te conviertes.' },
  { headline: 'Te estás convirtiendo en alguien que no se rinde.' },
  { headline: 'Cada día tranquilo también cuenta.' },
  { headline: 'Reconstruir lleva más tiempo que romper.', body: 'Sé paciente.' },
  { headline: 'Apareciste.', body: 'Eso es suficiente para hoy.' },
  { headline: 'Lo que construiste te agradece no haber abandonado.' },
  { headline: 'El progreso lento sigue siendo progreso.' },
  { headline: 'Tienes permiso para ir a tu propio ritmo.' },
  { headline: 'La versión de ti que siguió adelante — en eso te estás convirtiendo.' },
];

const CURATED_BURNOUT_RECOVERY_FR: CuratedMessage[] = [
  { headline: 'Rien n\'est perdu. Reviens quand tu veux.' },
  { headline: 'Tu as été en train de faire de la place.', body: 'La clarté suit.' },
  { headline: 'Le début est déjà du progrès.' },
  { headline: 'Se reposer et revenir.', body: 'Les deux font partie de ça.' },
  { headline: 'Tu n\'as pas à tout régler aujourd\'hui.' },
  { headline: 'De petits choix répétés façonnent qui tu deviens.' },
  { headline: 'Tu deviens quelqu\'un qui ne abandonne pas.' },
  { headline: 'Chaque jour tranquille compte aussi.' },
  { headline: 'Reconstruire prend plus de temps que casser.', body: 'Sois patient.' },
  { headline: 'Tu t\'es montré.', body: 'C\'est assez pour aujourd\'hui.' },
  { headline: 'Ce que tu as construit te remercie de ne pas avoir abandonné.' },
  { headline: 'Le progrès lent reste du progrès.' },
  { headline: 'Tu as la permission d\'aller à ton propre rythme.' },
  { headline: 'La version de toi qui a continué — c\'est qui tu deviens.' },
];

// ── Burnout Recovery — 14 gentle messages for the FutureSelf dark card ───────
const CURATED_BURNOUT_RECOVERY: CuratedMessage[] = [
  { headline: 'Nothing is ruined. Return when ready.' },
  { headline: "You've been clearing space.", body: 'Clarity follows.' },
  { headline: 'The beginning is already progress.' },
  { headline: 'Rest and return.', body: 'Both are part of this.' },
  { headline: "You don't have to fix everything today." },
  { headline: 'Small repeated choices shape who you become.' },
  { headline: "You are becoming someone who doesn't give up." },
  { headline: 'Every quiet day still counts.' },
  { headline: 'Rebuilding takes longer than breaking.', body: 'Be patient.' },
  { headline: 'You showed up.', body: 'That is enough for today.' },
  { headline: "Your future self is grateful you didn't quit." },
  { headline: 'Slow progress is still progress.' },
  { headline: 'You are allowed to go at your own pace.' },
  { headline: "The version of you that kept going — that's who you're becoming." },
];

const CURATED_BEGINNING: CuratedMessage[] = [
  { headline: 'Still here.',               body: 'That matters more than perfection.' },
  { headline: 'You started.',              body: 'Most people never do.' },
  { headline: 'The beginning is already progress.' },
  { headline: 'Day one is done.',          body: 'That is something.' },
];

const CURATED_BEGINNING_ES: CuratedMessage[] = [
  { headline: 'Sigues aquí.',              body: 'Eso importa más que la perfección.' },
  { headline: 'Empezaste.',               body: 'La mayoría nunca lo hace.' },
  { headline: 'El principio ya es progreso.' },
  { headline: 'El día uno está hecho.',   body: 'Eso es algo.' },
];

const CURATED_BEGINNING_PT: CuratedMessage[] = [
  { headline: 'Ainda aqui.',              body: 'Isso importa mais do que perfeição.' },
  { headline: 'Você começou.',            body: 'A maioria nunca faz isso.' },
  { headline: 'O começo já é progresso.' },
  { headline: 'O dia um está feito.',     body: 'Isso é algo.' },
];

const CURATED_MOMENTUM: CuratedMessage[] = [
  { headline: 'A rhythm is forming.',      body: 'Quiet consistency changes people.' },
  { headline: 'You are becoming someone who returns.' },
  { headline: 'Small returns accumulate.', body: 'That is how change happens.' },
  { headline: 'The habit is taking shape.' },
  { headline: 'One more day added.' },
];

const CURATED_MOMENTUM_ES: CuratedMessage[] = [
  { headline: 'Un ritmo se está formando.', body: 'La consistencia silenciosa cambia personas.' },
  { headline: 'Te estás convirtiendo en alguien que regresa.' },
  { headline: 'Los pequeños regresos se acumulan.', body: 'Así es como ocurre el cambio.' },
  { headline: 'El hábito está tomando forma.' },
  { headline: 'Un día más sumado.' },
];

const CURATED_MOMENTUM_PT: CuratedMessage[] = [
  { headline: 'Um ritmo está se formando.', body: 'A constância quieta muda pessoas.' },
  { headline: 'Você está se tornando alguém que volta.' },
  { headline: 'Pequenos retornos se acumulam.', body: 'É assim que a mudança acontece.' },
  { headline: 'O hábito está tomando forma.' },
  { headline: 'Mais um dia somado.' },
];

const CURATED_IDENTITY: CuratedMessage[] = [
  { headline: 'You are building trust with yourself.' },
  { headline: 'This is becoming part of who you are.' },
  { headline: 'Something has shifted.',    body: 'You may not have noticed yet.' },
  { headline: 'The person returning every day.', body: 'That is the person you are becoming.' },
];

const CURATED_IDENTITY_ES: CuratedMessage[] = [
  { headline: 'Estás construyendo confianza contigo mismo.' },
  { headline: 'Esto se está convirtiendo en parte de quien eres.' },
  { headline: 'Algo ha cambiado.',        body: 'Puede que aún no lo hayas notado.' },
  { headline: 'La persona que regresa cada día.', body: 'Esa es la persona en quien te estás convirtiendo.' },
];

const CURATED_IDENTITY_PT: CuratedMessage[] = [
  { headline: 'Você está construindo confiança em você mesma.' },
  { headline: 'Isso está se tornando parte de quem você é.' },
  { headline: 'Algo mudou.',              body: 'Pode ser que você ainda não tenha percebido.' },
  { headline: 'A pessoa que volta todo dia.', body: 'Essa é a pessoa em quem você está se tornando.' },
];

const CURATED_TRANSFORMATION: CuratedMessage[] = [
  { headline: 'This no longer feels temporary.' },
  { headline: 'Discipline has become your default.' },
  { headline: 'You have already changed.',  body: 'This version of you is the one that stays.' },
  { headline: 'Identity is built through repetition.', body: 'You understand that now.' },
];

const CURATED_TRANSFORMATION_ES: CuratedMessage[] = [
  { headline: 'Esto ya no se siente temporal.' },
  { headline: 'La disciplina se ha convertido en tu nuevo estándar.' },
  { headline: 'Ya has cambiado.',          body: 'Esta versión de ti es la que permanece.' },
  { headline: 'La identidad se construye con repetición.', body: 'Ahora lo entiendes.' },
];

const CURATED_TRANSFORMATION_PT: CuratedMessage[] = [
  { headline: 'Isso não parece mais temporário.' },
  { headline: 'A disciplina se tornou seu padrão.' },
  { headline: 'Você já mudou.',           body: 'Esta versão de você é a que fica.' },
  { headline: 'A identidade é construída pela repetição.', body: 'Você entende isso agora.' },
];

/**
 * Returns a curated emotional identity message appropriate for the user's
 * current journey phase. Rotates through a small premium collection using
 * `seed` (currentDay) for natural variety without randomness.
 */
export function getCuratedFutureSelfMessage(
  streak: number,
  totalDays: number,
  daysMissed: number,
  seed: number,
): CuratedMessage {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();

  function pick4(en: CuratedMessage[], esp: CuratedMessage[], ptPool: CuratedMessage[], frPool: CuratedMessage[]): CuratedMessage {
    const pool = pt ? ptPool : es ? esp : fr ? frPool : en;
    return pool[Math.abs(seed) % pool.length];
  }

  // Comeback state — always gentle and welcoming
  if (daysMissed >= 2) return pick4(CURATED_COMEBACK, CURATED_COMEBACK_ES, CURATED_COMEBACK_PT, CURATED_COMEBACK_FR);

  // Primary pool: burnout recovery messages (rotate by seed across all phases)
  const burnoutPool = pt ? CURATED_BURNOUT_RECOVERY_PT : es ? CURATED_BURNOUT_RECOVERY_ES : fr ? CURATED_BURNOUT_RECOVERY_FR : CURATED_BURNOUT_RECOVERY;
  return burnoutPool[Math.abs(seed) % burnoutPool.length];
}

/** Returns a notification message based on streak + day for variety. */
export function getFutureSelfNotification(
  streak: number,
  currentDay: number,
): { title: string; body: string } {
  const seed = (streak * 3 + currentDay) % futureSelfNotifications.length;
  return futureSelfNotifications[seed];
}

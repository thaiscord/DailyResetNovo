// ─── Mood-Based Ritual Variants ────────────────────────────────────────────────
// Each daily state maps to a specific ritual variant with custom step content.
// The breathing variant is the default when no state is selected.
// All other variants use 'focus' steps instead of breathe/release/reflect.

import { DailyState } from './dailyState';
import { EmotionalProfile } from './emotionalProfile';
import { RitualStep, IntentionOption, getIntentionOptions, buildRitualSteps } from './resetRitual';

// ─── Variant type ─────────────────────────────────────────────────────────────

export type RitualVariant =
  | 'breathing'
  | 'slowThoughts'
  | 'bodyRest'
  | 'releaseTension'
  | 'presentMoment'
  | 'softReset'
  | 'balanced';

// ─── Mood → variant mapping ───────────────────────────────────────────────────

export function getRitualByMood(state: DailyState | null): RitualVariant {
  if (!state) return 'breathing';
  const map: Partial<Record<NonNullable<DailyState>, RitualVariant>> = {
    racing:      'slowThoughts',
    tired:       'bodyRest',
    overwhelmed: 'releaseTension',
    unclear:     'presentMoment',
    drained:     'softReset',
    balanced:    'balanced',
  };
  return map[state] ?? 'breathing';
}

// ─── Config types ─────────────────────────────────────────────────────────────

interface FocusStepLang {
  eyebrow: string;
  headline: string;
  centerText: string;
  subtext: string;
}

interface RecenterLang {
  eyebrow: string;
  headline: string;
  subtext: string;
  options: IntentionOption[];
}

interface ReturnLang {
  headline: string;
  subtext: string;
}

interface ArriveLang {
  eyebrow: string;
  headline: string;
  subtext: string;
}

interface NoteLang {
  eyebrow: string;
  noteQuestions: string[];   // rotated by day — one shown per session
}

interface VariantLangConfig {
  arrive: ArriveLang;
  focus: FocusStepLang[];
  recenter: RecenterLang;
  return: ReturnLang & { returnMessages?: string[] };  // optional rotating pool
  breathe?: { eyebrow: string; headline: string; subtext: string };
  note?: NoteLang;
}

// ─── Slow Thoughts — for "racing" ────────────────────────────────────────────

const SLOW_THOUGHTS_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'DESACELERE',
    headline: 'Nem todo pensamento\nprecisa ser seguido.',
    subtext: 'Você pode observar sem correr atrás de tudo.',
  },
  focus: [
    {
      eyebrow: 'UM FOCO',
      headline: 'Escolha uma coisa para voltar.',
      centerText: 'Só uma.',
      subtext: 'O resto pode esperar alguns minutos.',
    },
    {
      eyebrow: 'SOLTE O EXCESSO',
      headline: 'Sua mente pode diminuir o ritmo.',
      centerText: 'Deixe passar.',
      subtext: 'Pensamentos não precisam virar urgência.',
    },
    {
      eyebrow: 'CLAREZA',
      headline: 'Clareza nasce quando a pressa perde força.',
      centerText: 'Respire.',
      subtext: 'Volte para o que está aqui.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRE',
    headline: 'Deixe a respiração\ndesacelerar a mente.',
    subtext: 'Não é preciso forçar.',
  },
  recenter: {
    eyebrow: 'UMA INTENÇÃO',
    headline: 'O que merece sua atenção agora?',
    subtext: 'Escolha sem pressão.',
    options: [
      { id: 'breathe', label: 'Respirar',              sub: '' },
      { id: 'one',     label: 'Uma coisa de cada vez', sub: '' },
      { id: 'slow',    label: 'Desacelerar',           sub: '' },
    ],
  },
  return: {
    headline: 'Sua mente tem um pouco mais de espaço.',
    subtext: 'Você não precisa resolver tudo de uma vez.',
  },
};

const SLOW_THOUGHTS_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'SLOW DOWN',
    headline: 'Not every thought\nneeds to be followed.',
    subtext: 'You can observe without chasing everything.',
  },
  focus: [
    {
      eyebrow: 'ONE FOCUS',
      headline: 'Choose one thing to return to.',
      centerText: 'Just one.',
      subtext: 'Everything else can wait a few minutes.',
    },
    {
      eyebrow: 'LET IT PASS',
      headline: 'Your mind can slow down.',
      centerText: 'Let it pass.',
      subtext: "Thoughts don't need to become urgency.",
    },
    {
      eyebrow: 'CLARITY',
      headline: 'Clarity comes when the rush loses its grip.',
      centerText: 'Breathe.',
      subtext: 'Return to what is here.',
    },
  ],
  breathe: {
    eyebrow: 'BREATHE',
    headline: "Let your breath\nslow the mind.",
    subtext: "No need to force it.",
  },
  recenter: {
    eyebrow: 'ONE INTENTION',
    headline: 'What deserves your attention right now?',
    subtext: 'Choose without pressure.',
    options: [
      { id: 'breathe', label: 'Breathe',            sub: '' },
      { id: 'one',     label: 'One thing at a time', sub: '' },
      { id: 'slow',    label: 'Slow down',           sub: '' },
    ],
  },
  return: {
    headline: 'Your mind has a little more space.',
    subtext: "You don't need to solve everything at once.",
  },
};

const SLOW_THOUGHTS_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'DESACELERA',
    headline: 'No cada pensamiento\nnecesita ser seguido.',
    subtext: 'Puedes observar sin perseguir todo.',
  },
  focus: [
    {
      eyebrow: 'UN FOCO',
      headline: 'Elige una cosa a la que volver.',
      centerText: 'Solo una.',
      subtext: 'El resto puede esperar unos minutos.',
    },
    {
      eyebrow: 'DÉJALO PASAR',
      headline: 'Tu mente puede ir más despacio.',
      centerText: 'Déjalo pasar.',
      subtext: 'Los pensamientos no tienen que volverse urgencia.',
    },
    {
      eyebrow: 'CLARIDAD',
      headline: 'La claridad llega cuando la prisa pierde fuerza.',
      centerText: 'Respira.',
      subtext: 'Vuelve a lo que está aquí.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRA',
    headline: 'Deja que la respiración\ndesacelere la mente.',
    subtext: 'No hay que forzar.',
  },
  recenter: {
    eyebrow: 'UNA INTENCIÓN',
    headline: '¿Qué merece tu atención ahora?',
    subtext: 'Elige sin presión.',
    options: [
      { id: 'breathe', label: 'Respirar',         sub: '' },
      { id: 'one',     label: 'Una cosa a la vez', sub: '' },
      { id: 'slow',    label: 'Bajar el ritmo',    sub: '' },
    ],
  },
  return: {
    headline: 'Tu mente tiene un poco más de espacio.',
    subtext: 'No necesitas resolverlo todo de una vez.',
  },
};

// ─── Body Rest — for "tired" ──────────────────────────────────────────────────

const BODY_REST_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'DESCANSO',
    headline: 'Seu corpo também\nprecisa ser ouvido.',
    subtext: 'Cansaço não é falha. É sinal.',
  },
  focus: [
    {
      eyebrow: 'OMBROS',
      headline: 'Relaxe os ombros devagar.',
      centerText: 'Solte.',
      subtext: 'Não force. Apenas permita.',
    },
    {
      eyebrow: 'MANDÍBULA',
      headline: 'Destrave a mandíbula.',
      centerText: 'Afrouxe.',
      subtext: 'Seu corpo pode parar de sustentar tudo.',
    },
    {
      eyebrow: 'RESPIRE',
      headline: 'Deixe o ar sair\ncom calma.',
      centerText: 'Respire.',
      subtext: 'O corpo sabe o ritmo.',
    },
  ],
  recenter: {
    eyebrow: 'UMA INTENÇÃO',
    headline: 'O que seria mais gentil agora?',
    subtext: 'Hoje pode ser mais leve.',
    options: [
      { id: 'pause', label: 'Pausar',            sub: '' },
      { id: 'water', label: 'Beber água',        sub: '' },
      { id: 'rest',  label: 'Descansar um pouco', sub: '' },
    ],
  },
  return: {
    headline: 'Você não precisou se forçar.',
    subtext: 'Você não precisa carregar tudo hoje.',
  },
};

const BODY_REST_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'REST',
    headline: 'Your body also needs\nto be heard.',
    subtext: 'Tiredness is not failure. It is a signal.',
  },
  focus: [
    {
      eyebrow: 'SHOULDERS',
      headline: 'Relax your shoulders slowly.',
      centerText: 'Release.',
      subtext: "Don't force. Just allow.",
    },
    {
      eyebrow: 'JAW',
      headline: 'Unclench your jaw.',
      centerText: 'Soften.',
      subtext: 'Your body can stop holding everything.',
    },
    {
      eyebrow: 'BREATHE',
      headline: 'Let the air leave\nwithout rushing.',
      centerText: 'Breathe.',
      subtext: 'The body knows the rhythm.',
    },
  ],
  recenter: {
    eyebrow: 'ONE INTENTION',
    headline: 'What would be gentler right now?',
    subtext: 'Today can be lighter.',
    options: [
      { id: 'pause', label: 'Pause',            sub: '' },
      { id: 'water', label: 'Drink some water', sub: '' },
      { id: 'rest',  label: 'Rest a little',    sub: '' },
    ],
  },
  return: {
    headline: "You didn't have to push today.",
    subtext: "You don't have to carry everything today.",
  },
};

const BODY_REST_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'DESCANSO',
    headline: 'Tu cuerpo también\nnecesita ser escuchado.',
    subtext: 'El cansancio no es fallo. Es una señal.',
  },
  focus: [
    {
      eyebrow: 'HOMBROS',
      headline: 'Relaja los hombros despacio.',
      centerText: 'Suéltalos.',
      subtext: 'No fuerces. Solo permite.',
    },
    {
      eyebrow: 'MANDÍBULA',
      headline: 'Desbloquea la mandíbula.',
      centerText: 'Afloja.',
      subtext: 'Tu cuerpo puede dejar de sostenerlo todo.',
    },
    {
      eyebrow: 'RESPIRA',
      headline: 'Deja que el aire salga\nsin prisa.',
      centerText: 'Respira.',
      subtext: 'El cuerpo sabe el ritmo.',
    },
  ],
  recenter: {
    eyebrow: 'UNA INTENCIÓN',
    headline: '¿Qué sería más gentil ahora?',
    subtext: 'Hoy puede ser más ligero.',
    options: [
      { id: 'pause', label: 'Pausar',            sub: '' },
      { id: 'water', label: 'Beber agua',        sub: '' },
      { id: 'rest',  label: 'Descansar un poco', sub: '' },
    ],
  },
  return: {
    headline: 'No tuviste que forzarte hoy.',
    subtext: 'No tienes que cargar con todo hoy.',
  },
};

// ─── Release Tension — for "overwhelmed" ──────────────────────────────────────

const RELEASE_TENSION_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'DEIXE IR',
    headline: 'Nem tudo precisa\ncaber hoje.',
    subtext: 'Um pouco de espaço já muda o peso.',
  },
  focus: [
    {
      eyebrow: 'PESO',
      headline: 'Onde o dia está\npesando mais?',
      centerText: 'Note.',
      subtext: 'Sem tentar consertar. Só perceber.',
    },
    {
      eyebrow: 'ALÍVIO',
      headline: 'Deixe passar o que\nnão cabe agora.',
      centerText: 'Deixe.',
      subtext: 'Nem tudo precisa ser carregado hoje.',
    },
    {
      eyebrow: 'ESPAÇO',
      headline: 'Uma coisa de cada vez\njá é suficiente.',
      centerText: 'Devagar.',
      subtext: 'O essencial pode ficar.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRE',
    headline: 'O ar que sai\nleva o que não precisa ficar.',
    subtext: 'Apenas respire.',
  },
  recenter: {
    eyebrow: 'UMA INTENÇÃO',
    headline: 'O que pode ficar mais simples?',
    subtext: 'Escolha o que alivia.',
    options: [
      { id: 'less',    label: 'Fazer menos hoje',  sub: '' },
      { id: 'release', label: 'Soltar excessos',   sub: '' },
      { id: 'one',     label: 'Priorizar uma coisa', sub: '' },
    ],
  },
  return: {
    headline: 'Ficou um pouco mais leve.',
    subtext: 'Você se deu um pouco de espaço.',
  },
};

const RELEASE_TENSION_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'LET GO',
    headline: 'Not everything needs\nto fit in today.',
    subtext: 'A little space already changes the weight.',
  },
  focus: [
    {
      eyebrow: 'WEIGHT',
      headline: 'Where is the day\nheaviest right now?',
      centerText: 'Notice.',
      subtext: 'Without trying to fix it. Just notice.',
    },
    {
      eyebrow: 'RELIEF',
      headline: "Let pass what\ndoesn't fit right now.",
      centerText: 'Let go.',
      subtext: "Not everything needs to be carried today.",
    },
    {
      eyebrow: 'SPACE',
      headline: 'One thing at a time\nis already enough.',
      centerText: 'Slowly.',
      subtext: 'The essential can stay.',
    },
  ],
  breathe: {
    eyebrow: 'BREATHE',
    headline: "The breath out\ncarries what need not stay.",
    subtext: 'Just breathe.',
  },
  recenter: {
    eyebrow: 'ONE INTENTION',
    headline: 'What can become simpler?',
    subtext: 'Choose what relieves.',
    options: [
      { id: 'less',    label: 'Do less today',      sub: '' },
      { id: 'release', label: 'Let go of excess',   sub: '' },
      { id: 'one',     label: 'Prioritize one thing', sub: '' },
    ],
  },
  return: {
    headline: 'It got a little lighter.',
    subtext: 'You gave yourself some space.',
  },
};

const RELEASE_TENSION_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'DEJA IR',
    headline: 'No todo necesita\ncaber hoy.',
    subtext: 'Un poco de espacio ya cambia el peso.',
  },
  focus: [
    {
      eyebrow: 'PESO',
      headline: '¿Dónde pesa más\nel día ahora mismo?',
      centerText: 'Nota.',
      subtext: 'Sin intentar arreglarlo. Solo percíbelo.',
    },
    {
      eyebrow: 'ALIVIO',
      headline: 'Deja pasar lo que\nno cabe ahora.',
      centerText: 'Deja ir.',
      subtext: 'No todo necesita cargarse hoy.',
    },
    {
      eyebrow: 'ESPACIO',
      headline: 'Una cosa a la vez\nya es suficiente.',
      centerText: 'Despacio.',
      subtext: 'Lo esencial puede quedarse.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRA',
    headline: 'El aire que sale\nlleva lo que no debe quedar.',
    subtext: 'Solo respira.',
  },
  recenter: {
    eyebrow: 'UNA INTENCIÓN',
    headline: '¿Qué puede volverse más simple?',
    subtext: 'Elige lo que alivia.',
    options: [
      { id: 'less',    label: 'Hacer menos hoy',   sub: '' },
      { id: 'release', label: 'Soltar el exceso',  sub: '' },
      { id: 'one',     label: 'Priorizar una cosa', sub: '' },
    ],
  },
  return: {
    headline: 'Se volvió un poco más ligero.',
    subtext: 'Te diste un poco de espacio.',
  },
};

// ─── Present Moment — for "unclear" ──────────────────────────────────────────

const PRESENT_MOMENT_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'PRESENTE',
    headline: 'Por um instante,\nsó este momento.',
    subtext: 'Não é preciso ver tudo de uma vez.',
  },
  focus: [
    {
      eyebrow: 'AQUI',
      headline: 'O que você percebe\nao seu redor agora?',
      centerText: 'Olhe.',
      subtext: 'Escolha um ponto calmo.',
    },
    {
      eyebrow: 'CORPO',
      headline: 'Sinta onde seu corpo\nestá apoiado.',
      centerText: 'Aqui.',
      subtext: 'Você está neste momento.',
    },
    {
      eyebrow: 'PRÓXIMO',
      headline: 'Uma ação próxima\njá é suficiente.',
      centerText: 'Uma.',
      subtext: 'O caminho não precisa aparecer inteiro.',
    },
  ],
  recenter: {
    eyebrow: 'UMA INTENÇÃO',
    headline: 'Qual parece mais leve agora?',
    subtext: 'Só o próximo passo.',
    options: [
      { id: 'small',    label: 'Recomeçar pequeno',   sub: '' },
      { id: 'step',     label: 'Um passo simples',     sub: '' },
      { id: 'organize', label: 'Organizar aos poucos', sub: '' },
    ],
  },
  return: {
    headline: 'Você não precisa enxergar tudo agora.',
    subtext: 'A próxima coisa já é suficiente.',
  },
};

const PRESENT_MOMENT_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'PRESENT',
    headline: 'For a moment,\njust this.',
    subtext: "You don't need to see everything right now.",
  },
  focus: [
    {
      eyebrow: 'HERE',
      headline: 'What do you notice\naround you right now?',
      centerText: 'Look.',
      subtext: 'Choose one calm point.',
    },
    {
      eyebrow: 'BODY',
      headline: 'Notice where\nyour body is supported.',
      centerText: 'Here.',
      subtext: 'You are in this moment.',
    },
    {
      eyebrow: 'NEXT',
      headline: 'One next action\nis already enough.',
      centerText: 'One.',
      subtext: "The whole path doesn't need to appear at once.",
    },
  ],
  recenter: {
    eyebrow: 'ONE INTENTION',
    headline: 'What feels lighter right now?',
    subtext: 'Just the next step.',
    options: [
      { id: 'small',    label: 'Start small',     sub: '' },
      { id: 'step',     label: 'One simple step', sub: '' },
      { id: 'organize', label: 'Organize slowly', sub: '' },
    ],
  },
  return: {
    headline: "You don't need to see everything right now.",
    subtext: 'The next step is enough.',
  },
};

const PRESENT_MOMENT_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'PRESENTE',
    headline: 'Por un instante,\solo esto.',
    subtext: 'No necesitas ver todo ahora.',
  },
  focus: [
    {
      eyebrow: 'AQUÍ',
      headline: '¿Qué percibes a\ntu alrededor ahora mismo?',
      centerText: 'Mira.',
      subtext: 'Elige un punto de calma.',
    },
    {
      eyebrow: 'CUERPO',
      headline: 'Percibe dónde está\napoyado tu cuerpo.',
      centerText: 'Aquí.',
      subtext: 'Estás en este momento.',
    },
    {
      eyebrow: 'SIGUIENTE',
      headline: 'Una próxima acción\nya es suficiente.',
      centerText: 'Una.',
      subtext: 'El camino no necesita aparecer completo.',
    },
  ],
  recenter: {
    eyebrow: 'UNA INTENCIÓN',
    headline: '¿Qué se siente más ligero ahora?',
    subtext: 'Solo el próximo paso.',
    options: [
      { id: 'small',    label: 'Empezar pequeño',      sub: '' },
      { id: 'step',     label: 'Un paso simple',        sub: '' },
      { id: 'organize', label: 'Organizar poco a poco', sub: '' },
    ],
  },
  return: {
    headline: 'No necesitas verlo todo ahora.',
    subtext: 'Lo siguiente ya es suficiente.',
  },
};

// ─── Soft Reset — for "drained" ──────────────────────────────────────────────

const SOFT_RESET_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'SUAVE',
    headline: 'Hoje só\nprecisa caber.',
    subtext: 'Não é preciso ter energia para voltar.',
  },
  focus: [
    {
      eyebrow: 'PAUSA',
      headline: 'Deixe o corpo\nchegar primeiro.',
      centerText: 'Pouse.',
      subtext: 'Sem pressa.',
    },
    {
      eyebrow: 'PEQUENO',
      headline: 'O que seu corpo\naceita hoje?',
      centerText: 'Pouco.',
      subtext: 'Nem tudo precisa\nvoltar de uma vez.',
    },
    {
      eyebrow: 'RITMO',
      headline: 'Siga o ritmo\nque existe hoje.',
      centerText: 'Devagar.',
      subtext: 'Não abandonar a si mesmo já é suficiente.',
    },
  ],
  recenter: {
    eyebrow: 'UMA INTENÇÃO',
    headline: 'O que cabe na sua energia hoje?',
    subtext: 'Pequeno ainda é progresso.',
    options: [
      { id: 'breathe', label: 'Respirar',       sub: '' },
      { id: 'little',  label: 'Só um pouco',    sub: '' },
      { id: 'stay',    label: 'Estar aqui',      sub: '' },
    ],
  },
  return: {
    headline: 'Você voltou do jeito que dava.',
    subtext: 'Nem tudo precisa voltar de uma vez.',
  },
};

const SOFT_RESET_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'SOFT',
    headline: 'Today can\nstart smaller.',
    subtext: "You don't need much energy to return.",
  },
  focus: [
    {
      eyebrow: 'PAUSE',
      headline: 'Let the body\narrive first.',
      centerText: 'Land.',
      subtext: 'No rush.',
    },
    {
      eyebrow: 'SMALL',
      headline: 'What small action\nfits right now?',
      centerText: 'Little.',
      subtext: 'Small still rebuilds.',
    },
    {
      eyebrow: 'RHYTHM',
      headline: "Follow the rhythm\nthat exists today.",
      centerText: 'Slowly.',
      subtext: "Not abandoning yourself is already enough.",
    },
  ],
  recenter: {
    eyebrow: 'ONE INTENTION',
    headline: "What fits your energy today?",
    subtext: 'Small is still progress.',
    options: [
      { id: 'breathe', label: 'Breathe',       sub: '' },
      { id: 'little',  label: 'Just a little', sub: '' },
      { id: 'stay',    label: 'Just be here',  sub: '' },
    ],
  },
  return: {
    headline: "You came back the way you could.",
    subtext: 'Small still rebuilds.',
  },
};

const SOFT_RESET_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'SUAVE',
    headline: 'Hoy puede\nempezar más pequeño.',
    subtext: 'No necesitas mucha energía para volver.',
  },
  focus: [
    {
      eyebrow: 'PAUSA',
      headline: 'Deja que el cuerpo\llegue primero.',
      centerText: 'Aterriza.',
      subtext: 'Sin prisa.',
    },
    {
      eyebrow: 'PEQUEÑO',
      headline: '¿Qué acción pequeña\ncabe ahora?',
      centerText: 'Poco.',
      subtext: 'Poco también reconstruye.',
    },
    {
      eyebrow: 'RITMO',
      headline: 'Sigue el ritmo\nque existe hoy.',
      centerText: 'Despacio.',
      subtext: 'No abandonarte ya es suficiente.',
    },
  ],
  recenter: {
    eyebrow: 'UNA INTENCIÓN',
    headline: '¿Qué cabe en tu energía hoy?',
    subtext: 'Pequeño sigue siendo progreso.',
    options: [
      { id: 'breathe', label: 'Respirar',         sub: '' },
      { id: 'little',  label: 'Solo un poco',     sub: '' },
      { id: 'stay',    label: 'Solo estar aquí',   sub: '' },
    ],
  },
  return: {
    headline: 'Volviste como pudiste.',
    subtext: 'Poco también reconstruye.',
  },
};

// ─── Slow Thoughts — French ───────────────────────────────────────────────────

const SLOW_THOUGHTS_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'RALENTIS',
    headline: 'Chaque pensée\nn\'a pas besoin d\'être suivie.',
    subtext: 'Tu peux observer sans courir après tout.',
  },
  focus: [
    {
      eyebrow: 'UN SEUL FOCUS',
      headline: 'Choisis une chose\nà laquelle revenir.',
      centerText: 'Une seule.',
      subtext: 'Le reste peut attendre quelques minutes.',
    },
    {
      eyebrow: 'LAISSE PASSER',
      headline: 'Ton esprit peut\naller plus doucement.',
      centerText: 'Laisse passer.',
      subtext: 'Les pensées n\'ont pas besoin de devenir urgentes.',
    },
    {
      eyebrow: 'CLARTÉ',
      headline: 'La clarté arrive quand\nla précipitation perd sa force.',
      centerText: 'Respire.',
      subtext: 'Reviens à ce qui est là.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRE',
    headline: 'Laisse ta respiration\nralentir l\'esprit.',
    subtext: 'Pas besoin de forcer.',
  },
  recenter: {
    eyebrow: 'UNE INTENTION',
    headline: 'Qu\'est-ce qui mérite ton attention maintenant ?',
    subtext: 'Choisis sans pression.',
    options: [
      { id: 'breathe', label: 'Respirer',          sub: '' },
      { id: 'one',     label: 'Une chose à la fois', sub: '' },
      { id: 'slow',    label: 'Ralentir',            sub: '' },
    ],
  },
  return: {
    headline: 'Ton esprit a un peu plus d\'espace.',
    subtext: 'Tu n\'as pas besoin de tout résoudre d\'un coup.',
  },
};

// ─── Body Rest — French ───────────────────────────────────────────────────────

const BODY_REST_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'REPOS',
    headline: 'Ton corps aussi\na besoin d\'être entendu.',
    subtext: 'La fatigue n\'est pas un échec. C\'est un signal.',
  },
  focus: [
    {
      eyebrow: 'ÉPAULES',
      headline: 'Relâche les épaules doucement.',
      centerText: 'Laisse aller.',
      subtext: 'Pas de force. Permets seulement.',
    },
    {
      eyebrow: 'MÂCHOIRE',
      headline: 'Détends la mâchoire.',
      centerText: 'Adoucis.',
      subtext: 'Ton corps peut arrêter de tout porter.',
    },
    {
      eyebrow: 'RESPIRE',
      headline: 'Laisse l\'air sortir\nsen presser.',
      centerText: 'Respire.',
      subtext: 'Le corps connaît son rythme.',
    },
  ],
  recenter: {
    eyebrow: 'UNE INTENTION',
    headline: 'Qu\'est-ce qui serait plus doux maintenant ?',
    subtext: 'Aujourd\'hui peut être plus léger.',
    options: [
      { id: 'pause', label: 'Faire une pause',        sub: '' },
      { id: 'water', label: 'Boire un verre d\'eau', sub: '' },
      { id: 'rest',  label: 'Se reposer un peu',     sub: '' },
    ],
  },
  return: {
    headline: 'Tu n\'as pas eu à te forcer aujourd\'hui.',
    subtext: 'Tu n\'as pas à tout porter aujourd\'hui.',
  },
};

// ─── Release Tension — French ─────────────────────────────────────────────────

const RELEASE_TENSION_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'LAISSE ALLER',
    headline: 'Tout n\'a pas besoin\nde tenir dans aujourd\'hui.',
    subtext: 'Un peu d\'espace change déjà le poids.',
  },
  focus: [
    {
      eyebrow: 'POIDS',
      headline: 'Où la journée\npèse-t-elle le plus ?',
      centerText: 'Remarque.',
      subtext: 'Sans chercher à réparer. Juste percevoir.',
    },
    {
      eyebrow: 'SOULAGEMENT',
      headline: 'Laisse passer ce qui\nne tient pas maintenant.',
      centerText: 'Laisse aller.',
      subtext: 'Tout n\'a pas besoin d\'être porté aujourd\'hui.',
    },
    {
      eyebrow: 'ESPACE',
      headline: 'Une chose à la fois\nsuffit déjà.',
      centerText: 'Doucement.',
      subtext: 'L\'essentiel peut rester.',
    },
  ],
  breathe: {
    eyebrow: 'RESPIRE',
    headline: 'L\'air qui sort\nemporte ce qui n\'a pas besoin de rester.',
    subtext: 'Respire seulement.',
  },
  recenter: {
    eyebrow: 'UNE INTENTION',
    headline: 'Qu\'est-ce qui peut devenir plus simple ?',
    subtext: 'Choisis ce qui allège.',
    options: [
      { id: 'less',    label: 'Faire moins aujourd\'hui', sub: '' },
      { id: 'release', label: 'Laisser l\'excès',          sub: '' },
      { id: 'one',     label: 'Prioriser une chose',       sub: '' },
    ],
  },
  return: {
    headline: 'C\'est devenu un peu plus léger.',
    subtext: 'Tu t\'es accordé un peu d\'espace.',
  },
};

// ─── Present Moment — French ──────────────────────────────────────────────────

const PRESENT_MOMENT_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'PRÉSENCE',
    headline: 'Pour un instant,\nseulement ça.',
    subtext: 'Tu n\'as pas besoin de tout voir maintenant.',
  },
  focus: [
    {
      eyebrow: 'ICI',
      headline: 'Qu\'est-ce que tu remarques\nautour de toi maintenant ?',
      centerText: 'Regarde.',
      subtext: 'Choisis un point calme.',
    },
    {
      eyebrow: 'CORPS',
      headline: 'Remarque où\nton corps est soutenu.',
      centerText: 'Ici.',
      subtext: 'Tu es dans ce moment.',
    },
    {
      eyebrow: 'PROCHAIN PAS',
      headline: 'Un seul prochain geste\nsuffit déjà.',
      centerText: 'Un seul.',
      subtext: 'Le chemin entier n\'a pas besoin d\'apparaître maintenant.',
    },
  ],
  recenter: {
    eyebrow: 'UNE INTENTION',
    headline: 'Qu\'est-ce qui semble plus léger maintenant ?',
    subtext: 'Seulement le prochain pas.',
    options: [
      { id: 'small',    label: 'Commencer petit', sub: '' },
      { id: 'step',     label: 'Un pas simple',    sub: '' },
      { id: 'organize', label: 'Ranger doucement', sub: '' },
    ],
  },
  return: {
    headline: 'Tu n\'as pas besoin de tout voir maintenant.',
    subtext: 'La prochaine étape suffit.',
  },
};

// ─── Soft Reset — French ──────────────────────────────────────────────────────

const SOFT_RESET_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'DOUX',
    headline: 'Aujourd\'hui peut\ncommencer plus petit.',
    subtext: 'Tu n\'as pas besoin de beaucoup d\'énergie pour revenir.',
  },
  focus: [
    {
      eyebrow: 'PAUSE',
      headline: 'Laisse le corps\narriver d\'abord.',
      centerText: 'Pose-toi.',
      subtext: 'Sans précipitation.',
    },
    {
      eyebrow: 'PETIT',
      headline: 'Qu\'est-ce qui tient\ndans ton énergie aujourd\'hui ?',
      centerText: 'Un peu.',
      subtext: 'Petit compte aussi.',
    },
    {
      eyebrow: 'RYTHME',
      headline: 'Suis le rythme\nqui existe aujourd\'hui.',
      centerText: 'Doucement.',
      subtext: 'Ne pas s\'abandonner suffit déjà.',
    },
  ],
  recenter: {
    eyebrow: 'UNE INTENTION',
    headline: 'Qu\'est-ce qui tient dans ton énergie aujourd\'hui ?',
    subtext: 'Petit compte aussi.',
    options: [
      { id: 'breathe', label: 'Respirer',    sub: '' },
      { id: 'little',  label: 'Juste un peu', sub: '' },
      { id: 'stay',    label: 'Être là',      sub: '' },
    ],
  },
  return: {
    headline: 'Tu es revenu comme tu pouvais.',
    subtext: 'Un pas à la fois suffit déjà.',
  },
};

// ─── German variants ───────────────────────────────────────────────────────────

const SLOW_THOUGHTS_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'LANGSAMER',
    headline: 'Nicht jeder Gedanke\nmuss verfolgt werden.',
    subtext: 'Du kannst beobachten, ohne allem hinterherzulaufen.',
  },
  focus: [
    {
      eyebrow: 'EIN FOKUS',
      headline: 'Wähle eine Sache,\nzu der du zurückkehrst.',
      centerText: 'Nur eine.',
      subtext: 'Alles andere kann ein paar Minuten warten.',
    },
    {
      eyebrow: 'LASS ES GEHEN',
      headline: 'Dein Kopf kann\nlangsamer werden.',
      centerText: 'Lass es gehen.',
      subtext: 'Gedanken müssen keine Dringlichkeit werden.',
    },
    {
      eyebrow: 'KLARHEIT',
      headline: 'Klarheit kommt,\nwenn die Eile nachlässt.',
      centerText: 'Atme.',
      subtext: 'Zurück zu dem, was hier ist.',
    },
  ],
  breathe: {
    eyebrow: 'ATME',
    headline: 'Lass deinen Atem\nden Kopf verlangsamen.',
    subtext: 'Kein Zwang nötig.',
  },
  recenter: {
    eyebrow: 'EINE ABSICHT',
    headline: 'Was verdient gerade deine Aufmerksamkeit?',
    subtext: 'Wähle ohne Druck.',
    options: [
      { id: 'breathe', label: 'Atmen',                  sub: '' },
      { id: 'one',     label: 'Eine Sache nach der anderen', sub: '' },
      { id: 'slow',    label: 'Langsamer werden',        sub: '' },
    ],
  },
  return: {
    headline: 'Dein Kopf hat etwas mehr Raum.',
    subtext: 'Du musst nicht alles auf einmal lösen.',
  },
};

const BODY_REST_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'RUHE',
    headline: 'Dein Körper braucht\nauch gehört zu werden.',
    subtext: 'Müdigkeit ist kein Versagen. Es ist ein Signal.',
  },
  focus: [
    {
      eyebrow: 'SCHULTERN',
      headline: 'Lass die Schultern\nlangsam los.',
      centerText: 'Loslassen.',
      subtext: 'Kein Zwang. Nur erlauben.',
    },
    {
      eyebrow: 'KIEFER',
      headline: 'Entspanne den Kiefer.',
      centerText: 'Weich werden.',
      subtext: 'Dein Körper kann aufhören, alles zu halten.',
    },
    {
      eyebrow: 'ATME',
      headline: 'Lass die Luft\nruhig ausströmen.',
      centerText: 'Atme.',
      subtext: 'Der Körper kennt den Rhythmus.',
    },
  ],
  recenter: {
    eyebrow: 'EINE ABSICHT',
    headline: 'Was wäre gerade sanfter?',
    subtext: 'Heute kann leichter sein.',
    options: [
      { id: 'pause', label: 'Pausieren',           sub: '' },
      { id: 'water', label: 'Wasser trinken',       sub: '' },
      { id: 'rest',  label: 'Ein wenig ausruhen',   sub: '' },
    ],
  },
  return: {
    headline: 'Du musstest dich heute nicht zwingen.',
    subtext: 'Du musst heute nicht alles tragen.',
  },
};

const RELEASE_TENSION_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'FREIRAUM',
    headline: 'Nicht alles muss\nheute Platz finden.',
    subtext: 'Ein bisschen Raum verändert bereits das Gewicht.',
  },
  focus: [
    {
      eyebrow: 'GEWICHT',
      headline: 'Wo drückt\nder Tag gerade am meisten?',
      centerText: 'Bemerke es.',
      subtext: 'Ohne zu versuchen, es zu reparieren. Nur bemerken.',
    },
    {
      eyebrow: 'ERLEICHTERUNG',
      headline: 'Lass vorbei, was\ngerade keinen Platz hat.',
      centerText: 'Weglegen.',
      subtext: 'Nicht alles muss heute getragen werden.',
    },
    {
      eyebrow: 'RAUM',
      headline: 'Eine Sache nach der anderen\nist bereits genug.',
      centerText: 'Langsam.',
      subtext: 'Das Wesentliche darf bleiben.',
    },
  ],
  breathe: {
    eyebrow: 'ATMEN',
    headline: 'Der Atem trägt,\nwas nicht bleiben muss.',
    subtext: 'Nur atmen.',
  },
  recenter: {
    eyebrow: 'EINE ABSICHT',
    headline: 'Was kann einfacher werden?',
    subtext: 'Wähle, was erleichtert.',
    options: [
      { id: 'less',    label: 'Heute weniger tun',        sub: '' },
      { id: 'release', label: 'Überschüssiges loslassen', sub: '' },
      { id: 'one',     label: 'Eine Sache priorisieren',  sub: '' },
    ],
  },
  return: {
    headline: 'Es wurde etwas leichter.',
    subtext: 'Du hast dir etwas Raum gegeben.',
  },
};

const PRESENT_MOMENT_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'JETZT',
    headline: 'Für einen Moment\nnur dieses hier.',
    subtext: 'Du musst nicht alles auf einmal sehen.',
  },
  focus: [
    {
      eyebrow: 'HIER',
      headline: 'Was bemerkst du\ngerade um dich herum?',
      centerText: 'Schau hin.',
      subtext: 'Wähle einen ruhigen Punkt.',
    },
    {
      eyebrow: 'KÖRPER',
      headline: 'Spüre, wo\ndein Körper Halt findet.',
      centerText: 'Hier.',
      subtext: 'Du bist in diesem Moment.',
    },
    {
      eyebrow: 'NÄCHSTES',
      headline: 'Eine nächste Handlung\nist bereits genug.',
      centerText: 'Eine.',
      subtext: 'Der ganze Weg muss sich nicht auf einmal zeigen.',
    },
  ],
  recenter: {
    eyebrow: 'EINE ABSICHT',
    headline: 'Was fühlt sich gerade leichter an?',
    subtext: 'Nur der nächste Schritt.',
    options: [
      { id: 'small',    label: 'Klein anfangen',       sub: '' },
      { id: 'step',     label: 'Ein einfacher Schritt', sub: '' },
      { id: 'organize', label: 'Langsam ordnen',        sub: '' },
    ],
  },
  return: {
    headline: 'Du musst jetzt nicht alles sehen.',
    subtext: 'Der nächste Schritt reicht.',
  },
};

const SOFT_RESET_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'SANFT',
    headline: 'Heute kann\nkleiner beginnen.',
    subtext: 'Du brauchst nicht viel Energie, um zurückzukehren.',
  },
  focus: [
    {
      eyebrow: 'PAUSE',
      headline: 'Lass den Körper\nzuerst ankommen.',
      centerText: 'Ankommen.',
      subtext: 'Keine Eile.',
    },
    {
      eyebrow: 'KLEIN',
      headline: 'Welche kleine Handlung\npasst gerade?',
      centerText: 'Wenig.',
      subtext: 'Klein baut auch wieder auf.',
    },
    {
      eyebrow: 'RHYTHMUS',
      headline: 'Folge dem Rhythmus,\nder heute existiert.',
      centerText: 'Langsam.',
      subtext: 'Sich nicht aufzugeben ist bereits genug.',
    },
  ],
  recenter: {
    eyebrow: 'EINE ABSICHT',
    headline: 'Was passt heute in deine Energie?',
    subtext: 'Klein ist auch Fortschritt.',
    options: [
      { id: 'breathe', label: 'Atmen',           sub: '' },
      { id: 'little',  label: 'Nur ein bisschen', sub: '' },
      { id: 'stay',    label: 'Einfach hier sein', sub: '' },
    ],
  },
  return: {
    headline: 'Du bist so zurückgekehrt, wie es ging.',
    subtext: 'Klein baut auch wieder auf.',
  },
};

// ─── Balanced — for "balanced" ───────────────────────────────────────────────

const BALANCED_PT: VariantLangConfig = {
  arrive: {
    eyebrow: 'EQUILÍBRIO',
    headline: 'Você pode\npermanecer aqui um momento.',
    subtext: 'Nem todo reset acontece depois de um dia difícil.',
  },
  focus: [
    {
      eyebrow: 'ATENÇÃO',
      headline: 'Perceber o que está funcionando\ntambém é cuidado.',
      centerText: 'Note.',
      subtext: 'Sem necessidade de agir. Apenas observe.',
    },
  ],
  note: {
    eyebrow: 'PERCEBA',
    noteQuestions: [
      'O que funcionou melhor do que você esperava hoje?',
      'O que merece ser notado neste momento?',
      'O que ajudou você a chegar até aqui hoje?',
      'O que vale a pena continuar fazendo?',
      'O que está sustentando esse ritmo?',
      'O que você gostaria de preservar desta semana?',
      'O que trouxe mais leveza para o seu dia?',
      'O que está dando certo sem fazer barulho?',
      'O que você percebe diferente em você hoje?',
      'O que tem ajudado você a permanecer presente?',
    ],
  },
  recenter: {
    eyebrow: 'LEVAR',
    headline: 'O que vale a pena levar para amanhã?',
    subtext: 'Escolha o que parece verdadeiro.',
    options: [
      { id: 'presence',  label: 'Presença', sub: '' },
      { id: 'lightness', label: 'Leveza',   sub: '' },
      { id: 'rhythm',    label: 'Ritmo',    sub: '' },
    ],
  },
  return: {
    headline: 'Algo está funcionando.\nVale notar isso.',
    subtext: '',
    returnMessages: [
      'Dias tranquilos também contam.',
      'Nem todo cuidado nasce da dificuldade.',
      'Você não precisa consertar nada agora.',
      'Às vezes continuar já é suficiente.',
      'O que está funcionando também merece atenção.',
      'Há valor em permanecer.',
      'Nem todo progresso faz barulho.',
      'Algumas coisas importantes acontecem em silêncio.',
      'O ritmo também se constrói nos dias comuns.',
      'Hoje não precisava ser diferente para valer a pena.',
      'Estar presente também é uma forma de cuidado.',
      'Nem todo reset acontece depois de um dia difícil.',
    ],
  },
};

const BALANCED_EN: VariantLangConfig = {
  arrive: {
    eyebrow: 'BALANCE',
    headline: 'You can stay\nhere a moment.',
    subtext: 'Not every reset follows a difficult day.',
  },
  focus: [
    {
      eyebrow: 'NOTICE',
      headline: 'Noticing what\'s working\nis also a form of care.',
      centerText: 'Notice.',
      subtext: 'No action needed. Just observe.',
    },
  ],
  note: {
    eyebrow: 'OBSERVE',
    noteQuestions: [
      'What worked better than you expected today?',
      'What deserves to be noticed right now?',
      'What helped you get here today?',
      'What\'s worth continuing?',
      'What\'s sustaining this rhythm?',
      'What would you like to preserve from this week?',
      'What brought more ease to your day?',
      'What\'s working quietly in the background?',
      'What feels different about you today?',
      'What\'s been helping you stay present?',
    ],
  },
  recenter: {
    eyebrow: 'CARRY FORWARD',
    headline: 'What\'s worth taking into tomorrow?',
    subtext: 'Choose what feels true.',
    options: [
      { id: 'presence',  label: 'Presence',  sub: '' },
      { id: 'lightness', label: 'Lightness', sub: '' },
      { id: 'rhythm',    label: 'Rhythm',    sub: '' },
    ],
  },
  return: {
    headline: 'Something is working.\nThat\'s worth noticing.',
    subtext: '',
    returnMessages: [
      'Quiet days count too.',
      'Not all care comes from difficulty.',
      'You don\'t have to fix anything right now.',
      'Sometimes continuing is already enough.',
      'What\'s working also deserves attention.',
      'There is value in staying.',
      'Not every advance makes noise.',
      'Some important things happen quietly.',
      'Rhythm also builds on ordinary days.',
      'Today didn\'t need to be different to be worth it.',
      'Being present is also a form of care.',
      'Not every reset follows a difficult day.',
    ],
  },
};

const BALANCED_ES: VariantLangConfig = {
  arrive: {
    eyebrow: 'EQUILIBRIO',
    headline: 'Puedes quedarte\naquí un momento.',
    subtext: 'No todo reset ocurre después de un día difícil.',
  },
  focus: [
    {
      eyebrow: 'ATENCIÓN',
      headline: 'Notar lo que funciona\ntambién es cuidado.',
      centerText: 'Nota.',
      subtext: 'Sin necesidad de actuar. Solo observa.',
    },
  ],
  note: {
    eyebrow: 'OBSERVA',
    noteQuestions: [
      '¿Qué funcionó mejor de lo que esperabas hoy?',
      '¿Qué merece ser notado ahora mismo?',
      '¿Qué te ayudó a llegar hasta aquí hoy?',
      '¿Qué vale la pena seguir haciendo?',
      '¿Qué está sosteniendo este ritmo?',
      '¿Qué te gustaría preservar de esta semana?',
      '¿Qué trajo más ligereza a tu día?',
      '¿Qué está funcionando sin hacer ruido?',
      '¿Qué percibes diferente en ti hoy?',
      '¿Qué te ha ayudado a permanecer presente?',
    ],
  },
  recenter: {
    eyebrow: 'LLEVAR',
    headline: '¿Qué vale la pena llevar a mañana?',
    subtext: 'Elige lo que te parece verdadero.',
    options: [
      { id: 'presence',  label: 'Presencia', sub: '' },
      { id: 'lightness', label: 'Ligereza',  sub: '' },
      { id: 'rhythm',    label: 'Ritmo',     sub: '' },
    ],
  },
  return: {
    headline: 'Algo está funcionando.\nVale notarlo.',
    subtext: '',
    returnMessages: [
      'Los días tranquilos también cuentan.',
      'No todo cuidado nace de la dificultad.',
      'No necesitas arreglar nada ahora.',
      'A veces continuar ya es suficiente.',
      'Lo que funciona también merece atención.',
      'Hay valor en permanecer.',
      'No todo avance hace ruido.',
      'Algunas cosas importantes ocurren en silencio.',
      'El ritmo también se construye en los días comunes.',
      'Hoy no necesitaba ser diferente para valer la pena.',
      'Estar presente también es una forma de cuidado.',
      'No todo reset sigue a un día difícil.',
    ],
  },
};

const BALANCED_FR: VariantLangConfig = {
  arrive: {
    eyebrow: 'ÉQUILIBRE',
    headline: 'Tu peux rester\nlà un moment.',
    subtext: 'Tout reset ne suit pas une journée difficile.',
  },
  focus: [
    {
      eyebrow: 'ATTENTION',
      headline: 'Remarquer ce qui fonctionne\nest aussi une forme de soin.',
      centerText: 'Remarque.',
      subtext: 'Aucune action requise. Observe seulement.',
    },
  ],
  note: {
    eyebrow: 'OBSERVE',
    noteQuestions: [
      "Qu'est-ce qui a mieux fonctionné que prévu aujourd'hui ?",
      "Qu'est-ce qui mérite d'être remarqué en ce moment ?",
      "Qu'est-ce qui t'a aidé à arriver jusqu'ici aujourd'hui ?",
      "Qu'est-ce qui mérite d'être continué ?",
      "Qu'est-ce qui soutient ce rythme ?",
      "Qu'est-ce que tu aimerais préserver de cette semaine ?",
      "Qu'est-ce qui a apporté plus de légèreté à ta journée ?",
      "Qu'est-ce qui fonctionne discrètement ?",
      "Qu'est-ce que tu perçois de différent en toi aujourd'hui ?",
      "Qu'est-ce qui t'a aidé à rester présent ?",
    ],
  },
  recenter: {
    eyebrow: 'EMPORTER',
    headline: "Qu'est-ce qui vaut la peine d'emporter demain ?",
    subtext: 'Choisis ce qui te semble juste.',
    options: [
      { id: 'presence',  label: 'Présence',  sub: '' },
      { id: 'lightness', label: 'Légèreté',  sub: '' },
      { id: 'rhythm',    label: 'Rythme',    sub: '' },
    ],
  },
  return: {
    headline: 'Quelque chose fonctionne.\nCela mérite d\'être remarqué.',
    subtext: '',
    returnMessages: [
      'Les jours calmes comptent aussi.',
      'Tout soin ne vient pas de la difficulté.',
      "Tu n'as rien à réparer maintenant.",
      'Parfois, continuer suffit déjà.',
      "Ce qui fonctionne mérite aussi de l'attention.",
      'Il y a de la valeur à rester.',
      'Tout avancement ne fait pas de bruit.',
      'Certaines choses importantes se passent en silence.',
      'Le rythme se construit aussi dans les jours ordinaires.',
      "Aujourd'hui n'avait pas besoin d'être différent pour avoir de la valeur.",
      'Être présent est aussi une forme de soin.',
      'Tout reset ne suit pas une journée difficile.',
    ],
  },
};

const BALANCED_DE: VariantLangConfig = {
  arrive: {
    eyebrow: 'GLEICHGEWICHT',
    headline: 'Du kannst hier\neinen Moment bleiben.',
    subtext: 'Nicht jeder Reset folgt einem schweren Tag.',
  },
  focus: [
    {
      eyebrow: 'AUFMERKSAMKEIT',
      headline: 'Zu bemerken, was funktioniert,\nist auch eine Form der Fürsorge.',
      centerText: 'Bemerke.',
      subtext: 'Keine Aktion nötig. Nur beobachten.',
    },
  ],
  note: {
    eyebrow: 'BEOBACHTE',
    noteQuestions: [
      'Was hat heute besser funktioniert als erwartet?',
      'Was verdient es gerade, bemerkt zu werden?',
      'Was hat dir geholfen, heute hierher zu kommen?',
      'Was ist es wert, weiterzumachen?',
      'Was trägt diesen Rhythmus?',
      'Was möchtest du von dieser Woche bewahren?',
      'Was hat mehr Leichtigkeit in deinen Tag gebracht?',
      'Was funktioniert still im Hintergrund?',
      'Was nimmst du heute als anders an dir wahr?',
      'Was hat dir geholfen, präsent zu bleiben?',
    ],
  },
  recenter: {
    eyebrow: 'MITNEHMEN',
    headline: 'Was ist es wert, in den morgigen Tag mitzunehmen?',
    subtext: 'Wähle, was sich stimmig anfühlt.',
    options: [
      { id: 'presence',  label: 'Gegenwart',    sub: '' },
      { id: 'lightness', label: 'Leichtigkeit', sub: '' },
      { id: 'rhythm',    label: 'Rhythmus',     sub: '' },
    ],
  },
  return: {
    headline: 'Etwas funktioniert.\nDas verdient es, bemerkt zu werden.',
    subtext: '',
    returnMessages: [
      'Ruhige Tage zählen auch.',
      'Nicht alle Fürsorge kommt aus Schwierigkeit.',
      'Du musst gerade nichts reparieren.',
      'Manchmal ist Weitermachen bereits genug.',
      'Was funktioniert, verdient auch Aufmerksamkeit.',
      'Es hat einen Wert zu bleiben.',
      'Nicht jeder Fortschritt macht Lärm.',
      'Manche wichtigen Dinge geschehen still.',
      'Rhythmus entsteht auch an gewöhnlichen Tagen.',
      'Heute musste nicht anders sein, um es wert zu sein.',
      'Präsent zu sein ist auch eine Form der Fürsorge.',
      'Nicht jeder Reset folgt einem schweren Tag.',
    ],
  },
};

// ─── Config lookup ─────────────────────────────────────────────────────────────

const VARIANT_CONFIGS: Record<
  Exclude<RitualVariant, 'breathing'>,
  { pt: VariantLangConfig; en: VariantLangConfig; es: VariantLangConfig; fr: VariantLangConfig; de: VariantLangConfig }
> = {
  slowThoughts:   { pt: SLOW_THOUGHTS_PT,    en: SLOW_THOUGHTS_EN,    es: SLOW_THOUGHTS_ES,    fr: SLOW_THOUGHTS_FR,    de: SLOW_THOUGHTS_DE },
  bodyRest:       { pt: BODY_REST_PT,         en: BODY_REST_EN,         es: BODY_REST_ES,         fr: BODY_REST_FR,         de: BODY_REST_DE },
  releaseTension: { pt: RELEASE_TENSION_PT,   en: RELEASE_TENSION_EN,   es: RELEASE_TENSION_ES,   fr: RELEASE_TENSION_FR,   de: RELEASE_TENSION_DE },
  presentMoment:  { pt: PRESENT_MOMENT_PT,    en: PRESENT_MOMENT_EN,    es: PRESENT_MOMENT_ES,    fr: PRESENT_MOMENT_FR,    de: PRESENT_MOMENT_DE },
  softReset:      { pt: SOFT_RESET_PT,        en: SOFT_RESET_EN,        es: SOFT_RESET_ES,        fr: SOFT_RESET_FR,        de: SOFT_RESET_DE },
  balanced:       { pt: BALANCED_PT,          en: BALANCED_EN,          es: BALANCED_ES,          fr: BALANCED_FR,          de: BALANCED_DE },
};

// ─── Builder ──────────────────────────────────────────────────────────────────

// depth: new < 7 days (full guidance), returning 7-29 days, advanced 30+ (minimal)
function getDepth(totalDays: number): 'new' | 'returning' | 'advanced' {
  if (totalDays < 7)  return 'new';
  if (totalDays < 30) return 'returning';
  return 'advanced';
}

export function buildVariantRitualSteps(
  variant: RitualVariant,
  profile: EmotionalProfile | null,
  hour: number,
  streak: number,
  daysMissed: number,
  lang: string,
  totalDays: number = 0,
): RitualStep[] {
  // For the default breathing ritual, delegate to the existing builder
  if (variant === 'breathing') {
    return buildRitualSteps(profile, hour, streak, daysMissed, lang);
  }

  // ── Balanced ritual — unique flow: arrive → focus → note → recenter → return
  if (variant === 'balanced') {
    const depth   = getDepth(totalDays);
    const langKey = lang === 'pt' ? 'pt' : lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : lang === 'de' ? 'de' : 'en';
    const cfg     = VARIANT_CONFIGS.balanced[langKey];

    let streakNote: string | undefined;
    if (streak >= 3) {
      if (lang === 'pt') streakNote = `Dia ${streak} — você continua voltando.`;
      else if (lang === 'es') streakNote = `Día ${streak} — sigues volviendo.`;
      else if (lang === 'fr') streakNote = `Jour ${streak} — tu continues à revenir.`;
      else if (lang === 'de') streakNote = `Tag ${streak} — du kommst immer wieder zurück.`;
      else streakNote = `Day ${streak} — you keep coming back.`;
    }

    const returnEyebrow =
      lang === 'pt' || lang === 'es' ? 'RESET COMPLETO' :
      lang === 'fr' ? 'RESET TERMINÉ' :
      lang === 'de' ? 'RESET ABGESCHLOSSEN' : 'RESET COMPLETE';

    const arriveStep: RitualStep = {
      id: 'arrive',
      eyebrow: cfg.arrive.eyebrow,
      headline: cfg.arrive.headline,
      subtext: cfg.arrive.subtext,
      autoAdvanceMs: 4000,
      streakNote,
    };

    const focusStep: RitualStep = {
      id: 'focus',
      eyebrow: cfg.focus[0].eyebrow,
      headline: cfg.focus[0].headline,
      centerText: cfg.focus[0].centerText,
      subtext: cfg.focus[0].subtext,
      autoAdvanceMs: 0,
    };

    const noteQuestions = cfg.note?.noteQuestions ?? [];
    const noteStep: RitualStep = {
      id: 'note',
      eyebrow: cfg.note?.eyebrow ?? '',
      headline: noteQuestions.length > 0
        ? noteQuestions[totalDays % noteQuestions.length]
        : '',
      subtext: '',
      autoAdvanceMs: 0,
    };

    const recenterStep: RitualStep = {
      id: 'recenter',
      eyebrow: cfg.recenter.eyebrow,
      headline: cfg.recenter.headline,
      subtext: cfg.recenter.subtext,
      autoAdvanceMs: 0,
      intentionOptions: cfg.recenter.options,
    };

    const returnMessages = cfg.return.returnMessages ?? [];
    const returnStep: RitualStep = {
      id: 'return',
      eyebrow: returnEyebrow,
      headline: returnMessages.length > 0
        ? returnMessages[totalDays % returnMessages.length]
        : cfg.return.headline,
      subtext: cfg.return.subtext,
      autoAdvanceMs: 0,
    };

    if (depth === 'new')      return [arriveStep, focusStep, noteStep, recenterStep, returnStep];
    if (depth === 'returning') return [arriveStep, noteStep, recenterStep, returnStep];
    return [arriveStep, recenterStep, returnStep];
  }

  const depth   = getDepth(totalDays);
  const langKey = lang === 'pt' ? 'pt' : lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : lang === 'de' ? 'de' : 'en';
  const cfg     = VARIANT_CONFIGS[variant][langKey];

  let streakNote: string | undefined;
  if (streak >= 3) {
    if (lang === 'pt') streakNote = `Dia ${streak} — você continua voltando.`;
    else if (lang === 'es') streakNote = `Día ${streak} — sigues volviendo.`;
    else if (lang === 'fr') streakNote = `Jour ${streak} — tu continues à revenir.`;
    else if (lang === 'de') streakNote = `Tag ${streak} — du kommst immer wieder zurück.`;
    else streakNote = `Day ${streak} — you keep coming back.`;
  }

  const returnEyebrow =
    lang === 'pt' || lang === 'es' ? 'RESET COMPLETO' :
    lang === 'fr' ? 'RESET TERMINÉ' :
    lang === 'de' ? 'RESET ABGESCHLOSSEN' : 'RESET COMPLETE';

  const arriveStep: RitualStep = {
    id: 'arrive',
    eyebrow: cfg.arrive.eyebrow,
    headline: cfg.arrive.headline,
    subtext: cfg.arrive.subtext,
    autoAdvanceMs: 4000,
    streakNote,
  };

  const recenterStep: RitualStep = {
    id: 'recenter',
    eyebrow: cfg.recenter.eyebrow,
    headline: cfg.recenter.headline,
    subtext: cfg.recenter.subtext,
    autoAdvanceMs: 0,
    intentionOptions: cfg.recenter.options,
  };

  const returnStep: RitualStep = {
    id: 'return',
    eyebrow: returnEyebrow,
    headline: cfg.return.headline,
    subtext: cfg.return.subtext,
    autoAdvanceMs: 0,
  };

  const makeFocus = (i: 0 | 1 | 2): RitualStep => ({
    id: 'focus',
    eyebrow: cfg.focus[i].eyebrow,
    headline: cfg.focus[i].headline,
    centerText: cfg.focus[i].centerText,
    subtext: cfg.focus[i].subtext,
    autoAdvanceMs: 0,
  });

  // bodyRest: focus[2] is replaced by a full breathing interaction
  const bodyRestBreatheStep: RitualStep = {
    id: 'breathe',
    eyebrow: cfg.focus[2].eyebrow,
    headline: cfg.focus[2].headline,
    subtext: cfg.focus[2].subtext,
    autoAdvanceMs: 0,
  };

  // Variants with cfg.breathe (slowThoughts, releaseTension) also get a dedicated breathing step
  const variantBreatheStep: RitualStep | null = cfg.breathe ? {
    id: 'breathe',
    eyebrow: cfg.breathe.eyebrow,
    headline: cfg.breathe.headline,
    subtext: cfg.breathe.subtext,
    autoAdvanceMs: 0,
  } : null;

  // Build the middle steps by variant and depth
  let middleSteps: RitualStep[];

  if (variant === 'bodyRest') {
    // bodyRest always keeps the breathing interaction
    if (depth === 'new')            middleSteps = [makeFocus(0), makeFocus(1), bodyRestBreatheStep];
    else if (depth === 'returning') middleSteps = [makeFocus(0), bodyRestBreatheStep];
    else                            middleSteps = [bodyRestBreatheStep];
  } else if (variantBreatheStep) {
    // slowThoughts + releaseTension: replace last focus slot with breathing
    if (depth === 'new')            middleSteps = [makeFocus(0), makeFocus(1), variantBreatheStep];
    else if (depth === 'returning') middleSteps = [makeFocus(0), variantBreatheStep];
    else                            middleSteps = [variantBreatheStep];
  } else {
    if (depth === 'new')            middleSteps = [makeFocus(0), makeFocus(1), makeFocus(2)];
    else if (depth === 'returning') middleSteps = [makeFocus(0), makeFocus(2)];
    else                            middleSteps = [makeFocus(0)];
  }

  return [arriveStep, ...middleSteps, recenterStep, returnStep];
}

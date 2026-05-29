// ─── Reset Ritual System ──────────────────────────────────────────────────────
// The signature emotional feature of Daily Reset.
// 6 cinematic phases: arrive · breathe · release · recenter · reflect · return.
// Tone: calming · cinematic · intimate · restorative · never generic.

import { EmotionalProfile } from './emotionalProfile';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RitualStepId =
  | 'arrive'
  | 'breathe'
  | 'release'
  | 'recenter'
  | 'reflect'
  | 'return'
  | 'focus';   // text-only action step for mood-based ritual variants

export interface RitualStep {
  id: RitualStepId;
  eyebrow: string;
  headline: string;
  subtext: string;
  autoAdvanceMs: number; // 0 = manual only
  streakNote?: string;
  centerText?: string;              // displayed on 'focus' steps
  intentionOptions?: IntentionOption[]; // overrides default options on 'recenter' steps
}

export interface IntentionOption {
  id: string;
  label: string;
  sub: string;
}

export interface RitualRecord {
  completedAt: string;
  intention: string | null;
  profile: EmotionalProfile | null;
  totalDays: number;
}

// ─── Intention options ────────────────────────────────────────────────────────

export const INTENTION_OPTIONS: IntentionOption[] = [
  { id: 'calm',    label: 'Calm',    sub: '' },
  { id: 'clarity', label: 'Clarity', sub: '' },
  { id: 'rest',    label: 'Rest',    sub: '' },
];

const INTENTION_OPTIONS_ES: IntentionOption[] = [
  { id: 'calm',    label: 'Calma',    sub: '' },
  { id: 'clarity', label: 'Claridad', sub: '' },
  { id: 'rest',    label: 'Descanso', sub: '' },
];

const INTENTION_OPTIONS_PT: IntentionOption[] = [
  { id: 'calm',    label: 'Calma',   sub: '' },
  { id: 'clarity', label: 'Clareza', sub: '' },
  { id: 'rest',    label: 'Descanso', sub: '' },
];

const INTENTION_OPTIONS_FR: IntentionOption[] = [
  { id: 'calm',    label: 'Calme',   sub: '' },
  { id: 'clarity', label: 'Clarté',  sub: '' },
  { id: 'rest',    label: 'Repos',   sub: '' },
];

const INTENTION_OPTIONS_DE: IntentionOption[] = [
  { id: 'calm',    label: 'Ruhe',     sub: '' },
  { id: 'clarity', label: 'Klarheit', sub: '' },
  { id: 'rest',    label: 'Erholung', sub: '' },
];

export function getIntentionOptions(lang?: string): IntentionOption[] {
  if (lang === 'es') return INTENTION_OPTIONS_ES;
  if (lang === 'pt') return INTENTION_OPTIONS_PT;
  if (lang === 'fr') return INTENTION_OPTIONS_FR;
  if (lang === 'de') return INTENTION_OPTIONS_DE;
  return INTENTION_OPTIONS;
}

// ─── Release content by profile ───────────────────────────────────────────────

const RELEASE: Record<EmotionalProfile | 'default', { headline: string; subtext: string }> = {
  focus: {
    headline: 'What you protect\nhas space to grow.',
    subtext: 'The noise can wait.',
  },
  calm: {
    headline: 'Not everything needs to fit\nin today.',
    subtext: 'A little space is already enough.',
  },
  confidence: {
    headline: 'Trust the quiet progress.',
    subtext: 'You are building something real.',
  },
  burnout: {
    headline: 'Rest is not optional.\nIt is how you continue.',
    subtext: 'Nothing is wrong with needing to stop.',
  },
  default: {
    headline: 'For a moment,\nnothing needs to move.',
    subtext: 'This is just yours.',
  },
};

const RELEASE_ES: Record<EmotionalProfile | 'default', { headline: string; subtext: string }> = {
  focus: {
    headline: 'Lo que cuidas\ntiene espacio para crecer.',
    subtext: 'El ruido puede esperar.',
  },
  calm: {
    headline: 'No todo necesita caber\nen el día de hoy.',
    subtext: 'Un poco de espacio ya es suficiente.',
  },
  confidence: {
    headline: 'Confía en el progreso silencioso.',
    subtext: 'Estás construyendo algo real.',
  },
  burnout: {
    headline: 'El descanso no es opcional.\nEs cómo sigues adelante.',
    subtext: 'No hay nada malo en necesitar parar.',
  },
  default: {
    headline: 'Por un momento,\nnada necesita avanzar.',
    subtext: 'Esto es solo tuyo.',
  },
};

const RELEASE_PT: Record<EmotionalProfile | 'default', { headline: string; subtext: string }> = {
  focus: {
    headline: 'O que você protege\ntem espaço para crescer.',
    subtext: 'O ruído pode esperar.',
  },
  calm: {
    headline: 'Nem tudo precisa\ncaber no dia de hoje.',
    subtext: 'Um pouco de espaço já é suficiente.',
  },
  confidence: {
    headline: 'Confie no progresso silencioso.',
    subtext: 'Você está construindo algo real.',
  },
  burnout: {
    headline: 'O descanso não é opcional.\nÉ como você continua.',
    subtext: 'Não tem nada errado em precisar parar.',
  },
  default: {
    headline: 'Por um momento,\nnada precisa avançar.',
    subtext: 'Isso aqui é só seu.',
  },
};

const RELEASE_FR: Record<EmotionalProfile | 'default', { headline: string; subtext: string }> = {
  focus: {
    headline: 'Ce que tu protèges\na l\'espace pour grandir.',
    subtext: 'Le bruit peut attendre.',
  },
  calm: {
    headline: 'Tout n\'a pas besoin\nde tenir dans aujourd\'hui.',
    subtext: 'Un peu d\'espace suffit déjà.',
  },
  confidence: {
    headline: 'Fais confiance au progrès silencieux.',
    subtext: 'Tu construis quelque chose de réel.',
  },
  burnout: {
    headline: 'Le repos n\'est pas optionnel.\nC\'est comment tu continues.',
    subtext: 'Il n\'y a rien de mal à avoir besoin de s\'arrêter.',
  },
  default: {
    headline: 'Pour un instant,\nrien n\'a besoin d\'avancer.',
    subtext: 'Cet espace est juste pour toi.',
  },
};

const RELEASE_DE: Record<EmotionalProfile | 'default', { headline: string; subtext: string }> = {
  focus: {
    headline: 'Was du schützt,\nhat Raum zum Wachsen.',
    subtext: 'Das Rauschen kann warten.',
  },
  calm: {
    headline: 'Nicht alles muss heute\nPlatz finden.',
    subtext: 'Ein bisschen Raum ist bereits genug.',
  },
  confidence: {
    headline: 'Vertraue dem stillen Fortschritt.',
    subtext: 'Du baust etwas Echtes auf.',
  },
  burnout: {
    headline: 'Ruhe ist nicht optional.\nSie ist, wie du weitermachst.',
    subtext: 'Es ist nichts falsch daran, pausieren zu müssen.',
  },
  default: {
    headline: 'Für einen Moment\nmuss sich nichts bewegen.',
    subtext: 'Das hier gehört nur dir.',
  },
};

// ─── Return messages by profile ───────────────────────────────────────────────

const RETURN_MESSAGES: Record<EmotionalProfile | 'default', string> = {
  focus:      'Your attention found its way back.',
  calm:       'Maybe today was just about slowing down.',
  confidence: 'You were still here. That counts.',
  burnout:    'You let yourself stop.',
  default:    'Something got a little lighter.',
};

const RETURN_MESSAGES_ES: Record<EmotionalProfile | 'default', string> = {
  focus:      'Tu atención volvió a ti.',
  calm:       'Quizás hoy solo era sobre desacelerar.',
  confidence: 'Seguías aquí. Eso cuenta.',
  burnout:    'Te permitiste parar.',
  default:    'Algo se volvió un poco más ligero.',
};

const RETURN_MESSAGES_PT: Record<EmotionalProfile | 'default', string> = {
  focus:      'Sua atenção voltou para você.',
  calm:       'Talvez hoje fosse só sobre desacelerar.',
  confidence: 'Você ainda estava aqui. Isso conta.',
  burnout:    'Você se permitiu parar.',
  default:    'Algo ficou um pouco mais leve.',
};

const RETURN_SUBTEXTS: Record<EmotionalProfile | 'default', string> = {
  focus:      'One small step already changes the rhythm.',
  calm:       'Not everything needs to be solved today.',
  confidence: "Showing up doesn't have to be grand.",
  burnout:    'Doing less can also be care.',
  default:    'This moment counted too.',
};

const RETURN_SUBTEXTS_ES: Record<EmotionalProfile | 'default', string> = {
  focus:      'Un pequeño paso ya cambia el ritmo.',
  calm:       'No todo necesita resolverse hoy.',
  confidence: 'Seguir no tiene que ser grandioso.',
  burnout:    'Hacer menos también es cuidado.',
  default:    'Este momento también contó.',
};

const RETURN_SUBTEXTS_PT: Record<EmotionalProfile | 'default', string> = {
  focus:      'Um pequeno passo já muda o ritmo.',
  calm:       'Nem tudo precisa ser resolvido hoje.',
  confidence: 'Continuar não precisa ser grandioso.',
  burnout:    'Fazer menos também é cuidado.',
  default:    'Esse momento também contou.',
};

const RETURN_MESSAGES_FR: Record<EmotionalProfile | 'default', string> = {
  focus:      'Ton attention a trouvé son chemin.',
  calm:       'Peut-être qu\'aujourd\'hui c\'était juste ralentir.',
  confidence: 'Tu étais là. Ça compte.',
  burnout:    'Tu t\'es permis de t\'arrêter.',
  default:    'Quelque chose est devenu un peu plus léger.',
};

const RETURN_SUBTEXTS_FR: Record<EmotionalProfile | 'default', string> = {
  focus:      'Un petit pas change déjà le rythme.',
  calm:       'Tout n\'a pas besoin d\'être résolu aujourd\'hui.',
  confidence: 'Continuer n\'a pas besoin d\'être grand.',
  burnout:    'Faire moins peut aussi être du soin.',
  default:    'Ce moment a compté aussi.',
};

const RETURN_MESSAGES_DE: Record<EmotionalProfile | 'default', string> = {
  focus:      'Deine Aufmerksamkeit hat ihren Weg zurückgefunden.',
  calm:       'Vielleicht war heute einfach Entschleunigen.',
  confidence: 'Du warst noch da. Das zählt.',
  burnout:    'Du hast dich pausieren lassen.',
  default:    'Etwas wurde ein bisschen leichter.',
};

const RETURN_SUBTEXTS_DE: Record<EmotionalProfile | 'default', string> = {
  focus:      'Ein kleiner Schritt verändert bereits den Rhythmus.',
  calm:       'Nicht alles muss heute gelöst werden.',
  confidence: 'Weitermachen muss nicht groß sein.',
  burnout:    'Weniger tun ist auch Fürsorge.',
  default:    'Dieser Moment hat auch gezählt.',
};

// ─── Arrive messages (context-aware) ─────────────────────────────────────────

function getArriveMessage(
  hour: number,
  streak: number,
  daysMissed: number,
  lang?: string,
): { headline: string; subtext: string; streakNote?: string } {
  let headline: string;
  let subtext: string;

  if (lang === 'es') {
    if (daysMissed >= 3) {
      headline = 'Nada se ha perdido.\nEstás aquí.';
      subtext  = 'Volver es todo.';
    } else if (daysMissed >= 1) {
      headline = 'Estuviste un tiempo fuera.\nBienvenida de vuelta.';
      subtext  = 'Este es el regreso. Eso cuenta.';
    } else if (hour < 12) {
      headline = 'Puedes\nhacer una pausa.';
      subtext  = 'Antes de que el día comience — un respiro.';
    } else if (hour < 17) {
      headline = 'Puedes\nhacer una pausa.';
      subtext  = 'Este momento es solo tuyo.';
    } else {
      headline = 'Puedes\nhacer una pausa.';
      subtext  = 'Antes de que el día cierre — vuelve con calma.';
    }
    const streakNote = streak >= 3 ? `Día ${streak} — sigues volviendo.` : undefined;
    return { headline, subtext, streakNote };
  }

  if (lang === 'pt') {
    if (daysMissed >= 3) {
      headline = 'Nada está perdido.\nVocê está aqui.';
      subtext  = 'Voltar é tudo.';
    } else if (daysMissed >= 1) {
      headline = 'Você ficou um tempo fora.\nBem-vindo de volta.';
      subtext  = 'Esse é o retorno. Isso conta.';
    } else if (hour < 12) {
      headline = 'Você pode\nparar um momento.';
      subtext  = 'Antes de o dia começar — um respiro.';
    } else if (hour < 17) {
      headline = 'Você pode\nparar um momento.';
      subtext  = 'Esse momento é só seu.';
    } else {
      headline = 'Você pode\nparar um momento.';
      subtext  = 'Antes de o dia fechar — volte com calma.';
    }
    const streakNote = streak >= 3 ? `Dia ${streak} — você continua voltando.` : undefined;
    return { headline, subtext, streakNote };
  }

  if (lang === 'fr') {
    if (daysMissed >= 3) {
      headline = 'Rien n\'est perdu.\nTu es là.';
      subtext  = 'Revenir, c\'est tout.';
    } else if (daysMissed >= 1) {
      headline = 'Tu étais absent un moment.\nBon retour.';
      subtext  = 'C\'est le retour. Ça compte.';
    } else if (hour < 12) {
      headline = 'Tu peux\nfaire une pause.';
      subtext  = 'Avant que la journée commence — un souffle.';
    } else if (hour < 17) {
      headline = 'Tu peux\nfaire une pause.';
      subtext  = 'Cet instant est juste pour toi.';
    } else {
      headline = 'Tu peux\nfaire une pause.';
      subtext  = 'Avant que la journée se ferme — reviens doucement.';
    }
    const streakNote = streak >= 3 ? `Jour ${streak} — tu continues à revenir.` : undefined;
    return { headline, subtext, streakNote };
  }

  if (lang === 'de') {
    if (daysMissed >= 3) {
      headline = 'Nichts ist verloren.\nDu bist hier.';
      subtext  = 'Zurückkehren ist alles.';
    } else if (daysMissed >= 1) {
      headline = 'Du warst eine Weile weg.\nWillkommen zurück.';
      subtext  = 'Das ist die Rückkehr. Das zählt.';
    } else if (hour < 12) {
      headline = 'Du darfst\ninnehalten.';
      subtext  = 'Bevor der Tag beginnt — ein Atemzug.';
    } else if (hour < 17) {
      headline = 'Du darfst\ninnehalten.';
      subtext  = 'Dieser Moment gehört nur dir.';
    } else {
      headline = 'Du darfst\ninnehalten.';
      subtext  = 'Bevor der Tag endet — komm ruhig zurück.';
    }
    const streakNote = streak >= 3 ? `Tag ${streak} — du kommst immer wieder zurück.` : undefined;
    return { headline, subtext, streakNote };
  }

  if (daysMissed >= 3) {
    headline = "Nothing is ruined.\nYou're here now.";
    subtext = 'Coming back is the whole thing.';
  } else if (daysMissed >= 1) {
    headline = "You were away.\nWelcome back.";
    subtext = 'This is the return. That counts.';
  } else if (hour < 12) {
    headline = 'You are allowed\nto pause.';
    subtext = 'Before the day begins — one breath.';
  } else if (hour < 17) {
    headline = 'You are allowed\nto pause.';
    subtext = 'This moment belongs only to you.';
  } else {
    headline = 'You are allowed\nto pause.';
    subtext = 'Before the day closes — come back gently.';
  }

  const streakNote = streak >= 3 ? `Day ${streak} — you keep coming back.` : undefined;
  return { headline, subtext, streakNote };
}

// ─── Step builder ─────────────────────────────────────────────────────────────

export function buildRitualSteps(
  profile: EmotionalProfile | null,
  hour: number = new Date().getHours(),
  streak: number = 0,
  daysMissed: number = 0,
  lang?: string,
): RitualStep[] {
  const isEs       = lang === 'es';
  const isPt       = lang === 'pt';
  const isFr       = lang === 'fr';
  const isDe       = lang === 'de';
  const profileKey = profile ?? 'default';
  const arrive     = getArriveMessage(hour, streak, daysMissed, lang);
  const release    = (isEs ? RELEASE_ES : isPt ? RELEASE_PT : isFr ? RELEASE_FR : isDe ? RELEASE_DE : RELEASE)[profileKey];
  const returnMsg  = (isEs ? RETURN_MESSAGES_ES : isPt ? RETURN_MESSAGES_PT : isFr ? RETURN_MESSAGES_FR : isDe ? RETURN_MESSAGES_DE : RETURN_MESSAGES)[profileKey];
  const returnSub  = (isEs ? RETURN_SUBTEXTS_ES : isPt ? RETURN_SUBTEXTS_PT : isFr ? RETURN_SUBTEXTS_FR : isDe ? RETURN_SUBTEXTS_DE : RETURN_SUBTEXTS)[profileKey];

  return [
    {
      id: 'arrive',
      eyebrow: isEs ? 'RITUAL DE RESET' : isPt ? 'RITUAL DE RESET' : isFr ? 'RITUEL DE RESET' : isDe ? 'RESET RITUAL' : 'RESET RITUAL',
      headline: arrive.headline,
      subtext: arrive.subtext,
      autoAdvanceMs: 4000,
      streakNote: arrive.streakNote,
    },
    {
      id: 'breathe',
      eyebrow: isEs ? 'RESPIRA' : isPt ? 'RESPIRE' : isFr ? 'RESPIRE' : isDe ? 'ATME' : 'BREATHE',
      headline: isEs ? 'Respirar despacio\ncambia todo.' : isPt ? 'Respirar devagar muda tudo.' : isFr ? 'Respirer lentement\nchange tout.' : isDe ? 'Ein ruhiger Atemzug\nverändert alles.' : 'One slow breath\nchanges everything.',
      subtext: isEs ? 'Sigue el ritmo. Nada más.' : isPt ? 'Apenas acompanhe o ritmo.' : isFr ? 'Suis le cercle. Rien d\'autre.' : isDe ? 'Folge dem Kreis. Nichts weiter.' : 'Follow the circle. Nothing else.',
      autoAdvanceMs: 0,
    },
    {
      id: 'release',
      eyebrow: isEs ? 'SUELTA' : isPt ? 'SOLTE' : isFr ? 'RELÂCHE' : isDe ? 'LOSLASSEN' : 'RELEASE',
      headline: release.headline,
      subtext: release.subtext,
      autoAdvanceMs: 0,
    },
    {
      id: 'recenter',
      eyebrow: isEs ? 'UNA INTENCIÓN' : isPt ? 'UMA INTENÇÃO' : isFr ? 'UNE INTENTION' : isDe ? 'EINE ABSICHT' : 'ONE INTENTION',
      headline: isEs ? '¿Qué importa más\nahora?' : isPt ? 'O que mais importa\nagora?' : isFr ? 'Qu\'est-ce qui compte le plus\nmaintenant ?' : isDe ? 'Was zählt gerade\nam meisten?' : 'What matters most\nright now?',
      subtext: isEs ? 'Una sola cosa.' : isPt ? 'O que faz sentido agora?' : isFr ? 'Une seule chose.' : isDe ? 'Wähle eine Sache.' : 'Choose one.',
      autoAdvanceMs: 0,
    },
    {
      id: 'reflect',
      eyebrow: isEs ? 'UN MOMENTO' : isPt ? 'UM MOMENTO' : isFr ? 'UN INSTANT' : isDe ? 'EIN MOMENT' : 'A MOMENT',
      headline: isEs ? 'Quédate con esto\nun momento.' : isPt ? 'Fique com isso\npor um momento.' : isFr ? 'Reste avec ça\nun instant.' : isDe ? 'Bleibe einen Moment\nhier.' : 'Sit with this\nfor a moment.',
      subtext: isEs ? 'No hay respuesta correcta.' : isPt ? 'Não há resposta certa.' : isFr ? 'Il n\'y a pas de bonne réponse.' : isDe ? 'Es gibt keine richtige Antwort.' : 'There is no right answer.',
      autoAdvanceMs: 7000,
    },
    {
      id: 'return',
      eyebrow: isEs ? 'RESET COMPLETO' : isPt ? 'RESET COMPLETO' : isFr ? 'RESET TERMINÉ' : isDe ? 'RESET ABGESCHLOSSEN' : 'RESET COMPLETE',
      headline: returnMsg,
      subtext: returnSub,
      autoAdvanceMs: 0,
    },
  ];
}

export function getRitualCompletionMessage(profile: EmotionalProfile | null): string {
  return RETURN_MESSAGES[profile ?? 'default'];
}

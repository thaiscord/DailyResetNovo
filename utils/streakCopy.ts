// ─── Emotional Streak System ─────────────────────────────────────────────────
// All functions delegate stage logic to progressionEngine.
// Result: consistent evolution language across Today, Progress, Profile.
// Language: functions check langStore for active lang and return appropriate copy.

import { isEs, isPt, isFr, isDe } from './langStore';

import {
  getEvolutionStage,
  getRotatingPhrase,
  getDynamicMilestoneMessage,
  getMilestoneLabel,
  getEmotionalState,
  type EvolutionStage,
  type EmotionalState,
} from './progressionEngine';

export type { EvolutionStage, EmotionalState };
export { getEvolutionStage, getRotatingPhrase, getDynamicMilestoneMessage, getEmotionalState };

// ── Emotional Streak Copy ──────────────────────────────────────────────────────
// Returns non-gamified, emotionally grounded copy for any streak length.
// Safe for null/undefined — defaults to day-0 state.
export interface EmotionalStreakCopy {
  headline: string;
  subtitle: string;
  shortLabel: string;
}

export function getEmotionalStreakCopy(streak: number | null | undefined): EmotionalStreakCopy {
  const days = streak ?? 0;

  if (isEs()) {
    if (days === 0)  return { headline: 'Sin presión.',                    subtitle: 'El espacio sigue aquí.',                              shortLabel: 'Listo para regresar' };
    if (days === 1)  return { headline: 'Hoy regresaste a ti.',             subtitle: 'Aunque pequeño, ocurrió.',                            shortLabel: '1 regreso tranquilo' };
    if (days === 2)  return { headline: 'Siguiendo apareciendo.',          subtitle: 'Dos regresos. Algo comenzó.',                         shortLabel: '2 regresos tranquilos' };
    if (days === 3)  return { headline: 'Tres días de presencia.',         subtitle: 'Los regresos empiezan a unirse.',                     shortLabel: '3 regresos tranquilos' };
    if (days <= 6)   return { headline: 'Aún apareciendo.',                subtitle: 'Los pequeños regresos suman en silencio.',            shortLabel: 'Aún regresando' };
    if (days === 7)  return { headline: 'Los días empiezan a conectarse.', subtitle: 'Poco a poco, el ritmo reaparece.',                    shortLabel: 'Una semana más suave' };
    if (days <= 13)  return { headline: 'El ritmo empieza a aparecer.',      subtitle: 'Pequeños regresos uniéndose.',                  shortLabel: 'Ritmo formándose' };
    if (days === 14) return { headline: 'Dos semanas de presencia.',       subtitle: 'Esto se está convirtiendo en algo real.',             shortLabel: 'Dos semanas tranquilas' };
    if (days <= 29)  return { headline: 'Aún aquí.',                       subtitle: 'Estás reconstruyendo confianza en ti mismo.',         shortLabel: 'Aún aquí' };
    if (days === 30) return { headline: 'Un mes de regresos.',             subtitle: 'Treinta días. Tu espacio sigue existiendo.',          shortLabel: 'Un mes de regresos' };
    return            { headline: 'Un ritmo al que regresar.',             subtitle: 'El progreso se está convirtiendo en tu vida.',        shortLabel: 'Ritmo tranquilo' };
  }

  if (isPt()) {
    if (days === 0)  return { headline: 'Sem pressão.',                   subtitle: 'O espaço continua aqui.',                              shortLabel: 'Pronta para voltar' };
    if (days === 1)  return { headline: 'Hoje houve retorno.',            subtitle: 'Mesmo pequeno, aconteceu.',                            shortLabel: '1 retorno quieto' };
    if (days === 2)  return { headline: 'Você seguiu aparecendo.',        subtitle: 'O espaço reapareceu mais uma vez.',                    shortLabel: '2 retornos tranquilos' };
    if (days === 3)  return { headline: 'Três dias de presença.',         subtitle: 'Os retornos começam a se juntar.',                     shortLabel: '3 retornos tranquilos' };
    if (days <= 6)   return { headline: 'Ainda aparecendo.',              subtitle: 'Pequenos retornos somam quietamente.',                  shortLabel: 'Ainda voltando' };
    if (days === 7)  return { headline: 'Os dias começam a se conectar.', subtitle: 'Aos poucos, o ritmo reaparece.',                       shortLabel: 'Uma semana' };
    if (days <= 13)  return { headline: 'Os retornos começam a criar ritmo.', subtitle: 'Pequenos retornos se juntando.',                   shortLabel: 'Ritmo se formando' };
    if (days === 14) return { headline: 'Duas semanas de presença.',      subtitle: 'Isso está se tornando algo real.',                     shortLabel: 'Duas semanas tranquilas' };
    if (days <= 29)  return { headline: 'Ainda aqui.',                    subtitle: 'Você está reconstruindo confiança em si mesma.',        shortLabel: 'Ainda aqui' };
    if (days === 30) return { headline: 'Um mês de retornos.',            subtitle: 'Trinta dias. Seu espaço continua existindo.',           shortLabel: 'Um mês' };
    return            { headline: 'Os retornos começam a criar ritmo.',     subtitle: 'Pequenos retornos se somando.',                         shortLabel: 'Ritmo tranquilo' };
  }

  if (isFr()) {
    if (days === 0)  return { headline: 'Pas de pression.',                  subtitle: 'L\'espace est encore là.',                                shortLabel: 'Prêt à revenir' };
    if (days === 1)  return { headline: 'Tu es revenu aujourd\'hui.',         subtitle: 'Même discret, ça compte.',                                shortLabel: '1 retour tranquille' };
    if (days === 2)  return { headline: 'Tu as continué à te présenter.',     subtitle: 'L\'espace est réapparu une fois de plus.',                shortLabel: '2 retours tranquilles' };
    if (days === 3)  return { headline: 'Trois jours de présence.',           subtitle: 'Les retours commencent à se joindre.',                    shortLabel: '3 retours tranquilles' };
    if (days <= 6)   return { headline: 'Tu es encore là.',                   subtitle: 'Les petits retours s\'accumulent doucement.',              shortLabel: 'Encore là' };
    if (days === 7)  return { headline: 'Les jours commencent à se connecter.', subtitle: 'Petit à petit, un rythme réapparaît.',                  shortLabel: 'Une semaine douce' };
    if (days <= 13)  return { headline: 'Les retours créent du rythme.',       subtitle: 'De petits retours qui se rejoignent.',                    shortLabel: 'Rythme qui se forme' };
    if (days === 14) return { headline: 'Deux semaines de présence.',          subtitle: 'Quelque chose de réel se construit ici.',                 shortLabel: 'Deux semaines tranquilles' };
    if (days <= 29)  return { headline: 'Encore ici.',                         subtitle: 'Tu reconstruis confiance en toi.',                        shortLabel: 'Encore ici' };
    if (days === 30) return { headline: 'Un mois de retours.',                 subtitle: 'Trente jours. Ton espace continue d\'exister.',            shortLabel: 'Un mois de retours' };
    return            { headline: 'Un rythme auquel revenir.',                 subtitle: 'Le progrès fait partie de ta vie maintenant.',             shortLabel: 'Rythme tranquille' };
  }

  if (isDe()) {
    if (days === 0)  return { headline: 'Kein Druck.',                        subtitle: 'Der Raum ist noch hier.',                                  shortLabel: 'Bereit zurückzukehren' };
    if (days === 1)  return { headline: 'Heute gab es eine Rückkehr.',        subtitle: 'Auch klein — es ist passiert.',                            shortLabel: '1 stille Rückkehr' };
    if (days === 2)  return { headline: 'Du bist weiter erschienen.',         subtitle: 'Der Raum ist noch einmal zurückgekehrt.',                  shortLabel: '2 stille Rückkehren' };
    if (days === 3)  return { headline: 'Drei Tage Präsenz.',                 subtitle: 'Rückkehren beginnt sich zu verbinden.',                    shortLabel: '3 stille Rückkehren' };
    if (days <= 6)   return { headline: 'Immer noch erscheinend.',            subtitle: 'Kleine Rückkehren summieren sich still.',                  shortLabel: 'Immer noch zurück' };
    if (days === 7)  return { headline: 'Die Tage beginnen sich zu verbinden.', subtitle: 'Langsam erscheint ein Rhythmus wieder.',                 shortLabel: 'Eine sanfte Woche' };
    if (days <= 13)  return { headline: 'Rückkehren schafft Rhythmus.',        subtitle: 'Kleine Rückkehren, die sich verbinden.',                  shortLabel: 'Rhythmus entsteht' };
    if (days === 14) return { headline: 'Zwei Wochen Präsenz.',               subtitle: 'Hier wird etwas Echtes aufgebaut.',                        shortLabel: 'Zwei stille Wochen' };
    if (days <= 29)  return { headline: 'Immer noch hier.',                   subtitle: 'Du baust wieder Vertrauen in dich auf.',                   shortLabel: 'Immer noch hier' };
    if (days === 30) return { headline: 'Ein Monat Rückkehren.',              subtitle: 'Dreißig Tage. Dein Raum existiert weiter.',                shortLabel: 'Ein Monat Rückkehren' };
    return            { headline: 'Ein Rhythmus, zu dem du zurückkehren kannst.', subtitle: 'Fortschritt wird Teil deines Lebens.',                 shortLabel: 'Stiller Rhythmus' };
  }

  if (days === 0)  return { headline: 'No pressure.',                    subtitle: 'The space is still here.',                             shortLabel: 'Ready to return' };
  if (days === 1)  return { headline: 'There was a return today.',       subtitle: 'Even small, it happened.',                             shortLabel: '1 quiet return' };
  if (days === 2)  return { headline: 'You kept showing up.',            subtitle: 'The space reappeared once more.',                      shortLabel: '2 quiet returns' };
  if (days === 3)  return { headline: 'Three days of presence.',         subtitle: 'Returns are beginning to join.',                       shortLabel: '3 quiet returns' };
  if (days <= 6)   return { headline: 'Still showing up.',               subtitle: 'Small returns add up quietly.',                        shortLabel: 'Still returning' };
  if (days === 7)  return { headline: 'The days are starting to connect.', subtitle: 'Slowly, a rhythm is reappearing.',                   shortLabel: 'A softer week' };
  if (days <= 13)  return { headline: 'Returns are beginning to create rhythm.', subtitle: 'Small returns joining together.',              shortLabel: 'Rhythm forming' };
  if (days === 14) return { headline: 'Two weeks of presence.',          subtitle: 'This is becoming something real.',                     shortLabel: 'Two quiet weeks' };
  if (days <= 29)  return { headline: 'Still here.',                     subtitle: 'You are rebuilding trust with yourself.',              shortLabel: 'Still here' };
  if (days === 30) return { headline: 'A month of returning.',           subtitle: 'Thirty days. Your space keeps existing.',              shortLabel: 'A month of returns' };
  return             { headline: 'A rhythm you can return to.',          subtitle: 'Progress is becoming part of your life.',              shortLabel: 'Quiet rhythm' };
}

// ── Identity label (streak pill, progress hero, profile tier) ─────────────────
const ES_IDENTITY_LABELS: Record<string, string> = {
  starting: 'Primer día', stabilizing: 'Estabilizando',
  rebuilding: 'Reconstruyendo', consistent: 'Consistente',
  focused: 'Enfocado', disciplined: 'Disciplinado', unstoppable: 'Imparable',
};
const PT_IDENTITY_LABELS: Record<string, string> = {
  starting: 'Começando', stabilizing: 'Voltando aos poucos',
  rebuilding: 'Reconstruindo', consistent: 'Constante',
  focused: 'Focada', disciplined: 'Disciplinada', unstoppable: 'Imparável',
};
const FR_IDENTITY_LABELS: Record<string, string> = {
  starting: 'Début', stabilizing: 'En train de revenir',
  rebuilding: 'En reconstruction', consistent: 'Constant',
  focused: 'Concentré', disciplined: 'Discipliné', unstoppable: 'Imparable',
};
const DE_IDENTITY_LABELS: Record<string, string> = {
  starting: 'Erster Tag', stabilizing: 'Kehrt zurück',
  rebuilding: 'Wiederaufbau', consistent: 'Beständig',
  focused: 'Fokussiert', disciplined: 'Diszipliniert', unstoppable: 'Unaufhaltsam',
};
export function getIdentityLabel(streak: number): string {
  if (streak === 0) {
    if (isEs()) return 'Hoy es tu oportunidad.';
    if (isPt()) return 'Sua oportunidade de hoje.';
    if (isFr()) return 'C\'est le moment de revenir.';
    if (isDe()) return 'Deine Chance heute.';
    return "Today's opportunity";
  }
  const stage = getEvolutionStage(streak);
  if (isEs()) return ES_IDENTITY_LABELS[stage.key] ?? stage.label;
  if (isPt()) return PT_IDENTITY_LABELS[stage.key] ?? stage.label;
  if (isFr()) return FR_IDENTITY_LABELS[stage.key] ?? stage.label;
  if (isDe()) return DE_IDENTITY_LABELS[stage.key] ?? stage.label;
  return stage.label;
}

// ── Streak badge label (Today screen pill — shown only at streak >= 3) ─────────
export function getStreakBadgeLabel(streak: number): string {
  if (streak <= 0) return '';
  if (isEs()) {
    if (streak <= 2)   return 'Comenzando';
    if (streak === 3)  return 'Impulso';
    if (streak <= 6)   return 'Construyendo';
    if (streak === 7)  return 'Una semana';
    if (streak <= 13)  return 'Creciendo';
    if (streak === 14) return 'Dos semanas';
    if (streak <= 29)  return 'Constante';
    return 'Transformado';
  }
  if (isPt()) {
    if (streak <= 2)   return 'Começando';
    if (streak === 3)  return 'Impulso';
    if (streak <= 6)   return 'Continuando';
    if (streak === 7)  return 'Uma semana';
    if (streak <= 13)  return 'Crescendo';
    if (streak === 14) return 'Duas semanas';
    if (streak <= 29)  return 'Constante';
    return 'Transformé';
  }
  if (isFr()) {
    if (streak <= 2)   return 'Début';
    if (streak === 3)  return 'Élan';
    if (streak <= 6)   return 'En cours';
    if (streak === 7)  return 'Une semaine';
    if (streak <= 13)  return 'En croissance';
    if (streak === 14) return 'Deux semaines';
    if (streak <= 29)  return 'Constance';
    return 'Transformé';
  }
  if (isDe()) {
    if (streak <= 2)   return 'Anfang';
    if (streak === 3)  return 'Schwung';
    if (streak <= 6)   return 'Im Aufbau';
    if (streak === 7)  return 'Eine Woche';
    if (streak <= 13)  return 'Wachsend';
    if (streak === 14) return 'Zwei Wochen';
    if (streak <= 29)  return 'Beständig';
    return 'Verwandelt';
  }
  if (streak <= 2)  return 'Starting';
  if (streak === 3) return 'Momentum';
  if (streak <= 6)  return 'Building';
  if (streak === 7) return 'One week';
  if (streak <= 13) return 'Growing';
  if (streak === 14) return 'Two weeks';
  if (streak <= 29) return 'Consistent';
  return 'Transformed';
}

// ── Streak phrase (Today header, Profile card, Progress hero) ─────────────────
// seed = currentDay rotates phrases daily; omit for static (backward-compatible)
export function getStreakPhrase(streak: number, seed?: number): string {
  const s = seed ?? streak;
  if (isEs()) return _getStreakPhraseEs(streak, s);
  if (isPt()) return _getStreakPhrasePt(streak, s);
  if (isFr()) return _getStreakPhraseFr(streak, s);
  if (isDe()) return _getStreakPhraseDe(streak, s);

  if (streak === 0) return 'The space is still here when you are ready.';
  if (streak === 1) return 'Even small, there was a return today.';
  if (streak === 2) return 'You kept showing up. The space reappeared.';
  if (streak === 3) return 'Returns are beginning to join together.';

  if (streak <= 6) {
    const p = [
      'Small returns add up quietly.',
      'You keep showing up. That is enough.',
      'Small returns build presence.',
      'The foundation is forming with calm.',
    ];
    return p[s % p.length];
  }

  if (streak === 7) return 'The days are starting to connect. Slowly, a rhythm is reappearing.';

  if (streak <= 13) {
    const p = [
      'Returns are beginning to create rhythm.',
      'Small returns joining together, quietly.',
      'Your space is gaining continuity.',
      'The days are beginning to connect.',
    ];
    return p[s % p.length];
  }

  if (streak === 14) return 'Two weeks of presence. Something real is being built here.';

  if (streak <= 20) {
    const p = [
      'You are rebuilding trust with yourself.',
      'The rhythm is holding.',
      'You keep returning. That is the whole practice.',
      'Something real is being built here.',
    ];
    return p[s % p.length];
  }

  if (streak === 21) return 'Three quiet weeks. The pattern is yours.';

  if (streak <= 29) {
    const p = [
      'You are rebuilding trust with yourself.',
      'Coming back is becoming natural.',
      'You kept returning. That counts.',
      'Something worth continuing is here.',
    ];
    return p[s % p.length];
  }

  if (streak === 30) return 'One month. The pattern is yours now.';

  if (streak <= 59) {
    const p = [
      `${streak} days. That is not nothing.`,
      'Consistent. Present. Real.',
      `${streak} days. You kept returning.`,
      'The rhythm is its own quiet thing.',
    ];
    return p[s % p.length];
  }

  if (streak === 60) return 'Two months of daily resets.';

  if (streak <= 89) {
    const p = [
      `${streak} days in. The habit holds.`,
      'Very few people reach this far.',
      `${streak} days. Something is taking shape.`,
      'Grounded. Consistent. Still here.',
    ];
    return p[s % p.length];
  }

  if (streak === 90) return 'Ninety days. What you\'ve built is real.';

  if (streak <= 99) {
    const p = [
      `${streak} days. That is a real thing.`,
      'Consistent. Grounded. Present.',
      `${streak} days without stopping.`,
    ];
    return p[s % p.length];
  }

  if (streak === 100) return 'One hundred days. That speaks for itself.';
  if (streak <= 179)  return `${streak} days without stopping.`;
  if (streak === 180) return 'Half a year. One reset at a time.';
  if (streak <= 364)  return `${streak} days. Still here.`;
  return '365 days. That\'s the whole year.';
}

// ── Spanish streak phrase ─────────────────────────────────────────────────────
function _getStreakPhraseEs(streak: number, s: number): string {
  if (streak === 0) return 'Una acción lo cambia todo.';
  if (streak === 1) return 'Día uno.';
  if (streak === 2) return 'Dos días seguidos. El hábito despierta.';
  if (streak === 3) return 'Tres días. Tu disciplina es real.';
  if (streak <= 6) {
    return [
      `${streak} días eligiéndote.`,
      'La base se está formando.',
      'Te estás convirtiendo en alguien que aparece.',
      `Día ${streak}. Mantén el ritmo.`,
    ][s % 4];
  }
  if (streak === 7) return 'Una semana completa. Apareciste cada día.';
  if (streak <= 13) return [
    `${streak} días. La mayoría ya se detuvo.`,
    'Tu disciplina se está volviendo visible.',
    `${streak} días de mostrarte cuando no era fácil.`,
    'Una semana atrás. Más por delante.',
  ][s % 4];
  if (streak === 14) return 'Dos semanas. Tu mente se está transformando.';
  if (streak <= 20) return [
    `${streak} días mostrándote para ti.`,
    'La consistencia es tu nuevo idioma.',
    `${streak} días. Esto está siendo quien eres.`,
    'Has construido algo que vale la pena proteger.',
  ][s % 4];
  if (streak === 21) return 'Tres semanas. Esto está siendo quien eres.';
  if (streak <= 29) return [
    `${streak} días. La consistencia es tu nueva normalidad.`,
    'Casi un mes. La transformación es real.',
    `${streak} días eligiendo tu futuro.`,
    'Has construido algo que vale la pena proteger.',
  ][s % 4];
  if (streak === 30) return 'Un mes. La persona en quien te estás convirtiendo es real.';
  if (streak <= 59) return [`${streak} días de progreso real.`, 'Enfocado. Consistente. Transformándose.'][s % 2];
  if (streak === 60) return 'Dos meses. Ya no eres la misma persona.';
  if (streak <= 89) return [`${streak} días. La disciplina se convierte en identidad.`, 'Estás en territorio poco común.'][s % 2];
  if (streak === 90) return 'Noventa días. Lo que has construido es real.';
  if (streak === 100) return 'Cien días. Lo que has construido no te puede ser quitado.';
  if (streak <= 179) return `${streak} días de compromiso extraordinario.`;
  if (streak === 180) return 'Medio año apareciendo. Esto es notable.';
  if (streak <= 364) return `${streak} días. Estás construyendo un legado.`;
  return '365 días. Hiciste lo que la mayoría solo sueña.';
}

// ── Portuguese streak phrase ──────────────────────────────────────────────────
function _getStreakPhrasePt(streak: number, s: number): string {
  if (streak === 0) return 'O espaço continua aqui quando você estiver pronta.';
  if (streak === 1) return 'Mesmo pequeno, aconteceu.';
  if (streak === 2) return 'Você seguiu aparecendo. O espaço reapareceu.';
  if (streak === 3) return 'Os retornos começam a se juntar.';
  if (streak <= 6) {
    return [
      'Pequenos retornos somam quietamente.',
      'Você continua aparecendo. Isso é suficiente.',
      'Pequenos retornos constroem presença.',
      'A base está se formando com calma.',
    ][s % 4];
  }
  if (streak === 7) return 'Os dias começam a se conectar. Aos poucos, o ritmo reaparece.';
  if (streak <= 13) {
    return [
      'Os retornos começam a criar ritmo.',
      'Pequenos retornos se juntando, quietamente.',
      'Seu espaço começa a ganhar continuidade.',
      'Os dias começam a se conectar.',
    ][s % 4];
  }
  if (streak === 14) return 'Duas semanas de presença. Algo real está sendo construído aqui.';
  if (streak <= 20) {
    return [
      'Você está reconstruindo confiança em si mesma.',
      'O ritmo está se mantendo.',
      'Você continua voltando. Essa é a prática toda.',
      'Algo real está sendo construído aqui.',
    ][s % 4];
  }
  if (streak === 21) return 'Três semanas quietas. O padrão é seu.';
  if (streak <= 29) {
    return [
      'Você está reconstruindo confiança em si mesma.',
      'Voltar está se tornando natural.',
      'Você continuou voltando. Isso conta.',
      'Algo que vale continuar está aqui.',
    ][s % 4];
  }
  if (streak === 30) return 'Um mês. O padrão é seu agora.';
  if (streak <= 59) {
    return [
      `${streak} dias. Isso não é nada pequeno.`,
      'Constante. Presente. Real.',
      `${streak} dias. Você continuou voltando.`,
      'O ritmo é sua coisa quieta.',
    ][s % 4];
  }
  if (streak === 60) return 'Dois meses de resets diários.';
  if (streak <= 89) {
    return [
      `${streak} dias. O hábito se mantém.`,
      'Muito poucas pessoas chegam tão longe.',
      `${streak} dias. Algo está tomando forma.`,
      'Enraizada. Constante. Ainda aqui.',
    ][s % 4];
  }
  if (streak === 90) return 'Noventa dias. O que você construiu é real.';
  if (streak <= 99) {
    return [
      `${streak} dias. Isso é algo real.`,
      'Constante. Enraizada. Presente.',
      `${streak} dias sem parar.`,
    ][s % 3];
  }
  if (streak === 100) return 'Cem dias. Isso fala por si mesmo.';
  if (streak <= 179) return `${streak} dias sem parar.`;
  if (streak === 180) return 'Meio ano. Um reset de cada vez.';
  if (streak <= 364) return `${streak} dias. Ainda aqui.`;
  return '365 dias. O ano inteiro.';
}

// ── French streak phrase ──────────────────────────────────────────────────────
function _getStreakPhraseFr(streak: number, s: number): string {
  if (streak === 0) return 'L\'espace est encore là quand tu es prêt.';
  if (streak === 1) return 'Même petit, il y a eu un retour aujourd\'hui.';
  if (streak === 2) return 'Tu as continué à te présenter. L\'espace est réapparu.';
  if (streak === 3) return 'Les retours commencent à se rejoindre.';
  if (streak <= 6) {
    return [
      'Les petits retours s\'accumulent doucement.',
      'Tu continues à te présenter. C\'est suffisant.',
      'Les petits retours construisent une présence.',
      'La base se forme tranquillement.',
    ][s % 4];
  }
  if (streak === 7) return 'Les jours commencent à se connecter. Petit à petit, un rythme réapparaît.';
  if (streak <= 13) {
    return [
      'Les retours créent du rythme.',
      'De petits retours qui se rejoignent, doucement.',
      'Ton espace gagne en continuité.',
      'Les jours commencent à se connecter.',
    ][s % 4];
  }
  if (streak === 14) return 'Deux semaines de présence. Quelque chose de réel se construit ici.';
  if (streak <= 20) {
    return [
      'Tu reconstruis confiance en toi.',
      'Le rythme se maintient.',
      'Tu continues à revenir. C\'est toute la pratique.',
      'Quelque chose de réel se construit ici.',
    ][s % 4];
  }
  if (streak === 21) return 'Trois semaines tranquilles. Ce rythme t\'appartient.';
  if (streak <= 29) {
    return [
      'Tu reconstruis confiance en toi.',
      'Revenir devient naturel.',
      'Tu as continué à revenir. Ça compte.',
      'Quelque chose qui vaut la peine de continuer est là.',
    ][s % 4];
  }
  if (streak === 30) return 'Un mois. Ce rythme t\'appartient maintenant.';
  if (streak <= 59) {
    return [
      `${streak} jours. Ce n\'est pas rien.`,
      'Constant. Présent. Réel.',
      `${streak} jours. Tu as continué à revenir.`,
      'Le rythme est quelque chose de tranquille qui t\'appartient.',
    ][s % 4];
  }
  if (streak === 60) return 'Deux mois de resets quotidiens.';
  if (streak <= 89) {
    return [
      `${streak} jours. L\'habitude tient.`,
      'Très peu de gens arrivent jusqu\'ici.',
      `${streak} jours. Quelque chose prend forme.`,
      'Ancré. Constant. Encore là.',
    ][s % 4];
  }
  if (streak === 90) return 'Quatre-vingt-dix jours. Ce que tu as construit est réel.';
  if (streak <= 99) {
    return [
      `${streak} jours. C\'est quelque chose de réel.`,
      'Constant. Ancré. Présent.',
      `${streak} jours sans s\'arrêter.`,
    ][s % 3];
  }
  if (streak === 100) return 'Cent jours. Ça parle de lui-même.';
  if (streak <= 179) return `${streak} jours sans s\'arrêter.`;
  if (streak === 180) return 'Un demi-an. Un reset à la fois.';
  if (streak <= 364) return `${streak} jours. Encore là.`;
  return '365 jours. Toute une année.';
}

// ── German streak phrase ──────────────────────────────────────────────────────
function _getStreakPhraseDe(streak: number, s: number): string {
  if (streak === 0) return 'Der Raum ist noch hier, wenn du bereit bist.';
  if (streak === 1) return 'Auch klein — heute gab es eine Rückkehr.';
  if (streak === 2) return 'Du bist weiter erschienen. Der Raum ist zurückgekehrt.';
  if (streak === 3) return 'Rückkehren beginnt sich zu verbinden.';
  if (streak <= 6) {
    return [
      'Kleine Rückkehren summieren sich still.',
      'Du erscheinst weiter. Das reicht.',
      'Kleine Rückkehren bauen Präsenz auf.',
      'Die Grundlage formt sich ruhig.',
    ][s % 4];
  }
  if (streak === 7) return 'Die Tage beginnen sich zu verbinden. Langsam erscheint ein Rhythmus wieder.';
  if (streak <= 13) {
    return [
      'Rückkehren schafft Rhythmus.',
      'Kleine Rückkehren verbinden sich, still.',
      'Dein Raum gewinnt Kontinuität.',
      'Die Tage beginnen sich zu verbinden.',
    ][s % 4];
  }
  if (streak === 14) return 'Zwei Wochen Präsenz. Hier wird etwas Echtes aufgebaut.';
  if (streak <= 20) {
    return [
      'Du baust wieder Vertrauen in dich auf.',
      'Der Rhythmus hält.',
      'Du kehrst weiter zurück. Das ist die ganze Praxis.',
      'Hier wird etwas Echtes aufgebaut.',
    ][s % 4];
  }
  if (streak === 21) return 'Drei stille Wochen. Das Muster gehört dir.';
  if (streak <= 29) {
    return [
      'Du baust wieder Vertrauen in dich auf.',
      'Zurückkehren wird natürlich.',
      'Du bist weiter zurückgekehrt. Das zählt.',
      'Hier ist etwas, das es wert ist weiterzumachen.',
    ][s % 4];
  }
  if (streak === 30) return 'Ein Monat. Das Muster gehört dir jetzt.';
  if (streak <= 59) {
    return [
      `${streak} Tage. Das ist nicht nichts.`,
      'Beständig. Präsent. Echt.',
      `${streak} Tage. Du bist weiter zurückgekehrt.`,
      'Der Rhythmus ist deine stille Sache.',
    ][s % 4];
  }
  if (streak === 60) return 'Zwei Monate täglicher Resets.';
  if (streak <= 89) {
    return [
      `${streak} Tage dabei. Die Gewohnheit hält.`,
      'Nur wenige Menschen kommen so weit.',
      `${streak} Tage. Etwas nimmt Form an.`,
      'Geerdet. Beständig. Immer noch hier.',
    ][s % 4];
  }
  if (streak === 90) return 'Neunzig Tage. Was du aufgebaut hast, ist echt.';
  if (streak <= 99) {
    return [
      `${streak} Tage. Das ist etwas Echtes.`,
      'Beständig. Geerdet. Präsent.',
      `${streak} Tage ohne Unterbrechung.`,
    ][s % 3];
  }
  if (streak === 100) return 'Hundert Tage. Das spricht für sich selbst.';
  if (streak <= 179) return `${streak} Tage ohne Unterbrechung.`;
  if (streak === 180) return 'Halbes Jahr. Ein Reset nach dem anderen.';
  if (streak <= 364) return `${streak} Tage. Immer noch hier.`;
  return '365 Tage. Das ganze Jahr.';
}

// ── Completion card message ───────────────────────────────────────────────────
export function getCompletionMessage(streak: number, currentDay: number): {
  title: string; sub: string; badge: string;
} {
  const d = isEs() ? `Día ${currentDay} ✓`
    : isPt() ? `Dia ${currentDay} ✓`
    : isFr() ? `Jour ${currentDay} ✓`
    : isDe() ? `Tag ${currentDay} ✓`
    : `Day ${currentDay} ✓`;
  if (isEs()) {
    if (streak === 1 && currentDay === 1) return { title: 'Hoy regresaste a ti mismo.', sub: 'Un comienzo tranquilo siempre importa.', badge: 'Día 1 ✓' };
    if (streak <= 3) return { title: 'Reset completado.', sub: 'Hoy estuviste ahí para ti.', badge: d };
    if (streak <= 6) return { title: 'Reset completado.', sub: `${streak} días seguidos. Estás construyendo algo real.`, badge: d };
    if (streak === 7) return { title: 'Una semana completa.', sub: 'Siete días eligiéndote.', badge: d };
    if (streak <= 13) return { title: 'Reset completado.', sub: `${streak} días. Algo tranquilo se vuelve visible.`, badge: d };
    if (streak === 14) return { title: 'Dos semanas.', sub: 'Lo que construyes permanece.', badge: d };
    if (streak <= 20) return { title: 'Reset completado.', sub: `${streak} días de progreso real.`, badge: d };
    if (streak === 21) return { title: 'Tres semanas.', sub: 'Esto ya forma parte de quien eres.', badge: d };
    if (streak <= 29) return { title: 'Reset completado.', sub: 'La consistencia es tu nuevo estándar.', badge: d };
    if (streak === 30) return { title: 'Un mes.', sub: 'La persona en quien te estás convirtiendo es real.', badge: d };
    if (streak <= 59) return { title: 'Reset completado.', sub: 'Constante. Presente. Real.', badge: d };
    if (streak === 60) return { title: 'Dos meses.', sub: 'Ya no eres la misma persona.', badge: d };
    if (streak <= 89) return { title: 'Reset completado.', sub: `${streak} días de compromiso con tu identidad.`, badge: d };
    if (streak === 90) return { title: 'Noventa días.', sub: 'Lo que has construido es real.', badge: d };
    return { title: 'Reset completado.', sub: `${streak} días de compromiso extraordinario.`, badge: d };
  }
  if (isPt()) {
    if (streak === 1 && currentDay === 1) return { title: 'Você voltou para si hoje.', sub: 'Um começo tranquilo ainda importa.', badge: 'Dia 1 ✓' };
    if (streak <= 3) return { title: 'Você apareceu hoje.', sub: 'Você fez espaço para isso hoje.', badge: d };
    if (streak <= 6) return { title: 'Você apareceu hoje.', sub: `${streak} retornos quietos. Algo está se formando.`, badge: d };
    if (streak === 7) return { title: 'Uma semana inteira.', sub: 'Sete dias. O ritmo está começando.', badge: d };
    if (streak === 14) return { title: 'Duas semanas.', sub: 'Quatorze dias. Algo quieto está se construindo.', badge: d };
    if (streak === 21) return { title: 'Três semanas.', sub: 'O padrão está se mantendo.', badge: d };
    if (streak === 30) return { title: 'Um mês.', sub: 'Trinta dias. Um reset de cada vez.', badge: d };
    if (streak === 60) return { title: 'Dois meses.', sub: 'Pequenos passos somam. Sessenta deles.', badge: d };
    if (streak === 90) return { title: 'Noventa dias.', sub: 'Você voltou, de novo e de novo. Isso é real.', badge: d };
    if (streak === 100) return { title: '100 dias.', sub: 'Cem resets. Isso fala por si mesmo.', badge: d };
    if (streak === 180) return { title: 'Meio ano.', sub: 'Seis meses. Um reset de cada vez.', badge: d };
    if (streak >= 365) return { title: '365 dias.', sub: 'Um ano inteiro voltando. Isso é algo real.', badge: d };
    if (streak % 10 === 0) return { title: `${streak} dias.`, sub: 'Cada dia que você apareceu é um dia que você escolheu seu futuro.', badge: d };
    return { title: 'Você apareceu hoje.', sub: `${streak} dias escolhendo você mesma.`, badge: d };
  }
  if (isFr()) {
    if (streak === 1 && currentDay === 1) return { title: 'Tu es revenu à toi aujourd\'hui.', sub: 'Un début calme compte aussi.', badge: 'Jour 1 ✓' };
    if (streak <= 3) return { title: 'Tu t\'es présenté aujourd\'hui.', sub: 'Tu as fait de la place pour ça.', badge: d };
    if (streak <= 6) return { title: 'Tu t\'es présenté aujourd\'hui.', sub: `${streak} retours tranquilles. Quelque chose se forme.`, badge: d };
    if (streak === 7) return { title: 'Une semaine complète.', sub: 'Sept jours. Le rythme commence.', badge: d };
    if (streak === 14) return { title: 'Deux semaines.', sub: 'Quatorze jours. Quelque chose de tranquille se construit.', badge: d };
    if (streak === 21) return { title: 'Trois semaines.', sub: 'Le rythme se maintient.', badge: d };
    if (streak === 30) return { title: 'Un mois.', sub: 'Trente jours. Un reset à la fois.', badge: d };
    if (streak === 60) return { title: 'Deux mois.', sub: 'Les petits pas s\'accumulent. Soixante d\'entre eux.', badge: d };
    if (streak === 90) return { title: 'Quatre-vingt-dix jours.', sub: 'Tu es revenu, encore et encore. C\'est réel.', badge: d };
    if (streak === 100) return { title: '100 jours.', sub: 'Cent resets. Ça parle de lui-même.', badge: d };
    if (streak === 180) return { title: 'Un demi-an.', sub: 'Six mois. Un reset à la fois.', badge: d };
    if (streak >= 365) return { title: '365 jours.', sub: 'Une année entière à revenir. C\'est quelque chose de réel.', badge: d };
    if (streak % 10 === 0) return { title: `${streak} jours.`, sub: 'Chaque jour où tu t\'es présenté est un jour où tu as choisi ton avenir.', badge: d };
    return { title: 'Reset terminé.', sub: `${streak} jours à te choisir. Continue.`, badge: d };
  }
  if (isDe()) {
    if (streak === 1 && currentDay === 1) return { title: 'Du bist heute zu dir zurückgekehrt.', sub: 'Ein stiller Anfang zählt auch.', badge: 'Tag 1 ✓' };
    if (streak <= 3) return { title: 'Du bist heute erschienen.', sub: 'Du hast heute Raum dafür gemacht.', badge: d };
    if (streak <= 6) return { title: 'Du bist heute erschienen.', sub: `${streak} stille Rückkehren. Etwas formt sich.`, badge: d };
    if (streak === 7) return { title: 'Eine ganze Woche.', sub: 'Sieben Tage. Der Rhythmus beginnt.', badge: d };
    if (streak === 14) return { title: 'Zwei Wochen.', sub: 'Vierzehn Tage. Etwas Stilles baut sich auf.', badge: d };
    if (streak === 21) return { title: 'Drei Wochen.', sub: 'Das Muster hält.', badge: d };
    if (streak === 30) return { title: 'Ein Monat.', sub: 'Dreißig Tage. Ein Reset nach dem anderen.', badge: d };
    if (streak === 60) return { title: 'Zwei Monate.', sub: 'Kleine Schritte summieren sich. Sechzig davon.', badge: d };
    if (streak === 90) return { title: 'Neunzig Tage.', sub: 'Du bist zurückgekehrt, immer wieder. Das ist echt.', badge: d };
    if (streak === 100) return { title: '100 Tage.', sub: 'Hundert Resets. Das spricht für sich selbst.', badge: d };
    if (streak === 180) return { title: 'Ein halbes Jahr.', sub: 'Sechs Monate. Ein Reset nach dem anderen.', badge: d };
    if (streak >= 365) return { title: '365 Tage.', sub: 'Ein ganzes Jahr zurückzukehren. Das ist etwas Echtes.', badge: d };
    if (streak % 10 === 0) return { title: `${streak} Tage.`, sub: 'Jeder Tag, an dem du erschienen bist, ist ein Tag, an dem du deine Zukunft gewählt hast.', badge: d };
    return { title: 'Reset abgeschlossen.', sub: `${streak} Tage, an denen du dich gewählt hast.`, badge: d };
  }
  if (streak === 1 && currentDay === 1) return {
    title: 'You came back to yourself today.',
    sub: 'A quiet beginning still matters.',
    badge: 'Day 1 ✓',
  };
  if (streak <= 3) return {
    title: 'Reset completed.',
    sub: 'You made space for it today.',
    badge: `Day ${currentDay} ✓`,
  };
  if (streak <= 6) return {
    title: 'Reset completed.',
    sub: `${streak} quiet returns. Something is forming.`,
    badge: `Day ${currentDay} ✓`,
  };
  if (streak === 7) return {
    title: 'One full week.',
    sub: 'Seven days. The rhythm is starting.',
    badge: '7-Day Streak ✦',
  };
  if (streak === 14) return {
    title: 'Two weeks.',
    sub: 'Fourteen days. Something quiet is building.',
    badge: '2-Week Streak ✦',
  };
  if (streak === 21) return {
    title: 'Three weeks.',
    sub: 'The pattern is holding.',
    badge: '21 Days ✦',
  };
  if (streak === 30) return {
    title: 'One month.',
    sub: 'Thirty days. One reset at a time.',
    badge: '30-Day Streak ✦',
  };
  if (streak === 60) return {
    title: 'Two months.',
    sub: 'Small steps add up. Sixty days of them.',
    badge: '60-Day Streak ✦',
  };
  if (streak === 90) return {
    title: 'Ninety days.',
    sub: 'You returned, again and again. That is real.',
    badge: '90-Day Streak ✦',
  };
  if (streak === 100) return {
    title: '100 days.',
    sub: 'One hundred resets. That speaks for itself.',
    badge: '100 Days ✦',
  };
  if (streak === 180) return {
    title: 'Half a year.',
    sub: 'Six months. One reset at a time.',
    badge: '180 Days ✦',
  };
  if (streak >= 365) return {
    title: '365 days.',
    sub: 'A full year of coming back. That\'s something real.',
    badge: '365 Days ✦',
  };
  if (streak % 10 === 0) return {
    title: `${streak} days.`,
    sub: 'Every day you showed up is a day you chose your future.',
    badge: `${streak}-Day Streak ✦`,
  };
  return {
    title: 'Reset completed.',
    sub: `${streak} days of choosing yourself. Keep going.`,
    badge: `Day ${currentDay} ✓`,
  };
}

// ── Recovery message (after broken streak) ────────────────────────────────────
export function getRecoveryMessage(previousStreak: number): string {
  if (isEs()) {
    if (previousStreak === 0) return 'Un paso adelante.';
    if (previousStreak <= 7)  return 'De vuelta. Eso es lo que importa.';
    if (previousStreak <= 30) return 'Un día perdido no borra tu progreso.';
    return `Tuviste ${previousStreak} días. Ese impulso sigue dentro de ti. Empieza de nuevo.`;
  }
  if (isFr()) {
    if (previousStreak === 0) return 'Un pas en avant.';
    if (previousStreak <= 7)  return 'De retour. C\'est ce qui compte.';
    if (previousStreak <= 30) return 'Un jour manqué n\'efface pas ton progrès.';
    return `Tu avais ${previousStreak} jours. Cet élan est encore là. Recommence.`;
  }
  if (isDe()) {
    if (previousStreak === 0) return 'Ein Schritt vorwärts.';
    if (previousStreak <= 7)  return 'Zurück. Das ist es, was zählt.';
    if (previousStreak <= 30) return 'Ein verpasster Tag löscht deinen Fortschritt nicht.';
    return `Du hattest ${previousStreak} Tage. Dieser Schwung steckt noch in dir. Fang neu an.`;
  }
  if (previousStreak === 0) return 'One step forward.';
  if (previousStreak <= 7)  return 'Back. That\'s what matters.';
  if (previousStreak <= 30) return 'One missed day doesn\'t erase your progress.';
  return `You had ${previousStreak} days. That momentum is still inside you. Begin again.`;
}

// ── Daily sub-headline (stage-aware, rotates with currentDay) ─────────────────
export function getDailySubheadline(streak: number, currentDay: number): string {
  const es = isEs();
  if (streak === 0 && currentDay > 1) {
    if (es) return 'Cada día que vuelves es una victoria.';
    if (isFr()) return 'Chaque jour où tu reviens est une victoire.';
    if (isDe()) return 'Jeder Tag, an dem du zurückkommst, ist ein Sieg.';
    return 'Every day you come back is a victory.';
  }

  const { key } = getEvolutionStage(streak);

  if (isDe()) {
    const deLines: Record<string, string[]> = {
      starting:    ['Eine Aktion heute kann deinen Tag verändern.', 'Es beginnt damit, zu erscheinen.', 'Der schwerste Schritt ist immer der erste.'],
      stabilizing: ['Schwung baut sich still auf.', 'Du beweist dir selbst etwas.', 'Etwas Stilles wird sichtbar.'],
      rebuilding:  ['Beständigkeit ist deine Stärke.', 'Du bist nicht mehr dieselbe Person wie letzte Woche.', 'So sieht Engagement aus.'],
      consistent:  ['Du baust etwas, das nicht rückgängig gemacht werden kann.', 'Beständigkeit wird Identität.', 'Zwei Wochen dabei. Die Veränderung ist echt.'],
      focused:     ['So sieht echte Transformation aus.', 'Fokus potenziert sich. Du bist der Beweis.', 'Was du heute tust, formt, wer du wirst.'],
      disciplined: ['Du bist nicht mehr dieselbe Person.', 'Beständigkeit ist deine Identität geworden.', 'Sechzig Tage, an denen du dich gewählt hast.'],
      unstoppable: ['Du hast dir bewiesen, dass du schwierige Dinge tun kannst.', 'Das ist Identität, keine Gewohnheit.', 'Du bist, was du wiederholt tust.'],
    };
    const pool = deLines[key] ?? deLines.starting;
    return pool[currentDay % pool.length];
  }

  if (isFr()) {
    const frLines: Record<string, string[]> = {
      starting:    ['Une action aujourd\'hui peut changer ta journée.', 'Tout commence par se présenter.', 'Le pas le plus difficile est toujours le premier.'],
      stabilizing: ['L\'élan se construit tranquillement.', 'Tu te prouves quelque chose.', 'Quelque chose de calme devient visible.'],
      rebuilding:  ['La constance est ta force.', 'Tu n\'es plus la même personne qu\'hier.', 'C\'est à ça que ressemble l\'engagement.'],
      consistent:  ['Tu construis quelque chose qui ne peut pas être défait.', 'La constance devient identité.', 'Deux semaines. Le changement est réel.'],
      focused:     ['C\'est à ça que ressemble une vraie transformation.', 'Le focus s\'accumule. Tu en es la preuve.', 'Ce que tu fais aujourd\'hui façonne qui tu deviens.'],
      disciplined: ['Tu n\'es plus la même personne qu\'avant.', 'La constance est devenue ton identité.', 'Soixante jours à te choisir.'],
      unstoppable: ['Tu t\'es prouvé que tu peux faire des choses difficiles.', 'C\'est de l\'identité, pas juste une habitude.', 'Tu es ce que tu fais de façon répétée.'],
    };
    const pool = frLines[key] ?? frLines.starting;
    return pool[currentDay % pool.length];
  }

  if (es) {
    const esLines: Record<string, string[]> = {
      starting:    ['Una acción hoy puede cambiar tu día.', 'Comienza con aparecer.', 'El paso más difícil siempre es el primero.'],
      stabilizing: ['El impulso se está formando en silencio.', 'Te estás demostrando algo.', 'Algo tranquilo se está volviendo visible.'],
      rebuilding:  ['La constancia es tu superpoder.', 'No eres la misma persona de la semana pasada.', 'Así es como se ve el compromiso.'],
      consistent:  ['Estás construyendo algo que no puede deshacerse.', 'La constancia se está convirtiendo en identidad.', 'Dos semanas. El cambio es real.'],
      focused:     ['Así es como se ve la transformación real.', 'El enfoque se acumula. Tú eres la prueba.', 'Lo que haces hoy da forma a quien te conviertes.'],
      disciplined: ['Ya no eres la misma persona.', 'La constancia se ha convertido en tu identidad.', 'Sesenta días eligiéndote.'],
      unstoppable: ['Te has demostrado que puedes hacer cosas difíciles.', 'Esto es identidad, no hábito.', 'Eres lo que haces repetidamente.'],
    };
    const pool = esLines[key] ?? esLines.starting;
    return pool[currentDay % pool.length];
  }

  const lines: Record<string, string[]> = {
    starting:    ['One action today can change your day.', 'It begins with showing up.', 'The hardest step is always the first.'],
    stabilizing: ['Momentum is quietly building.', 'You are proving something to yourself.', 'Something quiet is becoming visible.'],
    rebuilding:  ['Consistency is your superpower.', 'You are not the same person as last week.', 'This is what commitment looks like.'],
    consistent:  ['You\'re building something that cannot be undone.', 'Consistency is becoming identity.', 'Two weeks in. The shift is real.'],
    focused:     ['This is what real transformation looks like.', 'Focus compounds. You are proof.', 'What you do today shapes who you become.'],
    disciplined: ['You are not the same person you were.', 'Consistency has become your identity.', 'Sixty days of choosing yourself.'],
    unstoppable: ['You\'ve proven to yourself that you can do hard things.', 'This is identity, not habit.', 'You are what you repeatedly do.'],
  };
  const pool = lines[key] ?? lines.starting;
  return pool[currentDay % pool.length];
}

// ── Milestone message (proximity-aware, delegates to engine) ──────────────────
export function getMilestoneMessage(streak: number): string | null {
  return getDynamicMilestoneMessage(streak);
}

// ── Streak visual tier ────────────────────────────────────────────────────────
export type StreakTier = 'starting' | 'building' | 'consistent' | 'committed' | 'elite';

export function getStreakTier(streak: number): StreakTier {
  if (streak <= 2)  return 'starting';
  if (streak <= 13) return 'building';
  if (streak <= 29) return 'consistent';
  if (streak <= 89) return 'committed';
  return 'elite';
}

// ─── Tomorrow Anticipation System ────────────────────────────────────────────
export type DailyCategory = 'focus' | 'discipline' | 'confidence' | 'productivity' | 'emotional' | 'detox';

const categoryThemeEn: Record<DailyCategory, string> = {
  focus:       'Sharpening your attention.',
  discipline:  'Building steadiness.',
  confidence:  'Returning to yourself.',
  productivity:'Creating clarity.',
  emotional:   'Processing what matters.',
  detox:       'Reclaiming your stillness.',
};

const categoryThemeEs: Record<DailyCategory, string> = {
  focus:       'Agudizando tu atención.',
  discipline:  'Construyendo tu resiliencia.',
  confidence:  'Fortaleciendo tu voz.',
  productivity:'Creando impulso.',
  emotional:   'Procesando lo que importa.',
  detox:       'Recuperando tu silencio interior.',
};

export const categoryTheme: Record<DailyCategory, string> = categoryThemeEn;

const categoryThemeFr: Record<DailyCategory, string> = {
  focus:       'Affiner ton attention.',
  discipline:  'Construire ta stabilité.',
  confidence:  'Revenir à toi-même.',
  productivity:'Créer de la clarté.',
  emotional:   'Accueillir ce qui compte.',
  detox:       'Retrouver ton silence intérieur.',
};

const categoryThemeDe: Record<DailyCategory, string> = {
  focus:       'Deine Aufmerksamkeit schärfen.',
  discipline:  'Deine Stabilität aufbauen.',
  confidence:  'Zu dir selbst zurückkehren.',
  productivity:'Klarheit schaffen.',
  emotional:   'Was zählt, willkommen heißen.',
  detox:       'Deine innere Stille zurückgewinnen.',
};

const categoryThemePt: Record<DailyCategory, string> = {
  focus:       'Afiando sua atenção.',
  discipline:  'Construindo estabilidade.',
  confidence:  'Voltando para si mesma.',
  productivity:'Criando clareza.',
  emotional:   'Acolhendo o que importa.',
  detox:       'Reconquistando seu silêncio interior.',
};

export function getCategoryTheme(cat: DailyCategory): string {
  return (isEs() ? categoryThemeEs : isFr() ? categoryThemeFr : isDe() ? categoryThemeDe : categoryThemeEn)[cat];
}

export const categoryTeaser: Record<DailyCategory, string> = {
  focus:       'A reset for your clarity and precision.',
  discipline:  'A reset for your rhythm and steadiness.',
  confidence:  'A reset for your self-trust and presence.',
  productivity:'A reset for your flow and clarity.',
  emotional:   'A reset for your inner balance.',
  detox:       'A reset for your mental space.',
};

export function getTomorrowAnticipateCopy(
  streak: number,
  nextMilestone: number | null,
  daysToNext: number | null,
  category: DailyCategory,
  emotionalState?: EmotionalState
): { headline: string; sub: string; continuityCopy: string } {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();

  const theme = es ? categoryThemeEs[category]
    : pt ? categoryThemePt[category]
    : fr ? categoryThemeFr[category]
    : de ? categoryThemeDe[category]
    : categoryTeaser[category];

  const headline = pt
    ? (streak === 0 ? 'Amanhã é o Dia 1.'
      : streak === 1 ? 'Amanhã, o Dia 2 continua.'
      : `O Dia ${streak + 1} chega amanhã.`)
    : es
    ? (streak === 0 ? 'Mañana es el Día 1.'
      : streak === 1 ? 'Mañana, el Día 2 continúa.'
      : `El Día ${streak + 1} llega mañana.`)
    : fr
    ? (streak === 0 ? 'Demain est le Jour 1.'
      : streak === 1 ? 'Demain, le Jour 2 commence.'
      : `Le Jour ${streak + 1} arrive demain.`)
    : de
    ? (streak === 0 ? 'Morgen ist Tag 1.'
      : streak === 1 ? 'Morgen geht Tag 2 weiter.'
      : `Tag ${streak + 1} kommt morgen.`)
    : (streak === 0 ? 'Tomorrow is Day 1.'
      : streak === 1 ? 'Tomorrow, Day 2 continues.'
      : `Day ${streak + 1} arrives tomorrow.`);

  const sub = theme;

  let continuityCopy: string;

  if (emotionalState === 'returning') {
    continuityCopy = pt ? 'Amanhã estará aqui quando você puder.' : es ? 'Mañana estará aquí cuando puedas.' : fr ? 'Demain sera là quand le moment sera juste.' : de ? 'Morgen ist da, wenn du bereit bist.' : "Tomorrow is there when you're ready.";
  } else if (nextMilestone !== null && daysToNext !== null && daysToNext === 1) {
    continuityCopy = pt ? 'Amanhã é mais um retorno.' : es ? 'Mañana es un regreso más.' : fr ? 'Demain est un retour de plus.' : de ? 'Morgen ist noch eine Rückkehr.' : 'Tomorrow is one more quiet return.';
  } else if (nextMilestone !== null && daysToNext !== null && daysToNext <= 3) {
    continuityCopy = pt ? 'Um ritmo está se formando quietamente.' : es ? 'Un ritmo se está formando suavemente.' : fr ? 'Un rythme se forme doucement.' : de ? 'Ein Rhythmus formt sich still.' : 'A rhythm is quietly forming.';
  } else if (emotionalState === 'momentum') {
    continuityCopy = pt ? 'O ritmo é seu para continuar.' : es ? 'El ritmo es tuyo para continuar.' : fr ? 'Le rythme est à toi pour continuer.' : de ? 'Der Rhythmus gehört dir zum Weitermachen.' : 'The rhythm is yours to continue.';
  } else if (streak === 0) {
    continuityCopy = pt ? 'Amanhã estará aqui quando você puder.' : es ? 'Mañana estará aquí cuando puedas.' : fr ? 'Demain sera là quand le moment sera juste.' : de ? 'Morgen ist da, wenn du bereit bist.' : "Tomorrow is there when you're ready.";
  } else if (streak < 7) {
    continuityCopy = pt ? 'Amanhã é mais um momento tranquilo.' : es ? 'Mañana es otro momento tranquilo.' : fr ? 'Demain est un autre moment calme.' : de ? 'Morgen ist ein weiterer stiller Moment.' : 'Tomorrow is another quiet moment.';
  } else {
    continuityCopy = pt ? 'Volte quando puder.' : es ? 'Regresa cuando puedas.' : fr ? 'Reviens quand le moment sera juste.' : de ? 'Komm zurück, wenn du bereit bist.' : "Come back when you're ready.";
  }

  return { headline, sub, continuityCopy };
}

export function getStreakContinuityMessage(streak: number, nextMilestone: number | null, daysToNext: number | null): string {
  if (streak === 0) return 'Tomorrow is there when you\'re ready.';
  if (nextMilestone && daysToNext === 1) return 'Tomorrow is one more quiet return.';
  if (nextMilestone && daysToNext && daysToNext <= 3) return 'A rhythm is quietly forming.';
  if (streak === 1) return 'Come back tomorrow. The rhythm is starting.';
  if (streak === 6) return 'Tomorrow is Day 7.';
  if (streak === 13) return 'Tomorrow is Day 14.';
  if (streak === 20) return 'Tomorrow is Day 21.';
  if (streak === 29) return 'Tomorrow is Day 30. One full month. This is history.';
  return `${streak} days in. Tomorrow makes ${streak + 1}.`;
}

// ── Dynamic headline (replaces static "Take back control of your life.") ─────
const dynamicHeadlines: Record<EmotionalState, string[]> = {
  beginner: [
    'Begin again\nfrom here.',
    'One reset.\nOne day at a time.',
    'This space\nis here for you.',
  ],
  returning: [
    'You came back.\nThat matters.',
    'Every return is\na choice.',
    'Starting again is\nnot starting over.',
  ],
  building: [
    'Still here.\nStill moving.',
    'Quiet progress is still progress.',
    'Small steps.\nThey add up.',
  ],
  struggling: [
    'Every day you return\nis enough.',
    'Progress is not\nlinear. That is okay.',
    'Come back.\nThat\'s all it takes.',
  ],
  momentum: [
    'You\'re still here.\nThat means something.',
    'Something is\nsettling in you.',
    'This space\nis holding you.',
  ],
};

const dynamicHeadlinesEs: Record<EmotionalState, string[]> = {
  beginner: [
    'Empieza de nuevo\ndesde aquí.',
    'Un regreso.\nUn día a la vez.',
    'Este espacio\nestá aquí para ti.',
  ],
  returning: [
    'Volviste.\nEso importa.',
    'Cada regreso es\nuna elección.',
    'Volver a empezar no\nes empezar de cero.',
  ],
  building: [
    'Todavía aquí.\nTodavía en movimiento.',
    'El progreso silencioso\nsigue siendo progreso.',
    'Pequeños pasos.\nSe van sumando.',
  ],
  struggling: [
    'Cada día que regresas\nya es suficiente.',
    'El progreso no es\nlineal. Está bien.',
    'Regresa.\nEso es todo lo que se necesita.',
  ],
  momentum: [
    'Todavía estás aquí.\nEso dice algo.',
    'Algo se está\nasentando en ti.',
    'Este espacio\nte está sosteniendo.',
  ],
};

const dynamicHeadlinesPt: Record<EmotionalState, string[]> = {
  beginner: [
    'Recomece\ndaqui.',
    'Um reset.\nUm dia de cada vez.',
    'Esse espaço\nestá aqui para você.',
  ],
  returning: [
    'Você voltou.\nIsso importa.',
    'Todo retorno é\numa escolha.',
    'Recomeçar não é\ncomeçar do zero.',
  ],
  building: [
    'Ainda aqui.\nAinda em movimento.',
    'Mesmo um progresso silencioso ainda é progresso.',
    'Pequenos passos.\nEles vão somando.',
  ],
  struggling: [
    'Todo dia que você volta\njá é suficiente.',
    'O progresso não é\nlinear. Tudo bem.',
    'Volte.\nÉ tudo que precisa.',
  ],
  momentum: [
    'Você ainda está aqui.\nIsso diz algo.',
    'Algo está se\nassentando em você.',
    'Esse espaço\nestá te sustentando.',
  ],
};

const dynamicHeadlinesFr: Record<EmotionalState, string[]> = {
  beginner: [
    'Recommence\nd\'ici.',
    'Un souffle.\nUn jour à la fois.',
    'Cet espace\nest là pour toi.',
  ],
  returning: [
    'Tu es revenu.\nÇa compte.',
    'Chaque retour est\nun choix.',
    'Recommencer n\'est pas\nrepartir de zéro.',
  ],
  building: [
    'Encore là.\nEncore en mouvement.',
    'Un progrès silencieux reste du progrès.',
    'Petits pas.\nIls s\'accumulent.',
  ],
  struggling: [
    'Chaque jour où tu reviens,\nc\'est suffisant.',
    'Le progrès n\'est pas\nlinéaire. C\'est normal.',
    'Reviens.\nC\'est tout ce qu\'il faut.',
  ],
  momentum: [
    'Tu es encore là.\nÇa veut dire quelque chose.',
    'Quelque chose\ns\'installe en toi.',
    'Cet espace\nte porte.',
  ],
};

const dynamicHeadlinesDe: Record<EmotionalState, string[]> = {
  beginner: [
    'Neu beginnen\nvon hier aus.',
    'Ein Reset.\nEinen Tag nach dem anderen.',
    'Dieser Raum\nist für dich da.',
  ],
  returning: [
    'Du bist zurückgekehrt.\nDas zählt.',
    'Jede Rückkehr ist\neine Wahl.',
    'Neu anzufangen ist\nnicht von vorne anfangen.',
  ],
  building: [
    'Immer noch hier.\nImmer noch in Bewegung.',
    'Stiller Fortschritt ist immer noch Fortschritt.',
    'Kleine Schritte.\nSie summieren sich.',
  ],
  struggling: [
    'Jeder Tag, an dem du zurückkommst,\nist genug.',
    'Fortschritt ist nicht\nlinear. Das ist in Ordnung.',
    'Komm zurück.\nDas ist alles, was es braucht.',
  ],
  momentum: [
    'Du bist noch hier.\nDas bedeutet etwas.',
    'Etwas setzt sich\nin dir fest.',
    'Dieser Raum\nträgt dich.',
  ],
};

export function getDynamicHeadline(emotionalState: EmotionalState, seed: number): string {
  const pool = isEs() ? dynamicHeadlinesEs[emotionalState]
    : isPt() ? dynamicHeadlinesPt[emotionalState]
    : isFr() ? dynamicHeadlinesFr[emotionalState]
    : isDe() ? dynamicHeadlinesDe[emotionalState]
    : dynamicHeadlines[emotionalState];
  return pool[seed % pool.length];
}

// ── Pre-completion context banner ─────────────────────────────────────────────
export function getPreCompletionBanner(
  emotionalState: EmotionalState,
  streak: number,
  weeklyScore: number
): string | null {
  const es = isEs();
  const fr = isFr();
  const de = isDe();
  if (emotionalState === 'returning') return es ? 'Volviste. Eso es lo que importa.' : fr ? 'Tu es revenu. C\'est ce qui compte.' : de ? 'Du bist zurückgekehrt. Das ist es, was zählt.' : 'You came back. That is what matters.';
  if (emotionalState === 'struggling' && weeklyScore === 0) return es ? 'Nueva semana. Nuevo comienzo.' : fr ? 'Nouvelle semaine. Nouveau départ.' : de ? 'Neue Woche. Neuer Anfang.' : 'A new week. A fresh start.';
  if (emotionalState === 'momentum' && weeklyScore >= 5) return null;
  if (streak === 6) return es ? 'Mañana completas tu primera semana completa.' : fr ? 'Demain complète ta première semaine entière.' : de ? 'Morgen schließt du deine erste volle Woche ab.' : 'Tomorrow completes your first full week.';
  if (streak === 13) return es ? 'Mañana son dos semanas completas.' : fr ? 'Demain, ce sont deux semaines complètes.' : de ? 'Morgen sind es zwei volle Wochen.' : 'Tomorrow is two full weeks.';
  if (streak === 29) return es ? 'Mañana marca un mes completo.' : fr ? 'Demain marque un mois complet.' : de ? 'Morgen markiert einen vollen Monat.' : 'Tomorrow marks one full month.';
  return null;
}

export function getAfterCompletionAnticipation(streak: number, nextMilestone: number | null, daysToNext: number | null): string {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();
  if (nextMilestone && daysToNext !== null && daysToNext <= 3) {
    if (es) return 'Un ritmo está formándose suavemente.';
    if (pt) return 'Um ritmo está se formando quietamente.';
    if (fr) return 'Un rythme se forme doucement.';
    if (de) return 'Ein Rhythmus formt sich still.';
    return 'A rhythm is quietly forming.';
  }
  if (streak === 0) {
    if (es) return 'Mañana estará aquí cuando puedas.';
    if (pt) return 'Amanhã estará aqui quando quiser.';
    if (fr) return 'Demain sera là quand le moment sera juste.';
    if (de) return 'Morgen ist da, wenn du bereit bist.';
    return "Tomorrow is there when you're ready.";
  }
  if (streak === 1) {
    if (es) return 'El ritmo está comenzando.';
    if (pt) return 'O ritmo está começando.';
    if (fr) return 'Le rythme commence.';
    if (de) return 'Der Rhythmus beginnt.';
    return 'The rhythm is starting.';
  }
  if (streak < 7) {
    if (es) return 'Sigue siendo suave.';
    if (pt) return 'Continue com calma.';
    if (fr) return 'Continue doucement.';
    if (de) return 'Mach sanft weiter.';
    return 'Keep going gently.';
  }
  if (es) return 'Regresa cuando puedas.';
  if (pt) return 'Volte quando quiser.';
  if (fr) return 'Reviens quand le moment sera juste.';
  if (de) return 'Komm zurück, wenn du bereit bist.';
  return "Come back when you're ready.";
}

// ─── Journey Phase System ─────────────────────────────────────────────────────
export type JourneyPhase = 'beginner' | 'rebuilding' | 'momentum' | 'identity' | 'transformation';

export interface JourneyPhaseInfo {
  phase: JourneyPhase;
  label: string;
  description: string;
  narrative: string;
}

export function getJourneyPhase(streak: number, total: number): JourneyPhaseInfo {
  const es = isEs();
  const de = isDe();
  if (streak >= 90 || total >= 90) return {
    phase: 'transformation',
    label: es ? 'Transformación' : de ? 'Transformation' : 'Transformation',
    description: es ? 'Has cambiado.' : de ? 'Du hast dich verändert.' : 'You have changed.',
    narrative: es ? 'Esto ya no es esfuerzo. Esto es quién eres.' : de ? 'Das ist keine Anstrengung mehr. Das bist du.' : 'This is no longer effort. This is who you are.',
  };
  if (streak >= 30 || total >= 30) return {
    phase: 'identity',
    label: es ? 'Identidad' : de ? 'Identität' : 'Identity',
    description: es ? 'El hábito se está convirtiendo en quien eres.' : de ? 'Die Gewohnheit wird zu dem, wer du bist.' : 'The habit is becoming who you are.',
    narrative: es ? 'La consistencia se ha vuelto tu nueva normalidad.' : de ? 'Beständigkeit ist deine neue Normalität geworden.' : 'Consistency has become your new normal.',
  };
  if (streak >= 14 || total >= 14) return {
    phase: 'momentum',
    label: es ? 'Impulso' : de ? 'Schwung' : 'Momentum',
    description: es ? 'Estás construyendo algo real.' : de ? 'Du baust etwas Echtes auf.' : 'You are building something real.',
    narrative: es ? 'Dos semanas mostrándote. El cambio está ocurriendo.' : de ? 'Zwei Wochen erscheinen. Die Veränderung passiert.' : 'Two weeks of showing up. The shift is happening.',
  };
  if (streak >= 3 || total >= 3) return {
    phase: 'rebuilding',
    label: es ? 'Reconstruyendo' : de ? 'Wiederaufbau' : 'Rebuilding',
    description: es ? 'La base se está formando.' : de ? 'Die Grundlage formt sich.' : 'The foundation is forming.',
    narrative: es ? 'Cada día que regresas, el hábito se fortalece.' : de ? 'Jeden Tag, an dem du zurückkommst, wird die Gewohnheit stärker.' : 'Every day you return, the habit gets stronger.',
  };
  return {
    phase: 'beginner',
    label: es ? 'Comienzo' : de ? 'Anfang' : 'Beginning',
    description: es ? 'Día 1 completado.' : de ? 'Tag 1 abgeschlossen.' : 'Day 1 completed.',
    narrative: es ? 'Tu viaje ha comenzado.' : de ? 'Deine Reise hat begonnen.' : 'Your journey has started.',
  };
}

// ─── Identity Statement (bold declaration for the Progress hero) ───────────────
export function getIdentityStatement(streak: number, total: number): string {
  if (isEs()) {
    if (streak === 0 && total === 0) return 'Tu viaje comienza\ncon un reset.';
    if (streak === 0 && total > 0)   return 'Regresaste.\nEso es disciplina.';
    if (streak === 1)  return 'Regresaste.';
    if (streak === 3)  return 'Tres días.\nTe estás volviendo consistente.';
    if (streak === 7)  return 'Una semana.\nTe estás convirtiendo en alguien que aparece.';
    if (streak === 14) return 'Dos semanas.\nTus hábitos te están transformando.';
    if (streak === 30) return 'Un mes.\nYa no eres la misma persona que empezó.';
    if (streak >= 90)  return 'Te has transformado.\nEsto es ahora quien eres.';
    if (streak >= 60)  return 'Dos meses.\nLa disciplina es tu estándar ahora.';
    if (streak >= 30)  return `${streak} días eligiéndote.`;
    return `Día ${streak}.\nEres ${getIdentityLabel(streak).replace('.', '')}.`;
  }
  if (isPt()) {
    if (streak === 0 && total === 0) return 'Sua jornada começa\ncom um reset.';
    if (streak === 0 && total > 0)   return 'Você voltou.\nIsso já é suficiente.';
    if (streak === 1)  return 'Você voltou.';
    if (streak === 3)  return 'Três dias.\nVocê está se tornando constante.';
    if (streak === 7)  return 'Uma semana.\nVocê está se tornando alguém que aparece.';
    if (streak === 14) return 'Duas semanas.\nSeus hábitos estão te transformando.';
    if (streak === 30) return 'Um mês.\nVocê não é mais a mesma pessoa que começou.';
    if (streak >= 90)  return 'Você se transformou.\nEsse é quem você é agora.';
    if (streak >= 60)  return 'Dois meses.\nA disciplina é seu padrão agora.';
    if (streak >= 30)  return `${streak} dias escolhendo você mesma.`;
    return `Dia ${streak}.\nVocê é ${getIdentityLabel(streak).replace('.', '')}.`;
  }
  if (isDe()) {
    if (streak === 0 && total === 0) return 'Deine Reise beginnt\nmit einem Reset.';
    if (streak === 0 && total > 0)   return 'Du bist zurückgekehrt.\nDas reicht.';
    if (streak === 1)  return 'Du bist zurückgekehrt.';
    if (streak === 3)  return 'Drei Tage.\nDu wirst beständig.';
    if (streak === 7)  return 'Eine Woche.\nDu wirst jemand, der erscheint.';
    if (streak === 14) return 'Zwei Wochen.\nDeine Gewohnheiten formen dich still.';
    if (streak === 30) return 'Ein Monat.\nDu bist nicht mehr dieselbe Person, die begonnen hat.';
    if (streak >= 90)  return 'Du hast dich verwandelt.\nDas bist du jetzt.';
    if (streak >= 60)  return 'Zwei Monate.\nDisziplin ist dein Standard jetzt.';
    if (streak >= 30)  return `${streak} Tage, an denen du dich gewählt hast.`;
    return `Tag ${streak}.\nDu bist ${getIdentityLabel(streak).replace('.', '')}.`;
  }
  if (streak === 0 && total === 0) return 'Your journey starts\nwith one reset.';
  if (streak === 0 && total > 0)   return 'You came back.\nThat is enough.';
  if (streak === 1)  return 'You returned.';
  if (streak === 3)  return 'Three days.\nYou are becoming consistent.';
  if (streak === 7)  return 'One week.\nYou are becoming someone who shows up.';
  if (streak === 14) return 'Two weeks.\nYour habits are quietly reshaping you.';
  if (streak === 30) return 'One month.\nYou are not the same person who started.';
  if (streak >= 90)  return 'You have transformed.\nThis is now who you are.';
  if (streak >= 60)  return 'Two months in.\nDiscipline is your default now.';
  if (streak >= 30)  return `${streak} days of choosing yourself.`;
  return `Day ${streak}.\nYou are ${getIdentityLabel(streak).replace('.', '')}.`;
}

// ─── Emotional Memory Lines ────────────────────────────────────────────────────
export function getEmotionalMemory(
  streak: number,
  weeklyScore: number,
  total: number,
  monthlyScore: number
): string {
  if (isEs()) {
    if (streak === 0 && total > 0)   return `Completaste ${total} regreso${total > 1 ? 's' : ''}. Nada de eso desaparece.`;
    if (weeklyScore === 7)            return 'Apareciste todos los días de esta semana.';
    if (weeklyScore >= 5)             return `Volviste ${weeklyScore} veces esta semana. Los días se están conectando.`;
    if (weeklyScore === 0 && total > 0) return 'El espacio sigue aquí. Hoy todavía está abierto.';
    if (monthlyScore >= 20)           return `${monthlyScore} regresos este mes. El ritmo está tomando forma.`;
    if (total === 1)                   return 'Un regreso. El primero ya es suficiente.';
    if (total > 1 && weeklyScore > 0) return `Volviste ${weeklyScore} vez${weeklyScore > 1 ? 'es' : ''} esta semana.`;
    return `${total} regreso${total > 1 ? 's' : ''} completados. Sigues apareciendo.`;
  }
  if (isPt()) {
    if (streak === 0 && total > 0)   return `Você concluiu ${total} reset${total > 1 ? 's' : ''}. Nada disso desaparece.`;
    if (weeklyScore === 7)            return 'Você apareceu todos os dias desta semana.';
    if (weeklyScore >= 5)             return `Você voltou ${weeklyScore} vezes nesta semana. Os dias estão se conectando.`;
    if (weeklyScore === 0 && total > 0) return 'O espaço continua aqui. Hoje ainda está aberto.';
    if (monthlyScore >= 20)           return `${monthlyScore} retornos este mês. Aos poucos, o ritmo reaparece.`;
    if (total === 1)                   return 'Um retorno. O primeiro já é suficiente.';
    if (total > 1 && weeklyScore > 0) return `Você voltou ${weeklyScore} vez${weeklyScore > 1 ? 'es' : ''} nesta semana.`;
    return `${total} retorno${total > 1 ? 's' : ''} concluídos. Você continua aparecendo.`;
  }
  if (isDe()) {
    if (streak === 0 && total > 0)   return `Du hast ${total} Reset${total > 1 ? 's' : ''} abgeschlossen. Nichts davon verschwindet.`;
    if (weeklyScore === 7)            return 'Du bist jeden Tag dieser Woche erschienen.';
    if (weeklyScore >= 5)             return `Du bist ${weeklyScore} Mal diese Woche zurückgekehrt. Die Tage verbinden sich.`;
    if (weeklyScore === 0 && total > 0) return 'Der Raum ist noch hier. Heute ist noch offen.';
    if (monthlyScore >= 20)           return `${monthlyScore} Rückkehren diesen Monat. Dein Rhythmus nimmt Form an.`;
    if (total === 1)                   return 'Eine Rückkehr. Die erste reicht schon.';
    if (total > 1 && weeklyScore > 0) return `Du bist ${weeklyScore} Mal diese Woche zurückgekehrt.`;
    return `${total} Reset${total > 1 ? 's' : ''} abgeschlossen. Du erscheinst weiter.`;
  }
  if (streak === 0 && total > 0)   return `You've completed ${total} reset${total > 1 ? 's' : ''}. None of that disappears.`;
  if (weeklyScore === 7)            return 'You showed up every single day this week.';
  if (weeklyScore >= 5)             return `You returned ${weeklyScore} times this week. The days are connecting.`;
  if (weeklyScore === 0 && total > 0) return 'The space is still here. Today is still open.';
  if (monthlyScore >= 20)           return `${monthlyScore} returns this month. Your rhythm is taking shape.`;
  if (total === 1)                   return 'One return. The first is already enough.';
  if (total > 1 && weeklyScore > 0) return `You returned ${weeklyScore} time${weeklyScore > 1 ? 's' : ''} this week.`;
  return `${total} return${total > 1 ? 's' : ''} completed. You keep showing up.`;
}

// ─── Identity Reflection Prompts (progress-aware) ─────────────────────────────
export function getIdentityReflections(
  streak: number,
  weeklyScore: number,
  nextMilestone: number | null,
  daysToNext: number | null
): [string, string, string] {
  const r1 = streak === 0
    ? 'Every return matters more than the days you missed.'
    : weeklyScore >= 5
    ? 'You are becoming someone who follows through.'
    : 'Progress is not linear. Showing up is.';

  const r2 = streak === 0
    ? 'This is not starting over. This is starting again — with experience.'
    : streak < 7
    ? `${7 - streak} more day${7 - streak > 1 ? 's' : ''} to your first 7-day streak.`
    : nextMilestone && daysToNext
    ? `${daysToNext} day${daysToNext > 1 ? 's' : ''} to Day ${nextMilestone}. You're closer than you think.`
    : 'Your future is being built in these small moments.';

  const r3 = streak >= 30
    ? 'Your consistency is changing your identity, not just your habits.'
    : streak >= 14
    ? 'Two weeks of showing up is rare. You are already doing it.'
    : streak >= 7
    ? 'One week behind you. This is where most people stop. You didn\'t.'
    : 'Small daily actions create extraordinary long-term results.';

  return [r1, r2, r3];
}

// ─── Humanized Milestone Labels ───────────────────────────────────────────────
export function getHumanizedMilestone(day: number): { title: string; emotion: string } {
  const map: Record<number, { title: string; emotion: string }> = {
    3:   { title: 'First momentum',          emotion: 'The habit is starting to breathe.' },
    7:   { title: 'One full week',            emotion: 'Seven days of choosing yourself.' },
    14:  { title: 'Two weeks of showing up', emotion: 'Your mind is quietly shifting.' },
    21:  { title: 'Three weeks',             emotion: 'This is becoming part of who you are.' },
    30:  { title: 'One month',               emotion: 'You built something real.' },
    60:  { title: 'Two months in',           emotion: 'Look how far you have come.' },
    90:  { title: 'Ninety days',             emotion: 'Discipline is now your identity.' },
    100: { title: 'One hundred days',        emotion: 'A milestone most never reach.' },
    180: { title: 'Half a year',             emotion: 'You are extraordinary.' },
    365: { title: 'One full year',           emotion: 'You became someone different.' },
  };
  return map[day] ?? { title: `Day ${day}`, emotion: 'You showed up.' };
}

// ─── Daily Narrative (per-day for D1-21, phase-based after) ──────────────────
// More specific than getDailySubheadline — creates sense of continuous story
const perDayNarrativeEs: Record<number, string> = {
  1:  'El paso más difícil es presentarte. Ya lo diste.',
  2:  'Regresaste. Eso ya te distingue.',
  3:  'Tres días construyen evidencia. Ya tienes evidencia.',
  4:  'La base se está formando en silencio.',
  5:  'Cinco días. El impulso está despertando.',
  6:  'Casi una semana completa. No rompas el hilo.',
  7:  'Una semana completa. Algo en ti está cambiando.',
  8:  'Una semana atrás. Aquí es donde se pone real.',
  9:  'Te estás demostrando consistencia a ti mismo.',
  10: 'Diez días. Ya no estás solo intentando.',
  11: 'Esto se está convirtiendo en parte de tu rutina.',
  12: 'Dos días para dos semanas. Mantén el hilo.',
  13: 'Mañana marca dos semanas completas. Preséntate.',
  14: 'Dos semanas. La confianza real en ti mismo está creciendo.',
  15: 'A mitad del mes. Lo estás logrando.',
  16: 'La disciplina crece sin hacer ruido.',
  17: 'Cada día que apareces, reconfiguras el patrón.',
  18: 'Tu consistencia se está volviendo visible.',
  19: 'Llevas casi tres semanas aquí.',
  20: 'Veinte días eligiendo diferente. Eso es raro.',
  21: 'Tres semanas. Esto está convirtiéndose en quién eres.',
};

const perDayNarrative: Record<number, string> = {
  1:  'Beginning matters.',
  2:  'You returned. That already sets you apart.',
  3:  'Three days builds evidence. You have evidence now.',
  4:  'The foundation is forming quietly.',
  5:  'Five days. Momentum is waking up.',
  6:  'Almost one full week. Don\'t break the thread.',
  7:  'One full week. Something in you is shifting.',
  8:  'A week behind you. This is where it gets real.',
  9:  'You are proving consistency to yourself.',
  10: 'Ten days. You are no longer just trying.',
  11: 'This is becoming part of your routine.',
  12: 'Two days from two weeks. Keep the thread going.',
  13: 'Tomorrow marks two full weeks. Show up.',
  14: 'Two weeks. Real trust in yourself is building.',
  15: 'Halfway through the month. You are doing this.',
  16: 'Discipline grows without making noise.',
  17: 'Each day you show up, you rewire the default.',
  18: 'Your consistency is becoming visible.',
  19: 'You have been here for nearly three weeks.',
  20: 'Twenty days of choosing differently. This is rare.',
  21: 'Three weeks. This is becoming who you are.',
};

const phaseNarratives: Record<string, string[]> = {
  starting:    ['Beginning is the hardest part. You\'re doing it.', 'One day at a time. That\'s the only way.', 'The journey doesn\'t ask for perfection. Just presence.'],
  stabilizing: ['Consistency is building beneath the surface.', 'You are proving something quiet but real.', 'Small acts repeated create big change.'],
  rebuilding:  ['This is where most people stop. You haven\'t.', 'Your habits are stabilizing. So are you.', 'One week behind you. More ahead.'],
  consistent:  ['Consistency is no longer effort. It\'s identity.', 'You have built something hard to break.', 'What you do daily defines who you become.'],
  focused:     ['Your future is responding to your consistency.', 'You are becoming harder to distract.', 'This is no longer temporary.'],
  disciplined: ['Consistency is your new baseline.', 'You have rewired what normal feels like.', 'Sixty days of identity in action.'],
  unstoppable: ['This is no longer a habit. This is who you are.', 'You rebuilt yourself. One day at a time.', 'What began as effort is now identity.'],
};

const perDayNarrativeDe: Record<number, string> = {
  1:  'Anfangen ist das Wichtigste.',
  2:  'Du bist zurückgekehrt. Das unterscheidet dich bereits.',
  3:  'Drei Tage baut Beweise auf. Du hast jetzt Beweise.',
  4:  'Die Grundlage formt sich still.',
  5:  'Fünf Tage. Schwung erwacht.',
  6:  'Fast eine volle Woche. Brich den Faden nicht.',
  7:  'Eine volle Woche. Etwas in dir verändert sich.',
  8:  'Eine Woche hinter dir. Hier wird es echt.',
  9:  'Du beweist dir selbst Beständigkeit.',
  10: 'Zehn Tage. Du versuchst nicht mehr nur.',
  11: 'Das wird Teil deiner Routine.',
  12: 'Zwei Tage bis zwei Wochen. Halte den Faden.',
  13: 'Morgen markiert zwei volle Wochen. Erscheine.',
  14: 'Zwei Wochen. Echtes Vertrauen in dich baut sich auf.',
  15: 'Halbzeit im Monat. Du schaffst das.',
  16: 'Disziplin wächst ohne Lärm zu machen.',
  17: 'Jeden Tag, an dem du erscheinst, verdrahtst du den Standard neu.',
  18: 'Deine Beständigkeit wird sichtbar.',
  19: 'Du bist seit fast drei Wochen hier.',
  20: 'Zwanzig Tage anders zu wählen. Das ist selten.',
  21: 'Drei Wochen. Das wird zu dem, wer du bist.',
};

const phaseNarrativesDe: Record<string, string[]> = {
  starting:    ['Anfangen ist der schwerste Teil. Du tust es.', 'Einen Tag nach dem anderen. Das ist der einzige Weg.', 'Die Reise verlangt keine Perfektion. Nur Präsenz.'],
  stabilizing: ['Beständigkeit baut sich unterhalb der Oberfläche auf.', 'Du beweist etwas Stilles, aber Echtes.', 'Kleine wiederholte Handlungen schaffen große Veränderungen.'],
  rebuilding:  ['Hier geben die meisten auf. Du nicht.', 'Deine Gewohnheiten stabilisieren sich. Du auch.', 'Eine Woche hinter dir. Mehr vor dir.'],
  consistent:  ['Beständigkeit ist keine Anstrengung mehr. Sie ist Identität.', 'Du hast etwas aufgebaut, das schwer zu brechen ist.', 'Was du täglich tust, definiert, wer du wirst.'],
  focused:     ['Deine Zukunft antwortet auf deine Beständigkeit.', 'Du wirst schwerer ablenkbar.', 'Das ist nicht mehr temporär.'],
  disciplined: ['Beständigkeit ist deine neue Ausgangslage.', 'Du hast umverdrahtet, wie sich normal anfühlt.', 'Sechzig Tage Identität in Aktion.'],
  unstoppable: ['Das ist keine Gewohnheit mehr. Das bist du.', 'Du hast dich neu aufgebaut. Einen Tag nach dem anderen.', 'Was als Anstrengung begann, ist jetzt Identität.'],
};

export function getDailyNarrative(currentDay: number, streak: number): string {
  if (isDe()) {
    if (currentDay >= 1 && currentDay <= 21 && perDayNarrativeDe[currentDay]) {
      return perDayNarrativeDe[currentDay];
    }
    const { key } = getEvolutionStage(streak);
    const pool = phaseNarrativesDe[key] ?? phaseNarrativesDe.starting;
    return pool[currentDay % pool.length];
  }
  const narrative = isEs() ? perDayNarrativeEs : perDayNarrative;
  if (currentDay >= 1 && currentDay <= 21 && narrative[currentDay]) {
    return narrative[currentDay];
  }
  const { key } = getEvolutionStage(streak);
  const pool = phaseNarratives[key] ?? phaseNarratives.starting;
  return pool[currentDay % pool.length];
}

// ─── Momentum Narrative (based on weekly consistency) ─────────────────────────
export function getMomentumNarrative(weeklyScore: number, streak: number): string {
  if (isFr()) {
    if (weeklyScore === 7) return 'Chaque jour de la semaine. C\'est rare — et ça compte.';
    if (weeklyScore >= 5)  return `${weeklyScore} jours cette semaine. La constance s'accumule.`;
    if (weeklyScore >= 3)  return 'Tu as continué. C\'est ce qui compte le plus.';
    if (weeklyScore === 1) return 'Un jour cette semaine. C\'est déjà un de plus que zéro.';
    if (weeklyScore === 0 && streak > 0) return 'Nouvelle semaine. Ton élan continue. Reviens aujourd\'hui.';
    if (weeklyScore === 0) return 'La semaine est ouverte. Un reset suffit.';
    return 'Chaque retour est un vote pour qui tu deviens.';
  }
  if (isDe()) {
    if (weeklyScore === 7) return 'Jeden Tag diese Woche. Das ist selten — und es zählt.';
    if (weeklyScore >= 5)  return `${weeklyScore} Tage diese Woche. Beständigkeit potenziert sich.`;
    if (weeklyScore >= 3)  return 'Du bist weitergemacht. Das ist es, was am meisten zählt.';
    if (weeklyScore === 1) return 'Ein Tag diese Woche. Das ist immer noch einer mehr als null.';
    if (weeklyScore === 0 && streak > 0) return 'Neue Woche. Dein Rhythmus geht weiter. Komm heute zurück.';
    if (weeklyScore === 0) return 'Die Woche ist offen. Ein Reset reicht.';
    return 'Jede Rückkehr ist eine Stimme für den, der du wirst.';
  }
  if (weeklyScore === 7) return 'Every day this week. That\'s rare — and it matters.';
  if (weeklyScore >= 5)  return `${weeklyScore} days this week. Consistency is compounding.`;
  if (weeklyScore >= 3)  return 'You kept going. That\'s what matters most.';
  if (weeklyScore === 1) return 'One day this week. That\'s still one more than zero.';
  if (weeklyScore === 0 && streak > 0) return 'New week. Your streak continues. Come back today.';
  if (weeklyScore === 0) return 'The week is open. One reset is enough.';
  return 'Every return is a vote for who you\'re becoming.';
}

// ─── Comeback Narrative (returning after missed days) ─────────────────────────
export function getComebackNarrative(streak: number, totalCompleted: number): string {
  if (isFr()) {
    if (streak === 0 && totalCompleted === 0) return 'Tout chemin commence par un seul pas.';
    if (streak === 1 && totalCompleted > 1) return 'Tu as recommencé. Ça demande plus que les gens ne réalisent.';
    if (streak === 1) return 'Tu es revenu. C\'est tout le jeu.';
    if (streak <= 3)  return 'Le progrès n\'est pas détruit par une semaine difficile. Tu es là.';
    return 'Chaque retour est un acte de respect envers toi-même.';
  }
  if (isDe()) {
    if (streak === 0 && totalCompleted === 0) return 'Jede Reise beginnt mit einem einzigen Schritt.';
    if (streak === 1 && totalCompleted > 1) return 'Du hast neu angefangen. Das braucht mehr, als die Leute sich vorstellen.';
    if (streak === 1) return 'Du bist zurückgekehrt. Das ist das ganze Spiel.';
    if (streak <= 3)  return 'Fortschritt wird nicht durch eine schwierige Woche zerstört. Du bist zurück.';
    return 'Jede Rückkehr ist ein Akt der Selbstachtung.';
  }
  if (streak === 0 && totalCompleted === 0) return 'Every journey begins with a single step.';
  if (streak === 1 && totalCompleted > 1) return 'You started again. That takes more than people realize.';
  if (streak === 1) return 'You returned. That\'s the whole game.';
  if (streak <= 3)  return 'Progress isn\'t destroyed by a difficult week. You\'re back.';
  return 'Every return is an act of self-respect.';
}

// ─── Future Self Narrative ────────────────────────────────────────────────────
export function getFutureSelfNarrative(streak: number, phase: JourneyPhase): string {
  if (isDe()) {
    const mapDe: Record<JourneyPhase, string[]> = {
      beginner: [
        'Dein zukünftiges Ich wird in diesen kleinen Momenten geschrieben.',
        'Wer du werden möchtest, wird einen Tag nach dem anderen aufgebaut.',
        'Die Person, die du wirst, beginnt hier.',
      ],
      rebuilding: [
        'Der Abstand zwischen dem, wo du bist, und dem, wo du sein möchtest, schließt sich täglich.',
        'Kleine tägliche Handlungen formen still deine Zukunft.',
        'Du baust die Person, auf die du zurückblicken möchtest.',
      ],
      momentum: [
        'Deine Beständigkeit formt still deine Zukunft.',
        'Die Version von dir, die kommt, wird gerade jetzt aufgebaut.',
        'Jeder Reset ist ein Brief an dein zukünftiges Ich.',
      ],
      identity: [
        'Wer du wirst, zeigt sich in dem, was du heute tust.',
        'Deine Zukunft ist nicht mehr ungewiss. Du schreibst sie.',
        'Beständigkeit verspricht keine Perfektion. Sie verspricht Veränderung.',
      ],
      transformation: [
        'Du bist bereits jemand anderes geworden.',
        'Dein zukünftiges Ich würde dieser Version von dir danken.',
        'Die Transformation, die du dir vorgestellt hast, passiert bereits.',
      ],
    };
    const poolDe = mapDe[phase];
    return poolDe[streak % poolDe.length];
  }
  if (isFr()) {
    const mapFr: Record<JourneyPhase, string[]> = {
      beginner: [
        'Ton futur se construit dans ces petits moments.',
        'La personne que tu veux devenir se construit un jour à la fois.',
        'Celui que tu deviens commence ici.',
      ],
      rebuilding: [
        'L\'écart entre où tu es et où tu veux être se réduit chaque jour.',
        'De petits actes quotidiens redessinents ton avenir en silence.',
        'Tu construis la personne sur laquelle tu voudras te retourner.',
      ],
      momentum: [
        'Ta constance redessine ton avenir doucement.',
        'La version de toi qui arrive se construit maintenant.',
        'Chaque reset est une lettre à ton futur toi.',
      ],
      identity: [
        'Qui tu deviens se voit dans ce que tu fais aujourd\'hui.',
        'Ton avenir n\'est plus incertain. Tu l\'écris.',
        'La constance ne promet pas la perfection. Elle promet le changement.',
      ],
      transformation: [
        'Tu es déjà devenu quelqu\'un de différent.',
        'Ton futur toi remercierait cette version de toi.',
        'La transformation que tu imaginais est déjà en train d\'arriver.',
      ],
    };
    const poolFr = mapFr[phase];
    return poolFr[streak % poolFr.length];
  }
  const map: Record<JourneyPhase, string[]> = {
    beginner: [
      'Your future self is being written in these small moments.',
      'Who you want to become is built one day at a time.',
      'The person you\'re becoming starts here.',
    ],
    rebuilding: [
      'The gap between where you are and where you want to be closes daily.',
      'Small daily acts quietly reshape your future.',
      'You are building the person you want to look back on.',
    ],
    momentum: [
      'Your consistency is quietly reshaping your future.',
      'The version of you that\'s coming is being built right now.',
      'Every reset is a letter to your future self.',
    ],
    identity: [
      'Who you are becoming shows in what you do today.',
      'Your future is no longer uncertain. You\'re writing it.',
      'Consistency doesn\'t promise perfection. It promises change.',
    ],
    transformation: [
      'You have already become someone different.',
      'Your future self would thank this version of you.',
      'The transformation you imagined is already happening.',
    ],
  };
  const pool = map[phase];
  return pool[streak % pool.length];
}

// ─── Milestone Narrative (emotional context for milestone moments) ─────────────
export function getMilestoneNarrative(day: number): string {
  const map: Record<number, string> = {
    3:   'Three days builds evidence. Evidence builds identity.',
    7:   'A week of choosing differently. The shift is real.',
    14:  'Two weeks. You have built real trust with yourself.',
    21:  'Three weeks. This is no longer a goal. It\'s a pattern.',
    30:  'Thirty days of quiet transformation. This is permanent.',
    60:  'Two months. You are not the same person who started.',
    90:  'Ninety days. Discipline is your identity now.',
    100: 'One hundred days. A monument to your character.',
    180: 'Half a year. Extraordinary doesn\'t begin to describe it.',
    365: 'One full year. You rebuilt yourself. Completely.',
  };
  return map[day] ?? `Day ${day}. You showed up again.`;
}

// ─── Dynamic Progress Quote ───────────────────────────────────────────────────
export function getProgressQuote(streak: number, phase: JourneyPhase): string {
  const quotes: Record<JourneyPhase, string[]> = {
    beginner: [
      '"The secret is to start."',
      '"One step forward is still forward."',
      '"Every expert was once a beginner."',
    ],
    rebuilding: [
      '"Progress is built one day at a time."',
      '"Small consistency becomes identity."',
      '"You are proving something to yourself."',
    ],
    momentum: [
      '"Momentum is the result of small acts, repeated."',
      '"This is what consistency looks like."',
      '"Two weeks of showing up changes you."',
    ],
    identity: [
      '"You are not building habits. You are building a self."',
      '"Consistency is now your language."',
      '"What you do daily defines who you become."',
    ],
    transformation: [
      '"This is no longer a habit. This is who you are."',
      '"You did what most people only dream about."',
      '"Identity is built in repetition."',
    ],
  };
  const pool = quotes[phase];
  return pool[streak % pool.length];
}

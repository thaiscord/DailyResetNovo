// ─── Comeback Psychology System ───────────────────────────────────────────────
// Core principle: returning is never failure. It is resilience.
// This system detects inactivity, classifies it, and responds with
// emotionally safe, compassionate, forward-looking messaging.
//
// Tone: calm · warm · sophisticated · non-punishing · premium

import { getLocalDateKey } from '../hooks/useStorage';
import { getAppNow } from './appDate';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComebackState = 'none' | 'soft' | 'medium' | 'major' | 'extended';

export interface ComebackData {
  state: ComebackState;
  daysMissed: number;
  isComeback: boolean;
}

export interface ComebackContent {
  headline: string;
  body: string;
  subtext: string;
}

// ─── Detection ────────────────────────────────────────────────────────────────

/**
 * Counts consecutive calendar days without a reset before today,
 * then classifies the comeback severity.
 *
 * soft:     1 day missed
 * medium:   2–3 days missed
 * major:    4–7 days missed
 * extended: 8+ days missed
 */
export function detectComebackState(
  completedByDate: Record<string, true>,
  totalDaysCompleted: number,
): ComebackData {
  if (totalDaysCompleted === 0) {
    return { state: 'none', daysMissed: 0, isComeback: false };
  }

  let daysMissed = 0;
  for (let i = 1; i <= 90; i++) {
    const d = getAppNow();
    d.setDate(d.getDate() - i);
    const key = getLocalDateKey(d);
    if (completedByDate[key]) break;
    daysMissed++;
  }

  if (daysMissed === 0) {
    return { state: 'none', daysMissed: 0, isComeback: false };
  }

  const state: ComebackState =
    daysMissed === 1 ? 'soft'     :
    daysMissed <= 3  ? 'medium'   :
    daysMissed <= 7  ? 'major'    :
    'extended';

  return { state, daysMissed, isComeback: true };
}

// ─── Comeback Narrative ───────────────────────────────────────────────────────

export function getComebackNarrativeContent(
  comeback: ComebackData,
  comebackCount: number,
): ComebackContent {
  const { state, daysMissed } = comeback;
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();

  switch (state) {
    case 'soft':
      return {
        headline: de ? 'Du bist zurückgekehrt.' : es ? 'Regresaste.' : pt ? 'Você voltou.' : fr ? 'Tu es revenu ici.' : 'You came back.',
        body: de ? 'Einen Tag zu verpassen ist menschlich. Zurückkehren ist das, was zählt.'
          : es ? 'Perderse un día es humano. Regresar es lo que importa.'
          : pt ? 'Perder um dia é humano. Voltar é o que importa.'
          : fr ? 'Manquer un jour est humain. Revenir, c\'est ce qui compte.'
          : 'Missing one day is human. Returning is what matters.',
        subtext: de ? 'Der Rhythmus geht hier weiter.'
          : es ? 'El ritmo continúa aquí.'
          : pt ? 'O ritmo continua aqui.'
          : fr ? 'Le rythme continue ici.'
          : 'The rhythm continues here.',
      };
    case 'medium':
      return {
        headline: de ? 'Du bist zurückgekehrt.'
          : es ? 'Regresaste.'
          : pt ? 'Você voltou.'
          : fr ? 'Tu es revenu ici.'
          : (daysMissed === 2 ? 'You came back after two days.' : 'You came back.'),
        body: de ? 'Ein paar schwere Tage löschen nicht, was du aufgebaut hast.'
          : es ? 'Unos días difíciles no borran lo que construiste.'
          : pt ? 'Alguns dias difíceis não apagam o que você construiu.'
          : fr ? 'Quelques jours difficiles n\'effacent pas ce que tu as construit.'
          : 'A difficult few days does not erase what you built.',
        subtext: de ? 'Der Schwung kann sich wieder aufbauen. Ein Reset reicht.'
          : es ? 'El impulso puede reconstruirse. Un reset es suficiente.'
          : pt ? 'O impulso pode ser reconstruído. Um reset já é suficiente.'
          : fr ? 'L\'élan peut se reconstruire doucement. Un reset suffit.'
          : 'Momentum can be rebuilt quietly. One reset is enough.',
      };
    case 'major':
      return {
        headline: de ? 'Du bist nach einer schweren Woche zurückgekehrt.'
          : es ? 'Regresaste después de una semana difícil.'
          : pt ? 'Você voltou depois de uma semana difícil.'
          : fr ? 'Tu es revenu après une semaine difficile.'
          : 'You returned after a difficult week.',
        body: de ? 'Fortschritt wird nicht durch schwere Tage gelöscht.\nDu fängst nicht von null an.'
          : es ? 'El progreso no se borra por días difíciles.\nNo estás empezando desde cero.'
          : pt ? 'O progresso não é apagado por dias difíceis.\nVocê não está começando do zero.'
          : fr ? 'Le progrès ne s\'efface pas par des jours difficiles.\nTu ne repars pas de zéro.'
          : 'Progress is not erased by difficult days.\nYou are not starting from zero.',
        subtext: de ? 'Zurückkehren ist Teil des Wachstums.'
          : es ? 'Regresar es parte del crecimiento.'
          : pt ? 'Voltar faz parte do crescimento.'
          : fr ? 'Revenir fait partie du chemin.'
          : 'Returning is part of growth.',
      };
    case 'extended':
      return {
        headline: de ? 'Du fängst nicht von null an.'
          : es ? 'No estás empezando desde cero.'
          : pt ? 'Você não está começando do zero.'
          : fr ? 'Tu ne repars pas de zéro.'
          : 'You are not starting from zero.',
        body: de ? 'Deine Reise existiert noch.\nWas du vorher aufgebaut hast, steckt noch in dir.'
          : es ? 'Tu viaje aún existe.\nLo que construiste antes sigue dentro de ti.'
          : pt ? 'Sua jornada ainda existe.\nO que você construiu antes ainda está dentro de você.'
          : fr ? 'Ton chemin existe encore.\nCe que tu as construit est toujours en toi.'
          : 'Your journey still exists.\nWhat you built before is still inside you.',
        subtext: de
          ? (comebackCount > 1 ? 'Du bist schon früher zurückgekehrt. Das tust du immer.' : 'Ein kleiner Reset heute reicht, um neu anzufangen.')
          : es
          ? (comebackCount > 1 ? 'Has regresado antes. Siempre lo haces.' : 'Un pequeño reset hoy es suficiente para comenzar de nuevo.')
          : pt
          ? (comebackCount > 1 ? 'Você voltou antes. Você sempre volta.' : 'Um pequeno reset hoje já é suficiente para recomeçar.')
          : fr
          ? (comebackCount > 1 ? 'Tu es déjà revenu avant. Tu le refais.' : 'Un petit reset aujourd\'hui suffit pour recommencer.')
          : (comebackCount > 1 ? 'You\'ve returned before. You always do.' : 'One small reset today is enough to begin again.'),
      };
    default:
      return {
        headline: de ? 'Willkommen zurück.' : es ? 'Has vuelto.' : pt ? 'Que bom te ver.' : fr ? 'Bon retour.' : 'Welcome back.',
        body: de ? 'Heute zählt noch.' : es ? 'Hoy todavía importa.' : pt ? 'Hoje ainda importa.' : fr ? 'Aujourd\'hui compte encore.' : 'Today still matters.',
        subtext: de ? 'Der Fortschritt geht hier weiter.' : es ? 'El progreso continúa aquí.' : pt ? 'O progresso continua aqui.' : fr ? 'Le progrès continue ici.' : 'Progress continues here.',
      };
  }
}

// ─── Simple string version (for pre-completion banner) ────────────────────────

export function getComebackBannerText(state: ComebackState): string {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();
  switch (state) {
    case 'soft':
      return de ? 'Du bist zurückgekehrt. Das zählt.'
        : es ? 'Regresaste. Eso importa.'
        : pt ? 'Você voltou. Isso importa.'
        : fr ? 'Tu es revenu ici. Ça compte.'
        : 'You came back. That matters.';
    case 'medium':
      return de ? 'Ein paar schwere Tage löschen nicht den Fortschritt. Du bist jetzt hier.'
        : es ? 'Unos días difíciles no borran el progreso. Aquí estás.'
        : pt ? 'Alguns dias difíceis não apagam o progresso. Você está aqui agora.'
        : fr ? 'Quelques jours difficiles n\'effacent pas le progrès. Tu es là maintenant.'
        : 'A difficult few days doesn\'t erase progress. You\'re here now.';
    case 'major':
      return de ? 'Du bist nach einer schweren Woche zurückgekehrt. Der Schwung kann sich wieder aufbauen.'
        : es ? 'Regresaste después de una semana difícil. El impulso puede reconstruirse.'
        : pt ? 'Você voltou depois de uma semana difícil. O impulso pode ser reconstruído.'
        : fr ? 'Tu es revenu après une semaine difficile. L\'élan peut se reconstruire.'
        : 'You returned after a difficult week. Momentum can be rebuilt quietly.';
    case 'extended':
      return de ? 'Du fängst nicht von null an. Deine Reise existiert noch.'
        : es ? 'No estás empezando desde cero. Tu viaje aún existe.'
        : pt ? 'Você não está começando do zero. Sua jornada ainda existe.'
        : fr ? 'Tu ne repars pas de zéro. Ton chemin existe encore.'
        : 'You are not starting from zero. Your journey still exists.';
    default:         return '';
  }
}

// ─── Resilience Messages ──────────────────────────────────────────────────────

export function getResilienceMessage(
  comebackCount: number,
  totalDaysCompleted: number,
): string {
  if (comebackCount === 0 || totalDaysCompleted === 0) return '';
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();

  if (comebackCount === 1) {
    return totalDaysCompleted >= 14
      ? (de ? 'Du hast echte Beständigkeit aufgebaut. Du kannst es wieder tun.'
        : es ? 'Construiste consistencia real antes. Puedes hacerlo de nuevo.'
        : pt ? 'Você construiu consistência real antes. Pode fazer de novo.'
        : fr ? 'Tu as construit de la vraie constance avant. Tu peux le refaire.'
        : 'You built real consistency before. You can again.')
      : (de ? 'Jede Reise hat schwere Momente. Diese auch.'
        : es ? 'Todo camino tiene momentos difíciles. Este también.'
        : pt ? 'Toda jornada tem momentos difíceis. Esta também.'
        : fr ? 'Tout chemin a des moments difficiles. Celui-ci aussi.'
        : 'Every journey has difficult moments. This one too.');
  }

  if (comebackCount === 2) {
    return de ? 'Du hast das schon einmal getan. Du weißt, wie man neu anfängt.'
      : es ? 'Ya lo has hecho antes. Sabes cómo volver a empezar.'
      : pt ? 'Você já fez isso antes. Sabe como recomeçar.'
      : fr ? 'Tu l\'as déjà fait avant. Tu sais comment recommencer.'
      : 'You\'ve done this before. You know how to begin again.';
  }

  if (comebackCount >= 3) {
    return de
      ? 'Resilienz bedeutet nicht, schwere Tage zu vermeiden. Es bedeutet, von ihnen zurückzukehren. Das tust du weiter.'
      : es
      ? 'La resiliencia no es evitar los días difíciles. Es volver de ellos. Sigues haciéndolo.'
      : pt
      ? 'Resiliência não é evitar dias difíceis. É voltar deles. Você continua fazendo isso.'
      : fr
      ? 'La résilience n\'est pas d\'éviter les jours difficiles. C\'est d\'en revenir. Tu continues à le faire.'
      : 'Resilience isn\'t avoiding hard days. It\'s coming back from them. You keep doing that.';
  }

  return de
    ? 'Du hast schon früher neu aufgebaut. Du beweist, dass Beständigkeit auch Zurückkehren bedeutet.'
    : es
    ? 'Ya reconstruiste antes. Estás demostrando que la constancia incluye volver.'
    : pt
    ? 'Você já reconstruiu antes. Está provando que constância inclui voltar.'
    : fr
    ? 'Tu as déjà reconstruit avant. Tu prouves que la constance inclut le retour.'
    : 'You\'ve rebuilt before. You\'re proving that consistency includes returning.';
}

// ─── Comeback Milestone ───────────────────────────────────────────────────────

export function getComebackMilestone(comebackCount: number): string | null {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();
  switch (comebackCount) {
    case 1:
      return de ? 'Du bist nach einer schweren Zeit zurückgekehrt. Das ist keine Schwäche. Das ist Resilienz.'
        : es ? 'Volviste después de un período difícil. Eso no es debilidad. Es resiliencia.'
        : pt ? 'Você voltou depois de um período difícil. Isso não é fraqueza. É resiliência.'
        : fr ? 'Tu es revenu après une période difficile. Ce n\'est pas de la faiblesse. C\'est de la résilience.'
        : 'You came back after a difficult period. That\'s not weakness. That\'s resilience.';
    case 3:
      return de ? 'Das ist deine dritte Rückkehr. Beständigkeit bedeutet auch zurückkehren.'
        : es ? 'Este es tu tercer regreso. La constancia incluye volver.'
        : pt ? 'Este é seu terceiro retorno. Constância inclui voltar.'
        : fr ? 'C\'est ton troisième retour. La constance inclut de revenir.'
        : 'This is your third return. Consistency includes coming back.';
    case 5:
      return de ? 'Fünf Rückkehren. Das ist keine Inkonsistenz — das ist Engagement auf lange Sicht.'
        : es ? 'Cinco regresos. Eso no es inconsistencia — es compromiso con el largo plazo.'
        : pt ? 'Cinco retornos. Isso não é inconsistência — é compromisso com o longo prazo.'
        : fr ? 'Cinq retours. Ce n\'est pas de l\'inconstance — c\'est un engagement sur le long terme.'
        : 'Five comebacks. That\'s not inconsistency — that\'s commitment to the long game.';
    case 10:
      return de ? 'Zehn Rückkehren. Du hast nie ganz aufgehört. Das bist du.'
        : es ? 'Diez regresos. Nunca paraste del todo. Eso es lo que eres.'
        : pt ? 'Dez retornos. Você nunca parou completamente. É quem você é.'
        : fr ? 'Dix retours. Tu ne t\'es jamais vraiment arrêté. C\'est qui tu es.'
        : 'Ten returns. You never fully stopped. That\'s who you are.';
    default:
      return null;
  }
}

// ─── Soft Streak Philosophy ───────────────────────────────────────────────────

/**
 * Returns a gentle, non-punishing label for when streak = 0 but the user
 * has history. Instead of "0 days", something emotionally safe.
 */
export function getSoftStreakLabel(totalDaysCompleted: number): {
  title: string;
  body: string;
} {
  const es = isEs();
  const pt = isPt();
  const fr = isFr();
  const de = isDe();
  if (totalDaysCompleted === 0) {
    return {
      title: de ? 'Hier beginnt es.' : es ? 'Hoy es donde comienza.' : pt ? 'Hoje é onde começa.' : fr ? 'C\'est ici que ça commence.' : 'Today is where it starts.',
      body: de ? 'Ein Reset. Eine Entscheidung. Das reicht.'
        : es ? 'Un reset. Una elección. Eso es todo lo que se necesita.'
        : pt ? 'Um reset. Uma escolha. É tudo que precisa.'
        : fr ? 'Un reset. Un choix. C\'est tout ce qu\'il faut.'
        : 'One reset. One choice. That\'s all it takes.',
    };
  }
  if (totalDaysCompleted >= 30) {
    return {
      title: de ? 'Ein neues Kapitel beginnt.' : es ? 'Un nuevo capítulo comienza.' : pt ? 'Um novo capítulo começa.' : fr ? 'Un nouveau chapitre commence.' : 'A new chapter begins.',
      body: de ? `Du bist ${totalDaysCompleted} Mal erschienen. Das verschwindet nicht.`
        : es ? `Te has mostrado ${totalDaysCompleted} veces. Eso no desaparece.`
        : pt ? `Você apareceu ${totalDaysCompleted} vezes. Isso não desaparece.`
        : fr ? `Tu es revenu ${totalDaysCompleted} fois. Ça ne disparaît pas.`
        : `You\'ve shown up ${totalDaysCompleted} times. That doesn\'t disappear.`,
    };
  }
  if (totalDaysCompleted >= 7) {
    return {
      title: de ? 'Der Fortschritt geht weiter.' : es ? 'El progreso continúa.' : pt ? 'O progresso continua.' : fr ? 'Le progrès continue.' : 'Progress continues.',
      body: de ? 'Du warst schon hier. Du kannst wieder aufbauen.'
        : es ? 'Has estado aquí antes. Puedes construir de nuevo.'
        : pt ? 'Você esteve aqui antes. Pode construir de novo.'
        : fr ? 'Tu as déjà été là avant. Tu peux reconstruire.'
        : 'You\'ve been here before. You can build again.',
    };
  }
  return {
    title: de ? 'Heute zählt noch.' : es ? 'Hoy todavía importa.' : pt ? 'Hoje ainda importa.' : fr ? 'Aujourd\'hui compte encore.' : 'Today still matters.',
    body: de ? 'Deine Zukunft hat sich nicht verändert. Nur der Weg.'
      : es ? 'Tu futuro no cambió. Solo el camino.'
      : pt ? 'Seu futuro não mudou. Só o caminho.'
      : fr ? 'Ton avenir n\'a pas changé. Seulement le chemin.'
      : 'Your future didn\'t change. Only the path.',
  };
}

// ─── Comeback Notifications ───────────────────────────────────────────────────

export const comebackNotifications: Array<{ title: string; body: string }> = [
  {
    title: 'You can continue from here.',
    body: 'One reset today is enough. Progress isn\'t erased by difficult days.',
  },
  {
    title: 'Your future still exists.',
    body: 'You are not starting from zero. Come back.',
  },
  {
    title: 'One reset today is enough.',
    body: 'You don\'t need a perfect week. Just today.',
  },
  {
    title: 'Progress continues here.',
    body: 'Whatever happened, your journey still exists.',
  },
  {
    title: 'You came back before.',
    body: 'You know how to begin again. Today is that day.',
  },
  {
    title: 'Momentum can be rebuilt quietly.',
    body: 'A difficult week doesn\'t erase what you\'ve built.',
  },
];

const comebackNotificationsES: Array<{ title: string; body: string }> = [
  {
    title: 'Puedes continuar desde aquí.',
    body: 'Un reset hoy es suficiente. El progreso no se borra por días difíciles.',
  },
  {
    title: 'Tu futuro sigue existiendo.',
    body: 'No estás empezando desde cero. Vuelve.',
  },
  {
    title: 'Un reset hoy es suficiente.',
    body: 'No necesitas una semana perfecta. Solo hoy.',
  },
  {
    title: 'El progreso continúa aquí.',
    body: 'Lo que sea que haya pasado, tu camino sigue existiendo.',
  },
  {
    title: 'Ya volviste antes.',
    body: 'Sabes cómo empezar de nuevo. Hoy es ese día.',
  },
  {
    title: 'El impulso puede reconstruirse en silencio.',
    body: 'Una semana difícil no borra lo que has construido.',
  },
];

export function getComebackNotification(daysMissed: number): { title: string; body: string } {
  const pool = isEs() ? comebackNotificationsES : comebackNotifications;
  if (daysMissed >= 14) return pool[1]!;
  if (daysMissed >= 7)  return pool[0]!;
  if (daysMissed >= 3)  return pool[2]!;
  return pool[3]!;
}

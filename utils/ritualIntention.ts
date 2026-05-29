// ─── Ritual Intention Personalization ────────────────────────────────────────
// After selecting an intention in the Reset Ritual, the Today screen subtly
// adapts its micro-texts to reflect the user's current emotional state.
// Tone: calm · short · elegant · never robotic or coach-like.

import { isEs, isFr, isDe } from './langStore';

export type RitualIntention =
  | 'focus'
  | 'calm'
  | 'courage'
  | 'rest'
  | 'momentum'
  | 'clarity';

// ─── Pre-completion banners (Today screen, before reset) ──────────────────────

const INTENTION_BANNERS: Record<RitualIntention, string[]> = {
  focus:    ['Protect your attention today.', 'One thing at a time.', 'Focus grows quietly.'],
  calm:     ['You do not need to rush today.', 'Slow is still progress.', 'Calm creates clarity.'],
  courage:  ['Small brave actions still count.', 'You can begin before feeling ready.', 'Returning to yourself is enough.'],
  rest:     ['Rest is part of rebuilding.', 'You are allowed to pause.', 'Rest is part of the rhythm.'],
  momentum: ['Momentum grows quietly.', 'Keep the rhythm alive.', 'Small repetition becomes identity.'],
  clarity:  ['Clarity begins with attention.', 'You already know what matters.', 'Simplify the noise.'],
};

const INTENTION_BANNERS_ES: Record<RitualIntention, string[]> = {
  focus:    ['Protege tu atención hoy.', 'Una cosa a la vez.', 'El enfoque crece en silencio.'],
  calm:     ['No necesitas apresurarte hoy.', 'Lento también es progreso.', 'La calma crea claridad.'],
  courage:  ['Las pequeñas acciones valientes cuentan.', 'Puedes empezar antes de sentirte listo.', 'Regresar a ti mismo es suficiente.'],
  rest:     ['El descanso es parte de reconstruir.', 'Tienes permiso de pausar.', 'El descanso es parte del ritmo.'],
  momentum: ['El impulso crece en silencio.', 'Mantén el ritmo vivo.', 'La pequeña repetición se convierte en identidad.'],
  clarity:  ['La claridad comienza con la atención.', 'Ya sabes lo que importa.', 'Simplifica el ruido.'],
};

const INTENTION_BANNERS_PT: Record<RitualIntention, string[]> = {
  focus:    ['Proteja sua atenção hoje.', 'Uma coisa de cada vez.', 'O foco cresce em silêncio.'],
  calm:     ['Você não precisa se apressar hoje.', 'Devagar também é progresso.', 'A calma traz clareza.'],
  courage:  ['Pequenas ações corajosas contam.', 'Você pode começar antes de estar pronto.', 'Voltar para si mesmo já é suficiente.'],
  rest:     ['O descanso faz parte de se reconstruir.', 'Você pode parar um momento.', 'O descanso é parte do ritmo.'],
  momentum: ['O movimento cresce em silêncio.', 'Mantenha o ritmo vivo.', 'A pequena repetição vira identidade.'],
  clarity:  ['A clareza começa com atenção.', 'Você já sabe o que importa.', 'Simplifique o ruído.'],
};

// ─── Future Self card headline (shown after completion) ───────────────────────

const INTENTION_FUTURE_SELF: Record<RitualIntention, string> = {
  focus:    'You\'ve been protecting your attention. It\'s working.',
  calm:     'You\'ve been creating quieter moments. That matters.',
  courage:  'Small acts of courage compound over time.',
  rest:     'You\'ve been giving yourself permission to pause.',
  momentum: 'Steadiness is forming.',
  clarity:  'You\'ve been clearing space. Clarity follows.',
};

const INTENTION_FUTURE_SELF_ES: Record<RitualIntention, string> = {
  focus:    'Has estado protegiendo tu atención. Está funcionando.',
  calm:     'Has estado creando momentos más tranquilos. Eso importa.',
  courage:  'Los pequeños actos de valentía se acumulan con el tiempo.',
  rest:     'Has estado dándote permiso de pausar.',
  momentum: 'La constancia está tomando forma.',
  clarity:  'Has estado despejando espacio. La claridad sigue.',
};

const INTENTION_FUTURE_SELF_PT: Record<RitualIntention, string> = {
  focus:    'Você tem protegido sua atenção. Está funcionando.',
  calm:     'Você tem criado momentos mais tranquilos. Isso importa.',
  courage:  'Pequenos atos de coragem se acumulam com o tempo.',
  rest:     'Você tem se dado permissão para parar.',
  momentum: 'A constância está se formando.',
  clarity:  'Você tem aberto espaço. A clareza vem depois.',
};

// ─── Ritual completion message override ──────────────────────────────────────

const INTENTION_COMPLETION: Record<RitualIntention, string> = {
  focus:    'Your attention is protected.',
  calm:     'You returned to yourself.',
  courage:  'Fear does not decide your direction.',
  rest:     'Your energy matters too.',
  momentum: 'Momentum continues from here.',
  clarity:  'Your direction is becoming clearer.',
};

const INTENTION_COMPLETION_ES: Record<RitualIntention, string> = {
  focus:    'Tu atención está protegida.',
  calm:     'Regresaste a ti mismo.',
  courage:  'El miedo no decide tu dirección.',
  rest:     'Tu energía también importa.',
  momentum: 'El impulso continúa desde aquí.',
  clarity:  'Tu dirección se está volviendo más clara.',
};

const INTENTION_COMPLETION_PT: Record<RitualIntention, string> = {
  focus:    'Sua atenção está protegida.',
  calm:     'Você voltou para você.',
  courage:  'O medo não decide sua direção.',
  rest:     'Sua energia também importa.',
  momentum: 'O movimento continua daqui.',
  clarity:  'Sua direção está mais clara agora.',
};

// ─── Reflect questions (phase 5 — after intention selected) ──────────────────

const REFLECT_QUESTIONS: Record<RitualIntention, string> = {
  focus:    'What single thing would\nmove your day forward?',
  calm:     'What can you gently\nrelease right now?',
  clarity:  'What actually matters\nmost right now?',
  courage:  'What small step feels\ntrue to who you\'re becoming?',
  rest:     'What does your body\nneed most today?',
  momentum: 'What would keep your\nrhythm alive today?',
};

const REFLECT_QUESTIONS_ES: Record<RitualIntention, string> = {
  focus:    '¿Qué una cosa avanzaría\ntu día hoy?',
  calm:     '¿Qué puedes soltar\ngentilmente ahora?',
  clarity:  '¿Qué importa más\nen este momento?',
  courage:  '¿Qué pequeño paso se siente\nverdadero hoy?',
  rest:     '¿Qué necesita más\ntu cuerpo hoy?',
  momentum: '¿Qué mantendría vivo\ntu ritmo hoy?',
};

const REFLECT_QUESTIONS_PT: Record<RitualIntention, string> = {
  focus:    'O que moveria seu\ndia para frente?',
  calm:     'O que pode ficar\nmais leve agora?',
  clarity:  'O que de fato\nmais importa agora?',
  courage:  'Que passo parece\nverdadeiro pra você agora?',
  rest:     'O que seu corpo\nmais precisa hoje?',
  momentum: 'O que manteria\nseu ritmo vivo hoje?',
};

const INTENTION_BANNERS_FR: Record<RitualIntention, string[]> = {
  focus:    ['Protège ton attention aujourd\'hui.', 'Une chose à la fois.', 'Le focus grandit tranquillement.'],
  calm:     ['Tu n\'as pas besoin de te précipiter.', 'Lent, c\'est encore du progrès.', 'Le calme crée de la clarté.'],
  courage:  ['Les petits actes courageux comptent.', 'Tu peux commencer avant de te sentir prêt.', 'Revenir à toi-même est suffisant.'],
  rest:     ['Le repos fait partie de la reconstruction.', 'Tu as la permission de faire une pause.', 'Le repos fait partie du rythme.'],
  momentum: ['L\'élan grandit tranquillement.', 'Garde le rythme vivant.', 'La petite répétition devient identité.'],
  clarity:  ['La clarté commence par l\'attention.', 'Tu sais déjà ce qui compte.', 'Simplifie le bruit.'],
};

const INTENTION_FUTURE_SELF_FR: Record<RitualIntention, string> = {
  focus:    'Tu as protégé ton attention. Ça fonctionne.',
  calm:     'Tu as créé des moments plus calmes. Ça compte.',
  courage:  'Les petits actes de courage s\'accumulent avec le temps.',
  rest:     'Tu t\'es accordé la permission de faire une pause.',
  momentum: 'La constance se forme.',
  clarity:  'Tu as dégagé de l\'espace. La clarté suit.',
};

const INTENTION_COMPLETION_FR: Record<RitualIntention, string> = {
  focus:    'Ton attention est protégée.',
  calm:     'Tu es revenu à toi-même.',
  courage:  'La peur ne décide pas de ta direction.',
  rest:     'Ton énergie compte aussi.',
  momentum: 'L\'élan continue d\'ici.',
  clarity:  'Ta direction devient plus claire.',
};

const REFLECT_QUESTIONS_FR: Record<RitualIntention, string> = {
  focus:    'Quelle seule chose\nferait avancer ta journée ?',
  calm:     'Qu\'est-ce que tu peux\nlâcher doucement maintenant ?',
  clarity:  'Qu\'est-ce qui compte\nvraiment le plus maintenant ?',
  courage:  'Quel petit pas te semble\nvrai à qui tu deviens ?',
  rest:     'De quoi ton corps\na-t-il le plus besoin aujourd\'hui ?',
  momentum: 'Qu\'est-ce qui garderait\nton rythme vivant aujourd\'hui ?',
};

// ─── Intention label (human-readable, localized) ──────────────────────────────

const INTENTION_LABELS_ES: Record<RitualIntention, string> = {
  focus:    'Enfoque',
  calm:     'Calma',
  courage:  'Valentía',
  rest:     'Descanso',
  momentum: 'Impulso',
  clarity:  'Claridad',
};

const INTENTION_LABELS_PT: Record<RitualIntention, string> = {
  focus:    'Foco',
  calm:     'Calma',
  courage:  'Coragem',
  rest:     'Descanso',
  momentum: 'Movimento',
  clarity:  'Clareza',
};

const INTENTION_LABELS_FR: Record<RitualIntention, string> = {
  focus:    'Focus',
  calm:     'Calme',
  courage:  'Courage',
  rest:     'Repos',
  momentum: 'Élan',
  clarity:  'Clarté',
};

const INTENTION_LABELS_DE: Record<RitualIntention, string> = {
  focus:    'Fokus',
  calm:     'Ruhe',
  courage:  'Mut',
  rest:     'Erholung',
  momentum: 'Schwung',
  clarity:  'Klarheit',
};

// ─── German data ──────────────────────────────────────────────────────────────

const INTENTION_BANNERS_DE: Record<RitualIntention, string[]> = {
  focus:    ['Schütze heute deine Aufmerksamkeit.', 'Eine Sache nach der anderen.', 'Fokus wächst leise.'],
  calm:     ['Du musst dich heute nicht beeilen.', 'Langsam ist auch Fortschritt.', 'Ruhe bringt Klarheit.'],
  courage:  ['Kleine mutige Handlungen zählen.', 'Du kannst beginnen, bevor du bereit bist.', 'Zu dir selbst zurückzukehren reicht.'],
  rest:     ['Ruhe ist Teil des Wiederaufbaus.', 'Du darfst innehalten.', 'Ruhe gehört zum Rhythmus.'],
  momentum: ['Schwung wächst leise.', 'Halte den Rhythmus lebendig.', 'Kleine Wiederholung wird zur Identität.'],
  clarity:  ['Klarheit beginnt mit Aufmerksamkeit.', 'Du weißt bereits, was zählt.', 'Vereinfache das Rauschen.'],
};

const INTENTION_FUTURE_SELF_DE: Record<RitualIntention, string> = {
  focus:    'Du hast deine Aufmerksamkeit geschützt. Es wirkt.',
  calm:     'Du hast ruhigere Momente geschaffen. Das zählt.',
  courage:  'Kleine mutige Handlungen summieren sich mit der Zeit.',
  rest:     'Du hast dir erlaubt, innezuhalten.',
  momentum: 'Beständigkeit nimmt Form an.',
  clarity:  'Du hast Raum geschaffen. Klarheit folgt.',
};

const INTENTION_COMPLETION_DE: Record<RitualIntention, string> = {
  focus:    'Deine Aufmerksamkeit ist geschützt.',
  calm:     'Du bist zu dir zurückgekehrt.',
  courage:  'Angst entscheidet nicht deine Richtung.',
  rest:     'Deine Energie zählt auch.',
  momentum: 'Der Schwung setzt sich von hier fort.',
  clarity:  'Deine Richtung wird klarer.',
};

const REFLECT_QUESTIONS_DE: Record<RitualIntention, string> = {
  focus:    'Welche eine Sache\nbringt deinen Tag weiter?',
  calm:     'Was kannst du gerade\nsanft loslassen?',
  clarity:  'Was zählt gerade\ntatsächlich am meisten?',
  courage:  'Welcher kleine Schritt fühlt sich\nstimmig für dich an?',
  rest:     'Was braucht dein Körper\nheute am meisten?',
  momentum: 'Was würde deinen\nRhythmus heute lebendig halten?',
};

// ─── Selectors ────────────────────────────────────────────────────────────────

function pick<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

function getBanners(lang?: string): Record<RitualIntention, string[]> {
  if (lang === 'pt') return INTENTION_BANNERS_PT;
  if (lang === 'es' || isEs()) return INTENTION_BANNERS_ES;
  if (lang === 'fr' || isFr()) return INTENTION_BANNERS_FR;
  if (lang === 'de' || isDe()) return INTENTION_BANNERS_DE;
  return INTENTION_BANNERS;
}

/** Returns the pre-completion micro-banner for the Today screen. */
export function getIntentionBanner(intention: RitualIntention, seed: number, lang?: string): string {
  return pick(getBanners(lang)[intention], seed);
}

/** Returns the Future Self card headline override. */
export function getIntentionFutureSelfMessage(intention: RitualIntention, lang?: string): string {
  if (lang === 'pt') return INTENTION_FUTURE_SELF_PT[intention];
  if (lang === 'es' || isEs()) return INTENTION_FUTURE_SELF_ES[intention];
  if (lang === 'fr' || isFr()) return INTENTION_FUTURE_SELF_FR[intention];
  if (lang === 'de' || isDe()) return INTENTION_FUTURE_SELF_DE[intention];
  return INTENTION_FUTURE_SELF[intention];
}

/** Returns the Reset Ritual step-5 completion headline. */
export function getIntentionCompletionMessage(intention: RitualIntention, lang?: string): string {
  if (lang === 'pt') return INTENTION_COMPLETION_PT[intention];
  if (lang === 'es' || isEs()) return INTENTION_COMPLETION_ES[intention];
  if (lang === 'fr' || isFr()) return INTENTION_COMPLETION_FR[intention];
  if (lang === 'de' || isDe()) return INTENTION_COMPLETION_DE[intention];
  return INTENTION_COMPLETION[intention];
}

/** Returns the reflect phase question for the given intention. */
export function getIntentionReflectQuestion(intention: RitualIntention, lang?: string): string {
  if (lang === 'pt') return REFLECT_QUESTIONS_PT[intention];
  if (lang === 'es' || isEs()) return REFLECT_QUESTIONS_ES[intention];
  if (lang === 'fr' || isFr()) return REFLECT_QUESTIONS_FR[intention];
  if (lang === 'de' || isDe()) return REFLECT_QUESTIONS_DE[intention];
  return REFLECT_QUESTIONS[intention];
}

/** Human-readable label for the intention badge. */
export function getIntentionLabel(intention: RitualIntention, lang?: string): string {
  if (lang === 'es' || isEs()) return INTENTION_LABELS_ES[intention];
  if (lang === 'pt') return INTENTION_LABELS_PT[intention];
  if (lang === 'fr' || isFr()) return INTENTION_LABELS_FR[intention];
  if (lang === 'de' || isDe()) return INTENTION_LABELS_DE[intention];
  return intention.charAt(0).toUpperCase() + intention.slice(1);
}

// ─── Emotional Personalization Engine ────────────────────────────────────────
// Each user has one primary emotional profile, detected from onboarding answers.
// Every content type in the app adapts to this profile.
// Tone rule: profile copy must feel MORE personal than generic copy, never more
// intense. The personalization should feel calm and seen, not clinical.

import type { NotifMessage } from './notificationContent';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmotionalProfile = 'focus' | 'calm' | 'confidence' | 'burnout';

export interface ProfileMeta {
  id: EmotionalProfile;
  label: string;
  subtitle: string;
  description: string;
}

// ─── Profile metadata ─────────────────────────────────────────────────────────

export const PROFILE_META: Record<EmotionalProfile, ProfileMeta> = {
  focus: {
    id: 'focus',
    label: 'Focus & Discipline',
    subtitle: 'Reduce distractions and build consistency.',
    description: 'Your journey is about protecting your attention and building quiet momentum.',
  },
  calm: {
    id: 'calm',
    label: 'Calm & Mental Clarity',
    subtitle: 'Slow down mentally and feel more grounded.',
    description: 'Your journey is about finding stillness in the middle of everything.',
  },
  confidence: {
    id: 'confidence',
    label: 'Self-Confidence',
    subtitle: 'Rebuild trust in yourself little by little.',
    description: 'Your journey is about keeping small promises to yourself — and watching trust return.',
  },
  burnout: {
    id: 'burnout',
    label: 'Burnout Recovery',
    subtitle: 'Recover from exhaustion without pressure.',
    description: 'Your journey is about rebuilding gently. No rush. No pressure. Just small returns.',
  },
};

export const ALL_PROFILES = Object.values(PROFILE_META);

// ─── Helper ───────────────────────────────────────────────────────────────────

function pick<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

// ─── Pre-completion banners (Today screen, before reset) ──────────────────────
// Short, one-line nudges. Appear above the daily card.

const PROFILE_BANNERS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Protect your attention today.',
    'Momentum grows quietly.',
    'Consistency creates clarity.',
    'One focused reset builds the day.',
    'Your discipline is becoming visible.',
  ],
  calm: [
    'You do not need to carry everything today.',
    'Breathe before rushing.',
    'Calmness is being rebuilt.',
    'One gentle reset is enough.',
    'There is no hurry here.',
  ],
  confidence: [
    'Trust is built through repetition.',
    'You are keeping promises to yourself.',
    'Confidence grows quietly.',
    'You showed up. That proves something.',
    'Showing up is the most trustworthy thing you can do.',
  ],
  burnout: [
    'Rest is part of rebuilding.',
    'You are allowed to slow down.',
    'Healing does not require perfection.',
    'One small reset is enough today.',
    'Small is more than enough.',
  ],
};

const ES_PROFILE_BANNERS: Record<EmotionalProfile, string[]> = {
  focus:      ['Protege tu atención hoy.', 'Una cosa a la vez.', 'El enfoque crece en silencio.', 'Construye un día a la vez.'],
  calm:       ['No necesitas apresurarte hoy.', 'Lento también es progreso.', 'La calma crea claridad.', 'Un regreso gentil.'],
  confidence: ['La confianza se construye a través de la repetición.', 'Estás cumpliendo promesas contigo mismo.', 'La confianza crece en silencio.', 'Sigue mostrándote.'],
  burnout:    ['El descanso es parte de reconstruir.', 'Puedes pausar.', 'La recuperación también es productiva.', 'Pequeño es suficiente.'],
};

const FR_PROFILE_BANNERS: Record<EmotionalProfile, string[]> = {
  focus:      ['Protège ton attention aujourd\'hui.', 'Une chose à la fois.', 'Le focus grandit tranquillement.', 'Construis un jour à la fois.'],
  calm:       ['Tu n\'as pas besoin de te précipiter aujourd\'hui.', 'Lent, c\'est encore du progrès.', 'Le calme crée de la clarté.', 'Un retour doux.'],
  confidence: ['La confiance se construit par la répétition.', 'Tu tiens des promesses que tu te fais.', 'La confiance grandit tranquillement.', 'Continue à te présenter.'],
  burnout:    ['Le repos fait partie de la reconstruction.', 'Tu peux faire une pause.', 'La récupération est aussi productive.', 'Petit suffit.'],
};

const PT_PROFILE_BANNERS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Proteja sua atenção hoje.',
    'Uma coisa de cada vez.',
    'O momentum cresce em silêncio.',
    'Constância cria clareza.',
    'Um reset focado já constrói o dia.',
  ],
  calm: [
    'Você não precisa carregar tudo hoje.',
    'Respire antes de correr.',
    'A calma está sendo reconstruída.',
    'Um reset gentil já é suficiente.',
    'Não há pressa aqui.',
  ],
  confidence: [
    'A confiança cresce pela repetição.',
    'Você está cumprindo promessas consigo.',
    'A autoconfiança cresce devagar.',
    'Você apareceu. Isso já prova algo.',
    'Aparecer é a coisa mais honesta que você pode fazer.',
  ],
  burnout: [
    'O descanso faz parte da reconstrução.',
    'Você tem permissão para desacelerar.',
    'Recuperação não exige perfeição.',
    'Um pequeno reset já é suficiente hoje.',
    'Pequeno é mais do que suficiente.',
  ],
};

const ES_PROFILE_NARRATIVES: Record<EmotionalProfile, string[]> = {
  focus:      ['Tu atención es tu mayor activo. Protégela cada día.', 'Aquello a lo que vuelves también te transforma.', 'La disciplina se acumula — cada regreso suma.'],
  calm:       ['No necesitas tenerlo todo resuelto hoy.', 'El espacio mental se reconstruye un momento tranquilo a la vez.', 'La calma no es la ausencia de ruido. Es la elección de no añadir más.'],
  confidence: ['Cada vez que apareces, cumples una promesa contigo mismo.', 'La confianza en ti mismo se construye a través de acciones pequeñas y consistentes.', 'La fiabilidad hacia ti mismo es el fundamento de la confianza.'],
  burnout:    ['No necesitas estar al 100% para aparecer.', 'Los regresos pequeños son más poderosos que los reinicios perfectos.', 'Ser gentil contigo mismo es parte del proceso.'],
};

const FR_PROFILE_NARRATIVES: Record<EmotionalProfile, string[]> = {
  focus:      ['Ton attention est ton atout le plus précieux. Protège-la.', 'L\'élan grandit avec chaque reset quotidien.', 'La discipline s\'accumule — chaque retour compte.', 'Ce que tu protèges aujourd\'hui façonne qui tu deviens.', 'La constance crée la clarté que tu cherches.'],
  calm:       ['Tu n\'as pas besoin de tout résoudre aujourd\'hui.', 'L\'espace mental se reconstruit un moment tranquille à la fois.', 'Le calme n\'est pas l\'absence de bruit. C\'est le choix de ne pas en ajouter.', 'Tu peux bouger lentement aujourd\'hui.', 'Ce dont tu as le plus besoin est déjà là.'],
  confidence: ['Chaque fois que tu te présentes, tu tiens une promesse que tu te fais.', 'La confiance en soi se construit à travers de petites actions constantes.', 'Tu te prouves quelque chose à chaque reset.', 'Être fiable envers toi-même est le fondement de la confiance.', 'Chaque jour où tu te présentes, tu réécris l\'histoire que tu te racontes.'],
  burnout:    ['Tu n\'as pas besoin d\'être à 100% pour te présenter.', 'Les petits retours sont plus puissants que les redémarrages parfaits.', 'La récupération n\'est pas linéaire. Aujourd\'hui, un pas suffit.', 'Être doux avec toi-même fait partie du processus.', 'Tu reconstruis. Ça demande du courage, pas de la force.'],
};

const PT_PROFILE_NARRATIVES: Record<EmotionalProfile, string[]> = {
  focus: [
    'Sua atenção é seu maior recurso. Proteja-a.',
    'O momentum cresce com cada reset diário.',
    'Disciplina se acumula — cada retorno conta.',
    'O que você protege hoje molda quem você se torna.',
    'Constância cria a clareza que você está buscando.',
  ],
  calm: [
    'Você não precisa resolver tudo hoje.',
    'O espaço mental se reconstrói um momento tranquilo de cada vez.',
    'Calma não é ausência de ruído. É a escolha de não adicionar mais.',
    'Você tem permissão para se mover devagar hoje.',
    'O que você mais precisa já está ao alcance.',
  ],
  confidence: [
    'Cada vez que você aparece, cumpre uma promessa consigo.',
    'Confiança em si mesmo cresce através de pequenas ações consistentes.',
    'Você está provando algo a cada reset.',
    'Ser confiável consigo mesmo é a base da autoconfiança.',
    'Cada dia que você aparece, reescreve a história que conta sobre si.',
  ],
  burnout: [
    'Você não precisa estar em 100% para aparecer.',
    'Pequenos retornos são mais poderosos do que reinícios perfeitos.',
    'Recuperação não é linear. Hoje, um passo já é suficiente.',
    'Ser gentil consigo mesmo faz parte do processo.',
    'Você está reconstruindo. Isso exige coragem, não força.',
  ],
};

export function getProfileBanner(profile: EmotionalProfile, seed: number): string {
  if (isEs()) return pick(ES_PROFILE_BANNERS[profile], seed);
  if (isPt()) return pick(PT_PROFILE_BANNERS[profile], seed);
  if (isFr()) return pick(FR_PROFILE_BANNERS[profile], seed);
  return pick(PROFILE_BANNERS[profile], seed);
}

// ─── Profile narratives (Today header / progress copy) ───────────────────────

const PROFILE_NARRATIVES: Record<EmotionalProfile, string[]> = {
  focus: [
    'Your attention is your greatest asset. Protect it daily.',
    'Momentum is building through your daily commitment.',
    'Discipline compounds — every reset adds to the total.',
    'What you protect today shapes who you become.',
    'Consistency creates the clarity you\'re looking for.',
  ],
  calm: [
    'You don\'t need to have everything figured out today.',
    'Mental space is rebuilt one quiet moment at a time.',
    'Calmness is not the absence of noise. It\'s the choice to not add to it.',
    'You are allowed to move slowly today.',
    'What you need most is already within reach.',
  ],
  confidence: [
    'Every time you show up, you keep a promise to yourself.',
    'Trust in yourself is built through small, consistent actions.',
    'You are proving something with every reset.',
    'Reliability to yourself is the foundation of confidence.',
    'Each day you show up, you rewrite the story you tell yourself.',
  ],
  burnout: [
    'You don\'t need to be at 100% to show up.',
    'Small returns are more powerful than perfect restarts.',
    'Recovery is not linear. Today, one step is enough.',
    'Being gentle with yourself is part of the process.',
    'You are rebuilding. That takes courage, not force.',
  ],
};

export function getProfileNarrative(profile: EmotionalProfile, seed: number): string {
  if (isEs()) return pick(ES_PROFILE_NARRATIVES[profile], seed);
  if (isPt()) return pick(PT_PROFILE_NARRATIVES[profile], seed);
  if (isFr()) return pick(FR_PROFILE_NARRATIVES[profile], seed);
  return pick(PROFILE_NARRATIVES[profile], seed);
}

// ─── Notifications ────────────────────────────────────────────────────────────

const PROFILE_NOTIFICATIONS: Record<EmotionalProfile, NotifMessage[]> = {
  focus: [
    { title: 'Protect your focus today.',                body: 'Your attention is valuable. Guard it carefully.' },
    { title: 'Momentum grows quietly.',                  body: 'One focused reset builds the day.' },
    { title: 'Consistency is building.',                 body: 'Your discipline is becoming visible.' },
    { title: 'Your attention shapes your future.',       body: 'Protect it — one reset at a time.' },
    { title: 'Focus is a choice.',                       body: 'Make it. One reset. One direction.' },
  ],
  calm: [
    { title: 'Pause. Breathe. Continue softly.',         body: 'You don\'t need to rush today.' },
    { title: 'One gentle reset is enough.',              body: 'No pressure. Just one small step.' },
    { title: 'You do not need to carry everything.',     body: 'Start with today. That\'s all.' },
    { title: 'Stillness begins with one small choice.',  body: 'Your reset is ready.' },
    { title: 'Today is smaller than it feels.',          body: 'One quiet reset. That\'s it.' },
  ],
  confidence: [
    { title: 'Keep showing up for yourself.',            body: 'Every day you show up, you rebuild trust.' },
    { title: 'You kept your word yesterday.',            body: 'Do it again today.' },
    { title: 'Small consistency rebuilds big trust.',    body: 'Your reset is one more kept promise.' },
    { title: 'You are more reliable than you think.',   body: 'Prove it with one more reset.' },
    { title: 'Confidence is showing up anyway.',        body: 'Today is your chance to prove it again.' },
  ],
  burnout: [
    { title: 'One gentle reset is enough today.',       body: 'You don\'t need more than this.' },
    { title: 'Small is enough.',                        body: 'You don\'t need a perfect day. Just this one reset.' },
    { title: 'You are allowed to begin gently.',        body: 'Rest is part of the process.' },
    { title: 'No pressure today.',                      body: 'Just show up — however that looks.' },
    { title: 'Rebuilding takes time.',                  body: 'One reset is part of that. Begin.' },
  ],
};

export function getProfileNotification(
  profile: EmotionalProfile,
  seed: number,
): NotifMessage {
  return pick(PROFILE_NOTIFICATIONS[profile], seed);
}

// ─── Reflections ──────────────────────────────────────────────────────────────

const PROFILE_REFLECTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'What distracted you today?',
    'What protected your focus today?',
    'What demanded your attention that didn\'t deserve it?',
    'When did you feel most clear-headed today?',
    'What would tomorrow look like with more focus than today?',
  ],
  calm: [
    'What helped you feel grounded today?',
    'What moment felt peaceful today?',
    'What was heavier than it needed to be?',
    'Where did you find stillness today?',
    'What would it feel like to carry less tomorrow?',
  ],
  confidence: [
    'What made you proud today?',
    'Where did you keep your word to yourself today?',
    'What would you do differently if you trusted yourself more?',
    'What did you surprise yourself with today?',
    'Where did your confidence show up — even quietly?',
  ],
  burnout: [
    'What gave you peace today?',
    'What were you gentle with yourself about?',
    'What did you give yourself permission not to do?',
    'Where did you find rest — even briefly?',
    'What felt lighter than you expected?',
  ],
};

const FR_PROFILE_REFLECTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Qu\'est-ce qui t\'a distrait aujourd\'hui ?',
    'Qu\'est-ce qui a protégé ton focus aujourd\'hui ?',
    'Qu\'est-ce qui a demandé ton attention sans le mériter ?',
    'Quand t\'es-tu senti le plus clair aujourd\'hui ?',
    'À quoi ressemblerait demain avec plus de focus ?',
  ],
  calm: [
    'Qu\'est-ce qui t\'a aidé à te sentir présent aujourd\'hui ?',
    'Quel moment a été tranquille aujourd\'hui ?',
    'Qu\'est-ce qui a pesé plus que nécessaire ?',
    'Où as-tu trouvé la tranquillité aujourd\'hui ?',
    'Comment serait-ce de porter moins demain ?',
  ],
  confidence: [
    'De quoi es-tu fier aujourd\'hui ?',
    'Où as-tu tenu ta parole envers toi-même aujourd\'hui ?',
    'Que ferais-tu différemment si tu te faisais plus confiance ?',
    'Avec quoi t\'es-tu surpris aujourd\'hui ?',
    'Où ta confiance s\'est-elle montrée — même discrètement ?',
  ],
  burnout: [
    'Qu\'est-ce qui t\'a apporté de la paix aujourd\'hui ?',
    'Avec quoi as-tu été doux avec toi-même aujourd\'hui ?',
    'À quoi t\'es-tu permis de ne pas faire ?',
    'Où as-tu trouvé du repos — même brièvement ?',
    'Qu\'est-ce qui a été plus léger que prévu ?',
  ],
};

const ES_PROFILE_REFLECTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    '¿Qué te distrajo hoy?',
    '¿Qué protegió tu enfoque hoy?',
    '¿Qué exigió tu atención sin merecerla?',
    '¿Cuándo te sentiste más claro hoy?',
    '¿Cómo sería mañana con más enfoque que hoy?',
  ],
  calm: [
    '¿Qué te ayudó a sentirte presente hoy?',
    '¿Qué momento fue tranquilo hoy?',
    '¿Qué pesó más de lo necesario?',
    '¿Dónde encontraste quietud hoy?',
    '¿Cómo sería cargar menos mañana?',
  ],
  confidence: [
    '¿De qué te sentiste orgulloso hoy?',
    '¿Dónde cumpliste tu palabra contigo mismo hoy?',
    '¿Qué harías diferente si confiaras más en ti?',
    '¿Con qué te sorprendiste hoy?',
    '¿Dónde apareció tu confianza — aunque silenciosamente?',
  ],
  burnout: [
    '¿Qué te dio paz hoy?',
    '¿Con qué fuiste gentil contigo mismo hoy?',
    '¿A qué te permitiste no hacer?',
    '¿Dónde encontraste descanso — aunque brevemente?',
    '¿Qué fue más ligero de lo esperado?',
  ],
};

const PT_PROFILE_REFLECTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'O que te distraiu hoje?',
    'O que protegeu seu foco hoje?',
    'O que exigiu atenção sem merecer?',
    'Quando você se sentiu mais claro hoje?',
    'Como seria amanhã com mais foco do que hoje?',
  ],
  calm: [
    'O que te ajudou a se sentir presente hoje?',
    'Qual momento foi tranquilo hoje?',
    'O que pesou mais do que precisava?',
    'Onde você encontrou quietude hoje?',
    'Como seria carregar menos amanhã?',
  ],
  confidence: [
    'O que te deu orgulho hoje?',
    'Onde você cumpriu sua palavra consigo hoje?',
    'O que faria diferente se confiasse mais em si?',
    'Com o que você se surpreendeu hoje?',
    'Onde sua confiança apareceu — mesmo que silenciosamente?',
  ],
  burnout: [
    'O que trouxe paz hoje?',
    'Com o que você foi gentil consigo hoje?',
    'O que você se permitiu não fazer?',
    'Onde encontrou descanso — mesmo que brevemente?',
    'O que ficou mais leve do que esperava?',
  ],
};

export function getProfileReflection(profile: EmotionalProfile, seed: number): string {
  if (isEs()) return pick(ES_PROFILE_REFLECTIONS[profile], seed);
  if (isPt()) return pick(PT_PROFILE_REFLECTIONS[profile], seed);
  if (isFr()) return pick(FR_PROFILE_REFLECTIONS[profile], seed);
  return pick(PROFILE_REFLECTIONS[profile], seed);
}

// ─── Future self messages ─────────────────────────────────────────────────────

const PROFILE_FUTURE_SELF: Record<EmotionalProfile, string[]> = {
  focus: [
    'You are becoming harder to distract.',
    'Focus is becoming your default.',
    'Distraction has less power over you now.',
    'Your attention is strengthening with every reset.',
    'The version of you that stays focused is being built daily.',
  ],
  calm: [
    'Your mind is learning to slow down.',
    'Calm is becoming your default.',
    'Overwhelm has less power over you now.',
    'You are building mental space, one reset at a time.',
    'The version of you that feels grounded is becoming real.',
  ],
  confidence: [
    'You are rebuilding trust with yourself.',
    'Confidence is earned one kept promise at a time.',
    'You are becoming more reliable to yourself.',
    'Self-trust is growing through every return.',
    'The version of you that believes in yourself is being built.',
  ],
  burnout: [
    'Recovery begins through gentleness.',
    'You are rebuilding without pressure.',
    'Rest is not giving up. It\'s coming back.',
    'You are allowed to rebuild slowly.',
    'The version of you that feels restored is on the way.',
  ],
};

const FR_PROFILE_FUTURE_SELF: Record<EmotionalProfile, string[]> = {
  focus: [
    'Tu deviens plus difficile à distraire.',
    'Le focus est en train de devenir ton état naturel.',
    'La distraction a moins de prise sur toi maintenant.',
    'Ton attention se renforce à chaque reset.',
    'La version de toi qui reste concentré se construit chaque jour.',
  ],
  calm: [
    'Ton esprit apprend à ralentir.',
    'Le calme est en train de devenir ton état naturel.',
    'La surcharge a moins de prise sur toi maintenant.',
    'Tu construis de l\'espace mental, un reset à la fois.',
    'La version de toi qui se sent ancrée devient réelle.',
  ],
  confidence: [
    'Tu reconstruis la confiance en toi.',
    'La confiance se gagne une promesse tenue à la fois.',
    'Tu deviens plus fiable envers toi-même.',
    'La confiance en soi grandit à chaque retour.',
    'La version de toi qui croit en toi se construit.',
  ],
  burnout: [
    'La récupération commence par la douceur.',
    'Tu te reconstruis sans pression.',
    'Le repos n\'est pas abandonner. C\'est revenir.',
    'Tu peux te reconstruire lentement.',
    'La version de toi qui se sent restaurée est en chemin.',
  ],
};

const ES_PROFILE_FUTURE_SELF: Record<EmotionalProfile, string[]> = {
  focus: [
    'Te estás volviendo más difícil de distraer.',
    'El enfoque se está convirtiendo en tu modo por defecto.',
    'La distracción tiene menos poder sobre ti ahora.',
    'Tu atención se fortalece con cada regreso.',
    'La versión de ti que permanece enfocada se construye cada día.',
  ],
  calm: [
    'Tu mente está aprendiendo a ir más despacio.',
    'La calma se está convirtiendo en tu modo por defecto.',
    'La sobrecarga tiene menos poder sobre ti ahora.',
    'Estás construyendo espacio mental, un regreso a la vez.',
    'La versión de ti que se siente anclada se está volviendo real.',
  ],
  confidence: [
    'Estás reconstruyendo la confianza contigo mismo.',
    'La confianza se gana una promesa cumplida a la vez.',
    'Te estás volviendo más fiable para ti mismo.',
    'La confianza en ti crece con cada regreso.',
    'La versión de ti que cree en sí misma se está construyendo.',
  ],
  burnout: [
    'La recuperación comienza con gentileza.',
    'Te estás reconstruyendo sin presión.',
    'Descansar no es rendirse. Es volver.',
    'Puedes reconstruirte despacio.',
    'La versión de ti que se siente restaurada está en camino.',
  ],
};

const PT_PROFILE_FUTURE_SELF: Record<EmotionalProfile, string[]> = {
  focus: [
    'Você está se tornando mais difícil de distrair.',
    'O foco está se tornando seu estado natural.',
    'A distração tem menos poder sobre você agora.',
    'Sua atenção se fortalece a cada reset.',
    'A versão de você que permanece focada está sendo construída todo dia.',
  ],
  calm: [
    'Sua mente está aprendendo a desacelerar.',
    'A calma está se tornando seu estado natural.',
    'A sobrecarga tem menos poder sobre você agora.',
    'Você está construindo espaço mental, um reset de cada vez.',
    'A versão de você que se sente ancorada está se tornando real.',
  ],
  confidence: [
    'Você está reconstruindo confiança consigo.',
    'A autoconfiança se ganha uma promessa cumprida de cada vez.',
    'Você está se tornando mais confiável para si mesmo.',
    'A confiança em si cresce a cada retorno.',
    'A versão de você que acredita em si está sendo construída.',
  ],
  burnout: [
    'A recuperação começa pela gentileza.',
    'Você está se reconstruindo sem pressão.',
    'Descanso não é desistir. É voltar.',
    'Você tem permissão para se reconstruir devagar.',
    'A versão de você que se sente restaurada está a caminho.',
  ],
};

export function getProfileFutureSelfMessage(
  profile: EmotionalProfile,
  seed: number,
): string {
  if (isEs()) return pick(ES_PROFILE_FUTURE_SELF[profile], seed);
  if (isPt()) return pick(PT_PROFILE_FUTURE_SELF[profile], seed);
  if (isFr()) return pick(FR_PROFILE_FUTURE_SELF[profile], seed);
  return pick(PROFILE_FUTURE_SELF[profile], seed);
}

// ─── Milestone narratives ─────────────────────────────────────────────────────

const PROFILE_MILESTONES: Record<EmotionalProfile, { title: string; sub: string }> = {
  focus: {
    title: 'Your discipline is becoming visible.',
    sub: 'Consistency like this is rare.',
  },
  calm: {
    title: 'You are choosing calm over chaos.',
    sub: 'One quiet day at a time.',
  },
  confidence: {
    title: 'You proved something to yourself.',
    sub: 'Trust is earned in moments like this.',
  },
  burnout: {
    title: 'You showed up even when it was hard.',
    sub: 'That takes more strength than most know.',
  },
};

const ES_PROFILE_MILESTONES: Record<EmotionalProfile, { title: string; sub: string }> = {
  focus:      { title: 'Tu disciplina se está volviendo visible.',         sub: 'Una consistencia así es poco común.' },
  calm:       { title: 'Estás eligiendo la calma sobre el caos.',          sub: 'Un día tranquilo a la vez.' },
  confidence: { title: 'Te probaste algo a ti mismo.',                     sub: 'La confianza se gana en momentos como este.' },
  burnout:    { title: 'Apareciste aunque era difícil.',                   sub: 'Eso requiere más fortaleza de lo que la mayoría imagina.' },
};

const FR_PROFILE_MILESTONES: Record<EmotionalProfile, { title: string; sub: string }> = {
  focus:      { title: 'Ta discipline devient visible.',                   sub: 'Une constance comme celle-là est rare.' },
  calm:       { title: 'Tu choisis le calme sur le chaos.',                sub: 'Un jour tranquille à la fois.' },
  confidence: { title: 'Tu t\'es prouvé quelque chose.',                   sub: 'La confiance se gagne dans des moments comme celui-ci.' },
  burnout:    { title: 'Tu t\'es présenté même quand c\'était difficile.', sub: 'Ça demande plus de force que la plupart ne le savent.' },
};

const PT_PROFILE_MILESTONES: Record<EmotionalProfile, { title: string; sub: string }> = {
  focus:      { title: 'Sua disciplina está se tornando visível.',         sub: 'Consistência assim é rara.' },
  calm:       { title: 'Você está escolhendo a calma em vez do caos.',     sub: 'Um dia tranquilo de cada vez.' },
  confidence: { title: 'Você provou algo a si mesmo.',                     sub: 'A confiança se ganha em momentos como este.' },
  burnout:    { title: 'Você apareceu mesmo quando era difícil.',          sub: 'Isso exige mais força do que a maioria imagina.' },
};

export function getProfileMilestoneNarrative(profile: EmotionalProfile): {
  title: string;
  sub: string;
} {
  if (isEs()) return ES_PROFILE_MILESTONES[profile];
  if (isPt()) return PT_PROFILE_MILESTONES[profile];
  if (isFr()) return FR_PROFILE_MILESTONES[profile];
  return PROFILE_MILESTONES[profile];
}

// ─── Comeback messages ────────────────────────────────────────────────────────

const PROFILE_COMEBACKS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Momentum can be rebuilt. One reset at a time.',
    'Refocus. Begin again.',
    'Your focus returns with practice.',
    'Distraction is temporary. Your progress is not.',
  ],
  calm: [
    'You can return softly.',
    'No pressure. Just one gentle step.',
    'Calm comes back with small, quiet returns.',
    'Begin where you are. That\'s always enough.',
  ],
  confidence: [
    'Your progress still matters.',
    'Trust is rebuilt one return at a time.',
    'Coming back is the most trustworthy thing you can do.',
    'You kept your word before. Do it again.',
  ],
  burnout: [
    'You do not need to restart perfectly.',
    'One gentle return is enough.',
    'No rush. Just today.',
    'Rebuilding doesn\'t have a schedule.',
  ],
};

const FR_PROFILE_COMEBACKS: Record<EmotionalProfile, string[]> = {
  focus: [
    'L\'élan peut se reconstruire. Un reset à la fois.',
    'Refocalise. Recommence.',
    'Ton focus revient avec la pratique.',
    'La distraction est temporaire. Ton progrès, non.',
  ],
  calm: [
    'Tu peux revenir doucement.',
    'Sans pression. Juste un pas tranquille.',
    'Le calme revient avec de petits retours tranquilles.',
    'Commence d\'où tu es. C\'est toujours suffisant.',
  ],
  confidence: [
    'Ton progrès compte toujours.',
    'La confiance se reconstruit un retour à la fois.',
    'Revenir est la chose la plus honnête que tu puisses faire.',
    'Tu as tenu ta parole avant. Fais-le à nouveau.',
  ],
  burnout: [
    'Tu n\'as pas besoin de recommencer parfaitement.',
    'Un retour doux suffit.',
    'Sans pression. Juste aujourd\'hui.',
    'La reconstruction n\'a pas de calendrier.',
  ],
};

const ES_PROFILE_COMEBACKS: Record<EmotionalProfile, string[]> = {
  focus: [
    'El impulso se puede reconstruir. Un regreso a la vez.',
    'Refocusate. Comienza de nuevo.',
    'Tu enfoque vuelve con la práctica.',
    'La distracción es temporal. Tu progreso no lo es.',
  ],
  calm: [
    'Puedes volver con suavidad.',
    'Sin presión. Solo un paso gentil.',
    'La calma regresa con retornos pequeños y tranquilos.',
    'Empieza donde estás. Eso siempre es suficiente.',
  ],
  confidence: [
    'Tu progreso todavía importa.',
    'La confianza se reconstruye un regreso a la vez.',
    'Volver es lo más honesto que puedes hacer.',
    'Cumpliste tu palabra antes. Hazlo de nuevo.',
  ],
  burnout: [
    'No necesitas reiniciarte perfectamente.',
    'Un regreso gentil es suficiente.',
    'Sin prisa. Solo hoy.',
    'La reconstrucción no tiene horario.',
  ],
};

const PT_PROFILE_COMEBACKS: Record<EmotionalProfile, string[]> = {
  focus: [
    'O momentum pode ser reconstruído. Um reset de cada vez.',
    'Refoque. Comece de novo.',
    'Seu foco retorna com a prática.',
    'A distração é temporária. Seu progresso, não.',
  ],
  calm: [
    'Você pode retornar com suavidade.',
    'Sem pressão. Só um passo gentil.',
    'A calma volta com retornos pequenos e tranquilos.',
    'Comece de onde você está. Isso sempre é suficiente.',
  ],
  confidence: [
    'Seu progresso ainda importa.',
    'A confiança se reconstrói um retorno de cada vez.',
    'Voltar é a coisa mais honesta que você pode fazer.',
    'Você cumpriu sua palavra antes. Faça de novo.',
  ],
  burnout: [
    'Você não precisa recomeçar com perfeição.',
    'Um retorno gentil já é suficiente.',
    'Sem pressa. Só hoje.',
    'Reconstrução não tem horário.',
  ],
};

export function getProfileComebackMessage(
  profile: EmotionalProfile,
  seed: number,
): string {
  if (isEs()) return pick(ES_PROFILE_COMEBACKS[profile], seed);
  if (isPt()) return pick(PT_PROFILE_COMEBACKS[profile], seed);
  if (isFr()) return pick(FR_PROFILE_COMEBACKS[profile], seed);
  return pick(PROFILE_COMEBACKS[profile], seed);
}

// ─── Label helper ─────────────────────────────────────────────────────────────

const ES_PROFILE_LABELS: Record<EmotionalProfile, string> = {
  focus:      'Enfoque & Disciplina',
  calm:       'Calma & Claridad Mental',
  confidence: 'Autoconfianza',
  burnout:    'Recuperación del Burnout',
};

const PT_PROFILE_LABELS: Record<EmotionalProfile, string> = {
  focus:      'Foco e disciplina',
  calm:       'Calma e clareza mental',
  confidence: 'Autoconfiança',
  burnout:    'Recuperação do Burnout',
};

const FR_PROFILE_LABELS: Record<EmotionalProfile, string> = {
  focus:      'Focus & Discipline',
  calm:       'Calme & Clarté Mentale',
  confidence: 'Confiance en Soi',
  burnout:    'Récupération du Burnout',
};

const PT_PROFILE_SUBTITLES: Record<EmotionalProfile, string> = {
  focus:      'Reduza distrações e reconstrua consistência.',
  calm:       'Desacelere a mente e volte a se sentir presente.',
  confidence: 'Reconstrua a confiança em si, pouco a pouco.',
  burnout:    'Recupere energia sem se pressionar.',
};

const FR_PROFILE_SUBTITLES: Record<EmotionalProfile, string> = {
  focus:      'Réduire les distractions et reconstruire la régularité.',
  calm:       'Ralentir mentalement et retrouver un peu d\'ancrage.',
  confidence: 'Reconstruire la confiance en soi, petit à petit.',
  burnout:    'Revenir de l\'épuisement sans pression.',
};

const DE_PROFILE_LABELS: Record<EmotionalProfile, string> = {
  focus:      'Fokus & Disziplin',
  calm:       'Ruhe & Klarheit',
  confidence: 'Selbstvertrauen',
  burnout:    'Erholung nach Erschöpfung',
};

const DE_PROFILE_SUBTITLES: Record<EmotionalProfile, string> = {
  focus:      'Schütze deine Aufmerksamkeit.',
  calm:       'Komm innerlich zur Ruhe und finde wieder Boden.',
  confidence: 'Finde Schritt für Schritt zurück zu dir.',
  burnout:    'Erhole dich ohne Druck.',
};

export function getProfileLabel(profile: EmotionalProfile, lang?: string): string {
  if (lang === 'es' || isEs()) return ES_PROFILE_LABELS[profile];
  if (lang === 'pt') return PT_PROFILE_LABELS[profile];
  if (lang === 'fr' || isFr()) return FR_PROFILE_LABELS[profile];
  if (lang === 'de' || isDe()) return DE_PROFILE_LABELS[profile];
  return PROFILE_META[profile].label;
}

export function getProfileSubtitle(profile: EmotionalProfile, lang?: string): string {
  if (lang === 'pt') return PT_PROFILE_SUBTITLES[profile];
  if (lang === 'fr' || isFr()) return FR_PROFILE_SUBTITLES[profile];
  if (lang === 'de' || isDe()) return DE_PROFILE_SUBTITLES[profile];
  return PROFILE_META[profile].subtitle;
}

export function getProfileDescription(profile: EmotionalProfile): string {
  return PROFILE_META[profile].description;
}

// ─── Short rotating microcopy for the Emotional Journey card ─────────────────
// Each phrase is short enough to always fit one line. Never truncates.
// Rotates via seed (currentDay) for natural variety over time.

const SHORT_DESCRIPTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Clarity through consistency.',
    'Protecting your attention.',
    'Quiet focus, daily.',
    'Less distraction. More clarity.',
    'Building one day at a time.',
  ],
  calm: [
    'Finding stillness softly.',
    'A quieter, clearer path.',
    'Calm grows slowly.',
    'Stillness begins here.',
    'Peace through small steps.',
  ],
  confidence: [
    'Trust rebuilt quietly.',
    'Small promises, kept.',
    'Self-trust, daily.',
    'Building from within.',
    'Keeping your word.',
  ],
  burnout: [
    'Rebuilding gently.',
    'Rest is part of growth.',
    'No pressure, just presence.',
    'Calm steps forward.',
    'Slow return, real change.',
  ],
};

const ES_SHORT_DESCRIPTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Claridad a través de la consistencia.',
    'Protegiendo tu atención.',
    'Enfoque tranquilo, cada día.',
    'Menos distracción. Más claridad.',
    'Construyendo un día a la vez.',
  ],
  calm: [
    'Encontrando la calma suavemente.',
    'Un camino más tranquilo y claro.',
    'La calma crece despacio.',
    'La quietud comienza aquí.',
    'Paz a través de pequeños pasos.',
  ],
  confidence: [
    'Confianza reconstruida en silencio.',
    'Pequeñas promesas cumplidas.',
    'Autoconfianza, cada día.',
    'Construyendo desde adentro.',
    'Cumpliendo tu palabra.',
  ],
  burnout: [
    'Reconstruyendo con gentileza.',
    'El descanso es parte del crecimiento.',
    'Sin presión, solo presencia.',
    'Pasos tranquilos hacia adelante.',
    'Regreso lento, cambio real.',
  ],
};

const PT_SHORT_DESCRIPTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Clareza através da constância.',
    'Protegendo sua atenção.',
    'Foco tranquilo, todo dia.',
    'Menos distração. Mais clareza.',
    'Construindo um dia de cada vez.',
  ],
  calm: [
    'Encontrando a calma com gentileza.',
    'Um caminho mais tranquilo e claro.',
    'A calma cresce devagar.',
    'A quietude começa aqui.',
    'Paz através de pequenos passos.',
  ],
  confidence: [
    'Confiança reconstruída em silêncio.',
    'Pequenas promessas cumpridas.',
    'Autoconfiança, todo dia.',
    'Construindo de dentro para fora.',
    'Honrando seus compromissos.',
  ],
  burnout: [
    'Reconstruindo com gentileza.',
    'O descanso é parte do crescimento.',
    'Sem pressão. Só presença.',
    'Passos tranquilos à frente.',
    'Retorno lento, mudança real.',
  ],
};

const FR_SHORT_DESCRIPTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Clarté par la constance.',
    'Protéger ton attention.',
    'Focus tranquille, chaque jour.',
    'Moins de distraction. Plus de clarté.',
    'Construire un jour à la fois.',
  ],
  calm: [
    'Trouver la tranquillité doucement.',
    'Un chemin plus calme et clair.',
    'Le calme grandit lentement.',
    'La tranquillité commence ici.',
    'La paix par petits pas.',
  ],
  confidence: [
    'Confiance reconstruite tranquillement.',
    'Petites promesses tenues.',
    'Confiance en soi, chaque jour.',
    'Construire de l\'intérieur.',
    'Tenir sa parole.',
  ],
  burnout: [
    'Se reconstruire doucement.',
    'Le repos fait partie de la croissance.',
    'Sans pression, juste présence.',
    'Pas tranquilles en avant.',
    'Retour lent, vrai changement.',
  ],
};

const DE_SHORT_DESCRIPTIONS: Record<EmotionalProfile, string[]> = {
  focus: [
    'Fokus entsteht durch Wiederholung.',
    'Schütze deine Aufmerksamkeit.',
    'Stiller Fokus, täglich.',
    'Weniger Ablenkung. Mehr Klarheit.',
    'Ein Tag nach dem anderen.',
  ],
  calm: [
    'Ruhe findet sich sanft.',
    'Ein ruhigerer, klarerer Weg.',
    'Ruhe wächst langsam.',
    'Stille beginnt hier.',
    'Frieden durch kleine Schritte.',
  ],
  confidence: [
    'Vertrauen wächst leise.',
    'Kleine Versprechen, gehalten.',
    'Selbstvertrauen, täglich.',
    'Von innen aufbauen.',
    'Das Wort halten.',
  ],
  burnout: [
    'Sanft wieder aufbauen.',
    'Ruhe ist Teil des Wachstums.',
    'Kein Druck. Nur Präsenz.',
    'Ruhige Schritte vorwärts.',
    'Langsame Rückkehr, echter Wandel.',
  ],
};

/**
 * Returns a short, single-line description that fits naturally in the card.
 * Rotates via `seed` (typically currentDay) for natural variety.
 */
export function getProfileDescriptionShort(
  profile: EmotionalProfile,
  seed: number,
  lang?: string,
): string {
  const map = (lang === 'es' || isEs()) ? ES_SHORT_DESCRIPTIONS
    : lang === 'pt' ? PT_SHORT_DESCRIPTIONS
    : (lang === 'fr' || isFr()) ? FR_SHORT_DESCRIPTIONS
    : (lang === 'de' || isDe()) ? DE_SHORT_DESCRIPTIONS
    : SHORT_DESCRIPTIONS;
  const pool = map[profile];
  return pool[Math.abs(seed) % pool.length];
}

// ─── Heavy-mood adaptive banner (Prompt 10 Section 2) ────────────────────────
// Fires when the user has been selecting difficult moods repeatedly.
// Goal: soften tone, reduce pressure, communicate emotional safety.

const HEAVY_MOOD_BANNERS_EN = [
  "You don't need to be okay to show up.",
  'Even a small return matters today.',
  'This space holds whatever today feels like.',
  'One gentle step is enough.',
  'Showing up is allowed to feel hard.',
  'You are not behind. You are here.',
  'Small still counts.',
];

const HEAVY_MOOD_BANNERS_PT = [
  'Você não precisa estar bem para aparecer.',
  'Mesmo um pequeno retorno importa hoje.',
  'Esse espaço acolhe o que hoje for.',
  'Um passo gentil já é suficiente.',
  'Aparecer pode ser difícil. Ainda conta.',
  'Você não está atrasada. Você está aqui.',
  'Pequeno ainda conta.',
];

const HEAVY_MOOD_BANNERS_FR = [
  'Tu n\'as pas besoin d\'aller bien pour te présenter.',
  'Même un petit retour compte aujourd\'hui.',
  'Cet espace accueille ce que tu ressens.',
  'Un pas doux suffit.',
  'Se présenter peut être difficile. Ça compte quand même.',
  'Tu n\'es pas en retard. Tu es là.',
  'Petit compte aussi.',
];

/**
 * Returns a softened banner when the user has been in heavy moods (≥3 hard days).
 * Returns null when the mood pattern is not concerning.
 */
export function getHeavyMoodAdaptiveBanner(heavyDayCount: number, seed: number): string | null {
  if (heavyDayCount < 3) return null;
  const pool = isPt() ? HEAVY_MOOD_BANNERS_PT : isFr() ? HEAVY_MOOD_BANNERS_FR : HEAVY_MOOD_BANNERS_EN;
  return pool[Math.abs(seed) % pool.length];
}

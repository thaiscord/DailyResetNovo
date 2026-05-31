// ─── Personalization Engine ───────────────────────────────────────────────────
// Combines emotional profile + journey stage into an archetype that drives
// all adaptive copy throughout the app.
// Tone rule: deeper personalization should feel more *seen*, not more clinical.

import type { EmotionalProfile } from './emotionalProfile';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Journey Stage ────────────────────────────────────────────────────────────
// Based on total completed days — measures habit depth, not calendar time.

export type JourneyStage = 'early' | 'building' | 'momentum' | 'established';

export function getJourneyStage(totalCompletedDays: number): JourneyStage {
  if (totalCompletedDays < 8)  return 'early';
  if (totalCompletedDays < 22) return 'building';
  if (totalCompletedDays < 60) return 'momentum';
  return 'established';
}

// ─── Emotional Archetype ──────────────────────────────────────────────────────
// 16 distinct archetypes — one per profile × stage combination.
// Named for the emotional experience, not the habit goal.

export type EmotionalArchetype =
  // burnout
  | 'gentle-rebuilder'         // burnout + early
  | 'nervous-system-recovery'  // burnout + building
  | 'quiet-momentum'           // burnout + momentum
  | 'burnout-restored'         // burnout + established
  // focus
  | 'focus-starter'            // focus + early
  | 'focus-recovery'           // focus + building
  | 'clarity-builder'          // focus + momentum
  | 'focus-established'        // focus + established
  // confidence
  | 'trust-rebuilding'         // confidence + early
  | 'confidence-emerging'      // confidence + building
  | 'confidence-momentum'      // confidence + momentum
  | 'self-reliant'             // confidence + established
  // calm
  | 'emotional-softening'      // calm + early
  | 'calm-seeker'              // calm + building
  | 'emotional-steadiness'     // calm + momentum
  | 'calm-established';        // calm + established

const ARCHETYPE_MAP: Record<EmotionalProfile, Record<JourneyStage, EmotionalArchetype>> = {
  burnout: {
    early:       'gentle-rebuilder',
    building:    'nervous-system-recovery',
    momentum:    'quiet-momentum',
    established: 'burnout-restored',
  },
  focus: {
    early:       'focus-starter',
    building:    'focus-recovery',
    momentum:    'clarity-builder',
    established: 'focus-established',
  },
  confidence: {
    early:       'trust-rebuilding',
    building:    'confidence-emerging',
    momentum:    'confidence-momentum',
    established: 'self-reliant',
  },
  calm: {
    early:       'emotional-softening',
    building:    'calm-seeker',
    momentum:    'emotional-steadiness',
    established: 'calm-established',
  },
};

export function getEmotionalArchetype(
  profile: EmotionalProfile,
  stage: JourneyStage,
): EmotionalArchetype {
  return ARCHETYPE_MAP[profile][stage];
}

// ─── Progress Headings ────────────────────────────────────────────────────────
// Shown on the Progress screen — identity-reinforcing, never generic.

interface ProgressHeading {
  eyebrow: string;
  headline: string;
  sub: string;
}

const PROGRESS_HEADINGS: Record<EmotionalArchetype, ProgressHeading> = {
  'gentle-rebuilder': {
    eyebrow:  'GENTLE RETURN',
    headline: 'You are learning to begin again.',
    sub:      'Not with force — with permission.',
  },
  'nervous-system-recovery': {
    eyebrow:  'HEALING IN PROGRESS',
    headline: 'Your body is learning to rest again.',
    sub:      'This is what recovery looks like from the inside.',
  },
  'quiet-momentum': {
    eyebrow:  'QUIET HEALING',
    headline: 'Something in you is restoring itself.',
    sub:      'Rest was never the enemy.',
  },
  'burnout-restored': {
    eyebrow:  'RESTORED',
    headline: 'You rebuilt yourself from the ground up.',
    sub:      'And you did it gently.',
  },
  'focus-starter': {
    eyebrow:  'FIRST STEPS',
    headline: 'Your attention is finding its direction.',
    sub:      'Small focus creates large clarity.',
  },
  'focus-recovery': {
    eyebrow:  'BUILDING MOMENTUM',
    headline: 'Your focus is strengthening.',
    sub:      'Every reset sharpens the lens.',
  },
  'clarity-builder': {
    eyebrow:  'CLARITY IS BUILDING',
    headline: 'Distraction has less power over you now.',
    sub:      'Your attention is becoming an asset.',
  },
  'focus-established': {
    eyebrow:  'FOCUS IS IDENTITY',
    headline: 'What once required effort is now natural.',
    sub:      'You are someone who shows up.',
  },
  'trust-rebuilding': {
    eyebrow:  'FIRST PROMISES',
    headline: 'You are learning to trust yourself again.',
    sub:      'Small consistency is the beginning of self-trust.',
  },
  'confidence-emerging': {
    eyebrow:  'TRUST IS GROWING',
    headline: 'Every return rebuilds what was lost.',
    sub:      'You are keeping your word — consistently.',
  },
  'confidence-momentum': {
    eyebrow:  'CONFIDENCE IS FORMING',
    headline: 'Showing up is becoming part of you.',
    sub:      'Self-trust is no longer effort. It is habit.',
  },
  'self-reliant': {
    eyebrow:  'DEEPLY SELF-RELIANT',
    headline: 'You have proven it — to yourself.',
    sub:      'Confidence is no longer a goal. It is who you are.',
  },
  'emotional-softening': {
    eyebrow:  'FINDING STILLNESS',
    headline: 'You are learning that calm is a choice.',
    sub:      'Slow down. Everything can wait.',
  },
  'calm-seeker': {
    eyebrow:  'STILLNESS GROWING',
    headline: 'Your nervous system is learning quiet.',
    sub:      'One peaceful reset at a time.',
  },
  'emotional-steadiness': {
    eyebrow:  'GROUNDED',
    headline: 'Calm has become your center.',
    sub:      'You no longer search for quiet — you carry it.',
  },
  'calm-established': {
    eyebrow:  'SETTLED',
    headline: 'Stillness is your natural state now.',
    sub:      'You built this. One quiet return at a time.',
  },
};

export function getProgressHeading(archetype: EmotionalArchetype): ProgressHeading {
  return PROGRESS_HEADINGS[archetype];
}

// ─── Personalized Milestone Messages ─────────────────────────────────────────
// Override generic MILESTONE_COPY for key milestones × selected archetypes.
// Returns null → caller falls back to generic copy.

interface MilestoneMessage {
  title: string;
  sub: string;
}

type MilestoneOverrideMap = Partial<Record<EmotionalArchetype, MilestoneMessage>>;

const MILESTONE_OVERRIDES: Record<number, MilestoneOverrideMap> = {
  7: {
    'gentle-rebuilder':        { title: 'Seven days of being gentle with yourself.', sub: 'You did not force it. You returned.' },
    'nervous-system-recovery': { title: 'A week of healing.', sub: 'Your nervous system is starting to remember safety.' },
    'quiet-momentum':          { title: 'Seven quiet days.', sub: 'Healing accumulates in small, invisible ways.' },
    'burnout-restored':        { title: 'One week — from a place of strength.', sub: 'You know now: rest builds, not breaks.' },
    'focus-starter':           { title: 'Seven days of protecting your attention.', sub: 'Your focus is already more than it was.' },
    'focus-recovery':          { title: 'A week of building focus.', sub: 'The lens is getting clearer.' },
    'clarity-builder':         { title: 'Seven days of clarity.', sub: 'Distraction is losing its grip.' },
    'focus-established':       { title: 'One week — effortlessly.', sub: 'This is no longer work. It is identity.' },
    'trust-rebuilding':        { title: 'Seven promises kept.', sub: 'That is the beginning of self-trust.' },
    'confidence-emerging':     { title: 'A week of consistency.', sub: 'Trust grows through repetition — and you are proving it.' },
    'confidence-momentum':     { title: 'Seven days of showing up.', sub: 'Confidence is already who you are becoming.' },
    'self-reliant':            { title: 'One week — built on deep trust.', sub: 'You do not need motivation. You have identity.' },
    'emotional-softening':     { title: 'Seven days of quiet.', sub: 'You chose slowness. That was brave.' },
    'calm-seeker':             { title: 'A week of stillness.', sub: 'You are learning what peace feels like.' },
    'emotional-steadiness':    { title: 'Seven grounded days.', sub: 'Calm is already inside you.' },
    'calm-established':        { title: 'One settled week.', sub: 'Stillness is second nature now.' },
  },
  21: {
    'gentle-rebuilder':        { title: 'Three weeks of returning gently.', sub: 'No pressure. No forcing. Just presence.' },
    'nervous-system-recovery': { title: 'Twenty-one days of healing.', sub: 'Your nervous system has new patterns now.' },
    'quiet-momentum':          { title: 'Three weeks of quiet restoration.', sub: 'You did not rush. That was the point.' },
    'burnout-restored':        { title: 'Three weeks of rebuilt strength.', sub: 'What you have built is permanent now.' },
    'trust-rebuilding':        { title: 'Three weeks of kept promises.', sub: 'You have proven something to yourself.' },
    'confidence-emerging':     { title: 'Twenty-one days of trust-building.', sub: 'Showing up has become your language.' },
    'confidence-momentum':     { title: 'Three weeks of confidence.', sub: 'You are not becoming someone who shows up. You already are.' },
    'emotional-softening':     { title: 'Three weeks of choosing soft.', sub: 'You are gentler with yourself than when you started.' },
    'emotional-steadiness':    { title: 'Three grounded weeks.', sub: 'Calm is no longer something you reach for. It lives in you.' },
    'calm-established':        { title: 'Three settled weeks.', sub: 'Stillness is no longer a practice. It is home.' },
  },
  30: {
    'gentle-rebuilder':        { title: 'Thirty gentle returns.', sub: 'You rebuilt without breaking yourself. That is rare.' },
    'nervous-system-recovery': { title: 'Thirty days of healing.', sub: 'Your nervous system has learned a new rhythm.' },
    'quiet-momentum':          { title: 'Thirty days of quiet consistency.', sub: 'Healing at your own pace. No shortcuts needed.' },
    'trust-rebuilding':        { title: 'Thirty promises kept.', sub: 'You are someone who follows through. It is official.' },
    'confidence-emerging':     { title: 'Thirty days of building trust.', sub: 'You are more reliable to yourself than you know.' },
    'emotional-softening':     { title: 'Thirty days of choosing calm.', sub: 'Softness has become your foundation.' },
    'emotional-steadiness':    { title: 'Thirty grounded days.', sub: 'Your steadiness is no longer something you practice. It is you.' },
    'focus-recovery':          { title: 'Thirty days of building focus.', sub: 'Your attention is a different animal now.' },
    'clarity-builder':         { title: 'Thirty days of clarity.', sub: 'Your focus is sharper than it has ever been.' },
  },
  60: {
    'gentle-rebuilder':        { title: 'Sixty days of gentle return.', sub: 'You healed without forcing it. That took courage.' },
    'nervous-system-recovery': { title: 'Two months of healing.', sub: 'Your body and mind have found a new rhythm.' },
    'trust-rebuilding':        { title: 'Sixty kept promises.', sub: 'You are one of the most reliable people you know — to yourself.' },
    'confidence-emerging':     { title: 'Two months of self-trust.', sub: 'Confidence is no longer emerging. It has arrived.' },
    'clarity-builder':         { title: 'Sixty days of clear focus.', sub: 'Your mind works differently now.' },
    'emotional-steadiness':    { title: 'Two months of groundedness.', sub: 'Calm lives in you now — not just around you.' },
  },
};

const MILESTONE_OVERRIDES_ES: Record<number, MilestoneOverrideMap> = {
  7: {
    'gentle-rebuilder':        { title: 'Siete días siendo gentil contigo.', sub: 'No te lo forzaste. Volviste.' },
    'nervous-system-recovery': { title: 'Una semana de sanación.', sub: 'Tu sistema nervioso empieza a recordar la calma.' },
    'quiet-momentum':          { title: 'Siete días quietos.', sub: 'La sanación se acumula en formas que no siempre se ven.' },
    'burnout-restored':        { title: 'Una semana desde un lugar de fortaleza.', sub: 'Lo sabes ahora: el descanso construye.' },
    'focus-starter':           { title: 'Siete días protegiendo tu atención.', sub: 'Tu enfoque ya es más de lo que era.' },
    'focus-recovery':          { title: 'Una semana construyendo foco.', sub: 'La lente se está volviendo más nítida.' },
    'clarity-builder':         { title: 'Siete días de claridad.', sub: 'La distracción está perdiendo terreno.' },
    'focus-established':       { title: 'Una semana — sin esfuerzo.', sub: 'Esto ya no es práctica. Es identidad.' },
    'trust-rebuilding':        { title: 'Cumpliste siete pequeños regresos.', sub: 'Así empieza la confianza en ti.' },
    'confidence-emerging':     { title: 'Una semana de constancia.', sub: 'La confianza crece con la repetición — y lo estás demostrando.' },
    'confidence-momentum':     { title: 'Siete días apareciendo.', sub: 'La confianza ya es quien estás siendo.' },
    'self-reliant':            { title: 'Una semana sobre confianza profunda.', sub: 'No necesitas motivación. Tienes identidad.' },
    'emotional-softening':     { title: 'Siete días de quietud.', sub: 'Elegiste la lentitud. Eso fue valiente.' },
    'calm-seeker':             { title: 'Una semana de quietud.', sub: 'Estás aprendiendo cómo se siente la paz.' },
    'emotional-steadiness':    { title: 'Siete días arraigados.', sub: 'La calma ya está dentro de ti.' },
    'calm-established':        { title: 'Una semana asentada.', sub: 'La quietud ya es tu segunda naturaleza.' },
  },
};

const MILESTONE_OVERRIDES_PT: Record<number, MilestoneOverrideMap> = {
  7: {
    'gentle-rebuilder':        { title: 'Sete dias sendo gentil com você mesma.', sub: 'Não forçou. Voltou.' },
    'nervous-system-recovery': { title: 'Uma semana de cura.', sub: 'Seu sistema nervoso está começando a lembrar da calma.' },
    'quiet-momentum':          { title: 'Sete dias quietos.', sub: 'A cura se acumula em formas que nem sempre se veem.' },
    'burnout-restored':        { title: 'Uma semana desde um lugar de força.', sub: 'Você sabe agora: descanso constrói.' },
    'focus-starter':           { title: 'Sete dias protegendo sua atenção.', sub: 'Seu foco já é mais do que era.' },
    'focus-recovery':          { title: 'Uma semana construindo foco.', sub: 'A lente está ficando mais nítida.' },
    'clarity-builder':         { title: 'Sete dias de clareza.', sub: 'A distração está perdendo terreno.' },
    'focus-established':       { title: 'Uma semana — sem esforço.', sub: 'Isso não é mais prática. É identidade.' },
    'trust-rebuilding':        { title: 'Sete promessas cumpridas.', sub: 'É assim que começa a confiança em si mesma.' },
    'confidence-emerging':     { title: 'Uma semana de constância.', sub: 'A confiança cresce com a repetição — e você está provando.' },
    'confidence-momentum':     { title: 'Sete dias aparecendo.', sub: 'A confiança já é quem você está sendo.' },
    'self-reliant':            { title: 'Uma semana — sobre confiança profunda.', sub: 'Você não precisa de motivação. Tem identidade.' },
    'emotional-softening':     { title: 'Sete dias de quietude.', sub: 'Você escolheu a calma. Isso foi corajoso.' },
    'calm-seeker':             { title: 'Uma semana de quietude.', sub: 'Você está aprendendo como a paz parece.' },
    'emotional-steadiness':    { title: 'Sete dias enraizados.', sub: 'A calma já está dentro de você.' },
    'calm-established':        { title: 'Uma semana assentada.', sub: 'A quietude já é sua segunda natureza.' },
  },
  21: {
    'gentle-rebuilder':        { title: 'Três semanas voltando com gentileza.', sub: 'Sem pressão. Sem forçar. Só presença.' },
    'nervous-system-recovery': { title: 'Vinte e um dias de cura.', sub: 'Seu sistema nervoso tem novos padrões agora.' },
    'quiet-momentum':          { title: 'Três semanas de restauração quieta.', sub: 'Você não apressou. Era esse o ponto.' },
    'trust-rebuilding':        { title: 'Três semanas de promessas cumpridas.', sub: 'Você provou algo para si mesma.' },
    'emotional-softening':     { title: 'Três semanas escolhendo o que é suave.', sub: 'Você é mais gentil com si mesma do que quando começou.' },
    'emotional-steadiness':    { title: 'Três semanas enraizadas.', sub: 'A calma não é mais algo que você alcança. Ela vive em você.' },
  },
  30: {
    'gentle-rebuilder':        { title: 'Trinta retornos gentis.', sub: 'Você se reconstruiu sem se quebrar. Isso é raro.' },
    'nervous-system-recovery': { title: 'Trinta dias de cura.', sub: 'Seu sistema nervoso aprendeu um novo ritmo.' },
    'quiet-momentum':          { title: 'Trinta dias de constância quieta.', sub: 'Cura no seu próprio ritmo. Sem atalhos necessários.' },
    'trust-rebuilding':        { title: 'Trinta promessas cumpridas.', sub: 'Você é alguém que cumpre o que promete. Oficial.' },
    'emotional-softening':     { title: 'Trinta dias escolhendo a calma.', sub: 'A suavidade se tornou sua base.' },
    'emotional-steadiness':    { title: 'Trinta dias enraizados.', sub: 'Sua estabilidade não é mais algo que você pratica. É você.' },
  },
};

const MILESTONE_OVERRIDES_FR: Record<number, MilestoneOverrideMap> = {
  7: {
    'gentle-rebuilder':        { title: 'Sept jours de douceur envers toi-même.', sub: "Tu n'as pas forcé. Tu es revenu." },
    'nervous-system-recovery': { title: 'Une semaine de guérison.', sub: 'Ton système nerveux commence à se rappeler du calme.' },
    'quiet-momentum':          { title: 'Sept jours tranquilles.', sub: 'La guérison s\'accumule de façons invisibles.' },
    'burnout-restored':        { title: 'Une semaine depuis un lieu de force.', sub: 'Tu sais maintenant : le repos construit.' },
    'focus-starter':           { title: 'Sept jours à protéger ton attention.', sub: 'Ta concentration est déjà plus grande qu\'avant.' },
    'focus-recovery':          { title: 'Une semaine à construire la concentration.', sub: 'La lentille devient plus nette.' },
    'clarity-builder':         { title: 'Sept jours de clarté.', sub: 'La distraction perd du terrain.' },
    'focus-established':       { title: 'Une semaine — sans effort.', sub: "Ce n'est plus une pratique. C'est une identité." },
    'trust-rebuilding':        { title: 'Sept promesses tenues.', sub: "C'est ainsi que commence la confiance en soi." },
    'confidence-emerging':     { title: 'Une semaine de constance.', sub: 'La confiance grandit par la répétition — et tu le prouves.' },
    'confidence-momentum':     { title: 'Sept jours à te présenter.', sub: 'La confiance est déjà qui tu es en train de devenir.' },
    'self-reliant':            { title: 'Une semaine — sur une confiance profonde.', sub: "Tu n'as pas besoin de motivation. Tu as une identité." },
    'emotional-softening':     { title: 'Sept jours de calme.', sub: "Tu as choisi la lenteur. C'était courageux." },
    'calm-seeker':             { title: 'Une semaine de tranquillité.', sub: 'Tu apprends à quoi ressemble la paix.' },
    'emotional-steadiness':    { title: 'Sept jours ancrés.', sub: 'Le calme est déjà en toi.' },
    'calm-established':        { title: 'Une semaine apaisée.', sub: 'La tranquillité est ta seconde nature.' },
  },
  21: {
    'gentle-rebuilder':        { title: 'Trois semaines de retours doux.', sub: 'Sans pression. Sans forcer. Juste de la présence.' },
    'trust-rebuilding':        { title: 'Trois semaines de promesses tenues.', sub: 'Tu t\'es prouvé quelque chose.' },
    'emotional-softening':     { title: 'Trois semaines à choisir la douceur.', sub: 'Tu es plus doux avec toi-même qu\'au début.' },
    'emotional-steadiness':    { title: 'Trois semaines ancrées.', sub: "Le calme n'est plus quelque chose que tu atteins. Il vit en toi." },
  },
  30: {
    'gentle-rebuilder':        { title: 'Trente retours doux.', sub: 'Tu t\'es reconstruit sans te briser. C\'est rare.' },
    'trust-rebuilding':        { title: 'Trente promesses tenues.', sub: 'Tu es quelqu\'un qui tient ses engagements. Officiel.' },
    'emotional-softening':     { title: 'Trente jours à choisir le calme.', sub: 'La douceur est devenue ta fondation.' },
    'emotional-steadiness':    { title: 'Trente jours ancrés.', sub: "Ta stabilité n'est plus quelque chose que tu pratiques. C'est toi." },
  },
};

const MILESTONE_OVERRIDES_DE: Record<number, MilestoneOverrideMap> = {
  7: {
    'gentle-rebuilder':        { title: 'Sieben Tage der Sanftheit mit dir selbst.', sub: 'Du hast nicht erzwungen. Du bist zurückgekehrt.' },
    'nervous-system-recovery': { title: 'Eine Woche der Heilung.', sub: 'Dein Nervensystem beginnt, Sicherheit zu erinnern.' },
    'quiet-momentum':          { title: 'Sieben ruhige Tage.', sub: 'Heilung sammelt sich auf unsichtbare Weise an.' },
    'burnout-restored':        { title: 'Eine Woche aus einem Ort der Stärke.', sub: 'Du weißt jetzt: Ruhe baut auf.' },
    'focus-starter':           { title: 'Sieben Tage, deine Aufmerksamkeit zu schützen.', sub: 'Dein Fokus ist bereits mehr als er war.' },
    'focus-recovery':          { title: 'Eine Woche Fokus aufbauen.', sub: 'Die Linse wird klarer.' },
    'clarity-builder':         { title: 'Sieben Tage Klarheit.', sub: 'Die Ablenkung verliert ihren Griff.' },
    'focus-established':       { title: 'Eine Woche — mühelos.', sub: 'Das ist keine Übung mehr. Es ist Identität.' },
    'trust-rebuilding':        { title: 'Sieben gehaltene Versprechen.', sub: 'So beginnt das Vertrauen in sich selbst.' },
    'confidence-emerging':     { title: 'Eine Woche Beständigkeit.', sub: 'Vertrauen wächst durch Wiederholung — und du beweist es.' },
    'confidence-momentum':     { title: 'Sieben Tage des Erscheinens.', sub: 'Vertrauen ist bereits, wer du wirst.' },
    'self-reliant':            { title: 'Eine Woche — aus tiefem Vertrauen.', sub: 'Du brauchst keine Motivation. Du hast Identität.' },
    'emotional-softening':     { title: 'Sieben ruhige Tage.', sub: 'Du hast die Langsamkeit gewählt. Das war mutig.' },
    'calm-seeker':             { title: 'Eine Woche der Stille.', sub: 'Du lernst, wie Frieden sich anfühlt.' },
    'emotional-steadiness':    { title: 'Sieben geerdte Tage.', sub: 'Ruhe ist bereits in dir.' },
    'calm-established':        { title: 'Eine ruhige Woche.', sub: 'Stille ist deine zweite Natur.' },
  },
  21: {
    'gentle-rebuilder':        { title: 'Drei Wochen sanfter Rückkehr.', sub: 'Kein Druck. Kein Zwang. Nur Präsenz.' },
    'trust-rebuilding':        { title: 'Drei Wochen gehaltener Versprechen.', sub: 'Du hast dir selbst etwas bewiesen.' },
    'emotional-softening':     { title: 'Drei Wochen, die Sanftheit zu wählen.', sub: 'Du bist sanfter mit dir als am Anfang.' },
    'emotional-steadiness':    { title: 'Drei geerdte Wochen.', sub: 'Ruhe ist nicht mehr etwas, nach dem du greifst. Sie lebt in dir.' },
  },
  30: {
    'gentle-rebuilder':        { title: 'Dreißig sanfte Rückkehren.', sub: 'Du hast dich wiederaufgebaut, ohne dich zu brechen. Das ist selten.' },
    'trust-rebuilding':        { title: 'Dreißig gehaltene Versprechen.', sub: 'Du bist jemand, der sein Wort hält. Offiziell.' },
    'emotional-softening':     { title: 'Dreißig Tage, die Ruhe zu wählen.', sub: 'Sanftheit ist dein Fundament geworden.' },
    'emotional-steadiness':    { title: 'Dreißig geerdte Tage.', sub: 'Deine Standhaftigkeit ist keine Übung mehr. Du bist es.' },
  },
};

export function getPersonalizedMilestoneMessage(
  milestone: number,
  archetype: EmotionalArchetype,
): MilestoneMessage | null {
  if (isPt()) return MILESTONE_OVERRIDES_PT[milestone]?.[archetype] ?? null;
  if (isEs()) return MILESTONE_OVERRIDES_ES[milestone]?.[archetype] ?? null;
  if (isFr()) return MILESTONE_OVERRIDES_FR[milestone]?.[archetype] ?? null;
  if (isDe()) return MILESTONE_OVERRIDES_DE[milestone]?.[archetype] ?? null;
  return MILESTONE_OVERRIDES[milestone]?.[archetype] ?? null;
}

// ─── Personalized Reflections ─────────────────────────────────────────────────
// 4–5 questions per archetype, rotating by seed.
// Deeper and more emotionally specific than generic profile reflections.

const ARCHETYPE_REFLECTIONS: Record<EmotionalArchetype, string[]> = {
  'gentle-rebuilder': [
    'What made today\'s return feel possible?',
    'What would you tell yourself if you were starting again right now?',
    'Where did you find permission to be gentle today?',
    'What would "enough" look like — without pressure?',
    'What does it mean to rebuild without forcing it?',
  ],
  'nervous-system-recovery': [
    'Where in your body did you feel rest today?',
    'What felt lighter after this reset?',
    'What does your nervous system need most right now?',
    'What would genuine recovery look like — without a timeline?',
    'What would you protect to keep feeling safer?',
  ],
  'quiet-momentum': [
    'What are you noticing about how quiet consistency feels?',
    'Where do you feel the most restored right now?',
    'What would you let go of to feel more at ease?',
    'What has this gentle practice taught you about yourself?',
    'What does "healed" feel like — even partially?',
  ],
  'burnout-restored': [
    'What feels different about returning now, compared to when you started?',
    'What do you know now that you could not have known before?',
    'What has rebuilding slowly taught you about your own strength?',
    'What would you protect most — now that you have rebuilt?',
  ],
  'focus-starter': [
    'What distracted you today — and what did you choose instead?',
    'What does protecting your attention feel like right now?',
    'Where did you feel most focused today?',
    'What would tomorrow look like if you guarded your attention better?',
  ],
  'focus-recovery': [
    'What protected your focus today?',
    'Where did your attention feel most sharp?',
    'What are you learning about your own capacity to stay present?',
    'What would it look like to give your focus the protection it deserves?',
    'What is stealing your attention that you have not named yet?',
  ],
  'clarity-builder': [
    'What felt most clear today?',
    'Where is your attention naturally going right now — and is that right?',
    'What demands your focus that does not deserve it?',
    'What becomes possible when distraction loses its grip?',
    'Where does your best thinking happen — and how do you return there?',
  ],
  'focus-established': [
    'What does your focus look like now compared to when you started?',
    'What are you protecting most right now?',
    'Where does your best work happen — and how do you get there reliably?',
    'What would you tell someone just beginning to build their focus?',
  ],
  'trust-rebuilding': [
    'Where did you keep a promise to yourself today?',
    'What made showing up feel possible today?',
    'What would trusting yourself more look like in practice?',
    'What small proof did today give you?',
    'What is one thing you did today that your past self could not do?',
  ],
  'confidence-emerging': [
    'Where did you surprise yourself today?',
    'What did showing up consistently teach you this week?',
    'What would you do if you trusted yourself completely?',
    'Where is your confidence showing up — even quietly?',
    'What are you proving to yourself with each return?',
  ],
  'confidence-momentum': [
    'When did you feel most like yourself today?',
    'What has consistency changed about how you see yourself?',
    'Where do you feel the most trust in yourself right now?',
    'What is becoming easier — and what does that tell you?',
  ],
  'self-reliant': [
    'What do you know about yourself that you did not know before this journey?',
    'Where does your confidence live — even on the hard days?',
    'What would you tell the version of you who was not sure you could do this?',
    'What is next — and what is already enough?',
  ],
  'emotional-softening': [
    'Where did you find calm today — even briefly?',
    'What helped you feel more grounded today?',
    'What would it feel like to carry less tomorrow?',
    'What are you learning about the pace that is right for you?',
    'What does softness feel like — on your own terms?',
  ],
  'calm-seeker': [
    'Where did stillness live for you today?',
    'What helped quiet your mind today?',
    'What would it feel like to need less from yourself?',
    'Where is peace already present — even when you do not notice?',
  ],
  'emotional-steadiness': [
    'What feels settled in you right now?',
    'Where do you carry calm — even when things are hard?',
    'What does steadiness feel like from the inside?',
    'What would you protect most to stay grounded?',
    'Where does your calm come from — and can you return there reliably?',
  ],
  'calm-established': [
    'What does calm feel like now compared to when you started?',
    'Where is stillness most natural for you now?',
    'What has a quiet practice taught you that nothing else could?',
    'What would you tell someone trying to find peace?',
  ],
};

function pick<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

export function getPersonalizedReflection(
  archetype: EmotionalArchetype,
  seed: number,
): string {
  return pick(ARCHETYPE_REFLECTIONS[archetype], seed);
}

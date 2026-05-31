// ─── Milestone Ceremonies System ─────────────────────────────────────────────
// Milestones are not achievements. They are emotional chapters.
// Each ceremony should feel: cinematic · reflective · identity-driven · premium.
// Think: Apple keynote pause, not Duolingo fanfare.

import { Colors } from '../theme';
import { isEs, isPt, isFr, isDe } from './langStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MilestoneCeremony {
  streak: number;
  eyebrow: string;        // e.g. "SEVEN DAYS"
  label: string;          // e.g. "One Week"
  headline: string;       // short, punchy — the emotional hook
  narrative: string;      // 3–4 lines, poetic, personal
  identityShift: string;  // who they are becoming
  reflection: string;     // a quiet question to sit with
  accentColor: string;    // visual accent for this milestone's glow
}

export interface MilestoneRecord {
  streak: number;
  type: 'streak' | 'comeback' | 'consistency';
  label: string;
  earnedAt: string;       // ISO string
}

// ─── Ceremony data ────────────────────────────────────────────────────────────

const CEREMONIES: Record<number, MilestoneCeremony> = {
  1: {
    streak: 1,
    eyebrow: 'DAY ONE',
    label: 'First Chapter',
    headline: 'FIRST CHAPTER',
    narrative: 'You started.\nThat is already something.',
    identityShift: 'Your first reset is complete.',
    reflection: 'What made you decide to start today?',
    accentColor: Colors.success,
  },
  3: {
    streak: 3,
    eyebrow: 'THREE DAYS',
    label: 'Momentum Forming',
    headline: 'Momentum is forming.',
    narrative: 'Three days is where habit loops begin.\nYour brain is quietly building\nnew patterns around you.',
    identityShift: 'You are becoming someone who follows through.',
    reflection: 'What changed in the last three days?',
    accentColor: Colors.accent,
  },
  7: {
    streak: 7,
    eyebrow: 'SEVEN DAYS',
    label: 'First Week',
    headline: 'You kept showing up.',
    narrative: 'Seven days.\nSeven choices.\nSeven times you chose yourself\nover everything else.',
    identityShift: 'You are rebuilding trust with yourself.',
    reflection: 'What feels different after a full week?',
    accentColor: Colors.accent,
  },
  14: {
    streak: 14,
    eyebrow: 'FOURTEEN DAYS',
    label: 'The Rhythm Begins',
    headline: 'You are rebuilding trust with yourself.',
    narrative: 'Two weeks is where habits\nbegin to feel natural.\nSomething in you is shifting.',
    identityShift: 'Consistency is becoming part of how you see yourself.',
    reflection: 'What do you notice changing in you?',
    accentColor: Colors.gold,
  },
  21: {
    streak: 21,
    eyebrow: 'TWENTY-ONE DAYS',
    label: 'Three Weeks',
    headline: 'This is becoming part of your identity.',
    narrative: 'Three weeks.\nNot through willpower.\nThrough daily return.\nThat is more powerful.',
    identityShift: 'This is no longer a goal. It is a pattern.',
    reflection: 'What has showing up every day taught you about yourself?',
    accentColor: Colors.gold,
  },
  30: {
    streak: 30,
    eyebrow: 'THIRTY DAYS',
    label: 'Continuity Created',
    headline: 'This is becoming part of your identity.',
    narrative: 'One month of choosing yourself.\nWhat you built here is permanent.\nNo one can take it from you.',
    identityShift: 'Your routines are reshaping your future.',
    reflection: 'How is the person you were 30 days ago different from today?',
    accentColor: Colors.goldBright,
  },
  60: {
    streak: 60,
    eyebrow: 'SIXTY DAYS',
    label: 'Something Shifted Quietly',
    headline: 'Discipline now feels quieter.',
    narrative: 'Two months.\nWhat was effort\nis becoming instinct.\nThat is real transformation.',
    identityShift: 'You are no longer forcing it. It is becoming natural.',
    reflection: 'What changed most in these two months?',
    accentColor: Colors.gold,
  },
  90: {
    streak: 90,
    eyebrow: 'NINETY DAYS',
    label: 'You Did Not Give Up',
    headline: 'You are no longer starting over.',
    narrative: 'Ninety days.\nNot through perfection —\nthrough return.\nThis is who you are now.',
    identityShift: 'Returning has become your nature. Not just your goal.',
    reflection: 'What would you tell the version of you who started 90 days ago?',
    accentColor: Colors.goldBright,
  },
  100: {
    streak: 100,
    eyebrow: 'ONE HUNDRED',
    label: '100 Days',
    headline: 'One hundred days of choosing yourself.',
    narrative: 'One hundred is not a number.\nIt is a declaration.\nYou are someone who doesn\'t stop.',
    identityShift: 'One hundred days of returning to yourself.',
    reflection: 'What does reaching 100 days mean to you?',
    accentColor: Colors.accent,
  },
  180: {
    streak: 180,
    eyebrow: 'SIX MONTHS',
    label: 'Half a Year',
    headline: 'Six months of quiet consistency.',
    narrative: 'Half a year of returning.\nYou are not the same person\nwho began this journey.',
    identityShift: 'You returned, again and again. That is the whole practice.',
    reflection: 'What is fundamentally different about who you are now?',
    accentColor: Colors.goldBright,
  },
  365: {
    streak: 365,
    eyebrow: 'ONE FULL YEAR',
    label: 'A Year',
    headline: 'A different version of you exists now.',
    narrative: 'Three hundred sixty-five days.\nOne year of choosing yourself\nevery single day.\nYou rebuilt yourself. Completely.',
    identityShift: 'This is no longer a journey. This is who you are.',
    reflection: 'What did this year teach you that nothing else could?',
    accentColor: Colors.accent,
  },
};

export const CEREMONY_MILESTONES = [1, 3, 7, 14, 21, 30, 60, 90, 100, 180, 365] as const;

// ─── PT overrides for fields displayed in Progress + milestone screens ─────────
const CEREMONIES_PT_OVERRIDE: Partial<Record<number, Pick<MilestoneCeremony, 'headline' | 'identityShift' | 'eyebrow' | 'label'>>> = {
  1:   { eyebrow: 'DIA UM',          label: 'Primeiro Capítulo',          headline: 'PRIMEIRO CAPÍTULO',                     identityShift: 'Seu primeiro reset foi concluído.' },
  3:   { eyebrow: 'TRÊS DIAS',       label: 'Ritmo se Formando',          headline: 'O ritmo está se formando.',             identityShift: 'Você está se tornando alguém que segue em frente.' },
  7:   { eyebrow: 'SETE DIAS',       label: 'Primeira Semana',            headline: 'Você continuou aparecendo.',            identityShift: 'Você está reconstruindo a confiança em si mesma.' },
  14:  { eyebrow: 'QUATORZE DIAS',   label: 'O ritmo começa',             headline: 'Você está reconstruindo a confiança.', identityShift: 'A constância está se tornando parte de como você se vê.' },
  21:  { eyebrow: 'VINTE E UM DIAS', label: 'Três Semanas',               headline: 'Isso está se tornando parte de você.',  identityShift: 'Não é mais uma meta. É um padrão.' },
  30:  { eyebrow: 'TRINTA DIAS',     label: 'Você criou continuidade',    headline: 'Isso está se tornando parte de você.',  identityShift: 'Suas rotinas estão moldando seu futuro.' },
  60:  { eyebrow: 'SESSENTA DIAS',   label: 'Algo mudou silenciosamente', headline: 'A disciplina já parece mais quieta.',   identityShift: 'Você não está mais forçando. Está se tornando natural.' },
  90:  { eyebrow: 'NOVENTA DIAS',    label: 'Você não desistiu de si',    headline: 'Você não está mais recomeçando.',       identityShift: 'Voltar se tornou sua natureza. Não só seu objetivo.' },
  100: { eyebrow: 'CEM DIAS',        label: '100 Dias',                   headline: 'Cem dias escolhendo você mesma.',       identityShift: 'Cem dias voltando para si.' },
  180: { eyebrow: 'SEIS MESES',      label: 'Meio Ano',                   headline: 'Seis meses de constância quieta.',      identityShift: 'Você voltou, de novo e de novo. Essa é a prática toda.' },
  365: { eyebrow: 'UM ANO INTEIRO',  label: 'Um Ano',                     headline: 'Uma versão diferente de você existe agora.', identityShift: 'Isso não é mais uma jornada. É quem você é.' },
};

const CEREMONIES_FR_OVERRIDE: Partial<Record<number, Pick<MilestoneCeremony, 'headline' | 'identityShift' | 'eyebrow' | 'label' | 'narrative' | 'reflection'>>> = {
  1:   { eyebrow: 'JOUR UN',                   label: 'Premier chapitre',       headline: 'PREMIER CHAPITRE',                             identityShift: 'Ton premier reset est terminé.',                     narrative: 'Tu as commencé.\nC\'est déjà quelque chose.',                                                            reflection: 'Qu\'est-ce qui t\'a fait décider de commencer aujourd\'hui ?' },
  3:   { eyebrow: 'TROIS JOURS',               label: "L'élan se forme",        headline: "L'élan se forme.",                             identityShift: 'Tu deviens quelqu\'un qui tient ses engagements.',    narrative: 'Trois jours, c\'est là où les habitudes commencent.\nQuelque chose de tranquille\nse construit en toi.',  reflection: 'Qu\'est-ce qui a changé en trois jours ?' },
  7:   { eyebrow: 'SEPT JOURS',                label: 'Première semaine',       headline: 'Tu as continué à revenir.',                    identityShift: 'Tu reconstruis la confiance en toi.',                 narrative: 'Sept jours.\nSept choix.\nSept fois où tu t\'es choisi\navant tout le reste.',                            reflection: 'Qu\'est-ce qui semble différent après une semaine entière ?' },
  14:  { eyebrow: 'DEUX SEMAINES',             label: 'Le rythme commence',     headline: 'Tu reconstruis la confiance en toi.',          identityShift: 'La constance devient partie de ta vision de toi.',   narrative: 'Deux semaines, c\'est là où les habitudes\ncommencent à sembler naturelles.\nQuelque chose en toi se transforme.', reflection: 'Qu\'est-ce que tu remarques qui change en toi ?' },
  21:  { eyebrow: 'VINGT ET UN JOURS',         label: 'Trois semaines',         headline: 'Ceci devient partie de ton identité.',         identityShift: "Ce n'est plus un objectif. C'est un schéma.",        narrative: 'Vingt et un jours.\nPas par la volonté.\nPar le retour quotidien.\nC\'est plus puissant.',              reflection: 'Qu\'est-ce que se montrer chaque jour t\'a appris sur toi ?' },
  30:  { eyebrow: 'TRENTE JOURS',              label: 'La continuité est là',   headline: 'Ceci devient partie de ton identité.',         identityShift: 'Tes habitudes façonnent ton avenir.',                 narrative: 'Un mois à te choisir.\nCe que tu as construit ici est permanent.\nPersonne ne peut te l\'enlever.',      reflection: 'En quoi la personne que tu étais il y a 30 jours est différente d\'aujourd\'hui ?' },
  60:  { eyebrow: 'SOIXANTE JOURS',            label: 'Quelque chose a changé', headline: 'La discipline semble plus douce.',             identityShift: "Tu ne forces plus. C'est en train de devenir naturel.", narrative: 'Deux mois.\nCe qui était effort\ndevient instinct.\nC\'est une vraie transformation.',                  reflection: 'Qu\'est-ce qui a le plus changé en deux mois ?' },
  90:  { eyebrow: 'QUATRE-VINGT-DIX JOURS',    label: "Tu n'as pas abandonné",  headline: 'Tu ne recommences plus de zéro.',              identityShift: 'Revenir est devenu ta nature. Pas seulement ton objectif.', narrative: 'Quatre-vingt-dix jours.\nPas par la perfection —\npar le retour.\nC\'est qui tu es maintenant.',        reflection: 'Que dirais-tu à la version de toi qui a commencé il y a 90 jours ?' },
  100: { eyebrow: 'CENT JOURS',                label: '100 jours',              headline: 'Cent jours à te choisir.',                     identityShift: 'Cent jours à revenir à toi.',                         narrative: 'Cent jours à te montrer.\nCertains difficiles. Certains simples.\nTous comptent.\nC\'est qui tu es.',  reflection: 'Qu\'est-ce qu\'atteindre 100 jours signifie pour toi ?' },
  180: { eyebrow: 'SIX MOIS',                  label: 'Six mois',               headline: 'Six mois de constance tranquille.',            identityShift: "Tu es revenu, encore et encore. C'est toute la pratique.", narrative: 'Six mois de retours.\nTu n\'es plus la même personne\nqu\'au début de ce chemin.',                      reflection: 'Qu\'est-ce qui est fondamentalement différent en toi maintenant ?' },
  365: { eyebrow: 'UNE ANNÉE ENTIÈRE',         label: 'Un an',                  headline: 'Une autre version de toi existe maintenant.', identityShift: "Ce n'est plus un voyage. C'est qui tu es.",           narrative: 'Trois cent soixante-cinq jours.\nUn an à te choisir\nchaque jour.\nTu t\'es reconstruit. Vraiment.',   reflection: 'Qu\'est-ce que cette année t\'a appris que rien d\'autre n\'aurait pu ?' },
};

const CEREMONIES_DE_OVERRIDE: Partial<Record<number, Pick<MilestoneCeremony, 'headline' | 'identityShift' | 'eyebrow' | 'label' | 'narrative' | 'reflection'>>> = {
  1:   { eyebrow: 'TAG EINS',               label: 'Erstes Kapitel',              headline: 'ERSTES KAPITEL',                              identityShift: 'Dein erster Reset ist abgeschlossen.',                    narrative: 'Du hast begonnen.\nDas ist schon etwas.',                                                                  reflection: 'Was hat dich heute dazu bewogen anzufangen?' },
  3:   { eyebrow: 'DREI TAGE',              label: 'Schwung entsteht',            headline: 'Schwung entsteht.',                           identityShift: 'Du wirst jemand, der sein Wort hält.',                    narrative: 'Drei Tage ist der Punkt, an dem Gewohnheiten beginnen.\nEtwas Stilles\nbaut sich in dir auf.',                 reflection: 'Was hat sich in den letzten drei Tagen verändert?' },
  7:   { eyebrow: 'SIEBEN TAGE',            label: 'Erste Woche',                 headline: 'Du bist weiter erschienen.',                  identityShift: 'Du baust wieder Vertrauen in dich auf.',                  narrative: 'Sieben Tage.\nSieben Entscheidungen.\nSiebenmal hast du dich gewählt\nvor allem anderen.',                   reflection: 'Was fühlt sich anders an nach einer vollen Woche?' },
  14:  { eyebrow: 'VIERZEHN TAGE',          label: 'Der Rhythmus beginnt',        headline: 'Du baust wieder Vertrauen in dich auf.',      identityShift: 'Beständigkeit wird Teil davon, wie du dich siehst.',     narrative: 'Zwei Wochen ist der Punkt, an dem Gewohnheiten\nnatürlich zu fühlen beginnen.\nEtwas in dir verändert sich.',  reflection: 'Was bemerkst du, das sich in dir verändert?' },
  21:  { eyebrow: 'EINUNDZWANZIG TAGE',     label: 'Drei Wochen',                 headline: 'Das wird Teil deiner Identität.',             identityShift: 'Das ist kein Ziel mehr. Es ist ein Muster.',              narrative: 'Einundzwanzig Tage.\nNicht durch Willenskraft.\nDurch tägliche Rückkehr.\nDas ist mächtiger.',                 reflection: 'Was hat dir das tägliche Erscheinen über dich gelehrt?' },
  30:  { eyebrow: 'DREISSIG TAGE',          label: 'Kontinuität geschaffen',      headline: 'Das wird Teil deiner Identität.',             identityShift: 'Deine Routinen gestalten deine Zukunft.',                 narrative: 'Ein Monat, dich zu wählen.\nWas du hier aufgebaut hast, ist dauerhaft.\nNiemand kann es dir nehmen.',          reflection: 'Wie unterscheidet sich die Person, die du vor 30 Tagen warst, von heute?' },
  60:  { eyebrow: 'SECHZIG TAGE',           label: 'Etwas hat sich still verändert', headline: 'Disziplin fühlt sich stiller an.',        identityShift: 'Du zwingst dich nicht mehr. Es wird natürlich.',          narrative: 'Zwei Monate.\nWas Anstrengung war\nwird Instinkt.\nDas ist echte Transformation.',                           reflection: 'Was hat sich in diesen zwei Monaten am meisten verändert?' },
  90:  { eyebrow: 'NEUNZIG TAGE',           label: 'Du hast nicht aufgegeben',    headline: 'Du fängst nicht mehr von vorne an.',          identityShift: 'Zurückkehren ist deine Natur geworden. Nicht nur dein Ziel.', narrative: 'Neunzig Tage.\nNicht durch Perfektion —\ndurch Rückkehr.\nDas bist du jetzt.',                              reflection: 'Was würdest du der Version von dir sagen, die vor 90 Tagen begann?' },
  100: { eyebrow: 'HUNDERT TAGE',           label: '100 Tage',                    headline: 'Hundert Tage, dich zu wählen.',               identityShift: 'Hundert Tage des Zurückkommens zu dir.',                  narrative: 'Hundert Tage erscheinen.\nEinige schwer. Einige leicht.\nAlle zählen.\nDas bist du.',                          reflection: 'Was bedeutet es dir, 100 Tage zu erreichen?' },
  180: { eyebrow: 'EIN HALBES JAHR',        label: 'Ein halbes Jahr',             headline: 'Ein halbes Jahr stiller Beständigkeit.',      identityShift: 'Du bist zurückgekehrt, immer wieder. Das ist die ganze Praxis.', narrative: 'Ein halbes Jahr des Zurückkommens.\nDu bist nicht mehr dieselbe Person\ndie diese Reise begann.',          reflection: 'Was ist an dir jetzt fundamental anders?' },
  365: { eyebrow: 'EIN GANZES JAHR',        label: 'Ein Jahr',                    headline: 'Eine andere Version von dir existiert jetzt.', identityShift: 'Das ist keine Reise mehr. Das bist du.',                  narrative: 'Dreihundertfünfundsechzig Tage.\nEin Jahr, dich zu wählen\njedem einzelnen Tag.\nDu hast dich neu aufgebaut. Vollständig.', reflection: 'Was hat dieses Jahr dir gelehrt, was sonst nichts hätte?' },
};

function applyFrCeremony(c: MilestoneCeremony): MilestoneCeremony {
  if (!isFr()) return c;
  const fr = CEREMONIES_FR_OVERRIDE[c.streak];
  return fr ? { ...c, ...fr } : c;
}

function applyPtCeremony(c: MilestoneCeremony): MilestoneCeremony {
  if (!isPt()) return c;
  const pt = CEREMONIES_PT_OVERRIDE[c.streak];
  return pt ? { ...c, ...pt } : c;
}

function applyEsCeremony(c: MilestoneCeremony): MilestoneCeremony {
  if (!isEs()) return c;
  const esOverride = CEREMONY_ES_OVERRIDES[c.streak] ?? {};
  const eyebrow = c.eyebrow
    .replace('DAY ONE', 'DÍA UNO').replace('THREE', 'TRES').replace('SEVEN', 'SIETE')
    .replace('FOURTEEN', 'CATORCE').replace('TWENTY-ONE', 'VEINTIÚN').replace('THIRTY', 'TREINTA')
    .replace('SIXTY', 'SESENTA').replace('NINETY', 'NOVENTA').replace('ONE HUNDRED', 'CIEN')
    .replace('SIX MONTHS', 'SEIS MESES').replace('ONE FULL YEAR', 'UN AÑO COMPLETO')
    .replace('DAYS', 'DÍAS');
  return { ...c, eyebrow, ...esOverride };
}

function applyDeCeremony(c: MilestoneCeremony): MilestoneCeremony {
  if (!isDe()) return c;
  const de = CEREMONIES_DE_OVERRIDE[c.streak];
  return de ? { ...c, ...de } : c;
}

// ─── Total completions milestones (System 3 — accumulative, never resets) ─────
// These fire based on total days completed (not streak), so they survive comebacks.

export interface TotalCompletionMilestone {
  total: number;
  headline: string;
  narrative: string;
}

export const TOTAL_COMPLETION_MILESTONES: TotalCompletionMilestone[] = [
  {
    total: 10,
    headline: 'Ten moments you chose yourself.',
    narrative: 'Ten resets.\nEach one mattered.\nEach one still does.',
  },
  {
    total: 25,
    headline: 'Twenty-five resets.',
    narrative: "Twenty-five times you didn't give up.\nThat's not luck — that's character.",
  },
  {
    total: 50,
    headline: 'Fifty days of this.',
    narrative: 'Of choosing to show up.\nFifty quiet acts of self-respect.\nThat number is permanent.',
  },
  {
    total: 100,
    headline: 'One hundred returns to yourself.',
    narrative: "A hundred days of showing up.\nSome were hard.\nSome were easy.\nAll of them count.\nThis is who you are.",
  },
];

/** Returns a total-completion milestone if total matches, null otherwise. */
export function getTotalCompletionMilestone(total: number): TotalCompletionMilestone | null {
  return TOTAL_COMPLETION_MILESTONES.find(m => m.total === total) ?? null;
}

/** Returning after absence — compassionate messages for useMilestones. */
export function getReturnMilestoneMessage(daysMissed: number): { headline: string; narrative: string } | null {
  const fr = isFr();
  const es = isEs();
  const pt = isPt();
  const de = isDe();
  if (daysMissed >= 7) {
    return {
      headline: de ? 'Du bist zurückgekehrt.' : fr ? 'Tu es revenu.' : es ? 'Volviste.' : pt ? 'Você voltou.' : 'You came back.',
      narrative: de ? 'Das ist alles, was zählt.' : fr ? 'C\'est tout ce qui compte.' : es ? 'Eso es lo que importa.' : pt ? 'Isso é o que importa.' : "That's the whole point.",
    };
  }
  if (daysMissed >= 3) {
    return {
      headline: de ? 'Du bist zurückgekehrt.' : fr ? 'Tu es revenu.' : es ? 'Volviste.' : pt ? 'Você voltou.' : 'You came back.',
      narrative: de ? 'Kein Nachholen.\nKeine Schuld.\nNur heute.' : fr ? 'Pas de rattrapage.\nPas de culpabilité.\nJuste aujourd\'hui.' : es ? 'Sin ponerte al día.\nSin culpa.\nSolo hoy.' : pt ? 'Sem recuperar.\nSem culpa.\nSó hoje.' : 'No catching up.\nNo guilt.\nJust today.',
    };
  }
  return null;
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export function getMilestoneCeremony(streak: number): MilestoneCeremony | null {
  return CEREMONIES[streak] ?? null;
}

const CEREMONY_ES_OVERRIDES: Partial<Record<number, Partial<Pick<MilestoneCeremony, 'label' | 'headline' | 'identityShift' | 'narrative' | 'reflection'>>>> = {
  1:   { label: 'El comienzo',           headline: 'El comienzo.',               identityShift: 'Hoy volviste a ti.',                narrative: 'Empezaste.\nEso ya es algo.',                                     reflection: '¿Qué te hizo decidir empezar hoy?' },
  3:   { label: 'Impulso en formación', headline: 'El impulso está tomando forma.', identityShift: 'Te estás convirtiendo en alguien que cumple.', narrative: 'Tres días es donde empiezan los hábitos.\nAlgo silencioso\nse está construyendo en ti.', reflection: '¿Qué cambió en los últimos tres días?' },
  7:   { label: 'Una semana',           headline: 'Seguiste apareciendo.',      identityShift: 'Estás reconstruyendo confianza en ti mismo.', narrative: 'Siete días.\nSiete elecciones.\nSiete veces que te elegiste a ti.',   reflection: '¿Qué se siente diferente después de una semana completa?' },
  14:  { label: 'Dos semanas',          headline: 'Estás reconstruyendo confianza en ti mismo.', identityShift: 'La consistencia está convirtiéndose en parte de cómo te ves.', narrative: 'Dos semanas es donde los hábitos\nempiezan a sentirse naturales.\nAlgo en ti está cambiando.', reflection: '¿Qué notas que está cambiando en ti?' },
  21:  { label: 'Tres semanas',         headline: 'El patrón está aquí.',       identityShift: 'Esto ya no es un objetivo. Es un patrón.',         narrative: 'Veintiún días.\nEl patrón ya existe.\nNunca podrás deshacer lo que construiste.', reflection: '¿Qué parte de ti cambió silenciosamente?' },
  30:  { label: 'Un mes',               headline: 'Los regresos se convirtieron en continuidad.', identityShift: 'Has construido algo real.',      narrative: 'Un mes de apariciones.\nAlgunas fáciles. Algunas no.\nTodas importan igualmente.',          reflection: '¿Quién eras hace un mes?' },
  60:  { label: 'Dos meses',            headline: 'La disciplina es tu nueva normalidad.', identityShift: 'La disciplina ya es tu nueva normalidad.', narrative: 'Sesenta días de regresarte a ti mismo.\nEso ya no es motivación.\nEs identidad.',      reflection: '¿Qué creías que era difícil que ahora se siente normal?' },
  90:  { label: 'Noventa días',         headline: 'La disciplina ahora es tu identidad.', identityShift: 'La disciplina ahora es tu identidad.',   narrative: 'Noventa días.\nLo que construiste aquí es real.\nEsto ya no es un camino. Es quien eres.', reflection: '¿Qué te diría la persona que eras hace 90 días?' },
  100: { label: 'Cien días',            headline: 'Cien regresos a ti mismo.',  identityShift: 'Un hito que la mayoría nunca alcanza.',            narrative: 'Cien días de aparecer.\nAlgunos difíciles. Algunos sencillos.\nTodos cuentan.\nEsto es quien eres.', reflection: '¿Qué te enseñó el día más difícil de estos cien?' },
  180: { label: 'Medio año',            headline: 'Medio año de presencia.',    identityShift: 'La mayoría sueña con lo que tú estás viviendo.',   narrative: 'Ciento ochenta días.\nUn regreso a la vez.\nEso es todo lo que necesitaba ser.',        reflection: '¿Cómo ha cambiado tu relación contigo mismo?' },
  365: { label: 'Un año',               headline: 'Esto ya no es un camino. Es quien eres.', identityShift: 'Esto ya no es un viaje. Esto es quien eres.', narrative: 'Un año completo.\nNo de perfección.\nDe presencia.\nEso es suficiente.',            reflection: '¿Qué le dirías a quien empieza hoy?' },
};

export function getMilestoneCeremonyOrNearest(streak: number): MilestoneCeremony {
  if (CEREMONIES[streak]) {
    const c = CEREMONIES[streak];
    if (isDe()) {
      const deOverride = CEREMONIES_DE_OVERRIDE[streak] ?? {};
      return { ...c, ...deOverride };
    }
    if (isEs()) {
      const esOverride = CEREMONY_ES_OVERRIDES[streak] ?? {};
      return {
        ...c,
        ...esOverride,
        eyebrow: c.eyebrow.replace('DAYS', 'DÍAS').replace('YEAR', 'AÑO').replace('MONTHS', 'MESES').replace('MONTH', 'MES').replace('WEEKS', 'SEMANAS').replace('WEEK', 'SEMANA').replace('ONE HUNDRED', 'CIEN').replace('NINETY', 'NOVENTA').replace('SIXTY', 'SESENTA').replace('THIRTY', 'TREINTA').replace('TWENTY-ONE', 'VEINTIÚN').replace('FOURTEEN', 'CATORCE').replace('SEVEN', 'SIETE').replace('THREE', 'TRES').replace('DAY ONE', 'DÍA UNO'),
      };
    }
    if (isFr()) {
      const frOverride = CEREMONIES_FR_OVERRIDE[streak] ?? {};
      return { ...c, ...frOverride };
    }
    if (isPt()) {
      const ptOverride = CEREMONIES_PT_OVERRIDE[streak] ?? {};
      return { ...c, ...ptOverride };
    }
    return c;
  }
  const es = isEs();
  const fr = isFr();
  const de = isDe();
  // Fallback for non-standard milestones
  return {
    streak,
    eyebrow: de ? `${streak} TAGE` : es ? `${streak} DÍAS` : fr ? `${streak} JOURS` : `${streak} DAYS`,
    label: de ? `${streak} Tage` : es ? `${streak} Días` : fr ? `${streak} jours` : `${streak} Days`,
    headline: de ? 'Du bist weiter erschienen.' : es ? 'Seguiste apareciendo.' : fr ? 'Tu as continué à revenir.' : 'You kept showing up.',
    narrative: de
      ? `${streak} Tage, dich zu wählen.\nJeder war eine echte Entscheidung.\nDiese Zahl ist dauerhaft.`
      : es
      ? `${streak} días eligiéndote.\nCada uno fue una elección real.\nEse número es permanente.`
      : fr
      ? `${streak} jours à te choisir.\nChacun était un vrai choix.\nCe nombre est permanent.`
      : `${streak} days of choosing yourself.\nEach one was a real choice.\nThat number is permanent.`,
    identityShift: de ? 'Du beweist dir selbst etwas.' : es ? 'Te estás demostrando algo.' : fr ? 'Tu te prouves quelque chose.' : 'You are proving something to yourself.',
    reflection: de ? 'Was hat dir Beständigkeit gelehrt?' : es ? '¿Qué te ha enseñado la consistencia?' : fr ? 'Qu\'est-ce que la constance t\'a appris ?' : 'What has consistency taught you?',
    accentColor: Colors.accent,
  };
}

export function getMilestoneReflection(streak: number): string {
  const base = CEREMONIES[streak]?.reflection;
  if (isDe()) return CEREMONIES_DE_OVERRIDE[streak]?.reflection ?? base ?? 'Was hat dir das regelmäßige Erscheinen über dich gelehrt?';
  if (isEs()) return base ?? '¿Qué te ha enseñado mostrarte consistentemente?';
  if (isFr()) return CEREMONIES_FR_OVERRIDE[streak]?.reflection ?? base ?? 'Qu\'est-ce que se montrer régulièrement t\'a appris ?';
  if (isPt()) return base ?? 'O que aparecer consistentemente te ensinou?';
  return base ?? 'What has showing up consistently taught you?';
}

/** Preview copy for the upcoming milestone (shown in Today + Progress). */
export function getUpcomingMilestonePreview(
  streak: number,
): { daysAway: number; milestone: number; message: string } | null {
  const next = CEREMONY_MILESTONES.find(m => m > streak);
  if (!next) return null;
  const daysAway = next - streak;

  const lbl = CEREMONIES[next]?.label ?? (isDe() ? `Tag ${next}` : isEs() ? `Día ${next}` : isPt() ? `Dia ${next}` : isFr() ? `Jour ${next}` : `Day ${next}`);
  const message = isDe()
    ? (daysAway === 1 ? `Die Reise geht morgen weiter.`
      : daysAway <= 3 ? `Rückkehren beginnt Rhythmus zu schaffen.`
      : daysAway <= 7 ? `Der Raum ist noch hier.`
      : null)
    : isEs()
    ? (daysAway === 1 ? `Mañana la jornada continúa.`
      : daysAway <= 3 ? `Los regresos empiezan a crear ritmo.`
      : daysAway <= 7 ? `El espacio sigue aquí.`
      : null)
    : isPt()
    ? (daysAway === 1 ? `Amanhã a jornada continua.`
      : daysAway <= 3 ? `Os retornos começam a criar ritmo.`
      : daysAway <= 7 ? `O espaço continua aqui.`
      : null)
    : isFr()
    ? (daysAway === 1 ? `Le voyage continue demain.`
      : daysAway <= 3 ? `Les retours commencent à créer un rythme.`
      : daysAway <= 7 ? `L'espace est toujours là.`
      : null)
    : (daysAway === 1 ? `The journey continues tomorrow.`
      : daysAway <= 3 ? `Something is taking shape here.`
      : daysAway <= 7 ? `The space is still here.`
      : null);

  if (!message) return null;
  return { daysAway, milestone: next, message };
}

/** All milestones a streak has passed — for history display. */
export function getEarnedMilestones(streak: number): MilestoneCeremony[] {
  return CEREMONY_MILESTONES
    .filter(m => streak >= m)
    .map(m => CEREMONIES[m])
    .filter(Boolean)
    .map(c => applyLangCeremony(c as MilestoneCeremony));
}

/**
 * Returns the current emotional chapter name based on streak.
 * Used in Today and Progress screens to show the user which chapter they are in.
 * Returns null for streaks below 3 (too early for chapter identity).
 */
function applyLangCeremony(c: MilestoneCeremony): MilestoneCeremony {
  return applyDeCeremony(applyEsCeremony(applyPtCeremony(applyFrCeremony(c))));
}

export function getCurrentChapterName(streak: number): string | null {
  if (streak >= 365) return applyLangCeremony(CEREMONIES[365]!).label;
  if (streak >= 180) return applyLangCeremony(CEREMONIES[180]!).label;
  if (streak >= 100) return applyLangCeremony(CEREMONIES[100]!).label;
  if (streak >= 90)  return applyLangCeremony(CEREMONIES[90]!).label;
  if (streak >= 60)  return applyLangCeremony(CEREMONIES[60]!).label;
  if (streak >= 30)  return applyLangCeremony(CEREMONIES[30]!).label;
  if (streak >= 21)  return applyLangCeremony(CEREMONIES[21]!).label;
  if (streak >= 14)  return applyLangCeremony(CEREMONIES[14]!).label;
  if (streak >= 7)   return applyLangCeremony(CEREMONIES[7]!).label;
  if (streak >= 3)   return applyLangCeremony(CEREMONIES[3]!).label;
  return null;
}

// ─── Quiet Milestones (Progress screen) ──────────────────────────────────────
// Based on totalDays (accumulative, never resets on missed days).
// Each milestone has 2 quiet, observational lines — never celebratory.
// Window: show within 3 days of the milestone (m, m+1, m+2).

export interface QuietMilestone {
  line1: string;
  line2: string;
}

type LM = Record<string, string>;
function qpick(map: LM, lang: string): string { return map[lang] ?? map['en'] ?? ''; }

const QUIET_MILESTONES: Array<{ total: number; l1: LM; l2: LM }> = [
  {
    total: 7,
    l1: {
      en: 'Seven moments of making space.',
      pt: 'Sete momentos de criar espaço.',
      es: 'Siete momentos de hacer espacio.',
      fr: 'Sept moments à te faire de la place.',
      de: 'Sieben Momente des Raumgebens.',
    },
    l2: {
      en: 'One week in.',
      pt: 'Uma semana.',
      es: 'Una semana.',
      fr: 'Une semaine.',
      de: 'Eine Woche.',
    },
  },
  {
    total: 14,
    l1: {
      en: 'Fourteen small returns.',
      pt: 'Quatorze pequenos retornos.',
      es: 'Catorce pequeños regresos.',
      fr: 'Quatorze petits retours.',
      de: 'Vierzehn kleine Rückkehren.',
    },
    l2: {
      en: 'Something is beginning to take shape.',
      pt: 'Algo está começando a tomar forma.',
      es: 'Algo empieza a tomar forma.',
      fr: 'Quelque chose commence à prendre forme.',
      de: 'Etwas beginnt, Form anzunehmen.',
    },
  },
  {
    total: 21,
    l1: {
      en: 'Twenty-one times you came back.',
      pt: 'Vinte e uma vezes você voltou.',
      es: 'Veintiún veces que volviste.',
      fr: 'Vingt et une fois où tu es revenu.',
      de: 'Einundzwanzig Mal bist du zurückgekehrt.',
    },
    l2: {
      en: 'Three weeks of quiet presence.',
      pt: 'Três semanas de presença quieta.',
      es: 'Tres semanas de presencia tranquila.',
      fr: 'Trois semaines de présence tranquille.',
      de: 'Drei Wochen stiller Präsenz.',
    },
  },
  {
    total: 30,
    l1: {
      en: 'Thirty pauses — each one yours.',
      pt: 'Trinta pausas — cada uma sua.',
      es: 'Treinta pausas — cada una tuya.',
      fr: 'Trente pauses — chacune à toi.',
      de: 'Dreißig Pausen — jede davon gehört dir.',
    },
    l2: {
      en: 'That number doesn\'t go away.',
      pt: 'Esse número não vai embora.',
      es: 'Ese número no desaparece.',
      fr: 'Ce nombre ne disparaît pas.',
      de: 'Diese Zahl geht nicht weg.',
    },
  },
  {
    total: 50,
    l1: {
      en: 'Fifty moments of checking in with yourself.',
      pt: 'Cinquenta momentos de se conectar com você mesma.',
      es: 'Cincuenta momentos de reconectar contigo.',
      fr: 'Cinquante moments de connexion avec toi-même.',
      de: 'Fünfzig Momente des Einchecken bei dir selbst.',
    },
    l2: {
      en: 'One at a time.',
      pt: 'Um de cada vez.',
      es: 'Uno a la vez.',
      fr: 'Un à la fois.',
      de: 'Eins nach dem anderen.',
    },
  },
  {
    total: 75,
    l1: {
      en: 'Seventy-five times you made space for this.',
      pt: 'Setenta e cinco vezes você criou espaço para isso.',
      es: 'Setenta y cinco veces hiciste espacio para esto.',
      fr: 'Soixante-quinze fois où tu as fait de la place pour ça.',
      de: 'Fünfundsiebzig Mal hast du Raum dafür geschaffen.',
    },
    l2: {
      en: 'That adds up to something.',
      pt: 'Isso vai se somando.',
      es: 'Eso va sumando.',
      fr: 'Ça finit par compter.',
      de: 'Das summiert sich zu etwas.',
    },
  },
  {
    total: 100,
    l1: {
      en: 'One hundred quiet check-ins.',
      pt: 'Cem momentos de presença quieta.',
      es: 'Cien momentos de presencia tranquila.',
      fr: 'Cent moments de présence tranquille.',
      de: 'Hundert stille Check-ins.',
    },
    l2: {
      en: 'One hundred small pauses. One day at a time.',
      pt: 'Cem pequenas pausas. Um dia de cada vez.',
      es: 'Cien pequeñas pausas. Un día a la vez.',
      fr: 'Cent petites pauses. Un jour à la fois.',
      de: 'Hundert kleine Pausen. Einen Tag nach dem anderen.',
    },
  },
  {
    total: 150,
    l1: {
      en: 'A hundred and fifty returns.',
      pt: 'Cento e cinquenta retornos.',
      es: 'Ciento cincuenta regresos.',
      fr: 'Cent cinquante retours.',
      de: 'Hundertfünfzig Rückkehren.',
    },
    l2: {
      en: 'The space is still here.',
      pt: 'O espaço continua aqui.',
      es: 'El espacio sigue aquí.',
      fr: "L'espace est toujours là.",
      de: 'Der Raum ist noch hier.',
    },
  },
  {
    total: 200,
    l1: {
      en: 'Two hundred moments, over time.',
      pt: 'Duzentos momentos, ao longo do tempo.',
      es: 'Doscientos momentos, con el tiempo.',
      fr: 'Deux cents moments, au fil du temps.',
      de: 'Zweihundert Momente, über die Zeit.',
    },
    l2: {
      en: 'That is a lot of showing up.',
      pt: 'Isso é muita presença.',
      es: 'Eso es mucha presencia.',
      fr: "C'est beaucoup de présence.",
      de: 'Das ist viel Erscheinen.',
    },
  },
  {
    total: 300,
    l1: {
      en: 'Three hundred small pauses.',
      pt: 'Trezentas pequenas pausas.',
      es: 'Trescientas pequeñas pausas.',
      fr: 'Trois cents petites pauses.',
      de: 'Dreihundert kleine Pausen.',
    },
    l2: {
      en: 'Still here.',
      pt: 'Ainda aqui.',
      es: 'Todavía aquí.',
      fr: 'Toujours là.',
      de: 'Noch hier.',
    },
  },
  {
    total: 365,
    l1: {
      en: 'Three hundred and sixty-five moments dedicated to yourself.',
      pt: 'Trezentos e sessenta e cinco momentos dedicados a você mesma.',
      es: 'Trescientos sesenta y cinco momentos dedicados a ti.',
      fr: 'Trois cent soixante-cinq moments dédiés à toi.',
      de: 'Dreihundertfünfundsechzig Momente, dir gewidmet.',
    },
    l2: {
      en: 'A full year of coming back.',
      pt: 'Um ano inteiro de voltar.',
      es: 'Un año completo de volver.',
      fr: 'Une année entière de retours.',
      de: 'Ein volles Jahr des Zurückkommens.',
    },
  },
];

/**
 * Returns quiet milestone copy for the Progress screen, or null.
 * Fires only within a 3-day window of each milestone (total, total+1, total+2).
 */
export function getQuietMilestoneCopy(totalDays: number, lang: string): QuietMilestone | null {
  const entry = QUIET_MILESTONES.find(
    m => totalDays >= m.total && totalDays <= m.total + 2
  );
  if (!entry) return null;
  return {
    line1: qpick(entry.l1, lang),
    line2: qpick(entry.l2, lang),
  };
}

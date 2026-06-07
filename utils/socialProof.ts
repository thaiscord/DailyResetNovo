// ─── Internal Social Proof System ────────────────────────────────────────────
// Subtle anonymous community insights that create emotional normalization.
// Goal: "Other people are rebuilding themselves too."
//
// Rules:
// - Never fake statistics ("1,247,832 users")
// - Never pressure or compare
// - Never create competition or social feed mechanics
// - Always feel honest, grounded, psychologically comforting
// - Appear rarely — only where emotionally meaningful

export type InsightContext =
  | 'comeback'      // user returning after absence
  | 'milestone'     // user reached a milestone
  | 'progress'      // on the progress screen
  | 'completion'    // after daily reset completion
  | 'early_days'    // days 1–7 (hardest phase)
  | 'recap'         // in weekly recap
  | 'general';      // fallback

export interface CommunityInsight {
  text: string;
  context: InsightContext;
}

// ─── Content pools ────────────────────────────────────────────────────────────

const COMEBACK: CommunityInsight[] = [
  { text: 'Many users rebuild momentum multiple times. Returning is the practice.', context: 'comeback' },
  { text: 'Consistency is rarely perfect. What matters is that you came back.', context: 'comeback' },
  { text: 'Most people miss days. Very few stop completely.', context: 'comeback' },
  { text: 'Returning after a hard week is more common than most realize.', context: 'comeback' },
  { text: 'Momentum grows through consistent return, not perfection.', context: 'comeback' },
  { text: 'Progress is built through return, not through perfection.', context: 'comeback' },
  { text: 'Momentum doesn\'t disappear. It waits.', context: 'comeback' },
];

const COMEBACK_PT: CommunityInsight[] = [
  { text: 'Muitas pessoas recomeçam mais de uma vez. Voltar é a prática.', context: 'comeback' },
  { text: 'A consistência raramente é perfeita. O que importa é que você voltou.', context: 'comeback' },
  { text: 'A maioria das pessoas perde dias. Muito poucas param completamente.', context: 'comeback' },
  { text: 'Voltar depois de uma semana difícil é mais comum do que se imagina.', context: 'comeback' },
  { text: 'O impulso cresce com o retorno constante, não com a perfeição.', context: 'comeback' },
  { text: 'O progresso se constrói com o retorno, não com a perfeição.', context: 'comeback' },
  { text: 'O impulso não desaparece. Ele espera.', context: 'comeback' },
];

const COMEBACK_ES: CommunityInsight[] = [
  { text: 'Muchas personas reconstruyen el impulso varias veces. Volver es la práctica.', context: 'comeback' },
  { text: 'La constancia rara vez es perfecta. Lo que importa es que volviste.', context: 'comeback' },
  { text: 'La mayoría de las personas pierde días. Muy pocas se detienen por completo.', context: 'comeback' },
  { text: 'Volver después de una semana difícil es más común de lo que se cree.', context: 'comeback' },
  { text: 'El impulso crece con el regreso constante, no con la perfección.', context: 'comeback' },
  { text: 'El progreso se construye con el regreso, no con la perfección.', context: 'comeback' },
  { text: 'El impulso no desaparece. Espera.', context: 'comeback' },
];

const COMEBACK_FR: CommunityInsight[] = [
  { text: 'Beaucoup de gens reconstruisent leur élan plusieurs fois. Revenir, c\'est la pratique.', context: 'comeback' },
  { text: 'La régularité est rarement parfaite. Ce qui compte, c\'est que tu sois revenu.', context: 'comeback' },
  { text: 'La plupart des gens manquent des jours. Très peu s\'arrêtent complètement.', context: 'comeback' },
  { text: 'Revenir après une semaine difficile est plus courant qu\'on ne le croit.', context: 'comeback' },
  { text: 'L\'élan grandit par le retour constant, pas par la perfection.', context: 'comeback' },
  { text: 'Le progrès se construit par le retour, pas par la perfection.', context: 'comeback' },
  { text: 'L\'élan ne disparaît pas. Il attend.', context: 'comeback' },
];

const COMEBACK_DE: CommunityInsight[] = [
  { text: 'Viele Menschen bauen ihren Schwung mehrmals auf. Zurückzukehren ist die Übung.', context: 'comeback' },
  { text: 'Beständigkeit ist selten perfekt. Was zählt, ist, dass du zurückgekehrt bist.', context: 'comeback' },
  { text: 'Die meisten Menschen verpassen Tage. Sehr wenige hören ganz auf.', context: 'comeback' },
  { text: 'Nach einer schweren Woche zurückzukehren ist häufiger als man denkt.', context: 'comeback' },
  { text: 'Schwung wächst durch beständige Rückkehr, nicht durch Perfektion.', context: 'comeback' },
  { text: 'Fortschritt entsteht durch Rückkehr, nicht durch Perfektion.', context: 'comeback' },
  { text: 'Schwung verschwindet nicht. Er wartet.', context: 'comeback' },
];

const MILESTONE: CommunityInsight[] = [
  { text: 'Thousands have felt exactly this moment.', context: 'milestone' },
  { text: 'Most users notice the shift right around here.', context: 'milestone' },
  { text: 'Momentum grows slowly for nearly everyone — and then it doesn\'t.', context: 'milestone' },
  { text: 'Something meaningful is forming at this point.', context: 'milestone' },
  { text: 'This kind of quiet consistency is real.', context: 'milestone' },
  { text: 'Many users say the biggest change comes after a milestone like this.', context: 'milestone' },
];

const PROGRESS: CommunityInsight[] = [
  { text: 'Thousands are rebuilding consistency right now.', context: 'progress' },
  { text: 'Most users see the biggest change between week 2 and week 4.', context: 'progress' },
  { text: 'Many users feel uncertain at this exact point. They kept going.', context: 'progress' },
  { text: 'Consistency is built quietly, in moments no one else sees.', context: 'progress' },
  { text: 'Progress feels slower from the inside than it looks from the outside.', context: 'progress' },
  { text: 'Many users underestimate how much they\'ve changed until they look back.', context: 'progress' },
];

const COMPLETION: CommunityInsight[] = [
  { text: 'Thousands completed their reset today too.', context: 'completion' },
  { text: 'Small daily actions create quiet but real change.', context: 'completion' },
  { text: 'Every completed reset counts — especially the ones done on hard days.', context: 'completion' },
  { text: 'Many complete their reset feeling exactly the way you feel right now.', context: 'completion' },
];

const COMPLETION_ES: CommunityInsight[] = [
  { text: 'Miles completaron su reset hoy también.', context: 'completion' },
  { text: 'Las pequeñas acciones crean cambios reales y silenciosos.', context: 'completion' },
  { text: 'Cada reset cuenta — especialmente los de los días difíciles.', context: 'completion' },
  { text: 'Incluso así, sigues aquí.', context: 'completion' },
];

const COMPLETION_PT: CommunityInsight[] = [
  { text: 'Muitas pessoas completaram o ritual hoje também.', context: 'completion' },
  { text: 'Ações pequenas criam mudanças reais e silenciosas.', context: 'completion' },
  { text: 'Todo reset conta — especialmente os feitos nos dias difíceis.', context: 'completion' },
  { text: 'Mesmo assim, você continua aqui.', context: 'completion' },
];

const EARLY_DAYS: CommunityInsight[] = [
  { text: 'Many users struggle most around this point. You\'re in good company.', context: 'early_days' },
  { text: 'The first week is the hardest for most people. You\'re still here.', context: 'early_days' },
  { text: 'Most users feel uncertain at the start. Most also continue anyway.', context: 'early_days' },
  { text: 'Beginning is the hardest part for almost everyone.', context: 'early_days' },
];

const RECAP: CommunityInsight[] = [
  { text: 'Many users find their strongest weeks happen after difficult ones.', context: 'recap' },
  { text: 'Consistency grows slowly for most people — and then quietly becomes identity.', context: 'recap' },
  { text: 'The weeks that felt hardest often become the most meaningful to look back on.', context: 'recap' },
  { text: 'Most users don\'t notice how much they\'ve changed until they reflect.', context: 'recap' },
];

const GENERAL: CommunityInsight[] = [
  { text: 'Thousands are rebuilding their focus right now.', context: 'general' },
  { text: 'Many choose calmness as their first goal — and find everything else follows.', context: 'general' },
  { text: 'Most users struggle with the same things. Progress still happens.', context: 'general' },
  { text: 'Rebuilding takes time for everyone. That\'s what makes it real.', context: 'general' },
];

const ALL_INSIGHTS: Record<InsightContext, CommunityInsight[]> = {
  comeback:   COMEBACK,
  milestone:  MILESTONE,
  progress:   PROGRESS,
  completion: COMPLETION,
  early_days: EARLY_DAYS,
  recap:      RECAP,
  general:    GENERAL,
};

const RECAP_ES: CommunityInsight[] = [
  { text: 'La mayoría de las personas encuentra sus semanas más fuertes después de las difíciles.', context: 'recap' },
  { text: 'La constancia suele llegar en silencio.', context: 'recap' },
  { text: 'Las semanas que se sienten más duras suelen volverse las más significativas al mirar atrás.', context: 'recap' },
  { text: 'La mayoría no se da cuenta de cuánto ha cambiado hasta que reflexiona.', context: 'recap' },
];

const ALL_INSIGHTS_ES: Partial<Record<InsightContext, CommunityInsight[]>> = {
  comeback:   COMEBACK_ES,
  completion: COMPLETION_ES,
  recap:      RECAP_ES,
};

const ALL_INSIGHTS_PT: Partial<Record<InsightContext, CommunityInsight[]>> = {
  comeback:   COMEBACK_PT,
  completion: COMPLETION_PT,
};

const ALL_INSIGHTS_FR: Partial<Record<InsightContext, CommunityInsight[]>> = {
  comeback: COMEBACK_FR,
};

const ALL_INSIGHTS_DE: Partial<Record<InsightContext, CommunityInsight[]>> = {
  comeback: COMEBACK_DE,
};

// ─── Selector ─────────────────────────────────────────────────────────────────

function pick<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

/**
 * Returns the most emotionally appropriate community insight for the context.
 * Seed ensures rotation without being random (same seed = same insight).
 */
export function getInsightForContext(
  context: InsightContext,
  seed: number,
  lang?: string,
): CommunityInsight {
  if (lang === 'pt') {
    const pool = ALL_INSIGHTS_PT[context];
    if (pool) return pick(pool, seed);
  }
  if (lang === 'es') {
    const pool = ALL_INSIGHTS_ES[context];
    if (pool) return pick(pool, seed);
  }
  if (lang === 'fr') {
    const pool = ALL_INSIGHTS_FR[context];
    if (pool) return pick(pool, seed);
  }
  if (lang === 'de') {
    const pool = ALL_INSIGHTS_DE[context];
    if (pool) return pick(pool, seed);
  }
  const pool = ALL_INSIGHTS[context] ?? GENERAL;
  return pick(pool, seed);
}

/**
 * Detects the best context for the current user state.
 */
export function detectInsightContext(
  streak: number,
  totalDays: number,
  daysMissed: number,
): InsightContext {
  if (daysMissed >= 2) return 'comeback';
  if (totalDays <= 7) return 'early_days';
  return 'progress';
}

/**
 * Returns true if an insight should be shown based on frequency logic.
 * Shown roughly 1 in 3 completions to avoid feeling engineered.
 */
export function shouldShowCompletionInsight(currentDay: number): boolean {
  return currentDay % 3 === 0;
}

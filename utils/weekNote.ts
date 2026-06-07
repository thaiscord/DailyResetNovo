// ─── "A Note From Your Week" Copy Engine (v3) ─────────────────────────────────
// Synthesizes UserGoal × EmotionalProfile × StateDifficulty × Mantra.
//
// Narrative contract (enforced by card hierarchy):
//   SectionConnections   → FACTS: states, counts, pattern (already told)
//   SectionMood          → STATES: labels + what they meant (already told)
//   SectionObservation   → BEHAVIOR: returning, showing up (already told)
//   SectionLookingAhead  → FUTURE: what next week could hold (already told)
//   weekNote             → MEANING: interprets the combination — never repeats facts
//
// Structure: 3 lines
//   1. Opening  — goal × state-difficulty OR profile × difficulty (NO state named)
//   2. Middle   — interpretive layer: what the pursuit of the goal meant here
//   3. Closing  — mantra → profile → goal → generic

import { WeekInsights } from './weeklyInsights';
import type { UserGoal } from './weeklyInsights';
import type { EmotionalProfile } from './emotionalProfile';

export interface WeekNote {
  lines: string[];
}

type L5 = { en: string; pt: string; es: string; fr: string; de: string };

function pick(m: L5 | L5[], lang: string, weekNumber = 1): string {
  const item = Array.isArray(m) ? m[(weekNumber - 1) % m.length] : m;
  return (item as Record<string, string>)[lang] ?? (item as Record<string, string>).en;
}

// State difficulty: hard = racing/tired/overwhelmed/drained, foggy = unclear, light = balanced/null
type SD = 'hard' | 'foggy' | 'light';
function sd(state: string | null): SD {
  if (!state || state === 'balanced') return 'light';
  if (state === 'unclear') return 'foggy';
  return 'hard';
}

// ─── Line 1: Opening ─────────────────────────────────────────────────────────
// Priority: goal → profile → fallback.
// The dominant state is NEVER NAMED — it is only implied as context ("the week was heavy",
// "without full clarity"). SectionConnections already named it.

const GOAL_OPENING: Record<UserGoal, Record<SD, L5[]>> = {
  calm: {
    hard: [
      { en: "Even when the week pushed hard, you kept looking for a place to breathe.",
        pt: "Mesmo quando a semana foi intensa, você continuou procurando um lugar para respirar.",
        es: "Incluso cuando la semana fue intensa, seguiste buscando un lugar para respirar.",
        fr: "Même quand la semaine a été intense, tu as continué à chercher un endroit pour respirer.",
        de: "Selbst wenn die Woche hart war, hast du weiter nach einem Ort zum Atmen gesucht." },
      { en: "The week didn't soften on its own — but you kept reaching for quieter ground.",
        pt: "A semana não ficou mais leve sozinha — mas você continuou buscando um chão mais quieto.",
        es: "La semana no se suavizó sola — pero seguiste buscando un suelo más tranquilo.",
        fr: "La semaine ne s'est pas adoucie d'elle-même — mais tu as continué à chercher un terrain plus calme.",
        de: "Die Woche wurde nicht von selbst sanfter — aber du hast weiter nach ruhigerem Boden gesucht." },
    ],
    foggy: [
      { en: "Without everything being clear, you still searched for a quieter place.",
        pt: "Sem tudo estar claro, você ainda buscou um lugar mais quieto.",
        es: "Sin que todo estuviera claro, aún buscaste un lugar más tranquilo.",
        fr: "Sans que tout soit clair, tu as quand même cherché un endroit plus calme.",
        de: "Ohne dass alles klar war, hast du noch einen ruhigeren Ort gesucht." },
      { en: "Clarity didn't come all at once this week — but the search for ease was still there.",
        pt: "A clareza não chegou de uma vez esta semana — mas a busca pela leveza ainda estava presente.",
        es: "La claridad no llegó de una vez esta semana — pero la búsqueda de calma seguía presente.",
        fr: "La clarté n'est pas arrivée d'un coup cette semaine — mais la recherche de légèreté était toujours là.",
        de: "Klarheit kam diese Woche nicht auf einmal — aber die Suche nach Leichtigkeit war noch da." },
    ],
    light: [
      { en: "This week brought a little more room — and you used it to find some ease.",
        pt: "Esta semana trouxe um pouco mais de espaço — e você o usou para encontrar leveza.",
        es: "Esta semana trajo un poco más de espacio — y lo usaste para encontrar calma.",
        fr: "Cette semaine a apporté un peu plus d'espace — et tu l'as utilisé pour trouver de la légèreté.",
        de: "Diese Woche brachte ein wenig mehr Raum — und du hast ihn genutzt, um Leichtigkeit zu finden." },
      { en: "The week was a little quieter than some — and you gave that space to yourself.",
        pt: "A semana foi um pouco mais quieta do que algumas — e você deu esse espaço a si mesmo.",
        es: "La semana fue un poco más tranquila que algunas — y te diste ese espacio.",
        fr: "La semaine était un peu plus calme que certaines — et tu t'es accordé cet espace.",
        de: "Die Woche war ein wenig ruhiger als einige andere — und du hast dir diesen Raum gegeben." },
    ],
  },
  clarity: {
    hard: [
      { en: "Even with a heavier week, you kept reaching for some direction.",
        pt: "Mesmo com uma semana mais pesada, você continuou buscando alguma direção.",
        es: "Incluso con una semana más cargada, seguiste buscando algo de dirección.",
        fr: "Même avec une semaine plus chargée, tu as continué à chercher une direction.",
        de: "Auch in einer schwereren Woche hast du weiter nach Richtung gesucht." },
      { en: "The week was full — and you still kept looking for what could make sense.",
        pt: "A semana foi cheia — e você ainda continuou procurando o que poderia fazer sentido.",
        es: "La semana estuvo llena — y aún seguiste buscando lo que podía tener sentido.",
        fr: "La semaine était chargée — et tu as quand même continué à chercher ce qui pouvait avoir du sens.",
        de: "Die Woche war voll — und du hast weiter nach dem gesucht, was Sinn ergibt." },
    ],
    foggy: [
      { en: "Clarity was hard to find this week — and you kept searching anyway.",
        pt: "A clareza foi difícil de encontrar esta semana — e você continuou buscando mesmo assim.",
        es: "La claridad fue difícil de encontrar esta semana — y seguiste buscando de todas formas.",
        fr: "La clarté était difficile à trouver cette semaine — et tu as quand même continué à chercher.",
        de: "Klarheit war diese Woche schwer zu finden — und du hast trotzdem weiter gesucht." },
      { en: "The direction wasn't always visible this week — but the search was still there.",
        pt: "A direção nem sempre estava visível esta semana — mas a busca ainda estava presente.",
        es: "La dirección no siempre era visible esta semana — pero la búsqueda seguía presente.",
        fr: "La direction n'était pas toujours visible cette semaine — mais la recherche était toujours là.",
        de: "Die Richtung war diese Woche nicht immer sichtbar — aber die Suche war noch da." },
    ],
    light: [
      { en: "With a little more space this week, you could look at what actually mattered.",
        pt: "Com um pouco mais de espaço esta semana, você pôde olhar para o que realmente importava.",
        es: "Con un poco más de espacio esta semana, pudiste mirar a lo que realmente importaba.",
        fr: "Avec un peu plus d'espace cette semaine, tu as pu regarder ce qui comptait vraiment.",
        de: "Mit etwas mehr Raum diese Woche konntest du auf das schauen, was wirklich wichtig war." },
      { en: "The week gave a little more clarity than some — and you used it to look at what needed attention.",
        pt: "A semana trouxe um pouco mais de clareza do que algumas — e você a usou para olhar o que precisava de atenção.",
        es: "La semana trajo un poco más de claridad que algunas — y la usaste para mirar lo que necesitaba atención.",
        fr: "La semaine a apporté un peu plus de clarté que certaines — et tu l'as utilisée pour regarder ce qui avait besoin d'attention.",
        de: "Die Woche brachte etwas mehr Klarheit als einige andere — und du hast sie genutzt, um das anzuschauen, was Aufmerksamkeit brauchte." },
    ],
  },
  confidence: {
    hard: [
      { en: "Showing up when the week was heavy — that says something about what you're building.",
        pt: "Aparecer quando a semana foi pesada — isso diz algo sobre o que você está construindo.",
        es: "Aparecer cuando la semana fue pesada — eso dice algo sobre lo que estás construyendo.",
        fr: "Se montrer quand la semaine était lourde — ça dit quelque chose sur ce que tu construis.",
        de: "Aufzutauchen, wenn die Woche schwer war — das sagt etwas darüber aus, was du aufbaust." },
      { en: "The week wasn't easy — and you still showed up.",
        pt: "A semana não foi fácil — e você ainda assim apareceu.",
        es: "La semana no fue fácil — y aún así te presentaste.",
        fr: "La semaine n'était pas facile — et tu t'es quand même montré.",
        de: "Die Woche war nicht einfach — und du bist trotzdem aufgetaucht." },
    ],
    foggy: [
      { en: "You showed up — even without a clear sense of where you were going.",
        pt: "Você apareceu — mesmo sem um sentido claro de para onde estava indo.",
        es: "Te presentaste — incluso sin un sentido claro de hacia dónde ibas.",
        fr: "Tu t'es montré — même sans un sens clair de là où tu allais.",
        de: "Du bist aufgetaucht — auch ohne ein klares Gefühl, wohin du gingst." },
      { en: "Without knowing exactly what was next, you still came back.",
        pt: "Sem saber exatamente o que vinha a seguir, você ainda voltou.",
        es: "Sin saber exactamente lo que venía después, aún volviste.",
        fr: "Sans savoir exactement ce qui suivait, tu es quand même revenu.",
        de: "Ohne genau zu wissen, was als nächstes kam, bist du trotzdem zurückgekehrt." },
    ],
    light: [
      { en: "This week was easier to inhabit — and you were here for it.",
        pt: "Esta semana foi mais fácil de habitar — e você esteve aqui para ela.",
        es: "Esta semana fue más fácil de habitar — y estuviste aquí para ella.",
        fr: "Cette semaine était plus facile à habiter — et tu étais là pour elle.",
        de: "Diese Woche war leichter zu bewohnen — und du warst dafür da." },
      { en: "The week gave more room than some — and you used it to keep building.",
        pt: "A semana deu mais espaço do que algumas — e você o usou para continuar construindo.",
        es: "La semana dio más espacio que algunas — y lo usaste para seguir construyendo.",
        fr: "La semaine a donné plus de place que certaines — et tu l'as utilisée pour continuer à construire.",
        de: "Die Woche gab mehr Raum als einige andere — und du hast ihn genutzt, um weiter aufzubauen." },
    ],
  },
  consistency: {
    hard: [
      { en: "You came back — even when the week asked more than it was easy to give.",
        pt: "Você voltou — mesmo quando a semana pediu mais do que era fácil dar.",
        es: "Volviste — incluso cuando la semana pidió más de lo que era fácil dar.",
        fr: "Tu es revenu — même quand la semaine demandait plus qu'il n'était facile de donner.",
        de: "Du bist zurückgekehrt — auch als die Woche mehr verlangte, als leicht zu geben war." },
      { en: "The week was demanding — and the return still happened.",
        pt: "A semana foi exigente — e o retorno ainda aconteceu.",
        es: "La semana fue exigente — y el regreso igualmente ocurrió.",
        fr: "La semaine était exigeante — et le retour a quand même eu lieu.",
        de: "Die Woche war anspruchsvoll — und die Rückkehr fand trotzdem statt." },
    ],
    foggy: [
      { en: "The return happened — even without everything being clear.",
        pt: "O retorno aconteceu — mesmo sem tudo estar claro.",
        es: "El regreso ocurrió — incluso sin que todo estuviera claro.",
        fr: "Le retour a eu lieu — même sans que tout soit clair.",
        de: "Die Rückkehr fand statt — auch ohne dass alles klar war." },
      { en: "Without a clear direction, you still kept coming back — and that's the pattern you're building.",
        pt: "Sem uma direção clara, você ainda continuou voltando — e esse é o padrão que está construindo.",
        es: "Sin una dirección clara, aún seguiste volviendo — y ese es el patrón que estás construyendo.",
        fr: "Sans direction claire, tu as quand même continué à revenir — et c'est le schéma que tu construis.",
        de: "Ohne klare Richtung bist du trotzdem immer wieder zurückgekehrt — und das ist das Muster, das du aufbaust." },
    ],
    light: [
      { en: "The week had more room for the return — and it happened.",
        pt: "A semana teve mais espaço para o retorno — e ele aconteceu.",
        es: "La semana tuvo más espacio para el regreso — y ocurrió.",
        fr: "La semaine avait plus de place pour le retour — et il a eu lieu.",
        de: "Die Woche hatte mehr Platz für die Rückkehr — und sie fand statt." },
      { en: "A little more ease made the return feel like what it always was — part of what you're building.",
        pt: "Um pouco mais de leveza fez o retorno parecer o que sempre foi — parte do que você está construindo.",
        es: "Un poco más de facilidad hizo que el regreso pareciera lo que siempre fue — parte de lo que estás construyendo.",
        fr: "Un peu plus de légèreté a fait que le retour ressemblait à ce qu'il a toujours été — une partie de ce que tu construis.",
        de: "Etwas mehr Leichtigkeit ließ die Rückkehr so fühlen wie immer — als Teil dessen, was du aufbaust." },
    ],
  },
  presence: {
    hard: [
      { en: "Even with everything the week brought, you still found a moment to be here.",
        pt: "Mesmo com tudo que a semana trouxe, você ainda encontrou um momento para estar aqui.",
        es: "Incluso con todo lo que la semana trajo, encontraste un momento para estar aquí.",
        fr: "Même avec tout ce que la semaine a apporté, tu as quand même trouvé un moment pour être là.",
        de: "Auch mit allem, was die Woche brachte, hast du noch einen Moment gefunden, um hier zu sein." },
      { en: "The week was full — and you were still present in it.",
        pt: "A semana foi cheia — e você ainda estava presente nela.",
        es: "La semana estuvo llena — y aún estuviste presente en ella.",
        fr: "La semaine était chargée — et tu y étais quand même présent.",
        de: "Die Woche war voll — und du warst trotzdem darin präsent." },
    ],
    foggy: [
      { en: "Without always knowing where to look, you still showed up — and that's presence.",
        pt: "Sem sempre saber onde olhar, você ainda apareceu — e isso é presença.",
        es: "Sin saber siempre dónde mirar, aún te presentaste — y eso es presencia.",
        fr: "Sans toujours savoir où regarder, tu t'es quand même montré — et c'est de la présence.",
        de: "Ohne immer zu wissen, wo man hinschauen soll, bist du trotzdem aufgetaucht — und das ist Präsenz." },
      { en: "Presence doesn't need to come with clarity — and this week was proof of that.",
        pt: "A presença não precisa vir acompanhada de clareza — e esta semana foi prova disso.",
        es: "La presencia no necesita venir acompañada de claridad — y esta semana fue prueba de ello.",
        fr: "La présence n'a pas besoin de venir avec la clarté — et cette semaine en était la preuve.",
        de: "Präsenz muss nicht mit Klarheit kommen — und diese Woche war der Beweis dafür." },
    ],
    light: [
      { en: "The week was a little quieter — and it gave you more room to be present in it.",
        pt: "A semana foi um pouco mais quieta — e deu mais espaço para você estar presente nela.",
        es: "La semana fue un poco más tranquila — y te dio más espacio para estar presente en ella.",
        fr: "La semaine était un peu plus calme — et elle t'a donné plus de place pour y être présent.",
        de: "Die Woche war ein wenig ruhiger — und sie gab dir mehr Raum, darin präsent zu sein." },
      { en: "With a little more ease, the presence felt more natural this week.",
        pt: "Com um pouco mais de leveza, a presença se sentiu mais natural esta semana.",
        es: "Con un poco más de facilidad, la presencia se sintió más natural esta semana.",
        fr: "Avec un peu plus de légèreté, la présence s'est sentie plus naturelle cette semaine.",
        de: "Mit etwas mehr Leichtigkeit fühlte sich die Präsenz diese Woche natürlicher an." },
    ],
  },
  balance: {
    hard: [
      { en: "The week asked more than it was easy to balance — and you still found some steady ground.",
        pt: "A semana pediu mais do que era fácil equilibrar — e você ainda encontrou algum chão firme.",
        es: "La semana pidió más de lo que era fácil equilibrar — y aún encontraste algo de terreno firme.",
        fr: "La semaine a demandé plus qu'il n'était facile d'équilibrer — et tu as quand même trouvé un terrain stable.",
        de: "Die Woche verlangte mehr, als leicht zu balancieren war — und du hast trotzdem etwas stabilen Boden gefunden." },
      { en: "Even when the week felt heavy, you kept looking for a more sustainable pace.",
        pt: "Mesmo quando a semana pareceu pesada, você continuou buscando um ritmo mais sustentável.",
        es: "Incluso cuando la semana se sintió pesada, seguiste buscando un ritmo más sostenible.",
        fr: "Même quand la semaine semblait lourde, tu as continué à chercher un rythme plus durable.",
        de: "Auch wenn die Woche schwer war, hast du weiter nach einem nachhaltigeren Tempo gesucht." },
    ],
    foggy: [
      { en: "Without clear direction, you still looked for some balance — and that's not easy.",
        pt: "Sem direção clara, você ainda buscou algum equilíbrio — e isso não é fácil.",
        es: "Sin dirección clara, aún buscaste algo de equilibrio — y eso no es fácil.",
        fr: "Sans direction claire, tu as quand même cherché un équilibre — et ce n'est pas facile.",
        de: "Ohne klare Richtung hast du noch nach etwas Gleichgewicht gesucht — und das ist nicht einfach." },
      { en: "The week wasn't easy to navigate — but you stayed looking for steadier ground.",
        pt: "A semana não foi fácil de navegar — mas você continuou buscando um chão mais estável.",
        es: "La semana no fue fácil de navegar — pero seguiste buscando un terreno más estable.",
        fr: "La semaine n'était pas facile à naviguer — mais tu as continué à chercher un terrain plus stable.",
        de: "Die Woche war nicht einfach zu navigieren — aber du hast weiter nach einem stabileren Boden gesucht." },
    ],
    light: [
      { en: "The week gave a little more room to find balance — and you used it.",
        pt: "A semana deu um pouco mais de espaço para encontrar equilíbrio — e você o usou.",
        es: "La semana dio un poco más de espacio para encontrar equilibrio — y lo usaste.",
        fr: "La semaine a donné un peu plus de place pour trouver l'équilibre — et tu l'as utilisée.",
        de: "Die Woche gab ein wenig mehr Raum, um Gleichgewicht zu finden — und du hast ihn genutzt." },
      { en: "A steadier week — and you leaned into that instead of pushing past it.",
        pt: "Uma semana mais estável — e você se apoiou nisso ao invés de ir além.",
        es: "Una semana más estable — y te apoyaste en eso en vez de seguir adelante.",
        fr: "Une semaine plus stable — et tu t'y es appuyé plutôt que de la dépasser.",
        de: "Eine ruhigere Woche — und du hast dich darauf gestützt, anstatt darüber hinaus zu gehen." },
    ],
  },
};

const PROFILE_OPENING: Record<EmotionalProfile, Record<SD, L5>> = {
  burnout: {
    hard: { en: "The week was heavy — and you were still in it.",
            pt: "A semana foi pesada — e você ainda esteve nela.",
            es: "La semana fue pesada — y aún estuviste en ella.",
            fr: "La semaine était lourde — et tu y étais quand même.",
            de: "Die Woche war schwer — und du warst noch darin." },
    foggy: { en: "The week arrived without a clear map — and you were present in it anyway.",
             pt: "A semana chegou sem um mapa claro — e você ainda esteve presente nela.",
             es: "La semana llegó sin un mapa claro — y estuviste presente en ella de todos modos.",
             fr: "La semaine est arrivée sans carte claire — et tu y étais présent quand même.",
             de: "Die Woche kam ohne eine klare Karte — und du warst trotzdem darin präsent." },
    light: { en: "This week was a little lighter — and you let it be.",
             pt: "Esta semana foi um pouco mais leve — e você se permitiu isso.",
             es: "Esta semana fue un poco más ligera — y lo dejaste ser.",
             fr: "Cette semaine était un peu plus légère — et tu l'as laissée être.",
             de: "Diese Woche war ein wenig leichter — und du hast es so sein lassen." },
  },
  calm: {
    hard: { en: "Even when the week was heavy, you found a moment of stillness.",
            pt: "Mesmo quando a semana foi pesada, você encontrou um momento de quietude.",
            es: "Incluso cuando la semana fue pesada, encontraste un momento de quietud.",
            fr: "Même quand la semaine était lourde, tu as trouvé un moment de calme.",
            de: "Auch wenn die Woche schwer war, hast du einen Moment der Stille gefunden." },
    foggy: { en: "Without everything being clear, you still found some quiet in it.",
             pt: "Sem tudo estar claro, você ainda encontrou alguma quietude.",
             es: "Sin que todo estuviera claro, encontraste algo de quietud.",
             fr: "Sans que tout soit clair, tu as quand même trouvé un peu de calme.",
             de: "Ohne dass alles klar war, hast du noch etwas Stille gefunden." },
    light: { en: "The quiet this week was yours — you chose it.",
             pt: "A quietude desta semana foi sua — você a escolheu.",
             es: "La quietud de esta semana fue tuya — la elegiste.",
             fr: "Le calme de cette semaine était le tien — tu l'as choisi.",
             de: "Die Stille dieser Woche war deine — du hast sie gewählt." },
  },
  focus: {
    hard: { en: "Even with a busy week, your attention kept finding its way back.",
            pt: "Mesmo com uma semana agitada, sua atenção continuou encontrando seu caminho de volta.",
            es: "Incluso con una semana agitada, tu atención siguió encontrando su camino de regreso.",
            fr: "Même avec une semaine chargée, ton attention a continué à trouver son chemin de retour.",
            de: "Auch in einer vollen Woche hat deine Aufmerksamkeit weiter ihren Weg zurückgefunden." },
    foggy: { en: "Without clarity, your attention still found a thread to follow.",
             pt: "Sem clareza, sua atenção ainda encontrou um fio a seguir.",
             es: "Sin claridad, tu atención aún encontró un hilo a seguir.",
             fr: "Sans clarté, ton attention a quand même trouvé un fil à suivre.",
             de: "Ohne Klarheit hat deine Aufmerksamkeit noch einen Faden gefunden, dem sie folgen konnte." },
    light: { en: "With more space, your attention found what it needed this week.",
             pt: "Com mais espaço, sua atenção encontrou o que precisava esta semana.",
             es: "Con más espacio, tu atención encontró lo que necesitaba esta semana.",
             fr: "Avec plus d'espace, ton attention a trouvé ce dont elle avait besoin cette semaine.",
             de: "Mit mehr Raum hat deine Aufmerksamkeit diese Woche gefunden, was sie brauchte." },
  },
  confidence: {
    hard: { en: "You showed up — even when the week wasn't easy.",
            pt: "Você apareceu — mesmo quando a semana não foi fácil.",
            es: "Te presentaste — incluso cuando la semana no fue fácil.",
            fr: "Tu t'es montré — même quand la semaine n'était pas facile.",
            de: "Du bist aufgetaucht — auch wenn die Woche nicht einfach war." },
    foggy: { en: "You were here — even without a clear map of where you were going.",
             pt: "Você esteve aqui — mesmo sem um mapa claro de onde ia.",
             es: "Estuviste aquí — incluso sin un mapa claro de hacia dónde ibas.",
             fr: "Tu étais là — même sans une carte claire de là où tu allais.",
             de: "Du warst hier — auch ohne eine klare Karte, wohin du gingst." },
    light: { en: "This week had more room — and you were present in it.",
             pt: "Esta semana teve mais espaço — e você esteve presente nela.",
             es: "Esta semana tuvo más espacio — y estuviste presente en ella.",
             fr: "Cette semaine avait plus de place — et tu y étais présent.",
             de: "Diese Woche hatte mehr Raum — und du warst darin präsent." },
  },
};

const FALLBACK_OPENING: Record<SD, L5> = {
  hard: { en: "Even so, you were here. This week too.",
          pt: "Mesmo assim, você esteve aqui. Esta semana também.",
          es: "Aun así, estuviste aquí. Esta semana también.",
          fr: "Même ainsi, tu étais là. Cette semaine aussi.",
          de: "Trotzdem warst du hier. Diese Woche auch." },
  foggy: { en: "Clarity didn't always come easily — but you came back anyway.",
           pt: "A clareza nem sempre foi fácil de encontrar — mas você voltou mesmo assim.",
           es: "La claridad no siempre fue fácil de encontrar — pero volviste de todas formas.",
           fr: "La clarté n'était pas toujours facile à trouver — mais tu es quand même revenu.",
           de: "Klarheit war nicht immer einfach zu finden — aber du bist trotzdem zurückgekehrt." },
  light: { en: "The week had a quieter quality — and you were present in it.",
           pt: "A semana teve uma qualidade mais quieta — e você esteve presente nela.",
           es: "La semana tuvo una calidad más tranquila — y estuviste presente en ella.",
           fr: "La semaine avait une qualité plus calme — et tu y étais présent.",
           de: "Die Woche hatte eine ruhigere Qualität — und du warst darin präsent." },
};

// ─── Line 2: Middle (interpretive) ───────────────────────────────────────────
// NOT about how many times you returned — that's SectionObservation's job.
// This interprets WHAT the pursuit of the goal meant given the difficulty.

const GOAL_MIDDLE: Record<UserGoal, Record<SD, L5>> = {
  calm: {
    hard: { en: "Not because the week softened. Because that's the space you chose to protect.",
            pt: "Não porque a semana ficou mais leve. Porque esse é o espaço que você escolheu proteger.",
            es: "No porque la semana se suavizara. Porque ese es el espacio que elegiste proteger.",
            fr: "Pas parce que la semaine s'est adoucie. Parce que c'est l'espace que tu as choisi de protéger.",
            de: "Nicht weil die Woche sanfter wurde. Weil das der Raum ist, den du zu schützen gewählt hast." },
    foggy: { en: "The search for ease doesn't need clarity to be real.",
             pt: "A busca pela leveza não precisa de clareza para ser real.",
             es: "La búsqueda de calma no necesita claridad para ser real.",
             fr: "La recherche de légèreté n'a pas besoin de clarté pour être réelle.",
             de: "Die Suche nach Leichtigkeit braucht keine Klarheit, um real zu sein." },
    light: { en: "The room this week gave — you used it to reach for what you came here looking for.",
             pt: "O espaço que esta semana deu — você o usou para buscar o que veio procurar aqui.",
             es: "El espacio que esta semana dio — lo usaste para buscar lo que viniste a encontrar aquí.",
             fr: "L'espace que cette semaine a offert — tu l'as utilisé pour chercher ce que tu es venu trouver ici.",
             de: "Den Raum, den diese Woche gab — du hast ihn genutzt, um das zu suchen, was du hierher gekommen bist zu finden." },
  },
  clarity: {
    hard: { en: "Not because the week made it easy. Because you kept looking for the thread.",
            pt: "Não porque a semana facilitou. Porque você continuou procurando o fio.",
            es: "No porque la semana lo hiciera fácil. Porque seguiste buscando el hilo.",
            fr: "Pas parce que la semaine l'a facilité. Parce que tu as continué à chercher le fil.",
            de: "Nicht weil die Woche es einfach machte. Weil du weiter nach dem Faden gesucht hast." },
    foggy: { en: "Looking for direction when it isn't clear — that's not the same as being lost.",
             pt: "Buscar direção quando ela não está clara — isso não é o mesmo que estar perdido.",
             es: "Buscar dirección cuando no está clara — eso no es lo mismo que estar perdido.",
             fr: "Chercher une direction quand elle n'est pas claire — ce n'est pas la même chose qu'être perdu.",
             de: "Richtung zu suchen, wenn sie nicht klar ist — das ist nicht dasselbe wie verloren sein." },
    light: { en: "That space became a little clearer — and you used it to look at what was waiting.",
             pt: "Esse espaço ficou um pouco mais claro — e você o usou para olhar o que estava esperando.",
             es: "Ese espacio se volvió un poco más claro — y lo usaste para mirar lo que estaba esperando.",
             fr: "Cet espace est devenu un peu plus clair — et tu l'as utilisé pour regarder ce qui attendait.",
             de: "Dieser Raum wurde ein wenig klarer — und du hast ihn genutzt, um das anzuschauen, was wartete." },
  },
  confidence: {
    hard: { en: "Showing up when it's hard — that's not a small thing. That's the practice.",
            pt: "Aparecer quando é difícil — isso não é pouca coisa. Essa é a prática.",
            es: "Presentarse cuando es difícil — eso no es poca cosa. Esa es la práctica.",
            fr: "Se montrer quand c'est difficile — ce n'est pas une petite chose. C'est la pratique.",
            de: "Aufzutauchen, wenn es schwer ist — das ist keine Kleinigkeit. Das ist die Praxis." },
    foggy: { en: "Showing up without a clear map is still showing up — and it counts.",
             pt: "Aparecer sem um mapa claro ainda é aparecer — e isso conta.",
             es: "Presentarse sin un mapa claro es presentarse de todas formas — y cuenta.",
             fr: "Se montrer sans carte claire, c'est quand même se montrer — et ça compte.",
             de: "Aufzutauchen ohne eine klare Karte ist trotzdem aufzutauchen — und das zählt." },
    light: { en: "A week with more ease is still a week you showed up for — and that's worth something.",
             pt: "Uma semana com mais leveza ainda é uma semana para a qual você apareceu — e isso vale algo.",
             es: "Una semana con más facilidad es una semana para la que te presentaste — y eso vale algo.",
             fr: "Une semaine avec plus de légèreté est quand même une semaine pour laquelle tu t'es montré — et ça vaut quelque chose.",
             de: "Eine Woche mit mehr Leichtigkeit ist immer noch eine Woche, für die du aufgetaucht bist — und das ist etwas wert." },
  },
  consistency: {
    hard: { en: "The rhythm doesn't require perfect weeks. It requires showing up — which you did.",
            pt: "O ritmo não exige semanas perfeitas. Exige aparecer — o que você fez.",
            es: "El ritmo no requiere semanas perfectas. Requiere presentarse — lo que hiciste.",
            fr: "Le rythme n'exige pas des semaines parfaites. Il exige de se montrer — ce que tu as fait.",
            de: "Der Rhythmus erfordert keine perfekten Wochen. Er erfordert das Erscheinen — was du getan hast." },
    foggy: { en: "Returning without clarity — that still counts as returning.",
             pt: "Voltar sem clareza — isso ainda conta como voltar.",
             es: "Volver sin claridad — eso sigue contando como volver.",
             fr: "Revenir sans clarté — ça compte quand même comme revenir.",
             de: "Zurückzukehren ohne Klarheit — das zählt trotzdem als Rückkehr." },
    light: { en: "This week made it a little easier to return — and you did.",
             pt: "Esta semana tornou o retorno um pouco mais fácil — e você voltou.",
             es: "Esta semana hizo que volver fuera un poco más fácil — y lo hiciste.",
             fr: "Cette semaine a rendu le retour un peu plus facile — et tu l'as fait.",
             de: "Diese Woche machte die Rückkehr ein wenig leichter — und du bist zurückgekehrt." },
  },
  presence: {
    hard: { en: "Being present when the week is full — that's a different kind of attention.",
            pt: "Estar presente quando a semana está cheia — isso é um tipo diferente de atenção.",
            es: "Estar presente cuando la semana está llena — eso es un tipo diferente de atención.",
            fr: "Être présent quand la semaine est pleine — c'est une sorte différente d'attention.",
            de: "Präsent zu sein, wenn die Woche voll ist — das ist eine andere Art von Aufmerksamkeit." },
    foggy: { en: "Presence doesn't need clarity to be real. It just needs to be here — which you were.",
             pt: "A presença não precisa de clareza para ser real. Só precisa estar aqui — o que você estava.",
             es: "La presencia no necesita claridad para ser real. Solo necesita estar aquí — lo que estabas.",
             fr: "La présence n'a pas besoin de clarté pour être réelle. Elle a juste besoin d'être là — ce que tu étais.",
             de: "Präsenz braucht keine Klarheit, um real zu sein. Sie muss nur hier sein — was du warst." },
    light: { en: "A quieter week gave more room for noticing — and you were there for it.",
             pt: "Uma semana mais quieta deu mais espaço para perceber — e você esteve lá para isso.",
             es: "Una semana más tranquila dio más espacio para notar — y estuviste ahí para ello.",
             fr: "Une semaine plus calme a donné plus de place pour remarquer — et tu étais là pour ça.",
             de: "Eine ruhigere Woche gab mehr Raum zum Wahrnehmen — und du warst dafür da." },
  },
  balance: {
    hard: { en: "Finding steadier ground when the week isn't easy — that's what you came here to practice.",
            pt: "Encontrar um chão mais estável quando a semana não é fácil — é isso que você veio praticar.",
            es: "Encontrar un terreno más estable cuando la semana no es fácil — eso es lo que viniste a practicar.",
            fr: "Trouver un terrain plus stable quand la semaine n'est pas facile — c'est ce que tu es venu pratiquer.",
            de: "Stabileren Boden zu finden, wenn die Woche nicht einfach ist — das ist das, was du hierher gekommen bist zu üben." },
    foggy: { en: "Balance doesn't require a clear direction — it requires attention. And you brought that.",
             pt: "Equilíbrio não exige uma direção clara — exige atenção. E você trouxe isso.",
             es: "El equilibrio no requiere una dirección clara — requiere atención. Y eso lo trajiste.",
             fr: "L'équilibre n'exige pas de direction claire — il exige de l'attention. Et tu l'as apportée.",
             de: "Gleichgewicht erfordert keine klare Richtung — es erfordert Aufmerksamkeit. Und die hast du mitgebracht." },
    light: { en: "A steadier week made it easier to find that pace — and you leaned into it.",
             pt: "Uma semana mais estável tornou mais fácil encontrar esse ritmo — e você se apoiou nisso.",
             es: "Una semana más estable hizo más fácil encontrar ese ritmo — y te apoyaste en ello.",
             fr: "Une semaine plus stable a facilité la découverte de ce rythme — et tu t'y es appuyé.",
             de: "Eine ruhigere Woche machte es leichter, dieses Tempo zu finden — und du hast dich darauf gestützt." },
  },
};

const PROFILE_MIDDLE: Record<EmotionalProfile, Record<SD, L5>> = {
  burnout: {
    hard: { en: "Moving through the weight — that's the kind of week that stays.",
            pt: "Atravessar o peso — esse é o tipo de semana que fica.",
            es: "Atravesar el peso — ese es el tipo de semana que se queda.",
            fr: "Traverser le poids — c'est le genre de semaine qui reste.",
            de: "Durch das Gewicht hindurchgehen — das ist die Art von Woche, die bleibt." },
    foggy: { en: "Even without clarity, the week still happened — and left something.",
             pt: "Mesmo sem clareza, a semana ainda aconteceu — e deixou algo.",
             es: "Incluso sin claridad, la semana aún ocurrió — y dejó algo.",
             fr: "Même sans clarté, la semaine s'est quand même passée — et a laissé quelque chose.",
             de: "Auch ohne Klarheit ist die Woche trotzdem passiert — und hat etwas hinterlassen." },
    light: { en: "A little lighter this week — and you gave yourself permission to notice that.",
             pt: "Um pouco mais leve esta semana — e você se deu permissão para notar isso.",
             es: "Un poco más ligero esta semana — y te diste permiso para notar eso.",
             fr: "Un peu plus léger cette semaine — et tu t'es permis de le remarquer.",
             de: "Ein wenig leichter diese Woche — und du hast dir erlaubt, das zu bemerken." },
  },
  calm: {
    hard: { en: "Even when it was heavy, the quiet was still reachable — and you reached for it.",
            pt: "Mesmo quando foi pesado, a quietude ainda estava ao alcance — e você a buscou.",
            es: "Incluso cuando fue pesado, la quietud era alcanzable — y la alcanzaste.",
            fr: "Même quand c'était lourd, le calme était encore accessible — et tu l'as cherché.",
            de: "Auch wenn es schwer war, war die Stille noch erreichbar — und du hast sie gesucht." },
    foggy: { en: "Stillness doesn't need clarity. It just needs a moment — which you found.",
             pt: "A quietude não precisa de clareza. Só precisa de um momento — que você encontrou.",
             es: "La quietud no necesita claridad. Solo necesita un momento — que encontraste.",
             fr: "La tranquillité n't a pas besoin de clarté. Elle a juste besoin d'un moment — que tu as trouvé.",
             de: "Stille braucht keine Klarheit. Sie braucht nur einen Moment — den du gefunden hast." },
    light: { en: "The quiet this week was easier to find — and you let it in.",
             pt: "A quietude esta semana foi mais fácil de encontrar — e você a deixou entrar.",
             es: "La quietud esta semana fue más fácil de encontrar — y la dejaste entrar.",
             fr: "Le calme cette semaine était plus facile à trouver — et tu l'as laissé entrer.",
             de: "Die Stille war diese Woche leichter zu finden — und du hast sie hereingelassen." },
  },
  focus: {
    hard: { en: "Attention found its way back — even through the noise.",
            pt: "A atenção encontrou seu caminho de volta — mesmo através do barulho.",
            es: "La atención encontró su camino de regreso — incluso a través del ruido.",
            fr: "L'attention a trouvé son chemin de retour — même à travers le bruit.",
            de: "Die Aufmerksamkeit hat ihren Weg zurückgefunden — auch durch den Lärm." },
    foggy: { en: "Even without clarity, attention still found something to hold onto.",
             pt: "Mesmo sem clareza, a atenção ainda encontrou algo em que se apoiar.",
             es: "Incluso sin claridad, la atención aún encontró algo en lo que apoyarse.",
             fr: "Même sans clarté, l'attention a quand même trouvé quelque chose auquel s'accrocher.",
             de: "Auch ohne Klarheit hat die Aufmerksamkeit noch etwas gefunden, woran sie sich halten konnte." },
    light: { en: "More space, and attention found what it was looking for more easily.",
             pt: "Mais espaço, e a atenção encontrou o que procurava com mais facilidade.",
             es: "Más espacio, y la atención encontró lo que buscaba más fácilmente.",
             fr: "Plus d'espace, et l'attention a trouvé ce qu'elle cherchait plus facilement.",
             de: "Mehr Raum, und die Aufmerksamkeit fand leichter, was sie suchte." },
  },
  confidence: {
    hard: { en: "Showing up when it's not easy — that's what you're practicing.",
            pt: "Aparecer quando não é fácil — isso é o que você está praticando.",
            es: "Presentarse cuando no es fácil — eso es lo que estás practicando.",
            fr: "Se montrer quand ce n'est pas facile — c'est ce que tu pratiques.",
            de: "Aufzutauchen, wenn es nicht einfach ist — das ist das, was du übst." },
    foggy: { en: "You were here — even without a clear sense of why or what for.",
             pt: "Você esteve aqui — mesmo sem um sentido claro de por quê ou para quê.",
             es: "Estuviste aquí — incluso sin un sentido claro de por qué o para qué.",
             fr: "Tu étais là — même sans un sens clair du pourquoi ou du pour quoi.",
             de: "Du warst hier — auch ohne ein klares Gefühl, warum oder wofür." },
    light: { en: "A week with more ease still counted — you showed up for it.",
             pt: "Uma semana com mais leveza ainda contou — você apareceu para ela.",
             es: "Una semana con más facilidad aún contó — te presentaste para ella.",
             fr: "Une semaine avec plus de légèreté comptait quand même — tu t'es montré pour elle.",
             de: "Eine Woche mit mehr Leichtigkeit zählte trotzdem — du bist dafür aufgetaucht." },
  },
};

const FALLBACK_MIDDLE: Record<SD, L5> = {
  hard: { en: "Even so, the week still had space for what mattered.",
          pt: "Mesmo assim, a semana ainda teve espaço para o que importava.",
          es: "Aun así, la semana aún tuvo espacio para lo que importaba.",
          fr: "Même ainsi, la semaine avait encore de la place pour ce qui comptait.",
          de: "Trotzdem hatte die Woche noch Raum für das, was wichtig war." },
  foggy: { en: "Without full clarity, the week still held something worth returning to.",
           pt: "Sem clareza total, a semana ainda tinha algo pelo qual valesse voltar.",
           es: "Sin claridad total, la semana aún tenía algo por lo que valía la pena volver.",
           fr: "Sans clarté totale, la semaine contenait encore quelque chose qui valait la peine de revenir.",
           de: "Ohne volle Klarheit hatte die Woche noch etwas, das es wert war, zurückzukehren." },
  light: { en: "The week had a steadier quality — and you were here to meet it.",
           pt: "A semana teve uma qualidade mais estável — e você esteve aqui para encontrá-la.",
           es: "La semana tuvo una calidad más estable — y estuviste aquí para encontrarla.",
           fr: "La semaine avait une qualité plus stable — et tu étais là pour la rencontrer.",
           de: "Die Woche hatte eine ruhigere Qualität — und du warst hier, um ihr zu begegnen." },
};

// ─── Line 3: Closing ─────────────────────────────────────────────────────────
// Priority: mantra → profile → goal → generic

function mantraClosing(mantra: string, weekNumber: number, lang: string, diff: SD): string {
  const v = (Math.max(1, weekNumber) - 1) % 3;
  const templates: Record<SD, L5[]> = {
    hard: [
      { en: `Maybe "${mantra}" showed up exactly in the moments that felt heavier.`,
        pt: `Talvez "${mantra}" tenha aparecido justamente nos momentos que pesaram mais.`,
        es: `Tal vez "${mantra}" apareció exactamente en los momentos que pesaron más.`,
        fr: `Peut-être que « ${mantra} » est apparu exactement dans les moments les plus lourds.`,
        de: `Vielleicht zeigte sich „${mantra}" genau in den Momenten, die schwerer wogen.` },
      { en: `Maybe "${mantra}" is what happens when the week is heavy and you're still here.`,
        pt: `Talvez "${mantra}" seja o que acontece quando a semana é pesada e você ainda está aqui.`,
        es: `Tal vez "${mantra}" es lo que sucede cuando la semana es pesada y todavía estás aquí.`,
        fr: `Peut-être que « ${mantra} » c'est ce qui se passe quand la semaine est lourde et que tu es encore là.`,
        de: `Vielleicht ist „${mantra}" das, was passiert, wenn die Woche schwer ist und du noch hier bist.` },
      { en: `Maybe "${mantra}" was already here — even on the heavier days.`,
        pt: `Talvez "${mantra}" já estivesse aqui — mesmo nos dias mais pesados.`,
        es: `Tal vez "${mantra}" ya estaba aquí — incluso en los días más pesados.`,
        fr: `Peut-être que « ${mantra} » était déjà là — même les jours les plus lourds.`,
        de: `Vielleicht war „${mantra}" schon hier — auch an den schwereren Tagen.` },
    ],
    foggy: [
      { en: `Maybe "${mantra}" doesn't need the way to be clear — just present.`,
        pt: `Talvez "${mantra}" não precise que o caminho esteja claro — só presente.`,
        es: `Tal vez "${mantra}" no necesita que el camino esté claro — solo presente.`,
        fr: `Peut-être que « ${mantra} » n'a pas besoin que le chemin soit clair — juste présent.`,
        de: `Vielleicht braucht „${mantra}" den Weg nicht klar — nur präsent.` },
      { en: `Maybe "${mantra}" doesn't need direction. Just this.`,
        pt: `Talvez "${mantra}" não precise de direção. Só isso.`,
        es: `Tal vez "${mantra}" no necesita dirección. Solo esto.`,
        fr: `Peut-être que « ${mantra} » n'a pas besoin de direction. Juste ça.`,
        de: `Vielleicht braucht „${mantra}" keine Richtung. Nur das hier.` },
      { en: `Maybe "${mantra}" appears before the clarity does.`,
        pt: `Talvez "${mantra}" apareça antes da clareza chegar.`,
        es: `Tal vez "${mantra}" aparece antes de que llegue la claridad.`,
        fr: `Peut-être que « ${mantra} » apparaît avant que la clarté arrive.`,
        de: `Vielleicht zeigt sich „${mantra}" bevor die Klarheit kommt.` },
    ],
    light: [
      { en: `Maybe "${mantra}" was already here — in the quieter moments.`,
        pt: `Talvez "${mantra}" já estivesse aqui — nos momentos mais quietos.`,
        es: `Tal vez "${mantra}" ya estaba aquí — en los momentos más tranquilos.`,
        fr: `Peut-être que « ${mantra} » était déjà là — dans les moments plus calmes.`,
        de: `Vielleicht war „${mantra}" schon hier — in den stilleren Momenten.` },
      { en: `Maybe "${mantra}" takes shape exactly in weeks like this.`,
        pt: `Talvez "${mantra}" tome forma exatamente em semanas como esta.`,
        es: `Tal vez "${mantra}" toma forma exactamente en semanas como esta.`,
        fr: `Peut-être que « ${mantra} » prend forme exactement dans des semaines comme celle-ci.`,
        de: `Vielleicht nimmt „${mantra}" genau in Wochen wie dieser Form an.` },
      { en: `Maybe "${mantra}" gets a little clearer when the week has more room.`,
        pt: `Talvez "${mantra}" fique um pouco mais claro quando a semana tem mais espaço.`,
        es: `Tal vez "${mantra}" se vuelve un poco más claro cuando la semana tiene más espacio.`,
        fr: `Peut-être que « ${mantra} » devient un peu plus clair quand la semaine a plus de place.`,
        de: `Vielleicht wird „${mantra}" ein wenig klarer, wenn die Woche mehr Raum hat.` },
    ],
  };
  const pool = templates[diff];
  const t = pool[v];
  return (t as Record<string, string>)[lang] ?? t.en;
}

const PROFILE_CLOSING: Record<EmotionalProfile, L5[]> = {
  burnout: [
    { en: "Staying through the weight — that's a quiet form of recovery.",
      pt: "Atravessar o peso — isso é uma forma silenciosa de recuperação.",
      es: "Atravesar el peso — eso es una forma silenciosa de recuperación.",
      fr: "Traverser le poids — c'est une forme discrète de récupération.",
      de: "Durch das Gewicht hindurchgehen — das ist eine stille Form der Erholung." },
    { en: "The weight didn't erase the week. You still showed up.",
      pt: "O peso não apagou a semana. Você ainda apareceu.",
      es: "El peso no borró la semana. Aún te presentaste.",
      fr: "Le poids n'a pas effacé la semaine. Tu t'es quand même présenté.",
      de: "Das Gewicht hat die Woche nicht ausgelöscht. Du bist trotzdem erschienen." },
    { en: "Being here — even on the heavier days — is its own kind of forward.",
      pt: "Estar aqui — mesmo nos dias mais pesados — é seu próprio tipo de avanço.",
      es: "Estar aquí — incluso en los días más pesados — es su propio tipo de avance.",
      fr: "Être là — même les jours les plus lourds — est sa propre façon d'avancer.",
      de: "Hier zu sein — auch an den schwereren Tagen — ist ein eigener Weg vorwärts." },
  ],
  calm: [
    { en: "The quiet you were looking for — some of it was here.",
      pt: "A quietude que você buscava — uma parte dela estava aqui.",
      es: "La quietud que buscabas — algo de ella estuvo aquí.",
      fr: "La tranquillité que tu cherchais — une partie en était là.",
      de: "Die Ruhe, die du gesucht hast — ein Teil davon war hier." },
    { en: "Not every week needs to move fast. This one was enough.",
      pt: "Nem toda semana precisa ser rápida. Esta foi suficiente.",
      es: "No todas las semanas necesitan ir rápido. Esta fue suficiente.",
      fr: "Toutes les semaines n'ont pas besoin d'aller vite. Celle-ci a suffi.",
      de: "Nicht jede Woche muss schnell sein. Diese war genug." },
    { en: "There were moments of stillness here. That doesn't happen by accident.",
      pt: "Houve alguns momentos de quietude aqui. Isso não acontece por acidente.",
      es: "Hubo algunos momentos de quietud aquí. Eso no ocurre por accidente.",
      fr: "Il y a eu des moments de calme ici. Ce n'était pas un hasard.",
      de: "Es gab Momente der Stille hier. Das passiert nicht zufällig." },
  ],
  focus: [
    { en: "You kept returning to what mattered. That's what focus looks like in practice.",
      pt: "Você continuou voltando para o que importava. É assim que o foco parece na prática.",
      es: "Seguiste volviendo a lo que importaba. Así es como se ve el enfoque en la práctica.",
      fr: "Tu as continué à revenir à ce qui comptait. C'est ce à quoi ressemble le focus en pratique.",
      de: "Du bist immer wieder zu dem zurückgekehrt, was wichtig war. So sieht Fokus in der Praxis aus." },
    { en: "Attention kept finding its way back. That has its own value.",
      pt: "A atenção continuou encontrando seu caminho de volta. Isso tem seu próprio valor.",
      es: "La atención siguió encontrando su camino de regreso. Eso tiene su propio valor.",
      fr: "L'attention a continué à trouver son chemin de retour. Cela a sa propre valeur.",
      de: "Die Aufmerksamkeit fand immer wieder ihren Weg zurück. Das hat seinen eigenen Wert." },
    { en: "Holding onto what matters — even in a full week — is quiet evidence of something.",
      pt: "Segurar o que importa — mesmo em uma semana cheia — é evidência silenciosa de algo.",
      es: "Aferrarse a lo que importa — incluso en una semana llena — es evidencia silenciosa de algo.",
      fr: "S'accrocher à ce qui compte — même dans une semaine chargée — est une preuve discrète de quelque chose.",
      de: "An dem festzuhalten, was wichtig ist — auch in einer vollen Woche — ist ein stiller Beweis für etwas." },
  ],
  confidence: [
    { en: "Small weeks like this become something you can point back to.",
      pt: "Semanas pequenas como esta se tornam algo em que você pode se apoiar.",
      es: "Semanas pequeñas como esta se convierten en algo a lo que puedes volver.",
      fr: "De petites semaines comme celle-ci deviennent quelque chose sur quoi regarder en arrière.",
      de: "Kleine Wochen wie diese werden zu etwas, worauf du zurückblicken kannst." },
    { en: "You were here. A week like this is quiet evidence of something.",
      pt: "Você estava aqui. Uma semana como esta é evidência silenciosa de algo.",
      es: "Estabas aquí. Una semana como esta es evidencia silenciosa de algo.",
      fr: "Tu étais là. Une semaine comme celle-ci est une preuve discrète de quelque chose.",
      de: "Du warst da. Eine Woche wie diese ist ein stiller Beweis für etwas." },
    { en: "It doesn't need to feel big right now. But it happened.",
      pt: "Não precisa parecer grande agora. Mas aconteceu.",
      es: "No tiene que sentirse grande ahora. Pero sucedió.",
      fr: "Ça n'a pas besoin de paraître grand maintenant. Mais c'est arrivé.",
      de: "Es muss sich jetzt nicht groß anfühlen. Aber es ist passiert." },
  ],
};

const GOAL_CLOSING: Record<UserGoal, L5[]> = {
  calm: [
    { en: "The search for more ease that brought you here — it may still be finding its shape.",
      pt: "A busca por mais leveza que trouxe você aqui — ela ainda pode estar encontrando sua forma.",
      es: "La búsqueda de más calma que te trajo aquí — aún puede estar encontrando su forma.",
      fr: "La recherche de plus de légèreté qui t'a amené ici — elle est peut-être encore en train de trouver sa forme.",
      de: "Die Suche nach mehr Leichtigkeit, die dich hierher gebracht hat — sie findet vielleicht noch ihre Form." },
    { en: "Some weeks make the quiet easier to find than others.",
      pt: "Algumas semanas tornam a quietude mais fácil de encontrar do que outras.",
      es: "Algunas semanas hacen la quietud más fácil de encontrar que otras.",
      fr: "Certaines semaines rendent le calme plus facile à trouver que d'autres.",
      de: "Manche Wochen machen die Stille leichter zu finden als andere." },
    { en: "You came here looking for a little more room to breathe. This week had some of that.",
      pt: "Você veio aqui buscando um pouco mais de espaço para respirar. Esta semana teve um pouco disso.",
      es: "Viniste aquí buscando un poco más de espacio para respirar. Esta semana tuvo algo de eso.",
      fr: "Tu es venu ici chercher un peu plus d'espace pour respirer. Cette semaine en avait un peu.",
      de: "Du bist hierher gekommen, um etwas mehr Raum zum Atmen zu finden. Diese Woche hatte davon ein wenig." },
  ],
  clarity: [
    { en: "Clarity doesn't always arrive whole. This week may have brought a quieter version of it.",
      pt: "A clareza nem sempre chega completa. Esta semana pode ter trazido uma versão mais quieta dela.",
      es: "La claridad no siempre llega completa. Esta semana puede haber traído una versión más tranquila de ella.",
      fr: "La clarté n'arrive pas toujours entière. Cette semaine en a peut-être apporté une version plus discrète.",
      de: "Klarheit kommt nicht immer vollständig. Diese Woche hat vielleicht eine stillere Version davon gebracht." },
    { en: "The direction you were searching for doesn't have to be sharp to be real.",
      pt: "A direção que você buscava não precisa ser nítida para ser real.",
      es: "La dirección que buscabas no tiene que ser nítida para ser real.",
      fr: "La direction que tu cherchais n'a pas besoin d'être nette pour être réelle.",
      de: "Die Richtung, nach der du gesucht hast, muss nicht scharf sein, um real zu sein." },
    { en: "Not everything has to be resolved for things to start making more sense.",
      pt: "Nem tudo precisa estar resolvido para que as coisas comecem a fazer mais sentido.",
      es: "No todo tiene que estar resuelto para que las cosas empiecen a tener más sentido.",
      fr: "Tout n'a pas besoin d'être résolu pour que les choses commencent à avoir plus de sens.",
      de: "Nicht alles muss gelöst sein, damit die Dinge mehr Sinn ergeben." },
  ],
  confidence: [
    { en: "What you hoped to rebuild tends to come in small pieces. Some of this week was that.",
      pt: "O que você esperava reconstruir costuma vir em pequenos pedaços. Parte desta semana foi isso.",
      es: "Lo que esperabas reconstruir suele llegar en pequeñas piezas. Parte de esta semana fue eso.",
      fr: "Ce que tu espérais reconstruire a tendance à venir par petits morceaux. Une partie de cette semaine, c'était ça.",
      de: "Was du dir erhofft hast wieder aufzubauen, kommt meist in kleinen Stücken. Ein Teil dieser Woche war das." },
    { en: "Confidence doesn't need to feel complete to be real. This week was a piece of it.",
      pt: "Confiança não precisa parecer completa para ser real. Esta semana foi um pedaço dela.",
      es: "La confianza no necesita sentirse completa para ser real. Esta semana fue una parte de ella.",
      fr: "La confiance n'a pas besoin de sembler complète pour être réelle. Cette semaine en était une pièce.",
      de: "Vertrauen muss sich nicht vollständig anfühlen, um real zu sein. Diese Woche war ein Teil davon." },
    { en: "The small evidence adds up — even when it's hard to see in the moment.",
      pt: "As pequenas evidências se acumulam — mesmo quando é difícil ver no momento.",
      es: "La pequeña evidencia se acumula — aunque sea difícil verla en el momento.",
      fr: "Les petites preuves s'accumulent — même quand c'est difficile à voir sur le moment.",
      de: "Die kleinen Beweise häufen sich an — auch wenn es im Moment schwer zu erkennen ist." },
  ],
  consistency: [
    { en: "Returning — which is what brought you here — matters more than the shape of the week.",
      pt: "Retornar — que é o que trouxe você aqui — importa mais do que a forma da semana.",
      es: "Volver — que es lo que te trajo aquí — importa más que la forma de la semana.",
      fr: "Revenir — c'est ce qui t'a amené ici — compte plus que la forme de la semaine.",
      de: "Zurückzukehren — das ist es, was dich hierher gebracht hat — zählt mehr als die Form der Woche." },
    { en: "You came back. That's what you were hoping to build — and this week is part of that.",
      pt: "Você voltou. É isso que você esperava construir — e esta semana é parte disso.",
      es: "Volviste. Eso es lo que esperabas construir — y esta semana es parte de ello.",
      fr: "Tu es revenu. C'est ce que tu espérais construire — et cette semaine en fait partie.",
      de: "Du bist zurückgekommen. Das ist es, was du dir erhofft hast aufzubauen — und diese Woche ist ein Teil davon." },
    { en: "Rhythm doesn't need to be perfect to count. Showing up this week was part of what you came here for.",
      pt: "O ritmo não precisa ser perfeito para valer. Aparecer esta semana foi parte do que trouxe você aqui.",
      es: "El ritmo no tiene que ser perfecto para contar. Aparecer esta semana fue parte de lo que te trajo aquí.",
      fr: "Le rythme n'a pas besoin d'être parfait pour compter. Être présent cette semaine faisait partie de ce qui t'a amené ici.",
      de: "Rhythmus muss nicht perfekt sein, um zu zählen. Diese Woche da zu sein war ein Teil dessen, was dich hierher gebracht hat." },
  ],
  presence: [
    { en: "Being here — noticing more — was part of what you came looking for. This week, you were here.",
      pt: "Estar aqui — perceber mais — foi parte do que você veio buscar. Esta semana, você estava aqui.",
      es: "Estar aquí — notar más — fue parte de lo que viniste a buscar. Esta semana, estabas aquí.",
      fr: "Être ici — remarquer davantage — faisait partie de ce que tu es venu chercher. Cette semaine, tu étais là.",
      de: "Hier zu sein — mehr wahrzunehmen — war ein Teil dessen, wonach du gesucht hast. Diese Woche warst du hier." },
    { en: "Small moments of presence are still presence. This week had some of that.",
      pt: "Pequenos momentos de presença ainda são presença. Esta semana teve alguns assim.",
      es: "Los pequeños momentos de presencia siguen siendo presencia. Esta semana tuvo algunos de esos.",
      fr: "Les petits moments de présence sont quand même de la présence. Cette semaine en avait.",
      de: "Kleine Momente der Präsenz sind immer noch Präsenz. Diese Woche hatte einige davon." },
    { en: "What you were reaching for — noticing more of the moment — shows up in small ways.",
      pt: "O que você buscava — perceber mais o momento — aparece de formas pequenas.",
      es: "Lo que buscabas — notar más el momento — aparece de pequeñas formas.",
      fr: "Ce que tu cherchais — remarquer davantage l'instant — se manifeste de petites façons.",
      de: "Wonach du gesucht hast — mehr vom Moment wahrzunehmen — zeigt sich auf kleine Weise." },
  ],
  balance: [
    { en: "The search for something more sustainable — this week may have shown a small piece of that.",
      pt: "A busca por algo mais sustentável — esta semana pode ter mostrado um pequeno pedaço disso.",
      es: "La búsqueda de algo más sostenible — esta semana puede haber mostrado una pequeña parte de eso.",
      fr: "La recherche de quelque chose de plus durable — cette semaine en a peut-être montré un petit bout.",
      de: "Die Suche nach etwas Nachhaltigerem — diese Woche hat vielleicht ein kleines Stück davon gezeigt." },
    { en: "A little less at the extremes — this week offered some space between the demands.",
      pt: "Um pouco menos nos extremos — esta semana ofereceu algum espaço entre as exigências.",
      es: "Un poco menos en los extremos — esta semana ofreció algo de espacio entre las exigencias.",
      fr: "Un peu moins dans les extrêmes — cette semaine a offert un peu d'espace entre les exigences.",
      de: "Etwas weniger in den Extremen — diese Woche bot etwas Raum zwischen den Anforderungen." },
    { en: "You came here looking for a more human pace. This week was a piece of that search.",
      pt: "Você veio aqui buscando um ritmo mais humano. Esta semana foi um pedaço dessa busca.",
      es: "Viniste aquí buscando un ritmo más humano. Esta semana fue una parte de esa búsqueda.",
      fr: "Tu es venu ici chercher un rythme plus humain. Cette semaine était un morceau de cette recherche.",
      de: "Du bist hierher gekommen, um ein menschlicheres Tempo zu finden. Diese Woche war ein Teil dieser Suche." },
  ],
};

const GENERIC_CLOSING: L5[] = [
  { en: "A week like this leaves something, even when it's hard to name.",
    pt: "Uma semana assim deixa algo, mesmo quando é difícil nomear.",
    es: "Una semana así deja algo, aunque sea difícil nombrarlo.",
    fr: "Une semaine comme celle-ci laisse quelque chose, même quand c'est difficile à nommer.",
    de: "Eine Woche wie diese hinterlässt etwas, auch wenn es schwer zu benennen ist." },
  { en: "There's something in having been here.",
    pt: "Há algo em ter estado aqui.",
    es: "Hay algo en haber estado aquí.",
    fr: "Il y a quelque chose dans le fait d'avoir été là.",
    de: "Es liegt etwas darin, hier gewesen zu sein." },
  { en: "These weeks add up — even quietly.",
    pt: "Essas semanas se acumulam — mesmo silenciosamente.",
    es: "Estas semanas se acumulan — aunque sea en silencio.",
    fr: "Ces semaines s'accumulent — même discrètement.",
    de: "Diese Wochen häufen sich an — auch still." },
];

// Narrative-state tone modifier for the middle line of the week note.
// Replaces FALLBACK_MIDDLE when no goal/profile personalisation is in effect.
// Adds journey-continuity nuance without naming the state directly.
const NARRATIVE_TONE_MIDDLE: Record<string, Record<SD, L5>> = {
  first_week: {
    hard:  { pt: 'Mesmo assim, a primeira semana aconteceu — e você esteve nela.', en: 'Even so, the first week happened — and you were in it.', es: 'Aun así, la primera semana ocurrió — y estuviste en ella.', fr: "Même ainsi, la première semaine s'est passée — et tu y étais.", de: 'Trotzdem ist die erste Woche geschehen — und du warst drin.' },
    foggy: { pt: 'Sem precisar de clareza, a primeira semana abriu um espaço.', en: 'Without needing clarity, the first week opened a space.', es: 'Sin necesitar claridad, la primera semana abrió un espacio.', fr: 'Sans avoir besoin de clarté, la première semaine a ouvert un espace.', de: 'Ohne Klarheit zu brauchen, hat die erste Woche einen Raum geöffnet.' },
    light: { pt: 'A primeira semana teve leveza. Isso é raro, e importa.', en: 'The first week had lightness. That is rare, and it matters.', es: 'La primera semana tuvo ligereza. Eso es raro, e importa.', fr: "La première semaine avait une légèreté. C'est rare, et ça compte.", de: 'Die erste Woche hatte Leichtigkeit. Das ist selten, und es zählt.' },
  },
  breakthrough: {
    hard:  { pt: 'Sete dias inteiros — cada um com o que trouxe consigo.', en: 'Seven full days — each with whatever they brought.', es: 'Siete días completos — cada uno con lo que trajo consigo.', fr: 'Sept jours entiers — chacun avec ce qu\'il apportait.', de: 'Sieben volle Tage — jeder mit dem, was er mitbrachte.' },
    foggy: { pt: 'Mesmo sem clareza total, a semana teve seu próprio peso quieto.', en: 'Even without full clarity, the week had its own quiet weight.', es: 'Incluso sin claridad total, la semana tuvo su propio peso tranquilo.', fr: 'Même sans clarté totale, la semaine avait son propre poids tranquille.', de: 'Auch ohne volle Klarheit hatte die Woche ihr eigenes stilles Gewicht.' },
    light: { pt: 'Sete dias assim dizem algo sobre o que está sendo construído.', en: 'Seven days like these say something about what\'s being built.', es: 'Siete días así dicen algo sobre lo que está siendo construido.', fr: 'Sept jours comme ceux-là disent quelque chose sur ce qui est en train de se construire.', de: 'Sieben solche Tage sagen etwas darüber aus, was aufgebaut wird.' },
  },
  high_consistency: {
    hard:  { pt: 'Mesmo assim, a semana teve continuidade. Isso não é pouco.', en: 'Even so, the week had continuity. That is not a small thing.', es: 'Aun así, la semana tuvo continuidad. Eso no es poca cosa.', fr: "Même ainsi, la semaine avait de la continuité. Ce n'est pas rien.", de: 'Trotzdem hatte die Woche Kontinuität. Das ist keine Kleinigkeit.' },
    foggy: { pt: 'Mesmo sem clareza, o ritmo se manteve.', en: 'Even without clarity, the rhythm stayed.', es: 'Incluso sin claridad, el ritmo se mantuvo.', fr: 'Même sans clarté, le rythme est resté.', de: 'Auch ohne Klarheit blieb der Rhythmus.' },
    light: { pt: 'A semana teve uma presença consistente. Discreta, mas real.', en: 'The week had a consistent presence. Quiet, but real.', es: 'La semana tuvo una presencia consistente. Discreta, pero real.', fr: 'La semaine avait une présence constante. Discrète, mais réelle.', de: 'Die Woche hatte eine gleichmäßige Präsenz. Still, aber real.' },
  },
  momentum: {
    hard:  { pt: 'Mesmo assim, algo continuou. A semana teve presença.', en: 'Even so, something continued. The week had presence.', es: 'Aun así, algo continuó. La semana tuvo presencia.', fr: "Même ainsi, quelque chose a continué. La semaine avait de la présence.", de: 'Trotzdem ist etwas weitergegangen. Die Woche hatte Präsenz.' },
    foggy: { pt: 'Sem clareza plena, a semana ainda teve um fio que a atravessou.', en: 'Without full clarity, the week still had a thread running through it.', es: 'Sin claridad plena, la semana aún tuvo un hilo que la atravesó.', fr: 'Sans clarté totale, la semaine avait encore un fil qui la traversait.', de: 'Ohne volle Klarheit hatte die Woche noch einen Faden, der sie durchzog.' },
    light: { pt: 'A semana encontrou seu próprio ritmo — e você esteve nela.', en: 'The week found its own rhythm — and you were in it.', es: 'La semana encontró su propio ritmo — y estuviste en ella.', fr: 'La semaine a trouvé son propre rythme — et tu y étais.', de: 'Die Woche fand ihren eigenen Rhythmus — und du warst drin.' },
  },
  comeback: {
    hard:  { pt: 'Mesmo assim, você encontrou um caminho de volta. Isso diz algo.', en: 'Even so, you found a way back. That says something.', es: 'Aun así, encontraste un camino de regreso. Eso dice algo.', fr: 'Même ainsi, tu as trouvé un chemin de retour. Ça dit quelque chose.', de: 'Trotzdem hast du einen Weg zurückgefunden. Das sagt etwas.' },
    foggy: { pt: 'Mesmo sem clareza, algo continuou vivo entre as semanas.', en: 'Even without clarity, something stayed alive between the weeks.', es: 'Incluso sin claridad, algo siguió vivo entre las semanas.', fr: 'Même sans clarté, quelque chose est resté vivant entre les semaines.', de: 'Auch ohne Klarheit blieb etwas zwischen den Wochen lebendig.' },
    light: { pt: 'Depois de uma semana mais quieta, você encontrou espaço novamente.', en: 'After a quieter week, you found space again.', es: 'Después de una semana más tranquila, encontraste espacio de nuevo.', fr: "Après une semaine plus calme, tu as trouvé de l'espace à nouveau.", de: 'Nach einer ruhigeren Woche hast du wieder Raum gefunden.' },
  },
  low_activity: {
    hard:  { pt: 'Mesmo assim, a semana passou — e você ainda está aqui.', en: 'Even so, the week passed — and you are still here.', es: 'Aun así, la semana pasó — y todavía estás aquí.', fr: "Même ainsi, la semaine s'est passée — et tu es toujours là.", de: 'Trotzdem ist die Woche vergangen — und du bist noch hier.' },
    foggy: { pt: 'Algumas semanas passam de um jeito diferente. Isso faz parte.', en: 'Some weeks pass differently. That is part of it.', es: 'Algunas semanas pasan de manera diferente. Eso es parte de ello.', fr: 'Certaines semaines se passent différemment. Cela en fait partie.', de: 'Manche Wochen vergehen anders. Das gehört dazu.' },
    light: { pt: 'Esta semana teve um ritmo mais leve. Não há nada a corrigir nisso.', en: 'This week had a lighter rhythm. There is nothing to fix in that.', es: 'Esta semana tuvo un ritmo más ligero. No hay nada que corregir en eso.', fr: "Cette semaine avait un rythme plus léger. Il n'y a rien à corriger là-dedans.", de: 'Diese Woche hatte einen leichteren Rhythmus. Daran ist nichts zu korrigieren.' },
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generates a 3-line note that synthesizes Goal × Profile × StateDifficulty × Mantra.
 * The dominant state is NEVER NAMED — SectionConnections already did that.
 * Closing priority: mantra → profile → goal → generic.
 */
export function generateWeekNote(
  insights: WeekInsights,
  lang: string,
  profile?: EmotionalProfile | null,
  weekNumber?: number,
  goal?: UserGoal | null,
  mantra?: string | null,
  narrativeState?: string | null,
): WeekNote | null {
  const wn = weekNumber ?? 1;
  const diff = sd(insights.dominantState);
  const lines: string[] = [];

  // Line 1 — opening: goal → profile → fallback (state NEVER named)
  if (goal && GOAL_OPENING[goal]) {
    lines.push(pick(GOAL_OPENING[goal][diff], lang, wn));
  } else if (profile && PROFILE_OPENING[profile]) {
    lines.push(pick(PROFILE_OPENING[profile][diff], lang));
  } else {
    lines.push(pick(FALLBACK_OPENING[diff], lang));
  }

  // Line 2 — middle: interpretive layer (what the goal pursuit meant)
  if (goal && GOAL_MIDDLE[goal]) {
    lines.push(pick(GOAL_MIDDLE[goal][diff], lang));
  } else if (profile && PROFILE_MIDDLE[profile]) {
    lines.push(pick(PROFILE_MIDDLE[profile][diff], lang));
  } else if (narrativeState && NARRATIVE_TONE_MIDDLE[narrativeState]) {
    // Narrative state replaces the generic fallback middle when no goal/profile is set
    lines.push(pick(NARRATIVE_TONE_MIDDLE[narrativeState][diff], lang));
  } else {
    lines.push(pick(FALLBACK_MIDDLE[diff], lang));
  }

  // Line 3 — closing: mantra → profile → goal → generic
  const trimmedMantra = mantra?.trim();
  if (trimmedMantra) {
    lines.push(mantraClosing(trimmedMantra, wn, lang, diff));
  } else if (profile && PROFILE_CLOSING[profile]) {
    const pool = PROFILE_CLOSING[profile];
    lines.push(pick(pool[(wn - 1) % pool.length], lang));
  } else if (goal && GOAL_CLOSING[goal]) {
    const pool = GOAL_CLOSING[goal];
    lines.push(pick(pool[(wn - 1) % pool.length], lang));
  } else {
    lines.push(pick(GENERIC_CLOSING[(wn - 1) % GENERIC_CLOSING.length], lang));
  }

  return { lines };
}

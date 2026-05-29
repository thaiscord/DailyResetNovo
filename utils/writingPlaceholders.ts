// Contextual writing placeholders — emotionally aligned with each day's theme.
// Each pool has 4 options; day number determines which one shows (no repetition
// for the same day, variety across days).

import { getActiveLang } from './langStore';

type Theme = string;

const ACTION_POOLS: Record<string, string[]> = {
  Focus: [
    "What feels worth directing your attention toward?",
    "Name one thing you want to hold onto after today.",
    "Begin with what you'd like to pay more attention to.",
    "Note what comes up when you really look.",
  ],
  Calm: [
    "Let the words arrive as they come.",
    "No need to find the right words. Just start.",
    "Write without trying to land anywhere.",
    "Begin with whatever is here.",
  ],
  Courage: [
    "Begin with what feels uncertain.",
    "Name what you've been waiting to start.",
    "What would you try if it didn't have to be perfect?",
    "Start small. Even one word is enough.",
  ],
  Rest: [
    "What does ease feel like for you right now?",
    "Write without trying to solve anything.",
    "Let this be gentle. Take your time.",
    "Begin where you actually are. No further.",
  ],
  Clarity: [
    "Start with what you already sense.",
    "What has been unclear? Name it softly.",
    "Note what comes when the noise settles.",
    "Write what you'd say if no one was watching.",
  ],
  Momentum: [
    "What small step feels possible right now?",
    "Begin where you actually are.",
    "Note what's already moving, even quietly.",
    "Name one thing that felt like progress today.",
  ],
  Discipline: [
    "What are you choosing today, even when it's hard?",
    "Note what you're showing up for.",
    "Begin with what matters, not what's easiest.",
    "Write what commitment feels like right now.",
  ],
  Rhythm: [
    "What does returning to yourself look like today?",
    "Note what grounds you right now.",
    "Begin with one simple, honest thing.",
    "Write what today asked of you.",
  ],
};

const ACTION_POOLS_PT: Record<string, string[]> = {
  Focus: [
    "O que vale direcionar sua atenção hoje?",
    "Nomeie uma coisa que quer guardar depois de hoje.",
    "Comece com o que gostaria de prestar mais atenção.",
    "Anote o que surge quando você realmente olha.",
  ],
  Calm: [
    "Deixe as palavras chegarem como vierem.",
    "Não precisa encontrar as palavras certas. Só comece.",
    "Escreva sem tentar chegar a algum lugar.",
    "Comece com o que está aqui.",
  ],
  Courage: [
    "Comece com o que parece incerto.",
    "Nomeie o que você tem esperado para começar.",
    "O que você tentaria se não precisasse ser perfeito?",
    "Comece pequeno. Até uma palavra já é suficiente.",
  ],
  Rest: [
    "Como é a facilidade para você agora?",
    "Escreva sem tentar resolver nada.",
    "Que seja gentil. Leve o seu tempo.",
    "Comece onde você realmente está. Não mais longe.",
  ],
  Clarity: [
    "Comece com o que você já sente.",
    "O que tem sido obscuro? Nomeie com calma.",
    "Anote o que vem quando o ruído se acalma.",
    "Escreva o que diria se ninguém estivesse olhando.",
  ],
  Momentum: [
    "Que pequeno passo parece possível agora?",
    "Comece onde você realmente está.",
    "Anote o que já está se movendo, mesmo que quietamente.",
    "Nomeie uma coisa que pareceu progresso hoje.",
  ],
  Discipline: [
    "O que você está escolhendo hoje, mesmo quando é difícil?",
    "Anote o que você está aqui para fazer.",
    "Comece com o que importa, não com o que é mais fácil.",
    "Escreva como o compromisso parece agora.",
  ],
  Rhythm: [
    "Como é voltar para si mesma hoje?",
    "Anote o que te ancora agora.",
    "Comece com uma coisa simples e honesta.",
    "Escreva o que hoje pediu de você.",
  ],
};

const REFLECTION_POOLS: Record<string, string[]> = {
  Focus: [
    "Start with what first comes to mind.",
    "No perfect answer. Just yours.",
    "One honest sentence is enough.",
    "Write without trying to be useful.",
  ],
  Calm: [
    "Slow down. Write what's true right now.",
    "There's nothing to get right here.",
    "Begin with what feels softest.",
    "Let this be a quiet moment.",
  ],
  Courage: [
    "Even one honest sentence is enough.",
    "Start with what you haven't said yet.",
    "Be kind to yourself as you write.",
    "You don't have to have answers.",
  ],
  Rest: [
    "Write without judgment.",
    "You don't have to figure anything out here.",
    "Let this be a pause, not a task.",
    "Begin with what your body is telling you.",
  ],
  Clarity: [
    "Let it be simple. Truth often is.",
    "Write what you'd say to someone you trust.",
    "Start with what you already sense.",
    "One clear thought is enough.",
  ],
  Momentum: [
    "What's worth acknowledging today?",
    "Notice what has shifted, even slightly.",
    "Begin with one quiet observation.",
    "Write without needing it to mean something big.",
  ],
  Discipline: [
    "Be honest with yourself here.",
    "What are you learning about yourself?",
    "Begin with what's real, not perfect.",
    "Write what showing up feels like today.",
  ],
  Rhythm: [
    "What wants to be heard today?",
    "Let the words find you.",
    "Write without editing yourself.",
    "Begin wherever feels true.",
  ],
};

const REFLECTION_POOLS_PT: Record<string, string[]> = {
  Focus: [
    "Comece com o que vem à mente primeiro.",
    "Sem resposta perfeita. Só a sua.",
    "Uma frase honesta já é suficiente.",
    "Escreva sem tentar ser útil.",
  ],
  Calm: [
    "Desacelere. Escreva o que é verdadeiro agora.",
    "Não há nada para acertar aqui.",
    "Comece com o que parece mais suave.",
    "Que seja um momento quieto.",
  ],
  Courage: [
    "Até uma frase honesta já é suficiente.",
    "Comece com o que você ainda não disse.",
    "Seja gentil consigo mesma ao escrever.",
    "Você não precisa ter respostas.",
  ],
  Rest: [
    "Escreva sem julgamento.",
    "Você não precisa resolver nada aqui.",
    "Que seja uma pausa, não uma tarefa.",
    "Comece com o que seu corpo está dizendo.",
  ],
  Clarity: [
    "Que seja simples. A verdade geralmente é.",
    "Escreva o que diria a alguém em quem você confia.",
    "Comece com o que você já sente.",
    "Um pensamento claro já é suficiente.",
  ],
  Momentum: [
    "O que vale reconhecer hoje?",
    "Note o que mudou, mesmo que levemente.",
    "Comece com uma observação quieta.",
    "Escreva sem precisar que signifique algo grande.",
  ],
  Discipline: [
    "Seja honesta consigo mesma aqui.",
    "O que você está aprendendo sobre si mesma?",
    "Comece com o que é real, não o que é perfeito.",
    "Escreva como aparecer parece hoje.",
  ],
  Rhythm: [
    "O que quer ser ouvido hoje?",
    "Deixe as palavras te encontrarem.",
    "Escreva sem se editar.",
    "Comece onde parece verdadeiro.",
  ],
};

const FALLBACK_ACTION = [
  "Begin with whatever is here.",
  "Write without trying to get it right.",
  "A few words is enough.",
  "Start with what feels honest.",
];

const FALLBACK_ACTION_PT = [
  "Comece com o que está aqui.",
  "Escreva sem tentar acertar.",
  "Algumas palavras já são suficientes.",
  "Comece com o que parece honesto.",
];

const ACTION_POOLS_ES: Record<string, string[]> = {
  Focus: [
    "¿Qué vale la pena dirigir tu atención hacia aquí?",
    "¿Qué quieres conservar contigo después de hoy?",
    "Empieza con lo que te gustaría notar más.",
    "Anota lo que aparece cuando realmente miras.",
  ],
  Calm: [
    "Deja que las palabras lleguen como lleguen.",
    "No tienes que encontrar las palabras correctas. Solo empieza.",
    "Escribe sin intentar llegar a ningún lado.",
    "Empieza con lo que está aquí.",
  ],
  Courage: [
    "Empieza con lo que se siente incierto.",
    "Nombra lo que has estado esperando para comenzar.",
    "¿Qué intentarías si no tuviera que ser perfecto?",
    "Empieza pequeño. Incluso una palabra es suficiente.",
  ],
  Rest: [
    "¿Cómo se siente la calma para ti ahora mismo?",
    "Escribe sin intentar resolver nada.",
    "Que sea gentil. Tómate tu tiempo.",
    "Empieza donde realmente estás. No más lejos.",
  ],
  Clarity: [
    "Empieza con lo que ya intuyes.",
    "¿Qué ha estado poco claro? Nómbralo con calma.",
    "Anota lo que aparece cuando el ruido se calma.",
    "Escribe lo que dirías si nadie estuviera mirando.",
  ],
  Momentum: [
    "¿Qué pequeño paso parece posible ahora mismo?",
    "Empieza donde realmente estás.",
    "Anota lo que ya se está moviendo, aunque sea en silencio.",
    "Nombra una cosa que se sintió como progreso hoy.",
  ],
  Discipline: [
    "¿Qué estás eligiendo hoy, incluso cuando es difícil?",
    "Anota para qué estás aquí.",
    "Empieza con lo que importa, no con lo que es más fácil.",
    "Escribe cómo se siente el compromiso ahora mismo.",
  ],
  Rhythm: [
    "¿Cómo se ve volver a ti mismo hoy?",
    "Anota lo que te arraiga ahora.",
    "Empieza con una cosa simple y honesta.",
    "Escribe lo que hoy te pidió.",
  ],
};

const FALLBACK_REFLECTION = [
  "No perfect answer. Just yours.",
  "One honest sentence is enough.",
  "Let this be a quiet moment.",
  "Begin wherever feels true.",
];

const FALLBACK_REFLECTION_PT = [
  "Sem resposta perfeita. Só a sua.",
  "Uma frase honesta já é suficiente.",
  "Que seja um momento quieto.",
  "Comece onde parece verdadeiro.",
];

const REFLECTION_POOLS_ES: Record<string, string[]> = {
  Focus: [
    "Empieza con lo primero que venga a la mente.",
    "Sin respuesta perfecta. Solo la tuya.",
    "Una frase honesta ya es suficiente.",
    "Escribe sin intentar ser útil.",
  ],
  Calm: [
    "Despacio. Escribe lo que es verdad ahora mismo.",
    "No hay nada que acertar aquí.",
    "Empieza con lo que se siente más suave.",
    "Que sea un momento de quietud.",
  ],
  Courage: [
    "Incluso una frase honesta ya es suficiente.",
    "Empieza con lo que aún no has dicho.",
    "Sé gentil contigo al escribir.",
    "No tienes que tener respuestas.",
  ],
  Rest: [
    "Escribe sin juzgar.",
    "No tienes que resolver nada aquí.",
    "Que sea una pausa, no una tarea.",
    "Empieza con lo que tu cuerpo te está diciendo.",
  ],
  Clarity: [
    "Que sea simple. La verdad suele serlo.",
    "Escribe lo que le dirías a alguien en quien confías.",
    "Empieza con lo que ya intuyes.",
    "Un pensamiento claro ya es suficiente.",
  ],
  Momentum: [
    "¿Qué vale la pena reconocer hoy?",
    "Nota lo que ha cambiado, aunque sea levemente.",
    "Empieza con una observación tranquila.",
    "Escribe sin necesitar que signifique algo grande.",
  ],
  Discipline: [
    "Sé honesto contigo mismo aquí.",
    "¿Qué estás aprendiendo sobre ti mismo?",
    "Empieza con lo que es real, no con lo que es perfecto.",
    "Escribe cómo se siente aparecer hoy.",
  ],
  Rhythm: [
    "¿Qué quiere ser escuchado hoy?",
    "Deja que las palabras te encuentren.",
    "Escribe sin editarte.",
    "Empieza donde se sienta verdadero.",
  ],
};

const FALLBACK_ACTION_ES = [
  "Empieza con lo que está aquí.",
  "Escribe sin intentar acertar.",
  "Algunas palabras ya son suficientes.",
  "Empieza con lo que se siente honesto.",
];

const FALLBACK_REFLECTION_ES = [
  "Sin respuesta perfecta. Solo la tuya.",
  "Una frase honesta ya es suficiente.",
  "Que sea un momento de quietud.",
  "Empieza donde se sienta verdadero.",
];

const ACTION_POOLS_FR: Record<string, string[]> = {
  Focus: [
    "Vers quoi vaut-il la peine de diriger ton attention ?",
    "Écris une chose que tu veux garder avec toi aujourd'hui.",
    "Commence avec ce à quoi tu voudrais prêter plus attention.",
    "Note ce qui apparaît quand tu regardes vraiment.",
  ],
  Calm: [
    "Laisse les mots arriver comme ils viennent.",
    "Pas besoin de trouver les bons mots. Commence juste.",
    "Écris sans essayer d'aller quelque part.",
    "Commence avec ce qui est là.",
  ],
  Courage: [
    "Commence avec ce qui semble incertain.",
    "Nomme ce que tu attendais pour commencer.",
    "Qu'est-ce que tu essaierais si ça n'avait pas besoin d'être parfait ?",
    "Commence petit. Même un mot suffit.",
  ],
  Rest: [
    "À quoi ressemble la douceur pour toi en ce moment ?",
    "Écris sans essayer de résoudre quoi que ce soit.",
    "Que ce soit doux. Prends ton temps.",
    "Commence là où tu es vraiment. Pas plus loin.",
  ],
  Clarity: [
    "Commence avec ce que tu sens déjà.",
    "Qu'est-ce qui a été flou ? Nomme-le doucement.",
    "Note ce qui arrive quand le bruit se calme.",
    "Écris ce que tu dirais si personne ne regardait.",
  ],
  Momentum: [
    "Quel petit pas semble possible maintenant ?",
    "Commence là où tu es vraiment.",
    "Note ce qui bouge déjà, même discrètement.",
    "Nomme une chose qui ressemblait à du progrès aujourd'hui.",
  ],
  Discipline: [
    "Qu'est-ce que tu choisis aujourd'hui, même quand c'est difficile ?",
    "Note pour quoi tu es là.",
    "Commence avec ce qui compte, pas avec ce qui est le plus facile.",
    "Écris à quoi ressemble l'engagement en ce moment.",
  ],
  Rhythm: [
    "À quoi ressemble le retour à toi-même aujourd'hui ?",
    "Note ce qui t'ancre en ce moment.",
    "Commence avec une chose simple et honnête.",
    "Écris ce que la journée t'a demandé.",
  ],
};

const FALLBACK_ACTION_FR = [
  "Commence avec ce qui est là.",
  "Écris sans essayer de trouver la bonne réponse.",
  "Quelques mots suffisent.",
  "Commence avec ce qui semble honnête.",
];

const REFLECTION_POOLS_FR: Record<string, string[]> = {
  Focus: [
    "Commence avec ce qui vient en premier.",
    "Pas de réponse parfaite. Juste la tienne.",
    "Une phrase honnête suffit déjà.",
    "Écris sans essayer d'être utile.",
  ],
  Calm: [
    "Ralentis. Écris ce qui est vrai maintenant.",
    "Il n'y a rien à réussir ici.",
    "Commence avec ce qui semble le plus doux.",
    "Que ce soit un moment calme.",
  ],
  Courage: [
    "Même une phrase honnête suffit.",
    "Commence avec ce que tu n'as pas encore dit.",
    "Sois doux avec toi en écrivant.",
    "Tu n'as pas besoin d'avoir les réponses.",
  ],
  Rest: [
    "Écris sans jugement.",
    "Tu n'as pas besoin de résoudre quoi que ce soit ici.",
    "Que ce soit une pause, pas une tâche.",
    "Commence avec ce que ton corps te dit.",
  ],
  Clarity: [
    "Que ce soit simple. La vérité l'est souvent.",
    "Écris ce que tu dirais à quelqu'un en qui tu as confiance.",
    "Commence avec ce que tu sens déjà.",
    "Une pensée claire suffit.",
  ],
  Momentum: [
    "Qu'est-ce qui vaut la peine d'être reconnu aujourd'hui ?",
    "Remarque ce qui a bougé, même légèrement.",
    "Commence avec une observation tranquille.",
    "Écris sans avoir besoin que ça signifie quelque chose de grand.",
  ],
  Discipline: [
    "Sois honnête avec toi-même ici.",
    "Qu'est-ce que tu apprends sur toi ?",
    "Commence avec ce qui est réel, pas ce qui est parfait.",
    "Écris à quoi ressemble le fait de te montrer aujourd'hui.",
  ],
  Rhythm: [
    "Qu'est-ce qui veut être entendu aujourd'hui ?",
    "Laisse les mots te trouver.",
    "Écris sans te corriger.",
    "Commence là où ça semble vrai.",
  ],
};

const FALLBACK_REFLECTION_FR = [
  "Pas de réponse parfaite. Juste la tienne.",
  "Une phrase honnête suffit déjà.",
  "Que ce soit un moment calme.",
  "Commence là où ça semble vrai.",
];

const ACTION_POOLS_DE: Record<string, string[]> = {
  Focus: [
    "Wohin ist es wert, deine Aufmerksamkeit zu lenken?",
    "Nenne eine Sache, die du von heute mitnehmen möchtest.",
    "Beginne mit dem, worauf du mehr achten möchtest.",
    "Halte fest, was auftaucht, wenn du wirklich schaust.",
  ],
  Calm: [
    "Lass die Worte kommen, wie sie kommen.",
    "Du musst nicht die richtigen Worte finden. Fang einfach an.",
    "Schreib ohne zu versuchen, irgendwo anzukommen.",
    "Beginne mit dem, was gerade hier ist.",
  ],
  Courage: [
    "Beginne mit dem, was sich unsicher anfühlt.",
    "Nenne das, worauf du gewartet hast, um anzufangen.",
    "Was würdest du versuchen, wenn es nicht perfekt sein müsste?",
    "Fang klein an. Auch ein Wort ist genug.",
  ],
  Rest: [
    "Wie fühlt sich Leichtigkeit gerade für dich an?",
    "Schreib ohne zu versuchen, etwas zu lösen.",
    "Lass es sanft sein. Nimm dir Zeit.",
    "Beginne dort, wo du wirklich bist. Nicht weiter.",
  ],
  Clarity: [
    "Beginne mit dem, was du bereits spürst.",
    "Was war unklar? Nenne es ruhig.",
    "Halte fest, was auftaucht, wenn das Rauschen nachlässt.",
    "Schreib, was du sagen würdest, wenn niemand zusieht.",
  ],
  Momentum: [
    "Welcher kleine Schritt erscheint gerade möglich?",
    "Beginne dort, wo du wirklich bist.",
    "Halte fest, was sich schon bewegt, auch wenn leise.",
    "Nenne eine Sache, die sich heute wie Fortschritt angefühlt hat.",
  ],
  Discipline: [
    "Was wählst du heute, auch wenn es schwer ist?",
    "Halte fest, wofür du hier erscheinst.",
    "Beginne mit dem, was wichtig ist, nicht mit dem, was einfacher ist.",
    "Schreib, wie sich Verpflichtung gerade anfühlt.",
  ],
  Rhythm: [
    "Wie sieht es aus, heute zu dir selbst zurückzukehren?",
    "Halte fest, was dich gerade erdet.",
    "Beginne mit einer einfachen, ehrlichen Sache.",
    "Schreib, was der Tag von dir verlangt hat.",
  ],
};

const FALLBACK_ACTION_DE = [
  "Beginne mit dem, was gerade hier ist.",
  "Schreib ohne zu versuchen, es richtig zu machen.",
  "Ein paar Worte reichen.",
  "Beginne mit dem, was sich ehrlich anfühlt.",
];

const REFLECTION_POOLS_DE: Record<string, string[]> = {
  Focus: [
    "Beginne mit dem, was zuerst kommt.",
    "Keine perfekte Antwort. Nur deine.",
    "Ein ehrlicher Satz ist genug.",
    "Schreib ohne zu versuchen, nützlich zu sein.",
  ],
  Calm: [
    "Langsamer werden. Schreib, was gerade wahr ist.",
    "Hier gibt es nichts richtig zu machen.",
    "Beginne mit dem, was sich am sanftesten anfühlt.",
    "Lass das ein stilles Moment sein.",
  ],
  Courage: [
    "Auch ein ehrlicher Satz ist genug.",
    "Beginne mit dem, was du noch nicht gesagt hast.",
    "Sei sanft mit dir, während du schreibst.",
    "Du musst keine Antworten haben.",
  ],
  Rest: [
    "Schreib ohne Urteil.",
    "Du musst hier nichts herausfinden.",
    "Lass das eine Pause sein, keine Aufgabe.",
    "Beginne mit dem, was dein Körper dir sagt.",
  ],
  Clarity: [
    "Lass es einfach sein. Wahrheit ist es oft.",
    "Schreib, was du jemandem sagen würdest, dem du vertraust.",
    "Beginne mit dem, was du bereits spürst.",
    "Ein klarer Gedanke ist genug.",
  ],
  Momentum: [
    "Was ist es wert, heute anerkannt zu werden?",
    "Bemerke, was sich verändert hat, auch wenn leicht.",
    "Beginne mit einer ruhigen Beobachtung.",
    "Schreib ohne zu brauchen, dass es etwas Großes bedeutet.",
  ],
  Discipline: [
    "Sei hier ehrlich mit dir selbst.",
    "Was lernst du über dich?",
    "Beginne mit dem, was real ist, nicht was perfekt ist.",
    "Schreib, wie sich Erscheinen heute anfühlt.",
  ],
  Rhythm: [
    "Was möchte heute gehört werden?",
    "Lass die Worte dich finden.",
    "Schreib ohne dich zu korrigieren.",
    "Beginne dort, wo es sich wahr anfühlt.",
  ],
};

const FALLBACK_REFLECTION_DE = [
  "Keine perfekte Antwort. Nur deine.",
  "Ein ehrlicher Satz ist genug.",
  "Lass das ein stilles Moment sein.",
  "Beginne dort, wo es sich wahr anfühlt.",
];

export function getActionPlaceholder(theme: Theme, day: number): string {
  const lang = getActiveLang();
  if (lang === 'pt') {
    const pool = ACTION_POOLS_PT[theme] ?? FALLBACK_ACTION_PT;
    return pool[day % pool.length];
  }
  if (lang === 'es') {
    const pool = ACTION_POOLS_ES[theme] ?? FALLBACK_ACTION_ES;
    return pool[day % pool.length];
  }
  if (lang === 'fr') {
    const pool = ACTION_POOLS_FR[theme] ?? FALLBACK_ACTION_FR;
    return pool[day % pool.length];
  }
  if (lang === 'de') {
    const pool = ACTION_POOLS_DE[theme] ?? FALLBACK_ACTION_DE;
    return pool[day % pool.length];
  }
  const pool = ACTION_POOLS[theme] ?? FALLBACK_ACTION;
  return pool[day % pool.length];
}

export function getReflectionPlaceholder(theme: Theme, day: number): string {
  const lang = getActiveLang();
  if (lang === 'pt') {
    const pool = REFLECTION_POOLS_PT[theme] ?? FALLBACK_REFLECTION_PT;
    return pool[(day + 1) % pool.length];
  }
  if (lang === 'es') {
    const pool = REFLECTION_POOLS_ES[theme] ?? FALLBACK_REFLECTION_ES;
    return pool[(day + 1) % pool.length];
  }
  if (lang === 'fr') {
    const pool = REFLECTION_POOLS_FR[theme] ?? FALLBACK_REFLECTION_FR;
    return pool[(day + 1) % pool.length];
  }
  if (lang === 'de') {
    const pool = REFLECTION_POOLS_DE[theme] ?? FALLBACK_REFLECTION_DE;
    return pool[(day + 1) % pool.length];
  }
  // Offset by 1 so reflection placeholder differs from action placeholder on the same day
  const pool = REFLECTION_POOLS[theme] ?? FALLBACK_REFLECTION;
  return pool[(day + 1) % pool.length];
}

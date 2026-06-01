// ─── Daily Emotional State System (Prompt 9 — System 6) ──────────────────────
// User selects their current mental state each day.
// The app adapts its tone and banner to meet them exactly where they are.

import { isEs, isPt, isFr, isDe } from './langStore';

export type DailyState = 'racing' | 'tired' | 'overwhelmed' | 'unclear' | 'drained' | 'balanced' | null;

export interface DailyStateOption {
  key: DailyState & string;
  label: string;
  labelPt: string;
  labelEs: string;
  labelFr: string;
  labelDe: string;
  icon: string;
}

export const DAILY_STATE_OPTIONS: DailyStateOption[] = [
  { key: 'racing',      label: 'Racing mind', labelPt: 'Mente acelerada', labelEs: 'La mente no para',     labelFr: 'Pensées rapides', labelDe: 'Gedankenkarussell', icon: 'flash-outline' },
  { key: 'tired',       label: 'Tired',        labelPt: 'Com cansaço',     labelEs: 'Agotado',              labelFr: 'Fatigue',         labelDe: 'Müde',              icon: 'moon-outline' },
  { key: 'overwhelmed', label: 'Overwhelmed',  labelPt: 'Sobrecarregado',  labelEs: 'Todo se siente mucho', labelFr: 'Trop plein',      labelDe: 'Überwältigt',       icon: 'cloud-outline' },
  { key: 'unclear',     label: 'Unfocused',    labelPt: 'Sem clareza',     labelEs: 'Sin claridad',         labelFr: 'Flou',            labelDe: 'Unklar',            icon: 'help-circle-outline' },
  { key: 'drained',     label: 'Low energy',   labelPt: 'Sem energia',     labelEs: 'Sin energía',          labelFr: 'Peu d\'énergie',  labelDe: 'Wenig Energie',     icon: 'battery-dead-outline' },
  { key: 'balanced',    label: 'In balance',   labelPt: 'Em equilíbrio',   labelEs: 'En equilibrio',        labelFr: 'En équilibre',    labelDe: 'Im Gleichgewicht',  icon: 'infinite-outline' },
];

// ─── Adapted banners per state ────────────────────────────────────────────────

const STATE_BANNERS_EN: Record<string, string> = {
  racing:      'Slow down. One thing at a time.',
  tired:       'Tired is allowed. One small return counts.',
  overwhelmed: 'You don\'t need to fix everything today.',
  unclear:     'Clarity comes through small steps, not big plans.',
  drained:     'Small is more than enough today.',
  balanced:    'Not every advance makes noise.',
};

const STATE_BANNERS_PT: Record<string, string> = {
  racing:      'Desacelere. Uma coisa de cada vez.',
  tired:       'Cansada está tudo bem. Um pequeno retorno já conta.',
  overwhelmed: 'Você não precisa resolver tudo hoje.',
  unclear:     'A clareza vem de pequenos passos, não de grandes planos.',
  drained:     'Pequeno já é mais do que suficiente hoje.',
  balanced:    'Nem todo avanço faz barulho.',
};

const STATE_BANNERS_ES: Record<string, string> = {
  racing:      'Despacio. Una cosa a la vez.',
  tired:       'El cansancio también es parte del camino. Un pequeño regreso cuenta.',
  overwhelmed: 'No necesitas resolverlo todo hoy.',
  unclear:     'La claridad llega con pasos pequeños, no con grandes planes.',
  drained:     'Pequeño es más que suficiente hoy.',
  balanced:    'No todo avance hace ruido.',
};

const STATE_BANNERS_FR: Record<string, string> = {
  racing:      'Doucement. Une chose à la fois.',
  tired:       'Avec de la fatigue — un petit retour compte encore.',
  overwhelmed: 'Tu n\'as pas besoin de tout résoudre aujourd\'hui.',
  unclear:     'La clarté vient de petits pas, pas de grands plans.',
  drained:     'Petit est déjà plus que suffisant aujourd\'hui.',
  balanced:    'Tout avancement ne fait pas de bruit.',
};

const STATE_BANNERS_DE: Record<string, string> = {
  racing:      'Langsamer. Eine Sache nach der anderen.',
  tired:       'Müde ist erlaubt. Auch ein kleiner Schritt zählt.',
  overwhelmed: 'Du musst heute nicht alles lösen.',
  unclear:     'Klarheit kommt durch kleine Schritte, nicht durch große Pläne.',
  drained:     'Klein ist heute mehr als genug.',
  balanced:    'Nicht jeder Fortschritt macht Lärm.',
};

export function getDailyStateBanner(state: DailyState): string | null {
  if (!state) return null;
  const map = isEs() ? STATE_BANNERS_ES : isPt() ? STATE_BANNERS_PT : isFr() ? STATE_BANNERS_FR : isDe() ? STATE_BANNERS_DE : STATE_BANNERS_EN;
  return map[state] ?? null;
}

export function getDailyStateLabel(state: DailyState, lang?: string): string | null {
  if (!state) return null;
  const opt = DAILY_STATE_OPTIONS.find(o => o.key === state);
  if (!opt) return null;
  if (lang === 'pt') return opt.labelPt;
  if (lang === 'es') return opt.labelEs;
  if (lang === 'fr') return opt.labelFr;
  if (lang === 'de') return opt.labelDe;
  return opt.label;
}

// ─── Adaptive word pools per state ───────────────────────────────────────────

const STATE_WORDS_PT: Record<string, string[]> = {
  racing:      ['Respirar', 'Silêncio', 'Presença', 'Pausa'],
  unclear:     ['Clareza', 'Direção', 'Foco', 'Centro'],
  drained:     ['Descanso', 'Recuperação', 'Gentileza', 'Leveza'],
  tired:       ['Pausa', 'Cuidado', 'Recuperação', 'Calma'],
  overwhelmed: ['Leveza', 'Espaço', 'Soltar', 'Menos'],
  balanced:    ['Presença', 'Ritmo', 'Leveza', 'Calma'],
};

const STATE_WORDS_EN: Record<string, string[]> = {
  racing:      ['Breathe', 'Stillness', 'Presence', 'Pause'],
  unclear:     ['Clarity', 'Direction', 'Focus', 'Center'],
  drained:     ['Rest', 'Recovery', 'Gentleness', 'Ease'],
  tired:       ['Pause', 'Care', 'Recovery', 'Calm'],
  overwhelmed: ['Lightness', 'Space', 'Release', 'Less'],
  balanced:    ['Presence', 'Rhythm', 'Lightness', 'Calm'],
};

const STATE_WORDS_ES: Record<string, string[]> = {
  racing:      ['Respirar', 'Silencio', 'Presencia', 'Pausa'],
  unclear:     ['Claridad', 'Dirección', 'Foco', 'Centro'],
  drained:     ['Descanso', 'Recuperación', 'Gentileza', 'Ligereza'],
  tired:       ['Pausa', 'Cuidado', 'Recuperación', 'Calma'],
  overwhelmed: ['Ligereza', 'Espacio', 'Soltar', 'Menos'],
  balanced:    ['Presencia', 'Ritmo', 'Ligereza', 'Calma'],
};

const STATE_WORDS_FR: Record<string, string[]> = {
  racing:      ['Respirer', 'Silence', 'Présence', 'Pause'],
  unclear:     ['Clarté', 'Direction', 'Ancrage', 'Centre'],
  drained:     ['Repos', 'Récupération', 'Douceur', 'Légèreté'],
  tired:       ['Pause', 'Soin', 'Récupération', 'Calme'],
  overwhelmed: ['Légèreté', 'Espace', 'Relâcher', 'Moins'],
  balanced:    ['Présence', 'Rythme', 'Légèreté', 'Calme'],
};

const STATE_WORDS_DE: Record<string, string[]> = {
  racing:      ['Atmen', 'Stille', 'Gegenwart', 'Pause'],
  unclear:     ['Klarheit', 'Richtung', 'Fokus', 'Mitte'],
  drained:     ['Erholung', 'Ruhe', 'Sanftheit', 'Leichtigkeit'],
  tired:       ['Pause', 'Fürsorge', 'Erholung', 'Gelassenheit'],
  overwhelmed: ['Leichtigkeit', 'Raum', 'Loslassen', 'Weniger'],
  balanced:    ['Gegenwart', 'Rhythmus', 'Leichtigkeit', 'Ruhe'],
};

export function getAdaptiveWord(state: DailyState, lang: string, day: number): string | null {
  if (!state) return null;
  const map = lang === 'es' ? STATE_WORDS_ES : lang === 'pt' ? STATE_WORDS_PT : lang === 'fr' ? STATE_WORDS_FR : lang === 'de' ? STATE_WORDS_DE : STATE_WORDS_EN;
  const pool = map[state];
  if (!pool?.length) return null;
  return pool[(day - 1) % pool.length];
}

// ─── Adaptive phrase pools per state ─────────────────────────────────────────

const STATE_PHRASES_PT: Record<string, string[]> = {
  racing:      ['Seu ritmo não precisa correr.', 'Você não precisa resolver tudo agora.', 'Menos ruído também é progresso.'],
  unclear:     ['Uma coisa de cada vez.', 'Clareza também pode começar pequeno.', 'Nem tudo precisa ser decidido agora.'],
  drained:     ['Descansar também é continuar.', 'Você não precisa forçar hoje.', 'Seu corpo também participa do reset.'],
  tired:       ['Pequeno também conta.', 'Você não precisa de muito hoje.', 'Um passo já é suficiente.'],
  overwhelmed: ['Nem tudo precisa caber hoje.', 'Você pode desacelerar.', 'Um pouco de espaço já ajuda.'],
  balanced:    ['O ritmo pode continuar sem pressa.', 'Nem tudo precisa mudar hoje.', 'Você pode cuidar sem apertar.'],
};

const STATE_PHRASES_EN: Record<string, string[]> = {
  racing:      ["Your rhythm doesn't need to rush.", "You don't need to solve everything now.", 'Less noise is also progress.'],
  unclear:     ['One thing at a time.', 'Clarity can start small too.', 'Not everything needs to be decided now.'],
  drained:     ['Resting is also continuing.', "You don't need to push today.", 'Your body is part of the reset too.'],
  tired:       ['Small counts too.', "You don't need much today.", 'One step is enough.'],
  overwhelmed: ["Not everything needs to fit today.", 'You can slow down.', 'A little space already helps.'],
  balanced:    ['The rhythm can continue without rush.', 'Not everything needs to change today.', 'You can care without forcing.'],
};

const STATE_PHRASES_ES: Record<string, string[]> = {
  racing:      ['Tu ritmo no necesita correr.', 'No tienes que resolver todo ahora.', 'Menos ruido también es progreso.'],
  unclear:     ['Una cosa a la vez.', 'La claridad también puede empezar pequeña.', 'No todo necesita decidirse ahora.'],
  drained:     ['Descansar también es continuar.', 'No necesitas forzar hoy.', 'Tu cuerpo también participa del reset.'],
  tired:       ['Lo pequeño también cuenta.', 'No necesitas mucho hoy.', 'Un paso es suficiente.'],
  overwhelmed: ['No todo necesita caber hoy.', 'Puedes desacelerar.', 'Un poco de espacio ya ayuda.'],
  balanced:    ['El ritmo puede continuar sin prisa.', 'No todo necesita cambiar hoy.', 'Puedes cuidar sin presionar.'],
};

const STATE_PHRASES_FR: Record<string, string[]> = {
  racing:      ['Ton rythme n\'a pas besoin de courir.', 'Tu n\'as pas besoin de tout résoudre maintenant.', 'Moins de bruit, c\'est aussi du progrès.'],
  unclear:     ['Une chose à la fois.', 'La clarté peut aussi commencer petit.', 'Tout n\'a pas besoin d\'être décidé maintenant.'],
  drained:     ['Se reposer c\'est aussi continuer.', 'Tu n\'as pas besoin de forcer aujourd\'hui.', 'Ton corps participe aussi au reset.'],
  tired:       ['Petit compte aussi.', 'Tu n\'as pas besoin de grand-chose aujourd\'hui.', 'Un pas suffit déjà.'],
  overwhelmed: ['Tout n\'a pas besoin de tenir aujourd\'hui.', 'Tu peux ralentir.', 'Un peu d\'espace aide déjà.'],
  balanced:    ['Le rythme peut continuer sans hâte.', 'Tout n\'a pas besoin de changer aujourd\'hui.', 'Tu peux prendre soin sans forcer.'],
};

const STATE_PHRASES_DE: Record<string, string[]> = {
  racing:      ['Dein Rhythmus muss nicht hetzen.', 'Du musst nicht alles jetzt lösen.', 'Weniger Lärm ist auch Fortschritt.'],
  unclear:     ['Eine Sache nach der anderen.', 'Klarheit kann auch klein beginnen.', 'Nicht alles muss jetzt entschieden werden.'],
  drained:     ['Sich ausruhen ist auch weitermachen.', 'Du musst dich heute nicht zwingen.', 'Dein Körper ist auch Teil des Resets.'],
  tired:       ['Klein zählt auch.', 'Du brauchst heute nicht viel.', 'Ein Schritt ist genug.'],
  overwhelmed: ['Nicht alles muss heute passen.', 'Du kannst langsamer werden.', 'Ein bisschen Raum hilft schon.'],
  balanced:    ['Der Rhythmus kann ohne Eile weitergehen.', 'Nicht alles muss sich heute ändern.', 'Du kannst fürsorgen ohne zu drängen.'],
};

export function getAdaptivePhrase(state: DailyState, lang: string, day: number): string | null {
  if (!state) return null;
  const map = lang === 'es' ? STATE_PHRASES_ES : lang === 'pt' ? STATE_PHRASES_PT : lang === 'fr' ? STATE_PHRASES_FR : lang === 'de' ? STATE_PHRASES_DE : STATE_PHRASES_EN;
  const pool = map[state];
  if (!pool?.length) return null;
  return pool[(day - 1) % pool.length];
}

// ─── Expanded card depth copy (distinct from microcopy — deepens the word) ───

const STATE_DEPTH_PT: Record<string, string[]> = {
  racing:      [
    'Respirar lentamente diz ao corpo que o momento presente é seguro.',
    'O silêncio não é vazio. É onde o ruído interno começa a diminuir.',
    'Estar presente não exige esforço. Só atenção ao que está aqui agora.',
    'Uma pausa não atrasa. Ela reorganiza o que realmente importa.',
  ],
  unclear:     [
    'Quando tudo parece misturado, reduzir o ritmo ajuda a enxergar melhor.',
    'Direção não exige certeza total. Um passo claro já é suficiente.',
    'Foco não é fazer tudo ao mesmo tempo. É escolher uma coisa para agora.',
    'Voltar ao centro não é fraqueza. É saber de onde partir.',
  ],
  drained:     [
    'Seu corpo também participa da forma como você atravessa o dia.',
    'Recuperar não é recomeçar do zero. É deixar que o que cansou possa descansar.',
    'Ser gentil com você mesmo não é fraqueza. É inteligência emocional.',
    'Leveza não precisa ser conquistada. É o que sobra quando você para de forçar.',
  ],
  tired:       [
    'Uma pausa intencional não é rendição. É parte do movimento.',
    'Cuidar de si mesmo não é egoísmo. É o que torna possível continuar.',
    'O que descansa, acumula. Recuperação silenciosa também é progresso.',
    'Calma às vezes já está aqui, esperando você parar de procurar por ela.',
  ],
  overwhelmed: [
    'Você não precisa resolver tudo agora para continuar avançando.',
    'Espaço não é ausência de ação. É o que deixa a ação acontecer com mais clareza.',
    'Soltar não significa desistir. Significa não carregar o que não é seu agora.',
    'Fazer menos com presença vale mais do que fazer muito sem estar aqui.',
  ],
  balanced: [
    'Estar presente em um dia estável também é uma forma de atenção.',
    'Ritmo não é velocidade. É a capacidade de continuar sem se perder.',
    'Leveza não precisa ser conquistada. Às vezes ela já está aqui.',
    'O que está funcionando também merece ser notado.',
  ],
};

const STATE_DEPTH_EN: Record<string, string[]> = {
  racing:      [
    'Breathing slowly tells the body the present moment is safe.',
    'Silence is not emptiness. It\'s where inner noise begins to quiet.',
    'Being present takes no effort. Just attention to what is here now.',
    'A pause doesn\'t delay. It reorganizes what truly matters.',
  ],
  unclear:     [
    'When everything feels mixed up, slowing down helps you see more clearly.',
    'Direction doesn\'t require total certainty. One clear step is enough.',
    'Focus isn\'t doing everything at once. It\'s choosing one thing for now.',
    'Returning to center isn\'t weakness. It\'s knowing where to begin.',
  ],
  drained:     [
    'Your body is also part of how you move through the day.',
    'Recovering isn\'t starting over. It\'s letting what tired you finally rest.',
    'Being gentle with yourself isn\'t weakness. It\'s emotional intelligence.',
    'Lightness doesn\'t need to be earned. It\'s what remains when you stop forcing.',
  ],
  tired:       [
    'An intentional pause isn\'t surrender. It\'s part of the movement.',
    'Taking care of yourself isn\'t selfish. It\'s what makes continuing possible.',
    'Quiet recovery is also progress. What rests, accumulates.',
    'Calm is sometimes already here, waiting for you to stop searching for it.',
  ],
  overwhelmed: [
    'You don\'t need to solve everything now to keep moving forward.',
    'Space isn\'t the absence of action. It\'s what lets action happen with more clarity.',
    'Letting go doesn\'t mean giving up. It means not carrying what isn\'t yours right now.',
    'Doing less with presence is worth more than doing much without being here.',
  ],
  balanced: [
    'Being present on a stable day is also a form of attention.',
    'Rhythm isn\'t speed. It\'s the ability to continue without losing yourself.',
    'Lightness doesn\'t need to be earned. Sometimes it\'s already here.',
    'What is working also deserves to be noticed.',
  ],
};

const STATE_DEPTH_ES: Record<string, string[]> = {
  racing:      [
    'Respirar lentamente le dice al cuerpo que el momento presente es seguro.',
    'El silencio no es vacío. Es donde el ruido interno empieza a calmarse.',
    'Estar presente no requiere esfuerzo. Solo atención a lo que está aquí ahora.',
    'Una pausa no retrasa. Reorganiza lo que realmente importa.',
  ],
  unclear:     [
    'Cuando todo parece mezclado, ir más despacio ayuda a ver con más claridad.',
    'La dirección no exige certeza total. Un paso claro ya es suficiente.',
    'El foco no es hacer todo a la vez. Es elegir una cosa para ahora.',
    'Volver al centro no es debilidad. Es saber desde dónde partir.',
  ],
  drained:     [
    'Tu cuerpo también es parte de cómo atraviesas el día.',
    'Recuperarse no es empezar de cero. Es dejar que lo que te cansó pueda descansar.',
    'Ser gentil contigo mismo no es debilidad. Es inteligencia emocional.',
    'La ligereza no hay que conquistarla. Es lo que queda cuando dejas de forzar.',
  ],
  tired:       [
    'Una pausa intencional no es rendición. Es parte del movimiento.',
    'Cuidarte no es egoísmo. Es lo que hace posible continuar.',
    'La recuperación silenciosa también es progreso. Lo que descansa, acumula.',
    'La calma a veces ya está aquí, esperando que te detengas a encontrarla.',
  ],
  overwhelmed: [
    'No necesitas resolver todo ahora para seguir avanzando.',
    'El espacio no es ausencia de acción. Es lo que deja que la acción ocurra con más claridad.',
    'Soltar no significa rendirse. Significa no cargar lo que no es tuyo ahora.',
    'Hacer menos con presencia vale más que hacer mucho sin estar aquí.',
  ],
  balanced: [
    'Estar presente en un día estable también es una forma de atención.',
    'El ritmo no es velocidad. Es la capacidad de continuar sin perderse.',
    'La ligereza no necesita conquistarse. A veces ya está aquí.',
    'Lo que funciona también merece ser notado.',
  ],
};

const STATE_DEPTH_FR: Record<string, string[]> = {
  racing:      [
    'Respirer lentement dit au corps que le moment présent est sûr.',
    'Le silence n\'est pas le vide. C\'est là où le bruit intérieur commence à se calmer.',
    'Être présent ne demande pas d\'effort. Juste l\'attention à ce qui est là maintenant.',
    'Une pause ne retarde pas. Elle réorganise ce qui compte vraiment.',
  ],
  unclear:     [
    'Quand tout semble mélangé, ralentir aide à voir plus clair.',
    'La direction n\'exige pas de certitude totale. Un pas clair suffit déjà.',
    'Le focus n\'est pas tout faire à la fois. C\'est choisir une chose pour maintenant.',
    'Revenir au centre n\'est pas une faiblesse. C\'est savoir d\'où partir.',
  ],
  drained:     [
    'Ton corps participe aussi à la façon dont tu traverses la journée.',
    'Récupérer n\'est pas repartir de zéro. C\'est laisser ce qui t\'a épuisé se reposer.',
    'Être doux avec toi-même n\'est pas une faiblesse. C\'est de l\'intelligence émotionnelle.',
    'La légèreté n\'a pas besoin d\'être gagnée. C\'est ce qui reste quand tu arrêtes de forcer.',
  ],
  tired:       [
    'Une pause intentionnelle n\'est pas une reddition. Elle fait partie du mouvement.',
    'Prendre soin de toi n\'est pas de l\'égoïsme. C\'est ce qui rend le fait de continuer possible.',
    'La récupération silencieuse est aussi du progrès. Ce qui se repose s\'accumule.',
    'Le calme est parfois déjà là, attendant que tu t\'arrêtes de le chercher.',
  ],
  overwhelmed: [
    'Tu n\'as pas besoin de tout résoudre maintenant pour continuer à avancer.',
    'L\'espace n\'est pas l\'absence d\'action. C\'est ce qui permet à l\'action d\'avoir lieu avec plus de clarté.',
    'Lâcher ne signifie pas abandonner. Ça signifie ne pas porter ce qui n\'est pas le tien maintenant.',
    'Faire moins avec présence vaut plus que faire beaucoup sans être là.',
  ],
  balanced: [
    'Être présent lors d\'une journée stable est aussi une forme d\'attention.',
    'Le rythme n\'est pas la vitesse. C\'est la capacité de continuer sans se perdre.',
    'La légèreté n\'a pas besoin d\'être gagnée. Parfois elle est déjà là.',
    'Ce qui fonctionne mérite aussi d\'être remarqué.',
  ],
};

const STATE_DEPTH_DE: Record<string, string[]> = {
  racing:      [
    'Langsam atmen sagt dem Körper, dass der gegenwärtige Moment sicher ist.',
    'Stille ist keine Leere. Es ist der Ort, wo innerer Lärm sich zu beruhigen beginnt.',
    'Präsent zu sein braucht keine Anstrengung. Nur Aufmerksamkeit für das, was jetzt hier ist.',
    'Eine Pause verzögert nicht. Sie ordnet neu, was wirklich wichtig ist.',
  ],
  unclear:     [
    'Wenn alles durcheinander scheint, hilft es, langsamer zu werden.',
    'Richtung braucht keine absolute Sicherheit. Ein klarer Schritt reicht.',
    'Fokus bedeutet nicht, alles gleichzeitig zu tun. Es bedeutet, jetzt eine Sache zu wählen.',
    'Zur Mitte zurückzukehren ist keine Schwäche. Es ist zu wissen, wo man beginnt.',
  ],
  drained:     [
    'Dein Körper ist auch ein Teil davon, wie du den Tag durchquerst.',
    'Erholen ist nicht von vorne anfangen. Es ist zulassen, dass das, was dich erschöpft hat, ruhen kann.',
    'Sanft mit dir selbst zu sein ist keine Schwäche. Es ist emotionale Intelligenz.',
    'Leichtigkeit muss nicht verdient werden. Sie ist das, was übrig bleibt, wenn du aufhörst zu zwingen.',
  ],
  tired:       [
    'Eine bewusste Pause ist keine Aufgabe. Sie ist Teil der Bewegung.',
    'Für dich zu sorgen ist kein Egoismus. Es ist das, was Weitermachen möglich macht.',
    'Stille Erholung ist auch Fortschritt. Was sich ausruht, sammelt sich.',
    'Ruhe ist manchmal schon da und wartet, dass du aufhörst, sie zu suchen.',
  ],
  overwhelmed: [
    'Du musst nicht alles jetzt lösen, um weiterzukommen.',
    'Raum ist nicht die Abwesenheit von Handlung. Er ist das, was Handlung mit mehr Klarheit möglich macht.',
    'Loslassen bedeutet nicht aufgeben. Es bedeutet, nicht zu tragen, was jetzt nicht deins ist.',
    'Weniger mit Präsenz zu tun ist mehr wert als viel zu tun, ohne hier zu sein.',
  ],
  balanced: [
    'An einem stabilen Tag präsent zu sein ist auch eine Form der Aufmerksamkeit.',
    'Rhythmus ist keine Geschwindigkeit. Es ist die Fähigkeit, ohne sich zu verlieren fortzumachen.',
    'Leichtigkeit muss nicht verdient werden. Manchmal ist sie schon da.',
    'Was funktioniert, verdient es auch, bemerkt zu werden.',
  ],
};

export function getAdaptiveDepth(state: DailyState, lang: string, day: number): string | null {
  if (!state) return null;
  const map = lang === 'es' ? STATE_DEPTH_ES : lang === 'pt' ? STATE_DEPTH_PT : lang === 'fr' ? STATE_DEPTH_FR : lang === 'de' ? STATE_DEPTH_DE : STATE_DEPTH_EN;
  const pool = map[state];
  if (!pool?.length) return null;
  return pool[(day - 1) % pool.length];
}

// ─── State → preferred mindset category ──────────────────────────────────────

const STATE_CATEGORY: Record<string, string> = {
  racing:      'Calm',
  unclear:     'Clarity',
  drained:     'Rest',
  tired:       'Rest',
  overwhelmed: 'Calm',
  balanced:    'Calm',
};

export function getStateCategory(state: DailyState): string | null {
  if (!state) return null;
  return STATE_CATEGORY[state] ?? null;
}

// ─── Balanced state — headline & subtitle pools ────────────────────────────────
// Shown at the top of the today screen instead of streak-based copy.

const BALANCED_HEADLINES_PT = [
  'Nem tudo precisa mudar hoje.',
  'Você pode continuar daqui.',
  'Há espaço para simplesmente estar.',
  'Algumas coisas já encontraram ritmo.',
  'O que está funcionando também merece atenção.',
  'Você não precisa acelerar.',
  'Hoje pode ser apenas um dia tranquilo.',
  'Nem toda evolução faz barulho.',
  'Há valor em continuar.',
  'Você não precisa consertar nada agora.',
  'Certas mudanças aparecem quando paramos de forçar.',
  'O equilíbrio também precisa de cuidado.',
];

const BALANCED_HEADLINES_EN = [
  'Some things have found their place.',
  'You can keep going from here.',
  'There\'s room to simply be here.',
  'Some things have found their rhythm.',
  'What\'s working also deserves attention.',
  'You don\'t need to speed up.',
  'Today can just be a quiet day.',
  'Not every advance makes noise.',
  'There is value in staying steady.',
  'You don\'t have to fix anything right now.',
  'Certain things shift when we stop forcing them.',
  'Balance needs tending too.',
];

const BALANCED_HEADLINES_ES = [
  'No todo tiene que cambiar hoy.',
  'Puedes seguir desde aquí.',
  'Hay espacio para simplemente estar.',
  'Algunas cosas ya encontraron su ritmo.',
  'Lo que funciona también merece atención.',
  'No necesitas acelerar.',
  'Hoy puede ser un día tranquilo.',
  'No todo avance hace ruido.',
  'Hay valor en continuar.',
  'No necesitas arreglar nada ahora.',
  'Ciertos cambios aparecen cuando dejamos de forzar.',
  'El equilibrio también necesita cuidado.',
];

const BALANCED_HEADLINES_FR = [
  'Certaines choses ont trouvé leur place.',
  'Tu peux continuer à partir d\'ici.',
  'Il y a de l\'espace pour simplement être là.',
  'Certaines choses ont trouvé leur rythme.',
  'Ce qui fonctionne mérite aussi de l\'attention.',
  'Tu n\'as pas besoin d\'accélérer.',
  'Aujourd\'hui peut juste être un jour calme.',
  'Tout avancement ne fait pas de bruit.',
  'Il y a de la valeur à continuer.',
  'Tu n\'as rien à réparer maintenant.',
  'Certaines choses changent quand on arrête de forcer.',
  'L\'équilibre aussi a besoin d\'attention.',
];

const BALANCED_HEADLINES_DE = [
  'Manches hat seinen Platz gefunden.',
  'Du kannst von hier aus weitermachen.',
  'Es gibt Raum, einfach hier zu sein.',
  'Manches hat seinen Rhythmus gefunden.',
  'Was funktioniert, verdient auch Aufmerksamkeit.',
  'Du musst nicht schneller werden.',
  'Heute kann einfach ein ruhiger Tag sein.',
  'Nicht jeder Fortschritt macht Lärm.',
  'Im Weitermachen liegt ein Wert.',
  'Du musst gerade nichts reparieren.',
  'Manches verändert sich, wenn wir aufhören zu zwingen.',
  'Gleichgewicht braucht auch Pflege.',
];

const BALANCED_SUBTITLES_PT = [
  'O ritmo pode continuar sem pressa.',
  'Nem todo dia precisa ser reconstruído.',
  'Você não precisa melhorar nada agora.',
  'Hoje pode ser apenas um dia comum.',
  'Há beleza em continuar.',
  'Algumas coisas crescem em silêncio.',
  'O que está leve também merece espaço.',
  'Nem toda presença nasce da urgência.',
  'Continuar também é uma escolha.',
];

const BALANCED_SUBTITLES_EN = [
  'The rhythm can keep going without rushing.',
  'Not every day needs to be rebuilt.',
  'You don\'t have to improve anything today.',
  'Today can just be an ordinary day.',
  'There is something in simply continuing.',
  'Some things grow quietly.',
  'What feels light also deserves space.',
  'Not all presence comes from urgency.',
  'Continuing is also a choice.',
];

const BALANCED_SUBTITLES_ES = [
  'El ritmo puede seguir sin prisa.',
  'No todo día necesita reconstruirse.',
  'No necesitas mejorar nada ahora.',
  'Hoy puede ser solo un día común.',
  'Hay algo en simplemente continuar.',
  'Algunas cosas crecen en silencio.',
  'Lo que está liviano también merece espacio.',
  'No toda presencia nace de la urgencia.',
  'Seguir también es una elección.',
];

const BALANCED_SUBTITLES_FR = [
  'Le rythme peut continuer sans se précipiter.',
  'Tout jour n\'a pas besoin d\'être reconstruit.',
  'Tu n\'as rien à améliorer aujourd\'hui.',
  'Aujourd\'hui peut juste être un jour ordinaire.',
  'Il y a quelque chose à simplement continuer.',
  'Certaines choses grandissent en silence.',
  'Ce qui est léger mérite aussi de la place.',
  'Toute présence ne naît pas de l\'urgence.',
  'Continuer est aussi un choix.',
];

const BALANCED_SUBTITLES_DE = [
  'Der Rhythmus kann ohne Eile weitergehen.',
  'Nicht jeder Tag muss neu aufgebaut werden.',
  'Du musst heute nichts verbessern.',
  'Heute kann einfach ein gewöhnlicher Tag sein.',
  'Im Weitermachen liegt etwas.',
  'Manches wächst in der Stille.',
  'Was leicht ist, verdient auch Raum.',
  'Nicht alle Gegenwart entsteht aus Dringlichkeit.',
  'Weiterzumachen ist auch eine Entscheidung.',
];

export function getBalancedHeadline(day: number, lang: string): string {
  const pool = lang === 'es' ? BALANCED_HEADLINES_ES
    : lang === 'pt' ? BALANCED_HEADLINES_PT
    : lang === 'fr' ? BALANCED_HEADLINES_FR
    : lang === 'de' ? BALANCED_HEADLINES_DE
    : BALANCED_HEADLINES_EN;
  return pool[day % pool.length];
}

export function getBalancedSubtitle(day: number, lang: string): string {
  const pool = lang === 'es' ? BALANCED_SUBTITLES_ES
    : lang === 'pt' ? BALANCED_SUBTITLES_PT
    : lang === 'fr' ? BALANCED_SUBTITLES_FR
    : lang === 'de' ? BALANCED_SUBTITLES_DE
    : BALANCED_SUBTITLES_EN;
  return pool[day % pool.length];
}

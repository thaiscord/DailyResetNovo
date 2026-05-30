// ─── Daily Emotional State System (Prompt 9 — System 6) ──────────────────────
// User selects their current mental state each day.
// The app adapts its tone and banner to meet them exactly where they are.

import { isEs, isPt, isFr, isDe } from './langStore';

export type DailyState = 'racing' | 'tired' | 'overwhelmed' | 'unclear' | 'drained' | null;

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
];

// ─── Adapted banners per state ────────────────────────────────────────────────

const STATE_BANNERS_EN: Record<string, string> = {
  racing:      'Slow down. One thing at a time.',
  tired:       'Tired is allowed. One small return counts.',
  overwhelmed: 'You don\'t need to fix everything today.',
  unclear:     'Clarity comes through small steps, not big plans.',
  drained:     'Small is more than enough today.',
};

const STATE_BANNERS_PT: Record<string, string> = {
  racing:      'Desacelere. Uma coisa de cada vez.',
  tired:       'Cansada está tudo bem. Um pequeno retorno já conta.',
  overwhelmed: 'Você não precisa resolver tudo hoje.',
  unclear:     'A clareza vem de pequenos passos, não de grandes planos.',
  drained:     'Pequeno já é mais do que suficiente hoje.',
};

const STATE_BANNERS_ES: Record<string, string> = {
  racing:      'Despacio. Una cosa a la vez.',
  tired:       'El cansancio también es parte del camino. Un pequeño regreso cuenta.',
  overwhelmed: 'No necesitas resolverlo todo hoy.',
  unclear:     'La claridad llega con pasos pequeños, no con grandes planes.',
  drained:     'Pequeño es más que suficiente hoy.',
};

const STATE_BANNERS_FR: Record<string, string> = {
  racing:      'Doucement. Une chose à la fois.',
  tired:       'Avec de la fatigue — un petit retour compte encore.',
  overwhelmed: 'Tu n\'as pas besoin de tout résoudre aujourd\'hui.',
  unclear:     'La clarté vient de petits pas, pas de grands plans.',
  drained:     'Petit est déjà plus que suffisant aujourd\'hui.',
};

const STATE_BANNERS_DE: Record<string, string> = {
  racing:      'Langsamer. Eine Sache nach der anderen.',
  tired:       'Müde ist erlaubt. Auch ein kleiner Schritt zählt.',
  overwhelmed: 'Du musst heute nicht alles lösen.',
  unclear:     'Klarheit kommt durch kleine Schritte, nicht durch große Pläne.',
  drained:     'Klein ist heute mehr als genug.',
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
};

const STATE_WORDS_EN: Record<string, string[]> = {
  racing:      ['Breathe', 'Stillness', 'Presence', 'Pause'],
  unclear:     ['Clarity', 'Direction', 'Focus', 'Center'],
  drained:     ['Rest', 'Recovery', 'Gentleness', 'Ease'],
  tired:       ['Pause', 'Care', 'Recovery', 'Calm'],
  overwhelmed: ['Lightness', 'Space', 'Release', 'Less'],
};

const STATE_WORDS_ES: Record<string, string[]> = {
  racing:      ['Respirar', 'Silencio', 'Presencia', 'Pausa'],
  unclear:     ['Claridad', 'Dirección', 'Foco', 'Centro'],
  drained:     ['Descanso', 'Recuperación', 'Gentileza', 'Ligereza'],
  tired:       ['Pausa', 'Cuidado', 'Recuperación', 'Calma'],
  overwhelmed: ['Ligereza', 'Espacio', 'Soltar', 'Menos'],
};

const STATE_WORDS_FR: Record<string, string[]> = {
  racing:      ['Respirer', 'Silence', 'Présence', 'Pause'],
  unclear:     ['Clarté', 'Direction', 'Ancrage', 'Centre'],
  drained:     ['Repos', 'Récupération', 'Douceur', 'Légèreté'],
  tired:       ['Pause', 'Soin', 'Récupération', 'Calme'],
  overwhelmed: ['Légèreté', 'Espace', 'Relâcher', 'Moins'],
};

const STATE_WORDS_DE: Record<string, string[]> = {
  racing:      ['Atmen', 'Stille', 'Gegenwart', 'Pause'],
  unclear:     ['Klarheit', 'Richtung', 'Fokus', 'Mitte'],
  drained:     ['Erholung', 'Ruhe', 'Sanftheit', 'Leichtigkeit'],
  tired:       ['Pause', 'Fürsorge', 'Erholung', 'Gelassenheit'],
  overwhelmed: ['Leichtigkeit', 'Raum', 'Loslassen', 'Weniger'],
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
};

const STATE_PHRASES_EN: Record<string, string[]> = {
  racing:      ["Your rhythm doesn't need to rush.", "You don't need to solve everything now.", 'Less noise is also progress.'],
  unclear:     ['One thing at a time.', 'Clarity can start small too.', 'Not everything needs to be decided now.'],
  drained:     ['Resting is also continuing.', "You don't need to push today.", 'Your body is part of the reset too.'],
  tired:       ['Small counts too.', "You don't need much today.", 'One step is enough.'],
  overwhelmed: ["Not everything needs to fit today.", 'You can slow down.', 'A little space already helps.'],
};

const STATE_PHRASES_ES: Record<string, string[]> = {
  racing:      ['Tu ritmo no necesita correr.', 'No tienes que resolver todo ahora.', 'Menos ruido también es progreso.'],
  unclear:     ['Una cosa a la vez.', 'La claridad también puede empezar pequeña.', 'No todo necesita decidirse ahora.'],
  drained:     ['Descansar también es continuar.', 'No necesitas forzar hoy.', 'Tu cuerpo también participa del reset.'],
  tired:       ['Lo pequeño también cuenta.', 'No necesitas mucho hoy.', 'Un paso es suficiente.'],
  overwhelmed: ['No todo necesita caber hoy.', 'Puedes desacelerar.', 'Un poco de espacio ya ayuda.'],
};

const STATE_PHRASES_FR: Record<string, string[]> = {
  racing:      ['Ton rythme n\'a pas besoin de courir.', 'Tu n\'as pas besoin de tout résoudre maintenant.', 'Moins de bruit, c\'est aussi du progrès.'],
  unclear:     ['Une chose à la fois.', 'La clarté peut aussi commencer petit.', 'Tout n\'a pas besoin d\'être décidé maintenant.'],
  drained:     ['Se reposer c\'est aussi continuer.', 'Tu n\'as pas besoin de forcer aujourd\'hui.', 'Ton corps participe aussi au reset.'],
  tired:       ['Petit compte aussi.', 'Tu n\'as pas besoin de grand-chose aujourd\'hui.', 'Un pas suffit déjà.'],
  overwhelmed: ['Tout n\'a pas besoin de tenir aujourd\'hui.', 'Tu peux ralentir.', 'Un peu d\'espace aide déjà.'],
};

const STATE_PHRASES_DE: Record<string, string[]> = {
  racing:      ['Dein Rhythmus muss nicht hetzen.', 'Du musst nicht alles jetzt lösen.', 'Weniger Lärm ist auch Fortschritt.'],
  unclear:     ['Eine Sache nach der anderen.', 'Klarheit kann auch klein beginnen.', 'Nicht alles muss jetzt entschieden werden.'],
  drained:     ['Sich ausruhen ist auch weitermachen.', 'Du musst dich heute nicht zwingen.', 'Dein Körper ist auch Teil des Resets.'],
  tired:       ['Klein zählt auch.', 'Du brauchst heute nicht viel.', 'Ein Schritt ist genug.'],
  overwhelmed: ['Nicht alles muss heute passen.', 'Du kannst langsamer werden.', 'Ein bisschen Raum hilft schon.'],
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
};

export function getStateCategory(state: DailyState): string | null {
  if (!state) return null;
  return STATE_CATEGORY[state] ?? null;
}

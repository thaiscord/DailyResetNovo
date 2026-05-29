// ─── Notification Content — Daily Reset ──────────────────────────────────────
// Philosophy: every message is a quiet invitation, never a demand.
// The user should feel: gently held, not tracked or pressured.
// Tone: calm · human · emotionally soft · minimal · premium.
// No exclamation marks. No urgency. No hustle. No guilt.

import { isPt, isEs } from './langStore';

export type NotificationPeriod = 'morning' | 'afternoon' | 'evening';

export interface NotifMessage {
  title: string;
  body: string;
}

export interface NotifContext {
  period: NotificationPeriod;
  streak: number;
  daysMissed: number;
  weeklyScore: number;
  totalDays: number;
  goals: string[];
  seed: number;
  profile?: string | null;
}

// ─── Morning pool ─────────────────────────────────────────────────────────────

const MORNING: NotifMessage[] = [
  { title: 'Before the day takes over —',            body: 'one quiet reset.' },
  { title: 'A quieter start still counts.',          body: 'One gentle moment for yourself.' },
  { title: 'Your mind deserves softness too.',       body: 'One reset, however small.' },
  { title: 'Start slower today.',                    body: 'No rush. Your reset is here.' },
  { title: 'One breath before everything else.',     body: 'Then the day can begin.' },
  { title: 'A soft beginning is still a beginning.', body: 'This morning is yours.' },
  { title: 'You do not need to rush today.',         body: 'One gentle moment is enough.' },
  { title: 'This morning belongs to you.',           body: 'Even for just a moment.' },
  { title: 'One quiet moment for yourself.',         body: 'Before the noise begins.' },
  { title: 'No hurry.',                              body: 'Your reset is here whenever you are.' },
];

const MORNING_ES: NotifMessage[] = [
  { title: 'Un momento solo tuyo.',                  body: 'El día puede empezar con calma.' },
  { title: 'Sin prisa.',                             body: 'Tu reset está aquí cuando quieras.' },
  { title: 'Antes de todo lo demás —',               body: 'un momento para ti.' },
  { title: 'Hoy puede ser más ligero.',              body: 'Un reset tranquilo ayuda.' },
  { title: 'Un respiro antes del día.',              body: 'Solo eso.' },
  { title: 'Empieza despacio.',                      body: 'No tienes que correr.' },
  { title: 'Este momento es tuyo.',                  body: 'Aunque sea pequeño.' },
  { title: 'La mañana todavía es tuya.',             body: 'Por unos instantes.' },
  { title: 'Un momento tranquilo antes del ruido.',  body: 'Está aquí.' },
  { title: 'Sin obligación.',                        body: 'Solo un reset, cuando quieras.' },
];

const MORNING_PT: NotifMessage[] = [
  { title: 'Um momento só seu.',                     body: 'Seu reset pode esperar por você.' },
  { title: 'Sem pressa.',                            body: 'O dia pode começar com calma.' },
  { title: 'Antes de tudo mais —',                   body: 'um momento para você.' },
  { title: 'Hoje pode ser mais leve.',               body: 'Um reset quieto ajuda.' },
  { title: 'Um respiro antes do dia.',               body: 'Só isso.' },
  { title: 'Comece devagar.',                        body: 'Você não precisa correr.' },
  { title: 'Este momento é seu.',                    body: 'Mesmo que seja pequeno.' },
  { title: 'A manhã ainda é sua.',                   body: 'Por alguns instantes.' },
  { title: 'Um momento quieto antes do ruído.',      body: 'Está aqui.' },
  { title: 'Sem obrigação.',                         body: 'Só um reset, quando quiser.' },
];

// ─── Afternoon pool ───────────────────────────────────────────────────────────

const AFTERNOON: NotifMessage[] = [
  { title: 'How are you carrying today?',            body: 'One moment to find out.' },
  { title: 'A small pause can change a day.',        body: 'Come back to yourself for a moment.' },
  { title: 'You have been holding a lot quietly.',   body: 'One breath here.' },
  { title: 'One breath. One reset.',                 body: 'That is the whole thing.' },
  { title: 'A quiet moment between the hours.',      body: 'Still time for yourself today.' },
  { title: 'How are you doing right now?',           body: 'Your reset is still here.' },
  { title: 'The afternoon is still yours.',          body: 'One quiet moment whenever you are ready.' },
  { title: 'You do not have to do everything.',      body: 'One reset is enough.' },
];

const AFTERNOON_ES: NotifMessage[] = [
  { title: '¿Cómo estás llevando el día?',           body: 'Un momento para descubrirlo.' },
  { title: 'Una pausa cambia el peso del día.',      body: 'Vuelve por dos minutos.' },
  { title: 'Has cargado bastante.',                  body: 'Un respiro aquí.' },
  { title: 'Un respiro. Un reset.',                  body: 'Solo eso.' },
  { title: 'Un momento tranquilo entre las horas.',  body: 'Todavía hay tiempo.' },
  { title: '¿Cómo estás ahora?',                    body: 'Tu reset sigue aquí.' },
  { title: 'La tarde todavía es tuya.',              body: 'Un momento tranquilo cuando quieras.' },
  { title: 'No tienes que hacerlo todo.',            body: 'Un reset ya es suficiente.' },
];

const AFTERNOON_PT: NotifMessage[] = [
  { title: 'Como você está carregando o dia?',       body: 'Um momento para descobrir.' },
  { title: 'Uma pausa muda o peso do dia.',          body: 'Volte por dois minutos.' },
  { title: 'Você tem segurado bastante.',            body: 'Um respiro aqui.' },
  { title: 'Um respiro. Um reset.',                  body: 'Só isso.' },
  { title: 'Um momento quieto entre as horas.',      body: 'Ainda dá tempo.' },
  { title: 'Como você está agora?',                  body: 'Seu reset ainda está aqui.' },
  { title: 'A tarde ainda é sua.',                   body: 'Um momento quieto quando quiser.' },
  { title: 'Você não precisa fazer tudo.',           body: 'Um reset já é suficiente.' },
];

// ─── Evening pool ─────────────────────────────────────────────────────────────

const EVENING: NotifMessage[] = [
  { title: 'What stayed heavy today?',               body: 'Not everything needs to be solved tonight.' },
  { title: 'Some thoughts deserve to be released.',  body: 'A quiet ending still matters.' },
  { title: 'You made it through today.',             body: 'That is worth a moment.' },
  { title: 'Before you rest —',                      body: 'one honest breath.' },
  { title: 'How did you carry today?',               body: 'A quiet moment to let it go.' },
  { title: 'The day is done.',                       body: 'You can let it go now.' },
  { title: 'Not everything needs to follow you.',    body: 'A quiet reset before sleep.' },
  { title: 'A quiet ending still matters.',          body: 'One moment to close the day.' },
];

const EVENING_ES: NotifMessage[] = [
  { title: '¿Qué quedó pesado hoy?',                body: 'No todo tiene que resolverse esta noche.' },
  { title: 'Algunos pensamientos merecen soltarse.', body: 'Un cierre tranquilo también importa.' },
  { title: 'Atravesaste el día.',                    body: 'Eso vale un momento.' },
  { title: 'Antes de descansar —',                   body: 'un respiro honesto.' },
  { title: '¿Cómo cargaste el día?',                body: 'Un momento tranquilo para soltarlo.' },
  { title: 'El día terminó.',                        body: 'Puedes soltarlo ahora.' },
  { title: 'No todo tiene que seguirte.',            body: 'Un reset tranquilo antes de dormir.' },
  { title: 'Un cierre tranquilo también importa.',   body: 'Un momento para cerrar el día.' },
];

const EVENING_PT: NotifMessage[] = [
  { title: 'O que ficou pesado hoje?',               body: 'Nem tudo precisa ser resolvido esta noite.' },
  { title: 'Alguns pensamentos merecem ser soltos.',  body: 'Um encerramento quieto ainda importa.' },
  { title: 'Você atravessou o dia.',                 body: 'Isso vale um momento.' },
  { title: 'Antes de descansar —',                   body: 'um respiro honesto.' },
  { title: 'Como você carregou o dia?',              body: 'Um momento quieto para soltar.' },
  { title: 'O dia acabou.',                          body: 'Você pode soltá-lo agora.' },
  { title: 'Nem tudo precisa te acompanhar.',        body: 'Um reset quieto antes de dormir.' },
  { title: 'Um encerramento quieto ainda importa.',  body: 'Um momento para fechar o dia.' },
];

// ─── High momentum pool ───────────────────────────────────────────────────────

const HIGH_MOMENTUM: NotifMessage[] = [
  { title: 'You keep returning.',                    body: 'That says something.' },
  { title: 'Showing up quietly is still showing up.', body: 'One more today.' },
  { title: 'Something is settling in you.',          body: 'One more gentle return.' },
  { title: 'You know how to find your way back.',    body: 'Today is no different.' },
  { title: 'A quiet return is still a return.',      body: 'Your reset is here.' },
  { title: 'Each day adds something real.',          body: 'Even the quiet ones.' },
];

const HIGH_MOMENTUM_ES: NotifMessage[] = [
  { title: 'Sigues volviendo.',                      body: 'Eso dice algo.' },
  { title: 'Aparecer en silencio sigue siendo aparecer.', body: 'Uno más hoy.' },
  { title: 'Algo se está asentando en ti.',          body: 'Un regreso más suave.' },
  { title: 'Sabes cómo volver.',                     body: 'Hoy no es diferente.' },
  { title: 'Un regreso tranquilo sigue siendo un regreso.', body: 'Tu reset está aquí.' },
  { title: 'Cada día añade algo real.',              body: 'Incluso los más silenciosos.' },
];

const HIGH_MOMENTUM_PT: NotifMessage[] = [
  { title: 'Você continua voltando.',                body: 'Isso diz algo.' },
  { title: 'Aparecer quieto ainda é aparecer.',      body: 'Mais um hoje.' },
  { title: 'Algo está se assentando em você.',       body: 'Mais um retorno gentil.' },
  { title: 'Você sabe como voltar.',                 body: 'Hoje não é diferente.' },
  { title: 'Um retorno quieto ainda é um retorno.',  body: 'Seu reset está aqui.' },
  { title: 'Cada dia acrescenta algo real.',         body: 'Até os mais silenciosos.' },
];

// ─── Milestone proximity pool ─────────────────────────────────────────────────

const MILESTONE_PROXIMITY: NotifMessage[] = [
  { title: 'Something is quietly changing.',         body: 'Your reset is part of that.' },
  { title: 'Each return adds something.',            body: 'Even this one.' },
  { title: 'You are closer than it feels.',          body: 'One more quiet moment.' },
  { title: 'The change is already happening.',       body: 'Softly.' },
  { title: 'Something has shifted.',                 body: 'You may not notice yet. But it has.' },
];

const MILESTONE_PROXIMITY_ES: NotifMessage[] = [
  { title: 'Algo está cambiando en silencio.',       body: 'Tu reset forma parte de eso.' },
  { title: 'Cada regreso añade algo.',               body: 'Incluso este.' },
  { title: 'Tu espacio sigue aquí.',                 body: 'Un momento más tranquilo.' },
  { title: 'El cambio ya está ocurriendo.',          body: 'Suavemente.' },
  { title: 'Algo ha cambiado.',                      body: 'Quizás todavía no lo notas. Pero ocurrió.' },
];

const MILESTONE_PROXIMITY_PT: NotifMessage[] = [
  { title: 'Algo está mudando quietamente.',         body: 'Seu reset faz parte disso.' },
  { title: 'Cada retorno acrescenta algo.',          body: 'Até este.' },
  { title: 'Seu espaço continua aqui.',              body: 'Mais um momento quieto.' },
  { title: 'A mudança já está acontecendo.',         body: 'Com calma.' },
  { title: 'Algo mudou.',                            body: 'Você pode ainda não notar. Mas mudou.' },
];

// ─── Comeback pool ────────────────────────────────────────────────────────────

const COMEBACK: NotifMessage[] = [
  { title: 'You can return gently.',                 body: 'No pressure. Just begin again.' },
  { title: 'It still counts if you start quietly.',  body: 'One reset is enough for today.' },
  { title: 'You are allowed to come back slowly.',   body: 'The app is still here.' },
  { title: 'No streak needed.',                      body: 'Just one quiet moment.' },
  { title: 'Returning counts, however it looks.',    body: 'We are here.' },
  { title: 'Nothing is ruined.',                     body: 'Your reset is still yours.' },
  { title: 'The door is still open.',                body: 'No explanation needed.' },
  { title: 'Come back at your own pace.',            body: 'This space has not changed.' },
];

const COMEBACK_ES: NotifMessage[] = [
  { title: 'Puedes volver con calma.',               body: 'Sin presión. Solo empieza de nuevo.' },
  { title: 'Todavía cuenta si empiezas despacio.',   body: 'Un reset es suficiente para hoy.' },
  { title: 'Puedes volver a tu ritmo.',              body: 'La app sigue aquí.' },
  { title: 'No hace falta una racha.',               body: 'Solo un momento tranquilo.' },
  { title: 'Volver cuenta, como sea que ocurra.',    body: 'Estamos aquí.' },
  { title: 'Nada se ha perdido.',                    body: 'Tu reset sigue siendo tuyo.' },
  { title: 'La puerta sigue abierta.',               body: 'Sin necesidad de explicar nada.' },
  { title: 'Vuelve a tu propio ritmo.',              body: 'Este espacio no ha cambiado.' },
];

const COMEBACK_PT: NotifMessage[] = [
  { title: 'Você pode voltar com calma.',            body: 'Sem pressão. É só começar de novo.' },
  { title: 'Ainda conta se você começar devagar.',   body: 'Um reset é suficiente para hoje.' },
  { title: 'Você pode voltar no seu tempo.',         body: 'O app ainda está aqui.' },
  { title: 'Não precisa de sequência.',              body: 'Só um momento quieto.' },
  { title: 'Voltar conta, do jeito que for.',        body: 'Estamos aqui.' },
  { title: 'Nada foi perdido.',                      body: 'Seu reset ainda é seu.' },
  { title: 'A porta ainda está aberta.',             body: 'Sem precisar explicar nada.' },
  { title: 'Volte no seu ritmo.',                    body: 'Este espaço não mudou.' },
  { title: 'Seu espaço continua aqui.',              body: 'Ainda existe espaço para recomeçar.' },
  { title: 'O dia terminou.',                        body: 'A pressão não precisa continuar.' },
  { title: 'Você voltou antes.',                     body: 'Isso já muda o ritmo.' },
];

// ─── Extended comeback pool ───────────────────────────────────────────────────

const COMEBACK_EXTENDED: NotifMessage[] = [
  { title: 'Still here.',                            body: 'No rush.' },
  { title: 'Return when you are ready.',             body: 'Nothing is gone.' },
  { title: 'However long it has been —',             body: 'the door is open.' },
  { title: 'Nothing is ruined.',                     body: 'Everything is still here.' },
  { title: 'One quiet return is all it takes.',      body: 'Whenever you are ready.' },
];

const COMEBACK_EXTENDED_ES: NotifMessage[] = [
  { title: 'Todavía aquí.',                          body: 'Sin prisa.' },
  { title: 'Vuelve cuando quieras.',                 body: 'Nada se ha ido.' },
  { title: 'Cuánto tiempo haya pasado —',            body: 'la puerta está abierta.' },
  { title: 'Nada se ha perdido.',                    body: 'Todo sigue aquí.' },
  { title: 'Un regreso tranquilo es todo lo que hace falta.', body: 'Cuando puedas.' },
];

const COMEBACK_EXTENDED_PT: NotifMessage[] = [
  { title: 'Ainda aqui.',                            body: 'Sem pressa.' },
  { title: 'Volte quando quiser.',                   body: 'Nada foi embora.' },
  { title: 'Não importa quanto tempo passou —',      body: 'a porta está aberta.' },
  { title: 'Nada foi perdido.',                      body: 'Tudo ainda está aqui.' },
  { title: 'Um retorno quieto é tudo que precisa.',  body: 'Quando você quiser.' },
];

// ─── Future self pool ─────────────────────────────────────────────────────────

const FUTURE_SELF: NotifMessage[] = [
  { title: 'Quiet consistency leaves a mark.',       body: 'Even the gentle days.' },
  { title: 'Small returns become something.',        body: 'This one counts.' },
  { title: 'You are already the person who returns.', body: 'Today is proof.' },
  { title: 'Each day is a small beginning.',         body: 'This one included.' },
  { title: 'You are softer with yourself lately.',   body: 'That matters.' },
  { title: 'This app exists for moments like this.', body: 'Come in.' },
];

const FUTURE_SELF_ES: NotifMessage[] = [
  { title: 'La constancia tranquila deja huella.',   body: 'Incluso en los días más suaves.' },
  { title: 'Los pequeños regresos se convierten en algo.', body: 'Este cuenta.' },
  { title: 'Ya eres la persona que vuelve.',         body: 'Hoy es la prueba.' },
  { title: 'Cada día es un pequeño comienzo.',       body: 'Este también.' },
  { title: 'Últimamente eres más suave contigo.',    body: 'Eso importa.' },
  { title: 'Esta app existe para momentos como este.', body: 'Entra.' },
];

const FUTURE_SELF_PT: NotifMessage[] = [
  { title: 'Consistência quieta deixa uma marca.',   body: 'Até nos dias gentis.' },
  { title: 'Pequenos retornos viram algo.',          body: 'Este conta.' },
  { title: 'Você já é a pessoa que volta.',          body: 'Hoje é a prova.' },
  { title: 'Cada dia é um começo pequeno.',          body: 'Este também.' },
  { title: 'Você tem sido mais gentil consigo.',     body: 'Isso importa.' },
  { title: 'Este app existe para momentos como este.', body: 'Entre.' },
];

// ─── Weekly recap pool ────────────────────────────────────────────────────────

const WEEKLY_RECAP: NotifMessage[] = [
  { title: 'Your week, quietly reflected.',          body: 'Take a moment to see it.' },
  { title: 'This week had something in it.',         body: 'Your recap is ready.' },
  { title: 'A soft look at your week.',              body: 'It is waiting when you are ready.' },
  { title: 'One quiet look back.',                   body: 'Your weekly reflection is here.' },
];

const WEEKLY_RECAP_ES: NotifMessage[] = [
  { title: 'Tu semana, tranquilamente reflejada.',   body: 'Un momento para verla.' },
  { title: 'Esta semana tuvo algo en ella.',         body: 'Tu resumen está listo.' },
  { title: 'Una mirada suave a tu semana.',          body: 'Está esperando cuando quieras.' },
  { title: 'Una mirada tranquila hacia atrás.',      body: 'Tu reflexión semanal está aquí.' },
];

const WEEKLY_RECAP_PT: NotifMessage[] = [
  { title: 'Sua semana, quietamente refletida.',     body: 'Um momento para ver.' },
  { title: 'Esta semana teve algo nela.',            body: 'Seu recap está pronto.' },
  { title: 'Um olhar suave para sua semana.',        body: 'Está esperando quando você quiser.' },
  { title: 'Um olhar quieto para trás.',             body: 'Seu resumo semanal está aqui.' },
];

// ─── Goal-personalized pool ───────────────────────────────────────────────────

const GOAL_SPECIFIC: Record<string, NotifMessage[]> = {
  focus: [
    { title: 'Your mind needs space to think.',      body: 'One quiet reset helps.' },
    { title: 'One moment of quiet before the noise.', body: 'That is the whole reset.' },
    { title: 'Mental clarity begins here.',           body: 'Gently.' },
  ],
  discipline: [
    { title: 'Gentle consistency is still consistency.', body: 'One quiet moment today.' },
    { title: 'You do not need motivation.',           body: 'Just a moment.' },
    { title: 'Showing up softly still counts.',       body: 'That is all.' },
  ],
  routine: [
    { title: 'Small rhythms build quiet lives.',     body: 'One moment at a time.' },
    { title: 'One moment grounds the whole day.',    body: 'Your reset is here.' },
    { title: 'Your day is still yours to shape.',    body: 'Gently.' },
  ],
  distraction: [
    { title: 'Your attention deserves protection.',  body: 'One quiet moment today.' },
    { title: 'Less noise. One reset.',                body: 'That is enough.' },
    { title: 'One moment before the noise.',          body: 'It still matters.' },
  ],
  control: [
    { title: 'Today is still yours.',                body: 'Begin from here.' },
    { title: 'One small choice grounds the day.',    body: 'This is that choice.' },
    { title: 'You can begin from exactly here.',     body: 'No preparation needed.' },
  ],
  procrastination: [
    { title: 'Beginning gently is still beginning.', body: 'Just open the app.' },
    { title: 'You do not need to feel ready.',        body: 'Just begin.' },
    { title: 'One moment is enough to start.',        body: 'Here it is.' },
  ],
};

const GOAL_SPECIFIC_ES: Record<string, NotifMessage[]> = {
  focus: [
    { title: 'Un momento tranquilo protege tu enfoque.', body: 'Tu reset está aquí.' },
    { title: 'Tu mente necesita espacio.',           body: 'Un reset ayuda.' },
    { title: 'La claridad mental empieza despacio.', body: 'Un momento.' },
  ],
  discipline: [
    { title: 'La constancia suave sigue siendo constancia.', body: 'Un momento tranquilo hoy.' },
    { title: 'No necesitas motivación.',             body: 'Solo un momento.' },
    { title: 'Aparecer despacio sigue contando.',    body: 'Solo eso.' },
  ],
  routine: [
    { title: 'Los pequeños ritmos construyen vidas tranquilas.', body: 'Un momento a la vez.' },
    { title: 'Un momento ancla el día entero.',      body: 'Tu reset está aquí.' },
    { title: 'Tu día todavía es tuyo para dar forma.', body: 'Despacio.' },
  ],
  distraction: [
    { title: 'Tu atención merece protección.',       body: 'Un momento tranquilo hoy.' },
    { title: 'Menos ruido. Un reset.',               body: 'Eso es suficiente.' },
    { title: 'Un momento antes del ruido.',          body: 'Todavía importa.' },
  ],
  control: [
    { title: 'Hoy todavía es tuyo.',                body: 'Empieza desde aquí.' },
    { title: 'Una pequeña elección ancla el día.',   body: 'Esta es esa elección.' },
    { title: 'Puedes empezar exactamente desde aquí.', body: 'Sin preparación necesaria.' },
  ],
  procrastination: [
    { title: 'Empezar despacio sigue siendo empezar.', body: 'Solo abre la app.' },
    { title: 'No necesitas esperar para empezar.',   body: 'Solo empieza.' },
    { title: 'Un momento es suficiente para empezar.', body: 'Aquí está.' },
  ],
};

const GOAL_SPECIFIC_PT: Record<string, NotifMessage[]> = {
  focus: [
    { title: 'Sua mente precisa de espaço para pensar.', body: 'Um reset quieto ajuda.' },
    { title: 'Um momento de silêncio antes do ruído.',   body: 'É o reset.' },
    { title: 'Clareza mental começa aqui.',               body: 'Devagar.' },
  ],
  discipline: [
    { title: 'Consistência gentil ainda é consistência.', body: 'Um momento quieto hoje.' },
    { title: 'Você não precisa de motivação.',            body: 'Só um momento.' },
    { title: 'Aparecer devagar ainda conta.',             body: 'Só isso.' },
  ],
  routine: [
    { title: 'Ritmos pequenos constroem vidas quietas.',  body: 'Um momento de cada vez.' },
    { title: 'Um momento ancora o dia todo.',             body: 'Seu reset está aqui.' },
    { title: 'Seu dia ainda é seu para moldar.',          body: 'Devagar.' },
  ],
  distraction: [
    { title: 'Sua atenção merece proteção.',              body: 'Um momento quieto hoje.' },
    { title: 'Menos ruído. Um reset.',                    body: 'Isso é suficiente.' },
    { title: 'Um momento antes do ruído.',                body: 'Ainda importa.' },
  ],
  control: [
    { title: 'Hoje ainda é seu.',                         body: 'Comece daqui.' },
    { title: 'Uma pequena escolha ancora o dia.',         body: 'Esta é essa escolha.' },
    { title: 'Você pode começar exatamente daqui.',       body: 'Sem preparação necessária.' },
  ],
  procrastination: [
    { title: 'Começar devagar ainda é começar.',          body: 'Só abra o app.' },
    { title: 'Você não precisa se sentir pronto.',        body: 'Só comece.' },
    { title: 'Um momento é suficiente para começar.',     body: 'Aqui está.' },
  ],
};

// ─── Milestone notifications ──────────────────────────────────────────────────

export const MILESTONE_NOTIFICATIONS: Record<number, NotifMessage> = {
  1:   { title: 'Day one.',           body: 'You began. That is something.' },
  3:   { title: 'Three days.',        body: 'Something is softening.' },
  7:   { title: 'One week.',          body: 'You stayed with yourself.' },
  14:  { title: 'Two weeks.',         body: 'The return is becoming real.' },
  21:  { title: 'Three weeks.',       body: 'Something is shifting quietly.' },
  30:  { title: 'One month.',         body: 'You kept showing up.' },
  60:  { title: 'Two months.',        body: 'What was effort is becoming natural.' },
  90:  { title: 'Ninety days.',       body: 'You are no longer beginning.' },
  100: { title: 'One hundred days.',  body: 'Of returning to yourself.' },
  180: { title: 'Half a year.',       body: 'Something has changed, quietly.' },
  365: { title: 'One full year.',     body: 'A different version of you exists now.' },
};

const MILESTONE_NOTIFICATIONS_ES: Record<number, NotifMessage> = {
  1:   { title: 'Primer día.',         body: 'Empezaste. Eso es algo.' },
  3:   { title: 'Tres días.',          body: 'Algo se está suavizando.' },
  7:   { title: 'Una semana.',         body: 'Te quedaste contigo.' },
  14:  { title: 'Dos semanas.',        body: 'El regreso se está volviendo real.' },
  21:  { title: 'Tres semanas.',       body: 'Algo está cambiando en silencio.' },
  30:  { title: 'Un mes.',             body: 'Seguiste apareciendo.' },
  60:  { title: 'Dos meses.',          body: 'Lo que era esfuerzo se está volviendo natural.' },
  90:  { title: 'Noventa días.',       body: 'Ya no estás empezando.' },
  100: { title: 'Cien días.',          body: 'De volver a ti.' },
  180: { title: 'Medio año.',          body: 'Algo ha cambiado, en silencio.' },
  365: { title: 'Un año completo.',    body: 'Ahora existe una versión diferente de ti.' },
};

const MILESTONE_NOTIFICATIONS_PT: Record<number, NotifMessage> = {
  1:   { title: 'Primeiro dia.',      body: 'Você começou. Isso é algo.' },
  3:   { title: 'Três dias.',         body: 'Algo está suavizando.' },
  7:   { title: 'Uma semana.',        body: 'Você ficou consigo.' },
  14:  { title: 'Duas semanas.',      body: 'O retorno está se tornando real.' },
  21:  { title: 'Três semanas.',      body: 'Algo está mudando quietamente.' },
  30:  { title: 'Um mês.',            body: 'Você continuou aparecendo.' },
  60:  { title: 'Dois meses.',        body: 'O que era esforço está se tornando natural.' },
  90:  { title: 'Noventa dias.',      body: 'Você não está mais começando.' },
  100: { title: 'Cem dias.',          body: 'De voltar para você.' },
  180: { title: 'Meio ano.',          body: 'Algo mudou, quietamente.' },
  365: { title: 'Um ano completo.',   body: 'Uma versão diferente de você existe agora.' },
};

// ─── Selector helpers ─────────────────────────────────────────────────────────

const MILESTONE_THRESHOLDS = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];

function pick<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

function lang<T>(en: T, es: T, pt: T): T {
  return isEs() ? es : isPt() ? pt : en;
}

// ─── Main contextual selector ─────────────────────────────────────────────────

export function selectContextualNotification(ctx: NotifContext): NotifMessage {
  const { period, streak, daysMissed, goals, seed, profile } = ctx;

  if (daysMissed >= 7) return pick(lang(COMEBACK_EXTENDED, COMEBACK_EXTENDED_ES, COMEBACK_EXTENDED_PT), seed);
  if (daysMissed >= 2) return pick(lang(COMEBACK, COMEBACK_ES, COMEBACK_PT), seed);

  const nextMilestone = MILESTONE_THRESHOLDS.find(m => m > streak);
  if (nextMilestone && nextMilestone - streak <= 3) {
    return pick(lang(MILESTONE_PROXIMITY, MILESTONE_PROXIMITY_ES, MILESTONE_PROXIMITY_PT), seed);
  }

  if (profile) {
    const profilePools: Record<string, NotifMessage[]> = lang(
      {
        focus: [
          { title: 'One quiet moment protects your focus.',         body: 'Your reset is here.' },
          { title: 'Your mind needs space.',                        body: 'One reset helps.' },
          { title: 'Mental clarity begins gently.',                 body: 'One moment.' },
          { title: 'Before the noise takes over —',                 body: 'one reset.' },
        ],
        calm: [
          { title: 'You do not need to rush today.',                body: 'One gentle reset.' },
          { title: 'One quiet moment is enough.',                   body: 'No pressure.' },
          { title: 'Your reset is here.',                           body: 'Whenever you are ready.' },
          { title: 'Today is smaller than it feels.',               body: 'One gentle moment.' },
        ],
        confidence: [
          { title: 'You came back before.',                         body: 'You can come back today.' },
          { title: 'Small returns rebuild quiet trust.',            body: 'This one counts.' },
          { title: 'You are more steady than you think.',           body: 'One return shows it.' },
          { title: 'Returning is itself a choice.',                 body: 'A good one.' },
        ],
        burnout: [
          { title: 'One gentle moment is enough today.',            body: 'That is truly all.' },
          { title: 'Small is enough.',                              body: 'Rest is part of this.' },
          { title: 'You are allowed to begin gently.',              body: 'No performance needed.' },
          { title: 'No pressure today.',                            body: 'Just show up, however that looks.' },
        ],
      },
      {
        focus: [
          { title: 'Un momento tranquilo protege tu enfoque.',      body: 'Tu reset está aquí.' },
          { title: 'Tu mente necesita espacio.',                    body: 'Un reset ayuda.' },
          { title: 'La claridad mental empieza despacio.',          body: 'Un momento.' },
          { title: 'Antes de que el ruido tome el control —',       body: 'un reset.' },
        ],
        calm: [
          { title: 'No tienes que correr hoy.',                    body: 'Un reset suave.' },
          { title: 'Un momento tranquilo es suficiente.',          body: 'Sin presión.' },
          { title: 'Tu reset está aquí.',                          body: 'Cuando puedas.' },
          { title: 'Hoy es más pequeño de lo que parece.',         body: 'Un momento suave.' },
        ],
        confidence: [
          { title: 'Ya volviste antes.',                           body: 'Puedes volver hoy.' },
          { title: 'Los pequeños regresos reconstruyen la confianza suave.', body: 'Este cuenta.' },
          { title: 'Eres más estable de lo que crees.',            body: 'Un regreso lo demuestra.' },
          { title: 'Volver es una elección.',                      body: 'Una buena.' },
        ],
        burnout: [
          { title: 'Un momento suave es suficiente hoy.',          body: 'Solo eso.' },
          { title: 'Pequeño es suficiente.',                       body: 'El descanso forma parte de esto.' },
          { title: 'Puedes empezar despacio.',                     body: 'Sin necesidad de rendir.' },
          { title: 'Sin presión hoy.',                             body: 'Aparece como puedas.' },
        ],
      },
      {
        focus: [
          { title: 'Um momento quieto protege seu foco.',           body: 'Seu reset está aqui.' },
          { title: 'Sua mente precisa de espaço.',                  body: 'Um reset ajuda.' },
          { title: 'Clareza mental começa devagar.',                body: 'Um momento.' },
          { title: 'Antes do ruído tomar conta —',                  body: 'um reset.' },
        ],
        calm: [
          { title: 'Você não precisa correr hoje.',                 body: 'Um reset gentil.' },
          { title: 'Um momento quieto é suficiente.',               body: 'Sem pressão.' },
          { title: 'Seu reset está aqui.',                          body: 'Quando quiser.' },
          { title: 'Hoje é menor do que parece.',                   body: 'Um momento gentil.' },
        ],
        confidence: [
          { title: 'Você voltou antes.',                            body: 'Pode voltar hoje.' },
          { title: 'Pequenos retornos reconstroem confiança quieta.', body: 'Este conta.' },
          { title: 'Você é mais estável do que pensa.',             body: 'Um retorno mostra.' },
          { title: 'Voltar é uma escolha.',                         body: 'Uma boa.' },
        ],
        burnout: [
          { title: 'Um momento gentil é suficiente hoje.',          body: 'Só isso.' },
          { title: 'Pequeno é suficiente.',                         body: 'Descanso faz parte disso.' },
          { title: 'Você pode começar devagar.',                    body: 'Sem desempenho necessário.' },
          { title: 'Sem pressão hoje.',                             body: 'Apareça do jeito que puder.' },
        ],
      },
    );
    const pool = profilePools[profile];
    if (pool) return pick(pool, seed);
  }

  if (streak >= 7) {
    const combined = [
      ...lang(HIGH_MOMENTUM, HIGH_MOMENTUM_ES, HIGH_MOMENTUM_PT),
      ...lang(FUTURE_SELF, FUTURE_SELF_ES, FUTURE_SELF_PT),
    ];
    return pick(combined, seed);
  }

  const goalDict = lang(GOAL_SPECIFIC, GOAL_SPECIFIC_ES, GOAL_SPECIFIC_PT);
  for (const goal of goals) {
    const goalKey = Object.keys(goalDict).find(k =>
      goal.toLowerCase().includes(k) || k.includes(goal.toLowerCase()),
    );
    if (goalKey && goalDict[goalKey]) {
      return pick(goalDict[goalKey], seed);
    }
  }

  const periodPool =
    period === 'morning'   ? lang(MORNING,   MORNING_ES,   MORNING_PT)   :
    period === 'afternoon' ? lang(AFTERNOON, AFTERNOON_ES, AFTERNOON_PT) :
                             lang(EVENING,   EVENING_ES,   EVENING_PT);
  return pick(periodPool, seed);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTELLIGENT NOTIFICATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

// Pool A — Permission-based (dark mood)
export const POOL_A_DARK: NotifMessage[] = [
  { title: 'Daily Reset', body: "You don't have to be okay. Just open this." },
  { title: 'Daily Reset', body: 'No performance required. Just one moment.' },
  { title: 'Daily Reset', body: "You're allowed to still be tired. Come in." },
  { title: 'Daily Reset', body: "The reset doesn't judge. It just waits." },
  { title: 'Daily Reset', body: 'Even a small moment counts today.' },
  { title: 'Daily Reset', body: "You don't have to fix anything. Just breathe." },
  { title: 'Daily Reset', body: 'Hard day already? That is exactly when this helps.' },
  { title: 'Daily Reset', body: 'You are allowed to begin gently.' },
  { title: 'Daily Reset', body: "Rest is part of the process. You're still here." },
  { title: 'Daily Reset', body: 'Small is enough. Open when ready.' },
];

const POOL_A_DARK_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'No tienes que estar bien. Solo abre esto.' },
  { title: 'Daily Reset', body: 'Sin necesidad de rendir. Solo un momento.' },
  { title: 'Daily Reset', body: 'Puedes seguir con cansancio. Entra.' },
  { title: 'Daily Reset', body: 'El reset no juzga. Solo espera.' },
  { title: 'Daily Reset', body: 'Incluso un momento pequeño cuenta hoy.' },
  { title: 'Daily Reset', body: 'No tienes que arreglar nada. Solo respira.' },
  { title: 'Daily Reset', body: '¿Día difícil ya? Es exactamente cuando esto ayuda.' },
  { title: 'Daily Reset', body: 'Puedes empezar despacio.' },
  { title: 'Daily Reset', body: 'El descanso también es parte del proceso. Sigues aquí.' },
  { title: 'Daily Reset', body: 'Pequeño es suficiente. Abre cuando puedas.' },
];

const POOL_A_DARK_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Você não precisa estar bem. É só abrir.' },
  { title: 'Daily Reset', body: 'Sem necessidade de desempenho. Um momento apenas.' },
  { title: 'Daily Reset', body: 'Você pode ainda estar com cansaço. Entre.' },
  { title: 'Daily Reset', body: 'O reset não julga. Só espera.' },
  { title: 'Daily Reset', body: 'Até um momento pequeno conta hoje.' },
  { title: 'Daily Reset', body: 'Você não precisa resolver nada. Só respire.' },
  { title: 'Daily Reset', body: 'Dia difícil? É exatamente quando isso ajuda.' },
  { title: 'Daily Reset', body: 'Você pode começar devagar.' },
  { title: 'Daily Reset', body: 'Descansar também faz parte. Você ainda está aqui.' },
  { title: 'Daily Reset', body: 'Pequeno é suficiente. Abra quando quiser.' },
];

// Pool B — Curiosity-based
export const POOL_B_CURIOSITY: NotifMessage[] = [
  { title: 'Daily Reset', body: 'A quiet moment is waiting for you.' },
  { title: 'Daily Reset', body: 'One question. One breath. Just for you.' },
  { title: 'Daily Reset', body: 'Your daily moment arrived.' },
  { title: 'Daily Reset', body: 'The chaos is still there. So is this.' },
  { title: 'Daily Reset', body: 'Before the emails — one moment for yourself.' },
  { title: 'Daily Reset', body: 'Two minutes before the world takes over.' },
  { title: 'Daily Reset', body: 'Something quiet is waiting inside.' },
  { title: 'Daily Reset', body: 'One moment. That is the whole thing.' },
];

const POOL_B_CURIOSITY_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Un momento tranquilo te está esperando.' },
  { title: 'Daily Reset', body: 'Una pregunta. Un respiro. Solo para ti.' },
  { title: 'Daily Reset', body: 'Tu momento diario llegó.' },
  { title: 'Daily Reset', body: 'El caos sigue ahí. Esto también.' },
  { title: 'Daily Reset', body: 'Antes de los emails — un momento para ti.' },
  { title: 'Daily Reset', body: 'Dos minutos antes de que el mundo tome el control.' },
  { title: 'Daily Reset', body: 'Algo tranquilo está esperando adentro.' },
  { title: 'Daily Reset', body: 'Un momento. Solo eso.' },
];

const POOL_B_CURIOSITY_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Um momento quieto está esperando por você.' },
  { title: 'Daily Reset', body: 'Uma pergunta. Um respiro. Só para você.' },
  { title: 'Daily Reset', body: 'Seu momento diário chegou.' },
  { title: 'Daily Reset', body: 'O caos ainda está lá. Este também.' },
  { title: 'Daily Reset', body: 'Antes dos emails — um momento para você.' },
  { title: 'Daily Reset', body: 'Dois minutos antes do mundo tomar conta.' },
  { title: 'Daily Reset', body: 'Algo quieto está esperando dentro.' },
  { title: 'Daily Reset', body: 'Um momento. É só isso.' },
];

// Pool C — Recognition-based (streak users)
export const POOL_C_STREAK: NotifMessage[] = [
  { title: 'Daily Reset', body: 'You keep coming back. That says everything.' },
  { title: 'Daily Reset', body: 'You know what to do. The reset is ready.' },
  { title: 'Daily Reset', body: 'The return is becoming part of you.' },
  { title: 'Daily Reset', body: 'Yesterday you came back. Today is here.' },
  { title: 'Daily Reset', body: 'Quiet consistency is rare. You have it.' },
  { title: 'Daily Reset', body: 'Something is being built. One more day.' },
  { title: 'Daily Reset', body: 'This is becoming who you are.' },
  { title: 'Daily Reset', body: "You've done this before. You know it helps." },
];

const POOL_C_STREAK_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Sigues volviendo. Eso lo dice todo.' },
  { title: 'Daily Reset', body: 'Sabes qué hacer. El reset está listo.' },
  { title: 'Daily Reset', body: 'El regreso se está volviendo parte de ti.' },
  { title: 'Daily Reset', body: 'Ayer volviste. Hoy está aquí.' },
  { title: 'Daily Reset', body: 'La constancia tranquila es rara. Tú la tienes.' },
  { title: 'Daily Reset', body: 'Algo se está construyendo. Un día más.' },
  { title: 'Daily Reset', body: 'Esto se está convirtiendo en quien eres.' },
  { title: 'Daily Reset', body: 'Ya lo has hecho antes. Sabes que ayuda.' },
];

const POOL_C_STREAK_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Você continua voltando. Isso diz tudo.' },
  { title: 'Daily Reset', body: 'Você sabe o que fazer. O reset está pronto.' },
  { title: 'Daily Reset', body: 'O retorno está se tornando parte de você.' },
  { title: 'Daily Reset', body: 'Ontem você voltou. Hoje está aqui.' },
  { title: 'Daily Reset', body: 'Consistência quieta é rara. Você tem.' },
  { title: 'Daily Reset', body: 'Algo está sendo construído. Mais um dia.' },
  { title: 'Daily Reset', body: 'Isso está se tornando quem você é.' },
  { title: 'Daily Reset', body: 'Você já fez isso antes. Sabe que ajuda.' },
];

// Pool D — Reframe-based (afternoon/evening)
export const POOL_D_REFRAME: NotifMessage[] = [
  { title: 'Daily Reset', body: 'A quiet moment between the hours.' },
  { title: 'Daily Reset', body: "You've been going. Take a breath." },
  { title: 'Daily Reset', body: 'The day is half done. How are you holding up?' },
  { title: 'Daily Reset', body: 'Pause. Breathe. Continue.' },
  { title: 'Daily Reset', body: 'Still time for one quiet reset today.' },
  { title: 'Daily Reset', body: 'Today is not written yet.' },
  { title: 'Daily Reset', body: 'The afternoon is still yours.' },
  { title: 'Daily Reset', body: 'Come back to yourself for a moment.' },
];

const POOL_D_REFRAME_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Un momento tranquilo entre las horas.' },
  { title: 'Daily Reset', body: 'Has estado moviéndote. Respira.' },
  { title: 'Daily Reset', body: 'El día está a la mitad. ¿Cómo estás?' },
  { title: 'Daily Reset', body: 'Pausa. Respira. Continúa.' },
  { title: 'Daily Reset', body: 'Todavía hay tiempo para un reset tranquilo hoy.' },
  { title: 'Daily Reset', body: 'El día todavía no está escrito.' },
  { title: 'Daily Reset', body: 'La tarde todavía es tuya.' },
  { title: 'Daily Reset', body: 'Vuelve a ti por un momento.' },
];

const POOL_D_REFRAME_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Um momento quieto entre as horas.' },
  { title: 'Daily Reset', body: 'Você tem se movido. Respire.' },
  { title: 'Daily Reset', body: 'O dia está na metade. Como você está?' },
  { title: 'Daily Reset', body: 'Pause. Respire. Continue.' },
  { title: 'Daily Reset', body: 'Ainda dá tempo para um reset hoje.' },
  { title: 'Daily Reset', body: 'O dia ainda não foi escrito.' },
  { title: 'Daily Reset', body: 'A tarde ainda é sua.' },
  { title: 'Daily Reset', body: 'Volte para você por um momento.' },
];

export function selectIntelligentDailyNotification(ctx: {
  period: NotificationPeriod;
  streak: number;
  daysMissed: number;
  lastMood: 0 | 1 | 2 | null;
  seed: number;
}): NotifMessage {
  const { period, streak, daysMissed, lastMood, seed } = ctx;

  if (daysMissed >= 2) return pick(lang(POOL_A_DARK, POOL_A_DARK_ES, POOL_A_DARK_PT), seed);

  if (period === 'afternoon' || period === 'evening') {
    return pick(lang(POOL_D_REFRAME, POOL_D_REFRAME_ES, POOL_D_REFRAME_PT), seed);
  }

  if (lastMood === 0) {
    return (seed % 10) < 7
      ? pick(lang(POOL_A_DARK,    POOL_A_DARK_ES,    POOL_A_DARK_PT),    seed)
      : pick(lang(POOL_B_CURIOSITY, POOL_B_CURIOSITY_ES, POOL_B_CURIOSITY_PT), seed);
  }
  if (lastMood === 2 && streak >= 3) {
    return (seed % 10) < 6
      ? pick(lang(POOL_C_STREAK,    POOL_C_STREAK_ES,    POOL_C_STREAK_PT),    seed)
      : pick(lang(POOL_B_CURIOSITY, POOL_B_CURIOSITY_ES, POOL_B_CURIOSITY_PT), seed);
  }
  if (streak >= 7) {
    return (seed % 10) < 7
      ? pick(lang(POOL_C_STREAK,    POOL_C_STREAK_ES,    POOL_C_STREAK_PT),    seed)
      : pick(lang(POOL_B_CURIOSITY, POOL_B_CURIOSITY_ES, POOL_B_CURIOSITY_PT), seed);
  }
  return pick(lang(POOL_B_CURIOSITY, POOL_B_CURIOSITY_ES, POOL_B_CURIOSITY_PT), seed);
}

// ─── Evening Anchor ───────────────────────────────────────────────────────────

export const EVENING_RITUAL_DONE: NotifMessage[] = [
  { title: 'Daily Reset', body: 'You showed up today. How did it go?' },
  { title: 'Daily Reset', body: 'One last moment before tomorrow.' },
  { title: 'Daily Reset', body: 'How are you arriving at tonight?' },
  { title: 'Daily Reset', body: "You made it through. That's worth a moment." },
  { title: 'Daily Reset', body: 'End the day as gently as it began.' },
  { title: 'Daily Reset', body: 'A quiet close to a day well lived.' },
];

const EVENING_RITUAL_DONE_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Apareciste hoy. ¿Cómo fue?' },
  { title: 'Daily Reset', body: 'Un último momento antes de mañana.' },
  { title: 'Daily Reset', body: '¿Cómo estás llegando a esta noche?' },
  { title: 'Daily Reset', body: 'Lo atravesaste. Eso vale un momento.' },
  { title: 'Daily Reset', body: 'Cierra el día con la misma calma con que empezó.' },
  { title: 'Daily Reset', body: 'Un cierre tranquilo para un día bien vivido.' },
];

const EVENING_RITUAL_DONE_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Você apareceu hoje. Como foi?' },
  { title: 'Daily Reset', body: 'Um último momento antes de amanhã.' },
  { title: 'Daily Reset', body: 'Como você está chegando nessa noite?' },
  { title: 'Daily Reset', body: 'Você atravessou. Isso vale um momento.' },
  { title: 'Daily Reset', body: 'Encerre o dia com a mesma calma com que começou.' },
  { title: 'Daily Reset', body: 'Um encerramento quieto para um dia bem vivido.' },
];

export const EVENING_NO_RITUAL: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Today was today. How are you holding up?' },
  { title: 'Daily Reset', body: 'The day is ending. You made it through.' },
  { title: 'Daily Reset', body: 'Before you sleep — one honest breath.' },
  { title: 'Daily Reset', body: 'The day is done. So is the pressure.' },
  { title: 'Daily Reset', body: 'One quiet moment before you rest.' },
  { title: 'Daily Reset', body: 'How did you carry today?' },
];

const EVENING_NO_RITUAL_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Hoy fue hoy. ¿Cómo estás?' },
  { title: 'Daily Reset', body: 'El día está terminando. Lo atravesaste.' },
  { title: 'Daily Reset', body: 'Antes de dormir — un respiro honesto.' },
  { title: 'Daily Reset', body: 'El día terminó. La presión también.' },
  { title: 'Daily Reset', body: 'Un momento tranquilo antes de descansar.' },
  { title: 'Daily Reset', body: '¿Cómo cargaste el día?' },
];

const EVENING_NO_RITUAL_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Hoje foi hoje. Como você está?' },
  { title: 'Daily Reset', body: 'O dia está terminando. Você atravessou.' },
  { title: 'Daily Reset', body: 'Antes de dormir — um respiro honesto.' },
  { title: 'Daily Reset', body: 'O dia acabou. A pressão também.' },
  { title: 'Daily Reset', body: 'Um momento quieto antes de descansar.' },
  { title: 'Daily Reset', body: 'Como você carregou o dia?' },
];

export const EVENING_DARK_MORNING: NotifMessage[] = [
  { title: 'Daily Reset', body: 'It was a heavy day. How did you carry it?' },
  { title: 'Daily Reset', body: 'You got through a hard one. That counts.' },
  { title: 'Daily Reset', body: 'Not everything needs to be solved tonight.' },
];

const EVENING_DARK_MORNING_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Fue un día pesado. ¿Cómo lo cargaste?' },
  { title: 'Daily Reset', body: 'Atravesaste uno difícil. Eso cuenta.' },
  { title: 'Daily Reset', body: 'No todo tiene que resolverse esta noche.' },
];

const EVENING_DARK_MORNING_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Foi um dia pesado. Como você o carregou?' },
  { title: 'Daily Reset', body: 'Você atravessou um difícil. Isso conta.' },
  { title: 'Daily Reset', body: 'Nem tudo precisa ser resolvido esta noite.' },
];

export const EVENING_GOOD_MORNING: NotifMessage[] = [
  { title: 'Daily Reset', body: 'You seemed lighter this morning. Did it hold?' },
  { title: 'Daily Reset', body: 'A quiet end to a softer day.' },
];

const EVENING_GOOD_MORNING_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Parecías más leve esta mañana. ¿Se mantuvo?' },
  { title: 'Daily Reset', body: 'Un cierre tranquilo para un día más suave.' },
];

const EVENING_GOOD_MORNING_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Você pareceu mais leve essa manhã. Continuou?' },
  { title: 'Daily Reset', body: 'Um encerramento quieto para um dia mais suave.' },
];

export function selectEveningNotification(ctx: {
  ritualDone: boolean;
  lastMood: 0 | 1 | 2 | null;
  seed: number;
}): NotifMessage {
  const { ritualDone, lastMood, seed } = ctx;
  if (lastMood === 0)              return pick(lang(EVENING_DARK_MORNING, EVENING_DARK_MORNING_ES, EVENING_DARK_MORNING_PT), seed);
  if (lastMood === 2 && ritualDone) return pick(lang(EVENING_GOOD_MORNING, EVENING_GOOD_MORNING_ES, EVENING_GOOD_MORNING_PT), seed);
  if (ritualDone)                  return pick(lang(EVENING_RITUAL_DONE,  EVENING_RITUAL_DONE_ES,  EVENING_RITUAL_DONE_PT),  seed);
  return pick(lang(EVENING_NO_RITUAL, EVENING_NO_RITUAL_ES, EVENING_NO_RITUAL_PT), seed);
}

// ─── Gap nudges ───────────────────────────────────────────────────────────────

export const GAP_2D: NotifMessage[] = [
  { title: 'Daily Reset', body: "Still here when you're ready." },
  { title: 'Daily Reset', body: 'No pressure. Your reset is waiting.' },
  { title: 'Daily Reset', body: 'Two days away. The door is still open.' },
  { title: 'Daily Reset', body: "Whenever you're ready — no rush." },
];

const GAP_2D_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Todavía aquí cuando estés lista.' },
  { title: 'Daily Reset', body: 'Sin presión. Tu reset está esperando.' },
  { title: 'Daily Reset', body: 'Dos días. La puerta sigue abierta.' },
  { title: 'Daily Reset', body: 'Cuando quieras — sin prisa.' },
];

const GAP_2D_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Ainda aqui quando você quiser.' },
  { title: 'Daily Reset', body: 'Sem pressa. Seu reset está esperando.' },
  { title: 'Daily Reset', body: 'Dois dias. A porta ainda está aberta.' },
  { title: 'Daily Reset', body: 'Quando quiser — sem pressa.' },
];

export const GAP_5D: NotifMessage[] = [
  { title: 'Daily Reset', body: 'It has been a few days. Nothing changed here.' },
  { title: 'Daily Reset', body: "Rest is real. So is this moment, when you're ready." },
  { title: 'Daily Reset', body: 'No guilt. Just one breath when you want it.' },
  { title: 'Daily Reset', body: "You were away. That's okay. We're still here." },
];

const GAP_5D_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Han pasado unos días. Nada cambió aquí.' },
  { title: 'Daily Reset', body: 'El descanso es real. Este momento también, cuando quieras.' },
  { title: 'Daily Reset', body: 'Sin culpa. Un respiro cuando quieras.' },
  { title: 'Daily Reset', body: 'Te alejaste. Está bien. Seguimos aquí.' },
];

const GAP_5D_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Faz alguns dias. Nada mudou aqui.' },
  { title: 'Daily Reset', body: 'Descanso é real. Este momento também, quando quiser.' },
  { title: 'Daily Reset', body: 'Sem culpa. Um respiro quando quiser.' },
  { title: 'Daily Reset', body: 'Você se afastou. Tudo bem. Ainda estamos aqui.' },
];

export const GAP_14D: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Two weeks. Nothing is ruined.' },
  { title: 'Daily Reset', body: "You haven't been back in a while. We're here when you are." },
  { title: 'Daily Reset', body: 'Sometimes we drift. The reset is still yours.' },
];

const GAP_14D_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Dos semanas. Nada se ha perdido.' },
  { title: 'Daily Reset', body: 'Hace un tiempo que no vuelves. Estamos aquí cuando tú estés.' },
  { title: 'Daily Reset', body: 'A veces nos alejamos. El reset sigue siendo tuyo.' },
];

const GAP_14D_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Duas semanas. Nada foi perdido.' },
  { title: 'Daily Reset', body: 'Faz um tempo. Estamos aqui quando você estiver.' },
  { title: 'Daily Reset', body: 'Às vezes nos afastamos. O reset ainda é seu.' },
];

export const GAP_30D: NotifMessage[] = [
  { title: 'Daily Reset', body: "A month away. We hope you're okay. Still here." },
  { title: 'Daily Reset', body: 'No streak. No pressure. Just — here if you need it.' },
];

const GAP_30D_ES: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Un mes. Esperamos que estés bien. Seguimos aquí.' },
  { title: 'Daily Reset', body: 'Sin racha. Sin presión. Aquí, si lo necesitas.' },
];

const GAP_30D_PT: NotifMessage[] = [
  { title: 'Daily Reset', body: 'Um mês. Esperamos que você esteja bem. Ainda aqui.' },
  { title: 'Daily Reset', body: 'Sem sequência. Sem pressão. Estamos aqui se precisar.' },
];

// ─── Comeback reminders (timed from last app open) ────────────────────────────
// One message per inactivity window — soft, shame-free, gender-neutral.

const COMEBACK_REMINDER_2D: NotifMessage = {
  title: 'Your space is still here.',
  body:  'No rush. A small reset fits whenever it feels right.',
};
const COMEBACK_REMINDER_2D_ES: NotifMessage = {
  title: 'Tu espacio sigue aquí.',
  body:  'Sin prisa. Un pequeño reset cabe cuando tenga sentido.',
};
const COMEBACK_REMINDER_2D_PT: NotifMessage = {
  title: 'Seu espaço continua aqui.',
  body:  'Sem pressa. Um pequeno reset ainda cabe quando fizer sentido.',
};

const COMEBACK_REMINDER_3D: NotifMessage = {
  title: 'You can return slowly.',
  body:  'No explanation needed. Just a small beginning.',
};
const COMEBACK_REMINDER_3D_ES: NotifMessage = {
  title: 'Puedes volver despacio.',
  body:  'No hace falta explicar nada. Solo empezar poco a poco.',
};
const COMEBACK_REMINDER_3D_PT: NotifMessage = {
  title: 'Você pode voltar devagar.',
  body:  'Não precisa explicar. Só recomeçar pequeno.',
};

const COMEBACK_REMINDER_5D: NotifMessage = {
  title: 'A gentle return still counts.',
  body:  'The app is still here for a quieter moment.',
};
const COMEBACK_REMINDER_5D_ES: NotifMessage = {
  title: 'Un regreso suave todavía cuenta.',
  body:  'La app sigue aquí para un momento más tranquilo.',
};
const COMEBACK_REMINDER_5D_PT: NotifMessage = {
  title: 'Um retorno leve ainda conta.',
  body:  'O app continua aqui para um minuto mais calmo.',
};

const COMEBACK_REMINDER_7D: NotifMessage = {
  title: 'Beginning again does not have to feel heavy.',
  body:  'Whenever you want, come back for a moment. No obligation.',
};
const COMEBACK_REMINDER_7D_ES: NotifMessage = {
  title: 'Volver a empezar no tiene que pesar.',
  body:  'Cuando quieras, vuelve un instante. Sin exigencia.',
};
const COMEBACK_REMINDER_7D_PT: NotifMessage = {
  title: 'Recomeçar não precisa pesar.',
  body:  'Quando quiser, volte por um instante. Sem cobrança.',
};

export function selectComebackReminderNotification(days: 2 | 3 | 5 | 7, seed: number): NotifMessage {
  void seed; // single message per window — no pool rotation needed
  if (days === 2) return lang(COMEBACK_REMINDER_2D, COMEBACK_REMINDER_2D_ES, COMEBACK_REMINDER_2D_PT);
  if (days === 3) return lang(COMEBACK_REMINDER_3D, COMEBACK_REMINDER_3D_ES, COMEBACK_REMINDER_3D_PT);
  if (days === 5) return lang(COMEBACK_REMINDER_5D, COMEBACK_REMINDER_5D_ES, COMEBACK_REMINDER_5D_PT);
  return lang(COMEBACK_REMINDER_7D, COMEBACK_REMINDER_7D_ES, COMEBACK_REMINDER_7D_PT);
}

export function selectGapNudge(daysMissed: number, seed: number): NotifMessage {
  if (daysMissed >= 30) return pick(lang(GAP_30D, GAP_30D_ES, GAP_30D_PT), seed);
  if (daysMissed >= 14) return pick(lang(GAP_14D, GAP_14D_ES, GAP_14D_PT), seed);
  if (daysMissed >= 5)  return pick(lang(GAP_5D,  GAP_5D_ES,  GAP_5D_PT),  seed);
  return pick(lang(GAP_2D, GAP_2D_ES, GAP_2D_PT), seed);
}

// ─── Milestone delivery ───────────────────────────────────────────────────────

export const MILESTONE_DELIVERY: Record<number, NotifMessage> = {
  3:   { title: 'Daily Reset', body: 'Three days. Something is beginning to breathe.' },
  7:   { title: 'Daily Reset', body: 'One week. You stayed with yourself.' },
  14:  { title: 'Daily Reset', body: 'Two weeks of returning. Open to see what that means.' },
  21:  { title: 'Daily Reset', body: '21 days. Something is shifting, quietly.' },
  30:  { title: 'Daily Reset', body: 'Thirty days. This one deserves a moment.' },
  60:  { title: 'Daily Reset', body: 'Two months. What was effort is becoming natural.' },
  90:  { title: 'Daily Reset', body: 'Ninety days. You are no longer beginning.' },
  100: { title: 'Daily Reset', body: 'One hundred days of returning to yourself.' },
};

const MILESTONE_DELIVERY_ES: Record<number, NotifMessage> = {
  3:   { title: 'Daily Reset', body: 'Tres días. Algo está empezando a respirar.' },
  7:   { title: 'Daily Reset', body: 'Una semana. Te quedaste contigo.' },
  14:  { title: 'Daily Reset', body: 'Dos semanas volviendo. Abre para ver qué significa.' },
  21:  { title: 'Daily Reset', body: '21 días. Algo está cambiando, en silencio.' },
  30:  { title: 'Daily Reset', body: 'Treinta días. Este merece un momento.' },
  60:  { title: 'Daily Reset', body: 'Dos meses. Lo que era esfuerzo se está volviendo natural.' },
  90:  { title: 'Daily Reset', body: 'Noventa días. Ya no estás empezando.' },
  100: { title: 'Daily Reset', body: 'Cien días volviendo a ti.' },
};

export const MILESTONE_DELIVERY_PT: Record<number, NotifMessage> = {
  3:   { title: 'Daily Reset', body: 'Três dias. Algo está começando a respirar.' },
  7:   { title: 'Daily Reset', body: 'Uma semana. Você ficou consigo.' },
  14:  { title: 'Daily Reset', body: 'Duas semanas voltando. Abra para ver o que isso significa.' },
  21:  { title: 'Daily Reset', body: '21 dias. Algo está mudando, quietamente.' },
  30:  { title: 'Daily Reset', body: 'Trinta dias. Este merece um momento.' },
  60:  { title: 'Daily Reset', body: 'Dois meses. O que era esforço está se tornando natural.' },
  90:  { title: 'Daily Reset', body: 'Noventa dias. Você não está mais começando.' },
  100: { title: 'Daily Reset', body: 'Cem dias voltando para você.' },
};

export function selectMilestoneDelivery(streak: number): NotifMessage {
  const map = lang(MILESTONE_DELIVERY, MILESTONE_DELIVERY_ES, MILESTONE_DELIVERY_PT);
  return map[streak] ?? lang(
    { title: 'Daily Reset', body: `Day ${streak}. You kept returning. That is everything.` },
    { title: 'Daily Reset', body: `Día ${streak}. Seguiste volviendo. Eso es todo.` },
    { title: 'Daily Reset', body: `Dia ${streak}. Você continuou voltando. Isso é tudo.` },
  );
}

// ─── Word of the Day ──────────────────────────────────────────────────────────

const WORD_BODIES_ES = [
  (w: string) => `${w} — un pequeño espacio para respirar.`,
  (w: string) => `${w} — algo para llevar en silencio mañana.`,
  (w: string) => `${w} — un momento más ligero puede empezar aquí.`,
  (w: string) => `${w} — una palabra para el día que viene.`,
  (w: string) => `${w} — algo con lo que quedarse un momento.`,
];

const WORD_BODIES_PT = [
  (w: string) => `${w} — um pequeno espaço para respirar.`,
  (w: string) => `${w} — talvez amanhã não precise pesar tanto.`,
  (w: string) => `${w} — um momento mais leve pode começar amanhã.`,
  (w: string) => `${w} — uma palavra para carregar quietamente.`,
  (w: string) => `${w} — algo para sentir antes de o dia começar.`,
];

const WORD_BODIES_EN = [
  (w: string) => `${w} — a quiet space to breathe.`,
  (w: string) => `${w} — something to carry softly into tomorrow.`,
  (w: string) => `${w} — a lighter moment can begin here.`,
  (w: string) => `${w} — one word before the day begins.`,
  (w: string) => `${w} — something worth sitting with.`,
];

export function selectWordOfDayNotification(word: string): NotifMessage {
  const seed = word.charCodeAt(0) + word.length;
  if (isEs()) {
    const body = WORD_BODIES_ES[seed % WORD_BODIES_ES.length]!(word);
    return { title: 'Tu palabra de mañana', body };
  }
  if (isPt()) {
    const body = WORD_BODIES_PT[seed % WORD_BODIES_PT.length]!(word);
    return { title: 'Sua palavra de amanhã', body };
  }
  const body = WORD_BODIES_EN[seed % WORD_BODIES_EN.length]!(word);
  return { title: "Tomorrow's word", body };
}

// ─── Smart burnout-recovery pools ────────────────────────────────────────────

export const SMART_DAILY: NotifMessage[] = [
  { title: 'Your reset is ready.',                     body: 'One breath at a time.' },
  { title: 'Nothing is required of you',               body: 'except this one moment.' },
  { title: 'Rest is not giving up.',                   body: 'Your reset is waiting.' },
  { title: 'You came back yesterday.',                 body: 'Today is here.' },
  { title: 'You are allowed to take this slowly.',     body: '' },
  { title: 'One small reset.',                         body: 'That is the whole thing today.' },
  { title: 'Gentle progress is still progress.',       body: '' },
  { title: 'The quietest step forward still counts.',  body: '' },
  { title: 'Your body asked for this.',                body: 'Honor it.' },
  { title: 'Today only needs one quiet moment.',       body: '' },
  { title: 'Before the day takes over —',              body: 'one reset.' },
  { title: "You don't have to feel ready to begin.",   body: '' },
  { title: 'One moment of calm before everything.',    body: '' },
  { title: 'Your reset is here.',                      body: "Whenever you're ready." },
  { title: 'Small and steady.',                        body: 'Your reset is waiting.' },
  { title: 'You came back before.',                    body: 'You can come back today.' },
  { title: 'One gentle reset.',                        body: 'That is enough.' },
  { title: 'The hardest part is opening the app.',     body: 'You did it.' },
  { title: "Today's reset is gentler than you think.", body: '' },
  { title: 'You deserve this one quiet moment.',       body: '' },
];

export const SMART_DAILY_ES: NotifMessage[] = [
  { title: 'Tu reset está listo.',                         body: 'Un respiro a la vez.' },
  { title: 'No se te exige nada',                          body: 'excepto este momento.' },
  { title: 'Descansar no es rendirse.',                    body: 'Tu reset está esperando.' },
  { title: 'Ayer volviste.',                               body: 'Hoy está aquí.' },
  { title: 'Puedes hacer esto con calma.',                 body: '' },
  { title: 'Un reset pequeño.',                            body: 'Es todo lo que se necesita hoy.' },
  { title: 'El progreso suave sigue siendo progreso.',     body: '' },
  { title: 'El paso más tranquilo también cuenta.',        body: '' },
  { title: 'Tu cuerpo pidió esto.',                        body: 'Honralo.' },
  { title: 'Hoy solo necesita un momento tranquilo.',      body: '' },
  { title: 'Antes de que el día tome el control —',        body: 'un reset.' },
  { title: 'No necesitas esperar para empezar.',           body: '' },
  { title: 'Un momento de calma antes de todo.',           body: '' },
  { title: 'Tu reset está aquí.',                          body: 'Cuando puedas.' },
  { title: 'Pequeño y constante.',                         body: 'Tu reset está esperando.' },
  { title: 'Ya volviste antes.',                           body: 'Puedes volver hoy.' },
  { title: 'Un reset suave.',                              body: 'Eso es suficiente.' },
  { title: 'La parte más difícil es abrir la app.',        body: 'Lo hiciste.' },
  { title: 'El reset de hoy es más suave de lo que parece.', body: '' },
  { title: 'Mereces este momento tranquilo.',              body: '' },
];

export const SMART_DAILY_PT: NotifMessage[] = [
  { title: 'Seu reset está pronto.',                          body: 'Um respiro de cada vez.' },
  { title: 'Nada é exigido de você',                         body: 'além deste momento.' },
  { title: 'Descansar não é desistir.',                      body: 'Seu reset está esperando.' },
  { title: 'Você voltou ontem.',                             body: 'Hoje está aqui.' },
  { title: 'Você pode fazer isso com calma.',                body: '' },
  { title: 'Um reset pequeno.',                              body: 'É tudo que precisa hoje.' },
  { title: 'Progresso gentil ainda é progresso.',            body: '' },
  { title: 'O passo mais quieto ainda conta.',               body: '' },
  { title: 'Seu corpo pediu isso.',                          body: 'Honre.' },
  { title: 'Hoje precisa só de um momento quieto.',          body: '' },
  { title: 'Antes do dia tomar conta —',                     body: 'um reset.' },
  { title: 'Você não precisa esperar para começar.',         body: '' },
  { title: 'Um momento de calma antes de tudo.',             body: '' },
  { title: 'Seu reset está aqui.',                           body: 'Quando quiser.' },
  { title: 'Pequeno e constante.',                           body: 'Seu reset está esperando.' },
  { title: 'Você já voltou antes.',                          body: 'Pode voltar hoje.' },
  { title: 'Um reset gentil.',                               body: 'Isso é suficiente.' },
  { title: 'A parte mais difícil é abrir o app.',            body: 'Você fez.' },
  { title: 'O reset de hoje é mais gentil do que parece.',   body: '' },
  { title: 'Você merece este momento quieto.',               body: '' },
];

export const SMART_COMEBACK_1D: NotifMessage[] = [
  { title: 'Nothing is ruined.',            body: 'Your reset is still here.' },
  { title: 'One day away',                  body: "doesn't change what you've built." },
  { title: "You didn't stop. You paused.",  body: "There's a difference." },
  { title: 'The thread is intact.',         body: "Come back when you're ready." },
  { title: 'Yesterday happened.',           body: 'Today is yours.' },
  { title: 'No judgment here.',             body: 'Just your reset, waiting.' },
];

export const SMART_COMEBACK_1D_ES: NotifMessage[] = [
  { title: 'Nada se ha perdido.',               body: 'Tu reset sigue aquí.' },
  { title: 'Un día fuera',                      body: 'no cambia lo que has construido.' },
  { title: 'No paraste. Hiciste una pausa.',    body: 'Hay diferencia.' },
  { title: 'El hilo sigue intacto.',            body: 'Vuelve cuando quieras.' },
  { title: 'Ayer ocurrió.',                     body: 'Hoy es tuyo.' },
  { title: 'Sin juicios aquí.',                 body: 'Solo tu reset, esperando.' },
];

export const SMART_COMEBACK_1D_PT: NotifMessage[] = [
  { title: 'Nada foi perdido.',                 body: 'Seu reset ainda está aqui.' },
  { title: 'Um dia fora',                       body: 'não muda o que você construiu.' },
  { title: 'Você não parou. Fez uma pausa.',    body: 'Há diferença.' },
  { title: 'O fio está intacto.',               body: 'Volte quando quiser.' },
  { title: 'Ontem aconteceu.',                  body: 'Hoje é seu.' },
  { title: 'Sem julgamento aqui.',              body: 'Só seu reset, esperando.' },
];

export const SMART_COMEBACK_2_3D: NotifMessage[] = [
  { title: 'Still here.',               body: 'Still waiting. No judgment.' },
  { title: 'A few days away',           body: "doesn't mean you stopped." },
  { title: 'The door is open.',         body: 'Come back when you can.' },
  { title: 'Your reset remembers you.', body: 'Return when ready.' },
  { title: 'Nothing is lost.',          body: 'Everything is still here.' },
];

export const SMART_COMEBACK_2_3D_ES: NotifMessage[] = [
  { title: 'Todavía aquí.',                    body: 'Todavía esperando. Sin juicios.' },
  { title: 'Unos días fuera',                  body: 'no significa que paraste.' },
  { title: 'La puerta está abierta.',          body: 'Vuelve cuando puedas.' },
  { title: 'Tu reset te recuerda.',            body: 'Vuelve cuando quieras.' },
  { title: 'Nada se ha perdido.',              body: 'Todo sigue aquí.' },
];

export const SMART_COMEBACK_2_3D_PT: NotifMessage[] = [
  { title: 'Ainda aqui.',                     body: 'Ainda esperando. Sem julgamento.' },
  { title: 'Alguns dias fora',                body: 'não significa que parou.' },
  { title: 'A porta está aberta.',            body: 'Volte quando puder.' },
  { title: 'Seu reset lembra de você.',       body: 'Volte quando quiser.' },
  { title: 'Nada foi perdido.',               body: 'Tudo ainda está aqui.' },
];

export const SMART_COMEBACK_4D_PLUS: NotifMessage[] = [
  { title: "Whenever you're ready.",                  body: 'The door is open.' },
  { title: 'Coming back is not failure.',             body: "It's enough." },
  { title: 'Nothing is ruined.',                      body: 'Come back at your own pace.' },
  { title: 'The reset is gentler than the time away.', body: '' },
  { title: 'You can always begin again.',             body: 'Today works.' },
];

export const SMART_COMEBACK_4D_PLUS_ES: NotifMessage[] = [
  { title: 'Cuando quieras.',                            body: 'La puerta está abierta.' },
  { title: 'Volver no es fallar.',                       body: 'Es suficiente.' },
  { title: 'Nada se ha perdido.',                        body: 'Vuelve a tu propio ritmo.' },
  { title: 'El reset es más suave que el tiempo fuera.', body: '' },
  { title: 'Siempre puedes empezar de nuevo.',           body: 'Hoy funciona.' },
];

export const SMART_COMEBACK_4D_PLUS_PT: NotifMessage[] = [
  { title: 'Quando quiser.',                              body: 'A porta está aberta.' },
  { title: 'Voltar não é falhar.',                        body: 'É suficiente.' },
  { title: 'Nada foi perdido.',                           body: 'Volte no seu ritmo.' },
  { title: 'O reset é mais gentil do que o tempo fora.',  body: '' },
  { title: 'Você pode sempre começar de novo.',           body: 'Hoje funciona.' },
];

export const SMART_MILESTONE_NOTIFICATIONS: Record<number, NotifMessage> = {
  3:  { title: '3 days.',    body: 'Something is beginning to breathe.' },
  7:  { title: 'One week.',  body: 'You stayed with yourself.' },
  14: { title: 'Two weeks.', body: 'The return is becoming real.' },
  30: { title: '30 days.',   body: 'One month of coming back to yourself.' },
};

export const SMART_MILESTONE_NOTIFICATIONS_ES: Record<number, NotifMessage> = {
  3:  { title: '3 días.',       body: 'Algo está empezando a respirar.' },
  7:  { title: 'Una semana.',   body: 'Te quedaste contigo.' },
  14: { title: 'Dos semanas.',  body: 'El regreso se está volviendo real.' },
  30: { title: '30 días.',      body: 'Un mes volviendo a ti.' },
};

export const SMART_MILESTONE_NOTIFICATIONS_PT: Record<number, NotifMessage> = {
  3:  { title: '3 dias.',       body: 'Algo está começando a respirar.' },
  7:  { title: 'Uma semana.',   body: 'Você ficou consigo.' },
  14: { title: 'Duas semanas.', body: 'O retorno está se tornando real.' },
  30: { title: '30 dias.',      body: 'Um mês voltando para você.' },
};

export function selectWeeklyRecapNotification(seed: number): NotifMessage {
  return pick(lang(WEEKLY_RECAP, WEEKLY_RECAP_ES, WEEKLY_RECAP_PT), seed);
}

export function selectMilestoneNotification(streak: number): NotifMessage {
  const map = lang(MILESTONE_NOTIFICATIONS, MILESTONE_NOTIFICATIONS_ES, MILESTONE_NOTIFICATIONS_PT);
  return map[streak] ?? lang(
    { title: `Day ${streak}.`,  body: 'You kept returning. That is everything.' },
    { title: `Día ${streak}.`,  body: 'Seguiste volviendo. Eso es todo.' },
    { title: `Dia ${streak}.`,  body: 'Você continuou voltando. Isso é tudo.' },
  );
}

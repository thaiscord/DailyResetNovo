import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated, Easing, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii, Shadows } from '../../theme';
import { mindsetCards, mindsetCategories, rituals, dailyResetsExtended, type MindsetCard } from '../../data';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { useEmotionalProfile } from '../../hooks/useEmotionalProfile';
import { getItem, setItem, getLocalDateKey, StorageKeys } from '../../hooks/useStorage';
import { getStateCategory, type DailyState } from '../../utils/dailyState';

// ─── Access tiers ─────────────────────────────────────────────────────────────
const ACCESS_RULES = {
  free: {
    dailyInsightsLimit: 1,
    // Categories unlocked without premium (Today is always accessible)
    unlockedCategories: ['Focus', 'Calm'] as string[],
    previewPerCategory: 2,
  },
  premium: {
    dailyInsightsLimit: 1,
    // Progressive archive: unlock more insights per category as journey day advances
    archiveByDay: [
      { minDay: 1,  limit: 5  },
      { minDay: 3,  limit: 10 },
      { minDay: 7,  limit: 20 },
      { minDay: 14, limit: 40 },
      { minDay: 30, limit: 999 },
    ],
  },
};

function getArchiveLimit(currentDay: number): number {
  const tiers = [...ACCESS_RULES.premium.archiveByDay].reverse();
  return tiers.find(t => currentDay >= t.minDay)?.limit ?? ACCESS_RULES.premium.archiveByDay[0].limit;
}

const catColors: Record<string, string> = {
  Focus:      '#4A90D9',
  Rhythm:     '#E8B840',
  Discipline: '#E8B840',
  Courage:    '#E07D45',
  Momentum:   '#E8C040',
  Calm:       '#5BAA96',
  Clarity:    '#14B8A6',
  Rest:       '#7B8CC8',
};
const catBg: Record<string, string> = {
  Focus:      'rgba(74,144,217,0.12)',
  Rhythm:     'rgba(232,184,64,0.18)',
  Discipline: 'rgba(232,184,64,0.18)',
  Courage:    'rgba(224,125,69,0.14)',
  Momentum:   'rgba(232,192,64,0.14)',
  Calm:       'rgba(91,170,150,0.12)',
  Clarity:    'rgba(20,184,166,0.12)',
  Rest:       'rgba(123,140,200,0.12)',
};


// ─── Funções de dados (calculadas uma vez, fora do componente) ────────────────

// Mapeia cardId → número do dia correspondente no programa de 365 dias
function buildCardDayMap(): Record<string, number> {
  const pool: Record<string, MindsetCard[]> = {};
  for (const card of mindsetCards) {
    if (!pool[card.category]) pool[card.category] = [];
    pool[card.category].push(card);
  }
  const counters: Record<string, number> = {};
  const map: Record<string, number> = {};
  for (const day of [...rituals, ...dailyResetsExtended]) {
    const cat = day.theme;
    if (!counters[cat]) counters[cat] = 0;
    const cards = pool[cat] ?? [];
    if (counters[cat] < cards.length) {
      map[cards[counters[cat]].id] = day.day;
      counters[cat]++;
    }
  }
  return map;
}

// Ordena o "All" seguindo a sequência de categorias dos daily resets
function buildSortedAll(cardDayMap: Record<string, number>): MindsetCard[] {
  const pool: Record<string, MindsetCard[]> = {};
  for (const card of mindsetCards) {
    if (!pool[card.category]) pool[card.category] = [];
    pool[card.category].push(card);
  }
  const counters: Record<string, number> = {};
  const used = new Set<string>();
  const sorted: MindsetCard[] = [];
  for (const day of [...rituals, ...dailyResetsExtended]) {
    const cat = day.theme;
    if (!counters[cat]) counters[cat] = 0;
    const cards = pool[cat] ?? [];
    if (counters[cat] < cards.length) {
      const card = cards[counters[cat]];
      sorted.push(card);
      used.add(card.id);
      counters[cat]++;
    }
  }
  for (const card of mindsetCards) {
    if (!used.has(card.id)) sorted.push(card);
  }
  return sorted;
}

const cardDayMap = buildCardDayMap();
const sortedAll   = buildSortedAll(cardDayMap);

// Maps card.id → 0-based index within its own category (used for free preview limit)
function buildCategoryIndexMap(): Record<string, number> {
  const map: Record<string, number> = {};
  for (const cat of mindsetCategories) {
    mindsetCards
      .filter(c => c.category === cat.id)
      .forEach((card, idx) => { map[card.id] = idx; });
  }
  return map;
}
const categoryIndexMap = buildCategoryIndexMap();

const SCREEN_WIDTH = Dimensions.get('window').width;

// Emoções diárias → categoria recomendada
const EMOTIONS = [
  { key: 'overwhelmed', emoji: '😮‍💨', label: 'Pressure',      cat: 'Calm',   subtitle: 'For when everything feels like too much.' },
  { key: 'numb',        emoji: '🌫️',  label: 'Foggy',         cat: 'Rhythm', subtitle: 'For when the mind goes quiet.' },
  { key: 'frustrated',  emoji: '🪨',   label: 'Mental weight', cat: 'Rhythm', subtitle: 'For when the weight is hard to carry.' },
  { key: 'low_energy',  emoji: '😔',   label: 'Low energy',    cat: 'Calm',   subtitle: 'For when the pace has slowed.' },
  { key: 'anxious',     emoji: '😰',   label: 'Inner noise',   cat: 'Calm',   subtitle: "For when the noise doesn't stop." },
] as const;
type EmotionKey = typeof EMOTIONS[number]['key'];

// ─── Adaptive emotional copy per emotion state ────────────────────────────────
const EMOTION_ADAPTIVE_PT: Record<EmotionKey, { eyebrow: string; hint: string }> = {
  overwhelmed: { eyebrow: 'Para respirar um pouco.',    hint: 'O peso não precisa ser carregado sozinho.' },
  numb:        { eyebrow: 'Para momentos assim.',       hint: 'Às vezes o silêncio já faz espaço.' },
  frustrated:  { eyebrow: 'Para desacelerar.',          hint: 'O peso mental também pede espaço.' },
  low_energy:  { eyebrow: 'Leveza primeiro.',           hint: 'Sem pressão. Só presença.' },
  anxious:     { eyebrow: 'Um pouco de calma.',         hint: 'O ruído diminui. O espaço continua aqui.' },
};
const EMOTION_ADAPTIVE_EN: Record<EmotionKey, { eyebrow: string; hint: string }> = {
  overwhelmed: { eyebrow: 'For a moment to breathe.',   hint: 'The pressure doesn\'t have to be carried alone.' },
  numb:        { eyebrow: 'For moments like this.',     hint: 'Sometimes silence makes room.' },
  frustrated:  { eyebrow: 'To slow down a little.',    hint: 'Mental weight also needs room to breathe.' },
  low_energy:  { eyebrow: 'Lightness first.',           hint: 'No pressure. Just presence.' },
  anxious:     { eyebrow: 'A little calm.',             hint: 'The noise quiets. The space remains.' },
};
const EMOTION_ADAPTIVE_ES: Record<EmotionKey, { eyebrow: string; hint: string }> = {
  overwhelmed: { eyebrow: 'Para respirar un momento.',   hint: 'El peso no necesita cargarse solo.' },
  numb:        { eyebrow: 'Para momentos así.',           hint: 'A veces el silencio ya abre espacio.' },
  frustrated:  { eyebrow: 'Para desacelerar.',            hint: 'El peso también necesita su espacio.' },
  low_energy:  { eyebrow: 'Sin prisa.',                   hint: 'Solo presencia. Nada más.' },
  anxious:     { eyebrow: 'Un poco de calma.',            hint: 'El ruido se aquieta. El espacio sigue aquí.' },
};
const EMOTION_ADAPTIVE_DE: Record<EmotionKey, { eyebrow: string; hint: string }> = {
  overwhelmed: { eyebrow: 'Für einen Moment zum Durchatmen.',  hint: 'Der Druck muss nicht alleine getragen werden.' },
  numb:        { eyebrow: 'Für Momente wie diesen.',           hint: 'Manchmal schafft Stille Raum.' },
  frustrated:  { eyebrow: 'Um ein wenig langsamer zu werden.', hint: 'Innere Schwere braucht auch Platz zum Atmen.' },
  low_energy:  { eyebrow: 'Leichtigkeit zuerst.',              hint: 'Kein Druck. Nur Präsenz.' },
  anxious:     { eyebrow: 'Ein bisschen Ruhe.',                hint: 'Das Rauschen wird leiser. Der Raum bleibt.' },
};

// ─── Continuity phrases (Problem 3 + 7) ──────────────────────────────────────
const CONTINUITY_PT = [
  'Voltar também é progresso.',
  'Menos ruído. Mais presença.',
  'Nem todo cansaço precisa virar culpa.',
  'Você não precisa correr para recomeçar.',
  'Seu ritmo também merece respeito.',
  'Há dias que pedem silêncio.',
  'Pausar não é desaparecer.',
  'Pequenos retornos contam.',
  'Seu espaço continua aqui.',
  'Nem tudo precisa ser resolvido agora.',
  'Algo está evoluindo silenciosamente.',
  'Amanhã algo novo chega.',
];
const CONTINUITY_EN = [
  'Returning is also progress.',
  'Less noise. More presence.',
  'Not every exhaustion needs to become guilt.',
  "You don't have to rush to begin again.",
  'Your rhythm deserves respect too.',
  'Some days ask for silence.',
  'Pausing is not disappearing.',
  'Small returns count.',
  'Your space is still here.',
  'Not everything needs to be resolved right now.',
  'Something is quietly evolving.',
  'Something new arrives tomorrow.',
];
const CONTINUITY_ES = [
  'Volver también es avanzar.',
  'Menos ruido. Más presencia.',
  'No todo cansancio necesita convertirse en culpa.',
  'No necesitas correr para volver a empezar.',
  'Tu ritmo también merece respeto.',
  'Hay días que piden silencio.',
  'Pausar no es desaparecer.',
  'Los pequeños regresos cuentan.',
  'Tu espacio sigue aquí.',
  'No todo necesita resolverse ahora.',
  'Algo está evolucionando en silencio.',
  'Mañana llega algo nuevo.',
];

const CONTINUITY_FR = [
  'Revenir, c\'est aussi avancer.',
  'Moins de bruit. Plus de présence.',
  'Toute fatigue n\'a pas besoin de devenir culpabilité.',
  'Tu n\'as pas besoin de te précipiter pour recommencer.',
  'Ton rythme mérite aussi du respect.',
  'Certains jours demandent le silence.',
  'Faire une pause, ce n\'est pas disparaître.',
  'Les petits retours comptent.',
  'Ton espace est toujours là.',
  'Tout n\'a pas besoin d\'être résolu maintenant.',
  'Quelque chose évolue tranquillement.',
  'Quelque chose de nouveau arrive demain.',
];
const CONTINUITY_DE = [
  'Zurückkehren ist auch Fortschritt.',
  'Weniger Rauschen. Mehr Präsenz.',
  'Nicht jede Erschöpfung muss zu Schuldgefühlen werden.',
  'Du musst dich nicht beeilen, um neu anzufangen.',
  'Dein Rhythmus verdient auch Respekt.',
  'Manche Tage brauchen Stille.',
  'Pausieren ist kein Verschwinden.',
  'Kleine Rückkehren zählen.',
  'Dein Raum ist noch hier.',
  'Nicht alles muss jetzt gelöst werden.',
  'Etwas entwickelt sich still.',
  'Morgen kommt etwas Neues.',
];

function getContinuityPhrase(day: number, language: string): string {
  const phrases = language === 'pt' ? CONTINUITY_PT : language === 'es' ? CONTINUITY_ES : language === 'fr' ? CONTINUITY_FR : language === 'de' ? CONTINUITY_DE : CONTINUITY_EN;
  return phrases[day % phrases.length]!;
}

// ─── Day-range progressive depth phrases (Corrections 5 + 11) ────────────────
const DAY_RANGE_PT: Array<[number, number, string]> = [
  [1,  7,  'Acolhimento. Descompressão. Silêncio.'],
  [8,  20, 'Clareza começa aqui. Devagar.'],
  [21, 45, 'Identidade e presença. Algo está se formando.'],
  [46, Infinity, 'Expansão. O ritmo ganhou forma.'],
];
const DAY_RANGE_EN: Array<[number, number, string]> = [
  [1,  7,  'Welcome. Decompression. Quiet presence.'],
  [8,  20, 'Clarity begins here. Slowly.'],
  [21, 45, 'Identity and presence. Something is forming.'],
  [46, Infinity, 'Expansion. The rhythm has taken shape.'],
];
const DAY_RANGE_ES: Array<[number, number, string]> = [
  [1,  7,  'Acogida. Descompresión. Silencio.'],
  [8,  20, 'La claridad empieza aquí. Despacio.'],
  [21, 45, 'Identidad y presencia. Algo está tomando forma.'],
  [46, Infinity, 'Expansión. El ritmo ya tiene forma.'],
];
const DAY_RANGE_FR: Array<[number, number, string]> = [
  [1,  7,  'Accueil. Décompression. Présence tranquille.'],
  [8,  20, 'La clarté commence ici. Doucement.'],
  [21, 45, 'Identité et présence. Quelque chose se forme.'],
  [46, Infinity, 'Expansion. Le rythme a pris forme.'],
];
const DAY_RANGE_DE: Array<[number, number, string]> = [
  [1,  7,  'Ankommen. Entlasten. Leise präsent sein.'],
  [8,  20, 'Klarheit beginnt hier. Langsam.'],
  [21, 45, 'Identität und Präsenz. Etwas nimmt Form an.'],
  [46, Infinity, 'Entfaltung. Der Rhythmus hat seine Form gefunden.'],
];

// ─── Emotional pause interludes — every 5 cards (Problem 3) ──────────────────
const PAUSE_PT = [
  'Pare alguns segundos antes do próximo.',
  'Seu foco muda quando sua mente desacelera.',
  'Nem todo silêncio precisa ser preenchido.',
  'Você não precisa absorver tudo agora.',
  'Algumas mudanças acontecem devagar.',
  'Volte quando sua mente pedir menos pressão.',
];
const PAUSE_EN = [
  'Take a few seconds before the next one.',
  'Your focus shifts when your mind slows down.',
  "Not every silence needs to be filled.",
  "You don't have to absorb everything right now.",
  'Some changes happen slowly.',
  'Come back when your mind asks for less pressure.',
];
const PAUSE_ES = [
  'Tómate unos segundos antes del siguiente.',
  'Tu enfoque cambia cuando tu mente desacelera.',
  'No todo silencio necesita llenarse.',
  'No tienes que absorber todo ahora.',
  'Algunos cambios suceden despacio.',
  'Vuelve cuando tu mente pida menos presión.',
];
const PAUSE_FR = [
  'Prends quelques secondes avant le prochain.',
  'Ton focus change quand ton esprit ralentit.',
  'Tout silence n\'a pas besoin d\'être rempli.',
  'Tu n\'as pas à tout absorber maintenant.',
  'Certains changements arrivent lentement.',
  'Reviens quand ton esprit demande moins de pression.',
];
const PAUSE_DE = [
  'Nimm dir ein paar Sekunden vor dem nächsten.',
  'Dein Fokus verändert sich, wenn dein Kopf langsamer wird.',
  'Nicht jede Stille muss gefüllt werden.',
  'Du musst nicht alles auf einmal aufnehmen.',
  'Manche Veränderungen geschehen langsam.',
  'Komm zurück, wenn dein Kopf weniger Druck braucht.',
];

function EmotionalPause({ index, language }: { index: number; language: string }) {
  const phrases = language === 'pt' ? PAUSE_PT : language === 'es' ? PAUSE_ES : language === 'fr' ? PAUSE_FR : language === 'de' ? PAUSE_DE : PAUSE_EN;
  const phrase = phrases[Math.floor(index / 5) % phrases.length]!;
  return (
    <View style={{ alignItems: 'center', paddingVertical: 20, paddingHorizontal: 32, opacity: 0.34 }}>
      <Text style={{ fontSize: 12, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center', lineHeight: 19, letterSpacing: 0.2 }}>
        {phrase}
      </Text>
    </View>
  );
}

// ─── Category emotional headers ───────────────────────────────────────────────
const CATEGORY_HEADERS: Record<string, { pt: string; en: string; es: string; fr: string; de: string }> = {
  Focus:      { pt: 'Voltar para uma coisa de cada vez.',    en: 'Back to one thing at a time.',                  es: 'Una cosa a la vez.',                            fr: 'Revenir à une chose à la fois.',               de: 'Zurück zu einer Sache nach der anderen.' },
  Calm:       { pt: 'Seu ritmo não precisa correr.',         en: 'Your rhythm doesn\'t need to rush.',            es: 'Tu ritmo no necesita correr.',                  fr: 'Ton rythme n\'a pas besoin de se précipiter.',  de: 'Dein Rhythmus muss sich nicht beeilen.' },
  Rhythm:     { pt: 'Para dias em que tudo parece demais.',  en: 'For days when everything feels like too much.', es: 'Para cuando todo pesa demasiado.',               fr: 'Pour les jours où tout semble trop.',           de: 'Für Tage, an denen alles zu viel erscheint.' },
  Discipline: { pt: 'Constância sem violência.',             en: 'Consistency without force.',                    es: 'Constancia sin violencia.',                     fr: 'Constance sans force.',                        de: 'Beständigkeit ohne Zwang.' },
  Clarity:    { pt: 'Silêncio também é produtividade.',      en: 'Silence is also productivity.',                 es: 'El silencio también es avanzar.',               fr: 'Le silence est aussi de la productivité.',     de: 'Stille ist auch Produktivität.' },
  Courage:    { pt: 'O cansaço e o medo podem coexistir.',  en: 'Exhaustion and fear can coexist.',              es: 'El cansancio y el miedo pueden coexistir.',     fr: 'L\'épuisement et la peur peuvent coexister.',  de: 'Erschöpfung und Angst können nebeneinander bestehen.' },
  Rest:       { pt: 'Nem toda pausa atrasa.',                en: 'Not every pause delays.',                       es: 'No toda pausa retrasa.',                        fr: 'Toute pause ne retarde pas.',                  de: 'Nicht jede Pause verzögert.' },
  Momentum:   { pt: 'Um passo de cada vez é o suficiente.', en: 'One step at a time is enough.',                 es: 'Un paso a la vez es suficiente.',               fr: 'Un pas à la fois est suffisant.',              de: 'Eine Sache nach der anderen ist genug.' },
};

function getDayRangePhrase(day: number, language: string): string {
  const ranges = language === 'pt' ? DAY_RANGE_PT : language === 'es' ? DAY_RANGE_ES : language === 'fr' ? DAY_RANGE_FR : language === 'de' ? DAY_RANGE_DE : DAY_RANGE_EN;
  for (const [min, max, phrase] of ranges) {
    if (day >= min && day <= max) return phrase;
  }
  return ranges[ranges.length - 1]![2];
}

// ─── Scale micro-interaction card (Prompt 7, correction 7) ──────────────────
function ScaleCard({ children, onPress, cardStyle }: { children: React.ReactNode; onPress: () => void; cardStyle?: any }) {
  const scale   = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const handleIn = () => {
    Animated.parallel([
      Animated.spring(scale,   { toValue: 0.975, useNativeDriver: true, speed: 35, bounciness: 0 }),
      Animated.timing(opacity, { toValue: 0.88,  useNativeDriver: true, duration: 90 }),
    ]).start();
  };
  const handleOut = () => {
    Animated.parallel([
      Animated.spring(scale,   { toValue: 1, useNativeDriver: true, speed: 35, bounciness: 0 }),
      Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 200, easing: Easing.out(Easing.sin) }),
    ]).start();
  };
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <TouchableOpacity onPress={onPress} onPressIn={handleIn} onPressOut={handleOut} activeOpacity={1} style={cardStyle}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Premium card fade-in (remonta via key no foco para replay) ───────────────
function FadeInCard({ children, delay = 0, breathe = false }: { children: React.ReactNode; delay?: number; breathe?: boolean }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;
  const breatheY   = useRef(new Animated.Value(0)).current;
  const mounted    = useRef(true);

  useEffect(() => { return () => { mounted.current = false; }; }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 480, delay, easing: Easing.out(Easing.sin), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 480, delay, easing: Easing.out(Easing.sin), useNativeDriver: true }),
    ]).start(() => {
      if (!breathe || !mounted.current) return;
      const loop = () => {
        if (!mounted.current) return;
        Animated.sequence([
          Animated.timing(breatheY, { toValue: -1.5, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(breatheY, { toValue: 0,    duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]).start(({ finished }) => { if (finished && mounted.current) loop(); });
      };
      loop();
    });
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: Animated.add(translateY, breatheY) }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Profile → preferred category affinity ───────────────────────────────────
const PROFILE_PREFERRED_CATS: Record<string, string[]> = {
  focus:      ['Focus', 'Discipline', 'Clarity', 'Momentum'],
  calm:       ['Calm', 'Rest', 'Rhythm'],
  confidence: ['Courage', 'Momentum', 'Discipline'],
  burnout:    ['Rest', 'Calm', 'Rhythm'],
};

const PROFILE_ALL_HEADERS: Record<string, { pt: string; en: string; es: string; fr: string; de: string }> = {
  focus:      { pt: 'Uma coisa de cada vez.',          en: 'One thing at a time.',               es: 'Una cosa a la vez.',             fr: 'Une chose à la fois.',                                    de: 'Eine Sache nach der anderen.' },
  calm:       { pt: 'Seu ritmo não precisa correr.',   en: 'Your rhythm doesn\'t need to rush.',  es: 'Tu ritmo no necesita correr.',   fr: 'Ton rythme n\'a pas besoin de se précipiter.',           de: 'Dein Rhythmus muss sich nicht beeilen.' },
  confidence: { pt: 'Pequenos passos, cumpridos.',     en: 'Small steps, kept.',                  es: 'Pequeños pasos, cumplidos.',     fr: 'Petites promesses tenues.',                               de: 'Kleine Schritte, gehalten.' },
  burnout:    { pt: 'Nem toda pausa atrasa.',           en: 'Not every pause delays.',             es: 'No toda pausa retrasa.',         fr: 'Toute pause ne retarde pas.',                            de: 'Nicht jede Pause verzögert.' },
};

// ─── Componente principal ─────────────────────────────────────────────────────
export default function MindsetScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const { t, lang } = useLanguage();
  const { profile } = useEmotionalProfile();
  const [activeCat, setActiveCat] = useState<string>('today');
  const userChangedCatRef = useRef(false);
  const [selected, setSelected] = useState<MindsetCard | null>(null);
  const [focusVersion, setFocusVersion] = useState(0);
  const [readCardIds, setReadCardIds] = useState<Set<string>>(new Set());
  const [recommendationState, setRecommendationState] = useState<'A' | 'B'>('A');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const recFadeAnim    = useRef(new Animated.Value(1)).current;
  const filterFadeAnim = useRef(new Animated.Value(1)).current;
  const catHeaderAnim  = useRef(new Animated.Value(1)).current;
  const ambientPulse   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(ambientPulse, { toValue: 0.3, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(ambientPulse, { toValue: 1,   duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]).start(({ finished }) => { if (finished) pulse(); });
    };
    pulse();
    return () => ambientPulse.stopAnimation();
  }, []);

  useFocusEffect(useCallback(() => {
    setFocusVersion(v => v + 1);
    getItem<string[]>('mindset_read_cards', []).then(ids => setReadCardIds(new Set(ids ?? [])));
    const today = getLocalDateKey();
    // Auto-set category from today's emotional state (only if user hasn't manually changed it)
    if (!userChangedCatRef.current) {
      getItem<DailyState>(StorageKeys.DAILY_STATE + '_' + today, null).then(state => {
        const cat = getStateCategory(state);
        if (cat) setActiveCat(cat);
      });
    }
    getItem<string>('mindset_recommendation_date', '').then(savedDate => {
      if (savedDate === today) {
        getItem<string>('mindset_recommendation_mood', '').then(mood => {
          if (mood) {
            setSelectedEmotion(mood as EmotionKey);
            setRecommendationState('B');
          } else {
            setRecommendationState('A');
            setSelectedEmotion(null);
          }
          recFadeAnim.setValue(1);
        });
      } else {
        setRecommendationState('A');
        setSelectedEmotion(null);
        recFadeAnim.setValue(1);
      }
    });
  }, []));

  const currentDay = progress.currentDay;

  // Return PT card title if available, fall back to EN data title
  const getCardTitle = (card: MindsetCard): string => {
    const key = `mindset.card.${card.id}.title` as any;
    const translated = t(key);
    return translated !== key ? translated : card.title;
  };

  // Return PT card content if available, fall back to EN data content
  const getCardContent = (card: MindsetCard): string => {
    const key = `mindset.card.${card.id}.content` as any;
    const translated = t(key);
    return translated !== key ? translated : card.content;
  };

  const archiveLimit = getArchiveLimit(currentDay);

  const isCardLocked = (card: MindsetCard): boolean => {
    if (activeCat === 'today') return false;
    return (categoryIndexMap[card.id] ?? 0) >= archiveLimit;
  };

  const recommendedCardsV2 = useMemo(() => {
    if (!selectedEmotion) return [];
    const emotion = EMOTIONS.find(e => e.key === selectedEmotion);
    if (!emotion) return [];
    const todayCardIds = new Set(
      sortedAll.filter(c => cardDayMap[c.id] === currentDay).map(c => c.id)
    );
    const catCards = mindsetCards.filter(
      c => c.category === emotion.cat
        && !todayCardIds.has(c.id)
        && (categoryIndexMap[c.id] ?? 0) < archiveLimit
    );
    const unread = catCards.filter(c => !readCardIds.has(c.id));
    const read   = catCards.filter(c =>  readCardIds.has(c.id));
    return [...unread, ...read].slice(0, 3);
  }, [selectedEmotion, readCardIds, currentDay, archiveLimit]);

  const visible = useMemo(() => {
    if (activeCat === 'today') {
      const todayCards = sortedAll.filter(c => cardDayMap[c.id] === currentDay);
      return todayCards.slice(0, ACCESS_RULES.premium.dailyInsightsLimit);
    }
    if (activeCat === 'all') {
      const allUnlocked = sortedAll.filter(c => (categoryIndexMap[c.id] ?? 0) < archiveLimit);
      if (!profile) return allUnlocked;
      const preferred = PROFILE_PREFERRED_CATS[profile] ?? [];
      return [...allUnlocked].sort((a, b) => {
        const aPreferred = preferred.includes(a.category) ? 0 : 1;
        const bPreferred = preferred.includes(b.category) ? 0 : 1;
        return aPreferred - bPreferred;
      });
    }
    const catCards = mindsetCards.filter(c => c.category === activeCat);
    const unlocked = catCards.filter(c => (categoryIndexMap[c.id] ?? 0) < archiveLimit);
    const future   = catCards.filter(c => (categoryIndexMap[c.id] ?? 0) >= archiveLimit);
    return [...unlocked, ...future.slice(0, 2)];
  }, [activeCat, currentDay, archiveLimit, profile]);

  const handleSelectEmotion = async (emotionKey: EmotionKey) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setItem('mindset_recommendation_date', getLocalDateKey());
    await setItem('mindset_recommendation_mood', emotionKey);
    Animated.timing(recFadeAnim, { toValue: 0, duration: 200, easing: Easing.out(Easing.sin), useNativeDriver: true }).start(() => {
      setSelectedEmotion(emotionKey);
      setRecommendationState('B');
      Animated.timing(recFadeAnim, { toValue: 1, duration: 450, easing: Easing.out(Easing.sin), useNativeDriver: true }).start();
    });
  };

  const handleCatChange = (newCat: string) => {
    if (newCat === activeCat) return;
    userChangedCatRef.current = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    catHeaderAnim.setValue(0);
    Animated.timing(filterFadeAnim, { toValue: 0, duration: 160, easing: Easing.out(Easing.sin), useNativeDriver: true }).start(() => {
      setActiveCat(newCat);
      Animated.timing(catHeaderAnim, { toValue: 1, duration: 420, easing: Easing.out(Easing.sin), useNativeDriver: true }).start();
      Animated.timing(filterFadeAnim, { toValue: 1, duration: 90, useNativeDriver: true }).start();
    });
  };

  const handlePress = (card: MindsetCard) => {
    if (isCardLocked(card)) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(card);
    if (!readCardIds.has(card.id)) {
      const next = new Set(readCardIds).add(card.id);
      setReadCardIds(next);
      setItem('mindset_read_cards', Array.from(next));
    }
  };

  return (
    <View style={styles.container}>
      {/* Ambient atmospheric layers — enveloping warm environmental glow */}
      <View pointerEvents="none" style={styles.ambientLayer} />
      <Animated.View pointerEvents="none" style={[styles.ambientLayerMid, { opacity: ambientPulse }]} />
      <View pointerEvents="none" style={styles.ambientLayerBottom} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} decelerationRate="normal" scrollEventThrottle={16}>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>{t('mindset.eyebrow')}</Text>
          <Text style={styles.title}>{t('mindset.title')}</Text>
          <Text style={styles.subtitle}>
            {t('mindset.subtitle.premium')}
          </Text>
        </View>

        {/* Filtros de categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats}>
          {/* Today — primeiro */}
          <TouchableOpacity
            style={[styles.catPill, activeCat === 'today' && styles.catPillToday]}
            onPress={() => handleCatChange('today')}
          >
            <Ionicons name="today-outline" size={13} color={activeCat === 'today' ? Colors.charcoal : Colors.textMuted} />
            <Text style={[styles.catLabel, activeCat === 'today' && styles.catLabelToday]}>{t('mindset.filter.today')}</Text>
          </TouchableOpacity>

          {mindsetCategories.map(cat => {
            const active = activeCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.catPill,
                  active && { backgroundColor: catBg[cat.id], borderColor: catColors[cat.id] },
                ]}
                onPress={() => handleCatChange(active ? 'today' : cat.id)}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={12}
                  color={active ? catColors[cat.id] : Colors.textMuted}
                />
                <Text style={[styles.catLabel, active && { color: catColors[cat.id] }]}>
                  {t('mindset.cat.' + cat.id)}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* All */}
          <TouchableOpacity
            style={[
              styles.catPill,
              activeCat === 'all' && styles.catPillActive,
            ]}
            onPress={() => handleCatChange('all')}
          >
            <Text style={[styles.catLabel, activeCat === 'all' && styles.catLabelActive]}>
              {t('mindset.all')}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Category emotional header — shows when a specific category is active */}
        {activeCat !== 'today' && activeCat !== 'all' && CATEGORY_HEADERS[activeCat] && (
          <Animated.View style={{ opacity: catHeaderAnim }}>
            <Text style={{ fontSize: 13, color: Colors.textMuted, fontStyle: 'italic', paddingHorizontal: 20, paddingTop: 6, paddingBottom: 2, opacity: 0.7, lineHeight: 20 }}>
              {lang === 'pt' ? CATEGORY_HEADERS[activeCat].pt : lang === 'es' ? CATEGORY_HEADERS[activeCat].es : lang === 'fr' ? CATEGORY_HEADERS[activeCat].fr : lang === 'de' ? CATEGORY_HEADERS[activeCat].de : CATEGORY_HEADERS[activeCat].en}
            </Text>
          </Animated.View>
        )}

        {/* Profile-aware atmospheric header — shows in "all" view when profile is set */}
        {activeCat === 'all' && profile && PROFILE_ALL_HEADERS[profile] && (
          <Animated.View style={{ opacity: catHeaderAnim }}>
            <Text style={{ fontSize: 13, color: Colors.textMuted, fontStyle: 'italic', paddingHorizontal: 20, paddingTop: 6, paddingBottom: 2, opacity: 0.65, lineHeight: 20 }}>
              {lang === 'pt' ? PROFILE_ALL_HEADERS[profile].pt : lang === 'es' ? PROFILE_ALL_HEADERS[profile].es : lang === 'fr' ? PROFILE_ALL_HEADERS[profile].fr : lang === 'de' ? PROFILE_ALL_HEADERS[profile].de : PROFILE_ALL_HEADERS[profile].en}
            </Text>
          </Animated.View>
        )}

        {/* Cards — staggered fade-in por foco, fade-on-filter */}
        <Animated.View style={[styles.cards, { opacity: filterFadeAnim }]}>
          {visible.map((card, index) => {
            const day     = cardDayMap[card.id] ?? 0;
            const isToday = day === currentDay && activeCat === 'today';

            const locked = isCardLocked(card);
            return (
              <FadeInCard key={`${card.id}-${focusVersion}`} delay={Math.min(index, 6) * 80} breathe={isToday}>
              <ScaleCard
                onPress={() => handlePress(card)}
                cardStyle={[
                styles.card,
                isToday && styles.cardToday,
                locked && {
                  opacity: (categoryIndexMap[card.id] ?? 0) === archiveLimit ? 0.58 : 0.42,
                },
              ]}
              >
                {/* Stripe superior colorida */}
                <View style={[styles.cardStripe, { backgroundColor: catBg[card.category] }]}>
                  <View style={styles.cardMeta}>
                    <View style={[styles.catDot, { backgroundColor: catColors[card.category] }]} />
                    <Text style={[styles.cardCat, { color: catColors[card.category] }]}>
                      {t('mindset.cat.' + card.category)}
                    </Text>
                    <Text style={styles.readTime}>{card.readTime} min</Text>

                    {/* Badge TODAY */}
                    {isToday && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayText}>{t('mindset.badge.today')}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Corpo do card */}
                <View style={[styles.cardBody, isToday && styles.cardBodyToday]}>
                  <Text style={[styles.cardTitle, locked && styles.cardTitleLocked]}>
                    {getCardTitle(card)}
                  </Text>
                  {locked ? (
                    <Text style={styles.lockedHint}>
                      {lang === 'pt' ? 'Chega no momento certo.' : lang === 'es' ? 'Llega en el momento justo.' : lang === 'fr' ? 'Arrive au bon moment.' : lang === 'de' ? 'Kommt zur richtigen Zeit.' : 'Arrives at the right moment.'}
                    </Text>
                  ) : isToday ? (
                    <>
                      <Text style={styles.cardPreview} numberOfLines={2}>
                        {getCardContent(card)}
                      </Text>
                      <Text style={styles.continuityAfterToday}>
                        {lang === 'pt' ? 'Talvez isso faça mais sentido amanhã.' : lang === 'es' ? 'Quizás mañana cobre más sentido.' : lang === 'fr' ? 'Peut-être que ça prendra plus de sens demain.' : lang === 'de' ? 'Vielleicht fühlt sich das morgen stimmiger an.' : 'This might make more sense tomorrow.'}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.cardPreview} numberOfLines={1}>
                      {getCardContent(card)}
                    </Text>
                  )}
                </View>
              </ScaleCard>
              </FadeInCard>
            );
          }).flatMap((el, index) => {
            if ((index + 1) % 5 === 0 && index < visible.length - 1) {
              return [el, <EmotionalPause key={`pause-${index}`} index={index} language={lang} />];
            }
            return el;
          })}

          {/* Empty state */}
          {visible.length === 0 && (
            <View style={styles.empty}>
              <Ionicons
                name={activeCat === 'today' ? 'today-outline' : 'bulb-outline'}
                size={36}
                color={Colors.textMuted}
              />
              <Text style={styles.emptyTitle}>
                {activeCat === 'today' ? t('mindset.empty.today.title') : t('mindset.empty.lib.title')}
              </Text>
              <Text style={styles.emptyText}>
                {activeCat === 'today' ? t('mindset.empty.today.sub') : t('mindset.empty.lib.sub')}
              </Text>
            </View>
          )}

          {/* Blurred next-day preview (today tab only) */}
          {activeCat === 'today' && (() => {
            const nextCard = sortedAll.find(c => (cardDayMap[c.id] ?? 0) === currentDay + 1);
            if (!nextCard) return null;
            return (
              <View style={{ opacity: 0.28, marginTop: 4 }} pointerEvents="none">
                <View style={[styles.card, { borderStyle: 'dashed' }]}>
                  <View style={[styles.cardStripe, { backgroundColor: catBg[nextCard.category] }]}>
                    <View style={styles.cardMeta}>
                      <View style={[styles.catDot, { backgroundColor: catColors[nextCard.category] }]} />
                      <Text style={[styles.cardCat, { color: catColors[nextCard.category] }]}>
                        {t('mindset.cat.' + nextCard.category)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={[styles.cardTitle, { color: Colors.textMuted }]} numberOfLines={1}>
                      {getCardTitle(nextCard)}
                    </Text>
                    <Text style={styles.lockedHint}>
                      {lang === 'pt' ? 'Seu próximo momento chega amanhã.' : lang === 'es' ? 'Tu próximo momento llega mañana.' : lang === 'fr' ? 'Ton prochain moment arrive demain.' : lang === 'de' ? 'Der nächste Moment kommt morgen.' : 'Your next moment arrives tomorrow.'}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })()}
        </Animated.View>

        {/* ── Day-range inter-section phrase ─────────────────────────────────── */}
        <FadeInCard key={`drp-${focusVersion}-${activeCat}`} delay={Math.min(visible.length, 6) * 80 + 120}>
          <Text style={styles.dayRangePhrase}>{getDayRangePhrase(currentDay, lang)}</Text>
        </FadeInCard>


        {/* ── For You Today — recomendação interativa ──────────────────────── */}
        <Animated.View style={{ opacity: recFadeAnim, marginTop: Spacing.md }}>

            {/* ── ESTADO A: Pergunta ───────────────────────────────────────── */}
            {recommendationState === 'A' && (
              <View style={{ paddingHorizontal: Spacing.xl }}>
                <Text style={{ fontSize: 11, letterSpacing: 1.2, color: '#C9973A', fontWeight: '600', marginBottom: 12, opacity: 0.9 }}>
                  {t('mindset.foryou.title')}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#3D3530', lineHeight: 26, marginBottom: 16 }}>
                  {t('mindset.foryou.question')}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                  {EMOTIONS.map((emotion, idx) => {
                    const emoRadius = [20, 18, 19, 18, 20][idx] ?? 18;
                    const emoPad    = [17, 16, 16, 17, 16][idx] ?? 16;
                    return (
                      <TouchableOpacity
                        key={emotion.key}
                        style={{
                          width: '47%',
                          backgroundColor: '#F9F6F0',
                          borderRadius: emoRadius,
                          padding: emoPad,
                          alignItems: 'center',
                          shadowColor: '#C9A84C',
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.09,
                          shadowRadius: 14,
                          elevation: 2,
                          borderWidth: 1,
                          borderColor: 'rgba(201,168,76,0.14)',
                        }}
                        onPress={() => handleSelectEmotion(emotion.key)}
                        activeOpacity={0.88}
                      >
                        <Text style={{ fontSize: 20, marginBottom: 6, opacity: 0.88 }}>{emotion.emoji}</Text>
                        <Text style={{ fontSize: 13, fontWeight: '500', color: '#4A4440', letterSpacing: 0.1 }}>{t('mindset.emotion.' + emotion.key)}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* ── ESTADO B: Cards recomendados ─────────────────────────────── */}
            {recommendationState === 'B' && selectedEmotion && (
              <>
                <View style={{ paddingHorizontal: Spacing.xl, marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#3D3530', marginBottom: 4, fontStyle: 'italic' }}>
                    {lang === 'pt'
                      ? EMOTION_ADAPTIVE_PT[selectedEmotion].eyebrow
                      : lang === 'es'
                      ? EMOTION_ADAPTIVE_ES[selectedEmotion].eyebrow
                      : lang === 'de'
                      ? EMOTION_ADAPTIVE_DE[selectedEmotion].eyebrow
                      : EMOTION_ADAPTIVE_EN[selectedEmotion].eyebrow}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'rgba(61,53,48,0.5)', lineHeight: 18 }}>
                    {t('mindset.emotion.' + selectedEmotion + '.sub')}
                  </Text>
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recommendedCardsV2}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{ paddingHorizontal: Spacing.xl }}
                  ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        width: SCREEN_WIDTH * 0.72,
                        backgroundColor: '#F9F6F0',
                        borderRadius: 16,
                        overflow: 'hidden',
                        shadowColor: '#1C1C1C',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.09,
                        shadowRadius: 10,
                        elevation: 3,
                      }}
                      onPress={() => handlePress(item)}
                      activeOpacity={0.85}
                    >
                      <View style={{ backgroundColor: catBg[item.category], paddingHorizontal: 14, paddingVertical: 9 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: catColors[item.category], marginRight: 6 }} />
                          <Text style={{ fontSize: 11, fontWeight: '600', color: catColors[item.category], flex: 1, textTransform: 'capitalize' }}>
                            {t('mindset.cat.' + item.category)}
                          </Text>
                          {readCardIds.has(item.id) ? (
                            <Ionicons name="checkmark-circle" size={14} color={Colors.gold} />
                          ) : (
                            <Text style={{ fontSize: 11, color: Colors.textMuted }}>{item.readTime} min</Text>
                          )}
                        </View>
                      </View>
                      <View style={{ padding: 14, gap: 5 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#3D3530', lineHeight: 20, letterSpacing: -0.2 }}>
                          {getCardTitle(item)}
                        </Text>
                        <Text style={{ fontSize: 12, color: Colors.textSecondary, lineHeight: 18 }} numberOfLines={2}>
                          {getCardContent(item)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                {selectedEmotion && (
                  <Text style={styles.adaptiveHint}>
                    {lang === 'pt'
                      ? EMOTION_ADAPTIVE_PT[selectedEmotion].hint
                      : lang === 'es'
                      ? EMOTION_ADAPTIVE_ES[selectedEmotion].hint
                      : lang === 'de'
                      ? EMOTION_ADAPTIVE_DE[selectedEmotion].hint
                      : EMOTION_ADAPTIVE_EN[selectedEmotion].hint}
                  </Text>
                )}
              </>
            )}

          </Animated.View>

        {/* ── Your Library ─────────────────────────────────────────────────── */}
          <FadeInCard key={`library-${focusVersion}`} delay={Math.min(visible.length, 6) * 80 + 180}>

            {/* Label — de-emphasized as secondary section */}
            <Text style={{
              fontSize: 10, letterSpacing: 1.4, color: Colors.textMuted,
              fontWeight: '600', marginBottom: 12, marginTop: 8, paddingHorizontal: 20,
              opacity: 0.7,
            }}>
              {t('mindset.library.title')}
            </Text>

            {/* Editorial grid — smaller, quieter, secondary feel */}
            <View style={{ paddingHorizontal: 16, gap: 10 }}>
              {([
                { key: 'mindset.lib.burnout',    emoji: '◯', cat: 'Calm',    pd: 16 },
                { key: 'mindset.lib.emotional',  emoji: '≈', cat: 'Rhythm',  pd: 13 },
                { key: 'mindset.lib.discipline', emoji: '✦', cat: 'Rhythm',  pd: 14 },
                { key: 'mindset.lib.detox',      emoji: '◐', cat: 'Clarity', pd: 11 },
                { key: 'mindset.lib.focus',      emoji: '◎', cat: 'Focus',   pd: 12 },
              ] as const).reduce<React.ReactNode[]>((acc, col, i, arr) => {
                if (i === 0) {
                  // Featured full-width first card — reduced weight
                  acc.push(
                    <TouchableOpacity
                      key={col.key}
                      style={{
                        width: '100%',
                        backgroundColor: catBg[col.cat] || '#F0F7F5',
                        borderRadius: 16,
                        padding: col.pd,
                        shadowColor: '#1C1C1C',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.03,
                        shadowRadius: 6,
                        elevation: 1,
                      }}
                      onPress={() => handleCatChange(col.cat)}
                      activeOpacity={0.85}
                    >
                      <Text style={{ fontSize: 16, marginBottom: 7 }}>{col.emoji}</Text>
                      <Text style={{ fontSize: 13, fontWeight: '600', color: '#3D3530', marginBottom: 4, lineHeight: 19 }}>
                        {t(col.key)}
                      </Text>
                      <Text style={{ fontSize: 10, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 15 }}>
                        {t((col.key + '.sub') as any)}
                      </Text>
                    </TouchableOpacity>
                  );
                } else if (i % 2 === 1) {
                  // Start a new row pair — compact
                  const next = arr[i + 1];
                  acc.push(
                    <View key={`row-${i}`} style={{ flexDirection: 'row', gap: 10 }}>
                      {[col, ...(next ? [next] : [])].map(item => (
                        <TouchableOpacity
                          key={item.key}
                          style={{
                            flex: 1,
                            backgroundColor: catBg[item.cat] || '#FAFAF8',
                            borderRadius: 14,
                            padding: item.pd,
                            shadowColor: '#1C1C1C',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.02,
                            shadowRadius: 4,
                            elevation: 1,
                          }}
                          onPress={() => handleCatChange(item.cat)}
                          activeOpacity={0.85}
                        >
                          <Text style={{ fontSize: 14, marginBottom: 6 }}>{item.emoji}</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#3D3530', marginBottom: 3, lineHeight: 17 }}>
                            {t(item.key)}
                          </Text>
                          <Text style={{ fontSize: 10, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 14 }}>
                            {t((item.key + '.sub') as any)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                }
                return acc;
              }, [])}
            </View>

            <Text style={{
              fontSize: 11, color: Colors.textMuted, fontStyle: 'italic',
              textAlign: 'center', paddingHorizontal: Spacing.xl,
              paddingTop: Spacing.md, paddingBottom: Spacing.sm, opacity: 0.5,
            }}>
              {lang === 'pt' ? 'Novos momentos chegam com o tempo.' : lang === 'es' ? 'Nuevos momentos llegan con el tiempo.' : lang === 'fr' ? 'De nouveaux moments arrivent avec le temps.' : lang === 'de' ? 'Neue Momente kommen mit der Zeit.' : 'New moments arrive with time.'}
            </Text>

          </FadeInCard>

      </ScrollView>

      {/* Modal de leitura */}
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <View style={[styles.catDot, { backgroundColor: catColors[selected.category] }]} />
              <Text style={[styles.modalCat, { color: catColors[selected.category] }]}>
                {t('mindset.cat.' + selected.category)}
              </Text>
              <Text style={styles.modalDay}>
                {(cardDayMap[selected.id] ?? 0) > 0 ? t('mindset.modal.day', { day: cardDayMap[selected.id] }) : t('mindset.modal.insight')}
              </Text>
              <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
                <View style={styles.closeIconWrap}>
                  <Ionicons name="close" size={18} color={Colors.textPrimary} />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{getCardTitle(selected)}</Text>
              <Text style={styles.modalTime}>{t('mindset.modal.minread', { n: selected.readTime })}</Text>
              <Text style={styles.modalBody}>{getCardContent(selected)}</Text>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 64 },
  ambientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: 'rgba(201,151,58,0.03)',
    zIndex: 0,
  },
  ambientLayerMid: {
    position: 'absolute',
    top: '38%',
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: 'rgba(201,151,58,0.018)',
    zIndex: 0,
  },
  ambientLayerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(201,151,58,0.02)',
    zIndex: 0,
  },

  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    backgroundColor: 'rgba(201,151,58,0.028)',
    shadowColor: '#C9973A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 32,
    elevation: 2,
  },
  eyebrow: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 1.8, marginBottom: Spacing.sm, opacity: 0.85 },
  title: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.black, color: Colors.textPrimary, marginBottom: 4, letterSpacing: -0.5 },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 20,
    letterSpacing: 0.2,
    opacity: 0.9,
  },
  continuityPhrase: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 18,
    opacity: 0.75,
  },
  adaptiveHint: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 18,
    paddingHorizontal: Spacing.xl,
    paddingTop: 14,
    opacity: 0.7,
  },
  dayRangePhrase: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: 'italic',
    letterSpacing: 0.3,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 36,
    paddingBottom: 18,
    opacity: 0.44,
  },

  cats: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.base, gap: Spacing.sm },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(201,151,58,0.13)',
    backgroundColor: '#F9F6F0',
  },
  catPillActive: { backgroundColor: '#2D2820', borderColor: '#2D2820' },
  catPillToday: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  catPillLocked: { opacity: 0.5 },
  catLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textMuted,
  },
  catLabelActive: { color: Colors.white },
  catLabelToday: { color: Colors.charcoal },
  catLabelLocked: { color: Colors.textMuted },

  cards: { paddingHorizontal: Spacing.xl, gap: 10 },

  card: {
    backgroundColor: '#F9F6F0',
    borderRadius: Radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201,151,58,0.12)',
    ...Shadows.card,
  },
  // Card do dia atual: borda dourada elegante
  cardToday: {
    borderColor: Colors.accent,
    borderWidth: 1.5,
    shadowColor: '#EFC94C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 6,
  },
  // Locked card: reduced opacity
  cardLocked: {
    opacity: 0.62,
  },

  cardStripe: { paddingHorizontal: Spacing.base, paddingVertical: 9 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  catDot: { width: 7, height: 7, borderRadius: 4 },
  cardCat: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, textTransform: 'capitalize', flex: 1 },
  readTime: { fontSize: Typography.sizes.xs, color: Colors.textMuted },

  // Badge TODAY — amarelo vibrante (Imagem 1)
  todayBadge: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  todayText: { fontSize: 9, fontWeight: Typography.weights.heavy, color: Colors.charcoal, letterSpacing: 1 },

  // Badge PRO
  proBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: Radii.full,
    borderWidth: 1, borderColor: Colors.border,
  },
  proText: { fontSize: 9, fontWeight: Typography.weights.bold, color: Colors.textMuted },

  cardBody: {
    paddingHorizontal: Spacing.base,
    paddingTop: 18,
    paddingBottom: Spacing.base,
    gap: 5,
  },
  cardBodyToday: {
    paddingTop: 22,
    paddingBottom: 20,
    paddingHorizontal: 18,
    gap: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  cardTitleLocked: { color: Colors.textMuted },
  cardPreview: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  lockedHint: { fontSize: Typography.sizes.xs, color: Colors.textMuted, fontStyle: 'italic' },
  continuityAfterToday: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 17,
    opacity: 0.65,
  },

  // Empty state
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // Library progression footer
  libraryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  libraryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  libraryRight: { flex: 1, gap: 3 },
  libraryTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  librarySub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    lineHeight: 17,
    fontStyle: 'italic',
  },

  // Coming Next card
  comingNextCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  comingNextEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  comingNextRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  comingNextItem: { fontSize: Typography.sizes.sm, color: Colors.textMuted, flex: 1 },

  // Premium Library card
  premiumLibCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    backgroundColor: '#1E1A14',
    borderRadius: Radii.xl,
    padding: 22,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(201,151,58,0.10)',
    shadowColor: '#C9973A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  premiumLibEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  premiumLibRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  premiumLibItem: { fontSize: Typography.sizes.sm, color: 'rgba(255,255,255,0.55)', flex: 1 },
  premiumLibCta: {
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(201,151,58,0.5)',
    borderRadius: Radii.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  premiumLibCtaText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '400',
    color: Colors.gold,
  },

  // Modal
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight, gap: Spacing.sm,
  },
  modalCat: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, textTransform: 'capitalize', flex: 1 },
  modalDay: { fontSize: Typography.sizes.xs, color: Colors.textMuted, fontWeight: Typography.weights.medium },
  closeBtn: { padding: Spacing.xs },
  closeIconWrap: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center',
  },
  modalContent: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: 60 },
  modalTitle: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.black, color: Colors.textPrimary, lineHeight: 36, marginBottom: Spacing.sm, letterSpacing: -0.5 },
  modalTime: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginBottom: Spacing.xl },
  modalBody: { fontSize: Typography.sizes.base, color: Colors.textSecondary, lineHeight: 28 },
});

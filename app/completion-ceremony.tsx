// ─── Completion Ceremony ─────────────────────────────────────────────────────
// Shown after every daily reset completion.
// Emotional bridge: completion → reflection → continuation → Today tab.
// Milestone days receive a stronger visual and copy variant.

import { useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing, Dimensions, StatusBar, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii } from '../theme';
import { usePersonalization } from '../hooks/usePersonalization';
import { useAnticipation } from '../hooks/useAnticipation';
import { useLanguage } from '../hooks/useLanguage';
import { isEs, isPt, isFr, isDe } from '../utils/langStore';

const { width } = Dimensions.get('window');

// ─── Milestone data ───────────────────────────────────────────────────────────

interface MilestoneCopy {
  label: string;
  title: string;
  sub: string;
}

const MILESTONE_COPY_EN: Record<number, MilestoneCopy> = {
  3:   { label: 'THREE DAYS',       title: 'Momentum is forming.',         sub: 'Three quiet returns begin to create a pattern.' },
  7:   { label: '7-DAY STREAK',     title: 'One full week.',               sub: 'Seven days of choosing yourself. The rhythm is forming.' },
  14:  { label: 'FOURTEEN DAYS',    title: 'This is becoming real.',       sub: 'You are no longer just starting. You are returning.' },
  21:  { label: 'THREE WEEKS',      title: 'Consistency is forming quietly.', sub: 'What started as effort is beginning to feel like you.' },
  30:  { label: 'THIRTY DAYS',      title: 'A new rhythm lives here.',     sub: 'Thirty resets. One quieter, stronger version of you.' },
  60:  { label: 'SIXTY DAYS',       title: 'You are building identity.',   sub: 'Small choices have become part of who you are becoming.' },
  90:  { label: 'NINETY DAYS',      title: 'This is transformation.',      sub: 'What once required effort now begins to feel like you.' },
  100: { label: 'ONE HUNDRED DAYS', title: 'One hundred returns.',         sub: 'Each one mattered. Each one still does.' },
  180: { label: 'HALF A YEAR',      title: 'You stayed with yourself.',    sub: 'Quiet consistency has changed the shape of your days.' },
  365: { label: 'ONE YEAR',         title: 'You rebuilt something real.',  sub: 'One year of returning. One year of becoming.' },
};

const MILESTONE_COPY_PT: Record<number, MilestoneCopy> = {
  3:   { label: 'TRÊS DIAS',         title: 'Um ritmo está se formando.',          sub: 'Três retornos quietos começam a criar um padrão.' },
  7:   { label: '7 DIAS SEGUIDOS',   title: 'Uma semana inteira.',                 sub: 'Sete dias escolhendo você mesma. O ritmo está se formando.' },
  14:  { label: 'QUATORZE DIAS',     title: 'Isso está se tornando real.',         sub: 'Você não está mais apenas começando. Você está voltando.' },
  21:  { label: 'TRÊS SEMANAS',      title: 'A constância está se formando.',      sub: 'O que começou como esforço está começando a parecer você.' },
  30:  { label: 'TRINTA DIAS',       title: 'Um novo ritmo vive aqui.',            sub: 'Trinta resets. Uma versão mais quieta e forte de você.' },
  60:  { label: 'SESSENTA DIAS',     title: 'Você está construindo identidade.',   sub: 'Pequenas escolhas se tornaram parte de quem você está se tornando.' },
  90:  { label: 'NOVENTA DIAS',      title: 'Isso é transformação.',               sub: 'O que antes exigia esforço agora começa a parecer você.' },
  100: { label: 'CEM DIAS',          title: 'Cem retornos.',                       sub: 'Cada um importou. Cada um ainda importa.' },
  180: { label: 'MEIO ANO',          title: 'Você ficou com você mesma.',          sub: 'A constância quieta mudou a forma dos seus dias.' },
  365: { label: 'UM ANO',            title: 'Você reconstruiu algo real.',         sub: 'Um ano voltando. Um ano se tornando.' },
};

const MILESTONE_COPY_ES: Record<number, MilestoneCopy> = {
  3:   { label: 'TRES DÍAS',          title: 'El impulso está tomando forma.',    sub: 'Tres regresos tranquilos comienzan a crear un patrón.' },
  7:   { label: '7 DÍAS SEGUIDOS',    title: 'Una semana entera.',                sub: 'Siete días eligiéndote. El ritmo está tomando forma.' },
  14:  { label: 'CATORCE DÍAS',       title: 'Esto se está volviendo real.',      sub: 'Ya no estás solo empezando. Estás volviendo.' },
  21:  { label: 'TRES SEMANAS',       title: 'La constancia se forma en silencio.', sub: 'Lo que empezó como esfuerzo está empezando a sentirse como tú.' },
  30:  { label: 'TREINTA DÍAS',       title: 'Un nuevo ritmo vive aquí.',         sub: 'Treinta resets. Una versión más tranquila y más fuerte de ti.' },
  60:  { label: 'SESENTA DÍAS',       title: 'Estás construyendo identidad.',     sub: 'Las pequeñas elecciones se han vuelto parte de quien estás siendo.' },
  90:  { label: 'NOVENTA DÍAS',       title: 'Esto es transformación.',           sub: 'Lo que antes requería esfuerzo empieza a sentirse como tú.' },
  100: { label: 'CIEN DÍAS',          title: 'Cien regresos.',                    sub: 'Cada uno importó. Cada uno sigue importando.' },
  180: { label: 'MEDIO AÑO',          title: 'Te quedaste contigo mismo.',        sub: 'La constancia silenciosa cambió la forma de tus días.' },
  365: { label: 'UN AÑO',             title: 'Reconstruiste algo real.',          sub: 'Un año volviendo. Un año convirtiéndote.' },
};

const MILESTONE_COPY_FR: Record<number, MilestoneCopy> = {
  3:   { label: 'TROIS JOURS',              title: "L'élan se forme.",                         sub: 'Trois retours tranquilles commencent à créer un rythme.' },
  7:   { label: '7 JOURS',                  title: 'Une semaine entière.',                     sub: 'Sept jours à te choisir. Le rythme est là.' },
  14:  { label: 'DEUX SEMAINES',            title: 'Ceci devient réel.',                       sub: 'Tu ne fais plus que commencer. Tu reviens.' },
  21:  { label: 'TROIS SEMAINES',           title: 'La constance prend forme.',                sub: "Ce qui demandait de l'effort commence à te ressembler." },
  30:  { label: 'TRENTE JOURS',             title: 'Un nouveau rythme vit ici.',               sub: 'Trente resets. Une version plus calme et plus solide de toi.' },
  60:  { label: 'SOIXANTE JOURS',           title: 'Tu construis une identité.',               sub: 'De petits choix sont devenus partie de qui tu deviens.' },
  90:  { label: 'QUATRE-VINGT-DIX JOURS',   title: "C'est une transformation.",                sub: "Ce qui demandait de l'effort commence à te sembler naturel." },
  100: { label: 'CENT JOURS',               title: 'Cent retours.',                            sub: 'Chacun comptait. Chacun compte encore.' },
  180: { label: 'SIX MOIS',                 title: 'Tu es resté avec toi-même.',               sub: 'Une constance tranquille a changé la forme de tes journées.' },
  365: { label: 'UN AN',                    title: 'Tu as reconstruit quelque chose de réel.', sub: 'Un an de retours. Un an de devenir.' },
};

const MILESTONE_COPY_DE: Record<number, MilestoneCopy> = {
  3:   { label: 'DREI TAGE',        title: 'Schwung entsteht.',                     sub: 'Drei stille Rückkehren beginnen ein Muster zu bilden.' },
  7:   { label: '7 TAGE',           title: 'Eine volle Woche.',                     sub: 'Sieben Tage, dich zu wählen. Der Rhythmus entsteht.' },
  14:  { label: 'VIERZEHN TAGE',    title: 'Das wird real.',                        sub: 'Du fängst nicht mehr nur an. Du kehrst zurück.' },
  21:  { label: 'DREI WOCHEN',      title: 'Beständigkeit entsteht still.',         sub: 'Was als Anstrengung begann, fängt an, wie du auszufühlen.' },
  30:  { label: 'DREISSIG TAGE',    title: 'Ein neuer Rhythmus lebt hier.',         sub: 'Dreißig Resets. Eine stillere, stärkere Version von dir.' },
  60:  { label: 'SECHZIG TAGE',     title: 'Du baust Identität auf.',               sub: 'Kleine Entscheidungen sind Teil von dem geworden, wer du wirst.' },
  90:  { label: 'NEUNZIG TAGE',     title: 'Das ist Transformation.',               sub: 'Was einst Anstrengung erforderte, fühlt sich jetzt wie du an.' },
  100: { label: 'HUNDERT TAGE',     title: 'Hundert Rückkehren.',                   sub: 'Jede einzelne zählte. Jede einzelne zählt noch.' },
  180: { label: 'EIN HALBES JAHR',  title: 'Du bist bei dir geblieben.',            sub: 'Stille Beständigkeit hat die Form deiner Tage verändert.' },
  365: { label: 'EIN JAHR',         title: 'Du hast etwas Echtes aufgebaut.',       sub: 'Ein Jahr des Zurückkommens. Ein Jahr des Werdens.' },
};

function getMilestoneCopy(milestone: number): MilestoneCopy | undefined {
  return (isDe() ? MILESTONE_COPY_DE : isPt() ? MILESTONE_COPY_PT : isEs() ? MILESTONE_COPY_ES : isFr() ? MILESTONE_COPY_FR : MILESTONE_COPY_EN)[milestone];
}


// ─── Expanding ring ───────────────────────────────────────────────────────────

function ExpandingRing({
  delay, size, color, duration = 2800,
}: {
  delay: number; size: number; color: string; duration?: number;
}) {
  const scale   = useRef(new Animated.Value(0.15)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 2.4,
            duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.4, duration: 350, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0,   duration: duration - 350, useNativeDriver: true }),
          ]),
        ]),
        Animated.parallel([
          Animated.timing(scale,   { toValue: 0.15, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0,    duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: color,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────

function FadeUp({ delay = 0, duration = 600, children }: {
  delay?: number; duration?: number; children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CompletionCeremony() {
  const router = useRouter();
  const { t } = useLanguage();
  const params = useLocalSearchParams<{
    streak: string; day: string; isFirst: string; milestone: string;
  }>();

  const streak    = parseInt(params.streak    ?? '0', 10);
  const day       = parseInt(params.day       ?? '1', 10);
  const isFirst   = params.isFirst   === 'true';
  const milestone = parseInt(params.milestone ?? '0', 10);

  const { getMilestoneMessage } = usePersonalization();
  const { chapter, nextChapter, ritualEvolution, quietMystery, chapterPreview } = useAnticipation();

  const exitFade = useRef(new Animated.Value(1)).current;

  const milestoneCopy = getMilestoneCopy(milestone);
  const isMilestone = milestone > 0 && milestoneCopy !== undefined;
  // Personalized copy takes priority; falls back to locale-specific MILESTONE_COPY
  const personalizedMilestone = isMilestone ? getMilestoneMessage(milestone) : null;
  const mData = personalizedMilestone ?? (isMilestone ? milestoneCopy : null);

  // Day-specific completion copy — language-aware
  function getDayCopy(d: number): { title: string; sub: string } {
    const pt = isPt();
    const es = isEs();
    const fr = isFr();
    const de = isDe();
    if (d === 1) {
      if (de) return { title: 'Du bist heute zu dir zurückgekehrt.', sub: 'Ein stiller Anfang zählt auch.' };
      if (pt) return { title: 'Você voltou para si hoje.', sub: 'Um começo tranquilo ainda importa.' };
      if (es) return { title: 'Hoy volviste a ti.', sub: 'Los comienzos tranquilos también importan.' };
      if (fr) return { title: 'Tu es revenu à toi aujourd\'hui.', sub: 'Un début calme compte aussi.' };
      return { title: 'You came back to yourself today.', sub: 'A quiet beginning still matters.' };
    }
    if (d === 2) {
      if (de) return { title: 'Zwei Tage.', sub: 'Die Gewohnheit beginnt zu atmen.' };
      if (pt) return { title: 'Dois dias.', sub: 'O hábito está começando a respirar.' };
      if (es) return { title: 'Dos días.', sub: 'El hábito está empezando a respirar.' };
      if (fr) return { title: 'Deux jours.', sub: 'L\'habitude commence à respirer.' };
      return { title: 'Two days.', sub: 'The habit is beginning to breathe.' };
    }
    if (d === 3) {
      if (de) return { title: 'Drei Tage.', sub: 'Etwas verändert sich.' };
      if (pt) return { title: 'Três dias.', sub: 'Algo está mudando.' };
      if (es) return { title: 'Tres días.', sub: 'Algo está cambiando.' };
      if (fr) return { title: 'Trois jours.', sub: 'Quelque chose change.' };
      return { title: 'Three days.', sub: 'Something is shifting.' };
    }
    if (d === 4) {
      if (de) return { title: 'Vier Tage, dich zu wählen.', sub: 'Das Muster entsteht.' };
      if (pt) return { title: 'Quatro dias escolhendo você.', sub: 'O padrão está se formando.' };
      if (es) return { title: 'Cuatro días eligiéndote.', sub: 'El patrón está tomando forma.' };
      if (fr) return { title: 'Quatre jours à te choisir.', sub: 'Le schéma se forme.' };
      return { title: 'Four days of choosing yourself.', sub: 'The pattern is forming.' };
    }
    if (d === 5) {
      if (de) return { title: 'Fünf Tage.', sub: 'Du bist beständiger als du denkst.' };
      if (pt) return { title: 'Cinco dias.', sub: 'Você é mais constante do que pensa.' };
      if (es) return { title: 'Cinco días.', sub: 'Eres más constante de lo que crees.' };
      if (fr) return { title: 'Cinq jours.', sub: 'Tu es plus constant que tu ne le crois.' };
      return { title: 'Five days.', sub: "You're more consistent than you think." };
    }
    if (d === 6) {
      if (de) return { title: 'Sechs Tage.', sub: 'Morgen ist ein Meilenstein.' };
      if (pt) return { title: 'Seis dias.', sub: 'Amanhã é um marco.' };
      if (es) return { title: 'Seis días.', sub: 'Mañana es un hito.' };
      if (fr) return { title: 'Six jours.', sub: 'Demain est un jalon.' };
      return { title: 'Six days.', sub: 'Tomorrow is a milestone.' };
    }
    if (d === 7) {
      if (de) return { title: 'Eine Woche.', sub: 'Du bist nicht mehr dieselbe Person, die begann.' };
      if (pt) return { title: 'Uma semana.', sub: 'Você não é a mesma pessoa que começou.' };
      if (es) return { title: 'Una semana.', sub: 'No eres la misma persona que empezó.' };
      if (fr) return { title: 'Une semaine.', sub: 'Tu n\'es plus la même personne qu\'au début.' };
      return { title: 'One week.', sub: 'You are not the same person who started.' };
    }
    if (d <= 13) {
      if (de) return { title: 'Du kommst weiter zurück.', sub: 'Das ist die ganze Praxis.' };
      if (pt) return { title: 'Você continua aparecendo.', sub: 'Essa é a prática toda.' };
      if (es) return { title: 'Sigues apareciendo.', sub: 'Esa es la práctica completa.' };
      if (fr) return { title: 'Tu continues à revenir.', sub: 'C\'est toute la pratique.' };
      return { title: 'You keep showing up.', sub: 'That is the whole practice.' };
    }
    if (d === 14) {
      if (de) return { title: 'Zwei Wochen.', sub: 'Du hast etwas Echtes aufgebaut.' };
      if (pt) return { title: 'Duas semanas.', sub: 'Você construiu algo real.' };
      if (es) return { title: 'Dos semanas.', sub: 'Has construido algo real.' };
      if (fr) return { title: 'Deux semaines.', sub: 'Tu as construit quelque chose de réel.' };
      return { title: 'Two weeks.', sub: "You've built something real." };
    }
    if (d <= 29) {
      if (de) return { title: 'Jede Rückkehr fügt hinzu, was du aufbaust.', sub: 'Weiter so.' };
      if (pt) return { title: 'Cada retorno acrescenta ao que você está construindo.', sub: 'Continue.' };
      if (es) return { title: 'Cada regreso suma a lo que estás construyendo.', sub: 'Sigue.' };
      if (fr) return { title: 'Chaque retour s\'ajoute à ce que tu construis.', sub: 'Continue.' };
      return { title: 'Every return adds to what you\'re building.', sub: 'Keep going.' };
    }
    if (d === 30) {
      if (de) return { title: 'Dreißig Tage.', sub: 'Du hast dich neu aufgebaut — still.' };
      if (pt) return { title: 'Trinta dias.', sub: 'Você se reconstruiu — quietamente.' };
      if (es) return { title: 'Treinta días.', sub: 'Te reconstruiste — en silencio.' };
      if (fr) return { title: 'Trente jours.', sub: 'Tu t\'es reconstruit — doucement.' };
      return { title: 'Thirty days.', sub: 'You rebuilt yourself — quietly.' };
    }
    if (de) return { title: 'Du bist jemand, der zurückkommt.', sub: 'Das ist Identität.' };
    if (pt) return { title: 'Você é alguém que aparece.', sub: 'Isso é identidade.' };
    if (es) return { title: 'Eres alguien que aparece.', sub: 'Eso es identidad.' };
    if (fr) return { title: 'Tu es quelqu\'un qui revient.', sub: 'C\'est une identité.' };
    return { title: 'You are someone who shows up.', sub: 'That is identity.' };
  }

  const dayCopy = getDayCopy(day);

  // Content
  const eyebrow = (isMilestone ? milestoneCopy?.label : null) ?? t('today.day.label', { day });
  const title   = mData?.title ?? dayCopy.title;
  const sub     = mData?.sub   ?? dayCopy.sub;


  // Ring sizing — milestone days get larger rings
  const ringSize = isMilestone ? width * 0.72 : width * 0.58;
  const ringDur  = isMilestone ? 3600 : 2800;

  // Breathing center
  const breathe = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Haptic — milestone gets a stronger double-pulse
    setTimeout(() => {
      if (isMilestone) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 320);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }, 300);

    // Breathing center glow
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: isMilestone ? 1.10 : 1.06,
          duration: isMilestone ? 2600 : 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 1.00,
          duration: isMilestone ? 2600 : 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const handleContinue = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Soft fade out, then return to Today (already in completed state)
    Animated.timing(exitFade, {
      toValue: 0,
      duration: 550,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      router.replace('/(tabs)/today');
    });
  }, [exitFade]);

  const glowSize     = isMilestone ? ringSize * 0.46 : ringSize * 0.44;
  const glowInnerSz  = isMilestone ? ringSize * 0.22 : ringSize * 0.20;

  const BOTTOM_SAFE = Platform.OS === 'ios' ? 44 : 28;

  return (
    <Animated.View style={[styles.root, { opacity: exitFade }]}>
      <StatusBar barStyle="light-content" />

      {/* ── Animated rings (behind everything) ──────────────────────── */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={styles.ringsCenter}>
          <ExpandingRing delay={0}    size={ringSize} color={Colors.gold}   duration={ringDur} />
          <ExpandingRing delay={Math.round(ringDur * 0.33)} size={ringSize} color={Colors.gold}   duration={ringDur} />
          <ExpandingRing delay={Math.round(ringDur * 0.66)} size={ringSize} color={isMilestone ? Colors.accent : Colors.gold} duration={ringDur} />
        </View>
      </View>

      {/* ── Breathing center glow (behind text) ─────────────────────── */}
      <View style={styles.ringsCenter} pointerEvents="none">
        <Animated.View style={[{
          width: glowSize, height: glowSize,
          borderRadius: glowSize / 2,
          backgroundColor: `${Colors.gold}18`,
          transform: [{ scale: breathe }],
        }]} />
        <View style={[StyleSheet.absoluteFillObject as any, { alignItems: 'center', justifyContent: 'center' }]}>
          <View style={{
            width: glowInnerSz, height: glowInnerSz,
            borderRadius: glowInnerSz / 2,
            backgroundColor: isMilestone ? `${Colors.gold}30` : `${Colors.gold}24`,
          }} />
        </View>
      </View>

      {/* ── Main layout: content + button, no overlap ───────────────── */}
      <View style={styles.layout}>

        {/* Ceremony text — vertically centered in the remaining space */}
        <View style={styles.textArea}>
          <FadeUp delay={200}>
            <Text style={[styles.eyebrow, isMilestone && styles.eyebrowMilestone]}>
              {eyebrow}
            </Text>
          </FadeUp>

          <FadeUp delay={isMilestone ? 500 : 420} duration={isMilestone ? 750 : 650}>
            <Text style={[styles.title, isMilestone && styles.titleMilestone]}>
              {title}
            </Text>
          </FadeUp>

          <FadeUp delay={isMilestone ? 750 : 650} duration={600}>
            <Text style={styles.sub}>{sub}</Text>
          </FadeUp>

        </View>

        {/* ── What's Ahead — quiet anticipation whisper ───────────── */}
        <FadeUp delay={isMilestone ? 1200 : 900} duration={700}>
          <View style={styles.aheadWrap}>
            <View style={styles.aheadDivider} />
            <Text style={styles.aheadEyebrow}>{t('ceremony.whatsAhead')}</Text>
            {chapterPreview ? (
              <Text style={styles.aheadLine}>{chapterPreview}</Text>
            ) : nextChapter ? (
              <Text style={styles.aheadLine}>{nextChapter.tagline}</Text>
            ) : null}
            <Text style={styles.aheadLine}>{ritualEvolution}</Text>
            {quietMystery && (
              <Text style={styles.aheadMystery}>{quietMystery}</Text>
            )}
          </View>
        </FadeUp>

        {/* ── Continue button — appears after emotional content settles ─ */}
        <FadeUp delay={isMilestone ? 2600 : 2200} duration={600}>
          <View style={[styles.btnWrap, { paddingBottom: BOTTOM_SAFE + Spacing.lg }]}>
            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={handleContinue}
              activeOpacity={0.78}
            >
              <Text style={styles.ctaText}>{t('common.continue')}</Text>
            </TouchableOpacity>
          </View>
        </FadeUp>

      </View>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.charcoal,
  },
  ringsCenter: {
    ...StyleSheet.absoluteFillObject as any,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Full-height layout: text occupies flex-1, button is at the bottom
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Text block: centered vertically in the top 3/4 of the screen
  textArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.md,
  },

  eyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2.5,
    textAlign: 'center',
    opacity: 0.9,
  },
  eyebrowMilestone: {
    fontSize: Typography.sizes.sm,
    letterSpacing: 3,
    opacity: 1,
  },

  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.black,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  titleMilestone: {
    fontSize: 30,
    lineHeight: 44,
  },

  sub: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255,255,255,0.52)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },

  // What's Ahead — quiet forward pull
  aheadWrap: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  aheadDivider: {
    width: 32,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginBottom: Spacing.sm,
  },
  aheadEyebrow: {
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2.5,
    opacity: 0.6,
    marginBottom: 2,
  },
  aheadLine: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  aheadMystery: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.22)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2,
  },

  // Button area — below textArea, pinned to bottom
  btnWrap: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  ctaBtn: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: Radii.full,
    paddingVertical: 17,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    minWidth: 200,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

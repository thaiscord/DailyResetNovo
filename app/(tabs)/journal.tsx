import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Modal, StyleSheet, StatusBar, Animated,
} from 'react-native';
import { softCardReveal } from '../../utils/motion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { getAllDailyEntries, DailyEntry } from '../../utils/dailyEntries';
import { getItem } from '../../hooks/useStorage';
import { useLanguage } from '../../hooks/useLanguage';
import { MoodBadge } from '../../components/ui/MoodBadge';

// Known PT titles for already-stored daily entries
const PT_RESET_TITLES: Record<string, string> = {
  'Every journey begins here.':         'Toda jornada começa aqui.',
  'You came back.':                     'Você voltou.',
  'One breath changes the room.':       'Uma respiração muda mais do que você pensa.',
  "You don't have to hold it all.":     'Você não precisa carregar tudo hoje.',
  'Your body is telling you something.':'Seu corpo está te dizendo algo.',
  'You are enough for today.':          'Você é suficiente para hoje.',
  'Something has quietly shifted.':     'Algo mudou quietamente.',
};

// Known DE titles for already-stored English entries
const DE_RESET_TITLES: Record<string, string> = {
  'Every journey begins here.':         'Hier kann alles neu beginnen.',
  'You came back.':                     'Du bist zurückgekehrt.',
  'One breath changes the room.':       'Ein Atemzug verändert mehr als man denkt.',
  "You don't have to hold it all.":     'Du musst nicht alles tragen.',
  'Your body is telling you something.':'Dein Körper sagt dir etwas.',
  'You are enough for today.':          'Du bist genug für heute.',
  'Something has quietly shifted.':     'Etwas hat sich still verändert.',
  'Your attention is worth protecting.':'Beständigkeit ist nicht Perfektion.',
  "One thing. That's all.":            'Dein Rhythmus kehrt zurück.',
  'The noise will always be there.':    'Du bist nicht allein mit dem, was du trägst.',
  'Small rhythms become lifelines.':    'Kleine Dinge summieren sich.',
  'Rest is not retreat.':               'Zwei Tage bis zwei Wochen.',
  'You can trust the small steps.':     'Morgen markiert zwei volle Wochen.',
  "You've been steadier than you know.":'Zwei Wochen Präsenz.',
  'You are becoming someone.':          'Halbzeit im Monat.',
  'Showing up is courage.':             'Disziplin wächst ohne Lärm.',
  'The gap between then and now.':      'Jeder Tag verdrahtet den Standard neu.',
  'You know more than you think.':      'Deine Beständigkeit wird sichtbar.',
  'Clarity comes after the chaos.':     'Fast drei Wochen.',
  'Small acts compound quietly.':       'Zwanzig Tage anders zu wählen.',
  "21 days. You're different now.":     'Drei Wochen. Das wird zu dir.',
  'Protect what is working.':           'Was du täglich tust, definiert dich.',
  'Depth over speed.':                  'Du hast dir selbst etwas bewiesen.',
  'The quiet ones go the furthest.':    'Was du wiederholt tust, wird zu deiner Zukunft.',
  'Still enough. Always enough.':       'Du bist nicht mehr derselbe Mensch.',
  'Every return is a beginning.':       'Der Schwung ist real.',
  'This is the practice now.':          'Du bleibst erscheinen.',
  'Almost a month. Feel that.':         'Fast ein Monat.',
  "Tomorrow you'll have done this.":    'Morgen markiert einen vollen Monat.',
  'Thirty days of choosing yourself.':  'Ein Monat. Das Muster gehört dir.',
};

function getDateLocale(lang: string): string {
  if (lang === 'pt') return 'pt-BR';
  if (lang === 'es') return 'es-ES';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'de') return 'de-DE';
  return 'en-US';
}

export default function JournalScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [selected, setSelected] = useState<DailyEntry | null>(null);
  // Start as false — data loads immediately on mount via useEffect below.
  // Avoids blank→content flash when switching to this tab for the first time.
  const [loading, _setLoading] = useState(false);

  // Load immediately on mount so data is ready before the user first visits.
  // With lazy:false the screen mounts at app start, so this runs upfront.
  useEffect(() => {
    getAllDailyEntries().then(e => setEntries(e));
  }, []);

  // Refresh on every focus so new entries written in other tabs appear instantly.
  useFocusEffect(useCallback(() => {
    getAllDailyEntries().then(e => setEntries(e));
  }, []));

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.ambientTop} />
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.title}>{t('journal.title')}</Text>
        {entries.length > 0 && (
          <Text style={styles.subtitle}>
            {entries.length === 1
              ? t('journal.subtitle.one')
              : t('journal.subtitle.other', { n: entries.length })}
          </Text>
        )}
      </View>

      {!loading && entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{t('journal.empty.title')}</Text>
          <Text style={styles.emptySub}>{t('journal.empty.sub')}</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          scrollEventThrottle={16}
        >
          {entries.map((entry, index) => (
            <RevealCard key={entry.date} delay={Math.min(index, 5) * 70}>
              <EntryCard
                entry={entry}
                onPress={() => setSelected(entry)}
              />
            </RevealCard>
          ))}
        </ScrollView>
      )}

      {selected && (
        <EntryModal entry={selected} onClose={() => setSelected(null)} />
      )}
    </View>
  );
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function RevealCard({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  useEffect(() => {
    softCardReveal(opacity, translateY, delay).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Entry Card ───────────────────────────────────────────────────────────────

function EntryCard({ entry, onPress }: { entry: DailyEntry; onPress: () => void }) {
  const { t, lang } = useLanguage();
  const _locale = getDateLocale(lang);
  const dateObj = new Date(entry.date + 'T12:00:00');
  const dateShort = lang === 'pt'
    ? dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
    : lang === 'es'
    ? dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
    : lang === 'de'
    ? dateObj.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })
    : dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const displayTitle = lang === 'pt' && entry.resetTitle
    ? (PT_RESET_TITLES[entry.resetTitle] ?? entry.resetTitle)
    : lang === 'de' && entry.resetTitle
    ? (DE_RESET_TITLES[entry.resetTitle] ?? entry.resetTitle)
    : entry.resetTitle;
  const userPreview = entry.reflection_response || entry.action_response || entry.momentReflection || null;
  const metaPrompt = entry.actionPrompt
    ? entry.actionPrompt.length > 48 ? entry.actionPrompt.slice(0, 48) + '…' : entry.actionPrompt
    : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      {/* Top row — day + date + mood */}
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.cardDay}>{t('journal.day', { day: entry.day })}</Text>
          <Text style={styles.cardDate}>{dateShort}</Text>
        </View>
        {entry.mood ? <MoodBadge mood={entry.mood} /> : null}
      </View>

      {/* Reset headline */}
      {displayTitle ? (
        <Text style={styles.cardHeadline} numberOfLines={2}>{displayTitle}</Text>
      ) : null}

      {/* Contextual metadata — category + prompt excerpt */}
      {(entry.category || metaPrompt) ? (
        <Text style={styles.cardMeta} numberOfLines={1}>
          {[entry.category ? (t('today.cat.' + entry.category) || entry.category) : null, metaPrompt].filter(Boolean).join(' · ')}
        </Text>
      ) : null}

      {/* User preview or fallback */}
      <View style={{ marginTop: 8 }}>
        {userPreview ? (
          <Text style={styles.cardPreview} numberOfLines={2}>
            {userPreview.slice(0, 100)}
          </Text>
        ) : entry.completed ? (
          <Text style={styles.cardNoNotes}>{t('journal.nonotes')}</Text>
        ) : (
          <Text style={styles.cardNoNotes}>{t('journal.norecord')}</Text>
        )}
      </View>

      {/* Badges */}
      <View style={styles.cardPills}>
        {entry.completed && (
          <View style={[styles.pill, styles.pillGreen]}>
            <Text style={[styles.pillText, styles.pillTextGreen]}>{t('journal.completed')}</Text>
          </View>
        )}
        {!!entry.action_response && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{t('journal.pill.action')}</Text>
          </View>
        )}
        {!!entry.reflection_response && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{t('journal.pill.reflection')}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Entry Modal ──────────────────────────────────────────────────────────────

function EntryModal({ entry, onClose }: { entry: DailyEntry; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { t, lang } = useLanguage();
  const dateObj = new Date(entry.date + 'T12:00:00');
  const dateLong = lang === 'pt'
    ? dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    : lang === 'es'
    ? dateObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
    : dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const displayTitle = lang === 'pt' && entry.resetTitle
    ? (PT_RESET_TITLES[entry.resetTitle] ?? entry.resetTitle)
    : entry.resetTitle;
  const [afterResetText, setAfterResetText] = useState<string | null>(null);
  const [afterResetPrompt, setAfterResetPrompt] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      type ReflectionEntry = { date: string; text: string; prompt?: string };
      const reflections = await getItem<ReflectionEntry[]>('daily_reflections_v1', []);
      const match = [...reflections].reverse().find(r => r.date === entry.date);
      if (match?.text?.trim()) {
        setAfterResetText(match.text.trim());
        setAfterResetPrompt(match.prompt?.trim() || null);
      } else if (entry.momentReflection?.trim()) {
        setAfterResetText(entry.momentReflection.trim());
        setAfterResetPrompt(entry.momentPrompt?.trim() || null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.date]);

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.modalRoot, { paddingBottom: insets.bottom + 24 }]}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalDay}>{t('journal.day', { day: entry.day })}</Text>
            <Text style={styles.modalDate}>{dateLong}</Text>
            {entry.mood ? (
              <View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                <MoodBadge mood={entry.mood} />
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={styles.modalClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.modalCloseText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>

          {/* Section 1 — Today's Reset */}
          {displayTitle ? (
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>{t('journal.modal.label.today')}</Text>
              {entry.category ? (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{t('today.cat.' + entry.category) || entry.category}</Text>
                </View>
              ) : null}
              <Text style={styles.modalContent}>{displayTitle}</Text>
            </View>
          ) : null}

          {/* Section 2 — Your Action */}
          <View style={styles.modalSection}>
            <Text style={styles.modalLabel}>{t('journal.modal.label.action')}</Text>
            {entry.actionPrompt ? (
              <Text style={styles.modalPrompt}>{`"${entry.actionPrompt}"`}</Text>
            ) : null}
            {entry.action_response ? (
              <Text style={styles.modalContent}>{entry.action_response}</Text>
            ) : (
              <Text style={styles.modalMuted}>{t('journal.modal.nonote')}</Text>
            )}
          </View>

          {/* Section 3 — Why This Helped */}
          {entry.whyItMatters ? (
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>{t('journal.modal.label.why')}</Text>
              <Text style={styles.modalContentCalm}>{entry.whyItMatters}</Text>
            </View>
          ) : null}

          {/* Section 5 — Closing: badge first, then after-reset reflection */}
          {(entry.completed || afterResetText) ? (
            <View style={{ marginTop: 8 }}>

              {/* Badge — emotional closure, shown first */}
              {entry.completed ? (
                <View style={styles.modalStatusRow}>
                  <Text style={styles.modalStatusText}>{t('journal.modal.completed')}</Text>
                </View>
              ) : null}

              {/* After-reset reflection */}
              {afterResetText ? (
                <>
                  <View style={{ height: 1, backgroundColor: '#E8E0D5', marginTop: 24, marginBottom: 24 }} />
                  <Text style={{ fontSize: 11, letterSpacing: 1.2, color: '#C9973A', fontWeight: '600', marginBottom: 14 }}>
                    {t('journal.modal.label.after')}
                  </Text>
                  <Text style={styles.modalPrompt}>
                    {afterResetPrompt ? `"${afterResetPrompt}"` : t('journal.modal.after.sub')}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#3D3530', lineHeight: 26, letterSpacing: 0.1, marginTop: 12 }}>
                    {afterResetText}
                  </Text>
                </>
              ) : null}

            </View>
          ) : null}

        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAF6EF',
  },
  ambientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 240, backgroundColor: 'rgba(201,151,58,0.018)', zIndex: 0 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FAF6EF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D3530',
  },
  subtitle: {
    fontSize: 13,
    color: '#ABA49E',
    marginTop: 4,
  },

  // Card
  card: {
    backgroundColor: '#F9F6F0',
    borderRadius: 18,
    padding: 18,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.14)',
    shadowColor: '#2A2018',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardDay: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#C9973A',
    opacity: 0.88,
  },
  cardDate: {
    fontSize: 13,
    color: '#ABA49E',
    marginTop: 3,
  },
  cardHeadline: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A3330',
    lineHeight: 22,
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  cardMeta: {
    fontSize: 12,
    color: '#978F84',
    lineHeight: 17,
    marginTop: 3,
    marginBottom: 2,
  },
  cardPreview: {
    fontSize: 13,
    color: '#7C7670',
    fontStyle: 'italic',
    lineHeight: 21,
  },
  cardNoNotes: {
    fontSize: 13,
    color: '#B0A99E',
    fontStyle: 'italic',
  },
  cardPills: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F7F3EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0D8CE',
  },
  pillGreen: {
    backgroundColor: '#F3F7F2',
    borderColor: '#D2E0D2',
  },
  pillText: {
    fontSize: 11,
    color: '#B8924A',
    fontWeight: '500',
  },
  pillTextGreen: {
    color: '#7B9F7B',
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3530',
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    color: '#ABA49E',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 12,
  },

  // Modal
  modalRoot: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4DDD4',
  },
  modalDay: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#C9973A',
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 19,
    fontWeight: '600',
    color: '#3A3330',
    letterSpacing: -0.2,
  },
  modalClose: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 28,
    color: '#ABA49E',
    lineHeight: 34,
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 48,
  },
  modalSection: {
    marginBottom: 32,
  },
  modalLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#C9973A',
    fontWeight: '700',
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7F3EE',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0D8CE',
    marginBottom: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: '#B8924A',
    fontWeight: '500',
  },
  modalPrompt: {
    fontSize: 14,
    color: '#8A8278',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 16,
  },
  modalContent: {
    fontSize: 15,
    color: '#3A3330',
    lineHeight: 25,
    letterSpacing: 0.1,
  },
  modalContentCalm: {
    fontSize: 14,
    color: '#7A736C',
    lineHeight: 25,
    letterSpacing: 0.1,
  },
  modalMuted: {
    fontSize: 14,
    color: '#ABA49E',
    fontStyle: 'italic',
  },
  modalStatusRow: {
    backgroundColor: 'rgba(140,165,140,0.06)',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  modalStatusText: {
    fontSize: 13,
    color: '#8CAA8C',
    fontWeight: '400',
  },
});

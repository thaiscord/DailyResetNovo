import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Easing, Modal, TextInput,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useReflections, ReflectionEntry } from '../hooks/useReflections';
import { useLanguage } from '../hooks/useLanguage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';

// ─── Date helpers ─────────────────────────────────────────────────────────────

const MONTH_KEYS = ['month.jan','month.feb','month.mar','month.apr','month.may','month.jun',
  'month.jul','month.aug','month.sep','month.oct','month.nov','month.dec'] as const;
const DAY_KEYS = ['dayname.sunday','dayname.monday','dayname.tuesday','dayname.wednesday',
  'dayname.thursday','dayname.friday','dayname.saturday'] as const;

function useFmtDate() {
  const { t } = useLanguage();
  return (s: string) => {
    const [y,m,d] = s.split('-').map(Number);
    const dt = new Date(y, m-1, d);
    return { dayName: t(DAY_KEYS[dt.getDay()]), dateLabel: `${t(MONTH_KEYS[m-1])} ${d}` };
  };
}

// ─── Entry card ───────────────────────────────────────────────────────────────

function EntryCard({
  entry, index,
  onEdit, onDelete,
}: {
  entry: ReflectionEntry;
  index: number;
  onEdit: (e: ReflectionEntry) => void;
  onDelete: (e: ReflectionEntry) => void;
}) {
  const [expanded, setExpanded]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;
  const { t } = useLanguage();
  const fmtDate = useFmtDate();
  const { dayName, dateLabel } = fmtDate(entry.date);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 380, delay: Math.min(index, 8) * 55, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 380, delay: Math.min(index, 8) * 55, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

      {/* Header */}
      <View style={styles.cardHeader}>
        <TouchableOpacity style={styles.cardDateWrap} onPress={() => { setExpanded(x => !x); setMenuOpen(false); }} activeOpacity={0.8}>
          <Text style={styles.cardDayName}>{dayName}</Text>
          <Text style={styles.cardDate}>{dateLabel}</Text>
        </TouchableOpacity>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{t('reflection.dayBadge', { n: entry.dayNumber })}</Text>
        </View>
        {/* ⋯ menu trigger */}
        <TouchableOpacity
          style={styles.menuTrigger}
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setMenuOpen(x => !x); setExpanded(false); }}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Inline action menu */}
      {menuOpen && (
        <View style={styles.actionMenu}>
          <TouchableOpacity style={styles.actionRow} onPress={() => { setMenuOpen(false); onEdit(entry); }} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.actionText}>{t('reflection.action.edit')}</Text>
          </TouchableOpacity>
          <View style={styles.actionSep} />
          <TouchableOpacity style={styles.actionRow} onPress={() => { setMenuOpen(false); onDelete(entry); }} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={16} color={Colors.danger} />
            <Text style={[styles.actionText, { color: Colors.danger }]}>{t('reflection.action.delete')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <TouchableOpacity onPress={() => { setExpanded(x => !x); setMenuOpen(false); }} activeOpacity={0.82}>
        <Text style={styles.cardPrompt}>"{entry.prompt}"</Text>
        <Text style={styles.cardText} numberOfLines={expanded ? undefined : 3}>{entry.text}</Text>
        {!expanded && entry.text.length > 100 && (
          <Text style={styles.cardMore}>{t('reflection.action.readmore')}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Edit modal ───────────────────────────────────────────────────────────────

function EditModal({ entry, onSave, onCancel }: {
  entry: ReflectionEntry;
  onSave: (newText: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(entry.text);
  const canSave = text.trim().length > 0;
  const { t } = useLanguage();

  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onCancel}>
      <KeyboardAvoidingView style={styles.modalRoot} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onCancel} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.modalCancel}>{t('reflection.edit.cancel')}</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeading}>{t('reflection.edit.title')}</Text>
          <TouchableOpacity
            onPress={() => { if (canSave) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); onSave(text.trim()); } }}
            disabled={!canSave}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.modalSave, !canSave && styles.modalSaveDisabled]}>{t('reflection.edit.save')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalPromptRow}>
          <View style={styles.modalAccent} />
          <Text style={styles.modalPromptText}>"{entry.prompt}"</Text>
        </View>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <TextInput
            value={text} onChangeText={setText} multiline autoFocus
            textAlignVertical="top" placeholderTextColor={Colors.textMuted} style={styles.modalInput}
          />
        </ScrollView>
        <Text style={styles.modalHint}>{t('reflection.edit.privacy')}</Text>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Delete confirm ────────────────────────────────────────────────────────────

function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const { t } = useLanguage();
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.deleteCard}>
              <Text style={styles.deleteTitle}>{t('reflection.delete.title')}</Text>
              <Text style={styles.deleteSub}>{t('reflection.delete.sub')}</Text>
              <View style={styles.deleteBtns}>
                <TouchableOpacity style={styles.btnCancel} onPress={onCancel} activeOpacity={0.8}>
                  <Text style={styles.btnCancelText}>{t('reflection.delete.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); onConfirm(); }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnDeleteText}>{t('reflection.delete.confirm')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ hadEntries }: { hadEntries: boolean }) {
  const { t } = useLanguage();
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name="journal-outline" size={36} color={Colors.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>{hadEntries ? t('reflection.empty.noyet') : t('reflection.empty.waiting')}</Text>
      <Text style={styles.emptySub}>
        {hadEntries ? t('reflection.empty.appear') : t('reflection.empty.invite')}
      </Text>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ReflectionHistoryScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { entries, loading, updateEntry, deleteEntry } = useReflections();

  const [editing,  setEditing]  = useState<ReflectionEntry | null>(null);
  const [deleting, setDeleting] = useState<ReflectionEntry | null>(null);
  const [hadData,  setHadData]  = useState(false);

  useEffect(() => { if (entries.length > 0) setHadData(true); }, [entries.length]);

  const sorted = [...entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleSave = useCallback(async (newText: string) => {
    if (!editing) return;
    await updateEntry(editing.id, newText);
    setEditing(null);
  }, [editing, updateEntry]);

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    await deleteEntry(deleting.id);
    setDeleting(null);
  }, [deleting, deleteEntry]);

  return (
    <View style={styles.root}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', gap: 3 }}>
          <Text style={styles.eyebrow}>{t('reflection.header.eyebrow')}</Text>
          <Text style={styles.title}>{t('reflection.header.title')}</Text>
          <Text style={styles.sub}>
            {entries.length === 0 ? t('reflection.header.sub.empty') : t('reflection.header.sub.count', { n: entries.length, s: entries.length !== 1 ? 's' : '' })}
          </Text>
        </View>
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {!loading && sorted.length === 0 ? (
          <EmptyState hadEntries={hadData} />
        ) : (
          <>
            {sorted.map((e, i) => (
              <EntryCard
                key={e.id}
                entry={e}
                index={i}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))}
            <Text style={styles.quote}>{t('reflection.bottom.quote')}</Text>
          </>
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {editing  && <EditModal  entry={editing}  onSave={handleSave}   onCancel={() => setEditing(null)} />}
      {deleting && <DeleteModal onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: { paddingTop: 56, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.xl, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight },
  backBtn: { position: 'absolute', top: 56, left: Spacing.lg, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  eyebrow: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 2 },
  title:   { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -0.5 },
  sub:     { fontSize: Typography.sizes.sm, color: Colors.textMuted, fontStyle: 'italic' },

  list: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },

  // Entry card
  card: { backgroundColor: Colors.card, borderRadius: Radii.xl, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.borderLight, gap: Spacing.sm, ...Shadows.card },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardDateWrap: { flex: 1, gap: 2 },
  cardDayName: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textPrimary },
  cardDate: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  cardBadge: { backgroundColor: Colors.accentDim, borderRadius: Radii.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, borderWidth: 1, borderColor: `${Colors.accent}55` },
  cardBadgeText: { fontSize: 10, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 0.5 },
  menuTrigger: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center' },
  actionMenu: { backgroundColor: Colors.card, borderRadius: Radii.lg, borderWidth: 1, borderColor: Colors.borderLight, overflow: 'hidden', ...Shadows.card },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 13, paddingHorizontal: Spacing.base },
  actionSep: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.borderLight },
  actionText: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontWeight: Typography.weights.medium },
  cardPrompt: { fontSize: Typography.sizes.xs, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 18 },
  cardText:   { fontSize: Typography.sizes.sm, color: Colors.textSecondary, lineHeight: 22 },
  cardMore:   { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: Typography.weights.medium, marginTop: 2 },

  // Edit modal
  modalRoot: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight },
  modalCancel: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
  modalHeading: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textPrimary },
  modalSave: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.charcoal },
  modalSaveDisabled: { color: Colors.textMuted },
  modalPromptRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.sm },
  modalAccent: { width: 2, borderRadius: 1, backgroundColor: Colors.accent, alignSelf: 'stretch', minHeight: 18 },
  modalPromptText: { flex: 1, fontSize: Typography.sizes.sm, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 22 },
  modalInput: { fontSize: Typography.sizes.base, color: Colors.textPrimary, lineHeight: 28, paddingHorizontal: Spacing.xl, paddingTop: Spacing.md, paddingBottom: Spacing.xxl, minHeight: 200 },
  modalHint: { fontSize: 10, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center', paddingBottom: 32 },

  // Delete modal
  overlay: { flex: 1, backgroundColor: 'rgba(28,28,28,0.50)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  deleteCard: { backgroundColor: Colors.card, borderRadius: Radii.xxl, padding: Spacing.xl, width: '100%', alignItems: 'center', gap: Spacing.md, ...Shadows.cardStrong },
  deleteTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
  deleteSub: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic' },
  deleteBtns: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xs, width: '100%' },
  btnCancel: { flex: 1, backgroundColor: Colors.backgroundSecondary, borderRadius: Radii.full, paddingVertical: 14, alignItems: 'center' },
  btnCancelText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textSecondary },
  btnDelete: { flex: 1, backgroundColor: Colors.danger, borderRadius: Radii.full, paddingVertical: 14, alignItems: 'center' },
  btnDeleteText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.white },

  // Empty
  empty: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.md, paddingHorizontal: Spacing.xl },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  emptyTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textPrimary, textAlign: 'center' },
  emptySub: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, fontStyle: 'italic' },

  quote: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic', paddingVertical: Spacing.xl, lineHeight: 20 },
});

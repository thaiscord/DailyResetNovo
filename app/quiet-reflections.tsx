import { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getItem, StorageKeys } from '../hooks/useStorage';
import type { ReflectionEntry } from '../hooks/useSpaceReflections';
import { Spacing } from '../theme';
import { useLanguage } from '../hooks/useLanguage';

type ClearMindEntry = Pick<ReflectionEntry, 'text' | 'date' | 'prompt'>;

const ECHO_KEYS = [
  'qr.echo.0',
  'qr.echo.1',
  'qr.echo.2',
  'qr.echo.3',
  'qr.echo.4',
  'qr.echo.5',
  'qr.echo.6',
  'qr.echo.7',
];

function fmt(s: string): string {
  const [, m, d] = s.split('-').map(Number);
  return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1]} ${d}`;
}
function toDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function groupEntries(
  entries: ClearMindEntry[],
  labels: { week: string; month: string; before: string },
): { label: string; items: ClearMindEntry[] }[] {
  const now = new Date();
  const wk  = new Date(now); wk.setDate(now.getDate() - now.getDay()); wk.setHours(0,0,0,0);
  const mo  = new Date(now.getFullYear(), now.getMonth(), 1);
  const tw: ClearMindEntry[] = [], tm: ClearMindEntry[] = [], bf: ClearMindEntry[] = [];
  for (const e of entries) {
    const d = toDate(e.date);
    if (d >= wk) tw.push(e); else if (d >= mo) tm.push(e); else bf.push(e);
  }
  return ([
    tw.length ? { label: labels.week,   items: tw } : null,
    tm.length ? { label: labels.month,  items: tm } : null,
    bf.length ? { label: labels.before, items: bf } : null,
  ]).filter(Boolean) as { label: string; items: ClearMindEntry[] }[];
}

// variant: 0=full, 1=compact (no prompt), 2=centered
function variant(i: number): 0 | 1 | 2 {
  if (i % 5 === 3) return 2;
  if (i % 3 === 1) return 1;
  return 0;
}

function Fragment({ entry, fi, delay }: { entry: ClearMindEntry; fi: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty      = useRef(new Animated.Value(7)).current;
  const { t }   = useLanguage();
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 360, delay, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(ty,      { toValue: 0, duration: 360, delay, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  }, []);

  const v = variant(fi);
  // t(entry.prompt): resolves translation keys for new entries, returns stored
  // text as-is for legacy entries (where the text itself was stored directly).
  const promptText = entry.prompt ? t(entry.prompt) : null;

  if (v === 2) return (
    <Animated.View style={[S.box, S.boxCentered, { opacity, transform: [{ translateY: ty }] }]}>
      {promptText ? <Text style={[S.prompt, { textAlign: 'center' }]}>{`"${promptText}"`}</Text> : null}
      <Text style={S.textCentered}>{entry.text}</Text>
      <Text style={S.dateCentered}>{fmt(entry.date)}</Text>
    </Animated.View>
  );

  return (
    <Animated.View style={[S.box, v === 1 && S.boxCompact, { opacity, transform: [{ translateY: ty }] }]}>
      <Text style={S.date}>{fmt(entry.date)}</Text>
      {promptText ? <Text style={S.prompt}>{`"${promptText}"`}</Text> : null}
      <Text style={S.text}>{entry.text}</Text>
    </Animated.View>
  );
}

function Echo({ text, delay, ambient = false }: { text: string; delay: number; ambient?: boolean }) {
  const op = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(op, { toValue: ambient ? 0.62 : 0.75, duration: 500, delay, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[S.echo, ambient && S.echoAmbient, { opacity: op }]}>
      <Text style={S.echoText}>{text}</Text>
    </Animated.View>
  );
}

export default function QuietReflectionsScreen() {
  const router = useRouter();
  const [all, setAll]         = useState<ClearMindEntry[]>([]);
  const [ready, setReady]     = useState(false);
  const [showAll, setShowAll] = useState(false);
  const expandFade = useRef(new Animated.Value(0)).current;
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getItem<ReflectionEntry[]>(StorageKeys.SPACE_REFLECTIONS, []).then(data => {
      setAll((data ?? []).slice().reverse());
      setReady(true);
      Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    });
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
    expandFade.setValue(0);
    Animated.timing(expandFade, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  };

  const { t } = useLanguage();
  const groupLabels = { week: t('qr.group.week'), month: t('qr.group.month'), before: t('qr.group.before') };
  const recent  = all.slice(0, 3);
  const older   = all.slice(3);
  const hasMore = older.length > 0;
  const total   = all.length;
  const topEchoKey = total >= 3 ? ECHO_KEYS[total % ECHO_KEYS.length] : null;
  const topEcho = topEchoKey ? t(topEchoKey) : null;
  const groups  = groupEntries(older, groupLabels);

  return (
    <View style={S.screen}>

      {/* Header */}
      <Animated.View style={[S.header, { opacity: headerFade }]}>
        <TouchableOpacity onPress={() => router.back()} style={S.back} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#3D3530" />
        </TouchableOpacity>
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={S.title}>{t('qr.title')}</Text>
          <Text style={S.sub}>{t('qr.subtitle')}</Text>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.scroll}>

        {/* Ambient echo — integrated under header, quiet */}
        {topEcho && <Echo text={topEcho} delay={80} ambient />}

        {/* Empty */}
        {ready && all.length === 0 && (
          <View style={S.empty}>
            <Text style={S.emptyTitle}>{t('qr.empty.title')}</Text>
            <Text style={S.emptyBody}>{t('qr.empty.body')}</Text>
          </View>
        )}

        {/* 3 most recent — flat, no group headers */}
        {recent.length > 0 && (
          <View style={S.section}>
            {recent.map((entry, i) => (
              <Fragment key={i} entry={entry} fi={i} delay={100 + i * 55} />
            ))}
          </View>
        )}

        {/* View older */}
        {ready && hasMore && !showAll && (
          <TouchableOpacity onPress={handleShowAll} style={S.viewOlderBtn} activeOpacity={0.7}>
            <Text style={S.viewOlderText}>{t('qr.view.older')}</Text>
          </TouchableOpacity>
        )}

        {/* Older entries — fade in on expand */}
        {showAll && (
          <Animated.View style={{ opacity: expandFade }}>
            {groups.map((g, gi) => (
              <View key={g.label}>
                <Text style={S.groupLabel}>{g.label}</Text>
                <View style={S.section}>
                  {g.items.map((entry, ii) => (
                    <Fragment
                      key={ii}
                      entry={entry}
                      fi={recent.length + ii + gi * 3}
                      delay={ii * 50}
                    />
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Closing */}
        {total > 0 && (
          <Text style={S.closing}>{t('qr.closing')}</Text>
        )}

      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAF6EF' },

  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingTop: 58, paddingHorizontal: Spacing.xl,
    paddingBottom: 16, gap: 8,
  },
  back:  { marginTop: 3, padding: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#3D3530', letterSpacing: -0.3 },
  sub:   { fontSize: 13, color: '#9B9590', fontStyle: 'italic' },

  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 80 },

  section: { gap: 14, marginTop: 4 },

  // ── Containers (barely-visible, Part 1 + 2) ──────────────────────────────
  // Screen bg: #FAF6EF — container: #F6F2EC — delta R:4 G:4 B:3 → Apple-level subtlety
  box: {
    backgroundColor: '#F6F2EC',
    borderRadius: 13,
    padding: 18,
    gap: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(201,151,58,0.10)',
    shadowColor: '#2A2018',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  boxCompact: {
    padding: 15,
    gap: 8,
  },
  boxCentered: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    gap: 12,
  },

  // ── Typography ────────────────────────────────────────────────────────────
  date: { fontSize: 10, fontWeight: '600', color: '#C9973A', letterSpacing: 1.3 },
  prompt: { fontSize: 12, color: '#A8A098', fontStyle: 'italic', lineHeight: 18 },
  text:   { fontSize: 16, color: '#3D3530', lineHeight: 26, letterSpacing: -0.1 },

  textCentered: {
    fontSize: 15, color: '#3D3530', lineHeight: 24,
    textAlign: 'center', fontStyle: 'italic', letterSpacing: -0.1,
  },
  dateCentered: { fontSize: 10, fontWeight: '600', color: '#C9973A', letterSpacing: 1.3, opacity: 0.6 },

  // ── Echo — ambient (Part 3) ───────────────────────────────────────────────
  echo: { paddingVertical: 18, alignItems: 'center' },
  echoAmbient: { paddingVertical: 12, marginBottom: 6 },
  echoText: { fontSize: 12, color: '#A8A098', fontStyle: 'italic', textAlign: 'center', lineHeight: 18 },

  // ── Group label ───────────────────────────────────────────────────────────
  groupLabel: {
    fontSize: 10, fontWeight: '600', color: '#C9B8A0',
    letterSpacing: 1.8, textTransform: 'uppercase',
    marginTop: 34, marginBottom: 12,
  },

  // ── View older (Part 4) ───────────────────────────────────────────────────
  viewOlderBtn: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewOlderText: {
    fontSize: 12, color: '#A8A098',
    fontStyle: 'italic', letterSpacing: 0.2,
  },

  // ── Closing ───────────────────────────────────────────────────────────────
  closing: {
    marginTop: 52, fontSize: 12, color: '#C0B8B0',
    fontStyle: 'italic', textAlign: 'center',
    letterSpacing: 0.2,
  },

  // ── Empty ─────────────────────────────────────────────────────────────────
  empty: { paddingTop: 72, alignItems: 'center', gap: 10 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: '#9B9590', textAlign: 'center', lineHeight: 22 },
  emptyBody:  { fontSize: 13, color: '#C0B8B0', fontStyle: 'italic', textAlign: 'center' },
});

// ─── MoodBadge ────────────────────────────────────────────────────────────────
// Shared emotional-state indicator — same visual language as Home mood selector.
// Use selected=true (default) for read-only display; pass onPress for interactive.

import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import { Colors } from '../../theme';

interface Props {
  mood: 'hard' | 'okay' | 'good';
  selected?: boolean;
  onPress?: () => void;
}

export function MoodBadge({ mood, selected = true, onPress }: Props) {
  const { t } = useLanguage();
  const sel = selected;
  const lineColor = sel ? Colors.gold : 'rgba(120,110,100,0.50)';

  const icon =
    mood === 'hard' ? (
      // ︵ frown — top arc
      <View style={{ width: 18, height: 10, overflow: 'hidden' }}>
        <View style={{
          width: 28, height: 28, borderRadius: 14,
          borderWidth: 1.5, borderColor: lineColor,
          position: 'absolute', left: -5, top: 0,
        }} />
      </View>
    ) : mood === 'okay' ? (
      // — neutral line
      <View style={{ width: 13, height: 1.5, backgroundColor: lineColor, borderRadius: 1 }} />
    ) : (
      // ︶ smile — bottom arc
      <View style={{ width: 18, height: 10, overflow: 'hidden' }}>
        <View style={{
          width: 28, height: 28, borderRadius: 14,
          borderWidth: 1.5, borderColor: lineColor,
          position: 'absolute', left: -5, bottom: 0,
        }} />
      </View>
    );

  const inner = (
    <>
      <View style={{
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: sel ? 'rgba(201,151,58,0.14)' : 'rgba(180,168,154,0.10)',
        borderWidth: 1,
        borderColor: sel ? 'rgba(201,151,58,0.45)' : 'rgba(180,168,154,0.22)',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: sel ? Colors.gold : 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: sel ? 0.20 : 0,
        shadowRadius: sel ? 5 : 0,
      }}>
        {icon}
      </View>
      <Text style={{
        fontSize: 10,
        color: sel ? Colors.gold : Colors.textMuted,
        marginTop: 4,
        fontWeight: sel ? '600' : '400',
      }}>
        {t('today.mood.' + mood)}
      </Text>
    </>
  );

  const containerStyle = {
    alignItems: 'center' as const,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: sel ? '#F5EDD8' : Colors.backgroundSecondary,
    borderWidth: sel ? 1 : 0,
    borderColor: sel ? Colors.gold : 'transparent',
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={containerStyle}>
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}

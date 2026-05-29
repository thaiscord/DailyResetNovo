import { useRef } from 'react';
import { Animated, TouchableOpacity, ViewStyle } from 'react-native';

interface PressableScaleProps {
  onPress?: () => void;
  onLongPress?: () => void;
  scale?: number;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  activeOpacity?: number;
  disabled?: boolean;
}

/**
 * TouchableOpacity that spring-scales on press.
 * All layout styles go on the outer Animated.View via `style`.
 */
export default function PressableScale({
  onPress,
  onLongPress,
  scale = 0.97,
  children,
  style,
  activeOpacity = 0.95,
  disabled,
}: PressableScaleProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: scale, friction: 12, tension: 300, useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1, friction: 6, tension: 180, useNativeDriver: true,
    }).start();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      activeOpacity={activeOpacity}
      disabled={disabled}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

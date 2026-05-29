import { useRef, useEffect } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromY?: number;
  style?: ViewStyle | ViewStyle[];
}

/**
 * Fades in + slides up from fromY to 0 on mount.
 * Use delay to stagger multiple elements.
 */
export default function FadeInView({
  children,
  delay = 0,
  duration = 340,
  fromY = 12,
  style,
}: FadeInViewProps) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration, delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, duration, delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

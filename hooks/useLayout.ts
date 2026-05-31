import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Clamp a font size between min and max based on screen width. */
export function clampFont(size: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, size));
}

export function useLayout() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Phone size breakpoints
  const isXS      = width < 360;   // very small (320px iPhone SE 1st gen)
  const isSM      = width < 430;   // standard phones (375–414px)
  const isTablet  = width >= 768;  // iPad / small desktop
  const isDesktop = width >= 1024; // large desktop browsers

  // Screen-level horizontal padding — tighter on tiny phones
  const hPad: number = isXS ? 14 : isSM ? 20 : isTablet ? 32 : 24;

  // Card-level horizontal margin
  const cardHMargin: number = isXS ? 12 : isSM ? 16 : isTablet ? 32 : 20;

  // Max content width for tablet/desktop so layout doesn't stretch
  const contentMaxWidth: number | undefined = isTablet ? 640 : undefined;

  // Scale factor for large display text (hero numbers, streak, etc.)
  // 1.0 on 375px+, slightly smaller on tiny phones
  const displayScale: number = isXS ? 0.82 : isSM ? 1 : isTablet ? 1.1 : 1;

  /** Scale a font size; useful for large display numbers that can break layout on tiny screens. */
  const scaleFont = (base: number, min?: number, max?: number): number => {
    const scaled = Math.round(base * displayScale);
    if (min !== undefined && scaled < min) return min;
    if (max !== undefined && scaled > max) return max;
    return scaled;
  };

  return {
    width,
    height,
    insets,
    isXS,
    isSM,
    isTablet,
    isDesktop,
    hPad,
    cardHMargin,
    contentMaxWidth,
    displayScale,
    scaleFont,
  };
}

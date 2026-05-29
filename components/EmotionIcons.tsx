/**
 * EmotionIcons — Premium minimalist outline icons for the five Daily Reset
 * emotional states. All icons share the same visual grammar:
 *
 *   • 20 × 20 viewBox
 *   • strokeWidth 1.5
 *   • strokeLinecap / strokeLinejoin "round"
 *   • fill "none" (pure line icons)
 *   • single color prop — caller controls active/inactive palette
 *
 * Design inspiration: Apple Health, SF Symbols, Headspace, Stoic.
 */
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export interface EmotionIconProps {
  size?: number;
  color?: string;
}

const SW = 1.5;
const CAP = 'round' as const;
const JOIN = 'round' as const;

// Shared stroke props spread onto every Path
function s(color: string) {
  return {
    stroke: color,
    strokeWidth: SW,
    strokeLinecap: CAP,
    strokeLinejoin: JOIN,
    fill: 'none' as const,
  };
}

// ─── Pressure ────────────────────────────────────────────────────────────────
//
// Two solid horizontal bars (the "clamp") with opposing arrows in the gap
// between them — top arrow pointing down, bottom arrow pointing up — both
// converging toward the center.  Communicates compression / overwhelm.

export function PressureIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Top bar */}
      <Path d="M2,4.5 H18" {...s(color)} />
      {/* Downward arrow shaft */}
      <Path d="M10,6.5 V9" {...s(color)} />
      {/* Downward arrowhead  (wings at y=8, tip at y=10.5) */}
      <Path d="M7.5,8 L10,10.5 L12.5,8" {...s(color)} />
      {/* Upward arrow shaft */}
      <Path d="M10,13.5 V11" {...s(color)} />
      {/* Upward arrowhead  (wings at y=12, tip at y=9.5) */}
      <Path d="M7.5,12 L10,9.5 L12.5,12" {...s(color)} />
      {/* Bottom bar */}
      <Path d="M2,15.5 H18" {...s(color)} />
    </Svg>
  );
}

// ─── Foggy ───────────────────────────────────────────────────────────────────
//
// Three horizontal mist lines of decreasing width, evenly spaced.
// The progressive narrowing suggests atmospheric fade — fog dissolving
// into the distance.  Communicates numbness and mental cloudiness.

export function FoggyIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M2,7 H18" {...s(color)} />
      <Path d="M4,11 H16" {...s(color)} />
      <Path d="M6,15 H14" {...s(color)} />
    </Svg>
  );
}

// ─── Mental Weight ───────────────────────────────────────────────────────────
//
// A downward arrow whose tip lands on a grounded horizontal baseline.
// The arrow = the pull of mental load; the baseline = the weight resting,
// unable to rise.  Communicates heaviness and inner burden.

export function MentalWeightIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Vertical shaft */}
      <Path d="M10,3.5 V11" {...s(color)} />
      {/* Downward arrowhead  (wings at y=9, tip at y=12) */}
      <Path d="M7,9 L10,12 L13,9" {...s(color)} />
      {/* Ground line */}
      <Path d="M5.5,13 H14.5" {...s(color)} />
    </Svg>
  );
}

// ─── Low Energy ──────────────────────────────────────────────────────────────
//
// Classic battery outline with a minimal charge bar at the left end.
// The charge bar is deliberately small — visible, but barely — to read
// as near-empty without requiring any text label.

export function LowEnergyIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Battery body */}
      <Rect
        x="1.5" y="6.5" width="14" height="7"
        rx="1.5" ry="1.5"
        stroke={color} strokeWidth={SW} fill="none"
      />
      {/* Positive terminal nub */}
      <Path d="M15.5,9 H17.5 V11 H15.5" {...s(color)} />
      {/* Low-charge indicator — small filled bar, ~15 % capacity */}
      <Rect
        x="3" y="8.5" width="2.5" height="3"
        rx="0.5" ry="0.5"
        fill={color} stroke="none"
      />
    </Svg>
  );
}

// ─── Inner Noise ─────────────────────────────────────────────────────────────
//
// Three sinusoidal wave lines of varying amplitude and length — each row
// at a different vertical position.  The irregular rhythm (vs. the even
// horizontal lines of FoggyIcon) signals disruption, mental static,
// and anxiety rather than stillness.

export function InnerNoiseIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Top wave — 2.5 cycles, tightest amplitude */}
      <Path
        d="M2,7.5 C4.5,5.5 5.5,9.5 8,7.5 C10.5,5.5 11.5,9.5 14,7.5 C15.5,6.5 17,8.5 18,7.5"
        {...s(color)}
      />
      {/* Middle wave — 1.5 cycles, medium amplitude */}
      <Path
        d="M2,11 C4,9 6,13 9,11 C12,9 14,13 17,11"
        {...s(color)}
      />
      {/* Bottom wave — 1 cycle, wider amplitude, shorter span */}
      <Path
        d="M3,14.5 C5.5,12.5 7.5,16.5 10.5,14.5 C13,12.5 15,15.5 17,14.5"
        {...s(color)}
      />
    </Svg>
  );
}

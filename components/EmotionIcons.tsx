/**
 * EmotionIcons — Premium minimalist outline icons for the five Daily Reset
 * emotional states. All icons share the same visual grammar:
 *
 *   • 20 × 20 viewBox
 *   • strokeWidth 1.5
 *   • strokeLinecap / strokeLinejoin "round"
 *   • monochromatic — single color prop, caller controls active/inactive
 *
 * Design reference: Apple Health · SF Symbols · Headspace · Stoic.
 */
import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export interface EmotionIconProps {
  size?: number;
  color?: string;
}

const SW  = 1.5;
const CAP = 'round' as const;
const JN  = 'round' as const;

/** Shared stroke props for Path/Rect/Circle elements. */
function sp(color: string) {
  return {
    stroke: color,
    strokeWidth: SW,
    strokeLinecap: CAP,
    strokeLinejoin: JN,
    fill: 'none' as const,
  };
}

// ─── Pressure ─────────────────────────────────────────────────────────────────
//
// A circle gently held between two horizontal bars.
// The bars act as "press plates" — closer to the circle than comfortable,
// creating a quiet visual tension without dramatism.
// The circle is intact but clearly constrained, not crushed.
//
// Communicates: overwhelm, being held too tight, pressure that hasn't
// broken anything yet — but is present.

export function PressureIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Upper press plate */}
      <Path d="M3,5 H17" {...sp(color)} />
      {/* The circle under pressure — centered, intact, constrained */}
      <Circle cx="10" cy="10" r="3" {...sp(color)} />
      {/* Lower press plate */}
      <Path d="M3,15 H17" {...sp(color)} />
    </Svg>
  );
}

// ─── Foggy ────────────────────────────────────────────────────────────────────
//
// Three horizontal mist lines with a slightly organic spacing variation —
// not a perfect arithmetic sequence but a gentle irregular fade, like real
// fog dissolving layer by layer.
//
// Communicates: numbness, lack of clarity, mental cloudiness, the feeling
// of not quite arriving at a thought.

export function FoggyIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Long — full mist layer */}
      <Path d="M2,7 H18" {...sp(color)} />
      {/* Medium — mid-distance fade (slightly asymmetric start) */}
      <Path d="M4,10.5 H16" {...sp(color)} />
      {/* Short — distant layer almost dissolved */}
      <Path d="M7,14 H14" {...sp(color)} />
    </Svg>
  );
}

// ─── Mental Weight ────────────────────────────────────────────────────────────
//
// A circle (the mental space) with a small filled dot settled into the
// lower portion by gravity.  The dot is NOT at the center — it has
// drifted downward, pulled by its own heaviness, and come to rest.
//
// Communicates: heaviness, cognitive load, the feeling of something
// heavy occupying your inner space — static, not moving, just there.
// Deliberately NOT directional.

export function MentalWeightIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Outer circle — the mental container */}
      <Circle cx="10" cy="9.5" r="5" {...sp(color)} />
      {/* Inner dot — the weight that has settled at the bottom */}
      <Circle cx="10" cy="12" r="1.5" fill={color} stroke="none" />
    </Svg>
  );
}

// ─── Low Energy ───────────────────────────────────────────────────────────────
//
// Battery outline with a small filled charge bar — deliberately narrow,
// just enough to register as "almost nothing left."
// Charge indicator is slightly larger than v1 for better legibility
// on small-screen devices without breaking the minimal silhouette.

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
      <Path d="M15.5,9 H17.5 V11 H15.5" {...sp(color)} />
      {/* Low-charge indicator — ~18 % capacity, slightly more visible than v1 */}
      <Rect
        x="3" y="8.5" width="3" height="3"
        rx="0.5" ry="0.5"
        fill={color} stroke="none"
      />
    </Svg>
  );
}

// ─── Inner Noise ──────────────────────────────────────────────────────────────
//
// Three organic sinusoidal wave lines at different vertical positions.
// Each wave has a distinct cycle count and amplitude, creating an irregular
// rhythm that reads as disruption — mental static rather than sound.
// Contrast with FoggyIcon (straight, still) makes recognition immediate.
//
// v2: top wave reduced from 2.5 to 2 full cycles for cleaner legibility
// at 20 px; all three waves have slightly adjusted control points for
// a more organic, less mechanical curvature.

export function InnerNoiseIcon({ size = 20, color = '#7A6E68' }: EmotionIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Top wave — 2 cycles, tight amplitude */}
      <Path
        d="M2,7.5 C5,5.5 7,9.5 10,7.5 C13,5.5 15,9.5 18,7.5"
        {...sp(color)}
      />
      {/* Middle wave — 1.5 cycles, moderate amplitude */}
      <Path
        d="M2,11 C4.5,9 7,13 10,11 C12.5,9 15.5,13 18,11"
        {...sp(color)}
      />
      {/* Bottom wave — 1 cycle, wider amplitude, shorter reach */}
      <Path
        d="M3,14.5 C5.5,12 8,17 11,14.5 C14,12 16.5,16 17.5,14.5"
        {...sp(color)}
      />
    </Svg>
  );
}

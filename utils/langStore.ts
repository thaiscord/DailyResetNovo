// ─── Module-level language store ─────────────────────────────────────────────
// Utility functions that run outside React components need the active language
// without React context. LanguageProvider syncs this store on every change.

let _lang = 'en';

export function setActiveLang(lang: string): void {
  _lang = lang;
}

export function getActiveLang(): string {
  return _lang;
}

/** True when Spanish is active. */
export function isEs(): boolean {
  return _lang === 'es';
}

/** True when Portuguese is active. */
export function isPt(): boolean {
  return _lang === 'pt';
}

/** True when French is active. */
export function isFr(): boolean {
  return _lang === 'fr';
}

/** True when German is active. */
export function isDe(): boolean {
  return _lang === 'de';
}

/**
 * Pick a localized string: returns `es` when Spanish is active, else `en`.
 * Works for any object with `{ en: string; es: string }` shape.
 */
export function loc(strings: { en: string; es: string }): string {
  return _lang === 'es' ? strings.es : strings.en;
}

/**
 * Pick from two parallel pools based on active language.
 * Falls back to English pool when the Spanish pool is shorter.
 */
export function pickLocalized<T>(enPool: T[], esPool: T[], seed: number): T {
  const pool = (_lang === 'es' && esPool.length > 0) ? esPool : enPool;
  return pool[Math.abs(seed) % pool.length];
}

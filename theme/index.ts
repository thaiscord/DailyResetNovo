// ─── Identidade Visual Daily Reset ───────────────────────────────────────────
// Ref principal: Identidade Visual 1 (Crextio Dashboard)
//   → Fundo: creme quente  Cards: branco puro  Accent: amarelo #EFC94C
//   → Dark: charcoal #1C1C1C  Tipografia clean e espaçada
// Ref secundária: Identidade Visual 2 → minimalismo, elegância, respiração
// Logo: PNG transparente, dourado — perfeito sobre fundos claros

export const Colors = {
  // ── Fundos — creme exato do fundo do novo LOGO ────────────────────────────
  background: '#FEF9EC',           // creme claro do logo (combina perfeitamente)
  backgroundSecondary: '#F5EFD8',  // ligeiramente mais escuro para contraste
  backgroundWarm: '#FEF9EC',       // mesmo que background (logo tem fundo uniforme)

  // ── Cards — ivory flutuante (Imagem 1) ────────────────────────────────────
  card: '#FDFAF4',
  cardLight: '#F9F6EF',
  cardDark: '#1C1C1C',             // card escuro (Onboarding Task da Imagem 1)

  // ── Accent Amarelo — cor primária da Imagem 1 ──────────────────────────────
  // Usado nos pills "Hired", barra do gráfico, anel do Time Tracker, pill "Task"
  accent: '#EFC94C',
  accentLight: '#F5D870',
  accentDim: 'rgba(239,201,76,0.18)',
  accentGlow: 'rgba(239,201,76,0.30)',

  // ── Gold — cor do LOGO (nascer do sol, texto "DAILY RESET") ────────────────
  gold: '#C9A84C',
  goldBright: '#E0BA50',

  // ── Charcoal — dark principal da Imagem 1 ─────────────────────────────────
  // Usado no pill "Dashboard" ativo, dark card, botões primários
  charcoal: '#1C1C1C',
  charcoalMid: '#2E2E2E',
  charcoalLight: '#3D3D3D',

  // ── Texto (sobre fundos claros) ────────────────────────────────────────────
  textPrimary: '#1C1C1C',          // charcoal (Imagem 1 headings)
  textSecondary: '#6B6B6B',        // cinza médio
  textMuted: '#A8A8A8',            // cinza claro
  textInverse: '#FFFFFF',          // texto sobre fundo escuro

  // ── Utilitários ────────────────────────────────────────────────────────────
  white: '#FFFFFF',
  success: '#3DB86A',
  successDim: 'rgba(61,184,106,0.14)',
  danger: '#E04040',
  streak: '#F59A20',               // laranja-âmbar para a chama
  border: 'rgba(28,28,28,0.09)',   // borda sutil sobre branco
  borderLight: 'rgba(28,28,28,0.05)',
  overlay: 'rgba(28,28,28,0.82)',
};

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    base: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    xxxl: 38,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
    black: '900' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

// Sombras naturais para cards brancos sobre fundo creme (estilo Imagem 1)
export const Shadows = {
  card: {
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 6,
  },
  cardStrong: {
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  accent: {
    shadowColor: '#EFC94C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.40,
    shadowRadius: 16,
    elevation: 8,
  },
  charcoal: {
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
  },
};

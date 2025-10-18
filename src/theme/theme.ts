/**
 * WorkSens Theme Configuration
 * 
 * Centralized theme configuration for consistent styling across the application.
 * Import this file wherever you need to use theme colors programmatically.
 */

export const theme = {
  // Brand Colors
  colors: {
    // Primary Colors
    deepNavy: '#0A192F',
    platinumGray: '#7e7e7eff',
    accentCyan: '#858585ff',
    mutedSilver: '#B0B8C1',
    
    // Semantic Colors
    primary: '#0A192F',        // Deep Navy
    secondary: '#2BB3F3',      // Accent Cyan-Blue
    background: '#E6E8EB',     // Platinum Gray
    surface: '#FFFFFF',        // White for cards/surfaces
    
    // Text Colors
    textPrimary: '#0A192F',    // Deep Navy for main text
    textSecondary: '#B0B8C1',  // Muted Silver for secondary text
    textOnPrimary: '#FFFFFF',  // White text on navy background
    textOnSecondary: '#0A192F', // Navy text on cyan background
    
    // UI States
    success: '#10B981',        // Green for success states
    warning: '#F59E0B',        // Amber for warnings
    error: '#EF4444',          // Red for errors
    info: '#2BB3F3',           // Cyan-blue for info
    
    // Borders & Dividers
    border: '#B0B8C1',         // Muted Silver
    borderLight: '#E6E8EB',    // Platinum Gray
    divider: '#E6E8EB',
    
    // Hover & Active States
    hoverNavy: '#0D1F3F',      // Slightly lighter navy
    hoverCyan: '#1FA3E3',      // Slightly darker cyan
    activeNavy: '#051020',     // Darker navy
    activeCyan: '#0E93D3',     // Darker cyan
    
    // Shadows & Overlays
    shadow: 'rgba(10, 25, 47, 0.1)',
    shadowMedium: 'rgba(10, 25, 47, 0.15)',
    shadowLarge: 'rgba(10, 25, 47, 0.2)',
    overlay: 'rgba(10, 25, 47, 0.5)',
  },
  
  // Typography
  fonts: {
    primary: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    fallback: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  
  // Font Weights
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Spacing Scale (rem)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
    xxxl: '4rem',     // 64px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(10, 25, 47, 0.08)',
    md: '0 4px 6px rgba(10, 25, 47, 0.1)',
    lg: '0 10px 15px rgba(10, 25, 47, 0.12)',
    xl: '0 20px 25px rgba(10, 25, 47, 0.15)',
    inner: 'inset 0 2px 4px rgba(10, 25, 47, 0.06)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },
  
  // Breakpoints (for media queries)
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
} as const;

// CSS Variables export for use in CSS files
export const cssVariables = `
  --color-deep-navy: ${theme.colors.deepNavy};
  --color-platinum-gray: ${theme.colors.platinumGray};
  --color-accent-cyan: ${theme.colors.accentCyan};
  --color-muted-silver: ${theme.colors.mutedSilver};
  
  --color-primary: ${theme.colors.primary};
  --color-secondary: ${theme.colors.secondary};
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  
  --color-text-primary: ${theme.colors.textPrimary};
  --color-text-secondary: ${theme.colors.textSecondary};
  --color-text-on-primary: ${theme.colors.textOnPrimary};
  --color-text-on-secondary: ${theme.colors.textOnSecondary};
  
  --color-success: ${theme.colors.success};
  --color-warning: ${theme.colors.warning};
  --color-error: ${theme.colors.error};
  --color-info: ${theme.colors.info};
  
  --color-border: ${theme.colors.border};
  --color-border-light: ${theme.colors.borderLight};
  --color-divider: ${theme.colors.divider};
  
  --font-primary: ${theme.fonts.primary};
  
  --shadow-sm: ${theme.shadows.sm};
  --shadow-md: ${theme.shadows.md};
  --shadow-lg: ${theme.shadows.lg};
  --shadow-xl: ${theme.shadows.xl};
  
  --radius-sm: ${theme.borderRadius.sm};
  --radius-md: ${theme.borderRadius.md};
  --radius-lg: ${theme.borderRadius.lg};
  --radius-xl: ${theme.borderRadius.xl};
  
  --transition-fast: ${theme.transitions.fast};
  --transition-normal: ${theme.transitions.normal};
  --transition-slow: ${theme.transitions.slow};
`;

// Type exports for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeFonts = typeof theme.fonts;

export default theme;

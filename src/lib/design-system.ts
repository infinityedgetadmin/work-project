/**
 * Genesys QA Dashboard Design System
 * 
 * A comprehensive design system for glassmorphic UI components with Genesys brand colors,
 * gradients, glass effects, and dark theme. This system is used throughout the application
 * for consistent, modern UI components.
 */

// ============================================================================
// COLOR PALETTE - GENESYS BRAND COLORS
// ============================================================================

export const colors = {
  // Primary Brand Colors
  primary: {
    orange: '#FF451A',      // Genesys primary orange
    orangeLight: '#FF6B47',
    orangeDark: '#E63711',
    navy: '#152550',        // Genesys navy
    navyLight: '#1E3A7C',
    navyDark: '#0D1830',
  },

  // Secondary Colors
  secondary: {
    success: '#18CAA8',     // Genesys success green
    successLight: '#3DDDC0',
    info: '#2243A2',        // Genesys info blue
    infoLight: '#3562C9',
    warning: '#F7AD00',     // Genesys warning yellow
    warningLight: '#FFBF33',
    danger: '#CC3715',      // Genesys danger red
    dangerLight: '#E55936',
  },

  // Neutral Colors (for glassmorphism)
  neutral: {
    white: '#ffffff',
    black: '#000000',
    textPrimary: 'rgba(255,255,255,0.95)',
    textSecondary: 'rgba(255,255,255,0.85)',
    textMuted: 'rgba(255,255,255,0.65)',
    textDisabled: 'rgba(255,255,255,0.45)',
    borderLight: 'rgba(255,255,255,0.12)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    glassBg: 'rgba(255,255,255,0.05)',
  },

  // Dark Theme Colors
  dark: {
    background: '#0A0E1C',
    surface: '#111827',
    elevated: '#1F2937',
  },
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  // Background Gradients with Genesys colors
  backgrounds: {
    primary: 'linear-gradient(135deg, rgba(255,69,26,0.1) 0%, rgba(21,37,80,0.08) 100%)',
    hero: 'linear-gradient(135deg, #0A0E1C 0%, #152550 50%, #0A0E1C 100%)',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
    glassCard: 'linear-gradient(135deg, rgba(255,69,26,0.03) 0%, rgba(21,37,80,0.05) 50%, rgba(255,255,255,0.02) 100%)',
    dialog: 'linear-gradient(135deg, rgba(21,37,80,0.15) 0%, rgba(255,69,26,0.08) 50%, rgba(0,0,0,0.85) 100%)',
    errorGlass: 'linear-gradient(135deg, rgba(204,55,21,0.25) 0%, rgba(0,0,0,0.5) 100%)',
    successGlass: 'linear-gradient(135deg, rgba(24,202,168,0.25) 0%, rgba(0,0,0,0.5) 100%)',
  },

  // Button Gradients
  buttons: {
    primary: 'linear-gradient(135deg, #FF451A 0%, #FF6B47 100%)',
    primaryHover: 'linear-gradient(135deg, #FF6B47 0%, #FF451A 100%)',
    secondary: 'linear-gradient(135deg, #152550 0%, #1E3A7C 100%)',
    success: 'linear-gradient(135deg, #18CAA8 0%, #3DDDC0 100%)',
    info: 'linear-gradient(135deg, #2243A2 0%, #3562C9 100%)',
    glass: 'linear-gradient(135deg, rgba(255,69,26,0.1) 0%, rgba(21,37,80,0.1) 100%)',
  },

  // Status Gradients
  status: {
    active: 'linear-gradient(135deg, #18CAA8 0%, #3DDDC0 100%)',
    pending: 'linear-gradient(135deg, #F7AD00 0%, #FFBF33 100%)',
    failed: 'linear-gradient(135deg, #CC3715 0%, #E55936 100%)',
    completed: 'linear-gradient(135deg, #18CAA8 0%, #3DDDC0 100%)',
    inProgress: 'linear-gradient(135deg, #2243A2 0%, #3562C9 100%)',
  },

  // Text Gradients
  text: {
    primary: 'linear-gradient(135deg, #FF451A 0%, #FF6B47 100%)',
    title: 'linear-gradient(135deg, #ffffff 0%, #FF6B47 100%)',
    accent: 'linear-gradient(135deg, #FF451A 0%, #152550 100%)',
  },

  // Border Gradients
  borders: {
    accent: 'linear-gradient(90deg, transparent, rgba(255,69,26,0.6), rgba(21,37,80,0.6), transparent)',
    glow: 'linear-gradient(90deg, rgba(255,69,26,0.8), rgba(21,37,80,0.8), rgba(255,69,26,0.8))',
  },
} as const;

// ============================================================================
// GLASS MORPHISM EFFECTS
// ============================================================================

export const glassEffects = {
  // Backdrop Filters
  backdrop: {
    strong: 'blur(20px) saturate(180%)',
    medium: 'blur(12px) saturate(150%)',
    subtle: 'blur(8px) saturate(120%)',
    light: 'blur(4px)',
  },

  // Glass Backgrounds
  backgrounds: {
    dark: 'rgba(10,14,28,0.4)',
    darker: 'rgba(10,14,28,0.6)',
    darkest: 'rgba(10,14,28,0.85)',
    light: 'rgba(255,255,255,0.08)',
    lighter: 'rgba(255,255,255,0.04)',
    colored: 'rgba(255,69,26,0.05)',
  },

  // Glass Borders
  borders: {
    strong: '1px solid rgba(255,255,255,0.18)',
    medium: '1px solid rgba(255,255,255,0.12)',
    subtle: '1px solid rgba(255,255,255,0.08)',
    colored: '1px solid rgba(255,69,26,0.3)',
    gradient: '1px solid transparent',
  },
} as const;

// ============================================================================
// SHADOWS & GLOWS
// ============================================================================

export const shadows = {
  // Box Shadows
  box: {
    small: '0 2px 8px rgba(0,0,0,0.3)',
    medium: '0 4px 16px rgba(0,0,0,0.4)',
    large: '0 8px 32px rgba(0,0,0,0.5)',
    xlarge: '0 12px 48px rgba(0,0,0,0.6)',
    glass: '0 8px 32px rgba(10,14,28,0.5)',
    colored: '0 8px 32px rgba(255,69,26,0.25)',
    coloredHover: '0 12px 40px rgba(255,69,26,0.35)',
    inset: 'inset 0 2px 4px rgba(0,0,0,0.2)',
  },

  // Text Shadows (Glow Effects)
  text: {
    subtle: '0 1px 2px rgba(0,0,0,0.3)',
    glow: '0 0 10px rgba(255,255,255,0.5)',
    glowOrange: '0 0 20px rgba(255,69,26,0.6)',
    glowGreen: '0 0 20px rgba(24,202,168,0.6)',
    glowBlue: '0 0 20px rgba(34,67,162,0.6)',
  },
} as const;

// ============================================================================
// TYPOGRAPHY - USING ROBOTO (GENESYS FONT)
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    default: 'Roboto, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    monospace: '"Roboto Mono", monospace',
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// SPACING & LAYOUT
// ============================================================================

export const spacing = {
  // Border Radius (matching Genesys style)
  borderRadius: {
    none: '0',
    sm: '0.5rem',       // 8px
    md: '0.75rem',      // 12px
    lg: '1rem',         // 16px
    xl: '1.5rem',       // 24px
    '2xl': '2rem',      // 32px
    full: '9999px',
  },

  // Common Dimensions
  dimensions: {
    headerHeight: '64px',
    sidebarWidth: '256px',
    sidebarCollapsed: '64px',
    cardPadding: '1.5rem',
  },
} as const;

// ============================================================================
// ANIMATIONS & TRANSITIONS
// ============================================================================

export const animations = {
  // Transition Durations
  duration: {
    instant: '50ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Easing Functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Hover Transforms
  transforms: {
    lift: 'translateY(-2px)',
    liftHigh: 'translateY(-4px)',
    scale: 'scale(1.02)',
    scaleSubtle: 'scale(1.01)',
    scaleLarge: 'scale(1.05)',
  },
} as const;

// ============================================================================
// COMPONENT PRESETS
// ============================================================================

export const componentPresets = {
  // Glass Card
  glassCard: {
    background: gradients.backgrounds.glassCard,
    backdropFilter: glassEffects.backdrop.medium,
    border: glassEffects.borders.subtle,
    borderRadius: spacing.borderRadius.lg,
    boxShadow: shadows.box.glass,
    transition: `all ${animations.duration.normal} ${animations.easing.default}`,
  },

  // Glass Button
  glassButton: {
    background: glassEffects.backgrounds.light,
    backdropFilter: glassEffects.backdrop.subtle,
    border: glassEffects.borders.medium,
    borderRadius: spacing.borderRadius.md,
    padding: '0.75rem 1.5rem',
    fontWeight: typography.fontWeight.medium,
    transition: `all ${animations.duration.fast} ${animations.easing.default}`,
    '&:hover': {
      background: glassEffects.backgrounds.colored,
      transform: animations.transforms.lift,
      boxShadow: shadows.box.colored,
    },
  },

  // Primary Button
  primaryButton: {
    background: gradients.buttons.primary,
    color: colors.neutral.white,
    border: 'none',
    borderRadius: spacing.borderRadius.md,
    padding: '0.75rem 1.5rem',
    fontWeight: typography.fontWeight.semiBold,
    boxShadow: shadows.box.colored,
    transition: `all ${animations.duration.fast} ${animations.easing.default}`,
    '&:hover': {
      background: gradients.buttons.primaryHover,
      transform: animations.transforms.lift,
      boxShadow: shadows.box.coloredHover,
    },
  },

  // Glass Dialog
  glassDialog: {
    background: gradients.backgrounds.dialog,
    backdropFilter: glassEffects.backdrop.strong,
    border: glassEffects.borders.medium,
    borderRadius: spacing.borderRadius.xl,
    boxShadow: shadows.box.xlarge,
  },

  // Glass Input
  glassInput: {
    background: glassEffects.backgrounds.light,
    backdropFilter: glassEffects.backdrop.subtle,
    border: glassEffects.borders.subtle,
    borderRadius: spacing.borderRadius.md,
    padding: '0.75rem 1rem',
    color: colors.neutral.textPrimary,
    transition: `all ${animations.duration.fast} ${animations.easing.default}`,
    '&:focus': {
      border: glassEffects.borders.colored,
      background: glassEffects.backgrounds.colored,
      boxShadow: `0 0 0 3px rgba(255,69,26,0.1)`,
    },
  },

  // Status Badge
  statusBadge: (status: keyof typeof gradients.status) => ({
    background: gradients.status[status],
    color: colors.neutral.white,
    padding: '0.25rem 0.75rem',
    borderRadius: spacing.borderRadius.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: shadows.box.small,
  }),
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Apply glass morphism effect to an element
 */
export function applyGlassEffect(
  strength: 'strong' | 'medium' | 'subtle' = 'medium',
  withBorder = true
) {
  return {
    background: glassEffects.backgrounds.light,
    backdropFilter: glassEffects.backdrop[strength],
    border: withBorder ? glassEffects.borders[strength] : 'none',
    borderRadius: spacing.borderRadius.lg,
  };
}

/**
 * Create a gradient text effect
 */
export function createGradientText(gradient: keyof typeof gradients.text = 'primary') {
  return {
    background: gradients.text[gradient],
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: typography.fontWeight.bold,
  };
}

/**
 * Create a glow effect for text or elements
 */
export function createGlowEffect(color: 'orange' | 'green' | 'blue' | 'white' = 'orange') {
  const glowMap = {
    orange: { color: colors.primary.orange, textShadow: shadows.text.glowOrange },
    green: { color: colors.secondary.success, textShadow: shadows.text.glowGreen },
    blue: { color: colors.secondary.info, textShadow: shadows.text.glowBlue },
    white: { color: colors.neutral.white, textShadow: shadows.text.glow },
  };

  return glowMap[color];
}

/**
 * Get status color
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    success: colors.secondary.success,
    active: colors.secondary.success,
    completed: colors.secondary.success,
    passed: colors.secondary.success,
    
    warning: colors.secondary.warning,
    pending: colors.secondary.warning,
    inProgress: colors.secondary.warning,
    
    error: colors.secondary.danger,
    failed: colors.secondary.danger,
    blocked: colors.secondary.danger,
    
    info: colors.secondary.info,
    default: colors.neutral.textSecondary,
  };

  return statusMap[status.toLowerCase()] || statusMap.default;
}

// Export type definitions for TypeScript support
export type Colors = typeof colors;
export type Gradients = typeof gradients;
export type GlassEffects = typeof glassEffects;
export type Shadows = typeof shadows;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Animations = typeof animations;
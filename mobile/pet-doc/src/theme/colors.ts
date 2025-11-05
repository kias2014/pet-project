export const colors = {
  // Primary Brand Colors
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',

  // Secondary Colors
  secondary: '#10B981', // Green
  secondaryDark: '#059669',
  secondaryLight: '#34D399',

  // Accent Colors
  accent: '#F59E0B', // Amber
  accentDark: '#D97706',
  accentLight: '#FBBF24',

  // Neutral Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',

  surface: '#FFFFFF',
  surfaceSecondary: '#F9FAFB',

  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Status Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Semantic Colors
  successLight: '#D1FAE5',
  errorLight: '#FEE2E2',
  warningLight: '#FEF3C7',
  infoLight: '#DBEAFE',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Shadow
  shadow: '#000000',

  // Special
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ColorType = keyof typeof colors;

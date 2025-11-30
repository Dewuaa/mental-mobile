// Theme configuration for React Native
export const THEMES = [
  {
    id: 'lavender',
    name: 'Calm Lavender',
    colors: {
      primary: {
        50: '#F5F3FF',
        100: '#EDE9FE',
        200: '#DDD6FE',
        500: '#8B5CF6',
      },
      accent: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        500: '#14B8A6',
        600: '#0D9488',
      },
    },
  },
  {
    id: 'citrus',
    name: 'Energizing Citrus',
    colors: {
      primary: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        500: '#F97316',
      },
      accent: {
        50: '#F7FEE7',
        100: '#ECFCCB',
        500: '#84CC16',
        600: '#65A30D',
      },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        500: '#0EA5E9',
      },
      accent: {
        50: '#EEF2FF',
        100: '#E0E7FF',
        500: '#6366F1',
        600: '#4F46E5',
      },
    },
  },
];

// Common colors - Light Mode
export const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  teal: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
  },
  green: {
    400: '#4ADE80',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
  },
  indigo: {
    50: '#EEF2FF',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    900: '#312E81',
  },
  purple: {
    900: '#581C87',
  },
  orange: {
    50: '#FFF7ED',
    400: '#FB923C',
    500: '#F97316',
  },
  yellow: {
    50: '#FEFCE8',
    100: '#FEF9C3',
    400: '#FACC15',
    700: '#A16207',
  },
  pink: {
    50: '#FDF2F8',
    400: '#F472B6',
    500: '#EC4899',
  },
};

// Dark Mode Colors
export const DARK_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  slate: {
    50: '#0F172A', // Inverted for dark mode
    100: '#1E293B',
    200: '#334155',
    300: '#475569',
    400: '#64748B',
    500: '#94A3B8',
    600: '#CBD5E1',
    700: '#E2E8F0',
    800: '#F1F5F9',
    900: '#F8FAFC',
  },
  teal: {
    50: '#042F2E',
    100: '#134E4A',
    200: '#115E59',
    300: '#0F766E',
    400: '#14B8A6',
    500: '#2DD4BF',
    600: '#5EEAD4',
  },
  red: {
    50: '#450A0A',
    100: '#7F1D1D',
    500: '#EF4444',
    600: '#F87171',
  },
  green: {
    400: '#4ADE80',
  },
  blue: {
    50: '#172554',
    100: '#1E3A8A',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#93C5FD',
  },
  indigo: {
    50: '#1E1B4B',
    400: '#818CF8',
    500: '#6366F1',
    600: '#A5B4FC',
    900: '#E0E7FF',
  },
  purple: {
    900: '#C4B5FD',
  },
  orange: {
    50: '#431407',
    400: '#FB923C',
    500: '#F97316',
  },
  yellow: {
    50: '#422006',
    100: '#713F12',
    400: '#FACC15',
    700: '#FDE047',
  },
  pink: {
    50: '#500724',
    400: '#F472B6',
    500: '#EC4899',
  },
};

// Typography
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

// Border Radius
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows - Light Mode
export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Shadows - Dark Mode (more subtle)
export const DARK_SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
};

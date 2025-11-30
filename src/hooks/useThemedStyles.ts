import { useTheme } from '../contexts/ThemeContext';
import { ViewStyle, TextStyle } from 'react-native';

/**
 * Hook to get theme-aware styles
 * Use this to create dynamic styles that adapt to dark mode
 */
export const useThemedStyles = () => {
  const { colors, shadows, isDarkMode } = useTheme();

  // Common themed styles
  const themed = {
    // Containers
    container: {
      backgroundColor: colors.slate[50],
    } as ViewStyle,
    
    card: {
      backgroundColor: colors.white,
      ...shadows.soft,
    } as ViewStyle,
    
    cardElevated: {
      backgroundColor: colors.white,
      ...shadows.medium,
    } as ViewStyle,

    // Text
    textPrimary: {
      color: colors.slate[900],
    } as TextStyle,
    
    textSecondary: {
      color: colors.slate[600],
    } as TextStyle,
    
    textMuted: {
      color: colors.slate[400],
    } as TextStyle,

    // Borders
    border: {
      borderColor: colors.slate[200],
    } as ViewStyle,
    
    borderSubtle: {
      borderColor: colors.slate[100],
    } as ViewStyle,

    // Inputs
    input: {
      backgroundColor: colors.white,
      borderColor: colors.slate[200],
      color: colors.slate[900],
    } as ViewStyle & TextStyle,
    
    inputFocused: {
      borderColor: colors.teal[500],
    } as ViewStyle,
  };

  return { themed, colors, shadows, isDarkMode };
};

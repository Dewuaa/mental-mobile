import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { COLORS, DARK_COLORS, SHADOWS, DARK_SHADOWS } from '../theme';
import { userStorage } from '../services/storageService';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    accent: string;
  };
}

export const THEMES: Theme[] = [
  { 
    id: 'lavender', 
    name: 'Lavender Dream', 
    colors: { primary: '#A78BFA', accent: '#C4B5FD' } 
  },
  { 
    id: 'ocean', 
    name: 'Ocean Breeze', 
    colors: { primary: '#06B6D4', accent: '#67E8F9' } 
  },
  { 
    id: 'sunset', 
    name: 'Sunset Glow', 
    colors: { primary: '#FB923C', accent: '#FDBA74' } 
  },
  { 
    id: 'forest', 
    name: 'Forest Calm', 
    colors: { primary: '#10B981', accent: '#6EE7B7' } 
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: typeof COLORS;
  shadows: typeof SHADOWS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference on mount
  useEffect(() => {
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const savedMode = await userStorage.getDarkMode();
      if (savedMode !== null) {
        setIsDarkMode(savedMode);
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const setTheme = (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await userStorage.setDarkMode(newMode);
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  // Get appropriate colors and shadows based on dark mode
  const colors = isDarkMode ? DARK_COLORS : COLORS;
  const shadows = isDarkMode ? DARK_SHADOWS : SHADOWS;

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        setTheme, 
        isDarkMode, 
        toggleDarkMode,
        colors,
        shadows,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

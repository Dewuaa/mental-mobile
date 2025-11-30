import React, { createContext, useContext, useState, ReactNode } from 'react';
import { COLORS } from '../theme';

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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  const setTheme = (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
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

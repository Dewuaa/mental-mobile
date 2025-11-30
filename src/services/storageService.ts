import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
  USER_NAME: '@mentalwell/userName',
  USER_GOALS: '@mentalwell/userGoals',
  COMM_STYLE: '@mentalwell/commStyle',
  THEME: '@mentalwell/theme',
  MOOD_ENTRIES: '@mentalwell/moodEntries',
  CHAT_HISTORY: '@mentalwell/chatHistory',
  ONBOARDED: '@mentalwell/hasOnboarded',
};

// Generic storage functions
export const storageService = {
  // Save data
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  },

  // Get data
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  // Remove data
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  // Clear all data
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

// Specific storage functions
export const userStorage = {
  async setUserName(name: string): Promise<void> {
    return storageService.setItem(KEYS.USER_NAME, name);
  },

  async getUserName(): Promise<string | null> {
    return storageService.getItem<string>(KEYS.USER_NAME);
  },

  async setUserGoals(goals: string[]): Promise<void> {
    return storageService.setItem(KEYS.USER_GOALS, goals);
  },

  async getUserGoals(): Promise<string[] | null> {
    return storageService.getItem<string[]>(KEYS.USER_GOALS);
  },

  async setCommStyle(style: string): Promise<void> {
    return storageService.setItem(KEYS.COMM_STYLE, style);
  },

  async getCommStyle(): Promise<string | null> {
    return storageService.getItem<string>(KEYS.COMM_STYLE);
  },

  async setTheme(themeId: string): Promise<void> {
    return storageService.setItem(KEYS.THEME, themeId);
  },

  async getTheme(): Promise<string | null> {
    return storageService.getItem<string>(KEYS.THEME);
  },

  async setOnboarded(value: boolean): Promise<void> {
    return storageService.setItem(KEYS.ONBOARDED, value);
  },

  async getOnboarded(): Promise<boolean> {
    const value = await storageService.getItem<boolean>(KEYS.ONBOARDED);
    return value ?? false;
  },

  async setDarkMode(enabled: boolean): Promise<void> {
    return storageService.setItem('@mentalwell/darkMode', enabled);
  },

  async getDarkMode(): Promise<boolean | null> {
    return storageService.getItem<boolean>('@mentalwell/darkMode');
  },
};

export const moodStorage = {
  async saveMoodEntry(entry: { date: string; mood: number; label: string; note?: string }): Promise<void> {
    const entries = await this.getMoodEntries();
    entries.push(entry);
    return storageService.setItem(KEYS.MOOD_ENTRIES, entries);
  },

  async getMoodEntries(): Promise<Array<{ date: string; mood: number; label: string; note?: string }>> {
    const entries = await storageService.getItem<Array<{ date: string; mood: number; label: string; note?: string }>>(
      KEYS.MOOD_ENTRIES
    );
    return entries ?? [];
  },
};

export const chatStorage = {
  async saveChatHistory(messages: any[]): Promise<void> {
    return storageService.setItem(KEYS.CHAT_HISTORY, messages);
  },

  async getChatHistory(): Promise<any[]> {
    const history = await storageService.getItem<any[]>(KEYS.CHAT_HISTORY);
    return history ?? [];
  },

  async clearChatHistory(): Promise<void> {
    return storageService.removeItem(KEYS.CHAT_HISTORY);
  },
};

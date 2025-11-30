import React from 'react';

export enum Screen {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  EXERCISES = 'EXERCISES',
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
  THERAPISTS = 'THERAPISTS',
  PROFILE = 'PROFILE',
  CRISIS = 'CRISIS',
  SETTINGS = 'SETTINGS',
}

export interface MoodEntry {
  date: string;
  mood: number; // 1-5
  label: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  available: boolean;
}

export interface Post {
  id: string;
  author: string; // Anonymous alias
  content: string;
  likes: number;
  tags: string[];
  timestamp: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    500: string;
  };
  accent: {
    50: string;
    100: string;
    500: string;
    600: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Crisis: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Exercises: undefined;
  Chat: undefined;
  Community: undefined;
  Therapists: undefined;
  Profile: undefined;
};

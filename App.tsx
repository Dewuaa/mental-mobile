import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { SplashScreen } from './src/components/SplashScreen';
import { userStorage } from './src/services/storageService';
import { ToastProvider } from './src/context/ToastContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    checkOnboardingStatus();
    
    // Check onboarding status periodically
    const interval = setInterval(checkOnboardingStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboarded = await userStorage.getOnboarded();
      if (onboarded !== hasOnboarded) {
        setHasOnboarded(onboarded);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.slate[50] }}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.slate[50]}
      />
      <AppNavigator hasOnboarded={hasOnboarded} />
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

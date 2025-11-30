import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { SplashScreen } from './src/components/SplashScreen';
import { userStorage } from './src/services/storageService';
import { ToastProvider } from './src/context/ToastContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppNavigator hasOnboarded={hasOnboarded} />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

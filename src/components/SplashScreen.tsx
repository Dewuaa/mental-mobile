import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../theme';
import { LottieAnimation } from './LottieAnimation';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    
    // Text animation
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Finish after 3 seconds (give time for lottie to play)
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.indigo[500], COLORS.teal[500]]}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.logoContainer, 
          { opacity: logoOpacity }
        ]}
      >
        {/* Using a public Lottie URL for a meditation/wellness animation */}
        <LottieAnimation
          source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json' }} // Meditation animation
          width={200}
          height={200}
        />
      </Animated.View>
      
      <Animated.View style={{ opacity: textOpacity }}>
        <Text style={styles.title}>MentalWell</Text>
        <Text style={styles.subtitle}>Your wellness journey starts here</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: FONTS.sizes['4xl'],
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});

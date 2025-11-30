import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// Fade in animation hook
export const useFadeIn = (duration = 600, delay = 0) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return { opacity };
};

// Slide up animation hook
export const useSlideUp = (distance = 30, duration = 600, delay = 0) => {
  const translateY = useRef(new Animated.Value(distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    transform: [{ translateY }],
    opacity,
  };
};

// Scale animation hook
export const useScale = (initialScale = 0.9, duration = 400, delay = 0) => {
  const scale = useRef(new Animated.Value(initialScale)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    transform: [{ scale }],
    opacity,
  };
};

// Press animation
export const usePressAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return {
    animatedStyle: { transform: [{ scale }] },
    onPressIn,
    onPressOut,
  };
};

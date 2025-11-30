import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS, FONTS, RADIUS, SPACING } from '../theme';
import { LottieAnimation } from './LottieAnimation';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error';

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ visible, message, type, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide
      const timer = setTimeout(() => {
        hide();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      hide();
    }
  }, [visible]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (visible) onHide();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={[styles.content, type === 'error' && styles.errorContent]}>
        <View style={styles.iconContainer}>
          {type === 'success' ? (
            <LottieAnimation
              source={require('../assets/animations/Success.json')}
              width={40}
              height={40}
              autoPlay
              loop={false}
            />
          ) : (
            <MaterialCommunityIcons 
              name="alert-circle" 
              size={28} 
              color={COLORS.red[500]} 
            />
          )}
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 9999,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
    minWidth: Math.min(width - 40, 300),
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal[500],
  },
  errorContent: {
    borderLeftColor: COLORS.red[500],
  },
  iconContainer: {
    marginRight: SPACING.sm,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[800],
  },
});

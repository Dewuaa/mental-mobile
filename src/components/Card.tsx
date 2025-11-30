import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'glass' | 'gradient';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'default' }) => {
  const cardStyles = [
    styles.card,
    variant === 'glass' && styles.glass,
    variant === 'gradient' && styles.gradient,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['3xl'],
    padding: 20,
    ...SHADOWS.soft,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  gradient: {
    // Will be implemented with LinearGradient component
    backgroundColor: COLORS.slate[900],
  },
});

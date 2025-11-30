import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { COLORS, FONTS, RADIUS, SHADOWS } from '../theme';
import { Lock } from 'lucide-react-native';

interface BadgeProps {
  icon: any;
  label: string;
  isLocked?: boolean;
  color: string;
  delay?: number;
}

export const Badge: React.FC<BadgeProps> = ({ icon: Icon, label, isLocked = false, color, delay = 0 }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 12 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[
        styles.iconContainer, 
        { backgroundColor: isLocked ? COLORS.slate[100] : `${color}20` } // 20 is approx 12% opacity hex
      ]}>
        {isLocked ? (
          <Lock size={24} color={COLORS.slate[400]} />
        ) : (
          <Icon size={28} color={color} />
        )}
      </View>
      <Text style={[styles.label, isLocked && styles.lockedLabel]}>
        {label}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
    gap: 8,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.soft,
  },
  label: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    color: COLORS.slate[700],
    textAlign: 'center',
  },
  lockedLabel: {
    color: COLORS.slate[400],
  },
});

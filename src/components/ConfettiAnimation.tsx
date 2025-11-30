import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LottieAnimation } from './LottieAnimation';

interface ConfettiAnimationProps {
  visible: boolean;
  style?: ViewStyle;
}

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ visible, style }) => {
  if (!visible) return null;

  return (
    <LottieAnimation
      source={require('../assets/animations/Confetti.json')}
      style={[styles.container, style]}
      loop={false}
      autoPlay={true}
      width={400}
      height={400}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none', // Let touches pass through
  },
});

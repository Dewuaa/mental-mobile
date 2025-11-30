import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LottieAnimation } from './LottieAnimation';

interface SuccessAnimationProps {
  visible: boolean;
  onFinish?: () => void;
  style?: ViewStyle;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  visible, 
  onFinish,
  style 
}) => {
  if (!visible) return null;

  return (
    <LottieAnimation
      source={require('../assets/animations/Success.json')}
      style={[styles.container, style]}
      loop={false}
      autoPlay={true}
      width={200}
      height={200}
      onAnimationFinish={onFinish}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

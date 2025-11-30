import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieAnimationProps {
  source: string | { uri: string } | any;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'center';
  onAnimationFinish?: (isCancelled: boolean) => void;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  style,
  autoPlay = true,
  loop = true,
  speed = 1,
  width,
  height,
  resizeMode = 'contain',
  onAnimationFinish,
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (autoPlay) {
      animationRef.current?.play();
    }
  }, [autoPlay]);

  return (
    <View style={[styles.container, { width, height }, style]}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        resizeMode={resizeMode}
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

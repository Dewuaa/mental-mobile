import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '../theme';

const { width, height } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const BackgroundBlobs = () => {
  const blob1TranslateY = useSharedValue(0);
  const blob2TranslateY = useSharedValue(0);
  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);

  useEffect(() => {
    // Blob 1 Animation (Top Left)
    blob1TranslateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    blob1Scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Blob 2 Animation (Top Right/Center)
    blob2TranslateY.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    blob2Scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const blob1Props = useAnimatedProps(() => ({
    cy: blob1TranslateY.value,
    r: 150 * blob1Scale.value,
  }));

  const blob2Props = useAnimatedProps(() => ({
    cy: 200 + blob2TranslateY.value,
    r: 180 * blob2Scale.value,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={COLORS.indigo[400]} stopOpacity="0.2" />
            <Stop offset="1" stopColor={COLORS.indigo[400]} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient
            id="grad2"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={COLORS.teal[400]} stopOpacity="0.2" />
            <Stop offset="1" stopColor={COLORS.teal[400]} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Blob 1 - Top Left */}
        <AnimatedCircle
          cx="-10%"
          fill="url(#grad1)"
          animatedProps={blob1Props}
        />

        {/* Blob 2 - Right */}
        <AnimatedCircle
          cx="110%"
          fill="url(#grad2)"
          animatedProps={blob2Props}
        />
      </Svg>
    </View>
  );
};

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

interface SwipeableRowProps {
  children: React.ReactNode;
  onSwipe: () => void;
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onSwipe }) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = Math.min(0, Math.max(-SCREEN_WIDTH, event.translationX));
    })
    .onEnd(() => {
      const shouldDismiss = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldDismiss) {
        translateX.value = withTiming(-SCREEN_WIDTH, undefined, (isFinished) => {
          if (isFinished && onSwipe) {
            runOnJS(onSwipe)();
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Animated.View style={[styles.deleteIcon, rIconStyle]}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color={COLORS.white} />
        </Animated.View>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.item, rStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // Match the gap in CommunityScreen
  },
  item: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'], // Match card radius
  },
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.red[500],
    borderRadius: RADIUS['2xl'],
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 24,
    overflow: 'hidden',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});

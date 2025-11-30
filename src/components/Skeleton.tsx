import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = RADIUS.md,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <Skeleton width={60} height={60} borderRadius={30} />
    <View style={styles.cardContent}>
      <Skeleton width="80%" height={20} />
      <Skeleton width="60%" height={16} style={{ marginTop: 8 }} />
    </View>
  </View>
);

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <View style={styles.list}>
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS.slate[200],
  },
  card: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  list: {
    padding: SPACING.lg,
  },
});

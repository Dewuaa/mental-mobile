import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AnimatedTabIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  badgeCount?: number;
}

export const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  name,
  color,
  size,
  focused,
  badgeCount,
}) => {
  const badgeScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (badgeCount && badgeCount > 0) {
      Animated.spring(badgeScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();
    } else {
      Animated.timing(badgeScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [badgeCount]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name as any} size={size} color={color} />
      {badgeCount ? (
        <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}>
          <View style={styles.badgeDot} />
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, // Ensure enough touch target
    height: 40,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444', // Red-500
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  badgeDot: {
    width: 0,
    height: 0,
  },
});

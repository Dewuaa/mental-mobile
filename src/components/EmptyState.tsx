import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { Button } from './Button';
import { useFadeIn } from '../utils/animations';
import { Animated } from 'react-native';

interface EmptyStateProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  style,
}) => {
  const fadeAnim = useFadeIn(600, 200);

  return (
    <Animated.View style={[styles.container, style, fadeAnim]}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={64} color={COLORS.teal[200]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {actionLabel && onAction && (
        <View style={styles.buttonContainer}>
          <Button
            title={actionLabel}
            onPress={onAction}
            variant="primary"
            size="medium"
          />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    flex: 1,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.teal[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
    minWidth: 160,
  },
});

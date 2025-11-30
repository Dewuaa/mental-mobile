import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Play, Pause, Square } from 'lucide-react-native';
import { COLORS, FONTS, RADIUS, SHADOWS } from '../theme';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;
const STROKE_WIDTH = 15;
const RADIUS_SIZE = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS_SIZE;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ExerciseTimerProps {
  onComplete?: () => void;
}

export const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Ready'>('Ready');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const handlePhaseChange = (newPhase: 'Inhale' | 'Hold' | 'Exhale') => {
    setPhase(newPhase);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const startBreathing = () => {
    setIsPlaying(true);
    setPhase('Inhale');
    
    // Breathing Cycle: Inhale (4s) -> Hold (4s) -> Exhale (4s)
    const cycleDuration = 12000;

    progress.value = withRepeat(
      withSequence(
        // Inhale
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }, () => {
          runOnJS(handlePhaseChange)('Hold');
        }),
        // Hold
        withTiming(1, { duration: 4000 }, () => {
          runOnJS(handlePhaseChange)('Exhale');
        }),
        // Exhale
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) }, () => {
          runOnJS(handlePhaseChange)('Inhale');
        })
      ),
      -1, // Infinite repeat
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }), // Inhale expand
        withTiming(1.2, { duration: 4000 }), // Hold
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }) // Exhale contract
      ),
      -1,
      false
    );
  };

  const stopBreathing = () => {
    setIsPlaying(false);
    setPhase('Ready');
    cancelAnimation(progress);
    cancelAnimation(scale);
    progress.value = withTiming(0);
    scale.value = withTiming(1);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopBreathing();
    } else {
      startBreathing();
    }
  };

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  const animatedScaleStyle = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopBreathing();
            onComplete?.();
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.breathingCircle, { transform: [{ scale: scale }] }]}>
           <View style={styles.innerCircle} />
        </Animated.View>
        
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={styles.svg}>
          <G rotation="-90" origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}>
            {/* Background Circle */}
            <Circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS_SIZE}
              stroke={COLORS.slate[200]}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />
            {/* Progress Circle */}
            <AnimatedCircle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS_SIZE}
              stroke={COLORS.teal[500]}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProps}
            />
          </G>
        </Svg>

        <View style={styles.textContainer}>
          <Text style={styles.phaseText}>{phase}</Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={togglePlay}
          activeOpacity={0.8}
        >
          {isPlaying ? (
            <Pause size={32} color={COLORS.white} fill={COLORS.white} />
          ) : (
            <Play size={32} color={COLORS.white} fill={COLORS.white} style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  svg: {
    position: 'absolute',
  },
  breathingCircle: {
    width: CIRCLE_SIZE * 0.8,
    height: CIRCLE_SIZE * 0.8,
    borderRadius: CIRCLE_SIZE * 0.4,
    backgroundColor: COLORS.teal[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.teal[100],
    opacity: 0.5,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  phaseText: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.teal[600],
    marginBottom: 8,
  },
  timerText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
    color: COLORS.slate[400],
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.slate[900],
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { ChevronLeft, Play, Pause, Volume2, Clock } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { audioService, SOUNDS, Sound } from '../services/audioService';
import * as Haptics from 'expo-haptics';

interface SleepSoundsScreenProps {
  navigation: any;
}

const SleepSoundsScreen: React.FC<SleepSoundsScreenProps> = ({ navigation }) => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timerRemaining, setTimerRemaining] = useState(0);

  useEffect(() => {
    audioService.initialize();
    setVolume(audioService.getVolume());
    setPlayingSound(audioService.getCurrentSoundId());

    // Update timer display
    const interval = setInterval(() => {
      if (audioService.hasActiveTimer()) {
        setTimerRemaining(audioService.getTimerRemaining());
      } else {
        setTimerRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSoundPress = async (soundId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const isPlaying = await audioService.isPlaying();
    const isSameSound = playingSound === soundId;

    if (isSameSound && isPlaying) {
      await audioService.pause();
      setPlayingSound(null);
    } else {
      await audioService.play(soundId);
      setPlayingSound(soundId);
    }
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    await audioService.setVolume(value);
  };

  const handleTimerSet = async (minutes: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimerMinutes(minutes);
    audioService.setTimer(minutes, () => {
      setPlayingSound(null);
      setTimerMinutes(null);
    });
  };

  const handleTimerClear = () => {
    audioService.clearTimer();
    setTimerMinutes(null);
    setTimerRemaining(0);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderSoundCard = (sound: Sound) => {
    const isPlaying = playingSound === sound.id;
    
    return (
      <TouchableOpacity
        key={sound.id}
        style={[styles.soundCard, isPlaying && styles.soundCardActive]}
        onPress={() => handleSoundPress(sound.id)}
        activeOpacity={0.7}
      >
        <View style={styles.soundIcon}>
          <Text style={styles.soundEmoji}>{sound.icon}</Text>
        </View>
        <Text style={styles.soundName}>{sound.name}</Text>
        <View style={[styles.playButton, isPlaying && styles.playButtonActive]}>
          {isPlaying ? (
            <Pause size={16} color={COLORS.white} />
          ) : (
            <Play size={16} color={COLORS.slate[600]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const natureSounds = SOUNDS.filter(s => s.category === 'nature');
  const whiteNoiseSounds = SOUNDS.filter(s => s.category === 'whitenoise');
  const ambientSounds = SOUNDS.filter(s => s.category === 'ambient');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#E0F2FE', '#F0F9FF', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={COLORS.slate[700]} />
          </TouchableOpacity>
          <Text style={styles.title}>Sleep Sounds</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Volume Control */}
          <View style={styles.controlCard}>
            <View style={styles.controlHeader}>
              <Volume2 size={20} color={COLORS.slate[600]} />
              <Text style={styles.controlLabel}>Volume</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor={COLORS.blue[500]}
              maximumTrackTintColor={COLORS.slate[200]}
              thumbTintColor={COLORS.blue[500]}
            />
          </View>

          {/* Sleep Timer */}
          <View style={styles.controlCard}>
            <View style={styles.controlHeader}>
              <Clock size={20} color={COLORS.slate[600]} />
              <Text style={styles.controlLabel}>Sleep Timer</Text>
              {timerRemaining > 0 && (
                <Text style={styles.timerDisplay}>{formatTime(timerRemaining)}</Text>
              )}
            </View>
            <View style={styles.timerButtons}>
              <TouchableOpacity
                style={[styles.timerButton, timerMinutes === 15 && styles.timerButtonActive]}
                onPress={() => handleTimerSet(15)}
              >
                <Text style={[styles.timerButtonText, timerMinutes === 15 && styles.timerButtonTextActive]}>
                  15 min
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timerButton, timerMinutes === 30 && styles.timerButtonActive]}
                onPress={() => handleTimerSet(30)}
              >
                <Text style={[styles.timerButtonText, timerMinutes === 30 && styles.timerButtonTextActive]}>
                  30 min
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timerButton, timerMinutes === 60 && styles.timerButtonActive]}
                onPress={() => handleTimerSet(60)}
              >
                <Text style={[styles.timerButtonText, timerMinutes === 60 && styles.timerButtonTextActive]}>
                  1 hour
                </Text>
              </TouchableOpacity>
              {timerMinutes && (
                <TouchableOpacity
                  style={styles.timerClearButton}
                  onPress={handleTimerClear}
                >
                  <Text style={styles.timerClearText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Nature Sounds */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>🌿 Nature</Text>
            <View style={styles.soundsGrid}>
              {natureSounds.map(renderSoundCard)}
            </View>
          </View>

          {/* White Noise */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>⚪ White Noise</Text>
            <View style={styles.soundsGrid}>
              {whiteNoiseSounds.map(renderSoundCard)}
            </View>
          </View>

          {/* Ambient */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>✨ Ambient</Text>
            <View style={styles.soundsGrid}>
              {ambientSounds.map(renderSoundCard)}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  controlCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.soft,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  controlLabel: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.slate[700],
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timerDisplay: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.blue[600],
  },
  timerButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  timerButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.slate[100],
  },
  timerButtonActive: {
    backgroundColor: COLORS.blue[500],
  },
  timerButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[700],
  },
  timerButtonTextActive: {
    color: COLORS.white,
  },
  timerClearButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.red[50],
  },
  timerClearText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.red[600],
  },
  category: {
    marginBottom: SPACING['2xl'],
  },
  categoryTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  soundCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.slate[100],
    ...SHADOWS.soft,
  },
  soundCardActive: {
    borderColor: COLORS.blue[500],
    backgroundColor: COLORS.blue[50],
  },
  soundIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.slate[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  soundEmoji: {
    fontSize: 28,
  },
  soundName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[700],
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.slate[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: COLORS.blue[500],
  },
});

export default SleepSoundsScreen;

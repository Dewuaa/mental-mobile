import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VOLUME_KEY = '@mentalwell/audioVolume';

export interface Sound {
  id: string;
  name: string;
  category: 'nature' | 'whitenoise' | 'ambient';
  icon: string;
  // Using placeholder URLs - replace with actual audio files
  url: string;
}

export const SOUNDS: Sound[] = [
  // Nature Sounds
  { id: 'rain', name: 'Rain', category: 'nature', icon: '🌧️', url: 'https://example.com/rain.mp3' },
  { id: 'ocean', name: 'Ocean Waves', category: 'nature', icon: '🌊', url: 'https://example.com/ocean.mp3' },
  { id: 'forest', name: 'Forest', category: 'nature', icon: '🌲', url: 'https://example.com/forest.mp3' },
  { id: 'thunder', name: 'Thunderstorm', category: 'nature', icon: '⛈️', url: 'https://example.com/thunder.mp3' },
  
  // White Noise
  { id: 'white', name: 'White Noise', category: 'whitenoise', icon: '⚪', url: 'https://example.com/white.mp3' },
  { id: 'pink', name: 'Pink Noise', category: 'whitenoise', icon: '🎀', url: 'https://example.com/pink.mp3' },
  { id: 'brown', name: 'Brown Noise', category: 'whitenoise', icon: '🟤', url: 'https://example.com/brown.mp3' },
  { id: 'fan', name: 'Fan', category: 'whitenoise', icon: '🌬️', url: 'https://example.com/fan.mp3' },
  
  // Ambient
  { id: 'fireplace', name: 'Fireplace', category: 'ambient', icon: '🔥', url: 'https://example.com/fireplace.mp3' },
  { id: 'coffee', name: 'Coffee Shop', category: 'ambient', icon: '☕', url: 'https://example.com/coffee.mp3' },
  { id: 'piano', name: 'Piano', category: 'ambient', icon: '🎹', url: 'https://example.com/piano.mp3' },
  { id: 'meditation', name: 'Meditation', category: 'ambient', icon: '🎵', url: 'https://example.com/meditation.mp3' },
];

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentSoundId: string | null = null;
  private volume: number = 0.7;
  private timer: NodeJS.Timeout | null = null;
  private timerEndTime: number | null = null;

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      
      // Load saved volume
      const savedVolume = await AsyncStorage.getItem(VOLUME_KEY);
      if (savedVolume) {
        this.volume = parseFloat(savedVolume);
      }
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  async play(soundId: string) {
    try {
      // Stop current sound if different
      if (this.currentSoundId !== soundId) {
        await this.stop();
      }

      // If same sound and already playing, just resume
      if (this.sound && this.currentSoundId === soundId) {
        const status = await this.sound.getStatusAsync();
        if (status.isLoaded && !status.isPlaying) {
          await this.sound.playAsync();
        }
        return;
      }

      // Load and play new sound
      const soundData = SOUNDS.find(s => s.id === soundId);
      if (!soundData) return;

      const { sound } = await Audio.Sound.createAsync(
        { uri: soundData.url },
        { shouldPlay: true, isLooping: true, volume: this.volume }
      );

      this.sound = sound;
      this.currentSoundId = soundId;
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  async pause() {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  }

  async stop() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
        this.currentSoundId = null;
      }
      this.clearTimer();
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  }

  async setVolume(volume: number) {
    try {
      this.volume = Math.max(0, Math.min(1, volume));
      if (this.sound) {
        await this.sound.setVolumeAsync(this.volume);
      }
      await AsyncStorage.setItem(VOLUME_KEY, this.volume.toString());
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getCurrentSoundId(): string | null {
    return this.currentSoundId;
  }

  async isPlaying(): Promise<boolean> {
    try {
      if (this.sound) {
        const status = await this.sound.getStatusAsync();
        return status.isLoaded && status.isPlaying;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  setTimer(minutes: number, onComplete?: () => void) {
    this.clearTimer();
    this.timerEndTime = Date.now() + minutes * 60 * 1000;
    
    this.timer = setTimeout(async () => {
      await this.stop();
      if (onComplete) onComplete();
    }, minutes * 60 * 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timerEndTime = null;
    }
  }

  getTimerRemaining(): number {
    if (!this.timerEndTime) return 0;
    return Math.max(0, this.timerEndTime - Date.now());
  }

  hasActiveTimer(): boolean {
    return this.timer !== null;
  }
}

export const audioService = new AudioService();

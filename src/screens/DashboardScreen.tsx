import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import {
  Sun,
  CloudRain,
  Cloud,
  CloudLightning,
  Sparkles,
  Calendar,
  Wind,
  Play,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { moodStorage } from '../services/storageService';
import { useFadeIn, useSlideUp } from '../utils/animations';
import { LottieAnimation } from '../components/LottieAnimation';
import { ConfettiAnimation } from '../components/ConfettiAnimation';
import { MoodChart } from '../components/MoodChart';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { MoodNoteModal } from '../components/MoodNoteModal';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const [greeting, setGreeting] = useState('Good Morning');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showMoodNoteModal, setShowMoodNoteModal] = useState(false);
  const [pendingMoodLevel, setPendingMoodLevel] = useState<number | null>(null);
  const userName = 'Friend';
  const { showToast } = useToast();

  const moodHistory = [
    { date: 'Mon', value: 3 },
    { date: 'Tue', value: 4 },
    { date: 'Wed', value: 2 },
    { date: 'Thu', value: 4 },
    { date: 'Fri', value: 5 },
    { date: 'Sat', value: 4 },
    { date: 'Sun', value: 5 },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const moodLabels = ['Rough', 'Down', 'Okay', 'Good', 'Great'];

  const handleMoodClick = async (level: number) => {
    setSelectedMood(level);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Store pending mood and show note modal
    setPendingMoodLevel(level);
    setShowMoodNoteModal(true);
  };

  const handleSaveMoodNote = async (note: string) => {
    if (pendingMoodLevel === null) return;

    await moodStorage.saveMoodEntry({
      date: new Date().toISOString(),
      mood: pendingMoodLevel,
      label: moodLabels[pendingMoodLevel - 1],
      note: note || undefined,
    });
    
    setShowMoodNoteModal(false);
    setPendingMoodLevel(null);
    showToast('success', note ? 'Mood & note saved!' : 'Mood tracked!');
  };

  const handleSkipMoodNote = async () => {
    if (pendingMoodLevel === null) return;

    await moodStorage.saveMoodEntry({
      date: new Date().toISOString(),
      mood: pendingMoodLevel,
      label: moodLabels[pendingMoodLevel - 1],
    });
    
    setShowMoodNoteModal(false);
    setPendingMoodLevel(null);
    showToast('success', 'Mood tracked!');
  };

  const moods = [
    { level: 1, icon: CloudLightning, color: COLORS.indigo[400], activeBg: COLORS.indigo[500] },
    { level: 2, icon: CloudRain, color: COLORS.blue[400], activeBg: COLORS.blue[500] },
    { level: 3, icon: Cloud, color: COLORS.teal[400], activeBg: COLORS.teal[500] },
    { level: 4, icon: Sun, color: COLORS.orange[400], activeBg: COLORS.orange[500] },
    { level: 5, icon: Sparkles, color: COLORS.yellow[400], activeBg: COLORS.yellow[400] },
  ];

  const headerAnim = useFadeIn(600, 0);
  const moodCardAnim = useSlideUp(30, 600, 100);
  const chartAnim = useSlideUp(30, 600, 150);
  const heroCardAnim = useSlideUp(30, 600, 200);
  const statsAnim = useSlideUp(30, 600, 300);
  const chatCardAnim = useSlideUp(30, 600, 400);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackgroundBlobs />
      <ConfettiAnimation visible={showConfetti} />
      
      {refreshing && (
        <View style={styles.refreshContainer}>
          <LottieAnimation
            source={require('../assets/animations/Breathing.json')}
            width={80}
            height={80}
            autoPlay
            loop
          />
        </View>
      )}

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={currentTheme.colors.primary}
          />
        }
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerAnim]}>
          <View style={styles.headerText}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
            </Text>
            <Text style={styles.greetingText}>{greeting}, {userName}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image 
              source={{ uri: 'https://picsum.photos/100/100' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Mood Tracker */}
        <Animated.View style={[styles.moodCard, moodCardAnim]}>
          <View style={styles.moodHeader}>
            <View>
              <Text style={styles.moodTitle}>How are you feeling?</Text>
              <Text style={styles.moodSubtitle}>Track your mood</Text>
            </View>
          </View>
          <View style={styles.moodsContainer}>
            {moods.map((m, index) => {
              const isSelected = selectedMood === m.level;
              const Icon = m.icon;
              return (
                <TouchableOpacity
                  key={m.level}
                  onPress={() => handleMoodClick(m.level)}
                  style={[
                    styles.moodButton,
                    isSelected && { backgroundColor: m.activeBg },
                  ]}
                  activeOpacity={0.7}
                >
                  <Icon 
                    size={20} 
                    color={isSelected ? COLORS.white : m.color}
                    strokeWidth={2}
                  />
                  <Text style={[
                    styles.moodLabel,
                    isSelected && styles.moodLabelActive
                  ]}>
                    {moodLabels[index]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Mood History Chart */}
        <Animated.View style={[styles.section, chartAnim]}>
          <MoodChart data={moodHistory} />
        </Animated.View>

        {/* Hero Feature Card - Now uses theme color */}
        <Animated.View style={heroCardAnim}>
          <TouchableOpacity 
            style={styles.heroCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Exercises')}
          >
            <LinearGradient
              colors={[currentTheme.colors.primary, currentTheme.colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={[StyleSheet.absoluteFillObject, { overflow: 'hidden', borderRadius: RADIUS['2xl'] }]}>
                <LottieAnimation
                  source={require('../assets/animations/Breathing.json')}
                  width={width - SPACING.lg * 2}
                  height={180}
                  style={{ opacity: 0.6 }}
                  resizeMode="cover"
                  autoPlay
                  loop
                />
              </View>

              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>Daily Pick</Text>
              </View>
              
              <View style={styles.heroContent}>
                <View style={styles.heroCategory}>
                  <Wind size={14} color="rgba(255, 255, 255, 0.7)" />
                  <Text style={styles.heroCategoryText}>BREATHING</Text>
                </View>
                <Text style={styles.heroTitle}>Finding Calm in Chaos</Text>
                <View style={styles.heroActions}>
                  <View style={styles.heroDuration}>
                    <View style={styles.heroDot} />
                    <Text style={styles.heroDurationText}>5 min</Text>
                  </View>
                  <TouchableOpacity style={styles.heroButton}>
                    <Play size={10} color={COLORS.slate[900]} fill={COLORS.slate[900]} />
                    <Text style={styles.heroButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View style={[styles.statsGrid, statsAnim]}>
          <TouchableOpacity style={styles.statCard} activeOpacity={0.8}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.teal[50] }]}>
              <Calendar size={18} color={COLORS.teal[600]} />
            </View>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard} activeOpacity={0.8}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.orange[50] }]}>
              <Sparkles size={18} color={COLORS.orange[500]} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Mood Note Modal */}
      <MoodNoteModal
        visible={showMoodNoteModal}
        moodLabel={pendingMoodLevel ? moodLabels[pendingMoodLevel - 1] : ''}
        onSave={handleSaveMoodNote}
        onSkip={handleSkipMoodNote}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  refreshContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerText: {
    flex: 1,
  },
  dateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
    marginBottom: 4,
  },
  greetingText: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.soft,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  moodCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.soft,
  },
  moodHeader: {
    marginBottom: SPACING.lg,
  },
  moodTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  moodSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
    marginTop: 4,
  },
  moodsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.slate[50],
    gap: 6,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.slate[600],
  },
  moodLabelActive: {
    color: COLORS.white,
  },
  section: {
    marginBottom: SPACING.md,
  },
  heroCard: {
    marginBottom: SPACING.md,
    borderRadius: RADIUS['2xl'],
    overflow: 'hidden',
    ...SHADOWS.soft,
  },
  heroGradient: {
    padding: SPACING.lg,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroContent: {
    gap: SPACING.sm,
  },
  heroCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.white,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  heroDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  heroDurationText: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  heroButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[500],
    marginTop: 4,
  },
});

export default DashboardScreen;

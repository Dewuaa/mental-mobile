import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { Sun, Moon, Heart, Wind, Play, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ExercisesScreen: React.FC = () => {
  const exercises = [
    { id: 1, title: 'Breathing', subtitle: 'Quick calm', icon: Wind, color: COLORS.teal },
    { id: 2, title: 'Morning', subtitle: 'Start fresh', icon: Sun, color: COLORS.orange },
    { id: 3, title: 'Evening', subtitle: 'Wind down', icon: Moon, color: COLORS.indigo },
    { id: 4, title: 'Gratitude', subtitle: 'Daily practice', icon: Heart, color: COLORS.pink },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Practice</Text>
            <Text style={styles.subtitle}>Daily mindfulness & tools</Text>
          </View>
          <View style={styles.headerIcon}>
            <Sparkles size={24} color={COLORS.indigo[500]} />
          </View>
        </View>

        {/* Featured Card */}
        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
          <LinearGradient
            colors={['#3B82F6', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredHeader}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Featured</Text>
              </View>
              <View style={styles.playButton}>
                <Play size={20} color={COLORS.blue[600]} fill={COLORS.blue[600]} />
              </View>
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Deep Focus</Text>
              <Text style={styles.featuredSubtitle}>20 min guided session</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Exercise Grid */}
        <View style={styles.grid}>
          {exercises.length === 0 ? (
            <EmptyState
              icon="meditation"
              title="No exercises found"
              message="Try adjusting your filters or check back later for new sessions."
              style={{ marginTop: SPACING.xl }}
            />
          ) : (
            exercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseCard}
                  activeOpacity={0.7}
                >
                  <View style={[styles.exerciseIcon, { backgroundColor: exercise.color[50] }]}>
                    <Icon size={24} color={exercise.color[500]} />
                  </View>
                  <View style={styles.exerciseContent}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                    <Text style={styles.exerciseSubtitle}>{exercise.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING['2xl'],
  },
  title: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[500],
    fontWeight: '500',
    marginTop: 4,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  featuredCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    height: 192,
    borderRadius: RADIUS['3xl'],
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  featuredGradient: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featuredBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  featuredContent: {
    gap: 4,
  },
  featuredTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.white,
  },
  featuredSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(191, 219, 254, 1)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  exerciseCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    gap: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseContent: {
    gap: 4,
  },
  exerciseTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  exerciseSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[500],
  },
});

export default ExercisesScreen;

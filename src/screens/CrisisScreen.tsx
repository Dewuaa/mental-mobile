import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../theme';
import { Phone, Wind, X, AlertCircle } from 'lucide-react-native';
import { getCrisisResources, CrisisResource } from '../utils/crisisDetection';
import * as Haptics from 'expo-haptics';

interface CrisisScreenProps {
  navigation: any;
}

const CrisisScreen: React.FC<CrisisScreenProps> = ({ navigation }) => {
  const resources = getCrisisResources();

  const handleCall = async (number: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Linking.openURL(`tel:${number}`);
  };

  const handleBreathingExercise = () => {
    navigation.navigate('Exercises');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <X size={24} color={COLORS.slate[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Alert Section */}
        <View style={styles.alertSection}>
          <View style={styles.iconContainer}>
            <AlertCircle size={48} color={COLORS.red[600]} />
          </View>
          <Text style={styles.title}>You are not alone</Text>
          <Text style={styles.subtitle}>
            If you're in crisis or need immediate support, help is available 24/7.
          </Text>
        </View>

        {/* Quick Breathing Exercise */}
        <TouchableOpacity 
          style={styles.breathingCard}
          onPress={handleBreathingExercise}
          activeOpacity={0.8}
        >
          <View style={styles.breathingIcon}>
            <Wind size={24} color={COLORS.teal[600]} />
          </View>
          <View style={styles.breathingContent}>
            <Text style={styles.breathingTitle}>Take a Moment to Breathe</Text>
            <Text style={styles.breathingSubtitle}>Quick calming exercise</Text>
          </View>
        </TouchableOpacity>

        {/* Crisis Hotlines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crisis Hotlines (Philippines)</Text>
          <Text style={styles.sectionSubtitle}>
            Trained counselors are ready to help
          </Text>

          {resources.map((resource: CrisisResource, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.hotlineCard}
              onPress={() => handleCall(resource.phone)}
              activeOpacity={0.8}
            >
              <View style={styles.hotlineIcon}>
                <Phone size={20} color={COLORS.red[600]} />
              </View>
              <View style={styles.hotlineContent}>
                <Text style={styles.hotlineName}>{resource.name}</Text>
                <Text style={styles.hotlinePhone}>{resource.phone}</Text>
                <Text style={styles.hotlineDesc}>{resource.description}</Text>
                <Text style={styles.hotlineAvailable}>{resource.available}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Services */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>In Life-Threatening Emergency</Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => handleCall('911')}
          >
            <Phone size={24} color={COLORS.white} />
            <Text style={styles.emergencyButtonText}>Call 911</Text>
          </TouchableOpacity>
        </View>

        {/* Support Message */}
        <View style={styles.supportMessage}>
          <Text style={styles.supportText}>
            Remember: Reaching out for help is a sign of strength, not weakness. 
            You deserve support, and these resources are here for you.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.red[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  alertSection: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.red[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes['4xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[600],
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  breathingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.teal[50],
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    marginBottom: SPACING['2xl'],
    borderWidth: 1,
    borderColor: COLORS.teal[100],
    ...SHADOWS.soft,
  },
  breathingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  breathingContent: {
    flex: 1,
  },
  breathingTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.teal[600],
    marginBottom: 2,
  },
  breathingSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.teal[600],
  },
  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
    marginBottom: SPACING.lg,
  },
  hotlineCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.red[100],
    ...SHADOWS.soft,
  },
  hotlineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  hotlineContent: {
    flex: 1,
  },
  hotlineName: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: 4,
  },
  hotlinePhone: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.red[600],
    marginBottom: 4,
  },
  hotlineDesc: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[600],
    marginBottom: 2,
  },
  hotlineAvailable: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[500],
    fontWeight: '600',
  },
  emergencySection: {
    backgroundColor: COLORS.red[600],
    padding: SPACING['2xl'],
    borderRadius: RADIUS['2xl'],
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
    ...SHADOWS.medium,
  },
  emergencyTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING['2xl'],
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    ...SHADOWS.soft,
  },
  emergencyButtonText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.red[600],
  },
  supportMessage: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  supportText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[600],
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CrisisScreen;

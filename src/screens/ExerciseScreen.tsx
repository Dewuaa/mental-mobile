import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS, FONTS, SPACING } from '../theme';
import { ExerciseTimer } from '../components/ExerciseTimer';
import { BackgroundBlobs } from '../components/BackgroundBlobs';

const ExerciseScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackgroundBlobs />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={COLORS.slate[700]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercise</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.instructions}>
          <Text style={styles.title}>Find Calm</Text>
          <Text style={styles.subtitle}>
            Follow the breathing rhythm to relax your mind and body.
          </Text>
        </View>

        <ExerciseTimer onComplete={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  instructions: {
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    color: COLORS.slate[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[500],
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ExerciseScreen;

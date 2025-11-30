import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { Wind, BookOpen, Music, Phone, ChevronRight, BrainCircuit } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ToolsScreenProps {
  navigation: any;
}

const ToolsScreen: React.FC<ToolsScreenProps> = ({ navigation }) => {
  const tools = [
    {
      id: 'breathing',
      title: 'Breathing',
      subtitle: 'Reduce anxiety instantly',
      icon: Wind,
      color: COLORS.teal,
      gradient: [COLORS.teal[400], COLORS.teal[600]],
      action: () => navigation.navigate('Exercises'),
    },
    {
      id: 'journal',
      title: 'Journaling',
      subtitle: 'Clear your mind',
      icon: BookOpen,
      color: COLORS.indigo,
      gradient: [COLORS.indigo[400], COLORS.indigo[600]],
      action: () => console.log('Journal'), // Placeholder
      locked: true,
    },
    {
      id: 'grounding',
      title: 'Grounding',
      subtitle: '5-4-3-2-1 Technique',
      icon: BrainCircuit,
      color: COLORS.orange,
      gradient: [COLORS.orange[400], COLORS.orange[600]],
      action: () => console.log('Grounding'), // Placeholder
      locked: true,
    },
    {
      id: 'sounds',
      title: 'Sleep Sounds',
      subtitle: 'Drift off peacefully',
      icon: Music,
      color: COLORS.blue,
      gradient: [COLORS.blue[400], COLORS.blue[600]],
      action: () => console.log('Sounds'), // Placeholder
      locked: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Self-Care Tools</Text>
            <Text style={styles.subtitle}>Your personal mental health kit</Text>
          </View>
        </View>

        {/* Tools Grid */}
        <View style={styles.grid}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <TouchableOpacity
                key={tool.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={tool.action}
              >
                <LinearGradient
                  colors={tool.gradient as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Icon size={24} color={COLORS.white} />
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>{tool.title}</Text>
                      <Text style={styles.cardSubtitle}>{tool.subtitle}</Text>
                    </View>
                  </View>
                  {tool.locked && (
                    <View style={styles.lockBadge}>
                      <Text style={styles.lockText}>COMING SOON</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Crisis Resource */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need immediate help?</Text>
          <TouchableOpacity
            style={styles.crisisCard}
            onPress={() => navigation.navigate('Crisis')}
          >
            <View style={styles.crisisContent}>
              <View style={styles.crisisIcon}>
                <Phone size={24} color={COLORS.red[600]} />
              </View>
              <View style={styles.crisisTextContainer}>
                <Text style={styles.crisisTitle}>Crisis Support</Text>
                <Text style={styles.crisisSubtitle}>Tap for emergency resources</Text>
              </View>
            </View>
            <ChevronRight size={20} color={COLORS.slate[400]} />
          </TouchableOpacity>
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
  grid: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    height: 120,
    borderRadius: RADIUS['2xl'],
    ...SHADOWS.medium,
  },
  cardGradient: {
    flex: 1,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  lockBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
  },
  lockText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
  },
  crisisCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    borderWidth: 1,
    borderColor: COLORS.red[100],
    ...SHADOWS.soft,
  },
  crisisContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  crisisIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.red[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  crisisTextContainer: {
    gap: 2,
  },
  crisisTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  crisisSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
  },
});

export default ToolsScreen;

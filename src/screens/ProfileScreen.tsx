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
import { Badge } from '../components/Badge';
import { User, Settings as SettingsIcon, ChevronRight, Calendar, Sparkles, Target, Wind } from 'lucide-react-native';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const stats = [
    { label: 'Check-ins', value: '42', icon: Calendar, color: COLORS.teal },
    { label: 'Streak', value: '7 days', icon: Sparkles, color: COLORS.orange },
    { label: 'Goals', value: '3/5', icon: Target, color: COLORS.indigo },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <SettingsIcon size={24} color={COLORS.slate[600]} />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <User size={32} color={COLORS.teal[600]} />
          </View>
          <Text style={styles.userName}>Friend</Text>
          <Text style={styles.userSubtitle}>Member since Nov 2024</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color[50] }]}>
                  <Icon size={20} color={stat.color[600]} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            <Badge 
              icon={Sparkles} 
              label="7 Day Streak" 
              color={COLORS.orange[500]} 
              delay={100}
            />
            <Badge 
              icon={Target} 
              label="Goal Getter" 
              color={COLORS.indigo[500]} 
              delay={200}
            />
            <Badge 
              icon={Wind} 
              label="Zen Master" 
              color={COLORS.teal[500]} 
              isLocked 
              delay={300}
            />
            <Badge 
              icon={Calendar} 
              label="Mood Master" 
              color={COLORS.blue[500]} 
              isLocked 
              delay={400}
            />
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, { backgroundColor: COLORS.indigo[50] }]}>
                <Target size={20} color={COLORS.indigo[600]} />
              </View>
              <Text style={styles.menuText}>My Goals</Text>
            </View>
            <ChevronRight size={20} color={COLORS.slate[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, { backgroundColor: COLORS.teal[50] }]}>
                <Calendar size={20} color={COLORS.teal[600]} />
              </View>
              <Text style={styles.menuText}>Mood History</Text>
            </View>
            <ChevronRight size={20} color={COLORS.slate[400]} />
          </TouchableOpacity>
        </View>

        {/* Development Tools */}
        <View style={styles.menuContainer}>
          <Text style={[styles.sectionTitle, { marginTop: SPACING.xl, marginBottom: SPACING.sm, marginLeft: SPACING.sm }]}>
            Development
          </Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={async () => {
              const { userStorage } = require('../services/storageService');
              await userStorage.setOnboarded(false);
              alert('Onboarding reset! Restart the app to see it.');
            }}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, { backgroundColor: COLORS.red[50] }]}>
                <Sparkles size={20} color={COLORS.red[600]} />
              </View>
              <Text style={[styles.menuText, { color: COLORS.red[600] }]}>Reset Onboarding</Text>
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
  settingsButton: {
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
  userCard: {
    alignItems: 'center',
    paddingVertical: SPACING['2xl'],
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['3xl'],
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.teal[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  userName: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.xs,
  },
  userSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[500],
  },
  menuContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.slate[900],
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  badgesContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
});

export default ProfileScreen;

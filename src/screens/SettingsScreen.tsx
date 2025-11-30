import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../theme';
import { 
  ChevronLeft, 
  Bell, 
  Lock, 
  User, 
  Palette, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Globe, 
  Share2,
  Check,
  Moon
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, THEMES } from '../contexts/ThemeContext';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { currentTheme, setTheme, isDarkMode, toggleDarkMode, colors, shadows } = useTheme();

  
  const [notifications, setNotifications] = useState({
    daily: true,
    community: false,
  });

  const [privacy, setPrivacy] = useState({
    anonymous: true,
  });

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const MenuItem = ({ 
    icon: Icon, 
    label, 
    value, 
    onPress, 
    isDestructive = false 
  }: any) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[
          styles.iconContainer,
          isDestructive && styles.iconContainerDestructive
        ]}>
          <Icon 
            size={18} 
            color={isDestructive ? colors.red[500] : colors.slate[500]} 
          />
        </View>
        <Text style={[
          styles.menuItemLabel,
          isDestructive && styles.menuItemLabelDestructive
        ]}>
          {label}
        </Text>
      </View>
      <View style={styles.menuItemRight}>
        {value && <Text style={styles.menuItemValue}>{value}</Text>}
        <ChevronRight size={16} color={colors.slate[300]} />
      </View>
    </TouchableOpacity>
  );

  const ToggleItem = ({ 
    icon: Icon, 
    label, 
    value, 
    onValueChange,
    hasBorder = false
  }: any) => (
    <View style={[
      styles.toggleItem,
      hasBorder && styles.toggleItemBorder
    ]}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon size={18} color={colors.slate[500]} />
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.slate[200], true: colors.teal[500] }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.slate[200]}
      />
    </View>
  );

  const handleLogout = () => {
    // Navigate back to onboarding or show confirmation
    navigation.navigate('Onboarding');
  };

  const openSocial = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={20} color={colors.slate[600]} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account */}
        <SectionHeader title="ACCOUNT" />
        <MenuItem icon={User} label="Personal Information" />
        <View style={styles.languageItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
              <Globe size={18} color={colors.slate[500]} />
            </View>
            <Text style={styles.menuItemLabel}>Language</Text>
          </View>
          <View style={styles.languageBadge}>
            <Text style={styles.languageBadgeText}>English (US)</Text>
          </View>
        </View>

        {/* Appearance */}
        <SectionHeader title="APPEARANCE" />
        <View style={styles.themeContainer}>
          <View style={styles.themeHeader}>
            <View style={styles.iconContainer}>
              <Palette size={18} color={colors.slate[500]} />
            </View>
            <Text style={styles.menuItemLabel}>App Theme</Text>
          </View>
          <View style={styles.themesGrid}>
            {THEMES.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                onPress={() => setTheme(theme.id)}
                style={[
                  styles.themeOption,
                  currentTheme.id === theme.id && styles.themeOptionSelected
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.themeColors}>
                  <View style={[styles.themeColorDot, { backgroundColor: theme.colors.primary }]} />
                  <View style={[styles.themeColorDot, { backgroundColor: theme.colors.accent }]} />
                </View>
                <Text style={[
                  styles.themeName,
                  currentTheme.id === theme.id && styles.themeNameSelected
                ]}>
                  {theme.name}
                </Text>
                {currentTheme.id === theme.id && (
                  <Check size={16} color={colors.teal[600]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <ToggleItem
            icon={Moon}
            label="Dark Mode"
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>

        {/* Notifications */}
        <SectionHeader title="NOTIFICATIONS" />
        <View style={styles.toggleContainer}>
          <ToggleItem
            icon={Bell}
            label="Daily Reminders"
            value={notifications.daily}
            onValueChange={(val: boolean) => setNotifications(p => ({ ...p, daily: val }))}
            hasBorder
          />
          <ToggleItem
            icon={Globe}
            label="Community Updates"
            value={notifications.community}
            onValueChange={(val: boolean) => setNotifications(p => ({ ...p, community: val }))}
          />
        </View>

        {/* Privacy & Security */}
        <SectionHeader title="PRIVACY & SECURITY" />
        <View style={styles.toggleContainer}>
          <ToggleItem
            icon={Lock}
            label="Anonymous Mode"
            value={privacy.anonymous}
            onValueChange={(val: boolean) => setPrivacy(p => ({ ...p, anonymous: val }))}
          />
        </View>
        <MenuItem icon={Share2} label="Data Export" />

        {/* Community */}
        <SectionHeader title="COMMUNITY" />
        <View style={styles.communityCard}>
          <Text style={styles.communityText}>Join our mindful community on social media</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButtonInstagram}
              onPress={() => openSocial('https://instagram.com')}
            >
              <LinearGradient
                colors={['#FBBF24', '#EC4899', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialGradient}
              >
                <Text style={styles.socialIcon}>📷</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButtonX}
              onPress={() => openSocial('https://x.com')}
            >
              <Text style={styles.socialIconX}>𝕏</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButtonFacebook}
              onPress={() => openSocial('https://facebook.com')}
            >
              <Text style={styles.socialIcon}>f</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.inviteText}>Invite Friends to MentalWell</Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <SectionHeader title="SUPPORT" />
        <MenuItem icon={HelpCircle} label="Help Center" />
        <MenuItem 
          icon={LogOut} 
          label="Log Out" 
          isDestructive 
          onPress={handleLogout}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerVersion}>Version 1.2.0 • Build 2409</Text>
          <Text style={styles.footerMade}>Made with 💜 for students</Text>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate[200],
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
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.slate[400],
    letterSpacing: 1,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.slate[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDestructive: {
    backgroundColor: COLORS.red[50],
  },
  menuItemLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    color: COLORS.slate[700],
  },
  menuItemLabelDestructive: {
    color: COLORS.red[500],
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  menuItemValue: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[400],
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
  },
  languageBadge: {
    backgroundColor: COLORS.slate[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
  },
  languageBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.slate[500],
  },
  themeContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['3xl'],
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  themesGrid: {
    gap: SPACING.sm,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  themeOptionSelected: {
    borderColor: COLORS.teal[500],
    backgroundColor: COLORS.teal[50] + '30',
  },
  themeColors: {
    flexDirection: 'row',
    gap: -4,
  },
  themeColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.soft,
  },
  themeName: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
    color: COLORS.slate[500],
    flex: 1,
    marginLeft: SPACING.md,
  },
  themeNameSelected: {
    color: COLORS.slate[900],
  },
  toggleContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'],
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    overflow: 'hidden',
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  toggleItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate[50],
  },
  communityCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS['3xl'],
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  communityText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[400],
    fontWeight: '500',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  socialButtonInstagram: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  socialGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonX: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.slate[900],
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  socialButtonFacebook: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  socialIcon: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '700',
  },
  socialIconX: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '700',
  },
  inviteText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    color: COLORS.teal[600],
    marginTop: SPACING.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING['2xl'],
    paddingBottom: SPACING['2xl'],
  },
  footerVersion: {
    fontSize: 10,
    color: COLORS.slate[300],
    fontWeight: '500',
  },
  footerMade: {
    fontSize: 10,
    color: COLORS.slate[300],
    marginTop: 4,
  },
});

export default SettingsScreen;

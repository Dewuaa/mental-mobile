import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS } from '../theme';
import { Phone } from 'lucide-react-native';

interface CrisisScreenProps {
  navigation: any;
}

const CrisisScreen: React.FC<CrisisScreenProps> = ({ navigation }) => {
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Phone size={48} color={COLORS.red[600]} />
        </View>
        <Text style={styles.title}>You are not alone.</Text>
        <Text style={styles.subtitle}>
          If you are in immediate danger or need urgent help, please contact emergency services.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => handleCall('988')}
        >
          <Phone size={20} color={COLORS.white} />
          <Text style={styles.primaryButtonText}>Call 988 (Lifeline)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Chat with Counselor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Return to App</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.red[50],
    padding: SPACING['2xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.red[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING['2xl'],
  },
  title: {
    fontSize: FONTS.sizes['4xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.slate[600],
    textAlign: 'center',
    marginBottom: SPACING['3xl'],
    maxWidth: 300,
    lineHeight: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.red[600],
    paddingHorizontal: SPACING['2xl'],
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    width: '100%',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  primaryButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate[200],
    paddingHorizontal: SPACING['2xl'],
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  backButton: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[400],
  },
});

export default CrisisScreen;

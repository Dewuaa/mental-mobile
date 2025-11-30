import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { AlertCircle, Phone, X } from 'lucide-react-native';
import { CrisisResource } from '../utils/crisisDetection';
import * as Haptics from 'expo-haptics';

interface CrisisAlertModalProps {
  visible: boolean;
  severity: 'low' | 'medium' | 'high';
  message: string;
  resources: CrisisResource[];
  onClose: () => void;
  onNavigateToCrisis: () => void;
}

export const CrisisAlertModal: React.FC<CrisisAlertModalProps> = ({
  visible,
  severity,
  message,
  resources,
  onClose,
  onNavigateToCrisis,
}) => {
  const handleCall = async (number: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Linking.openURL(`tel:${number}`);
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'high':
        return COLORS.red[600];
      case 'medium':
        return COLORS.orange[500];
      default:
        return COLORS.yellow[400];
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${getSeverityColor()}20` },
              ]}
            >
              <AlertCircle size={32} color={getSeverityColor()} />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={COLORS.slate[400]} />
            </TouchableOpacity>
          </View>

          {/* Message */}
          <Text style={styles.title}>We're here for you</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Resources */}
          {resources.length > 0 && (
            <ScrollView style={styles.resourcesContainer}>
              <Text style={styles.resourcesTitle}>Immediate Support:</Text>
              {resources.slice(0, 2).map((resource, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.resourceCard}
                  onPress={() => handleCall(resource.phone)}
                >
                  <View style={styles.resourceIcon}>
                    <Phone size={16} color={COLORS.red[600]} />
                  </View>
                  <View style={styles.resourceContent}>
                    <Text style={styles.resourceName}>{resource.name}</Text>
                    <Text style={styles.resourcePhone}>{resource.phone}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onNavigateToCrisis}
            >
              <Text style={styles.primaryButtonText}>View All Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Continue Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['3xl'],
    padding: SPACING['2xl'],
    ...SHADOWS.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
  },
  message: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[600],
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  resourcesContainer: {
    maxHeight: 200,
    marginBottom: SPACING.lg,
  },
  resourcesTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.slate[900],
    marginBottom: SPACING.md,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.red[50],
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  resourceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  resourceContent: {
    flex: 1,
  },
  resourceName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[900],
    marginBottom: 2,
  },
  resourcePhone: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.red[600],
  },
  actions: {
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.red[600],
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.slate[100],
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.slate[700],
  },
});

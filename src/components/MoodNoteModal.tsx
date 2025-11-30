import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { X } from 'lucide-react-native';
import { useFadeIn } from '../utils/animations';
import * as Haptics from 'expo-haptics';

interface MoodNoteModalProps {
  visible: boolean;
  moodLabel: string;
  onSave: (note: string) => void;
  onSkip: () => void;
}

const MAX_CHARACTERS = 200;

export const MoodNoteModal: React.FC<MoodNoteModalProps> = ({
  visible,
  moodLabel,
  onSave,
  onSkip,
}) => {
  const [note, setNote] = useState('');
  const { opacity } = useFadeIn(300, 0);

  const handleSave = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSave(note.trim());
    setNote('');
  };

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNote('');
    onSkip();
  };

  const remainingChars = MAX_CHARACTERS - note.length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleSkip}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleSkip}
        />
        <Animated.View style={[styles.modal, { opacity }]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add a Note</Text>
              <Text style={styles.subtitle}>Feeling {moodLabel.toLowerCase()}</Text>
            </View>
            <TouchableOpacity onPress={handleSkip} style={styles.closeButton}>
              <X size={24} color={COLORS.slate[400]} />
            </TouchableOpacity>
          </View>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="What's on your mind? (optional)"
            placeholderTextColor={COLORS.slate[400]}
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={MAX_CHARACTERS}
            autoFocus
            textAlignVertical="top"
          />

          {/* Character Counter */}
          <Text
            style={[
              styles.charCounter,
              remainingChars < 20 && { color: COLORS.orange[500] },
            ]}
          >
            {remainingChars} characters remaining
          </Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !note.trim() && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!note.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['3xl'],
    padding: SPACING['2xl'],
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[500],
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  input: {
    backgroundColor: COLORS.slate[50],
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[900],
    minHeight: 120,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  charCounter: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[400],
    textAlign: 'right',
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  skipButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.slate[100],
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.slate[600],
  },
  saveButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.slate[900],
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.slate[300],
  },
  saveButtonText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.white,
  },
});

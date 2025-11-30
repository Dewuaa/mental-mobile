import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface ChatPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const PROMPT_CATEGORIES = [
  {
    category: 'Feeling Anxious',
    icon: '😰',
    prompts: [
      "I'm feeling anxious about...",
      "Help me calm down, I'm overwhelmed",
      "I can't stop worrying about...",
    ],
  },
  {
    category: 'Need Motivation',
    icon: '💪',
    prompts: [
      "I'm struggling to stay motivated",
      "Help me find purpose today",
      "I need encouragement to...",
    ],
  },
  {
    category: 'Processing Emotions',
    icon: '💭',
    prompts: [
      "I need to talk about what happened today",
      "Help me understand why I feel...",
      "I'm confused about my emotions",
    ],
  },
];

export const ChatPrompts: React.FC<ChatPromptsProps> = ({ onSelectPrompt }) => {
  const handlePromptPress = async (prompt: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectPrompt(prompt);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Sparkles size={20} color={COLORS.indigo[500]} />
        <Text style={styles.headerText}>Start a conversation</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PROMPT_CATEGORIES.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.category}</Text>
            </View>
            {category.prompts.map((prompt, promptIndex) => (
              <TouchableOpacity
                key={promptIndex}
                style={styles.promptButton}
                onPress={() => handlePromptPress(prompt)}
                activeOpacity={0.7}
              >
                <Text style={styles.promptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[600],
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  categoryCard: {
    width: 240,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
    ...SHADOWS.soft,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  promptButton: {
    backgroundColor: COLORS.slate[50],
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  promptText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[700],
    lineHeight: 18,
  },
});

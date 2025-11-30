import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { Send, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { sendMessageToGemini } from '../services/geminiService';
import { chatStorage } from '../services/storageService';
import { Message } from '../types';
import { useFadeIn } from '../utils/animations';

const AIChatScreen: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi there. I'm MindMate. How are you feeling right now? I'm here to listen.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
  const { opacity: fadeOpacity } = useFadeIn(600, 0);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      chatStorage.saveChatHistory(messages);
    }
  }, [messages]);

  const loadChatHistory = async () => {
    const history = await chatStorage.getChatHistory();
    if (history && history.length > 0) {
      setMessages(history);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    try {
      const responseText = await sendMessageToGemini(history, userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm listening...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    await chatStorage.clearChatHistory();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        text: "Hi there. I'm MindMate. How are you feeling right now? I'm here to listen.",
        timestamp: new Date(),
      },
    ]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessageContainer : styles.modelMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.role === 'user' ? styles.userBubble : styles.modelBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.role === 'user' ? styles.userText : styles.modelText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(245, 243, 255, 0.6)', COLORS.slate[50]]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Glassy Header */}
          <Animated.View style={[styles.header, { opacity: fadeOpacity }]}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[COLORS.indigo[100], COLORS.white]}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>MM</Text>
                </LinearGradient>
                <View style={styles.onlineIndicator} />
              </View>
              <View>
                <Text style={styles.headerTitle}>MindMate</Text>
                <Text style={styles.headerSubtitle}>AI Wellness Companion</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleClearChat}
              disabled={messages.length <= 1}
              style={[
                styles.clearButton,
                messages.length <= 1 && styles.clearButtonDisabled
              ]}
            >
              <Trash2
                size={20}
                color={messages.length > 1 ? COLORS.slate[600] : COLORS.slate[300]}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Messages */}
          <Animated.FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            onLayout={() => flatListRef.current?.scrollToEnd()}
            style={{ opacity: fadeOpacity }}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color={COLORS.indigo[500]} />
                <Text style={styles.loadingText}>Thinking...</Text>
              </View>
            </View>
          )}

          {/* Input Area */}
          <Animated.View style={[styles.inputContainer, { opacity: fadeOpacity }]}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Share what's on your mind..."
                placeholderTextColor={COLORS.slate[400]}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                onPress={handleSend}
                disabled={isLoading || !input.trim()}
                style={[
                  styles.sendButton,
                  input.trim() && styles.sendButtonActive,
                ]}
              >
                <Send
                  size={18}
                  color={input.trim() ? COLORS.white : COLORS.slate[300]}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate[50],
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    ...SHADOWS.soft,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.indigo[200],
    ...SHADOWS.soft,
  },
  avatarText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.indigo[600],
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.green[400],
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.slate[800],
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[500],
    fontWeight: '500',
    marginTop: 2,
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.5)',
  },
  clearButtonDisabled: {
    opacity: 0.4,
  },
  messagesList: {
    padding: SPACING.lg,
    paddingBottom: SPACING['2xl'],
  },
  messageContainer: {
    marginBottom: SPACING.lg,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  modelMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: SPACING.lg,
    borderRadius: RADIUS['3xl'],
  },
  userBubble: {
    backgroundColor: COLORS.teal[500],
    borderBottomRightRadius: RADIUS.sm,
    ...SHADOWS.soft,
  },
  modelBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomLeftRadius: RADIUS.sm,
    ...SHADOWS.soft,
  },
  messageText: {
    fontSize: FONTS.sizes.base,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.white,
  },
  modelText: {
    color: COLORS.slate[700],
  },
  loadingContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS['3xl'],
    borderBottomLeftRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'flex-start',
    ...SHADOWS.soft,
  },
  loadingText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.indigo[500],
    fontWeight: '600',
  },
  inputContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate[100],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.sm,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.sm,
    color: COLORS.slate[700],
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.slate[100],
  },
  sendButtonActive: {
    backgroundColor: COLORS.slate[900],
    ...SHADOWS.medium,
  },
});

export default AIChatScreen;

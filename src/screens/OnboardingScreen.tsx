import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../theme';
import { Button } from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userStorage } from '../services/storageService';
import { useFadeIn, useSlideUp } from '../utils/animations';
import { SuccessAnimation } from '../components/SuccessAnimation';
import { LottieAnimation } from '../components/LottieAnimation';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const GOALS_LIST = [
  { id: 'anxiety', title: 'Reduce Anxiety', desc: 'Calm my racing mind', icon: 'brain' },
  { id: 'sleep', title: 'Sleep Better', desc: 'Improve sleep quality', icon: 'weather-night' },
  { id: 'confidence', title: 'Build Confidence', desc: 'Boost self-esteem', icon: 'trophy-outline' },
  { id: 'mood', title: 'Track Mood', desc: 'Understand emotions', icon: 'emoticon-happy-outline' },
  { id: 'stress', title: 'Manage Stress', desc: 'Cope with pressure', icon: 'lightning-bolt-outline' },
  { id: 'community', title: 'Find Community', desc: 'Connect with peers', icon: 'account-group-outline' }
];

const MOOD_LIST = [
  { label: 'Anxious', color: COLORS.orange[500] },
  { label: 'Stressed', color: COLORS.red[500] },
  { label: 'Okay', color: COLORS.slate[500] },
  { label: 'Hopeful', color: COLORS.teal[500] },
  { label: 'Calm', color: COLORS.indigo[500] },
];

const VIBE_LIST = [
  { id: 'warm', label: 'Warm & Gentle', desc: 'Like a supportive friend.', icon: 'heart-outline' },
  { id: 'direct', label: 'Direct & Coaching', desc: 'Action-oriented and clear.', icon: 'target' },
  { id: 'pro', label: 'Professional', desc: 'Clinical and objective.', icon: 'briefcase-outline' },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  
  // User Data State
  const [name, setName] = useState('');
  const [mood, setMood] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [vibe, setVibe] = useState('Warm & Gentle');

  // Animations
  const { opacity: fadeOpacity } = useFadeIn(800, 0);
  const slideAnimStyle = useSlideUp(40, 800, 200);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation
  const isStepValid = () => {
    switch(step) {
      case 0: return true; // Welcome
      case 1: return name.trim().length > 0; // Name
      case 2: return true; // Mood (optional)
      case 3: return goals.length > 0; // Goals
      case 4: return true; // Vibe (has default)
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    // Save all data
    await userStorage.setUserName(name);
    await userStorage.setUserGoals(goals);
    await userStorage.setCommStyle(vibe);
    // Note: Mood is typically logged to a daily tracker, we could save it as the first entry
    // For now we just save preferences.
    
    setShowSuccess(true);
  };

  const onAnimationFinish = async () => {
    await userStorage.setOnboarded(true);
  };

  const toggleGoal = (goalId: string) => {
    if (goals.includes(goalId)) {
      setGoals(goals.filter(g => g !== goalId));
    } else {
      if (goals.length < 3) {
        setGoals([...goals, goalId]);
      }
    }
  };

  if (showSuccess) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <SuccessAnimation 
          visible={true} 
          onFinish={onAnimationFinish}
        />
        <Text style={[styles.title, { marginTop: SPACING.xl }]}>All Set, {name}!</Text>
        <Text style={styles.subtitle}>Your journey begins now.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['rgba(245, 243, 255, 0.6)', COLORS.slate[50]]}
          style={styles.gradient}
        >
          {/* Header / Progress */}
          <View style={styles.header}>
            {step > 0 && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.slate[600]} />
              </TouchableOpacity>
            )}
            <View style={styles.progressContainer}>
              {[0, 1, 2, 3, 4].map((s) => (
                <View 
                  key={s} 
                  style={[
                    styles.progressBar, 
                    { 
                      backgroundColor: s <= step ? COLORS.slate[900] : COLORS.slate[200],
                      width: s <= step ? 24 : 8 
                    }
                  ]} 
                />
              ))}
            </View>
            <View style={{ width: 40 }} /> 
          </View>

          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, slideAnimStyle]}>

              {/* STEP 0: WELCOME */}
              {step === 0 && (
                <View style={styles.stepContainer}>
                  <View style={styles.lottieContainer}>
                     <LottieAnimation
                        source={require('../assets/animations/Welcome.json')}
                        width={280}
                        height={280}
                        autoPlay
                        loop
                      />
                  </View>
                  <Text style={styles.title}>Welcome to{'\n'}MentalWell</Text>
                  <Text style={styles.subtitle}>Your sanctuary for growth, balance, and peace of mind.</Text>
                </View>
              )}

              {/* STEP 1: NAME */}
              {step === 1 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>What should we call you?</Text>
                  <Text style={styles.stepSubtitle}>This helps us personalize your experience.</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    placeholderTextColor={COLORS.slate[400]}
                    value={name}
                    onChangeText={setName}
                    autoFocus
                  />
                </View>
              )}

              {/* STEP 2: MOOD */}
              {step === 2 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>How are you feeling?</Text>
                  <Text style={styles.stepSubtitle}>There is no wrong answer.</Text>
                  <View style={styles.optionsList}>
                    {MOOD_LIST.map((m) => (
                      <TouchableOpacity
                        key={m.label}
                        style={[
                          styles.optionButton,
                          mood === m.label && { borderColor: COLORS.teal[500], backgroundColor: COLORS.teal[50] }
                        ]}
                        onPress={() => setMood(m.label)}
                      >
                        <Text style={[
                          styles.optionText,
                          mood === m.label && { color: COLORS.teal[600], fontWeight: '700' }
                        ]}>{m.label}</Text>
                        <View style={[
                          styles.radio,
                          mood === m.label && { borderColor: COLORS.teal[500], backgroundColor: COLORS.teal[500] }
                        ]} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* STEP 3: GOALS */}
              {step === 3 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>What brings you here?</Text>
                  <Text style={styles.stepSubtitle}>Select up to 3 goals ({goals.length}/3)</Text>
                  <View style={styles.grid}>
                    {GOALS_LIST.map((g) => {
                      const isSelected = goals.includes(g.id);
                      const isDisabled = !isSelected && goals.length >= 3;
                      return (
                        <TouchableOpacity
                          key={g.id}
                          style={[
                            styles.card,
                            isSelected && { borderColor: COLORS.teal[500], backgroundColor: COLORS.teal[50] },
                            isDisabled && { opacity: 0.5 }
                          ]}
                          onPress={() => !isDisabled && toggleGoal(g.id)}
                        >
                          <MaterialCommunityIcons 
                            name={g.icon as any} 
                            size={24} 
                            color={isSelected ? COLORS.teal[600] : COLORS.slate[400]} 
                            style={{ marginBottom: 8 }}
                          />
                          <Text style={[
                            styles.cardTitle,
                            isSelected && { color: COLORS.teal[600] }
                          ]}>{g.title}</Text>
                          <Text style={styles.cardDesc}>{g.desc}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* STEP 4: VIBE */}
              {step === 4 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>Your Assistant's Vibe</Text>
                  <Text style={styles.stepSubtitle}>How should MindMate talk to you?</Text>
                  <View style={styles.optionsList}>
                    {VIBE_LIST.map((v) => (
                      <TouchableOpacity
                        key={v.id}
                        style={[
                          styles.vibeCard,
                          vibe === v.label && { borderColor: COLORS.teal[500], backgroundColor: COLORS.teal[50] }
                        ]}
                        onPress={() => setVibe(v.label)}
                      >
                        <View style={[
                          styles.iconBox,
                          vibe === v.label && { backgroundColor: COLORS.teal[500] }
                        ]}>
                          <MaterialCommunityIcons 
                            name={v.icon as any} 
                            size={20} 
                            color={vibe === v.label ? COLORS.white : COLORS.slate[400]} 
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[
                            styles.optionText,
                            vibe === v.label && { color: COLORS.teal[600], fontWeight: '700' }
                          ]}>{v.label}</Text>
                          <Text style={styles.cardDesc}>{v.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

            </Animated.View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              title={step === 4 ? 'Get Started' : 'Continue'}
              onPress={handleNext}
              size="large"
              fullWidth
              disabled={!isStepValid()}
            />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING.xl,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  lottieContainer: {
    marginBottom: SPACING['2xl'],
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes['4xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.slate[500],
    textAlign: 'center',
    lineHeight: 24,
  },
  stepTitle: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
    textAlign: 'center',
    marginBottom: SPACING.sm,
    alignSelf: 'stretch',
  },
  stepSubtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[500],
    textAlign: 'center',
    marginBottom: SPACING['2xl'],
    alignSelf: 'stretch',
  },
  input: {
    width: '100%',
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.slate[900],
    borderBottomWidth: 2,
    borderBottomColor: COLORS.slate[200],
    paddingVertical: SPACING.md,
    textAlign: 'center',
  },
  optionsList: {
    width: '100%',
    gap: SPACING.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
    ...SHADOWS.soft,
  },
  optionText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.slate[700],
    fontWeight: '500',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.slate[300],
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  card: {
    width: (width - SPACING['2xl'] * 2 - SPACING.md) / 2,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
    ...SHADOWS.soft,
  },
  cardTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.slate[800],
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[400],
  },
  vibeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
    gap: SPACING.md,
    ...SHADOWS.soft,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.slate[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: SPACING['2xl'],
    backgroundColor: 'transparent',
  },
});

export default OnboardingScreen;

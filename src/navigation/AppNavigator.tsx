import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../types';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { AnimatedTabIcon } from '../components/AnimatedTabIcon';
import ExerciseScreen from '../screens/ExerciseScreen';
import AIChatScreen from '../screens/AIChatScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ToolsScreen from '../screens/ToolsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CrisisScreen from '../screens/CrisisScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SleepSoundsScreen from '../screens/SleepSoundsScreen';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// --- Configuration ---
const COLORS = {
  background: '#FFFFFF',
  inactive: '#94A3B8',
};

// --- Custom Floating Button Component ---
const CustomTabBarButton = ({ children, onPress }: any) => {
  const { currentTheme } = useTheme();
  
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.floatingButton, { backgroundColor: currentTheme.colors.primary }]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

// --- Main Tabs ---
function MainTabs() {
  const { currentTheme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 20,
          height: 80,
          paddingBottom: 15,
          paddingTop: 5,
          borderWidth: 0,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              name={focused ? 'home-variant' : 'home-variant-outline'}
              size={28}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              name={focused ? 'spa' : 'spa-outline'}
              size={28}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      
      {/* Central "Hero" Button for Chat */}
      <Tab.Screen
        name="Chat"
        component={AIChatScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <MaterialCommunityIcons name="robot-happy" size={32} color="#FFFFFF" />
            </CustomTabBarButton>
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              name={focused ? 'account-group' : 'account-group-outline'}
              size={28}
              color={color}
              focused={focused}
              badgeCount={3}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              name={focused ? 'toolbox' : 'toolbox-outline'}
              size={28}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// --- Root Navigator ---
export default function AppNavigator({ hasOnboarded }: { hasOnboarded: boolean }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            
            {/* Modal Screens */}
            <Stack.Screen
              name="Crisis"
              component={CrisisScreen}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ presentation: 'modal' }}
            />
            
            {/* Profile as Stack Screen */}
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ presentation: 'card' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
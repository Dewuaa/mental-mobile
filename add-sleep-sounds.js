// Simple script to add SleepSounds to navigation
// Run this with: node add-sleep-sounds.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'navigation', 'AppNavigator.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import after SettingsScreen
const importLine = "import SleepSoundsScreen from '../screens/SleepSoundsScreen';";
const importTarget = "import SettingsScreen from '../screens/SettingsScreen';";
content = content.replace(importTarget, importTarget + '\n' + importLine);

// Add route after Profile screen
const routeCode = `            <Stack.Screen 
              name="SleepSounds" 
              component={SleepSoundsScreen} 
              options={{ presentation: 'card' }}
            />`;
const routeTarget = `            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ presentation: 'card' }}
            />`;
content = content.replace(routeTarget, routeTarget + '\n' + routeCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added SleepSounds to navigation!');

# 🚀 Quick Start Guide

## Get Up and Running in 5 Minutes!

### Step 1: Navigate to Project
```bash
cd c:\Users\PC\Downloads\mentalwell-connect\mentalwell-connect-mobile
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Add Your Gemini API Key
1. Open `src/services/geminiService.ts`
2. Find line 7: `const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';`
3. Replace with your actual API key from https://makersuite.google.com/app/apikey

### Step 4: Start the App
```bash
npm start
```

### Step 5: Run on Device/Emulator

**Option A: Use Expo Go (Easiest)**
1. Install Expo Go on your phone
2. Scan the QR code from the terminal
3. App will load on your device!

**Option B: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

**Option D: Web Browser**
```bash
npm run web
```

## ✅ What to Test

1. **Onboarding**: First launch shows welcome screen
2. **Dashboard**: Tap mood icons (feel the haptic feedback!)
3. **AI Chat**: Talk to MindMate (requires API key)
4. **Navigation**: Try all bottom tabs
5. **Settings**: Change theme
6. **Crisis**: Test emergency modal

## 🎯 Key Files to Know

- `App.tsx` - Entry point
- `src/navigation/AppNavigator.tsx` - Navigation setup
- `src/services/geminiService.ts` - **ADD YOUR API KEY HERE**
- `src/theme/index.ts` - Customize colors/styles

## 🐛 Troubleshooting

**Metro bundler won't start?**
```bash
npm start -- --reset-cache
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Expo Go not connecting?**
- Make sure phone and computer are on same WiFi
- Try scanning QR code again
- Restart Expo Go app

## 📱 Next Steps

1. ✅ Test all features
2. ✅ Add your Gemini API key
3. ✅ Customize theme colors
4. ✅ Add your own content
5. ✅ Deploy to app stores!

---

**Need help?** Check the full [README.md](./README.md) for detailed instructions.

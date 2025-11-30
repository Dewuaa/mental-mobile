// Note: Install @google/generative-ai package
// npm install @google/generative-ai

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI
// In production, use react-native-config or expo-constants for environment variables
const API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // System instruction for MindMate
    const systemInstruction = `You are 'MindMate', a compassionate, non-judgmental, and supportive mental wellness assistant for college students. Your tone is warm, calming, and empathetic. Keep responses concise (under 100 words) unless asked for details. If a user expresses severe distress or self-harm ideation, kindly but firmly direct them to professional help or emergency services immediately.`;

    // Convert history to Gemini format
    const chatHistory = history.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts,
    }));

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    // Send message
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    return "I'm having a little trouble connecting right now. Let's take a deep breath and try again in a moment.";
  }
};

// Helper function to initialize chat with system instruction
export const initializeChat = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    return chat;
  } catch (error) {
    console.error('Error initializing chat:', error);
    throw error;
  }
};

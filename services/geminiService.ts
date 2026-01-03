
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use exactly process.env.API_KEY for initialization without fallback
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFarmingAdvice = async (crop: string, weather: string, lang: 'en' | 'hi' | 'mr') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a single sentence advice for a farmer in ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'} language.
      Context: Crop is ${crop}, Weather is ${weather}.
      Keep it short, professional, and practical.`,
    });
    return response.text || "Keep monitoring your fields.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
};

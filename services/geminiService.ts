
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A check to ensure API_KEY is available. In a real app, this might be handled differently.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getZikrReflection = async (zikrText: string): Promise<string> => {
  if (!API_KEY) {
    return "ميزة التأمل غير متاحة حاليًا. يرجى التأكد من تكوين مفتاح Gemini API.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `قدم تأملًا موجزًا وملهمًا باللغة العربية حول معنى وفضل هذا الذكر الإسلامي: "${zikrText}"`,
      config: {
          temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching reflection from Gemini API:", error);
    return "عذرًا، حدث خطأ أثناء محاولة الحصول على تأمل. يرجى المحاولة مرة أخرى.";
  }
};

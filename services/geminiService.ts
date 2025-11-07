import { GoogleGenAI } from "@google/genai";

// نستخدم نمط Singleton لتهيئة عميل الذكاء الاصطناعي فقط عند الحاجة
// وفقط إذا كان مفتاح API متاحًا. هذا يمنع التطبيق من التعطل
// عند بدء التشغيل إذا لم يتم تكوين مفتاح API في بيئة النشر.
let aiInstance: GoogleGenAI | null = null;

const getAiInstance = (): GoogleGenAI | null => {
  // إرجاع النسخة الموجودة إذا تم إنشاؤها بالفعل.
  if (aiInstance) {
    return aiInstance;
  }

  const API_KEY = process.env.API_KEY;

  // إذا لم يتم العثور على مفتاح API، يتم تسجيل تحذير وإرجاع null.
  // سيستمر التطبيق في العمل، ولكن سيتم تعطيل ميزات الذكاء الاصطناعي.
  if (!API_KEY) {
    console.warn("مفتاح Gemini API غير موجود في متغيرات البيئة. سيتم تعطيل ميزات الذكاء الاصطناعي.");
    return null;
  }

  // إنشاء وتخزين النسخة للاستخدام في المستقبل.
  aiInstance = new GoogleGenAI({ apiKey: API_KEY });
  return aiInstance;
};


export const getZikrReflection = async (zikrText: string): Promise<string> => {
  const ai = getAiInstance();

  if (!ai) {
    return "ميزة التأمل غير متاحة حاليًا. يرجى التأكد من تكوين مفتاح Gemini API بشكل صحيح في إعدادات النشر الخاصة بك على Netlify.";
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
    if (error instanceof Error && error.message.includes('API key not valid')) {
         return "حدث خطأ: مفتاح Gemini API غير صالح. يرجى التحقق من المفتاح في إعدادات Netlify.";
    }
    return "عذرًا، حدث خطأ أثناء محاولة الحصول على تأمل. يرجى المحاولة مرة أخرى لاحقًا.";
  }
};

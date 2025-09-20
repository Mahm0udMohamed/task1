
import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, Question } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      description: "An array of 5 quiz questions.",
      items: {
        type: Type.OBJECT,
        properties: {
          questionText: {
            type: Type.STRING,
            description: "The text of the quiz question."
          },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 possible answers.",
            items: {
              type: Type.STRING
            }
          },
          correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The 0-based index of the correct answer in the options array."
          }
        },
        required: ["questionText", "options", "correctAnswerIndex"]
      }
    }
  },
  required: ["questions"]
};

export async function generateQuizQuestions(topic: string): Promise<Question[]> {
  const prompt = `
    أنت خبير في إنشاء اختبارات ممتعة وجذابة للأطفال الذين تتراوح أعمارهم بين 9 و 12 عامًا.
    أنشئ اختبارًا من 5 أسئلة متعددة الخيارات حول الموضوع التالي: "${topic}".
    يجب أن يكون لكل سؤال 4 خيارات ممكنة، ويجب أن يكون أحدها صحيحًا.
    يجب أن تكون الأسئلة مثيرة للاهتمام ومناسبة لهذه الفئة العمرية.
    أرجع النتيجة ككائن JSON يطابق المخطط المقدم.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: quizSchema,
      }
    });

    const jsonText = response.text.trim();
    const quizData: QuizData = JSON.parse(jsonText);
    
    // Basic validation to ensure we have data
    if (!quizData.questions || quizData.questions.length === 0) {
        throw new Error("AI returned no questions.");
    }

    return quizData.questions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // You might want to return a default quiz or throw the error
    throw new Error("Failed to generate the quiz. Please try a different topic.");
  }
}

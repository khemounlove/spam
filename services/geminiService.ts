
import { GoogleGenAI, Type } from "@google/genai";
import { AuditReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProfile = async (url: string, targetFollowers: string): Promise<AuditReport> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this Facebook Profile/Page URL: ${url}. 
               The user wants to reach ${targetFollowers} followers.
               Provide a realistic audit report and a strategic growth roadmap.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          currentFollowers: { type: Type.NUMBER },
          engagementRate: { type: Type.STRING },
          niche: { type: Type.STRING },
          suggestedContent: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          riskFactor: { 
            type: Type.STRING,
            description: "Risk factor from Low, Medium, High"
          },
          competitorAnalysis: { type: Type.STRING }
        },
        required: ["currentFollowers", "engagementRate", "niche", "suggestedContent", "riskFactor", "competitorAnalysis"]
      }
    }
  });

  return JSON.parse(response.text);
};

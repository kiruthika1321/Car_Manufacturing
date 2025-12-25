
import { GoogleGenAI } from "@google/genai";
import { Car } from "../types";

export async function getCarAdvice(userQuery: string, availableCars: Car[]): Promise<string> {
  try {
    // DIRECT: Initialize with process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const carListStr = availableCars.map(c => 
      `${c.name} (${c.category}): $${c.price}, Specs: ${JSON.stringify(c.specs)}, Description: ${c.description}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Kiruthika Car Manufacturing Concierge. Your tone is professional, luxurious, and helpful. 
      Help the user choose a car from our fleet based on their query: "${userQuery}"
      
      Our fleet:
      ${carListStr}
      
      Suggest the best matches and explain why. If they ask something unrelated to cars, politely redirect them to our models. Use Markdown for formatting.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Access property .text directly.
    return response.text || "I'm sorry, I couldn't process that request right now. Please explore our models directly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our concierge is currently busy assisting other clients. Please try again in a moment.";
  }
}

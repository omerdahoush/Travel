import { GoogleGenAI } from "@google/genai";

export const generateItinerary = async (prompt: string): Promise<string> => {
  // Fix: Removed explicit API_KEY check to align with guidelines.
  // The key is assumed to be present in the environment.
  // The try/catch block will handle auth errors gracefully.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a travel itinerary based on this prompt: "${prompt}". Structure the response in clear, easy-to-read markdown format.`,
        config: {
            systemInstruction: "You are a helpful travel assistant. You create detailed and exciting travel itineraries.",
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Failed to generate itinerary. Please try again later.";
  }
};

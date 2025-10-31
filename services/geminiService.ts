import { GoogleGenAI, Modality } from "@google/genai";

const getBase64Data = (dataUrl: string): { mimeType: string; data: string } => {
  const parts = dataUrl.split(',');
  if (parts.length !== 2) {
    throw new Error("Invalid data URL format.");
  }
  const [header, data] = parts;
  const mimeTypeMatch = header.match(/:(.*?);/);
  const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';
  return { mimeType, data };
};

export const processImageWithGemini = async (
  imageBase64: string,
  prompt: string
): Promise<{ data: string; mimeType: string } | null> => {
  if (!process.env.API_KEY) {
    // The execution environment is expected to have the API_KEY.
    console.error("API_KEY environment variable not set. API calls will fail.");
    throw new Error("API key is not configured.");
  }
  // FIX: Per coding guidelines, initialize GoogleGenAI with process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { mimeType, data } = getBase64Data(imageBase64);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    // FIX: To be more robust, return the full inlineData object which includes the mimeType.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData;
      }
    }
    
    return null;

  } catch (error) {
    console.error('Error processing image with Gemini:', error);
    throw new Error('Failed to communicate with the Gemini API. Please check your prompt and try again.');
  }
};

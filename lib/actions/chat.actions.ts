'use server';

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

export async function newchat() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}
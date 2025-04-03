'use server';

import { GoogleGenAI } from "@google/genai";

const apikey = process.env.APIKEY as string;


const ai = new GoogleGenAI({ apiKey: apikey });

export async function newchat(prompt:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`explain in detail ${prompt}`,
  });
  return response.text
}
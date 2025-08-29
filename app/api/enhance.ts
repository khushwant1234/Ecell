// pages/api/enhance.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ message: 'Text to enhance is required.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // This is the crucial system prompt that guides the AI
    const prompt = `
      You are an expert career coach and professional writer. 
      Rephrase and improve the following job application answer to be more clear, professional, and impactful.
      Keep the core meaning the same but enhance the language and sentence structure. 
      Do not make it significantly longer than the original.
      Original text: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();

    res.status(200).json({ enhancedText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: 'Failed to enhance text due to an internal error.' });
  }
}
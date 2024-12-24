import { get } from "http";
import { getSystemPrompt, templatePrompt } from "../lib/ai/prompts";

require("dotenv").config();


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const templateModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: templatePrompt });
const systemModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: getSystemPrompt(__dirname) });
async function askTemplate(prompt: string, systemPrompt? : string){
    // Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: templatePrompt });

// const prompt = "what is 2+2.";

const result = await templateModel.generateContent(prompt);

// Print text as it comes in.
// for await (const chunk of result.stream) {
//   const chunkText = chunk.text();
//   console.log(chunkText);
  
// }
return result.response.text();
}
export interface History {
  role: string;
  id: string;
  message: string;
}[]
async function askAi(history: History, content: string){
  const chat = systemModel.startChat({
    history
  })
  let result  = await chat.sendMessages(content);
  console.log("result", result.response.text());
  return result.response.text();
}
export { askAi, askTemplate };
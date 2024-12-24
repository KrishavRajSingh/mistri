"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAi = askAi;
exports.askTemplate = askTemplate;
const prompts_1 = require("../lib/ai/prompts");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const templateModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: prompts_1.templatePrompt });
const systemModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: (0, prompts_1.getSystemPrompt)(__dirname) });
function askTemplate(prompt, systemPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // Make sure to include these imports:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: templatePrompt });
        // const prompt = "what is 2+2.";
        const result = yield templateModel.generateContent(prompt);
        // Print text as it comes in.
        // for await (const chunk of result.stream) {
        //   const chunkText = chunk.text();
        //   console.log(chunkText);
        // }
        return result.response.text();
    });
}
[];
function askAi(history, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const chat = systemModel.startChat({
            history
        });
        let result = yield chat.sendMessages(content);
        console.log("result", result.response.text());
        return result.response.text();
    });
}

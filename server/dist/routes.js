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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = void 0;
const console_1 = require("console");
const prompts_1 = require("./lib/ai/prompts");
const geminiService_1 = require("./services/geminiService");
const path_1 = __importDefault(require("path"));
// import template from "../../templates/"
const getTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt || "make a to-do app";
    if (prompt) {
        console.log("prompt", prompt);
        const result = yield (0, geminiService_1.askTemplate)(prompt, prompts_1.templatePrompt);
        (0, console_1.log)("result", result);
        if (result) {
            if (result) {
                const filePAth = path_1.default.join(__dirname, "../templates/react.json");
                // const file = fs.readFileSync(filePAth);
                // res.json({
                //     message: "hi",
                //     file
                // });
                res.sendFile(filePAth);
            }
        }
    }
});
exports.getTemplate = getTemplate;

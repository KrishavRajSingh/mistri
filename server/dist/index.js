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
const express_1 = __importDefault(require("express"));
const geminiService_1 = require("./services/geminiService");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.post("/template", getTemplate);
app.get("/template", routes_1.getTemplate);
app.post("/ask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = req.body.hisory;
    const content = req.body.content;
    const result = yield (0, geminiService_1.askAi)(history, content);
    res.send(result);
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
// async function main() {
//     // const result = await askAi("create a to-do app", getSystemPrompt(__dirname));
//     console.log("result", __dirname);
// }
// 
// main()

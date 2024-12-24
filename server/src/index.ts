import express from "express";
import { askAi } from "./services/geminiService";
import { getTemplate } from "./routes";

const app = express();
app.use(express.json());

// app.post("/template", getTemplate);
app.get("/template", getTemplate);

app.post("/ask", async(req, res) => {
    const history = req.body.hisory;
    const content = req.body.content;
    const result = await askAi(history, content);
    res.send(result);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
// async function main() {
//     // const result = await askAi("create a to-do app", getSystemPrompt(__dirname));
//     console.log("result", __dirname);
// }
// 
// main()

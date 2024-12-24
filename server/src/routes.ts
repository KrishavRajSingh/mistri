import { log } from "console";
import { templatePrompt } from "./lib/ai/prompts";
import { askAi, askTemplate } from "./services/geminiService";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
// import template from "../../templates/"
export const getTemplate = async(req: Request , res: Response) => {
    const prompt = req.body.prompt || "make a to-do app";

    if(prompt) {
        console.log("prompt", prompt);
        
        const result  = await askTemplate(prompt, templatePrompt)
        log("result", result);
        if (result) {
            if( result ){
                const filePAth = path.join(__dirname, "../templates/react.json");
                // const file = fs.readFileSync(filePAth);
                // res.json({
                //     message: "hi",
                //     file
                // });
                res.sendFile(filePAth);
            }
        }
    }

    
}
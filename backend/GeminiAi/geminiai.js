import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const APIKEY = process.env.APIKEY;

const ai = new GoogleGenAI({ apiKey: APIKEY });

const genAI = new GoogleGenerativeAI(APIKEY);

// async function GetResponse(content) {

//     console.log("content",content);

//     const promtResult = "";

//     try {
//         const response = await ai.models.generateContent({
//             model : "gemini-2.0-flash",
//             contents : content
//         })

//        // console.log("Response:",response.text);

//         return response.text;

//     } 
//     catch (error) {
//         console.log("Something Went Wrong!",error);
//     }
// }

async function GetResponse({ text, image }) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const parts = [];

        if (text) {
            parts.push({ text });
        }

        if (image) {
            parts.push({
                inlineData: {
                    mimeType: "image/jpeg", // or "image/png"
                    data: image, // base64 string without the data URI prefix
                },
            });
        }

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
        });

        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini error:", error?.response?.data || error.message || error);
        return "Error: Unable to generate response.";
    }
}


export default GetResponse;
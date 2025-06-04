import express from "express";
import dotenv from "dotenv";
import GetResponse from "./GeminiAi/geminiai.js";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get('/:content',async (req,res) => {
   const {content} = req.params;
   const response = await GetResponse(content);   

   res.status(200).json({data : response});
})

app.post('/generate',async (req,res) => {
    const {image , text } = req.body;

    const response = await GetResponse({ text, image });

    res.status(200).json({ data: response });
})

app.listen(PORT,() => {
    console.log(`The server is running on ${PORT}`);
})
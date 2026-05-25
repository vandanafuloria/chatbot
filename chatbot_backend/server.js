import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Conversation from './models/Conversation';

import  { OpenAI } from 'openai'; 
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// process.env.OPENAI_API_KEY is working because of the dotenv package which is used to load environment variables from a .env file into process.env 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/chat', async (req, res) => { // react application going to send the message 

 const userMessage = req.body.message // backend will recive it. and store it in the userMessage

 const response = await openai.chat.completions .create({ model:'gpt-4o-mini',
  messages :  [{role: 'system', content:  `
You are LeadBot for TheWordOfMouth.

You are NOT ChatGPT. You are a website assistant helping brands understand our product.

STRICT RULES:
- Maximum 2 short sentences only
-  bullet points only 
- No explanations like Wikipedia
- Never define general concepts like "what is word of mouth"
- Always talk about TheWordOfMouth product
- Keep answers sharp, simple, and conversion-focused
- Sound human, not robotic
- If user asks generic questions, redirect to product

Example:
User: tell me about word of mouth
Answer: We help brands turn customer reviews, videos, and social proof into a trust engine on their website. Want to see how it works on your store?
`},
    {role: 'user', content: userMessage}
  ], 
  temperature: 0.4,
  max_tokens : 50,
}) 
res.json({reply : response.choices[0].message.content})
})

app.listen(3000,()=>{
  console.log(chalk.redBright("server running on the port 3000 ")
  )
})
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Conversation from './models/Conversation.js';

import  { OpenAI } from 'openai'; 
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config(); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err))




const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// process.env.OPENAI_API_KEY is working because of the dotenv package which is used to load environment variables from a .env file into process.env 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/chat', async (req, res) => { // react application going to send the message 


 const { message, conversationId } = req.body

 let conversation = await Conversation.findOne({ conversationId })

if (!conversation) {
  conversation = new Conversation({ conversationId, messages: [] })
}

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
    ...conversation.messages,
    {role: 'user', content: message}
  ],
  temperature: 0.4,
  max_tokens : 50,
}) 

const botReply = response.choices[0].message.content
conversation.messages.push({role: 'user', content : message})
conversation.messages.push({role: 'assistant', content: botReply})
await conversation.save();
res.json({reply: botReply, conversationId})
})




// server listening...
app.listen(3000,()=>{
  console.log(chalk.redBright("server running on the port 3000 ")
  )
})
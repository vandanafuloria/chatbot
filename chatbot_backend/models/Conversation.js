import mongoose from "mongoose"; 

const conversationSchema = new mongoose.Schema({
  conversationId: String,
  messages: [
    {
      role: String,
      content: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation ; 
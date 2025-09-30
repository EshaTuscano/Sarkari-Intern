// server/api/elevenlabs.js
import express from 'express';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import 'dotenv/config';

const router = express.Router();
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

// Store agents in memory (use a database in production)
let agents = new Map();

// Create agent endpoint
router.post('/create-agent', async (req, res) => {
  try {
    const agent = await elevenlabs.conversationalAi.agents.create({
      name: "Website Assistant",
      conversationConfig: {
        agent: {
          prompt: {
            prompt: "You are a helpful assistant for our internship platform. Help users with internship applications, answer questions about available positions, and provide guidance. Be friendly and professional.",
          }
        },
      },
    });
    
    agents.set(agent.id, agent);
    res.json({ agentId: agent.id });
  } catch (error) {
    console.error('Error creating agent:', error);
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { agentId, message, sessionId } = req.body;
    
    const response = await elevenlabs.conversationalAi.conversations.sendMessage({
      agentId: agentId,
      sessionId: sessionId || undefined,
      message: message,
    });
    
    res.json({
      response: response.response,
      sessionId: response.sessionId,
      audioUrl: response.audioUrl
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Chat failed' });
  }
});

export default router;
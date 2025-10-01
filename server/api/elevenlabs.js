// pages/api/elevenlabs-agent.js or server/api/elevenlabs-agent.js
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: "sk_1503cf40ad98a305fcbbdcba18fd1b3031d35d27bfb12c3d"
});

// Store the agent (in production, use a database)
let conversationAgent = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId } = req.body;

    // Create agent if it doesn't exist
    if (!conversationAgent) {
      conversationAgent = await elevenlabs.conversationalAi.agents.create({
        name: "Internship Assistant",
        conversationConfig: {
          agent: {
            prompt: {
              prompt: "You are a helpful internship assistant for a placement platform. Help users with internship applications, answer questions about available positions, provide guidance on skills needed, and assist with the application process. Be friendly and professional.",
            }
          },
        },
      });
      console.log('Agent created:', conversationAgent.id);
    }

    // Send message to the agent
    const response = await elevenlabs.conversationalAi.conversations.sendMessage({
      agentId: conversationAgent.id,
      sessionId: sessionId || undefined, // Use existing session or create new one
      message: message,
    });

    res.json({
      response: response.response,
      sessionId: response.sessionId,
      audioUrl: response.audioUrl, // This should contain the voice response
      agentId: conversationAgent.id
    });

  } catch (error) {
    console.error('Error with ElevenLabs agent:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
}
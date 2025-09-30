// pages/api/chat.js (for Next.js) or server/routes/chat.js (for Express)
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Initialize ElevenLabs with your API key
    const elevenlabs = new ElevenLabsClient({
      apiKey: "sk_1503cf40ad98a305fcbbdcba18fd1b3031d35d27bfb12c3d" // Your friend's API key
    });

    // Generate AI response (you can replace this with any AI service)
    let responseText = generateAIResponse(message);

    // Generate speech with ElevenLabs
    const audio = await elevenlabs.generate({
      voice: "Rachel", // You can change to: "Adam", "Charlie", "Emily", "Brian", "Isabelle", etc.
      text: responseText,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    });

    // Convert audio to base64
    const audioChunks = [];
    for await (const chunk of audio) {
      audioChunks.push(chunk);
    }
    
    const audioBuffer = Buffer.concat(audioChunks);
    const audioBase64 = audioBuffer.toString('base64');

    res.json({
      response: responseText,
      audio: audioBase64,
      success: true
    });

  } catch (error) {
    console.error('ElevenLabs API error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      success: false
    });
  }
}

// Simple AI response generator - you can replace this with OpenAI, etc.
function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your internship assistant. I can help you with internship applications, answer questions about available positions, and guide you through the process. How can I assist you today?";
  } else if (lowerMessage.includes('internship') || lowerMessage.includes('apply')) {
    return "To apply for internships, simply fill out the candidate form on this website. Provide your education details, skills, location preferences, and background information. Our smart matching system will recommend the best internships for you!";
  } else if (lowerMessage.includes('skill') || lowerMessage.includes('qualification')) {
    return "Different internships require different skills. Common valuable skills include programming, communication, marketing, data analysis, and project management. You can list all your skills in the candidate form to get matched with relevant opportunities.";
  } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
    return "We have internships available in metro cities, tier 2 cities, tier 3 cities, and even rural areas. You can specify your location preference in the form, and we'll match you with opportunities in your preferred locations.";
  } else if (lowerMessage.includes('stipend') || lowerMessage.includes('payment') || lowerMessage.includes('money')) {
    return "Internship stipends vary based on the role, company, and location. They typically range from ₹10,000 to ₹30,000 per month. The exact stipend amount will be shown with each internship recommendation.";
  } else if (lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
    return "Internship durations usually range from 2 to 6 months. Some short-term internships are 2-3 months, while others can be longer. You'll see the specific duration for each opportunity in your recommendations.";
  } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! You can ask me about: internship applications, required skills, location options, stipend information, or the application process. What would you like to know?";
  } else {
    return "I'm your internship assistant! I can help you with internship applications, provide information about available opportunities, and guide you through the process. Feel free to ask me about skills needed, locations, stipends, or how to apply!";
  }
}
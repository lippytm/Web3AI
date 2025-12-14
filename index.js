require('dotenv').config();
const express = require('express');
const OpenAIChat = require('./openai-chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize OpenAI Chat client
const openaiChat = new OpenAIChat(
  process.env.OPENAI_API_KEY,
  process.env.OPENAI_MODEL || 'gpt-3.5-turbo'
);

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Web3AI Server is running' });
});

/**
 * Chat endpoint - Send messages to ChatGPT
 * POST /chat
 * Body: {
 *   "message": "Your message here",
 *   "conversationHistory": [] // Optional
 * }
 */
app.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const response = await openaiChat.sendMessage(message, conversationHistory);

    if (response.success) {
      res.json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: null
    });
  }
});

/**
 * Chat endpoint with system prompt
 * POST /chat/system
 * Body: {
 *   "message": "Your message here",
 *   "systemPrompt": "System instructions"
 * }
 */
app.post('/chat/system', async (req, res) => {
  try {
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    if (!systemPrompt) {
      return res.status(400).json({
        success: false,
        error: 'System prompt is required'
      });
    }

    const response = await openaiChat.sendMessageWithSystem(message, systemPrompt);

    if (response.success) {
      res.json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Error in /chat/system endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: null
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Web3AI Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: POST http://localhost:${PORT}/chat`);
  console.log(`Chat with system prompt: POST http://localhost:${PORT}/chat/system`);
});

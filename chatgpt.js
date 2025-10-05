import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatGPTService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(message, options = {}) {
    const {
      model = 'gpt-4',
      temperature = 0.7,
      maxTokens = 1000,
      systemPrompt = 'You are a helpful AI assistant specialized in Web3 and blockchain technology.'
    } = options;

    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
      });

      return {
        success: true,
        message: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async streamChat(message, options = {}) {
    const {
      model = 'gpt-4',
      temperature = 0.7,
      maxTokens = 1000,
      systemPrompt = 'You are a helpful AI assistant specialized in Web3 and blockchain technology.'
    } = options;

    try {
      const stream = await this.client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        stream: true,
      });

      return stream;
    } catch (error) {
      console.error('Error calling OpenAI API:', error.message);
      throw error;
    }
  }
}

export default ChatGPTService;

const OpenAI = require('openai');

/**
 * OpenAI ChatGPT Integration Module
 * Handles communication with OpenAI's ChatGPT API
 */
class OpenAIChat {
  constructor(apiKey, model = 'gpt-3.5-turbo') {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    
    this.client = new OpenAI({
      apiKey: apiKey,
    });
    
    this.model = model;
  }

  /**
   * Send a chat message to OpenAI ChatGPT and get a response
   * @param {string} message - The user's message
   * @param {Array} conversationHistory - Optional conversation history
   * @returns {Promise<Object>} Response object with message and metadata
   */
  async sendMessage(message, conversationHistory = []) {
    try {
      if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
      }

      // Build messages array with conversation history
      const messages = [
        ...conversationHistory,
        { role: 'user', content: message }
      ];

      // Make API call to OpenAI
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
      });

      // Validate response
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response received from OpenAI');
      }

      // Extract the response
      const response = completion.choices[0].message.content;
      
      return {
        success: true,
        message: response,
        model: this.model,
        usage: completion.usage,
        finishReason: completion.choices[0].finish_reason
      };
    } catch (error) {
      console.error('Error communicating with OpenAI:', error.message);
      return {
        success: false,
        error: error.message,
        message: null
      };
    }
  }

  /**
   * Send a chat message with system instructions
   * @param {string} message - The user's message
   * @param {string} systemPrompt - System instructions for the AI
   * @returns {Promise<Object>} Response object with message and metadata
   */
  async sendMessageWithSystem(message, systemPrompt) {
    try {
      if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
      }

      if (!systemPrompt || typeof systemPrompt !== 'string') {
        throw new Error('System prompt must be a non-empty string');
      }

      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ];

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
      });

      // Validate response
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response received from OpenAI');
      }

      const response = completion.choices[0].message.content;
      
      return {
        success: true,
        message: response,
        model: this.model,
        usage: completion.usage,
        finishReason: completion.choices[0].finish_reason
      };
    } catch (error) {
      console.error('Error communicating with OpenAI:', error.message);
      return {
        success: false,
        error: error.message,
        message: null
      };
    }
  }
}

module.exports = OpenAIChat;

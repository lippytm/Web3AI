/**
 * OpenAI Integration Module
 * 
 * This module demonstrates how to interact with OpenAI's API using the official SDK.
 * It includes examples of using GPT models for various AI tasks.
 * 
 * Now featuring GPT-5.1-Codex-Max for enhanced code generation and analysis.
 */

const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Default to GPT-5.1-Codex-Max if no model is specified
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-5.1-codex-max';

/**
 * Simple chat completion example
 * Demonstrates basic interaction with GPT models
 * 
 * @param {string} prompt - The user prompt to send to the AI
 * @param {string} model - Optional model override (defaults to GPT-5.1-Codex-Max)
 */
async function chatCompletion(prompt, model = DEFAULT_MODEL) {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specialized in Web3 and blockchain technologies. You have advanced code generation and analysis capabilities."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    throw error;
  }
}

/**
 * Run a demo of the OpenAI integration
 */
async function runDemo() {
  console.log('🤖 OpenAI Integration Demo (GPT-5.1-Codex-Max)');
  console.log('─────────────────────────────\n');
  console.log(`📊 Using model: ${DEFAULT_MODEL}\n`);

  try {
    const prompt = "What is Web3 and how does AI enhance blockchain development?";
    console.log(`Question: ${prompt}\n`);
    
    console.log('Thinking... 🤔\n');
    const response = await chatCompletion(prompt);
    
    console.log('AI Response:');
    console.log('─────────────────────────────');
    console.log(response);
    console.log('─────────────────────────────\n');
    
    console.log('✅ Demo completed successfully!\n');
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    if (error.status === 401) {
      console.error('   Invalid API key. Please check your OPENAI_API_KEY in .env file.');
    }
  }
}

module.exports = {
  chatCompletion,
  runDemo,
};

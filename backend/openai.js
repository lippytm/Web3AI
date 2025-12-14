/**
 * OpenAI Integration Module
 * 
 * This module demonstrates how to interact with OpenAI's API using the official SDK.
 * It includes examples of using GPT models for various AI tasks.
 */

const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Simple chat completion example
 * Demonstrates basic interaction with GPT models
 */
async function chatCompletion(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specialized in Web3 and blockchain technologies."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
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
  console.log('🤖 OpenAI Integration Demo');
  console.log('─────────────────────────────\n');

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

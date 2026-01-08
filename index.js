/**
 * Web3AI - Main Entry Point
 * 
 * This is the main entry point for the Web3AI application.
 * It demonstrates the integration of AI capabilities with Web3 technologies.
 * Now featuring GPT-5.1-Codex-Max for enhanced code analysis.
 */

require('dotenv').config();

const selectedModel = process.env.OPENAI_MODEL || 'gpt-5.1-codex-max';

console.log('🚀 Welcome to Web3AI!');
console.log('==========================================');
console.log('A toolkit for AI-powered Web3 development');
console.log(`Powered by ${selectedModel}`);
console.log('==========================================\n');

// Check if OpenAI API key is configured
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
  console.warn('⚠️  Warning: OpenAI API key not configured!');
  console.log('📝 Please create a .env file based on .env.example');
  console.log('   and add your OpenAI API key.\n');
} else {
  console.log('✅ OpenAI API key configured');
  console.log(`📊 Using model: ${selectedModel}\n`);
}

// Import and run OpenAI demo if API key is set
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  const openaiDemo = require('./backend/openai');
  
  console.log('Running OpenAI integration demo...\n');
  openaiDemo.runDemo().catch(error => {
    console.error('Error running OpenAI demo:', error.message);
  });
} else {
  console.log('💡 Set up your API key to run the OpenAI demo.');
  console.log('   Get your API key from: https://platform.openai.com/api-keys\n');
}

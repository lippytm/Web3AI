# Web3AI

AI-powered assistant using OpenAI's ChatGPT, specialized in Web3 and blockchain technology.

## Features

- 🤖 Integration with OpenAI's GPT-4 model
- 🔐 Secure API key management using environment variables
- 💬 Simple chat interface with customizable options
- 🌊 Support for streaming responses
- 🎯 Specialized system prompts for Web3/blockchain topics

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (requires OpenAI account with Pro access for advanced capabilities)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/lippytm/Web3AI.git
cd Web3AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**To get your OpenAI API key:**
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Sign in or create an account
- Navigate to API Keys section
- Create a new secret key
- Copy and paste it into your `.env` file

⚠️ **Security Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Usage

### Run the Demo

```bash
npm start
```

This will run the example script demonstrating three use cases:
1. Simple Web3 question
2. Custom model and temperature settings
3. Streaming response

### Using the ChatGPT Service in Your Code

```javascript
import ChatGPTService from './chatgpt.js';

const chatGPT = new ChatGPTService();

// Simple chat
const response = await chatGPT.chat('What is Web3?');
console.log(response.message);

// Chat with custom options
const customResponse = await chatGPT.chat(
  'Explain smart contracts',
  {
    model: 'gpt-4',
    temperature: 0.5,
    maxTokens: 500,
    systemPrompt: 'You are a blockchain expert.'
  }
);

// Streaming response
const stream = await chatGPT.streamChat('What is DeFi?');
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  process.stdout.write(content);
}
```

## API Reference

### ChatGPTService

#### `chat(message, options)`

Send a message and get a complete response.

**Parameters:**
- `message` (string): The user's message/question
- `options` (object, optional):
  - `model` (string): OpenAI model to use (default: 'gpt-4')
  - `temperature` (number): Creativity level 0-1 (default: 0.7)
  - `maxTokens` (number): Maximum response length (default: 1000)
  - `systemPrompt` (string): System instruction for the AI

**Returns:** Promise resolving to an object with:
- `success` (boolean): Whether the request succeeded
- `message` (string): The AI's response
- `usage` (object): Token usage information
- `error` (string): Error message if failed

#### `streamChat(message, options)`

Send a message and get a streaming response.

**Parameters:** Same as `chat()`

**Returns:** Promise resolving to an async iterable stream

## Environment Variables

- `OPENAI_API_KEY` (required): Your OpenAI API key

## Models

This integration supports various OpenAI models:
- `gpt-4`: Most capable model (recommended, requires Pro account)
- `gpt-4-turbo`: Faster GPT-4 variant
- `gpt-3.5-turbo`: Faster and cheaper alternative

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.

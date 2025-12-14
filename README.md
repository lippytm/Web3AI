# Web3AI

Web3AI is a project that integrates OpenAI ChatGPT capabilities, providing RESTful API endpoints to interact with ChatGPT programmatically.

## Features

- **OpenAI ChatGPT Integration**: Send prompts and receive AI-generated responses
- **RESTful API**: Simple HTTP endpoints for ChatGPT interaction
- **Conversation History**: Support for maintaining conversation context
- **System Prompts**: Ability to set system-level instructions for the AI

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lippytm/Web3AI.git
cd Web3AI
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
OPENAI_MODEL=gpt-3.5-turbo
```

## Usage

### Starting the Server

Run the following command to start the server:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

### API Endpoints

#### 1. Health Check
**GET** `/health`

Check if the server is running.

**Example:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Web3AI Server is running"
}
```

#### 2. Chat Endpoint
**POST** `/chat`

Send a message to ChatGPT and receive a response.

**Request Body:**
```json
{
  "message": "What is Web3?",
  "conversationHistory": []
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Web3?"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Web3 refers to the third generation of the internet...",
  "model": "gpt-3.5-turbo",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  },
  "finishReason": "stop"
}
```

#### 3. Chat with System Prompt
**POST** `/chat/system`

Send a message with custom system instructions.

**Request Body:**
```json
{
  "message": "Explain blockchain",
  "systemPrompt": "You are a helpful assistant that explains technical concepts in simple terms."
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/chat/system \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain blockchain", "systemPrompt": "You are a helpful assistant that explains technical concepts in simple terms."}'
```

### Conversation History

To maintain context across multiple messages, include the conversation history in your requests:

```json
{
  "message": "Can you elaborate on that?",
  "conversationHistory": [
    { "role": "user", "content": "What is Web3?" },
    { "role": "assistant", "content": "Web3 refers to..." }
  ]
}
```

## Project Structure

```
Web3AI/
├── index.js              # Main server file with API endpoints
├── openai-chat.js        # OpenAI ChatGPT integration module
├── package.json          # Project dependencies and scripts
├── .env.example          # Environment variables template
├── .env                  # Your local environment variables (not in git)
└── README.md             # This file
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 3000)
- `OPENAI_MODEL`: OpenAI model to use (default: gpt-3.5-turbo)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request (missing required fields)
- `500`: Internal Server Error (OpenAI API errors or server issues)

**Error Response Example:**
```json
{
  "success": false,
  "error": "Message is required",
  "message": null
}
```

## Security Notes

- Never commit your `.env` file or expose your OpenAI API key
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Keep your API key secure and rotate it if compromised

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

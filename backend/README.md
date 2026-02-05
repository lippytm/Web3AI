# Web3AI Backend

FastAPI backend for Web3AI application with comprehensive AI capabilities.

## Features

- 🤖 **Dual AI Provider Support**: OpenAI and Anthropic Claude integration
- 🛠️ **AI Tools**: Chat, streaming, template generation
- 🤝 **AI Agents**: Autonomous agents with tools and reasoning
- 🔧 **Web3 Integration**: Blockchain and smart contract support
- ✅ **Comprehensive Testing**: Full test coverage with pytest
- 🔒 **Production Ready**: Config validation, CORS, telemetry

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key (optional if using Claude only)
- `ANTHROPIC_API_KEY`: Your Anthropic API key (optional if using OpenAI only)
- `AI_PROVIDER`: Set to `openai`, `claude`, or `both`

## Development

Run development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: http://localhost:8000

## AI Endpoints

### Get Available Providers
```bash
GET /api/ai/providers
```

### Chat with AI
```bash
POST /api/ai/chat
{
  "messages": [{"role": "user", "content": "Hello"}],
  "provider": "claude",
  "system_prompt": "You are a helpful assistant"
}
```

### Stream Chat
```bash
POST /api/ai/chat/stream
{
  "messages": [{"role": "user", "content": "Hello"}],
  "provider": "claude"
}
```

### Generate with Template
```bash
POST /api/ai/generate
{
  "template": "Hello {name}, you are {age} years old",
  "variables": {"name": "Alice", "age": 30},
  "provider": "claude"
}
```

### Run AI Agent
```bash
POST /api/ai/agent
{
  "input": "What is Ethereum?",
  "agent_type": "general",
  "provider": "claude"
}
```

Available agent types:
- `general`: Web3-focused assistant
- `code_analysis`: Analyze Solidity code
- `blockchain_analyst`: Transaction and protocol analysis
- `developer_assistant`: Code generation and debugging

## Testing

Run tests:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app --cov-report=html
```

Run specific test file:
```bash
pytest tests/test_ai_routes.py -v
```

## Linting & Formatting

Run ruff:
```bash
ruff check .
ruff format .
```

Run black:
```bash
black .
```

Check formatting:
```bash
black --check .
```

## Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI application
│   ├── settings.py       # Configuration settings
│   ├── ai_tools.py       # AI tools manager (chat, streaming)
│   ├── ai_agents.py      # AI agents with tools
│   ├── ai_routes.py      # AI API endpoints
│   └── telemetry.py      # OpenTelemetry integration
├── tests/
│   ├── test_main.py
│   ├── test_ai_tools.py
│   ├── test_ai_routes.py
│   └── test_config_validation.py
├── requirements.txt      # Core dependencies
└── requirements-extras.txt  # Optional heavy dependencies
```

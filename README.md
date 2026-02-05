# Web3AI - AI + Web3 Starter Bundle

[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Security Scan](https://github.com/lippytm/Web3AI/workflows/Security%20Scan%20and%20SBOM/badge.svg)](https://github.com/lippytm/Web3AI/actions/workflows/security-scan.yml)

A comprehensive full-stack starter bundle combining AI capabilities with Web3 technology. This project provides a production-ready foundation for building decentralized applications with artificial intelligence features.

## 🌟 Features

- **Python/FastAPI Backend**: High-performance async API with AI integration
- **Next.js/TypeScript Frontend**: Modern React framework with full TypeScript support
- **Hardhat Smart Contracts**: Professional Solidity development environment
- **AI Integration**: OpenAI GPT and Anthropic Claude support via LangChain
  - Multiple AI providers (OpenAI, Claude, or both)
  - AI chat and streaming capabilities
  - AI agents with tools and reasoning
  - Specialized agents for code analysis, blockchain analysis, and development assistance
- **Web3 Libraries**: ethers.js, viem, and wagmi for blockchain interactions
- **Diagnostic Sandboxes**: Transparent testing environments for AI, blockchain, and Web3 interactions
- **Production Ready**: Comprehensive testing, linting, and CI/CD pipelines
- **Config Validation**: Runtime configuration validation with Pydantic and Zod
- **Optional Telemetry**: OpenTelemetry integration for observability
- **Security Scanning**: Automated Trivy vulnerability scanning and SBOM generation
- **Dependency Management**: Automated updates via Renovate

## 📋 Prerequisites

- **Python** 3.11 or higher
- **Node.js** 20.x or higher
- **npm** 9.x or higher

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/lippytm/Web3AI.git
cd Web3AI
```

### 2. Backend Setup (Python/FastAPI)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys and settings

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

### 3. Frontend Setup (Next.js/TypeScript)

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your settings

# Run development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### 4. Smart Contracts Setup (Hardhat)

```bash
cd contracts

# Install dependencies
npm install

# Configure environment (optional for local development)
cp .env.example .env

# Compile contracts
npm run compile

# Run tests
npm test

# Start local Hardhat node (optional)
npm run node
```

## 🔧 Environment Variables

### Backend (.env)

```env
# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
MODEL_NAME=GPT-5.1-Codex-Max

# Anthropic/Claude Configuration
ANTHROPIC_API_KEY=your-anthropic-api-key-here
CLAUDE_MODEL_NAME=claude-3-5-sonnet-20241022

# AI Provider Selection (openai, claude, or both)
AI_PROVIDER=both

# Blockchain Configuration
ETH_RPC_URL=https://eth.llamarpc.com
NETWORK=mainnet

# Application Settings
DEBUG=false

# Optional Telemetry (requires pip install -r requirements-extras.txt)
TELEMETRY_ENABLED=false
TELEMETRY_ENDPOINT=
```

**Config Validation**: The backend automatically validates configuration on startup. Valid networks are: `mainnet`, `sepolia`, `goerli`, `localhost`.

### Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Blockchain RPC
NEXT_PUBLIC_RPC_URL=https://eth.llamarpc.com
NEXT_PUBLIC_CHAIN_ID=1

# AI Model Configuration
NEXT_PUBLIC_MODEL_NAME=GPT-5.1-Codex-Max
NEXT_PUBLIC_CLAUDE_MODEL_NAME=claude-3-5-sonnet-20241022
NEXT_PUBLIC_AI_PROVIDER=both

# Optional Telemetry
NEXT_PUBLIC_TELEMETRY_ENABLED=false
```

**Config Validation**: Run `npm run config:validate` in the frontend directory to validate configuration without starting the server.

### Contracts (.env)

```env
# Private key for deployment (NEVER commit real keys!)
PRIVATE_KEY=your-private-key-here

# RPC URLs
ETH_RPC_URL=https://eth.llamarpc.com
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
```

## 📁 Project Structure

```
Web3AI/
├── backend/                    # Python/FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application
│   │   └── settings.py        # Configuration settings
│   ├── tests/                 # Pytest tests
│   ├── requirements.txt       # Python dependencies
│   └── .env.example
├── frontend/                   # Next.js/TypeScript frontend
│   ├── app/
│   │   ├── page.tsx           # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── contracts/                  # Hardhat smart contracts
│   ├── contracts/
│   │   └── Lock.sol           # Sample contract
│   ├── scripts/
│   │   └── deploy.js          # Deployment script
│   ├── test/
│   │   └── Lock.test.js       # Contract tests
│   ├── hardhat.config.js
│   └── package.json
├── sandboxes/                  # Diagnostic and simulation sandboxes
│   ├── backend/               # Backend diagnostics
│   ├── frontend/              # Frontend component sandboxes
│   ├── contracts/             # Contract testing sandboxes
│   └── README.md              # Sandbox documentation
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD
├── .pre-commit-config.yaml    # Pre-commit hooks
└── README.md
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov=app          # With coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                  # Run tests
npm run type-check        # TypeScript check
```

### Smart Contract Tests

```bash
cd contracts
npm test                  # Run Hardhat tests
npm run compile           # Compile contracts
```

## 🔬 Sandboxes - Diagnostics & Simulations

The project includes comprehensive sandboxes for transparent testing and validation:

### Backend Sandboxes

```bash
# AI Model Diagnostics
python sandboxes/backend/ai_diagnostics.py

# Blockchain Interaction Simulation
python sandboxes/backend/blockchain_simulation.py

# Custom AI prompt testing
python sandboxes/backend/ai_diagnostics.py --prompt "Your custom prompt"
```

### Frontend Sandboxes

```bash
# Web3 wallet connection testing (interactive UI)
# Copy sandboxes/frontend/Web3Sandbox.tsx to your app

# AI chat simulation (interactive UI)
# Copy sandboxes/frontend/AIChatSimulation.tsx to your app
```

### Contract Sandboxes

```bash
cd contracts

# Copy sandbox files
cp ../sandboxes/contracts/SimpleStorage.sol contracts/
cp ../sandboxes/contracts/SimpleStorage.test.js test/

# Run sandbox tests
npm test test/SimpleStorage.test.js

# Deploy with diagnostics
npx hardhat run ../sandboxes/contracts/deploy_sandbox.js --network localhost
```

**For detailed documentation**, see [sandboxes/README.md](sandboxes/README.md)

**Purpose**: Sandboxes provide transparency in:
- AI model behavior and responses
- Blockchain connectivity and transactions
- Web3 wallet interactions
- Smart contract execution and gas usage

## 🎨 Linting & Formatting

### Backend (Python)

```bash
cd backend
ruff check .              # Run linter
ruff format .             # Format code
black .                   # Format with black
```

### Frontend (TypeScript)

```bash
cd frontend
npm run lint              # Run ESLint
npm run format            # Format with Prettier
npm run format:check      # Check formatting
```

### Pre-commit Hooks

Install pre-commit hooks (optional):

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

## 🔗 Hardhat Usage

### Compile Contracts

```bash
cd contracts
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy Contracts

Local deployment:
```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy
npm run deploy
```

Testnet deployment:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Network Configuration

- **hardhat**: Local development network (chainId: 1337)
- **localhost**: Local node at http://127.0.0.1:8545
- **mainnet**: Ethereum mainnet (requires PRIVATE_KEY in .env)
- **sepolia**: Sepolia testnet (requires PRIVATE_KEY in .env)

## 🤖 AI/LLM Configuration

The backend supports both OpenAI and Anthropic Claude AI models through LangChain:

### Getting API Keys

1. **OpenAI**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **Anthropic Claude**: Sign up at [Anthropic Console](https://console.anthropic.com/)

### Configuration Options

Set `AI_PROVIDER` in `backend/.env`:
- `openai`: Use only OpenAI models
- `claude`: Use only Anthropic Claude models  
- `both`: Enable both providers (recommended)

### AI Tools & Capabilities

The backend includes a comprehensive AI toolkit:

#### **1. Chat API**
- Standard chat completions with both OpenAI and Claude
- Streaming responses for real-time interactions
- System prompts and conversation history support
- Endpoint: `POST /api/ai/chat`

#### **2. Template Generation**
- Generate responses using prompt templates with variables
- Dynamic content generation
- Endpoint: `POST /api/ai/generate`

#### **3. AI Agents with Tools**
Autonomous AI agents that can use tools and reason through problems:

- **General Agent**: Web3-focused assistant with blockchain knowledge
- **Code Analysis Agent**: Analyze Solidity code, security audits, gas optimization
- **Blockchain Analyst Agent**: Transaction analysis, wallet tracking, protocol analysis
- **Developer Assistant Agent**: Code generation, debugging help, documentation

Endpoint: `POST /api/ai/agent`

#### **4. Available Providers**
- Check configured providers: `GET /api/ai/providers`

### Example Usage

```python
# Chat with Claude
import httpx

response = httpx.post("http://localhost:8000/api/ai/chat", json={
    "messages": [
        {"role": "user", "content": "Explain Ethereum smart contracts"}
    ],
    "provider": "claude"
})
print(response.json()["response"])

# Run code analysis agent
response = httpx.post("http://localhost:8000/api/ai/agent", json={
    "input": "Analyze this contract for security issues: contract MyToken { ... }",
    "agent_type": "code_analysis",
    "provider": "claude"
})
print(response.json()["output"])
```

### Supported Models

**OpenAI Models:**
- GPT-4, GPT-5.1-Codex-Max, and newer models
- Set via `MODEL_NAME` environment variable

**Claude Models:**
- claude-3-5-sonnet-20241022 (recommended)
- claude-3-opus, claude-3-sonnet, claude-3-haiku
- Set via `CLAUDE_MODEL_NAME` environment variable

The FastAPI backend exposes comprehensive AI endpoints and can be easily extended with custom AI routes and agents.

## 🌐 RPC Configuration

### Public RPC Endpoints

The project includes default public RPC endpoints:
- **Ethereum Mainnet**: https://eth.llamarpc.com
- **Sepolia Testnet**: Configure in `.env` files

### Custom RPC

For production, consider using:
- [Infura](https://infura.io/)
- [Alchemy](https://www.alchemy.com/)
- [QuickNode](https://www.quicknode.com/)

Update `ETH_RPC_URL` and `NEXT_PUBLIC_RPC_URL` in environment files.

## 🔄 CI/CD Pipeline

GitHub Actions automatically runs on push/PR to main:

1. **Pre-commit Hooks Validation**: Validates code formatting and linting
2. **Python Backend Job**: Runs ruff linter, config validation, and pytest
3. **Node Frontend Job**: Runs ESLint, config validation, and builds Next.js app
4. **Contracts Job**: Compiles contracts and runs Hardhat tests

See `.github/workflows/ci-cd.yml` for configuration.

## 🔒 Security & SBOM

### Automated Security Scanning

This project includes automated security scanning via Trivy:

```bash
# Security scans run automatically on:
# - Weekly schedule (Monday 6:00 AM UTC)
# - Push to main branch
# - Pull requests to main
# - Manual workflow dispatch
```

### SBOM Generation

Software Bill of Materials (SBOM) is automatically generated for all components:
- Overall project SBOM (SPDX format)
- Backend SBOM (CycloneDX format)
- Frontend SBOM (CycloneDX format)
- Contracts SBOM (CycloneDX format)

SBOMs are available as workflow artifacts after each security scan run.

### Dependency Review

Pull requests automatically trigger dependency review to:
- Identify high-severity vulnerabilities
- Block GPL-3.0 and AGPL-3.0 licenses
- Review new dependencies

See `.github/workflows/security-scan.yml` for configuration.

## 📦 Dependencies

### Backend (Python)

**Core Dependencies:**
- `fastapi`: Modern web framework
- `uvicorn[standard]`: ASGI server
- `pydantic`: Data validation
- `pydantic-settings`: Settings management with validation
- `httpx`: Async HTTP client
- `web3`: Ethereum library
- `langchain-openai`: OpenAI integration
- `langchain-anthropic`: Anthropic Claude integration
- `langchain-core`: LangChain core functionality
- `langchain-community`: LangChain community integrations
- `anthropic`: Anthropic Python SDK
- `pytest`: Testing framework
- `ruff`: Linter and formatter
- `black`: Code formatter

**Optional Heavy Dependencies** (install with `pip install -r requirements-extras.txt`):

- **AI/ML Models**: 
  - `transformers==4.48.0`: Hugging Face transformers (patched version)
  - `torch==2.6.0`: PyTorch (patched version)
  
- **Vector Databases**:
  - `pinecone-client`: Pinecone vector database
  - `chromadb`: Chroma vector database
  - `weaviate-client`: Weaviate vector database
  
- **Blockchain**:
  - `anchorpy`: Solana/Anchor integration
  
- **Observability**:
  - `opentelemetry-api`: OpenTelemetry API
  - `opentelemetry-sdk`: OpenTelemetry SDK
  - `opentelemetry-instrumentation-fastapi`: FastAPI instrumentation

> **Note**: Heavy dependencies are optional to keep base installations lightweight. Only install what you need for your use case.

### Frontend (Node/TypeScript)

- `next`: React framework
- `react`: UI library
- `typescript`: Type safety
- `zod`: Runtime type validation
- `eslint`: Linter
- `prettier`: Code formatter
- `@typescript-eslint/*`: TypeScript ESLint plugins
- `ethers`: Ethereum library
- `viem`: Modern Ethereum library
- `wagmi`: React hooks for Ethereum
- `husky`: Git hooks
- `tsx`: TypeScript executor for scripts

### Contracts (Hardhat)

- `hardhat`: Development environment
- `@nomicfoundation/hardhat-toolbox`: Hardhat plugins bundle

## 🔭 Telemetry (Optional)

This project includes optional OpenTelemetry integration for observability with no vendor lock-in.

### Enabling Telemetry

**Backend:**
```bash
# In backend/.env
TELEMETRY_ENABLED=true
TELEMETRY_ENDPOINT=http://localhost:4318  # Your OTLP endpoint

# Install telemetry dependencies
pip install -r requirements-extras.txt
```

**Frontend:**
```bash
# In frontend/.env.local
NEXT_PUBLIC_TELEMETRY_ENABLED=true
```

### Features

- **OpenTelemetry Standards**: Uses OTLP (OpenTelemetry Protocol)
- **No Vendor Lock-in**: Works with any OTLP-compatible backend
- **FastAPI Instrumentation**: Automatic tracing for API endpoints
- **Optional by Default**: Disabled unless explicitly enabled

Compatible with: Jaeger, Zipkin, Grafana Tempo, Honeycomb, Datadog, New Relic, and more.

## 🔄 Automated Dependency Updates

This project uses [Renovate](https://renovatebot.com) for automated dependency updates.

### Configuration

- **Schedule**: Updates run weekly on Monday mornings (6:00 AM UTC)
- **Grouped Updates**: Related dependencies are updated together
- **Heavy Dependencies**: ML/AI packages update monthly
- **Auto-merge**: Minor and patch updates for non-critical packages
- **Security Alerts**: High-priority security updates are highlighted

### Dependency Groups

- **Python dependencies**: All backend dependencies
- **Frontend dependencies**: Frontend npm packages
- **Contract dependencies**: Smart contract packages
- **Heavy ML dependencies**: Transformers, PyTorch (monthly updates)
- **Vector databases**: Pinecone, Chroma, Weaviate
- **GitHub Actions**: Workflow action updates

See `renovate.json` for detailed configuration.

## 🛠️ Development Workflow

1. **Start Backend**: `cd backend && uvicorn app.main:app --reload`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Start Local Chain** (optional): `cd contracts && npm run node`
4. **Run Tests**: Use npm/pytest in respective directories
5. **Lint Code**: Use ruff/eslint before committing
6. **Commit Changes**: Pre-commit hooks will run automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linters
5. Commit with descriptive messages
6. Push and create a Pull Request

## 📄 License

ISC

## 👥 Authors

Web3AI Team

## 🙏 Acknowledgments

- FastAPI for the modern Python framework
- Next.js for the React framework
- Hardhat for smart contract development
- OpenAI for AI capabilities
- The open-source community
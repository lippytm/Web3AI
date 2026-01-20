# Web3AI - AI + Web3 Starter Bundle

A comprehensive full-stack starter bundle combining AI capabilities with Web3 technology. This project provides a production-ready foundation for building decentralized applications with artificial intelligence features.

## 🌟 Features

- **Python/FastAPI Backend**: High-performance async API with AI integration
- **Next.js/TypeScript Frontend**: Modern React framework with full TypeScript support
- **Hardhat Smart Contracts**: Professional Solidity development environment
- **AI Integration**: OpenAI GPT-5.1-Codex-Max support via LangChain
- **Web3 Libraries**: ethers.js, viem, and wagmi for blockchain interactions
- **Production Ready**: Comprehensive testing, linting, and CI/CD pipelines

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

### AI/Web3 Integration Adapters

The project includes comprehensive SDK adapters (`sdk/` directory) for integrating AI and Web3 services across multiple languages:

- **TypeScript/Node.js**: `@lippytm/ai-sdk` - see `sdk/typescript/`
- **Python**: `ai_sdk` module - see `sdk/python/`
- **Go**: `aisdk` package - see `sdk/go/`
- **Rust**: `aisdk` crate - see `sdk/rust/`

#### Available Providers

**AI Providers:**
- OpenAI (GPT-4, GPT-3.5, etc.)
- Hugging Face (Transformers, Inference API)
- LangChain (orchestration)
- LlamaIndex (data framework)

**Vector Stores (Optional):**
- Pinecone (managed vector database)
- Weaviate (open-source vector search)
- Chroma (embeddings database)

**Web3 Chains:**
- Ethereum (via ethers.js, web3.py)
- Solana (via @solana/web3.js, solana-py)
- Extensible for additional chains

**Messaging Platforms:**
- Slack (via Slack SDK)
- Discord (via Discord.js/discord.py)

**Data Storage:**
- PostgreSQL (via pg/asyncpg)
- Redis (via ioredis/redis)
- S3 (via AWS SDK)
- IPFS (via ipfs-http-client)

#### Required Environment Variables

**AI Configuration:**
```env
AI_PROVIDER=openai                    # openai, huggingface, custom
AI_API_KEY=your-api-key-here
AI_MODEL=gpt-4                        # model name
```

**Vector Store (Optional):**
```env
VECTOR_PROVIDER=pinecone              # pinecone, weaviate, chroma
VECTOR_API_KEY=your-vector-api-key
VECTOR_ENDPOINT=https://...           # for weaviate/chroma
VECTOR_INDEX=your-index-name
```

**Web3 Configuration:**
```env
WEB3_CHAIN=ethereum                   # ethereum, solana, custom
WEB3_RPC_URL=https://eth.llamarpc.com
WEB3_NETWORK=mainnet                  # mainnet, testnet, devnet
```

**Messaging (Optional):**
```env
MESSAGING_PROVIDER=slack              # slack, discord
MESSAGING_TOKEN=your-bot-token
```

**Storage (Optional):**
```env
STORAGE_PROVIDER=postgres             # postgres, redis, s3, ipfs
STORAGE_CONNECTION_STRING=postgresql://...
STORAGE_ENDPOINT=https://...          # for S3/IPFS
STORAGE_BUCKET=your-bucket-name       # for S3
```

**Notes:**
- Install vector stores separately: `pip install -r requirements.txt` includes commented optional dependencies
- For production, use secret management (GitHub Secrets, AWS Secrets Manager, etc.)
- Linux compatibility: All dependencies support Ubuntu 20.04+

### Backend (.env)

```env
# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
MODEL_NAME=GPT-5.1-Codex-Max

# Blockchain Configuration
ETH_RPC_URL=https://eth.llamarpc.com
NETWORK=mainnet

# Application Settings
DEBUG=false
```

### Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Blockchain RPC
NEXT_PUBLIC_RPC_URL=https://eth.llamarpc.com
NEXT_PUBLIC_CHAIN_ID=1

# AI Model Configuration
NEXT_PUBLIC_MODEL_NAME=GPT-5.1-Codex-Max
```

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

The backend uses OpenAI's API through LangChain for AI capabilities:

1. **Get API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **Set Environment Variable**: Add `OPENAI_API_KEY` to `backend/.env`
3. **Configure Model**: Set `MODEL_NAME=GPT-5.1-Codex-Max` (or your preferred model)

The FastAPI backend exposes AI endpoints at `/api/info` and can be extended with custom AI routes.

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

1. **Python Backend Job**: Runs ruff linter and pytest
2. **Node Frontend Job**: Runs ESLint and builds Next.js app
3. **Contracts Job**: Compiles contracts and runs Hardhat tests
4. **Container Deploy Job**: Builds and pushes Docker images to ghcr.io (on main merge or manual dispatch)

### Container Deployment

The workflow includes automated container builds for backend and frontend:

**Trigger Methods:**
- Automatic on merge to `main` branch (dev environment)
- Manual workflow dispatch with environment selection (dev/stage/prod)

**Container Registry:**
- Backend image: `ghcr.io/lippytm/web3ai/backend`
- Frontend image: `ghcr.io/lippytm/web3ai/frontend`

**Environment Matrix:**
- `dev`: Development environment (auto-deploy on main)
- `stage`: Staging environment (manual dispatch)
- `prod`: Production environment (manual dispatch)

**Required GitHub Secrets/Variables:**
- `GITHUB_TOKEN`: Automatic (for ghcr.io push)
- `OPENAI_API_KEY`: Secret for OpenAI access
- `AI_PROVIDER`, `VECTOR_PROVIDER`, `WEB3_CHAIN`, `WEB3_RPC_URL`: Repository variables
- `MESSAGING_PROVIDER`, `STORAGE_PROVIDER`: Repository variables
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_RPC_URL`, `NEXT_PUBLIC_CHAIN_ID`: Repository variables

See `.github/workflows/ci-cd.yml` for full configuration.

## 📦 Dependencies

### Backend (Python)

**Core Framework:**
- `fastapi`: Modern web framework
- `uvicorn[standard]`: ASGI server
- `pydantic`: Data validation
- `pydantic-settings`: Settings management
- `httpx`: Async HTTP client
- `python-dotenv`: Environment variable loading

**AI Stack:**
- `openai`: OpenAI API client
- `transformers`: Hugging Face transformers
- `huggingface-hub`: Hugging Face model hub
- `langchain`: LLM orchestration framework
- `langchain-openai`: OpenAI integration for LangChain
- `llama-index`: Data framework for LLMs

**Web3 Stack:**
- `web3`: Ethereum library
- `solana`: Solana blockchain library

**Messaging:**
- `slack-sdk`: Slack API client
- `discord.py`: Discord API client

**Data Storage:**
- `asyncpg`: Async PostgreSQL driver
- `redis`: Redis client
- `boto3`: AWS SDK for S3
- `ipfshttpclient`: IPFS HTTP client

**Development & Testing:**
- `pytest`: Testing framework
- `pytest-asyncio`: Async test support
- `ruff`: Fast Python linter/formatter
- `black`: Code formatter

**Optional (Vector Stores):**
- `pinecone-client`: Pinecone vector database
- `weaviate-client`: Weaviate vector search
- `chromadb`: Chroma embeddings database

### Frontend (Node/TypeScript)

**Core Framework:**
- `next`: React framework
- `react`: UI library
- `react-dom`: React DOM renderer
- `typescript`: Type safety

**AI Stack:**
- `openai`: OpenAI API client
- `@huggingface/inference`: Hugging Face inference
- `langchain`: LLM orchestration
- `llamaindex`: Data framework for LLMs

**Web3 Stack:**
- `ethers`: Ethereum library
- `viem`: Modern Ethereum library
- `wagmi`: React hooks for Ethereum
- `@solana/web3.js`: Solana JavaScript API
- `@coral-xyz/anchor`: Solana framework

**Messaging:**
- `@slack/web-api`: Slack Web API client
- `discord.js`: Discord API client

**Data Storage:**
- `pg`: PostgreSQL client
- `ioredis`: Redis client
- `@aws-sdk/client-s3`: AWS S3 client
- `ipfs-http-client`: IPFS HTTP client

**Development & Styling:**
- `eslint`: Linter
- `prettier`: Code formatter
- `@typescript-eslint/*`: TypeScript ESLint plugins
- `tailwindcss`: Utility-first CSS framework
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixing

### Contracts (Hardhat)

- `hardhat`: Development environment
- `@nomicfoundation/hardhat-toolbox`: Hardhat plugins bundle
- `dotenv`: Environment variables

### SDK Adapters

**Multi-language support:**
- TypeScript/Node.js: `@lippytm/ai-sdk`
- Python: `ai_sdk` module
- Go: `aisdk` package
- Rust: `aisdk` crate

See `sdk/` directory for language-specific adapters with factory/config patterns.

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
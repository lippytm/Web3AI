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

See `.github/workflows/ci-cd.yml` for configuration.

## 📦 Dependencies

### Backend (Python)

- `fastapi`: Modern web framework
- `uvicorn[standard]`: ASGI server
- `pydantic`: Data validation
- `httpx`: Async HTTP client
- `web3`: Ethereum library
- `langchain-openai`: OpenAI integration
- `pytest`: Testing framework
- `ruff`: Linter and formatter
- `black`: Code formatter

### Frontend (Node/TypeScript)

- `next`: React framework
- `react`: UI library
- `typescript`: Type safety
- `eslint`: Linter
- `prettier`: Code formatter
- `@typescript-eslint/*`: TypeScript ESLint plugins
- `ethers`: Ethereum library
- `viem`: Modern Ethereum library
- `wagmi`: React hooks for Ethereum

### Contracts (Hardhat)

- `hardhat`: Development environment
- `@nomicfoundation/hardhat-toolbox`: Hardhat plugins bundle

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
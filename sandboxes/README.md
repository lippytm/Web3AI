# Sandboxes for Diagnostics and Simulations

This directory contains sandboxes for testing, diagnosing, and simulating various components of the Web3AI project with full transparency. Each sandbox provides isolated environments for validating functionality and understanding system behavior.

## 🚀 Quick Start

**Fastest way to get started:**

```bash
cd sandboxes
./quickstart.sh
```

The quickstart script will help you:
1. Set up backend sandboxes with virtual environment
2. Install dependencies and run tests
3. Configure frontend sandbox pages
4. Run contract compilation and tests

## 📁 Directory Structure

```
sandboxes/
├── backend/              # Backend diagnostics and simulations
│   ├── ai_diagnostics.py           # AI model testing and validation
│   └── blockchain_simulation.py    # Blockchain interaction testing
├── frontend/             # Frontend component sandboxes
│   ├── Web3Sandbox.tsx             # Web3 wallet connection testing
│   └── AIChatSimulation.tsx        # AI chat interface simulation
├── contracts/            # Smart contract testing sandboxes
│   ├── SimpleStorage.sol           # Simple storage contract for testing
│   ├── SimpleStorage.test.js       # Contract test suite
│   └── deploy_sandbox.js           # Deployment script with diagnostics
├── quickstart.sh        # Quick start automation script
└── README.md            # This file
```

## 🎯 Purpose

These sandboxes provide:

1. **Transparency**: Clear visibility into how each component functions
2. **Diagnostics**: Tools to identify and troubleshoot issues
3. **Simulations**: Safe environments to test interactions without affecting production
4. **Validation**: Verify configurations and integrations are working correctly

## 🔬 Backend Sandboxes

### AI Diagnostics (`backend/ai_diagnostics.py`)

Test and validate AI model integration with transparent output.

**Features:**
- Configuration validation
- API key verification
- Model connection testing
- Custom prompt testing

**Usage:**

```bash
# Navigate to project root
cd /path/to/Web3AI

# Activate backend virtual environment
source backend/venv/bin/activate  # On Windows: backend\venv\Scripts\activate

# Run diagnostics
python sandboxes/backend/ai_diagnostics.py

# Test with custom prompt
python sandboxes/backend/ai_diagnostics.py --prompt "Explain smart contracts"
```

**Output Example:**
```
🔬 Running AI Diagnostics Sandbox 🔬
This sandbox provides transparency into AI model behavior

============================================================
AI Model Diagnostics
============================================================

✓ Configuration loaded successfully
  Model: GPT-5.1-Codex-Max
  API Key configured: True

============================================================
AI Prompt Test
============================================================

Prompt: Explain blockchain in one sentence
Response:
------------------------------------------------------------
Blockchain is a decentralized, distributed ledger technology...
------------------------------------------------------------

✓ AI model responded successfully
```

### Blockchain Simulation (`backend/blockchain_simulation.py`)

Simulate and test blockchain interactions with transparent reporting.

**Features:**
- RPC connection validation
- Network information retrieval
- Balance checking
- Transaction simulation

**Usage:**

```bash
# Run full simulation
python sandboxes/backend/blockchain_simulation.py

# Check specific address balance
python sandboxes/backend/blockchain_simulation.py --address 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

**Output Example:**
```
⛓️  Running Blockchain Simulation Sandbox ⛓️
This sandbox provides transparency into blockchain interactions

============================================================
Blockchain RPC Connection Test
============================================================

✓ Configuration loaded
  Network: mainnet
  RPC URL: https://eth.llamarpc.com

✓ Connected to blockchain

============================================================
Network Information
============================================================

Chain ID: 1
Latest Block: 18500000
Current Gas Price: 25.5 Gwei
```

## 🎨 Frontend Sandboxes

### Web3 Sandbox (`frontend/Web3Sandbox.tsx`)

Interactive component for testing Web3 wallet connections.

**Features:**
- Wallet connection testing
- Address and balance display
- Network detection
- Connection diagnostics

**Usage:**

```bash
# Navigate to frontend directory
cd frontend

# Copy the sandbox to a page (example)
# Option 1: Create a new sandbox page
mkdir -p app/sandbox
cp ../sandboxes/frontend/Web3Sandbox.tsx app/sandbox/page.tsx

# Option 2: Import in existing page
# Add to your page.tsx:
# import Web3Sandbox from '@/sandboxes/frontend/Web3Sandbox'
```

Then visit `http://localhost:3000/sandbox` in your browser.

**What it tests:**
- Web3 provider detection (MetaMask, etc.)
- Wallet connection flow
- Account address retrieval
- Balance checking
- Network/Chain ID detection

### AI Chat Simulation (`frontend/AIChatSimulation.tsx`)

Interactive chat interface for testing AI backend integration.

**Features:**
- Backend API connectivity testing
- Message sending/receiving
- Error handling
- API status checking

**Usage:**

```bash
# Same setup as Web3Sandbox
# Create a page or import the component

# Make sure backend is running
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**What it tests:**
- Backend API availability
- Request/response flow
- Error handling
- Message history management

## 🔗 Smart Contract Sandboxes

### SimpleStorage Contract (`contracts/SimpleStorage.sol`)

A simple storage contract designed for testing and validation.

**Features:**
- Basic storage operations (set, get)
- Increment/decrement functions
- Event emission
- Access control demonstration

**Test Suite (`contracts/SimpleStorage.test.js`)**

Comprehensive tests including:
- Deployment diagnostics
- Storage operations
- Multi-user simulations
- Gas usage diagnostics

**Usage:**

```bash
# Navigate to contracts directory
cd contracts

# Copy sandbox files to contracts directory
cp ../sandboxes/contracts/SimpleStorage.sol contracts/
cp ../sandboxes/contracts/SimpleStorage.test.js test/

# Run tests
npm test test/SimpleStorage.test.js

# Deploy to local network
npm run node  # In one terminal
npm run deploy  # In another terminal, or use deploy_sandbox.js
```

### Deployment Script (`contracts/deploy_sandbox.js`)

Transparent deployment with detailed diagnostics.

**Usage:**

```bash
# Copy deployment script
cp ../sandboxes/contracts/deploy_sandbox.js scripts/

# Deploy with diagnostics
npx hardhat run scripts/deploy_sandbox.js --network localhost

# Or use with other networks
npx hardhat run scripts/deploy_sandbox.js --network sepolia
```

**Output includes:**
- Deployer account information
- Network details
- Contract address
- Test transactions with gas usage
- Verification steps

## 🚀 Quick Start Guide

### 1. Backend Diagnostics

```bash
# From project root
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your API keys

# Run diagnostics
cd ..
python sandboxes/backend/ai_diagnostics.py
python sandboxes/backend/blockchain_simulation.py
```

### 2. Frontend Sandboxes

```bash
# From project root
cd frontend
npm install

# Create sandbox page
mkdir -p app/sandbox/web3 app/sandbox/ai
echo "export { default } from '@/../sandboxes/frontend/Web3Sandbox';" > app/sandbox/web3/page.tsx
echo "export { default } from '@/../sandboxes/frontend/AIChatSimulation';" > app/sandbox/ai/page.tsx

# Start development server
npm run dev

# Visit http://localhost:3000/sandbox/web3
# Visit http://localhost:3000/sandbox/ai
```

### 3. Contract Sandboxes

```bash
# From project root
cd contracts
npm install

# Copy sandbox files
cp ../sandboxes/contracts/SimpleStorage.sol contracts/
cp ../sandboxes/contracts/SimpleStorage.test.js test/

# Run tests
npm test test/SimpleStorage.test.js

# Start local node and deploy
npm run node  # Terminal 1
npx hardhat run scripts/deploy_sandbox.js --network localhost  # Terminal 2
```

## 📊 Diagnostic Outputs

Each sandbox provides transparent diagnostic information:

### AI Diagnostics
- ✓ Configuration validation
- ✓ API connectivity
- ✓ Model availability
- ✓ Response generation

### Blockchain Simulation
- ✓ RPC connection status
- ✓ Network information
- ✓ Balance queries
- ✓ Transaction simulation

### Web3 Sandbox
- ✓ Provider detection
- ✓ Wallet connection
- ✓ Network identification
- ✓ Account information

### Contract Testing
- ✓ Deployment success
- ✓ Function execution
- ✓ Event emission
- ✓ Gas usage metrics

## 🔍 Troubleshooting

### Backend Issues

**Problem:** AI diagnostics fail
**Solution:**
1. Check `.env` file has valid `OPENAI_API_KEY`
2. Verify model name is correct
3. Ensure internet connectivity

**Problem:** Blockchain simulation fails
**Solution:**
1. Check `ETH_RPC_URL` in `.env`
2. Try alternative RPC endpoint
3. Verify network configuration

### Frontend Issues

**Problem:** Web3 Sandbox shows no provider
**Solution:**
1. Install MetaMask or another Web3 wallet
2. Check browser extensions
3. Reload the page

**Problem:** AI Chat Simulation can't connect
**Solution:**
1. Ensure backend is running (`uvicorn app.main:app --reload`)
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS settings

### Contract Issues

**Problem:** Tests fail
**Solution:**
1. Run `npm run compile` first
2. Check Hardhat configuration
3. Ensure correct Solidity version

**Problem:** Deployment fails
**Solution:**
1. Check network configuration in `hardhat.config.js`
2. Verify account has sufficient balance
3. Ensure correct RPC URL

## 🎓 Best Practices

1. **Always run diagnostics** before deploying to production
2. **Use sandboxes** to test new features in isolation
3. **Check outputs** for transparency in behavior
4. **Document findings** from sandbox testing
5. **Keep sandboxes updated** with main codebase changes

## 🔐 Security Notes

- Sandboxes use test data and configurations
- Never commit real API keys or private keys
- Use testnets for blockchain simulations
- Frontend sandboxes are safe for production builds (client-side only)

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Web3.py Documentation](https://web3py.readthedocs.io/)
- [Hardhat Documentation](https://hardhat.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ethereum Development](https://ethereum.org/developers)

## 🤝 Contributing

When adding new sandboxes:

1. Follow the existing structure
2. Include comprehensive documentation
3. Add diagnostic output
4. Provide clear usage examples
5. Test thoroughly before committing

## 📄 License

ISC - Same as the main project

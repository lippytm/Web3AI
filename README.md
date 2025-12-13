# Web3AI

Advanced AI-powered Web3 agent platform for intelligent blockchain interactions. Combines cutting-edge AI capabilities with blockchain technology to provide automated analysis, smart contract interaction, and decision support for Web3 operations.

## 🚀 Features

- **AI-Powered Blockchain Analysis**: Leverage GPT-4 and LangChain to analyze blockchain data and transactions
- **Smart Contract Intelligence**: Automated smart contract analysis and interaction recommendations
- **Multi-Chain Support**: Built on ethers.js for compatibility with EVM-compatible chains
- **Gas Optimization**: AI-driven gas price analysis and transaction timing recommendations
- **Security-First**: Built-in validation, security checks, and best practices
- **CI/CD Pipeline**: Automated testing, linting, and deployment workflows
- **GitHub Copilot Integration**: Optimized for AI-assisted development

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI features)
- Blockchain RPC endpoint (Alchemy, Infura, or similar)

## 🔧 Installation

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

Edit `.env` and add your configuration:
```env
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-alchemy-key
CHAIN_ID=1
LOG_LEVEL=info
```

## 🎯 Quick Start

### Development Mode

Run the project in development mode with hot reload:
```bash
npm run dev
```

### Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Production

Run the compiled application:
```bash
npm start
```

## 🤖 Using GitHub Copilot

This project is optimized for GitHub Copilot development. The repository includes:

- **Copilot Instructions**: See `.github/copilot-instructions.md` for coding guidelines
- **AI-Friendly Code Structure**: Clear patterns and documentation for Copilot suggestions
- **Type Definitions**: Comprehensive TypeScript types for better code completion

### Copilot Setup

1. Install [GitHub Copilot](https://github.com/features/copilot) extension in VS Code or your IDE
2. Open the project in your IDE
3. Copilot will automatically read `.github/copilot-instructions.md` for project-specific guidance
4. Start coding! Copilot will suggest code following project conventions

### Copilot Tips

- Use descriptive comments to guide Copilot: `// Create an AI agent to analyze gas prices`
- Leverage inline suggestions for repetitive patterns
- Use Copilot Chat for complex refactoring or explanations
- Review all AI-generated code for security and correctness

## 🏗️ Architecture

### Project Structure

```
Web3AI/
├── src/
│   ├── agents/           # AI agents for different tasks
│   │   ├── base.ts              # Base agent class
│   │   ├── blockchain-analysis.ts   # Blockchain analysis agent
│   │   └── smart-contract.ts    # Smart contract agent
│   ├── web3/             # Web3 integration layer
│   │   └── provider.ts          # Web3 provider service
│   ├── utils/            # Utility functions
│   │   ├── config.ts            # Configuration management
│   │   └── logger.ts            # Logging utility
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts          # Main entry point
├── .github/
│   ├── workflows/        # CI/CD pipelines
│   │   └── ci.yml               # Main CI/CD workflow
│   └── copilot-instructions.md  # GitHub Copilot guidelines
├── dist/                 # Compiled JavaScript (generated)
├── .env.example          # Environment variables template
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest testing configuration
└── package.json          # Project dependencies
```

### Core Components

#### AI Agents

- **BaseAgent**: Foundation class for all AI agents using LangChain and OpenAI
- **BlockchainAnalysisAgent**: Analyzes on-chain data, transactions, and gas prices
- **SmartContractAgent**: Understands and analyzes smart contracts

#### Web3 Integration

- **Web3Provider**: Manages blockchain connections and queries using ethers.js
- Supports balance queries, transaction lookup, gas estimation, and more

## 📚 Usage Examples

### Analyzing an Ethereum Address

```typescript
import { Web3Provider, BlockchainAnalysisAgent } from './src/index.js';

// Initialize Web3 provider
const provider = new Web3Provider(
  'https://eth-mainnet.g.alchemy.com/v2/your-key',
  1
);

// Initialize AI agent
const agent = new BlockchainAnalysisAgent('your-openai-key', provider);

// Analyze an address
const result = await agent.analyzeAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
console.log(result);
```

### Gas Price Analysis

```typescript
const gasAnalysis = await agent.analyzeGasPrices();
console.log('Gas recommendation:', gasAnalysis.result);
```

### Smart Contract Analysis

```typescript
import { SmartContractAgent } from './src/index.js';

const contractAgent = new SmartContractAgent('your-openai-key');

const analysis = await contractAgent.analyzeContract(
  '0x...',  // contract address
  contractABI
);
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🔍 Linting

Run ESLint:
```bash
npm run lint
```

Auto-fix linting issues:
```bash
npm run lint:fix
```

## 🚀 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline configured in `.github/workflows/ci.yml`:

### Pipeline Stages

1. **Lint**: Runs ESLint to check code quality
2. **Test**: Runs test suite on Node.js 18 and 20
3. **Build**: Compiles TypeScript to JavaScript
4. **Security Scan**: Runs npm audit and Snyk security checks

### Workflow Triggers

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Setting Up CI/CD

The pipeline runs automatically on GitHub Actions. For security scanning:

1. Sign up for [Snyk](https://snyk.io/)
2. Get your Snyk token
3. Add `SNYK_TOKEN` to your repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add new secret: `SNYK_TOKEN`

## 🔒 Security

- Never commit API keys or private keys to the repository
- Use `.env` files for sensitive configuration (excluded by `.gitignore`)
- All user inputs are validated before processing
- AI outputs are logged for transparency
- Smart contract interactions require explicit confirmation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding guidelines in `.github/copilot-instructions.md`
4. Run tests and linting: `npm test && npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

ISC

## 🙏 Acknowledgments

- [LangChain](https://www.langchain.com/) - AI agent framework
- [OpenAI](https://openai.com/) - GPT-4 language model
- [ethers.js](https://docs.ethers.org/) - Ethereum library
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review `.github/copilot-instructions.md` for development guidelines

---

**Built with ❤️ using AI and Web3 technologies**
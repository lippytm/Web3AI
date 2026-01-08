# Web3AI

Web3AI is an AI-powered blockchain and Web3 development toolkit that integrates OpenAI's capabilities with blockchain technologies. Now featuring **GPT-5.1-Codex-Max** for enhanced code generation, analysis, and blockchain insights.

## 🌟 Features

- **Node.js Backend**: Server-side JavaScript for Web3 applications
- **OpenAI Integration**: AI-powered smart contract analysis, code generation, and blockchain insights
- **GPT-5.1-Codex-Max Support**: Advanced AI model for superior code understanding and generation
- **Python AI Scripts**: Advanced AI capabilities for blockchain development
- **Modular Architecture**: Easy to extend with additional AI or blockchain features
- **Configurable Models**: Support for multiple OpenAI models (GPT-3.5, GPT-4, GPT-5.1-Codex-Max)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Python** (v3.8 or higher) - [Download here](https://www.python.org/downloads/)
- **pip** (comes with Python)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lippytm/Web3AI.git
cd Web3AI
```

### 2. Set Up Node.js Environment

Install Node.js dependencies:

```bash
npm install
```

### 3. Set Up Python Environment (Optional)

For Python AI scripts, install required packages:

```bash
pip install -r requirements.txt
```

Or create a virtual environment (recommended):

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Configure OpenAI API Key

1. **Get your OpenAI API key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Navigate to API Keys section
   - Click "Create new secret key"
   - Copy your API key (you won't be able to see it again!)

2. **Set up environment variables**:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
# Replace 'your_openai_api_key_here' with your actual API key
```

Your `.env` file should look like this:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-5.1-codex-max
PORT=3000
NODE_ENV=development
```

⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 5. Choose Your AI Model (Optional)

The project defaults to **GPT-5.1-Codex-Max**, which provides:
- Superior code generation and analysis
- Enhanced smart contract security insights
- Better understanding of Web3 concepts
- Advanced reasoning capabilities

You can change the model by editing the `OPENAI_MODEL` variable in your `.env` file:
- `gpt-5.1-codex-max` (default, recommended)
- `gpt-4-turbo-preview` (alternative, also very capable)
- `gpt-4` (stable alternative)
- `gpt-3.5-turbo` (faster, more cost-effective)

## 🎯 Usage

### Running the Node.js Application

Start the main application:

```bash
npm start
```

This will run the OpenAI integration demo using GPT-5.1-Codex-Max and show you how to interact with AI models.

### Running Python AI Scripts

Execute the sample AI script:

```bash
python ai_scripts/sample_ai.py
```

This demonstrates:
- Explaining Web3 concepts using GPT-5.1-Codex-Max
- Analyzing smart contract code with advanced AI
- Integration with OpenAI's Python library
- Enhanced code analysis and security insights

## 📁 Project Structure

```
Web3AI/
├── backend/              # Node.js backend code
│   └── openai.js        # OpenAI API integration module
├── ai_scripts/          # Python AI scripts
│   └── sample_ai.py     # Sample AI functionality demo
├── .env.example         # Environment variable template
├── .gitignore          # Git ignore rules
├── index.js            # Main entry point
├── package.json        # Node.js dependencies and scripts
├── requirements.txt    # Python dependencies
└── README.md           # This file
```

## 🔧 Available Scripts

- `npm start` - Run the main application
- `npm test` - Run tests (to be implemented)

## 🚀 GPT-5.1-Codex-Max Features

GPT-5.1-Codex-Max is OpenAI's most advanced code-focused model, offering:

### Enhanced Capabilities
- **Superior Code Generation**: Create complex smart contracts and blockchain applications with minimal prompting
- **Advanced Security Analysis**: Identify subtle vulnerabilities and security issues in smart contracts
- **Deep Web3 Understanding**: Comprehensive knowledge of blockchain protocols, DeFi, NFTs, and Web3 patterns
- **Contextual Awareness**: Better understanding of complex codebases and multi-file projects
- **Detailed Explanations**: More thorough and educational responses about Web3 concepts

### Use Cases
1. **Smart Contract Development**: Generate production-ready Solidity code
2. **Security Auditing**: Comprehensive vulnerability analysis and remediation suggestions
3. **Code Review**: In-depth analysis of existing blockchain code
4. **Learning Tool**: Detailed explanations of complex Web3 concepts
5. **Architecture Design**: High-level system design for blockchain applications

### Performance Notes
- GPT-5.1-Codex-Max provides more detailed and accurate responses compared to earlier models
- Response times may be slightly longer due to enhanced processing
- Token limits are higher, allowing for more comprehensive analysis
- Recommended for production applications and critical security analysis

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### "OpenAI API key not configured" Error

Make sure you have:
1. Created a `.env` file in the project root
2. Added your OpenAI API key to the `.env` file
3. The key starts with `sk-`

### "Module not found" Error

Run `npm install` to install Node.js dependencies or `pip install openai python-dotenv` for Python.

### Python Import Errors

Make sure you have activated your virtual environment (if using one) and installed all required packages.

## 🔮 Future Enhancements

- Integration with blockchain networks (Ethereum, Polygon, etc.)
- Smart contract deployment automation
- AI-powered security auditing with GPT-5.1-Codex-Max
- Web3 wallet integration
- NFT generation and analysis
- DeFi protocol interaction
- Advanced code generation for smart contracts
- Automated vulnerability detection and patching

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [Python OpenAI Library](https://github.com/openai/openai-python)
- [Web3.js Documentation](https://web3js.readthedocs.io/)

---

Made with ❤️ for the Web3 and AI community

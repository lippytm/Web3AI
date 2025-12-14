# Web3AI

Web3AI is an AI-powered blockchain and Web3 development toolkit that integrates OpenAI's capabilities with blockchain technologies.

## 🌟 Features

- **Node.js Backend**: Server-side JavaScript for Web3 applications
- **OpenAI Integration**: AI-powered smart contract analysis, code generation, and blockchain insights
- **Python AI Scripts**: Advanced AI capabilities for blockchain development
- **Modular Architecture**: Easy to extend with additional AI or blockchain features

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
PORT=3000
NODE_ENV=development
```

⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 🎯 Usage

### Running the Node.js Application

Start the main application:

```bash
npm start
```

This will run the OpenAI integration demo and show you how to interact with AI models.

### Running Python AI Scripts

Execute the sample AI script:

```bash
python ai_scripts/sample_ai.py
```

This demonstrates:
- Explaining Web3 concepts using AI
- Analyzing smart contract code
- Integration with OpenAI's Python library

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
- AI-powered security auditing
- Web3 wallet integration
- NFT generation and analysis
- DeFi protocol interaction

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [Python OpenAI Library](https://github.com/openai/openai-python)
- [Web3.js Documentation](https://web3js.readthedocs.io/)

---

Made with ❤️ for the Web3 and AI community

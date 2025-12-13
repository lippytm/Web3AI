# GitHub Copilot Instructions for Web3AI

## Project Overview
This is a Web3 AI Agent Platform that combines blockchain technology with advanced AI capabilities.

## Code Style Guidelines
- Use TypeScript for all code
- Follow ESLint configuration in `.eslintrc.json`
- Use async/await for asynchronous operations
- Prefer explicit types over `any`
- Write descriptive function and variable names

## Architecture Patterns
- Use dependency injection for better testability
- Separate concerns: AI logic, Web3 interactions, and business logic
- Use environment variables for configuration (API keys, RPC URLs)
- Implement proper error handling with try-catch blocks

## Web3 Integration
- Use ethers.js as the primary Web3 library
- Always validate addresses before transactions
- Implement gas estimation for transactions
- Use proper event listeners for blockchain events
- Handle network-specific configurations

## AI Agent Development
- Use LangChain for AI agent orchestration
- Implement context-aware prompts
- Add safety checks for AI-generated actions
- Log all AI decisions for transparency
- Use streaming responses when applicable

## Testing
- Write unit tests for all business logic
- Mock Web3 providers in tests
- Mock AI APIs in tests
- Aim for >80% code coverage

## Security
- Never commit API keys or private keys
- Validate all user inputs
- Sanitize AI outputs before execution
- Use secure randomness for cryptographic operations
- Implement rate limiting for AI API calls

## Documentation
- Add JSDoc comments for all public functions
- Document complex algorithms inline
- Keep README.md up to date with setup instructions
- Document environment variables in .env.example

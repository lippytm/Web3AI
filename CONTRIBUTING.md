# Contributing to Web3AI

First off, thank you for considering contributing to Web3AI! It's people like you that make Web3AI such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and constructive in all interactions.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, Node version, Python version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the proposed enhancement
- **Explain why this enhancement would be useful**
- **Provide examples** of how the feature would be used

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Improvements or additions to documentation

## Development Setup

### Prerequisites

- **Python** 3.11 or higher
- **Node.js** 20.x or higher
- **npm** 9.x or higher
- **Git** for version control

### Local Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Web3AI.git
   cd Web3AI
   ```

2. **Set up the backend (Python/FastAPI)**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up the frontend (Next.js/TypeScript)**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up smart contracts (Hardhat)**
   ```bash
   cd contracts
   npm install
   ```

5. **Install pre-commit hooks (optional but recommended)**
   ```bash
   pip install pre-commit
   pre-commit install
   ```

### Running the Development Environment

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Local blockchain (optional)
cd contracts
npm run node
```

## Pull Request Process

### Before Submitting a Pull Request

- [ ] **Create an issue first** (unless it's a trivial change like fixing a typo)
- [ ] **Create a feature branch** from `main`
- [ ] **Follow the coding standards** outlined below
- [ ] **Write or update tests** as needed
- [ ] **Run all tests** and ensure they pass
- [ ] **Run linters** and fix any issues
- [ ] **Update documentation** if you're changing functionality
- [ ] **Keep commits atomic** and well-described

### Pull Request Checklist

When you submit a PR, ensure you've completed the following:

- [ ] PR title is clear and descriptive
- [ ] PR description explains the what, why, and how of the changes
- [ ] All tests pass locally (`npm test`, `pytest`)
- [ ] All linters pass (`npm run lint`, `ruff check`)
- [ ] Code is formatted properly (`npm run format`, `ruff format`)
- [ ] New code has appropriate test coverage
- [ ] Documentation is updated (README, code comments, etc.)
- [ ] No merge conflicts with the base branch
- [ ] Screenshots included (for UI changes)
- [ ] Breaking changes are clearly documented
- [ ] Security implications have been considered
- [ ] No secrets or credentials are committed

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Adding or updating tests
- `chore/description` - Maintenance tasks

Examples:
- `feature/add-wallet-connect`
- `fix/contract-deployment-error`
- `docs/update-api-reference`

### Branch Protection

The `main` branch is protected with the following requirements:

- **Pull request required**: Direct pushes to `main` are not allowed
- **Required reviewers**: At least 1 approval from a maintainer
- **Status checks required**: All CI checks must pass
  - Python linting and tests
  - Node/TypeScript linting and tests
  - Smart contract compilation and tests
  - CodeQL security analysis
  - Dependency review
- **Up-to-date branch**: Your branch must be up to date with `main`

## Coding Standards

### Python (Backend)

- **Style Guide**: Follow [PEP 8](https://pep8.org/)
- **Linter**: Use Ruff for linting and formatting
- **Type Hints**: Use type hints for function parameters and return values
- **Docstrings**: Use docstrings for modules, classes, and functions
- **Max Line Length**: 88 characters (Black default)

```python
# Good
def process_transaction(wallet_address: str, amount: float) -> dict:
    """Process a blockchain transaction.
    
    Args:
        wallet_address: The destination wallet address
        amount: The amount to transfer
        
    Returns:
        Transaction receipt as a dictionary
    """
    return {"status": "success", "amount": amount}
```

Run before committing:
```bash
cd backend
ruff check .
ruff format .
pytest
```

### TypeScript/JavaScript (Frontend)

- **Style Guide**: Follow the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- **Linter**: ESLint with Next.js configuration
- **Formatter**: Prettier
- **Type Safety**: Use TypeScript with strict mode

```typescript
// Good
interface TransactionProps {
  walletAddress: string;
  amount: number;
}

export const processTransaction = async ({ 
  walletAddress, 
  amount 
}: TransactionProps): Promise<TransactionReceipt> => {
  // Implementation
};
```

Run before committing:
```bash
cd frontend
npm run lint
npm run format
npm run type-check
npm test
```

### Solidity (Smart Contracts)

- **Style Guide**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **Version**: Use Solidity ^0.8.0 or higher
- **Security**: Follow [ConsenSys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- **Documentation**: Use NatSpec comments

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title MyContract
/// @notice Explain what this contract does
/// @dev Additional details for developers
contract MyContract {
    /// @notice Explain what this function does
    /// @param amount The amount to process
    /// @return success Whether the operation succeeded
    function processAmount(uint256 amount) external returns (bool success) {
        // Implementation
    }
}
```

Run before committing:
```bash
cd contracts
npm run compile
npm test
```

## Testing Requirements

### Backend Testing

- **Framework**: pytest
- **Coverage**: Aim for >80% code coverage
- **Test Types**: Unit tests, integration tests
- **Location**: `backend/tests/`

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_main.py
```

### Frontend Testing

- **Framework**: Jest, React Testing Library (configure as needed)
- **Test Types**: Unit tests, component tests
- **Location**: `frontend/__tests__/` or `frontend/**/*.test.ts(x)`

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Smart Contract Testing

- **Framework**: Hardhat with Mocha/Chai
- **Coverage**: Use solidity-coverage plugin
- **Test Types**: Unit tests, integration tests
- **Location**: `contracts/test/`

```bash
# Run tests
npm test

# Run with gas reporting
REPORT_GAS=true npm test

# Run coverage
npm run coverage
```

### Writing Good Tests

- **Descriptive names**: Test names should clearly describe what they test
- **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
- **Test one thing**: Each test should verify one specific behavior
- **Use fixtures**: Set up common test data with fixtures/factories
- **Mock external services**: Don't make real API calls in tests

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```
feat(frontend): add wallet connection modal

Add a modal component for connecting Web3 wallets using wagmi.
Supports MetaMask, WalletConnect, and Coinbase Wallet.

Closes #123
```

```
fix(backend): resolve CORS issue for API endpoints

Update CORS middleware to allow requests from frontend origin.
Add environment variable for configuring allowed origins.

Fixes #456
```

### Best Practices

- Use the imperative mood ("add feature" not "added feature")
- Keep subject line under 50 characters
- Capitalize the subject line
- Don't end subject line with a period
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Reference issues and PRs in the footer

## Review Process

After submitting a PR:

1. **Automated checks run**: CI/CD pipeline runs linting, tests, and security scans
2. **Code review**: Maintainers review your code
3. **Feedback addressed**: Make requested changes and push updates
4. **Approval**: Once approved, a maintainer will merge your PR
5. **Merge**: PRs are typically merged with "Squash and merge"

### Review Timeline

- **Initial review**: Within 3-5 business days
- **Follow-up reviews**: Within 2-3 business days after updates

## Questions?

If you have questions:

- Check existing [issues](https://github.com/lippytm/Web3AI/issues) and [discussions](https://github.com/lippytm/Web3AI/discussions)
- Open a new [discussion](https://github.com/lippytm/Web3AI/discussions) for general questions
- Comment on the relevant issue for specific questions

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- GitHub's contributor graph

Thank you for contributing to Web3AI! 🚀

---

Last updated: 2026-01-20

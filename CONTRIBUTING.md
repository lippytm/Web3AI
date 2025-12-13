# Contributing to Web3AI

Thank you for your interest in contributing to Web3AI! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- OpenAI API key (for testing AI features)
- Blockchain RPC endpoint (Alchemy, Infura, etc.)

### Development Setup

1. Fork the repository on GitHub

2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/Web3AI.git
cd Web3AI
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

5. Run tests to ensure everything works:
```bash
npm test
```

6. Start development server:
```bash
npm run dev
```

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following the coding guidelines

3. Run linter:
```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

4. Run tests:
```bash
npm test
```

5. Build the project:
```bash
npm run build
```

6. Commit your changes:
```bash
git add .
git commit -m "feat: add your feature description"
```

7. Push to your fork:
```bash
git push origin feature/your-feature-name
```

8. Create a Pull Request on GitHub

## Coding Guidelines

### TypeScript

- Use TypeScript for all code
- Define explicit types, avoid `any`
- Use interfaces for object shapes
- Document complex types with JSDoc comments

### Code Style

- Follow the ESLint configuration
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic

### Testing

- Write tests for all new features
- Maintain >80% code coverage
- Use descriptive test names
- Mock external dependencies

Example test:
```typescript
describe('MyFeature', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Git Commits

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

Example:
```
feat: add blockchain analysis agent

- Implement address analysis
- Add gas price optimization
- Include transaction pattern detection
```

## GitHub Copilot Usage

This project is optimized for GitHub Copilot:

1. Read `.github/copilot-instructions.md` for project-specific guidance
2. Use descriptive comments to guide Copilot
3. Review all AI-generated code for correctness and security
4. Test thoroughly

## Pull Request Process

1. Update README.md if needed
2. Update documentation in `docs/` folder
3. Ensure all tests pass
4. Ensure linter passes
5. Request review from maintainers

### PR Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Linter passes
- [ ] All tests pass
- [ ] Commit messages follow convention
- [ ] PR description explains changes

## Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all inputs
- Report security issues privately to maintainers

## Questions?

- Open an issue for bugs or feature requests
- Check existing documentation
- Review `.github/copilot-instructions.md`

Thank you for contributing!

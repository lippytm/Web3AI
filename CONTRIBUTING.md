# Contributing to Web3AI

Thank you for your interest in contributing to Web3AI! This document provides guidelines for contributing to this repository and the broader Time Machines ecosystem.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Web3AI.git
   cd Web3AI
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/lippytm/Web3AI.git
   ```

## Development Workflow

### 1. Create a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clear, concise commit messages
- Follow existing code style and conventions
- Add tests if applicable
- Update documentation as needed

### 3. Test Your Changes

Before submitting your changes:

- Ensure all Agda files compile successfully
- Run any existing tests
- Check that documentation builds correctly
- Verify workflow files are valid YAML

### 4. Commit Your Changes

```bash
git add .
git commit -m "type: brief description of changes"
```

**Commit message types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Reference to any related issues

## Pull Request Guidelines

- Keep PRs focused on a single change
- Update documentation if you change functionality
- Add tests for new features
- Ensure CI checks pass
- Respond to review feedback promptly

## Workflow Contributions

When contributing workflow changes:

1. **Test locally** using [act](https://github.com/nektos/act) when possible
2. **Validate YAML** syntax before committing
3. **Document** any new workflow parameters or secrets required
4. **Consider impact** on interconnected repositories
5. **Use `continue-on-error: true`** for non-critical steps

## Cross-Repository Considerations

Web3AI is part of an interconnected ecosystem. When making changes:

- Consider how changes might affect related repositories
- Update cross-repository workflows if needed
- Document any new integration points
- Test repository dispatch events when applicable

## Reporting Issues

When reporting issues:

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide clear reproduction steps**
4. **Include relevant logs or error messages**
5. **Specify your environment** (OS, Agda version, etc.)

## Suggesting Enhancements

We welcome suggestions for improvements! When suggesting enhancements:

- Explain the use case and benefits
- Consider how it fits with the broader ecosystem
- Provide examples if possible
- Be open to discussion and feedback

## Documentation

Good documentation is crucial. When contributing documentation:

- Use clear, concise language
- Include code examples where appropriate
- Update table of contents if needed
- Check spelling and grammar
- Follow markdown best practices

## Security

If you discover a security vulnerability:

1. **Do NOT open a public issue**
2. Email the maintainers directly
3. Provide details about the vulnerability
4. Wait for a response before disclosing publicly

## Getting Help

If you need help:

- Check the README and existing documentation
- Look through existing issues and discussions
- Ask questions in GitHub Discussions
- Reach out to maintainers if needed

## License

By contributing to Web3AI, you agree that your contributions will be licensed under the same license as the project.

## Recognition

All contributors will be recognized in the project. Thank you for helping make Web3AI better!

## Ecosystem Repositories

This project is part of the Time Machines ecosystem:

- [AI-Time-Machines](https://github.com/lippytm/AI-Time-Machines)
- [Time-Machines-Builders](https://github.com/lippytm/Time-Machines-Builders-)
- [gatsby-starter-blog](https://github.com/lippytm/gatsby-starter-blog)
- [Transparency-Logic-Time-Machine-Bots](https://github.com/lippytm/Transparency-Logic-Time-Machine-Bots-)

Contributions that improve cross-repository integration are especially welcome!

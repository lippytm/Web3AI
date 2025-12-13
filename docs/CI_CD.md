# CI/CD Pipeline Documentation

## Overview

Web3AI uses GitHub Actions for continuous integration and deployment. The pipeline automatically tests, lints, builds, and scans the code for security vulnerabilities.

## Pipeline Configuration

The CI/CD pipeline is defined in `.github/workflows/ci.yml`.

## Pipeline Stages

### 1. Lint

**Purpose:** Ensure code quality and consistency

**Steps:**
- Checkout code
- Setup Node.js 20
- Install dependencies
- Run ESLint

**When it runs:** On every push and pull request

**How to run locally:**
```bash
npm run lint
```

### 2. Test

**Purpose:** Validate code functionality

**Steps:**
- Checkout code
- Setup Node.js (matrix: 18, 20)
- Install dependencies
- Run Jest tests
- Upload coverage to Codecov

**When it runs:** On every push and pull request

**How to run locally:**
```bash
npm test
npm run test:coverage
```

### 3. Build

**Purpose:** Compile TypeScript to JavaScript

**Steps:**
- Checkout code
- Setup Node.js 20
- Install dependencies
- Run TypeScript compiler
- Upload build artifacts

**When it runs:** After lint and test pass

**How to run locally:**
```bash
npm run build
```

### 4. Security Scan

**Purpose:** Identify security vulnerabilities

**Steps:**
- Run npm audit
- Run Snyk security scan (if token is configured)

**When it runs:** On every push and pull request

**How to run locally:**
```bash
npm audit
```

## Branch Strategy

The pipeline runs on:
- `main` branch - Production-ready code
- `develop` branch - Development code
- Pull requests to `main` or `develop`

## Setup Instructions

### Basic Setup

The pipeline works out of the box with no additional configuration required.

### Optional: Codecov Integration

1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. The upload step will automatically work (Codecov detects GitHub Actions)

### Optional: Snyk Security Scanning

1. Sign up at [snyk.io](https://snyk.io)
2. Get your API token from account settings
3. Add the token to GitHub repository secrets:
   - Navigate to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `SNYK_TOKEN`
   - Value: Your Snyk API token
   - Click "Add secret"

## Troubleshooting

### Tests Failing

```bash
# Run tests locally to debug
npm test

# Check for specific test failures
npm test -- --verbose
```

### Lint Errors

```bash
# Check lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix
```

### Build Errors

```bash
# Check TypeScript compilation
npm run build

# Check for type errors
npx tsc --noEmit
```

### Security Vulnerabilities

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# For breaking changes, update manually
npm audit fix --force
```

## Best Practices

### Before Committing

1. Run linter: `npm run lint`
2. Run tests: `npm test`
3. Run build: `npm run build`
4. Fix any issues before pushing

### Writing Tests

- Write tests for all new features
- Maintain test coverage above 80%
- Use descriptive test names
- Mock external dependencies

### Commit Messages

Follow conventional commits format:
```
feat: add new feature
fix: fix bug
docs: update documentation
test: add tests
chore: update dependencies
```

## Monitoring

### GitHub Actions Dashboard

View pipeline status at:
```
https://github.com/lippytm/Web3AI/actions
```

### Status Badges

Add status badges to README:
```markdown
![CI](https://github.com/lippytm/Web3AI/workflows/CI%2FCD%20Pipeline/badge.svg)
```

## Future Enhancements

Planned improvements:
- [ ] Automated deployment to npm
- [ ] Docker image builds
- [ ] Performance benchmarking
- [ ] End-to-end testing
- [ ] Automated release notes

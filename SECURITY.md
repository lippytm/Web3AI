# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Web3AI seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them using one of the following methods:

**Preferred Method**: Use GitHub's private vulnerability reporting feature:
1. Go to the "Security" tab of this repository
2. Click "Report a vulnerability"
3. Fill out the advisory form

**Alternative Method**: Contact the maintainer @lippytm directly through GitHub

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., SQL injection, XSS, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline (SLA)

We will make our best effort to respond according to the following timeline:

- **Initial Response**: Within 48 hours of receiving the report
- **Status Update**: Within 5 business days with an assessment of the vulnerability
- **Fix Timeline**: Critical vulnerabilities will be addressed within 30 days; high/medium vulnerabilities within 60 days
- **Disclosure**: Coordinated disclosure after a fix is available

**Note**: These are target SLAs and may vary based on the complexity of the vulnerability and availability of maintainers.

### What to Expect

After you submit a report, we will:

1. Confirm receipt of your vulnerability report
2. Provide an initial assessment of the report
3. Work on a fix and keep you informed of our progress
4. Notify you when the vulnerability is fixed
5. Publicly disclose the vulnerability (with credit to you, if desired) after a fix is deployed

## Security Best Practices

### For Contributors

When contributing to Web3AI, please follow these security best practices:

1. **Never commit secrets**: API keys, private keys, passwords, or tokens
2. **Use environment variables**: Store sensitive configuration in `.env` files (excluded from git)
3. **Validate input**: Always validate and sanitize user input
4. **Keep dependencies updated**: Regularly update dependencies to patch known vulnerabilities
5. **Follow secure coding practices**: Use parameterized queries, avoid eval(), sanitize outputs
6. **Review PRs carefully**: Check for security issues before approving

### For Users

When deploying Web3AI:

1. **Use strong secrets**: Generate strong, unique values for API keys and tokens
2. **Enable HTTPS**: Always use HTTPS in production environments
3. **Regular updates**: Keep your deployment updated with the latest security patches
4. **Monitor dependencies**: Use tools like Dependabot to monitor for vulnerable dependencies
5. **Follow least privilege**: Grant minimum necessary permissions to service accounts
6. **Backup private keys**: Securely backup and never expose blockchain private keys

## Branch Protection and Security Controls

This repository assumes the following branch protection rules on the `main` branch:

- **Require pull request reviews**: At least 1 approval required
- **Require status checks**: All CI checks must pass (lint, test, CodeQL, dependency review)
- **Require signed commits**: Commits must be signed (recommended)
- **Restrict who can push**: Only maintainers can push directly to main
- **Require linear history**: No merge commits (recommended)

### Workflow Permissions

All GitHub Actions workflows in this repository follow the principle of least privilege:

- Default permissions are set to `contents: read`
- Additional permissions are granted on a per-job basis only when necessary
- OIDC token permissions (`id-token: write`) are only used in deployment workflows

## Security Features

### Automated Security Scanning

This repository includes the following automated security features:

1. **CodeQL Analysis**: Runs on every push and PR to scan for security vulnerabilities
2. **Dependency Review**: Reviews dependencies in PRs for known vulnerabilities
3. **Dependabot**: Automatically creates PRs for dependency updates (configure in Settings)

### Required Secrets for Deployment

The following secrets are required for deployment but should **never** be committed to the repository:

- `WEB3_RPC_URL`: Blockchain RPC endpoint URL
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `SLACK_BOT_TOKEN`: Slack bot token (optional)
- `DISCORD_BOT_TOKEN`: Discord bot token (optional)
- `DB_URL`: Database connection string
- `S3_BUCKET`: S3 bucket name (if using AWS)
- Cloud provider credentials (configured via OIDC, not stored as secrets)

Configure these in GitHub Settings > Secrets and variables > Actions.

## Vulnerability Disclosure Policy

We follow a coordinated disclosure approach:

1. Security researchers report vulnerabilities privately
2. We work together to understand and fix the issue
3. We release a security patch
4. We publicly disclose the vulnerability with credit to the researcher (if desired)

We appreciate the security community's efforts to responsibly disclose vulnerabilities and will acknowledge your contributions in our security advisories.

## Security Hall of Fame

We recognize and thank the following security researchers for their responsible disclosure:

<!-- Contributors will be listed here after vulnerabilities are disclosed -->

- None yet - be the first!

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Web3 Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

## Questions?

If you have questions about security but don't have a vulnerability to report, please open a discussion in the "Security" category of GitHub Discussions.

---

Last updated: 2026-01-20

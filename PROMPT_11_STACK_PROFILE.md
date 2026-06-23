# Prompt #11 Stack Profile

This file tracks the known technology and learning stack for Web3AI.

## Repository

`lippytm/Web3AI`

## Current Stack Status

Known stack: reviewed from README evidence.

Web3AI is a full-stack AI + Web3 starter bundle with:

- Python / FastAPI backend
- Next.js / TypeScript frontend
- Hardhat smart-contract workspace
- Solidity contract examples
- LangChain / OpenAI integration path
- ethers.js, viem, and wagmi Web3 libraries
- diagnostic sandboxes for AI, blockchain, frontend, and contracts
- GitHub Actions CI/CD
- Trivy security scanning and SBOM generation
- Renovate dependency update support
- Pydantic and Zod configuration validation

## Evidence Notes

README evidence identifies:

- Python 3.11+ prerequisite
- Node.js 20.x+ prerequisite
- npm 9.x+ prerequisite
- backend setup with `pip install -r requirements.txt`
- backend dev server with `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
- frontend setup with `npm install` and `npm run dev`
- contracts setup with `npm run compile`, `npm test`, and Hardhat local node workflows
- CI jobs for backend lint/tests, frontend lint/build, and contract compile/tests

## Language Categories

Relevant categories:

- Python
- FastAPI
- JavaScript / TypeScript
- Next.js / React
- Solidity
- Hardhat
- Web3 libraries
- AI-assisted development
- configuration validation
- CI/CD
- security scanning
- documentation
- sandbox-first blockchain education
- CRM and bot platform integrations
- GitHub practice

## Blockchain Learning Boundary

Blockchain and Web3 work in this repo should remain education-first, sandbox-first, and testnet/local-first unless separately reviewed. Do not commit real private keys, production wallet credentials, or irreversible deployment instructions without RiskGate review.

## Validation Path

Suggested validation sequence:

1. Backend: `cd backend && pip install -r requirements.txt && pytest`
2. Backend lint: `cd backend && ruff check .`
3. Frontend: `cd frontend && npm install && npm run lint && npm run type-check`
4. Contracts: `cd contracts && npm install && npm run compile && npm test`
5. Security: review Trivy and SBOM workflow outputs in GitHub Actions.

## Prompt #11 Review Questions

1. Are backend, frontend, and contracts all still present and current?
2. Are setup commands valid against the current dependency files?
3. Are sandbox diagnostics documented enough for a learner to run safely?
4. Are Web3 examples limited to local/testnet unless reviewed?
5. Are API key and private key warnings visible in every relevant setup path?
6. What is the next useful improvement?

## Next Action

Move this repo from starter status toward `needs-review`, then run or document validation evidence for backend, frontend, contracts, sandboxes, and security workflows.

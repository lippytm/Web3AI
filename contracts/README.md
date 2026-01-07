# Web3AI Smart Contracts

Hardhat-based smart contract development environment.

## Setup

Install dependencies:
```bash
npm install
```

Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration (NEVER commit real private keys!)
```

## Development

Compile contracts:
```bash
npm run compile
```

Run tests:
```bash
npm test
```

Start local node:
```bash
npm run node
```

Deploy to local network:
```bash
npm run deploy
```

## Network Configuration

The Hardhat configuration supports:
- **hardhat**: Local development network (chainId: 1337)
- **localhost**: Local node at http://127.0.0.1:8545
- **mainnet**: Ethereum mainnet
- **sepolia**: Sepolia testnet

## Contracts

- **Lock.sol**: A simple time-locked contract for holding ETH

## Testing

Tests are written using Hardhat's testing framework with Chai assertions.
Run `npm test` to execute the test suite.

## Deployment

1. Set up your `.env` file with a private key and RPC URL
2. Run: `npx hardhat run scripts/deploy.js --network <network-name>`

**WARNING**: Never commit private keys to version control!

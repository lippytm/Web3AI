# @lippytm/ai-sdk - TypeScript/Node.js

AI/Web3 Integration SDK for TypeScript and Node.js applications.

## Installation

```bash
npm install @lippytm/ai-sdk
```

## Usage

### From Environment Variables

```typescript
import AISDKFactory from '@lippytm/ai-sdk';

// Reads configuration from process.env
const sdk = AISDKFactory.fromEnv();

// Access different clients
const aiClient = sdk.getAIClient();
const web3Client = sdk.getWeb3Client();
```

### Programmatic Configuration

```typescript
import { AISDKFactory, SDKConfig } from '@lippytm/ai-sdk';

const config: SDKConfig = {
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4'
  },
  web3: {
    chain: 'ethereum',
    rpcUrl: process.env.ETH_RPC_URL
  }
};

const sdk = AISDKFactory.create(config);
```

## Development Status

This is a stub implementation with TODO placeholders for actual client initialization.

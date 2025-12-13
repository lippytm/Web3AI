# Web3AI Usage Examples

This file contains practical examples of using Web3AI for various blockchain and AI tasks.

## Setup

```typescript
import dotenv from 'dotenv';
import { Web3Provider, BlockchainAnalysisAgent, SmartContractAgent } from './src/index.js';

// Load environment variables
dotenv.config();

const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  rpcUrl: process.env.RPC_URL,
  chainId: parseInt(process.env.CHAIN_ID || '1'),
};
```

## Example 1: Analyze an Ethereum Address

```typescript
async function analyzeAddress() {
  // Initialize Web3 provider
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  
  // Initialize blockchain analysis agent
  const agent = new BlockchainAnalysisAgent(
    config.openaiApiKey,
    provider
  );
  
  // Analyze Vitalik's address
  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const analysis = await agent.analyzeAddress(address);
  
  console.log('Address Analysis:', analysis.result);
  console.log('Confidence:', analysis.confidence);
}
```

## Example 2: Get Gas Price Recommendations

```typescript
async function getGasRecommendations() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  const agent = new BlockchainAnalysisAgent(config.openaiApiKey, provider);
  
  const gasAnalysis = await agent.analyzeGasPrices();
  
  console.log('Gas Analysis:', gasAnalysis.result);
  console.log('Recommendation:', gasAnalysis.reasoning);
}
```

## Example 3: Check Account Balance

```typescript
async function checkBalance() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  
  const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  const balance = await provider.getBalance(address);
  
  console.log(`Balance: ${balance} ETH`);
}
```

## Example 4: Get Current Block Information

```typescript
async function getBlockInfo() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  
  const blockNumber = await provider.getBlockNumber();
  console.log(`Current block: ${blockNumber}`);
  
  const gasPrice = await provider.getGasPrice();
  console.log(`Gas price: ${gasPrice} gwei`);
}
```

## Example 5: Analyze a Smart Contract

```typescript
async function analyzeSmartContract() {
  const contractAgent = new SmartContractAgent(config.openaiApiKey);
  
  const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT
  
  const analysis = await contractAgent.analyzeContract(contractAddress);
  
  console.log('Contract Analysis:', analysis.result);
}
```

## Example 6: Get Function Parameter Suggestions

```typescript
async function getFunctionParams() {
  const contractAgent = new SmartContractAgent(config.openaiApiKey);
  
  const result = await contractAgent.suggestFunctionParameters(
    'transfer(address,uint256)',
    'Send 100 USDT to Alice at 0x123...'
  );
  
  console.log('Suggested Parameters:', result.result);
  console.log('Requires Confirmation:', result.taskId);
}
```

## Example 7: Custom AI Task

```typescript
import { BaseAgent } from './src/agents/base.js';
import type { AgentTask } from './src/types/index.js';

async function customAnalysis() {
  const agent = new BaseAgent(config.openaiApiKey, 'gpt-4');
  
  const task: AgentTask = {
    id: 'custom-1',
    type: 'analysis',
    prompt: 'Explain what a flash loan is and how it works in DeFi',
    context: {
      topic: 'DeFi',
      subtopic: 'Flash Loans'
    },
    requiresConfirmation: false
  };
  
  const response = await agent.executeTask(task);
  console.log('Explanation:', response.result);
}
```

## Example 8: Transaction Lookup

```typescript
async function lookupTransaction() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  
  const txHash = '0x...'; // Replace with actual transaction hash
  const tx = await provider.getTransaction(txHash);
  
  if (tx) {
    console.log('Transaction Details:');
    console.log('From:', tx.from);
    console.log('To:', tx.to);
    console.log('Value:', tx.value.toString());
    console.log('Gas Price:', tx.gasPrice?.toString());
  }
}
```

## Example 9: Estimate Gas for Transaction

```typescript
import type { TransactionRequest } from './src/types/index.js';

async function estimateTransactionGas() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  
  const tx: TransactionRequest = {
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    value: '1.0', // 1 ETH
  };
  
  const gasEstimate = await provider.estimateGas(tx);
  console.log(`Estimated gas: ${gasEstimate}`);
  
  const gasPrice = await provider.getGasPrice();
  console.log(`Current gas price: ${gasPrice} gwei`);
  
  // Calculate total cost
  const totalCost = (BigInt(gasEstimate) * BigInt(gasPrice)) / BigInt(1e9);
  console.log(`Estimated cost: ${totalCost} gwei`);
}
```

## Example 10: Complete Analysis Workflow

```typescript
async function completeAnalysis() {
  const provider = new Web3Provider(config.rpcUrl, config.chainId);
  const blockchainAgent = new BlockchainAnalysisAgent(config.openaiApiKey, provider);
  const contractAgent = new SmartContractAgent(config.openaiApiKey);
  
  // Step 1: Get current network status
  const blockNumber = await provider.getBlockNumber();
  const gasPrice = await provider.getGasPrice();
  
  console.log(`Network Status:`);
  console.log(`Block: ${blockNumber}`);
  console.log(`Gas: ${gasPrice} gwei`);
  
  // Step 2: Analyze gas prices
  const gasAnalysis = await blockchainAgent.analyzeGasPrices();
  console.log('\nGas Analysis:', gasAnalysis.result);
  
  // Step 3: Analyze a specific address
  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const balance = await provider.getBalance(address);
  const addressAnalysis = await blockchainAgent.analyzeAddress(address);
  
  console.log(`\nAddress ${address}:`);
  console.log(`Balance: ${balance} ETH`);
  console.log(`Analysis:`, addressAnalysis.result);
  
  // Step 4: Analyze a smart contract
  const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const contractAnalysis = await contractAgent.analyzeContract(contractAddress);
  
  console.log('\nContract Analysis:', contractAnalysis.result);
}
```

## Running the Examples

1. Ensure environment variables are set in `.env`:
```env
OPENAI_API_KEY=your-key
RPC_URL=your-rpc-url
CHAIN_ID=1
```

2. Create a file `examples.ts` with the example code

3. Run with tsx:
```bash
npx tsx examples.ts
```

Or compile and run:
```bash
npm run build
node dist/examples.js
```

## Best Practices

1. **Always validate addresses** before querying
2. **Handle errors gracefully** with try-catch
3. **Check AI confidence scores** before acting on recommendations
4. **Use appropriate models** (GPT-3.5 for speed, GPT-4 for accuracy)
5. **Monitor API usage** to control costs
6. **Cache results** when appropriate
7. **Never commit API keys** to version control

## Troubleshooting

### Issue: RPC errors
- Check your RPC URL is correct
- Verify your RPC provider has sufficient quota
- Try a different RPC endpoint

### Issue: OpenAI API errors
- Verify API key is correct
- Check you have sufficient credits
- Ensure model name is valid

### Issue: Type errors
- Run `npm run build` to check TypeScript errors
- Ensure all dependencies are installed
- Check import paths are correct

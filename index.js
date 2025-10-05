import ChatGPTService from './chatgpt.js';

async function main() {
  console.log('Web3AI - ChatGPT Integration Demo\n');
  
  try {
    const chatGPT = new ChatGPTService();
    
    // Example 1: Simple chat
    console.log('Example 1: Simple Web3 Question');
    console.log('Question: What is Web3?');
    
    const response = await chatGPT.chat('What is Web3?');
    
    if (response.success) {
      console.log('\nResponse:', response.message);
      console.log('\nToken Usage:', response.usage);
    } else {
      console.error('Error:', response.error);
    }
    
    // Example 2: Custom options
    console.log('\n\n---\n');
    console.log('Example 2: Custom Model and Temperature');
    console.log('Question: Explain smart contracts in simple terms.');
    
    const response2 = await chatGPT.chat(
      'Explain smart contracts in simple terms.',
      {
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 500
      }
    );
    
    if (response2.success) {
      console.log('\nResponse:', response2.message);
      console.log('\nToken Usage:', response2.usage);
    } else {
      console.error('Error:', response2.error);
    }
    
    // Example 3: Streaming response
    console.log('\n\n---\n');
    console.log('Example 3: Streaming Response');
    console.log('Question: What are the benefits of decentralized finance (DeFi)?');
    console.log('\nResponse (streaming):');
    
    const stream = await chatGPT.streamChat(
      'What are the benefits of decentralized finance (DeFi)?',
      { maxTokens: 300 }
    );
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(content);
    }
    
    console.log('\n');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

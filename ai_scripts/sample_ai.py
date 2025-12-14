#!/usr/bin/env python3
"""
Web3AI - Python AI Script Example

This script demonstrates how to use OpenAI's Python library to interact
with AI models for Web3 and blockchain-related tasks.

Requirements:
    pip install openai python-dotenv
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def setup_openai():
    """
    Initialize OpenAI client with API key from environment
    """
    try:
        from openai import OpenAI
        
        api_key = os.getenv('OPENAI_API_KEY')
        
        if not api_key or api_key == 'your_openai_api_key_here':
            print('⚠️  Warning: OpenAI API key not configured!')
            print('📝 Please set OPENAI_API_KEY in your .env file')
            return None
        
        client = OpenAI(api_key=api_key)
        print('✅ OpenAI client initialized successfully\n')
        return client
        
    except ImportError:
        print('❌ Error: openai package not installed')
        print('   Install it with: pip install openai')
        return None


def analyze_smart_contract(client, contract_code):
    """
    Example function to analyze smart contract code using AI
    
    Args:
        client: OpenAI client instance
        contract_code: Smart contract code to analyze
    
    Returns:
        AI analysis of the contract
    """
    if not client:
        return "Client not initialized"
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert in blockchain and smart contract security. Analyze smart contracts for potential vulnerabilities and best practices."
                },
                {
                    "role": "user",
                    "content": f"Analyze this smart contract code:\n\n{contract_code}"
                }
            ],
            max_tokens=300,
            temperature=0.5
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        return f"Error analyzing contract: {str(e)}"


def explain_web3_concept(client, concept):
    """
    Get AI explanation of Web3 concepts
    
    Args:
        client: OpenAI client instance
        concept: Web3 concept to explain
    
    Returns:
        AI explanation
    """
    if not client:
        return "Client not initialized"
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a Web3 educator. Explain blockchain and Web3 concepts in simple, clear terms."
                },
                {
                    "role": "user",
                    "content": f"Explain: {concept}"
                }
            ],
            max_tokens=200,
            temperature=0.7
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        return f"Error getting explanation: {str(e)}"


def run_demo():
    """
    Run demonstration of AI capabilities
    """
    print('🚀 Web3AI Python Demo')
    print('=' * 50)
    print()
    
    # Initialize OpenAI client
    client = setup_openai()
    
    if not client:
        print('\n💡 To run this demo:')
        print('   1. Install dependencies: pip install openai python-dotenv')
        print('   2. Set OPENAI_API_KEY in .env file')
        print('   3. Get API key from: https://platform.openai.com/api-keys')
        return
    
    # Demo 1: Explain a Web3 concept
    print('📚 Demo 1: Explaining Web3 Concepts')
    print('-' * 50)
    concept = "What is a blockchain consensus mechanism?"
    print(f'Question: {concept}\n')
    print('Thinking... 🤔\n')
    
    explanation = explain_web3_concept(client, concept)
    print('AI Response:')
    print(explanation)
    print()
    
    # Demo 2: Smart contract analysis
    print('\n🔍 Demo 2: Smart Contract Analysis')
    print('-' * 50)
    
    sample_contract = """
    pragma solidity ^0.8.0;
    
    contract SimpleStorage {
        uint256 private data;
        
        function set(uint256 _data) public {
            data = _data;
        }
        
        function get() public view returns (uint256) {
            return data;
        }
    }
    """
    
    print('Analyzing sample Solidity contract...\n')
    print('Thinking... 🤔\n')
    
    analysis = analyze_smart_contract(client, sample_contract)
    print('AI Analysis:')
    print(analysis)
    print()
    
    print('\n✅ Demo completed successfully!')
    print('=' * 50)


if __name__ == '__main__':
    run_demo()

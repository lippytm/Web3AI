# AI/Web3 Integration SDK - Python

AI/Web3 Integration SDK for Python applications.

## Installation

```bash
pip install -e sdk/python
```

## Usage

### From Environment Variables

```python
from sdk.python import AISDKFactory

# Reads configuration from environment
sdk = AISDKFactory.from_env()

# Access different clients
ai_client = sdk.get_ai_client()
web3_client = sdk.get_web3_client()
```

### Programmatic Configuration

```python
from sdk.python import AISDKFactory, SDKConfig, AIConfig, Web3Config
import os

config = SDKConfig(
    ai=AIConfig(
        provider='openai',
        api_key=os.getenv('OPENAI_API_KEY'),
        model='gpt-4'
    ),
    web3=Web3Config(
        chain='ethereum',
        rpc_url=os.getenv('ETH_RPC_URL')
    )
)

sdk = AISDKFactory.create(config)
```

## Development Status

This is a stub implementation with TODO placeholders for actual client initialization.

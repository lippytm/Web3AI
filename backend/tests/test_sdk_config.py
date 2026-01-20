"""Tests for SDK config loaders."""

import os

import pytest

# Add sdk directory to path
import sys
from pathlib import Path

sdk_path = Path(__file__).parent.parent.parent / "sdk" / "python"
sys.path.insert(0, str(sdk_path))

from ai_sdk import AISDK, AIConfig, AISDKFactory, SDKConfig, Web3Config


def test_sdk_create_with_config():
    """Test SDK creation with explicit configuration."""
    config = SDKConfig(
        ai=AIConfig(provider="openai", api_key="test-key", model="gpt-4"),
        web3=Web3Config(chain="ethereum", rpc_url="https://eth.llamarpc.com"),
    )

    sdk = AISDKFactory.create(config)
    assert sdk is not None
    assert isinstance(sdk, AISDK)

    retrieved_config = sdk.get_config()
    assert retrieved_config.ai.provider == "openai"
    assert retrieved_config.ai.api_key == "test-key"
    assert retrieved_config.web3.chain == "ethereum"


def test_sdk_from_env(monkeypatch):
    """Test SDK creation from environment variables."""
    # Set environment variables
    monkeypatch.setenv("AI_PROVIDER", "openai")
    monkeypatch.setenv("AI_API_KEY", "test-env-key")
    monkeypatch.setenv("AI_MODEL", "gpt-3.5-turbo")
    monkeypatch.setenv("WEB3_CHAIN", "ethereum")
    monkeypatch.setenv("WEB3_RPC_URL", "https://eth.llamarpc.com")

    sdk = AISDKFactory.from_env()
    assert sdk is not None

    config = sdk.get_config()
    assert config.ai.provider == "openai"
    assert config.ai.api_key == "test-env-key"
    assert config.ai.model == "gpt-3.5-turbo"
    assert config.web3.chain == "ethereum"
    assert config.web3.rpc_url == "https://eth.llamarpc.com"


def test_sdk_missing_config_raises_error():
    """Test that accessing clients without config raises appropriate errors."""
    sdk = AISDK(SDKConfig())

    with pytest.raises(ValueError, match="AI configuration not provided"):
        sdk.get_ai_client()

    with pytest.raises(ValueError, match="Web3 configuration not provided"):
        sdk.get_web3_client()


def test_sdk_partial_config():
    """Test SDK with partial configuration."""
    config = SDKConfig(ai=AIConfig(provider="huggingface", api_key="hf-test"))

    sdk = AISDKFactory.create(config)
    assert sdk is not None

    retrieved_config = sdk.get_config()
    assert retrieved_config.ai is not None
    assert retrieved_config.web3 is None
    assert retrieved_config.messaging is None

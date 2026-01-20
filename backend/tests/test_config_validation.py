"""Smoke tests for configuration validation."""

import os
import pytest
from app.settings import Settings, validate_config


def test_settings_defaults():
    """Test settings can be loaded with defaults (no network calls)."""
    settings = Settings()
    assert settings.app_name == "Web3AI API"
    assert settings.model_name == "GPT-5.1-Codex-Max"
    assert settings.eth_rpc_url == "https://eth.llamarpc.com"
    assert settings.network == "mainnet"
    assert settings.telemetry_enabled is False


def test_validate_config_success():
    """Test config validation succeeds with valid settings."""
    settings = validate_config()
    assert settings is not None
    assert isinstance(settings, Settings)


def test_rpc_url_validation():
    """Test RPC URL validation."""
    # Valid URLs
    settings = Settings(eth_rpc_url="https://eth.llamarpc.com")
    assert settings.eth_rpc_url == "https://eth.llamarpc.com"
    
    settings = Settings(eth_rpc_url="http://localhost:8545")
    assert settings.eth_rpc_url == "http://localhost:8545"
    
    # Invalid URL - no protocol
    with pytest.raises(ValueError, match="must start with http"):
        Settings(eth_rpc_url="eth.llamarpc.com")
    
    # Empty URL
    with pytest.raises(ValueError, match="cannot be empty"):
        Settings(eth_rpc_url="")


def test_model_name_validation():
    """Test model name validation."""
    # Valid model name
    settings = Settings(model_name="gpt-4")
    assert settings.model_name == "gpt-4"
    
    # Empty model name
    with pytest.raises(ValueError, match="cannot be empty"):
        Settings(model_name="")
    
    # Whitespace-only model name
    with pytest.raises(ValueError, match="cannot be empty"):
        Settings(model_name="   ")


def test_network_validation():
    """Test network validation with literal types."""
    # Valid networks
    for network in ["mainnet", "sepolia", "goerli", "localhost"]:
        settings = Settings(network=network)
        assert settings.network == network
    
    # Invalid network - this will be caught by pydantic literal validation
    with pytest.raises(ValueError):
        Settings(network="invalid_network")


def test_telemetry_settings():
    """Test telemetry settings."""
    settings = Settings(telemetry_enabled=True, telemetry_endpoint="http://localhost:4318")
    assert settings.telemetry_enabled is True
    assert settings.telemetry_endpoint == "http://localhost:4318"

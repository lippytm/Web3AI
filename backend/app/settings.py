"""Application settings module."""

from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Settings
    app_name: str = "Web3AI API"
    debug: bool = False

    # OpenAI Settings
    openai_api_key: str = ""
    model_name: str = "GPT-5.1-Codex-Max"

    # Blockchain Settings
    eth_rpc_url: str = "https://eth.llamarpc.com"
    network: Literal["mainnet", "sepolia", "goerli", "localhost"] = "mainnet"

    # Telemetry Settings (optional)
    telemetry_enabled: bool = False
    telemetry_endpoint: str = ""

    # Platform Integration Settings
    # ManyChat
    manychat_api_key: str = ""
    manychat_webhook_secret: str = ""

    # BotBuilders
    botbuilders_api_token: str = ""
    botbuilders_webhook_secret: str = ""

    # OpenClaw
    openclaw_api_key: str = ""
    openclaw_webhook_secret: str = ""

    # MoltBook
    moltbook_api_token: str = ""
    moltbook_webhook_secret: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        protected_namespaces=("settings_",),
    )

    @field_validator("eth_rpc_url")
    @classmethod
    def validate_rpc_url(cls, v: str) -> str:
        """Validate RPC URL format."""
        if not v:
            raise ValueError("eth_rpc_url cannot be empty")
        if not (v.startswith("http://") or v.startswith("https://")):
            raise ValueError("eth_rpc_url must start with http:// or https://")
        return v

    @field_validator("model_name")
    @classmethod
    def validate_model_name(cls, v: str) -> str:
        """Validate model name is not empty."""
        if not v or not v.strip():
            raise ValueError("model_name cannot be empty")
        return v.strip()


def validate_config() -> Settings:
    """Validate configuration without network calls (smoke test).

    Returns:
        Settings: Validated settings instance

    Raises:
        ValueError: If configuration is invalid
    """
    try:
        settings_instance = Settings()
        # Basic validation checks (no network calls)
        assert settings_instance.app_name, "app_name must be set"
        assert settings_instance.model_name, "model_name must be set"
        assert settings_instance.eth_rpc_url, "eth_rpc_url must be set"
        return settings_instance
    except Exception as e:
        raise ValueError(f"Configuration validation failed: {e}") from e


settings = Settings()

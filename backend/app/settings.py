"""Application settings module."""

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
    network: str = "mainnet"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        protected_namespaces=("settings_",)
    )


settings = Settings()

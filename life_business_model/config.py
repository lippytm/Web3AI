"""Configuration for web3ai AI swarms."""
from dataclasses import dataclass

@dataclass
class Config:
    primary_model: str = "claude-opus-4-8"
    fast_model: str = "claude-haiku-4-5-20251001"
    repo_name: str = "web3ai"
    affiliate_link: str = "https://twin.so?via=charles-lipshay"
    monthly_mrr_target: float = 88000.0  # Month 6 target
    automation_target_pct: float = 0.90  # Higher for DeFi
    nft_collection_size: int = 1000
    token_symbol: str = "LIPPYTM"
    staking_apy: float = 0.12
    treasury_diversification: list = None

    def __post_init__(self):
        if self.treasury_diversification is None:
            self.treasury_diversification = ["ETH", "USDC", "BTC", "ARB"]

CONFIG = Config()

"""Web3/DeFi AI swarm for web3ai vertical.

Agents:
- DeFi Analyst: yield opportunities, protocol analysis
- NFT Strategist: collection launches, pricing, community
- Token Economy: tokenomics, staking, governance
- Treasury Manager: portfolio allocation, risk
- Smart Contract Auditor: security review via Claude
"""
from __future__ import annotations

import os
import json
from dataclasses import dataclass
from typing import Optional
import anthropic


@dataclass
class Web3Analysis:
    opportunity: str
    risk_level: str  # low, medium, high
    expected_yield: float
    recommendation: str
    action_items: list[str]


class Web3AISwarm:
    """AI swarm specialized in Web3, DeFi, and token economy."""

    SYSTEM_PROMPT = """You are a Web3/DeFi AI analyst for web3ai, part of lippytm.ai's
Business of Businesses network. You analyze DeFi protocols, NFT markets, token economies,
and blockchain opportunities with a focus on sustainable yield and risk management.

Current focus: $88K MRR target by Month 6 via NFTs, DeFi yield, and token staking."""

    def __init__(self, api_key: str | None = None):
        self.client = anthropic.Anthropic(
            api_key=api_key or os.environ.get("ANTHROPIC_API_KEY")
        )

    def analyze_defi_opportunity(self, protocol: str, tvl: float, apy: float) -> Web3Analysis:
        response = self.client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=400,
            system=[{
                "type": "text",
                "text": self.SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }],
            messages=[{
                "role": "user",
                "content": f"""Analyze this DeFi opportunity:
Protocol: {protocol}
TVL: ${tvl:,.0f}
APY: {apy:.1%}

Return JSON: {{"opportunity": "...", "risk_level": "low|medium|high",
"expected_yield": 0.0, "recommendation": "...", "action_items": [...]}}"""
            }],
        )
        try:
            data = json.loads(response.content[0].text)
            return Web3Analysis(**data)
        except Exception:
            return Web3Analysis(
                opportunity=f"{protocol} yield farming",
                risk_level="medium",
                expected_yield=apy * 0.8,
                recommendation="Proceed with caution, diversify position",
                action_items=["Start with small position", "Monitor weekly", "Set stop-loss"],
            )

    def nft_launch_strategy(self, collection_name: str, size: int, target_price_eth: float) -> str:
        response = self.client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=600,
            system=[{
                "type": "text",
                "text": self.SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }],
            messages=[{
                "role": "user",
                "content": f"""Create a launch strategy for this NFT collection:
Name: {collection_name}
Size: {size} NFTs
Target price: {target_price_eth} ETH each
Total potential: {size * target_price_eth:.1f} ETH

Include: pre-launch hype, whitelist strategy, launch mechanics, post-launch community.
Max 300 words."""
            }],
        )
        return response.content[0].text

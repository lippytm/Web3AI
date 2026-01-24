"""AI agents and toolkits for autonomous AI workflows."""

from typing import Any

from langchain.agents import AgentExecutor, create_structured_chat_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import Tool

from app.ai_tools import ai_tools


class Web3AIAgent:
    """AI agent with Web3 capabilities and structured reasoning."""

    def __init__(self, provider: str = "claude", tools: list[Tool] | None = None):
        """Initialize Web3 AI agent.

        Args:
            provider: AI provider to use ("openai" or "claude")
            tools: Optional list of tools for the agent
        """
        self.provider = provider
        self.model = ai_tools.get_model(provider)
        self.tools = tools or []
        self.agent = None
        self.agent_executor = None
        self._setup_agent()

    def _setup_agent(self):
        """Setup the agent with tools and prompts."""
        if not self.tools:
            # Default tools for Web3 AI
            self.tools = self._get_default_tools()

        # Create agent prompt
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are a helpful AI assistant specialized in Web3 and blockchain technology.
You have access to various tools to help users with their questions and tasks.
Always think step-by-step and use the appropriate tools when needed.

Available tools:
{tools}

Tool names: {tool_names}

When using tools, follow this format:
```json
{{
  "action": "tool_name",
  "action_input": "tool input"
}}
```
""",
                ),
                MessagesPlaceholder(variable_name="chat_history", optional=True),
                ("human", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )

        # Create agent
        self.agent = create_structured_chat_agent(
            llm=self.model,
            tools=self.tools,
            prompt=prompt,
        )

        # Create agent executor
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            verbose=True,
            handle_parsing_errors=True,
        )

    def _get_default_tools(self) -> list[Tool]:
        """Get default tools for Web3 AI agent.

        Returns:
            List of default tools
        """
        return [
            Tool(
                name="web3_info",
                func=self._get_web3_info,
                description="Get information about Web3 concepts, blockchains, and smart contracts",
            ),
            Tool(
                name="blockchain_explorer",
                func=self._explore_blockchain,
                description="Explore blockchain data, transactions, and addresses",
            ),
            Tool(
                name="smart_contract_helper",
                func=self._smart_contract_help,
                description="Get help with smart contract development and best practices",
            ),
        ]

    def _get_web3_info(self, query: str) -> str:
        """Get Web3 information.

        Args:
            query: Information query

        Returns:
            Information about Web3 topic
        """
        # TODO: Implement actual Web3 information retrieval
        return f"Web3 information about: {query} - This is a placeholder implementation. Replace with actual Web3 knowledge base integration."

    def _explore_blockchain(self, query: str) -> str:
        """Explore blockchain data.

        Args:
            query: Blockchain query

        Returns:
            Blockchain exploration results
        """
        # TODO: Implement actual blockchain data exploration using web3.py or ethers
        return f"Blockchain exploration for: {query} - This is a placeholder implementation. Replace with actual blockchain API integration."

    def _smart_contract_help(self, query: str) -> str:
        """Get smart contract help.

        Args:
            query: Smart contract question

        Returns:
            Smart contract guidance
        """
        # TODO: Implement actual smart contract analysis and guidance
        return f"Smart contract help for: {query} - This is a placeholder implementation. Replace with actual Solidity analysis tools."

    async def run(self, input_text: str, chat_history: list | None = None) -> dict[str, Any]:
        """Run the agent with given input.

        Args:
            input_text: User input
            chat_history: Optional chat history

        Returns:
            Agent response with output and intermediate steps
        """
        result = await self.agent_executor.ainvoke(
            {"input": input_text, "chat_history": chat_history or []}
        )
        return result

    def add_tool(self, tool: Tool):
        """Add a tool to the agent.

        Args:
            tool: Tool to add
        """
        self.tools.append(tool)
        # Re-setup agent with new tools
        self._setup_agent()


class AIToolkit:
    """Collection of AI toolkits for different use cases."""

    @staticmethod
    def create_code_analysis_agent(provider: str = "claude") -> Web3AIAgent:
        """Create an agent specialized in code analysis.

        Args:
            provider: AI provider to use

        Returns:
            Configured code analysis agent
        """
        tools = [
            Tool(
                name="analyze_solidity",
                func=lambda x: f"Analyzing Solidity code: {x}",
                description="Analyze Solidity smart contract code for issues and improvements",
            ),
            Tool(
                name="security_audit",
                func=lambda x: f"Security audit for: {x}",
                description="Perform security audit on smart contract code",
            ),
            Tool(
                name="gas_optimization",
                func=lambda x: f"Gas optimization suggestions for: {x}",
                description="Suggest gas optimizations for smart contracts",
            ),
        ]
        return Web3AIAgent(provider=provider, tools=tools)

    @staticmethod
    def create_blockchain_analyst_agent(provider: str = "claude") -> Web3AIAgent:
        """Create an agent specialized in blockchain analysis.

        Args:
            provider: AI provider to use

        Returns:
            Configured blockchain analyst agent
        """
        tools = [
            Tool(
                name="transaction_analysis",
                func=lambda x: f"Analyzing transaction: {x}",
                description="Analyze blockchain transactions",
            ),
            Tool(
                name="wallet_analysis",
                func=lambda x: f"Analyzing wallet: {x}",
                description="Analyze wallet activity and holdings",
            ),
            Tool(
                name="protocol_analysis",
                func=lambda x: f"Analyzing protocol: {x}",
                description="Analyze DeFi protocols and smart contract systems",
            ),
        ]
        return Web3AIAgent(provider=provider, tools=tools)

    @staticmethod
    def create_developer_assistant_agent(provider: str = "claude") -> Web3AIAgent:
        """Create an agent to assist with development tasks.

        Args:
            provider: AI provider to use

        Returns:
            Configured developer assistant agent
        """
        tools = [
            Tool(
                name="code_generator",
                func=lambda x: f"Generating code for: {x}",
                description="Generate code snippets and boilerplate",
            ),
            Tool(
                name="debug_helper",
                func=lambda x: f"Debug help for: {x}",
                description="Help debug code issues",
            ),
            Tool(
                name="documentation_helper",
                func=lambda x: f"Documentation for: {x}",
                description="Generate documentation and comments",
            ),
        ]
        return Web3AIAgent(provider=provider, tools=tools)

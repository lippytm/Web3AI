"""AI tools and utilities for Claude and OpenAI integration."""

from collections.abc import AsyncIterator
from typing import Any

from langchain_anthropic import ChatAnthropic
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from app.settings import settings


class AIToolsManager:
    """Manager for AI tools supporting both OpenAI and Claude."""

    def __init__(self):
        """Initialize AI tools manager."""
        self.openai_model: ChatOpenAI | None = None
        self.claude_model: ChatAnthropic | None = None
        self._initialize_models()

    def _initialize_models(self):
        """Initialize AI models based on settings."""
        if settings.ai_provider in ["openai", "both"] and settings.openai_api_key:
            self.openai_model = ChatOpenAI(
                model=settings.model_name,
                api_key=settings.openai_api_key,
                temperature=0.7,
            )

        if settings.ai_provider in ["claude", "both"] and settings.anthropic_api_key:
            self.claude_model = ChatAnthropic(
                model=settings.claude_model_name,
                api_key=settings.anthropic_api_key,
                temperature=0.7,
            )

    def get_model(self, provider: str = "claude"):
        """Get AI model by provider.

        Args:
            provider: Provider name ("openai" or "claude")

        Returns:
            Initialized chat model

        Raises:
            ValueError: If provider is not configured
        """
        if provider == "openai":
            if not self.openai_model:
                raise ValueError("OpenAI model not configured")
            return self.openai_model
        elif provider == "claude":
            if not self.claude_model:
                raise ValueError("Claude model not configured")
            return self.claude_model
        else:
            raise ValueError(f"Unknown provider: {provider}")

    async def chat(
        self,
        messages: list[dict[str, str]],
        provider: str = "claude",
        system_prompt: str | None = None,
    ) -> str:
        """Send chat messages and get response.

        Args:
            messages: List of message dicts with 'role' and 'content'
            provider: AI provider to use ("openai" or "claude")
            system_prompt: Optional system prompt

        Returns:
            AI response text
        """
        model = self.get_model(provider)

        # Convert messages to LangChain format
        lc_messages: list[BaseMessage] = []
        if system_prompt:
            lc_messages.append(SystemMessage(content=system_prompt))

        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")

            if role == "user":
                lc_messages.append(HumanMessage(content=content))
            elif role == "assistant":
                lc_messages.append(AIMessage(content=content))
            elif role == "system":
                lc_messages.append(SystemMessage(content=content))

        # Get response
        response = await model.ainvoke(lc_messages)
        # Ensure response content is a string
        content = response.content
        if isinstance(content, list):
            # Handle multi-part content by joining
            content = " ".join(str(part) for part in content)
        return str(content)

    async def stream_chat(
        self,
        messages: list[dict[str, str]],
        provider: str = "claude",
        system_prompt: str | None = None,
    ) -> AsyncIterator[str]:
        """Stream chat messages and get response.

        Args:
            messages: List of message dicts with 'role' and 'content'
            provider: AI provider to use ("openai" or "claude")
            system_prompt: Optional system prompt

        Yields:
            Response chunks as they arrive
        """
        model = self.get_model(provider)

        # Convert messages to LangChain format
        lc_messages: list[BaseMessage] = []
        if system_prompt:
            lc_messages.append(SystemMessage(content=system_prompt))

        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")

            if role == "user":
                lc_messages.append(HumanMessage(content=content))
            elif role == "assistant":
                lc_messages.append(AIMessage(content=content))
            elif role == "system":
                lc_messages.append(SystemMessage(content=content))

        # Stream response
        async for chunk in model.astream(lc_messages):
            if hasattr(chunk, "content"):
                yield chunk.content

    async def generate_with_template(
        self,
        template: str,
        variables: dict[str, Any],
        provider: str = "claude",
    ) -> str:
        """Generate response using a prompt template.

        Args:
            template: Prompt template string with variables
            variables: Dictionary of variables to fill template
            provider: AI provider to use ("openai" or "claude")

        Returns:
            AI response text
        """
        model = self.get_model(provider)

        prompt = ChatPromptTemplate.from_template(template)
        chain = prompt | model

        response = await chain.ainvoke(variables)
        # Ensure response content is a string
        content = response.content
        if isinstance(content, list):
            # Handle multi-part content by joining
            content = " ".join(str(part) for part in content)
        return str(content)

    def get_available_providers(self) -> list[str]:
        """Get list of available AI providers.

        Returns:
            List of configured provider names
        """
        providers = []
        if self.openai_model:
            providers.append("openai")
        if self.claude_model:
            providers.append("claude")
        return providers


# Global AI tools manager instance
ai_tools = AIToolsManager()

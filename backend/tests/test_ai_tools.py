"""Tests for AI tools and Claude integration."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from app.ai_tools import AIToolsManager


class TestAIToolsManager:
    """Tests for AIToolsManager class."""

    @patch("app.ai_tools.settings")
    def test_initialization_with_both_providers(self, mock_settings):
        """Test initialization with both OpenAI and Claude."""
        mock_settings.ai_provider = "both"
        mock_settings.openai_api_key = "test-openai-key"
        mock_settings.anthropic_api_key = "test-anthropic-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatOpenAI"), patch("app.ai_tools.ChatAnthropic"):
            manager = AIToolsManager()
            assert manager.openai_model is not None
            assert manager.claude_model is not None

    @patch("app.ai_tools.settings")
    def test_initialization_with_claude_only(self, mock_settings):
        """Test initialization with Claude only."""
        mock_settings.ai_provider = "claude"
        mock_settings.openai_api_key = ""
        mock_settings.anthropic_api_key = "test-anthropic-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatAnthropic"):
            manager = AIToolsManager()
            assert manager.openai_model is None
            assert manager.claude_model is not None

    @patch("app.ai_tools.settings")
    def test_get_model_claude(self, mock_settings):
        """Test getting Claude model."""
        mock_settings.ai_provider = "claude"
        mock_settings.openai_api_key = ""
        mock_settings.anthropic_api_key = "test-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatAnthropic") as mock_claude:
            mock_model = MagicMock()
            mock_claude.return_value = mock_model

            manager = AIToolsManager()
            model = manager.get_model("claude")
            assert model == mock_model

    @patch("app.ai_tools.settings")
    def test_get_model_invalid_provider(self, mock_settings):
        """Test getting model with invalid provider."""
        mock_settings.ai_provider = "both"
        mock_settings.openai_api_key = "test-key"
        mock_settings.anthropic_api_key = "test-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatOpenAI"), patch("app.ai_tools.ChatAnthropic"):
            manager = AIToolsManager()

            with pytest.raises(ValueError, match="Unknown provider"):
                manager.get_model("invalid")

    @patch("app.ai_tools.settings")
    @pytest.mark.asyncio
    async def test_chat(self, mock_settings):
        """Test chat functionality."""
        mock_settings.ai_provider = "claude"
        mock_settings.openai_api_key = ""
        mock_settings.anthropic_api_key = "test-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatAnthropic") as mock_claude:
            mock_model = MagicMock()
            mock_response = MagicMock()
            mock_response.content = "Test response"
            mock_model.ainvoke = AsyncMock(return_value=mock_response)
            mock_claude.return_value = mock_model

            manager = AIToolsManager()
            messages = [{"role": "user", "content": "Hello"}]
            response = await manager.chat(messages, provider="claude")

            assert response == "Test response"
            mock_model.ainvoke.assert_called_once()

    @patch("app.ai_tools.settings")
    def test_get_available_providers_both(self, mock_settings):
        """Test getting available providers when both are configured."""
        mock_settings.ai_provider = "both"
        mock_settings.openai_api_key = "test-key"
        mock_settings.anthropic_api_key = "test-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatOpenAI"), patch("app.ai_tools.ChatAnthropic"):
            manager = AIToolsManager()
            providers = manager.get_available_providers()

            assert "openai" in providers
            assert "claude" in providers
            assert len(providers) == 2

    @patch("app.ai_tools.settings")
    def test_get_available_providers_claude_only(self, mock_settings):
        """Test getting available providers when only Claude is configured."""
        mock_settings.ai_provider = "claude"
        mock_settings.openai_api_key = ""
        mock_settings.anthropic_api_key = "test-key"
        mock_settings.model_name = "gpt-4"
        mock_settings.claude_model_name = "claude-3-5-sonnet-20241022"

        with patch("app.ai_tools.ChatAnthropic"):
            manager = AIToolsManager()
            providers = manager.get_available_providers()

            assert "claude" in providers
            assert "openai" not in providers
            assert len(providers) == 1

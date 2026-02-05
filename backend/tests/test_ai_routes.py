"""Tests for AI API routes."""

from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestAIRoutes:
    """Tests for AI API routes."""

    @patch("app.ai_routes.ai_tools")
    def test_get_providers(self, mock_ai_tools):
        """Test getting available providers."""
        mock_ai_tools.get_available_providers.return_value = ["openai", "claude"]

        response = client.get("/api/ai/providers")

        assert response.status_code == 200
        data = response.json()
        assert "providers" in data
        assert "openai" in data["providers"]
        assert "claude" in data["providers"]

    @patch("app.ai_routes.ai_tools")
    def test_chat_endpoint(self, mock_ai_tools):
        """Test chat endpoint."""
        mock_ai_tools.chat = AsyncMock(return_value="Test AI response")

        response = client.post(
            "/api/ai/chat",
            json={
                "messages": [{"role": "user", "content": "Hello"}],
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["response"] == "Test AI response"
        assert data["provider"] == "claude"

    @patch("app.ai_routes.ai_tools")
    def test_chat_endpoint_with_system_prompt(self, mock_ai_tools):
        """Test chat endpoint with system prompt."""
        mock_ai_tools.chat = AsyncMock(return_value="Test response")

        response = client.post(
            "/api/ai/chat",
            json={
                "messages": [{"role": "user", "content": "Hello"}],
                "provider": "claude",
                "system_prompt": "You are a helpful assistant",
            },
        )

        assert response.status_code == 200
        mock_ai_tools.chat.assert_called_once()

    @patch("app.ai_routes.ai_tools")
    def test_chat_endpoint_invalid_provider(self, mock_ai_tools):
        """Test chat endpoint with invalid provider."""
        mock_ai_tools.chat = AsyncMock(side_effect=ValueError("Claude model not configured"))

        response = client.post(
            "/api/ai/chat",
            json={
                "messages": [{"role": "user", "content": "Hello"}],
                "provider": "claude",
            },
        )

        assert response.status_code == 400
        assert "not configured" in response.json()["detail"]

    def test_chat_endpoint_stream_not_supported(self):
        """Test that stream=true is not supported in regular chat endpoint."""
        response = client.post(
            "/api/ai/chat",
            json={
                "messages": [{"role": "user", "content": "Hello"}],
                "provider": "claude",
                "stream": True,
            },
        )

        assert response.status_code == 400
        assert "streaming" in response.json()["detail"].lower()

    @patch("app.ai_routes.ai_tools")
    def test_generate_with_template(self, mock_ai_tools):
        """Test template generation endpoint."""
        mock_ai_tools.generate_with_template = AsyncMock(return_value="Generated response")

        response = client.post(
            "/api/ai/generate",
            json={
                "template": "Hello {name}, you are {age} years old",
                "variables": {"name": "Alice", "age": 30},
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["response"] == "Generated response"
        assert data["provider"] == "claude"

    @patch("app.ai_agents.Web3AIAgent")
    def test_run_agent_general(self, mock_agent_class):
        """Test running general agent."""
        mock_agent = mock_agent_class.return_value
        mock_agent.run = AsyncMock(
            return_value={"output": "Agent response", "intermediate_steps": []}
        )

        response = client.post(
            "/api/ai/agent",
            json={
                "input": "What is Ethereum?",
                "agent_type": "general",
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["output"] == "Agent response"
        assert "intermediate_steps" in data

    @patch("app.ai_routes.AIToolkit")
    def test_run_agent_code_analysis(self, mock_toolkit):
        """Test running code analysis agent."""
        mock_agent = mock_toolkit.create_code_analysis_agent.return_value
        mock_agent.run = AsyncMock(
            return_value={"output": "Code analysis result", "intermediate_steps": []}
        )

        response = client.post(
            "/api/ai/agent",
            json={
                "input": "Analyze this Solidity code",
                "agent_type": "code_analysis",
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["output"] == "Code analysis result"

    @patch("app.ai_routes.AIToolkit")
    def test_run_agent_blockchain_analyst(self, mock_toolkit):
        """Test running blockchain analyst agent."""
        mock_agent = mock_toolkit.create_blockchain_analyst_agent.return_value
        mock_agent.run = AsyncMock(
            return_value={"output": "Blockchain analysis", "intermediate_steps": []}
        )

        response = client.post(
            "/api/ai/agent",
            json={
                "input": "Analyze this transaction",
                "agent_type": "blockchain_analyst",
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["output"] == "Blockchain analysis"

    @patch("app.ai_routes.AIToolkit")
    def test_run_agent_developer_assistant(self, mock_toolkit):
        """Test running developer assistant agent."""
        mock_agent = mock_toolkit.create_developer_assistant_agent.return_value
        mock_agent.run = AsyncMock(
            return_value={"output": "Development help", "intermediate_steps": []}
        )

        response = client.post(
            "/api/ai/agent",
            json={
                "input": "Generate a function to calculate gas fees",
                "agent_type": "developer_assistant",
                "provider": "claude",
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["output"] == "Development help"

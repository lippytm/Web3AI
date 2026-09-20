"""Tests for main application."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root():
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Web3AI API"
    assert "version" in data
    assert data["assistant"]["name"] == "AI Jarvis Assistant"
    assert data["assistant"]["tool_count"] >= 1


def test_health_check():
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_api_info():
    """Test API info endpoint."""
    response = client.get("/api/info")
    assert response.status_code == 200
    data = response.json()
    assert "app_name" in data
    assert "version" in data
    assert data["assistant"]["free_tools"]


def test_assistant_info():
    """Test assistant info endpoint."""
    response = client.get("/api/assistant")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "AI Jarvis Assistant"
    assert "Prompt Lab" in data["free_tools"]

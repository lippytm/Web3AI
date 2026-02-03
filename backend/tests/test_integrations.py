"""Tests for platform integration routes."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


# ManyChat Tests
def test_manychat_info():
    """Test ManyChat integration info endpoint."""
    response = client.get("/integrations/manychat/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "ManyChat"
    assert data["status"] == "active"
    assert "endpoints" in data


def test_manychat_webhook():
    """Test ManyChat webhook endpoint."""
    payload = {
        "id": "msg_123",
        "subscriber_id": "sub_456",
        "text": "Hello",
        "timestamp": "2024-01-01T00:00:00",
        "type": "text",
    }
    response = client.post("/integrations/manychat/webhook", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert "content" in data


def test_manychat_send_message():
    """Test ManyChat send message endpoint."""
    payload = {"subscriber_id": "sub_123", "text": "Test message"}
    response = client.post("/integrations/manychat/send-message", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["subscriber_id"] == "sub_123"


# BotBuilders Tests
def test_botbuilders_info():
    """Test BotBuilders integration info endpoint."""
    response = client.get("/integrations/botbuilders/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "BotBuilders"
    assert data["status"] == "active"
    assert "endpoints" in data


def test_botbuilders_webhook():
    """Test BotBuilders webhook endpoint."""
    payload = {
        "message_id": "msg_123",
        "user_id": "user_456",
        "content": "Hello",
        "timestamp": "2024-01-01T00:00:00",
        "channel": "web",
    }
    response = client.post("/integrations/botbuilders/webhook", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "message_type" in data
    assert "content" in data


def test_botbuilders_send_message():
    """Test BotBuilders send message endpoint."""
    payload = {"user_id": "user_123", "content": "Test message", "message_type": "text"}
    response = client.post("/integrations/botbuilders/send-message", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["user_id"] == "user_123"


# OpenClaw Tests
def test_openclaw_info():
    """Test OpenClaw integration info endpoint."""
    response = client.get("/integrations/openclaw/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "OpenClaw"
    assert data["status"] == "active"
    assert "endpoints" in data


def test_openclaw_webhook():
    """Test OpenClaw webhook endpoint."""
    payload = {
        "id": "msg_123",
        "session_id": "sess_456",
        "user_message": "Hello",
        "timestamp": "2024-01-01T00:00:00",
        "context": {},
    }
    response = client.post("/integrations/openclaw/webhook", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "response_type" in data
    assert "data" in data


def test_openclaw_send_message():
    """Test OpenClaw send message endpoint."""
    payload = {"session_id": "sess_123", "message": "Test message", "context": {}}
    response = client.post("/integrations/openclaw/send-message", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["session_id"] == "sess_123"


def test_openclaw_create_session():
    """Test OpenClaw create session endpoint."""
    payload = {"user_id": "user_123", "metadata": {"test": "value"}}
    response = client.post("/integrations/openclaw/session/create", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["user_id"] == "user_123"


# MoltBook Tests
def test_moltbook_info():
    """Test MoltBook integration info endpoint."""
    response = client.get("/integrations/moltbook/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "MoltBook"
    assert data["status"] == "active"
    assert "endpoints" in data


def test_moltbook_webhook():
    """Test MoltBook webhook endpoint."""
    payload = {
        "message_id": "msg_123",
        "conversation_id": "conv_456",
        "sender_id": "user_789",
        "text": "Hello",
        "timestamp": "2024-01-01T00:00:00",
        "message_type": "text",
    }
    response = client.post("/integrations/moltbook/webhook", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "type" in data
    assert "content" in data


def test_moltbook_send_message():
    """Test MoltBook send message endpoint."""
    payload = {"conversation_id": "conv_123", "text": "Test message"}
    response = client.post("/integrations/moltbook/send-message", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["conversation_id"] == "conv_123"


def test_moltbook_create_conversation():
    """Test MoltBook create conversation endpoint."""
    payload = {
        "participants": ["user_1", "user_2"],
        "title": "Test Conversation",
        "metadata": {},
    }
    response = client.post("/integrations/moltbook/conversation/create", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "conversation_id" in data
    assert len(data["participants"]) == 2

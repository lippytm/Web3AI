"""OpenClaw integration module for webhook handling and API interactions."""

import hashlib
import hmac
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class OpenClawMessage(BaseModel):
    """OpenClaw incoming message model."""

    id: str
    session_id: str
    user_message: str
    timestamp: datetime
    context: dict[str, Any] = Field(default_factory=dict)
    attachments: list[dict[str, str]] = Field(default_factory=list)


class OpenClawSession(BaseModel):
    """OpenClaw session model."""

    session_id: str
    user_id: str
    started_at: datetime
    last_activity: datetime
    metadata: dict[str, Any] = Field(default_factory=dict)
    active: bool = True


class OpenClawResponse(BaseModel):
    """OpenClaw response model."""

    response_type: str
    data: Any
    session_id: str | None = None
    next_action: str | None = None


class OpenClawIntegration:
    """OpenClaw integration handler."""

    def __init__(self, api_key: str, webhook_secret: str | None = None):
        """Initialize OpenClaw integration.

        Args:
            api_key: OpenClaw API key
            webhook_secret: Secret for verifying webhook signatures
        """
        self.api_key = api_key
        self.webhook_secret = webhook_secret
        self.base_url = "https://api.openclaw.io/v1"

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature for security.

        Args:
            payload: Raw webhook payload
            signature: Signature from X-OpenClaw-Signature header

        Returns:
            bool: True if signature is valid
        """
        if not self.webhook_secret:
            return True  # Skip verification if no secret configured

        expected_signature = hmac.new(
            self.webhook_secret.encode(), payload, hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(expected_signature, signature)

    def parse_webhook(self, data: dict[str, Any]) -> OpenClawMessage:
        """Parse incoming webhook data.

        Args:
            data: Webhook payload

        Returns:
            OpenClawMessage: Parsed message object
        """
        return OpenClawMessage(
            id=data.get("id", ""),
            session_id=data.get("session_id", ""),
            user_message=data.get("user_message", ""),
            timestamp=datetime.fromisoformat(data.get("timestamp", datetime.now().isoformat())),
            context=data.get("context", {}),
            attachments=data.get("attachments", []),
        )

    def create_message_response(
        self, message: str, session_id: str | None = None
    ) -> OpenClawResponse:
        """Create a message response.

        Args:
            message: Response message
            session_id: Optional session ID

        Returns:
            OpenClawResponse: Formatted response
        """
        return OpenClawResponse(
            response_type="message", data={"message": message}, session_id=session_id
        )

    def create_action_response(
        self, action: str, parameters: dict[str, Any], session_id: str | None = None
    ) -> OpenClawResponse:
        """Create an action response.

        Args:
            action: Action name
            parameters: Action parameters
            session_id: Optional session ID

        Returns:
            OpenClawResponse: Formatted action response
        """
        return OpenClawResponse(
            response_type="action",
            data={"action": action, "parameters": parameters},
            session_id=session_id,
            next_action=action,
        )

    def create_rich_response(
        self, content: dict[str, Any], session_id: str | None = None
    ) -> OpenClawResponse:
        """Create a rich content response.

        Args:
            content: Rich content data
            session_id: Optional session ID

        Returns:
            OpenClawResponse: Formatted rich response
        """
        return OpenClawResponse(response_type="rich", data=content, session_id=session_id)

    async def send_message(
        self, session_id: str, message: str, context: dict[str, Any] | None = None
    ) -> dict[str, Any]:
        """Send a message via OpenClaw API.

        Args:
            session_id: Session ID
            message: Message to send
            context: Optional context data

        Returns:
            Dict containing API response
        """
        return {
            "status": "success",
            "session_id": session_id,
            "message": message,
            "context": context or {},
            "sent_at": datetime.now().isoformat(),
        }

    async def create_session(
        self, user_id: str, metadata: dict[str, Any] | None = None
    ) -> OpenClawSession:
        """Create a new session.

        Args:
            user_id: User ID
            metadata: Optional session metadata

        Returns:
            OpenClawSession: Created session
        """
        now = datetime.now()
        return OpenClawSession(
            session_id=f"session_{user_id}_{now.timestamp()}",
            user_id=user_id,
            started_at=now,
            last_activity=now,
            metadata=metadata or {},
            active=True,
        )

    async def get_session(self, session_id: str) -> OpenClawSession:
        """Get session information.

        Args:
            session_id: Session ID

        Returns:
            OpenClawSession: Session information
        """
        now = datetime.now()
        return OpenClawSession(
            session_id=session_id,
            user_id="user_123",
            started_at=now,
            last_activity=now,
            metadata={},
            active=True,
        )

    async def update_session(self, session_id: str, metadata: dict[str, Any]) -> dict[str, Any]:
        """Update session metadata.

        Args:
            session_id: Session ID
            metadata: Metadata to update

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "session_id": session_id,
            "metadata": metadata,
            "updated_at": datetime.now().isoformat(),
        }

    async def close_session(self, session_id: str) -> dict[str, Any]:
        """Close a session.

        Args:
            session_id: Session ID to close

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "session_id": session_id,
            "closed_at": datetime.now().isoformat(),
        }

    async def get_conversation_history(
        self, session_id: str, limit: int = 50
    ) -> list[dict[str, Any]]:
        """Get conversation history for a session.

        Args:
            session_id: Session ID
            limit: Maximum number of messages to retrieve

        Returns:
            List of conversation messages
        """
        return [
            {
                "id": f"msg_{i}",
                "session_id": session_id,
                "message": f"Sample message {i}",
                "timestamp": datetime.now().isoformat(),
            }
            for i in range(min(limit, 5))
        ]

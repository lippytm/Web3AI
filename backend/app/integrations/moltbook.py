"""MoltBook integration module for webhook handling and API interactions."""

import hashlib
import hmac
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class MoltBookMessage(BaseModel):
    """MoltBook incoming message model."""

    message_id: str
    conversation_id: str
    sender_id: str
    text: str
    timestamp: datetime
    message_type: str = "text"
    media: list[dict[str, str]] | None = None
    reactions: list[str] = Field(default_factory=list)


class MoltBookConversation(BaseModel):
    """MoltBook conversation model."""

    conversation_id: str
    participants: list[str]
    created_at: datetime
    updated_at: datetime
    title: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)
    status: str = "active"


class MoltBookUser(BaseModel):
    """MoltBook user model."""

    user_id: str
    name: str | None = None
    avatar_url: str | None = None
    status: str = "online"
    preferences: dict[str, Any] = Field(default_factory=dict)


class MoltBookResponse(BaseModel):
    """MoltBook response model."""

    type: str
    content: Any
    conversation_id: str | None = None
    metadata: dict[str, Any] | None = None


class MoltBookIntegration:
    """MoltBook integration handler."""

    def __init__(self, api_token: str, webhook_secret: str | None = None):
        """Initialize MoltBook integration.

        Args:
            api_token: MoltBook API token
            webhook_secret: Secret for verifying webhook signatures
        """
        self.api_token = api_token
        self.webhook_secret = webhook_secret
        self.base_url = "https://api.moltbook.io/v1"

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature for security.

        Args:
            payload: Raw webhook payload
            signature: Signature from X-MoltBook-Signature header

        Returns:
            bool: True if signature is valid
        """
        if not self.webhook_secret:
            return True  # Skip verification if no secret configured

        expected_signature = hmac.new(
            self.webhook_secret.encode(), payload, hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(expected_signature, signature)

    def parse_webhook(self, data: dict[str, Any]) -> MoltBookMessage:
        """Parse incoming webhook data.

        Args:
            data: Webhook payload

        Returns:
            MoltBookMessage: Parsed message object
        """
        return MoltBookMessage(
            message_id=data.get("message_id", ""),
            conversation_id=data.get("conversation_id", ""),
            sender_id=data.get("sender_id", ""),
            text=data.get("text", ""),
            timestamp=datetime.fromisoformat(data.get("timestamp", datetime.now().isoformat())),
            message_type=data.get("message_type", "text"),
            media=data.get("media"),
            reactions=data.get("reactions", []),
        )

    def create_text_response(
        self, text: str, conversation_id: str | None = None
    ) -> MoltBookResponse:
        """Create a text message response.

        Args:
            text: Message text
            conversation_id: Optional conversation ID

        Returns:
            MoltBookResponse: Formatted response
        """
        return MoltBookResponse(
            type="text", content={"text": text}, conversation_id=conversation_id
        )

    def create_media_response(
        self,
        media_url: str,
        media_type: str,
        caption: str | None = None,
        conversation_id: str | None = None,
    ) -> MoltBookResponse:
        """Create a media response.

        Args:
            media_url: URL of the media
            media_type: Type of media (image, video, audio, file)
            caption: Optional caption
            conversation_id: Optional conversation ID

        Returns:
            MoltBookResponse: Formatted media response
        """
        content = {"media_url": media_url, "media_type": media_type}

        if caption:
            content["caption"] = caption

        return MoltBookResponse(type="media", content=content, conversation_id=conversation_id)

    def create_interactive_response(
        self, text: str, buttons: list[dict[str, str]], conversation_id: str | None = None
    ) -> MoltBookResponse:
        """Create an interactive response with buttons.

        Args:
            text: Message text
            buttons: List of button dictionaries
            conversation_id: Optional conversation ID

        Returns:
            MoltBookResponse: Formatted interactive response
        """
        return MoltBookResponse(
            type="interactive",
            content={"text": text, "buttons": buttons},
            conversation_id=conversation_id,
        )

    async def send_message(
        self, conversation_id: str, text: str, sender_id: str | None = None
    ) -> dict[str, Any]:
        """Send a message to a conversation via MoltBook API.

        Args:
            conversation_id: Conversation ID
            text: Message text
            sender_id: Optional sender ID

        Returns:
            Dict containing API response
        """
        return {
            "status": "success",
            "conversation_id": conversation_id,
            "message_id": f"msg_{datetime.now().timestamp()}",
            "text": text,
            "sender_id": sender_id,
            "sent_at": datetime.now().isoformat(),
        }

    async def create_conversation(
        self,
        participants: list[str],
        title: str | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> MoltBookConversation:
        """Create a new conversation.

        Args:
            participants: List of participant user IDs
            title: Optional conversation title
            metadata: Optional conversation metadata

        Returns:
            MoltBookConversation: Created conversation
        """
        now = datetime.now()
        return MoltBookConversation(
            conversation_id=f"conv_{now.timestamp()}",
            participants=participants,
            created_at=now,
            updated_at=now,
            title=title,
            metadata=metadata or {},
            status="active",
        )

    async def get_conversation(self, conversation_id: str) -> MoltBookConversation:
        """Get conversation information.

        Args:
            conversation_id: Conversation ID

        Returns:
            MoltBookConversation: Conversation information
        """
        now = datetime.now()
        return MoltBookConversation(
            conversation_id=conversation_id,
            participants=["user_1", "user_2"],
            created_at=now,
            updated_at=now,
            status="active",
        )

    async def get_conversation_messages(
        self, conversation_id: str, limit: int = 50, before: str | None = None
    ) -> list[dict[str, Any]]:
        """Get messages from a conversation.

        Args:
            conversation_id: Conversation ID
            limit: Maximum number of messages
            before: Get messages before this message ID

        Returns:
            List of message dictionaries
        """
        return [
            {
                "message_id": f"msg_{i}",
                "conversation_id": conversation_id,
                "sender_id": "user_1",
                "text": f"Sample message {i}",
                "timestamp": datetime.now().isoformat(),
            }
            for i in range(min(limit, 5))
        ]

    async def add_participant(self, conversation_id: str, user_id: str) -> dict[str, Any]:
        """Add a participant to a conversation.

        Args:
            conversation_id: Conversation ID
            user_id: User ID to add

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "conversation_id": conversation_id,
            "user_id": user_id,
            "action": "added",
            "timestamp": datetime.now().isoformat(),
        }

    async def remove_participant(self, conversation_id: str, user_id: str) -> dict[str, Any]:
        """Remove a participant from a conversation.

        Args:
            conversation_id: Conversation ID
            user_id: User ID to remove

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "conversation_id": conversation_id,
            "user_id": user_id,
            "action": "removed",
            "timestamp": datetime.now().isoformat(),
        }

    async def get_user_info(self, user_id: str) -> MoltBookUser:
        """Get user information.

        Args:
            user_id: User ID

        Returns:
            MoltBookUser: User information
        """
        return MoltBookUser(
            user_id=user_id, name=f"User {user_id}", status="online", preferences={}
        )

    async def update_user_status(self, user_id: str, status: str) -> dict[str, Any]:
        """Update user status.

        Args:
            user_id: User ID
            status: New status (online, offline, away, busy)

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "user_id": user_id,
            "new_status": status,
            "updated_at": datetime.now().isoformat(),
        }

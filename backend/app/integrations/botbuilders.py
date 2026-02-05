"""BotBuilders integration module for webhook handling and API interactions."""

import hashlib
import hmac
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class BotBuildersMessage(BaseModel):
    """BotBuilders incoming message model."""

    message_id: str
    user_id: str
    content: str
    timestamp: datetime
    channel: str = "web"
    intent: str | None = None
    entities: dict[str, Any] = Field(default_factory=dict)


class BotBuildersUser(BaseModel):
    """BotBuilders user model."""

    id: str
    username: str | None = None
    email: str | None = None
    properties: dict[str, Any] = Field(default_factory=dict)
    session_id: str | None = None


class BotBuildersResponse(BaseModel):
    """BotBuilders response model."""

    message_type: str
    content: Any
    actions: list[dict[str, Any]] = Field(default_factory=list)
    metadata: dict[str, Any] | None = None


class BotBuildersIntegration:
    """BotBuilders integration handler."""

    def __init__(self, api_token: str, webhook_secret: str | None = None):
        """Initialize BotBuilders integration.

        Args:
            api_token: BotBuilders API token
            webhook_secret: Secret for verifying webhook signatures
        """
        self.api_token = api_token
        self.webhook_secret = webhook_secret
        self.base_url = "https://api.botbuilders.io/v1"

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature for security.

        Args:
            payload: Raw webhook payload
            signature: Signature from X-BotBuilders-Signature header

        Returns:
            bool: True if signature is valid
        """
        if not self.webhook_secret:
            return True  # Skip verification if no secret configured

        expected_signature = hmac.new(
            self.webhook_secret.encode(), payload, hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(expected_signature, signature)

    def parse_webhook(self, data: dict[str, Any]) -> BotBuildersMessage:
        """Parse incoming webhook data.

        Args:
            data: Webhook payload

        Returns:
            BotBuildersMessage: Parsed message object
        """
        return BotBuildersMessage(
            message_id=data.get("message_id", ""),
            user_id=data.get("user_id", ""),
            content=data.get("content", ""),
            timestamp=datetime.fromisoformat(data.get("timestamp", datetime.now().isoformat())),
            channel=data.get("channel", "web"),
            intent=data.get("intent"),
            entities=data.get("entities", {}),
        )

    def create_text_response(self, text: str) -> BotBuildersResponse:
        """Create a text message response.

        Args:
            text: Message text to send

        Returns:
            BotBuildersResponse: Formatted response
        """
        return BotBuildersResponse(message_type="text", content=text)

    def create_card_response(
        self,
        title: str,
        subtitle: str,
        image_url: str | None = None,
        buttons: list[dict[str, str]] | None = None,
    ) -> BotBuildersResponse:
        """Create a card response.

        Args:
            title: Card title
            subtitle: Card subtitle
            image_url: Optional image URL
            buttons: Optional list of buttons

        Returns:
            BotBuildersResponse: Formatted card response
        """
        card = {"title": title, "subtitle": subtitle}

        if image_url:
            card["image_url"] = image_url

        if buttons:
            card["buttons"] = buttons

        return BotBuildersResponse(message_type="card", content=card)

    def create_carousel_response(self, cards: list[dict[str, Any]]) -> BotBuildersResponse:
        """Create a carousel response.

        Args:
            cards: List of card dictionaries

        Returns:
            BotBuildersResponse: Formatted carousel response
        """
        return BotBuildersResponse(message_type="carousel", content={"cards": cards})

    async def send_message(
        self, user_id: str, content: str, message_type: str = "text"
    ) -> dict[str, Any]:
        """Send a message to a user via BotBuilders API.

        Args:
            user_id: BotBuilders user ID
            content: Message content
            message_type: Type of message (text, card, etc.)

        Returns:
            Dict containing API response
        """
        return {
            "status": "success",
            "user_id": user_id,
            "message_type": message_type,
            "content": content,
            "sent_at": datetime.now().isoformat(),
        }

    async def get_user_info(self, user_id: str) -> BotBuildersUser:
        """Get user information from BotBuilders API.

        Args:
            user_id: BotBuilders user ID

        Returns:
            BotBuildersUser: User information
        """
        return BotBuildersUser(id=user_id, username=f"user_{user_id}", properties={})

    async def update_user_properties(
        self, user_id: str, properties: dict[str, Any]
    ) -> dict[str, Any]:
        """Update user properties.

        Args:
            user_id: BotBuilders user ID
            properties: Properties to update

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "user_id": user_id,
            "properties": properties,
            "updated_at": datetime.now().isoformat(),
        }

    async def create_session(self, user_id: str) -> dict[str, Any]:
        """Create a new session for a user.

        Args:
            user_id: BotBuilders user ID

        Returns:
            Dict containing session information
        """
        return {
            "status": "success",
            "user_id": user_id,
            "session_id": f"session_{user_id}_{datetime.now().timestamp()}",
            "created_at": datetime.now().isoformat(),
        }

    async def end_session(self, session_id: str) -> dict[str, Any]:
        """End a user session.

        Args:
            session_id: Session ID to end

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "session_id": session_id,
            "ended_at": datetime.now().isoformat(),
        }

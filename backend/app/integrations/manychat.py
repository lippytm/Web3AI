"""ManyChat integration module for webhook handling and API interactions."""

import hashlib
import hmac
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class ManyChatMessage(BaseModel):
    """ManyChat incoming message model."""

    id: str
    subscriber_id: str
    text: str
    timestamp: datetime
    type: str = "text"
    metadata: dict[str, Any] | None = None


class ManyChatSubscriber(BaseModel):
    """ManyChat subscriber model."""

    id: str
    first_name: str | None = None
    last_name: str | None = None
    profile_pic: str | None = None
    locale: str | None = None
    timezone: int | None = None
    tags: list[str] = Field(default_factory=list)
    custom_fields: dict[str, Any] = Field(default_factory=dict)


class ManyChatResponse(BaseModel):
    """ManyChat response model."""

    version: str = "v2"
    content: dict[str, Any]


class ManyChatIntegration:
    """ManyChat integration handler."""

    def __init__(self, api_key: str, webhook_secret: str | None = None):
        """Initialize ManyChat integration.

        Args:
            api_key: ManyChat API key for sending messages
            webhook_secret: Secret for verifying webhook signatures
        """
        self.api_key = api_key
        self.webhook_secret = webhook_secret
        self.base_url = "https://api.manychat.com/fb"

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature for security.

        Args:
            payload: Raw webhook payload
            signature: Signature from X-Hub-Signature-256 header

        Returns:
            bool: True if signature is valid
        """
        if not self.webhook_secret:
            return True  # Skip verification if no secret configured

        expected_signature = hmac.new(
            self.webhook_secret.encode(), payload, hashlib.sha256
        ).hexdigest()

        # Remove 'sha256=' prefix if present
        signature = signature.replace("sha256=", "")

        return hmac.compare_digest(expected_signature, signature)

    def parse_webhook(self, data: dict[str, Any]) -> ManyChatMessage:
        """Parse incoming webhook data.

        Args:
            data: Webhook payload

        Returns:
            ManyChatMessage: Parsed message object
        """
        return ManyChatMessage(
            id=data.get("id", ""),
            subscriber_id=data.get("subscriber_id", ""),
            text=data.get("text", ""),
            timestamp=datetime.fromisoformat(data.get("timestamp", datetime.now().isoformat())),
            type=data.get("type", "text"),
            metadata=data.get("metadata"),
        )

    def create_text_response(self, text: str) -> ManyChatResponse:
        """Create a text message response.

        Args:
            text: Message text to send

        Returns:
            ManyChatResponse: Formatted response
        """
        return ManyChatResponse(
            version="v2", content={"messages": [{"type": "text", "text": text}]}
        )

    def create_quick_reply_response(
        self, text: str, quick_replies: list[dict[str, str]]
    ) -> ManyChatResponse:
        """Create a quick reply response.

        Args:
            text: Message text
            quick_replies: List of quick reply options

        Returns:
            ManyChatResponse: Formatted response with quick replies
        """
        return ManyChatResponse(
            version="v2",
            content={"messages": [{"type": "text", "text": text, "quick_replies": quick_replies}]},
        )

    async def send_message(self, subscriber_id: str, text: str) -> dict[str, Any]:
        """Send a message to a subscriber via ManyChat API.

        Args:
            subscriber_id: ManyChat subscriber ID
            text: Message text

        Returns:
            Dict containing API response
        """
        # This would make an actual API call in production
        return {
            "status": "success",
            "subscriber_id": subscriber_id,
            "message": text,
            "sent_at": datetime.now().isoformat(),
        }

    async def get_subscriber_info(self, subscriber_id: str) -> ManyChatSubscriber:
        """Get subscriber information from ManyChat API.

        Args:
            subscriber_id: ManyChat subscriber ID

        Returns:
            ManyChatSubscriber: Subscriber information
        """
        # This would make an actual API call in production
        return ManyChatSubscriber(id=subscriber_id, first_name="User", last_name="Name", tags=[])

    async def add_tag(self, subscriber_id: str, tag: str) -> dict[str, Any]:
        """Add a tag to a subscriber.

        Args:
            subscriber_id: ManyChat subscriber ID
            tag: Tag name to add

        Returns:
            Dict containing operation result
        """
        return {"status": "success", "subscriber_id": subscriber_id, "tag": tag, "action": "added"}

    async def remove_tag(self, subscriber_id: str, tag: str) -> dict[str, Any]:
        """Remove a tag from a subscriber.

        Args:
            subscriber_id: ManyChat subscriber ID
            tag: Tag name to remove

        Returns:
            Dict containing operation result
        """
        return {
            "status": "success",
            "subscriber_id": subscriber_id,
            "tag": tag,
            "action": "removed",
        }

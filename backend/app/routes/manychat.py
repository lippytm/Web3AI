"""ManyChat webhook and API routes."""

from typing import Any

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.integrations.manychat import ManyChatIntegration
from app.settings import settings

router = APIRouter(prefix="/integrations/manychat", tags=["ManyChat"])


# Initialize integration
def get_manychat_integration() -> ManyChatIntegration:
    """Get ManyChat integration instance."""
    return ManyChatIntegration(
        api_key=settings.manychat_api_key, webhook_secret=settings.manychat_webhook_secret
    )


class WebhookPayload(BaseModel):
    """ManyChat webhook payload model."""

    id: str
    subscriber_id: str
    text: str
    timestamp: str
    type: str = "text"
    metadata: dict[str, Any] = {}


class SendMessageRequest(BaseModel):
    """Send message request model."""

    subscriber_id: str
    text: str


class TagRequest(BaseModel):
    """Tag management request model."""

    subscriber_id: str
    tag: str


@router.post("/webhook")
async def manychat_webhook(request: Request, x_hub_signature_256: str = Header(None)):
    """Handle ManyChat webhook callbacks.

    This endpoint receives messages and events from ManyChat.
    """
    integration = get_manychat_integration()

    # Get raw body for signature verification
    body = await request.body()

    # Verify webhook signature if secret is configured
    if x_hub_signature_256:
        if not integration.verify_webhook_signature(body, x_hub_signature_256):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

    # Parse webhook data
    data = await request.json()
    message = integration.parse_webhook(data)

    # Process the message (example: echo back)
    response = integration.create_text_response(f"You said: {message.text}")

    return response.model_dump()


@router.post("/send-message")
async def send_message(request: SendMessageRequest):
    """Send a message to a ManyChat subscriber.

    Args:
        request: Message request with subscriber_id and text

    Returns:
        API response with message status
    """
    integration = get_manychat_integration()
    result = await integration.send_message(subscriber_id=request.subscriber_id, text=request.text)
    return result


@router.get("/subscriber/{subscriber_id}")
async def get_subscriber(subscriber_id: str):
    """Get subscriber information from ManyChat.

    Args:
        subscriber_id: ManyChat subscriber ID

    Returns:
        Subscriber information
    """
    integration = get_manychat_integration()
    subscriber = await integration.get_subscriber_info(subscriber_id)
    return subscriber.model_dump()


@router.post("/tag/add")
async def add_tag(request: TagRequest):
    """Add a tag to a subscriber.

    Args:
        request: Tag request with subscriber_id and tag name

    Returns:
        Operation result
    """
    integration = get_manychat_integration()
    result = await integration.add_tag(subscriber_id=request.subscriber_id, tag=request.tag)
    return result


@router.post("/tag/remove")
async def remove_tag(request: TagRequest):
    """Remove a tag from a subscriber.

    Args:
        request: Tag request with subscriber_id and tag name

    Returns:
        Operation result
    """
    integration = get_manychat_integration()
    result = await integration.remove_tag(subscriber_id=request.subscriber_id, tag=request.tag)
    return result


@router.get("/")
async def manychat_info():
    """Get ManyChat integration information."""
    return {
        "platform": "ManyChat",
        "status": "active",
        "endpoints": {
            "webhook": "/integrations/manychat/webhook",
            "send_message": "/integrations/manychat/send-message",
            "get_subscriber": "/integrations/manychat/subscriber/{subscriber_id}",
            "add_tag": "/integrations/manychat/tag/add",
            "remove_tag": "/integrations/manychat/tag/remove",
        },
    }

"""BotBuilders webhook and API routes."""

from typing import Any

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.integrations.botbuilders import BotBuildersIntegration
from app.settings import settings

router = APIRouter(prefix="/integrations/botbuilders", tags=["BotBuilders"])


# Initialize integration
def get_botbuilders_integration() -> BotBuildersIntegration:
    """Get BotBuilders integration instance."""
    return BotBuildersIntegration(
        api_token=settings.botbuilders_api_token, webhook_secret=settings.botbuilders_webhook_secret
    )


class WebhookPayload(BaseModel):
    """BotBuilders webhook payload model."""

    message_id: str
    user_id: str
    content: str
    timestamp: str
    channel: str = "web"
    intent: str = None
    entities: dict[str, Any] = {}


class SendMessageRequest(BaseModel):
    """Send message request model."""

    user_id: str
    content: str
    message_type: str = "text"


class UserPropertiesRequest(BaseModel):
    """User properties update request model."""

    user_id: str
    properties: dict[str, Any]


class SessionRequest(BaseModel):
    """Session management request model."""

    user_id: str


@router.post("/webhook")
async def botbuilders_webhook(request: Request, x_botbuilders_signature: str = Header(None)):
    """Handle BotBuilders webhook callbacks.

    This endpoint receives messages and events from BotBuilders.
    """
    integration = get_botbuilders_integration()

    # Get raw body for signature verification
    body = await request.body()

    # Verify webhook signature if secret is configured
    if x_botbuilders_signature:
        if not integration.verify_webhook_signature(body, x_botbuilders_signature):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

    # Parse webhook data
    data = await request.json()
    message = integration.parse_webhook(data)

    # Process the message (example: echo back)
    response = integration.create_text_response(f"You said: {message.content}")

    return response.model_dump()


@router.post("/send-message")
async def send_message(request: SendMessageRequest):
    """Send a message to a BotBuilders user.

    Args:
        request: Message request with user_id, content, and message_type

    Returns:
        API response with message status
    """
    integration = get_botbuilders_integration()
    result = await integration.send_message(
        user_id=request.user_id, content=request.content, message_type=request.message_type
    )
    return result


@router.get("/user/{user_id}")
async def get_user(user_id: str):
    """Get user information from BotBuilders.

    Args:
        user_id: BotBuilders user ID

    Returns:
        User information
    """
    integration = get_botbuilders_integration()
    user = await integration.get_user_info(user_id)
    return user.model_dump()


@router.post("/user/properties")
async def update_user_properties(request: UserPropertiesRequest):
    """Update user properties.

    Args:
        request: User properties request with user_id and properties

    Returns:
        Operation result
    """
    integration = get_botbuilders_integration()
    result = await integration.update_user_properties(
        user_id=request.user_id, properties=request.properties
    )
    return result


@router.post("/session/create")
async def create_session(request: SessionRequest):
    """Create a new session for a user.

    Args:
        request: Session request with user_id

    Returns:
        Session information
    """
    integration = get_botbuilders_integration()
    result = await integration.create_session(user_id=request.user_id)
    return result


@router.post("/session/end")
async def end_session(session_id: str):
    """End a user session.

    Args:
        session_id: Session ID to end

    Returns:
        Operation result
    """
    integration = get_botbuilders_integration()
    result = await integration.end_session(session_id=session_id)
    return result


@router.get("/")
async def botbuilders_info():
    """Get BotBuilders integration information."""
    return {
        "platform": "BotBuilders",
        "status": "active",
        "endpoints": {
            "webhook": "/integrations/botbuilders/webhook",
            "send_message": "/integrations/botbuilders/send-message",
            "get_user": "/integrations/botbuilders/user/{user_id}",
            "update_properties": "/integrations/botbuilders/user/properties",
            "create_session": "/integrations/botbuilders/session/create",
            "end_session": "/integrations/botbuilders/session/end",
        },
    }

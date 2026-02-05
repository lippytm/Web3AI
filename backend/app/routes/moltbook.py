"""MoltBook webhook and API routes."""

from typing import Any

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.integrations.moltbook import MoltBookIntegration
from app.settings import settings

router = APIRouter(prefix="/integrations/moltbook", tags=["MoltBook"])


# Initialize integration
def get_moltbook_integration() -> MoltBookIntegration:
    """Get MoltBook integration instance."""
    return MoltBookIntegration(
        api_token=settings.moltbook_api_token, webhook_secret=settings.moltbook_webhook_secret
    )


class WebhookPayload(BaseModel):
    """MoltBook webhook payload model."""

    message_id: str
    conversation_id: str
    sender_id: str
    text: str
    timestamp: str
    message_type: str = "text"
    media: list[dict[str, str]] | None = None
    reactions: list[str] = []


class SendMessageRequest(BaseModel):
    """Send message request model."""

    conversation_id: str
    text: str
    sender_id: str | None = None


class CreateConversationRequest(BaseModel):
    """Create conversation request model."""

    participants: list[str]
    title: str | None = None
    metadata: dict[str, Any] | None = None


class ParticipantRequest(BaseModel):
    """Participant management request model."""

    conversation_id: str
    user_id: str


class UserStatusRequest(BaseModel):
    """User status update request model."""

    user_id: str
    status: str


@router.post("/webhook")
async def moltbook_webhook(request: Request, x_moltbook_signature: str = Header(None)):
    """Handle MoltBook webhook callbacks.

    This endpoint receives messages and events from MoltBook.
    """
    integration = get_moltbook_integration()

    # Get raw body for signature verification
    body = await request.body()

    # Verify webhook signature if secret is configured
    if x_moltbook_signature:
        if not integration.verify_webhook_signature(body, x_moltbook_signature):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

    # Parse webhook data
    data = await request.json()
    message = integration.parse_webhook(data)

    # Process the message (example: echo back)
    response = integration.create_text_response(
        text=f"You said: {message.text}", conversation_id=message.conversation_id
    )

    return response.model_dump()


@router.post("/send-message")
async def send_message(request: SendMessageRequest):
    """Send a message to a MoltBook conversation.

    Args:
        request: Message request with conversation_id, text, and optional sender_id

    Returns:
        API response with message status
    """
    integration = get_moltbook_integration()
    result = await integration.send_message(
        conversation_id=request.conversation_id, text=request.text, sender_id=request.sender_id
    )
    return result


@router.post("/conversation/create")
async def create_conversation(request: CreateConversationRequest):
    """Create a new conversation.

    Args:
        request: Conversation creation request with participants, title, and metadata

    Returns:
        Created conversation information
    """
    integration = get_moltbook_integration()
    conversation = await integration.create_conversation(
        participants=request.participants, title=request.title, metadata=request.metadata
    )
    return conversation.model_dump()


@router.get("/conversation/{conversation_id}")
async def get_conversation(conversation_id: str):
    """Get conversation information.

    Args:
        conversation_id: Conversation ID

    Returns:
        Conversation information
    """
    integration = get_moltbook_integration()
    conversation = await integration.get_conversation(conversation_id)
    return conversation.model_dump()


@router.get("/conversation/{conversation_id}/messages")
async def get_conversation_messages(
    conversation_id: str, limit: int = 50, before: str | None = None
):
    """Get messages from a conversation.

    Args:
        conversation_id: Conversation ID
        limit: Maximum number of messages
        before: Get messages before this message ID

    Returns:
        List of message dictionaries
    """
    integration = get_moltbook_integration()
    messages = await integration.get_conversation_messages(
        conversation_id=conversation_id, limit=limit, before=before
    )
    return {"conversation_id": conversation_id, "messages": messages}


@router.post("/conversation/participant/add")
async def add_participant(request: ParticipantRequest):
    """Add a participant to a conversation.

    Args:
        request: Participant request with conversation_id and user_id

    Returns:
        Operation result
    """
    integration = get_moltbook_integration()
    result = await integration.add_participant(
        conversation_id=request.conversation_id, user_id=request.user_id
    )
    return result


@router.post("/conversation/participant/remove")
async def remove_participant(request: ParticipantRequest):
    """Remove a participant from a conversation.

    Args:
        request: Participant request with conversation_id and user_id

    Returns:
        Operation result
    """
    integration = get_moltbook_integration()
    result = await integration.remove_participant(
        conversation_id=request.conversation_id, user_id=request.user_id
    )
    return result


@router.get("/user/{user_id}")
async def get_user(user_id: str):
    """Get user information.

    Args:
        user_id: User ID

    Returns:
        User information
    """
    integration = get_moltbook_integration()
    user = await integration.get_user_info(user_id)
    return user.model_dump()


@router.post("/user/status")
async def update_user_status(request: UserStatusRequest):
    """Update user status.

    Args:
        request: Status update request with user_id and status

    Returns:
        Operation result
    """
    integration = get_moltbook_integration()
    result = await integration.update_user_status(user_id=request.user_id, status=request.status)
    return result


@router.get("/")
async def moltbook_info():
    """Get MoltBook integration information."""
    return {
        "platform": "MoltBook",
        "status": "active",
        "endpoints": {
            "webhook": "/integrations/moltbook/webhook",
            "send_message": "/integrations/moltbook/send-message",
            "create_conversation": "/integrations/moltbook/conversation/create",
            "get_conversation": "/integrations/moltbook/conversation/{conversation_id}",
            "get_messages": "/integrations/moltbook/conversation/{conversation_id}/messages",
            "add_participant": "/integrations/moltbook/conversation/participant/add",
            "remove_participant": "/integrations/moltbook/conversation/participant/remove",
            "get_user": "/integrations/moltbook/user/{user_id}",
            "update_status": "/integrations/moltbook/user/status",
        },
    }

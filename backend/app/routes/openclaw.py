"""OpenClaw webhook and API routes."""

from typing import Any

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.integrations.openclaw import OpenClawIntegration
from app.settings import settings

router = APIRouter(prefix="/integrations/openclaw", tags=["OpenClaw"])


# Initialize integration
def get_openclaw_integration() -> OpenClawIntegration:
    """Get OpenClaw integration instance."""
    return OpenClawIntegration(
        api_key=settings.openclaw_api_key, webhook_secret=settings.openclaw_webhook_secret
    )


class WebhookPayload(BaseModel):
    """OpenClaw webhook payload model."""

    id: str
    session_id: str
    user_message: str
    timestamp: str
    context: dict[str, Any] = {}
    attachments: list[dict[str, str]] = []


class SendMessageRequest(BaseModel):
    """Send message request model."""

    session_id: str
    message: str
    context: dict[str, Any] | None = None


class CreateSessionRequest(BaseModel):
    """Create session request model."""

    user_id: str
    metadata: dict[str, Any] | None = None


class UpdateSessionRequest(BaseModel):
    """Update session request model."""

    session_id: str
    metadata: dict[str, Any]


@router.post("/webhook")
async def openclaw_webhook(request: Request, x_openclaw_signature: str = Header(None)):
    """Handle OpenClaw webhook callbacks.

    This endpoint receives messages and events from OpenClaw.
    """
    integration = get_openclaw_integration()

    # Get raw body for signature verification
    body = await request.body()

    # Verify webhook signature if secret is configured
    if x_openclaw_signature:
        if not integration.verify_webhook_signature(body, x_openclaw_signature):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

    # Parse webhook data
    data = await request.json()
    message = integration.parse_webhook(data)

    # Process the message (example: echo back)
    response = integration.create_message_response(
        message=f"You said: {message.user_message}", session_id=message.session_id
    )

    return response.model_dump()


@router.post("/send-message")
async def send_message(request: SendMessageRequest):
    """Send a message via OpenClaw.

    Args:
        request: Message request with session_id, message, and optional context

    Returns:
        API response with message status
    """
    integration = get_openclaw_integration()
    result = await integration.send_message(
        session_id=request.session_id, message=request.message, context=request.context
    )
    return result


@router.post("/session/create")
async def create_session(request: CreateSessionRequest):
    """Create a new OpenClaw session.

    Args:
        request: Session creation request with user_id and optional metadata

    Returns:
        Created session information
    """
    integration = get_openclaw_integration()
    session = await integration.create_session(user_id=request.user_id, metadata=request.metadata)
    return session.model_dump()


@router.get("/session/{session_id}")
async def get_session(session_id: str):
    """Get session information.

    Args:
        session_id: Session ID

    Returns:
        Session information
    """
    integration = get_openclaw_integration()
    session = await integration.get_session(session_id)
    return session.model_dump()


@router.post("/session/update")
async def update_session(request: UpdateSessionRequest):
    """Update session metadata.

    Args:
        request: Update request with session_id and metadata

    Returns:
        Operation result
    """
    integration = get_openclaw_integration()
    result = await integration.update_session(
        session_id=request.session_id, metadata=request.metadata
    )
    return result


@router.post("/session/close")
async def close_session(session_id: str):
    """Close a session.

    Args:
        session_id: Session ID to close

    Returns:
        Operation result
    """
    integration = get_openclaw_integration()
    result = await integration.close_session(session_id=session_id)
    return result


@router.get("/session/{session_id}/history")
async def get_conversation_history(session_id: str, limit: int = 50):
    """Get conversation history for a session.

    Args:
        session_id: Session ID
        limit: Maximum number of messages to retrieve

    Returns:
        List of conversation messages
    """
    integration = get_openclaw_integration()
    history = await integration.get_conversation_history(session_id=session_id, limit=limit)
    return {"session_id": session_id, "messages": history}


@router.get("/")
async def openclaw_info():
    """Get OpenClaw integration information."""
    return {
        "platform": "OpenClaw",
        "status": "active",
        "endpoints": {
            "webhook": "/integrations/openclaw/webhook",
            "send_message": "/integrations/openclaw/send-message",
            "create_session": "/integrations/openclaw/session/create",
            "get_session": "/integrations/openclaw/session/{session_id}",
            "update_session": "/integrations/openclaw/session/update",
            "close_session": "/integrations/openclaw/session/close",
            "history": "/integrations/openclaw/session/{session_id}/history",
        },
    }

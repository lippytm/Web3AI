# Platform Integrations

Web3AI now includes comprehensive connectivity to multiple messaging and bot platforms. This document describes how to configure and use these integrations.

## Overview

The following platforms are now supported:
- **ManyChat** - Popular chatbot platform for Facebook Messenger, WhatsApp, and Instagram
- **BotBuilders** - Flexible bot building platform with multi-channel support
- **OpenClaw** - Session-based conversational AI platform
- **MoltBook** - Messaging and conversation management platform

## Configuration

### Environment Variables

Add the following configuration to your `backend/.env` file:

```env
# ManyChat Configuration
MANYCHAT_API_KEY=your-manychat-api-key
MANYCHAT_WEBHOOK_SECRET=your-manychat-webhook-secret

# BotBuilders Configuration
BOTBUILDERS_API_TOKEN=your-botbuilders-token
BOTBUILDERS_WEBHOOK_SECRET=your-botbuilders-webhook-secret

# OpenClaw Configuration
OPENCLAW_API_KEY=your-openclaw-api-key
OPENCLAW_WEBHOOK_SECRET=your-openclaw-webhook-secret

# MoltBook Configuration
MOLTBOOK_API_TOKEN=your-moltbook-token
MOLTBOOK_WEBHOOK_SECRET=your-moltbook-webhook-secret
```

All webhook secrets are optional but recommended for production environments. They are used to verify that webhook requests are genuinely coming from the platform.

## Platform Features

### ManyChat Integration

**Webhook URL**: `https://your-domain.com/integrations/manychat/webhook`

#### Features:
- Receive messages from ManyChat subscribers
- Send messages to subscribers
- Get subscriber information
- Add/remove tags from subscribers
- Quick reply support

#### API Endpoints:

```bash
# Get integration info
GET /integrations/manychat/

# Send a message
POST /integrations/manychat/send-message
{
  "subscriber_id": "sub_123",
  "text": "Your message here"
}

# Get subscriber info
GET /integrations/manychat/subscriber/{subscriber_id}

# Add tag to subscriber
POST /integrations/manychat/tag/add
{
  "subscriber_id": "sub_123",
  "tag": "customer"
}

# Remove tag from subscriber
POST /integrations/manychat/tag/remove
{
  "subscriber_id": "sub_123",
  "tag": "customer"
}
```

#### Example Usage:

```python
from app.integrations.manychat import ManyChatIntegration

# Initialize
integration = ManyChatIntegration(
    api_key="your-api-key",
    webhook_secret="your-secret"
)

# Create a text response
response = integration.create_text_response("Hello, World!")

# Create quick reply response
quick_replies = [
    {"title": "Option 1", "payload": "opt1"},
    {"title": "Option 2", "payload": "opt2"}
]
response = integration.create_quick_reply_response(
    "Choose an option:",
    quick_replies
)
```

---

### BotBuilders Integration

**Webhook URL**: `https://your-domain.com/integrations/botbuilders/webhook`

#### Features:
- Multi-channel message handling (web, mobile, etc.)
- User property management
- Session management
- Card and carousel message types
- Intent and entity extraction

#### API Endpoints:

```bash
# Get integration info
GET /integrations/botbuilders/

# Send a message
POST /integrations/botbuilders/send-message
{
  "user_id": "user_123",
  "content": "Your message",
  "message_type": "text"
}

# Get user info
GET /integrations/botbuilders/user/{user_id}

# Update user properties
POST /integrations/botbuilders/user/properties
{
  "user_id": "user_123",
  "properties": {
    "name": "John Doe",
    "preference": "email"
  }
}

# Create session
POST /integrations/botbuilders/session/create
{
  "user_id": "user_123"
}

# End session
POST /integrations/botbuilders/session/end?session_id=sess_123
```

#### Example Usage:

```python
from app.integrations.botbuilders import BotBuildersIntegration

# Initialize
integration = BotBuildersIntegration(
    api_token="your-token",
    webhook_secret="your-secret"
)

# Create a card response
response = integration.create_card_response(
    title="Product Name",
    subtitle="Product description",
    image_url="https://example.com/image.jpg",
    buttons=[
        {"type": "url", "title": "View", "url": "https://example.com"}
    ]
)
```

---

### OpenClaw Integration

**Webhook URL**: `https://your-domain.com/integrations/openclaw/webhook`

#### Features:
- Session-based conversations
- Context management
- Conversation history
- Rich message types
- Action responses

#### API Endpoints:

```bash
# Get integration info
GET /integrations/openclaw/

# Send a message
POST /integrations/openclaw/send-message
{
  "session_id": "sess_123",
  "message": "Your message",
  "context": {}
}

# Create session
POST /integrations/openclaw/session/create
{
  "user_id": "user_123",
  "metadata": {}
}

# Get session
GET /integrations/openclaw/session/{session_id}

# Update session
POST /integrations/openclaw/session/update
{
  "session_id": "sess_123",
  "metadata": {"key": "value"}
}

# Close session
POST /integrations/openclaw/session/close?session_id=sess_123

# Get conversation history
GET /integrations/openclaw/session/{session_id}/history?limit=50
```

#### Example Usage:

```python
from app.integrations.openclaw import OpenClawIntegration

# Initialize
integration = OpenClawIntegration(
    api_key="your-api-key",
    webhook_secret="your-secret"
)

# Create action response
response = integration.create_action_response(
    action="transfer_funds",
    parameters={"amount": 100, "currency": "USD"},
    session_id="sess_123"
)
```

---

### MoltBook Integration

**Webhook URL**: `https://your-domain.com/integrations/moltbook/webhook`

#### Features:
- Multi-participant conversations
- Media message support (images, videos, audio, files)
- Participant management
- User status tracking
- Interactive messages with buttons
- Reaction support

#### API Endpoints:

```bash
# Get integration info
GET /integrations/moltbook/

# Send a message
POST /integrations/moltbook/send-message
{
  "conversation_id": "conv_123",
  "text": "Your message",
  "sender_id": "user_456"
}

# Create conversation
POST /integrations/moltbook/conversation/create
{
  "participants": ["user_1", "user_2"],
  "title": "Chat Room",
  "metadata": {}
}

# Get conversation
GET /integrations/moltbook/conversation/{conversation_id}

# Get conversation messages
GET /integrations/moltbook/conversation/{conversation_id}/messages?limit=50

# Add participant
POST /integrations/moltbook/conversation/participant/add
{
  "conversation_id": "conv_123",
  "user_id": "user_789"
}

# Remove participant
POST /integrations/moltbook/conversation/participant/remove
{
  "conversation_id": "conv_123",
  "user_id": "user_789"
}

# Get user info
GET /integrations/moltbook/user/{user_id}

# Update user status
POST /integrations/moltbook/user/status
{
  "user_id": "user_123",
  "status": "online"
}
```

#### Example Usage:

```python
from app.integrations.moltbook import MoltBookIntegration

# Initialize
integration = MoltBookIntegration(
    api_token="your-token",
    webhook_secret="your-secret"
)

# Create media response
response = integration.create_media_response(
    media_url="https://example.com/image.jpg",
    media_type="image",
    caption="Check this out!",
    conversation_id="conv_123"
)

# Create interactive response
response = integration.create_interactive_response(
    text="Choose an action:",
    buttons=[
        {"id": "btn1", "text": "Action 1"},
        {"id": "btn2", "text": "Action 2"}
    ],
    conversation_id="conv_123"
)
```

---

## Security

### Webhook Signature Verification

All integrations support webhook signature verification to ensure requests are authentic:

1. **ManyChat**: Uses HMAC-SHA256 with the signature in the `X-Hub-Signature-256` header
2. **BotBuilders**: Uses HMAC-SHA256 with the signature in the `X-BotBuilders-Signature` header
3. **OpenClaw**: Uses HMAC-SHA256 with the signature in the `X-OpenClaw-Signature` header
4. **MoltBook**: Uses HMAC-SHA256 with the signature in the `X-MoltBook-Signature` header

The webhook secret must be configured in your environment variables for verification to work.

### Best Practices

1. **Always use HTTPS** in production for webhook URLs
2. **Set webhook secrets** for all platforms
3. **Validate input data** before processing
4. **Rate limit** webhook endpoints if needed
5. **Log webhook failures** for debugging
6. **Use environment variables** for sensitive credentials

---

## Testing

Run the integration tests:

```bash
cd backend
pytest tests/test_integrations.py -v
```

Test individual platforms:

```bash
# Test ManyChat
pytest tests/test_integrations.py::test_manychat_info -v

# Test BotBuilders
pytest tests/test_integrations.py::test_botbuilders_webhook -v

# Test OpenClaw
pytest tests/test_integrations.py::test_openclaw_create_session -v

# Test MoltBook
pytest tests/test_integrations.py::test_moltbook_create_conversation -v
```

---

## API Documentation

Start the FastAPI server and visit the auto-generated API documentation:

```bash
cd backend
uvicorn app.main:app --reload
```

Then open your browser to:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

All integration endpoints are documented with request/response schemas, making it easy to test and integrate.

---

## Extending Integrations

To add custom logic to any integration:

1. **Create a custom handler**: Extend the integration class
2. **Add custom routes**: Create new endpoints in the route files
3. **Implement business logic**: Add AI processing, blockchain interactions, etc.

Example:

```python
from app.integrations.manychat import ManyChatIntegration
from app.settings import settings

class CustomManyChatHandler(ManyChatIntegration):
    async def process_with_ai(self, message: str) -> str:
        # Add your AI processing here
        response = await call_openai_api(message)
        return response

# Use in routes
@router.post("/custom-webhook")
async def custom_webhook(data: dict):
    handler = CustomManyChatHandler(
        api_key=settings.manychat_api_key,
        webhook_secret=settings.manychat_webhook_secret
    )
    ai_response = await handler.process_with_ai(data["text"])
    return handler.create_text_response(ai_response)
```

---

## Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Ensure the webhook secret is correctly set in .env
   - Check that the platform is sending the correct signature header
   - Verify the signature format matches expected format

2. **API key authentication fails**
   - Verify API keys are correctly copied from the platform
   - Check for extra whitespace in environment variables
   - Ensure keys haven't expired

3. **Endpoints return 404**
   - Check that routes are properly registered in main.py
   - Verify the FastAPI server is running
   - Check the URL path matches the router prefix

### Debug Mode

Enable debug mode for more detailed logging:

```env
DEBUG=true
```

This will provide more detailed error messages and stack traces.

---

## Production Deployment

For production deployments:

1. **Use production-grade secrets** for all webhook verifications
2. **Enable HTTPS** for all webhook URLs
3. **Set up monitoring** for webhook failures
4. **Configure rate limiting** to prevent abuse
5. **Use a reverse proxy** (nginx, Caddy) for SSL termination
6. **Enable telemetry** for observability:

```env
TELEMETRY_ENABLED=true
TELEMETRY_ENDPOINT=https://your-telemetry-endpoint
```

---

## Support

For issues or questions about the integrations:
- Check the API documentation at `/docs`
- Review the test files for usage examples
- See the source code in `app/integrations/` and `app/routes/`

---

## License

ISC - Same as the main Web3AI project

"""AI API routes for Claude and OpenAI integration."""

from typing import Any

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.ai_agents import AIToolkit
from app.ai_tools import ai_tools

router = APIRouter(prefix="/api/ai", tags=["AI"])


class ChatMessage(BaseModel):
    """Chat message model."""

    role: str = Field(..., description="Message role (user/assistant/system)")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Chat request model."""

    messages: list[ChatMessage] = Field(..., description="List of chat messages")
    provider: str = Field(default="claude", description="AI provider (openai/claude)")
    system_prompt: str | None = Field(None, description="Optional system prompt")
    stream: bool = Field(default=False, description="Whether to stream the response")


class ChatResponse(BaseModel):
    """Chat response model."""

    response: str = Field(..., description="AI response")
    provider: str = Field(..., description="Provider used")


class TemplateRequest(BaseModel):
    """Template generation request."""

    template: str = Field(..., description="Prompt template with variables")
    variables: dict[str, Any] = Field(..., description="Variables to fill template")
    provider: str = Field(default="claude", description="AI provider (openai/claude)")


class AgentRequest(BaseModel):
    """Agent request model."""

    input: str = Field(..., description="User input for the agent")
    agent_type: str = Field(
        default="general",
        description="Agent type (general/code_analysis/blockchain_analyst/developer_assistant)",
    )
    provider: str = Field(default="claude", description="AI provider (openai/claude)")
    chat_history: list[dict[str, str]] | None = Field(
        None, description="Optional chat history"
    )


class AgentResponse(BaseModel):
    """Agent response model."""

    output: str = Field(..., description="Agent output")
    intermediate_steps: list | None = Field(None, description="Intermediate reasoning steps")


class ProvidersResponse(BaseModel):
    """Available providers response."""

    providers: list[str] = Field(..., description="List of available providers")


@router.get("/providers", response_model=ProvidersResponse)
async def get_providers():
    """Get available AI providers.

    Returns:
        List of configured AI providers
    """
    providers = ai_tools.get_available_providers()
    return ProvidersResponse(providers=providers)


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send chat messages to AI model.

    Args:
        request: Chat request with messages and settings

    Returns:
        AI response

    Raises:
        HTTPException: If provider is not configured or request fails
    """
    if request.stream:
        raise HTTPException(
            status_code=400,
            detail="Streaming not supported in this endpoint. Use /api/ai/chat/stream instead",
        )

    try:
        # Convert messages to dict format
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

        # Get response
        response = await ai_tools.chat(
            messages=messages,
            provider=request.provider,
            system_prompt=request.system_prompt,
        )

        return ChatResponse(response=response, provider=request.provider)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI request failed: {str(e)}")


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """Stream chat messages to AI model.

    Args:
        request: Chat request with messages and settings

    Returns:
        Streaming response with AI output

    Raises:
        HTTPException: If provider is not configured or request fails
    """
    try:
        # Convert messages to dict format
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

        async def generate():
            try:
                async for chunk in ai_tools.stream_chat(
                    messages=messages,
                    provider=request.provider,
                    system_prompt=request.system_prompt,
                ):
                    yield chunk
            except Exception as e:
                yield f"Error: {str(e)}"

        return StreamingResponse(generate(), media_type="text/plain")

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI request failed: {str(e)}")


@router.post("/generate", response_model=ChatResponse)
async def generate_with_template(request: TemplateRequest):
    """Generate response using a prompt template.

    Args:
        request: Template request with template and variables

    Returns:
        AI response

    Raises:
        HTTPException: If provider is not configured or request fails
    """
    try:
        response = await ai_tools.generate_with_template(
            template=request.template,
            variables=request.variables,
            provider=request.provider,
        )

        return ChatResponse(response=response, provider=request.provider)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Template generation failed: {str(e)}")


@router.post("/agent", response_model=AgentResponse)
async def run_agent(request: AgentRequest):
    """Run AI agent with tools and reasoning.

    Args:
        request: Agent request with input and settings

    Returns:
        Agent response with output and reasoning steps

    Raises:
        HTTPException: If provider is not configured or request fails
    """
    try:
        # Create agent based on type
        if request.agent_type == "code_analysis":
            agent = AIToolkit.create_code_analysis_agent(provider=request.provider)
        elif request.agent_type == "blockchain_analyst":
            agent = AIToolkit.create_blockchain_analyst_agent(provider=request.provider)
        elif request.agent_type == "developer_assistant":
            agent = AIToolkit.create_developer_assistant_agent(provider=request.provider)
        else:
            # General agent
            from app.ai_agents import Web3AIAgent

            agent = Web3AIAgent(provider=request.provider)

        # Run agent
        result = await agent.run(input_text=request.input, chat_history=request.chat_history)

        return AgentResponse(
            output=result.get("output", ""),
            intermediate_steps=result.get("intermediate_steps", []),
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent execution failed: {str(e)}")

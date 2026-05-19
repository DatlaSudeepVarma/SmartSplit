from app.schemas.common import APIModel


class ChatMessage(APIModel):
    role: str
    content: str


class ChatRequest(APIModel):
    message: str
    history: list[ChatMessage] | None = None


class ChatResponse(APIModel):
    reply: str
    used_llm: bool
    context_summary: str | None = None

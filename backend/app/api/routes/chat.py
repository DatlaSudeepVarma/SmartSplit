from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_id, get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_assistant import generate_chat_reply
from app.services.chat_context import build_user_chat_context, format_context_for_prompt

router = APIRouter(prefix="/chat")


@router.post("/message", response_model=ChatResponse)
def chat_message(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> ChatResponse:
    ctx = build_user_chat_context(db, user_id)
    context_text = format_context_for_prompt(ctx)

    history = None
    if payload.history:
        history = [{"role": m.role, "content": m.content} for m in payload.history]

    reply, used_llm = generate_chat_reply(
        payload.message.strip(),
        context_text,
        ctx,
        history,
    )

    summary = (
        f"{ctx.get('trip_count', 0)} trips · "
        f"{ctx.get('total_tracked_expenses', 0)} {ctx.get('default_currency', 'INR')} tracked"
    )

    return ChatResponse(
        reply=reply,
        used_llm=used_llm,
        context_summary=summary,
    )

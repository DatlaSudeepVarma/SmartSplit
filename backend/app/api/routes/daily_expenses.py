from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_id, get_db
from app.schemas.daily_expenses import (
    CreateDailyExpenseRequest,
    DailyCategory,
    DailyExpense,
    DailyStats,
    SyncRequest,
    SyncResponse,
    UpdateDailyExpenseRequest,
)
from app.services import daily_expenses as daily_expense_service

router = APIRouter(prefix="/daily-expenses")


@router.get("", response_model=list[DailyExpense])
def list_daily_expenses(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> list[DailyExpense]:
    return daily_expense_service.list_expenses(db, user_id)


@router.post("", response_model=DailyExpense)
def create_daily_expense(
    payload: CreateDailyExpenseRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> DailyExpense:
    try:
        return daily_expense_service.create_expense(db, user_id, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.patch("/{expense_id}", response_model=DailyExpense)
def update_daily_expense(
    expense_id: str,
    payload: UpdateDailyExpenseRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> DailyExpense:
    try:
        return daily_expense_service.update_expense(db, user_id, expense_id, payload)
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.delete("/{expense_id}")
def delete_daily_expense(
    expense_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> None:
    try:
        daily_expense_service.delete_expense(db, user_id, expense_id)
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/categories", response_model=list[DailyCategory])
def list_daily_categories(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> list[DailyCategory]:
    return daily_expense_service.list_categories(db, user_id)


@router.get("/stats", response_model=DailyStats)
def get_daily_stats(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
) -> DailyStats:
    return daily_expense_service.compute_stats(db, user_id)


@router.post("/sync", response_model=SyncResponse)
def sync_expenses(_payload: SyncRequest, _user_id: str = Depends(get_current_user_id)) -> SyncResponse:
    return SyncResponse(count=0)


@router.post("/unsync", response_model=SyncResponse)
def unsync_expenses(_payload: SyncRequest, _user_id: str = Depends(get_current_user_id)) -> SyncResponse:
    return SyncResponse(count=0)


@router.get("/__health")
def health() -> dict:
    return {"ok": True, "ts": datetime.utcnow().isoformat()}

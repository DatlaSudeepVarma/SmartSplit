from __future__ import annotations

import json
import uuid
from calendar import monthrange
from datetime import datetime, timezone
from typing import Any

from sqlalchemy.orm import Session

from app.models import DailyCategoryModel, DailyExpenseModel, User
from app.schemas.daily_expenses import (
    CreateDailyExpenseRequest,
    DailyCategory,
    DailyExpense,
    DailyStats,
    UpdateDailyExpenseRequest,
)

DEFAULT_CATEGORIES: list[dict[str, str | bool]] = [
    {"name": "Food & Dining", "icon": "utensils", "color": "#f97316"},
    {"name": "Transport", "icon": "car", "color": "#3b82f6"},
    {"name": "Shopping", "icon": "shopping-bag", "color": "#8b5cf6"},
    {"name": "Bills & Utilities", "icon": "zap", "color": "#eab308"},
    {"name": "Entertainment", "icon": "film", "color": "#ec4899"},
    {"name": "Health", "icon": "heart", "color": "#ef4444"},
    {"name": "Home", "icon": "home", "color": "#22c55e"},
    {"name": "Others", "icon": "more-horizontal", "color": "#6b7280"},
]


def _parse_metadata(raw: str | None) -> Any | None:
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def _category_to_schema(model: DailyCategoryModel) -> DailyCategory:
    return DailyCategory(
        id=model.id,
        user_id=model.user_id,
        name=model.name,
        icon=model.icon,
        color=model.color,
        is_custom=model.is_custom,
    )


def _expense_to_schema(model: DailyExpenseModel) -> DailyExpense:
    return DailyExpense(
        id=model.id,
        user_id=model.user_id,
        description=model.description,
        amount=model.amount,
        date=model.date,
        category_id=model.category_id,
        payment_method=model.payment_method,  # type: ignore[arg-type]
        notes=model.notes,
        source_id=model.source_id,
        source_type=model.source_type,  # type: ignore[arg-type]
        metadata=_parse_metadata(model.metadata_json),
    )


def ensure_default_categories(db: Session, user_id: str) -> list[DailyCategoryModel]:
    existing = (
        db.query(DailyCategoryModel)
        .filter(DailyCategoryModel.user_id == user_id)
        .order_by(DailyCategoryModel.name)
        .all()
    )
    if existing:
        return existing

    created: list[DailyCategoryModel] = []
    for item in DEFAULT_CATEGORIES:
        category = DailyCategoryModel(
            id=str(uuid.uuid4()),
            user_id=user_id,
            name=str(item["name"]),
            icon=str(item["icon"]),
            color=str(item["color"]),
            is_custom=bool(item.get("is_custom", False)),
        )
        db.add(category)
        created.append(category)

    db.commit()
    for category in created:
        db.refresh(category)
    return created


def list_categories(db: Session, user_id: str) -> list[DailyCategory]:
    categories = ensure_default_categories(db, user_id)
    return [_category_to_schema(c) for c in categories]


def list_expenses(db: Session, user_id: str) -> list[DailyExpense]:
    rows = (
        db.query(DailyExpenseModel)
        .filter(DailyExpenseModel.user_id == user_id)
        .order_by(DailyExpenseModel.date.desc())
        .all()
    )
    return [_expense_to_schema(row) for row in rows]


def create_expense(
    db: Session, user_id: str, payload: CreateDailyExpenseRequest
) -> DailyExpense:
    ensure_default_categories(db, user_id)
    category = (
        db.query(DailyCategoryModel)
        .filter(
            DailyCategoryModel.id == payload.category_id,
            DailyCategoryModel.user_id == user_id,
        )
        .first()
    )
    if not category:
        raise ValueError("Invalid category")

    expense = DailyExpenseModel(
        id=str(uuid.uuid4()),
        user_id=user_id,
        description=payload.description.strip(),
        amount=float(payload.amount),
        date=payload.date,
        category_id=payload.category_id,
        payment_method=payload.payment_method,
        notes=payload.notes.strip() if payload.notes else None,
        source_id=None,
        source_type="manual",
        metadata_json=None,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return _expense_to_schema(expense)


def update_expense(
    db: Session,
    user_id: str,
    expense_id: str,
    payload: UpdateDailyExpenseRequest,
) -> DailyExpense:
    expense = (
        db.query(DailyExpenseModel)
        .filter(DailyExpenseModel.id == expense_id, DailyExpenseModel.user_id == user_id)
        .first()
    )
    if not expense:
        raise LookupError("Expense not found")

    if payload.description is not None:
        expense.description = payload.description.strip()
    if payload.amount is not None:
        expense.amount = float(payload.amount)
    if payload.date is not None:
        expense.date = payload.date
    if payload.category_id is not None:
        category = (
            db.query(DailyCategoryModel)
            .filter(
                DailyCategoryModel.id == payload.category_id,
                DailyCategoryModel.user_id == user_id,
            )
            .first()
        )
        if not category:
            raise ValueError("Invalid category")
        expense.category_id = payload.category_id
    if payload.payment_method is not None:
        expense.payment_method = payload.payment_method
    if payload.notes is not None:
        expense.notes = payload.notes.strip() or None

    db.commit()
    db.refresh(expense)
    return _expense_to_schema(expense)


def delete_expense(db: Session, user_id: str, expense_id: str) -> None:
    expense = (
        db.query(DailyExpenseModel)
        .filter(DailyExpenseModel.id == expense_id, DailyExpenseModel.user_id == user_id)
        .first()
    )
    if not expense:
        raise LookupError("Expense not found")
    db.delete(expense)
    db.commit()


def compute_stats(db: Session, user_id: str) -> DailyStats:
    expenses = (
        db.query(DailyExpenseModel)
        .filter(DailyExpenseModel.user_id == user_id)
        .all()
    )
    user = db.query(User).filter(User.id == user_id).first()
    monthly_salary = user.monthly_salary if user else None

    now = datetime.now(timezone.utc).replace(tzinfo=None)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    total_spent = sum(e.amount for e in expenses)
    monthly_spent = sum(e.amount for e in expenses if e.date >= month_start)

    days_in_month = monthrange(now.year, now.month)[1]
    days_elapsed = max(now.day, 1)
    avg_daily = monthly_spent / days_elapsed

    category_breakdown: dict[str, float] = {}
    for expense in expenses:
        category_breakdown[expense.category_id] = (
            category_breakdown.get(expense.category_id, 0.0) + expense.amount
        )

    breakdown_items = []
    if total_spent > 0:
        for category_id, amount in category_breakdown.items():
            breakdown_items.append(
                {
                    "categoryId": category_id,
                    "amount": round(amount, 2),
                    "percentage": round((amount / total_spent) * 100, 1),
                }
            )
        breakdown_items.sort(key=lambda item: item["amount"], reverse=True)

    spent_vs_salary_percent = None
    salary_status = None
    salary_message = None
    remaining_salary = None

    if monthly_salary and monthly_salary > 0:
        spent_vs_salary_percent = (monthly_spent / monthly_salary) * 100
        remaining_salary = monthly_salary - monthly_spent

        if spent_vs_salary_percent >= 100:
            salary_status = "overspending"
            salary_message = (
                f"You have exceeded your monthly salary by "
                f"{abs(remaining_salary):.0f}. Consider reducing discretionary spending."
            )
        elif spent_vs_salary_percent >= 80:
            salary_status = "caution"
            salary_message = (
                f"You have used {spent_vs_salary_percent:.0f}% of your salary this month. "
                "Watch your spending closely."
            )
        else:
            salary_status = "safe"
            salary_message = (
                f"You are on track with {remaining_salary:.0f} remaining from your monthly salary."
            )

    return DailyStats(
        total_spent=round(total_spent, 2),
        monthly_spent=round(monthly_spent, 2),
        avg_daily=round(avg_daily, 2),
        category_breakdown=category_breakdown,
        category_breakdown_items=breakdown_items,
        spent_vs_salary_percent=round(spent_vs_salary_percent, 1) if spent_vs_salary_percent is not None else None,
        salary_status=salary_status,
        salary_message=salary_message,
        remaining_salary=round(remaining_salary, 2) if remaining_salary is not None else None,
    )

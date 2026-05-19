import json
from collections import defaultdict

from sqlalchemy.orm import Session

from app.models import Expense, Trip, User


def build_user_chat_context(db: Session, user_id: str) -> dict:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {}

    notif_settings: dict = {}
    if user.notification_settings:
        try:
            notif_settings = json.loads(user.notification_settings)
        except json.JSONDecodeError:
            notif_settings = {}

    trips = db.query(Trip).filter(Trip.owner_id == user_id).all()
    trip_ids = [t.id for t in trips]

    total_tracked = 0.0
    trip_summaries: list[dict] = []

    for trip in trips:
        expenses = trip.expenses
        trip_total = sum(float(e.amount) for e in expenses if not e.is_payment)
        total_tracked += trip_total

        user_share = 0.0
        user_participant = next(
            (p for p in trip.participants if p.name.lower() == user.name.lower()),
            None,
        )
        if user_participant:
            for e in expenses:
                if e.is_payment:
                    continue
                try:
                    payers = (
                        json.loads(e.paid_by)
                        if e.paid_by and e.paid_by.startswith("[")
                        else [e.paid_by]
                    )
                except (json.JSONDecodeError, TypeError):
                    payers = [e.paid_by] if e.paid_by else []
                if user_participant.id in payers:
                    user_share += float(e.amount) / max(len(payers), 1)

        trip_summaries.append(
            {
                "name": trip.name,
                "date": trip.created_at.strftime("%Y-%m-%d"),
                "currency": trip.currency,
                "total_cost": round(trip_total, 2),
                "your_share": round(user_share, 2),
                "participants": len(trip.participants),
                "type": trip.type,
            }
        )

    pending_by_module: dict[str, int] = defaultdict(int)
    if trip_ids:
        all_expenses = db.query(Expense).filter(Expense.trip_id.in_(trip_ids)).all()
        for trip in trips:
            module = "Activities"
            if trip.type == "trip":
                module = "Trips"
            elif trip.type == "movies":
                module = "Movies"
            pending_by_module[module] += sum(
                1 for e in all_expenses if e.trip_id == trip.id and not e.is_payment
            )

    return {
        "name": user.name,
        "email": user.email,
        "default_currency": user.default_currency,
        "timezone": user.timezone,
        "language": user.language,
        "phone_number": user.phone_number,
        "monthly_salary": user.monthly_salary,
        "total_expenses_field": user.total_expenses,
        "login_count": user.login_count,
        "notification_settings": notif_settings,
        "trip_count": len(trips),
        "total_tracked_expenses": round(total_tracked, 2),
        "pending_settlements": sum(pending_by_module.values()),
        "pending_by_module": dict(pending_by_module),
        "trips": trip_summaries[:8],
    }


def format_context_for_prompt(ctx: dict) -> str:
    if not ctx:
        return "No user data available."

    lines = [
        f"Name: {ctx.get('name')}",
        f"Email: {ctx.get('email')}",
        f"Default currency: {ctx.get('default_currency')}",
        f"Timezone: {ctx.get('timezone')}",
        f"Monthly salary (if set): {ctx.get('monthly_salary')}",
        f"Active trips: {ctx.get('trip_count')}",
        f"Total tracked expenses: {ctx.get('total_tracked_expenses')} {ctx.get('default_currency')}",
        f"Pending settlement items: {ctx.get('pending_settlements')}",
        f"Pending by module: {ctx.get('pending_by_module')}",
    ]

    trips = ctx.get("trips") or []
    if trips:
        lines.append("Recent trips:")
        for t in trips:
            lines.append(
                f"  - {t['name']} ({t['date']}): total {t['total_cost']} {t['currency']}, "
                f"your share {t['your_share']}, {t['participants']} people"
            )
    else:
        lines.append("No trips recorded yet.")

    return "\n".join(lines)

from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_id, get_db
from app.models import Expense as ExpenseModel
from app.models import Trip as TripModel
from app.schemas.me import UserStats

router = APIRouter(prefix="/me")


@router.get("/stats", response_model=UserStats)
def get_stats(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)) -> UserStats:
    trips = db.query(TripModel).filter(TripModel.owner_id == user_id).all()
    trip_count = len(trips)
    trip_ids = [trip.id for trip in trips]

    if not trip_ids:
        return UserStats(
            total_tracked=0.0,
            trip_count=0,
            pending_settlements=0,
            pending_by_module=[
                {"module_name": "Trips", "pending_count": 0},
                {"module_name": "Movies", "pending_count": 0},
                {"module_name": "Activities", "pending_count": 0},
                {"module_name": "Bills & Subscriptions", "pending_count": 0},
            ],
        )

    expenses = db.query(ExpenseModel).filter(ExpenseModel.trip_id.in_(trip_ids)).all()

    total_tracked = sum(float(exp.amount) for exp in expenses if not exp.is_payment)
    pending_by_module = defaultdict(int)

    for trip in trips:
        module_name = "Activities"
        if trip.type == "trip":
            module_name = "Trips"
        elif trip.type == "movies":
            module_name = "Movies"
        elif trip.type in {"dining", "play"}:
            module_name = "Activities"

        trip_pending = sum(1 for exp in expenses if exp.trip_id == trip.id and not exp.is_payment)
        pending_by_module[module_name] += trip_pending

    module_rows = [
        {"module_name": "Trips", "pending_count": pending_by_module.get("Trips", 0)},
        {"module_name": "Movies", "pending_count": pending_by_module.get("Movies", 0)},
        {"module_name": "Activities", "pending_count": pending_by_module.get("Activities", 0)},
        {"module_name": "Bills & Subscriptions", "pending_count": 0},
    ]

    pending_settlements = sum(row["pending_count"] for row in module_rows)

    return UserStats(
        total_tracked=total_tracked,
        trip_count=trip_count,
        pending_settlements=pending_settlements,
        pending_by_module=module_rows,
    )

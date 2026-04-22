from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.api.deps import get_current_user_id, get_db
from app.schemas.daily_expenses import SalaryResponse, UpdateSalaryRequest
from app.schemas.me import UserProfileData, UpdateProfileRequest

router = APIRouter(prefix="/me")


@router.get("/salary", response_model=SalaryResponse)
def get_salary(_user_id: str = Depends(get_current_user_id)) -> SalaryResponse:
    return SalaryResponse(monthly_salary=None)


@router.put("/salary")
def update_salary(_payload: UpdateSalaryRequest, _user_id: str = Depends(get_current_user_id)) -> None:
    return None


@router.get("/trip-shares", response_model=dict[str, float])
def get_trip_shares(_user_id: str = Depends(get_current_user_id)) -> dict[str, float]:
    return {}


@router.get("/profile", response_model=UserProfileData)
def get_profile(
    db: Session = Depends(get_db), 
    user_id: str = Depends(get_current_user_id)
) -> UserProfileData:
    from app.models import User, Trip, Expense
    user_model = db.query(User).filter(User.id == user_id).first()
    if not user_model:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_name = user_model.name
    
    # Defaults for internal JSON structures
    notif_settings = {}
    if user_model.notification_settings:
        try:
            notif_settings = json.loads(user_model.notification_settings)
        except:
            pass

    # Get all trips owned by the user
    trips = db.query(Trip).filter(Trip.owner_id == user_id).all()
    
    trip_summaries = []
    all_expenses_data = []

    for trip in trips:
        participants = trip.participants
        expenses = trip.expenses
        
        total_cost = sum(e.amount for e in expenses if not e.is_payment)
        
        # Identify the user among participants by name
        user_participant = next((p for p in participants if p.name.lower() == user_name.lower()), None)
        user_share = 0.0
        
        if user_participant:
            for e in expenses:
                if e.is_payment: continue
                try:
                    payers = json.loads(e.paid_by) if e.paid_by.startswith('[') else [e.paid_by]
                except:
                    payers = [e.paid_by]
                
                if user_participant.id in payers:
                    user_share += e.amount / max(len(payers), 1)

        trip_summaries.append({
            "id": trip.id,
            "name": trip.name,
            "date": trip.created_at.strftime("%Y-%m-%d"),
            "total_cost": total_cost,
            "user_share": user_share,
            "participant_count": len(participants)
        })

    return UserProfileData(
        name=user_model.name,
        email=user_model.email,
        phone_number=user_model.phone_number,
        default_currency=user_model.default_currency,
        timezone=user_model.timezone,
        language=user_model.language,
        notification_settings=notif_settings,
        trips=trip_summaries,
        expenses=[] # Removed history as requested earlier
    )


@router.put("/profile")
def update_profile(
    payload: UpdateProfileRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
) -> None:
    from app.models import User
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if payload.name is not None: user.name = payload.name
    if payload.phone_number is not None: user.phone_number = payload.phone_number
    if payload.default_currency is not None: user.default_currency = payload.default_currency
    if payload.timezone is not None: user.timezone = payload.timezone
    if payload.language is not None: user.language = payload.language
    
    if payload.notification_settings is not None:
        user.notification_settings = json.dumps(payload.notification_settings)
        
    db.commit()
    return None

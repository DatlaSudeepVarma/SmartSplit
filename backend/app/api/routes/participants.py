from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_id, get_db
from app.models import Participant, Trip
from app.schemas.trips import CreateParticipantRequest

router = APIRouter(prefix="/participants")


@router.patch("/{participant_id}")
def update_participant(
    participant_id: str,
    payload: CreateParticipantRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
) -> None:
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
    
    trip = db.query(Trip).filter(Trip.id == participant.trip_id).first()
    if not trip or trip.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this participant")
    
    participant.name = payload.name
    db.commit()
    return None

import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.security import get_password_hash, verify_password
from app.models import User as UserModel
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest, User

router = APIRouter(prefix="/auth")


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> AuthResponse:
    # Check if user already exists
    existing_user = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    new_user = UserModel(
        id=str(uuid.uuid4()),
        name=payload.name,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    user_schema = User.model_validate(new_user)
    return AuthResponse(user=user_schema, token="dev-token")


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user.login_count += 1
    db.add(user)
    db.commit()
    db.refresh(user)

    user_schema = User.model_validate(user)
    return AuthResponse(user=user_schema, token="dev-token")

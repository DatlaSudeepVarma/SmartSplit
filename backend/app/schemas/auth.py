import re
from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator

from app.schemas.common import APIModel


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one capital letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class User(APIModel):
    id: str
    name: str
    email: EmailStr
    profile_image_url: str | None = None
    monthly_salary: float | None = None
    is_admin: bool = False
    login_count: int = 0
    total_expenses: float = 0.0
    created_at: datetime
    last_login: datetime | None = None


class AuthResponse(APIModel):
    user: User
    token: str

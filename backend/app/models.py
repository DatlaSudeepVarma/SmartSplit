from sqlalchemy import Boolean, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)
    monthly_salary: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    login_count: Mapped[int] = mapped_column(Integer, default=0)
    total_expenses: Mapped[float] = mapped_column(Float, default=0.0)

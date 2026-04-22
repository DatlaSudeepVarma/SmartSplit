import uuid
from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

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
    phone_number: Mapped[str | None] = mapped_column(String, nullable=True)
    profile_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    last_login: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    default_currency: Mapped[str] = mapped_column(String, default="INR")
    timezone: Mapped[str] = mapped_column(String, default="UTC")
    language: Mapped[str] = mapped_column(String, default="en")
    notification_settings: Mapped[str | None] = mapped_column(Text, nullable=True) # JSON string

    # Relationships
    trips = relationship("Trip", back_populates="owner")


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String)
    owner_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    icon: Mapped[str | None] = mapped_column(String, nullable=True)
    custom_image: Mapped[str | None] = mapped_column(Text, nullable=True)
    type: Mapped[str] = mapped_column(String, default="trip")
    currency: Mapped[str] = mapped_column(String, default="INR")

    # Relationships
    owner = relationship("User", back_populates="trips")
    participants = relationship("Participant", back_populates="trip", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="trip", cascade="all, delete-orphan")


class Participant(Base):
    __tablename__ = "participants"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String)

    # Relationships
    trip = relationship("Trip", back_populates="participants")


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    description: Mapped[str] = mapped_column(String)
    amount: Mapped[float] = mapped_column(Float)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    category: Mapped[str] = mapped_column(String)
    paid_by: Mapped[str] = mapped_column(String)  # Participant name or ID
    split_among: Mapped[str] = mapped_column(Text)  # JSON string of participant names/IDs
    is_payment: Mapped[bool | None] = mapped_column(Boolean, nullable=True)

    # Relationships
    trip = relationship("Trip", back_populates="expenses")

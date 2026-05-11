from app.schemas.common import APIModel


class UserStats(APIModel):
    total_tracked: float
    trip_count: int
    pending_settlements: int
    pending_by_module: list["PendingModuleStat"]


class PendingModuleStat(APIModel):
    module_name: str
    pending_count: int


class TripSummary(APIModel):
    id: str
    name: str
    date: str
    total_cost: float
    user_share: float
    participant_count: int


class UserProfileData(APIModel):
    name: str
    email: str
    profile_image_url: str | None
    phone_number: str | None
    default_currency: str
    timezone: str
    language: str
    notification_settings: dict | None
    trips: list[TripSummary]
    expenses: list[dict]


class UpdateProfileRequest(APIModel):
    name: str | None = None
    email: str | None = None
    profile_image_url: str | None = None
    phone_number: str | None = None
    default_currency: str | None = None
    timezone: str | None = None
    language: str | None = None
    notification_settings: dict | None = None

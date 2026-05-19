from fastapi import APIRouter

from app.api.routes import activities, admin, auth, bills, chat, daily_expenses, dashboard, me, participants, share, trips

api_router = APIRouter()

api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(dashboard.router, tags=["dashboard"])
api_router.include_router(me.router, tags=["me"])
api_router.include_router(participants.router, tags=["participants"])
api_router.include_router(trips.router, tags=["trips"])
api_router.include_router(share.router, tags=["share"])
api_router.include_router(activities.router, tags=["activities"])
api_router.include_router(daily_expenses.router, tags=["daily-expenses"])
api_router.include_router(bills.router, tags=["bills"])
api_router.include_router(admin.router, tags=["admin"])
api_router.include_router(chat.router, tags=["chat"])

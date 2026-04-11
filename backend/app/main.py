from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings

app = FastAPI(title="SmartSplit API")

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Request: {request.method} {request.url}")
    # print(f"Headers: {dict(request.headers)}") # Might be too noisy, but useful
    response = await call_next(request)
    print(f"Response: {response.status_code}")
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

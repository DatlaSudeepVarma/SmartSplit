import os
import sys

# Add current dir to path to import app
sys.path.append(os.getcwd())

from app.core.config import settings

def print_settings():
    print(f"DATABASE_URL: {settings.database_url[:20]}...")
    print(f"CORS_ORIGINS: {settings.cors_origins}")
    print(f"CORS_ORIGINS_LIST: {settings.cors_origins_list}")

if __name__ == "__main__":
    print_settings()

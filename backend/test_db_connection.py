import os
import sys
from sqlalchemy import create_engine, text

# Add current dir to path to import app
sys.path.append(os.getcwd())

from app.core.config import settings

def test_db():
    print(f"Testing connection to: {settings.database_url[:20]}...")
    try:
        engine = create_engine(settings.database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print(f"Success: {result.fetchone()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_db()

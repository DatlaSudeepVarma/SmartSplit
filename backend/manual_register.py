import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import sys

# Add current dir to path to import app
sys.path.append(os.getcwd())

from app.core.config import settings
from app.models import User
from app.core.security import get_password_hash

def manual_register():
    print(f"Manually registering user at DB: {settings.database_url[:20]}...")
    try:
        engine = create_engine(settings.database_url)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        email = "test-manual@gmail.com"
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print("User already exists")
            return

        new_user = User(
            id=str(uuid.uuid4()),
            name="Manual Test",
            email=email,
            hashed_password=get_password_hash("Test1234"),
        )
        db.add(new_user)
        db.commit()
        print("Success: User registered manually")
        db.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    manual_register()

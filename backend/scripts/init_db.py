import uuid
import sys
import os

# Add the parent directory to sys.path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.models import User
from app.core.security import get_password_hash

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if admin exists
        admin_email = "admin@smartsplit.com"
        admin_user = db.query(User).filter(User.email == admin_email).first()
        
        if not admin_user:
            print("Creating admin user...")
            admin_user = User(
                id=str(uuid.uuid4()),
                name="System Admin",
                email=admin_email,
                hashed_password=get_password_hash("admin123"),
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print(f"Admin user created with email: {admin_email}")
        else:
            print("Admin user already exists.")
            
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()

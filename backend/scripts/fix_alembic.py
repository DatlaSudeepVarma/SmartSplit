from app.db.session import engine
from sqlalchemy import text

def fix_version():
    with engine.connect() as conn:
        conn.execute(text("UPDATE alembic_version SET version_num = '9b0448c895e4'"))
        conn.commit()
        print("Alembic version fixed to 9b0448c895e4")

if __name__ == "__main__":
    fix_version()

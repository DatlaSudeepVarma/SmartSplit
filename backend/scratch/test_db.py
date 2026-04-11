import sqlalchemy
from sqlalchemy import create_engine

db_url = "postgresql+psycopg://neondb_owner:npg_c6CePRk2IuvU@ep-royal-bird-aiauvwnp-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

def test_db():
    try:
        engine = create_engine(db_url)
        with engine.connect() as conn:
            res = conn.execute(sqlalchemy.text("SELECT 1"))
            print(f"DB Success: {res.fetchone()}")
    except Exception as e:
        print(f"DB Error: {e}")

if __name__ == "__main__":
    test_db()

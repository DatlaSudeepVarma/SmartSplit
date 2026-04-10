import os
import sys
from sqlalchemy import create_engine, text, inspect

# Add current dir to path to import app
sys.path.append(os.getcwd())

from app.core.config import settings

def check_tables():
    try:
        engine = create_engine(settings.database_url)
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"Tables: {tables}")
        for table in tables:
            columns = inspector.get_columns(table)
            print(f"Table {table}: {[c['name'] for c in columns]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_tables()

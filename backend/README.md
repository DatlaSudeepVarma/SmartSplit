# SmartSplit Backend (FastAPI)

REST API for SmartSplit — authentication, trips, daily expenses, profile, chat, and admin.

## Quick Start

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
```

Create `.env`:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/smartsplit
SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=10080
OPENAI_API_KEY=sk-...           # optional
```

```bash
alembic upgrade head            # run migrations
# python scripts/init_db.py     # or: create tables + seed admin

uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- Health: http://localhost:8000/daily-expenses/__health

## Default Admin (after `init_db.py`)

- Email: `admin@smartsplit.com`
- Password: `admin123`

## Structure

| Path | Purpose |
|------|---------|
| `app/main.py` | FastAPI app + CORS |
| `app/api/router.py` | Route aggregation |
| `app/api/routes/` | Endpoint handlers |
| `app/models.py` | SQLAlchemy models |
| `app/schemas/` | Pydantic request/response models |
| `app/services/` | Business logic (daily expenses, chat) |
| `app/core/` | Config + JWT security |
| `alembic/versions/` | Database migrations |

## Full Documentation

See the [root README](../README.md) for features, API reference, database schema, and frontend setup.

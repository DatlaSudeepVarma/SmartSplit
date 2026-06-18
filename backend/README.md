# SmartSplit Backend (FastAPI)

REST API for SmartSplit — authentication, trips, daily expenses, profile, chat, and admin.

## Quick Start

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
```

Create `.env` locally (**do not commit this file**):

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/DATABASE
SECRET_KEY=<generate-a-long-random-string>
ACCESS_TOKEN_EXPIRE_MINUTES=10080
OPENAI_API_KEY=<your-openai-api-key>   # optional
```

Generate a `SECRET_KEY`:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

```bash
alembic upgrade head            # run migrations
# python scripts/init_db.py     # optional: local tables + admin seed — customize first

uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- Health: http://localhost:8000/daily-expenses/__health

## Local admin seed

`scripts/init_db.py` can create an initial admin user for **local development only**. Edit that script to set your own credentials before running, and never reuse development seeds in production.

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

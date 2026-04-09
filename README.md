# Juan Rubio Backend Portfolio

Fullstack portfolio focused on backend engineering with FastAPI, PostgreSQL, Docker and a Next.js frontend.

## Structure

```text
.
|-- backend/                     # FastAPI + SQLAlchemy + Alembic
|-- frontend/                    # Next.js App Router + Tailwind
|-- docker-compose.yml           # Full local stack
|-- .env.example                 # Shared environment template
`-- README.md                    # Project overview
```

## Backend highlights

- FastAPI application under `backend/app/`
- SQLAlchemy 2.x async sessions
- Alembic migration for the initial schema
- Structured JSON logging
- Typed schemas with Pydantic v2
- Seeded sample data for projects, stack, and experience

## Frontend highlights

- Next.js App Router under `frontend/app/`
- Tailwind installed locally, no CDN
- React section components aligned to Juan Rubio's backend portfolio copy
- Dynamic project, stack, and experience rendering from the backend
- Contact form proxied through a Next route handler

## Run with Docker

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Start the full stack:

   ```bash
   docker compose up --build
   ```

3. Open:

- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`
- Backend health: `http://localhost:8000/health`

## Run locally without Docker

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Main API endpoints

- `GET /projects`
- `GET /projects/{id}`
- `GET /stack`
- `GET /experience`
- `POST /contact`

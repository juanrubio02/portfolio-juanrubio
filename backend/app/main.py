from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from time import perf_counter

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import ProgrammingError

from app.api.router import api_router
from app.core.config import get_settings
from app.core.database import async_session_factory, close_engine
from app.core.errors import register_exception_handlers
from app.core.logging import configure_logging
from app.services.bootstrap import seed_portfolio_data

settings = get_settings()
configure_logging(settings.log_level)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    logger.info(
        "application_startup",
        extra={"event": "application_startup", "environment": settings.environment},
    )

    if settings.auto_seed:
        try:
            async with async_session_factory() as session:
                await seed_portfolio_data(session)
        except ProgrammingError:
            logger.warning(
                "seed_skipped_schema_missing",
                extra={"event": "seed_skipped_schema_missing"},
            )

    yield

    await close_engine()
    logger.info("application_shutdown", extra={"event": "application_shutdown"})


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    lifespan=lifespan,
    debug=settings.debug,
)
allow_all_origins = "*" in settings.allowed_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all_origins else settings.allowed_origins,
    allow_credentials=not allow_all_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)
app.include_router(api_router)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    started_at = perf_counter()

    try:
        response = await call_next(request)
    except Exception:
        duration_ms = round((perf_counter() - started_at) * 1000, 2)
        logger.exception(
            "request_failed",
            extra={
                "event": "request_failed",
                "method": request.method,
                "path": request.url.path,
                "duration_ms": duration_ms,
            },
        )
        raise

    duration_ms = round((perf_counter() - started_at) * 1000, 2)
    logger.info(
        "request_completed",
        extra={
            "event": "request_completed",
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "duration_ms": duration_ms,
        },
    )
    return response


@app.get("/health", tags=["health"])
async def healthcheck() -> JSONResponse:
    return JSONResponse({"status": "ok", "service": settings.app_name})

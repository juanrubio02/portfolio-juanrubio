from __future__ import annotations

import json
from functools import lru_cache
from json import JSONDecodeError
from typing import Annotated, Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "Juan Rubio Portfolio API"
    environment: Literal["local", "development", "staging", "production"] = "local"
    debug: bool = False
    log_level: str = "INFO"
    database_url: str = "postgresql+asyncpg://portfolio:portfolio@postgres:5432/portfolio"
    sync_database_url: str = "postgresql://portfolio:portfolio@postgres:5432/portfolio"
    allowed_origins: Annotated[list[str], NoDecode] = ["http://localhost:3000"]
    auto_seed: bool = True

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value: object) -> list[str]:
        if value is None:
            return ["http://localhost:3000"]

        if isinstance(value, list):
            return cls._normalize_origins(value)

        if not isinstance(value, str):
            return ["http://localhost:3000"]

        raw_value = value.strip()
        if not raw_value:
            return ["http://localhost:3000"]

        try:
            parsed_value = json.loads(raw_value)
        except JSONDecodeError:
            parsed_value = raw_value

        if isinstance(parsed_value, list):
            return cls._normalize_origins(parsed_value)

        if isinstance(parsed_value, str):
            return cls._normalize_origins(parsed_value.split(","))

        return ["http://localhost:3000"]

    @field_validator("debug", mode="before")
    @classmethod
    def parse_debug(cls, value: bool | str) -> bool | str:
        if isinstance(value, bool):
            return value
        lowered = value.strip().lower()
        if lowered in {"1", "true", "yes", "on", "debug"}:
            return True
        if lowered in {"0", "false", "no", "off", "release", "production"}:
            return False
        return value

    @staticmethod
    def _normalize_origins(origins: list[object]) -> list[str]:
        cleaned_origins: list[str] = []

        for origin in origins:
            normalized = (
                str(origin)
                .strip()
                .strip('"')
                .strip("'")
                .strip()
                .strip("[]")
                .strip()
            )
            if normalized and normalized not in cleaned_origins:
                cleaned_origins.append(normalized)

        return cleaned_origins or ["http://localhost:3000"]


@lru_cache
def get_settings() -> Settings:
    return Settings()

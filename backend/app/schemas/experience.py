from __future__ import annotations

from datetime import date

from pydantic import BaseModel, ConfigDict


class ExperienceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    company: str
    role: str
    location: str | None
    employment_type: str | None
    summary: str
    achievements: list[str]
    start_date: date | None
    end_date: date | None

from __future__ import annotations

from pydantic import BaseModel, ConfigDict

from app.schemas.technology import TechnologyRead


class MetricRead(BaseModel):
    label: str
    value: str


class ProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    summary: str
    outcome: str
    metrics: list[MetricRead]
    featured: bool
    cover_image: str | None
    repository_url: str | None
    technologies: list[TechnologyRead]


class ProjectDetail(ProjectSummary):
    challenge: str
    solution: str

from __future__ import annotations

from sqlalchemy import Boolean, Column, ForeignKey, Integer, JSON, String, Table, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

project_technologies = Table(
    "project_technologies",
    Base.metadata,
    Column("project_id", ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column("technology_id", ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True),
)


class Project(TimestampMixin, Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(160))
    summary: Mapped[str] = mapped_column(Text)
    challenge: Mapped[str] = mapped_column(Text)
    solution: Mapped[str] = mapped_column(Text)
    outcome: Mapped[str] = mapped_column(Text)
    metrics: Mapped[list[dict[str, str]]] = mapped_column(JSON, default=list)
    cover_image: Mapped[str | None] = mapped_column(String(512), nullable=True)
    repository_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, index=True)

    technologies: Mapped[list["Technology"]] = relationship(
        secondary=project_technologies,
        back_populates="projects",
        lazy="selectin",
    )

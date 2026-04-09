from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.project import Project


async def list_projects(session: AsyncSession) -> list[Project]:
    statement = (
        select(Project)
        .options(selectinload(Project.technologies))
        .order_by(Project.featured.desc(), Project.display_order.asc(), Project.id.asc())
    )
    result = await session.scalars(statement)
    return list(result.all())


async def get_project_by_id(session: AsyncSession, project_id: int) -> Project:
    statement = (
        select(Project)
        .options(selectinload(Project.technologies))
        .where(Project.id == project_id)
    )
    project = await session.scalar(statement)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project {project_id} was not found.",
        )
    return project

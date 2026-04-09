from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.schemas.project import ProjectDetail, ProjectSummary
from app.services.projects import get_project_by_id, list_projects

router = APIRouter(prefix="/projects")


@router.get("", response_model=list[ProjectSummary])
async def read_projects(session: AsyncSession = Depends(get_db_session)) -> list[ProjectSummary]:
    projects = await list_projects(session)
    return [ProjectSummary.model_validate(project) for project in projects]


@router.get("/{project_id}", response_model=ProjectDetail)
async def read_project(project_id: int, session: AsyncSession = Depends(get_db_session)) -> ProjectDetail:
    project = await get_project_by_id(session, project_id)
    return ProjectDetail.model_validate(project)

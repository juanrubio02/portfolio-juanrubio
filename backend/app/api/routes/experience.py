from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.schemas.experience import ExperienceRead
from app.services.portfolio import list_experience

router = APIRouter(prefix="/experience")


@router.get("", response_model=list[ExperienceRead])
async def read_experience(session: AsyncSession = Depends(get_db_session)) -> list[ExperienceRead]:
    experiences = await list_experience(session)
    return [ExperienceRead.model_validate(item) for item in experiences]

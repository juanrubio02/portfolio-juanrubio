from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.schemas.technology import TechnologyRead
from app.services.portfolio import list_technologies

router = APIRouter(prefix="/stack")


@router.get("", response_model=list[TechnologyRead])
async def read_stack(session: AsyncSession = Depends(get_db_session)) -> list[TechnologyRead]:
    technologies = await list_technologies(session)
    return [TechnologyRead.model_validate(technology) for technology in technologies]

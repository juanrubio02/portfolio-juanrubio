from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.experience import Experience
from app.models.technology import Technology


async def list_technologies(session: AsyncSession) -> list[Technology]:
    statement = select(Technology).order_by(
        Technology.highlight.desc(),
        Technology.sort_order.asc(),
        Technology.name.asc(),
    )
    result = await session.scalars(statement)
    return list(result.all())


async def list_experience(session: AsyncSession) -> list[Experience]:
    statement = select(Experience).order_by(Experience.sort_order.asc(), Experience.start_date.desc())
    result = await session.scalars(statement)
    return list(result.all())

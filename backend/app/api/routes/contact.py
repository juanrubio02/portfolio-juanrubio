from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact import create_contact_message

router = APIRouter(prefix="/contact")


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def send_contact_message(
    payload: ContactCreate,
    session: AsyncSession = Depends(get_db_session),
) -> ContactResponse:
    message = await create_contact_message(session, payload)
    return ContactResponse(
        id=message.id,
        message="Mensaje recibido. Juan revisará tu mensaje lo antes posible.",
    )

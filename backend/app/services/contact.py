from __future__ import annotations

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactCreate

logger = logging.getLogger(__name__)


async def create_contact_message(
    session: AsyncSession,
    payload: ContactCreate,
) -> ContactMessage:
    contact_message = ContactMessage(**payload.model_dump())
    session.add(contact_message)
    await session.commit()
    await session.refresh(contact_message)

    logger.info(
        "contact_message_received",
        extra={
            "event": "contact_message_received",
            "detail": {"email": payload.email, "company": payload.company},
        },
    )
    return contact_message

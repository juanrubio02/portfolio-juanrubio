from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=20, max_length=2000)


class ContactResponse(BaseModel):
    id: int
    message: str

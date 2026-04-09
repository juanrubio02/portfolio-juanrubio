from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class TechnologyRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category: str
    description: str
    highlight: bool

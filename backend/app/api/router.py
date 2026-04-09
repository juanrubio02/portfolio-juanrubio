from fastapi import APIRouter

from app.api.routes import contact, experience, projects, stack

api_router = APIRouter()
api_router.include_router(projects.router, tags=["projects"])
api_router.include_router(stack.router, tags=["stack"])
api_router.include_router(experience.router, tags=["experience"])
api_router.include_router(contact.router, tags=["contact"])

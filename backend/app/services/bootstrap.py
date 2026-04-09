from __future__ import annotations

import logging
from datetime import date

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.experience import Experience
from app.models.project import Project, project_technologies
from app.models.technology import Technology

logger = logging.getLogger(__name__)


async def seed_portfolio_data(session: AsyncSession) -> None:
    await session.execute(delete(project_technologies))
    await session.execute(delete(Project))
    await session.execute(delete(Experience))
    await session.execute(delete(Technology))
    await session.flush()

    technologies = {
        "Python": Technology(
            name="Python",
            category="Language",
            description="Lenguaje principal para construir servicios backend mantenibles, automatización e integraciones.",
            highlight=True,
            sort_order=1,
        ),
        "FastAPI": Technology(
            name="FastAPI",
            category="Backend Framework",
            description="Framework base para exponer APIs tipadas, rápidas de iterar y fáciles de documentar.",
            highlight=True,
            sort_order=2,
        ),
        "PostgreSQL": Technology(
            name="PostgreSQL",
            category="Database",
            description="Base de datos relacional para modelar entidades, estados y consultas del backend.",
            highlight=True,
            sort_order=3,
        ),
        "Docker": Technology(
            name="Docker",
            category="Infrastructure",
            description="Entorno reproducible para desarrollo local y despliegues consistentes.",
            highlight=True,
            sort_order=4,
        ),
        "SQLAlchemy": Technology(
            name="SQLAlchemy",
            category="Data Access",
            description="ORM y capa de acceso a datos para organizar modelos, relaciones y consultas.",
            highlight=False,
            sort_order=5,
        ),
    }

    projects = [
        Project(
            slug="industrial-request-intelligence-platform",
            title="Industrial Request Intelligence Platform",
            summary="Plataforma para gestionar solicitudes industriales y documentos asociados dentro de organizaciones separadas, con autenticación, workflow y revisión manual de datos extraídos.",
            challenge="En procesos industriales es habitual recibir RFQs, especificaciones y pedidos por varios canales. Sin un backend que centralice estados, documentos y usuarios, el seguimiento termina repartido entre correos, hojas de cálculo y herramientas desconectadas.",
            solution="El backend modela acceso por organización, solicitudes, comentarios, asignación, documentos y resultados de procesamiento. La API en FastAPI trabaja sobre PostgreSQL y separa autenticación, dominio, almacenamiento y procesamiento documental para mantener el flujo claro.",
            outcome="Es el proyecto principal del portfolio: un backend con autenticación multi-tenant, workflow de solicitudes, gestión documental y validación humana sobre la información extraída.",
            metrics=[
                {"label": "Access", "value": "Multi-tenant"},
                {"label": "Workflow", "value": "Requests + docs"},
                {"label": "Review", "value": "Human validation"},
            ],
            featured=True,
            display_order=1,
            cover_image=None,
            repository_url="https://github.com/juanrubio02/industrial-request-intelligence-platform",
            technologies=[
                technologies["Python"],
                technologies["FastAPI"],
                technologies["PostgreSQL"],
                technologies["Docker"],
                technologies["SQLAlchemy"],
            ],
        ),
        Project(
            slug="ai-document-pipeline",
            title="AI Document Pipeline",
            summary="Pipeline backend para ingestión, deduplicación, procesamiento asíncrono y búsqueda de documentos con una arquitectura separada entre API, worker y servicios.",
            challenge="Procesar documentos de forma estable implica manejar subidas de archivos, evitar duplicados y convertir el contenido en datos consultables sin bloquear la API principal.",
            solution="El proyecto recibe documentos, calcula hashes, guarda metadatos, delega el procesamiento a workers y expone endpoints para inspección, re-procesado y búsqueda. La lógica de extracción, resumen y búsqueda está separada por servicios.",
            outcome="Es un proyecto centrado en backend asíncrono: subida de archivos, deduplicación, procesamiento en segundo plano y búsqueda sobre documentos ya procesados.",
            metrics=[
                {"label": "Processing", "value": "Async pipeline"},
                {"label": "Storage", "value": "Deduplicated"},
                {"label": "Search", "value": "Document retrieval"},
            ],
            featured=False,
            display_order=2,
            cover_image=None,
            repository_url="https://github.com/juanrubio02/ai-document-pipeline",
            technologies=[
                technologies["Python"],
                technologies["FastAPI"],
                technologies["PostgreSQL"],
                technologies["Docker"],
                technologies["SQLAlchemy"],
            ],
        ),
        Project(
            slug="holded-billing-automation",
            title="Holded Billing Automation",
            summary="Integración pequeña en Python para automatizar la creación de facturas sobre la API de Holded con una separación sencilla entre cliente HTTP y servicio de negocio.",
            challenge="Crear facturas manualmente desde eventos externos genera trabajo repetitivo y obliga a mover datos entre sistemas sin una capa intermedia clara.",
            solution="La integración encapsula la comunicación con Holded en un cliente propio y deja la lógica de búsqueda de contacto y creación de factura en un servicio separado. El objetivo es mostrar organización básica del código en una integración con tercero.",
            outcome="Es un proyecto corto pero útil para enseñar integración con una API externa, validación de entrada y separación entre infraestructura y lógica de negocio.",
            metrics=[
                {"label": "ERP", "value": "Holded API"},
                {"label": "Flow", "value": "Contact + invoice"},
                {"label": "Scope", "value": "Small integration"},
            ],
            featured=False,
            display_order=3,
            cover_image=None,
            repository_url="https://github.com/juanrubio02/holded-billing-automation",
            technologies=[
                technologies["Python"],
                technologies["Docker"],
            ],
        ),
        Project(
            slug="ticket-triage-system",
            title="Ticket Triage System",
            summary="Proyecto de clasificación de tickets con reglas, fallback con LLM y revisión manual para explorar un flujo de automatización asistida.",
            challenge="El objetivo era probar una forma simple de clasificar tickets sin depender siempre del modelo y manteniendo una salida manual cuando el caso no es claro.",
            solution="El flujo aplica reglas primero, usa el modelo solo cuando hace falta y permite revisión posterior. Está planteado como una demo de clasificación asistida, no como una plataforma completa.",
            outcome="Aporta valor como proyecto de exploración técnica sobre clasificación y validación manual, pero con un alcance menor que el proyecto principal y el pipeline documental.",
            metrics=[
                {"label": "Flow", "value": "Rules + LLM"},
                {"label": "Review", "value": "Manual override"},
                {"label": "Data", "value": "PostgreSQL"},
            ],
            featured=False,
            display_order=4,
            cover_image=None,
            repository_url="https://github.com/juanrubio02/ticket-triage-system",
            technologies=[
                technologies["Python"],
                technologies["FastAPI"],
                technologies["PostgreSQL"],
                technologies["Docker"],
                technologies["SQLAlchemy"],
            ],
        ),
    ]

    experiences = [
        Experience(
            company="UNED Calatayud",
            role="Backend Developer",
            location=None,
            employment_type=None,
            summary="Desarrollo y mantenimiento de backend para aplicaciones internas del centro, con Python, Django, Flask y trabajo directo sobre bases de datos SQL.",
            achievements=[
                "Desarrollo y mantenimiento de funcionalidades backend en aplicaciones web internas.",
                "Trabajo con Python, Django y Flask sobre servicios y endpoints ya existentes.",
                "Consultas SQL y cambios de datos para soporte de funcionalidades e incidencias.",
                "Resolucion de incidencias relacionadas con aplicaciones y servicios web del centro.",
            ],
            start_date=date(2024, 5, 1),
            end_date=date(2025, 5, 1),
            sort_order=1,
        ),
        Experience(
            company="Calypso Instruments (Prodeo Ingeniería)",
            role="Backend Developer",
            location=None,
            employment_type=None,
            summary="Desarrollo backend en Python para procesos de fabricacion e integracion de datos, con automatizacion de tareas y soporte sobre herramientas internas.",
            achievements=[
                "Desarrollo de logica backend y utilidades en Python para apoyar procesos de fabricacion.",
                "Integracion con APIs y trabajo con datos en bases de datos relacionales.",
                "Automatizacion de tareas de procesamiento y sincronizacion de datos.",
                "Resolucion de incidencias y apoyo en pruebas e integracion con el equipo tecnico.",
            ],
            start_date=date(2022, 9, 1),
            end_date=date(2023, 2, 1),
            sort_order=2,
        ),
    ]

    session.add_all(list(technologies.values()) + projects + experiences)
    await session.commit()

    logger.info("portfolio_seeded", extra={"event": "portfolio_seeded"})

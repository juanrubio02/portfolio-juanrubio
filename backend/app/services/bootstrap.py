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
            category="Lenguaje",
            description="Lenguaje principal para construir servicios backend mantenibles, automatización e integraciones.",
            highlight=True,
            sort_order=1,
        ),
        "FastAPI": Technology(
            name="FastAPI",
            category="Framework backend",
            description="Framework base para exponer APIs tipadas, rápidas de iterar y fáciles de documentar.",
            highlight=True,
            sort_order=2,
        ),
        "PostgreSQL": Technology(
            name="PostgreSQL",
            category="Base de datos",
            description="Base de datos relacional para modelar entidades, estados y consultas del backend.",
            highlight=True,
            sort_order=3,
        ),
        "Docker": Technology(
            name="Docker",
            category="Infraestructura",
            description="Entorno reproducible para desarrollo local y despliegues consistentes.",
            highlight=True,
            sort_order=4,
        ),
        "SQLAlchemy": Technology(
            name="SQLAlchemy",
            category="Acceso a datos",
            description="ORM y capa de acceso a datos para organizar modelos, relaciones y consultas.",
            highlight=False,
            sort_order=5,
        ),
    }

    projects = [
        Project(
            slug="industrial-request-intelligence-platform",
            title="Industrial Request Intelligence Platform",
            summary="Backend para centralizar solicitudes industriales, documentos y revisión manual de datos extraídos por organización.",
            challenge="En procesos industriales es habitual recibir RFQs, especificaciones y pedidos por varios canales. Sin un backend que centralice estados, documentos y usuarios, el seguimiento termina repartido entre correos, hojas de cálculo y herramientas desconectadas.",
            solution="El backend modela acceso por organización, solicitudes, comentarios, asignación, documentos y resultados de procesamiento. La API en FastAPI trabaja sobre PostgreSQL y separa autenticación, dominio, almacenamiento y procesamiento documental para mantener el flujo claro.",
            outcome="Muestra un backend con acceso por organización, gestión documental y validación humana sobre datos extraídos.",
            metrics=[
                {"label": "Acceso", "value": "Multiempresa"},
                {"label": "Flujo", "value": "Solicitudes y docs"},
                {"label": "Revision", "value": "Validacion humana"},
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
            summary="API y worker para subir documentos, evitar duplicados y procesarlos en segundo plano para su consulta posterior.",
            challenge="Procesar documentos sin bloquear la API exige controlar subidas, duplicados y tareas en segundo plano.",
            solution="La API recibe archivos, calcula hashes, guarda metadatos y delega el procesamiento a workers. Despues expone endpoints para revisar estado, relanzar tareas y consultar resultados.",
            outcome="Demuestra un flujo backend asincrono con almacenamiento sin duplicados y busqueda sobre documentos procesados.",
            metrics=[
                {"label": "Proceso", "value": "Asincrono"},
                {"label": "Almacenamiento", "value": "Sin duplicados"},
                {"label": "Busqueda", "value": "Documental"},
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
            summary="Integracion en Python que crea facturas en Holded a partir de eventos externos con cliente HTTP y servicio de negocio separados.",
            challenge="Automatizar facturas exige mover datos entre sistemas sin depender de pasos manuales repetitivos.",
            solution="El proyecto encapsula la API de Holded en un cliente propio y deja la logica de busqueda de contacto y creacion de factura en un servicio separado.",
            outcome="Sirve como ejemplo de integracion con terceros, validacion de entrada y separacion entre infraestructura y logica de negocio.",
            metrics=[
                {"label": "ERP", "value": "API de Holded"},
                {"label": "Flujo", "value": "Contacto y factura"},
                {"label": "Alcance", "value": "Integracion acotada"},
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
            summary="Servicio de clasificacion de tickets que aplica reglas primero y usa un LLM solo cuando el caso no es claro.",
            challenge="La clasificacion automatica gana valor cuando reduce uso de modelo y mantiene una salida manual para los casos dudosos.",
            solution="El flujo evalua reglas, recurre al modelo solo cuando hace falta y deja una revision final para corregir casos ambiguos.",
            outcome="Aporta un ejemplo de automatizacion asistida con reglas, modelo y revision humana en un alcance pequeno.",
            metrics=[
                {"label": "Flujo", "value": "Reglas + LLM"},
                {"label": "Revision", "value": "Validacion manual"},
                {"label": "Datos", "value": "PostgreSQL"},
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
            role="Desarrollador backend",
            location=None,
            employment_type=None,
            summary="Mantenimiento y evolucion de backend para aplicaciones internas con Python, Django, Flask y consultas SQL.",
            achievements=[
                "Implemente cambios en servicios y endpoints de aplicaciones internas para cubrir nuevas necesidades del centro.",
                "Resolvi incidencias y ajustes de datos con SQL para mantener operativos los flujos internos.",
            ],
            start_date=date(2024, 5, 1),
            end_date=date(2025, 5, 1),
            sort_order=1,
        ),
        Experience(
            company="Calypso Instruments (Prodeo Ingeniería)",
            role="Desarrollador backend",
            location=None,
            employment_type=None,
            summary="Desarrollo backend en Python para procesos de fabricacion e integracion de datos con automatizacion de tareas internas.",
            achievements=[
                "Desarrolle utilidades y logica backend en Python para automatizar tareas de fabricacion y reducir trabajo manual repetitivo.",
                "Integre APIs y bases de datos relacionales para sincronizar informacion entre herramientas internas.",
            ],
            start_date=date(2022, 9, 1),
            end_date=date(2023, 2, 1),
            sort_order=2,
        ),
    ]

    session.add_all(list(technologies.values()) + projects + experiences)
    await session.commit()

    logger.info("portfolio_seeded", extra={"event": "portfolio_seeded"})

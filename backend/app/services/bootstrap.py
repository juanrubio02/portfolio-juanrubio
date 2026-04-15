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
        "n8n": Technology(
            name="n8n",
            category="Automatización",
            description="Orquestación de flujos para disparar acciones, alertas e integraciones sin trabajo manual.",
            highlight=False,
            sort_order=6,
        ),
        "Google Sheets": Technology(
            name="Google Sheets",
            category="Integración",
            description="Destino ligero para registrar leads y compartir seguimiento comercial con el equipo.",
            highlight=False,
            sort_order=7,
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
                {"label": "Revisión", "value": "Validación humana"},
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
            slug="revpilot",
            title="RevPilot",
            summary="Sistema de lead intelligence que extrae datos con IA, puntúa oportunidades y activa automatizaciones en tiempo real.",
            challenge="Clasificar leads entrantes de forma manual ralentiza al equipo comercial y hace que oportunidades de alto valor se atiendan tarde.",
            solution="El backend combina extracción estructurada, reglas de scoring explicables y automatizaciones con n8n para decidir la prioridad y enviar cada lead al siguiente paso operativo.",
            outcome="Aporta un caso claro de backend orientado a revenue operations con automatización, razonamiento explicable e integraciones listas para uso real.",
            metrics=[
                {"label": "Scoring", "value": "Reglas + IA"},
                {"label": "Automatización", "value": "n8n en tiempo real"},
                {"label": "Destino", "value": "Google Sheets"},
            ],
            featured=False,
            display_order=2,
            cover_image=None,
            repository_url="https://github.com/juanrubio02/RevPilot",
            technologies=[
                technologies["Python"],
                technologies["FastAPI"],
                technologies["n8n"],
                technologies["Google Sheets"],
            ],
        ),
        Project(
            slug="ai-document-pipeline",
            title="AI Document Pipeline",
            summary="API y worker para subir documentos, evitar duplicados y procesarlos en segundo plano para su consulta posterior.",
            challenge="Procesar documentos sin bloquear la API exige controlar subidas, duplicados y tareas en segundo plano.",
            solution="La API recibe archivos, calcula hashes, guarda metadatos y delega el procesamiento a workers. Después expone endpoints para revisar el estado, relanzar tareas y consultar resultados.",
            outcome="Demuestra un flujo backend asíncrono con almacenamiento sin duplicados y búsqueda sobre documentos procesados.",
            metrics=[
                {"label": "Proceso", "value": "Asíncrono"},
                {"label": "Almacenamiento", "value": "Sin duplicados"},
                {"label": "Búsqueda", "value": "Documental"},
            ],
            featured=False,
            display_order=3,
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
            summary="Integración en Python que crea facturas en Holded a partir de eventos externos con cliente HTTP y servicio de negocio separados.",
            challenge="Automatizar facturas exige mover datos entre sistemas sin depender de pasos manuales repetitivos.",
            solution="El proyecto encapsula la API de Holded en un cliente propio y deja la lógica de búsqueda de contacto y creación de factura en un servicio separado.",
            outcome="Sirve como ejemplo de integración con terceros, validación de entrada y separación entre infraestructura y lógica de negocio.",
            metrics=[
                {"label": "ERP", "value": "API de Holded"},
                {"label": "Flujo", "value": "Contacto y factura"},
                {"label": "Alcance", "value": "Integración acotada"},
            ],
            featured=False,
            display_order=4,
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
            summary="Servicio de clasificación de tickets que aplica reglas primero y usa un LLM solo cuando el caso no está claro.",
            challenge="La clasificación automática gana valor cuando reduce el uso del modelo y mantiene una salida manual para los casos dudosos.",
            solution="El flujo evalúa reglas, recurre al modelo solo cuando hace falta y deja una revisión final para corregir casos ambiguos.",
            outcome="Aporta un ejemplo de automatización asistida con reglas, modelo y revisión humana en un alcance pequeño.",
            metrics=[
                {"label": "Flujo", "value": "Reglas + LLM"},
                {"label": "Revisión", "value": "Validación manual"},
                {"label": "Datos", "value": "PostgreSQL"},
            ],
            featured=False,
            display_order=5,
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
            summary="Mantenimiento y evolución de backend para aplicaciones internas con Python, Django, Flask y consultas SQL.",
            achievements=[
                "Implementé cambios en servicios y endpoints de aplicaciones internas para cubrir nuevas necesidades del centro.",
                "Resolví incidencias y ajustes de datos con SQL para mantener operativos los flujos internos.",
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
            summary="Desarrollo backend en Python para procesos de fabricación e integración de datos con automatización de tareas internas.",
            achievements=[
                "Desarrollé utilidades y lógica backend en Python para automatizar tareas de fabricación y reducir trabajo manual repetitivo.",
                "Integré APIs y bases de datos relacionales para sincronizar información entre herramientas internas.",
            ],
            start_date=date(2022, 9, 1),
            end_date=date(2023, 2, 1),
            sort_order=2,
        ),
    ]

    session.add_all(list(technologies.values()) + projects + experiences)
    await session.commit()

    logger.info("portfolio_seeded", extra={"event": "portfolio_seeded"})

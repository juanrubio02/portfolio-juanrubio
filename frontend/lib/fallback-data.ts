import type { Experience, ProjectDetail, ProjectSummary, Technology } from "@/types/api";

const fallbackTechnologiesCatalog: Technology[] = [
  {
    id: 1,
    name: "Python",
    category: "Lenguaje",
    description:
      "Lenguaje principal para construir servicios backend mantenibles, automatización e integraciones.",
    highlight: true
  },
  {
    id: 2,
    name: "FastAPI",
    category: "Framework backend",
    description: "Framework base para exponer APIs tipadas, rápidas de iterar y fáciles de documentar.",
    highlight: true
  },
  {
    id: 3,
    name: "PostgreSQL",
    category: "Base de datos",
    description: "Base de datos relacional para modelar entidades, estados y consultas del backend.",
    highlight: true
  },
  {
    id: 4,
    name: "Docker",
    category: "Infraestructura",
    description: "Entorno reproducible para desarrollo local y despliegues consistentes.",
    highlight: true
  },
  {
    id: 5,
    name: "SQLAlchemy",
    category: "Acceso a datos",
    description: "ORM y capa de acceso a datos para organizar modelos, relaciones y consultas.",
    highlight: false
  },
  {
    id: 6,
    name: "n8n",
    category: "Automatización",
    description:
      "Orquestación de flujos para disparar acciones, alertas e integraciones sin trabajo manual.",
    highlight: false
  },
  {
    id: 7,
    name: "Google Sheets",
    category: "Integración",
    description:
      "Destino ligero para registrar leads y compartir seguimiento comercial con el equipo.",
    highlight: false
  }
];

const techByName = Object.fromEntries(
  fallbackTechnologiesCatalog.map((technology) => [technology.name, technology])
) as Record<string, Technology>;

export const fallbackProjectDetails: ProjectDetail[] = [
  {
    id: 1,
    slug: "industrial-request-intelligence-platform",
    title: "Industrial Request Intelligence Platform",
    summary:
      "Backend para centralizar solicitudes industriales, documentos y revisión manual de datos extraídos por organización.",
    outcome:
      "Muestra un backend con acceso por organización, gestión documental y validación humana sobre datos extraídos.",
    metrics: [
      { label: "Acceso", value: "Multiempresa" },
      { label: "Flujo", value: "Solicitudes y docs" },
      { label: "Revisión", value: "Validación humana" }
    ],
    featured: true,
    cover_image: null,
    repository_url:
      "https://github.com/juanrubio02/industrial-request-intelligence-platform",
    technologies: [
      techByName.Python,
      techByName.FastAPI,
      techByName.PostgreSQL,
      techByName.Docker,
      techByName.SQLAlchemy
    ],
    challenge:
      "En procesos industriales es habitual recibir RFQs, especificaciones y pedidos por varios canales. Sin un backend que centralice estados, documentos y usuarios, el seguimiento termina repartido entre correos, hojas de cálculo y herramientas desconectadas.",
    solution:
      "El backend modela acceso por organización, solicitudes, comentarios, asignación, documentos y resultados de procesamiento. La API en FastAPI trabaja sobre PostgreSQL y separa autenticación, dominio, almacenamiento y procesamiento documental para mantener el flujo claro."
  },
  {
    id: 2,
    slug: "revpilot",
    title: "RevPilot",
    summary:
      "Sistema de lead intelligence que extrae datos con IA, puntúa oportunidades y activa automatizaciones en tiempo real.",
    outcome:
      "Aporta un caso claro de backend orientado a revenue operations con automatización, razonamiento explicable e integraciones listas para uso real.",
    metrics: [
      { label: "Scoring", value: "Reglas + IA" },
      { label: "Automatización", value: "n8n en tiempo real" },
      { label: "Destino", value: "Google Sheets" }
    ],
    featured: false,
    cover_image: null,
    repository_url: "https://github.com/juanrubio02/RevPilot",
    technologies: [techByName.Python, techByName.FastAPI, techByName.n8n, techByName["Google Sheets"]],
    challenge:
      "Clasificar leads entrantes de forma manual ralentiza al equipo comercial y hace que oportunidades de alto valor se atiendan tarde.",
    solution:
      "El backend combina extracción estructurada, reglas de scoring explicables y automatizaciones con n8n para decidir la prioridad y enviar cada lead al siguiente paso operativo."
  },
  {
    id: 3,
    slug: "ai-document-pipeline",
    title: "AI Document Pipeline",
    summary:
      "API y worker para subir documentos, evitar duplicados y procesarlos en segundo plano para su consulta posterior.",
    outcome:
      "Demuestra un flujo backend asíncrono con almacenamiento sin duplicados y búsqueda sobre documentos procesados.",
    metrics: [
      { label: "Proceso", value: "Asíncrono" },
      { label: "Almacenamiento", value: "Sin duplicados" },
      { label: "Búsqueda", value: "Documental" }
    ],
    featured: false,
    cover_image: null,
    repository_url: "https://github.com/juanrubio02/ai-document-pipeline",
    technologies: [
      techByName.Python,
      techByName.FastAPI,
      techByName.PostgreSQL,
      techByName.Docker,
      techByName.SQLAlchemy
    ],
    challenge:
      "Procesar documentos sin bloquear la API exige controlar subidas, duplicados y tareas en segundo plano.",
    solution:
      "La API recibe archivos, calcula hashes, guarda metadatos y delega el procesamiento a workers. Después expone endpoints para revisar el estado, relanzar tareas y consultar resultados."
  }
];

export const fallbackProjects: ProjectSummary[] = fallbackProjectDetails.map(
  ({ challenge: _challenge, solution: _solution, ...projectSummary }) => projectSummary
);

export const fallbackExperience: Experience[] = [
  {
    id: 1,
    company: "UNED Calatayud",
    role: "Desarrollador backend",
    location: "Calatayud, España",
    employment_type: "Prácticas",
    summary:
      "Mantenimiento y evolución de backend para aplicaciones internas con Python, Django, Flask y consultas SQL.",
    achievements: [
      "Implementé cambios en servicios y endpoints de aplicaciones internas para cubrir nuevas necesidades del centro.",
      "Resolví incidencias y ajustes de datos con SQL para mantener operativos los flujos internos."
    ],
    start_date: "2024-05-01",
    end_date: "2025-05-01"
  },
  {
    id: 2,
    company: "Calypso Instruments (Prodeo Ingeniería)",
    role: "Desarrollador backend",
    location: "Zaragoza, España",
    employment_type: "Prácticas",
    summary:
      "Desarrollo backend en Python para procesos de fabricación e integración de datos con automatización de tareas internas.",
    achievements: [
      "Desarrollé utilidades y lógica backend en Python para automatizar tareas de fabricación y reducir trabajo manual repetitivo.",
      "Integré APIs y bases de datos relacionales para sincronizar información entre herramientas internas."
    ],
    start_date: "2022-09-01",
    end_date: "2023-02-01"
  }
];

export const fallbackTechnologies = fallbackTechnologiesCatalog;

export function getFallbackProjectDetail(projectId: number): ProjectDetail | null {
  return fallbackProjectDetails.find((project) => project.id === projectId) ?? null;
}

export function hasValidProjects(data: ProjectSummary[] | null | undefined): data is ProjectSummary[] {
  return Array.isArray(data) && data.length > 0;
}

export function hasValidExperience(data: Experience[] | null | undefined): data is Experience[] {
  return Array.isArray(data) && data.length > 0;
}

export function hasValidTechnologies(
  data: Technology[] | null | undefined
): data is Technology[] {
  return Array.isArray(data) && data.length > 0;
}

export function hasValidProjectDetail(
  data: ProjectDetail | null | undefined
): data is ProjectDetail {
  return Boolean(data?.id && data.title && Array.isArray(data.metrics) && data.metrics.length > 0);
}

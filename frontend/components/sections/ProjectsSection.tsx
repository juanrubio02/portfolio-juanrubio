import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProjectSummary } from "@/types/api";

type ProjectsSectionProps = {
  projects: ProjectSummary[];
};

type ProjectCardVariant = "featured" | "secondary";

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const otherProjects = projects
    .filter((project) => project.id !== featuredProject?.id)
    .slice(0, 2);

  const renderProjectCard = (
    project: ProjectSummary,
    {
      variant,
      className = "",
    }: {
      variant: ProjectCardVariant;
      className?: string;
    }
  ) => (
    <article
      key={project.id}
      className={`ghost-border rounded-[28px] bg-surface-low ${
        variant === "featured" ? "p-8" : "p-6"
      } ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center gap-2">
        {project.featured ? (
          <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[10px] font-label font-bold uppercase tracking-[0.22em] text-secondary">
            Principal
          </span>
        ) : null}
        {project.technologies.map((technology) => (
          <span
            key={technology.id}
            className={`rounded-full bg-surface-highest px-3 py-1 text-[10px] font-label uppercase tracking-[0.24em] ${
              variant === "featured" ? "text-slate-300" : "text-slate-400"
            }`}
          >
            {technology.name}
          </span>
        ))}
      </div>

      <h3
        className={`font-display font-bold text-white ${
          variant === "featured" ? "mt-6 text-3xl" : "mt-4 text-2xl"
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-slate-400">{project.summary}</p>

      <div className={`flex flex-wrap gap-6 ${variant === "featured" ? "mt-8" : "mt-6"}`}>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.24em] text-primary"
        >
          Ver detalle
          <span aria-hidden="true">-&gt;</span>
        </Link>
        {project.repository_url ? (
          <a
            href={project.repository_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.24em] text-slate-300 hover:text-white"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );

  return (
    <section className="technical-grid bg-surface py-24">
      <div className="section-shell space-y-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Proyectos"
            title="Proyectos backend construidos alrededor de problemas concretos."
            description="El foco está en APIs, integraciones, procesamiento documental y modelado de datos. El proyecto principal es el que mejor representa mi perfil backend."
          />
          <Link
            href="/projects"
            className="font-label text-sm font-bold uppercase tracking-[0.24em] text-primary"
          >
            Ver todos
          </Link>
        </div>

        {featuredProject ? (
          <div className="mt-2 mb-4">
            {renderProjectCard(featuredProject, { variant: "featured", className: "lg:p-10" })}
          </div>
        ) : null}

        {otherProjects.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {otherProjects.map((project) => renderProjectCard(project, { variant: "secondary" }))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

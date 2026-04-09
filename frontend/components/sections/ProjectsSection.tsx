import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProjectSummary } from "@/types/api";

type ProjectsSectionProps = {
  projects: ProjectSummary[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
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

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="ghost-border rounded-[28px] bg-surface-low p-8">
              <div className="flex flex-wrap items-center gap-2">
                {project.featured ? (
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[10px] font-label font-bold uppercase tracking-[0.22em] text-secondary">
                    Principal
                  </span>
                ) : null}
                {project.technologies.map((technology) => (
                  <span
                    key={technology.id}
                    className="rounded-full bg-surface-highest px-3 py-1 text-[10px] font-label uppercase tracking-[0.24em] text-slate-300"
                  >
                    {technology.name}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold text-white">{project.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-400">{project.summary}</p>

              <div className="mt-8 rounded-3xl border-l-4 border-secondary bg-secondary/10 p-6">
                <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-secondary">
                  Resultado
                </p>
                <p className="mt-3 text-lg leading-8 text-white">{project.outcome}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
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
          ))}
        </div>
      </div>
    </section>
  );
}

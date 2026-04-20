"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fallbackProjects, hasValidProjects } from "@/lib/fallback-data";
import { getProjects } from "@/lib/api";
import type { ProjectSummary } from "@/types/api";

export function ProjectsPageClient() {
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setIsLoading(true);

      const response = await getProjects();

      if (!isMounted) {
        return;
      }

      if (hasValidProjects(response)) {
        setProjects(response);
        setIsUsingFallback(false);
      } else {
        setIsUsingFallback(true);
      }

      setIsLoading(false);
    };

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="technical-grid min-h-screen py-20">
      <section className="section-shell space-y-12">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Proyectos</p>
          <h1 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">
            Backend aplicado a problemas concretos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            APIs, procesamiento documental, integraciones con terceros y modelado de datos
            aplicados a proyectos backend.
          </p>
        </div>

        {isLoading || isUsingFallback ? (
          <div className="rounded-3xl border border-white/10 bg-surface-low p-6 text-sm text-slate-300">
            {isLoading
              ? "Mostrando una selección local de proyectos mientras se actualiza el contenido."
              : "Mostrando una selección local de proyectos mientras el backend vuelve a estar disponible."}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="ghost-border rounded-3xl bg-surface-low p-8 transition-transform hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-center gap-3">
                {project.featured ? (
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[10px] font-label font-bold uppercase tracking-[0.24em] text-secondary">
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

              <h2 className="mt-6 font-display text-3xl font-bold text-white">{project.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">{project.summary}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-surface-high p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/projects/${project.id}`}
                className="mt-8 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.22em] text-primary"
              >
                Ver detalle
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

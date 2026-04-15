import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getProject } from "@/lib/api";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(Number(id));

  if (!project) {
    return {
      title: "Juan Rubio | Proyecto no encontrado"
    };
  }

  return {
    title: `${project.title} | Juan Rubio`,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(Number(id));

  if (!project) {
    return (
      <main className="bg-surface py-20">
        <section className="section-shell space-y-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 hover:text-white"
          >
            <span aria-hidden="true">&lt;-</span>
            Volver a proyectos
          </Link>

          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Proyecto</p>
            <h1 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">
              Información no disponible.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              No se ha podido cargar este proyecto desde el backend. Puede tratarse de un fallo de
              red o de que el servicio no esté disponible temporalmente.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-surface py-20">
      <section className="section-shell space-y-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 hover:text-white"
        >
          <span aria-hidden="true">&lt;-</span>
          Volver a proyectos
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4">Proyecto</p>
            <h1 className="max-w-3xl font-display text-5xl font-black tracking-tight text-white md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">{project.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology.id}
                  className="rounded-full border border-white/10 bg-surface-low px-4 py-2 text-xs font-label uppercase tracking-[0.2em] text-slate-300"
                >
                  {technology.name}
                </span>
              ))}
            </div>
            {project.repository_url ? (
              <a
                href={project.repository_url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.22em] text-primary"
              >
                Ver repositorio en GitHub
                <span aria-hidden="true">-&gt;</span>
              </a>
            ) : null}
          </div>

          <div className="ghost-border rounded-3xl bg-surface-low p-6">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-surface-high p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-primary">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {project.cover_image ? (
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src={project.cover_image}
              alt={project.title}
              width={1600}
              height={900}
              className="h-[420px] w-full object-cover object-center"
              priority
            />
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-3">
          <article className="ghost-border rounded-3xl bg-surface-low p-8 lg:col-span-1">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Problema
            </p>
            <p className="mt-4 text-base leading-7 text-slate-300">{project.challenge}</p>
          </article>
          <article className="ghost-border rounded-3xl bg-surface-low p-8 lg:col-span-1">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Enfoque
            </p>
            <p className="mt-4 text-base leading-7 text-slate-300">{project.solution}</p>
          </article>
          <article className="ghost-border rounded-3xl bg-surface-low p-8 lg:col-span-1">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Resultado
            </p>
            <p className="mt-4 text-base leading-7 text-slate-300">{project.outcome}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

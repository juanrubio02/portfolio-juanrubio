import Link from "next/link";

import type { ProjectSummary } from "@/types/api";

type HeroSectionProps = {
  featuredProject?: ProjectSummary;
};

export function HeroSection({ featuredProject }: HeroSectionProps) {
  const primaryCtaHref = featuredProject ? `/projects/${featuredProject.id}` : "/projects";

  return (
    <section className="grid-pattern relative overflow-hidden">
      <div className="absolute right-[-8rem] top-24 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="section-shell flex min-h-[60vh] items-center py-16 sm:min-h-[72vh] sm:py-20">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-white/10 bg-surface-highest px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.24em]">
              Desarrollador backend (Python)
            </span>
          </div>

          <h1 className="mt-8 font-display text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
            APIs e integraciones
            <br />
            backend en Python.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg md:text-xl">
            Trabajo con FastAPI, PostgreSQL y Docker para construir servicios claros,
            mantenibles y fáciles de desplegar.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={primaryCtaHref}
              className="justify-center rounded-full bg-primary px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.24em] text-slate-950 shadow-glow transition hover:bg-white sm:px-8 sm:py-4"
            >
              Ver proyecto principal
            </Link>
            <Link
              href="/projects"
              className="justify-center rounded-full border border-white/10 bg-surface-highest px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-surface-high sm:px-8 sm:py-4"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

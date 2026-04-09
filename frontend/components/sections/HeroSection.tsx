import Link from "next/link";

import type { ProjectSummary } from "@/types/api";

type HeroSectionProps = {
  featuredProject?: ProjectSummary;
};

export function HeroSection({ featuredProject }: HeroSectionProps) {
  return (
    <section className="grid-pattern relative overflow-hidden">
      <div className="absolute right-[-8rem] top-24 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="section-shell grid min-h-[88vh] items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="inline-flex rounded-full border border-white/10 bg-surface-highest px-4 py-2">
            <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Juan Rubio / Backend Developer (Python)
            </span>
          </div>

          <h1 className="mt-8 font-display text-6xl font-black leading-[0.9] tracking-tight text-white md:text-8xl">
            Backend developer
            <br />
            especializado en Python.
            <br />
            <span className="text-primary">FastAPI, PostgreSQL y Docker.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-400 md:text-2xl">
            Desarrollo APIs, integraciones y automatización con foco en código mantenible,
            modelos de datos claros y despliegues reproducibles.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-primary px-8 py-4 font-label text-sm font-bold uppercase tracking-[0.24em] text-slate-950 shadow-glow transition hover:bg-white"
            >
              Ver proyectos
            </Link>
            <a
              href="#stack"
              className="rounded-full border border-white/10 bg-surface-highest px-8 py-4 font-label text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-surface-high"
            >
              Stack y contacto
            </a>
          </div>
        </div>

        <div className="ghost-border overflow-hidden rounded-[28px] bg-surface-lowest">
          <div className="flex items-center gap-2 border-b border-white/5 bg-surface-high px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-red-500/40" />
            <span className="h-3 w-3 rounded-full bg-amber-400/40" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/50" />
            <span className="ml-4 font-label text-[11px] uppercase tracking-[0.22em] text-slate-500">
              juan-rubio.profile
            </span>
          </div>

          <div className="space-y-4 p-6 font-mono text-sm text-slate-300">
            <p className="flex gap-3">
              <span className="text-slate-600">01</span>
              <span className="text-primary">NAME</span>
              <span>Juan Rubio</span>
            </p>
            <p className="flex gap-3">
              <span className="text-slate-600">02</span>
              <span className="text-secondary">STACK</span>
              <span>Python, FastAPI, PostgreSQL, Docker y SQLAlchemy</span>
            </p>
            <p className="flex gap-3">
              <span className="text-slate-600">03</span>
              <span className="text-primary">PROJECT</span>
              <span>{featuredProject?.title ?? "Industrial Request Intelligence Platform"}</span>
            </p>
            <div className="rounded-3xl bg-surface-low p-5">
              <p className="font-label text-[11px] uppercase tracking-[0.22em] text-slate-500">
                Proyecto destacado
              </p>
              <p className="mt-3 text-lg leading-8 text-white">
                {featuredProject?.outcome ??
                  "Proyecto backend con autenticación, persistencia, documentación y workflow de negocio."}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {(featuredProject?.metrics ?? []).map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-surface-high p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {featuredProject?.repository_url ? (
              <a
                href={featuredProject.repository_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.22em] text-primary"
              >
                Abrir repositorio principal
                <span aria-hidden="true">-&gt;</span>
              </a>
            ) : null}
            <p className="animate-pulse text-primary">|</p>
          </div>
        </div>
      </div>
    </section>
  );
}

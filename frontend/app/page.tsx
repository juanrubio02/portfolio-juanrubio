import type { Metadata } from "next";

import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackContact } from "@/components/sections/StackContact";
import { getExperience, getProjects, getStack } from "@/lib/api";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Juan Rubio | Backend Developer (Python, FastAPI, PostgreSQL)",
  description:
    "Portfolio de backend con proyectos en Python, FastAPI, PostgreSQL, Docker y SQLAlchemy."
};

export default async function HomePage() {
  const [projects, technologies, experience] = await Promise.all([
    getProjects(),
    getStack(),
    getExperience()
  ]);

  if (!projects || !technologies || !experience) {
    return (
      <main className="bg-surface">
        <section className="section-shell flex min-h-[70vh] items-center py-20">
          <div className="max-w-2xl space-y-6">
            <p className="eyebrow">Portfolio</p>
            <h1 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">
              Data unavailable.
            </h1>
            <p className="text-lg leading-8 text-slate-400">
              El portfolio no puede cargar datos del backend ahora mismo. La interfaz sigue
              disponible y puedes volver a intentarlo en unos minutos.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <main>
      <HeroSection featuredProject={featuredProject} />
      <EngineeringPrinciples />
      <ProjectsSection projects={projects} />
      <StackContact technologies={technologies} experiences={experience} />
    </main>
  );
}

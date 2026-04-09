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

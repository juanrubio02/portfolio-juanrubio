"use client";

import { useEffect, useState } from "react";

import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import {
  fallbackExperience,
  fallbackProjects,
  fallbackTechnologies,
  hasValidExperience,
  hasValidProjects,
  hasValidTechnologies
} from "@/lib/fallback-data";
import { getExperience, getProjects, getStack } from "@/lib/api";
import type { Experience, ProjectSummary, Technology } from "@/types/api";

export function HomePageClient() {
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects);
  const [technologies, setTechnologies] = useState<Technology[]>(fallbackTechnologies);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);

      const [projectsResponse, technologiesResponse, experienceResponse] = await Promise.all([
        getProjects(),
        getStack(),
        getExperience()
      ]);

      if (!isMounted) {
        return;
      }

      const hasLiveProjects = hasValidProjects(projectsResponse);
      const hasLiveTechnologies = hasValidTechnologies(technologiesResponse);
      const hasLiveExperience = hasValidExperience(experienceResponse);

      if (hasLiveProjects) {
        setProjects(projectsResponse);
      }

      if (hasLiveTechnologies) {
        setTechnologies(technologiesResponse);
      }

      if (hasLiveExperience) {
        setExperience(experienceResponse);
      }

      setIsUsingFallback(!(hasLiveProjects && hasLiveTechnologies && hasLiveExperience));
      setIsLoading(false);
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <main>
      <HeroSection featuredProject={featuredProject} />

      {isLoading || isUsingFallback ? (
        <section className="bg-surface py-6">
          <div className="section-shell">
            <div className="rounded-2xl border border-white/10 bg-surface-low px-5 py-4 text-sm text-slate-300">
              {isLoading
                ? "Mostrando una versión local del portfolio mientras se actualiza el contenido."
                : "Mostrando una versión local del portfolio mientras el backend vuelve a estar disponible."}
            </div>
          </div>
        </section>
      ) : null}

      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experience} />
      <StackSection technologies={technologies} />
      <ContactSection />
    </main>
  );
}

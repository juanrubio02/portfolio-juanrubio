import type { Metadata } from "next";

import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Juan Rubio | Proyectos backend",
  description:
    "Proyectos backend de Juan Rubio centrados en APIs, integraciones y procesamiento de datos con Python."
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

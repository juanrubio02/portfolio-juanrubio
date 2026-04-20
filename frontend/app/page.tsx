import type { Metadata } from "next";

import { HomePageClient } from "@/components/pages/HomePageClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Juan Rubio | Desarrollador backend (Python, FastAPI, PostgreSQL)",
  description:
    "Portfolio backend con proyectos de Python, FastAPI, PostgreSQL, Docker y SQLAlchemy."
};

export default function HomePage() {
  return <HomePageClient />;
}

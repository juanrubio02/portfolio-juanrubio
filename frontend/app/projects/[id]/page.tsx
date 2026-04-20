import type { Metadata } from "next";

import { ProjectDetailPageClient } from "@/components/pages/ProjectDetailPageClient";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Proyecto ${id} | Juan Rubio`,
    description: "Detalle de proyecto backend en el portfolio de Juan Rubio."
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  return <ProjectDetailPageClient projectId={Number(id)} />;
}

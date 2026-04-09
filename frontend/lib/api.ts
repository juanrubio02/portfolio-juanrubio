import type { Experience, ProjectDetail, ProjectSummary, Technology } from "@/types/api";

const apiBaseUrl =
  process.env.BACKEND_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8000";

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed for ${path} (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function getProjects(): Promise<ProjectSummary[]> {
  return apiFetch<ProjectSummary[]>("/projects");
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  const response = await fetch(`${apiBaseUrl}/projects/${id}`, {
    cache: "no-store"
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Project request failed for ${id}`);
  }

  return (await response.json()) as ProjectDetail;
}

export async function getStack(): Promise<Technology[]> {
  return apiFetch<Technology[]>("/stack");
}

export async function getExperience(): Promise<Experience[]> {
  return apiFetch<Experience[]>("/experience");
}

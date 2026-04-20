import type { Experience, ProjectDetail, ProjectSummary, Technology } from "@/types/api";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function safeFetch<T>(path: string): Promise<T | null> {
  if (!path.startsWith("http") && !apiBaseUrl) {
    console.error(`[safeFetch] Missing NEXT_PUBLIC_API_BASE_URL`, { path });
    return null;
  }

  const url = path.startsWith("http") ? path : `${apiBaseUrl}${path}`;

  try {
    const response = await fetch(url, {
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(`[safeFetch] Request failed`, {
        path,
        url,
        status: response.status
      });
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`[safeFetch] Network error`, {
      path,
      url,
      error
    });
    return null;
  }
}

export async function getProjects(): Promise<ProjectSummary[] | null> {
  return safeFetch<ProjectSummary[]>("/projects");
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  return safeFetch<ProjectDetail>(`/projects/${id}`);
}

export async function getStack(): Promise<Technology[] | null> {
  return safeFetch<Technology[]>("/stack");
}

export async function getExperience(): Promise<Experience[] | null> {
  return safeFetch<Experience[]>("/experience");
}

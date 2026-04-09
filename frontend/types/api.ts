export type Metric = {
  label: string;
  value: string;
};

export type Technology = {
  id: number;
  name: string;
  category: string;
  description: string;
  highlight: boolean;
};

export type ProjectSummary = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  metrics: Metric[];
  featured: boolean;
  cover_image: string | null;
  repository_url: string | null;
  technologies: Technology[];
};

export type ProjectDetail = ProjectSummary & {
  challenge: string;
  solution: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  location: string | null;
  employment_type: string | null;
  summary: string;
  achievements: string[];
  start_date: string | null;
  end_date: string | null;
};

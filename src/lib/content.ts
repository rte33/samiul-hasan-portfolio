import rawPortfolio from "../../content/portfolio.json";
import rawProjects from "../../content/projects.json";
import rawUpdates from "../../content/updates.json";

import soc from "@/assets/case-soc.jpg";
import rf from "@/assets/case-rf.jpg";
import fault from "@/assets/case-fault.jpg";
import defaultPortrait from "@/assets/portrait.png";

const bundledImages: Record<string, string> = {
  "case-soc": soc,
  "case-rf": rf,
  "case-fault": fault,
  defaultPortrait: defaultPortrait,
};

export function resolveAsset(path?: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return base.endsWith("/") ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

export function resolveImage(pathOrKey?: string): string {
  if (!pathOrKey) return defaultPortrait;
  if (bundledImages[pathOrKey]) {
    return bundledImages[pathOrKey]!;
  }
  return resolveAsset(pathOrKey);
}

export type AcademicEntry = {
  period: string;
  degree: string;
  institution: string;
  logo?: string;
  details: string;
};

export type SkillCategory = {
  category: string;
  description: string;
};

export type PublicationEntry = {
  num: string;
  badge?: string;
  authors?: string;
  year?: string;
  title: string;
  venue?: string;
  url?: string;
};

export type ContactLink = {
  label: string;
  url: string;
};

export type PortfolioData = {
  site: {
    title: string;
    description: string;
    author: string;
    baseUrl?: string;
  };
  profile: {
    name: string;
    tagline: string;
    subheading: string;
    figureLabel?: string;
    summary: string;
    portrait: string;
    portraitAlt: string;
    cv: string;
    cvLabel: string;
  };
  academics: AcademicEntry[];
  skills: SkillCategory[];
  focusAreas?: {
    title?: string;
    tags: string[];
    metrics?: string;
  };
  publications: PublicationEntry[];
  coursework?: string;
  contact: {
    heading: string;
    description: string;
    email: string;
    links: ContactLink[];
  };
  footer: {
    title: string;
    revision: string;
  };
};

export type Project = {
  slug: string;
  fig: string;
  year: string;
  title: string;
  summary: string;
  image: string;
  caption: string;
  objectives: string[];
  methods: string[];
  results: { metric: string; value: string }[];
  resultNotes: string;
  tools: string[];
};

export type UpdateEntry = {
  date: string;
  time?: string;
  tag?: string;
  title: string;
  detail: string;
  links?: { label: string; url: string }[];
};

export type UpdatesData = {
  updated: string;
  intro?: string;
  title: string;
  description: string;
  now: {
    date: string;
    time?: string;
    tag?: string;
    title: string;
    detail: string;
  };
  entries: UpdateEntry[];
};

export const portfolio = rawPortfolio as PortfolioData;

export const projects: Project[] = (rawProjects as any[]).map((p) => ({
  ...p,
  image: resolveImage(p.image),
}));

export const updates = rawUpdates as UpdatesData;

export function getPortfolio(): PortfolioData {
  return portfolio;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getUpdates(): UpdatesData {
  return updates;
}

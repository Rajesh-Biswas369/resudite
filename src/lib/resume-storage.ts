import {
  createEmptyResumeData,
  createId,
  normalizeResumeData,
  type ResumeProject,
  type TemplateId,
} from "@/lib/resume-types";

const PROJECTS_KEY = "resudite-projects-v2";
const ACTIVE_PROJECT_KEY = "resudite-active-project-v2";
const LEGACY_PROJECTS_KEY = "resume-projects";
const LEGACY_ACTIVE_PROJECT_KEY = "active-resume-project";

function hasStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function parseProject(value: unknown): ResumeProject | null {
  if (!value || typeof value !== "object") return null;

  const project = value as Partial<ResumeProject>;

  if (!project.id || !project.name) return null;

  const now = new Date().toISOString();

  return {
    id: String(project.id),
    name: String(project.name),
    createdAt: project.createdAt ?? now,
    updatedAt: project.updatedAt ?? project.createdAt ?? now,
    templateId: project.templateId ?? null,
    resumeData: normalizeResumeData(project.resumeData),
  };
}

export function readProjects(): ResumeProject[] {
  if (!hasStorage()) return [];

  try {
    const stored =
      localStorage.getItem(PROJECTS_KEY) ??
      localStorage.getItem(LEGACY_PROJECTS_KEY) ??
      "[]";

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(parseProject)
      .filter((item): item is ResumeProject => Boolean(item))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  } catch {
    return [];
  }
}

export function getActiveProject(): ResumeProject | null {
  if (!hasStorage()) return null;

  try {
    const stored =
      localStorage.getItem(ACTIVE_PROJECT_KEY) ??
      localStorage.getItem(LEGACY_ACTIVE_PROJECT_KEY) ??
      "null";

    const parsed = JSON.parse(stored);

    return parseProject(parsed);
  } catch {
    return null;
  }
}

export function setActiveProject(project: ResumeProject) {
  if (!hasStorage()) return;

  localStorage.setItem(ACTIVE_PROJECT_KEY, JSON.stringify(project));
}

export function persistProject(project: ResumeProject) {
  if (!hasStorage()) return;

  const projects = readProjects();
  const exists = projects.some((item) => item.id === project.id);

  const nextProjects = exists
    ? projects.map((item) => (item.id === project.id ? project : item))
    : [project, ...projects];

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(nextProjects));
  setActiveProject(project);
}

export function createResumeProject(name: string): ResumeProject {
  const now = new Date().toISOString();

  const project: ResumeProject = {
    id: createId("resume"),
    name: name.trim(),
    createdAt: now,
    updatedAt: now,
    templateId: null,
    resumeData: createEmptyResumeData(),
  };

  persistProject(project);
  return project;
}

export function chooseTemplate(
  project: ResumeProject,
  templateId: TemplateId,
) {
  const updated: ResumeProject = {
    ...project,
    templateId,
    updatedAt: new Date().toISOString(),
  };

  persistProject(updated);
  return updated;
}

export function deleteResumeProject(projectId: string) {
  if (!hasStorage()) return;

  const projects = readProjects().filter((item) => item.id !== projectId);

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));

  const active = getActiveProject();

  if (active?.id === projectId) {
    localStorage.removeItem(ACTIVE_PROJECT_KEY);
  }
}

export function duplicateResumeProject(project: ResumeProject): ResumeProject {
  const now = new Date().toISOString();

  const copy: ResumeProject = {
    ...project,
    id: createId("resume"),
    name: `${project.name} (Copy)`,
    createdAt: now,
    updatedAt: now,
  };

  persistProject(copy);
  return copy;
}

export function renameResumeProject(projectId: string, newName: string): ResumeProject | null {
  const projects = readProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  const updated: ResumeProject = {
    ...project,
    name: newName.trim(),
    updatedAt: new Date().toISOString(),
  };

  persistProject(updated);
  return updated;
}

export type TemplateId =
  | "ju-university"
  | "modern-ats"
  | "technical"
  | "classic";

export type PersonalInfo = {
  logo: string;
  photo: string;
  fullName: string;
  degree: string;
  department: string;
  university: string;
  rollNumber: string;
  phone: string;
  email: string;
  github: string;
  website: string;
  linkedin: string;
  location: string;
  summary: string;
};

export type EducationItem = {
  id: string;
  degree: string;
  institute: string;
  score: string;
  year: string;
};

export type ExperienceItem = {
  id: string;
  organization: string;
  position: string;
  duration: string;
  location: string;
  details: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  technologies: string;
  duration: string;
  additionalInfo: string;
  link: string;
  details: string;
};

export type SkillItem = {
  id: string;
  category: string;
  skills: string;
  additionalInfo: string;
};

export type SubjectItem = {
  id: string;
  subject: string;
  topics: string;
  additionalInfo: string;
};

export type PositionItem = {
  id: string;
  position: string;
  organization: string;
  additionalInfo: string;
};

export type AchievementItem = {
  id: string;
  achievement: string;
  organization: string;
  additionalInfo: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type ResumeData = {
  personal: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  subjects: SubjectItem[];
  positions: PositionItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  additionalInfo: string;
};

export type ResumeProject = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  templateId: TemplateId | null;
  resumeData: ResumeData;
};

export type CollectionKey =
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "subjects"
  | "positions"
  | "achievements"
  | "certifications";

export const templateNames: Record<TemplateId, string> = {
  "ju-university": "JU University",
  "modern-ats": "Modern ATS",
  technical: "Technical",
  classic: "Classic Professional",
};

export function createId(prefix = "item") {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createEmptyResumeData(): ResumeData {
  return {
    personal: {
      logo: "",
      photo: "",
      fullName: "",
      degree: "",
      department: "",
      university: "",
      rollNumber: "",
      phone: "",
      email: "",
      github: "",
      website: "",
      linkedin: "",
      location: "",
      summary: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    subjects: [],
    positions: [],
    achievements: [],
    certifications: [],
    additionalInfo: "",
  };
}

export function createEmptyCollectionItem(collection: CollectionKey) {
  switch (collection) {
    case "education":
      return {
        id: createId("education"),
        degree: "",
        institute: "",
        score: "",
        year: "",
      } satisfies EducationItem;

    case "experience":
      return {
        id: createId("experience"),
        organization: "",
        position: "",
        duration: "",
        location: "",
        details: "",
      } satisfies ExperienceItem;

    case "projects":
      return {
        id: createId("project"),
        name: "",
        technologies: "",
        duration: "",
        additionalInfo: "",
        link: "",
        details: "",
      } satisfies ProjectItem;

    case "skills":
      return {
        id: createId("skill"),
        category: "",
        skills: "",
        additionalInfo: "",
      } satisfies SkillItem;

    case "subjects":
      return {
        id: createId("subject"),
        subject: "",
        topics: "",
        additionalInfo: "",
      } satisfies SubjectItem;

    case "positions":
      return {
        id: createId("position"),
        position: "",
        organization: "",
        additionalInfo: "",
      } satisfies PositionItem;

    case "achievements":
      return {
        id: createId("achievement"),
        achievement: "",
        organization: "",
        additionalInfo: "",
      } satisfies AchievementItem;

    case "certifications":
      return {
        id: createId("certification"),
        name: "",
        issuer: "",
        year: "",
      } satisfies CertificationItem;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function normalizeResumeData(value: unknown): ResumeData {
  const empty = createEmptyResumeData();

  if (!isRecord(value)) return empty;

  if (isRecord(value.personal)) {
    return {
      ...empty,
      ...value,
      personal: {
        ...empty.personal,
        ...value.personal,
      },
      education: Array.isArray(value.education) ? value.education : [],
      experience: Array.isArray(value.experience) ? value.experience : [],
      projects: Array.isArray(value.projects) ? value.projects : [],
      skills: Array.isArray(value.skills) ? value.skills : [],
      subjects: Array.isArray(value.subjects) ? value.subjects : [],
      positions: Array.isArray(value.positions) ? value.positions : [],
      achievements: Array.isArray(value.achievements)
        ? value.achievements
        : [],
      certifications: Array.isArray(value.certifications)
        ? value.certifications
        : [],
      additionalInfo: stringValue(value.additionalInfo),
    } as ResumeData;
  }

  const legacyEducation =
    stringValue(value.educationDegree) ||
    stringValue(value.educationInstitute) ||
    stringValue(value.educationScore) ||
    stringValue(value.educationYear)
      ? [
          {
            id: createId("education"),
            degree: stringValue(value.educationDegree),
            institute: stringValue(value.educationInstitute),
            score: stringValue(value.educationScore),
            year: stringValue(value.educationYear),
          },
        ]
      : [];

  return {
    ...empty,
    personal: {
      ...empty.personal,
      logo: stringValue(value.logo),
      photo: stringValue(value.photo),
      fullName: stringValue(value.fullName),
      degree: stringValue(value.degree),
      department: stringValue(value.department),
      university: stringValue(value.university),
      rollNumber: stringValue(value.rollNumber),
      phone: stringValue(value.phone),
      email: stringValue(value.email),
      github: stringValue(value.github),
      website: stringValue(value.website),
      linkedin: stringValue(value.linkedin),
      location: stringValue(value.location),
      summary: stringValue(value.summary),
    },
    education: legacyEducation,
  };
}

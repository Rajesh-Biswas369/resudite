/* eslint-disable @next/next/no-img-element */

import type {
  ResumeData,
  TemplateId,
} from "@/lib/resume-types";

export function ResumeRenderer({
  data,
  templateId,
}: {
  data: ResumeData;
  templateId: TemplateId;
}) {
  if (templateId === "modern-ats") {
    return <ModernAtsResume data={data} />;
  }

  if (templateId === "technical") {
    return <TechnicalResume data={data} />;
  }

  if (templateId === "classic") {
    return <ClassicResume data={data} />;
  }

  return <JuUniversityResume data={data} />;
}

function JuUniversityResume({ data }: { data: ResumeData }) {
  const p = data.personal;
  const education = populated(data.education);
  const experience = populated(data.experience);
  const projects = populated(data.projects);
  const skills = populated(data.skills);
  const subjects = populated(data.subjects);
  const positions = populated(data.positions);
  const achievements = populated(data.achievements);
  const certifications = populated(data.certifications);

  return (
    <article className="resume-print-page p-[10mm] text-[10.5px] leading-[1.28]">
      <header className="grid grid-cols-[82px_1fr_90px] items-start gap-4">
        <div
  className={`flex h-[78px] w-[78px] items-center justify-center overflow-hidden ${
    p.logo
      ? "border-0"
      : "rounded-full border-[3px] border-red-600 text-xl font-black text-red-600"
  }`}
>
  {p.logo ? (
    <img
      src={p.logo}
      alt="Institution logo"
      className="h-full w-full object-contain"
    />
  ) : (
    "JU"
  )}
</div>
        <div className="pt-1">
          <h1 className="text-[27px] font-black leading-none text-slate-700">
            {p.fullName || "Your Name"}
          </h1>

          {p.degree && (
            <p className="mt-2 text-[13px] font-bold">{p.degree}</p>
          )}
          {p.department && (
            <p className="text-[12.5px] font-bold">{p.department}</p>
          )}
          {p.university && <p className="text-[11.5px]">{p.university}</p>}
          {p.rollNumber && (
            <p className="text-[11px]">Roll no.: {p.rollNumber}</p>
          )}
        </div>

        <div className="flex h-[112px] w-[84px] items-center justify-center overflow-hidden border border-dashed border-slate-400 bg-slate-100 text-[9px] font-bold text-slate-400">
          {p.photo ? (
            <img src={p.photo} alt="Candidate" className="h-full w-full object-cover" />
          ) : (
            "PHOTO"
          )}
        </div>
      </header>

      <ContactLinks
        personal={p}
        className="mt-4 grid grid-cols-3 gap-x-4 gap-y-1 border-y border-slate-300 py-2 text-[9.5px]"
        itemClassName="min-w-0"
      />

      {p.summary && (
        <JuSection title="Professional Summary">
          <p className="px-1 py-1 leading-relaxed">{p.summary}</p>
        </JuSection>
      )}

      {education.length > 0 && (
        <JuSection title="Education">
          <div className="grid grid-cols-[1.05fr_1.55fr_0.8fr_0.55fr] border-l border-t border-slate-300 text-center">
            <JuCell bold>Degree / Certificate</JuCell>
            <JuCell bold>Institute / Board</JuCell>
            <JuCell bold>CGPA / Percentage</JuCell>
            <JuCell bold>Year</JuCell>

            {education.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[item.degree, item.institute, item.score, item.year]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {experience.length > 0 && (
        <JuSection title="Experience">
          <div className="border-l border-t border-slate-300">
            {experience.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_150px] border-b border-r border-slate-300"
              >
                <div className="p-2">
                  <p className="font-bold">{item.organization}</p>
                  {item.position && <p>{item.position}</p>}
                  <BulletLines text={item.details} />
                </div>
                <div className="p-2 text-right">
                  <p>{item.duration}</p>
                  <p>{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </JuSection>
      )}

      {projects.length > 0 && (
        <JuSection title="Projects">
          <div className="border-l border-t border-slate-300">
            {projects.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_150px] border-b border-r border-slate-300"
              >
                <div className="p-2">
                  <p className="font-bold">
                    {item.name}
                    {item.technologies && (
                      <span className="font-normal"> | {item.technologies}</span>
                    )}
                  </p>
                  <BulletLines text={item.details} />
                  <ProjectLink
                    link={item.link}
                    className="mt-1 text-[9px]"
                  />
                </div>
                <div className="p-2 text-right">
                  <p>{item.duration}</p>
                  <p>{item.additionalInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </JuSection>
      )}

      {skills.length > 0 && (
        <JuSection title="Technical Skills">
          <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] border-l border-t border-slate-300">
            {skills.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[item.category, item.skills, item.additionalInfo]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {subjects.length > 0 && (
        <JuSection title="Subjects of interest">
          <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] border-l border-t border-slate-300">
            {subjects.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[item.subject, item.topics, item.additionalInfo]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {positions.length > 0 && (
        <JuSection title="Positions of responsibility">
          <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] border-l border-t border-slate-300">
            {positions.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[
                  item.position,
                  item.organization,
                  item.additionalInfo,
                ]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {achievements.length > 0 && (
        <JuSection title="Achievements">
          <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] border-l border-t border-slate-300">
            {achievements.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[
                  item.achievement,
                  item.organization,
                  item.additionalInfo,
                ]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {certifications.length > 0 && (
        <JuSection title="Certifications">
          <div className="grid grid-cols-[1.2fr_1fr_0.5fr] border-l border-t border-slate-300">
            {certifications.map((item) => (
              <FragmentRow
                key={item.id}
                cells={[item.name, item.issuer, item.year]}
              />
            ))}
          </div>
        </JuSection>
      )}

      {data.additionalInfo && (
        <p className="mt-3">
          <span className="font-bold">Additional information, if any:</span>{" "}
          {data.additionalInfo}
        </p>
      )}
    </article>
  );
}

function ModernAtsResume({ data }: { data: ResumeData }) {
  const p = data.personal;
  const education = populated(data.education);
  const experience = populated(data.experience);
  const projects = populated(data.projects);
  const skills = populated(data.skills);
  const subjects = populated(data.subjects);

  return (
    <article className="resume-print-page p-[12mm] text-[10px] leading-[1.42]">
      <header className="border-b border-slate-900 pb-3 text-center">
        <h1 className="text-[27px] font-black uppercase tracking-[0.035em]">
          {p.fullName || "Your Name"}
        </h1>

        {(p.degree || p.department) && (
          <p className="mt-1 text-[11px] font-semibold text-slate-700">
            {[p.degree, p.department].filter(Boolean).join(" · ")}
          </p>
        )}

        {(p.university || p.rollNumber) && (
          <p className="mt-0.5 text-[10px] text-slate-600">
            {p.university}
            {p.university && p.rollNumber ? " · " : ""}
            {p.rollNumber ? `Roll No. ${p.rollNumber}` : ""}
          </p>
        )}

        <ContactLinks
          personal={p}
          className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[9px]"
          itemClassName="max-w-[62mm]"
        />
      </header>

      {p.summary && (
        <CleanSection title="Professional Summary">
          <p>{p.summary}</p>
        </CleanSection>
      )}

      {education.length > 0 && (
        <CleanSection title="Education">
          <div className="space-y-2.5">
            {education.map((item) => (
              <div key={item.id} className="flex justify-between gap-5">
                <div className="min-w-0">
                  <p className="font-bold">{item.institute}</p>
                  <p className="text-slate-700">{item.degree}</p>
                </div>
                <div className="shrink-0 text-right text-[9.5px]">
                  <p>{item.year}</p>
                  <p className="text-slate-600">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </CleanSection>
      )}

      {subjects.length > 0 && (
        <CleanSection title="Coursework / Skills">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {subjects.map((item) => (
              <p key={item.id}>
                <span className="font-bold">{item.subject}</span>
                {item.topics && ` — ${item.topics}`}
                {item.additionalInfo && ` — ${item.additionalInfo}`}
              </p>
            ))}
          </div>
        </CleanSection>
      )}

      {projects.length > 0 && (
        <CleanSection title="Projects">
          <div className="space-y-3">
            {projects.map((item) => (
              <div key={item.id}>
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <p className="font-bold">
                      {item.name}
                      {item.technologies && (
                        <span className="font-normal text-slate-600">
                          {" "}
                          | {item.technologies}
                        </span>
                      )}
                    </p>
                    <ProjectLink link={item.link} className="mt-0.5 text-[9px]" />
                  </div>
                  <div className="shrink-0 text-right text-[9px] text-slate-500">
                    <p>{item.duration}</p>
                    <p>{item.additionalInfo}</p>
                  </div>
                </div>
                <BulletLines text={item.details} />
              </div>
            ))}
          </div>
        </CleanSection>
      )}

      {experience.length > 0 && (
        <CleanSection title="Experience">
          <div className="space-y-3">
            {experience.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between gap-5">
                  <div>
                    <p className="font-bold">{item.position}</p>
                    <p className="font-semibold text-slate-600">
                      {item.organization}
                    </p>
                  </div>
                  <div className="shrink-0 text-right text-[9.5px] text-slate-500">
                    <p>{item.duration}</p>
                    <p>{item.location}</p>
                  </div>
                </div>
                <BulletLines text={item.details} />
              </div>
            ))}
          </div>
        </CleanSection>
      )}

      {skills.length > 0 && (
        <CleanSection title="Technical Skills">
          <div className="space-y-1">
            {skills.map((item) => (
              <p key={item.id}>
                <span className="font-bold">{item.category}:</span>{" "}
                {item.skills}
                {item.additionalInfo && ` — ${item.additionalInfo}`}
              </p>
            ))}
          </div>
        </CleanSection>
      )}

      <SecondarySections data={data} hideSubjects />
    </article>
  );
}

function TechnicalResume({ data }: { data: ResumeData }) {
  const p = data.personal;
  const education = populated(data.education);
  const experience = populated(data.experience);
  const projects = populated(data.projects);
  const skills = populated(data.skills);
  const certifications = populated(data.certifications);

  return (
    <article className="resume-print-page grid grid-cols-[60mm_1fr] overflow-hidden">
      <aside className="bg-slate-900 p-[10mm] text-white">
        {p.photo && (
          <img
            src={p.photo}
            alt="Candidate"
            className="mx-auto h-[36mm] w-[28mm] rounded-md object-cover"
          />
        )}

        <h1 className="mt-5 text-[22px] font-black leading-tight">
          {p.fullName || "Your Name"}
        </h1>

        <p className="mt-2 text-[10px] font-semibold text-cyan-300">
          {[p.degree, p.department].filter(Boolean).join(" · ")}
        </p>

        {p.university && (
          <p className="mt-1 text-[9px] font-semibold text-slate-200">
            {p.university}
          </p>
        )}

        {p.rollNumber && (
          <p className="mt-1 text-[8.5px] text-slate-400">
            Roll No. {p.rollNumber}
          </p>
        )}

        <ContactLinks
          personal={p}
          dark
          className="mt-7 space-y-2 text-[9px]"
          itemClassName="w-full"
        />

        {skills.length > 0 && (
          <div className="mt-8">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="mt-3 space-y-3 text-[9px]">
              {skills.map((item) => (
                <div key={item.id}>
                  <p className="font-bold text-white">{item.category}</p>
                  <p className="mt-1 text-slate-300">{item.skills}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mt-8">
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="mt-3 space-y-3 text-[9px]">
              {certifications.map((item) => (
                <div key={item.id}>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-slate-400">
                    {[item.issuer, item.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="p-[12mm] text-[10px] leading-[1.45]">
        {p.summary && (
          <TechSection title="Profile">
            <p>{p.summary}</p>
          </TechSection>
        )}

        {projects.length > 0 && (
          <TechSection title="Projects">
            <div className="space-y-4">
              {projects.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-5">
                    <div className="min-w-0">
                      <p className="font-bold">
                        {item.name}
                        {item.technologies && (
                          <span className="font-normal text-cyan-700">
                            {" "}
                            | {item.technologies}
                          </span>
                        )}
                      </p>
                      <ProjectLink
                        link={item.link}
                        className="mt-0.5 text-[8.5px] text-cyan-700"
                      />
                    </div>
                    <p className="text-[9px] text-slate-500">
                      {item.duration}
                    </p>
                  </div>
                  <BulletLines text={item.details} />
                </div>
              ))}
            </div>
          </TechSection>
        )}

        {experience.length > 0 && (
          <TechSection title="Experience">
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-5">
                    <div>
                      <p className="font-bold">{item.position}</p>
                      <p className="text-slate-600">{item.organization}</p>
                    </div>
                    <div className="text-right text-[9px] text-slate-500">
                      <p>{item.duration}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <BulletLines text={item.details} />
                </div>
              ))}
            </div>
          </TechSection>
        )}

        {education.length > 0 && (
          <TechSection title="Education">
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="flex justify-between gap-5">
                  <div>
                    <p className="font-bold">{item.degree}</p>
                    <p className="text-slate-600">{item.institute}</p>
                  </div>
                  <div className="text-right">
                    <p>{item.year}</p>
                    <p className="text-slate-600">{item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </TechSection>
        )}

        <SecondarySections data={data} technical />
      </main>
    </article>
  );
}

function ClassicResume({ data }: { data: ResumeData }) {
  const p = data.personal;
  const education = populated(data.education);
  const experience = populated(data.experience);
  const projects = populated(data.projects);
  const skills = populated(data.skills);

  return (
    <article className="resume-print-page p-[10mm]">
      <div className="min-h-[277mm] border-[3px] border-double border-slate-600 p-[10mm] text-[10px] leading-[1.45]">
        <header className="relative border-b border-slate-400 pb-5 text-center">
          {p.photo && (
            <img
              src={p.photo}
              alt="Candidate"
              className="absolute right-0 top-0 h-[28mm] w-[22mm] object-cover"
            />
          )}

          <h1 className="text-[27px] font-black tracking-wide">
            {p.fullName || "Your Name"}
          </h1>
          <p className="mt-2 font-semibold text-slate-600">
            {[p.degree, p.department, p.university]
              .filter(Boolean)
              .join(" · ")}
          </p>

          {p.rollNumber && (
            <p className="mt-1 text-[9px] text-slate-500">
              Roll No. {p.rollNumber}
            </p>
          )}

          <ContactLinks
            personal={p}
            className="mx-auto mt-3 flex max-w-[160mm] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[8.5px] text-slate-600"
          />
        </header>

        {p.summary && (
          <ClassicSection title="Profile">
            <p>{p.summary}</p>
          </ClassicSection>
        )}

        {education.length > 0 && (
          <ClassicSection title="Education">
            <div className="space-y-2">
              {education.map((item) => (
                <div key={item.id} className="flex justify-between gap-5">
                  <div>
                    <p className="font-bold">{item.degree}</p>
                    <p>{item.institute}</p>
                  </div>
                  <div className="text-right">
                    <p>{item.year}</p>
                    <p>{item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {experience.length > 0 && (
          <ClassicSection title="Experience">
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-5">
                    <div>
                      <p className="font-bold">{item.position}</p>
                      <p>{item.organization}</p>
                    </div>
                    <div className="text-right">
                      <p>{item.duration}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <BulletLines text={item.details} />
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {projects.length > 0 && (
          <ClassicSection title="Projects">
            <div className="space-y-4">
              {projects.map((item) => (
                <div key={item.id}>
                  <p className="font-bold">
                    {item.name}
                    {item.technologies && ` | ${item.technologies}`}
                  </p>
                  <ProjectLink link={item.link} className="mt-0.5 text-[8.5px]" />
                  <BulletLines text={item.details} />
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {skills.length > 0 && (
          <ClassicSection title="Technical Skills">
            <div className="space-y-1">
              {skills.map((item) => (
                <p key={item.id}>
                  <span className="font-bold">{item.category}:</span>{" "}
                  {item.skills}
                </p>
              ))}
            </div>
          </ClassicSection>
        )}

        <SecondarySections data={data} />
      </div>
    </article>
  );
}

type ContactKind =
  | "phone"
  | "email"
  | "linkedin"
  | "github"
  | "website"
  | "location";

type ContactEntry = {
  kind: ContactKind;
  label: string;
  href?: string;
  external?: boolean;
};

function ContactLinks({
  personal,
  className = "",
  itemClassName = "",
  dark = false,
}: {
  personal: ResumeData["personal"];
  className?: string;
  itemClassName?: string;
  dark?: boolean;
}) {
  const entries = buildContactEntries(personal);

  if (entries.length === 0) return null;

  const colour = dark ? "text-slate-300" : "text-slate-700";

  return (
    <div className={className}>
      {entries.map((entry) => {
        const content = (
          <>
            <ContactIcon kind={entry.kind} />
            <span className="min-w-0 break-all">{entry.label}</span>
          </>
        );

        const sharedClassName = `inline-flex items-center gap-1.5 align-middle ${colour} ${itemClassName}`;

        if (!entry.href) {
          return (
            <span key={entry.kind} className={sharedClassName}>
              {content}
            </span>
          );
        }

        return (
          <a
            key={entry.kind}
            href={entry.href}
            target={entry.external ? "_blank" : undefined}
            rel={entry.external ? "noreferrer noopener" : undefined}
            className={`${sharedClassName} underline-offset-2 hover:underline`}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}

function buildContactEntries(
  personal: ResumeData["personal"],
): ContactEntry[] {
  const entries: ContactEntry[] = [];

  if (personal.phone.trim()) {
    entries.push({
      kind: "phone",
      label: personal.phone.trim(),
      href: `tel:${personal.phone.replace(/[^\d+]/g, "")}`,
    });
  }

  if (personal.email.trim()) {
    entries.push({
      kind: "email",
      label: personal.email.trim(),
      href: `mailto:${personal.email.trim()}`,
    });
  }

  if (personal.linkedin.trim()) {
    entries.push({
      kind: "linkedin",
      label: displayUrl(personal.linkedin),
      href: socialUrl(personal.linkedin, "https://www.linkedin.com/in/"),
      external: true,
    });
  }

  if (personal.github.trim()) {
    entries.push({
      kind: "github",
      label: displayUrl(personal.github),
      href: socialUrl(personal.github, "https://github.com/"),
      external: true,
    });
  }

  if (personal.website.trim()) {
    entries.push({
      kind: "website",
      label: displayUrl(personal.website),
      href: externalUrl(personal.website),
      external: true,
    });
  }

  if (personal.location.trim()) {
    entries.push({
      kind: "location",
      label: personal.location.trim(),
    });
  }

  return entries;
}

function ProjectLink({
  link,
  className = "",
}: {
  link: string;
  className?: string;
}) {
  if (!link.trim()) return null;

  const github = /github\.com/i.test(link);
  const href = externalUrl(link);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-1.5 break-all font-semibold text-slate-700 underline underline-offset-2 ${className}`}
    >
      <ContactIcon kind={github ? "github" : "website"} />
      <span>{github ? "GitHub Repository" : displayUrl(link)}</span>
    </a>
  );
}

function externalUrl(value: string) {
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function socialUrl(value: string, base: string) {
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  if (/^(www\.)?(linkedin\.com|github\.com)\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return `${base}${trimmed.replace(/^@/, "").replace(/^\/+/, "")}`;
}

function displayUrl(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}

function ContactIcon({ kind }: { kind: ContactKind }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "shrink-0",
  };

  if (kind === "linkedin") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 448 512"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 84 0 54.3 0 24.1 24.1 0 53.8 0s53.8 24.1 53.8 54.3c0 29.7-24.1 53.8-53.8 53.8zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.8-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    );
  }

  if (kind === "github") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6c.98 0 1.95.13 2.86.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  if (kind === "email") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  if (kind === "website") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SecondarySections({
  data,
  technical = false,
  hideSubjects = false,
}: {
  data: ResumeData;
  technical?: boolean;
  hideSubjects?: boolean;
}) {
  const Section = technical ? TechSection : CleanSection;
  const subjects = populated(data.subjects);
  const positions = populated(data.positions);
  const achievements = populated(data.achievements);
  const certifications = populated(data.certifications);

  return (
    <>
      {!hideSubjects && subjects.length > 0 && (
        <Section title="Subjects of Interest">
          <div className="space-y-1">
            {subjects.map((item) => (
              <p key={item.id}>
                <span className="font-bold">{item.subject}:</span>{" "}
                {item.topics}
                {item.additionalInfo && ` — ${item.additionalInfo}`}
              </p>
            ))}
          </div>
        </Section>
      )}

      {positions.length > 0 && (
        <Section title="Positions of Responsibility">
          <div className="space-y-1">
            {positions.map((item) => (
              <p key={item.id}>
                <span className="font-bold">{item.position}</span>
                {item.organization && ` — ${item.organization}`}
                {item.additionalInfo && ` — ${item.additionalInfo}`}
              </p>
            ))}
          </div>
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          <ul className="list-disc space-y-1 pl-4">
            {achievements.map((item) => (
              <li key={item.id}>
                <span className="font-bold">{item.achievement}</span>
                {item.organization && ` — ${item.organization}`}
                {item.additionalInfo && ` — ${item.additionalInfo}`}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!technical && certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="list-disc space-y-1 pl-4">
            {certifications.map((item) => (
              <li key={item.id}>
                <span className="font-bold">{item.name}</span>
                {item.issuer && ` — ${item.issuer}`}
                {item.year && ` (${item.year})`}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.additionalInfo && (
        <Section title="Additional Information">
          <p>{data.additionalInfo}</p>
        </Section>
      )}
    </>
  );
}

function JuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-3">
      <h2 className="bg-[#d7e7eb] px-2 py-1.5 text-[14px] font-black text-slate-700">
        {title}
      </h2>
      <div className="mt-1">{children}</div>
    </section>
  );
}

function JuCell({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <div
      className={`border-b border-r border-slate-300 p-1.5 ${
        bold ? "font-bold" : ""
      }`}
    >
      {children || "—"}
    </div>
  );
}

function FragmentRow({ cells }: { cells: string[] }) {
  return (
    <>
      {cells.map((cell, index) => (
        <JuCell key={`${cell}-${index}`}>{cell}</JuCell>
      ))}
    </>
  );
}

function CleanSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-400 pb-1 text-[12px] font-black uppercase tracking-[0.16em]">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function TechSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 first:mt-0">
      <h2 className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.14em]">
        <span className="h-2 w-2 rounded-sm bg-cyan-500" />
        {title}
      </h2>
      <div className="mt-2 border-l-2 border-cyan-500/30 pl-3">
        {children}
      </div>
    </section>
  );
}

function ClassicSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="text-center text-[11px] font-black uppercase tracking-[0.18em]">
        {title}
      </h2>
      <div className="mx-auto mt-1 h-px w-full bg-slate-400" />
      <div className="mt-2">{children}</div>
    </section>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-cyan-300/35 pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
      {children}
    </h2>
  );
}

function BulletLines({ text }: { text: string }) {
  const items = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function populated<T extends { id: string }>(items: T[]) {
  return items.filter((item) =>
    Object.entries(item).some(
      ([key, value]) => key !== "id" && String(value).trim().length > 0,
    ),
  );
}

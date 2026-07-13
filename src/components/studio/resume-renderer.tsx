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
  const contacts = [
    p.phone,
    p.email,
    p.github,
    p.website,
    p.linkedin,
    p.location,
  
  ].filter(Boolean);

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

      {contacts.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-1 border-y border-slate-300 py-2 text-[9.5px]">
          {contacts.map((contact) => (
            <span key={contact} className="break-all">
              {contact}
            </span>
          ))}
        </div>
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
                  {item.link && (
                    <p className="mt-1 break-all text-[9px]">{item.link}</p>
                  )}
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

  return (
    <article className="resume-print-page p-[14mm] text-[10.5px] leading-[1.45]">
      <header className="border-b-2 border-slate-900 pb-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[29px] font-black tracking-tight">
              {p.fullName || "Your Name"}
            </h1>
            <p className="mt-1 font-bold text-slate-600">
              {[p.degree, p.department].filter(Boolean).join(" · ")}
            </p>
          </div>

          {p.photo && (
            <img
              src={p.photo}
              alt="Candidate"
              className="h-[82px] w-[64px] object-cover"
            />
          )}
        </div>

        <p className="mt-3 text-[9.5px] text-slate-600">
          {[p.location, p.phone, p.email, p.linkedin, p.github, p.website]
            .filter(Boolean)
            .join("  |  ")}
        </p>
      </header>

     

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
                  <div className="text-right text-[9.5px] text-slate-500">
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

      {projects.length > 0 && (
        <CleanSection title="Projects">
          <div className="space-y-3">
            {projects.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between gap-5">
                  <p className="font-bold">
                    {item.name}
                    {item.technologies && (
                      <span className="font-normal text-slate-600">
                        {" "}
                        | {item.technologies}
                      </span>
                    )}
                  </p>
                  <p className="text-[9.5px] text-slate-500">
                    {item.duration}
                  </p>
                </div>
                <BulletLines text={item.details} />
              </div>
            ))}
          </div>
        </CleanSection>
      )}

      {education.length > 0 && (
        <CleanSection title="Education">
          <div className="space-y-2">
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

      <SecondarySections data={data} />
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

        <div className="mt-7 space-y-2 break-all text-[9px] text-slate-300">
          {[p.location, p.phone, p.email, p.linkedin, p.github, p.website]
            .filter(Boolean)
            .map((item) => (
              <p key={item}>{item}</p>
            ))}
        </div>

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
                    <p className="font-bold">
                      {item.name}
                      {item.technologies && (
                        <span className="font-normal text-cyan-700">
                          {" "}
                          | {item.technologies}
                        </span>
                      )}
                    </p>
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
          <p className="mx-auto mt-3 max-w-[145mm] text-[9px] text-slate-500">
            {[p.location, p.phone, p.email, p.linkedin, p.github, p.website]
              .filter(Boolean)
              .join("  |  ")}
          </p>
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

function SecondarySections({
  data,
  technical = false,
}: {
  data: ResumeData;
  technical?: boolean;
}) {
  const Section = technical ? TechSection : CleanSection;
  const subjects = populated(data.subjects);
  const positions = populated(data.positions);
  const achievements = populated(data.achievements);
  const certifications = populated(data.certifications);

  return (
    <>
      {subjects.length > 0 && (
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

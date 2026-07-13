import type { TemplateId } from "@/lib/resume-types";

export type TemplateDefinition = {
  id: TemplateId;
  name: string;
  description: string;
  badge: string;
};

export const templates: TemplateDefinition[] = [
  {
    id: "ju-university",
    name: "JU University",
    description:
      "The structured university format with logo, candidate photo, pale-blue section bars and compact tables.",
    badge: "Reference format",
  },
  {
    id: "modern-ats",
    name: "Modern ATS",
    description:
      "A clean single-column resume designed for quick scanning and applicant-tracking systems.",
    badge: "ATS friendly",
  },
  {
    id: "technical",
    name: "Technical",
    description:
      "A strong project-first format for engineering, software and technical applications.",
    badge: "Engineering",
  },
  {
    id: "classic",
    name: "Classic Professional",
    description:
      "A restrained, formal format for corporate internships, research and traditional roles.",
    badge: "Professional",
  },
];

export function TemplateMiniature({
  templateId,
}: {
  templateId: TemplateId;
}) {
  if (templateId === "ju-university") {
    return (
      <div className="h-full text-slate-800">
        <div className="grid grid-cols-[30px_1fr_34px] gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 text-[7px] font-black text-red-500">
            JU
          </div>

          <div>
            <div className="h-2.5 w-20 rounded bg-slate-700" />
            <div className="mt-1 h-1.5 w-24 rounded bg-slate-300" />
            <div className="mt-1 h-1.5 w-16 rounded bg-slate-200" />
          </div>

          <div className="aspect-[3/4] border border-dashed border-slate-300 bg-slate-100" />
        </div>

        {["Education", "Experience", "Projects", "Skills"].map((section) => (
          <div key={section} className="mt-3">
            <div className="bg-cyan-100 px-1.5 py-1 text-[6px] font-bold">
              {section}
            </div>
            <div className="mt-1 space-y-1">
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-4/5 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templateId === "modern-ats") {
    return (
      <div className="h-full text-slate-800">
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <div className="mx-auto h-3 w-24 rounded bg-slate-800" />
          <div className="mx-auto mt-2 h-1.5 w-32 rounded bg-slate-300" />
        </div>

        {["Summary", "Experience", "Education", "Skills"].map((section) => (
          <div key={section} className="mt-4">
            <div className="text-[6px] font-black uppercase tracking-widest">
              {section}
            </div>
            <div className="mt-1 h-px bg-slate-400" />
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-5/6 rounded bg-slate-200" />
              <div className="h-1 w-3/4 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templateId === "technical") {
    return (
      <div className="grid h-full grid-cols-[0.34fr_0.66fr] gap-3 text-slate-800">
        <div className="bg-slate-900 p-2">
          <div className="mx-auto h-9 w-9 rounded-full bg-slate-300" />

          <div className="mt-4 space-y-2">
            <div className="h-1 w-full rounded bg-slate-500" />
            <div className="h-1 w-4/5 rounded bg-slate-500" />
            <div className="h-1 w-full rounded bg-slate-500" />
          </div>
        </div>

        <div>
          <div className="h-3 w-20 rounded bg-slate-800" />
          <div className="mt-2 h-1.5 w-16 rounded bg-cyan-500" />

          {["Projects", "Experience", "Education"].map((section) => (
            <div key={section} className="mt-4">
              <div className="text-[6px] font-black uppercase">{section}</div>
              <div className="mt-1.5 space-y-1">
                <div className="h-1 w-full rounded bg-slate-200" />
                <div className="h-1 w-5/6 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full border-[3px] border-double border-slate-600 p-3 text-slate-800">
      <div className="text-center">
        <div className="mx-auto h-3 w-24 rounded bg-slate-700" />
        <div className="mx-auto mt-2 h-1.5 w-28 rounded bg-slate-300" />
      </div>

      {["Profile", "Education", "Experience", "Achievements"].map((section) => (
        <div key={section} className="mt-4">
          <div className="text-center text-[6px] font-black uppercase tracking-wider">
            {section}
          </div>
          <div className="mt-1 h-px bg-slate-400" />
          <div className="mt-2 space-y-1">
            <div className="h-1 w-full rounded bg-slate-200" />
            <div className="h-1 w-4/5 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

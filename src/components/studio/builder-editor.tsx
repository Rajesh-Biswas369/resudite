"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type {
  CollectionKey,
  PersonalInfo,
  ResumeData,
} from "@/lib/resume-types";

type EditorSection =
  | "personal"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "extras";

type BuilderEditorProps = {
  data: ResumeData;
  onPersonalChange: (field: keyof PersonalInfo, value: string) => void;
  onCollectionChange: (
    collection: CollectionKey,
    id: string,
    field: string,
    value: string,
  ) => void;
  onAdd: (collection: CollectionKey) => void;
  onRemove: (collection: CollectionKey, id: string) => void;
  onAdditionalInfoChange: (value: string) => void;
};

const sections: { id: EditorSection; label: string; caption: string }[] = [
  { id: "personal", label: "Personal", caption: "Identity and contact" },
  { id: "education", label: "Education", caption: "Academic records" },
  { id: "experience", label: "Experience", caption: "Work and internships" },
  { id: "projects", label: "Projects", caption: "Unlimited project entries" },
  { id: "skills", label: "Skills", caption: "Technical capabilities" },
  { id: "extras", label: "Extras", caption: "Achievements and more" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.055] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/10";

const textareaClass =
  "min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/10";

export function BuilderEditor({
  data,
  onPersonalChange,
  onCollectionChange,
  onAdd,
  onRemove,
  onAdditionalInfoChange,
}: BuilderEditorProps) {
  const [activeSection, setActiveSection] =
    useState<EditorSection>("personal");

  function readImage(
    field: "photo" | "logo",
    file: File | undefined,
  ) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select a valid image file.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      window.alert("Please use an image smaller than 4 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onPersonalChange(field, reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="grid min-h-0 gap-4 xl:grid-cols-[170px_minmax(0,1fr)]">
      <nav className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-2 backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
          {sections.map((section) => {
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`rounded-xl px-3 py-3 text-left transition ${
                  active
                    ? "bg-gradient-to-r from-cyan-300 to-blue-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="block text-sm font-extrabold">
                  {section.label}
                </span>
                <span
                  className={`mt-1 hidden text-[10px] leading-4 xl:block ${
                    active ? "text-slate-800" : "text-slate-500"
                  }`}
                >
                  {section.caption}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <section className="min-h-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.22 }}
            className="studio-scrollbar max-h-[calc(100vh-176px)] overflow-y-auto"
          >
            {activeSection === "personal" && (
              <PersonalEditor
                data={data}
                onChange={onPersonalChange}
                onImage={readImage}
              />
            )}

            {activeSection === "education" && (
              <CollectionEditor
                title="Education"
                description="Add every degree or certificate the user wants to display."
                addLabel="Add education"
                collection="education"
                items={data.education}
                fields={[
                  ["degree", "Degree / Certificate", "B.E."],
                  ["institute", "Institute / Board", "University or board"],
                  ["score", "CGPA / Percentage", "8.03 CGPA"],
                  ["year", "Year", "2023–2027"],
                ]}
                onAdd={onAdd}
                onRemove={onRemove}
                onChange={onCollectionChange}
              />
            )}

            {activeSection === "experience" && (
              <CollectionEditor
                title="Experience"
                description="Add internships, employment, open-source work or training."
                addLabel="Add experience"
                collection="experience"
                items={data.experience}
                fields={[
                  ["organization", "Organisation", "Company or programme"],
                  ["position", "Position", "Role or designation"],
                  ["duration", "Duration", "Jun 2026 – Jul 2026"],
                  ["location", "Location", "Kolkata / Remote"],
                  [
                    "details",
                    "Work performed",
                    "Write one achievement or responsibility per line.",
                    "textarea",
                  ],
                ]}
                onAdd={onAdd}
                onRemove={onRemove}
                onChange={onCollectionChange}
              />
            )}

            {activeSection === "projects" && (
              <CollectionEditor
                title="Projects"
                description="Create as many project entries as required."
                addLabel="Add project"
                collection="projects"
                items={data.projects}
                fields={[
                  ["name", "Project name", "Project title"],
                  ["technologies", "Technologies", "React, Python, OpenCV"],
                  ["duration", "Duration", "Jul 2026"],
                  ["additionalInfo", "Additional info", "Team project / Winner"],
                  ["link", "Project link", "github.com/..."],
                  [
                    "details",
                    "Project details",
                    "Write one strong result, feature or contribution per line.",
                    "textarea",
                  ],
                ]}
                onAdd={onAdd}
                onRemove={onRemove}
                onChange={onCollectionChange}
              />
            )}

            {activeSection === "skills" && (
              <CollectionEditor
                title="Technical skills"
                description="Use categories to keep the final resume compact and readable."
                addLabel="Add skill category"
                collection="skills"
                items={data.skills}
                fields={[
                  ["category", "Category", "Languages"],
                  ["skills", "Skills", "Python, C++, JavaScript"],
                  ["additionalInfo", "Additional info", "Advanced / Intermediate"],
                ]}
                onAdd={onAdd}
                onRemove={onRemove}
                onChange={onCollectionChange}
              />
            )}

            {activeSection === "extras" && (
              <ExtrasEditor
                data={data}
                onAdd={onAdd}
                onRemove={onRemove}
                onChange={onCollectionChange}
                onAdditionalInfoChange={onAdditionalInfoChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

function PersonalEditor({
  data,
  onChange,
  onImage,
}: {
  data: ResumeData;
  onChange: (field: keyof PersonalInfo, value: string) => void;
  onImage: (field: "photo" | "logo", file: File | undefined) => void;
}) {
  const p = data.personal;

  return (
    <div>
      <EditorHeading
        eyebrow="Section 01"
        title="Personal information"
        description="Every field is entered by the user and appears immediately in the preview."
      />

      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FileField
            label="Candidate photo"
            preview={p.photo}
            onChange={(file) => onImage("photo", file)}
            onClear={() => onChange("photo", "")}
          />
          <FileField
            label="Institution logo"
            preview={p.logo}
            onChange={(file) => onImage("logo", file)}
            onClear={() => onChange("logo", "")}
          />
        </div>

        <Field
          label="Full name"
          value={p.fullName}
          placeholder="Your full name"
          onChange={(value) => onChange("fullName", value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Degree"
            value={p.degree}
            placeholder="Bachelor of Engineering"
            onChange={(value) => onChange("degree", value)}
          />
          <Field
            label="Department"
            value={p.department}
            placeholder="Department of Electrical Engineering"
            onChange={(value) => onChange("department", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="University / Institution"
            value={p.university}
            placeholder="Institution name"
            onChange={(value) => onChange("university", value)}
          />
          <Field
            label="Roll number"
            value={p.rollNumber}
            placeholder="Roll number"
            onChange={(value) => onChange("rollNumber", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Phone"
            value={p.phone}
            placeholder="+91-XXXXXXXXXX"
            onChange={(value) => onChange("phone", value)}
          />
          <Field
            label="Email"
            value={p.email}
            placeholder="name@example.com"
            onChange={(value) => onChange("email", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="GitHub"
            value={p.github}
            placeholder="github.com/username"
            onChange={(value) => onChange("github", value)}
          />
          <Field
            label="Website"
            value={p.website}
            placeholder="yourwebsite.com"
            onChange={(value) => onChange("website", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="LinkedIn"
            value={p.linkedin}
            placeholder="linkedin.com/in/username"
            onChange={(value) => onChange("linkedin", value)}
          />
          <Field
            label="Location"
            value={p.location}
            placeholder="Kolkata, India"
            onChange={(value) => onChange("location", value)}
          />
        </div>

      
      </div>
    </div>
  );
}

function CollectionEditor({
  title,
  description,
  addLabel,
  collection,
  items,
  fields,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  description: string;
  addLabel: string;
  collection: CollectionKey;
  items: Array<Record<string, string>>;
  fields: Array<[string, string, string, "textarea"?]>;
  onAdd: (collection: CollectionKey) => void;
  onRemove: (collection: CollectionKey, id: string) => void;
  onChange: (
    collection: CollectionKey,
    id: string,
    field: string,
    value: string,
  ) => void;
}) {
  return (
    <div>
      <EditorHeading
        eyebrow="Repeatable section"
        title={title}
        description={description}
        action={
          <button
            type="button"
            onClick={() => onAdd(collection)}
            className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-2 text-sm font-extrabold text-slate-950"
          >
            + {addLabel}
          </button>
        }
      />

      <div className="space-y-4 p-5 sm:p-6">
        {items.length === 0 ? (
          <EmptyCollection onAdd={() => onAdd(collection)} label={addLabel} />
        ) : (
          items.map((item, index) => (
            <EntryCard
              key={item.id}
              index={index}
              onRemove={() => onRemove(collection, item.id)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map(([field, label, placeholder, kind]) => {
                  const value = item[field] ?? "";

                  return kind === "textarea" ? (
                    <div key={field} className="sm:col-span-2">
                      <TextAreaField
                        label={label}
                        value={value}
                        placeholder={placeholder}
                        onChange={(nextValue) =>
                          onChange(collection, item.id, field, nextValue)
                        }
                      />
                    </div>
                  ) : (
                    <Field
                      key={field}
                      label={label}
                      value={value}
                      placeholder={placeholder}
                      onChange={(nextValue) =>
                        onChange(collection, item.id, field, nextValue)
                      }
                    />
                  );
                })}
              </div>
            </EntryCard>
          ))
        )}
      </div>
    </div>
  );
}

function ExtrasEditor({
  data,
  onAdd,
  onRemove,
  onChange,
  onAdditionalInfoChange,
}: {
  data: ResumeData;
  onAdd: (collection: CollectionKey) => void;
  onRemove: (collection: CollectionKey, id: string) => void;
  onChange: (
    collection: CollectionKey,
    id: string,
    field: string,
    value: string,
  ) => void;
  onAdditionalInfoChange: (value: string) => void;
}) {
  return (
    <div>
      <EditorHeading
        eyebrow="Optional sections"
        title="Additional resume sections"
        description="Add only the sections that strengthen the application."
      />

      <div className="space-y-7 p-5 sm:p-6">
        <CompactCollection
          title="Subjects of interest"
          collection="subjects"
          items={data.subjects}
          fields={[
            ["subject", "Subject", "Power Systems"],
            ["topics", "Topics", "Protection, stability, machines"],
            ["additionalInfo", "Additional info", "Optional note"],
          ]}
          onAdd={onAdd}
          onRemove={onRemove}
          onChange={onChange}
        />

        <CompactCollection
          title="Positions of responsibility"
          collection="positions"
          items={data.positions}
          fields={[
            ["position", "Position", "Coordinator"],
            ["organization", "Organisation / Event", "Technical society"],
            ["additionalInfo", "Additional info", "Optional note"],
          ]}
          onAdd={onAdd}
          onRemove={onRemove}
          onChange={onChange}
        />

        <CompactCollection
          title="Achievements"
          collection="achievements"
          items={data.achievements}
          fields={[
            ["achievement", "Achievement", "Award or result"],
            ["organization", "Organisation / Event", "Issuing organisation"],
            ["additionalInfo", "Additional info", "Rank / year / amount"],
          ]}
          onAdd={onAdd}
          onRemove={onRemove}
          onChange={onChange}
        />

        <CompactCollection
          title="Certifications"
          collection="certifications"
          items={data.certifications}
          fields={[
            ["name", "Certification", "Course or certification name"],
            ["issuer", "Issuer", "Organisation"],
            ["year", "Year", "2026"],
          ]}
          onAdd={onAdd}
          onRemove={onRemove}
          onChange={onChange}
        />

        <TextAreaField
          label="Additional information"
          value={data.additionalInfo}
          placeholder="Languages, interests, availability or any final relevant detail."
          onChange={onAdditionalInfoChange}
        />
      </div>
    </div>
  );
}

function CompactCollection({
  title,
  collection,
  items,
  fields,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  collection: CollectionKey;
  items: Array<Record<string, string>>;
  fields: Array<[string, string, string]>;
  onAdd: (collection: CollectionKey) => void;
  onRemove: (collection: CollectionKey, id: string) => void;
  onChange: (
    collection: CollectionKey,
    id: string,
    field: string,
    value: string,
  ) => void;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-extrabold">{title}</h3>

        <button
          type="button"
          onClick={() => onAdd(collection)}
          className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-200 hover:bg-cyan-300/15"
        >
          + Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No entries added.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <EntryCard
              key={item.id}
              index={index}
              onRemove={() => onRemove(collection, item.id)}
              compact
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {fields.map(([field, label, placeholder]) => (
                  <Field
                    key={field}
                    label={label}
                    value={item[field] ?? ""}
                    placeholder={placeholder}
                    onChange={(value) =>
                      onChange(collection, item.id, field, value)
                    }
                  />
                ))}
              </div>
            </EntryCard>
          ))}
        </div>
      )}
    </section>
  );
}

function EditorHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-300">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-300">
        {label}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={textareaClass}
      />
    </label>
  );
}

function FileField({
  label,
  preview,
  onChange,
  onClear,
}: {
  label: string;
  preview: string;
  onChange: (file: File | undefined) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-bold text-slate-300">
        {label}
      </span>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-slate-950/50 text-[9px] text-slate-500">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              "IMAGE"
            )}
          </div>

          <div className="min-w-0 flex-1">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => onChange(event.target.files?.[0])}
              className="block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-300/10 file:px-3 file:py-2 file:font-bold file:text-cyan-200 hover:file:bg-cyan-300/15"
            />

            {preview && (
              <button
                type="button"
                onClick={onClear}
                className="mt-2 text-xs font-semibold text-red-300 hover:text-red-200"
              >
                Remove image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EntryCard({
  index,
  children,
  onRemove,
  compact = false,
}: {
  index: number;
  children: React.ReactNode;
  onRemove: () => void;
  compact?: boolean;
}) {
  return (
    <motion.article
      layout
      className={`rounded-2xl border border-white/10 bg-slate-950/35 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          Entry {index + 1}
        </span>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg border border-red-300/15 bg-red-400/[0.06] px-3 py-1.5 text-xs font-bold text-red-200 hover:bg-red-400/10"
        >
          Remove
        </button>
      </div>

      {children}
    </motion.article>
  );
}

function EmptyCollection({
  onAdd,
  label,
}: {
  onAdd: () => void;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] p-8 text-center">
      <p className="text-sm text-slate-500">No entries added yet.</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200"
      >
        + {label}
      </button>
    </div>
  );
}

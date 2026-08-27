"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { BuilderEditor } from "@/components/studio/builder-editor";
import { DigitalBackground } from "@/components/studio/digital-background";
import { ResuditeBrand } from "@/components/studio/resudite-brand";
import { ResumeRenderer } from "@/components/studio/resume-renderer";
import { PreviewCanvas } from "@/components/studio/preview-canvas";
import {
  createEmptyCollectionItem,
  createEmptyResumeData,
  templateNames,
  type CollectionKey,
  type PersonalInfo,
  type ResumeData,
  type ResumeProject,
} from "@/lib/resume-types";
import {
  getActiveProject,
  persistProject,
} from "@/lib/resume-storage";

export default function BuilderPage() {
  const router = useRouter();
  const [project, setProject] = useState<ResumeProject | null>(null);
  const [data, setData] = useState<ResumeData>(() => createEmptyResumeData());
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");

  useEffect(() => {
    const active = getActiveProject();

    if (!active) {
      router.replace("/projects");
      return;
    }

    if (!active.templateId) {
      router.replace("/templates");
      return;
    }

    setProject(active);
    setData(active.resumeData);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready || !project) return;

    setSaveState("saving");

    const timer = window.setTimeout(() => {
      const updated: ResumeProject = {
        ...project,
        resumeData: data,
        updatedAt: new Date().toISOString(),
      };

      persistProject(updated);
      setProject(updated);
      setSaveState("saved");
    }, 450);

    return () => window.clearTimeout(timer);
  }, [data, ready]);

  const completion = useMemo(() => calculateCompletion(data), [data]);

  function updatePersonal(field: keyof PersonalInfo, value: string) {
    setData((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value,
      },
    }));
  }

  function updateCollection(
    collection: CollectionKey,
    id: string,
    field: string,
    value: string,
  ) {
    setData((current) => ({
      ...current,
      [collection]: current[collection].map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addCollectionItem(collection: CollectionKey) {
    const newItem = createEmptyCollectionItem(collection);

    setData((current) => ({
      ...current,
      [collection]: [...current[collection], newItem],
    }));
  }

  function removeCollectionItem(collection: CollectionKey, id: string) {
    setData((current) => ({
      ...current,
      [collection]: current[collection].filter((item) => item.id !== id),
    }));
  }

  if (!ready || !project || !project.templateId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading resume studio…
      </main>
    );
  }

  return (
    <main className="relative print:static min-h-screen overflow-hidden print:overflow-visible bg-slate-950 text-white">
      <DigitalBackground />

      <div className="relative z-10 print:static print:z-auto">
        <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
          <div className="mx-auto flex min-h-20 max-w-[1800px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <ResuditeBrand
              href="/projects"
              subtitle={`${project.name} · ${templateNames[project.templateId]}`}
              compact
            />

            <div className="hidden w-72 lg:block">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Resume completion</span>
                <span className="font-bold text-cyan-300">{completion}%</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 0.35 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-semibold text-slate-500 sm:block">
                {saveState === "saving" ? "Saving…" : "Saved locally"}
              </span>

              <Link
                href="/templates"
                className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2.5 text-sm font-bold transition hover:bg-white/10"
              >
                Template
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-5 py-2.5 text-sm font-extrabold text-slate-950 shadow-[0_16px_50px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5"
              >
                Export PDF
              </button>
            </div>
          </div>
        </header>

        <div className="no-print mx-auto grid max-w-[1800px] gap-5 p-4 sm:p-6 2xl:grid-cols-[760px_minmax(0,1fr)]">
          <BuilderEditor
            data={data}
            onPersonalChange={updatePersonal}
            onCollectionChange={updateCollection}
            onAdd={addCollectionItem}
            onRemove={removeCollectionItem}
            onAdditionalInfoChange={(value) =>
              setData((current) => ({
                ...current,
                additionalInfo: value,
              }))
            }
          />

          <motion.section
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-extrabold">Live A4 preview</p>
                <p className="text-xs text-slate-400">
                  {templateNames[project.templateId]}
                </p>
              </div>

              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-300">
                Live
              </span>
            </div>

            <PreviewCanvas>
  <ResumeRenderer
    data={data}
    templateId={project.templateId}
  />
</PreviewCanvas>
          </motion.section>
        </div>

        <div className="hidden print:block">
          <ResumeRenderer data={data} templateId={project.templateId} />
        </div>
      </div>
    </main>
  );
}

function calculateCompletion(data: ResumeData) {
  const checks = [
    data.personal.fullName,
    data.personal.email,
    data.personal.phone,
    data.personal.degree,
    data.personal.university,
    data.education.length > 0 ? "yes" : "",
    data.projects.length > 0 ? "yes" : "",
    data.skills.length > 0 ? "yes" : "",
    data.personal.photo,
    data.experience.length > 0 ? "yes" : "",
  ];

  const complete = checks.filter((value) => Boolean(String(value).trim())).length;

  return Math.round((complete / checks.length) * 100);
}

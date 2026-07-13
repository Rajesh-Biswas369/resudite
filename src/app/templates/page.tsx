"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { DigitalBackground } from "@/components/studio/digital-background";
import {
  TemplateMiniature,
  templates,
} from "@/components/studio/template-config";
import {
  chooseTemplate,
  getActiveProject,
} from "@/lib/resume-storage";
import type {
  ResumeProject,
  TemplateId,
} from "@/lib/resume-types";

export default function TemplatesPage() {
  const router = useRouter();
  const [project, setProject] = useState<ResumeProject | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId | null>(null);

  useEffect(() => {
    const active = getActiveProject();

    if (!active) {
      router.replace("/projects/new");
      return;
    }

    setProject(active);
    setSelectedTemplate(active.templateId);
  }, [router]);

  function continueToStudio() {
    if (!project || !selectedTemplate) return;

    chooseTemplate(project, selectedTemplate);
    router.push("/builder");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <DigitalBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <header className="flex flex-col gap-7 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              ← My projects
            </Link>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Step 02
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Choose your template
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Select the visual system for{" "}
              <span className="font-bold text-white">
                {project?.name ?? "your resume"}
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            disabled={!project || !selectedTemplate}
            onClick={continueToStudio}
            className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3.5 font-extrabold text-slate-950 shadow-[0_18px_60px_rgba(34,211,238,0.15)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Continue to studio
          </button>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {templates.map((template, index) => {
            const selected = selectedTemplate === template.id;

            return (
              <motion.button
                key={template.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelectedTemplate(template.id)}
                className="text-left"
              >
                <article
                  className={`h-full overflow-hidden rounded-[1.6rem] border backdrop-blur-2xl transition ${
                    selected
                      ? "border-cyan-300/70 bg-cyan-300/[0.08] shadow-[0_30px_90px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/[0.045] hover:border-white/20"
                  }`}
                >
                  <div className="border-b border-white/10 p-4">
                    <div className="aspect-[210/297] overflow-hidden rounded-xl bg-white p-4 shadow-2xl">
                      <TemplateMiniature templateId={template.id} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-black">{template.name}</h2>

                      <span className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                        {template.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {template.description}
                    </p>

                    <div
                      className={`mt-5 flex items-center gap-2 text-sm font-bold ${
                        selected ? "text-cyan-300" : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full border ${
                          selected
                            ? "border-cyan-300 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]"
                            : "border-slate-600"
                        }`}
                      />

                      {selected ? "Selected" : "Select template"}
                    </div>
                  </div>
                </article>
              </motion.button>
            );
          })}
        </section>
      </div>
    </main>
  );
}

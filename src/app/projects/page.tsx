"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { DigitalBackground } from "@/components/studio/digital-background";
import { ResuditeBrand } from "@/components/studio/resudite-brand";
import {
  deleteResumeProject,
  duplicateResumeProject,
  readProjects,
  renameResumeProject,
  setActiveProject,
} from "@/lib/resume-storage";
import {
  templateNames,
  type ResumeProject,
} from "@/lib/resume-types";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ResumeProject[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProjects(readProjects());
    setReady(true);
  }, []);

  function openProject(project: ResumeProject) {
    setActiveProject(project);
    router.push(project.templateId ? "/builder" : "/templates");
  }

  function removeProject(project: ResumeProject) {
    const confirmed = window.confirm(
      `Delete "${project.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    deleteResumeProject(project.id);
    setProjects(readProjects());
  }

  function copyProject(project: ResumeProject) {
    duplicateResumeProject(project);
    setProjects(readProjects());
  }

  function renameProject(project: ResumeProject) {
    const newName = window.prompt("Enter new project name:", project.name);
    if (!newName || newName.trim() === project.name) return;

    renameResumeProject(project.id, newName);
    setProjects(readProjects());
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <DigitalBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <ResuditeBrand
              href="/"
              subtitle="Resume Studio"
              compact
            />

            <h1 className="mt-5 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Resume projects
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Build separate resumes for placements, internships, research and
              different job profiles.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-7 py-3 text-center font-extrabold text-slate-950 shadow-[0_18px_60px_rgba(34,211,238,0.16)] transition hover:-translate-y-0.5"
          >
            New resume project
          </Link>
        </header>

        {!ready ? (
          <div className="py-20 text-slate-500">Loading projects…</div>
        ) : projects.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 rounded-[2rem] border border-dashed border-white/15 bg-white/[0.035] p-10 text-center backdrop-blur-xl sm:p-16"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl font-black text-cyan-300">
              +
            </div>

            <h2 className="mt-6 text-2xl font-black">No resume projects yet</h2>

            <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">
              Create your first project, choose a template and enter your own
              resume information.
            </p>

            <Link
              href="/projects/new"
              className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5"
            >
              Create first project
            </Link>
          </motion.section>
        ) : (
          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:border-cyan-300/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 font-black text-cyan-300">
                      R
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        renameProject(project);
                      }}
                      title="Rename project"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {project.templateId
                        ? templateNames[project.templateId]
                        : "Template pending"}
                    </span>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyProject(project);
                      }}
                      title="Duplicate project"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-black">{project.name}</h2>

                <p className="mt-2 text-sm text-slate-500">
                  Updated{" "}
                  {new Date(project.updatedAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-2.5 font-bold text-slate-950 transition hover:brightness-105"
                  >
                    {project.templateId ? "Open studio" : "Choose template"}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProject(project)}
                    className="rounded-xl border border-red-300/15 bg-red-400/[0.06] px-4 py-2.5 font-semibold text-red-200 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </motion.article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { ResuditeBrand } from "@/components/studio/resudite-brand";
import { DigitalBackground } from "@/components/studio/digital-background";
import { createResumeProject } from "@/lib/resume-storage";

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = projectName.trim();

    if (!cleanName || submitting) return;

    setSubmitting(true);
    createResumeProject(cleanName);
    router.push("/templates");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <DigitalBackground />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-[0_40px_130px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="border-b border-white/10 p-7 sm:p-9">
              <Link
                href="/projects"
                className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                ← My projects
              </Link>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xl font-black text-cyan-300">
                  R
                </div>

                <div>
                  <p className="font-extrabold">Resudite Studio</p>
                  <p className="text-xs text-slate-400">Create a new resume</p>
                </div>
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                Step 01
              </p>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                Name your project
              </h1>

              <p className="mt-4 leading-7 text-slate-400">
                Use a private name that helps you recognise this resume later.
                It will not appear inside the exported document.
              </p>
            </div>

            <form onSubmit={createProject} className="space-y-6 p-7 sm:p-9">
              <label className="block">
                <span className="mb-2.5 block text-sm font-bold">
                  Project name
                </span>

                <input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="Example: Core placement resume"
                  autoFocus
                  maxLength={80}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:ring-4 focus:ring-cyan-300/10"
                />
              </label>

              <button
                type="submit"
                disabled={!projectName.trim() || submitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-300 to-blue-500 font-extrabold text-slate-950 shadow-[0_18px_50px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {submitting ? "Creating…" : "Create project"}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

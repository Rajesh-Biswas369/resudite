"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { AccountMenu } from "@/components/studio/account-menu";
import { DigitalBackground } from "@/components/studio/digital-background";
import { ResuditeBrand } from "@/components/studio/resudite-brand";

export function HomeLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <DigitalBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex h-24 items-center justify-between"
        >
          <ResuditeBrand
            href="/"
            subtitle="Digital Resume System"
            compact
          />

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
            >
              My projects
            </Link>

            <AccountMenu />
          </div>
        </motion.nav>

        <section className="grid min-h-[calc(100vh-96px)] items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
              Live A4 resume architecture
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.16 }}
              className="mt-7 max-w-3xl text-5xl font-black leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
            >
              Build a resume that
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                looks engineered.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.25 }}
              className="mt-7 max-w-xl text-lg leading-8 text-slate-400"
            >
              Create multiple resume projects, choose a professional template,
              enter your own information and export a polished A4 document.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.34 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/projects"
                  className="block rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3.5 text-center font-extrabold text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,0.18)]"
                >
                  Build my resume
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/projects/new"
                  className="block rounded-full border border-white/12 bg-white/[0.055] px-8 py-3.5 text-center font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
                >
                  Start a new project
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6"
            >
              {[
                ["04", "Templates"],
                ["∞", "Projects"],
                ["A4", "PDF output"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 55, rotateY: -7 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[2rem] border border-white/12 bg-white/[0.055] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>

                <span className="text-xs text-slate-400">Live document</span>
              </div>

              <div className="aspect-[210/297] rounded-2xl bg-white p-7 text-slate-900 shadow-2xl">
                <div className="grid grid-cols-[58px_1fr_54px] gap-4 border-b border-slate-200 pb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-500 text-xs font-black text-red-500">
                    JU
                  </div>

                  <div>
                    <div className="h-4 w-36 rounded bg-slate-800" />
                    <div className="mt-2 h-2.5 w-44 rounded bg-slate-300" />
                    <div className="mt-2 h-2.5 w-28 rounded bg-slate-200" />
                  </div>

                  <div className="aspect-[3/4] rounded-sm border border-dashed border-slate-300 bg-slate-100" />
                </div>

                {["Education", "Experience", "Projects", "Technical Skills"].map(
                  (section, index) => (
                    <motion.div
                      key={section}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 + index * 0.12 }}
                      className="mt-5"
                    >
                      <div className="bg-cyan-100 px-3 py-2 text-[9px] font-bold text-slate-700">
                        {section}
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded bg-slate-200" />
                        <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, 1.8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 top-20 rounded-2xl border border-cyan-300/15 bg-slate-900/85 px-4 py-3 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-sm font-bold text-cyan-300">Autosaved</p>
              <p className="mt-1 text-xs text-slate-400">
                Your work stays secure
              </p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

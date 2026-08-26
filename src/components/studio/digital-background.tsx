"use client";

import { motion } from "motion/react";

export function DigitalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden print:hidden">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(109,40,217,0.16),transparent_38%)]" />

      <motion.div
        className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-[130px]"
        animate={{
          x: [0, 130, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-[140px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

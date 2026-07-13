"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ResuditeBrandProps = {
  href?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function ResuditeBrand({
  href,
  subtitle = "Resume Studio",
  className,
  compact = false,
  light = false,
}: ResuditeBrandProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border shadow-[0_10px_28px_rgba(0,0,0,0.24)]",
          compact ? "size-11 rounded-xl" : "size-14 rounded-2xl",
          light
            ? "border-slate-200 bg-[#f7f1e7]"
            : "border-white/15 bg-[#f7f1e7]",
        )}
      >
        <Image
          src="/branding/resudite-logo.jpeg"
          alt="Resudite logo"
          fill
          sizes={compact ? "44px" : "56px"}
          priority
          className="object-cover"
        />
      </div>

      <div className="leading-none">
        <p
          className={cn(
            "font-black uppercase tracking-[0.18em]",
            compact ? "text-base" : "text-lg",
            light ? "text-[#0b2948]" : "text-white",
          )}
        >
          Resudite
        </p>

        <p
          className={cn(
            "mt-2 font-bold uppercase tracking-[0.25em]",
            compact ? "text-[8px]" : "text-[9px]",
            light ? "text-slate-400" : "text-cyan-200/70",
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex rounded-2xl outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {content}
    </Link>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  FileText,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cursor = {
  x: number;
  y: number;
};

type ResuditeLoginProps = {
  onGoogleSignIn?: () => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  className?: string;
};

type EyeProps = {
  cursor: Cursor;
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  forceX?: number;
  forceY?: number;
};

function Eye({
  cursor,
  size = 18,
  pupilSize = 7,
  maxDistance = 4,
  forceX,
  forceY,
}: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);

  let x = 0;
  let y = 0;

  if (forceX !== undefined && forceY !== undefined) {
    x = forceX;
    y = forceY;
  } else if (eyeRef.current) {
    const rect = eyeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = cursor.x - centerX;
    const dy = cursor.y - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy), maxDistance);

    x = Math.cos(angle) * distance;
    y = Math.sin(angle) * distance;
  }

  return (
    <div
      ref={eyeRef}
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[inset_0_-2px_5px_rgba(15,23,42,0.12)]"
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full bg-[#071a2e] transition-transform duration-100 ease-out"
        style={{
          width: pupilSize,
          height: pupilSize,
          transform: `translate(${x}px, ${y}px)`,
        }}
      />
    </div>
  );
}

type ResumeCharacterProps = {
  cursor: Cursor;
  className?: string;
  bodyClassName: string;
  accentClassName: string;
  delay?: number;
  forceLook?: boolean;
  rounded?: "sheet" | "arch" | "soft";
  showPen?: boolean;
};

function ResumeCharacter({
  cursor,
  className,
  bodyClassName,
  accentClassName,
  delay = 0,
  forceLook = false,
  rounded = "sheet",
  showPen = false,
}: ResumeCharacterProps) {
  const reducedMotion = useReducedMotion();

  const radius =
    rounded === "arch"
      ? "rounded-t-[999px]"
      : rounded === "soft"
        ? "rounded-t-[2.25rem]"
        : "rounded-t-[1.15rem]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 42, scale: 0.94 }}
      animate={{
        opacity: 1,
        y: reducedMotion ? 0 : [0, -7, 0],
        rotate: reducedMotion ? 0 : [0, 0.7, 0, -0.7, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.55, delay },
        scale: { duration: 0.55, delay },
        y: {
          duration: 4.6 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: 6 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={cn(
        "absolute bottom-0 origin-bottom overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.28)]",
        radius,
        bodyClassName,
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-white/10" />

      <div className="absolute left-1/2 top-8 flex -translate-x-1/2 gap-5">
        <Eye
          cursor={cursor}
          forceX={forceLook ? 4 : undefined}
          forceY={forceLook ? 2 : undefined}
        />
        <Eye
          cursor={cursor}
          forceX={forceLook ? 4 : undefined}
          forceY={forceLook ? 2 : undefined}
        />
      </div>

      <div className="absolute inset-x-7 top-[5.4rem] space-y-3">
        <div className={cn("h-2 w-[68%] rounded-full", accentClassName)} />
        <div className="h-1.5 w-full rounded-full bg-white/38" />
        <div className="h-1.5 w-[84%] rounded-full bg-white/25" />
        <div className="h-1.5 w-[62%] rounded-full bg-white/25" />
      </div>

      {showPen && (
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, 7, 0],
                  rotate: [-8, -4, -8],
                }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-7 flex h-28 w-7 origin-bottom items-end justify-center"
        >
          <div className="h-20 w-4 rounded-full bg-gradient-to-b from-[#835232] to-[#3b2118] shadow-lg" />
          <div className="absolute bottom-0 h-9 w-7 [clip-path:polygon(50%_100%,0_0,100%_0)] bg-gradient-to-b from-[#f6d878] via-[#c89b2c] to-[#8f6209]" />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ResuditeLogin({
  onGoogleSignIn,
  isLoading = false,
  error = "",
  className,
}: ResuditeLoginProps) {
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });
  const [googleHovered, setGoogleHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    await onGoogleSignIn?.();
  };

  return (
    <main
      className={cn(
        "grid min-h-screen overflow-hidden bg-[#f8fafc] lg:grid-cols-[1.08fr_0.92fr]",
        className,
      )}
    >
      {/* Resudite brand experience */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#041426] px-10 py-9 text-white lg:flex lg:flex-col xl:px-14 xl:py-11">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.26) 0.55px, transparent 0.55px)",
            backgroundSize: "8px 8px",
          }}
        />

        <motion.div
          className="pointer-events-none absolute -left-40 top-16 h-[30rem] w-[30rem] rounded-full bg-[#a71632]/25 blur-[145px]"
          animate={
            reducedMotion
              ? undefined
              : { x: [0, 55, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="pointer-events-none absolute -right-36 top-[18%] h-[29rem] w-[29rem] rounded-full bg-[#d5a52c]/20 blur-[145px]"
          animate={
            reducedMotion
              ? undefined
              : { x: [0, -50, 0], y: [0, 38, 0], scale: [1, 1.1, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="pointer-events-none absolute bottom-[-12rem] left-[30%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[160px]"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.35, 0.68, 0.35], scale: [1, 1.1, 1] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] bg-[radial-gradient(circle_at_center,rgba(25,103,184,0.18),rgba(4,20,38,0.02)_62%,transparent_73%)]" />

        <header className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#f7f1e7] shadow-[0_12px_34px_rgba(0,0,0,0.30)] ring-1 ring-cyan-200/10">
              <Image
                src="/branding/resudite-logo.jpeg"
                alt="Resudite logo"
                fill
                sizes="56px"
                priority
                className="object-cover"
              />
            </div>

            <div className="leading-none">
              <p className="text-xl font-black tracking-[0.2em] text-white">
                RESUDITE
              </p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-200/70">
                Resume Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-cyan-300" />
            Private by design
          </div>
        </header>

        <div className="relative z-20 mt-10 max-w-2xl xl:mt-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xs font-bold uppercase tracking-[0.34em] text-cyan-300"
          >
            Professional resumes, intelligently crafted
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1 }}
            className="mt-5 text-5xl font-black leading-[1.02] tracking-[-0.05em] xl:text-6xl"
          >
            Build your story.
            <span className="mt-2 block bg-gradient-to-r from-[#cb203d] via-[#ef5d32] to-[#d8aa31] bg-clip-text text-transparent">
              Shape your future.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-xl text-[15px] leading-7 text-slate-300"
          >
            Create polished, ATS-ready resumes with live editing, premium
            templates and secure cloud access from any device.
          </motion.p>
        </div>

        <div className="relative z-20 mt-auto flex min-h-[310px] items-end justify-center xl:min-h-[350px]">
          <div className="relative h-[300px] w-[600px] max-w-full xl:h-[340px]">
            <ResumeCharacter
              cursor={cursor}
              forceLook={googleHovered}
              className="left-[5%] h-[255px] w-[185px] xl:h-[285px] xl:w-[205px]"
              bodyClassName="bg-gradient-to-b from-[#bb1735] to-[#741126]"
              accentClassName="bg-[#f0b737]"
              delay={0.1}
              rounded="soft"
            />

            <ResumeCharacter
              cursor={cursor}
              forceLook={googleHovered}
              className="left-[31%] h-[300px] w-[160px] xl:h-[335px] xl:w-[178px]"
              bodyClassName="bg-gradient-to-b from-[#163a61] to-[#071b32]"
              accentClassName="bg-cyan-300"
              delay={0.2}
              rounded="sheet"
              showPen
            />

            <ResumeCharacter
              cursor={cursor}
              forceLook={googleHovered}
              className="right-[7%] h-[235px] w-[185px] xl:h-[265px] xl:w-[205px]"
              bodyClassName="bg-gradient-to-b from-[#e2ba4d] to-[#a87917]"
              accentClassName="bg-[#9d1730]"
              delay={0.35}
              rounded="arch"
            />

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="absolute bottom-0 left-1/2 h-px w-[86%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent"
            />
          </div>
        </div>

        <footer className="relative z-20 mt-6 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>

          <span>© {new Date().getFullYear()} Resudite</span>
        </footer>
      </section>

      {/* Authentication */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-5 py-10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-[25rem] w-[25rem] rounded-full bg-cyan-200/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-200/25 blur-[130px]" />

        <div className="relative z-10 w-full max-w-[430px]">
          <div className="mb-11 flex items-center justify-center gap-3 lg:hidden">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f1e7] shadow-[0_10px_26px_rgba(15,23,42,0.14)]">
              <Image
                src="/branding/resudite-logo.jpeg"
                alt="Resudite logo"
                fill
                sizes="48px"
                priority
                className="object-cover"
              />
            </div>
            <div className="leading-none">
              <p className="font-black tracking-[0.17em] text-[#0b2948]">
                RESUDITE
              </p>
              <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.23em] text-slate-400">
                Resume Studio
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-slate-200/75 bg-white/90 p-7 shadow-[0_28px_80px_rgba(15,23,42,0.11)] backdrop-blur-xl sm:p-9"
          >
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.19em] text-cyan-700">
                <Cloud className="size-3.5" />
                Secure cloud workspace
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#0b2948] sm:text-4xl">
                Welcome to Resudite
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
                Continue with Google to create, organise and securely access
                your resumes from any device.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onMouseEnter={() => setGoogleHovered(true)}
              onMouseLeave={() => setGoogleHovered(false)}
              onFocus={() => setGoogleHovered(true)}
              onBlur={() => setGoogleHovered(false)}
              onClick={handleGoogleSignIn}
              className="group h-13 w-full rounded-xl border-slate-200 bg-white text-[15px] font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)]"
            >
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600" />
                  Connecting…
                </>
              ) : (
                <>
                  <GoogleIcon className="mr-2 size-5" />
                  Continue with Google
                </>
              )}
            </Button>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="space-y-4">
              <TrustItem
                icon={FileText}
                title="Resume-ready workspace"
                description="Professional templates and a live A4 preview."
              />
              <TrustItem
                icon={ShieldCheck}
                title="Private to your account"
                description="Your projects remain isolated from other users."
              />
              <TrustItem
                icon={PenLine}
                title="Continue from any device"
                description="Your work will be saved securely to the cloud."
              />
            </div>

            <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
              By continuing, you agree to the{" "}
              <a href="/terms" className="font-medium text-slate-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="font-medium text-slate-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

type TrustItemProps = {
  icon: typeof FileText;
  title: string;
  description: string;
};

function TrustItem({ icon: Icon, title, description }: TrustItemProps) {
  return (
    <div className="flex gap-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2948]/[0.06] text-[#0b2948]">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-1.99 3.02v2.54h3.23c1.89-1.74 2.98-4.3 2.98-7.41Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.89 6.62-2.36l-3.23-2.54c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.93A6 6 0 0 1 6.09 12c0-.67.11-1.32.31-1.93V7.45H3.06A10 10 0 0 0 2 12c0 1.61.38 3.13 1.06 4.55l3.34-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.96 2.95 14.7 2 12 2a10 10 0 0 0-8.94 5.45l3.34 2.62C7.19 7.7 9.4 5.94 12 5.94Z"
      />
    </svg>
  );
}

export const Component = ResuditeLogin;

"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, UserRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type AccountDetails = {
  email: string;
  name: string;
  avatarUrl: string;
};

export function AccountMenu() {
  const [account, setAccount] = useState<AccountDetails>({
    email: "",
    name: "Account",
    avatarUrl: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;

      if (!user) return;

      const metadata = user.user_metadata ?? {};

      setAccount({
        email: user.email ?? "",
        name:
          metadata.full_name ??
          metadata.name ??
          user.email?.split("@")[0] ??
          "Account",
        avatarUrl:
          metadata.avatar_url ??
          metadata.picture ??
          "",
      });
    });
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    window.location.replace("/login");
  };

  const fallbackLetter =
    account.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open account menu"
        aria-expanded={isOpen}
        className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.07] text-sm font-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-cyan-300/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        {account.avatarUrl ? (
          <img
            src={account.avatarUrl}
            alt={account.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>{fallbackLetter}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="border-b border-white/10 px-3 py-3">
            <p className="truncate text-sm font-bold text-white">
              {account.name}
            </p>
            <p className="mt-1 truncate text-xs text-slate-400">
              {account.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? (
              <span className="size-4 animate-spin rounded-full border-2 border-slate-500 border-t-white" />
            ) : (
              <LogOut className="size-4" />
            )}

            {isSigningOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}

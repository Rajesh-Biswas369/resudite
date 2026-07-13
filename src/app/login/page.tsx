"use client";





import { useState } from "react";

import { Component } from "@/components/ui/animated-characters-login-page";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
       redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    }
  };

  return (
    <Component
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
      error={error}
    />
  );
}

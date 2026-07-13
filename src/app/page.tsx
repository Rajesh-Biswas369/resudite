import { redirect } from "next/navigation";

import { HomeLanding } from "@/components/studio/home-landing";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <HomeLanding />;
}

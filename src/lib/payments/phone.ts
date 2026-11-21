import "server-only";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";

export async function readConsultationPhone() {
  const fromEnv = process.env.CONSULTATION_PHONE?.trim() || "";
  if (!isServiceRoleConfigured()) return fromEnv;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("private_settings").select("consultation_phone").eq("id", 1).maybeSingle();
    const stored = String((data as { consultation_phone?: string } | null)?.consultation_phone || "").trim();
    return stored || fromEnv;
  } catch {
    return fromEnv;
  }
}

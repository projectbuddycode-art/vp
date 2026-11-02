import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

async function LoginBody({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="font-serif text-5xl">Supabase is not configured.</h1>
        <p className="mt-4 text-sm leading-relaxed text-deep/75">
          Add the public Supabase URL and anon key, apply the database migration, then create an administrator before using this desk.
        </p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <p className="text-[0.72rem] tracking-[0.2em] text-gold uppercase">Sanjeev Jain</p>
      <h1 className="mt-3 font-serif text-5xl">Studio desk</h1>
      {params.error === "unauthorised" ? (
        <p className="mt-4 text-sm text-terracotta">That account cannot open the desk.</p>
      ) : null}
      <LoginForm />
    </main>
  );
}

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <Suspense fallback={<main className="px-6 py-24">Opening sign in…</main>}>
      <LoginBody searchParams={searchParams} />
    </Suspense>
  );
}

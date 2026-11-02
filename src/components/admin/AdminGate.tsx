import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/admin";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Enquiries" },
  { href: "/admin/case-studies", label: "Case studies" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/articles", label: "Knowledge" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
];

export async function AdminGate({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-[0.72rem] tracking-[0.2em] text-gold uppercase">Studio desk</p>
        <h1 className="mt-3 font-serif text-5xl">Connect Supabase before signing in.</h1>
        <p className="mt-4 text-sm leading-relaxed text-deep/75">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, run the migration in supabase/migrations, create an auth user, and set that user’s profile role to admin. The public website continues to work without these values. Enquiries are not stored until the service role key is also set.
        </p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") {
    return (
      <main className="mx-auto max-w-xl px-6 py-20">
        <h1 className="font-serif text-5xl">This account is not an administrator.</h1>
        <p className="mt-4 text-sm leading-relaxed">Sign in with the user whose profile role is admin.</p>
        <form action={signOut} className="mt-6">
          <button className="bg-deep px-4 py-2 text-sm text-ivory">Sign out</button>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#efe8da] md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-deep text-ivory md:min-h-screen">
        <div className="px-5 py-6">
          <p className="font-serif text-2xl">Studio desk</p>
          <p className="mt-1 text-xs text-sand">{profile.full_name || user.email}</p>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:block md:space-y-1 md:px-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block whitespace-nowrap px-3 py-2 text-sm text-sand hover:bg-white/5 hover:text-ivory">
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="px-5 py-4">
          <button className="text-xs tracking-[0.14em] text-sand uppercase">Sign out</button>
        </form>
        {!isServiceRoleConfigured() ? (
          <p className="px-5 pb-6 text-xs leading-relaxed text-sand">Uploads and public enquiry storage need the service role key.</p>
        ) : null}
      </aside>
      <div className="px-4 py-6 sm:px-8">{children}</div>
    </div>
  );
}

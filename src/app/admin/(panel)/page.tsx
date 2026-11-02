import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { leadStatuses } from "@/lib/site";

export default async function DashboardPage() {
  const supabase = await createClient();
  const [{ data: enquiries }, { count: studies }, { count: testimonials }] = await Promise.all([
    supabase.from("enquiries").select("status"),
    supabase.from("case_studies").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("published", true).eq("approved", true),
  ]);
  const rows = (enquiries || []) as { status: string }[];
  const count = (status: string) => rows.filter((row) => row.status === status).length;
  const cards = [
    { label: "Total enquiries", value: rows.length, href: "/admin/leads" },
    { label: "New enquiries", value: count("new"), href: "/admin/leads?status=new" },
    { label: "Scheduled consultations", value: count("consultation_scheduled"), href: "/admin/leads?status=consultation_scheduled" },
    { label: "Completed assessments", value: count("assessment_completed") + count("recommendations_provided"), href: "/admin/leads" },
    { label: "Published case studies", value: studies || 0, href: "/admin/case-studies" },
    { label: "Published testimonials", value: testimonials || 0, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="font-serif text-5xl">Dashboard</h1>
      <p className="mt-2 text-sm text-deep/70">Private counts from the consultancy records.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-ivory p-5">
            <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{card.label}</p>
            <p className="mt-3 font-serif text-5xl">{card.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-xs text-deep/60">Pipeline: {leadStatuses.map((item) => item.label).join(" · ")}</p>
    </div>
  );
}

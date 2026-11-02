import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { caseCategories, labelFor } from "@/lib/site";

export default async function CaseStudiesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("case_studies").select("id, title, slug, published, consent_status, category").order("updated_at", { ascending: false });
  const rows = (data || []) as Record<string, string | boolean>[];
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-serif text-5xl">Case studies</h1>
        <Link href="/admin/case-studies/new" className="bg-deep px-4 py-2 text-sm text-ivory">New study</Link>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-deep/70">Publishing requires consent marked as granted. Unpublished templates are not shown on the website.</p>
      <ul className="mt-6 space-y-2">
        {rows.map((row) => (
          <li key={String(row.id)} className="bg-ivory px-4 py-3 text-sm">
            <Link href={`/admin/case-studies/${row.id}`} className="font-medium underline">{String(row.title)}</Link>
            <p className="text-deep/60">
              {labelFor(caseCategories, String(row.category))} · {row.published ? "Published" : "Unpublished"} · Consent {String(row.consent_status)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

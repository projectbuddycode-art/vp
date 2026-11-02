import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ArticlesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("id, title, slug, published").order("updated_at", { ascending: false });
  const rows = (data || []) as Record<string, string | boolean>[];
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-serif text-5xl">Knowledge</h1>
        <Link href="/admin/articles/new" className="bg-deep px-4 py-2 text-sm text-ivory">New article</Link>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-deep/70">
        Built-in essays remain visible. A published CMS article with the same slug replaces that essay.
      </p>
      <ul className="mt-6 space-y-2">
        {rows.map((row) => (
          <li key={String(row.id)} className="bg-ivory px-4 py-3 text-sm">
            <Link className="underline" href={`/admin/articles/${row.id}`}>{String(row.title)}</Link>
            <span className="ml-2 text-deep/50">{row.published ? "Published" : "Draft"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

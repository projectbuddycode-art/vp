import { saveFaq } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";

export default async function FaqsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  const rows = (data || []) as Record<string, string | number | boolean>[];
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-5xl">FAQs</h1>
      <form action={saveFaq} className="max-w-2xl space-y-3 bg-ivory p-5">
        <h2 className="font-serif text-3xl">New question</h2>
        <input name="question" className="field" placeholder="Question" />
        <textarea name="answer" rows={4} className="field" placeholder="Answer" />
        <input name="sort_order" type="number" defaultValue={rows.length + 1} className="field" />
        <label className="flex gap-2 text-sm"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="bg-deep px-4 py-2 text-sm text-ivory">Add FAQ</button>
      </form>
      {rows.map((row) => (
        <form key={String(row.id)} action={saveFaq} className="max-w-2xl space-y-3 bg-ivory p-5">
          <input type="hidden" name="id" value={String(row.id)} />
          <input name="question" defaultValue={String(row.question)} className="field" />
          <textarea name="answer" rows={5} defaultValue={String(row.answer)} className="field" />
          <input name="sort_order" type="number" defaultValue={Number(row.sort_order)} className="field" />
          <label className="flex gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={Boolean(row.published)} /> Published</label>
          <button className="bg-deep px-4 py-2 text-sm text-ivory">Save answer</button>
        </form>
      ))}
    </div>
  );
}

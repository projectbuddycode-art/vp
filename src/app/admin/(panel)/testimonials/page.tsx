import { deleteTestimonial, saveTestimonial } from "@/lib/actions/admin";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { createClient } from "@/lib/supabase/server";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  const rows = (data || []) as Record<string, string | boolean>[];

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-5xl">Testimonials</h1>
      <form action={saveTestimonial} className="max-w-2xl space-y-3 bg-ivory p-5">
        <h2 className="font-serif text-3xl">Add a review</h2>
        <select name="kind" className="field">
          <option value="written">Written</option>
          <option value="video">Video</option>
        </select>
        <textarea name="content" rows={4} placeholder="Client’s words" className="field" />
        <input name="video_url" placeholder="YouTube or Vimeo URL" className="field" />
        <input name="client_name" placeholder="Client name, if they agreed" className="field" />
        <input name="source_url" placeholder="Verified source link" className="field" />
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
        <label className="flex gap-2 text-sm"><input type="checkbox" name="approved" /> Approved</label>
        <label className="flex gap-2 text-sm"><input type="checkbox" name="published" /> Published</label>
        <button className="bg-deep px-4 py-2 text-sm text-ivory">Save testimonial</button>
      </form>
      <ul className="space-y-4">
        {rows.map((row) => (
          <li key={String(row.id)} className="bg-ivory p-4 text-sm">
            <p>{String(row.content)}</p>
            <p className="mt-2 text-deep/60">{row.approved ? "Approved" : "Not approved"} · {row.published ? "Published" : "Hidden"}</p>
            <ConfirmDelete action={deleteTestimonial.bind(null, String(row.id))} label="Delete" />
          </li>
        ))}
      </ul>
    </div>
  );
}

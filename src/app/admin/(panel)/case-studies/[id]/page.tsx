import { notFound } from "next/navigation";
import { deleteCaseStudy, saveCaseStudy } from "@/lib/actions/admin";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { createClient } from "@/lib/supabase/server";
import { caseCategories, consentValues } from "@/lib/site";

export default async function CaseStudyEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = await createClient();
  const { data } = isNew ? { data: null } : await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
  if (!isNew && !data) notFound();
  const row = (data || {}) as Record<string, string | boolean>;

  return (
    <form action={saveCaseStudy} className="max-w-3xl space-y-4">
      <h1 className="font-serif text-5xl">{isNew ? "New case study" : "Edit case study"}</h1>
      <input type="hidden" name="id" value={isNew ? "" : id} />
      <input type="hidden" name="existing_cover" value={String(row.cover_image_url || "")} />
      <label className="label">Title</label>
      <input name="title" required defaultValue={String(row.title || "")} className="field" />
      <label className="label">Slug</label>
      <input name="slug" defaultValue={String(row.slug || "")} className="field" />
      <label className="label">Category</label>
      <select name="category" defaultValue={String(row.category || "residential")} className="field">
        {caseCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      {[
        ["client_concern", "Client concern"],
        ["property_context", "Property context"],
        ["assessment", "Assessment"],
        ["identified_issues", "Identified issues"],
        ["recommendations", "Recommendations"],
        ["implementation_details", "Implementation"],
        ["estimated_remedy_cost", "Estimated remedy cost, if verified"],
        ["client_reported_experience", "Client-reported experience"],
        ["timeline", "Timeline"],
      ].map(([name, label]) => (
        <div key={name}>
          <label className="label">{label}</label>
          <textarea name={name} rows={4} defaultValue={String(row[name] || "")} className="field" />
        </div>
      ))}
      <label className="label">Cover photograph</label>
      <input name="cover" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
      <label className="label">Cover alt text</label>
      <input name="cover_image_alt" defaultValue={String(row.cover_image_alt || "")} className="field" />
      <label className="label">Before photograph</label>
      <input name="before" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
      <label className="label">After photograph</label>
      <input name="after" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
      <label className="label">Consent</label>
      <select name="consent_status" defaultValue={String(row.consent_status || "pending")} className="field">
        {consentValues.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={Boolean(row.published)} />
        Publish. This stays off the website unless consent is granted.
      </label>
      <label className="label">SEO title</label>
      <input name="seo_title" defaultValue={String(row.seo_title || "")} className="field" />
      <label className="label">SEO description</label>
      <textarea name="seo_description" rows={3} defaultValue={String(row.seo_description || "")} className="field" />
      <button className="bg-deep px-4 py-2 text-sm text-ivory">Save study</button>
      {!isNew ? <ConfirmDelete action={deleteCaseStudy.bind(null, id)} label="Delete study" /> : null}
    </form>
  );
}

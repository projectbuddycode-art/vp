import { notFound } from "next/navigation";
import { deleteArticle, saveArticle } from "@/lib/actions/admin";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { articleCategories } from "@/lib/content/articles";
import { createClient } from "@/lib/supabase/server";

export default async function ArticleEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = await createClient();
  const { data } = isNew ? { data: null } : await supabase.from("articles").select("*, article_categories(name)").eq("id", id).maybeSingle();
  if (!isNew && !data) notFound();
  const row = (data || {}) as Record<string, unknown>;
  const categoryJoin = row.article_categories as { name?: string } | null;
  return (
    <form action={saveArticle} className="max-w-3xl space-y-4">
      <h1 className="font-serif text-5xl">{isNew ? "New article" : "Edit article"}</h1>
      <input type="hidden" name="id" value={isNew ? "" : id} />
      <input type="hidden" name="existing_image" value={String(row.featured_image_url || "")} />
      <input type="hidden" name="category_id" value={String(row.category_id || "")} />
      <label className="label">Title</label>
      <input name="title" required defaultValue={String(row.title || "")} className="field" />
      <label className="label">Slug</label>
      <input name="slug" defaultValue={String(row.slug || "")} className="field" />
      <label className="label">Category</label>
      <input name="category" list="categories" defaultValue={categoryJoin?.name || "Practice"} className="field" />
      <datalist id="categories">
        {articleCategories.map((category) => <option key={category} value={category} />)}
      </datalist>
      <label className="label">Excerpt</label>
      <textarea name="excerpt" rows={3} defaultValue={String(row.excerpt || "")} className="field" />
      <label className="label">Article</label>
      <textarea name="content" rows={16} defaultValue={String(row.content || "")} className="field" />
      <label className="label">Featured image</label>
      <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
      <input name="image_alt" placeholder="Image description" defaultValue={String(row.featured_image_alt || "")} className="field" />
      <label className="label">SEO title</label>
      <input name="seo_title" defaultValue={String(row.seo_title || "")} className="field" />
      <label className="label">SEO description</label>
      <textarea name="seo_description" rows={3} defaultValue={String(row.seo_description || "")} className="field" />
      <label className="flex gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={Boolean(row.published)} /> Published</label>
      <button className="bg-deep px-4 py-2 text-sm text-ivory">Save article</button>
      {!isNew ? <ConfirmDelete action={deleteArticle.bind(null, id)} label="Delete article" /> : null}
    </form>
  );
}

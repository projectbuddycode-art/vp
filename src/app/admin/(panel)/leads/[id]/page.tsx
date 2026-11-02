import { notFound } from "next/navigation";
import { addEnquiryNote, updateEnquiry } from "@/lib/actions/admin";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { concernCategories, consultationModes, labelFor, leadStatuses, propertyTypes } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: enquiry }, { data: notes }, { data: consultations }] = await Promise.all([
    supabase.from("enquiries").select("*").eq("id", id).maybeSingle(),
    supabase.from("enquiry_notes").select("*").eq("enquiry_id", id).order("created_at", { ascending: false }),
    supabase.from("consultations").select("*").eq("enquiry_id", id).order("created_at", { ascending: false }),
  ]);
  if (!enquiry) notFound();
  const row = enquiry as Record<string, unknown>;
  const paths = Array.isArray(row.attachment_paths) ? row.attachment_paths.map(String) : [];
  const files: string[] = [];
  if (paths.length && isServiceRoleConfigured()) {
    const service = createServiceClient();
    for (const path of paths) {
      const { data } = await service.storage.from("enquiry-uploads").createSignedUrl(path, 600);
      if (data?.signedUrl) files.push(data.signedUrl);
    }
  }

  return (
    <div className="max-w-4xl">
      <p className="text-[0.72rem] tracking-[0.16em] text-gold uppercase">{String(row.enquiry_code)}</p>
      <h1 className="mt-2 font-serif text-5xl">{String(row.full_name)}</h1>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>Mobile: {String(row.mobile)}</div>
        <div>Email: {String(row.email)}</div>
        <div>City: {String(row.city)}</div>
        <div>Received: {formatDate(String(row.created_at))}</div>
        <div>Property: {labelFor(propertyTypes, String(row.property_type))}</div>
        <div>Concern: {labelFor(concernCategories, String(row.consultation_category))}</div>
        <div>Mode: {labelFor(consultationModes, String(row.consultation_mode))}</div>
        <div>Preferred date: {String(row.preferred_date || "—")}</div>
        <div>Marketing consent: {row.marketing_consent ? "Yes" : "No"}</div>
      </dl>
      <h2 className="mt-8 font-serif text-3xl">Concern</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{String(row.client_concern || "")}</p>
      <h2 className="mt-8 font-serif text-3xl">Property</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{String(row.property_description || "No description supplied.")}</p>
      {files.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm">
          {files.map((file) => (
            <li key={file}>
              <a className="underline" href={file}>Open private file</a>
            </li>
          ))}
        </ul>
      ) : null}
      <form action={updateEnquiry} className="mt-8 grid gap-3 bg-ivory p-5">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="consultation_mode" value={String(row.consultation_mode || "on_site")} />
        <label className="label" htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={String(row.status)} className="field">
          {leadStatuses.map((status) => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
        <label className="label" htmlFor="follow_up_at">Follow-up or visit time</label>
        <input id="follow_up_at" name="follow_up_at" type="datetime-local" className="field" defaultValue={String(row.follow_up_at || "").slice(0, 16)} />
        <label className="label" htmlFor="schedule_note">Scheduling note</label>
        <input id="schedule_note" name="schedule_note" className="field" />
        <button className="w-fit bg-deep px-4 py-2 text-sm text-ivory">Save status</button>
      </form>
      <section className="mt-8">
        <h2 className="font-serif text-3xl">Notes</h2>
        <form action={addEnquiryNote} className="mt-3 space-y-3">
          <input type="hidden" name="id" value={id} />
          <textarea name="note" rows={4} className="field" placeholder="Internal note" />
          <button className="bg-deep px-4 py-2 text-sm text-ivory">Add note</button>
        </form>
        <ul className="mt-4 space-y-3">
          {((notes || []) as Record<string, string>[]).map((note) => (
            <li key={note.id} className="bg-ivory p-4 text-sm">
              <p className="whitespace-pre-line">{note.body}</p>
              <p className="mt-2 text-xs text-deep/50">{formatDate(note.created_at)}</p>
            </li>
          ))}
        </ul>
      </section>
      {((consultations || []) as Record<string, string>[]).length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-3xl">Scheduled consultations</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {((consultations || []) as Record<string, string>[]).map((item) => (
              <li key={item.id}>{formatDate(item.scheduled_at)} · {item.status}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

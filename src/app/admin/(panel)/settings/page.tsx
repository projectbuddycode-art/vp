import { saveSettings } from "@/lib/actions/admin";
import { factsAwaitingConfirmation } from "@/lib/content/confirmation";
import { createClient } from "@/lib/supabase/server";
import { defaultSettings } from "@/lib/site";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("website_settings").select("*").eq("id", 1).maybeSingle();
  const row = (data || {}) as Record<string, unknown>;
  const deliverables = Array.isArray(row.deliverables) ? row.deliverables.join("\n") : defaultSettings.deliverables.join("\n");
  return (
    <form action={saveSettings} className="max-w-3xl space-y-4">
      <h1 className="font-serif text-5xl">Website settings</h1>
      <aside className="border border-deep/10 bg-parchment p-4 text-sm leading-relaxed">
        <p className="font-serif text-2xl">Confirm before publishing</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {factsAwaitingConfirmation.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </aside>
      <input type="hidden" name="existing_portrait" value={String(row.founder_portrait_url || "")} />
      {(
        [
          ["brand_name", "Brand name", row.brand_name || defaultSettings.brandName],
          ["practice_name", "Practice name", row.practice_name || defaultSettings.practiceName],
          ["tagline", "Tagline", row.tagline || defaultSettings.tagline],
          ["core_message", "Core message", row.core_message || defaultSettings.coreMessage],
          ["phone", "Phone", row.phone || ""],
          ["whatsapp", "WhatsApp number with country code", row.whatsapp || ""],
          ["email", "Email", row.email || ""],
          ["instagram_url", "Instagram URL", row.instagram_url || ""],
          ["linkedin_url", "LinkedIn URL", row.linkedin_url || ""],
          ["service_areas", "Service areas", row.service_areas || ""],
          ["address", "Address", row.address || ""],
          ["consultation_fee", "Consultation fee", String(row.consultation_fee || 10000)],
        ] as [string, string, string][]
      ).map(([name, label, value]) => (
        <div key={String(name)}>
          <label className="label">{label}</label>
          <input name={String(name)} defaultValue={String(value)} className="field" />
        </div>
      ))}
      <label className="label">Fee note</label>
      <textarea name="fee_note" rows={3} defaultValue={String(row.fee_note || defaultSettings.feeNote)} className="field" />
      <label className="label">Remedy note</label>
      <textarea name="remedy_note" rows={4} defaultValue={String(row.remedy_note || defaultSettings.remedyNote)} className="field" />
      <label className="label">Deliverables, one per line</label>
      <textarea name="deliverables" rows={6} defaultValue={deliverables} className="field" />
      <label className="label">Founder biography</label>
      <textarea name="founder_summary" rows={8} defaultValue={String(row.founder_summary || "")} className="field" placeholder="Leave blank to keep the labelled placeholder on the website." />
      <label className="label">Founder portrait</label>
      <input name="portrait" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
      <label className="label">Hero Sanskrit verse</label>
      <textarea name="hero_sanskrit" rows={3} defaultValue={String(row.hero_sanskrit || "")} className="field" placeholder="Only a verified verse." />
      <label className="label">English translation</label>
      <textarea name="hero_translation" rows={3} defaultValue={String(row.hero_translation || "")} className="field" />
      <label className="label">Booking note</label>
      <textarea name="booking_note" rows={3} defaultValue={String(row.booking_note || defaultSettings.bookingNote)} className="field" />
      <label className="flex gap-2 text-sm">
        <input type="checkbox" name="online_consultation_enabled" defaultChecked={Boolean(row.online_consultation_enabled)} />
        Allow online consultation as a form option
      </label>
      <button className="bg-deep px-4 py-2 text-sm text-ivory">Save settings</button>
    </form>
  );
}

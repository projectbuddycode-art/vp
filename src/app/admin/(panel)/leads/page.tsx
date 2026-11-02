import Link from "next/link";
import { ExportLeads } from "@/components/admin/ExportLeads";
import { createClient } from "@/lib/supabase/server";
import { labelFor, leadStatuses } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  let query = supabase.from("enquiries").select("id, enquiry_code, full_name, city, status, created_at, email, mobile").order("created_at", { ascending: false });
  if (params.status) query = query.eq("status", params.status);
  if (params.q) {
    const term = params.q.replace(/[^a-zA-Z0-9 @._-]/g, "").slice(0, 80);
    if (term) {
      query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%,enquiry_code.ilike.%${term}%,city.ilike.%${term}%`);
    }
  }
  const { data } = await query.limit(200);
  const rows = (data || []) as Record<string, string>[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-5xl">Enquiries</h1>
        <ExportLeads />
      </div>
      <form className="mt-6 flex flex-wrap gap-3" action="/admin/leads">
        <input name="q" defaultValue={params.q || ""} placeholder="Search name, email, city, reference" className="field max-w-sm" />
        <select name="status" defaultValue={params.status || ""} className="field max-w-[220px]">
          <option value="">All statuses</option>
          {leadStatuses.map((status) => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
        <button className="bg-deep px-4 py-2 text-sm text-ivory">Filter</button>
      </form>
      <div className="mt-6 overflow-x-auto bg-ivory">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-deep/10 text-[0.68rem] tracking-[0.14em] uppercase">
            <tr>
              <th className="p-3">Reference</th>
              <th className="p-3">Name</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
              <th className="p-3">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="p-4 text-deep/60" colSpan={5}>No enquiries match.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-deep/5">
                  <td className="p-3">
                    <Link href={`/admin/leads/${row.id}`} className="underline">{row.enquiry_code}</Link>
                  </td>
                  <td className="p-3">{row.full_name}</td>
                  <td className="p-3">{row.city}</td>
                  <td className="p-3">{labelFor(leadStatuses, row.status)}</td>
                  <td className="p-3">{formatDate(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

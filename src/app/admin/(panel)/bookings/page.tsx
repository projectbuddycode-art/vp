import Link from "next/link";
import { updateBooking } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import { formatInr } from "@/lib/utils";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100);
  const rows = (data || []) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-5xl">Bookings</h1>
        <p className="mt-2 text-sm text-deep/70">Phone and on-site token bookings. The consultation number is never shown here from the public site.</p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-deep/70">No bookings yet. Apply the bookings migration and connect Razorpay before testing payments.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => {
            const id = String(row.id);
            return (
              <article key={id} className="border border-deep/10 bg-ivory p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.72rem] tracking-[0.16em] text-gold uppercase">{String(row.booking_code)}</p>
                    <h2 className="mt-1 font-serif text-3xl">{String(row.full_name)}</h2>
                    <p className="mt-1 text-sm text-deep/75">
                      {String(row.mobile)} · {String(row.language)} · {String(row.kind)}
                      {row.subject ? ` · ${String(row.subject)}` : ""}
                    </p>
                  </div>
                  <p className="text-sm">
                    {String(row.payment_status)} / {String(row.booking_status)}
                  </p>
                </div>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-bark">Preferred date</dt>
                    <dd>{String(row.preferred_date || "—")}</dd>
                  </div>
                  <div>
                    <dt className="text-bark">Preferred time</dt>
                    <dd>{String(row.preferred_time || "—")}</dd>
                  </div>
                  <div>
                    <dt className="text-bark">Total / token / remaining</dt>
                    <dd>
                      {formatInr(Number(row.total_amount || 0))} / {formatInr(Number(row.token_amount || 0))} / {formatInr(Number(row.remaining_amount || 0))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-bark">Payment ref</dt>
                    <dd className="break-all">{String(row.gateway_payment_id || row.gateway_order_id || "—")}</dd>
                  </div>
                </dl>
                {row.concern ? <p className="mt-3 text-sm leading-relaxed text-deep/75">{String(row.concern)}</p> : null}
                <form action={updateBooking} className="mt-4 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="id" value={id} />
                  <div>
                    <label className="label">Booking status</label>
                    <select name="booking_status" className="field" defaultValue={String(row.booking_status)}>
                      <option value="requested">Requested</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rescheduled">Rescheduled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Preferred date</label>
                    <input type="date" name="preferred_date" className="field" defaultValue={String(row.preferred_date || "")} />
                  </div>
                  <div>
                    <label className="label">Preferred time</label>
                    <input name="preferred_time" className="field" defaultValue={String(row.preferred_time || "")} />
                  </div>
                  <button className="bg-deep px-4 py-2 text-sm text-ivory">Save</button>
                </form>
              </article>
            );
          })}
        </div>
      )}
      <p className="text-sm">
        Configure the private consultation number in <Link href="/admin/settings" className="underline">Settings</Link>.
      </p>
    </div>
  );
}

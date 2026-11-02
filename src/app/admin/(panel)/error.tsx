"use client";

export default function AdminError({ error }: { error: Error }) {
  return (
    <div className="bg-ivory p-6">
      <h1 className="font-serif text-4xl">The desk could not complete that.</h1>
      <p className="mt-3 text-sm">{error.message}</p>
    </div>
  );
}

"use client";

export function ConfirmDelete({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Remove this record?")) event.preventDefault();
      }}
    >
      <button className="text-sm text-terracotta underline">{label}</button>
    </form>
  );
}

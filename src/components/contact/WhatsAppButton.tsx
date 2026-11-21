import { whatsappHref } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  number,
  message,
  label,
  className,
  variant = "solid",
}: {
  number?: string;
  message: string;
  label: string;
  className?: string;
  variant?: "solid" | "line" | "light";
}) {
  const href = number ? whatsappHref(number, message) : null;
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition",
        variant === "solid" && "bg-[#1f6b45] text-ivory hover:bg-[#185536]",
        variant === "line" && "border border-deep/20 text-deep hover:bg-parchment",
        variant === "light" && "bg-ivory text-deep hover:bg-sand",
        className,
      )}
    >
      <span aria-hidden className="text-base leading-none">
        ✆
      </span>
      <span>{label}</span>
    </a>
  );
}

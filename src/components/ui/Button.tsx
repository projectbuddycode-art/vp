import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-deep text-ivory hover:bg-[#342b26]",
  light: "bg-ivory text-deep hover:bg-white",
  line: "border border-deep/25 text-deep hover:border-gold",
  lineLight: "border border-ivory/35 text-ivory hover:border-sand hover:text-sand",
} as const;

type Variant = keyof typeof styles;

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classNames = cn(
    "vedic-button inline-flex items-center justify-center px-6 py-3.5 text-center text-[0.95rem] font-medium tracking-normal transition duration-300 disabled:cursor-not-allowed disabled:opacity-50",
    styles[variant],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classNames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

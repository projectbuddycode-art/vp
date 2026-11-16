export function Swastik({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Traditional auspicious swastika">
      <path
        className="swastik-mark"
        d="M32 32V12h16M32 32h20v16M32 32v20H16M32 32H12V16"
        fill="none"
        stroke="#B68B50"
        strokeWidth="4.5"
        strokeLinejoin="miter"
        pathLength={1}
      />
    </svg>
  );
}

export function YantraFrame() {
  return (
    <span className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
        <rect x="3" y="3" width="94" height="94" className="yantra-stroke" />
        <rect x="11" y="11" width="78" height="78" className="yantra-stroke" />
        <path d="M50 5 L95 50 L50 95 L5 50 Z" className="yantra-stroke" />
      </svg>
      <span className="akshara-seal">ॐ</span>
    </span>
  );
}

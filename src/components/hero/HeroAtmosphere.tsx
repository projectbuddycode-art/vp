export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 text-sand/45" aria-hidden>
      <svg className="hero-grid absolute inset-0 h-full w-full">
        <defs>
          <pattern id="hero-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0 H0 V72" fill="none" stroke="currentColor" strokeWidth="0.45" />
          </pattern>
          <linearGradient id="hero-grid-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="white" />
            <stop offset="0.42" stopColor="white" />
            <stop offset="0.7" stopColor="black" />
          </linearGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
      </svg>
      <svg className="hero-ring absolute top-28 left-[46%] hidden h-28 w-28 lg:block" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M80 18 V142 M18 80 H142" fill="none" stroke="currentColor" strokeWidth="0.45" />
      </svg>
      <span className="cinematic-light absolute inset-y-0 left-0 w-[56%]" />
    </div>
  );
}

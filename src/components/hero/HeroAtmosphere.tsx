"use client";

/**
 * Hero-only animated backdrop (no cursor FX — that lives site-wide in CursorGlow).
 */
export function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-[#05070c]" aria-hidden>
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />
      <div className="hero-grid" />
      <div className="hero-sparkles">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: String(i) }} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.35)_45%,rgba(5,7,12,0.15)_65%,rgba(5,7,12,0.7)_100%)]" />
    </div>
  );
}

"use client";

/**
 * Hero animated backdrop — brand blue orbs, rings, beams, and floating marks.
 */
export function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-[#05070c]" aria-hidden>
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />

      <div className="hero-grid" />
      <div className="hero-grid hero-grid-fine" />

      <div className="hero-ring hero-ring-a" />
      <div className="hero-ring hero-ring-b" />

      <div className="hero-beam hero-beam-a" />
      <div className="hero-beam hero-beam-b" />

      <div className="hero-floaters">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ ["--i" as string]: String(i) }} />
        ))}
      </div>

      <div className="hero-sparkles">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: String(i) }} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(5,7,12,0.86)_0%,rgba(5,7,12,0.4)_45%,rgba(5,7,12,0.2)_65%,rgba(5,7,12,0.75)_100%)]" />
    </div>
  );
}

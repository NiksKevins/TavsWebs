"use client";

/**
 * Clean modern hero backdrop — soft gradients + quiet structure.
 * No particle networks / sci-fi glow nodes.
 */
export function HeroAtmosphere() {
  return (
    <div
      className="absolute inset-0 -z-0 overflow-hidden bg-[#05070c]"
      aria-hidden
    >
      <div className="hero-wash hero-wash-main" />
      <div className="hero-wash hero-wash-side" />
      <div className="hero-wash hero-wash-bottom" />

      <div className="hero-rule hero-rule-v" />
      <div className="hero-rule hero-rule-h" />

      <div className="hero-sheen" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.35)_0%,transparent_28%,rgba(5,7,12,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.55)_0%,transparent_38%,transparent_70%,rgba(5,7,12,0.25)_100%)]" />
    </div>
  );
}

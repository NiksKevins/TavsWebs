"use client";

export function HeroAtmosphere() {
  return (
    <div
      className="absolute inset-0 -z-0 overflow-hidden bg-bg"
      aria-hidden
    >
      <div className="hero-wash hero-wash-main" />
      <div className="hero-wash hero-wash-side" />
      <div className="hero-wash hero-wash-bottom" />

      <div className="hero-rule hero-rule-v" />
      <div className="hero-rule hero-rule-h" />

      <div className="hero-sheen" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.55)_0%,transparent_30%,rgba(250,247,242,0.65)_100%)]" />
    </div>
  );
}

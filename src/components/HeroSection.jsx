import React from 'react';

export default function HeroSection() {
  return (
    <section className="section-hero">
      <div className="hero-glow-1" /><div className="hero-glow-2" /><div className="hero-glow-3" />
      <div className="hero-bg-text">DEVELOPER</div>
      <div className="scroll-hint">
        <span className="scroll-hint-label">Scroll</span>
        <div className="scroll-hint-arrow" />
      </div>
    </section>
  );
}

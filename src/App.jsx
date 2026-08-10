import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMG = "/Images/WhatsApp_Image_2026-08-05_at_11.17.06_PMccccccc-removebg-preview.png";

/* ─── ID Card (single instance, floats fixed over page) ─── */
function IDCard() {
  return (
    <div className="scene">
      <div className="id-card">
        <div className="card-hole" />
        <div className="id-card-face">
          <div className="card-top-bar">
            <span className="card-brand-left">FZ · Dev</span>
            <span className="card-brand-right">PORTFOLIO</span>
          </div>
          <div className="card-photo-area">
            <div className="card-big-text">DEV<br />ELOPER</div>
            <img src={PROFILE_IMG} alt="FaZil Firoz" className="card-photo-img" />
            <div className="card-photo-fade" />
          </div>
          <div className="card-info-section">
            <div className="card-person-name">FaZil Firoz</div>
            <div className="card-role-badge">Software Engineer</div>
            <div className="card-footer-row">
              <span className="card-dept">Software Solutions</span>
              <div className="card-icon-mark">FZ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-shadow" />
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const floatingCardRef = useRef(null);
  const aboutRef        = useRef(null);
  const aboutTextRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Card travels from hero center → about right side on scroll ──
      // It's fixed, starts at x:0 (centered), moves rightward as about enters
      gsap.to(floatingCardRef.current, {
        // move card to right side: ~26% of viewport width from its centered start
        x: () => window.innerWidth * 0.26,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 90%',      // begin as about section starts entering
          end:   'top 15%',      // complete well before about section fully visible
          scrub: 2,              // smooth, scroll-linked (2s lag)
        },
      });

      // ── About text slides in from LEFT as card arrives right ──
      gsap.from(aboutTextRef.current, {
        x: -70,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 65%',
          end:   'top 20%',
          scrub: 1.5,
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrapper">

      {/* ═══════════════════════════════════════
          SINGLE FLOATING CARD — fixed over both sections
          GSAP moves it from center → right on scroll
      ═══════════════════════════════════════ */}
      <div className="floating-card" ref={floatingCardRef}>
        <IDCard />
      </div>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO  (DARK)
      ══════════════════════════════════════ */}
      <section className="section-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-glow-3" />
        <div className="hero-bg-text">DEVELOPER</div>
        {/* Scroll hint */}
        <div className="scroll-hint">
          <span className="scroll-hint-label">Scroll</span>
          <div className="scroll-hint-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — ABOUT  (LIGHT / WHITE)
      ══════════════════════════════════════ */}
      <section className="section-about" ref={aboutRef}>
        <div className="about-inner">

          {/* LEFT — About text */}
          <div className="about-left" ref={aboutTextRef}>
            <span className="about-tag">About Me</span>

            <h2 className="about-heading">
              Building digital<br />
              <span>experiences</span><br />
              that matter.
            </h2>

            <p className="about-body">
              I'm <strong>FaZil Firoz</strong>, a passionate Full Stack Developer
              and Software Engineer with <strong>3+ years</strong> of experience
              crafting clean, scalable, and user-centric digital products.
              From pixel-perfect UIs to robust backend systems — I bridge the
              gap between design and technology.
            </p>

            <div className="about-skills">
              {['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'UI/UX', 'AI/ML', 'REST APIs'].map(s => (
                <span key={s} className="skill-pill">{s}</span>
              ))}
            </div>

            <div className="about-cta">
              <a href="#" className="btn-primary">View Projects</a>
              <a href="#" className="btn-outline">Download CV</a>
            </div>
          </div>

          {/* RIGHT — empty; floating card lands here visually */}
          <div className="about-right" />

        </div>
      </section>

    </div>
  );
}

export default App;

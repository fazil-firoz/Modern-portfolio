import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMG = "/Images/WhatsApp_Image_2026-08-05_at_11.17.06_PMccccccc-removebg-preview.png";
const ANTAS_IMG = "/Images/WhatsApp Image 2026-08-10 at 11.16.53 PM.jpeg";

/* ─────────────────────────────────────────
   PORTFOLIO ID CARD  (hero card)
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   ANTAS COMPANY ID CARD  (experience section)
───────────────────────────────────────── */
function AntasCard() {
  return (
    <div className="antas-sleeve">
      {/* Top lanyard clip loop */}
      <div className="antas-sleeve-clip" />
      {/* Side holder notches */}
      <div className="antas-sleeve-notch-left" />
      <div className="antas-sleeve-notch-right" />

      {/* The actual ID card inside */}
      <div className="antas-card">
        {/* Dark header with logo */}
        <div className="antas-header">
          <div className="antas-logo">
            an<span className="antas-t-accent"><span className="antas-orange-dot" />t</span>as
          </div>
          <div className="antas-orange-stripe-left" />
          <div className="antas-orange-stripe-right" />
        </div>

        {/* Circular photo cutout */}
        <div className="antas-photo-ring">
          <img src={ANTAS_IMG} alt="Mohammed Fazil Firoz E" className="antas-photo-img" />
        </div>

        {/* White body */}
        <div className="antas-body">
          <div className="antas-name">MOHAMMED FAZIL FIROZ E</div>
          <div className="antas-id">(ID A10008)</div>
          <div className="antas-company">Antas Solutions PVT LTD</div>
          <div className="antas-address">
            Carnival InfoparkPhase 1,First floor<br />
            Infopark,Kakkanad,Kochi<br />
            Kerala 682042
          </div>
          <div className="antas-blood">Blood Group: <span>O+ve</span></div>
        </div>

        {/* Dark footer — number kept blank as requested */}
        <div className="antas-footer">
          Contact Number:
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
function App() {
  const floatingCardRef  = useRef(null);
  const aboutRef         = useRef(null);
  const aboutTextRef     = useRef(null);
  const experienceRef    = useRef(null);
  const antasCardRef     = useRef(null);
  const expContentRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Portfolio card travels hero-center → about right on scroll ──
      gsap.to(floatingCardRef.current, {
        x: () => window.innerWidth * 0.26,
        y: 30,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 90%',
          end:   'top 15%',
          scrub: 2,
        },
      });

      // ── Portfolio card fades out as experience section enters ──
      gsap.to(floatingCardRef.current, {
        opacity: 0,
        scale: 0.88,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: experienceRef.current,
          start: 'top 85%',
          end:   'top 40%',
          scrub: 1.2,
        },
      });

      // ── About text slides in from left ──
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

      // ── Antas card: sweeps up from below-left with tilt ──
      gsap.from(antasCardRef.current, {
        y: 130,
        rotateZ: -22,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: experienceRef.current,
          start: 'top 80%',
          end:   'top 25%',
          scrub: 1.8,
        },
      });

      // ── Experience content slides in from right ──
      gsap.from(expContentRef.current, {
        x: 70,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: experienceRef.current,
          start: 'top 70%',
          end:   'top 20%',
          scrub: 1.5,
        },
      });

    });
    return () => ctx.revert();
  }, []);

  const expItems = [
    { text: 'Designed & developed Hospital Management Systems (HMS) for clients across Dubai and India.', tech: 'ASP.NET Core · React · SQL · PostgreSQL' },
    { text: 'Built a CRM system for an overseas educational consultancy, streamlining student & application management.' },
    { text: 'Built robust backend modules and improved database performance through optimized SQL queries.', tech: 'C#' },
    { text: 'Developed and integrated RESTful APIs for seamless frontend–backend communication.' },
    { text: 'Integrated third-party APIs to extend system functionality and external service communication.' },
    { text: 'Resolved critical production issues and ensured high system availability & reliability.' },
    { text: 'Performed unit testing and debugging to ensure code quality and smooth functionality across modules.' },
  ];

  return (
    <div className="page-wrapper">

      {/* ── Single floating portfolio card ── */}
      <div className="floating-card" ref={floatingCardRef}>
        <IDCard />
      </div>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO  (dark)
      ══════════════════════════════════════ */}
      <section className="section-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" /><div className="hero-glow-3" />
        <div className="hero-bg-text">DEVELOPER</div>
        <div className="scroll-hint">
          <span className="scroll-hint-label">Scroll</span>
          <div className="scroll-hint-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — ABOUT  (light / white)
      ══════════════════════════════════════ */}
      <section className="section-about" ref={aboutRef}>
        <div className="about-inner">
          <div className="about-left" ref={aboutTextRef}>
            <div className="about-tag"><span className="about-tag-line" />About Me</div>
            <p className="story-text">
              I didn't know what programming was, but computers somehow fascinated me — that weekly one-hour
              computer class was the highlight of my school days! Curiosity landed me in BCA, where I barely
              understood what was happening yet somehow survived, assignment by assignment. Sometimes I still
              wonder how I graduated.
            </p>
            <p className="story-text">
              Like many students, I dreamed of studying abroad — but somewhere between overthinking and my
              own fears, I stepped back. Watching friends move abroad while I stayed behind felt heavy.
              Still searching, I moved to Kochi, joined Luminar Technolab, tried software development.
              Good experience — but the spark wasn't there yet. Then, almost unexpectedly, I joined MCA,
              and the decision I was most unsure about turned out to be one of the happiest chapters of my
              journey. Great friends, real growth, and for the first time — I genuinely enjoyed the ride.
            </p>
            <p className="story-text">
              The job hunt that followed tested me more than I expected. After countless applications and
              plenty of self-doubt, I believed that if going abroad was truly meant for me, it would have
              happened. Maybe life had a different route planned — and eventually,
              I landed my first job as a <strong>Software Engineer in Infopark.</strong>
            </p>
            <div className="chapter-mark">
              <span className="chapter-label">— today</span>
              <span className="chapter-icon">✓</span>
              <div className="chapter-line" />
            </div>
            <p className="story-text">
              I've completed one year. Do I know if I'm on the right path? Honestly... I still don't.
              Some days confident, some days lost — still figuring it out, just like everyone else.
            </p>
            <div className="story-closing">
              <span className="story-emoji">♡</span>
              I believe something good is waiting ahead. And if life decides otherwise... well,
              I do have a Plan B — though between you and me, I'm secretly hoping I never have to use it. 😄
            </div>
          </div>
          <div className="about-right" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — EXPERIENCE  (dark variant)
      ══════════════════════════════════════ */}
      <section className="section-experience" ref={experienceRef}>
        <div className="exp-glow-1" /><div className="exp-glow-2" />

        {/* Section label top */}
        <div className="exp-section-label">Experience</div>

        <div className="exp-inner">

          {/* LEFT — Antas ID card (animated in) */}
          <div className="exp-left">
            <div className="antas-card-scene" ref={antasCardRef}>
              <AntasCard />
            </div>
          </div>

          {/* Connector: line + dot from card to content */}
          <div className="exp-connector">
            <div className="exp-connector-line" />
            <div className="exp-connector-dot" />
          </div>

          {/* RIGHT — Experience details */}
          <div className="exp-right" ref={expContentRef}>
            <div className="exp-role-header">
              <h3 className="exp-role">Junior Software Engineer</h3>
              <span className="exp-period">2024 – Present</span>
            </div>
            <div className="exp-company">Antas Technologies · Infopark, Kochi</div>
            <ul className="exp-list">
              {expItems.map((item, i) => (
                <li key={i} className="exp-item">
                  <span className="exp-bullet" />
                  <div>
                    <span>{item.text}</span>
                    {item.tech && <span className="exp-tech">{item.tech}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}

export default App;

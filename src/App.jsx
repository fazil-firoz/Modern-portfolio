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

          {/* LEFT — Journal story */}
          <div className="about-left" ref={aboutTextRef}>

            {/* ── Intro ── */}
            <p className="story-text">
              I didn't know what programming was, but computers somehow fascinated me. Looking back,
              that weekly one-hour computer class was the highlight of my school days —
              though it certainly feels different now!
            </p>
            <p className="story-text">
              That initial curiosity landed me in BCA. To be honest...
              There were days when I barely understood what was happening in class.
              Yet somehow, assignment by assignment, exam by exam, I survived.
              Sometimes I still wonder how I graduated!
            </p>

            {/* ── the detour ── */}
            <div className="chapter-mark">
              <span className="chapter-label">— the detour</span>
              <span className="chapter-icon">→</span>
              <div className="chapter-line" />
            </div>
            <p className="story-text">
              Like many students, I dreamed of studying abroad. It felt like the obvious next step.
              But somewhere between overthinking, confusion, and my own fears, I stepped back.
              At that time, I saw many of my friends moving abroad while I stayed where I was.
              I felt guilty, wondering if I had missed the biggest opportunity of my life.
            </p>
            <p className="story-text">
              Still searching for direction, I moved to Kochi and joined Luminar Technolab to study
              software development. Everyone seemed to be doing it, so I thought — <strong>"Why not me?"</strong>
              It was a good experience, but deep down, I still felt something was missing.
              I hadn't found the spark I was looking for.
            </p>

            {/* ── the turn ── */}
            <div className="chapter-mark">
              <span className="chapter-label">— the turn</span>
              <span className="chapter-icon">★</span>
              <div className="chapter-line" />
            </div>
            <p className="story-text">
              Then, almost unexpectedly, I joined MCA. Funny enough, the decision I was most unsure
              about turned out to be one of the happiest parts of my journey. Those two years were
              filled with great friends, memorable moments, and personal growth.
              For the first time, I genuinely enjoyed the journey instead of worrying about the destination.
            </p>
            <p className="story-text">
              But good times don't last forever. Before I knew it, MCA was over,
              and I was standing at another crossroads.
            </p>

            {/* ── the hunt ── */}
            <div className="chapter-mark">
              <span className="chapter-label">— the hunt</span>
              <span className="chapter-icon">↓</span>
              <div className="chapter-line" />
            </div>
            <p className="story-text">
              The job hunt began. During that time, I often wondered whether I had made a mistake
              by not going abroad. But deep inside, I also believed that if it was truly meant for me,
              it would have happened. Maybe life had a different route planned.
            </p>
            <p className="story-text">
              Eventually, after countless applications and plenty of self-doubt,
              I landed my first job as a <strong>Software Engineer in Infopark.</strong>
            </p>

            {/* ── today ── */}
            <div className="chapter-mark">
              <span className="chapter-label">— today</span>
              <span className="chapter-icon">✓</span>
              <div className="chapter-line" />
            </div>
            <p className="story-text">
              Today, I've completed one year in my first job.
            </p>
            <p className="story-text">
              Do I know if I'm on the right path? Honestly... I still don't.
              Some days I feel confident. Some days I feel completely lost.
              Some days I want to take the next big step, but I don't know where it is.
              I'm still figuring things out, just like everyone else.
            </p>

            {/* ── closing ── */}
            <div className="story-closing">
              <span className="story-emoji">♡</span>
              I believe something good is waiting ahead. And if life decides otherwise...
              well, I do have a Plan B. Although — between you and me,
              I'm secretly hoping I never have to use it. 😄
            </div>

          </div>

          {/* RIGHT — empty; fixed card lands here visually */}
          <div className="about-right" />

        </div>
      </section>

    </div>
  );
}

export default App;

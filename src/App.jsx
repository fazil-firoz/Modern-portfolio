import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMG = "/Images/WhatsApp_Image_2026-08-05_at_11.17.06_PMccccccc-removebg-preview.png";

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
   MAIN APP
───────────────────────────────────────── */
function App() {
  const floatingCardRef  = useRef(null);
  const aboutRef         = useRef(null);
  const aboutTextRef     = useRef(null);
  const experienceRef        = useRef(null);
  const expContentRef       = useRef(null);
  const timelineProgressRef = useRef(null);
  const bulletItemsRef      = useRef([]);

  const educationRef        = useRef(null);
  const roadDashedRef       = useRef(null);
  const eduCardsRef         = useRef([]);

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

      // ── Vertical Timeline Line Draw on scroll ──
      gsap.fromTo(timelineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 60%',
            end:   'bottom 85%',
            scrub: 1,
          },
        }
      );

      // ── Staggered Bullet Points Cascade Reveal ──
      bulletItemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: 35, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end:   'top 65%',
              scrub: 1.2,
            },
          }
        );
      });

      // ── Education Winding Road Line Draw ──
      gsap.fromTo(roadDashedRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 70%',
            end:   'bottom 80%',
            scrub: 1.5,
          },
        }
      );

      // ── Education Milestone Cards Pop Reveal ──
      eduCardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end:   'top 60%',
              scrub: 1.2,
            },
          }
        );
      });

    });
    return () => ctx.revert();
  }, []);

  const expItems = [
    { text: 'Designed and developed Hospital Management Systems (HMS) for clients across Dubai and India.', tech: 'ASP.NET Core · React · SQL · PostgreSQL' },
    { text: 'Built and contributed to a CRM system for an overseas educational consultancy, streamlining student and application management processes.' },
    { text: 'Built robust backend modules using C# and improved database performance through optimized SQL queries.', tech: 'C#' },
    { text: 'Developed and integrated RESTful APIs to enable seamless communication between frontend and backend systems.' },
    { text: 'Integrated third-party APIs to extend system functionality and ensure smooth external service communication.' },
    { text: 'Resolved critical production issues and ensured high system availability and reliability.' },
    { text: 'Performed unit testing and debugging to ensure application reliability, code quality, and smooth functionality across modules.' },
  ];

  const techBadges = ['ASP.NET Core', 'React', 'C#', 'PostgreSQL', 'SQL', 'REST APIs', 'Unit Testing'];

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
          SECTION 3 — EXPERIENCE  (Timeline Track & Cascade)
      ══════════════════════════════════════ */}
      <section className="section-experience" ref={experienceRef}>
        <div className="exp-inner">

          {/* Section Heading Tag */}
          <div className="exp-tag">
            <span className="exp-tag-line" />
            Work Experience
          </div>

          {/* Direct Experience Layout with Vertical Timeline Track */}
          <div className="exp-timeline-wrapper">

            {/* Vertical Timeline Track Line */}
            <div className="exp-timeline-track">
              <div className="exp-timeline-progress" ref={timelineProgressRef} />
            </div>

            {/* Experience Content Column */}
            <div className="exp-timeline-content">

              {/* Header Row */}
              <div className="exp-card-header">
                <div className="exp-role-group">
                  <h3 className="exp-role-title">Junior Software Engineer</h3>
                  <div className="exp-company-sub">
                    <span className="exp-company-name">Antas Technologies</span>
                    <span className="exp-dot-sep">•</span>
                    <span className="exp-location">Infopark, Kochi, India</span>
                  </div>
                </div>

                <div className="exp-period-badge">
                  <span className="exp-badge-pulse" />
                  2025 – Present
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="exp-tech-pills">
                {techBadges.map((badge, idx) => (
                  <span key={idx} className="exp-tech-pill">{badge}</span>
                ))}
              </div>

              {/* Divider Line */}
              <div className="exp-divider" />

              {/* Cascading Contribution Bullet Points */}
              <ul className="exp-points-list">
                {expItems.map((item, i) => (
                  <li
                    key={i}
                    className="exp-point-item"
                    ref={(el) => (bulletItemsRef.current[i] = el)}
                  >
                    <span className="exp-point-icon">◆</span>
                    <div className="exp-point-body">
                      <span className="exp-point-text">{item.text}</span>
                      {item.tech && <span className="exp-point-tech">[{item.tech}]</span>}
                    </div>
                  </li>
                ))}
              </ul>

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — EDUCATION & ROADMAP  (White Theme)
      ══════════════════════════════════════ */}
      <section className="section-education" ref={educationRef}>
        <div className="edu-inner">

          {/* Section Tag */}
          <div className="edu-tag">
            <span className="edu-tag-line" />
            Education & Journey
          </div>

          <h2 className="edu-heading">Academic & Certification Roadmap</h2>

          {/* Winding Road Roadmap Container */}
          <div className="edu-roadmap-container">

            {/* SVG Winding Road Path */}
            <svg className="edu-road-svg" viewBox="0 0 1000 800" preserveAspectRatio="none">
              {/* Road Asphalt Base */}
              <path
                className="edu-road-asphalt"
                d="M 200,60 C 700,180 800,320 500,440 C 200,560 300,680 800,760"
              />
              {/* Road Center Dashed Line */}
              <path
                ref={roadDashedRef}
                className="edu-road-dashed"
                d="M 200,60 C 700,180 800,320 500,440 C 200,560 300,680 800,760"
              />
            </svg>

            {/* Milestone Cards positioned along the Roadmap */}
            <div className="edu-milestones-grid">

              {/* Milestone 1 — BCA (Degree) */}
              <div
                className="edu-milestone-card edu-card-left"
                ref={(el) => (eduCardsRef.current[0] = el)}
              >
                <div className="edu-pin-wrapper edu-pin-cyan">
                  <svg className="edu-pin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="edu-card-content">
                  <div className="edu-card-header">
                    <span className="edu-type-pill pill-degree">Degree</span>
                    <span className="edu-period">2019 – 2022</span>
                  </div>
                  <h3 className="edu-degree-title">Bachelor of Computer Applications (BCA)</h3>
                  <div className="edu-institution">Majlis Arts and Science College, Puramannur</div>
                  <div className="edu-board">University of Calicut</div>
                </div>
              </div>

              {/* Milestone 2 — Python Certification */}
              <div
                className="edu-milestone-card edu-card-right"
                ref={(el) => (eduCardsRef.current[1] = el)}
              >
                <div className="edu-pin-wrapper edu-pin-amber">
                  <svg className="edu-pin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="edu-card-content">
                  <div className="edu-card-header">
                    <span className="edu-type-pill pill-cert">Certification</span>
                    <span className="edu-period">2022</span>
                  </div>
                  <h3 className="edu-degree-title">Python Web Development Expert</h3>
                  <div className="edu-institution">Luminar Technolab, Kakkanad</div>
                  <div className="edu-board">National Council for Technology and Training</div>
                </div>
              </div>

              {/* Milestone 3 — MCA (Master's Degree) */}
              <div
                className="edu-milestone-card edu-card-left"
                ref={(el) => (eduCardsRef.current[2] = el)}
              >
                <div className="edu-pin-wrapper edu-pin-purple">
                  <svg className="edu-pin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="edu-card-content">
                  <div className="edu-card-header">
                    <span className="edu-type-pill pill-masters">Master's Degree</span>
                    <span className="edu-period">2023 – 2025</span>
                  </div>
                  <h3 className="edu-degree-title">Master of Computer Applications (MCA)</h3>
                  <div className="edu-institution">MES College of Engineering, Kuttippuram</div>
                  <div className="edu-board">APJ Abdul Kalam Technological University</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default App;

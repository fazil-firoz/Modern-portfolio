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
  const pulseRef            = useRef(null);
  const eduCardsRef         = useRef([]);

  const projectsRef         = useRef(null);
  const projCardsRef        = useRef([]);

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

      // ── Interactive Light Pulse Orb Traveling along SVG Wire on Scroll ──
      const pathEl = roadDashedRef.current;
      if (pathEl && pulseRef.current) {
        try {
          const totalLength = pathEl.getTotalLength();
          const obj = { val: 0 };

          gsap.to(obj, {
            val: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: educationRef.current,
              start: 'top 70%',
              end:   'bottom 80%',
              scrub: 1,
              onUpdate: (self) => {
                if (!pathEl || !pulseRef.current) return;
                const point = pathEl.getPointAtLength(self.progress * totalLength);
                pulseRef.current.setAttribute('cx', point.x);
                pulseRef.current.setAttribute('cy', point.y);
              },
            },
          });
        } catch (err) {
          console.warn('SVG path getTotalLength error:', err);
        }
      }

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

      // ── Projects Cards Stagger Slide Up Reveal ──
      projCardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.out',
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

  const projectsData = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Web App',
      subtitle: 'Full-Featured Online Store',
      tag: 'Full-Stack Project',
      badgeClass: 'proj-tag-featured',
      description: 'Full-featured modern e-commerce web application with interactive 3D product animations, C# backend API, PostgreSQL database, Razorpay payment gateway integration, dynamic cart management, and seamless checkout.',
      tech: ['C#', 'React.js', 'PostgreSQL', 'Razorpay', '3D Animations', 'Vercel'],
      github: null,
      live: 'https://e-commerce-web-app-woad-nine.vercel.app/'
    },
    {
      id: 'self-billing',
      title: 'Self-Billing System',
      subtitle: 'Retail Management System',
      tag: 'Main Project',
      badgeClass: 'proj-tag-featured',
      description: 'An intelligent self-checkout solution for supermarkets that allows customers to scan product QR codes, automatically generate bills, and make secure payments through their smartphones. Features real-time monitoring to ensure transaction security and prevent fraud.',
      tech: ['Python Django', 'HTML', 'CSS', 'JavaScript', 'Flutter (Dart)', 'MySQL'],
      github: 'https://github.com/fazil-firoz/Main-Project.git',
      live: null
    },
    {
      id: 'learnify',
      title: 'Learnify',
      subtitle: 'E-Learning Platform',
      tag: 'Web Platform',
      badgeClass: 'proj-tag-platform',
      description: 'A full-featured online learning platform where instructors can create and manage courses, admins approve content, and students securely enroll and access video lessons after payment. Designed for a seamless and secure digital learning experience.',
      tech: ['Python Django', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
      github: 'https://github.com/fazil-firoz/Learnify.git',
      live: null
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio',
      subtitle: 'Interactive Developer Showcase',
      tag: 'Live Website',
      badgeClass: 'proj-tag-live',
      description: 'Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript to showcase projects, skills, and achievements. Focused on creating a clean, user-friendly interface to highlight my journey as a developer.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: null,
      live: 'https://fazil-firoz.github.io/Portfolio_new/'
    },
    {
      id: 'notebook-portfolio',
      title: 'Notebook Portfolio',
      subtitle: 'Hobby Project',
      tag: 'Hobby Project',
      badgeClass: 'proj-tag-platform',
      description: 'Designed and built an interactive notebook-themed portfolio as a creative hobby project, exploring realistic paper textures, handwritten journal layouts, and creative front-end styling.',
      tech: ['React', 'HTML', 'CSS', 'JavaScript', 'Vercel'],
      github: null,
      live: 'https://note-book-portfolio-eta.vercel.app/'
    },
    {
      id: 'news24',
      title: 'News24',
      subtitle: 'Real-Time News App',
      tag: 'API Integration Project',
      badgeClass: 'proj-tag-api',
      description: 'My first project where I learned how APIs actually work! Created a simple yet functional news website using HTML, CSS, and JavaScript, and fetched live news dynamically using a free News API.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/fazil-firoz/News-App.git',
      live: null
    },
    {
      id: 'bonos',
      title: "Bono's",
      subtitle: 'Static Front-End Webpage',
      tag: 'Live Website',
      badgeClass: 'proj-tag-static',
      description: 'Designed and developed my first static website using only HTML and CSS to grasp the fundamentals of web structure, layout, and styling — laying a strong foundation in front-end development and design principles.',
      tech: ['HTML', 'CSS'],
      github: null,
      live: 'https://fazil-firoz.github.io/bonos/'
    }
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

          {/* <h2 className="edu-heading">Academic & Certification</h2> */}

          {/* Winding Road Roadmap Container */}
          <div className="edu-roadmap-container">

            {/* SVG Connecting Wire / String Line (Pins to Pin Center Corridor) */}
            <svg className="edu-wire-svg" viewBox="0 0 1000 520" preserveAspectRatio="none">
              {/* Base Wire String Line */}
              <path
                className="edu-wire-base"
                d="M 475,45 C 540,110 550,175 525,240 C 500,305 450,370 475,435"
              />
              {/* Active Wire String Line (Animated Draw on Scroll) */}
              <path
                ref={roadDashedRef}
                className="edu-wire-active"
                d="M 475,45 C 540,110 550,175 525,240 C 500,305 450,370 475,435"
              />
              {/* Interactive Glowing Light Pulse Orb Traveling along SVG Wire */}
              <circle
                ref={pulseRef}
                className="edu-wire-pulse-orb"
                cx="475"
                cy="45"
                r="7"
              />
            </svg>

            {/* Milestone Cards positioned along the Roadmap */}
            <div className="edu-milestones-grid">

              {/* Milestone 1 (Top Left Edge) — MCA (Master's Degree) */}
              <div
                className="edu-milestone-card edu-card-left"
                ref={(el) => (eduCardsRef.current[0] = el)}
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

              {/* Milestone 2 (Middle Right Edge) — Python Certification */}
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
                    <span className="edu-period">2022-2023</span>
                  </div>
                  <h3 className="edu-degree-title">Python Web Development Expert</h3>
                  <div className="edu-institution">Luminar Technolab, Kakkanad</div>
                  <div className="edu-board">National Council for Technology and Training</div>
                </div>
              </div>

              {/* Milestone 3 (Bottom Left Edge) — BCA (Degree) */}
              <div
                className="edu-milestone-card edu-card-left"
                ref={(el) => (eduCardsRef.current[2] = el)}
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

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — PROJECTS  (Dark Theme)
      ══════════════════════════════════════ */}
      <section className="section-projects" ref={projectsRef}>
        <div className="proj-inner">

          {/* Section Tag */}
          <div className="proj-tag">
            <span className="proj-tag-line" />
            Featured Work
          </div>

          <h2 className="proj-heading">Projects & Built Systems</h2>

          {/* Projects Grid */}
          <div className="proj-grid">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className="proj-card"
                ref={(el) => (projCardsRef.current[idx] = el)}
              >
                {/* Card Top Badge & Link Row */}
                <div className="proj-card-top">
                  <span className={`proj-category-pill ${project.badgeClass}`}>
                    {project.tag}
                  </span>
                  <div className="proj-links-row">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link-btn btn-github"
                        title="GitHub Repository"
                      >
                        <svg className="proj-link-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>GitHub Repo</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link-btn btn-live"
                        title="Live Website Preview"
                      >
                        <svg className="proj-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                        <span>Live Preview ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="proj-title">{project.title}</h3>
                <div className="proj-subtitle">{project.subtitle}</div>

                {/* Description */}
                <p className="proj-desc">{project.description}</p>

                {/* Tech Pills */}
                <div className="proj-tech-row">
                  {project.tech.map((t, i) => (
                    <span key={i} className="proj-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default App;

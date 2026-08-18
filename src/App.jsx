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
      {/* Lanyard / Thread Strap extending from top outer screen in a dynamic zigzag curve */}
      <div className="lanyard-thread-container">
        <svg className="lanyard-thread-svg" viewBox="0 0 120 500" preserveAspectRatio="none">
          <path
            d="M 60,-400 C 10,-300 110,-200 20,-100 C 100,0 30,100 80,250 C 35,360 75,440 60,495"
            className="lanyard-strap-path"
          />
        </svg>
        <div className="lanyard-clip" />
      </div>

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
              {/* <span className="card-dept">Software Solutions</span> */}
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
  const projProgressRef     = useRef(null);
  const projDotRef          = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Responsive GSAP Animations for Floating ID Card using matchMedia ──
      const mm = gsap.matchMedia();

      // Desktop Screens (> 991px)
      mm.add("(min-width: 992px)", () => {
        gsap.to(floatingCardRef.current, {
          x: () => window.innerWidth * 0.26,
          y: 30,
          opacity: 1,
          scale: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 90%',
            end:   'top 15%',
            scrub: 2,
          },
        });

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
      });

      // Mobile Screens (<= 991px): Guarantee 100% horizontal centering, slide UNDER Section 2 on scroll
      mm.add("(max-width: 991px)", () => {
        gsap.set(floatingCardRef.current, { x: 0 });

        gsap.to(floatingCardRef.current, {
          x: 0,
          y: 120,
          scale: 0.82,
          opacity: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 95%',
            end:   'top 35%',
            scrub: 1.2,
          },
        });
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

      // ── Projects Section Left Vertical Scroll Line & Traveling Laser Dot ──
      gsap.fromTo(projProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 70%',
            end:   'bottom 85%',
            scrub: 1,
            onUpdate: (self) => {
              if (projDotRef.current) {
                gsap.set(projDotRef.current, {
                  top: `${self.progress * 100}%`,
                });
              }
            },
          },
        }
      );

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
      num: '01',
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
      num: '02',
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
      num: '03',
      title: 'Learnify',
      subtitle: 'E-Learning Platform',
      tag: 'Mini Project',
      badgeClass: 'proj-tag-platform',
      description: 'A full-featured online learning platform where instructors can create and manage courses, admins approve content, and students securely enroll and access video lessons after payment. Designed for a seamless and secure digital learning experience.',
      tech: ['Python Django', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
      github: 'https://github.com/fazil-firoz/Learnify.git',
      live: null
    },
    {
      id: 'portfolio',
      num: '04',
      title: 'Personal Portfolio',
      subtitle: 'Interactive Developer Showcase',
      tag: 'Single Page Portfolio',
      badgeClass: 'proj-tag-live',
      description: 'Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript to showcase projects, skills, and achievements. Focused on creating a clean, user-friendly interface to highlight my journey as a developer.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: null,
      live: 'https://fazil-firoz.github.io/Portfolio_new/'
    },
    {
      id: 'notebook-portfolio',
      num: '05',
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
      id: 'modern-portfolio',
      num: '06',
      title: 'Modern 3D Portfolio',
      subtitle: 'Latest Portfolio Project',
      tag: 'Latest Portfolio',
      badgeClass: 'proj-tag-featured',
      description: 'Ultra-modern interactive developer portfolio featuring a 3D floating ID card with GSAP ScrollTrigger transition physics, dark/light section theme contrasts, Education roadmap, and modern web application showcase.',
      tech: ['React', 'GSAP', 'ScrollTrigger', 'CSS3', 'Vite'],
      github: 'https://github.com/fazil-firoz/Modern-portfolio.git',
      live: null
    },
    {
      id: 'news24',
      num: '07',
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
      num: '08',
      title: "Bono's",
      subtitle: 'Static Front-End Webpage',
      tag: 'My First Work',
      badgeClass: 'proj-tag-static',
      description: 'Designed and developed my first static website using only HTML and CSS to grasp the fundamentals of web structure, layout, and styling — laying a strong foundation in front-end development and design principles.',
      tech: ['HTML', 'CSS'],
      github: null,
      live: 'https://fazil-firoz.github.io/bonos/'
    }
  ];

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

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
            
            <h2 className="about-greeting">
              Hi, I'm <span className="greeting-name">Fazil Firoz</span> 👋
            </h2>
            <p className="about-role-sub">
              Software Engineer based in Infopark, Kochi | Full-Stack Web Developer
            </p>

            <div className="about-highlights-grid">
              <div className="highlight-item">
                <span className="highlight-icon">💼</span>
                <div>
                  <strong>Software Engineer</strong>
                  <p>1+ Year building enterprise web applications at Infopark, Kochi.</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <div>
                  <strong>Full-Stack Creator</strong>
                  <p>Specialized in C#, ASP.NET Core, React, Python Django, PostgreSQL & REST APIs.</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <div>
                  <strong>Continuous Learner</strong>
                  <p>Passionate about crafting clean UI/UX, robust backend systems & interactive web experiences.</p>
                </div>
              </div>
            </div>

            <div className="chapter-mark">
              <span className="chapter-label">— currently building & evolving</span>
              <span className="chapter-icon">✓</span>
              <div className="chapter-line" />
            </div>

            <div className="story-closing">
              <span className="story-emoji">♡</span>
              I believe something good is waiting ahead. And if life decides otherwise... well, I do have a Plan B — though between you and me, I'm secretly hoping I never have to use it. 😄
            </div>

            {/* Theme-Adapted Download Resume Action Button */}
            <div className="about-resume-action">
              <a
                href="https://drive.google.com/file/d/1_5UOnTnYpTpAmlexkF0fw0LVKGw7BUBx/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="download-resume-btn"
                title="Download / View Fazil Firoz Official Resume"
              >
                <svg className="resume-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>
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
                d="M 460,45 C 580,100 580,180 540,240 C 500,300 420,380 460,435"
              />
              {/* Active Wire String Line (Animated Draw on Scroll) */}
              <path
                ref={roadDashedRef}
                className="edu-wire-active"
                d="M 460,45 C 580,100 580,180 540,240 C 500,300 420,380 460,435"
              />
              {/* Interactive Glowing Light Pulse Orb Traveling along SVG Wire */}
              <circle
                ref={pulseRef}
                className="edu-wire-pulse-orb"
                cx="460"
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
        {/* Left Animated Scroll Progress Timeline Bar with Traveling Laser Dot */}
        <div className="proj-timeline-track">
          <div className="proj-timeline-progress" ref={projProgressRef} />
          <div className="proj-timeline-head-dot" ref={projDotRef} />
        </div>

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
                {/* Card Top Badge & Link Row with Geometric Index */}
                <div className="proj-card-top">
                  <div className="proj-index-group">
                    <span className="proj-index-num">{project.num}</span>
                    <span className="proj-shape-node" />
                    <span className={`proj-category-pill ${project.badgeClass}`}>
                      {project.tag}
                    </span>
                  </div>
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

      {/* ══════════════════════════════════════
          SECTION 6 — CONTACT & CONNECT  (Light Theme)
      ══════════════════════════════════════ */}
      <section className="section-contact">
        <div className="contact-inner">
          <div className="contact-tag">
            <span className="contact-tag-line" />
            Get In Touch
          </div>
          
          <h2 className="contact-heading">Let's Connect & Build Together</h2>
          <p className="contact-subtext">
            Feel free to reach out for software engineering opportunities, technical collaborations, or direct project inquiries!
          </p>

          <div className="contact-cards-grid">
            {/* WhatsApp Link Card */}
            <a
              href="https://wa.me/919048634881"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-whatsapp"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-whatsapp">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">WhatsApp Direct</span>
                <span className="contact-value">+91 9048634881</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* Direct Call Phone Card */}
            <a
              href="tel:+919048634881"
              className="contact-card card-phone"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-phone">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">Mobile Phone</span>
                <span className="contact-value">+91 9048634881</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* Email Card */}
            <a
              href="mailto:fazzilfiroz@gmail.com"
              className="contact-card card-email"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-email">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">Email Address</span>
                <span className="contact-value">fazzilfiroz@gmail.com</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/fazzil-firoz"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-linkedin"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-linkedin">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">LinkedIn Profile</span>
                <span className="contact-value">fazzil-firoz</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/fazil-firoz"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-github"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-github">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">GitHub Profile</span>
                <span className="contact-value">fazil-firoz</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/fzl.frz/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-instagram"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-instagram">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">Instagram Profile</span>
                <span className="contact-value">fzl.frz</span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>

            {/* Address Location Card (Clickable Google Maps Link) */}
            <a
              href="https://maps.google.com/?q=Erakkingal+(H),+Mulayankavu+(PO),+Kulukkallur,+Palakkad,+Kerala+679337,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-address"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-card-icon-box icon-location">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-label">Location / Address</span>
                <span className="contact-address-text">
                  Erakkingal (H), Mulayankavu (PO), Kulukkallur, Palakkad, Kerala 679337, India
                </span>
              </div>
              <span className="contact-action-arrow">↗</span>
            </a>
          </div>

          {/* Centered Profile Avatar Divider with Lines Drawing Outward to Both Sides */}
          <div className="footer-avatar-divider">
            <div className="avatar-divider-line left-line" />
            <div
              className="footer-avatar-wrapper"
              title="Click to Scroll to Top — Fazil Firoz"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/Images/profile-pic (18).png"
                alt="Fazil Firoz Profile"
                className="footer-avatar-img"
              />
              <span className="footer-avatar-online-dot" />
            </div>
            <div className="avatar-divider-line right-line" />
          </div>

          {/* Footer Copyright Bottom Bar */}
          <div className="contact-footer-bar">
            <span>© 2026 Fazil Firoz. Built with React, GSAP & Modern Web Tech.</span>
            <div className="footer-links-inline">
              <a href="https://github.com/fazil-firoz" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>•</span>
              <a href="https://linkedin.com/in/fazzil-firoz" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>•</span>
              <a href="https://www.instagram.com/fzl.frz/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <span>•</span>
              <a href="https://wa.me/919048634881" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <span>•</span>
              <a href="mailto:fazzilfiroz@gmail.com">Email</a>
              <span>•</span>
              <a href="https://drive.google.com/file/d/1_5UOnTnYpTpAmlexkF0fw0LVKGw7BUBx/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Floating 3D Projection WhatsApp Button ── */}
      <a
        href="https://wa.me/919048634881"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-3d"
        title="Chat on WhatsApp (+91 9048634881)"
      >
        <div className="whatsapp-3d-inner">
          <svg className="whatsapp-3d-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </div>
        <span className="whatsapp-3d-pulse" />
      </a>

    </div>
  );
}

export default App;

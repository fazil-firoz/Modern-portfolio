import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AIChatbot from './components/AIChatbot';
import IDCard from './components/IDCard';
import InitialPreloader from './components/InitialPreloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
function App() {
  const [showPreloader, setShowPreloader]     = useState(true);
  const [openChatTrigger, setOpenChatTrigger] = useState(0);

  // Refs for GSAP scroll animations
  const floatingCardRef     = useRef(null);
  const aboutRef            = useRef(null);
  const aboutTextRef        = useRef(null);
  const experienceRef       = useRef(null);
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

  // ── GSAP Scroll Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {

      const mm = gsap.matchMedia();

      // Desktop: ID Card animates to the right beside About section, then fades out
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
            end:   'top 20%',
            scrub: 1.5,
          },
        });
        gsap.to(floatingCardRef.current, {
          opacity: 0,
          scale: 0.75,
          y: 80,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 95%',
            end:   'top 40%',
            scrub: 1.2,
          },
        });
      });

      // Mobile: ID Card slides/fades out as About section enters
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

      // About text slides in from left
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

      // Experience: Vertical timeline line draws on scroll
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

      // Experience: Bullet points cascade reveal
      bulletItemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: 35, scale: 0.96 },
          {
            opacity: 1, x: 0, scale: 1,
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

      // Education: Winding road SVG draws on scroll
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

      // Education: Glowing orb travels along SVG path
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

      // Education: Milestone cards pop reveal
      eduCardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
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

      // Projects: Left vertical scroll line & traveling laser dot
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
                gsap.set(projDotRef.current, { top: `${self.progress * 100}%` });
              }
            },
          },
        }
      );

      // Projects: Cards stagger slide-up reveal
      projCardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
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

  // ── 3D Tilt effect for contact cards ──
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className="page-wrapper">

      {/* ── Initial Load Preloader ── */}
      {showPreloader && <InitialPreloader onFinish={() => setShowPreloader(false)} />}

      {/* ── Floating 3D ID Card (GSAP-animated) ── */}
      <div className="floating-card" ref={floatingCardRef}>
        <IDCard />
      </div>

      {/* ── Section 1: Hero ── */}
      <HeroSection />

      {/* ── Section 2: About ── */}
      <AboutSection sectionRef={aboutRef} textRef={aboutTextRef} />

      {/* ── Section 3: Experience ── */}
      <ExperienceSection
        sectionRef={experienceRef}
        timelineProgressRef={timelineProgressRef}
        bulletItemsRef={bulletItemsRef}
      />

      {/* ── Section 4: Education ── */}
      <EducationSection
        sectionRef={educationRef}
        roadDashedRef={roadDashedRef}
        pulseRef={pulseRef}
        eduCardsRef={eduCardsRef}
      />

      {/* ── Section 5: Projects ── */}
      <ProjectsSection
        sectionRef={projectsRef}
        projCardsRef={projCardsRef}
        projProgressRef={projProgressRef}
        projDotRef={projDotRef}
      />

      {/* ── Section 6: Contact ── */}
      <ContactSection
        onOpenChat={() => setOpenChatTrigger((c) => c + 1)}
        handleCardMouseMove={handleCardMouseMove}
        handleCardMouseLeave={handleCardMouseLeave}
      />

      {/* ── Floating WhatsApp Button ── */}
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

      {/* ── AI Portfolio Chatbot ── */}
      <AIChatbot externalOpen={openChatTrigger} />

    </div>
  );
}

export default App;

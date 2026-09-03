import React from 'react';

export default function AboutSection({ sectionRef, textRef }) {
  return (
    <section className="section-about" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-left" ref={textRef}>
          <div className="about-tag"><span className="about-tag-line" />About Me</div>

          <h2 className="about-greeting">
            Hi, I'm <span className="greeting-name">Fazil Firoz</span>
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
                <p>Specialized in C#, ASP.NET Core, React, Python Django, PostgreSQL &amp; REST APIs.</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎓</span>
              <div>
                <strong>Continuous Learner</strong>
                <p>Passionate about crafting clean UI/UX, robust backend systems &amp; interactive web experiences.</p>
              </div>
            </div>
          </div>

          <div className="chapter-mark">
            <span className="chapter-label">— currently building &amp; evolving</span>
            <span className="chapter-icon">✓</span>
            <div className="chapter-line" />
          </div>

          <div className="story-closing">
            <span className="story-emoji">♡</span>
            I believe something good is waiting ahead. And if life decides otherwise... well, I do have a Plan B — though between you and me, I'm secretly hoping I never have to use it. 😄
          </div>

          {/* Download Resume Button */}
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
  );
}

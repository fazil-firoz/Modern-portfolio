import React from 'react';

export default function EducationSection({ sectionRef, roadDashedRef, pulseRef, eduCardsRef }) {
  return (
    <section className="section-education" ref={sectionRef}>
      <div className="edu-inner">

        <div className="edu-tag">
          <span className="edu-tag-line" />
          Education &amp; Journey
        </div>

        <div className="edu-roadmap-container">
          {/* SVG Connecting Wire */}
          <svg className="edu-wire-svg" viewBox="0 0 1000 520" preserveAspectRatio="none">
            <path className="edu-wire-base" d="M 460,45 C 580,100 580,180 540,240 C 500,300 420,380 460,435" />
            <path ref={roadDashedRef} className="edu-wire-active" d="M 460,45 C 580,100 580,180 540,240 C 500,300 420,380 460,435" />
            <circle ref={pulseRef} className="edu-wire-pulse-orb" cx="460" cy="45" r="7" />
          </svg>

          {/* Milestone Cards */}
          <div className="edu-milestones-grid">

            {/* MCA */}
            <div className="edu-milestone-card edu-card-left" ref={(el) => (eduCardsRef.current[0] = el)}>
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

            {/* Python Certification */}
            <div className="edu-milestone-card edu-card-right" ref={(el) => (eduCardsRef.current[1] = el)}>
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

            {/* BCA */}
            <div className="edu-milestone-card edu-card-left" ref={(el) => (eduCardsRef.current[2] = el)}>
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
  );
}

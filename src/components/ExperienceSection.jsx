import React from 'react';
import { expItems, techBadges } from '../data/experience';

export default function ExperienceSection({ sectionRef, timelineProgressRef, bulletItemsRef }) {
  return (
    <section className="section-experience" ref={sectionRef}>
      <div className="exp-inner">

        <div className="exp-tag">
          <span className="exp-tag-line" />
          Work Experience
        </div>

        <div className="exp-timeline-wrapper">
          {/* Vertical Timeline Track */}
          <div className="exp-timeline-track">
            <div className="exp-timeline-progress" ref={timelineProgressRef} />
          </div>

          {/* Experience Content */}
          <div className="exp-timeline-content">
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

            <div className="exp-divider" />

            {/* Cascading Bullet Points */}
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
  );
}

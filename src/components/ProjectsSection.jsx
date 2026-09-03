import React from 'react';
import { projectsData } from '../data/projects';
import ProjectImageSlider from './ProjectImageSlider';

export default function ProjectsSection({ sectionRef, projCardsRef, projProgressRef, projDotRef }) {
  return (
    <section className="section-projects" ref={sectionRef}>
      <div className="proj-inner">

        <div className="proj-tag">
          <span className="proj-tag-line" />
          Featured Work
        </div>

        <h2 className="proj-heading">Projects &amp; Built Systems</h2>

        {/* Projects Grid */}
        <div className="proj-grid">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              className="proj-card"
              ref={(el) => (projCardsRef.current[idx] = el)}
            >
              {/* Card Top: Badge & Links */}
              <div className="proj-card-top">
                <div className="proj-index-group">
                  <span className="proj-index-num">{project.num}</span>
                  <span className="proj-shape-node" />
                  <span className={`proj-category-pill ${project.badgeClass}`}>{project.tag}</span>
                </div>
                <div className="proj-links-row">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn btn-github" title="GitHub Repository">
                      <svg className="proj-link-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>GitHub Repo</span>
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-link-btn btn-live" title="Live Website Preview">
                      <svg className="proj-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                      </svg>
                      <span>Live Preview ↗</span>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="proj-title">{project.title}</h3>
              <div className="proj-subtitle">{project.subtitle}</div>
              <p className="proj-desc">{project.description}</p>

              <ProjectImageSlider project={project} />

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
  );
}

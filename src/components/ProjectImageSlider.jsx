import React, { useState } from 'react';

export default function ProjectImageSlider({ project }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const targetUrl = project.live;
  const qrCodeUrl = targetUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(targetUrl)}`
    : null;

  const totalSlides = targetUrl ? 2 : 1;

  const handleNext = (e) => { e.stopPropagation(); setActiveSlide((prev) => (prev + 1) % totalSlides); };
  const handlePrev = (e) => { e.stopPropagation(); setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides); };
  const toggleReveal = (e) => { e.stopPropagation(); setIsRevealed((prev) => !prev); };

  return (
    <div className={`proj-img-wrapper ${isRevealed ? 'img-revealed' : 'img-foggy'}`}>
      {/* Slide 0: Screenshot or Placeholder */}
      <div className={`proj-slide ${activeSlide === 0 ? 'slide-active' : ''}`}>
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className={`proj-img ${isRevealed ? 'revealed' : 'foggy'}`}
              loading="lazy"
            />
            {!isRevealed && (
              <div className="proj-fog-overlay">
                <button type="button" className="proj-eye-btn" onClick={toggleReveal} title="Click Eye to see full image clarity">
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>See Image</span>
                </button>
              </div>
            )}
            {isRevealed && (
              <button type="button" className="proj-eye-btn proj-eye-hide-btn" onClick={toggleReveal} title="Click to cover image with fog">
                <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                <span>Fog Cover</span>
              </button>
            )}
          </>
        ) : (
          <div className="proj-img-placeholder">
            <div className="proj-placeholder-mac-dots">
              <span className="mac-dot dot-red" />
              <span className="mac-dot dot-yellow" />
              <span className="mac-dot dot-green" />
            </div>
            <div className="proj-placeholder-content">
              <div className="proj-placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <span className="proj-placeholder-text">Preview Image Space</span>
            </div>
          </div>
        )}
      </div>

      {/* Slide 1: QR Code */}
      {targetUrl && (
        <div className={`proj-slide proj-qr-slide ${activeSlide === 1 ? 'slide-active' : ''}`}>
          <div className="proj-qr-container">
            <div className="proj-qr-box">
              <img src={qrCodeUrl} alt={`QR Code for ${project.title}`} className="proj-qr-img" loading="lazy" />
            </div>
            <div className="proj-qr-info">
              <span className="proj-qr-badge">📱 Scan QR Code</span>
              <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="proj-qr-open-btn" title="Click to visit live website in a new tab">
                <span>Visit Live Preview</span>
                <svg className="link-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <span className="proj-qr-url-hint">{project.live.replace('https://', '')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Slider Controls */}
      {totalSlides > 1 && (
        <>
          <button type="button" className="proj-slider-arrow arrow-prev" onClick={handlePrev} title="Previous View" aria-label="Previous View">‹</button>
          <button type="button" className="proj-slider-arrow arrow-next" onClick={handleNext} title="Next View (QR Code)" aria-label="Next View">›</button>
          <button type="button" className="proj-slider-toggle-badge" onClick={handleNext} title="Toggle between Image and QR Code">
            {activeSlide === 0 ? '📱 QR Code' : '📷 Image'}
          </button>
          <div className="proj-slider-dots">
            <span className={`proj-dot ${activeSlide === 0 ? 'dot-active' : ''}`} onClick={() => setActiveSlide(0)} title="View Image" />
            <span className={`proj-dot ${activeSlide === 1 ? 'dot-active' : ''}`} onClick={() => setActiveSlide(1)} title="View QR Code" />
          </div>
        </>
      )}
    </div>
  );
}

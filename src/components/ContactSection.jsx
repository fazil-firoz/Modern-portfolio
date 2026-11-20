import React, { useRef } from 'react';

const aiButtonCss = `
.ai-cta-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 16px;
  margin: 18px 0 28px;
}
.ai-cta {
  --mx: 50%;
  --my: 50%;
  position: relative;
  display: inline-flex;
  border: 0;
  padding: 0;
  background: none;
  border-radius: 9999px;
  cursor: pointer;
  font-family: inherit;
  color: #e6fffb;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), filter .25s ease;
  filter: drop-shadow(0 10px 28px rgba(20, 184, 166, .35));
}
.ai-cta:hover { transform: translateY(-3px); filter: drop-shadow(0 16px 38px rgba(34, 211, 238, .5)); }
.ai-cta:active { transform: translateY(0) scale(.97); }
.ai-cta:focus-visible { outline: 2px solid #5eead4; outline-offset: 5px; }

.ai-cta__ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  z-index: -2;
}
.ai-cta__ring::before {
  content: "";
  position: absolute;
  left: 50%; top: 50%;
  width: 220%; aspect-ratio: 1;
  transform: translate(-50%, -50%) rotate(0deg);
  background: conic-gradient(from 0deg,
    transparent 0deg, #14b8a6 70deg, #22d3ee 120deg, #818cf8 170deg,
    transparent 230deg, transparent 360deg);
  animation: ai-cta-spin 3.2s linear infinite;
}

.ai-cta__body {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin: 2px;
  padding: 8px 10px 8px 8px;
  border-radius: 9999px;
  overflow: hidden;
  background:
    radial-gradient(120px 60px at var(--mx) var(--my), rgba(94, 234, 212, .28), transparent 70%),
    linear-gradient(135deg, #03141b 0%, #062a33 55%, #0a1f3d 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.14), inset 0 -8px 18px rgba(0,0,0,.35);
}
.ai-cta__body::before {
  content: "";
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 3px);
  pointer-events: none;
}
.ai-cta__body::after {
  content: "";
  position: absolute; top: 0; bottom: 0; left: -40%;
  width: 30%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.28), transparent);
  transform: skewX(-20deg);
  animation: ai-cta-sweep 4.5s ease-in-out infinite;
  pointer-events: none;
}
.ai-cta:hover .ai-cta__body::after { animation-duration: 1.4s; }

.ai-cta__orb {
  position: relative;
  flex: 0 0 auto;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: radial-gradient(circle at 30% 25%, #5eead4 0%, #0d9488 45%, #064e3b 100%);
  box-shadow: 0 0 18px rgba(45, 212, 191, .7), inset 0 0 8px rgba(255,255,255,.35);
}
.ai-cta__orb::before,
.ai-cta__orb::after {
  content: "";
  position: absolute; inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(94, 234, 212, .7);
  animation: ai-cta-pulse 2.4s ease-out infinite;
}
.ai-cta__orb::after { animation-delay: 1.2s; }
.ai-cta__orb svg { width: 22px; height: 22px; position: relative; z-index: 1; }
.ai-cta:hover .ai-cta__orb svg { animation: ai-cta-wiggle .6s ease; }

.ai-cta__text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.15; text-align: left; }
.ai-cta__title {
  font-size: clamp(.9rem, 2.2vw, 1rem);
  font-weight: 600;
  letter-spacing: .01em;
  white-space: nowrap;
  background: linear-gradient(90deg, #ffffff 0%, #a5f3fc 60%, #c7d2fe 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ai-cta__status {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 3px;
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: .04em;
  color: rgba(167, 243, 208, .85);
}
.ai-cta__status i {
  width: 6px; height: 6px; border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 8px #34d399;
  animation: ai-cta-blink 1.6s ease-in-out infinite;
}
.ai-cta__arrow {
  flex: 0 0 auto;
  width: 30px; height: 30px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(165, 243, 252, .3);
  font-size: .95rem;
  transition: transform .25s ease, background .25s ease;
}
.ai-cta:hover .ai-cta__arrow { transform: translate(2px, -2px) rotate(8deg); background: rgba(94, 234, 212, .25); }

@keyframes ai-cta-spin  { to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes ai-cta-sweep { 0%, 55% { left: -40%; } 100% { left: 140%; } }
@keyframes ai-cta-pulse { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.9); opacity: 0; } }
@keyframes ai-cta-blink { 50% { opacity: .35; } }
@keyframes ai-cta-wiggle { 25% { transform: rotate(-12deg); } 75% { transform: rotate(12deg); } }

@media (prefers-reduced-motion: reduce) {
  .ai-cta__ring::before, .ai-cta__body::after,
  .ai-cta__orb::before, .ai-cta__orb::after, .ai-cta__status i { animation: none; }
}
`;

export default function ContactSection({ onOpenChat, handleCardMouseMove, handleCardMouseLeave }) {
  const aiBtnRef = useRef(null);

  const triggerChat = (e) => {
    if (e) {
      if (e.type === 'touchend' && typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    onOpenChat();
  };

  const handleAiBtnMove = (e) => {
    const el = aiBtnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="section-contact">
      <style>{aiButtonCss}</style>
      <div className="contact-inner">
        <div className="contact-tag">
          <span className="contact-tag-line" />
          Get In Touch
        </div>

        <h2 className="contact-heading">Let's Connect &amp; Build Together</h2>
        <p className="contact-subtext">
          Feel free to reach out for software engineering opportunities, technical collaborations, or direct project inquiries!
        </p>

        {/* Contact Cards Grid */}
        <div className="contact-cards-grid">

          {/* WhatsApp */}
          <a href="https://wa.me/919048634881" target="_blank" rel="noopener noreferrer" className="contact-card card-whatsapp" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
            <div className="contact-card-icon-box icon-whatsapp">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <div className="contact-card-info">
              <span className="contact-label">WhatsApp Direct</span>
              <span className="contact-value">+91 9048634881</span>
            </div>
            <span className="contact-action-arrow">↗</span>
          </a>

          {/* Phone */}
          <a href="tel:+919048634881" className="contact-card card-phone" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
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

          {/* Email */}
          <a href="mailto:fazzilfiroz@gmail.com" className="contact-card card-email" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
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

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/fazzil-firoz" target="_blank" rel="noopener noreferrer" className="contact-card card-linkedin" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
            <div className="contact-card-icon-box icon-linkedin">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className="contact-card-info">
              <span className="contact-label">LinkedIn Profile</span>
              <span className="contact-value">fazzil-firoz</span>
            </div>
            <span className="contact-action-arrow">↗</span>
          </a>

          {/* GitHub */}
          <a href="https://github.com/fazil-firoz" target="_blank" rel="noopener noreferrer" className="contact-card card-github" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
            <div className="contact-card-icon-box icon-github">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="contact-card-info">
              <span className="contact-label">GitHub Profile</span>
              <span className="contact-value">fazil-firoz</span>
            </div>
            <span className="contact-action-arrow">↗</span>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/fzl.frz/" target="_blank" rel="noopener noreferrer" className="contact-card card-instagram" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
            <div className="contact-card-icon-box icon-instagram">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="contact-card-info">
              <span className="contact-label">Instagram Profile</span>
              <span className="contact-value">fzl.frz</span>
            </div>
            <span className="contact-action-arrow">↗</span>
          </a>

          {/* Address */}
          <a href="https://maps.google.com/?q=Erakkingal+(H),+Mulayankavu+(PO),+Kulukkallur,+Palakkad,+Kerala+679337,+India" target="_blank" rel="noopener noreferrer" className="contact-card card-address" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
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

        {/* Footer Avatar Divider — Profile Circle with lines */}
        <div className="footer-avatar-divider">
          <div className="avatar-divider-line left-line" />
          <div className="footer-avatar-wrapper" title="Click photo to Ask AI Assistant" onClick={triggerChat} onTouchEnd={triggerChat}>
            <img src="/Images/profile-pic (18).png" alt="Fazil Firoz Profile" className="footer-avatar-img" />
            <span className="footer-avatar-online-dot" />
          </div>
          <div className="avatar-divider-line right-line" />
        </div>

        {/* Futuristic AI Button Below Profile Circle */}
        <div className="ai-cta-wrap">
          <button
            ref={aiBtnRef}
            type="button"
            className="ai-cta"
            onClick={triggerChat}
            onTouchEnd={triggerChat}
            onMouseMove={handleAiBtnMove}
            aria-label="Ask AI about Firoz"
          >
            <span className="ai-cta__ring" aria-hidden="true" />
            <span className="ai-cta__body">
              <span className="ai-cta__orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" fill="rgba(255,255,255,.9)" />
                  <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="#fff" stroke="none" />
                </svg>
              </span>
              <span className="ai-cta__text">
                <span className="ai-cta__title">Ask AI about Firoz</span>
                <span className="ai-cta__status"><i />Assistant online</span>
              </span>
              <span className="ai-cta__arrow" aria-hidden="true">↗</span>
            </span>
          </button>
        </div>

        {/* Footer Copyright Bar */}
        <div className="contact-footer-bar">
          <span>© 2026 Fazil Firoz</span>
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
            <a href="https://drive.google.com/file/d/11zqZ9MMEkjkH2nVNA3Sba01vAS2chLY3/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>

      </div>
    </section>
  );
}
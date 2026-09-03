import React from 'react';

const PROFILE_IMG = "/Images/WhatsApp_Image_2026-08-05_at_11.17.06_PMccccccc-removebg-preview.png";

export default function IDCard() {
  return (
    <div className="scene">
      {/* Lanyard / Thread Strap */}
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
              <div className="card-icon-mark">FZ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-shadow" />
    </div>
  );
}

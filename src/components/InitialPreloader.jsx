import React, { useEffect, useState } from 'react';

export default function InitialPreloader({ onFinish }) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`initial-preloader-overlay ${isHiding ? 'preloader-exit' : ''}`}>
      <div className="preloader-minimal-box">
        <div className="preloader-ring-pulse" />
        <div className="preloader-monogram">FZ</div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const percent = (scrollTop / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, percent)));
      } else {
        setProgress(0);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2px] bg-white/[0.06] backdrop-blur-sm"
    >
      <div
        className="h-full bg-gradient-to-r from-[#5B5BFF] via-[#7C7CFF] to-[#DAD8FF] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(124,124,255,0.85)] relative"
        style={{ width: `${progress}%` }}
      >
        {/* Subtle luminous spark at the leading edge */}
        {progress > 0.5 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#DAD8FF] shadow-[0_0_8px_#7C7CFF,0_0_14px_rgba(91,91,255,0.9)]" />
        )}
      </div>
    </div>
  );
};

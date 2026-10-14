import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 350px
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top of page"
        title="Back to top"
        className="group flex items-center gap-2 px-3.5 py-3 rounded-full bg-[#111111]/90 hover:bg-[#5B5BFF] text-[#F2F0E6] hover:text-white border border-[#F2F0E6]/20 hover:border-[#7C7CFF] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C7CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
      >
        <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
        <span className="hidden sm:inline text-[11px] font-mono-code uppercase tracking-wider font-semibold">
          Top
        </span>
      </button>
    </div>
  );
};

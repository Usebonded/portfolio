import React from 'react';
import { DeveloperEnvironmentShell } from './DeveloperEnvironmentShell';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="home" className="relative w-full overflow-hidden flex flex-col justify-end pt-28 pb-12 md:pb-20 min-h-screen">
      {/* Background Deep Gradient Overlay - Transparent to reveal 3D Particle Universe */}
      <div className="absolute inset-0 z-0 bg-transparent pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,253,240,0.02))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
      </div>

      {/* Main Grid: Headline Left */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12">
        {/* Headline Container */}
        <div className="max-w-6xl relative">
          {/* Decorative Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-[#7C7CFF]/80" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#F2F0E6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Inception June 2025 · B.Tech AI &amp; ML
            </span>
          </div>

          <h1 className="font-bricolage text-white leading-[0.85] tracking-tight font-bold">
            <span className="block text-[14vw] md:text-[7.5rem] lg:text-[9.5rem] text-white drop-shadow-2xl">
              SAVAR
            </span>
            <span className="block text-[14vw] md:text-[7.5rem] lg:text-[9.5rem] text-white drop-shadow-2xl -mt-2 md:-mt-4">
              SHETTY
            </span>
          </h1>

          {/* Status Badge below SAVAR SHETTY */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
            <span className="text-[11px] sm:text-xs font-mono-code tracking-wider uppercase text-white font-medium">
              Status: Symbiosis University // Active
            </span>
          </div>

          {/* Positioning Statement */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#F2F0E6] font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Building intelligent systems at the intersection of AI, machine learning and real-world applications.
          </p>
        </div>

        {/* Developer Environment Shell (Directly below SAVAR SHETTY) */}
        <div className="mt-8 sm:mt-12 w-full">
          <DeveloperEnvironmentShell />
        </div>
      </div>

      {/* Bottom Floating Telemetry & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 text-xs font-mono-code text-white">
        <div className="flex items-center gap-4">
          <span className="text-white">SYS.NORM // 2026.9</span>
          <span aria-hidden="true" className="text-white">|</span>
          <span className="text-white">SMART INDIA &amp; GOOGLE SYNAPSE</span>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#projects"
          onClick={handleScrollToProjects}
          className="flex items-center gap-3 text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest text-white">
            Scroll To Inspect
          </span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-white to-transparent" />
        </a>
      </div>
    </header>
  );
};

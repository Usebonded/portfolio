import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAudit
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-neutral-900/80 backdrop-blur-xl text-white py-14 transition-colors shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo & Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              to="/"
              className="text-lg font-bricolage font-bold text-white tracking-tight flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-xs font-mono font-bold">
                SS
              </div>
              <span>{PERSONAL_INFO.name}</span>
            </Link>
            <p className="text-xs text-white mt-1 font-mono-code">
              AI/ML Engineer · Symbiosis Skills &amp; Professional University, Pune
            </p>
          </div>

          {/* Quick Page Nav Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono-code text-white">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-emerald-400 transition-colors">Projects</Link>
            <Link to="/systems" className="hover:text-emerald-400 transition-colors">Skills &amp; Vision</Link>
            <Link to="/about" className="hover:text-emerald-400 transition-colors">My Journey</Link>
            <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 text-xs font-mono-code">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2.5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2.5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="p-2.5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white font-mono-code">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <span>
              &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </span>
            <span aria-hidden="true">·</span>
            <Link
              to="/privacy"
              className="text-white hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to="/terms"
              className="text-white hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAudit}
              className="text-white hover:underline flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sprint Audit Report</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6A6A0] animate-pulse" />
              <span>SYS.NORM // ACTIVE</span>
            </span>

            {/* Back to Top Smooth Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className={`p-2 rounded-full border border-white/15 text-white hover:bg-white/10 transition-all ${
                showBackToTop ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


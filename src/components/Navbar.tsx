import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  theme?: string;
  onToggleTheme?: () => void;
  onOpenResume?: () => void;
  onOpenAudit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.12] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[94rem] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setMobileMenuOpen(false);
              }
            }}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Savar Shetty — Homepage"
          >
            <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
            <span className="font-anton tracking-tight text-lg sm:text-xl text-white uppercase">
              SAVAR SHETTY
            </span>
          </Link>

          {/* Center Navigation Links (Editorial Minimalist) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={location.pathname === '/' ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-mono uppercase tracking-widest text-[#A5A5A5] hover:text-white transition-colors relative py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Action: Status Indicator */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.12] bg-[#141414] text-[10px] font-mono uppercase tracking-wider text-[#E8E8E8]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-md text-white hover:text-[#A5A5A5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Clean Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden bg-[#050505] text-white flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between border-b border-white/[0.12] pb-6">
            <Link
              to="/"
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="font-anton text-2xl tracking-tight text-white uppercase hover:text-[#A5A5A5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              aria-label="Savar Shetty — Homepage"
            >
              SAVAR SHETTY
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-white hover:text-[#A5A5A5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 my-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={location.pathname === '/' ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#A5A5A5] hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C7CFF] rounded-lg px-2 py-1"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#555] group-hover:text-white transition-colors">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="border-t border-white/[0.12] pt-6 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A5A5A5]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <p className="text-xs font-mono text-[#666]">
              AI / ML RESEARCH &bull; SYSTEMS &bull; DESIGN
            </p>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/Modals/CaseStudyModal';
import { ResumeModal } from './components/Modals/ResumeModal';
import { AuditModal } from './components/Modals/AuditModal';
import { LegalModal } from './components/Modals/LegalModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ThreeCanvasBackground } from './components/ThreeCanvasBackground';
import { AmbientGlowFollower } from './components/AmbientGlowFollower';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingBackToTop } from './components/FloatingBackToTop';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SystemsPage } from './pages/SystemsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  // Theme state (default dark space aesthetic)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('savar_portfolio_theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'dark';
  });

  // Modal and view states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('savar_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    addToast(
      `${next === 'dark' ? 'Dark Space' : 'Light Matrix'} Mode`,
      'Theme preference synchronized with local state.',
      'info'
    );
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#0A0A0A] text-[#F2F0E6] flex flex-col font-sans transition-colors duration-300 overflow-x-hidden selection:bg-[#5B5BFF]/30 selection:text-[#F2F0E6]">
        {/* Top Viewport Horizontal Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Film Grain Texture Overlay (Velos Template) */}
        <div className="bg-grain" />

        {/* 3D WebGL Background & Mouse Spotlight */}
        <ThreeCanvasBackground theme={theme} />
        <AmbientGlowFollower />
        <CustomCursor />

        {/* Floating Pill Navigation */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAudit={() => setIsAuditOpen(true)}
        />

        {/* Multipage Routes Outlet */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectProject={setSelectedProject}
                  onOpenResume={() => setIsResumeOpen(true)}
                  onNotify={addToast}
                />
              }
            />
            <Route
              path="/projects"
              element={<ProjectsPage onSelectProject={setSelectedProject} />}
            />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/skills" element={<SystemsPage />} />
            <Route
              path="/about"
              element={<AboutPage onOpenResume={() => setIsResumeOpen(true)} />}
            />
            <Route
              path="/experience"
              element={<AboutPage onOpenResume={() => setIsResumeOpen(true)} />}
            />
            <Route
              path="/contact"
              element={<ContactPage onNotify={addToast} />}
            />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Persistent Multi-Page Footer */}
        <Footer
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
          onOpenAudit={() => setIsAuditOpen(true)}
        />

        {/* Floating Back to Top Button */}
        <FloatingBackToTop />

        {/* Modals & Overlays */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <AuditModal
          isOpen={isAuditOpen}
          onClose={() => setIsAuditOpen(false)}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />

        {/* Toast Notification Container */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </Router>
  );
}


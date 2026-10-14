import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Code, Shield, Sparkles, Smartphone, Search, Zap } from 'lucide-react';
import { AUDIT_CHECKLIST_DATA } from '../../data/portfolioData';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCategory = AUDIT_CHECKLIST_DATA[activeTab];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl text-zinc-900 dark:text-zinc-100 p-6 sm:p-8 my-auto">
        <button
          onClick={onClose}
          aria-label="Close audit overview"
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 id="audit-modal-title" className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
              Website Audit, Optimization & Sprint Verification
            </h2>
            <p className="text-xs text-zinc-500 dark:text-white">
              Live checklist verification for responsive UX, SEO, speed, accessibility, and utility
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl my-6 scrollbar-none">
          {AUDIT_CHECKLIST_DATA.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === idx
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-zinc-600 dark:text-white hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <span>{cat.category.split('.')[1]}</span>
            </button>
          ))}
        </div>

        {/* Active Checklist Items */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-white">
            {currentCategory.category}
          </h3>

          <div className="space-y-3">
            {currentCategory.items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-white leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[#A6A6A0] border border-white/10 text-xs font-semibold shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation Code Samples Tab */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white text-xs font-mono-code overflow-x-auto">
          <div className="flex items-center justify-between text-white mb-2 border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>Implemented Architecture & Sprint Files</span>
            </span>
            <span>Production Ready</span>
          </div>
          <p className="text-white">
            ✓ Mobile Overflow Guard: <span className="text-white">src/index.css (html, body overflow-x: hidden)</span>
          </p>
          <p className="text-white">
            ✓ Dynamic Year & Tel/Mailto: <span className="text-white">src/components/Footer.tsx & ContactSection.tsx</span>
          </p>
          <p className="text-white">
            ✓ Robots & Sitemap: <span className="text-white">/public/robots.txt, /public/sitemap.xml</span>
          </p>
          <p className="text-white">
            ✓ OpenGraph & JSON-LD: <span className="text-white">/index.html & /metadata.json</span>
          </p>
          <p className="text-white">
            ✓ Lazy Loading & Fallbacks: <span className="text-white">src/components/Projects.tsx (loading="lazy")</span>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <span className="text-xs text-zinc-500 dark:text-white">100% Sprint Checklist Compliance</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            Close Audit View
          </button>
        </div>
      </div>
    </div>
  );
};

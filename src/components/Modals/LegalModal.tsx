import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl text-zinc-900 dark:text-zinc-100 p-6 sm:p-8 my-auto">
        <button
          onClick={onClose}
          aria-label="Close legal modal"
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h2 id="legal-title" className="text-xl font-bold text-zinc-900 dark:text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-white">Effective Date: September 2026 · Savar Shetty</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-white leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-4">
          {isPrivacy ? (
            <>
              <p>
                This Privacy Policy describes how your information is handled when visiting the engineering portfolio of Savar Shetty (<a href="mailto:shettysavar02@gmail.com" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">shettysavar02@gmail.com</a>).
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">1. Information Collection</h3>
              <p>
                When you submit the contact form, the details you provide (Name, Email address, Subject, and Message) are transmitted strictly to communicate regarding professional opportunities, consulting, or project inquiries.
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">2. Cookies & Analytics</h3>
              <p>
                This portfolio does not utilize third-party ad tracking cookies or fingerprinting scripts. Local storage is strictly utilized to persist your interface preferences (e.g. Dark/Light mode theme state).
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">3. Data Retention & Contact</h3>
              <p>
                Your submitted messages are kept confidential and are never sold or shared with commercial data brokers. You may request data removal anytime by emailing <a href="mailto:shettysavar02@gmail.com" className="text-blue-600 dark:text-blue-400 underline">shettysavar02@gmail.com</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the software portfolio and case study portal of Savar Shetty. By accessing this site, you agree to the following terms:
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">1. Intellectual Property</h3>
              <p>
                All original architectural designs, code samples, text descriptions, and editorial content displayed on this website are authored by Savar Shetty unless specified as open-source libraries under MIT/Apache licenses.
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">2. Permitted Use</h3>
              <p>
                You are welcome to review case studies, inspect code repositories via the provided GitHub links, and contact Savar Shetty regarding recruitment, contracting, or collaborative engineering initiatives.
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mt-3">3. Disclaimer</h3>
              <p>
                Project case studies, benchmarks, and throughput metrics are documented from actual benchmark environments and production deployments.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, TrendingUp, AlertTriangle } from 'lucide-react';
import { Project } from '../../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl text-zinc-900 dark:text-zinc-100 p-6 sm:p-8 md:p-10 my-auto">
        {/* Sticky close button */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-white mb-2">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.caseStudy.clientOrContext}</span>
          <span aria-hidden="true">·</span>
          <span>{project.caseStudy.timeline}</span>
        </div>

        <h2 id="case-study-title" className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
          {project.title}
        </h2>
        <p className="text-base text-zinc-600 dark:text-white mt-1 max-w-2xl">
          {project.tagline}
        </p>

        {/* Media Frame */}
        <div className="relative my-6 aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/60">
          <img
            src={project.image}
            alt={`${project.title} interface architecture`}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Graceful fallback container if asset loading fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-900 text-zinc-200">
            <Layers className="w-10 h-10 text-blue-400 mb-2" />
            <p className="font-semibold">{project.title} Architecture Preview</p>
            <p className="text-xs text-zinc-400 mt-1">{project.shortDescription}</p>
          </div>
        </div>

        {/* Key Quantifiable Results Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 mb-8">
          {project.caseStudy.keyResults.map((result, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-mono-code text-blue-600 dark:text-blue-400 tabular-nums">
                {result.metric}
              </span>
              <span className="text-xs text-zinc-600 dark:text-white mt-1 leading-snug">
                {result.label}
              </span>
            </div>
          ))}
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>The Engineering Problem</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-white">
              {project.caseStudy.problem}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <div className="flex items-center gap-2 text-[#A6A6A0] text-sm font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-white">
              {project.caseStudy.solution}
            </p>
          </div>
        </div>

        {/* System Architecture Flow */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 text-base font-semibold mb-4">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Core Architecture & Data Flow</span>
          </div>

          <div className="space-y-3">
            {project.caseStudy.architecture.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-800/30"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-sm text-zinc-700 dark:text-white leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-white block mb-2">
            Technical Specification & Stack
          </span>
          <p className="text-sm text-zinc-700 dark:text-white font-mono-code text-xs leading-relaxed">
            {project.caseStudy.techDetails}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Interactive Demo</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-white hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};

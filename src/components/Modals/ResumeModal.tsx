import React, { useEffect } from 'react';
import { X, Printer, Mail, Phone, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILL_CATEGORIES } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-white/[0.15] text-[#E8E8E8] p-6 sm:p-10 my-auto shadow-2xl">
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.12]">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase bg-white text-black font-semibold hover:bg-[#E8E8E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Inquiry%20for%20Savar%20Shetty`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase border border-white/[0.2] text-white hover:border-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Directly</span>
            </a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close CV modal"
            className="p-2 text-[#888888] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Content Sheet */}
        <div id="printable-cv" className="space-y-8 font-mono">
          {/* Header */}
          <div className="border-b border-white/[0.12] pb-6">
            <h2 id="resume-title" className="text-4xl font-anton tracking-tight text-white uppercase">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-[#A5A5A5] mt-1">
              AI/ML ENGINEER &bull; B.TECH CANDIDATE (2025&ndash;2029)
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-[#888888]">
              <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span aria-hidden="true">&bull;</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span aria-hidden="true">&bull;</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                github.com/Usebonded
              </a>
              <span aria-hidden="true">&bull;</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                linkedin.com/in/savar-shetty-usebonded
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/[0.1] pb-1.5 mb-3">
              EXECUTIVE PROFILE
            </h3>
            <p className="text-xs text-[#A5A5A5] leading-relaxed font-light">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/[0.1] pb-1.5 mb-3">
              EDUCATION
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white uppercase">{edu.institution}</span>
                    <span className="text-[#888888]">{edu.period}</span>
                  </div>
                  <div className="text-[#A5A5A5]">{edu.degree} &mdash; {edu.location}</div>
                  <ul className="mt-1.5 space-y-1 text-[#888888] list-disc list-inside font-light">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/[0.1] pb-1.5 mb-3">
              EXPERIENCE &amp; TECHNICAL LEADERSHIP
            </h3>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white uppercase">{exp.role}</span>
                    <span className="text-[#888888]">{exp.period}</span>
                  </div>
                  <div className="text-[#A5A5A5]">{exp.company} &mdash; {exp.location}</div>
                  <ul className="mt-1.5 space-y-1 text-[#888888] list-disc list-inside font-light">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/[0.1] pb-1.5 mb-3">
              TECHNICAL COMPETENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="p-3 bg-[#141414] border border-white/[0.08]">
                  <span className="font-bold text-white uppercase block mb-1">{cat.title}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="text-[#888888] text-[11px] after:content-[',_'] last:after:content-['']">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

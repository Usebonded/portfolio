import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, GraduationCap, Award, FileText, Download, CheckCircle2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { AboutExperience } from '../components/AboutExperience';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutPageProps {
  onOpenResume: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResume }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-white">
      {/* Header & Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono-code text-white mb-4">
          <Link to="/" className="hover:text-[#00FF66] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#7C7CFF]">MY JOURNEY</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bricolage font-bold text-white tracking-tight">
              My Journey · 2025 — 2029
            </h1>
            <p className="text-base sm:text-lg text-white font-light max-w-2xl mt-3 leading-relaxed">
              Chronological milestones from college inception in June 2025, national hackathons, hardware &amp; ML engineering sprints, through to projected graduation in 2029.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code uppercase tracking-wider bg-white text-black font-semibold hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Full CV / Manifest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bio & Academic Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACADEMIC FOUNDATION // PUNE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bricolage font-bold text-white">
              Symbiosis Skills &amp; Professional University
            </h2>

            <p className="text-sm sm:text-base text-white leading-relaxed font-light">
              Currently pursuing a Bachelor of Technology (B.Tech) in Artificial Intelligence &amp; Machine Learning (Inception: June 2025 · Class of 2029). The curriculum fuses foundational mathematical statistics, linear algebra, and data structures with applied deep learning, autonomous agents, and systems engineering.
            </p>

            <p className="text-sm text-white leading-relaxed font-light">
              Beyond lectures, Savar spends high-intensity sprints building production-ready architectures—connecting microcontrollers with ensemble fraud detection models, multi-modal LLM reasoning pipelines, and emergency logistics optimization platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-white/10 text-xs font-mono-code">
            <div>
              <span className="block text-white mb-0.5">Degree</span>
              <span className="text-[#7C7CFF] font-bold">B.Tech AI &amp; ML</span>
            </div>
            <div>
              <span className="block text-white mb-0.5">Timeline</span>
              <span className="text-white font-bold">2025 — 2029</span>
            </div>
            <div>
              <span className="block text-white mb-0.5">Location</span>
              <span className="text-white font-bold">Pune, India</span>
            </div>
            <div>
              <span className="block text-white mb-0.5">Status</span>
              <span className="text-[#00FF66] font-bold">Active &amp; Enrolled</span>
            </div>
          </div>
        </div>

        {/* Hackathon Honor Roll Card */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#7C7CFF] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#7C7CFF]" />
              <span>COMPETITIVE RECORD</span>
            </div>

            <h3 className="text-2xl font-bricolage font-bold text-white">
              Hackathon Sprints
            </h3>

            <div className="space-y-4 text-xs font-mono-code">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-400 font-bold block">Smart India Hackathon 2026</span>
                <span className="text-white block font-sans">Team Leader &amp; UI/UX Designer</span>
                <span className="text-white text-[11px] block">Project: V.A.L.I.D. Synthetic Voice Forensics</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-blue-400 font-bold block">Google Synapse Hackathon</span>
                <span className="text-white block font-sans">AI &amp; Computer Vision Engineer</span>
                <span className="text-white text-[11px] block">Project: MeshRoute Ops Emergency Dispatch</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 text-xs font-mono-code text-white">
            Sprint Strategy: Rapid MVP Prototyping &amp; Real Hardware Integration.
          </div>
        </div>
      </div>

      {/* The Interactive Timeline Component */}
      <div className="mb-16">
        <AboutExperience onOpenResume={onOpenResume} />
      </div>

      {/* Bottom CTA to Projects */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bricolage font-bold text-white">
          Inspect The Systems Built During This Journey
        </h3>
        <p className="text-sm sm:text-base text-white max-w-xl mx-auto font-light leading-relaxed">
          Every milestone represents working code deployed to production or open-sourced on GitHub.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-white/10 transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

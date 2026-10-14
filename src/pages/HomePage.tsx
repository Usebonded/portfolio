import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Cpu, Compass, Send } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { CoreSystems } from '../components/CoreSystems';
import { AboutExperience } from '../components/AboutExperience';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';
import { Project } from '../types';

interface HomePageProps {
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
  onNotify: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProject,
  onOpenResume,
  onNotify,
}) => {
  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <Hero onOpenResume={onOpenResume} />

      {/* Featured Projects Section */}
      <SectionDivider label="Selected Work" />
      <div className="relative">
        <Projects onSelectProject={onSelectProject} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 mb-16 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-mono-code text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl group"
          >
            <Layers className="w-4 h-4 text-[#7C7CFF]" />
            <span>Open Complete Project Archive &amp; Specs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Core Systems / Skills & Vision */}
      <SectionDivider label="Skills & Vision" />
      <div className="relative">
        <CoreSystems />
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 mb-16 flex justify-center">
          <Link
            to="/systems"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-mono-code text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl group"
          >
            <Cpu className="w-4 h-4 text-[#7C7CFF]" />
            <span>Inspect Full 32-Skill Technical Competencies</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Journey Timeline */}
      <SectionDivider label="My Journey" />
      <div className="relative">
        <AboutExperience onOpenResume={onOpenResume} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 mb-16 flex justify-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-mono-code text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl group"
          >
            <Compass className="w-4 h-4 text-[#7C7CFF]" />
            <span>Read Complete Chronology &amp; Academic Inception</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Communications / Contact */}
      <SectionDivider label="Dispatch Comms" />
      <div className="relative">
        <ContactSection onNotify={onNotify} />
      </div>
    </div>
  );
};

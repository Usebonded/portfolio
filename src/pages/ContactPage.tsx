import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, Linkedin, Twitter, ArrowRight, ShieldCheck, Clock, Terminal } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactPageProps {
  onNotify: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNotify }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-white">
      {/* Header & Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono-code text-white mb-4">
          <Link to="/" className="hover:text-[#00FF66] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#7C7CFF]">DISPATCH COMMS</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bricolage font-bold text-white tracking-tight">
              Engage Systems &amp; Comms
            </h1>
            <p className="text-base sm:text-lg text-white font-light max-w-2xl mt-3 leading-relaxed">
              Seeking an applied AI/ML Engineer for machine learning pipelines, full-stack prototyping, or high-stakes competitive hackathons? Direct communication channels are open.
            </p>
          </div>

          <div className="text-right hidden sm:block font-mono-code text-xs text-white">
            <div className="flex items-center gap-2 justify-end text-[#00FF66]">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span>Channels Live &amp; Monitored</span>
            </div>
            <div className="text-[11px] text-white mt-1">Guaranteed SLA &lt; 24h</div>
          </div>
        </div>
      </div>

      {/* Embedded Contact Component */}
      <div className="mb-16">
        <ContactSection onNotify={onNotify} />
      </div>

      {/* Recruiter / Collaboration FAQ Grid */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl mb-16 space-y-8">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#7C7CFF]">
            OPPORTUNITY PARAMETERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bricolage font-bold text-white mt-1">
            Frequently Asked Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#00FF66] font-mono-code text-xs">
              <Clock className="w-4 h-4" />
              <span>AVAILABILITY</span>
            </div>
            <h3 className="font-bricolage text-base font-bold text-white">
              Internship &amp; Project Roles
            </h3>
            <p className="text-white leading-relaxed font-light">
              Actively seeking AI/ML engineering internships, research fellowships, and high-impact systems engineering roles. Flexible across remote, hybrid, or on-site arrangements in Pune.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono-code text-xs">
              <Terminal className="w-4 h-4" />
              <span>TECH STACK FIT</span>
            </div>
            <h3 className="font-bricolage text-base font-bold text-white">
              Primary Competencies
            </h3>
            <p className="text-white leading-relaxed font-light">
              Specialized in Python (PyTorch, TensorFlow, FastAPI), Ensemble Machine Learning, Multi-Modal Vision &amp; Audio, Agentic Workflows, React/TypeScript frontends, and ESP32 IoT hardware.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono-code text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>TURNAROUND TIME</span>
            </div>
            <h3 className="font-bricolage text-base font-bold text-white">
              Direct Response Policy
            </h3>
            <p className="text-white leading-relaxed font-light">
              All recruiter, hackathon teammate, and collaboration inquiries sent via this portal are dispatched directly to Savar&apos;s primary mailbox and responded to within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

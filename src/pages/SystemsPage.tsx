import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Shield, Users, Terminal, CheckCircle2, Layers, Server, Code2, Cloud, ArrowRight } from 'lucide-react';
import { CoreSystems } from '../components/CoreSystems';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { TextContrastZone } from '../components/TextContrastZone';

export const SystemsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-white">
      {/* Header & Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono-code text-white mb-4">
          <Link to="/" className="hover:text-[#00FF66] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#7C7CFF]">SKILLS &amp; VISION</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bricolage font-bold text-white tracking-tight">
              Skills &amp; Architectural Vision
            </h1>
            <div className="mt-3">
              <TextContrastZone
                as="p"
                className="text-base sm:text-lg text-[#F2F0E6] font-light max-w-2xl leading-relaxed py-2 pl-3 pr-8 -ml-3"
              >
                Applied machine learning competencies, full-stack engineering toolkits, hardware/IoT integrations, and long-term architectural vision for autonomous agentic systems.
              </TextContrastZone>
            </div>
          </div>

          <div className="text-right hidden sm:block font-mono-code text-xs text-white">
            <div>32 Validated Technologies</div>
            <div className="text-[#00FF66] text-[11px] mt-1">Multi-Modal · Edge IoT · Microservices</div>
          </div>
        </div>
      </div>

      {/* Core Systems 3-Pillar Visualizer */}
      <div className="mb-16">
        <CoreSystems />
      </div>

      {/* Complete Skills Matrix */}
      <div className="mb-16 pt-8 border-t border-white/10">
        <SkillsMatrix />
      </div>

      {/* Engineering Principles & Methodology */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl mb-16 space-y-8">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-emerald-400">
            SYSTEM METHODOLOGY
          </span>
          <h2 className="text-3xl font-bricolage font-bold text-white mt-1">
            Engineering Principles for Autonomous Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bricolage text-lg font-bold text-white">
              Model Ensemble Rigor
            </h3>
            <p className="text-white leading-relaxed font-light">
              Single-point models suffer from edge hallucinations. Savar implements ensemble architectures—pairing deep neural features with deterministic verification and anomaly baselines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bricolage text-lg font-bold text-white">
              Low-Latency Edge Portability
            </h3>
            <p className="text-white leading-relaxed font-light">
              Machine learning models belong where the action happens. By compressing networks for ESP32 and edge gateways, critical telemetry is processed in sub-100ms offline windows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bricolage text-lg font-bold text-white">
              Sprint Velocity &amp; Delivery
            </h3>
            <p className="text-white leading-relaxed font-light">
              Ideas gain value only when deployed into human hands. Rapid prototyping disciplines honed through national hackathons turn abstract math into production interfaces within hours.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl">
        <div>
          <h3 className="font-bricolage text-xl font-bold text-white">Ready to inspect shipped case studies?</h3>
          <p className="text-xs text-white mt-1">Review live projects where these exact technical tools are deployed.</p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl shrink-0"
        >
          <span>View Project Case Studies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

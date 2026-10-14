import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ExternalLink,
  Github,
  Linkedin,
  ArrowRight,
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  FolderGit2,
  Maximize2,
  Cpu,
  Layers,
  Radio,
  Sparkles,
  TrendingUp,
  Sliders,
  Shield,
  Activity
} from 'lucide-react';
import { PROJECTS, ADDITIONAL_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { TextContrastZone } from './TextContrastZone';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

// Visual configurations for each project matching the video aesthetic
interface CardVisualConfig {
  theme: 'dark' | 'light';
  badge: string;
  bullets: string[];
  footerActions: string[];
  accentColor: string;
}

const VISUAL_CONFIGS: Record<string, CardVisualConfig> = {
  'argus-fraud-detection': {
    theme: 'dark',
    badge: '01 | FRAUD · AI · FINANCIAL',
    bullets: ['REAL-TIME TRANSACTIONS', 'LATENCY < 45MS', 'ML ENSEMBLE'],
    footerActions: ['LEARN', 'BENCHMARK', 'CODE'],
    accentColor: '#f97316'
  },
  'mma-multimodel-assistant': {
    theme: 'light',
    badge: '02 | MULTI-MODAL · VISION · AUDIO',
    bullets: ['VISION PERCEPTION', 'REAL-TIME AUDIO', 'AUTONOMOUS AGENT'],
    footerActions: ['TEST API', 'PIPELINE', 'SPECS'],
    accentColor: '#5B5BFF'
  },
  'valid-audio-forensics': {
    theme: 'dark',
    badge: '03 | AI · FORENSICS · SECURITY',
    bullets: ['SPECTRAL ANALYSIS', 'PHASE ANOMALIES', '96.2% DETECTION'],
    footerActions: ['VERIFY', 'SYNTHETIC DETECTION', 'AUDIO FORENSICS'],
    accentColor: '#ef4444'
  },
  'stock-trading-bot': {
    theme: 'light',
    badge: '04 | TRADING · RL · FINANCIAL',
    bullets: ['GYMNASIUM ENV', 'PPO ALGORITHM', 'RISK MANAGEMENT'],
    footerActions: ['SIMULATE', 'BACKTEST', 'REPO'],
    accentColor: '#00FF66'
  },
  'meshroute-ops': {
    theme: 'dark',
    badge: '05 | DISASTER · RESCUE · IOT',
    bullets: ['CV TERRAIN MAPPING', 'DYNAMIC ROUTING', 'REAL-TIME COORDINATION'],
    footerActions: ['MAP CONSOLE', 'NODES', 'DEPLOY'],
    accentColor: '#f43f5e'
  },
  'hostelease': {
    theme: 'light',
    badge: '06 | CAMPUS · ACADEMIC · SAAS',
    bullets: ['QR GATE PASS', 'COMPLAINT DESK', 'ROLE-BASED ACCESS'],
    footerActions: ['DEMO APP', 'EXPLORE', 'GITHUB'],
    accentColor: '#f97316'
  },
  'blood-donation-dashboard': {
    theme: 'dark',
    badge: '07 | HEALTHCARE · OPERATIONS',
    bullets: ['REAL-TIME INVENTORY', 'EMERGENCY BROADCAST', '7-DAY FORECAST'],
    footerActions: ['DISPATCH', 'DONOR MAP', 'AUDIT'],
    accentColor: '#dc2626'
  },
  'campus-wallet': {
    theme: 'light',
    badge: '08 | PAYMENTS · CAMPUS · FINTECH',
    bullets: ['NFC / QR PAY', 'DOUBLE-ENTRY LEDGER', 'ZERO LATENCY'],
    footerActions: ['BALANCE', 'TRANSACTIONS', 'WALLET'],
    accentColor: '#0ea5e9'
  },
  'dsa-core-library': {
    theme: 'dark',
    badge: '09 | ALGORITHMS · DATA STRUCTURES',
    bullets: ['C++ / JAVA / PYTHON', 'VALGRIND BENCHED', '100% UNIT TESTED'],
    footerActions: ['LEARN', 'BENCHMARK', 'VISUALIZE'],
    accentColor: '#f59e0b'
  },
  'browser-interactive-games': {
    theme: 'light',
    badge: '10 | GAMES · AI · INTERACTIVE',
    bullets: ['MINIMAX AI', 'PURE CANVAS', '60 FPS PHYSICS'],
    footerActions: ['PLAY NOW', 'CODE', 'HIGHSCORES'],
    accentColor: '#ea580c'
  }
};

// Bespoke Graphic Centerpiece for each card matching the video
const PhoneGraphicCenterpiece: React.FC<{ projectId: string; theme: 'dark' | 'light' }> = ({
  projectId,
  theme
}) => {
  switch (projectId) {
    case 'argus-fraud-detection':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 to-black border border-white/10 flex items-center justify-center p-3">
          {/* Orbital glowing ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full border border-orange-500/25 animate-[spin_24s_linear_infinite]" />
            <div className="w-36 h-36 rounded-full border border-orange-500/15" />
            <div className="w-56 h-28 rounded-[100%] border border-orange-500/30 -rotate-12" />
          </div>

          {/* Luminous Credit Card */}
          <div className="relative z-10 w-48 h-28 rounded-xl bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 border border-orange-500/30 p-2.5 shadow-2xl flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between">
              <div className="w-6 h-5 rounded bg-amber-400/90 flex items-center justify-center text-[7px] font-bold text-black font-mono-code">
                EMV
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                <span className="text-[8px] font-mono-code text-orange-400 font-bold">A.R.G.U.S.</span>
              </div>
            </div>
            <div className="font-mono-code text-[9px] text-zinc-300 tracking-wider">
              •••• •••• •••• 8820
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono-code text-zinc-400">
              <span>SAVAR SHETTY</span>
              <span>10/28</span>
            </div>
          </div>

          {/* Telemetry pill overlay */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[8px] font-mono-code text-orange-300/90 bg-black/70 backdrop-blur px-2 py-0.5 rounded-full border border-orange-500/20">
            <span>POS: ESP32 READY</span>
            <span>LATENCY: &lt;45MS</span>
          </div>
        </div>
      );

    case 'mma-multimodel-assistant':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-200 border border-zinc-300 flex items-center justify-center p-3">
          {/* Cyber humanoid silhouette with glowing amber headphone */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-24 h-28 rounded-full border-2 border-zinc-400/60 bg-gradient-to-b from-zinc-200 to-zinc-300 flex items-center justify-center shadow-inner">
              {/* Headset arc */}
              <div className="absolute -top-1 w-26 h-12 border-t-4 border-zinc-800 rounded-t-full" />
              {/* Over-ear headphone glowing cup */}
              <div className="absolute -left-2 w-5 h-10 rounded-full bg-zinc-900 border border-orange-500 flex items-center justify-center">
                <div className="w-2.5 h-6 rounded-full bg-orange-500 animate-pulse" />
              </div>
              {/* Face feature nodes */}
              <div className="w-16 h-18 rounded-2xl bg-zinc-100/90 flex flex-col items-center justify-center p-1.5 gap-1 shadow-sm">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                <div className="w-8 h-1 bg-orange-500 rounded-full" />
                <div className="flex gap-1 text-[7px] font-mono-code text-zinc-600 font-bold mt-1">
                  <span className="px-1 rounded bg-zinc-200">[V]</span>
                  <span className="px-1 rounded bg-zinc-200">[A]</span>
                  <span className="px-1 rounded bg-zinc-200">[T]</span>
                </div>
              </div>
            </div>
          </div>
          {/* Audio waves */}
          <div className="absolute right-3 top-3 bottom-3 flex flex-col justify-center gap-1">
            {[40, 70, 100, 60, 30].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-orange-500 rounded-full"
                style={{ height: `${h * 0.22}px` }}
              />
            ))}
          </div>
        </div>
      );

    case 'valid-audio-forensics':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black border border-red-500/30 flex items-center justify-center p-3">
          {/* Spectrogram frequency bars */}
          <div className="w-full flex items-end justify-center gap-1.5 h-28 px-4">
            {[24, 48, 86, 100, 75, 45, 90, 60, 35, 78, 95, 55, 30, 80, 40].map((val, idx) => (
              <div
                key={idx}
                className="w-2 rounded-t transition-all duration-300"
                style={{
                  height: `${val}%`,
                  background:
                    idx % 2 === 0
                      ? 'linear-gradient(to top, #7f1d1d, #ef4444)'
                      : 'linear-gradient(to top, #9a3412, #f97316)'
                }}
              />
            ))}
          </div>
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-[8px] font-mono-code text-red-300">
            REAL VOICE: 98.4%
          </div>
          <div className="absolute bottom-2 right-3 text-[8px] font-mono-code text-orange-400">
            SPECTRAL RES: 48kHz
          </div>
        </div>
      );

    case 'stock-trading-bot':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center p-3">
          {/* Laptop Mockup display */}
          <div className="w-full h-28 rounded-lg bg-black border border-zinc-800 p-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[8px] font-mono-code">
              <span className="text-emerald-400 font-bold">+24.8% PnL</span>
              <span className="text-zinc-400">SHARPE 1.82</span>
            </div>
            {/* Candlesticks & trendline */}
            <div className="flex items-end justify-between h-14 px-1 gap-1">
              {[
                { h: 30, c: '#ef4444' },
                { h: 45, c: '#10b981' },
                { h: 38, c: '#10b981' },
                { h: 60, c: '#10b981' },
                { h: 50, c: '#ef4444' },
                { h: 75, c: '#10b981' },
                { h: 70, c: '#ef4444' },
                { h: 90, c: '#10b981' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="w-[1px] h-2 bg-zinc-600" />
                  <div
                    className="w-full rounded-sm"
                    style={{ height: `${item.h * 0.4}px`, backgroundColor: item.c }}
                  />
                  <div className="w-[1px] h-2 bg-zinc-600" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="flex-1 text-center py-0.5 rounded bg-emerald-600 text-white font-mono-code text-[7px] font-bold">
                BUY
              </span>
              <span className="flex-1 text-center py-0.5 rounded bg-red-600 text-white font-mono-code text-[7px] font-bold">
                SELL
              </span>
            </div>
          </div>
        </div>
      );

    case 'meshroute-ops':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-950 border border-rose-500/30 flex items-center justify-center p-2">
          {/* 3D Topographic Terrain with Red Mesh Nodes */}
          <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
            <div className="flex justify-between items-center text-[8px] font-mono-code text-rose-300">
              <span>DISPATCH CONSOLE</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            {/* Mountain terrain wireframe */}
            <svg viewBox="0 0 200 80" className="w-full h-20 text-rose-500 stroke-current fill-none">
              <path
                d="M 10 70 L 40 45 L 70 55 L 100 25 L 130 50 L 160 35 L 190 70"
                strokeWidth="2"
              />
              <path
                d="M 25 70 L 60 50 L 90 60 L 120 38 L 150 55 L 180 70"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              <circle cx="100" cy="25" r="4" fill="#f43f5e" />
              <circle cx="40" cy="45" r="3" fill="#f43f5e" />
              <circle cx="160" cy="35" r="3" fill="#f43f5e" />
            </svg>
            <div className="flex justify-between text-[7px] font-mono-code text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/20">
              <span>SECTOR 7-B ACTIVE</span>
              <span>GPS SYNC 100%</span>
            </div>
          </div>
        </div>
      );

    case 'hostelease':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-300 flex items-center justify-center p-3">
          {/* Angled Phone Screen showing HostelEase */}
          <div className="w-36 h-36 rounded-2xl bg-zinc-950 border-2 border-zinc-700 shadow-xl p-2 flex flex-col justify-between text-white transform rotate-3 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between text-[7px] font-mono-code">
              <span className="text-orange-400 font-bold">HostelEase</span>
              <span className="text-zinc-400">SYMBIOSIS</span>
            </div>
            <div className="bg-zinc-900 rounded-lg p-1.5 border border-zinc-800 text-center">
              <span className="text-[7px] font-mono-code text-emerald-400 block font-bold">
                ✓ GATE PASS APPROVED
              </span>
              <span className="text-[6px] font-mono-code text-zinc-400">ROOM #304 · RE: WARDEN</span>
            </div>
            <div className="w-full py-1 rounded bg-orange-600 text-center text-[7px] font-bold font-mono-code">
              SHOW QR CODE
            </div>
          </div>
        </div>
      );

    case 'blood-donation-dashboard':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-950 border border-red-500/30 flex items-center justify-between p-4">
          {/* 3D IV Blood Bag */}
          <div className="relative w-20 h-32 rounded-b-2xl rounded-t-lg bg-gradient-to-b from-red-950 via-red-800 to-red-600 border border-red-500/40 shadow-lg flex flex-col justify-between p-1.5">
            <div className="w-6 h-2 rounded bg-zinc-300 mx-auto -mt-3 border border-zinc-500" />
            <div className="text-center font-mono-code text-[7px] text-white/90 font-bold">
              BLOOD IV
            </div>
            {/* Level line */}
            <div className="w-full border-t border-red-300/40 text-[6px] text-red-200 text-center font-mono-code">
              450 mL
            </div>
            <div className="w-1.5 h-6 rounded-b bg-red-400 mx-auto -mb-4 shadow" />
          </div>

          {/* Blood group inventory bars */}
          <div className="flex flex-col gap-1.5 flex-1 pl-4">
            {[
              { type: 'A+', pct: '94%', color: '#10b981' },
              { type: 'B+', pct: '82%', color: '#10b981' },
              { type: 'O+', pct: '41%', color: '#f59e0b' },
              { type: 'AB-', pct: '18%', color: '#ef4444' }
            ].map((grp) => (
              <div key={grp.type} className="flex items-center gap-2 text-[8px] font-mono-code">
                <span className="w-6 text-white font-bold">{grp.type}</span>
                <div className="flex-1 h-2 rounded bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{ width: grp.pct, backgroundColor: grp.color }}
                  />
                </div>
                <span className="w-6 text-right text-zinc-400">{grp.pct}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'campus-wallet':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-300 flex items-center justify-center p-3">
          {/* Black NFC Campus Card */}
          <div className="w-48 h-28 rounded-xl bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 text-white border border-zinc-700 shadow-2xl p-2.5 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono-code font-bold tracking-wider text-sky-400">
                CAMPUS WALLET
              </span>
              <Radio className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div>
              <div className="text-[8px] font-mono-code text-zinc-400">AVAILABLE BALANCE</div>
              <div className="text-base font-bricolage font-bold text-white">₹1,250.00</div>
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono-code text-zinc-400">
              <span>SAVAR SHETTY</span>
              <span>NFC TAP READY</span>
            </div>
          </div>
        </div>
      );

    case 'dsa-core-library':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-950 border border-amber-500/30 flex items-center justify-center p-3">
          {/* 3D Isometric Glowing Cubes for Data Structures */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
            {[
              { title: 'GRAPHS', bg: 'from-amber-600/40 to-orange-950/60' },
              { title: 'TREES', bg: 'from-orange-600/40 to-amber-950/60' },
              { title: 'SORTING', bg: 'from-yellow-600/40 to-zinc-950/60' },
              { title: 'DP', bg: 'from-red-600/40 to-orange-950/60' }
            ].map((block, i) => (
              <div
                key={i}
                className={`h-14 rounded-lg bg-gradient-to-br ${block.bg} border border-amber-500/30 flex flex-col items-center justify-center p-1 text-center shadow-md transform hover:scale-105 transition-transform`}
              >
                <span className="text-[8px] font-mono-code font-bold text-amber-200">
                  {block.title}
                </span>
                <span className="text-[6px] font-mono-code text-zinc-400">O(N log N)</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'browser-interactive-games':
      return (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-300 flex items-center justify-between p-3 gap-2">
          {/* Isometric Stack Tower */}
          <div className="flex-1 flex flex-col items-center justify-end h-28">
            <div className="w-16 h-3 rounded bg-orange-500 mb-1 shadow" />
            <div className="w-14 h-3 rounded bg-amber-500 mb-1 shadow" />
            <div className="w-12 h-3 rounded bg-red-500 mb-1 shadow" />
            <div className="w-10 h-3 rounded bg-purple-500 mb-1 shadow" />
            <span className="text-[8px] font-mono-code text-zinc-700 font-bold">SCORE: 128</span>
          </div>

          {/* Tic Tac Toe Grid */}
          <div className="w-24 h-24 rounded-lg bg-zinc-900 border border-zinc-700 grid grid-cols-3 gap-0.5 p-1">
            {['X', 'O', '', 'O', 'X', '', '', '', 'X'].map((val, idx) => (
              <div
                key={idx}
                className="rounded bg-zinc-800 flex items-center justify-center font-mono-code text-[9px] font-bold text-orange-400"
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'3d-carousel' | 'grid'>('3d-carousel');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['All', 'AI / ML', 'Hackathons', 'Full-Stack', 'Systems & Games'];

  // Filter projects if needed
  const displayProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => {
      if (selectedCategory === 'AI / ML') return p.category.includes('AI') || p.category.includes('ML');
      if (selectedCategory === 'Hackathons')
        return (
          p.title.includes('Hackathon') ||
          p.caseStudy.timeline.includes('Hackathon') ||
          p.category.includes('Hackathon')
        );
      if (selectedCategory === 'Full-Stack')
        return p.category.includes('Full-Stack') || p.tags.includes('React');
      if (selectedCategory === 'Systems & Games')
        return (
          p.category.includes('Algorithms') ||
          p.category.includes('Interactive') ||
          p.tags.includes('ESP32')
        );
      return true;
    });
  }, [selectedCategory]);

  const totalCards = displayProjects.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 4200);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, totalCards]);

  // Touch and drag gesture handling
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevCard();
      else nextCard();
    }
  };

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-transparent text-white overflow-hidden">
      {/* Ambient background glows with Indigo & Ivory tones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#3636B8]/20 rounded-full blur-[140px] pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[500px] bg-[#5B5BFF]/10 rounded-full blur-[140px] pointer-events-none opacity-20 mix-blend-screen" />

      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="max-w-3xl relative">
            <div className="flex items-center gap-3 mb-3 text-white">
              <span className="w-2 h-2 rounded-full bg-[#7C7CFF] animate-pulse" />
              <TextContrastZone
                as="span"
                className="text-xs font-mono-code uppercase tracking-[0.2em] text-[#F2F0E6] py-1 px-3 -ml-2"
              >
                Engineering Work // 10 Production Systems
              </TextContrastZone>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bricolage font-medium tracking-tighter text-white leading-tight">
              Project <span className="text-white font-light">Showcase</span>
            </h2>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-full bg-neutral-900/80 p-1 border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setViewMode('3d-carousel')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  viewMode === '3d-carousel'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                3D Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Grid View
              </button>
            </div>

            {/* Carousel navigation buttons */}
            {viewMode === '3d-carousel' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  title={isAutoPlaying ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
                  className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-colors ${
                    isAutoPlaying
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-400/40'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={prevCard}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextCard}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D PHONE COVERFLOW CAROUSEL VIEW */}
        {viewMode === '3d-carousel' ? (
          <div
            className="relative w-full py-12 select-none overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: '1400px' }}
          >
            {/* Carousel Container */}
            <div className="relative w-full h-[660px] flex items-center justify-center">
              {displayProjects.map((project, idx) => {
                const config = VISUAL_CONFIGS[project.id] || {
                  theme: 'dark',
                  badge: `${idx + 1 < 10 ? `0${idx + 1}` : idx + 1} | SYSTEM`,
                  bullets: project.tags.slice(0, 3),
                  footerActions: ['LEARN', 'SPECS', 'CODE'],
                  accentColor: '#f97316'
                };

                // Distance calculation
                let offset = idx - activeIndex;
                if (offset > totalCards / 2) offset -= totalCards;
                if (offset < -totalCards / 2) offset += totalCards;

                const isCurrent = offset === 0;
                const isNearby = Math.abs(offset) <= 2;

                if (!isNearby) return null;

                // 3D Matrix Transforms
                const xTranslate = offset * 280;
                const zTranslate = -Math.abs(offset) * 110;
                const yRotation = -offset * 26;
                const scale = isCurrent ? 1 : 0.88 - Math.abs(offset) * 0.08;
                const opacity = isCurrent ? 1 : 0.7 - Math.abs(offset) * 0.25;
                const zIndex = 30 - Math.abs(offset) * 10;

                const isDark = config.theme === 'dark';

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (!isCurrent) {
                        setActiveIndex(idx);
                      } else {
                        onSelectProject(project);
                      }
                    }}
                    style={{
                      transform: `translateX(${xTranslate}px) translateZ(${zTranslate}px) rotateY(${yRotation}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 500ms ease'
                    }}
                    className={`absolute w-[300px] sm:w-[340px] md:w-[360px] h-[620px] rounded-[42px] p-6 flex flex-col justify-between shadow-2xl cursor-pointer transition-shadow duration-300 ${
                      isDark
                        ? 'bg-[#111111] text-[#F2F0E6] border border-[#F2F0E6]/15 ring-1 ring-[#F2F0E6]/10'
                        : 'bg-[#F2F0E6] text-[#111111] border border-[#111111]/20 ring-1 ring-[#111111]/10'
                    } ${isCurrent ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-2 ring-[#F2F0E6]/30' : ''}`}
                  >
                    {/* Top Phone Camera Notch Slit */}
                    <div
                      className={`w-16 h-3.5 rounded-full mx-auto -mt-1.5 mb-2 ${
                        isDark ? 'bg-black/90 border border-[#F2F0E6]/10' : 'bg-[#111111]'
                      }`}
                    />

                    {/* Phone Header Status Bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono-code">
                      <span
                        className={`font-semibold tracking-wider ${
                          isDark ? 'text-[#A6A6A0]' : 'text-[#555550]'
                        }`}
                      >
                        {config.badge}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: config.accentColor }}
                      />
                    </div>

                    {/* Project Title & Tagline */}
                    <div className="mt-2">
                      <h3
                        className={`text-2xl sm:text-3xl font-bricolage font-bold tracking-tight mb-1 ${
                          isDark ? 'text-[#F2F0E6]' : 'text-[#111111]'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-[10px] font-mono-code uppercase tracking-wider font-semibold mb-2"
                        style={{ color: config.accentColor }}
                      >
                        {project.tagline}
                      </p>
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isDark ? 'text-[#A6A6A0]' : 'text-[#555550]'
                        }`}
                      >
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* High-Tech Feature Bullets */}
                    <div className="space-y-1.5 my-2">
                      {config.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-center gap-1.5 text-[10px] font-mono-code"
                        >
                          <span
                            className="font-bold font-mono"
                            style={{ color: config.accentColor }}
                          >
                            [+]
                          </span>
                          <span
                            className={`tracking-wider ${
                              isDark ? 'text-[#F2F0E6]' : 'text-[#111111]'
                            }`}
                          >
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bespoke Visual Artwork Centerpiece */}
                    <div className="my-2">
                      <PhoneGraphicCenterpiece projectId={project.id} theme={config.theme} />
                    </div>

                    {/* Bottom Segmented Action Bar */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between text-[10px] font-mono-code ${
                        isDark ? 'border-white/10 text-zinc-400' : 'border-zinc-300 text-zinc-600'
                      }`}
                    >
                      <span className="truncate pr-2">{config.footerActions.join(' · ')}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={`View ${project.title} code`}
                            className={`p-1.5 rounded-full border transition-colors ${
                              isDark
                                ? 'bg-white/5 border-white/15 text-white hover:bg-white hover:text-black'
                                : 'bg-black/5 border-black/15 text-black hover:bg-black hover:text-white'
                            }`}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="px-2.5 py-1 rounded-full bg-orange-600 text-white font-mono-code text-[10px] font-semibold hover:bg-orange-500 transition-colors flex items-center gap-1 shadow"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination / Index Indicator Strip */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {displayProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code transition-all ${
                    idx === activeIndex
                      ? 'bg-white text-black font-bold scale-110 shadow-lg'
                      : 'bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* GRID MATRIX VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {displayProjects.map((project, idx) => {
              const config = VISUAL_CONFIGS[project.id] || {
                theme: 'dark',
                badge: `${idx + 1 < 10 ? `0${idx + 1}` : idx + 1} | SYSTEM`,
                bullets: project.tags.slice(0, 3),
                footerActions: ['LEARN', 'SPECS', 'CODE'],
                accentColor: '#f97316'
              };
              const isDark = config.theme === 'dark';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group relative rounded-[32px] p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#111111] text-[#F2F0E6] border border-[#F2F0E6]/15 hover:border-[#F2F0E6]/30'
                      : 'bg-[#F2F0E6] text-[#111111] border border-[#111111]/20 hover:border-[#111111]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono-code mb-2">
                      <span className="font-semibold text-[#A6A6A0]">{config.badge}</span>
                      <span className="text-xs font-bold" style={{ color: config.accentColor }}>
                        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-bricolage font-bold tracking-tight mb-1 ${
                        isDark ? 'text-[#F2F0E6]' : 'text-[#111111]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-xs font-mono-code uppercase tracking-wider font-semibold mb-3"
                      style={{ color: config.accentColor }}
                    >
                      {project.tagline}
                    </p>
                    <p
                      className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                        isDark ? 'text-[#A6A6A0]' : 'text-[#555550]'
                      }`}
                    >
                      {project.shortDescription}
                    </p>

                    <div className="mb-4">
                      <PhoneGraphicCenterpiece projectId={project.id} theme={config.theme} />
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between text-xs font-mono-code ${
                      isDark ? 'border-white/10 text-zinc-400' : 'border-zinc-300 text-zinc-600'
                    }`}
                  >
                    <span className="text-[10px]">{config.footerActions.join(' · ')}</span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`p-1.5 rounded-full border ${
                            isDark
                              ? 'bg-white/5 border-white/15 text-white hover:bg-white hover:text-black'
                              : 'bg-black/5 border-black/15 text-black hover:bg-black hover:text-white'
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional Coursework & Learning Grid */}
        <div className="pt-12 border-t border-white/10 mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#7C7CFF]">
                RELEVANT LEARNING
              </span>
              <h3 className="text-2xl font-bricolage font-medium text-white mt-0.5">
                Coursework and Workshops
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/savar-shetty-usebonded/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-[#70b5f9] hover:underline flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Certifications</span>
              </a>
              <a
                href="https://github.com/Usebonded"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-white hover:text-white flex items-center gap-1.5 hidden sm:flex"
              >
                <Github className="w-4 h-4" />
                <span>@Usebonded</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_PROJECTS.map((extra, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-neutral-900/80 hover:bg-neutral-900/95 backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-white mb-2 font-mono-code">
                    <span className="text-indigo-400 font-semibold">{extra.role}</span>
                    <FolderGit2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 font-bricolage">
                    {extra.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{extra.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
                  <span className="truncate pr-2">{extra.tech}</span>
                  {extra.linkedinUrl && (
                    <a
                      href={extra.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Certification on LinkedIn"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#70b5f9] border border-[#0077b5]/40 text-[10px] font-mono-code transition-colors shrink-0"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

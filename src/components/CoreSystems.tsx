import React from 'react';
import { Cpu, Shield, Users } from 'lucide-react';
import { TextContrastZone } from './TextContrastZone';

function useFadeInOnScroll(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible] as const;
}

export const CoreSystems: React.FC = () => {
  const [headerRef, headerVisible] = useFadeInOnScroll(0.1);
  const [card1Ref, card1Visible] = useFadeInOnScroll(0.08, '0px 0px -30px 0px');
  const [card2Ref, card2Visible] = useFadeInOnScroll(0.08, '0px 0px -30px 0px');
  const [card3Ref, card3Visible] = useFadeInOnScroll(0.08, '0px 0px -30px 0px');

  return (
    <section id="systems" className="py-28 md:py-36 bg-transparent relative overflow-hidden border-t border-white/5 text-white">
      <div id="skills" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[1px] bg-[#A6A6A0]/70" />
              <TextContrastZone
                as="span"
                className="text-xs font-mono-code uppercase tracking-widest text-[#F2F0E6] py-1 px-3 -ml-2"
              >
                Skills and Vision
              </TextContrastZone>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage text-white tracking-tighter leading-none font-medium">
              Skills &amp; Vision
            </h2>
            <div className="mt-4">
              <TextContrastZone
                as="p"
                className="text-sm sm:text-base text-[#F2F0E6] font-light leading-relaxed max-w-xl py-2 pl-3 pr-8 -ml-3"
              >
                Applied machine learning competencies, full-stack engineering toolkits, and long-term architectural vision for autonomous agentic systems.
              </TextContrastZone>
            </div>
          </div>
        </div>

        {/* 3-Column Futuristic Systems Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Core Focus */}
          <div
            ref={card1Ref}
            className={`group relative min-h-[500px] h-full bg-neutral-900/80 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-neutral-900/95 transition-all duration-700 ease-out transform ${
              card1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } hover:border-white/25 backdrop-blur-xl shadow-2xl flex flex-col justify-between`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top Icon */}
            <div className="relative z-10 w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A6A6A0] group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
              <Cpu className="w-6 h-6" />
            </div>

            {/* Futuristic Optical Radar Visualization (Velos Core System Card 1) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="relative w-[280px] h-[280px] group-hover:scale-110 transition-transform duration-1000">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-white/15 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute w-56 h-56 rounded-full border border-white/10 border-t-white/40 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse top-1/2 -translate-y-1/2 rotate-45" />
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse top-1/2 -translate-y-1/2 -rotate-45" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-2.5 bg-[#A6A6A0] rounded-full shadow-[0_0_15px_rgba(166,166,160,0.8)] animate-ping" />
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 mt-auto pt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A6A6A0] shadow-[0_0_10px_rgba(166,166,160,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#A6A6A0]">
                  R&amp;D Specialization
                </span>
              </div>
              <h3 className="text-2xl font-bricolage font-medium text-white mb-1.5 tracking-tight group-hover:text-[#A6A6A0]">
                Core Focus
              </h3>
              <p className="text-xs text-white leading-relaxed mb-3 transition-colors">
                Areas where I spend most of my time and energy researching and developing intelligent solutions.
              </p>
              <ol className="space-y-1 text-[11px] font-mono-code text-white">
                <li className="flex items-center gap-2">
                  <span className="text-[#A6A6A0] font-bold">1.</span>
                  <span>Machine Learning &amp; Deep Learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A6A6A0] font-bold">2.</span>
                  <span>Generative AI &amp; LLMs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A6A6A0] font-bold">3.</span>
                  <span>Autonomous Agentic Systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A6A6A0] font-bold">4.</span>
                  <span>Data Analytics &amp; Statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A6A6A0] font-bold">5.</span>
                  <span>Computer Vision Pipelines</span>
                </li>
              </ol>
              <div className="w-full bg-white/5 h-[2px] mt-4 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-[#A6A6A0] w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>

          {/* Card 2: Anomaly & Risk Detector (A.R.G.U.S.) */}
          <div
            ref={card2Ref}
            style={{ transitionDelay: '100ms' }}
            className={`group relative min-h-[500px] h-full bg-neutral-900/80 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-neutral-900/95 transition-all duration-700 ease-out transform ${
              card2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } hover:border-white/25 backdrop-blur-xl shadow-2xl flex flex-col justify-between`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
              <Shield className="w-6 h-6" />
            </div>

            {/* Hexagon Shield Grid (Velos Core System Card 2) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="relative w-[260px] h-[260px] group-hover:scale-105 transition-transform duration-1000">
                <svg className="absolute inset-0 w-full h-full text-blue-500 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 Z" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" className="opacity-40" />
                  <path d="M50 15 L80.3 32.5 V67.5 L50 85 L19.7 67.5 V32.5 Z" stroke="currentColor" strokeWidth="0.4" className="opacity-60" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 border-[0.5px] border-blue-400/30 rotate-45 animate-[spin_8s_linear_infinite]" />
                  <div className="absolute w-28 h-28 border-[0.5px] border-blue-400/30 -rotate-45 animate-[spin_8s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 mt-auto pt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgb(59,130,246)] animate-pulse" />
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-blue-400">
                  Engineering Stack
                </span>
              </div>
              <h3 className="text-2xl font-bricolage font-medium text-white mb-1.5 tracking-tight group-hover:text-blue-50">
                Tech &amp; Tools
              </h3>
              <p className="text-xs text-white leading-relaxed mb-3 transition-colors">
                My technical toolkit allows me to rapidly prototype and deploy complex computational workflows.
              </p>
              <ol className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-mono-code text-white">
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">1.</span>
                  <span className="truncate">Python &amp; C / C++</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">2.</span>
                  <span className="truncate">n8n Automation</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">3.</span>
                  <span className="truncate">PyTorch</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">4.</span>
                  <span className="truncate">TensorFlow</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">5.</span>
                  <span className="truncate">Data Structures</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">6.</span>
                  <span className="truncate">FastAPI</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">7.</span>
                  <span className="truncate">TypeScript</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">8.</span>
                  <span className="truncate">React</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">9.</span>
                  <span className="truncate">Git &amp; GitHub</span>
                </li>
                <li className="flex items-center gap-1.5 truncate">
                  <span className="text-blue-400 font-bold shrink-0">10.</span>
                  <span className="truncate">SQL</span>
                </li>
              </ol>
              <div className="w-full bg-white/5 h-[2px] mt-4 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-blue-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>

          {/* Card 3: Soft Skills & Leadership */}
          <div
            ref={card3Ref}
            style={{ transitionDelay: '200ms' }}
            className={`group relative min-h-[500px] h-full bg-neutral-900/80 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-neutral-900/95 transition-all duration-700 ease-out transform ${
              card3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } hover:border-white/25 backdrop-blur-xl shadow-2xl flex flex-col justify-between`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all duration-500">
              <Users className="w-6 h-6" />
            </div>

            {/* Orbital Rings Atom Visualization (Velos Core System Card 3) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="relative w-[280px] h-[280px] group-hover:scale-110 transition-transform duration-1000">
                <svg className="absolute inset-0 w-full h-full text-purple-500 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <ellipse cx="50" cy="50" rx="44" ry="14" stroke="currentColor" strokeWidth="0.3" className="opacity-50" />
                  <ellipse cx="50" cy="50" rx="44" ry="14" stroke="currentColor" strokeWidth="0.3" className="opacity-50" transform="rotate(60 50 50)" />
                  <ellipse cx="50" cy="50" rx="44" ry="14" stroke="currentColor" strokeWidth="0.3" className="opacity-50" transform="rotate(120 50 50)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 blur-md animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_rgb(168,85,247)]" />
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 mt-auto pt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgb(168,85,247)] animate-pulse" />
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-purple-400">
                  Collaboration &amp; Execution
                </span>
              </div>
              <h3 className="text-2xl font-bricolage font-medium text-white mb-1.5 tracking-tight group-hover:text-purple-50">
                Soft Skills &amp; Leadership
              </h3>
              <p className="text-xs text-white leading-relaxed mb-3 transition-colors">
                Clear communication and continuous adaptability make technical work impactful.
              </p>
              <ul className="space-y-1.5 text-[11px] font-mono-code text-white">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>Hackathon Sprint Leadership</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>Cross-Discipline Teaming</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>Rapid MVP Prototyping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>Continuous Self-Direction</span>
                </li>
              </ul>
              <div className="w-full bg-white/5 h-[2px] mt-4 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-purple-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

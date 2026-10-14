import React from 'react';
import { Download, GraduationCap, Trophy, Brain, Briefcase, Shield, Award } from 'lucide-react';
import { TextContrastZone } from './TextContrastZone';

interface AboutExperienceProps {
  onOpenResume: () => void;
}

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

interface MilestoneItem {
  step: string;
  date: string;
  yearBadge: string;
  watermark: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  alignment: 'left' | 'right';
}

const TimelineMilestoneItem: React.FC<{
  item: MilestoneItem;
  index: number;
}> = ({ item, index }) => {
  const [itemRef, isVisible] = useFadeInOnScroll(0.12, '0px 0px -40px 0px');
  const Icon = item.icon;
  const isLeft = item.alignment === 'left';

  return (
    <div
      ref={itemRef}
      style={{
        transitionDelay: `${(index % 2) * 80}ms`
      }}
      className={`flex flex-col md:flex-row items-center justify-between group transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Left Column Content (when isLeft) OR Watermark (when right) */}
      <div
        className={`w-full md:w-5/12 text-center ${
          isLeft ? 'md:text-right pr-0 md:pr-12 order-2 md:order-1' : 'md:text-right pr-0 md:pr-12 order-2 md:order-1 relative'
        }`}
      >
        {isLeft ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono-code bg-white/5 border border-white/10 text-[#A6A6A0] uppercase tracking-wider mb-2">
              <Icon className="w-3 h-3 text-emerald-400" />
              <span>{item.date} · {item.category}</span>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-bricolage font-medium">
              {item.title}
            </h3>
            <p className="text-white mt-2 font-light text-xs sm:text-sm leading-relaxed">
              {item.description}
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-end gap-1.5 text-[11px] font-mono-code text-white">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <span className="text-7xl md:text-9xl font-bricolage text-white/[0.05] font-bold select-none pointer-events-none">
            {item.watermark}
          </span>
        )}
      </div>

      {/* Central Node Badge */}
      <div className="w-12 h-12 rounded-full bg-neutral-900/90 border border-white/20 backdrop-blur-xl shadow-2xl z-10 flex items-center justify-center text-white order-1 md:order-2 mb-6 md:mb-0 relative group-hover:scale-110 group-hover:border-white/40 transition-all">
        <span className="font-mono-code text-xs font-bold text-white">
          {item.yearBadge}
        </span>
      </div>

      {/* Right Column Content (when !isLeft) OR Watermark (when isLeft) */}
      <div
        className={`w-full md:w-5/12 text-center ${
          !isLeft ? 'md:text-left pl-0 md:pl-12 order-3' : 'md:text-left pl-0 md:pl-12 order-3 relative'
        }`}
      >
        {!isLeft ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono-code bg-white/5 border border-white/10 text-white uppercase tracking-wider mb-2">
              <Icon className="w-3 h-3 text-emerald-400" />
              <span>{item.date} · {item.category}</span>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-bricolage font-medium">
              {item.title}
            </h3>
            <p className="text-white mt-2 font-light text-xs sm:text-sm leading-relaxed">
              {item.description}
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-1.5 text-[11px] font-mono-code text-white">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <span className="text-7xl md:text-9xl font-bricolage text-white/[0.05] font-bold select-none pointer-events-none">
            {item.watermark}
          </span>
        )}
      </div>
    </div>
  );
};

export const AboutExperience: React.FC<AboutExperienceProps> = ({ onOpenResume }) => {
  const [headerRef, headerVisible] = useFadeInOnScroll(0.1);
  const [cardRef, cardVisible] = useFadeInOnScroll(0.08, '0px 0px -40px 0px');

  const timelineMilestones = [
    {
      step: '01',
      date: 'June 2025',
      yearBadge: '25',
      watermark: '2025',
      category: 'Academic Inception · College Start',
      title: 'Started College — Symbiosis University',
      description:
        'Commenced B.Tech in Artificial Intelligence & Machine Learning at Symbiosis Skills and Professional University, Pune. Initiated deep study into neural architectures, discrete mathematics, and applied systems engineering.',
      tags: ['SSPU Pune', 'B.Tech AI & ML', 'Neural Foundations', 'Algorithms'],
      icon: GraduationCap,
      alignment: 'left' as const
    },
    {
      step: '02',
      date: 'August 2025',
      yearBadge: '25',
      watermark: '2025',
      category: 'National Hackathon · Smart India Hackathon',
      title: 'Smart India Hackathon 2025 — MeshRoute Ops',
      description:
        'Competed in Smart India Hackathon 2025 with MeshRoute Ops: an AI-driven emergency dispatch and disaster logistics system that combines computer vision aerial mapping with dynamic graph shortest-path routing for first responders.',
      tags: ['Smart India Hackathon 2025', 'MeshRoute Ops', 'Computer Vision', 'Routing Algorithms'],
      icon: Trophy,
      alignment: 'right' as const
    },
    {
      step: '03',
      date: 'January 2026',
      yearBadge: '26',
      watermark: '2026',
      category: 'Competitive AI Hackathon · Google Synapse',
      title: 'Synapse Hackathon 2026 — RL Stock Trading Bot',
      description:
        'Engineered an automated algorithmic trading agent powered by Reinforcement Learning at Synapse Hackathon 2026. Modeled market dynamics as a Markov Decision Process with Gymnasium and policy optimization for risk-managed execution.',
      tags: ['Synapse Hackathon 2026', 'Reinforcement Learning', 'Gymnasium', 'Deep Q-Networks', 'Python'],
      icon: Brain,
      alignment: 'left' as const
    },
    {
      step: '04',
      date: 'June 2026',
      yearBadge: '26',
      watermark: '2026',
      category: 'Software Engineering Internship',
      title: 'Internship — Blood Donation Dashboard',
      description:
        'Selected for a software engineering internship developing the Blood Donation Operations Dashboard: an enterprise healthcare application tracking donor blood types, critical hospital inventory thresholds, and emergency dispatch alerts.',
      tags: ['Software Internship', 'Blood Donation Dashboard', 'React', 'Node.js', 'REST APIs', 'HealthTech'],
      icon: Briefcase,
      alignment: 'right' as const
    },
    {
      step: '05',
      date: 'August 2026',
      yearBadge: '26',
      watermark: '2026',
      category: 'National Hackathon · Smart India Hackathon',
      title: 'Smart India Hackathon 2026 — V.A.L.I.D.',
      description:
        'Spearheaded team development for V.A.L.I.D. (Voice Authentication & Linguistic Integrity Defense) at Smart India Hackathon 2026: real-time synthetic voice forensics and deepfake audio fraud prevention for banking security.',
      tags: ['Smart India Hackathon 2026', 'V.A.L.I.D.', 'Synthetic Voice Forensics', 'Acoustic Defense'],
      icon: Shield,
      alignment: 'left' as const
    },
    {
      step: '06',
      date: 'Expected 2029',
      yearBadge: '29',
      watermark: '2029',
      category: 'Academic Milestone · Degree Completion',
      title: 'College Graduation — B.Tech AI & ML',
      description:
        'Scheduled completion of 4-year B.Tech degree in Artificial Intelligence & Machine Learning at Symbiosis Skills and Professional University, graduating with specialized expertise in autonomous agents, edge systems, and full-stack software.',
      tags: ['2029 Graduate', 'Degree Completion', 'Autonomous Systems', 'Applied AI Engineering'],
      icon: Award,
      alignment: 'right' as const
    }
  ];

  return (
    <section id="timeline" className="py-28 md:py-36 bg-transparent relative overflow-hidden border-t border-white/5 text-white">
      <div id="about" className="absolute -top-24 pointer-events-none" />
      <div id="experience" className="absolute -top-24 pointer-events-none" />
      {/* Background Radial Dots (Velos Timeline) */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-mono-code text-xs uppercase tracking-widest">
              My Journey · 2025 — 2029
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bricolage text-white font-semibold tracking-tight">
            My Journey
          </h2>
          <div className="flex justify-center mt-4">
            <TextContrastZone
              as="p"
              align="center"
              className="text-sm sm:text-base text-[#F2F0E6] max-w-2xl mx-auto font-light leading-relaxed py-2 px-6"
            >
              Exact timeline from college inception in June 2025, national hackathon sprints, industry internship, through graduation in 2029.
            </TextContrastZone>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Complete Manifest / CV</span>
            </button>
          </div>
        </div>

        {/* Main Background Card for Chronology */}
        <div
          ref={cardRef}
          style={{ transitionDelay: '120ms' }}
          className={`relative max-w-5xl mx-auto bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 md:p-14 shadow-2xl overflow-hidden transition-all duration-700 ease-out transform ${
            cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle Ambient Radial Glow inside the card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Central Vertical Timeline Track Line */}
          <div className="hidden md:block absolute left-1/2 top-16 bottom-16 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* Chronological Milestones (Strict 1 -> 6 Chronology) */}
          <div className="relative z-10 space-y-14 md:space-y-16">
            {timelineMilestones.map((item, index) => (
              <TimelineMilestoneItem key={item.step} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

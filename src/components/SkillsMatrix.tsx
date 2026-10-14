import React, { useState } from 'react';
import { Terminal, Cpu, Database, Cloud, Code2, Sparkles, Server } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const getDomainIcon = (title: string) => {
    if (title.includes('Frontend')) return <Code2 className="w-5 h-5 text-blue-500" />;
    if (title.includes('Backend')) return <Server className="w-5 h-5 text-[#A6A6A0]" />;
    if (title.includes('AI / Machine Learning')) return <Cpu className="w-5 h-5 text-indigo-500" />;
    return <Cloud className="w-5 h-5 text-amber-500" />;
  };

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              03. Technical Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 dark:text-white mt-1">
              Skills Matrix
            </h2>
            <p className="text-sm text-zinc-600 dark:text-white mt-2 max-w-xl">
              Categorized competencies based on hands-on production deployments, systems architecture, and open-source contributions.
            </p>
          </div>

          <div className="text-xs text-zinc-500 dark:text-white font-mono-code">
            Total Validated Skills: 32 Technologies
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedDomain === idx;
            return (
              <div
                key={cat.title}
                onClick={() => setSelectedDomain(isSelected ? null : idx)}
                className={`p-6 rounded-2xl border transition-all duration-200 bg-white dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl cursor-pointer ${
                  isSelected
                    ? 'border-blue-500/80 dark:border-blue-500/80 ring-2 ring-blue-500/20'
                    : 'border-zinc-200/90 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/30'
                }`}
              >
                {/* Domain Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                      {getDomainIcon(cat.title)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-white mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Interactive Grid (No arbitrary percentage bars!) */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl border border-zinc-100 dark:border-white/10 bg-zinc-50/60 dark:bg-neutral-800/80 backdrop-blur-md flex items-center justify-between text-xs hover:bg-zinc-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <span className="font-semibold text-zinc-800 dark:text-white truncate">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono-code text-zinc-500 dark:text-white shrink-0 ml-2">
                        {skill.experience}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

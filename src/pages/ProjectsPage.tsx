import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, Github, Linkedin, ExternalLink, Sparkles, FolderGit2, Layers, Cpu, Shield, ArrowRight } from 'lucide-react';
import { PROJECTS, ADDITIONAL_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';

// Staggered Entrance Variants for Editorial Dynamic Presentation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const, // Editorial snappy cubic-bezier curve
    },
  },
};

const additionalGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const additionalCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI / ML', 'Hackathons', 'Full-Stack', 'Systems & IoT'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'AI / ML' && (project.category.includes('AI') || project.category.includes('ML'))) ||
        (selectedCategory === 'Hackathons' && (project.category.includes('Hackathon') || project.caseStudy.timeline.includes('Hackathon') || project.title.includes('Smart India') || project.title.includes('Google Synapse'))) ||
        (selectedCategory === 'Full-Stack' && (project.category.includes('Full-Stack') || project.tags.includes('React') || project.tags.includes('Tailwind CSS'))) ||
        (selectedCategory === 'Systems & IoT' && (project.category.includes('IoT') || project.tags.includes('ESP32') || project.tags.includes('REST APIs')));

      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-white">
      {/* Header & Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono-code text-white mb-4">
          <Link to="/" className="hover:text-[#00FF66] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#7C7CFF]">PROJECTS ARCHIVE</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bricolage font-bold text-white tracking-tight">
              Project Archive &amp; Systems
            </h1>
            <p className="text-base sm:text-lg text-white font-light max-w-2xl mt-3 leading-relaxed">
              Applied machine learning models, autonomous agentic workflows, embedded hardware interfaces, and hackathon prototypes built and shipped by Savar Shetty.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono-code text-white">
              Total Cataloged: <span className="font-bold text-[#7C7CFF]">{PROJECTS.length + ADDITIONAL_PROJECTS.length} Systems</span>
            </div>
            <div className="text-[11px] font-mono-code text-white mt-1">
              Active Inception: June 2025 – Present
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search Input */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono-code transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-lg scale-105'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] sm:min-w-[320px]">
          <Search className="w-4 h-4 text-white absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech, keyword, or name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-900/80 border border-white/15 text-white text-xs font-mono-code placeholder-white/40 focus:outline-none focus:border-[#5B5BFF] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white hover:text-[#00FF66]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl"
        >
          <p className="text-white font-mono-code text-sm">No systems found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-full text-xs font-mono-code bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={`${selectedCategory}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900/80 hover:bg-neutral-900/95 border border-white/10 p-6 flex flex-col justify-between hover:border-white/30 backdrop-blur-xl shadow-2xl cursor-pointer"
            >
              {/* Image banner preview if exists */}
              {project.image && (
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 border border-white/10 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="340"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-[#7C7CFF]">
                    {project.category}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-white mb-2 font-mono-code">
                  <span className="text-white font-semibold">{project.caseStudy.timeline}</span>
                  <span>#{idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`}</span>
                </div>

                <h3 className="text-2xl font-bricolage font-bold text-white mb-1.5 group-hover:text-[#7C7CFF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono-code text-[#00FF66] mb-2.5">
                  {project.tagline}
                </p>
                <p className="text-xs text-white leading-relaxed line-clamp-3 mb-4">
                  {project.shortDescription}
                </p>
              </div>

              {/* Tags & Action Footer */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono-code text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono-code text-white">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono-code text-white pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1 text-[#7C7CFF] group-hover:underline">
                    Inspect Architecture &amp; Case Study
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`View ${project.title} on GitHub`}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Relevant Learning, Coursework & Workshops */}
      <div className="pt-12 border-t border-white/10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-white">
              FOUNDATIONAL LABS &amp; CURRICULUM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bricolage font-bold text-white mt-1">
              Coursework Labs &amp; Intensive Workshops
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.linkedin.com/in/savar-shetty-usebonded/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0077b5]/40 bg-[#0077b5]/15 hover:bg-[#0077b5]/30 text-[#70b5f9] font-mono-code text-xs transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Certifications</span>
            </a>
            <a
              href="https://github.com/Usebonded"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono-code text-xs transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>@Usebonded Repositories</span>
            </a>
          </div>
        </div>

        <motion.div
          variants={additionalGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {ADDITIONAL_PROJECTS.map((extra, idx) => (
            <motion.div
              key={idx}
              variants={additionalCardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className="p-5 rounded-2xl border border-white/10 bg-neutral-900/80 hover:bg-neutral-900/95 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white mb-2.5 font-mono-code">
                  <span className="text-emerald-400 font-semibold">{extra.role}</span>
                  <FolderGit2 className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5 font-bricolage">
                  {extra.title}
                </h4>
                <p className="text-xs text-white leading-relaxed">
                  {extra.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-white">
                <span className="truncate pr-2">{extra.tech}</span>
                {extra.linkedinUrl && (
                  <a
                    href={extra.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Verify on LinkedIn"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#70b5f9] border border-[#0077b5]/40 text-[10px] font-mono-code transition-colors shrink-0"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>Verify</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA to Contact */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl text-center space-y-4">
        <h3 className="text-2xl sm:text-4xl font-bricolage font-bold text-white">
          Need a Custom Machine Learning Architecture or System Demo?
        </h3>
        <p className="text-sm sm:text-base text-white max-w-xl mx-auto font-light leading-relaxed">
          Savar is actively open to discuss applied AI engineering roles, technical challenges, and cutting-edge hackathons.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl"
          >
            <span>Transmit Inquiry to Savar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

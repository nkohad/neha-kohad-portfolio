import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, AlertTriangle, ArrowUpRight, Building2, Check, Quote, Search, Route, Library, Users, PanelsTopLeft, MessageSquare, Table2, Compass, EyeOff, Layers, Headphones, GitBranch, BarChart2, Zap, Award } from 'lucide-react';
import { CASE_STUDY_CONTENT } from '../data/caseStudies';
import { CASE_STUDY_SECTIONS } from './LeftSidebar';

interface CaseStudyModalProps {
  project: any;
  allProjects: any[];
  currentIndex: number;
  onClose: () => void;
  onSelectProject: (index: number) => void;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const CASE_TOOL_ICONS: Record<string, React.ReactNode> = {
  Figma: <img src="https://cdn.simpleicons.org/figma" alt="" className="h-4 w-4" />,
  Miro: <img src="https://cdn.simpleicons.org/miro" alt="" className="h-4 w-4" />,
  Teams: <MessageSquare size={16} />,
  Excel: <Table2 size={16} />,
  Claude: <Sparkles size={16} />,
};

const featureIcons = [PanelsTopLeft, Route, Search, Users, Library];
const stage1Icons = [Compass, EyeOff, Layers, Headphones];
const stage2Icons = [Route, Compass, GitBranch, BarChart2];
const stage3Icons = [Layers, Search, Zap, Award];
const featureToneClasses = [
  'from-sky-500/30 via-cyan-400/15 to-emerald-400/20',
  'from-fuchsia-500/25 via-rose-400/15 to-amber-300/20',
  'from-violet-500/25 via-blue-400/15 to-slate-100/20',
  'from-lime-400/25 via-emerald-500/15 to-teal-300/20',
  'from-orange-400/25 via-red-400/15 to-pink-300/20',
];

export function CaseStudyModal({ project, allProjects, currentIndex, onClose, onSelectProject, activeSection, onSectionChange }: CaseStudyModalProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);
  const [stage2Active, setStage2Active] = useState(0);
  const [stage3Active, setStage3Active] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const content = CASE_STUDY_CONTENT[project.title];
  const selectedFeature = content?.solutions?.features[activeFeature] || content?.solutions?.features[0];
  const stage2 = content?.stages?.[1];
  const stage3 = content?.stages?.[2];

  // Order starting right after the current project (next -> ... -> previous), wrapping around.
  const carouselProjects = Array.from({ length: allProjects.length - 1 }, (_, k) => {
    const index = (currentIndex + 1 + k) % allProjects.length;
    return { ...allProjects[index], index };
  });

  const scrollCarousel = (direction: 1 | -1) => {
    carouselRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    // Reset scroll whenever a new case study mounts (component is re-keyed per project)
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

      let currentSection = CASE_STUDY_SECTIONS[0].id;

      if (isAtBottom) {
        currentSection = CASE_STUDY_SECTIONS[CASE_STUDY_SECTIONS.length - 1].id;
      } else {
        for (const section of CASE_STUDY_SECTIONS) {
          const el = document.getElementById(section.id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top - window.innerHeight * 0.4) {
              currentSection = section.id;
            }
          }
        }
      }

      onSectionChange(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectionChange]);

  // Snap stage-2 and stage-3 into full view when the user scrolls a little into them
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isSnapping = false;

    const handleSnap = () => {
      if (isSnapping) return;
      const currentScrollY = window.scrollY;
      const goingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
      if (!goingDown) return;

      for (const id of ['stage-2', 'stage-3']) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        // Section top has entered the viewport but is still in the upper 65% — snap it flush
        if (top > 0 && top < window.innerHeight * 0.65) {
          isSnapping = true;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => { isSnapping = false; }, 1200);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleSnap, { passive: true });
    return () => window.removeEventListener('scroll', handleSnap);
  }, []);

  if (!project) return null;

  return (
    <div className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#0a0a0a] light:bg-white"
    >
          {/* Main Content Area */}
          <div className="relative overflow-x-hidden bg-[#0a0a0a] light:bg-white">
            {/* 1. First Glance / Hero */}
            <section id="first-glance" className="relative min-h-[70vh] flex flex-col justify-end pt-28 px-8 pb-0 md:px-16 md:pb-0 md:pt-28">
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover opacity-30 light:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent light:from-white light:via-white/80" />
              </div>

              <div className="relative z-10 w-full">
                {/* Mobile back button - flows with the content so it scrolls
                    away naturally instead of floating over the whole page/footer. */}
                <button
                  onClick={onClose}
                  className="md:hidden mb-6 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-xl"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6 font-sans text-sm uppercase tracking-wider font-medium drop-shadow-md">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 light:bg-black/5 text-white light:text-zinc-900 border border-white/20 light:border-black/10">
                    {project.type}
                  </span>
                  <span className="text-white/60 light:text-zinc-500">{project.company}</span>
                </div>
                <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter text-white light:text-zinc-900 mb-6 leading-[1.1] drop-shadow-lg">
                  {project.title}
                </h1>
                {/* {content?.subtitle && (
                  <p className="font-display text-2xl sm:text-3xl font-medium text-white/90 light:text-zinc-800 tracking-tight mb-4 leading-snug">
                    {content.subtitle}
                  </p>
                )} */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,680px)_minmax(280px,1fr)] gap-8 lg:gap-16 items-end">
                  <p className="font-sans text-xl sm:text-2xl font-normal text-white/70 light:text-zinc-600 leading-relaxed">
                    {content?.summary || project.impact}
                  </p>

                  {content?.tools && content.tools.length > 0 && (
                    <div className="lg:justify-self-end">
                      <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-3">Tools Used</div>
                      <div className="flex flex-wrap gap-3 lg:justify-end">
                        {content.tools.map((tool) => (
                          <div
                            key={tool}
                            className="flex items-center gap-2 rounded-full bg-white/10 light:bg-black/5 border border-white/15 light:border-black/10 px-3 py-2 text-sm font-semibold text-white/80 light:text-zinc-700"
                            title={tool}
                          >
                            {CASE_TOOL_ICONS[tool] || <Sparkles size={14} />}
                            <span>{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {content?.meta && content.meta.length > 0 && (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-8 lg:gap-x-14 xl:gap-x-20 mt-10 pt-8 border-t border-white/10 light:border-black/10 w-full">
                    {content.meta.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-1.5">{m.label}</div>
                        <div className="text-lg sm:text-xl text-white/80 light:text-zinc-700 font-medium leading-snug">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="p-8 md:p-16 space-y-36 pb-20">


              {/* 2. Problem Statement */}
              <section id="problem" className="scroll-mt-16">
                {content?.challenge ? (
                  <div className="grid grid-cols-[1fr_1fr] gap-8 items-stretch">

                    {/* Left col: stacked metric cards */}
                    {content.overview?.metrics && (
                      <div className="flex flex-col gap-3 h-full">
                        {content.overview.metrics.map((metric, i) => {
                          const gradients = [
                            'from-violet-500/45 via-blue-500/20 to-transparent',
                            'from-orange-400/45 via-red-500/25 to-transparent',
                            'from-cyan-300/35 via-slate-400/20 to-transparent',
                          ];
                          const isLight = i === 1;
                          return (
                            <motion.div
                              key={metric.value}
                              whileHover={{ y: -4 }}
                              transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                              className={`group relative flex-1 overflow-hidden rounded-3xl border flex ${
                                isLight
                                  ? 'bg-white text-black light:bg-zinc-900 light:text-white border-white/70 light:border-zinc-900'
                                  : 'bg-white/[0.04] light:bg-black/[0.03] text-white light:text-zinc-900 border-white/10 light:border-black/10'
                              }`}
                            >
                              {/* Left: gradient + big number */}
                              <div className={`w-[40%] shrink-0 bg-gradient-to-br ${gradients[i]} flex items-end p-5`}>
                                <span className={`font-display font-black text-6xl tracking-tighter leading-none ${isLight ? 'text-black light:text-white' : 'text-white light:text-zinc-900'}`}>{metric.value}</span>
                              </div>
                              {/* Right: label + description */}
                              <div className={`flex-1 flex flex-col justify-end p-5 ${isLight ? 'bg-white light:bg-zinc-900' : 'bg-[#0d0d0d] light:bg-white'}`}>
                                <h3 className={`font-display font-bold text-base tracking-tight mb-1 ${isLight ? 'text-black light:text-white' : 'text-white light:text-zinc-900'}`}>{metric.label}</h3>
                                <p className={`font-sans text-xl leading-snug ${isLight ? 'text-black/55 light:text-white/55' : 'text-white/50 light:text-zinc-500'}`}>{metric.description}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Right col: all text + design challenge */}
                    <div className="flex flex-col gap-5">
                      <div>
                        <h2 className="font-display font-bold text-xl sm:text-4xl tracking-tight text-white light:text-zinc-900 drop-shadow-md mb-4">
                          {content.challenge.heading}
                        </h2>
                        {content.overview?.hook && (
                          <p className="font-sans text-xl text-white/55 light:text-zinc-500 leading-relaxed">
                            {content.overview.hook}
                          </p>
                        )}
                      </div>
                      {content.challenge.paragraphs.map((p, i) => (
                        <p key={i} className="font-sans text-xl text-white/65 light:text-zinc-600 leading-relaxed">{p}</p>
                      ))}
                      {content.challenge.designChallenge && (
                        <div className="rounded-3xl bg-white light:bg-zinc-900 p-7 mt-5">
                          <h3 className="font-display text-base font-bold uppercase text-black/55 light:text-white/55 mb-4">Design Challenge</h3>
                          <p className="font-medium text-xl sm:text-xl text-black light:text-white tracking-tight leading-snug">
                            {content.challenge.designChallenge}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Untangling the Mess</h2>
                    <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                      <p>
                        When I joined the team, the design infrastructure was highly fragmented. Designers were spending 40% of their time recreating components instead of focusing on user experience. The primary challenge was to establish a single source of truth without disrupting ongoing sprints.
                      </p>
                    </div>
                  </>
                )}
              </section>

              {/* 3. Key Features */}
              <section id="solution" className="scroll-mt-16">
                {content?.solutions ? (
                  <div className="grid grid-cols-[1fr_2fr] gap-8 xl:gap-8 items-center">
                    {/* Left: heading + subtext + feature list */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 drop-shadow-md">
                          {content.solutions.heading}
                        </h2>
                      
                      </div>
                      <div>
                        <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-3">Features</div>
                        {content.solutions.features.map((feature, i) => {
                          const Icon = featureIcons[i] || PanelsTopLeft;
                          const isActive = i === activeFeature;
                          return (
                            <motion.div
                              key={feature.title}
                              onMouseEnter={() => setActiveFeature(i)}
                              onClick={() => setActiveFeature(i)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature(i); }}
                              role="button"
                              tabIndex={0}
                              className={`py-4 border-t cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded ${isActive ? 'border-white/25 light:border-black/20' : 'border-white/10 light:border-black/10'}`}
                            >
                              <div className={`flex items-center gap-2 font-display text-xl font-medium mb-1.5 transition-colors duration-300 ${isActive ?'text-emerald-400' : 'text-white/55 light:text-zinc-500'}`}>
                                <Icon size={20} className="shrink-0 opacity-70" />
                                {feature.title}
                              </div>
                              <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="font-sans text-xl text-white/60 light:text-zinc-600 leading-relaxed pt-1">{feature.description}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: MacBook */}
                    <div className="flex flex-col items-center">
                      <div className="w-full rounded-[18px] bg-[#1d1d1f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.10]">
                        <div className="flex justify-center pb-[6px]"><div className="w-[7px] h-[7px] rounded-full bg-[#3a3a3c]" /></div>
                        <div className="aspect-[16/10] rounded-[11px] bg-black overflow-hidden relative">
                          <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.45 }}
                            className={`absolute inset-0 bg-gradient-to-br ${featureToneClasses[activeFeature % featureToneClasses.length]}`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                              {`Feature ${activeFeature + 1} · Placeholder`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[90%]">
                        <div className="h-[5px] bg-[#1d1d1f] rounded-b" />
                        <div className="h-[10px] bg-[#141414] mx-1 rounded-b-xl shadow-xl" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">The Final Deliverable</h2>
                    <div className="aspect-video w-full rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 overflow-hidden mb-12">
                      <img src={project.image} alt="Solution" className="w-full h-full object-cover" />
                    </div>
                  </>
                )}
              </section>

              {/* Stage 1: Understanding the Problem */}
              <section id="stage-1" className="scroll-mt-16">
                {content?.stages?.[0] ? (
                  <>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-6 drop-shadow-md">
                      {content.challenge.emphasis.join(' ')}
                    </h2>

                    {/* Intro context */}
                    <p className="font-sans text-xl text-white/55 light:text-zinc-600 leading-relaxed mb-10">
                      {content.stages[0].validating}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {content.stages[0].insights.map((item, i) => {
                        const S1Icon = stage1Icons[i];
                        const isLight = i === 1;
                        const gradients = [
                          'from-violet-500/50 via-blue-500/25 to-transparent',
                          'from-orange-400/50 via-rose-400/30 to-transparent',
                          'from-cyan-400/40 via-teal-500/20 to-transparent',
                          'from-emerald-400/40 via-green-500/20 to-transparent',
                        ];
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                            className={`group rounded-3xl border overflow-hidden flex flex-col ${
                              isLight
                                ? 'bg-white light:bg-zinc-900 border-white/70 light:border-zinc-900'
                                : 'bg-white/[0.04] light:bg-black/[0.03] border-white/10 light:border-black/10'
                            }`}
                          >
                            {/* Gradient header strip with icon */}
                            <div className={`bg-gradient-to-br ${gradients[i]} px-8 py-8`}>
                              <div className="flex items-center gap-4">
                                <S1Icon
                                  size={24}
                                  className={`shrink-0 ${isLight ? 'text-black/50' : 'text-white/55'}`}
                                />

                              </div>
                            </div>
                            {/* Content */}
                            <div className="p-5 flex flex-col gap-3 flex-1">
                               <h3
                                  className={`font-display font-bold text-base leading-none ${
                                    isLight ? 'text-black' : 'text-white'
                                  }`}
                                >
                                  {item.phrase}
                                </h3>
                              <p className={`font-sans text-xl leading-relaxed flex-1 ${isLight ? 'text-black/60 light:text-white/60' : 'text-white/60 light:text-zinc-500'}`}>
                                {item.insight}
                              </p>
                              <div className={`border-t pt-3 ${isLight ? 'border-black/10 light:border-white/10' : 'border-white/10 light:border-black/10'}`}>
                                <div className={`font-display text-base font-bold uppercase mb-1.5 ${isLight ? 'text-black light:text-white' : 'text-white light:text-zinc-900'}`}>Design Goal</div>
                                <p className={`font-sans text-xl leading-relaxed ${isLight ? 'text-black/50' : 'text-white/50'}`}>{item.change}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                  </>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Supercharging with AI</h2>
                    <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl mb-12">
                      I integrated generative models to accelerate our ideation and documentation phases. However, maintaining quality control meant navigating around AI hallucinations and generic outputs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Positive AI Usage */}
                      <div className="bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Sparkles size={120} />
                        </div>
                        <div className="flex items-center gap-3 mb-6 text-emerald-400 light:text-emerald-600">
                          <Sparkles size={24} />
                          <h3 className="font-display font-bold text-xl tracking-tight">Workflow Acceleration</h3>
                        </div>
                        <p className="font-sans text-base sm:text-lg font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed relative z-10">
                          Used Claude to quickly draft component documentation and map out edge cases in the design system, cutting down our documentation time by three weeks.
                        </p>
                      </div>

                      {/* AI BS Detection (Warning) */}
                      <div className="bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-3xl p-8 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <AlertTriangle size={120} />
                        </div>
                        <div className="flex items-center gap-3 mb-6 text-amber-400 light:text-amber-600">
                          <AlertTriangle size={24} />
                          <h3 className="font-display font-bold text-xl tracking-tight">Hallucination Mitigation</h3>
                        </div>
                        <p className="font-sans text-base sm:text-lg font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed relative z-10">
                          The AI generated inconsistent color token mappings. I had to manually intervene and establish strict JSON schemas to force the AI to adhere to our design tokens.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </section>

              {/* REDO | Stage 2 : Testing Product Strategy */}
              <section id="stage-2" className="scroll-mt-16"> 
                <div id="stage-2" className="-mx-8 md:-mx-16 scroll-mt-24">
                  <div className="bg-[#0a0a0a] light:bg-white px-8 md:px-16 flex flex-col gap-10 py-10">
                    {/* Header */}
                    <div>
                      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-6 drop-shadow-md">{stage2.title}</h2>
                      <p className="font-sans text-xl text-white/60 light:text-zinc-600 leading-relaxed">
                        {stage2.validating}
                      </p>
                    </div>

                    {/* Insight / Design Change table + MacBook side panel */}
                    <div className="flex gap-10 xl:gap-16 items-start">
                      {/* Left: 2-col insight / change table — rows size to content only */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-2 gap-x-8">
                          <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 pb-3">Insight</div>
                          <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 pb-3">Design Change</div>
                        </div>
                        {stage2.insights.map((item, i) => {
                          const active = i === stage2Active;
                          const S2Icon = stage2Icons[i];
                          return (
                            <div key={i} className={`grid grid-cols-2 gap-x-8 border-t ${active ? 'border-white/25 light:border-black/20' : 'border-white/10 light:border-black/10'}`}>
                              <motion.div
                                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setStage2Active(i)}
                                onClick={() => setStage2Active(i)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStage2Active(i); }}
                                role="button" tabIndex={0}
                                className="py-4 cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded"
                              >
                                <div className={`flex items-center gap-4 font-display text-xl font-medium mb-1.5 transition-colors duration-300 ${active ? 'text-white light:text-zinc-900' : 'text-white/55 light:text-zinc-500'}`}>
                                  {S2Icon && <S2Icon size={20} className="shrink-0 opacity-70" />}
                                  {item.phrase ?? `Insight ${i + 1}`}
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed pt-1">{item.insight}</p>
                                </div>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1 + 0.06, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setStage2Active(i)}
                                onClick={() => setStage2Active(i)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStage2Active(i); }}
                                role="button" tabIndex={0}
                                className="py-4 cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded"
                              >
                                <div className={`flex items-center gap-2 font-display text-xl font-medium mb-1.5 transition-colors duration-300 ${active ? 'text-emerald-400 light:text-emerald-600' : 'text-white/55 light:text-zinc-500'}`}>
                                  {/* {S2Icon && <S2Icon size={20} className="shrink-0 opacity-70" />} */}
                                  {item.changePhrase ?? `Design Response ${i + 1}`}
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed pt-1">{item.change}</p>
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: MacBook + Key Question — independent of table row heights */}
                      <div className="hidden xl:flex w-[42%] shrink-0 flex-col gap-4 self-start">
                        <div className="rounded-xl bg-white light:bg-zinc-900 text-black light:text-white p-5">
                          <div className="font-display text-base font-bold uppercase tracking-widest text-black/55 light:text-white/55 mb-1.5">Key Question</div>
                          <p className=" font-medium text-xl tracking-tight leading-snug">{stage2.question}</p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-full rounded-[18px] bg-[#1d1d1f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.10]">
                            <div className="flex justify-center pb-[6px]"><div className="w-[7px] h-[7px] rounded-full bg-[#3a3a3c]" /></div>
                            <div className="aspect-[16/10] rounded-[11px] bg-black overflow-hidden relative">
                              <motion.div key={stage2Active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}
                                className={`absolute inset-0 bg-gradient-to-br ${
                                  stage2Active === 1 ? 'from-violet-500/50 via-purple-600/30 to-transparent' :
                                  stage2Active === 2 ? 'from-rose-500/50 via-pink-600/30 to-transparent' :
                                  'from-sky-500/50 via-blue-600/30 to-transparent'
                                }`}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                                  {`Insight ${stage2Active + 1} · Placeholder`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="w-[90%]">
                            <div className="h-[5px] bg-[#1d1d1f] rounded-b" />
                            <div className="h-[10px] bg-[#141414] mx-1 rounded-b-xl shadow-xl" />
                          </div>
                        </motion.div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              
              </section>

              {/* Stage 3: Testing the Workflow */}
              <section> 
                <div id="stage-3" className="-mx-8 md:-mx-16 scroll-mt-24">
                  <div className="bg-[#0d0d0d] light:bg-zinc-50 px-8 md:px-16 flex flex-col gap-10 py-10">
                    {/* Header */}
                    <div>
                      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-6 drop-shadow-md">{stage3.title}</h2>
                      <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed max-w-2xl">
                        {stage3.validating}
                      </p>
                    </div>

                    {/* Insight / Design Change table + MacBook side panel */}
                    <div className="flex gap-10 xl:gap-16 items-start">
                      {/* Left: 2-col insight / change table — rows size to content only */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-2 gap-x-8">
                          <div className="text-xs font-bold uppercase text-white/55 light:text-zinc-500 pb-3">Insight</div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 pb-3">Design Change</div>
                        </div>
                        {stage3.insights.map((item, i) => {
                          const active = i === stage3Active;
                          const S3Icon = stage3Icons[i];
                          return (
                            <div key={i} className={`grid grid-cols-2 gap-x-8 border-t ${active ? 'border-white/25 light:border-black/20' : 'border-white/10 light:border-black/10'}`}>
                              <motion.div
                                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setStage3Active(i)}
                                onClick={() => setStage3Active(i)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStage3Active(i); }}
                                role="button" tabIndex={0}
                                className="py-4 cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded"
                              >
                                <div className={`flex items-center gap-4 font-display text-xl font-medium mb-1.5 transition-colors duration-300 ${active ? 'text-white light:text-zinc-900' : 'text-white/55 light:text-zinc-500'}`}>
                                  {S3Icon && <S3Icon size={20} className="shrink-0 opacity-70" />}
                                  {item.phrase ?? `Insight ${i + 1}`}
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed pt-1">{item.insight}</p>
                                </div>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1 + 0.06, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setStage3Active(i)}
                                onClick={() => setStage3Active(i)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStage3Active(i); }}
                                role="button" tabIndex={0}
                                className="py-4 cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded"
                              >
                                <div className={`flex items-center gap-2 font-display text-xl font-medium mb-1.5 transition-colors duration-300 ${active ? 'text-emerald-400 light:text-emerald-600' : 'text-white/55 light:text-zinc-500'}`}>
                                  {/* {S3Icon && <S3Icon size={13} className="shrink-0 opacity-70" />} */}
                                  {item.changePhrase ?? `Design Response ${i + 1}`}
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed pt-1">{item.change}</p>
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: MacBook + Key Question — independent of table row heights */}
                      <div className="hidden xl:flex w-[42%] shrink-0 flex-col gap-4 self-start">
                        <div className="rounded-xl bg-white light:bg-zinc-900 text-black light:text-white p-5">
                          <div className="font-display text-base font-bold uppercase text-black/55 light:text-white/55 mb-1.5">Key Question</div>
                          <p className=" font-medium text-xl tracking-tight leading-snug">{stage3.question}</p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-full rounded-[18px] bg-[#1d1d1f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.10]">
                            <div className="flex justify-center pb-[6px]"><div className="w-[7px] h-[7px] rounded-full bg-[#3a3a3c]" /></div>
                            <div className="aspect-[16/10] rounded-[11px] bg-black overflow-hidden relative">
                              <motion.div key={stage3Active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}
                                className={`absolute inset-0 bg-gradient-to-br ${
                                  stage3Active === 1 ? 'from-orange-500/50 via-amber-600/30 to-transparent' :
                                  stage3Active === 2 ? 'from-cyan-500/50 via-blue-600/30 to-transparent' :
                                  'from-emerald-500/50 via-teal-600/30 to-transparent'
                                }`}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                                  {`Insight ${stage3Active + 1} · Placeholder`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="w-[90%]">
                            <div className="h-[5px] bg-[#1d1d1f] rounded-b" />
                            <div className="h-[10px] bg-[#141414] mx-1 rounded-b-xl shadow-xl" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Outcomes */}
              <section id="impact" className="scroll-mt-16">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-5 drop-shadow-md">
                      {content.impact.heading}
                    </h2>
                    <p className="font-sans text-xl text-white/60 light:text-zinc-600 leading-relaxed mb-8">
                      {content.impact.intro}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                      {/* Business column */}
                      <div className="flex flex-col gap-3 h-full">
                        <div className="font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-1">Business</div>

                        {/* 55K+ split metric card */}
                        <div className="relative overflow-hidden rounded-3xl border bg-white/[0.04] light:bg-black/[0.03] border-white/10 light:border-black/10 flex">
                          <div className="w-[40%] shrink-0 bg-gradient-to-br from-violet-500/45 via-blue-500/20 to-transparent flex items-end p-5">
                            <span className="font-display font-black text-6xl tracking-tighter leading-none text-white light:text-zinc-900">55K+</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-end p-5 bg-[#0d0d0d] light:bg-white">
                            <h3 className="font-display font-bold text-base tracking-tight text-white light:text-zinc-900 mb-1">Enterprise Scale</h3>
                            <p className="font-sans text-xl leading-snug text-white/50 light:text-zinc-500">Employees across Cox Enterprises with access to self-service HCD guidance.</p>
                          </div>
                        </div>

                        {/* Qualitative outcome cards — flex-1 so they fill remaining height equally */}
                        <div className="flex flex-col gap-3 flex-1">
                          {content.impact.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 flex-1">
                              <Check size={15} className="text-emerald-400 light:text-emerald-600 shrink-0" />
                              <p className="font-sans text-xl text-white/70 light:text-zinc-600 leading-snug">{outcome}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Validation column */}
                      {content.impact.metrics && (
                        <div className="flex flex-col gap-3 h-full">
                          <div className=" font-display text-base font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-1">Validation</div>
                          <div className="flex flex-col gap-3 flex-1">
                            {content.impact.metrics.map((m, i) => (
                              <div key={i} className="relative flex-1 overflow-hidden rounded-3xl border bg-white/[0.04] light:bg-black/[0.03] border-white/10 light:border-black/10 flex">
                                <div className={`w-[40%] shrink-0 bg-gradient-to-br ${m.gradient ?? 'from-white/10 to-transparent'} flex items-end p-5`}>
                                  <span className="font-display font-black text-6xl tracking-tighter leading-none text-white light:text-zinc-900">
                                    {m.value}<span className="text-2xl text-white/50 light:text-zinc-500">{ m.unit ?? ' '} </span>
                                  </span>
                                </div>
                                <div className="flex-1 flex flex-col justify-end p-5 bg-[#0d0d0d] light:bg-white">
                                  <h3 className="font-display font-bold text-base tracking-tight text-white light:text-zinc-900 mb-1">{m.label}</h3>
                                  <p className="font-sans text-xl leading-snug text-white/50 light:text-zinc-500">{m.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

              </section>

              {/* 6. Reflections */}
              <section id="relfections" className="scroll-mt-16">
                    {content.reflection && (
                      <div id="reflection" className="mt-36 scroll-mt-16">
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-12 xl:gap-16 items-start">
                          <div>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Reflection</h2>
                            <div className="font-sans text-lg sm:text-xl font-normal text-white/70 light:text-zinc-600 leading-relaxed space-y-6">
                              {content.reflection.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                              ))}
                            </div>
                            <p className="font-display font-medium text-xl sm:text-2xl text-white light:text-zinc-900 tracking-tight leading-snug mt-8">
                              {content.reflection.closing}
                            </p>
                          </div>
                          <div className="xl:sticky xl:top-24">
                            <div className="rounded-3xl overflow-hidden border border-white/10 light:border-black/10">
                              <img
                                src="/cox-team.png"
                                alt="The Cox HCD Resource Hub team"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="font-sans text-xs text-white/55 light:text-zinc-500 mt-3 text-center tracking-wide">The team at Cox Enterprises</p>
                          </div>
                        </div>
                      </div>
                    )}
              </section>

            </div>
          </div>
    </motion.div>

    {/* More Case Studies Carousel - full width, matches site-wide margins */}
    <div className="w-full border-t border-white/10 light:border-black/10 bg-[#0a0a0a] light:bg-white py-16 px-6 sm:px-12 md:px-12" role="region" aria-label="More case studies">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-4xl text-white light:text-zinc-900 tracking-tight">Explore More Work</h3>
          <p className="text-white/55 light:text-zinc-500 text-xl mt-1">Keep browsing the rest of the portfolio</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-white/15 light:border-black/10 flex items-center justify-center text-white/60 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 hover:border-white/40 light:hover:border-black/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-white/15 light:border-black/10 flex items-center justify-center text-white/60 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 hover:border-white/40 light:hover:border-black/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pt-2 pb-2"
      >
        {carouselProjects.map((p, i) => (
          <motion.button
            key={p.index}
            onClick={() => onSelectProject(p.index)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative w-[260px] sm:w-[300px] shrink-0 snap-start rounded-2xl overflow-hidden border border-white/10 light:border-black/10 hover:border-white/30 light:hover:border-black/25 bg-white/[0.02] light:bg-black/[0.02] transition-colors text-left"
          >
            {i === 0 && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white text-black light:bg-zinc-900 light:text-white text-[9px] font-bold uppercase tracking-widest">
                Up Next
              </span>
            )}
            <div className="h-36 sm:h-40 w-full overflow-hidden">
              <img
                src={p.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-1.5 text-xs uppercase tracking-widest text-white/55 light:text-zinc-500 font-medium">
                {p.company === 'Personal' ? <Sparkles size={11} /> : <Building2 size={11} />}
                <span>{p.company}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white light:text-zinc-900 tracking-tight leading-snug">{p.title}</h4>
            </div>
            <ArrowUpRight
              size={16}
              className="absolute top-3 right-3 text-white/60 light:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        ))}
      </div>
    </div>
    </div>
  );
}

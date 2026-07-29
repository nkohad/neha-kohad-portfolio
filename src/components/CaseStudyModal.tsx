import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, AlertTriangle, ArrowUpRight, Building2, Check, Quote } from 'lucide-react';
import { CASE_STUDY_CONTENT } from '../data/caseStudies';

interface CaseStudyModalProps {
  project: any;
  allProjects: any[];
  currentIndex: number;
  onClose: () => void;
  onSelectProject: (index: number) => void;
}

const SECTIONS = [
  { id: 'first-glance', title: 'The 10,000 ft View', navTitle: 'Overview' },
  { id: 'problem', title: 'Untangling the Mess', navTitle: 'Challenge' },
  { id: 'ai-workflow', title: 'Supercharging with AI', navTitle: 'Decisions' },
  { id: 'solution', title: 'The Final Deliverable', navTitle: 'Solutions' },
  { id: 'impact', title: 'Outcomes', navTitle: 'Outcomes' },
  { id: 'reflection', title: 'Reflection', navTitle: 'Reflection' },
];

export function CaseStudyModal({ project, allProjects, currentIndex, onClose, onSelectProject }: CaseStudyModalProps) {
  const [activeSection, setActiveSection] = useState('first-glance');
  const carouselRef = useRef<HTMLDivElement>(null);
  const content = CASE_STUDY_CONTENT[project.title];

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

      let currentSection = SECTIONS[0].id;

      if (isAtBottom) {
        currentSection = SECTIONS[SECTIONS.length - 1].id;
      } else {
        for (const section of SECTIONS) {
          const el = document.getElementById(section.id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top - window.innerHeight * 0.4) {
              currentSection = section.id;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) return null;

  return (
    <div className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full bg-[#0a0a0a] light:bg-white"
    >
      {/* Sidebar / Table of Contents */}
      <div className="hidden md:flex flex-col w-72 shrink-0 border-r border-white/10 light:border-black/10 bg-[#050505] light:bg-white p-8 h-screen sticky top-0 self-start">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/50 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors mb-12 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Back</span>
        </button>

        <div className="mb-12">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/40 light:text-zinc-400 mb-3 drop-shadow-md">Case Study</h2>
          <p className="font-display text-xl font-bold text-white light:text-zinc-900 tracking-tight leading-tight">{project.title}</p>
        </div>
            <nav className="flex flex-col space-y-5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 light:bg-black/10" />
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative pl-6 text-left font-sans text-sm font-normal tracking-wide transition-colors ${
                    activeSection === section.id ? 'text-white light:text-zinc-900 drop-shadow-md' : 'text-white/40 light:text-zinc-400 hover:text-white/70 light:hover:text-zinc-600'
                  }`}
                >
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-white light:bg-zinc-900"
                    />
                  )}
                  {section.navTitle}
                </button>
              ))}
            </nav>

            <div className="mt-auto">
              <button className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-wider text-white/50 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors">
                <span>View Live Site</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative overflow-x-hidden bg-[#0a0a0a] light:bg-white">
            {/* 1. First Glance / Hero */}
            <section id="first-glance" className="relative min-h-[70vh] flex flex-col justify-end pt-28 px-8 pb-8 md:p-16">
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-30 light:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent light:from-white light:via-white/80" />
              </div>

              <div className="relative z-10 max-w-5xl">
                {/* Mobile back button - flows with the content so it scrolls
                    away naturally instead of floating over the whole page/footer. */}
                <button
                  onClick={onClose}
                  className="md:hidden mb-6 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-xl"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-medium drop-shadow-md">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 light:bg-black/5 text-white light:text-zinc-900 border border-white/20 light:border-black/10">
                    {project.type}
                  </span>
                  <span className="text-white/60 light:text-zinc-500">{project.company}</span>
                </div>
                <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter text-white light:text-zinc-900 mb-6 leading-[1.1] drop-shadow-lg">
                  {project.title}
                </h1>
                {content?.subtitle && (
                  <p className="font-display text-2xl sm:text-3xl font-medium text-white/90 light:text-zinc-800 tracking-tight mb-4 leading-snug">
                    {content.subtitle}
                  </p>
                )}
                <p className="font-sans text-xl sm:text-2xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-2xl">
                  {content?.summary || project.impact}
                </p>

                {content?.meta && content.meta.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10 pt-8 border-t border-white/10 light:border-black/10 max-w-4xl">
                    {content.meta.map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 light:text-zinc-400 mb-1.5">{m.label}</div>
                        <div className="text-sm text-white/80 light:text-zinc-700 font-medium leading-snug">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="p-8 md:p-16 space-y-32 pb-32">

              {content?.overview && (
                <div className="space-y-6">
                  <p className="font-display font-medium text-2xl sm:text-3xl text-white light:text-zinc-900 tracking-tight leading-snug drop-shadow-md">
                    {content.overview.hook}
                  </p>
                  <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                    {content.overview.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="flex items-start gap-4 py-6 pl-6 border-l-2 border-white/20 light:border-black/15">
                    <Quote size={20} className="text-white/30 light:text-black/25 shrink-0 mt-1" />
                    <p className="font-display font-bold text-2xl sm:text-3xl text-white light:text-zinc-900 tracking-tight">
                      {content.overview.quote}
                    </p>
                  </div>
                  <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl">
                    {content.overview.reframe}
                  </p>
                </div>
              )}

              {/* 2. Problem Statement */}
              <section id="problem" className="scroll-mt-16">
                {content?.challenge ? (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Challenge</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">
                      {content.challenge.heading}
                    </h2>
                    <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                      {content.challenge.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {content.challenge.emphasis.length > 0 && (
                      <div className="mt-10 space-y-1">
                        {content.challenge.emphasis.map((line, i) => (
                          <p key={i} className="font-display font-bold text-2xl sm:text-3xl text-white light:text-zinc-900 tracking-tight">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {content.challenge.designChallenge && (
                      <div className="mt-12 p-8 rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 light:text-zinc-400 mb-4">Design Challenge</h3>
                        <p className="font-display font-medium text-xl sm:text-2xl text-white light:text-zinc-900 tracking-tight leading-snug">
                          {content.challenge.designChallenge}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Challenge</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Untangling the Mess</h2>
                    <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                      <p>
                        When I joined the team, the design infrastructure was highly fragmented. Designers were spending 40% of their time recreating components instead of focusing on user experience. The primary challenge was to establish a single source of truth without disrupting ongoing sprints.
                      </p>
                    </div>
                  </>
                )}
              </section>

              {/* 3. Decisions */}
              <section id="ai-workflow" className="scroll-mt-16">
                {content?.decisions ? (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Decisions</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">
                      {content.decisions.heading}
                    </h2>
                    <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl mb-12">
                      {content.decisions.intro}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {content.decisions.items.map((item, i) => (
                        <div key={i} className="bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-3xl p-8 relative overflow-hidden">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 light:text-zinc-400 mb-4">Insight {String(i + 1).padStart(2, '0')}</div>
                          <p className="font-display font-medium text-lg sm:text-xl text-white light:text-zinc-900 tracking-tight leading-snug mb-6">
                            {item.insight}
                          </p>
                          <div className="flex items-start gap-3 pt-6 border-t border-white/10 light:border-black/10">
                            <Check size={18} className="text-emerald-400 light:text-emerald-600 shrink-0 mt-0.5" />
                            <p className="font-sans text-base text-white/70 light:text-zinc-600 leading-relaxed">
                              <span className="text-white/90 light:text-zinc-900 font-semibold">Decision: </span>
                              {item.decision}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl mt-12">
                      {content.decisions.closing}
                    </p>
                  </>
                ) : (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Decisions</span>
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

              {/* 4. The Solution */}
              <section id="solution" className="scroll-mt-16">
                {content?.solutions ? (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Solutions</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">
                      {content.solutions.heading}
                    </h2>
                    <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                      {content.solutions.visionParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {content.solutions.intents.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-8 mb-8">
                        {content.solutions.intents.map((intent) => (
                          <span
                            key={intent}
                            className="px-4 py-2 rounded-full bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 text-sm text-white/80 light:text-zinc-700 font-medium"
                          >
                            {intent}
                          </span>
                        ))}
                      </div>
                    )}

                    {content.solutions.visionClosing && (
                      <p className="font-display font-medium text-xl sm:text-2xl text-white/90 light:text-zinc-800 tracking-tight leading-snug mb-12">
                        {content.solutions.visionClosing}
                      </p>
                    )}

                    <div className="aspect-video w-full rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 overflow-hidden mb-12">
                      <img src={project.image} alt="Solution" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-6">
                      {content.solutions.features.map((feature, i) => (
                        <div key={feature.title} className="flex gap-6 p-8 rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                          <div className="shrink-0 w-9 h-9 rounded-full bg-white/10 light:bg-black/5 border border-white/10 light:border-black/10 flex items-center justify-center font-display font-bold text-sm text-white/70 light:text-zinc-600">
                            {i + 1}
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-xl tracking-tight text-white light:text-zinc-900 mb-2">{feature.title}</h3>
                            <p className="font-sans text-base sm:text-lg text-white/70 light:text-zinc-600 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Solutions</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">The Final Deliverable</h2>
                    <div className="aspect-video w-full rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10 overflow-hidden mb-12">
                      <img src={project.image} alt="Solution" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                      <p>
                        The resulting system was a fully componentized Figma library, synced directly to our frontend repository via Design Tokens. This allowed developers to consume design updates instantly.
                      </p>
                    </div>
                  </>
                )}
              </section>

              {/* 5. Outcomes */}
              <section id="impact" className="scroll-mt-16">
                {content?.impact ? (
                  <>
                    <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Outcomes</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">
                      {content.impact.heading}
                    </h2>
                    {/* Text + 2×2 metric grid side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                      <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed self-center">
                        {content.impact.intro}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {content.impact.validationMetrics?.map((m) => (
                          <div key={m.label} className="p-5 rounded-2xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 light:text-zinc-400 mb-2">Validation</div>
                            <div className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-white light:text-zinc-900 mb-1 drop-shadow-md">
                              {m.value}
                            </div>
                            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 light:text-zinc-500">
                              {m.label}
                            </div>
                          </div>
                        ))}
                        {content.impact.businessStats?.map((s) => (
                          <div key={s.label} className="p-5 rounded-2xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 light:text-zinc-400 mb-2">Business</div>
                            <div className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-white light:text-zinc-900 mb-1 drop-shadow-md">
                              {s.value}
                            </div>
                            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 light:text-zinc-500">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business outcomes — full-width 3-column */}
                    {content.impact.businessOutcomes && content.impact.businessOutcomes.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {content.impact.businessOutcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                            <Check size={16} className="text-emerald-400 light:text-emerald-600 shrink-0 mt-0.5" />
                            <p className="font-sans text-sm text-white/80 light:text-zinc-700 leading-snug">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {content.reflection && (
                      <div id="reflection" className="mt-24 pt-16 border-t border-white/10 light:border-black/10 scroll-mt-16">
                        <span className="inline-block mb-4 px-2.5 py-1 rounded-full border border-white/10 light:border-black/10 text-[10px] font-bold uppercase tracking-widest text-white/35 light:text-zinc-400">Reflection</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Reflection</h2>
                        <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
                          {content.reflection.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                        <p className="font-display font-medium text-xl sm:text-2xl text-white light:text-zinc-900 tracking-tight leading-snug mt-8 max-w-3xl">
                          {content.reflection.closing}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Measuring the Impact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <div className="p-8 rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                        <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white light:text-zinc-900 mb-3 drop-shadow-md">40<span className="text-3xl text-white/50 light:text-zinc-400">%</span></div>
                        <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 light:text-zinc-500">Increase in Velocity</div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                        <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white light:text-zinc-900 mb-3 drop-shadow-md">0</div>
                        <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 light:text-zinc-500">Design Debt Added</div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 light:bg-black/[0.03] border border-white/10 light:border-black/10">
                        <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white light:text-zinc-900 mb-3 drop-shadow-md">12<span className="text-3xl text-white/50 light:text-zinc-400">+</span></div>
                        <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 light:text-zinc-500">Teams Adopted</div>
                      </div>
                    </div>
                  </>
                )}
              </section>

            </div>
          </div>
    </motion.div>

    {/* More Case Studies Carousel - full width, matches site-wide margins */}
    <div className="w-full border-t border-white/10 light:border-black/10 bg-[#0a0a0a] light:bg-white py-16 px-6 sm:px-12 md:px-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white light:text-zinc-900 tracking-tight">Explore More Work</h3>
          <p className="text-white/40 light:text-zinc-400 text-sm mt-1">Keep browsing the rest of the portfolio</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-white/15 light:border-black/10 flex items-center justify-center text-white/60 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 hover:border-white/40 light:hover:border-black/30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-white/15 light:border-black/10 flex items-center justify-center text-white/60 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 hover:border-white/40 light:hover:border-black/30 transition-colors"
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
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-1.5 text-[10px] uppercase tracking-widest text-white/40 light:text-zinc-400 font-medium">
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

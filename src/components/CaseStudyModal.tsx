import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface CaseStudyModalProps {
  project: any;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeSection, setActiveSection] = useState('first-glance');

  useEffect(() => {
    // Reset scroll on mount
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  const sections = [
    { id: 'first-glance', title: 'The 10,000 ft View', navTitle: 'Overview' },
    { id: 'problem', title: 'Untangling the Mess', navTitle: 'Challenge' },
    { id: 'ai-workflow', title: 'Supercharging with AI', navTitle: 'Decisions' },
    { id: 'solution', title: 'The Final Deliverable', navTitle: 'Solutions' },
    { id: 'impact', title: 'Measuring the Impact', navTitle: 'Impact' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Mobile Back Button */}
      <button
        onClick={onClose}
        className="md:hidden fixed top-6 left-6 z-50 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-xl"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Sidebar / Table of Contents */}
      <div className="hidden md:flex flex-col w-72 shrink-0 border-r border-white/10 bg-[#050505] p-8 h-screen sticky top-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Back</span>
        </button>
        
        <div className="mb-12">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 drop-shadow-md">Case Study</h2>
          <p className="font-display text-xl font-bold text-white tracking-tight leading-tight">{project.title}</p>
        </div>
            <nav className="flex flex-col space-y-5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative pl-6 text-left font-sans text-sm font-normal tracking-wide transition-colors ${
                    activeSection === section.id ? 'text-white drop-shadow-md' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-white"
                    />
                  )}
                  {section.navTitle}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto">
              <button className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                <span>View Live Site</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative overflow-y-auto overflow-x-hidden scroll-smooth bg-[#0a0a0a]"
            onScroll={(e) => {
              const target = e.currentTarget as HTMLElement;
              const scrollPosition = target.scrollTop;
              const isAtBottom = scrollPosition + target.clientHeight >= target.scrollHeight - 20;
              
              let currentSection = sections[0].id;
              
              if (isAtBottom) {
                currentSection = sections[sections.length - 1].id;
              } else {
                for (const section of sections) {
                  const el = document.getElementById(section.id);
                  if (el) {
                    // Use offsetTop which is relative to this relative container
                    if (scrollPosition >= el.offsetTop - window.innerHeight * 0.4) {
                      currentSection = section.id;
                    }
                  }
                }
              }
              
              setActiveSection(currentSection);
            }}
          >
            {/* 1. First Glance / Hero */}
            <section id="first-glance" className="relative min-h-[70vh] flex flex-col justify-end p-8 md:p-16">
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
              </div>
              
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-6 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-medium drop-shadow-md">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20">
                    {project.type}
                  </span>
                  <span className="text-white/60">{project.company}</span>
                </div>
                <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter text-white mb-6 leading-[1.1] drop-shadow-lg">
                  {project.title}
                </h1>
                <p className="font-sans text-xl sm:text-2xl font-normal tracking-tight text-white/70 leading-relaxed max-w-2xl">
                  {project.impact}
                </p>
              </div>
            </section>

            <div className="p-8 md:p-16 max-w-4xl space-y-32 pb-32">
              
              {/* 2. Problem Statement */}
              <section id="problem" className="scroll-mt-16">
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-8 drop-shadow-md">Untangling the Mess</h2>
                <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 leading-relaxed max-w-3xl space-y-6">
                  <p>
                    When I joined the team, the design infrastructure was highly fragmented. Designers were spending 40% of their time recreating components instead of focusing on user experience. The primary challenge was to establish a single source of truth without disrupting ongoing sprints.
                  </p>
                </div>
              </section>

              {/* 3. AI Workflow & Markers */}
              <section id="ai-workflow" className="scroll-mt-16">
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-8 drop-shadow-md">Supercharging with AI</h2>
                <p className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 leading-relaxed max-w-3xl mb-12">
                  I integrated generative models to accelerate our ideation and documentation phases. However, maintaining quality control meant navigating around AI hallucinations and generic outputs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Positive AI Usage */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 text-emerald-400">
                      <Sparkles size={24} />
                      <h3 className="font-display font-bold text-xl tracking-tight">Workflow Acceleration</h3>
                    </div>
                    <p className="font-sans text-base sm:text-lg font-normal tracking-tight text-white/70 leading-relaxed relative z-10">
                      Used Claude to quickly draft component documentation and map out edge cases in the design system, cutting down our documentation time by three weeks.
                    </p>
                  </div>

                  {/* AI BS Detection (Warning) */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <AlertTriangle size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 text-amber-400">
                      <AlertTriangle size={24} />
                      <h3 className="font-display font-bold text-xl tracking-tight">Hallucination Mitigation</h3>
                    </div>
                    <p className="font-sans text-base sm:text-lg font-normal tracking-tight text-white/70 leading-relaxed relative z-10">
                      The AI generated inconsistent color token mappings. I had to manually intervene and establish strict JSON schemas to force the AI to adhere to our design tokens.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. The Solution */}
              <section id="solution" className="scroll-mt-16">
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-8 drop-shadow-md">The Final Deliverable</h2>
                <div className="aspect-video w-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden mb-12">
                  <img src={project.image} alt="Solution" className="w-full h-full object-cover" />
                </div>
                <div className="font-sans text-lg sm:text-xl font-normal tracking-tight text-white/70 leading-relaxed max-w-3xl space-y-6">
                  <p>
                    The resulting system was a fully componentized Figma library, synced directly to our frontend repository via Design Tokens. This allowed developers to consume design updates instantly.
                  </p>
                </div>
              </section>

              {/* 5. Impact */}
              <section id="impact" className="scroll-mt-16">
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-8 drop-shadow-md">Measuring the Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white mb-3 drop-shadow-md">40<span className="text-3xl text-white/50">%</span></div>
                    <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">Increase in Velocity</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white mb-3 drop-shadow-md">0</div>
                    <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">Design Debt Added</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-white mb-3 drop-shadow-md">12<span className="text-3xl text-white/50">+</span></div>
                    <div className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">Teams Adopted</div>
                  </div>
                </div>
              </section>

            </div>
          </div>
    </motion.div>
  );
}

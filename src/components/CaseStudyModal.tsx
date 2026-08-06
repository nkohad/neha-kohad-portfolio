import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, AlertTriangle, ArrowUpRight, Building2, Check, Quote, Search, Route, Library, Users, PanelsTopLeft, MessageSquare, Table2, Compass, EyeOff, Layers, Headphones, GitBranch, BarChart2, Zap, Award, UserPlus, Briefcase, Bot, Mail, X } from 'lucide-react';
import { CASE_STUDY_CONTENT } from '../data/caseStudies';
import { CASE_STUDY_SECTIONS } from './LeftSidebar';

import videoIntentPaths from '../assets/feature-videos/Intent-based-pathways.mp4';
import videoNewToHcd from '../assets/feature-videos/New-to-HCD.mp4';
import videoAiSearch from '../assets/feature-videos/AI-Search.mp4';
import videoGetInspired from '../assets/feature-videos/Get-Inspired.mp4';

import wfBeforeHome from '../assets/wireframes/Home Page.svg';
import wfBeforeNewToHcd from '../assets/wireframes/New to HCD.svg';
import wfBeforeGetInspired from '../assets/wireframes/Get Inspired.svg';
import wfBeforeConsulting from '../assets/wireframes/Request Consulting.svg';
import wfBeforeCertified from '../assets/wireframes/Get Certified.svg';
import wfBeforeAbout from '../assets/wireframes/About.svg';
import wfAfterHome from '../assets/wireframes/New - Home page.svg';
import wfAfterNewToHcd from '../assets/wireframes/NEW - New to HCD.svg';
import wfAfterGetInspired from '../assets/wireframes/New - Get Inspired.svg';
import wfAfterConsulting from '../assets/wireframes/NEW - Request Consulting.svg';
import wfAfterCertified from '../assets/wireframes/New - Training.svg';
import wfAfterAbout from '../assets/wireframes/New - About.svg';

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
const audienceGroupIcons = [EyeOff, UserPlus, Briefcase];
const conceptIcons = [Bot, Mail, Building2];
const COMING_SOON = 'coming-soon';
const featureVideos: (string | null)[] = [
  videoAiSearch,
  videoIntentPaths,
  COMING_SOON,
  videoGetInspired,
];

const featureToneClasses = [
  'from-sky-500/30 via-cyan-400/15 to-emerald-400/20',
  'from-fuchsia-500/25 via-rose-400/15 to-amber-300/20',
  'from-violet-500/25 via-blue-400/15 to-slate-100/20',
  'from-lime-400/25 via-emerald-500/15 to-teal-300/20',
  'from-orange-400/25 via-red-400/15 to-pink-300/20',
];

const COMPARE_PAGES = [
  { label: 'Home Page',     before: wfBeforeHome,       after: wfAfterHome },
  { label: 'New to HCD',   before: wfBeforeNewToHcd,   after: wfAfterNewToHcd },
  { label: 'Get Inspired',  before: wfBeforeGetInspired, after: wfAfterGetInspired },
  { label: 'Consulting',    before: wfBeforeConsulting,  after: wfAfterConsulting },
  { label: 'Get Certified', before: wfBeforeCertified,  after: wfAfterCertified },
  { label: 'About',         before: wfBeforeAbout,      after: wfAfterAbout },
];

export function CaseStudyModal({ project, allProjects, currentIndex, onClose, onSelectProject, activeSection, onSectionChange }: CaseStudyModalProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const hasInteractedRef = useRef(false);
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);
  const [stage2Active, setStage2Active] = useState(0);
  const [stage3Active, setStage3Active] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [sliderPage, setSliderPage] = useState(0);
  const [compareContentHeight, setCompareContentHeight] = useState<number | null>(null);
  const isDraggingRef = useRef(false);
  const compareRef = useRef<HTMLDivElement>(null);
  const compareScrollerRef = useRef<HTMLDivElement>(null);
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

  // Before/after slider drag handlers — wired up once, guard via ref
  useEffect(() => {
    const move = (clientX: number) => {
      if (!isDraggingRef.current || !compareRef.current) return;
      const rect = compareRef.current.getBoundingClientRect();
      const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      setSliderPos(pct);
    };
    const stop = () => { isDraggingRef.current = false; };
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); move(e.touches[0].clientX); };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  // Measure both images for the current page and use the taller one as the content height
  useEffect(() => {
    if (compareScrollerRef.current) compareScrollerRef.current.scrollTop = 0;
    const page = COMPARE_PAGES[sliderPage];
    const containerWidth = compareRef.current?.clientWidth ?? 800;
    let loaded = 0;
    let maxAspect = 0;

    const checkDone = () => {
      loaded++;
      if (loaded === 2) setCompareContentHeight(maxAspect * containerWidth);
    };

    for (const src of [page.before, page.after]) {
      const img = new window.Image();
      img.onload = () => {
        if (img.naturalWidth > 0) {
          const aspect = img.naturalHeight / img.naturalWidth;
          if (aspect > maxAspect) maxAspect = aspect;
        }
        checkDone();
      };
      img.onerror = checkDone;
      img.src = src;
    }
  }, [sliderPage]);

  // Start auto-play when the solution section enters the viewport (first time only)
  useEffect(() => {
    const el = document.getElementById('solution');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInteractedRef.current) {
          setActiveFeature(0);
          setIsAutoPlaying(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance past "Coming Soon" slots (no video to signal end)
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (featureVideos[activeFeature] !== COMING_SOON) return;
    const total = content?.solutions?.features?.length ?? 0;
    if (activeFeature >= total - 1) return;
    const t = setTimeout(() => setActiveFeature(f => f + 1), 3000);
    return () => clearTimeout(t);
  }, [activeFeature, isAutoPlaying, content]);

  const handleFeatureEnded = () => {
    if (!isAutoPlaying) return;
    const total = content?.solutions?.features?.length ?? 0;
    if (activeFeature < total - 1) setActiveFeature(f => f + 1);
  };

  const handleFeatureInteract = (i: number) => {
    hasInteractedRef.current = true;
    setIsAutoPlaying(false);
    setActiveFeature(i);
  };

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
                  <p className="font-sans text-xl sm:text-xl font-normal text-white/70 light:text-zinc-600 leading-relaxed">
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
                        <div className="text-lg sm:text-base text-white/80 light:text-zinc-700 font-medium leading-snug">{m.value}</div>
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
                  <div className="flex flex-col gap-10">
                                        {/* 3 scale metrics */}
                    {content.overview?.metrics && (
                      <div className="grid grid-cols-3 gap-3">
                        {content.overview.metrics.map((metric, i) => {
                          const gradients = [
                            'from-violet-500/45 via-blue-500/20 to-transparent',
                            'from-orange-400/45 via-red-500/25 to-transparent',
                            'from-cyan-300/35 via-slate-400/20 to-transparent',
                          ];
                          return (
                            <motion.div
                              key={metric.value}
                              whileHover={{ y: -4 }}
                              transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                              className="group relative overflow-hidden rounded-3xl border flex flex-col bg-white/[0.04] light:bg-black/[0.03] text-white light:text-zinc-900 border-white/10 light:border-black/10"
                            >
                              {/* Top: gradient + big number */}
                              <div className={`bg-gradient-to-br ${gradients[i]} flex items-end p-6 min-h-[110px]`}>
                                <span className="font-display font-black text-6xl tracking-tighter leading-none text-white light:text-zinc-900">{metric.value}</span>
                              </div>
                              {/* Bottom: label + description */}
                              <div className="flex flex-col gap-1 p-6 flex-1 bg-[#0d0d0d] light:bg-white">
                                <h3 className="font-display text-xl tracking-tight text-white light:text-zinc-900">{metric.label}</h3>
                                <p className="font-sans text-lg leading-snug text-white/50 light:text-zinc-500">{metric.description}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                    {/* Problem framing */}
                    <div className="flex flex-col gap-5">
                      <h2 className="font-display font-bold text-4xl tracking-tight text-white light:text-zinc-900 drop-shadow-md">
                        {content.challenge.heading}
                      </h2>
                      {/* {content.overview?.hook && (
                        <p className="font-sans text-xl text-white/55 light:text-zinc-500 leading-relaxed max-w-3xl">
                          {content.overview.hook}
                        </p>
                      )} */}
                      {content.challenge.paragraphs.map((p, i) => (
                        <p key={i} className="font-sans text-lg text-white/65 light:text-zinc-600 leading-relaxed ">{p}</p>
                      ))}
                    </div>
                       {/* As-is workflow flowchart */}
                    <div>
                      {/* <p className="font-sans text-xs font-semibold tracking-widest uppercase text-white/30 light:text-zinc-400 mb-6">As-is workflow</p> */}

                      {/* Desktop: horizontal flow */}
                      <div className="hidden sm:flex items-start gap-2">
                        <div className="flex-1 bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-5 flex flex-col gap-3">
                          <Users size={20} className="text-white/40 light:text-zinc-400" />
                          <p className="font-sans text-lg font-medium text-white/75 light:text-zinc-700 leading-snug">Employee wants to access an HCD resource</p>
                        </div>
                        <ChevronRight size={18} className="text-white/20 light:text-zinc-300 mt-8 shrink-0" />
                        <div className="flex-1 bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-5 flex flex-col gap-3">
                          <Search size={20} className="text-white/40 light:text-zinc-400" />
                          <p className="font-sans text-lg font-medium text-white/75 light:text-zinc-700 leading-snug">Tries finding the resource on their own</p>
                        </div>
                        <ChevronRight size={18} className="text-white/20 light:text-zinc-300 mt-8 shrink-0" />
                        <div className="flex-1 bg-rose-500/[0.08] border border-rose-500/40 rounded-2xl p-5 flex flex-col gap-3 relative">
                          {/* <div className="absolute -top-3 left-4">
                            <span className="bg-rose-500 text-white text-sm font-bold tracking-wider uppercase px-2.5 py-1 ">Pain Point</span>
                          </div> */}
                          <AlertTriangle size={20} className="text-rose-400 light:text-rose-600" />
                          <p className="font-sans text-lg font-medium text-rose-300/90 light:text-rose-700 leading-snug">Fails. Reaches out to HCD@Cox</p>
                        </div>
                        <ChevronRight size={18} className="text-white/20 light:text-zinc-300 mt-8 shrink-0" />
                        <div className="flex-1 bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-5 flex flex-col gap-3">
                          <Layers size={20} className="text-white/40 light:text-zinc-400" />
                          <p className="font-sans text-lg font-medium text-white/75 light:text-zinc-700 leading-snug">HCD team manually curates and shares links</p>
                        </div>
                      </div>

                      {/* Mobile: vertical flow */}
                      <div className="flex sm:hidden flex-col items-center gap-0">
                        <div className="w-full bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-4 flex items-center gap-3">
                          <Users size={18} className="text-white/40 light:text-zinc-400 shrink-0" />
                          <p className="font-sans text-sm font-medium text-white/75 light:text-zinc-700 leading-snug">Employee wants to access an HCD resource</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 light:text-zinc-300 rotate-90 my-1" />
                        <div className="w-full bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-4 flex items-center gap-3">
                          <Search size={18} className="text-white/40 light:text-zinc-400 shrink-0" />
                          <p className="font-sans text-sm font-medium text-white/75 light:text-zinc-700 leading-snug">Tries finding the resource on their own</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 light:text-zinc-300 rotate-90 my-1" />
                        <div className="w-full bg-rose-500/[0.08] border border-rose-500/40 rounded-2xl p-4 flex items-center gap-3 relative mt-3">
                          <div className="absolute -top-3 left-4">
                            <span className="bg-rose-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">Pain Point</span>
                          </div>
                          <AlertTriangle size={18} className="text-rose-400 light:text-rose-600 shrink-0" />
                          <p className="font-sans text-sm font-medium text-rose-300/90 light:text-rose-700 leading-snug">Fails. Messages the HCD Team</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 light:text-zinc-300 rotate-90 my-1" />
                        <div className="w-full bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 rounded-2xl p-4 flex items-center gap-3">
                          <Layers size={18} className="text-white/40 light:text-zinc-400 shrink-0" />
                          <p className="font-sans text-sm font-medium text-white/75 light:text-zinc-700 leading-snug">HCD team manually curates and shares links</p>
                        </div>
                      </div>
                    </div>
                    {/* Design challenge callout */}
                    {content.challenge.designChallenge && (
                      <div className="rounded-3xl bg-white light:bg-zinc-900 p-7">
                        <h3 className="font-display text-xl font-bold uppercase text-black/55 light:text-white/55 mb-4">Design Challenge</h3>
                        <p className="font-medium text-lg text-black light:text-white tracking-tight leading-snug">
                          {content.challenge.designChallenge}
                        </p>
                      </div>
                    )}



                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-4xl tracking-tight text-white light:text-zinc-900 mb-8 drop-shadow-md">Untangling the Mess</h2>
                    <div className="font-sans text-xl font-normal tracking-tight text-white/70 light:text-zinc-600 leading-relaxed max-w-3xl space-y-6">
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
                              onMouseEnter={() => handleFeatureInteract(i)}
                              onClick={() => handleFeatureInteract(i)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFeatureInteract(i); }}
                              role="button"
                              tabIndex={0}
                              className={`py-4 border-t cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded ${isActive ? 'border-white/25 light:border-black/20' : 'border-white/10 light:border-black/10'}`}
                            >
                              <div className={`flex items-center gap-2 font-display text-2xl font-medium mb-1.5 transition-colors duration-300 ${isActive ?'text-emerald-400' : 'text-white/55 light:text-zinc-500'}`}>
                                <Icon size={20} className="shrink-0 opacity-70" />
                                {feature.title}
                              </div>
                              <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="font-sans text-lg text-white/60 light:text-zinc-600 leading-relaxed pt-1">{feature.description}</p>
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
                          <AnimatePresence mode="wait">
                            {featureVideos[activeFeature] === COMING_SOON ? (
                              <motion.div
                                key={`coming-soon-${activeFeature}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className={`absolute inset-0 bg-gradient-to-br ${featureToneClasses[activeFeature % featureToneClasses.length]} flex items-center justify-center`}
                              >
                                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/35">Coming Soon</span>
                              </motion.div>
                            ) : featureVideos[activeFeature] ? (
                              <motion.video
                                key={activeFeature}
                                src={featureVideos[activeFeature]!}
                                autoPlay
                                muted
                                loop={!isAutoPlaying}
                                playsInline
                                onEnded={handleFeatureEnded}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <motion.div
                                key={`placeholder-${activeFeature}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45 }}
                                className={`absolute inset-0 bg-gradient-to-br ${featureToneClasses[activeFeature % featureToneClasses.length]}`}
                              />
                            )}
                          </AnimatePresence>
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
                    <p className="font-sans text-lg text-white/55 light:text-zinc-600 leading-relaxed mb-10">
                      {content.stages[0].validating}
                    </p>

                    {/* Mobile: editorial list with inline quotes */}
                    <div className="md:hidden flex flex-col divide-y divide-white/[0.07] light:divide-black/[0.07]">
                      {content.stages[0].insights.map((item, i) => (
                        <div key={i} className="py-6 first:pt-0 flex gap-5">
                          <span className="font-display font-bold text-2xl leading-none tabular-nums shrink-0 text-white/15 light:text-black/10 select-none">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="flex flex-col gap-2.5">
                            <h3 className="font-display font-bold text-base leading-snug tracking-tight text-white light:text-zinc-900">
                              {item.phrase}
                            </h3>
                            <p className="font-sans text-sm text-white/50 light:text-zinc-600 leading-relaxed">{item.insight}</p>
                            {item.quote && (
                              <div className="border-l-2 border-white/15 light:border-black/[0.12] pl-4 mt-1">
                                <p className="font-sans text-sm italic text-white/38 light:text-zinc-500 leading-relaxed">{item.quote}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: interactive split — hover insight to swap quote */}
                    {(() => {
                      const numColors  = ['text-violet-400', 'text-amber-400', 'text-cyan-400', 'text-emerald-400'];
                      const borders    = ['border-violet-500/30', 'border-amber-500/30', 'border-cyan-500/30', 'border-emerald-500/30'];
                      const iconColors = ['text-violet-400/70', 'text-amber-400/70', 'text-cyan-400/70', 'text-emerald-400/70'];
                      const activeIdx  = hoveredInsight ?? 0;
                      const activeItem = content.stages[0].insights[activeIdx];
                      const lastDash   = activeItem.quote?.lastIndexOf(' — ') ?? -1;
                      const quoteBody  = lastDash > -1
                        ? activeItem.quote.slice(0, lastDash).replace(/^"/, '').replace(/"$/, '')
                        : activeItem.quote ?? '';
                      const attribution = lastDash > -1 ? activeItem.quote.slice(lastDash + 3) : '';

                      return (
                        <div className="hidden md:flex gap-8 lg:gap-12 items-start">
                          {/* Left: insight rows */}
                          <div className="w-[70%] shrink-0 flex flex-col divide-y divide-white/[0.07] light:divide-black/[0.07]">
                            {content.stages[0].insights.map((item, i) => {
                              const isActive = activeIdx === i;
                              return (
                                <div
                                  key={i}
                                  className="group py-5 first:pt-0 flex gap-4 items-start cursor-default select-none"
                                  onMouseEnter={() => setHoveredInsight(i)}
                                  onMouseLeave={() => setHoveredInsight(null)}
                                >
                                  <span className={`font-display font-bold text-xl leading-none tabular-nums shrink-0 mt-0.5 transition-colors duration-200 ${isActive ? numColors[i] : 'text-white/25 light:text-black/20'}`}>
                                    {String(i + 1).padStart(2, '0')}
                                  </span>
                                  <div className="flex flex-col gap-1.5 flex-1">
                                    <h3 className="font-display font-bold text-2xl leading-snug tracking-tight text-white light:text-zinc-900">
                                      {item.phrase}
                                    </h3>
                                    <p className="font-sans text-lg text-white/55 light:text-zinc-600 leading-relaxed">
                                      {item.insight}
                                    </p>
                                  </div>
                                  <Quote
                                    size={13}
                                    className={`shrink-0 mt-1.5 transition-colors duration-200 ${
                                      isActive
                                        ? numColors[i]
                                        : 'text-white/20 group-hover:text-white/50 light:text-black/12 light:group-hover:text-black/30'
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>

                          {/* Right: animated quote panel */}
                          <div className="flex-1 min-h-0">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className={`rounded-3xl border ${borders[activeIdx]} bg-white/[0.03] light:bg-black/[0.02] p-8`}
                              >
                                <Quote size={22} className={`${iconColors[activeIdx]} mb-5`} />
                                <p className="font-sans text-lg leading-relaxed text-white/80 light:text-zinc-800 mb-5">
                                  "{quoteBody}"
                                </p>
                                {attribution && (
                                  <p className="font-display text-base text-white/35 light:text-zinc-400">
                                   {attribution}
                                  </p>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })()}

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

              {/* Mapping the Audience */}
              {content?.audienceMapping && (
                <section id="audience" className="scroll-mt-16">
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-6 drop-shadow-md">
                    {content.audienceMapping.heading}
                  </h2>
                  {content.audienceMapping.paragraphs.map((p, i) => (
                    <p key={i} className="font-sans text-xl text-white/60 light:text-zinc-600 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
{/* 
                  <p className=" text-xl tracking-widest text-white/55 light:text-zinc-500 mt-6 mb-4">
                    {content.audienceMapping.groupsIntro}
                  </p> */}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {content.audienceMapping.groups.map((group, i) => {
                      const GroupIcon = audienceGroupIcons[i] || Users;
                      return (
                        <motion.div
                          key={group.title}
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                          className="rounded-3xl border border-white/10 light:border-black/10 bg-white/[0.04] light:bg-black/[0.03] p-6 flex flex-col gap-3"
                        >
                          <GroupIcon size={22} className="text-white/50 light:text-zinc-500" />
                          <h3 className="font-display font-bold text-2xl leading-snug tracking-tight text-white light:text-zinc-900">
                            {group.title}
                          </h3>
                          <p className="font-sans text-lg text-white/60 light:text-zinc-600 leading-relaxed">
                            {group.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
{/* 
                  <p className="font-sans text-xl text-white/60 light:text-zinc-600 leading-relaxed mb-12 max-w-3xl">
                    {content.audienceMapping.closing}
                  </p> */}

                </section>
              )}

              {content?.audienceMapping?.concepts && (
                <section id="concepts" className="scroll-mt-16">
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white light:text-zinc-900 mb-6 drop-shadow-md">
                    {content.audienceMapping.conceptsHeading}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.audienceMapping.concepts.map((concept, i) => {
                      const ConceptIcon = conceptIcons[i] || Sparkles;
                      const won = concept.outcome === 'won';
                      return (
                        <motion.div
                          key={concept.name}
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                          className={`rounded-3xl border overflow-hidden flex flex-col ${
                            won
                              ? 'bg-white text-black light:bg-zinc-900 light:text-white border-white/70 light:border-zinc-900'
                              : 'bg-white/[0.04] light:bg-black/[0.03] text-white light:text-zinc-900 border-white/10 light:border-black/10'
                          }`}
                        >
                          {/* Sketch frame — browser chrome window */}
                          {(() => {
                            const conceptUrls = [
                              'mascot-agent · concept',
                              'email-response · concept',
                              'hcd.coxenterprises.com',
                            ];
                            const wireframeSrc = concept.sketch;
                            const urlLabel = conceptUrls[i] ?? 'concept · sketch';
                            return (
                              <div className={`w-full flex flex-col border-b ${won ? 'border-black/10 light:border-white/10' : 'border-white/10 light:border-black/10'}`}>
                                {/* Chrome toolbar */}
                                <div className={`px-3 py-2 flex items-center gap-3 shrink-0 ${won ? 'bg-zinc-100 light:bg-[#232325]' : 'bg-[#232325] light:bg-zinc-200'}`}>
                                  <div className="flex gap-1.5 shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                  </div>
                                  <div className={`flex-1 h-4 rounded text-[9px] font-mono flex items-center px-2 ${won ? 'bg-black/10 text-black/30 light:bg-white/10 light:text-white/30' : 'bg-black/20 text-white/25 light:bg-black/8 light:text-black/25'}`}>
                                    {urlLabel}
                                  </div>
                                </div>
                                {/* Wireframe content */}
                                <div className={`aspect-[4/3] w-full overflow-hidden ${won ? 'bg-white' : 'bg-[#f5f5f7]'}`}>
                                  {wireframeSrc ? (
                                    <img
                                      src={wireframeSrc}
                                      alt={`${concept.name} wireframe`}
                                      className="w-full h-full object-cover object-top"
                                      draggable={false}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <span className={`font-mono text-[10px] uppercase tracking-widest text-center px-4 ${won ? 'text-black/25' : 'text-white/20'}`}>
                                        {concept.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Card content */}
                          <div className="p-6 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <ConceptIcon size={22} className={won ? 'text-black/50 light:text-white/50' : 'text-white/50 light:text-zinc-500'} />
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1  text-[11px] font-bold uppercase tracking-widest ${
                                  won
                                    ? 'bg-emerald-400/15 text-emerald-600 light:text-emerald-400'
                                    : 'bg-rose-400/10 text-rose-500 light:text-rose-400'
                                }`}
                              >
                                {won ? <Check size={12} /> : <X size={12} />}
                                {concept.verdict}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-2xl tracking-tight mb-1.5">{concept.name}</h4>
                              <p className={`font-sans text-lg leading-relaxed ${won ? 'text-black/60 light:text-white/60' : 'text-white/60 light:text-zinc-500'}`}>
                                {concept.description}
                              </p>
                            </div>
                            {concept.bullets && concept.bullets.length > 0 ? (
                              <ul className={`pt-3 border-t space-y-1.5 ${won ? 'border-black/10 light:border-white/10' : 'border-white/10 light:border-black/10'}`}>
                                {concept.bullets.map((b, bi) => (
                                  <li key={bi} className={`font-sans text-base leading-relaxed flex gap-2 ${b.type === '+' ? 'text-emerald-500 light:text-emerald-400' : won ? 'text-black/50 light:text-white/50' : 'text-rose-400 light:text-rose-400'}`}>
                                    <span className="shrink-0 font-mono font-bold">{b.type}</span>
                                    <span className={won ? 'text-black/50 light:text-white/50' : 'text-white/45 light:text-zinc-500'}>{b.text}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className={`font-sans text-base leading-relaxed pt-3 border-t ${won ? 'border-black/10 light:border-white/10 text-black/50 light:text-white/50' : 'border-white/10 light:border-black/10 text-white/45 light:text-zinc-500'}`}>
                                {concept.detail}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Stage 2: Before/After Wireframe Comparison */}
              <section id="stage-2" className="scroll-mt-0">
                <div className="-mx-8 md:-mx-16">
                  <div className="min-h-screen bg-[#080808] light:bg-zinc-950 flex flex-col px-8 md:px-16 pt-16 pb-10">

                    {/* Compact header */}
                    <div className="flex flex-col gap-3 mb-10 ">
                      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white drop-shadow-md leading-snug">
                        {stage2?.title}
                      </h2>
                      <p className="font-sans text-lg text-white/50 leading-relaxed">
                        {stage2?.validating}
                      </p>
                    </div>

                    {/* Laptop + page navigation — fills remaining space */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-6">

                      {/* MacBook mockup */}
                      <div className="w-full max-w-[900px]">
                        {/* Screen body */}
                        <div className="rounded-2xl bg-[#1d1d1f] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08]">
                          {/* Camera notch */}
                          <div className="flex justify-center pb-[5px]">
                            <div className="w-[6px] h-[6px] rounded-full bg-[#3a3a3c]" />
                          </div>

                          {/* Screen — fixed viewport, scrollable content inside */}
                          <div
                            ref={compareRef}
                            className="aspect-[16/10] rounded-[10px] overflow-hidden relative select-none bg-white"
                          >
                            {/* Scrollable content wrapper */}
                            <div ref={compareScrollerRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                              <div
                                className="relative w-full"
                                style={compareContentHeight != null ? { height: compareContentHeight } : undefined}
                              >
                                {/* BEFORE — renders at full natural height */}
                                <img
                                  src={COMPARE_PAGES[sliderPage].before}
                                  alt={`${COMPARE_PAGES[sliderPage].label} — before`}
                                  className="w-full h-auto block pointer-events-none"
                                  draggable={false}
                                />

                                {/* AFTER — same natural height, clipped from left */}
                                <div
                                  className="absolute inset-0 bg-white"
                                  style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                                >
                                  <img
                                    src={COMPARE_PAGES[sliderPage].after}
                                    alt={`${COMPARE_PAGES[sliderPage].label} — after`}
                                    className="w-full h-auto block pointer-events-none"
                                    draggable={false}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Divider line — non-scrolling overlay */}
                            <div
                              className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none z-10"
                              style={{ left: `${sliderPos}%` }}
                            />

                            {/* Drag handle — stays centered in the viewport, not the content */}
                            <div
                              className="absolute top-1/2 z-20 flex items-center gap-0.5 bg-white rounded-full px-3 py-2 shadow-xl cursor-ew-resize"
                              style={{ left: `${sliderPos}%`, transform: 'translate(-50%, -50%)' }}
                              onMouseDown={(e) => { e.preventDefault(); isDraggingRef.current = true; }}
                              onTouchStart={(e) => { isDraggingRef.current = true; }}
                            >
                              <ChevronLeft size={12} className="text-zinc-600" />
                              <ChevronRight size={12} className="text-zinc-600" />
                            </div>

                            {/* Labels — pinned to viewport corners */}
                            <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-zinc-900/80 backdrop-blur-sm text-white text-base font-bold uppercase tracking-widest pointer-events-none">
                              Before
                            </div>
                            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md bg-zinc-900/80 backdrop-blur-sm text-white text-base font-bold uppercase tracking-widest pointer-events-none">
                              After
                            </div>
                          </div>
                        </div>

                        {/* Keyboard base */}
                        <div className="w-[94%] mx-auto h-[5px] bg-[#1c1c1e] rounded-b-sm" />
                        <div className="w-full h-[12px] bg-[#141414] rounded-b-2xl shadow-2xl" />
                      </div>

                      {/* Page navigation */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => { setSliderPage(p => Math.max(0, p - 1)); setSliderPos(50); }}
                          disabled={sliderPage === 0}
                          className="w-8 h-8  border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Previous page"
                        >
                          <ChevronLeft size={15} />
                        </button>

                        <div className="flex items-center gap-1.5">
                          {COMPARE_PAGES.map((page, i) => (
                            <button
                              key={i}
                              onClick={() => { setSliderPage(i); setSliderPos(50); }}
                              className={`px-3 py-1.5  text-base font-medium transition-all duration-200 ${
                                i === sliderPage
                                  ? 'bg-white text-black'
                                  : 'text-white/40 hover:text-white/70 hover:bg-white/8'
                              }`}
                            >
                              {page.label}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => { setSliderPage(p => Math.min(COMPARE_PAGES.length - 1, p + 1)); setSliderPos(50); }}
                          disabled={sliderPage === COMPARE_PAGES.length - 1}
                          className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Next page"
                        >
                          <ChevronRight size={15} />
                        </button>
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
                            <h3 className="font-display font-bold text-2xl tracking-tight text-white light:text-zinc-900 mb-1">Enterprise Scale</h3>
                            <p className="font-sans text-lg leading-snug text-white/50 light:text-zinc-500">Employees across Cox Enterprises with access to self-service HCD guidance.</p>
                          </div>
                        </div>

                        {/* Qualitative outcome cards — flex-1 so they fill remaining height equally */}
                        <div className="flex flex-col gap-3 flex-1">
                          {content.impact.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 flex-1">
                              <Check size={15} className="text-emerald-400 light:text-emerald-600 shrink-0" />
                              <p className="font-sans text-lg text-white/70 light:text-zinc-600 leading-snug">{outcome}</p>
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
                                  <h3 className="font-display font-bold text-2xl tracking-tight text-white light:text-zinc-900 mb-1">{m.label}</h3>
                                  <p className="font-sans text-lg leading-snug text-white/50 light:text-zinc-500">{m.description}</p>
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
                            <div className="font-sans text-lg sm:text-lg font-normal text-white/70 light:text-zinc-600 leading-relaxed space-y-6">
                              {content.reflection.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                              ))}
                            </div>
                            <p className="font-display font-medium text-xl sm:text-lg text-white light:text-zinc-900 tracking-tight leading-snug mt-8">
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

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { Figma, PenTool, Users, Sparkles, Bot, Code, ArrowRight, ArrowUpRight, Building2, MessageSquare, Table2 } from 'lucide-react';
import { NavLiquidGlass } from './components/NavLiquidGlass';
import SplashCursor from './components/SplashCursor';
import { CaseStudyModal } from './components/CaseStudyModal';
import { useActiveTab } from './components/NavLinks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useTheme } from './components/ThemeContext';

const IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574169208538-4f45163ade8d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005191834-032c524b07fb?q=80&w=800&auto=format&fit=crop",
];

const PROJECTS = [
  // Sponsored (Large Projects)
  {
    image: IMAGES[0],
    title: "Cox Design Hub",
    impact: "Centralized design resources and standards for enterprise teams",
    type: "Sponsored",
    company: "Cox Enterprises",
    category: "Web Platform",
    tools: ["Figma", "Miro", "Teams", "Excel", "Claude"],
    cta: "View Case Study"
  },
  {
    image: IMAGES[2],
    title: "VM Prototyping Agent",
    impact: "Figma-free prototyping with absolute design system accuracy",
    type: "Internship",
    company: "Yodlee",
    category: "AI Workflow",
    tools: ["Gemini", "Code", "Bot"],
    cta: "View Case Study",
    status: "nda"
  },
  {
    image: IMAGES[4],
    title: "Open Finance Platform",
    impact: "Increasing outreach through a redesigned open finance landing experience",
    type: "Internship",
    company: "Yodlee",
    category: "Website",
    tools: ["Figma", "Code"],
    cta: "Explore Site",
    status: "nda"
  },
  {
    image: IMAGES[3],
    title: "Open Finance Onboarding",
    impact: "API-ready onboarding for data providers and financial institutions",
    type: "Internship",
    company: "Yodlee",
    category: "Web App",
    tools: ["Figma", "UserTesting"],
    cta: "View Details",
    status: "nda"
  },
  {
    image: IMAGES[1],
    title: "AI Workflows for Internal Tools",
    impact: "Agentic AI workflow streamlining internal tool development",
    type: "Master's Project",
    company: "Verizon Connect",
    category: "AI Agent",
    tools: ["Claude", "Bot", "Figma"],
    cta: "Explore Workflow",
    status: "fall-start"
  },
  // AI Experiments
  {
    image: IMAGES[5],
    title: "SpiceMix",
    impact: "AI taste-mixer for designers to curate authentic inspiration blends",
    type: "AI Experiment",
    company: "Personal",
    category: "AI App",
    tools: ["Gemini", "Claude", "Figma"],
    cta: "Mix Spices",
    status: "coming-soon"
  },
  {
    image: IMAGES[6],
    title: "Flower Memories",
    impact: "Identify flowers and capture emotional memories tied to specific moments",
    type: "AI Experiment",
    company: "Personal",
    category: "Mobile Concept",
    tools: ["Gemini", "Figma"],
    cta: "View Concept",
    status: "coming-soon"
  },
  {
    image: IMAGES[7],
    title: "Drama Vault",
    impact: "Documenting personal journeys through K-Dramas and C-Dramas",
    type: "AI Experiment",
    company: "Personal",
    category: "Web Tracker",
    tools: ["Figma", "Code"],
    cta: "Open Vault",
    status: "coming-soon"
  },
  {
    image: IMAGES[8],
    title: "Accessible Warranty Tracker",
    impact: "Paperwork-free warranty management designed for senior accessibility",
    type: "AI Experiment",
    company: "Personal",
    category: "AI Utility",
    tools: ["Claude", "Figma", "UserTesting"],
    cta: "View Details",
    status: "coming-soon"
  },
  {
    image: IMAGES[9],
    title: "Mindset Memos: Untangled",
    impact: "A streamlined approach to mental organization and object tracking",
    type: "AI Experiment",
    company: "Personal",
    category: "Concept",
    tools: ["Miro", "Figma"],
    cta: "Untangle",
    status: "coming-soon"
  },
  {
    image: IMAGES[10],
    title: "11Labs 3D Motion",
    impact: "Exploring scroll animations and 3D motion design with AI video",
    type: "AI Experiment",
    company: "Personal",
    category: "Motion Design",
    tools: ["Code", "Bot"],
    cta: "Play Video",
    status: "coming-soon"
  }
];

const CARDS = PROJECTS;

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const TOOL_ICONS: Record<string, React.ReactNode> = {
  "Figma": <img src="https://cdn.simpleicons.org/figma" alt="Figma" className="w-3.5 h-3.5" />,
  "Miro": <img src="https://cdn.simpleicons.org/miro" alt="Miro" className="w-3.5 h-3.5" />,
  "Teams": <MessageSquare size={14} />,
  "Excel": <Table2 size={14} />,
  "UserTesting": <Users size={14} />,
  "Gemini": <img src="https://cdn.simpleicons.org/googlegemini" alt="Gemini" className="w-3.5 h-3.5" />,
  "Claude": <img src="https://cdn.simpleicons.org/anthropic" alt="Claude" className="w-3.5 h-3.5" />,
  "Outset": <Code size={14} />,
  "Bot": <Bot size={14} />
};

export default function App() {
  const { theme } = useTheme();
  const workSectionRef = React.useRef<HTMLDivElement>(null);
  const introScrollControlsRef = React.useRef<{ stop: () => void } | null>(null);
  const cardPanelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<'spiral' | 'grid'>('spiral');
  const [detailViewStyle, setDetailViewStyle] = useState<'inline' | 'modal' | 'drawer'>('inline');
  const [bgStyle, setBgStyle] = useState<'grid' | 'splash-rainbow' | 'splash-red' | 'splash-blue'>('splash-rainbow');
  
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const activeTab = useActiveTab();
  const [radius, setRadius] = useState(isMobile ? 350 : 760);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [workProgress, setWorkProgress] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/work/')) {
      const slug = path.replace('/work/', '').replace(/\/$/, '');
      const index = PROJECTS.findIndex(p => slugify(p.title) === slug);
      if (index !== -1) {
        setActiveCaseStudy(index);
      }
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/work/')) {
        const currentSlug = currentPath.replace('/work/', '').replace(/\/$/, '');
        const currentIndex = PROJECTS.findIndex(p => slugify(p.title) === currentSlug);
        setActiveCaseStudy(currentIndex !== -1 ? currentIndex : null);
      } else {
        setActiveCaseStudy(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activeCaseStudy !== null) {
      const project = PROJECTS[activeCaseStudy];
      window.history.pushState(null, '', `/work/${slugify(project.title)}`);
    } else {
      if (window.location.pathname.startsWith('/work/')) {
        window.history.pushState(null, '', '/');
      }
    }
  }, [activeCaseStudy]);

  useEffect(() => {
    if (activeCaseStudy !== null) {
      document.title = `Neha Kohad | ${PROJECTS[activeCaseStudy].title}`;
      return;
    }
    const titles: Record<string, string> = {
      '#work': 'Neha Kohad | Work',
      '#about': 'Neha Kohad | About',
      '#blog': 'Neha Kohad | Blog',
    };
    document.title = titles[activeTab] || 'Neha Kohad | AI Product Designer';
  }, [activeTab, activeCaseStudy]);

  const [spiralYStep, setSpiralYStep] = useState(isMobile ? 60 : 90);
  const [spiralAngleStep, setSpiralAngleStep] = useState(isMobile ? 45 : 30);
  const [cardWidth, setCardWidth] = useState(isMobile ? 240 : 340);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setRadius(mobile ? 350 : 760);
        setSpiralYStep(mobile ? 60 : 90);
        setSpiralAngleStep(mobile ? 45 : 30);
        setCardWidth(mobile ? 240 : 340);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const workScrollProgress = useMotionValue(0);

  const heroY = useTransform(workScrollProgress, [0, 0.1], [0, -150]);
  const heroOpacity = useTransform(workScrollProgress, [0, 0.05], [1, 0]);
  const heroScale = useTransform(workScrollProgress, [0, 0.1], [1, 0.95]);

  const cardHeight = Math.round(cardWidth * (220 / 340));
  
  // Bento Layout Math
  const gridColumns = isMobile ? 4 : 8;
  const gridPadding = isMobile ? 32 : 80;
  const gridGap = isMobile ? 12 : 24;
  
  const drawerWidth = 450;
  const isPushActive = mode === 'grid' && detailViewStyle === ('drawer-push' as any) && selectedCardIndex !== null && !isMobile;
  const activeContainerWidth = isPushActive ? windowWidth - gridPadding - drawerWidth : windowWidth - gridPadding;
  const containerWidth = Math.max(activeContainerWidth, 300);
  const gridXOffset = isPushActive ? -drawerWidth / 2 : 0;
  
  const unitSizeX = (containerWidth - (gridColumns - 1) * gridGap) / gridColumns;
  const baseCardWidth = 2 * unitSizeX + gridGap;
  const unitSizeY = baseCardWidth / (340 / 220);

  const bentoLayout = React.useMemo(() => {
    const grid = Array(100).fill(null).map(() => Array(gridColumns).fill(false));
    const layout = [];
    
    const placementOrder = [];
    const bigIndices = [];
    const smallIndices = [];
    for (let i = 0; i < CARDS.length; i++) {
      if (["Yodlee", "Cox Enterprises", "Verizon Connect"].includes(CARDS[i].company)) {
        bigIndices.push(i);
      } else {
        smallIndices.push(i);
      }
    }
    
    while (bigIndices.length > 0 || smallIndices.length > 0) {
      if (bigIndices.length > 0) placementOrder.push(bigIndices.shift());
      const numSmalls = (placementOrder.length % 3 === 0) ? 2 : 1;
      for (let s = 0; s < numSmalls; s++) {
        if (smallIndices.length > 0) placementOrder.push(smallIndices.shift());
      }
    }
    
    for (let idx of placementOrder) {
      const card = CARDS[idx];
      const isSelected = idx === selectedCardIndex && mode === 'grid';
      const isLarge = ["Yodlee", "Cox Enterprises", "Verizon Connect"].includes(card.company);
      
      let w = isLarge ? (isMobile ? 4 : 4) : (isMobile ? 2 : 2);
      let h = isLarge ? (isMobile ? 2 : 2) : (isMobile ? 1 : 1);
      
      let placed = false;
      for (let y = 0; y < 100 && !placed; y++) {
        for (let x = 0; x <= gridColumns - w && !placed; x++) {
          let free = true;
          for (let cy = 0; cy < h; cy++) {
            for (let cx = 0; cx < w; cx++) {
              if (grid[y + cy][x + cx]) free = false;
            }
          }
          if (free) {
            for (let cy = 0; cy < h; cy++) {
              for (let cx = 0; cx < w; cx++) {
                grid[y + cy][x + cx] = true;
              }
            }
            const absWidth = w * unitSizeX + (w - 1) * gridGap;
            const absHeight = h * unitSizeY + (h - 1) * gridGap;
            const leftX = x * (unitSizeX + gridGap);
            const centerX = leftX + absWidth / 2 - containerWidth / 2 + gridXOffset;
            const topY = y * (unitSizeY + gridGap);
            const centerY = topY + absHeight / 2;
            
            layout[idx] = { id: idx, x: centerX, y: centerY, w: absWidth, h: absHeight, gridY: topY, gridH: absHeight };
            placed = true;
          }
        }
      }
    }
    return layout;
  }, [gridColumns, unitSizeX, unitSizeY, gridGap, containerWidth, isMobile, selectedCardIndex, mode, detailViewStyle]);

  const gridTotalHeight = Math.max(...bentoLayout.map(l => l.gridY + l.gridH));
  const maxGridScroll = Math.max(0, gridTotalHeight - windowHeight / 2 + 100);
  const spiralTravelDistance = (CARDS.length - 1) * spiralYStep;
  const gridTravelDistance = maxGridScroll;
  const wheelScrollDistance = Math.max(
    mode === 'spiral' ? spiralTravelDistance : gridTravelDistance,
    windowHeight * 0.85
  );

  const targetY = useMotionValue(0);
  const targetRotateY = useMotionValue(0);
  const targetZ = useMotionValue(-radius);

  const springConfig = { stiffness: 40, damping: 20 };
  const springY = useSpring(targetY, springConfig);
  const springRotateY = useSpring(targetRotateY, springConfig);
  const springZ = useSpring(targetZ, springConfig);

  // "NEHa" wordmark: in Spiral mode it grows and drifts to center as the
  // user scrolls, ending up as a huge, faint backdrop behind the cards.
  const targetWordmarkScale = useMotionValue(1);
  const targetWordmarkY = useMotionValue(0);
  const targetWordmarkOpacity = useMotionValue(1);
  const springWordmarkScale = useSpring(targetWordmarkScale, springConfig);
  const springWordmarkY = useSpring(targetWordmarkY, springConfig);
  const springWordmarkOpacity = useSpring(targetWordmarkOpacity, springConfig);

  const workProgressRef = React.useRef(0);
  useEffect(() => {
    workProgressRef.current = workProgress;
  }, [workProgress]);

  useEffect(() => {
    if (activeTab === '#about' || activeCaseStudy !== null) return;

    const applyProgress = (next: number) => {
      workProgressRef.current = next;
      workScrollProgress.set(next);
      setWorkProgress(next);
    };

    const stepProgress = (deltaY: number) => {
      const current = workProgressRef.current;
      const next = Math.min(1, Math.max(0, current + deltaY / Math.max(wheelScrollDistance, 1)));
      if (next === current) return current;
      applyProgress(next);
      if (selectedCardIndex !== null && next > 0 && next < 1) {
        setSelectedCardIndex(null);
      }
      return next;
    };

    const handleWheel = (e: WheelEvent) => {
      const section = workSectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const current = workProgressRef.current;

      if (e.deltaY > 0) {
        // Scrolling forward through the spiral/grid.
        if (current < 1) {
          e.preventDefault();
          stepProgress(e.deltaY);
          if (window.scrollY !== sectionTop) window.scrollTo(0, sectionTop);
        }
        // else: progress is complete, let the page scroll into the footer normally.
      } else if (e.deltaY < 0) {
        if (window.scrollY <= sectionTop + 2) {
          // Already pinned at the work section: rewind the spiral/grid.
          if (current > 0) {
            e.preventDefault();
            stepProgress(e.deltaY);
            window.scrollTo(0, sectionTop);
          }
        } else if (current >= 1) {
          // Scrolling up from the footer: snap back and start rewinding.
          e.preventDefault();
          window.scrollTo(0, sectionTop);
          stepProgress(e.deltaY);
        }
      }
    };

    let touchStartY: number | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || !e.touches[0]) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const section = workSectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const current = workProgressRef.current;

      if (deltaY > 0) {
        if (current < 1) {
          e.preventDefault();
          stepProgress(deltaY);
          touchStartY = currentY;
          if (window.scrollY !== sectionTop) window.scrollTo(0, sectionTop);
        }
      } else if (deltaY < 0) {
        if (window.scrollY <= sectionTop + 2 && current > 0) {
          e.preventDefault();
          stepProgress(deltaY);
          touchStartY = currentY;
          window.scrollTo(0, sectionTop);
        } else if (current >= 1 && window.scrollY > sectionTop + 2) {
          e.preventDefault();
          window.scrollTo(0, sectionTop);
          stepProgress(deltaY);
          touchStartY = currentY;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeTab, activeCaseStudy, wheelScrollDistance, workScrollProgress, selectedCardIndex]);

  useEffect(() => {
    const latest = workProgress;

    if (mode === 'spiral') {
      targetY.set(latest * -spiralTravelDistance);
      targetRotateY.set(latest * -(CARDS.length - 1) * spiralAngleStep);
      targetZ.set(-radius);

      // Grow the wordmark in place and push it down toward center by the
      // halfway point of the scroll; it stays legible but recedes into the backdrop.
      const growProgress = Math.min(latest / 0.5, 1);
      targetWordmarkScale.set(1 + growProgress * 4.5);
      targetWordmarkY.set(windowHeight * 0.22 * growProgress);
      targetWordmarkOpacity.set(Math.max(0.16, 1 - growProgress * 0.85));
    } else {
      targetY.set(latest * -maxGridScroll);
      targetRotateY.set(0);
      targetZ.set(0);

      targetWordmarkScale.set(1);
      targetWordmarkY.set(0);
      targetWordmarkOpacity.set(1);
    }
  }, [
    mode,
    workProgress,
    targetY,
    targetRotateY,
    targetZ,
    radius,
    spiralTravelDistance,
    spiralAngleStep,
    maxGridScroll,
    windowHeight,
    targetWordmarkScale,
    targetWordmarkY,
    targetWordmarkOpacity,
  ]);

  // Whichever card the user clicks, make sure its full expanded state
  // (image + text + tools + CTA) actually fits in the viewport.
  useEffect(() => {
    if (selectedCardIndex === null) return;

    const timeout = setTimeout(() => {
      const el = cardPanelRefs.current[selectedCardIndex];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const topPadding = 110; // clears the floating nav pill
      const bottomPadding = 32;
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - topPadding - bottomPadding;

      let overflowPx = 0;
      if (rect.height >= availableHeight) {
        // Taller than the viewport allows either way - prioritize the top
        // (title/image) over the bottom, rather than picking whichever edge
        // happened to trip the check first.
        overflowPx = rect.top - topPadding;
      } else if (rect.top < topPadding) {
        overflowPx = rect.top - topPadding; // negative: content needs to move down
      } else if (rect.bottom > viewportHeight - bottomPadding) {
        overflowPx = rect.bottom - (viewportHeight - bottomPadding); // positive: content needs to move up
      }

      if (Math.abs(overflowPx) < 1) return;

      const travelDistance = mode === 'spiral' ? spiralTravelDistance : maxGridScroll;
      if (travelDistance <= 0) return;

      const progressDelta = overflowPx / travelDistance;
      const nextProgress = Math.min(1, Math.max(0, workProgressRef.current + progressDelta));

      workProgressRef.current = nextProgress;
      workScrollProgress.set(nextProgress);
      setWorkProgress(nextProgress);
    }, 950); // let the expand spring (with bounce) fully settle first

    return () => clearTimeout(timeout);
  }, [selectedCardIndex, mode, spiralTravelDistance, maxGridScroll, workScrollProgress]);

  useEffect(() => {
    let controls: any;
    let handleUserScroll: () => void;

    const timeout = setTimeout(() => {
      const maxScroll = Math.max(0, (workSectionRef.current?.offsetHeight || 0) - window.innerHeight);
      if (maxScroll > 0) {
        window.scrollTo(0, maxScroll);

        controls = animate(maxScroll, 0, {
          duration: 4,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => {
            window.scrollTo(0, v);
          }
        });
        introScrollControlsRef.current = controls;

        // Cancel animation if the user tries to scroll or interact with the page
        handleUserScroll = () => {
          if (controls) controls.stop();
        };
        window.addEventListener('wheel', handleUserScroll, { once: true });
        window.addEventListener('touchstart', handleUserScroll, { once: true });
        window.addEventListener('pointerdown', handleUserScroll, { once: true });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (controls) controls.stop();
      if (handleUserScroll) {
        window.removeEventListener('wheel', handleUserScroll);
        window.removeEventListener('touchstart', handleUserScroll);
        window.removeEventListener('pointerdown', handleUserScroll);
      }
    };
  }, []);

  // Belt-and-suspenders: always kill the intro auto-scroll the moment a case
  // study or another tab is opened, so it can never fight a manual scroll.
  useEffect(() => {
    if (activeCaseStudy !== null) {
      introScrollControlsRef.current?.stop();
    }
  }, [activeCaseStudy]);

  useEffect(() => {
    if (activeTab !== '#work') {
      introScrollControlsRef.current?.stop();
    }
  }, [activeTab]);

  // Clicking any in-page nav link (Work/About/Blog) while a case study is
  // open should always take you to that page, not leave the case study up.
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (link && activeCaseStudy !== null) {
        setActiveCaseStudy(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [activeCaseStudy]);

  return (
    <div className="w-full bg-[#050505] light:bg-[#fafafa] text-white light:text-zinc-900">
      {theme === 'dark' && bgStyle === 'splash-rainbow' && <SplashCursor RAINBOW_MODE={true} />}
      {theme === 'dark' && bgStyle === 'splash-red' && <SplashCursor RAINBOW_MODE={false} COLOR="#ff0000" />}
      {theme === 'dark' && bgStyle === 'splash-blue' && <SplashCursor RAINBOW_MODE={false} COLOR="#0077ff" />}

      <NavLiquidGlass />

      {activeCaseStudy !== null ? (
        <CaseStudyModal
          key={activeCaseStudy}
          project={CARDS[activeCaseStudy]}
          allProjects={CARDS}
          currentIndex={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onSelectProject={(index: number) => setActiveCaseStudy(index)}
        />
      ) : activeTab === '#about' ? (
        <About />
      ) : (
        <>
        <div id="work" ref={workSectionRef} className="relative z-0 w-full h-screen overflow-hidden">
          <div className="w-full h-full">
            {/* View Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white/10 light:bg-black/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 light:border-black/10 shadow-2xl">
          <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
            <button
              onClick={() => setMode('spiral')}
              className={`transition-colors cursor-pointer ${mode === 'spiral' ? 'text-white light:text-zinc-900 drop-shadow-md' : 'text-zinc-400 light:text-zinc-500 hover:text-white light:hover:text-zinc-900'}`}
            >
              Spiral
            </button>
            <span className="text-white/20 light:text-black/15">•</span>
            <button
              onClick={() => setMode('grid')}
              className={`transition-colors cursor-pointer ${mode === 'grid' ? 'text-white light:text-zinc-900 drop-shadow-md' : 'text-zinc-400 light:text-zinc-500 hover:text-white light:hover:text-zinc-900'}`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section. In Spiral mode this drops below the 3D scene's z-index
          so the wordmark can grow into a backdrop behind the cards. */}
      <div className={`absolute top-0 left-0 w-full h-[30vh] flex flex-col items-center justify-center pt-24 pointer-events-none ${mode === 'spiral' ? 'z-[5]' : 'z-20'}`}>
        <div className="w-full px-4 flex flex-col items-center">
          <motion.h1
            className="font-display font-black text-6xl sm:text-7xl tracking-tighter text-white light:text-zinc-900 mb-4 drop-shadow-lg"
            style={
              mode === 'spiral'
                ? { scale: springWordmarkScale, y: springWordmarkY, opacity: springWordmarkOpacity }
                : { scale: heroScale, y: heroY, opacity: heroOpacity }
            }
          >
            NEHa
          </motion.h1>
          <motion.div
            className="flex flex-col items-center space-y-1 text-center"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <p className="font-sans text-lg sm:text-xl font-medium text-zinc-300 light:text-zinc-600 tracking-tight">AI Product Designer</p>
            <p className="font-sans text-sm text-zinc-500 light:text-zinc-500">Crafting tasteful AI experiences for humans</p>
          </motion.div>
        </div>
      </div>

      {/* 3D Scene Wrapper */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
        animate={{
          perspective: mode === 'spiral' ? 1200 : 25000,
          // Grid's first row otherwise starts at vertical center (viewport
          // center cancels out card height via the top-1/2 + -h/2 margin
          // trick), leaving a gap that grows with viewport height. Cancel
          // that centering out and land the row just under the hero instead.
          y: mode === 'grid' ? -(windowHeight * 0.2 - 24) : 0,
        }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.15 }}
      >
        {/* Background Grid */}
        {bgStyle === 'grid' && (
          <div className="absolute inset-0 z-0 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)'
          }} />
        )}

        {selectedCardIndex !== null && (
          <div 
            className="absolute inset-0 z-0 pointer-events-auto" 
            onClick={() => setSelectedCardIndex(null)}
          />
        )}

        {/* Container that Rotates/Translates */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            y: springY,
            rotateY: springRotateY,
            z: springZ,
          }}
          animate={{
            rotateX: mode === 'spiral' ? -8 : 0,
          }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.15 }}
        >
          {CARDS.map((project, i) => {
            const isSelected = selectedCardIndex === i;
            const bento = bentoLayout[i] || { x: 0, y: 0, w: cardWidth, h: cardHeight };

            // In spiral mode, only the 2 nearest cards on each side of center are interactive.
            const currentCenterIdx = Math.round(workProgress * (CARDS.length - 1));
            const distFromCenter = Math.abs(i - currentCenterIdx);
            const isClickable = mode !== 'spiral' || distFromCenter <= 2;
            
            let selectionXOffset = 0;
            if (isSelected && mode === 'grid') {
              const scaleAmount = 1.2;
              const scaledWidth = bento.w * scaleAmount;
              const leftEdge = bento.x - scaledWidth / 2;
              const rightEdge = bento.x + scaledWidth / 2;
              const containerLeft = -containerWidth / 2 + 20;
              const containerRight = containerWidth / 2 - 20;
              
              if (leftEdge < containerLeft) {
                selectionXOffset = (containerLeft - leftEdge) / scaleAmount;
              } else if (rightEdge > containerRight) {
                selectionXOffset = (containerRight - rightEdge) / scaleAmount;
              }
            }

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{ 
                  transformStyle: 'preserve-3d' 
                }}
                animate={{
                  width: mode === 'spiral' ? cardWidth : bento.w,
                  height: mode === 'spiral' ? cardHeight : bento.h,
                  marginLeft: mode === 'spiral' ? -cardWidth / 2 : -bento.w / 2,
                  marginTop: mode === 'spiral' ? -cardHeight / 2 : -bento.h / 2,
                  rotateY: mode === 'spiral' ? i * spiralAngleStep : 0,
                  y: mode === 'spiral' ? i * spiralYStep : bento.y,
                  x: mode === 'spiral' ? 0 : bento.x,
                }}
                transition={{ duration: 1.2, type: 'spring', bounce: 0.15 }}
              >
                <motion.div
                  className={`w-full h-full relative ${isClickable ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                  animate={{
                    z: mode === 'spiral' ? radius : (isSelected ? 100 : 0),
                    scale: isSelected ? 1.2 : 1,
                    y: isSelected && mode === 'spiral' ? -50 : 0,
                    x: selectionXOffset,
                  }}
                  transition={{ duration: 1.2, type: 'spring', bounce: 0.15 }}
                  whileHover={isClickable ? { scale: isSelected ? 1.25 : (mode === 'spiral' ? 1.05 : 1.02) } : {}}
                  onClick={() => {
                    if (!isClickable) return;
                    if (mode === 'spiral' && !isSelected) {
                      // Bring the clicked card to the center of the spiral
                      const newProgress = CARDS.length > 1 ? i / (CARDS.length - 1) : 0;
                      workProgressRef.current = newProgress;
                      workScrollProgress.set(newProgress);
                      setWorkProgress(newProgress);
                    }
                    setSelectedCardIndex(isSelected ? null : i);
                  }}
                >
                  <div
                    className="w-full h-full rounded-[12px] overflow-hidden absolute inset-0 z-10"
                    style={{
                      boxShadow: theme === 'dark'
                        ? '0 0 40px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.1)'
                        : '0 4px 24px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.1)',
                      backgroundColor: '#050505',
                      transform: 'translateZ(1px)'
                    }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    
                    {/* Always-visible card overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6">
                      <div className="flex items-center gap-1.5 mb-2 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300 font-medium drop-shadow-md">
                        {project.company === 'Personal' ? <Sparkles size={12} className="text-white/80" /> : <Building2 size={12} className="text-white/80" />}
                        <span className="text-white/90">{project.company}</span>
                      </div>
                      <h3 className="text-white font-display font-bold text-lg sm:text-2xl leading-tight mb-2 drop-shadow-md">{project.title}</h3>
                      <div className="flex gap-2 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300 font-medium">
                        <span>{project.type}</span>
                        <span>•</span>
                        <span>{project.category}</span>
                      </div>

                    </div>

                  </div>

                  {/* Base Canvas Background & Content - Inline Mode (Spiral & Grid) */}
                  {detailViewStyle === 'inline' && (
                  <motion.div
                    ref={(el) => { cardPanelRefs.current[i] = el; }}
                    initial={false}
                    animate={{
                      top: isSelected ? -12 : 0,
                      left: isSelected ? -12 : 0,
                      right: isSelected ? -12 : 0,
                      opacity: isSelected ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                    className="absolute bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 rounded-[20px] shadow-2xl z-[-1] overflow-hidden"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        paddingTop: isSelected ? 12 : 0,
                        paddingLeft: isSelected ? 12 : 0,
                        paddingRight: isSelected ? 12 : 0,
                        paddingBottom: isSelected ? 12 : 0,
                      }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                    >
                      {/* Transparent spacer matching the image card height */}
                      <div className="w-full" style={{ height: mode === 'spiral' ? cardHeight : bento.h }}></div>

                      {/* Text Content - flows naturally below the spacer */}
                      <motion.div 
                        initial={false}
                        animate={{ height: isSelected ? 'auto' : 0, marginTop: isSelected ? 16 : 0 }}
                        transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                        className="overflow-hidden pointer-events-auto"
                      >
                        <motion.div
                          initial={false}
                          animate={{ opacity: isSelected ? 1 : 0, y: isSelected ? 0 : -10 }}
                          transition={{ duration: 0.4, delay: isSelected ? 0.1 : 0 }}
                          className="flex flex-col gap-3 px-1 pb-1"
                        >
                          <div className="text-center px-2">
                            <p className="text-zinc-200 text-xs leading-relaxed font-medium">"{project.impact}"</p>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <div className="flex items-center gap-1.5">
                              {project.tools.map((tool, idx) => (
                                 <div key={idx} className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300" title={tool}>
                                    {TOOL_ICONS[tool] || <Bot size={14} />}
                                 </div>
                              ))}
                            </div>
                            {(project as any).status ? (
                              <button
                                disabled
                                className="bg-zinc-800 text-zinc-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-not-allowed select-none"
                              >
                                {(project as any).status === 'fall-start' ? 'Fall Start' : (project as any).status === 'nda' ? 'NDA' : 'Coming Soon'}
                              </button>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); setActiveCaseStudy(i); }}
                                className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                              >
                                {project.cta}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

          </div>
        </div>

      {/* Universal Detail Views: Modal & Drawer */}
      <AnimatePresence>
        {detailViewStyle === 'modal' && selectedCardIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCardIndex(null)} />
            <motion.div
              layoutId={`card-${selectedCardIndex}`}
              className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0.2 }}
            >
              <button 
                onClick={() => setSelectedCardIndex(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                ✕
              </button>
              <div className="h-64 sm:h-96 relative w-full">
                <img src={CARDS[selectedCardIndex].image} alt={CARDS[selectedCardIndex].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>
              <div className="p-8 sm:p-12 relative -mt-20">
                <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {CARDS[selectedCardIndex].company === 'Personal' ? <Sparkles size={14} className="text-zinc-300" /> : <Building2 size={14} className="text-zinc-300" />}
                  <span>{CARDS[selectedCardIndex].company}</span>
                  <span>•</span>
                  <span>{CARDS[selectedCardIndex].type}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 leading-tight">{CARDS[selectedCardIndex].title}</h2>
                <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
                  "{CARDS[selectedCardIndex].impact}"
                </p>
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Tools & Tech</span>
                    <div className="flex items-center gap-3">
                      {CARDS[selectedCardIndex].tools.map((tool, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300" title={tool}>
                          {TOOL_ICONS[tool] || <Bot size={16} />}
                        </div>
                      ))}
                    </div>
                  </div>
                  {(CARDS[selectedCardIndex] as any).status ? (
                    <button disabled className="bg-zinc-800 text-zinc-500 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider cursor-not-allowed select-none">
                      {(CARDS[selectedCardIndex] as any).status === 'fall-start' ? 'Fall Start' : (CARDS[selectedCardIndex] as any).status === 'nda' ? 'NDA' : 'Coming Soon'}
                    </button>
                  ) : (
                    <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                      {CARDS[selectedCardIndex].cta}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {detailViewStyle === 'drawer' && selectedCardIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedCardIndex(null)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              className="relative w-full max-w-md h-full bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="flex-none h-64 relative">
                <img src={CARDS[selectedCardIndex].image} alt={CARDS[selectedCardIndex].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedCardIndex(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 pt-0 scrollbar-hide">
                <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {CARDS[selectedCardIndex].company === 'Personal' ? <Sparkles size={14} className="text-zinc-300" /> : <Building2 size={14} className="text-zinc-300" />}
                  <span>{CARDS[selectedCardIndex].company}</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">{CARDS[selectedCardIndex].title}</h2>
                <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-8">
                  {CARDS[selectedCardIndex].type} • {CARDS[selectedCardIndex].category}
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
                  <h3 className="text-sm font-semibold text-white mb-2">Impact & Overview</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {CARDS[selectedCardIndex].impact}
                  </p>
                </div>

                <div className="mb-10">
                  <h3 className="text-sm font-semibold text-white mb-4">Toolkit</h3>
                  <div className="flex flex-wrap gap-3">
                    {CARDS[selectedCardIndex].tools.map((tool, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-zinc-300 font-medium">
                        {TOOL_ICONS[tool] || <Bot size={14} />}
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {(CARDS[selectedCardIndex] as any).status ? (
                  <button disabled className="w-full bg-zinc-800 text-zinc-500 py-4 rounded-full text-xs font-bold uppercase tracking-wider cursor-not-allowed select-none mt-auto">
                    {(CARDS[selectedCardIndex] as any).status === 'fall-start' ? 'Fall Start' : (CARDS[selectedCardIndex] as any).status === 'nda' ? 'NDA' : 'Coming Soon'}
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveCaseStudy(selectedCardIndex)}
                    className="w-full bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-auto"
                  >
                    {CARDS[selectedCardIndex].cta}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
      
      <Footer />
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Linkedin, Twitter, Rss } from 'lucide-react';
import { NAV_LINKS } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';

export const CASE_STUDY_SECTIONS = [
  { id: 'first-glance', navTitle: 'Overview' },
  { id: 'problem', navTitle: 'Challenge' },
  { id: 'solution', navTitle: 'Key Features' },
  { id: 'stage-1', navTitle: 'Understanding the Problem' },
  { id: 'stage-2', navTitle: 'Validating the Strategy' },
  { id: 'stage-3', navTitle: 'Refining the Experience' },
  { id: 'impact', navTitle: 'Outcomes' },
  { id: 'reflection', navTitle: 'Reflection' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/neha-kohad/' },
  { label: 'X', icon: <Twitter size={16} />, href: 'https://x.com/neha_koh' },
  { label: 'Substack', icon: <Rss size={16} />, href: 'https://substack.com/@nehakohad' },
];

function NavLinks({ activeTab, activeCaseStudy }: { activeTab: string; activeCaseStudy: number | null }) {
  return (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = activeCaseStudy === null && activeTab === link.href;
        return (
          <a
            key={link.label}
            href={link.href}
            className={`font-sans text-xl font-medium tracking-wide py-1 transition-colors ${
              isActive
                ? 'text-white light:text-zinc-900'
                : 'text-white/38 light:text-zinc-400 hover:text-white/80 light:hover:text-zinc-700'
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}

interface LeftSidebarProps {
  activeCaseStudy: number | null;
  project: any | null;
  activeSection: string;
  activeTab: string;
  onSectionClick: (id: string) => void;
  onCloseCaseStudy: () => void;
}

export function LeftSidebar({
  activeCaseStudy,
  project,
  activeSection,
  activeTab,
  onSectionClick,
  onCloseCaseStudy,
}: LeftSidebarProps) {
  return (
    <div className="hidden md:flex flex-col fixed left-0 top-0 w-64 h-screen border-r border-white/10 light:border-zinc-200 bg-[#050505] light:bg-white z-40">

      {/* NEHA + theme toggle */}
      <div className="flex items-center justify-between px-6 pt-6 pb-5 shrink-0">
        <a
          href="#work"
          className="font-display font-black text-xl tracking-tight text-white light:text-zinc-900 hover:opacity-60 transition-opacity"
        >
          NEHA
        </a>
        <ThemeToggle />
      </div>
      <div className="h-px bg-white/10 light:bg-black/10 mx-6 shrink-0" />

      {/* Top nav — shown when NO case study is open */}
      <AnimatePresence>
        {activeCaseStudy === null && (
          <motion.nav
            key="top-nav"
            layoutId="main-nav"
            className="px-6 pt-5 pb-3 flex flex-col gap-0.5 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <NavLinks activeTab={activeTab} activeCaseStudy={activeCaseStudy} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Case study sections — scrollable middle area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <AnimatePresence>
          {activeCaseStudy !== null && project && (
            <motion.div
              key="case-study-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pt-5 pb-2">
                <button
                  onClick={onCloseCaseStudy}
                  className="flex items-center gap-2 text-white/35 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors mb-4 group w-fit"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-base font-bold uppercase tracking-widest">BAck</span>
                </button>

                {/* <p className="font-display text-sm font-bold uppercase tracking-widest text-white/30 light:text-zinc-400 mb-1">
                  Case Study
                </p> */}
                <p className="font-display text-2xl font-bold text-white light:text-zinc-900 tracking-tight leading-snug mb-4">
                  {project.title}
                </p>

                <div className="h-px bg-white/10 light:bg-black/10 mb-4" />

                <nav className="flex flex-col space-y-3 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 light:bg-black/10" />
                  {CASE_STUDY_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => onSectionClick(section.id)}
                      className={`relative pl-4 text-left font-sans text-base tracking-wide transition-colors focus-visible:outline-none ${
                        activeSection === section.id
                          ? 'text-white light:text-zinc-900 font-medium'
                          : 'text-white/38 light:text-zinc-400 hover:text-white/70 light:hover:text-zinc-600'
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav — shown when case study IS open, falls from top */}
      <AnimatePresence>
        {activeCaseStudy !== null && (
          <motion.nav
            key="bottom-nav"
            layoutId="main-nav"
            className="px-6 pt-5 pb-3 flex flex-col gap-0.5 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <NavLinks activeTab={activeTab} activeCaseStudy={activeCaseStudy} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Social links — always pinned at bottom */}
      <div className="px-6 py-5 border-t border-white/10 light:border-zinc-200 shrink-0">
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-2 rounded-lg text-white/38 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 hover:bg-white/10 light:hover:bg-black/5 transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

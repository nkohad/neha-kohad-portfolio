import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { NAV_LINKS } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';

export const CASE_STUDY_SECTIONS = [
  { id: 'first-glance', navTitle: 'Overview' },
  { id: 'problem', navTitle: 'Challenge' },
  { id: 'solution', navTitle: 'Key Features' },
  { id: 'stage-1', navTitle: 'Understanding the Problem' },
  { id: 'audience', navTitle: 'Mapping the Audience' },
  { id: 'concepts', navTitle: 'Exploring Concepts' },
  { id: 'stage-2', navTitle: 'Validating the Strategy' },
  { id: 'impact', navTitle: 'Outcomes' },
  { id: 'reflection', navTitle: 'Reflection' },
];

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M6.77779 4.88984C6.77754 5.39081 6.57829 5.87115 6.22388 6.22521C5.86946 6.57927 5.38892 6.77804 4.88795 6.77779C4.38698 6.77754 3.90664 6.57829 3.55258 6.22388C3.19852 5.86946 2.99975 5.38892 3 4.88795C3.00025 4.38698 3.1995 3.90664 3.55391 3.55258C3.90833 3.19852 4.38887 2.99975 4.88984 3C5.39081 3.00025 5.87115 3.1995 6.22521 3.55391C6.57927 3.90833 6.77804 4.38887 6.77779 4.88984ZM6.83446 8.17652H3.05667V20.001H6.83446V8.17652ZM12.8034 8.17652H9.04446V20.001H12.7656V13.796C12.7656 10.3393 17.2706 10.0182 17.2706 13.796V20.001H21.0012V12.5115C21.0012 6.68429 14.3334 6.90151 12.7656 9.76319L12.8034 8.17652Z" fill="currentColor" />
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M10.7671 14.3564L15 20H21.2222L14.2373 10.6862L20.0489 4H17.6933L13.1449 9.232L9.22222 4H3L9.67556 12.9022L3.50667 20H5.86222L10.7671 14.3564ZM15.8889 18.2222L6.55556 5.77778H8.33333L17.6667 18.2222H15.8889Z" fill="currentColor" />
  </svg>
);

const SubstackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M19 7.604H5V9.495H19V7.604ZM5 11.208V20L12 16.074L19 20V11.208H5ZM19 4H5V5.89H19V4Z" fill="currentColor" />
  </svg>
);

const GmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M20 18H18V9.25L12 13L6 9.25V18H4V6H5.2L12 10.25L18.8 6H20M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4Z" fill="currentColor" />
  </svg>
);

const SOCIAL_LINKS = [
  { label: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/neha-kohad/' },
  { label: 'X', icon: <XIcon />, href: 'https://x.com/neha_koh' },
  { label: 'Substack', icon: <SubstackIcon />, href: 'https://substack.com/@nehakohad' },
  { label: 'Email', icon: <GmailIcon />, href: 'mailto:nehakohadsanjay@gmail.com' },
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
                  {/* <span className="text-base font-bold uppercase tracking-widest">BAck</span> */}
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
                      className={`relative pl-4 text-left font-sans text-sm tracking-wide transition-colors focus-visible:outline-none ${
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
              className="p-2 rounded-lg opacity-50 hover:opacity-100 hover:bg-white/10 light:hover:bg-black/5 transition-all"
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

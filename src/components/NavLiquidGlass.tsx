import React from 'react';
import { motion } from 'motion/react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavLiquidGlass() {
  const activeTab = useActiveTab();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex items-center gap-1 p-1 rounded-full relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeTab === link.href;
          return (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-6 py-1 rounded-full transition-colors duration-300 text-sm font-medium tracking-wide group ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
            >
              <span className="relative z-10">{link.label}</span>
              <div className={`absolute inset-0 rounded-full transition-colors duration-300 pointer-events-none ${isActive ? 'bg-white/20' : 'bg-white/0 group-hover:bg-white/10'}`} />
            </a>
          );
        })}
      </motion.nav>
    </div>
  );
}

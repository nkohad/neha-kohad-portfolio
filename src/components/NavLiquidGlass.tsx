import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavLiquidGlass() {
  const activeTab = useActiveTab();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeLink = NAV_LINKS.find((link) => link.href === activeTab);

  return (
    <>
      {/* Desktop / tablet pill nav */}
      <div className="hidden sm:block fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center gap-1 p-1 rounded-full relative overflow-hidden bg-white/10 light:bg-black/5 backdrop-blur-xl border border-white/20 light:border-black/10 shadow-2xl"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-6 py-1 rounded-full transition-colors duration-300 text-sm font-medium tracking-wide group ${isActive ? 'text-white light:text-zinc-900' : 'text-zinc-300 light:text-zinc-500 hover:text-white light:hover:text-zinc-900'}`}
              >
                <span className="relative z-10">{link.label}</span>
                <div className={`absolute inset-0 rounded-full transition-colors duration-300 pointer-events-none ${isActive ? 'bg-white/20 light:bg-black/10' : 'bg-white/0 group-hover:bg-white/10 light:group-hover:bg-black/5'}`} />
              </a>
            );
          })}

        </motion.nav>
      </div>

      {/* Mobile compact nav */}
      <div className="sm:hidden fixed top-4 left-4 right-4 z-50 pointer-events-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-white/10 light:bg-black/5 backdrop-blur-xl border border-white/20 light:border-black/10 shadow-2xl"
        >
          <span className="text-sm font-bold tracking-wide text-white light:text-zinc-900 truncate">
            {activeLink?.label ?? 'Menu'}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white light:text-zinc-900 bg-white/10 light:bg-black/5 hover:bg-white/20 light:hover:bg-black/10 transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-2 rounded-3xl bg-[#0a0a0a]/95 light:bg-white backdrop-blur-xl border border-white/20 light:border-black/10 shadow-2xl flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 light:bg-black/5 text-white light:text-zinc-900'
                        : 'text-zinc-300 light:text-zinc-500'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

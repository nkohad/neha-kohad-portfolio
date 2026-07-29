import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-14 h-7 rounded-full shrink-0 overflow-hidden border border-white/15 light:border-black/10 cursor-pointer"
    >
      {/* Sky gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, #0b0f2a 0%, #1a2050 55%, #2c2f66 100%)'
            : 'linear-gradient(135deg, #ffd9a0 0%, #ffb27a 50%, #7fb6e6 100%)',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Stars (dark mode only) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="absolute top-[5px] left-[7px] w-[2px] h-[2px] rounded-full bg-white/80" />
        <span className="absolute top-[11px] left-[15px] w-[1.5px] h-[1.5px] rounded-full bg-white/60" />
        <span className="absolute top-[7px] left-[24px] w-[1.5px] h-[1.5px] rounded-full bg-white/70" />
        <span className="absolute top-[15px] left-[9px] w-[1.5px] h-[1.5px] rounded-full bg-white/50" />
      </motion.div>

      {/* Skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[9px] flex items-end justify-center gap-[1.5px] opacity-80">
        <div className="w-[3px] h-[5px] bg-black/30 light:bg-black/25 rounded-t-[1px]" />
        <div className="w-[3px] h-[7px] bg-black/30 light:bg-black/25 rounded-t-[1px]" />
        <div className="w-[3px] h-[4px] bg-black/30 light:bg-black/25 rounded-t-[1px]" />
        <div className="w-[3px] h-[8px] bg-black/30 light:bg-black/25 rounded-t-[1px]" />
        <div className="w-[3px] h-[5px] bg-black/30 light:bg-black/25 rounded-t-[1px]" />
      </div>

      {/* Knob */}
      <motion.div
        className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center"
        animate={{ left: isDark ? 'calc(100% - 23px)' : '3px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.4 }}
        >
          {isDark ? (
            <Moon size={11} className="text-indigo-900" fill="currentColor" strokeWidth={0} />
          ) : (
            <Sun size={11} className="text-amber-500" fill="currentColor" strokeWidth={0} />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Twitter, ArrowUpRight, Rss, ArrowRight, Moon, Sun, Star } from 'lucide-react';
import { NAV_LINKS } from './NavLinks';
import { useTheme } from './ThemeContext';

function PlayfulMoon() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-32 h-32 cursor-pointer flex-shrink-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center z-10"
        whileHover={{ scale: 1.12, rotate: -8 }}
        whileTap={{ scale: 0.94, rotate: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            scale: isHovered ? 1.2 : 0.95,
            opacity: isHovered ? 0.9 : 0.45,
            backgroundColor: isDark ? 'rgba(129,140,248,0.12)' : 'rgba(251,191,36,0.18)',
          }}
        >
        </motion.div>

        <motion.div
          className={`relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${
            isDark ? 'from-zinc-100 via-zinc-300 to-zinc-500 text-zinc-950' : 'from-amber-100 via-amber-300 to-orange-400 text-amber-950'
          }`}
          animate={{
            boxShadow: isDark
              ? (isHovered ? '0 0 70px rgba(165,180,252,0.6)' : '0 0 44px rgba(165,180,252,0.35)')
              : (isHovered ? '0 0 70px rgba(251,191,36,0.55)' : '0 0 44px rgba(251,191,36,0.3)'),
          }}
        >
          {isDark ? <Moon size={58} strokeWidth={1.7} /> : <Sun size={58} strokeWidth={1.7} />}
          <motion.div className="absolute left-6 top-7 w-2 h-2 rounded-full bg-black/10" animate={{ scale: isHovered ? 1.25 : 1 }} />
          <motion.div className="absolute right-7 bottom-8 w-3 h-3 rounded-full bg-black/10" animate={{ scale: isHovered ? 0.85 : 1 }} />
          <motion.div className="absolute right-5 top-5 w-1.5 h-1.5 rounded-full bg-black/10" animate={{ scale: isHovered ? 1.4 : 1 }} />
        </motion.div>

        <motion.div
          className={isDark ? 'absolute top-3 right-2 text-indigo-200' : 'absolute top-3 right-2 text-amber-300'}
          animate={{ opacity: isHovered ? 1 : 0.55, scale: isHovered ? 1.15 : 1, rotate: isHovered ? 12 : 0 }}
        >
          <Star size={18} fill="currentColor" />
        </motion.div>
        <motion.div
          className={isDark ? 'absolute bottom-6 left-3 text-indigo-100' : 'absolute bottom-6 left-3 text-amber-200'}
          animate={{ opacity: isHovered ? 0.9 : 0.4, scale: isHovered ? 1.2 : 1 }}
        >
          <Star size={12} fill="currentColor" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Footer() {
  const socialLinks = [
    { label: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/nehakohadsanjay' },
    { label: 'X (Twitter)', icon: <Twitter size={18} />, href: 'https://x.com/nehakohadsanjay' },
    { label: 'Substack', icon: <Rss size={18} />, href: 'https://substack.com/' },
    { label: 'Email', icon: <Mail size={18} />, href: 'mailto:nehakohadsanjay@gmail.com' },
  ];

  return (
    <footer
      className="relative z-10 w-full bg-[#050505] light:bg-[#fafafa] border-t border-white/10 light:border-black/10 pt-16 pb-12 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Identity */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <div>
            <h3 className="font-display font-medium text-xl text-white light:text-zinc-900">Neha Kohad</h3>
            <p className="text-zinc-500 text-sm">AI Product Designer</p>
          </div>
          <div className="scale-75 origin-left -mt-2">
            <PlayfulMoon />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Navigate</p>
          <div className="flex flex-col gap-3 items-start">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 text-zinc-300 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors text-base font-medium"
              >
                <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out text-zinc-500" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Connect</p>
          <div className="flex flex-col gap-3 items-start">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-zinc-300 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors text-base font-medium"
                whileHover="hover"
              >
                <motion.span
                  className="p-1.5 bg-white/5 light:bg-black/[0.04] rounded-full group-hover:bg-white/20 light:group-hover:bg-black/10 transition-colors"
                  variants={{
                    hover: { rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }
                  }}
                >
                  {link.icon}
                </motion.span>
                {link.label}
                <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-zinc-400" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Location & Copyright */}
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Local Time</p>
            <div className="text-zinc-300 light:text-zinc-600 font-mono text-sm flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Atlanta, GA
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <motion.div
              className="font-display font-black text-3xl sm:text-4xl text-white/5 light:text-black/5 tracking-tighter cursor-crosshair flex items-center md:justify-end"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {['N', 'E', 'H', 'A'].map((letter, i) => (
                <motion.span
                  key={i}
                  className="hover:text-white/90 light:hover:text-black/60"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

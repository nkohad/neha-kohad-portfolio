import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Mail, Linkedin, Twitter, ArrowUpRight, Rss, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from './NavLinks';

function PlayfulFlower() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative w-32 h-32 cursor-pointer flex-shrink-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Flower Head */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center z-10"
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Spinning Petals */}
        <motion.div 
           className="absolute inset-0 flex items-center justify-center"
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-12 rounded-full"
              style={{ 
                transformOrigin: "50% 100%",
                rotate: i * 45,
                top: "50%",
                marginTop: "-48px"
              }}
              animate={{ 
                backgroundColor: isHovered ? "#818cf8" : "#6366f1",
                scaleY: isHovered ? 1.15 : 1
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: i * 0.02 }}
            />
          ))}
        </motion.div>

        {/* Center Face */}
        <motion.div 
           className="relative w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center z-20 shadow-inner"
           animate={{ scale: isHovered ? 1.1 : 1 }}
        >
           {/* Eyes */}
           <motion.div 
              className="absolute flex gap-3 top-4"
              animate={{ y: isHovered ? -2 : 0 }}
           >
             <motion.div 
               className="w-1.5 h-2.5 bg-zinc-900 rounded-full origin-center" 
               animate={isHovered ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }} 
               transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatDelay: 1.5 }} 
             />
             <motion.div 
               className="w-1.5 h-2.5 bg-zinc-900 rounded-full origin-center" 
               animate={isHovered ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }} 
               transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatDelay: 1.5 }} 
             />
           </motion.div>
           
           {/* Mouth */}
           <motion.div 
             className="absolute bottom-3 w-5 border-b-[2.5px] border-zinc-900"
             style={{ borderRadius: "0 0 100px 100px" }}
             animate={{ 
               height: isHovered ? 10 : 5,
               backgroundColor: isHovered ? "#ef4444" : "transparent"
             }}
           />
           
           {/* Cheeks */}
           <motion.div className="absolute left-1.5 top-6 w-2 h-1 bg-red-400 rounded-full opacity-60 blur-[1px]" animate={{ opacity: isHovered ? 0.9 : 0.4 }} />
           <motion.div className="absolute right-1.5 top-6 w-2 h-1 bg-red-400 rounded-full opacity-60 blur-[1px]" animate={{ opacity: isHovered ? 0.9 : 0.4 }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    x.set((e.clientX - rect.left - halfWidth) * 0.15);
    y.set((e.clientY - rect.top - halfHeight) * 0.15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-sans font-bold text-lg tracking-wide overflow-hidden cursor-pointer"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.a>
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
      className="relative z-10 w-full bg-[#050505] border-t border-white/10 pt-16 pb-12 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Identity & Interaction */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="flex items-center gap-6">
            <div className="scale-75 origin-left">
               <PlayfulFlower />
            </div>
          </div>
          <div>
            <h3 className="font-display font-medium text-xl text-white">Neha Kohad</h3>
            <p className="text-zinc-500 text-sm">AI Product Designer</p>
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
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-base font-medium"
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
                className="group flex items-center gap-3 text-zinc-300 hover:text-white transition-colors text-base font-medium"
                whileHover="hover"
              >
                <motion.span 
                  className="p-1.5 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors"
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
            <div className="text-zinc-300 font-mono text-sm flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Atlanta, GA
            </div>
          </div>
          
          <div className="mt-auto flex flex-col gap-2">
            <motion.div 
              className="font-display font-black text-3xl sm:text-4xl text-white/5 tracking-tighter cursor-crosshair flex items-center md:justify-end"
              whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.4)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {['N', 'E', 'H', 'A'].map((letter, i) => (
                <motion.span 
                  key={i}
                  whileHover={{ y: -5, color: "rgba(255,255,255,0.9)" }}
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

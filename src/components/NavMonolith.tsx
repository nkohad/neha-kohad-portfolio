import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavMonolith() {
  const [isHovered, setIsHovered] = useState(false);
  const activeTab = useActiveTab();

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-zinc-950 border-r border-white/10 z-50 pointer-events-auto flex flex-col justify-center overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ width: 12 }}
      animate={{ width: isHovered ? 280 : 12 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      <div 
        className="flex flex-col gap-10 px-12 whitespace-nowrap transition-opacity duration-300 w-[280px]" 
        style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: isHovered ? i * 0.05 : 0 }}
            className={`text-4xl font-black uppercase tracking-tighter transition-colors ${activeTab === link.href ? 'text-white' : 'text-transparent hover:text-white'}`}
            style={{ WebkitTextStroke: activeTab === link.href ? 'none' : '1px rgba(255,255,255,0.8)' }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

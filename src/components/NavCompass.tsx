import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavCompass() {
  const [isOpen, setIsOpen] = useState(false);
  const activeTab = useActiveTab();

  return (
    <div className="fixed top-8 right-8 z-50 pointer-events-auto">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center relative z-10 cursor-pointer shadow-xl"
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Plus size={24} />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && NAV_LINKS.map((link, i) => {
          // Calculate angle for a quarter circle (bottom-left)
          // Angles from 180 (left) to 270 (top) but we are top-right so we want it expanding bottom and left.
          // Let's do a full semi-circle around it.
          const totalLinks = NAV_LINKS.length;
          const angleOffset = 90; // Start at 90 degrees (bottom)
          const angleRange = 90; // Spread over 90 degrees (up to 180, which is left)
          const angle = angleOffset + (i * (angleRange / (totalLinks - 1)));
          const angleRad = angle * (Math.PI / 180);
          const radius = 100;
          
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          
          return (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, x, y, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 15 }}
              className={`absolute top-0 left-0 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold shadow-lg transition-colors ${activeTab === link.href ? 'bg-white text-black' : 'bg-zinc-900 text-white hover:bg-white hover:text-black'}`}
            >
              {link.label}
            </motion.a>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

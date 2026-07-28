import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavBlob() {
  const [isHovered, setIsHovered] = useState(false);
  const activeTab = useActiveTab();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        animate={{
          width: isHovered ? 'auto' : 64,
          height: 64,
          borderRadius: 32,
        }}
        className="bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer shadow-2xl"
        whileHover={{ scale: 1.05 }}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="blob"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-4 h-4 bg-white rounded-full"
            />
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-6 px-8 whitespace-nowrap h-full"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${activeTab === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

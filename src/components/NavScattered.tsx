import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavScattered() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGathered, setIsGathered] = useState(false);
  const activeTab = useActiveTab();

  // Generate random positions once on mount
  const [positions, setPositions] = useState<{ x: string, y: string, rotate: number }[]>([]);

  useEffect(() => {
    const newPositions = NAV_LINKS.map(() => ({
      x: `${Math.random() * 60 + 20}vw`,
      y: `${Math.random() * 60 + 20}vh`,
      rotate: Math.random() * 40 - 20,
    }));
    setPositions(newPositions);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" ref={containerRef}>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
        <button 
          onClick={() => setIsGathered(!isGathered)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-mono transition-colors border border-white/20"
        >
          {isGathered ? 'Scatter Nav' : 'Gather Nav'}
        </button>
      </div>

      {NAV_LINKS.map((link, i) => {
        // Calculate gathered position (centered row)
        const totalWidth = 400; // estimated
        const gatheredX = `calc(50vw - ${totalWidth/2}px + ${i * (totalWidth / NAV_LINKS.length)}px)`;
        const gatheredY = `100px`;

        return (
          <motion.a
            key={link.label}
            href={link.href}
            drag={!isGathered}
            dragConstraints={containerRef}
            dragElastic={0.1}
            className={`absolute px-6 py-3 backdrop-blur-xl border border-white/20 rounded-full font-mono text-sm pointer-events-auto cursor-grab active:cursor-grabbing transition-colors ${activeTab === link.href ? 'bg-white text-black' : 'bg-zinc-900/80 text-white hover:bg-white hover:text-black'}`}
            animate={{
              left: isGathered ? gatheredX : positions[i].x,
              top: isGathered ? gatheredY : positions[i].y,
              rotate: isGathered ? 0 : positions[i].rotate,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
            whileDrag={{ scale: 1.2, zIndex: 100 }}
          >
            {link.label}
          </motion.a>
        );
      })}
    </div>
  );
}

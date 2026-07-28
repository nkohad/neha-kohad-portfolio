import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NAV_LINKS, useActiveTab } from './NavLinks';

export function NavMarquee() {
  const activeTab = useActiveTab();

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-auto bg-zinc-100 text-black overflow-hidden border-t border-black/10 shadow-2xl group"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex items-center py-4 whitespace-nowrap cursor-pointer animate-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {NAV_LINKS.map((link) => (
              <a
                key={`${i}-${link.label}`}
                href={link.href}
                className={`mx-8 text-xl font-black uppercase tracking-widest decoration-4 transition-colors ${activeTab === link.href ? 'text-blue-600 line-through' : 'hover:line-through hover:text-blue-600'}`}
              >
                {link.label}
              </a>
            ))}
            <span className="mx-8 text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import gtLogo from '../assets/logos/gt.jpeg';
import coxLogo from '../assets/logos/cox.jpeg';
import ciscoLogo from '../assets/logos/cisco.jpeg';
import autodeskLogo from '../assets/logos/autodesk.png';
import pesLogo from '../assets/logos/pes.png';

const WORK_EXPERIENCE = [
  {
    company: "Yodlee",
    role: "Graduate Intern · AI Product Design",
    date: "Summer 2026 — Present",
    domain: "yodlee.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Yodlee_wordmark_2025.svg",
    color: "#4A154B" // Deep purple
  },
  {
    company: "Collaborative Wellbeing Computing Lab",
    role: "AI Product Designer",
    date: "Jan 2026 — Present",
    domain: "gatech.edu",
    logoUrl: gtLogo,
    color: "#B3A369" // Georgia Tech Gold
  },
  {
    company: "Cox Enterprises",
    role: "UX Research + Design",
    date: "Aug 2025 — Dec 2025",
    domain: "coxenterprises.com",
    logoUrl: coxLogo,
    color: "#0033A0" // Navy
  },
  {
    company: "Cisco",
    role: "Software Engineer II · UX + Product Design",
    date: "Jan 2022 — Jun 2025",
    domain: "cisco.com",
    logoUrl: ciscoLogo,
    color: "#049FD9" // Cisco Blue
  },
  {
    company: "Cisco",
    role: "Software Engineering Intern",
    date: "May 2021 — Jul 2021",
    domain: "cisco.com",
    logoUrl: ciscoLogo,
    color: "#049FD9"
  },
  {
    company: "Autodesk",
    role: "Data Science Intern",
    date: "Jan 2021 — Apr 2021",
    domain: "autodesk.com",
    logoUrl: autodeskLogo,
    color: "#FFFFFF" // White
  }
];

const EDUCATION = [
  {
    school: "Georgia Institute of Technology",
    degree: "M.S. Human–Computer Interaction",
    date: "2025 — Present",
    domain: "gatech.edu",
    logoUrl: gtLogo,
    color: "#B3A369"
  },
  {
    school: "PES University",
    degree: "B.Tech Computer Science & Engineering",
    date: "2018 — 2022",
    domain: "pes.edu",
    logoUrl: pesLogo,
    color: "#800000" // Deep Red
  }
];

const COLLAGE_IMAGES = [
  { src: gtLogo, top: "0%", left: "40%", rotate: "12deg", z: 2, bg: "#B3A36920" },
  { src: coxLogo, top: "35%", left: "0%", rotate: "-8deg", z: 3, bg: "#0033A020" },
  { src: ciscoLogo, top: "50%", left: "45%", rotate: "5deg", z: 1, bg: "#049FD920" },
  { src: autodeskLogo, top: "-10%", left: "5%", rotate: "-15deg", z: 0, bg: "#FFFFFF20" },
];

export function About() {
  return (
    <div className="min-h-screen bg-black text-[#F8F8F8] font-sans pb-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 pt-48">
        
        {/* Hero Section */}
        <div className="mb-48 lg:mb-64">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.05] font-display font-medium tracking-tight mb-20 lg:mb-32 max-w-[900px]">
              I often think of products as conversations waiting to happen.
            </h1>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row justify-between gap-24 lg:gap-32 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18px] sm:text-[20px] lg:text-[22px] leading-[1.8] text-white/70 max-w-[600px] flex flex-col gap-8 font-light"
            >
              <p>
                I'm an AI Product Designer who enjoys making emerging technologies feel intuitive, trustworthy, and deeply human.
              </p>
              <p>
                Before becoming a designer, I spent more than three years building enterprise software as an engineer. Today, I work across product strategy, interaction design, AI experiences, and human-centered research—bridging technical systems with thoughtful user experiences.
              </p>
              <p>
                I believe great products aren't defined by clever technology, but by how naturally they fit into people's lives.
              </p>
            </motion.div>

            {/* Collage */}
            <div className="hidden lg:block w-[320px] h-[400px] relative mt-12 lg:-mt-12 flex-shrink-0">
              {COLLAGE_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: img.rotate }}
                  transition={{ duration: 1, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  className="absolute shadow-2xl p-6 rounded-2xl flex items-center justify-center border border-white/5"
                  style={{
                    top: img.top,
                    left: img.left,
                    zIndex: img.z,
                    width: '160px',
                    height: '160px',
                    backgroundColor: img.bg,
                  }}
                >
                  <img src={img.src} alt="Collage element" className="w-full h-full object-contain opacity-90 drop-shadow-sm" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[22px] sm:text-[24px] font-display mb-8"
          >
            Experience
          </motion.h2>
          
          <div className="flex flex-col">
            {WORK_EXPERIENCE.map((exp, i) => (
              <ExperienceItem key={i} index={i} item={exp} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[22px] sm:text-[24px] font-display mb-8"
          >
            Education
          </motion.h2>
          
          <div className="flex flex-col">
            {EDUCATION.map((edu, i) => (
              <EducationItem key={i} index={i} item={edu} />
            ))}
          </div>
        </section>
        
        {/* Currently Exploring */}
        <section className="border-t border-white/10 pt-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[20px] font-display mb-6 text-white/50 uppercase tracking-widest text-sm"
          >
            Currently Exploring
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 text-[16px] text-white/70 font-light"
          >
            {['AI interfaces', 'Multimodal systems', 'Human-AI collaboration', 'Typography', 'Accessibility'].map((topic, i) => (
              <span key={topic} className="px-4 py-2 rounded-full bg-white/5 border border-white/10">{topic}</span>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
}

function ExperienceItem({ item, index }: { item: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-xl cursor-pointer"
      whileHover={{ y: -2 }}
    >
      <div 
        className="w-[64px] h-[64px] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ backgroundColor: `${item.color}20` }} // 20 hex is 12% opacity
      >
        {/* Fallback to simple icon if clearbit fails, using an img tag for clearbit */}
        <img 
          src={item.logoUrl || `https://logo.clearbit.com/${item.domain}`} 
          alt={`${item.company} logo`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] sm:text-[22px] font-display font-medium text-[#F8F8F8]">{item.company}</h3>
          <p className="text-[16px] sm:text-[18px] text-white/65 font-light">{item.role}</p>
        </div>
        
        <div className="text-[15px] sm:text-[16px] text-white/50 font-light md:text-right mt-2 md:mt-0 tracking-wide">
          {item.date}
        </div>
      </div>
    </motion.div>
  );
}

function EducationItem({ item, index }: { item: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-xl cursor-pointer"
      whileHover={{ y: -2 }}
    >
      <div 
        className="w-[64px] h-[64px] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ backgroundColor: `${item.color}20` }}
      >
        <img 
          src={item.logoUrl || `https://logo.clearbit.com/${item.domain}`} 
          alt={`${item.school} logo`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] sm:text-[22px] font-display font-medium text-[#F8F8F8]">{item.school}</h3>
          <p className="text-[16px] sm:text-[18px] text-white/65 font-light">{item.degree}</p>
        </div>
        
        <div className="text-[15px] sm:text-[16px] text-white/50 font-light md:text-right mt-2 md:mt-0 tracking-wide">
          {item.date}
        </div>
      </div>
    </motion.div>
  );
}

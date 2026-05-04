import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  funNote: string;
  tags: { name: string; color: string }[];
  stackIcons?: string[];
  link: string;
  highlights: string[];
  cardBg: string;
  iconColor: string;
  showInternshipBadge?: boolean;
  screenshot?: string;
  isLive?: boolean;
}

// Modal Component
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  // Hide dock and header when modal is open
  React.useEffect(() => {
    document.body.setAttribute('data-modal-open', 'true');
    return () => document.body.removeAttribute('data-modal-open');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image */}
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Project Title */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-lg">
        <span className="text-white font-[Silkscreen] text-sm">{alt}</span>
      </div>
    </motion.div>
  );
}

interface Project {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  funNote: string;
  tags: { name: string; color: string }[];
  stackIcons?: string[];
  link: string;
  highlights: string[];
  cardBg: string;
  iconColor: string;
  showInternshipBadge?: boolean;
  screenshot?: string;
  isLive?: boolean;
}

const projects: Project[] = [
  {
    index: "01",
    title: "Scentance",
    subtitle: "Premium Fragrance E-commerce",
    description: "A premium fragrance e-commerce platform built for a client. Live at scentenceparfum.com with real customers and orders.",
    funNote: "This isn't a portfolio piece — it's a production business with real revenue.",
    tags: [
      { name: "Next.js 16", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "TypeScript", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "Three.js/R3F", color: "bg-pastel-purple/50 text-purple-700" },
      { name: "Supabase", color: "bg-pastel-green/50 text-green-700" },
    ],
    stackIcons: ["/nextjs-light.svg", "/typescript.svg", "/supabase.svg", "/resend.svg"],
    link: "https://scentenceparfum.com",
    highlights: [
      "Live production with real customers",
      "3D interactive mesh background",
      "Admin dashboard with order tracking",
    ],
    cardBg: "bg-gradient-to-br from-pastel-purple/25 to-pastel-pink/10",
    iconColor: "bg-pastel-purple/40 text-purple-600",
    screenshot: "/projects/scentence.png",
    isLive: true,
  },
  {
    index: "02",
    title: "Stock Salt",
    subtitle: "Real-time Inventory SaaS",
    description: "Multi-outlet inventory management with real-time sync across all POS terminals.",
    funNote: "Because spreadsheets shouldn't be the backbone of a business.",
    tags: [
      { name: "Next.js 15", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "TypeScript", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "Supabase Realtime", color: "bg-pastel-green/50 text-green-700" },
    ],
    stackIcons: ["/nextjs-light.svg", "/typescript.svg", "/supabase.svg", "/reactjs.svg"],
    link: "https://github.com/muhammad-shameel-ks/stock-salt",
    highlights: [
      "Real-time stock sync across terminals",
      "Centralized master stock management",
      "Revenue analytics dashboard",
    ],
    cardBg: "bg-gradient-to-br from-pastel-blue/25 to-pastel-green/10",
    iconColor: "bg-pastel-blue/40 text-blue-600",
    screenshot: "/projects/stock-salt.png",
    isLive: true,
  },
  {
    index: "03",
    title: "Office Pal",
    subtitle: "College Management System",
    description: "Replaces paperwork with automated exam seating and administration.",
    funNote: "Yes, I automated away someone's entire job. They thanked me.",
    tags: [
      { name: "Flutter", color: "bg-pastel-purple/50 text-purple-700" },
      { name: "Supabase", color: "bg-pastel-green/50 text-green-700" },
      { name: "Riverpod", color: "bg-pastel-orange/50 text-orange-700" },
    ],
    stackIcons: ["/flutter.svg", "/supabase.svg"],
    link: "https://github.com/muhammad-shameel-ks/office_pal",
    highlights: [
      "Anti-cheat seating algorithm",
      "Print-ready PDF generation",
      "4 role-based dashboards",
    ],
    cardBg: "bg-gradient-to-br from-pastel-purple/25 to-pastel-pink/10",
    iconColor: "bg-pastel-purple/40 text-purple-600",
    screenshot: "/projects/office-pal.png",
  },
  {
    index: "04",
    title: "KSDC Smart Helper",
    subtitle: "SQL Command Generator",
    description: "Auto-generates SQL commands for non-technical staff.",
    funNote: "Making SQL accessible to everyone, one query at a time.",
    tags: [
      { name: "React", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "TypeScript", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "Node.js", color: "bg-pastel-green/50 text-green-700" },
    ],
    stackIcons: ["/reactjs.svg", "/typescript.svg", "/nodejs.svg", "/microsoft-sql-server.svg"],
    link: "https://github.com/muhammad-shameel-ks/ksdc-smart-helper",
    highlights: [
      "Auto SQL query generation",
      "Simplified UI for non-tech users",
      "Query validation",
    ],
    cardBg: "bg-gradient-to-br from-pastel-orange/20 to-pastel-yellow/10",
    iconColor: "bg-pastel-orange/40 text-orange-600",
    showInternshipBadge: true,
    screenshot: "/projects/ksdc-smart.png",
  },
  {
    index: "05",
    title: "n8n Easy Webhooks",
    subtitle: "Zero-Config Tunneling",
    description: "Auto Cloudflare Tunnel for local n8n development.",
    funNote: "I was too lazy to configure tunnels manually. So I automated it.",
    tags: [
      { name: "Python", color: "bg-pastel-yellow/50 text-yellow-700" },
      { name: "Docker", color: "bg-pastel-blue/50 text-blue-700" },
      { name: "Cloudflare", color: "bg-pastel-orange/50 text-orange-700" },
    ],
    stackIcons: ["/python.svg", "/docker-engine.svg", "/cloudflare.svg"],
    link: "https://github.com/muhammad-shameel-ks/n8n-easy-webhook",
    highlights: [
      "Auto Cloudflare Tunnel provisioning",
      "Dynamic webhook URL config",
      "Dual CLI + TUI interface",
    ],
    cardBg: "bg-gradient-to-br from-pastel-green/20 to-pastel-blue/10",
    iconColor: "bg-pastel-green/40 text-green-600",
  },
];

const projectIcons: Record<string, React.ReactNode> = {
  "01": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  "02": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  "03": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  "04": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  "05": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/><path d="M2 2l20 20"/></svg>,
};

function ProjectCard({ project, onImageClick }: { project: Project; onImageClick: (src: string, title: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInternshipNote, setShowInternshipNote] = useState(false);

  return (
    <motion.div
      className="group rounded-2xl border border-border/50 bg-white hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-300 overflow-hidden"
    >
      {/* Screenshot or Placeholder - Clickable */}
      <div 
        className={`relative h-40 ${project.screenshot ? 'cursor-zoom-in' : 'flex items-center justify-center'} bg-surface`}
        onClick={() => project.screenshot && onImageClick(project.screenshot, project.title)}
      >
        {project.screenshot ? (
          <>
            <img 
              src={project.screenshot} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Click hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded transition-opacity">
                Click to enlarge
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-fg-faint">
            <div className="w-16 h-16 rounded-xl bg-pastel-green/30 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-600">
                <path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/><path d="M2 2l20 20"/>
              </svg>
            </div>
            <span className="font-[Silkscreen] text-[10px] tracking-wider">CLI TOOL</span>
          </div>
        )}
        
        {/* Live Badge */}
        {project.isLive && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-green-500/90 text-white text-[10px] font-bold font-[Silkscreen] tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${project.iconColor} flex items-center justify-center`}>
              {projectIcons[project.index]}
            </div>
            <span className="font-bold text-fg">{project.title}</span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-fg-muted font-light mb-3">
          {project.subtitle}
        </p>

        {/* Tech Stack Icons */}
        {project.stackIcons && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stackIcons.map((icon, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface border border-border/50">
                <img src={icon} alt="" className="w-4 h-4 object-contain" />
                <span className="text-[10px] text-fg-muted">{project.tags[i]?.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quick Highlights - Visible without click */}
        <div className="space-y-1.5 mb-4">
          {project.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-fg-muted">
              <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
              {h}
            </div>
          ))}
        </div>

        {/* Expandable More */}
        {project.highlights.length > 2 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="text-xs text-accent font-medium hover:underline"
          >
            {isOpen ? 'Less' : `+${project.highlights.length - 2} more`}
          </button>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-1.5">
                {project.highlights.slice(2).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-fg-muted">
                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Link */}
        <div className="mt-4 pt-3 border-t border-border/30">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            {project.isLive ? 'View Live Site' : 'View on GitHub'}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectList() {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 relative">
      <AnimatePresence>
        {modalImage && (
          <ImageModal 
            src={modalImage.src} 
            alt={modalImage.title} 
            onClose={() => setModalImage(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: -8 }}
            className="w-10 h-10 rounded-xl bg-pastel-orange/40 flex items-center justify-center text-accent shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </motion.div>
          <span className="font-[Silkscreen] text-[18px] text-accent tracking-widest uppercase">
            The Work
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-4xl font-bold tracking-tight mb-3"
        >
          Things I've built that <span className="text-accent">actually ship.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="text-fg-muted text-base font-light mb-14 max-w-lg"
        >
          Real tools solving real problems for real people. Not proof-of-concepts that never launched.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard 
              key={project.index} 
              project={project} 
              onImageClick={(src, title) => setModalImage({ src, title })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
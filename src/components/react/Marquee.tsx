import React from 'react';
import { motion } from 'framer-motion';

const tools = [
  { name: "React", desc: "UI component library", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/reactjs.svg" },
  { name: "Next.js", desc: "Full-stack React framework", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/nextjs-light.svg" },
  { name: "TypeScript", desc: "Typed JavaScript", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/typescript.svg" },
  { name: "Flutter", desc: "Cross-platform UI framework", color: "bg-pastel-purple/50 text-purple-600 border-purple-100/80", icon: "/flutter.svg" },
  { name: "Supabase", desc: "Open-source Firebase alternative", color: "bg-pastel-green/50 text-green-600 border-green-100/80", icon: "/supabase.svg" },
  { name: "PostgreSQL", desc: "Relational database", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/postgresql.svg" },
  { name: "Python", desc: "Scripting & automation", color: "bg-pastel-yellow/50 text-yellow-700 border-yellow-100/80", icon: "/python.svg" },
  { name: "Docker", desc: "Container platform", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/docker-engine.svg" },
  { name: "Kubernetes", desc: "Container orchestration", color: "bg-pastel-purple/50 text-purple-600 border-purple-100/80", icon: "/kubernetes.svg" },
  { name: "Tailwind CSS", desc: "Utility-first CSS", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/tailwind.svg" },
  { name: "Node.js", desc: "JavaScript runtime", color: "bg-pastel-green/50 text-green-600 border-green-100/80", icon: "/nodejs.svg" },
  { name: "MSSQL", desc: "Microsoft SQL Server", color: "bg-pastel-orange/50 text-orange-600 border-orange-100/80", icon: "/microsoft-sql-server.svg" },
  { name: "GitHub Actions", desc: "CI/CD pipelines", color: "bg-pastel-purple/50 text-purple-600 border-purple-100/80", icon: "/github-light.svg" },
  { name: "Cloudflare", desc: "CDN & edge network", color: "bg-pastel-orange/50 text-orange-600 border-orange-100/80", icon: "/cloudflare.svg" },
  { name: "Tailscale", desc: "Zero-trust VPN", color: "bg-pastel-green/50 text-green-600 border-green-100/80", icon: "/tailscale-light.svg" },
  { name: "Arch Linux", desc: "Rolling-release OS", color: "bg-pastel-blue/50 text-blue-600 border-blue-100/80", icon: "/arch-linux.svg" },
  { name: "Hyprland", desc: "Tiling window manager", color: "bg-pastel-purple/50 text-purple-600 border-purple-100/80", icon: "/hyprland.svg" },
  { name: "n8n", desc: "Workflow automation", color: "bg-pastel-pink/50 text-pink-600 border-pink-100/80", icon: "/n8n.svg" },
];

export default function Marquee() {
  return (
    <div className="py-20 md:py-28 overflow-hidden relative">
      {/* Decorative blobs — muted */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-pastel-orange/12 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-pastel-purple/12 blur-[80px]" />

      {/* Section label */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <motion.div
          whileHover={{ rotate: -8 }}
          className="w-10 h-10 rounded-xl bg-pastel-blue/40 flex items-center justify-center text-blue-500 shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </motion.div>
        <span className="font-[Silkscreen] text-[18px] text-accent tracking-widest uppercase">
          The Stack
        </span>
      </div>

      {/* Static grid - narrow width, centered, with tooltips */}
      <div className="flex flex-wrap justify-center gap-2.5 px-4 max-w-2xl mx-auto">
        {tools.map((tool) => (
          <div key={tool.name} className="relative group">
            <motion.span
              whileHover={{ scale: 1.08, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-full border shrink-0 cursor-default ${tool.color}`}
            >
              <img src={tool.icon} alt="" className="w-4 h-4 object-contain" />
              {tool.name}
            </motion.span>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-fg text-white text-xs font-medium whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-20">
              {tool.desc}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-fg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
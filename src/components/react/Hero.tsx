import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FLOAT_ICONS = [
  "/reactjs.svg", "/nextjs-light.svg", "/typescript.svg", "/kubernetes.svg",
  "/docker-engine.svg", "/python.svg", "/nodejs.svg", "/supabase.svg",
  "/tailwind.svg", "/arch-linux.svg"
];

function FloatingIcon({ src, delay, position }: { src: string, delay: number, position: { top: string, left: string } }) {
  return (
    <motion.img
      src={src}
      alt=""
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0, 0.4, 0.4, 0],
        scale: [0.5, 1, 1, 0.5],
        y: [0, -40, -40, -80],
        x: [0, 20, -20, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-10 h-10 object-contain pointer-events-none z-0 filter grayscale opacity-40"
      style={position}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const floatingIcons = useMemo(() => {
    return FLOAT_ICONS.map((src, i) => ({
      src,
      delay: i * 2,
      position: {
        top: `${15 + (Math.random() * 60)}%`,
        left: `${65 + (Math.random() * 25)}%`,
      }
    }));
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Fades out completely by the time we scroll through the hero
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0, 0]);
  // Disable pointer events when faded out to prevent accidental clicks
  const pointerEvents = useTransform(scrollYProgress, [0, 0.8], ["auto" as const, "none" as const]);

  const waveHand = {
    animate: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: { duration: 2.5, ease: "easeInOut", delay: 1.2 }
    }
  };

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ y, opacity, pointerEvents }}
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-visible py-20 md:py-0"
    >
      {/* Top nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 lg:px-20 py-8 z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white text-sm font-bold font-[Silkscreen]">S</span>
          </div>
        </motion.div>
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          href="https://github.com/muhammad-shameel-ks"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-fg text-white text-sm font-medium hover:scale-105 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </motion.a>
      </div>

      {/* Decorative tilted cards — desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 0.6, scale: 1, rotate: -6 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[15vh] right-[5vw] w-56 h-64 rounded-3xl bg-pastel-orange/30 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 3 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[18vh] right-[8vw] w-56 h-64 rounded-3xl bg-pastel-blue/25 hidden lg:block"
      />

      {/* Floating background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {floatingIcons.map((icon, i) => (
          <FloatingIcon key={i} {...icon} />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-4xl relative z-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-pastel-green/50 border border-green-200/40"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-green-800">Open to opportunities</span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-5">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-fg"
          >
            Hey, I'm{' '}
            <span className="relative inline-block">
              <span className="text-accent">Shameel</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8C30 2 60 4 100 6C140 8 170 3 198 7"
                  stroke="#E8613C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            <motion.span
              {...waveHand}
              className="inline-block ml-2 origin-[70%_70%]"
              style={{ display: 'inline-block' }}
            >
              <svg width="48" height="48" viewBox="0 0 36 36" className="inline w-[0.75em] h-[0.75em]">
                <path fill="#FFDC5D" d="M18.5 3.5c0-1.1-.9-2-2-2s-2 .9-2 2v10h4v-10z"/>
                <path fill="#FFDC5D" d="M23.5 7.5c0-1.1-.9-2-2-2s-2 .9-2 2v8h4v-8z"/>
                <path fill="#FFDC5D" d="M28.5 8.5c0-1.1-.9-2-2-2s-2 .9-2 2v7h4v-7z"/>
                <path fill="#FFDC5D" d="M13.5 8.5c0-1.1-.9-2-2-2s-2 .9-2 2v13.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-2.5c-1.5-2.5-4-1.5-3 1 1 2.5 2 5 3 7 2 4 5 6 10 6 6 0 10-4 10-10v-8c0-1.1-.9-2-2-2s-2 .9-2 2"/>
              </svg>
            </motion.span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1rem,2.2vw,1.35rem)] text-fg-muted font-light leading-relaxed max-w-xl"
          >
            Full-stack engineer walking the DevOps path. From Arch Linux to Kubernetes — I build, run, and automate the systems I create.
          </motion.p>
        </div>

        {/* Pixel font tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-10"
        >
          <span className="font-[Silkscreen] text-[18px] md:text-[20px] text-accent tracking-wider uppercase">
            Linux / Kubernetes / CI/CD / Home Lab / Self-Hosted
          </span>
        </motion.div>

        {/* Quick Capabilities Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
        >
          {/* Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-col gap-2.5 p-4 rounded-2xl bg-pastel-blue/30 border border-blue-100/40"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span className="font-[Silkscreen] text-[14px] tracking-wider uppercase font-bold">Build</span>
            </div>
            <p className="text-[13px] text-fg-muted leading-snug">
              Modern web apps with <span className="text-fg font-medium">React, Next.js, and TypeScript.</span> Type-safe and performant.
            </p>
          </motion.div>

          {/* Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-col gap-2.5 p-4 rounded-2xl bg-pastel-purple/30 border border-purple-100/40"
          >
            <div className="flex items-center gap-2 text-purple-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              <span className="font-[Silkscreen] text-[14px] tracking-wider uppercase font-bold">DevOps</span>
            </div>
            <p className="text-[13px] text-fg-muted leading-snug">
              Self-hosted <span className="text-fg font-medium">Kubernetes</span> cluster. GitHub Actions pipelines. Learning <span className="text-fg font-medium">Terraform</span> next.
            </p>
          </motion.div>

          {/* AI / Automation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="flex flex-col gap-2.5 p-4 rounded-2xl bg-pastel-orange/30 border border-orange-100/40"
          >
            <div className="flex items-center gap-2 text-orange-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 00-4 4v1a3 3 0 00-3 3 3 3 0 000 6 3 3 0 003 3v1a4 4 0 008 0v-1a3 3 0 003-3 3 3 0 000-6 3 3 0 00-3-3V6a4 4 0 00-4-4z"/><path d="M12 2v20"/></svg>
              <span className="font-[Silkscreen] text-[14px] tracking-wider uppercase font-bold">Automate</span>
            </div>
            <p className="text-[13px] text-fg-muted leading-snug">
              Leveraging <span className="text-fg font-medium">AI & n8n</span> to build autonomous workflows and ship 3x faster.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint — HIDDEN on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden md:flex"
      >
        <span className="text-[15px] text-fg-faint font-[Silkscreen] tracking-wider">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-2 border-fg-faint/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
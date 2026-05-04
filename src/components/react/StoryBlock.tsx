import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StoryBlockProps {
  eyebrow: string;
  heading: string;
  body: string;
  aside?: string;
  warm?: boolean;
  icon?: 'rocket' | 'compass' | 'wrench' | 'lightbulb' | 'cpu' | 'brain';
  children?: React.ReactNode;
}

const icons: Record<string, React.ReactNode> = {
  rocket: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  wrench: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  lightbulb: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
    </svg>
  ),
  cpu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
    </svg>
  ),
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 00-4 4v1a3 3 0 00-3 3 3 3 0 000 6 3 3 0 003 3v1a4 4 0 008 0v-1a3 3 0 003-3 3 3 0 000-6 3 3 0 00-3-3V6a4 4 0 00-4-4z"/>
      <path d="M12 2v20"/>
    </svg>
  ),
};

const pastelBgs: Record<string, string> = {
  rocket: 'bg-pastel-orange/50',
  compass: 'bg-pastel-blue/50',
  wrench: 'bg-pastel-purple/50',
  lightbulb: 'bg-pastel-yellow/50',
  cpu: 'bg-pastel-green/50',
  brain: 'bg-pastel-pink/50',
};

const pastelTextColors: Record<string, string> = {
  rocket: 'text-accent',
  compass: 'text-blue-500',
  wrench: 'text-purple-500',
  lightbulb: 'text-yellow-600',
  cpu: 'text-green-600',
  brain: 'text-pink-500',
};

export default function StoryBlock({ eyebrow, heading, body, aside, warm, icon = 'rocket', children }: StoryBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-20 relative ${warm ? 'bg-surface-warm' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Pixel font eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.08 }}
            className={`w-10 h-10 rounded-xl ${pastelBgs[icon]} flex items-center justify-center ${pastelTextColors[icon]} shrink-0`}
          >
            {icons[icon]}
          </motion.div>
          <span className="font-[Silkscreen] text-[18px] text-accent tracking-widest uppercase">
            {eyebrow}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl lg:text-[2.8rem] font-bold leading-[1.12] tracking-tight mb-8 max-w-3xl">
          {heading}
        </h2>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <p className="text-base md:text-lg text-fg-muted font-light leading-[1.75]">
              {body}
            </p>
          </div>

          {aside && (
            <div className="md:col-span-5 md:col-start-8">
              <div className="rounded-2xl bg-surface border border-border p-5 relative overflow-hidden">
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-accent/5" />
                <div className="flex items-start gap-3 relative">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent mt-0.5 shrink-0">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  <p className="text-sm text-fg-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: aside }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {children && <div className="mt-10">{children}</div>}
      </div>
    </motion.section>
  );
}
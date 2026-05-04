import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export default function TextReveal({ text, className = '', highlightWords = [] }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.15"]
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`px-6 md:px-12 lg:px-20 py-20 md:py-32 relative ${className}`}>
      {/* Subtle side progress bar */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-6 md:left-12 lg:left-20 top-20 md:top-32 w-0.5 h-[calc(100%-10rem)] bg-gradient-to-b from-accent/60 to-accent/10 rounded-full origin-top hidden md:block"
      />

      <div className="max-w-4xl mx-auto md:pl-8">
        <p className="flex flex-wrap text-xl md:text-3xl lg:text-[2.4rem] font-semibold leading-[1.5] tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} highlight={isHighlight}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: any;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <span className="relative mr-[0.3em] mt-1">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${highlight ? 'text-accent' : ''}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
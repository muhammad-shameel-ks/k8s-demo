import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft blobs — very muted */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 -right-48 w-[550px] h-[550px] rounded-full bg-pastel-orange/25 blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[70vh] -left-48 w-[400px] h-[400px] rounded-full bg-pastel-blue/20 blur-[120px]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[160vh] -right-32 w-[350px] h-[350px] rounded-full bg-pastel-purple/18 blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[250vh] -left-40 w-[300px] h-[300px] rounded-full bg-pastel-green/15 blur-[120px]"
      />

      {/* Small decorative elements — subtle */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[12vh] right-[8vw] w-10 h-10 rounded-full border-2 border-accent/10 animate-float hidden md:block"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[50vh] left-[6vw] w-6 h-6 rounded-md bg-pastel-blue/30 animate-float-slow rotate-12 hidden md:block"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[130vh] left-[10vw] animate-spin-slow hidden md:block"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent/12">
          <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[200vh] right-[6vw] w-5 h-5 rounded-full bg-pastel-pink/25 animate-float hidden md:block"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[280vh] left-[4vw] w-14 h-14 rounded-full border border-dashed border-accent/10 animate-spin-slow hidden md:block"
      />
    </div>
  );
}
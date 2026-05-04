import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', weight: 1 },
  { id: 'chapter-01', weight: 1.5 },
  { id: 'chapter-02', weight: 1 },
  { id: 'chapter-03', weight: 1.2 },
  { id: 'projects', weight: 2 },
  { id: 'chapter-04', weight: 1 },
  { id: 'chapter-05', weight: 1 },
  { id: 'contact', weight: 1.5 },
];

export default function TopProgress() {
  const { scrollYProgress } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hide when modal is open
  useEffect(() => {
    const checkModal = () => {
      setIsModalOpen(document.body.hasAttribute('data-modal-open'));
    };
    checkModal();
    const interval = setInterval(checkModal, 100);
    return () => clearInterval(interval);
  }, []);

// Hide using CSS when modal is open (allows re-appearance)
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/30 transition-opacity duration-200"
      style={{ opacity: isModalOpen ? 0 : 1, pointerEvents: isModalOpen ? 'none' : 'auto' }}
    >
      <motion.div
        style={{ width }}
        className="h-full bg-accent"
        transition={{ ease: 'linear', duration: 0.1 }}
      />
    </div>
  );
}
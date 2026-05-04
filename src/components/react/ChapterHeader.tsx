import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Chapter {
  id: string;
  number: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'chapter-01', number: '01', label: 'The Origin' },
  { id: 'chapter-02', number: '02', label: 'The Philosophy' },
  { id: 'chapter-03', number: '03', label: 'The Sysadmin' },
  { id: 'projects', number: 'WORK', label: 'The Work' },
  { id: 'chapter-04', number: '04', label: 'The Multiplier' },
  { id: 'chapter-05', number: '05', label: 'The Toolkit' },
  { id: 'contact', number: '06', label: 'The Connection' },
];

export default function ChapterHeader() {
  const [visibleChapter, setVisibleChapter] = useState<Chapter | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollY } = useScroll();
   
  // Show after scrolling past hero (~200px)
  const opacity = useTransform(scrollY, [200, 400], [0, 1]);
  const y = useTransform(scrollY, [200, 400], [-10, 0]);

  // Hide when modal is open - check continuously
  useEffect(() => {
    const checkModal = () => {
      setIsModalOpen(document.body.hasAttribute('data-modal-open'));
    };
    checkModal();
    const interval = setInterval(checkModal, 50);
    return () => clearInterval(interval);
  }, []);

  // Hide when modal opens using inline style override

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        const topEntry = intersecting[0];
        const chapter = CHAPTERS.find(c => c.id === topEntry.target.id);
        if (chapter) {
          setVisibleChapter(chapter);
        }
      }
    };

    const observerOptions = {
      rootMargin: '-40% 0% -40% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Show when first chapter comes into view
  useEffect(() => {
    const checkVisible = () => {
      const heroHeight = window.innerHeight * 0.7;
      setIsVisible(window.scrollY > heroHeight);
    };
    
    checkVisible();
    window.addEventListener('scroll', checkVisible);
    return () => window.removeEventListener('scroll', checkVisible);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visibleChapter && isVisible && (
        <motion.div
          style={{ 
            opacity: isModalOpen ? 0 : opacity, 
            y: isModalOpen ? -10 : y,
            pointerEvents: isModalOpen ? 'none' : 'auto'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border/50 transition-opacity duration-200"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            {/* Chapter indicator */}
            <div className="flex items-center gap-3">
              <span className="font-[Silkscreen] text-xs text-accent tracking-widest">
                {visibleChapter.number}
              </span>
              <div className="w-px h-4 bg-border" />
              <span className="font-[Silkscreen] text-xs text-fg-muted tracking-wider uppercase">
                {visibleChapter.label}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
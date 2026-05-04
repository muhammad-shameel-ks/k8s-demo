import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'chapter-01', label: 'Story' },
  { id: 'chapter-02', label: 'Ethos' },
  { id: 'chapter-03', label: 'Admin' },
  { id: 'projects', label: 'Work' },
  { id: 'chapter-04', label: 'AI' },
  { id: 'chapter-05', label: 'Tools' },
  { id: 'contact', label: 'Reach' },
];

export default function PersistentNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  
  // Only show the dock after scrolling down 300px
  const dockOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const dockY = useTransform(scrollY, [200, 400], [20, 0]);
  
  // Use CSS to hide when modal is open (more reliable)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkModal = () => {
      setIsModalOpen(document.body.hasAttribute('data-modal-open'));
    };
    checkModal();
    // Check more frequently
    const interval = setInterval(checkModal, 50);
    return () => clearInterval(interval);
  }, []);

  // Use CSS class to hide instead of returning null (allows re-appearance)

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        setActiveSection(intersecting[intersecting.length - 1].target.id);
      }
    };

    const observerOptions = {
      rootMargin: '-30% 0% -50% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      aria-label="Table of contents"
      style={{ 
        opacity: isModalOpen ? 0 : dockOpacity, 
        y: isModalOpen ? 20 : dockY,
        pointerEvents: isModalOpen ? 'none' : 'auto'
      }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-200"
    >
      <ul className="bg-white/90 backdrop-blur-md border border-border px-2 py-1.5 md:px-3 md:py-2 rounded-xl md:rounded-2xl shadow-lg flex items-center gap-0.5 md:gap-1.5 pointer-events-auto list-none">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`
                  relative px-1.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-xl transition-all duration-300 group
                  ${isActive ? 'text-accent' : 'text-fg-muted hover:text-fg hover:bg-pastel-orange/30'}
                  focus-visible:ring-2 focus-visible:ring-accent outline-none
                `}
              >
                <span className={`font-[Silkscreen] text-[8px] md:text-[11px] tracking-tight uppercase relative z-10 font-bold`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-pastel-orange/40 rounded-md md:rounded-xl z-0"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Tooltip-like label on hover - desktop only */}
                {!isActive && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none pb-1.5 md:pb-2 hidden md:block">
                    <div className="bg-fg text-white text-[9px] md:text-[10px] font-mono px-2 py-1 rounded-md whitespace-nowrap">
                      {item.label}
                    </div>
                    <div className="w-1.5 h-1.5 bg-fg rotate-45 mx-auto -mt-1" />
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
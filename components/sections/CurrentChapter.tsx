'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const DEPTH_CARDS = [
  {
    title: 'RAG Pipeline Architecture',
    content:
      'Designed and implemented Retrieval-Augmented Generation pipelines for clinical trial documentation — enabling precise, context-aware information retrieval across complex medical datasets. The system intelligently surfaces relevant trial data, reducing lookup time and improving research accuracy.',
    accent: 'var(--signal)',
  },
  {
    title: 'Clinical Trial Product Development',
    content:
      'Contributing to product development at the intersection of AI and healthcare. Building tools that help clinical researchers navigate trial data with intelligence — from protocol matching to adverse event analysis — making life-science workflows faster and safer.',
    accent: 'var(--plasma)',
  },
];

export default function CurrentChapter() {
  const [expanded, setExpanded] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [isSuppressed, setIsSuppressed] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.6 });

  // Detect genuine user scroll to prevent reveal on programmatic jumps
  useEffect(() => {
    const handleUserScroll = () => {
      setUserHasScrolled(true);
    };
    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });
    
    const handleNavJump = (e: any) => {
      if (e.detail?.id === 'chapter') {
        setIsSuppressed(true);
        setUserHasScrolled(false);
        // Reset suppression after the programmatic scroll likely finished
        setTimeout(() => setIsSuppressed(false), 1500);
      }
    };
    window.addEventListener('nav-jump', handleNavJump);

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      window.removeEventListener('nav-jump', handleNavJump);
    };
  }, []);

  // Only expand on scroll down and if it was a genuine user-initiated movement
  useEffect(() => {
    if (isInView && !expanded && userHasScrolled && !isSuppressed) {
      setExpanded(true);
    }
  }, [isInView, expanded, userHasScrolled, isSuppressed]);

  return (
    <section
      id="chapter"
      className="section"
      ref={containerRef}
      style={{ minHeight: '120vh', display: 'flex', alignItems: 'center', padding: '100px 60px' }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--signal)' }} />
          <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '11px', letterSpacing: '0.2em' }}>
            SECTION 01 — CURRENT CHAPTER
          </span>
        </motion.div>

        {/* Expandable card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* SVG border trace on hover */}
          <svg
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
              zIndex: 2,
              overflow: 'visible',
            }}
          >
            <motion.rect
              x="1" y="1"
              width="calc(100% - 2px)" height="calc(100% - 2px)"
              rx="12"
              fill="none"
              stroke="var(--signal)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileHover={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
            />
          </svg>

          <motion.div
            style={{
              padding: '40px',
              background: 'rgba(3, 13, 26, 0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              position: 'relative',
              backdropFilter: 'blur(20px)',
              transition: 'border-color 0.3s',
            }}
            whileHover={{ borderColor: 'rgba(0,245,196,0.2)' }}
          >
            {/* Chapter header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '8px' }}>
                  CHAPTER 01 — PRESENT
                </div>
                <h2
                  className="font-display"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800, color: 'var(--frost)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
                >
                  Eteraflex Connects
                </h2>
                <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '8px' }}>
                  AI/ML Developer Intern · 2024 — Ongoing
                </div>
              </div>
            </div>

            {/* Summary always visible */}
            <p className="font-display" style={{ color: 'rgba(226,232,240,0.65)', fontSize: '16px', lineHeight: 1.7, fontWeight: 300 }}>
              Working at the frontier of AI and healthcare — building intelligent systems that transform how clinical trials are researched, documented, and understood.
            </p>

            {/* Ongoing progress bar */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="font-mono" style={{ color: 'var(--muted)', fontSize: '10px' }}>PROGRESS</span>
                <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '10px', animation: 'progress-pulse 2s ease-in-out infinite' }}>
                  ONGOING
                </span>
              </div>
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--signal), var(--plasma))',
                    borderRadius: '1px',
                    animation: 'ongoing-progress 3s ease-in-out infinite',
                    width: '65%',
                  }}
                />
              </div>
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {DEPTH_CARDS.map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.1, duration: 0.4 }}
                        style={{
                          padding: '24px',
                          background: 'rgba(255,255,255,0.025)',
                          border: `1px solid ${card.accent}22`,
                          borderLeft: `3px solid ${card.accent}`,
                          borderRadius: '8px',
                        }}
                      >
                        <div className="font-mono" style={{ color: card.accent, fontSize: '11px', letterSpacing: '0.15em', marginBottom: '10px' }}>
                          {card.title.toUpperCase()}
                        </div>
                        <p className="font-display" style={{ color: 'rgba(226,232,240,0.7)', fontSize: '14px', lineHeight: 1.7 }}>
                          {card.content}
                        </p>
                      </motion.div>
                    ))}

                    {/* Tech used */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '8px' }}>
                      {['Python', 'LangChain', 'RAG', 'LLMs', 'FastAPI', 'Vector DBs', 'AWS'].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono"
                          style={{
                            padding: '4px 12px',
                            background: 'rgba(0,245,196,0.06)',
                            border: '1px solid rgba(0,245,196,0.15)',
                            borderRadius: '4px',
                            color: 'var(--signal)',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Cinematic Hint */}
        {!expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '14px', letterSpacing: '0.2em', fontWeight: 600 }}>
              ↑ SCROLL TO DEEP DIVE
            </div>
            <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, var(--signal), transparent)' }} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STORY_ACTS = [
  { text: 'It started with curiosity.', delay: 0 },
  { text: 'Now, it\'s about architecture.', delay: 800 },
  { text: 'Building the intelligence that powers the next generation of AI/ML.', delay: 1600 },
];

export default function HeroTerminal() {
  const [displayedActs, setDisplayedActs] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [actIndex, setActIndex] = useState(0);
  const [showCTAs, setShowCTAs] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (actIndex >= STORY_ACTS.length) {
      setTimeout(() => setShowCTAs(true), 600);
      setTypingDone(true);
      return;
    }

    const { text, delay } = STORY_ACTS[actIndex];
    let charIdx = 0;

    const startTimeout = setTimeout(() => {
      setCurrentTyping('');
      const typeInterval = setInterval(() => {
        if (charIdx < text.length) {
          setCurrentTyping(text.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setDisplayedActs((prev) => [...prev, text]);
          setCurrentTyping('');
          setActIndex((prev) => prev + 1);
        }
      }, 20);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [actIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scan line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--signal), transparent)',
          opacity: 0.4,
          animation: 'scan 4s linear infinite',
          zIndex: 2,
        }}
      />

      {/* Terminal container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '900px', position: 'relative', zIndex: 5 }}
      >
        {/* Terminal header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '8px 8px 0 0',
            border: '1px solid rgba(255,255,255,0.06)',
            borderBottom: 'none',
          }}
        >
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
          <span className="font-mono" style={{ marginLeft: '12px', color: 'var(--muted)', fontSize: '11px' }}>
            varshith@portfolio ~ init.sh
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: '32px 36px',
            background: 'rgba(3, 13, 26, 0.85)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '0 0 8px 8px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Prompt line */}
          <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '12px', marginBottom: '24px', opacity: 0.6 }}>
            $ system.boot() // loading narrative...
          </div>

          {/* Written acts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            {displayedActs.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display"
                style={{
                  fontSize: i === 2 ? 'clamp(20px, 3vw, 36px)' : 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: i === 2 ? 700 : 400,
                  color: i === 2 ? 'var(--frost)' : 'rgba(226,232,240,0.55)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                }}
              >
                {i === 2 ? (
                  <>
                    Building the intelligence that powers{' '}
                    <span className="text-gradient-signal">the next generation</span> of AI/ML.
                  </>
                ) : act}
              </motion.div>
            ))}
          </div>

          {/* Currently typing line */}
          {currentTyping && (
            <div
              className="font-display"
              style={{
                fontSize: actIndex === 3 ? 'clamp(20px, 3vw, 36px)' : 'clamp(18px, 2.5vw, 28px)',
                fontWeight: actIndex === 3 ? 700 : 400,
                color: actIndex === 2 ? 'var(--frost)' : 'rgba(226,232,240,0.55)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
              }}
            >
              {currentTyping}
              <span className="cursor-blink" style={{ color: 'var(--signal)', marginLeft: '2px' }}>▋</span>
            </div>
          )}

          {/* Idle cursor when done */}
          {typingDone && !currentTyping && (
            <span className="cursor-blink font-mono" style={{ color: 'var(--signal)', fontSize: '20px' }}>▋</span>
          )}

          {/* CTAs */}
          {showCTAs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => scrollTo('work')}
                className="font-mono"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(0,245,196,0.08)',
                  border: '1px solid rgba(0,245,196,0.3)',
                  borderRadius: '6px',
                  color: 'var(--signal)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'rgba(0,245,196,0.15)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(0,245,196,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'rgba(0,245,196,0.08)';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                /explore_work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="font-mono"
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  color: 'rgba(226,232,240,0.5)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.target as HTMLButtonElement).style.color = 'var(--frost)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.target as HTMLButtonElement).style.color = 'rgba(226,232,240,0.5)';
                }}
              >
                /connect
              </button>
            </motion.div>
          )}
        </div>

        {/* Floating role tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          style={{
            marginTop: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--signal)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <span className="font-mono" style={{ color: 'rgba(226, 232, 240, 0.8)', fontSize: '11px', letterSpacing: '0.15em' }}>
            AI/ML DEVELOPER INTERN — ETERAFLEX CONNECTS
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 5,
        }}
      >
        <span className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.2em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--signal), transparent)' }}
        />
      </motion.div>
    </section>
  );
}

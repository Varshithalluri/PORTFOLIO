'use client';

import { useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'INIT', number: '00' },
  { id: 'chapter', label: 'CHAPTER', number: '01' },
  { id: 'work', label: 'THE WORK', number: '02' },
  { id: 'stack', label: 'TECH STACK', number: '03' },
  { id: 'contact', label: 'CONNECT', number: '04' },
];

export default function MobileBottomDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerY = useSpring(isOpen ? 0 : 280, { stiffness: 300, damping: 22 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,5,9,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 48,
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        style={{
          y: isOpen ? 0 : 280,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(3,13,26,0.97)',
          borderTop: '1px solid rgba(0,245,196,0.15)',
          borderRadius: '20px 20px 0 0',
          zIndex: 49,
          padding: '24px 20px 36px',
          backdropFilter: 'blur(30px)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
        transition={{ stiffness: 300, damping: 22 }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
        </div>

        {/* Nav items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ y: 10, opacity: 0 }}
              animate={isOpen ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4px',
                cursor: 'pointer',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '9px', opacity: 0.5 }}>{item.number}</span>
              <span className="font-mono" style={{ color: 'var(--frost)', fontSize: '11px', letterSpacing: '0.12em', fontWeight: 500 }}>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Pull tab trigger (always visible at bottom) */}
      <motion.button
        onClick={toggle}
        style={{
          position: 'fixed',
          bottom: isOpen ? '320px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(3,13,26,0.9)',
          border: '1px solid rgba(0,245,196,0.25)',
          borderRadius: '50px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 50,
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
          transition: 'bottom 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--signal)', animation: 'pulse-glow 2s infinite' }} />
        <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '10px', letterSpacing: '0.15em' }}>
          {isOpen ? 'CLOSE' : 'NAVIGATE'}
        </span>
      </motion.button>
    </>
  );
}

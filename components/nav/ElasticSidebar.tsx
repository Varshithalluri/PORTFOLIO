'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'INIT', number: '00' },
  { id: 'chapter', label: 'CHAPTER', number: '01' },
  { id: 'work', label: 'THE WORK', number: '02' },
  { id: 'stack', label: 'TECH STACK', number: '03' },
  { id: 'contact', label: 'CONNECT', number: '04' },
];

export default function ElasticSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useSpring(0, { stiffness: 300, damping: 20 });
  const sidebarX = useSpring(-280, { stiffness: 300, damping: 20 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    sidebarX.set(-280);
  };

  const openSidebar = () => {
    setIsOpen(true);
    sidebarX.set(0);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    sidebarX.set(-280);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,5,9,0.6)',
              backdropFilter: 'blur(4px)', zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>

      {/* Pull handle / trigger strip */}
      <motion.div
        onHoverStart={openSidebar}
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '6px',
          height: '80px',
          background: 'linear-gradient(180deg, #00f5c4, #7c3aed)',
          borderRadius: '0 4px 4px 0',
          zIndex: 50,
          cursor: 'pointer',
        }}
        whileHover={{ width: '10px', transition: { duration: 0.2 } }}
      />

      {/* Sidebar panel */}
      <motion.nav
        style={{
          x: sidebarX,
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '280px',
          background: 'rgba(3, 13, 26, 0.95)',
          borderRight: '1px solid rgba(0, 245, 196, 0.1)',
          backdropFilter: 'blur(20px)',
          zIndex: 45,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 32px',
        }}
        onHoverEnd={closeSidebar}
      >
        {/* Logo mark */}
        <div style={{ marginBottom: '48px' }}>
          <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '4px' }}>
            VARSHITH.SYS
          </div>
          <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '10px' }}>
            v1.0.0 // AI/ML
          </div>
        </div>

        {/* Nav items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ x: -20, opacity: 0 }}
              animate={isOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: i * 0.05, stiffness: 300, damping: 20 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s',
              }}
              whileHover={{
                background: 'rgba(0,245,196,0.05)',
                x: 4,
              }}
            >
              <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '10px', opacity: 0.5, minWidth: '20px' }}>
                {item.number}
              </span>
              <span className="font-mono" style={{ color: 'var(--frost)', fontSize: '12px', letterSpacing: '0.15em', fontWeight: 500 }}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Bottom indicator */}
        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.1em' }}>
            DRAG TO PULL ←
          </div>
        </div>
      </motion.nav>
    </>
  );
}

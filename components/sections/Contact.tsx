'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('avsvarma7@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,245,196,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
      >
        <div style={{ width: '40px', height: '1px', background: 'var(--signal)' }} />
        <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '11px', letterSpacing: '0.2em' }}>
          SECTION 05 — CONNECT
        </span>
      </motion.div>

      {/* Big CTA text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '900px', marginBottom: '64px' }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'var(--frost)',
            marginBottom: '24px',
          }}
        >
          Let's Build{' '}
          <span className="text-gradient-signal">Something.</span>
        </h2>
        <p className="font-display" style={{ color: 'rgba(226,232,240,0.45)', fontSize: '17px', fontWeight: 300, lineHeight: 1.6, maxWidth: '520px' }}>
          Whether it's an AI system, a product that matters, or just a conversation about what's next — I'm here.
        </p>
      </motion.div>

      {/* Contact cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}
      >
        {/* Email */}
        <motion.button
          onClick={copyEmail}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '20px 28px',
            background: 'rgba(0,245,196,0.06)',
            border: '1px solid rgba(0,245,196,0.2)',
            borderRadius: '10px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '6px' }}>
            {copied ? '✓ COPIED' : 'EMAIL'}
          </div>
          <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '14px' }}>
            avsvarma7@gmail.com
          </div>
        </motion.button>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/varshith-alluri"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '20px 28px',
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'block',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '6px' }}>
            LINKEDIN
          </div>
          <div className="font-mono" style={{ color: 'var(--plasma)', fontSize: '14px' }}>
            /in/varshith-alluri ↗
          </div>
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/Varshithalluri"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '20px 28px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'block',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '6px' }}>
            GITHUB
          </div>
          <div className="font-mono" style={{ color: 'var(--frost)', fontSize: '14px' }}>
            Varshithalluri ↗
          </div>
        </motion.a>
      </motion.div>

      {/* Footer bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span className="font-mono" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '0.1em' }}>
            © 2026 VARSHITH ALLURI — BUILT WITH INTELLIGENCE
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--signal)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '9px', letterSpacing: '0.15em' }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

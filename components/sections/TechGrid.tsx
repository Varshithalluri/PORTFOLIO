'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const TECH_STACK = [
  // AI/ML
  { name: 'Python', color: '#3776ab', bg: '#1e3a5f', category: 'AI/ML' },
  { name: 'PyTorch', color: '#ee4c2c', bg: '#4a1a10', category: 'AI/ML' },
  { name: 'TensorFlow', color: '#ff6f00', bg: '#4a2800', category: 'AI/ML' },
  { name: 'LangChain', color: '#00f5c4', bg: '#003d35', category: 'AI/ML' },
  { name: 'NVIDIA', color: '#76b900', bg: '#2a3a00', category: 'AI/ML' },
  { name: 'OpenGL', color: '#5586a4', bg: '#1a2a35', category: 'AI/ML' },
  // Cloud / Backend
  { name: 'AWS', color: '#ff9900', bg: '#4a2e00', category: 'Cloud' },
  { name: 'Azure', color: '#0089d6', bg: '#00274d', category: 'Cloud' },
  { name: 'Firebase', color: '#ffca28', bg: '#4a3800', category: 'Cloud' },
  { name: 'Docker', color: '#2496ed', bg: '#0a2a4a', category: 'Cloud' },
  { name: 'Node.js', color: '#339933', bg: '#0d2e0d', category: 'Backend' },
  { name: 'FastAPI', color: '#009688', bg: '#002e2a', category: 'Backend' },
  // Frontend
  { name: 'React', color: '#61dafb', bg: '#0a2a35', category: 'Frontend' },
  { name: 'Next.js', color: '#ffffff', bg: '#1a1a1a', category: 'Frontend' },
  { name: 'TypeScript', color: '#007acc', bg: '#00264a', category: 'Frontend' },
  { name: 'React Native', color: '#61dafb', bg: '#0a2030', category: 'Mobile' },
  { name: 'Flutter', color: '#54c5f8', bg: '#0a2a35', category: 'Mobile' },
  // Database
  { name: 'PostgreSQL', color: '#336791', bg: '#0f2240', category: 'Database' },
  { name: 'MySQL', color: '#4479a1', bg: '#0a2035', category: 'Database' },
  { name: 'Supabase', color: '#3ecf8e', bg: '#0a2a20', category: 'Database' },
  // Tools
  { name: 'Git', color: '#f05032', bg: '#4a1a0a', category: 'Tools' },
  { name: 'GitHub', color: '#ffffff', bg: '#1a1a1a', category: 'Tools' },
  { name: 'Figma', color: '#f24e1e', bg: '#4a1a0a', category: 'Tools' },
  { name: 'Blender', color: '#ea7600', bg: '#4a2800', category: 'Tools' },
  { name: 'Unity', color: '#ffffff', bg: '#222222', category: 'Tools' },
  { name: 'Vercel', color: '#ffffff', bg: '#111111', category: 'Tools' },
  { name: 'Java', color: '#f89820', bg: '#4a2e00', category: 'Languages' },
  { name: 'C#', color: '#9b4f96', bg: '#2e0a35', category: 'Languages' },
  { name: 'Kubernetes', color: '#326ce5', bg: '#0a1a4a', category: 'DevOps' },
  { name: 'GitHub Actions', color: '#2088ff', bg: '#0a2040', category: 'DevOps' },
];

function TechBadge({ name, color, bg }: { name: string; color: string; bg: string }) {
  const [hovered, setHovered] = useState(false);
  const [dithering, setDithering] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setDithering(true);
    setTimeout(() => setDithering(false), 600);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className="font-mono"
      animate={dithering ? {
        filter: ['contrast(1) grayscale(0)', 'contrast(15) grayscale(1) brightness(0.4)', 'contrast(8) grayscale(0.5) brightness(1.3)', 'contrast(1) grayscale(0)'],
        scale: [1, 0.94, 1.03, 1],
      } : { filter: 'contrast(1) grayscale(0)', scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      style={{
        padding: '7px 14px',
        background: bg,
        border: `1px solid ${color}44`,
        borderRadius: '6px',
        color: color,
        fontSize: '11px',
        letterSpacing: '0.1em',
        fontWeight: 600,
        cursor: 'default',
        userSelect: 'none',
        boxShadow: hovered ? `0 0 16px ${color}44, 0 0 32px ${color}22` : 'none',
        transition: 'box-shadow 0.3s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </motion.div>
  );
}

export default function TechGrid() {
  return (
    <section
      id="stack"
      className="section"
      style={{ padding: '100px 60px', minHeight: '80vh' }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
      >
        <div style={{ width: '40px', height: '1px', background: 'var(--ember)' }} />
        <span className="font-mono" style={{ color: 'var(--ember)', fontSize: '11px', letterSpacing: '0.2em' }}>
          SECTION 03 — TECH STACK
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display"
        style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: '16px',
          color: 'var(--frost)',
        }}
      >
        The Arsenal
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-mono"
        style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '48px' }}
      >
        HOVER TO DITHER — WATCH DATA PROCESS
      </motion.p>

      {/* Badge grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          maxWidth: '1100px',
        }}
      >
        {TECH_STACK.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025 }}
          >
            <TechBadge {...tech} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

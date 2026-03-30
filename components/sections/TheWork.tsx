'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    number: '01',
    name: 'Recipe Organizer',
    tagline: 'Your kitchen, structured.',
    description:
      'A cross-platform mobile app that solves the chaos of scattered recipe notes. Centralize, search, and access your culinary creations — built collaboratively across a 4-person team.',
    tech: ['React Native', 'JavaScript', 'AsyncStorage', 'Expo'],
    accent: '#00f5c4',
    status: 'SHIPPED',
    github: 'https://github.com/Varshithalluri/RecipeOrganizer',
    label: 'MOBILE APP',
  },
  {
    number: '02',
    name: 'Weather App',
    tagline: 'The atmosphere, decoded.',
    description:
      'A React Native mobile app that renders immersive, weather-matched backgrounds — sunny, rain, fog, storm, snow. Every condition gets its own visual language. UX as storytelling.',
    tech: ['React Native', 'JavaScript', 'Expo', 'Weather API'],
    accent: '#7c3aed',
    status: 'SHIPPED',
    github: 'https://github.com/Varshithalluri/Weather-app',
    label: 'MOBILE APP',
  },
  {
    number: '03',
    name: 'Grocery Platform',
    tagline: 'Commerce, reimagined. Still cooking.',
    description:
      'A full-stack grocery web experience currently in active development. Momentum — you\'re always building. Architecture and decisions being formed in real time.',
    tech: ['Web', 'JavaScript', 'React'],
    accent: '#ff6b35',
    status: 'IN PROGRESS',
    github: null,
    label: 'WEB APP',
  },
];

export default function TheWork() {
  return (
    <section
      id="work"
      className="section"
      style={{ minHeight: '100vh', padding: '100px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
      >
        <div style={{ width: '40px', height: '1px', background: 'var(--plasma)' }} />
        <span className="font-mono" style={{ color: 'var(--plasma)', fontSize: '11px', letterSpacing: '0.2em' }}>
          SECTION 02 — THE FOUNDATION
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-gradient-plasma"
        style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: '16px',
        }}
      >
        The Work
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display"
        style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '64px', maxWidth: '500px' }}
      >
        The craft before the intelligence. Each project a lesson; every line of code a step closer to architecture.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.number}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <motion.div
              whileHover={{ scale: 1.01, borderColor: `${project.accent}44` }}
              style={{
                padding: '36px',
                background: 'rgba(3, 13, 26, 0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="font-mono" style={{ color: project.accent, fontSize: '11px', opacity: 0.6 }}>
                    {project.number}
                  </span>
                  <span className="font-mono" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', letterSpacing: '0.15em' }}>
                    {project.label}
                  </span>
                </div>

                {/* Status badge */}
                <div
                  className="font-mono"
                  style={{
                    padding: '4px 12px',
                    border: `1px solid ${project.accent}44`,
                    borderRadius: '4px',
                    color: project.accent,
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    animation: project.status === 'IN PROGRESS' ? 'progress-pulse 2s ease-in-out infinite' : 'none',
                  }}
                >
                  {project.status}
                </div>
              </div>

              {/* Name + tagline */}
              <div style={{ marginBottom: '12px' }}>
                <h3 className="font-display" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--frost)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                  {project.name}
                </h3>
                <div className="font-mono" style={{ color: project.accent, fontSize: '12px', opacity: 0.7 }}>
                  {project.tagline}
                </div>
              </div>

              {/* Description */}
              <p className="font-display" style={{ color: 'rgba(226,232,240,0.6)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                {project.description}
              </p>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                {/* Tech tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono"
                      style={{
                        padding: '3px 10px',
                        background: `${project.accent}0d`,
                        border: `1px solid ${project.accent}22`,
                        borderRadius: '4px',
                        color: project.accent,
                        fontSize: '9px',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono"
                    style={{
                      color: project.accent,
                      fontSize: '11px',
                      textDecoration: 'none',
                      letterSpacing: '0.1em',
                      border: `1px solid ${project.accent}33`,
                      padding: '6px 14px',
                      borderRadius: '4px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.background = `${project.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.background = 'transparent';
                    }}
                  >
                    /view_code ↗
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

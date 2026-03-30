'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const INDIA_CITIES = [
  { name: 'Delhi', state: 'Delhi', vibe: 'Monumental chaos, electric streets.', x: '42%', y: '28%' },
  { name: 'Rajasthan', state: 'Rajasthan', vibe: 'Golden dunes, ancient palaces.', x: '32%', y: '35%' },
  { name: 'Manali', state: 'Himachal Pradesh', vibe: 'Snow peaks, absolute silence.', x: '40%', y: '16%' },
  { name: 'Kashmir', state: 'J&K', vibe: 'Paradise found. Unreal serenity.', x: '36%', y: '11%' },
  { name: 'Pune', state: 'Maharashtra', vibe: 'Culture meets hustle.', x: '38%', y: '60%' },
  { name: 'Chennai', state: 'Tamil Nadu', vibe: 'Heat, temples, and the Bay of Bengal.', x: '50%', y: '78%' },
  { name: 'Andaman Islands', state: 'A&N Islands', vibe: 'Teal waters, raw wilderness.', x: '75%', y: '72%' },
];

const CITY_TICKER = [...INDIA_CITIES, ...INDIA_CITIES].map(c => c.name).join('  ·  ');

export default function TheJourney() {
  const [activeCity, setActiveCity] = useState<typeof INDIA_CITIES[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="journey"
      className="section"
      style={{ padding: '100px 60px', minHeight: '80vh' }}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
      >
        <div style={{ width: '40px', height: '1px', background: 'var(--signal)' }} />
        <span className="font-mono" style={{ color: 'var(--signal)', fontSize: '11px', letterSpacing: '0.2em' }}>
          SECTION 04 — THE JOURNEY
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
          color: 'var(--frost)',
          marginBottom: '8px',
        }}
      >
        Across India
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display"
        style={{ color: 'var(--muted)', fontSize: '15px', fontWeight: 300, marginBottom: '56px' }}
      >
        Curiosity doesn't stop at code. It follows roads, climbs mountains, and dives into oceans.
      </motion.p>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'relative',
          maxWidth: '700px',
          background: 'rgba(3,13,26,0.7)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          padding: '40px',
          backdropFilter: 'blur(20px)',
          marginBottom: '40px',
        }}
      >
        {/* India SVG outline (simplified) */}
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', maxWidth: '500px', display: 'block', margin: '0 auto', overflow: 'visible' }}
        >
          {/* Simplified India polygon */}
          <polygon
            points="38,5 48,5 56,8 62,14 68,18 72,26 70,32 68,36 65,44 62,52 58,60 55,68 52,74 48,80 44,78 40,72 36,64 32,56 28,46 26,36 28,26 32,18 36,12"
            fill="rgba(0,245,196,0.04)"
            stroke="rgba(0,245,196,0.15)"
            strokeWidth="0.5"
          />
          {/* Kashmir / North extension */}
          <polygon
            points="36,5 38,5 36,12 32,18 28,16 30,10"
            fill="rgba(0,245,196,0.04)"
            stroke="rgba(0,245,196,0.1)"
            strokeWidth="0.3"
          />
          {/* Andaman islands */}
          <circle cx="76" cy="72" r="1.5" fill="rgba(0,245,196,0.08)" stroke="rgba(0,245,196,0.2)" strokeWidth="0.4" />
          <circle cx="77" cy="75" r="1" fill="rgba(0,245,196,0.06)" stroke="rgba(0,245,196,0.15)" strokeWidth="0.3" />

          {/* City nodes */}
          {INDIA_CITIES.map((city, i) => {
            const cx = parseFloat(city.x);
            const cy = parseFloat(city.y);
            return (
              <g key={city.name}>
                {/* Pulse ring */}
                <circle
                  cx={cx} cy={cy} r="3"
                  fill="none"
                  stroke="rgba(0,245,196,0.2)"
                  strokeWidth="0.5"
                  style={{ animation: `node-ring ${1.5 + i * 0.3}s ease-out infinite` }}
                />
                {/* Core dot */}
                <circle
                  cx={cx} cy={cy} r="1.2"
                  fill="var(--signal)"
                  style={{
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 0 3px rgba(0,245,196,0.8))',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGElement).closest('svg')!.getBoundingClientRect();
                    setActiveCity(city);
                    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onMouseLeave={() => setActiveCity(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {activeCity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              padding: '16px 20px',
              background: 'rgba(3,13,26,0.95)',
              border: '1px solid rgba(0,245,196,0.2)',
              borderRadius: '8px',
              backdropFilter: 'blur(20px)',
              maxWidth: '200px',
              pointerEvents: 'none',
            }}
          >
            <div className="font-mono" style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
              {activeCity.name}
            </div>
            <div className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '8px' }}>
              {activeCity.state.toUpperCase()}
            </div>
            <div className="font-display" style={{ color: 'rgba(226,232,240,0.7)', fontSize: '12px', lineHeight: 1.5 }}>
              {activeCity.vibe}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 8px var(--signal)' }} />
          <span className="font-mono" style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.1em' }}>
            HOVER A NODE — DISCOVER THE VIBE
          </span>
        </div>
      </motion.div>

      {/* City ticker */}
      <div style={{ overflow: 'hidden', marginTop: '32px', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px',
          background: 'linear-gradient(to right, var(--void), transparent)', zIndex: 2
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px',
          background: 'linear-gradient(to left, var(--void), transparent)', zIndex: 2
        }} />
        <div className="ticker-inner font-mono" style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'rgba(0,245,196,0.3)', fontSize: '11px', letterSpacing: '0.2em' }}>
            {CITY_TICKER}
          </span>
          <span style={{ color: 'rgba(0,245,196,0.3)', fontSize: '11px', letterSpacing: '0.2em' }}>
            {CITY_TICKER}
          </span>
        </div>
      </div>
    </section>
  );
}

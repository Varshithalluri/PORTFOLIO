'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LiquidTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const warp = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);

  return (
    <div ref={ref} style={{ position: 'relative', height: '80px', overflow: 'hidden', zIndex: 10 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <filter id="liquid">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01 0.02"
              numOctaves="2"
              seed="5"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <motion.path
          style={{ y: warp }}
          d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,80 L0,80 Z"
          fill="rgba(0,245,196,0.03)"
          filter="url(#liquid)"
        />
        <motion.path
          style={{ y: useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 0]) }}
          d="M0,50 Q360,10 720,50 Q1080,90 1440,50 L1440,80 L0,80 Z"
          fill="rgba(124,58,237,0.02)"
          filter="url(#liquid)"
        />
        {/* Divider line */}
        <motion.line
          x1="0" y1="40" x2="1440" y2="40"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

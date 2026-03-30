'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll, useVelocity, useMotionValue } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', title: 'INIT', label: 'The Foundation', desc: 'Academic background.', y_pos: 20 },
  { id: 'chapter', title: 'CHAPTER', label: 'The Pivot', desc: 'Discovering AI/ML.', y_pos: 35 },
  { id: 'work', title: 'THE WORK', label: 'The Present', desc: 'Building systems.', y_pos: 50 },
  { id: 'stack', title: 'STACK', label: 'The Toolkit', desc: 'Technology stack.', y_pos: 65 },
  { id: 'contact', title: 'CONNECT', label: 'The Future', desc: 'Inquiries & Contact.', y_pos: 80 },
];

export default function StringNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll Velocity Physics (for "weight" lag and bounce)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const scrollLagY = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);

  // Verlet-style X displacement for string nodes
  const s0 = useSpring(0, { stiffness: 400, damping: 20 });
  const s1 = useSpring(0, { stiffness: 400, damping: 20 });
  const s2 = useSpring(0, { stiffness: 400, damping: 20 });
  const s3 = useSpring(0, { stiffness: 400, damping: 20 });
  const s4 = useSpring(0, { stiffness: 400, damping: 20 });
  const nodeSprings = useMemo(() => [s0, s1, s2, s3, s4], [s0, s1, s2, s3, s4]);

  // Magnetic Pull Springs for text items (X and Y offsets)
  const mX0 = useSpring(0, { stiffness: 200, damping: 15 }); const mY0 = useSpring(0, { stiffness: 200, damping: 15 });
  const mX1 = useSpring(0, { stiffness: 200, damping: 15 }); const mY1 = useSpring(0, { stiffness: 200, damping: 15 });
  const mX2 = useSpring(0, { stiffness: 200, damping: 15 }); const mY2 = useSpring(0, { stiffness: 200, damping: 15 });
  const mX3 = useSpring(0, { stiffness: 200, damping: 15 }); const mY3 = useSpring(0, { stiffness: 200, damping: 15 });
  const mX4 = useSpring(0, { stiffness: 200, damping: 15 }); const mY4 = useSpring(0, { stiffness: 200, damping: 15 });
  
  const magXSprings = useMemo(() => [mX0, mX1, mX2, mX3, mX4], [mX0, mX1, mX2, mX3, mX4]);
  const magYSprings = useMemo(() => [mY0, mY1, mY2, mY3, mY4], [mY0, mY1, mY2, mY3, mY4]);

  // Pointer Interaction
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      NAV_ITEMS.forEach((item, i) => {
        const nodeY = (item.y_pos * window.innerHeight) / 100;
        // Always pinned to right-side
        const stringX = window.innerWidth - 60; // Approximate absolute position
        
        const dx = e.clientX - stringX;
        const dy = e.clientY - nodeY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 120px interaction radius
        if (distance < 120) {
          const pullStrength = (120 - distance) / 120; // 0 to 1
          
          // String gets "plucked" (max 30px displacement)
          nodeSprings[i].set(dx * pullStrength * 0.4);
          
          // Text gets magnetic pull
          magXSprings[i].set(dx * pullStrength * 0.2);
          magYSprings[i].set(dy * pullStrength * 0.2);
        } else {
          nodeSprings[i].set(0);
          magXSprings[i].set(0);
          magYSprings[i].set(0);
        }
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [nodeSprings, magXSprings, magYSprings]);

  // Active Section Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 }); // Trigger when 40% of section is visible
    
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    window.dispatchEvent(new CustomEvent('nav-jump', { detail: { id } }));
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .chromatic-active {
          color: #00F5FF !important;
          text-shadow: 2px 0px 0px rgba(255,0,0,0.7), -2px 0px 0px rgba(0,0,255,0.7);
          filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.4));
        }
        
        @media (max-width: 768px) {
          .nav-container { 
            right: 15px !important; 
            left: auto !important; 
            transform: scale(0.75); 
            transform-origin: center right;
          }
          /* Ensure hover/magnetic area is functional even when scaled */
          .nav-label { 
            margin-right: 10px !important; 
            margin-left: 0 !important; 
            text-align: right !important; 
          }
        }
      `}</style>
      
      <div
        className="nav-container"
        style={{
          position: 'fixed',
          right: '25px',
          top: 0,
          height: '100vh',
          width: '80px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* The Physics Verlet String */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        >
          {/* Active Tension Path */}
          <StringPath nodeSprings={nodeSprings} />
          
          {/* Horizontal Elastic Tendrils connecting string to labels */}
          {NAV_ITEMS.map((item, i) => (
            <TendrilLine 
              key={`tendril-${i}`} 
              itemY={item.y_pos} 
              strX={nodeSprings[i]} 
              magX={magXSprings[i]} 
              magY={magYSprings[i]}
              scrollLag={scrollLagY} 
              isActive={activeSection === item.id}
            />
          ))}
        </svg>

        {/* Narrative Labels */}
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: `${item.y_pos}vh`,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollTo(item.id)}
            >
              {/* Combine Magnetic + Scroll Elasticity + Active Scaling */}
              <motion.div
                className="nav-label"
                style={{
                  x: magXSprings[i],
                  // Combine magnetic Y and scroll velocity lag Y
                  y: useTransform([magYSprings[i], scrollLagY], ([my, sy]: any) => my + sy),
                  marginRight: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '100%',
                  zIndex: 2,
                }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  opacity: isActive || isHovered ? 1 : 0.4,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {/* Title */}
                <div 
                  className={`font-mono ${isActive ? 'chromatic-active' : ''}`}
                  style={{ 
                    fontSize: '11px', 
                    letterSpacing: '0.15em', 
                    fontWeight: isActive ? 700 : 400,
                    color: 'var(--signal)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.title}
                </div>
                
                {/* Narrative Label */}
                <div 
                  className="font-display"
                  style={{ 
                    fontSize: isActive ? '14px' : '12px', 
                    color: isActive ? '#fff' : 'rgba(226,232,240,0.8)',
                    letterSpacing: '0.05em',
                    marginTop: '2px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.label}
                </div>

                {/* Dither/Glitch Hover Descriptor */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isHovered ? 0.7 : 0, 
                    height: isHovered ? 'auto' : 0 
                  }}
                  className="font-mono"
                  style={{
                    fontSize: '9px',
                    color: 'var(--muted)',
                    marginTop: '4px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                  }}
                >
                  &gt; {item.desc}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Sub-component for dynamic continuous SVG string
function StringPath({ nodeSprings }: { nodeSprings: any[] }) {
  const d = useTransform(nodeSprings, (values: number[]) => {
    // String rests horizontally at 30px (which is left side of the nav container)
    // For Desktop, container is on the right, so string is on the left edge of container.
    // For Mobile, container left, string left edge.
    const baseX = 30; 
    const points = NAV_ITEMS.map((item, i) => {
      const y = (item.y_pos * window.innerHeight) / 100;
      const x = baseX + values[i];
      return { x, y };
    });

    let newD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpY = (p0.y + p1.y) / 2;
      newD += ` C ${p0.x} ${cpY}, ${p1.x} ${cpY}, ${p1.x} ${p1.y}`;
    }
    return newD;
  });

  return (
    <motion.path
      d={d}
      stroke="rgba(0, 245, 196, 0.4)" // Subtle teal to match signal
      strokeWidth="1.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ filter: 'blur(0.5px)' }} // Adds natural tension look
    />
  );
}

// Sub-component for elastic Tendrils connecting String to Label
// It reads the displacement of the string and the magnetic displacement of the text
function TendrilLine({ itemY, strX, magX, magY, scrollLag, isActive }: any) {
  const d = useTransform([strX, magX, magY, scrollLag], ([sx, mx, my, sy]: any) => {
    const baseX = 30; // String anchor
    const yAnchor = (itemY * window.innerHeight) / 100;
    
    // Label anchor (approx right side of container)
    const labelX = 65 + mx; 
    const labelY = yAnchor + my + sy;

    return `M ${baseX + sx} ${yAnchor} L ${labelX} ${labelY}`;
  });

  return (
    <motion.path
      d={d}
      stroke={isActive ? '#00F5FF' : 'rgba(0, 245, 196, 0.2)'}
      strokeWidth="1"
      strokeDasharray={isActive ? "none" : "2, 4"} // Dashed when inactive
      fill="none"
    />
  );
}

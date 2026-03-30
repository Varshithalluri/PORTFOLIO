'use client';

import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/lib/useScrollProgress';
import HeroTerminal from '@/components/sections/HeroTerminal';
import CurrentChapter from '@/components/sections/CurrentChapter';
import TheWork from '@/components/sections/TheWork';
import TechGrid from '@/components/sections/TechGrid';
import Contact from '@/components/sections/Contact';
import LiquidTransition from '@/components/ui/LiquidTransition';

// Client-only components (Three.js & cursor)
const ParticleField = dynamic(() => import('@/components/canvas/ParticleField'), { ssr: false });
const StringNav = dynamic(() => import('@/components/nav/StringNav'), { ssr: false });

export default function Home() {
  const scrollProgress = useScrollProgress();
  // Chaos: 1 at top, 0 at bottom (particles go from chaos → order as you scroll)
  const chaosLevel = 1 - scrollProgress;

  return (
    <>
      {/* Particle physics background */}
      <ParticleField chaosLevel={chaosLevel} />

      {/* Navigation - Unified String Style */}
      <StringNav />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroTerminal />
        <LiquidTransition />
        <CurrentChapter />
        <LiquidTransition />
        <TheWork />
        <LiquidTransition />
        <TechGrid />
        <LiquidTransition />
        <Contact />
      </main>
    </>
  );
}

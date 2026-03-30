'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  chaosLevel: number;
}

export default function ParticleField({ chaosLevel }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef(chaosLevel);

  useEffect(() => {
    chaosRef.current = chaosLevel;
  }, [chaosLevel]);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const COUNT = 2000;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const gridPositions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    // Ocean color (Blue)
    const oceanColor = new THREE.Color('#00d1ff');
    // Signal color (Teal/Green)
    const signalColor = new THREE.Color('#00f5c4');

    const COLS = 40;
    const ROWS = 50;
    const SPACING_X = 3.2;
    const SPACING_Y = 2.8;

    for (let i = 0; i < COUNT; i++) {
      // Random chaos positions
      const rx = (Math.random() - 0.5) * 200;
      const ry = (Math.random() - 0.5) * 150;
      const rz = (Math.random() - 0.5) * 80;
      basePositions[i * 3] = rx;
      basePositions[i * 3 + 1] = ry;
      basePositions[i * 3 + 2] = rz;

      // Grid order positions
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      gridPositions[i * 3] = (col - COLS / 2) * SPACING_X;
      gridPositions[i * 3 + 1] = (row - ROWS / 2) * SPACING_Y;
      gridPositions[i * 3 + 2] = 0;

      // Start at chaos
      positions[i * 3] = rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = rz;

      // Velocities for animation
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Colors start as ocean
      colors[i * 3] = oceanColor.r;
      colors[i * 3 + 1] = oceanColor.g;
      colors[i * 3 + 2] = oceanColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse influence
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / W - 0.5) * 2;
      mouse.y = -(e.clientY / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frame = 0;
    const animate = () => {
      const chaos = chaosRef.current;
      const order = 1 - chaos;
      frame++;

      const pos = geometry.attributes.position.array as Float32Array;
      const col = geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        // Target: lerp between chaos and grid
        const tx = basePositions[ix] + (gridPositions[ix] - basePositions[ix]) * order;
        const ty = basePositions[iy] + (gridPositions[iy] - basePositions[iy]) * order;
        const tz = basePositions[iz] + (gridPositions[iz] - basePositions[iz]) * order;

        // Chaotic drift
        if (chaos > 0.1) {
          velocities[ix] += (Math.random() - 0.5) * 0.002 * chaos;
          velocities[iy] += (Math.random() - 0.5) * 0.002 * chaos;
          velocities[iz] += (Math.random() - 0.5) * 0.001 * chaos;
          velocities[ix] *= 0.99;
          velocities[iy] *= 0.99;
          velocities[iz] *= 0.99;
          basePositions[ix] += velocities[ix];
          basePositions[iy] += velocities[iy];
          basePositions[iz] += velocities[iz];

          // Wrap
          if (Math.abs(basePositions[ix]) > 100) velocities[ix] *= -1;
          if (Math.abs(basePositions[iy]) > 75) velocities[iy] *= -1;
        }

        // Smooth approach to target
        pos[ix] += (tx - pos[ix]) * 0.03;
        pos[iy] += (ty - pos[iy]) * 0.03;
        pos[iz] += (tz - pos[iz]) * 0.03;

        // Mouse repulsion
        const dx = pos[ix] - mouse.x * 50;
        const dy = pos[iy] - mouse.y * 40;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          pos[ix] += (dx / dist) * 0.3 * chaos;
          pos[iy] += (dy / dist) * 0.3 * chaos;
        }

        // Color lerp
        col[ix] = oceanColor.r + (signalColor.r - oceanColor.r) * order;
        col[iy] = oceanColor.g + (signalColor.g - oceanColor.g) * order;
        col[iz] = oceanColor.b + (signalColor.b - oceanColor.b) * order;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Slow rotation when in order
      points.rotation.z += 0.0002 * (1 - chaos);
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.01;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.01;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    let animFrameId = requestAnimationFrame(animate);

    const onResize = () => {
      const nW = window.innerWidth;
      const nH = window.innerHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

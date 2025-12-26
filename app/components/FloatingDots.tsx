"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

const FloatingDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRadius = 150;
  const numParticles = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };
    
    // Color state
    let particleColor = "rgba(148, 163, 184, 0.5)"; // Default light mode

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updateColor = () => {
      // Check if dark class is present (manual toggle) or system prefers dark
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        particleColor = "rgba(255, 255, 255, 0.15)";
      } else {
        particleColor = "rgba(148, 163, 184, 0.5)";
      }
    };
    
    // Listen for manual theme toggles (class changes on html element)
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Listen for system color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = () => {
      // Only update if there's no manual override (no 'theme' in localStorage)
      if (!localStorage.getItem('theme')) {
        updateColor();
      }
    };
    mediaQuery.addEventListener('change', handleColorSchemeChange);
    
    // Initial color set
    updateColor();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow random velocity
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1, // Random size 1-3px
          baseX: Math.random() * width,
          baseY: Math.random() * height,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        // Basic movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse Interaction (Repulsion)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (interactionRadius - distance) / interactionRadius;
          const directionX = forceDirectionX * force * 5; // Strength
          const directionY = forceDirectionY * force * 5;

          p.x -= directionX;
          p.y -= directionY;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleColorSchemeChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default FloatingDots;

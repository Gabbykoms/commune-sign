import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // depth for tunnel effect
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

const StardustVortex: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to cover top-right-center area
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = window.innerWidth * 0.5; // Centered horizontally
    const centerY = window.innerHeight * 0.25; // Top-center area
    const particleCount = 80; // Fewer particles for calmer feel

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150 + 50;
      const z = Math.random() * 100;

      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        z: z,
        vx: Math.cos(angle) * 0.1,
        vy: Math.sin(angle) * 0.1,
        vz: -0.3 + Math.random() * 0.1, // Slow movement toward camera
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      // Clear canvas completely for clean particle rendering
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle radial gradient backdrop for depth
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(0.4, 'rgba(100, 150, 200, 0.04)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 400, 0, Math.PI * 2);
      ctx.fill();

      timeRef.current += 0.002; // Slower animation loop

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position with circular motion (slower, more harmonic)
        const angle = timeRef.current + (i / particles.length) * Math.PI * 2;
        const radius = 120 + Math.sin(angle * 0.3) * 40;
        const vortexX = centerX + Math.cos(angle) * radius;
        const vortexY = centerY + Math.sin(angle) * radius;

        // Lerp toward vortex center for pulling effect (slower, smoother)
        p.x += (vortexX - p.x) * 0.02;
        p.y += (vortexY - p.y) * 0.02;
        p.z += p.vz;

        // Reset particle if it reaches camera
        if (p.z <= 0) {
          p.z = 100;
          p.x = centerX + (Math.random() - 0.5) * 300;
          p.y = centerY + (Math.random() - 0.5) * 300;
        }

        // Calculate perspective scale (closer = larger)
        const scale = p.z / 100;
        const drawSize = p.size * scale * 1.5; // Slightly larger particles
        const opacity = p.opacity * 0.6; // Lower opacity for calming effect

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(drawSize, 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow for closer particles
        if (scale > 0.7) {
          ctx.fillStyle = `rgba(147, 197, 253, ${opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(drawSize * 1.5, 1), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default StardustVortex;

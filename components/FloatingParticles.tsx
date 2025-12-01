import React, { useEffect, useRef } from 'react';

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration
    const PARTICLE_COUNT = 20;
    const CONNECTION_DISTANCE = 250; // Distance to start drawing lines

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isGrowing: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 1.5; // Velocity Y
        this.radius = Math.random() * 20 + 10; // Base radius size
        this.isGrowing = Math.random() > 0.5;
      }

      update() {
        // 1. Move
        this.x += this.vx;
        this.y += this.vy;

        // 2. Check Collision & Bounce
        let didBounce = false;

        // Bounce horizontally
        if (this.x <= this.radius) {
          this.x = this.radius;
          this.vx *= -1;
          didBounce = true;
        } else if (this.x >= width - this.radius) {
          this.x = width - this.radius;
          this.vx *= -1;
          didBounce = true;
        }

        // Bounce vertically
        if (this.y <= this.radius) {
          this.y = this.radius;
          this.vy *= -1;
          didBounce = true;
        } else if (this.y >= height - this.radius) {
          this.y = height - this.radius;
          this.vy *= -1;
          didBounce = true;
        }

        // 3. Logic: If it bounced, invert growth direction (Previous Requirement)
        if (didBounce) {
          this.isGrowing = !this.isGrowing;
        }

        // 4. Update Size based on direction
        const growthSpeed = 0.1; 
        if (this.isGrowing) {
          this.radius += growthSpeed;
        } else {
          this.radius -= growthSpeed;
        }

        // 5. Safety Clamps
        if (this.radius > 50) {
          this.radius = 50;
          this.isGrowing = false; 
        } else if (this.radius < 5) {
          this.radius = 5;
          this.isGrowing = true; 
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Soft white gradient fill simulation
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
        ctx.closePath();
      }
    }

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Update all positions first
      particles.forEach((p) => p.update());

      // 2. Draw Connections (Family Ties)
      // We check every particle against every other particle
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < CONNECTION_DISTANCE) {
            // Calculate opacity: 1 when touching, 0 when at max distance
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`; // Max opacity 0.4 for subtlety
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      // 3. Draw Particles on top of lines
      particles.forEach((p) => p.draw());

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default FloatingParticles;
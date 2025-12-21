import React, { useEffect, useRef } from 'react';

const FAMILY_NAMES = [
  "Olga Juana", "Cristobal", "Diomadis", "Carlos Humberto", "Juliana",
  "Carlos Daniel", "Carolina", "Adalberto", "Marta Luz", "Marialejandra",
  "Magaly", "Roger", "Samuel", "Yomaira", "Ashlyn", "Ely", "Edgar",
  "Graciela", "German", "Alvaro", "Sandra", "Carlos Andres", "Hector Luis",
  "Alvarito", "Julian", "Saray", "Rosmira", "Ali", "Jaime", "Alberto",
  "Maria C", "Olga Lucia", "Jesus", "Hilda", "Ivan Dario", "Santiago",
  "Vanessa", "Augusto", "Camilo", "Mario", "Cecilia", "Miguel",
  "Luis Carlos", "Erika", "Gabriela", "Luciana", "Celeste", "Nicolas",
  "Martin Elias", "Leandro", "Alma", "Adhara"
];

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
    const PARTICLE_COUNT = 30;
    const CONNECTION_DISTANCE = 250;

    // Forward declaration to allow closure usage
    const particles: Particle[] = [];

    const getUniqueName = () => {
      const usedNames = particles.map(p => p.name);
      // Candidates: Names that are NOT used OR are the allowed duplicates (Juliana, Carlos Daniel)
      const candidates = FAMILY_NAMES.filter(name => {
        if (name === 'Juliana' || name === 'Carlos Daniel') return true;
        return !usedNames.includes(name);
      });

      // Fallback if all names used (unlikely given counts)
      if (candidates.length === 0) return FAMILY_NAMES[Math.floor(Math.random() * FAMILY_NAMES.length)];

      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      name: string;
      alpha: number;

      constructor(initialY?: number) {
        this.x = Math.random() * width;
        // Start random Y if initial, else start at top
        this.y = initialY !== undefined ? initialY : -50;
        // Gentle sway
        this.vx = (Math.random() - 0.5) * 0.5;
        // Falling speed based on "depth" (radius)
        this.vy = Math.random() * 1 + 0.5;
        this.radius = Math.random() * 40 + 40; // Super Massive snow particles (40-80px)
        this.name = getUniqueName();
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Slight random drift changes
        this.vx += (Math.random() - 0.5) * 0.02;
        // Clamp horizontal speed
        if (this.vx > 1) this.vx = 1;
        if (this.vx < -1) this.vx = -1;

        // Reset if off bottom of screen
        if (this.y > height + 50) {
          this.y = -50;
          this.x = Math.random() * width;
          this.name = getUniqueName(); // New name for new flake
        }

        // Wrap around sides for seamless wind feel
        if (this.x > width + 20) this.x = -20;
        if (this.x < -20) this.x = width + 20;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        // Draw a simple snowflake (circle with gradient or white)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Text
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha + 0.3})`;

        // Logic for multiline text
        const words = this.name.split(' ');
        const isTwoLine = words.length > 1;

        // Dynamic font size - Reduced by ~60% as requested
        // Previous multiplier was 0.8, now using 0.3
        const fontSize = Math.max(8, this.radius * 0.3);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Shadow for text readability against snow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;

        if (isTwoLine) {
          const offset = fontSize * 0.6;
          ctx.fillText(words[0], 0, -offset);
          ctx.fillText(words.slice(1).join(' '), 0, offset);
        } else {
          ctx.fillText(this.name, 0, 0);
        }

        ctx.restore();
      }
    }

    // Initialize particles spread out initially
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(Math.random() * height));
    }

    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Update positions
      particles.forEach((p) => p.update());

      // 2. Draw Connections (Subtle Frost Lines)
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.beginPath();
            // Very subtle white lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      // 3. Draw Particles
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
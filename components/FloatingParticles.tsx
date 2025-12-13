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
      isGrowing: boolean;
      name: string;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 20 + 25;
        this.isGrowing = Math.random() > 0.5;
        this.name = getUniqueName();

        // Generate diverse vibrant color
        const hue = Math.floor(Math.random() * 360);
        this.color = `hsla(${hue}, 75%, 75%, 0.4)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        let didBounce = false;

        if (this.x <= this.radius) {
          this.x = this.radius;
          this.vx *= -1;
          didBounce = true;
        } else if (this.x >= width - this.radius) {
          this.x = width - this.radius;
          this.vx *= -1;
          didBounce = true;
        }

        if (this.y <= this.radius) {
          this.y = this.radius;
          this.vy *= -1;
          didBounce = true;
        } else if (this.y >= height - this.radius) {
          this.y = height - this.radius;
          this.vy *= -1;
          didBounce = true;
        }

        if (didBounce) {
          this.isGrowing = !this.isGrowing;
          this.name = getUniqueName();
          // Update color on change for variety
          const hue = Math.floor(Math.random() * 360);
          this.color = `hsla(${hue}, 75%, 75%, 0.4)`;
        }

        const growthSpeed = 0.1;
        if (this.isGrowing) {
          this.radius += growthSpeed;
        } else {
          this.radius -= growthSpeed;
        }

        if (this.radius > 65) {
          this.radius = 65;
          this.isGrowing = false;
        } else if (this.radius < 25) {
          this.radius = 25;
          this.isGrowing = true;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Bubble visual: subtle white fill, colored stroke
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();

        // Text
        ctx.fillStyle = this.color;

        // Logic for multiline text
        const words = this.name.split(' ');
        // We split if it has words AND isn't just a short connection like "Ana"
        const isTwoLine = words.length > 1;

        // Dynamic font size based on radius, clamped
        const fontSize = Math.max(8, this.radius / (isTwoLine ? 3.0 : 2.5));
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (isTwoLine) {
          // Draw 2 lines
          const offset = fontSize * 0.6;
          ctx.fillText(words[0], this.x, this.y - offset);
          ctx.fillText(words.slice(1).join(' '), this.x, this.y + offset);
        } else {
          ctx.fillText(this.name, this.x, this.y);
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Update positions
      particles.forEach((p) => p.update());

      // 2. Draw Connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.beginPath();
            // Use a subtle mix or white for lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
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
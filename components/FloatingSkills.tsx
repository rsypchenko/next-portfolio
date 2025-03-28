"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

type Skill = {
  id: number;
  name: string;
  abbreviation: string;
  color: string;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
};

export default function FloatingSkills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const { theme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const skills = useRef<Skill[]>([
    { id: 1, name: "React", abbreviation: "Re", color: '#61DAFB', x: 0, y: 0, size: 40, speedX: 0.5, speedY: 0.3 },
    { id: 2, name: "TypeScript", abbreviation: "TS", color: '#3178C6', x: 0, y: 0, size: 38, speedX: -0.3, speedY: 0.5 },
    { id: 3, name: "JavaScript", abbreviation: "JS", color: '#F7DF1E', x: 0, y: 0, size: 36, speedX: -0.5, speedY: -0.3 },
    { id: 4, name: "Node.js", abbreviation: "NJ", color: '#339933', x: 0, y: 0, size: 38, speedX: 0.4, speedY: -0.4 },
    { id: 5, name: "GraphQL", abbreviation: "GQ", color: '#E10098', x: 0, y: 0, size: 36, speedX: 0.2, speedY: 0.6 },
    { id: 6, name: "Tailwind", abbreviation: "TW", color: '#06B6D4', x: 0, y: 0, size: 34, speedX: -0.4, speedY: 0.2 },
    { id: 7, name: "Git", abbreviation: "Git", color: '#F05032', x: 0, y: 0, size: 34, speedX: -0.2, speedY: -0.6 },
    { id: 8, name: "Docker", abbreviation: "Do", color: '#2496ED', x: 0, y: 0, size: 38, speedX: 0.3, speedY: -0.5 },
    { id: 9, name: "Cypress", abbreviation: "Cy", color: '#17202C', x: 0, y: 0, size: 36, speedX: 0.3, speedY: 0.4 },
    { id: 10, name: "Jest", abbreviation: "Je", color: '#C21325', x: 0, y: 0, size: 32, speedX: -0.3, speedY: -0.2 },
    { id: 11, name: "AWS", abbreviation: "AWS", color: '#FF9900', x: 0, y: 0, size: 36, speedX: 0.2, speedY: -0.3 },
    { id: 12, name: "Next.js", abbreviation: "NX", color: '#000000', x: 0, y: 0, size: 38, speedX: -0.25, speedY: 0.4 },
  ]).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Only reposition skills on first init or resize, not on theme change
      if (!isInitialized) {
        skills.forEach(skill => {
          skill.x = Math.random() * (canvas.width - skill.size);
          skill.y = Math.random() * (canvas.height - skill.size);
        });
        setIsInitialized(true);
      }
    };

    // Initialize positions
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Fix Next.js color in dark theme
    if (theme === 'dark' && skills.find(s => s.name === "Next.js")) {
      const nextJs = skills.find(s => s.name === "Next.js");
      if (nextJs) nextJs.color = '#FFFFFF';
    } else if (theme === 'light' && skills.find(s => s.name === "Next.js")) {
      const nextJs = skills.find(s => s.name === "Next.js");
      if (nextJs) nextJs.color = '#000000';
    }

    // Adjust Cypress color in dark theme
    if (theme === 'dark' && skills.find(s => s.name === "Cypress")) {
      const cypress = skills.find(s => s.name === "Cypress");
      if (cypress) cypress.color = '#FFFFFF';
    } else if (theme === 'light' && skills.find(s => s.name === "Cypress")) {
      const cypress = skills.find(s => s.name === "Cypress");
      if (cypress) cypress.color = '#17202C';
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      skills.forEach(skill => {
        // Move skill
        skill.x += skill.speedX;
        skill.y += skill.speedY;
        
        // Bounce off walls with slight randomization to prevent skills getting "stuck" in sync
        if (skill.x <= 0 || skill.x >= canvas.width - skill.size) {
          skill.speedX *= -1;
          skill.speedX += (Math.random() * 0.1 - 0.05); // Add tiny variation
          skill.speedX = Math.sign(skill.speedX) * Math.min(Math.abs(skill.speedX), 1.2); // Cap speed
        }
        if (skill.y <= 0 || skill.y >= canvas.height - skill.size) {
          skill.speedY *= -1;
          skill.speedY += (Math.random() * 0.1 - 0.05); // Add tiny variation
          skill.speedY = Math.sign(skill.speedY) * Math.min(Math.abs(skill.speedY), 1.2); // Cap speed
        }
        
        // Draw glow effect (outer circle)
        const gradient = ctx.createRadialGradient(
          skill.x + skill.size/2, skill.y + skill.size/2, skill.size/4,
          skill.x + skill.size/2, skill.y + skill.size/2, skill.size/1.5
        );
        gradient.addColorStop(0, `${skill.color}40`); // 25% opacity
        gradient.addColorStop(1, `${skill.color}05`); // 2% opacity
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(skill.x + skill.size/2, skill.y + skill.size/2, skill.size/1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw circular background
        ctx.beginPath();
        ctx.fillStyle = `${skill.color}20`; // 12% opacity
        ctx.arc(skill.x + skill.size/2, skill.y + skill.size/2, skill.size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add slight border
        ctx.beginPath();
        ctx.strokeStyle = `${skill.color}50`; // 31% opacity
        ctx.lineWidth = 1.5;
        ctx.arc(skill.x + skill.size/2, skill.y + skill.size/2, skill.size/2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw abbreviation for the skill
        ctx.fillStyle = skill.color;
        ctx.font = `bold ${skill.size * 0.4}px var(--font-geist-mono), monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.abbreviation, skill.x + skill.size/2, skill.y + skill.size/2);
        
        // Add subtle pulsing effect
        const pulseScale = 1 + Math.sin(Date.now() * 0.002 + skill.id) * 0.03;
        ctx.beginPath();
        ctx.strokeStyle = `${skill.color}25`; // 15% opacity
        ctx.lineWidth = 0.5;
        ctx.arc(
          skill.x + skill.size/2, 
          skill.y + skill.size/2, 
          (skill.size/2) * pulseScale, 
          0, 
          Math.PI * 2
        );
        ctx.stroke();
      });
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme, isInitialized]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
    />
  );
}
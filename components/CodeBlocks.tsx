"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

type CodeBlock = {
  id: number;
  code: string;
  x: number;
  y: number;
  opacity: number;
  speedY: number;
  maxWidth?: number;
};

export default function CodeBlocks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codeBlocks = useRef<CodeBlock[]>([]).current;
  const requestIdRef = useRef<number | null>(null);
  const { theme } = useTheme();
  
  const codeSnippets = [
    'const App = () => <div>Hello World</div>;',
    'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }',
    'for (let i = 0; i < array.length; i++) { console.log(array[i]); }',
    'const sum = numbers.reduce((a, b) => a + b, 0);',
    'useEffect(() => { fetchData(); }, []);',
    'export default function Component() { return <div />; }',
    'async function getData() { const response = await fetch("/api"); }',
    'const [state, setState] = useState(null);',
    'type User = { id: number; name: string; };',
    'interface Props { children: React.ReactNode; }',
    'import { useState, useEffect } from "react";',
    'const router = useRouter();',
    'const { data, isLoading, error } = useSWR("/api/data");',
    'const { theme, setTheme } = useTheme();',
    'tailwind.config.js = { darkMode: "class" }',
  ];

  const createCodeBlock = (canvas: HTMLCanvasElement) => {
    const code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    const x = Math.random() * canvas.width;
    // Calculate max width to ensure the code block doesn't exceed canvas bounds
    const maxWidth = canvas.width - x;
    
    const block = {
      id: Date.now() + Math.random(),
      code,
      x,
      y: canvas.height,
      opacity: 0.1 + Math.random() * 0.2,
      speedY: -0.5 - Math.random() * 1.0,
      maxWidth,
    };
    codeBlocks.push(block);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initial code blocks
    for (let i = 0; i < 5; i++) {
      createCodeBlock(canvas);
    }

    let lastBlockTime = 0;
    const blockInterval = 4000; // 4 seconds between new blocks

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new blocks
      if (timestamp - lastBlockTime > blockInterval) {
        createCodeBlock(canvas);
        lastBlockTime = timestamp;
        
        // Limit total number of blocks for performance
        if (codeBlocks.length > 20) {
          codeBlocks.shift(); // Remove oldest block
        }
      }
      
      // Update and draw blocks
      for (let i = codeBlocks.length - 1; i >= 0; i--) {
        const block = codeBlocks[i];
        
        // Move code block
        block.y += block.speedY;
        
        // Remove if offscreen
        if (block.y < -50) {
          codeBlocks.splice(i, 1);
          continue;
        }
        
        // Set font and color based on theme
        ctx.font = '14px var(--font-geist-mono), monospace';
        
        // Use theme-sensitive color
        const baseColor = theme === 'dark' ? 
          'rgba(78, 205, 196, ' : // Secondary color in dark mode
          'rgba(58, 175, 166, '; // Slightly darker in light mode
          
        ctx.fillStyle = baseColor + block.opacity + ')';
        
        // Handle text wrapping if the code is too long for its position
        const maxTextWidth = block.maxWidth || canvas.width - block.x;
        const text = block.code;
        
        // Truncate text if it's too long
        if (ctx.measureText(text).width > maxTextWidth) {
          let truncatedText = text;
          while (ctx.measureText(truncatedText + '...').width > maxTextWidth && truncatedText.length > 0) {
            truncatedText = truncatedText.slice(0, -1);
          }
          ctx.fillText(truncatedText + '...', block.x, block.y);
        } else {
          ctx.fillText(text, block.x, block.y);
        }
      }
      
      requestIdRef.current = requestAnimationFrame(draw);
    };
    
    requestIdRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
    />
  );
}
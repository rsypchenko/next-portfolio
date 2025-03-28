"use client";

import { useEffect, useState, useRef } from 'react';

// Individual code lines for the matrix effect
const codeLines = [
  "const app = express();",
  "function handleSubmit(event) {",
  "useState<string[]>([]);",
  "export default function Component() {",
  "const router = useRouter();",
  "const [data, setData] = useState(null);",
  "if (loading) return <Loader />;",
  "import React from 'react';",
  "<div className='container'>",
  "const handleClick = useCallback(() => {});",
  "const schema = z.object({});",
  "async function fetchData() {",
  "const { data } = await axios.get('/api/users');",
  "return { props: { data } }",
  "const theme = useTheme();",
  "const variants = { hidden: {}, visible: {} };",
  "const result = await prisma.user.findMany();",
  "throw new Error('Not implemented');",
  "app.use(express.json());",
  "export const getStaticProps = async () => {",
  "const styles = useStyles();",
  "const queryClient = useQueryClient();",
  "useEffect(() => { /* effect */ }, []);",
  "module.exports = config;",
  "export interface User {",
  "const [isOpen, setIsOpen] = useState(false);",
  "const matches = useMediaQuery('(min-width: 768px)');",
  "const cx = classNames('btn', { active: isActive });",
  "import { motion } from 'framer-motion';",
  "try { /* code */ } catch (error) { }",
  "await prisma.$transaction([]);",
];

type MatrixLine = {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
};

export default function Hero() {
  const [matrixLines, setMatrixLines] = useState<MatrixLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimeRef = useRef<number>(0);
  const frameRateRef = useRef<number>(1000 / 60); // 60fps
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const initialLines: MatrixLine[] = [];
    
    // Initial set of lines
    for (let i = 0; i < 20; i++) {
      initialLines.push(generateLine(containerRect.width));
    }
    
    setMatrixLines(initialLines);
    
    const animate = (timestamp: number) => {
      if (timestamp - lastTimeRef.current >= frameRateRef.current) {
        lastTimeRef.current = timestamp;
        
        // Spawn new lines at a rate of 1 per 200ms
        if (timestamp - spawnTimeRef.current > 200) {
          spawnTimeRef.current = timestamp;
          setMatrixLines(prev => {
            const newLines = [...prev];
            if (newLines.length < 60) { // Limit max number of lines
              newLines.push(generateLine(containerRect.width));
            }
            return newLines;
          });
        }
        
        // Move lines
        setMatrixLines(prev => {
          return prev
            .map(line => ({
              ...line,
              y: line.y + line.speed,
            }))
            .filter(line => line.y < containerRect.height); // Remove lines that are off-screen
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const generateLine = (containerWidth: number): MatrixLine => {
    return {
      id: Date.now() + Math.random(),
      text: codeLines[Math.floor(Math.random() * codeLines.length)],
      x: Math.random() * containerWidth,
      y: -20, // Start above the container
      speed: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.4,
      color: Math.random() > 0.8 ? 'var(--color-primary)' : 'currentColor',
    };
  };
  
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-r from-background to-background/70">
      {/* Matrix code effect */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      >
        {matrixLines.map((line) => (
          <div
            key={line.id}
            className="absolute font-mono text-xs whitespace-nowrap"
            style={{
              left: `${line.x}px`,
              top: `${line.y}px`,
              opacity: line.opacity,
              color: line.color,
              textShadow: line.color === 'var(--color-primary)' ? '0 0 8px var(--color-primary)' : 'none',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl backdrop-blur-sm bg-background/20 p-8 rounded-lg border border-foreground/10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block">Hello, I'm</span>
            <span className="text-primary block font-[family-name:var(--font-geist-mono)]">Roman Sypchenko</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 mb-8">
            Full Stack Developer & Problem Solver
          </h2>
          <p className="text-lg mb-10 text-foreground/70">
            I build elegant, performant, and user-friendly applications using modern web technologies.
            Specialized in React, Node.js, and cloud architecture.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#skills" 
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              My Skills
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 bg-transparent border border-foreground/20 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      {/* Simple decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-40 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute top-40 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
    </div>
  );
}
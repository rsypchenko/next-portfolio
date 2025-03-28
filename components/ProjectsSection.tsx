"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Rocket } from 'lucide-react';
import { projects } from '@/data/projects';
import { useRef, useState, useEffect } from 'react';

export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Show 3 projects on mobile, 6 on larger screens
  useEffect(() => {
    const handleResize = () => {
      setVisibleProjects(window.innerWidth >= 768 ? 3 : 2);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add fade-in animation when projects section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={projectsRef}
      className={`container mx-auto px-4 transition-opacity duration-1000 ${
        isIntersecting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Here are some of my recent projects. Each one presented unique challenges and opportunities to learn and grow.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, visibleProjects).map(project => (
          <div 
            key={project.id} 
            className="card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:translate-y-[-4px]"
          >
            <div className="h-52 overflow-hidden relative group">
              {/* Use Image with proper width/height for better CLS */}
              <Image 
                src={project.image} 
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={project.id <= 3}
              />
              
              {/* Overlay with icon on hover */}
              <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                <div className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  {project.icon}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group">
                <div className="text-primary w-5 h-5 transition-transform duration-300 group-hover:rotate-12">
                  {project.icon}
                </div>
                <span className="group-hover:text-primary transition-colors duration-300">{project.title}</span>
              </h3>
              <p className="text-foreground/70 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1 hover:bg-primary/20 transition-colors"
                  >
                    <Rocket className="w-3 h-3" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={project.demoUrl} 
                  className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live Demo
                </a>
                <a 
                  href={project.sourceUrl} 
                  className="text-sm text-secondary hover:text-secondary-hover flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background rounded"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`View source code of ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length > visibleProjects && (
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="px-6 py-3 bg-transparent border border-foreground/20 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2 justify-center mx-auto w-fit focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="View all projects"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  );
}
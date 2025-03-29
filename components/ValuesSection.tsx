"use client";

import React, { useEffect, useRef } from 'react';
import { Lightbulb, Users, BookOpen, Eye, Target, Code } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function ValueCard({ icon, title, description, delay }: ValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className="bg-background border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 opacity-0 translate-y-8 hover:border-primary/30 group"
    >
      <div className="text-primary mb-6 transition-all duration-300 group-hover:scale-110 flex items-center justify-center h-14 w-14 bg-primary/10 rounded-lg group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Problem Solving",
      description: "I believe the best applications solve real problems. I focus on understanding the core issues before writing a single line of code."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Great software is built by teams. I value clear communication, feedback, and working together to achieve the best possible outcomes."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Technology evolves rapidly. I'm committed to staying current with best practices and expanding my skill set through continuous learning."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Attention to Detail",
      description: "The small details matter. I take pride in crafting pixel-perfect interfaces and writing clean, optimized code."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "User-Centric Approach",
      description: "I design and build with the end user in mind. Intuitive interfaces and excellent user experiences are always my top priority."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Quality",
      description: "I'm committed to writing maintainable, scalable, and well-tested code that can stand the test of time."
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div ref={sectionRef} className="opacity-0 transition-opacity duration-1000">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">My Values</h2>
        <div className="flex justify-center mb-6">
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          These core principles guide my approach to software development and collaboration.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={100 * index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
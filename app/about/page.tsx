"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Users, BookOpen, Eye, Target, Code, 
  Briefcase, GraduationCap, Mail, Github, Linkedin, Twitter,
  Download, ChevronRight
} from 'lucide-react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, delay);
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
  }, [delay]);

  return (
    <div 
      ref={sectionRef} 
      className={`opacity-0 translate-y-10 transition-all duration-1000 ${className}`}
    >
      {children}
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:border-primary/30">
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

function SectionHeading({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">{title}</h2>
      <div className="flex justify-center mb-6">
        <div className="h-1 w-20 bg-primary rounded-full"></div>
      </div>
    </>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');
  
  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'journey', label: 'My Journey' },
    { id: 'values', label: 'My Values' },
  ];
  
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
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection delay={0}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About Me</h1>
        <div className="flex justify-center mb-8">
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>
      </AnimatedSection>
      
      {/* Mobile tabs */}
      <div className="md:hidden mb-10">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary/90 text-white' 
                  : 'bg-foreground/10 hover:bg-foreground/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* About section */}
      <div className={`${activeTab === 'about' || !activeTab ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection delay={200} className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-4 text-primary">Hi, I'm Roman Sypchenko</h2>
            <p className="mb-4 text-foreground/80 leading-relaxed">
              I'm a passionate full-stack developer with over 7 years of experience building web applications
              that solve real-world problems. My journey in software development began when I was 15,
              creating simple games and websites out of curiosity.
            </p>
            <p className="mb-4 text-foreground/80 leading-relaxed">
              After completing my Computer Science degree, I worked with several startups and established
              companies, which allowed me to gain experience across different domains and technologies.
            </p>
            <p className="mb-4 text-foreground/80 leading-relaxed">
              I specialize in React, TypeScript, and Node.js, but I'm always excited to learn new technologies
              and frameworks. I believe in writing clean, maintainable code and building applications that
              provide exceptional user experiences.
            </p>
            <p className="mb-6 text-foreground/80 leading-relaxed">
              When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes
              in the kitchen. I also contribute to open-source projects and mentor coding bootcamp students.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="/files/resume.pdf" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
              
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
                
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Connect with me on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
                
                <a
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Follow me on Twitter"
                >
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={400} className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-foreground/10 group-hover:border-primary/30 transition-all duration-300">
                <Image 
                  src="/images/avatar.jpg" 
                  alt="Roman Sypchenko" 
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Journey section */}
      <div className={`${activeTab === 'journey' ? 'block' : 'hidden md:block'} mb-16`}>
        <AnimatedSection delay={600}>
          <SectionHeading title="My Journey" />
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
              {/* Senior Developer */}
              <div className="bg-background border border-foreground/10 p-6 rounded-xl md:text-right hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Senior Developer</h3>
                <p className="text-primary mb-2">TechInnovate Inc.</p>
                <p className="text-foreground/70 mb-2">2020 - Present</p>
                <p className="text-foreground/80">
                  Leading frontend development for enterprise SaaS products. Architect and implement complex features while mentoring junior developers.
                </p>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="w-0.5 h-full bg-primary/20"></div>
              </div>
              
              <div className="hidden md:block"></div>
              
              {/* Full Stack Developer */}
              <div className="hidden md:block"></div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Code className="w-5 h-5" />
                </div>
                <div className="w-0.5 h-full bg-primary/20"></div>
              </div>
              
              <div className="bg-background border border-foreground/10 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Full Stack Developer</h3>
                <p className="text-primary mb-2">WebSolutions Co.</p>
                <p className="text-foreground/70 mb-2">2017 - 2020</p>
                <p className="text-foreground/80">
                  Developed and maintained client websites and web applications. Collaborated with designers and product managers to deliver high-quality solutions.
                </p>
              </div>
              
              {/* Junior Developer */}
              <div className="bg-background border border-foreground/10 p-6 rounded-xl md:text-right hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Junior Developer</h3>
                <p className="text-primary mb-2">StartupHub</p>
                <p className="text-foreground/70 mb-2">2015 - 2017</p>
                <p className="text-foreground/80">
                  Worked on frontend development for early-stage startups. Built responsive web interfaces and implemented user authentication systems.
                </p>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="w-0.5 h-full bg-primary/20"></div>
              </div>
              
              <div className="hidden md:block"></div>
              
              {/* Computer Science Degree */}
              <div className="hidden md:block"></div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              
              <div className="bg-background border border-foreground/10 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Computer Science Degree</h3>
                <p className="text-primary mb-2">University of Technology</p>
                <p className="text-foreground/70 mb-2">2011 - 2015</p>
                <p className="text-foreground/80">
                  Graduated with honors. Specialized in software engineering and web development. Led the university's coding club.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Values section */}
      <div className={activeTab === 'values' ? 'block' : 'hidden md:block'}>
        <AnimatedSection delay={800}>
          <SectionHeading title="My Values" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={900 + index * 100}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
      
      {/* Contact CTA */}
      <AnimatedSection delay={1200} className="mt-20">
        <div className="bg-background border border-foreground/10 rounded-xl p-8 shadow-sm text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Interested in working together? Have a project in mind or just want to say hello?
            I'd love to hear from you!
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Contact Me
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
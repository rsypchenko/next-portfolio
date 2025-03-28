"use client";

import { ExternalLink, Github, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { useState } from 'react';
import { ProjectFilter, ProjectSearch } from './client';

// ProjectCard component with detailed information
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="card rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 group flex flex-col h-full">
      <Link href={`/projects/${project.id}`} className="block">
        <div className="h-52 md:h-64 overflow-hidden relative">
          <Image 
            src={project.image} 
            alt={project.title}
            width={600}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay with icon on hover */}
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
            <div className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
              {project.icon}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6 flex-grow flex flex-col">
        <Link href={`/projects/${project.id}`} className="block group">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 group">
            <div className="text-primary w-5 h-5 transition-transform duration-300 group-hover:rotate-12">
              {project.icon}
            </div>
            <span className="group-hover:text-primary transition-colors duration-300">{project.title}</span>
          </h2>
        </Link>
        
        <p className="text-foreground/70 mb-5 flex-grow">{project.description}</p>
        
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
  );
}

// Client-side projects page component
export default function ProjectsClientPage() {
  // Get all unique tags for filtering
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  
  // State for filtering and searching
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle filter change
  const handleFilterChange = (tag: string | null) => {
    setActiveTag(tag);
    applyFilters(tag, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(activeTag, query);
  };
  
  // Apply both filters and search
  const applyFilters = (tag: string | null, query: string) => {
    let results = projects;
    
    // Apply tag filter
    if (tag) {
      results = results.filter(project => project.tags.includes(tag));
    }
    
    // Apply search query
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(lowercaseQuery) || 
        project.description.toLowerCase().includes(lowercaseQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    setFilteredProjects(results);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
        <p className="text-xl text-foreground/70 mb-8">
          Explore my portfolio of projects showcasing my skills in web development, 
          from interactive user interfaces to scalable backend solutions.
        </p>
        
        {/* Search component */}
        <ProjectSearch onSearch={handleSearch} />
        
        {/* Filter component */}
        <div className="md:flex items-center justify-center gap-3 flex-wrap hidden">
          <ProjectFilter allTags={allTags} onFilterChange={handleFilterChange} />
        </div>
      </div>
      
      {/* Projects grid with no results state */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold mb-2">No projects found</h3>
          <p className="text-foreground/70 mb-6">
            No projects match your current filter or search criteria.
          </p>
          <button
            onClick={() => {
              setActiveTag(null);
              setSearchQuery('');
              setFilteredProjects(projects);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Contact CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
        <p className="text-foreground/70 max-w-xl mx-auto mb-6">
          If you're looking for a developer to bring your ideas to life, 
          I'd love to hear from you.
        </p>
        <Link 
          href="/contact"
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
        >
          Get in Touch
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
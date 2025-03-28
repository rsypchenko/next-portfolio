"use client";

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';

// ProjectFilter component for client-side filtering
export function ProjectFilter({ 
  allTags, 
  onFilterChange 
}: { 
  allTags: string[], 
  onFilterChange: (tag: string | null) => void 
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Handle filter click
  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    onFilterChange(tag);
  };
  
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <span className="text-sm text-foreground/70 flex items-center gap-1">
        <Filter className="w-4 h-4" />
        Filter:
      </span>
      
      <div className="flex gap-2 flex-wrap justify-center">
        <button 
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            activeTag === null 
              ? 'bg-primary/10 text-primary' 
              : 'bg-background border border-border hover:border-primary/50 hover:text-primary'
          }`}
          onClick={() => handleTagClick(null)}
          aria-pressed={activeTag === null}
        >
          All
        </button>
        
        {allTags.map(tag => (
          <button 
            key={tag}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              activeTag === tag 
                ? 'bg-primary/10 text-primary' 
                : 'bg-background border border-border hover:border-primary/50 hover:text-primary'
            }`}
            onClick={() => handleTagClick(tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Search component for projects
export function ProjectSearch({ 
  onSearch 
}: { 
  onSearch: (query: string) => void 
}) {
  const [query, setQuery] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
  
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 pl-10 rounded-lg border border-border bg-card focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label="Search projects"
      />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>
  );
}
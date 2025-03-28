"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Clock, ChevronDown, Search, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { filterBlogPostsByCategory, filterBlogPostsByQuery } from '@/utils/blog-client';

// Client-side blog page component
export default function BlogClientPage({
  initialPosts,
  allCategories
}: {
  initialPosts: BlogPost[],
  allCategories: string[]
}) {
  const { theme } = useTheme();
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const postsEndRef = useRef<HTMLDivElement>(null);
  
  // Filter posts by search query and category
  const filteredPosts = initialPosts
    .filter(post => {
      // Apply category filter first
      if (selectedCategory && !post.categories.includes(selectedCategory)) {
        return false;
      }
      
      // Then apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.categories.some(cat => cat.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  
  // Load more posts with loading state
  const loadMorePosts = () => {
    setIsLoading(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
      setIsLoading(false);
      
      // Scroll to the new posts after they're rendered
      setTimeout(() => {
        if (postsEndRef.current) {
          postsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 400);
  };
  
  // Focus search input when pressing "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">My Blog</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto text-center mb-12">
          Thoughts, tips, and insights about web development, programming, and technology.
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 sticky top-20 z-10 bg-background/80 backdrop-blur-md p-4 rounded-lg border border-foreground/10">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/50" aria-hidden="true" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-10 py-2 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <span className="text-foreground/50 hover:text-foreground">✕</span>
              </button>
            )}
            <kbd className="absolute right-3 top-full mt-1 font-mono text-xs px-1.5 py-0.5 rounded border border-foreground/10 bg-foreground/5 text-foreground/50">
              /
            </kbd>
          </div>
          
          <div className="relative">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full md:w-48 px-4 py-2 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-foreground/50" aria-hidden="true" />
            </div>
          </div>
        </div>
        
        {/* Category tags for quick filtering */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null 
                ? 'bg-primary text-white' 
                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
            }`}
            aria-pressed={selectedCategory === null}
          >
            All
          </button>
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                category === selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
              }`}
              aria-pressed={category === selectedCategory}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>
        
        {/* Display message when no posts match filters */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-foreground/5 rounded-xl">
            <h2 className="text-xl font-bold mb-2">No posts found</h2>
            <p className="text-foreground/70 mb-4">
              No posts match your current search criteria.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-3 py-1.5"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Featured post (only if no filters are applied) */}
        {filteredPosts.length > 0 && !searchQuery && !selectedCategory && (
          <article className="mb-12 bg-background border border-foreground/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-6">
              <div className="relative h-60 md:h-full overflow-hidden">
                {filteredPosts[0].coverImage ? (
                  <Image 
                    src={filteredPosts[0].coverImage} 
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <div className="text-primary p-8 rounded-full bg-primary/5 border-2 border-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                        <path d="M18 14h-8"></path>
                        <path d="M15 18h-5"></path>
                        <path d="M10 6h8v4h-8V6Z"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 md:pr-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-foreground/60 text-sm">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={new Date(filteredPosts[0].date).toISOString()}>{formatDate(filteredPosts[0].date.toString())}</time>
                  <span aria-hidden="true">•</span>
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{filteredPosts[0].readTime}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-3 group">
                  <Link 
                    href={`/blog/${filteredPosts[0].slug}`}
                    className="group-hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    {filteredPosts[0].title}
                  </Link>
                </h2>
                
                <p className="text-foreground/70 mb-6 line-clamp-3 md:line-clamp-4">{filteredPosts[0].excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredPosts[0].categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      aria-label={`Filter by ${category}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <Link 
                  href={`/blog/${filteredPosts[0].slug}`}
                  className="inline-flex items-center text-primary hover:text-primary-hover transition-colors focus:outline-none focus:underline mt-auto w-fit"
                  aria-label={`Read more about ${filteredPosts[0].title}`}
                >
                  Read full article
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts
            .slice((!searchQuery && !selectedCategory) ? 1 : 0, visiblePosts) // Skip first post if it's featured
            .map(post => (
              <BlogPostCard key={post.id} post={post} onCategoryClick={setSelectedCategory} />
            ))}
        </div>
        
        {/* Load more button */}
        {visiblePosts < filteredPosts.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMorePosts}
              disabled={isLoading}
              className="px-6 py-3 bg-transparent border border-foreground/20 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70"
              aria-label="Load more articles"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Load More Articles'
              )}
            </button>
          </div>
        )}
        
        {/* Reference element for scrolling */}
        <div ref={postsEndRef} />
      </div>
    </div>
  );
}

// Blog post card component
function BlogPostCard({ 
  post, 
  onCategoryClick 
}: { 
  post: BlogPost, 
  onCategoryClick: (category: string) => void 
}) {
  return (
    <article 
      className="bg-background border border-foreground/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px] h-full flex flex-col"
    >
      {/* Post image or default icon */}
      <div className="relative h-48 overflow-hidden">
        {post.coverImage ? (
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <div className="text-primary p-6 rounded-full bg-primary/5 border-2 border-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                <path d="M18 14h-8"></path>
                <path d="M15 18h-5"></path>
                <path d="M10 6h8v4h-8V6Z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-foreground/60 text-sm">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date.toString())}</time>
          <span aria-hidden="true">•</span>
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>{post.readTime}</span>
        </div>
        
        <h2 className="text-xl font-bold mb-3 group">
          <Link 
            href={`/blog/${post.slug}`}
            className="group-hover:text-primary transition-colors focus:outline-none focus:text-primary"
          >
            {post.title}
          </Link>
        </h2>
        
        <p className="text-foreground/70 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
              aria-label={`Filter by ${category}`}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-primary-hover transition-colors focus:outline-none focus:underline mt-auto w-fit"
          aria-label={`Read more about ${post.title}`}
        >
          Read article
          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
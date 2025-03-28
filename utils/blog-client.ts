/**
 * Client-side blog utility functions
 * This file includes functions that are safe to use in client components
 */

import { BlogPost } from '@/types';

// Filter blog posts by search query
export function filterBlogPostsByQuery(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) {
    return posts;
  }
  
  const lowerCaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerCaseQuery) ||
    post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
    post.categories.some(cat => cat.toLowerCase().includes(lowerCaseQuery))
  );
}

// Filter blog posts by category
export function filterBlogPostsByCategory(posts: BlogPost[], category: string | null): BlogPost[] {
  if (!category) {
    return posts;
  }
  
  return posts.filter(post => post.categories.includes(category));
}

// Format a date for display
export function formatBlogDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Get related posts based on categories (client-safe)
export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.categories.some(cat => currentPost.categories.includes(cat))
    )
    .slice(0, limit);
}
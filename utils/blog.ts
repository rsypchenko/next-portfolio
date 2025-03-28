// This file should ONLY be imported in server components or server actions
// For client-side blog utilities, use blog-client.ts

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

// Mark this file as server-only to prevent client imports
import 'server-only';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  // Get all files from the blog directory
  const fileNames = fs.readdirSync(BLOG_DIRECTORY);
  
  // Parse each file and extract frontmatter and content
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Get slug from filename (remove .md extension)
      const slug = fileName.replace(/\.md$/, '');
      
      // Read markdown file content
      const fullPath = path.join(BLOG_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      const { data, content } = matter(fileContents);
      
      // Return combined data
      return {
        id: data.id || slug,
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        categories: data.categories || [],
        readTime: data.readTime || calculateReadTime(content),
        coverImage: data.coverImage || getDefaultCoverImage(data.categories?.[0]),
        content,
      };
    });
  
  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    // Check if the file exists
    const fullPath = path.join(BLOG_DIRECTORY, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id: data.id || slug,
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      categories: data.categories || [],
      readTime: data.readTime || calculateReadTime(content),
      coverImage: data.coverImage || getDefaultCoverImage(data.categories?.[0]),
      content,
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from blog posts
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set<string>();
  
  posts.forEach(post => {
    post.categories?.forEach(category => {
      categories.add(category);
    });
  });
  
  return Array.from(categories).sort();
}

/**
 * Calculate estimated read time based on content length
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

/**
 * Get a default cover image based on category
 */
function getDefaultCoverImage(category?: string): string {
  const defaultImage = '/images/blog/default.jpg';
  
  if (!category) return defaultImage;
  
  const categoryMap: Record<string, string> = {
    'React': '/images/blog/react.jpg',
    'JavaScript': '/images/blog/javascript.jpg',
    'TypeScript': '/images/blog/typescript.jpg',
    'Node.js': '/images/blog/nodejs.jpg',
    'CSS': '/images/blog/css.jpg',
    'Next.js': '/images/blog/nextjs.jpg',
    'Web Development': '/images/blog/webdev.jpg',
  };
  
  return categoryMap[category] || defaultImage;
}
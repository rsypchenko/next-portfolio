"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/helpers';
import { BlogPost } from '@/types';

export default function RecentBlogPosts({ 
  initialPosts 
}: { 
  initialPosts: BlogPost[] 
}) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('recent-blog');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="recent-blog" 
      className={`container mx-auto px-4 py-16 transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Articles</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Thoughts and insights on web development, programming, and technology.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initialPosts.map((post, index) => (
          <article 
            key={post.id}
            className="bg-background border border-foreground/10 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px] h-full flex flex-col"
            style={{ 
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both',
            }}
          >
            <div className="relative h-48 overflow-hidden">
              {post.coverImage ? (
                <Image 
                  src={post.coverImage} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
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
              <div className="mb-2 text-foreground/60 text-sm">
                <time dateTime={new Date(post.date).toISOString()}>
                  {formatDate(post.date.toString())}
                </time>
                {post.readTime && <span className="ml-2">· {post.readTime}</span>}
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
                >
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-foreground/70 mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
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
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          href="/blog"
          className="inline-block px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
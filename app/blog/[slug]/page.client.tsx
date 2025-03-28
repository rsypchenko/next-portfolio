"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Copy, Twitter, Linkedin } from 'lucide-react';
import { BlogPost } from '@/types';
import ReactMarkdown from 'react-markdown';

export default function ClientBlogPostPage({ 
  post, 
  relatedPosts,
  readTime
}: { 
  post: BlogPost, 
  relatedPosts: BlogPost[],
  readTime: string
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  
  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:text-primary"
          aria-label="Back to all blog posts"
        >
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
          Back to all posts
        </Link>
      </div>
      
      <article className="prose dark:prose-invert prose-lg max-w-none">
        <div className="relative h-72 md:h-96 -mx-4 md:mx-0 mb-8 rounded-lg overflow-hidden">
          {post.coverImage ? (
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <div className="text-primary p-10 rounded-full bg-primary/5 border-2 border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-foreground/60 mb-8">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
            <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date.toString())}</time>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>{readTime}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {post.categories.map(category => (
              <Link 
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="flex items-center text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                {category}
              </Link>
            ))}
          </div>
          
          {/* Share button */}
          <div className="relative ml-auto" ref={shareMenuRef}>
            <button 
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              className="flex items-center gap-1 text-foreground/60 hover:text-primary transition-colors focus:outline-none focus:text-primary"
              aria-label="Share article"
              aria-expanded={isShareMenuOpen}
              aria-controls="share-menu"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              <span>Share</span>
            </button>
            
            {isShareMenuOpen && (
              <div 
                id="share-menu"
                className="absolute right-0 top-full mt-2 bg-background border border-foreground/10 rounded-lg p-2 shadow-lg z-10"
              >
                <div className="flex flex-col gap-2 min-w-[150px]">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 rounded-md transition-colors text-left"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>{copySuccess ? 'Copied!' : 'Copy link'}</span>
                  </button>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 rounded-md transition-colors"
                  >
                    <Twitter className="h-4 w-4 text-[#1DA1F2]" aria-hidden="true" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 rounded-md transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-[#0077B5]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {post.content ? (
          <div className="mt-8">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                a: ({node, ...props}) => (
                  <a 
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                  />
                ),
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
                ),
                code: (props: any) => 
                  props.inline ? (
                    <code className="px-1 py-0.5 rounded bg-foreground/10 font-mono text-sm" {...props} />
                  ) : (
                    <pre className="p-4 rounded bg-foreground/10 font-mono text-sm overflow-x-auto my-6">{props.children}</pre>
                  ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-foreground/70">
              Full article content is not available yet.
            </p>
          </div>
        )}
      </article>
      
      {/* Author bio */}
      <div className="mt-12 border-t border-foreground/10 pt-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-foreground/5 rounded-lg">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-primary/10">
            <Image 
              src="/images/avatar.jpg" 
              alt="Roman Sypchenko" 
              width={80} 
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-center md:text-left">About the author</h2>
            <p className="text-foreground/70 mb-4 text-center md:text-left">
              Roman Sypchenko is a full-stack developer specializing in React, Next.js, and Node.js. With over 7 years of experience, he helps businesses build robust and scalable web applications.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link 
                href="/about"
                className="text-primary hover:text-primary-hover transition-colors focus:outline-none focus:underline"
              >
                Learn more about John
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 border-t border-foreground/10 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(relatedPost => (
              <div 
                key={relatedPost.id}
                className="flex gap-4 p-4 border border-foreground/10 rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                  {relatedPost.coverImage ? (
                    <Image 
                      src={relatedPost.coverImage} 
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                        <path d="M18 14h-8"></path>
                        <path d="M15 18h-5"></path>
                        <path d="M10 6h8v4h-8V6Z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <Link 
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-foreground/70 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary-hover transition-colors focus:outline-none focus:underline"
            >
              View all articles
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
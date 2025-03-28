import { formatDate } from '@/utils/helpers';
import { getBlogPostBySlug, getAllBlogPosts } from '@/utils/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ClientBlogPostPage from './page.client';
import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you\'re looking for does not exist.'
    };
  }
  
  return {
    title: `${post.title} | Roman Sypchenko's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Roman Sypchenko'],
      images: [
        {
          url: post.coverImage || '/images/blog/default.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const relatedPosts = getAllBlogPosts()
    .filter(p => p.slug !== post.slug)
    .filter(p => {
      // Find posts with matching categories
      return p.categories.some(cat => post.categories.includes(cat));
    })
    .slice(0, 2);
  
  // Calculate read time if not already provided
  const readTime = post.readTime || calculateReadTime(post.content);
  
  // Pass data to client component
  return <ClientBlogPostPage post={post} relatedPosts={relatedPosts} readTime={readTime} />;
}

// Calculate estimated read time based on content length
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}
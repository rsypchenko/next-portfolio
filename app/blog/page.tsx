// Server component that loads data
import { getAllBlogPosts, getAllCategories } from '@/utils/blog';
import { Metadata } from 'next';
import ClientBlogPage from './page.client';

export const metadata: Metadata = {
  title: 'Blog | Roman Sypchenko - Software Developer',
  description: 'Articles and insights about web development, programming, and technology.',
  openGraph: {
    title: 'Blog | Roman Sypchenko - Software Developer',
    description: 'Articles and insights about web development, programming, and technology.',
    images: [
      {
        url: '/images/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Roman Sypchenko Blog',
      },
    ],
  },
};

export default function BlogPage() {
  // Get data on the server side
  const allPosts = getAllBlogPosts();
  const allCategories = getAllCategories();
  
  // Pass serializable data to client component
  return <ClientBlogPage initialPosts={allPosts} allCategories={allCategories} />;
}
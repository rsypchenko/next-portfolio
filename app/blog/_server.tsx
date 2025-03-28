import { getAllBlogPosts, getAllCategories } from '@/utils/blog';
import { Metadata } from 'next';
import ClientPage from './page.client';

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

// Server component to fetch blog data
export default function BlogPage() {
  // Get blog posts and categories on the server
  const allPosts = getAllBlogPosts();
  const allCategories = getAllCategories();
  
  // Pass data to client component
  return <ClientPage initialPosts={allPosts} allCategories={allCategories} />;
}
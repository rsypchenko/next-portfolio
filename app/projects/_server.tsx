import { Metadata } from 'next';
import { projects } from '@/data/projects';
import ClientPage from './page';

export const metadata: Metadata = {
  title: 'Projects | Full-Stack Developer Portfolio',
  description: 'Explore my portfolio of web development projects including e-commerce, task management, real-time applications, and more.',
  openGraph: {
    title: 'Projects | Roman Sypchenko - Software Developer',
    description: 'Explore my portfolio of web development projects including e-commerce, task management, real-time applications, and more.',
    images: [
      {
        url: '/images/og-image-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Roman Sypchenko Projects',
      },
    ],
  },
};

// Server component to pass data to client
export default function ProjectsPage() {
  return <ClientPage />;
}
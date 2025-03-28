import { Project } from '@/types';
import { 
  ShoppingCart, 
  CheckSquare, 
  MessageCircle, 
  Code,
  LineChart,
  ShieldCheck,
  Layout,
  FileText
} from 'lucide-react';

// Import React for JSX
import React from 'react';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with cart, checkout, and payment integration. Includes product management, user accounts, and order tracking.',
    image: '/images/projects/ecommerce.jpg',
    icon: React.createElement(ShoppingCart, { className: "w-10 h-10" }),
    tags: ['React', 'Next.js', 'Stripe', 'MongoDB'],
    demoUrl: 'https://example.com/ecommerce',
    sourceUrl: 'https://github.com/example/ecommerce',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A responsive task management application with drag-and-drop functionality and team collaboration. Features real-time updates and customizable workflows.',
    image: '/images/projects/taskmanager.jpg',
    icon: React.createElement(CheckSquare, { className: "w-10 h-10" }),
    tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
    demoUrl: 'https://example.com/taskmanager',
    sourceUrl: 'https://github.com/example/taskmanager',
  },
  {
    id: 3,
    title: 'Real-time Chat Application',
    description: 'A real-time messaging platform with video calls, file sharing and end-to-end encryption. Supports group chats, one-on-one messaging, and push notifications.',
    image: '/images/projects/chatapp.jpg',
    icon: React.createElement(MessageCircle, { className: "w-10 h-10" }),
    tags: ['WebRTC', 'Socket.io', 'Node.js', 'Express'],
    demoUrl: 'https://example.com/chatapp',
    sourceUrl: 'https://github.com/example/chatapp',
  },
  {
    id: 4,
    title: 'Code Collaboration Platform',
    description: 'An online IDE with real-time collaboration features, version control integration, and support for 50+ programming languages.',
    image: '/images/projects/codeplatform.jpg',
    icon: React.createElement(Code, { className: "w-10 h-10" }),
    tags: ['Monaco Editor', 'WebSockets', 'Docker', 'AWS'],
    demoUrl: 'https://example.com/codecollab',
    sourceUrl: 'https://github.com/example/codecollab',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with customizable widgets, data visualization, and report generation capabilities.',
    image: '/images/projects/analytics.jpg',
    icon: React.createElement(LineChart, { className: "w-10 h-10" }),
    tags: ['D3.js', 'React', 'GraphQL', 'PostgreSQL'],
    demoUrl: 'https://example.com/analytics',
    sourceUrl: 'https://github.com/example/analytics',
  },
  {
    id: 6,
    title: 'Security Audit Tool',
    description: 'An automated security scanning and vulnerability assessment tool for web applications with detailed reporting and remediation suggestions.',
    image: '/images/projects/security.jpg',
    icon: React.createElement(ShieldCheck, { className: "w-10 h-10" }),
    tags: ['Python', 'React', 'Docker', 'REST API'],
    demoUrl: 'https://example.com/securitytool',
    sourceUrl: 'https://github.com/example/securitytool',
  },
  {
    id: 7,
    title: 'Portfolio Website Template',
    description: 'A customizable portfolio website template for developers and designers with dark mode, responsive design, and easy content management.',
    image: '/images/projects/portfolio.jpg',
    icon: React.createElement(Layout, { className: "w-10 h-10" }),
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    demoUrl: 'https://example.com/portfolio',
    sourceUrl: 'https://github.com/example/portfolio',
  },
  {
    id: 8,
    title: 'Markdown Blog Platform',
    description: 'A lightweight blog platform that uses Markdown files for content, with features like syntax highlighting, table of contents, and responsive images.',
    image: '/images/projects/blog.jpg',
    icon: React.createElement(FileText, { className: "w-10 h-10" }),
    tags: ['Next.js', 'Markdown', 'MDX', 'TypeScript'],
    demoUrl: 'https://example.com/blogplatform',
    sourceUrl: 'https://github.com/example/blogplatform',
  }
];
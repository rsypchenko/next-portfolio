import { Metadata } from 'next';
import { ExternalLink, Github, Rocket, ArrowLeft, Code, LineChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Roman Sypchenko - Software Developer`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Roman Sypchenko - Software Developer`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// Generate static params (for static generation)
export async function generateStaticParams() {
  return projects.map(project => ({
    id: project.id.toString(),
  }));
}

// Project Detail page component
export default function ProjectDetailPage({ params }: Props) {
  const id = parseInt(params.id);
  const project = projects.find(p => p.id === id);
  
  // If project not found, show 404
  if (!project) {
    notFound();
  }
  
  // Get related projects (excluding current)
  const relatedProjects = projects
    .filter(p => p.id !== id && p.tags.some(tag => project.tags.includes(tag)))
    .slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Back to projects link */}
      <div className="mb-8">
        <Link 
          href="/projects" 
          className="text-sm text-foreground/70 flex items-center gap-1 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>
      </div>
      
      {/* Project header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
          <div className="text-primary w-8 h-8">
            {project.icon}
          </div>
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1"
            >
              <Rocket className="w-4 h-4" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Project image */}
      <div className="rounded-xl overflow-hidden mb-12 shadow-lg border border-border relative group">
        <Image 
          src={project.image} 
          alt={project.title}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      
      {/* Project content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-foreground/70 mb-8">{project.description}</p>
          
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-3 text-foreground/70 mb-8">
            <li>Feature 1 - Detailed description of this important feature</li>
            <li>Feature 2 - Explanation of another key functionality</li>
            <li>Feature 3 - Additional capability that makes this project stand out</li>
            <li>Feature 4 - Technical achievement or interesting implementation detail</li>
            <li>Feature 5 - Final noteworthy aspect of the project</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">Development Process</h2>
          <p className="text-foreground/70 mb-8">
            This section would discuss the development journey, challenges faced, and solutions implemented.
            It would highlight technical decisions, architecture choices, and lessons learned throughout 
            the project's development cycle.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Frontend
              </h3>
              <ul className="list-disc list-inside text-foreground/70">
                <li>React with TypeScript</li>
                <li>Next.js for SSR/SSG</li>
                <li>Tailwind CSS for styling</li>
                <li>React Context for state management</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Backend
              </h3>
              <ul className="list-disc list-inside text-foreground/70">
                <li>Node.js with Express</li>
                <li>MongoDB for database</li>
                <li>JWT for authentication</li>
                <li>RESTful API architecture</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <LineChart className="w-4 h-4 text-primary" />
                DevOps & Tools
              </h3>
              <ul className="list-disc list-inside text-foreground/70">
                <li>Docker for containerization</li>
                <li>CI/CD with GitHub Actions</li>
                <li>AWS for hosting</li>
                <li>Jest for testing</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <LineChart className="w-4 h-4 text-primary" />
                Third-Party Services
              </h3>
              <ul className="list-disc list-inside text-foreground/70">
                <li>Stripe for payments</li>
                <li>Sendgrid for email</li>
                <li>Cloudinary for media</li>
                <li>Auth0 for authentication</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Project sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card rounded-xl border border-border p-6 mb-8">
              <h3 className="font-bold text-xl mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">Client</h4>
                  <p>Client Name or Personal Project</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">Timeline</h4>
                  <p>January 2023 - March 2023</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">Role</h4>
                  <p>Full Stack Developer</p>
                </div>
                
                <div className="pt-4 flex flex-col gap-3">
                  <a 
                    href={project.demoUrl} 
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.sourceUrl} 
                    className="w-full px-4 py-2 bg-transparent border border-foreground/20 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map(relatedProject => (
              <Link 
                key={relatedProject.id} 
                href={`/projects/${relatedProject.id}`}
                className="card rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 group block"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image 
                    src={relatedProject.image} 
                    alt={relatedProject.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay with icon on hover */}
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      {relatedProject.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                    <div className="text-primary w-4 h-4">
                      {relatedProject.icon}
                    </div>
                    {relatedProject.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Contact CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
        <p className="text-foreground/70 max-w-xl mx-auto mb-6">
          If you're looking for a developer to bring your ideas to life, 
          I'd love to hear from you.
        </p>
        <Link 
          href="/contact" 
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
        >
          Get in Touch
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
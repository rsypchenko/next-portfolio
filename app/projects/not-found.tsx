import Link from 'next/link';
import { ArrowLeft, FolderSearch } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <FolderSearch className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Project Not Found</h1>
      <p className="text-xl text-foreground/70 mb-8 text-center max-w-lg">
        Sorry, we couldn't find the project you're looking for. It may have been moved or deleted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/projects" 
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2 justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <Link 
          href="/" 
          className="px-6 py-3 bg-transparent border border-foreground/20 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2 justify-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
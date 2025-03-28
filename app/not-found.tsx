import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-20 h-20 text-primary" aria-hidden="true" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <Home className="w-5 h-5 mr-2" aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
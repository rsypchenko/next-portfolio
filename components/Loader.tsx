"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Loader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Show loader when route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    // Track route changes
    let currentPath = pathname + searchParams.toString();
    
    const checkRouteChange = () => {
      const nextPath = window.location.pathname + window.location.search;
      if (currentPath !== nextPath) {
        currentPath = nextPath;
        handleRouteChangeStart();
        
        // Simulate completion after some minimum time to avoid flickering
        setTimeout(handleRouteChangeComplete, 500);
      }
    };

    // Check for route changes
    window.addEventListener('popstate', checkRouteChange);
    
    return () => {
      window.removeEventListener('popstate', checkRouteChange);
    };
  }, [pathname, searchParams]);

  // Update loading state when pathname or searchParams change
  useEffect(() => {
    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-primary/20 z-50"
      aria-hidden="true"
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={isLoading ? 50 : 100}
    >
      <div 
        className="h-full bg-primary animate-pulse transition-all duration-300 ease-in-out" 
        style={{ 
          width: isLoading ? '90%' : '100%',
          transition: 'width 300ms ease-in-out'
        }}
      />
    </div>
  );
}
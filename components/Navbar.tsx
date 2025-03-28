"use client";

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import { Menu, Home, User, BookOpen, MailPlus, Code, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Close menu when pathname changes (navigation occurs)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden', 'md:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-card-border shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold font-[family-name:var(--font-geist-mono)] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md"
          aria-label="Go to homepage"
        >
          <Code className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
          <span className="text-foreground">Dev</span>
          <span className="text-primary">Portfolio</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`relative px-2 py-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/') ? 'text-primary font-medium' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Home</span>
            {!isActive('/') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            )}
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/about" 
            className={`relative px-2 py-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/about') ? 'text-primary font-medium' : ''}`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">About</span>
            {!isActive('/about') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            )}
            {isActive('/about') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/blog" 
            className={`relative px-2 py-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/blog') ? 'text-primary font-medium' : ''}`}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Blog</span>
            {!isActive('/blog') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            )}
            {isActive('/blog') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/contact" 
            className={`relative px-2 py-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/contact') ? 'text-primary font-medium' : ''}`}
            aria-current={isActive('/contact') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Contact</span>
            {!isActive('/contact') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            )}
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <ThemeToggle />
        </div>
        
        {/* Mobile menu toggle and theme toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md p-1"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden bg-card-bg border-t border-card-border py-4 absolute w-full ${isMenuOpen ? 'block' : 'hidden'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link 
            href="/" 
            className={`group relative overflow-hidden py-3 px-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/') ? 'text-primary' : ''}`}
            onClick={toggleMenu}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Home</span>
            <span className={`absolute inset-0 bg-primary/5 transform ${isActive('/') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 transition-transform duration-300`}></span>
            <span className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
          </Link>
          <Link 
            href="/about" 
            className={`group relative overflow-hidden py-3 px-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/about') ? 'text-primary' : ''}`}
            onClick={toggleMenu}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">About</span>
            <span className={`absolute inset-0 bg-primary/5 transform ${isActive('/about') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 transition-transform duration-300`}></span>
            <span className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
          </Link>
          <Link 
            href="/blog" 
            className={`group relative overflow-hidden py-3 px-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/blog') ? 'text-primary' : ''}`}
            onClick={toggleMenu}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Blog</span>
            <span className={`absolute inset-0 bg-primary/5 transform ${isActive('/blog') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 transition-transform duration-300`}></span>
            <span className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
          </Link>
          <Link 
            href="/contact" 
            className={`group relative overflow-hidden py-3 px-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isActive('/contact') ? 'text-primary' : ''}`}
            onClick={toggleMenu}
            aria-current={isActive('/contact') ? 'page' : undefined}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Contact</span>
            <span className={`absolute inset-0 bg-primary/5 transform ${isActive('/contact') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 transition-transform duration-300`}></span>
            <span className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
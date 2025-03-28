"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-card-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <p className="text-sm text-foreground/70">
              © {new Date().getFullYear()} DevPortfolio. All rights reserved.
            </p>
            <div className="flex items-center text-primary">
              <Heart className="w-4 h-4 mr-1" fill="currentColor" /> 
              <Code className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
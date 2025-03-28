import { Metadata } from 'next';
import ContactClientForm from './page.client';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Me | Roman Sypchenko - Software Developer',
  description: 'Get in touch with me for project inquiries, job opportunities, or just to say hello.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-foreground/70 mb-12">
          Have a project in mind or just want to say hello? Feel free to reach out using the form below or through my social media profiles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        <div className="order-2 lg:order-1">
          <div className="bg-background border border-foreground/10 rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a 
                    href="mailto:john.doe@example.com" 
                    className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:text-primary"
                    aria-label="Email me at john.doe@example.com"
                  >
                    john.doe@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <a 
                    href="tel:+11234567890" 
                    className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:text-primary"
                    aria-label="Call me at +1 (123) 456-7890"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-foreground/70">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-bold mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
                
                <a 
                  href="https://twitter.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Follow me on Twitter"
                >
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
                
                <a 
                  href="https://linkedin.com/in/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Connect with me on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-foreground/10">
              <h3 className="font-bold mb-4">Availability</h3>
              <p className="text-foreground/70 mb-4">
                I'm currently available for freelance work and open to discussing new projects or opportunities.
              </p>
              
              <Link
                href="/about"
                className="inline-flex items-center text-primary hover:text-primary-hover focus:outline-none focus:underline"
              >
                Learn more about me
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <ContactClientForm />
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from 'next/link';
import { MessageSquarePlus, Sparkles, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <MessageSquarePlus className="w-12 h-12" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work Together?</h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-90 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          I'm currently available for freelance projects, full-time positions, and consulting work.
          If you have a project in mind or just want to chat, feel free to reach out!
          <Sparkles className="w-5 h-5" />
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-medium rounded-lg hover:bg-accent hover:text-foreground transition-colors"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
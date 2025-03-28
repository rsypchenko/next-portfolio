"use client";

import { useState, useEffect } from 'react';
import { validateContactForm, ValidationErrors } from '@/utils/form-validation';
import { ContactFormData } from '@/types';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const metadata = {
  title: 'Contact Me | Roman Sypchenko - Software Developer',
  description: 'Get in touch with me for project inquiries, job opportunities, or just to say hello.',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formKey, setFormKey] = useState(0); // Used to reset form

  // Validate form when fields are changed and they've been touched
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);
    }
  }, [formData, touched]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true,
      }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTouched({});
    setErrors({});
    setFormKey(prev => prev + 1); // Force re-render form
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const allTouched = Object.fromEntries(
      Object.keys(formData).map(key => [key, true])
    );
    setTouched(allTouched);
    
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    
    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      resetForm();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
          <div className="bg-background border border-foreground/10 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            {submitStatus === 'success' && (
              <div 
                className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6"
                role="alert"
              >
                <p className="font-medium">Thank you for your message!</p>
                <p>I'll get back to you as soon as possible.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div 
                className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6"
                role="alert"
              >
                <p className="font-medium">There was an error sending your message.</p>
                <p>Please try again later or contact me directly at john.doe@example.com.</p>
              </div>
            )}
            
            <form key={formKey} onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.name && touched.name ? 'border-red-500' : 'border-foreground/20'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.email && touched.email ? 'border-red-500' : 'border-foreground/20'
                  }`}
                  placeholder="Your email address"
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.subject && touched.subject ? 'border-red-500' : 'border-foreground/20'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && touched.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${
                    errors.message && touched.message ? 'border-red-500' : 'border-foreground/20'
                  }`}
                  placeholder="Your message"
                ></textarea>
                {errors.message && touched.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
              
              <p className="text-sm text-foreground/60 mt-4">
                <span className="text-red-500">*</span> indicates required fields
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
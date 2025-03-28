"use client";

import { useState, useEffect, useRef } from 'react';
import { validateContactForm, ValidationErrors } from '@/utils/form-validation';
import { ContactFormData } from '@/types';
import { CheckCircle } from 'lucide-react';

export default function ContactClientForm() {
  const formRef = useRef<HTMLFormElement>(null);
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
  const [showConfetti, setShowConfetti] = useState(false);

  // Validate form when fields are changed and they've been touched
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);
    }
  }, [formData, touched]);
  
  // Reset confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
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
  
  // Scroll to form element with smooth scrolling
  const scrollToElement = (element: HTMLElement | null) => {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
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
    
    // If there are errors, don't submit and scroll to the form
    if (Object.keys(validationErrors).length > 0) {
      // Find the first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      scrollToElement(errorElement);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setShowConfetti(true);
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
    <div className="bg-background border border-foreground/10 rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
      
      {submitStatus === 'success' && (
        <div 
          className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6 animate-fadeIn flex items-center"
          role="alert"
        >
          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Thank you for your message!</p>
            <p>I'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div 
          className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 animate-fadeIn"
          role="alert"
        >
          <p className="font-medium">There was an error sending your message.</p>
          <p>Please try again later or contact me directly at john.doe@example.com.</p>
        </div>
      )}
      
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-center">
          <div className="animate-confetti-1">🎉</div>
          <div className="animate-confetti-2">🎊</div>
          <div className="animate-confetti-3">✨</div>
          <div className="animate-confetti-4">🎈</div>
          <div className="animate-confetti-5">🎯</div>
          <div className="animate-confetti-6">🚀</div>
        </div>
      )}
      
      <form 
        ref={formRef}
        key={formKey} 
        onSubmit={handleSubmit} 
        className="space-y-6" 
        noValidate 
        aria-label="Contact form"
        data-testid="contact-form"
      >
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
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="px-6 py-3 bg-foreground/5 text-foreground rounded-lg font-medium hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            onClick={() => resetForm()}
            disabled={isSubmitting}
          >
            Reset Form
          </button>
          
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
  );
}
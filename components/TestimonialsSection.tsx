"use client";

import { Quote, User, Building2, Briefcase } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CTO',
    company: 'TechStart Inc.',
    text: 'John delivered our project on time and exceeded our expectations. His technical expertise and problem-solving skills made a complex implementation seem effortless.',
    image: '/testimonial1.jpg', // Replace with actual image when available
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Manager',
    company: 'InnovateCorp',
    text: 'Working with John was a pleasure. He quickly understood our requirements and delivered a solution that perfectly addressed our needs while suggesting improvements we hadn\'t considered.',
    image: '/testimonial2.jpg', // Replace with actual image when available
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Founder',
    company: 'DesignForward',
    text: 'John\'s attention to detail and commitment to quality code is outstanding. He not only built an excellent application but also ensured it was well-documented and maintainable.',
    image: '/testimonial3.jpg', // Replace with actual image when available
  },
];

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          I'm proud of the relationships I've built with clients. Here's what some of them have to say about working with me.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => {
          // Alternate colors for quotes
          const quoteColor = index % 3 === 0 
            ? 'primary' 
            : index % 3 === 1 
            ? 'secondary' 
            : 'accent';
            
          return (
            <div key={testimonial.id} className="card rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 relative">
                <Quote className={`text-${quoteColor} w-12 h-12 opacity-20 absolute -top-3 -left-3`} />
                <p className="text-foreground/80 italic relative z-10">{testimonial.text}</p>
              </div>
              
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full bg-${quoteColor}/20 text-${quoteColor} flex items-center justify-center mr-4`}>
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold flex items-center gap-1">
                    {testimonial.name} 
                  </h4>
                  <p className="text-sm text-foreground/70 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {testimonial.position}, 
                    <Building2 className="w-3 h-3 ml-1" />
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import Image from 'next/image';

export const metadata = {
  title: 'About Me | Dev Portfolio',
  description: 'Learn more about my background, experience, and approach to software development.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Hi, I'm Roman Sypchenko</h2>
          <p className="mb-4 text-foreground/80">
            I'm a passionate full-stack developer with over 7 years of experience building web applications
            that solve real-world problems. My journey in software development began when I was 15,
            creating simple games and websites out of curiosity.
          </p>
          <p className="mb-4 text-foreground/80">
            After completing my Computer Science degree, I worked with several startups and established
            companies, which allowed me to gain experience across different domains and technologies.
          </p>
          <p className="mb-4 text-foreground/80">
            I specialize in React, TypeScript, and Node.js, but I'm always excited to learn new technologies
            and frameworks. I believe in writing clean, maintainable code and building applications that
            provide exceptional user experiences.
          </p>
          <p className="text-foreground/80">
            When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes
            in the kitchen. I also contribute to open-source projects and mentor coding bootcamp students.
          </p>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-foreground/10 rounded-full overflow-hidden flex items-center justify-center">
            {/* Placeholder for profile image */}
            <span className="text-8xl">👤</span>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">My Journey</h2>
        
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
            <div className="bg-background border border-foreground/10 p-6 rounded-xl md:text-right">
              <h3 className="text-xl font-bold mb-2">Senior Developer</h3>
              <p className="text-blue-500 mb-2">TechInnovate Inc.</p>
              <p className="text-foreground/70 mb-2">2020 - Present</p>
              <p className="text-foreground/80">
                Leading frontend development for enterprise SaaS products. Architect and implement complex features while mentoring junior developers.
              </p>
            </div>
            
            <div className="hidden md:flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="w-0.5 h-full bg-blue-500/30"></div>
            </div>
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="w-0.5 h-full bg-blue-500/30"></div>
            </div>
            
            <div className="bg-background border border-foreground/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Full Stack Developer</h3>
              <p className="text-blue-500 mb-2">WebSolutions Co.</p>
              <p className="text-foreground/70 mb-2">2017 - 2020</p>
              <p className="text-foreground/80">
                Developed and maintained client websites and web applications. Collaborated with designers and product managers to deliver high-quality solutions.
              </p>
            </div>
            
            <div className="bg-background border border-foreground/10 p-6 rounded-xl md:text-right">
              <h3 className="text-xl font-bold mb-2">Junior Developer</h3>
              <p className="text-blue-500 mb-2">StartupHub</p>
              <p className="text-foreground/70 mb-2">2015 - 2017</p>
              <p className="text-foreground/80">
                Worked on frontend development for early-stage startups. Built responsive web interfaces and implemented user authentication systems.
              </p>
            </div>
            
            <div className="hidden md:flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="w-0.5 h-full bg-blue-500/30"></div>
            </div>
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            </div>
            
            <div className="bg-background border border-foreground/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Computer Science Degree</h3>
              <p className="text-blue-500 mb-2">University of Technology</p>
              <p className="text-foreground/70 mb-2">2011 - 2015</p>
              <p className="text-foreground/80">
                Graduated with honors. Specialized in software engineering and web development. Led the university's coding club.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">My Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">💡</div>
            <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
            <p className="text-foreground/80">
              I believe the best applications solve real problems. I focus on understanding the core issues before writing a single line of code.
            </p>
          </div>
          
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-foreground/80">
              Great software is built by teams. I value clear communication, feedback, and working together to achieve the best possible outcomes.
            </p>
          </div>
          
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
            <p className="text-foreground/80">
              Technology evolves rapidly. I'm committed to staying current with best practices and expanding my skill set through continuous learning.
            </p>
          </div>
          
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">📌</div>
            <h3 className="text-xl font-bold mb-2">Attention to Detail</h3>
            <p className="text-foreground/80">
              The small details matter. I take pride in crafting pixel-perfect interfaces and writing clean, optimized code.
            </p>
          </div>
          
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">🤓</div>
            <h3 className="text-xl font-bold mb-2">User-Centric Approach</h3>
            <p className="text-foreground/80">
              I design and build with the end user in mind. Intuitive interfaces and excellent user experiences are always my top priority.
            </p>
          </div>
          
          <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <div className="text-4xl text-blue-500 mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">Code Quality</h3>
            <p className="text-foreground/80">
              I'm committed to writing maintainable, scalable, and well-tested code that can stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
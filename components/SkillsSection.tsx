"use client";

import { 
  Layers, 
  ServerIcon, 
  Wrench, 
  Rocket, 
  FileCode2, 
  Brackets, 
  Code2, 
  Globe, 
  PenTool, 
  Database,
  Terminal,
  GitBranch,
  Container,
  Cloud,
  Workflow,
  Users
} from 'lucide-react';

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: number; // 1-5
    icon: React.ReactNode;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <Layers className="w-6 h-6" />,
    skills: [
      { name: 'React', level: 5, icon: <Rocket className="w-4 h-4" /> },
      { name: 'TypeScript', level: 4, icon: <FileCode2 className="w-4 h-4" /> },
      { name: 'JavaScript', level: 5, icon: <Brackets className="w-4 h-4" /> },
      { name: 'HTML/CSS', level: 5, icon: <Code2 className="w-4 h-4" /> },
      { name: 'Next.js', level: 4, icon: <Globe className="w-4 h-4" /> },
      { name: 'Tailwind CSS', level: 4, icon: <PenTool className="w-4 h-4" /> },
    ],
  },
  {
    name: 'Backend',
    icon: <ServerIcon className="w-6 h-6" />,
    skills: [
      { name: 'Node.js', level: 4, icon: <Terminal className="w-4 h-4" /> },
      { name: 'Express', level: 4, icon: <Rocket className="w-4 h-4" /> },
      { name: 'Python', level: 3, icon: <FileCode2 className="w-4 h-4" /> },
      { name: 'SQL', level: 4, icon: <Database className="w-4 h-4" /> },
      { name: 'MongoDB', level: 3, icon: <Database className="w-4 h-4" /> },
      { name: 'GraphQL', level: 3, icon: <Brackets className="w-4 h-4" /> },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: 'Git', level: 4, icon: <GitBranch className="w-4 h-4" /> },
      { name: 'Docker', level: 3, icon: <Container className="w-4 h-4" /> },
      { name: 'AWS', level: 3, icon: <Cloud className="w-4 h-4" /> },
      { name: 'CI/CD', level: 3, icon: <Workflow className="w-4 h-4" /> },
      { name: 'Agile/Scrum', level: 4, icon: <Users className="w-4 h-4" /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          I've worked with a variety of technologies and methodologies throughout my career.
          Here's an overview of my technical skills and proficiency levels.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => {
          // Assign a different color for each category
          const categoryColor = index === 0 
            ? 'primary' 
            : index === 1 
            ? 'secondary' 
            : 'accent';
            
          return (
            <div key={index} className="card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className={`text-${categoryColor}`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold text-${categoryColor}`}>{category.name}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`text-${categoryColor}`}>
                          {skill.icon}
                        </div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-foreground/70 text-sm">
                        {skill.level === 5 ? 'Expert' : 
                        skill.level === 4 ? 'Advanced' : 
                        skill.level === 3 ? 'Intermediate' : 
                        skill.level === 2 ? 'Basic' : 'Beginner'}
                      </span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${categoryColor} rounded-full`}
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
// Theme types
export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Project types
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
  demoUrl: string;
  sourceUrl: string;
};

// Blog post types
export type BlogPost = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string | Date;
  slug: string;
  categories: string[];
  readTime: string;
  coverImage?: string;
  content?: string;
};

// Testimonial types
export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
};

// Skill types
export type Skill = {
  name: string;
  abbreviation: string;
  color: string;
  darkModeColor?: string;
  description?: string;
  level?: number; // 1-5 or 1-10
};

// Contact form types
export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// API response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
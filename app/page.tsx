import Hero from '@/components/Hero';
import SkillsSection from '@/components/SkillsSection';
import ContactCTA from '@/components/ContactCTA';
import RecentBlogPosts from '@/components/RecentBlogPosts';
import { getAllBlogPosts } from '@/utils/blog';

export default function Home() {
  // Get 3 most recent blog posts
  const recentPosts = getAllBlogPosts().slice(0, 3);
  
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="blog" className="scroll-mt-20">
        <RecentBlogPosts initialPosts={recentPosts} />
      </div>
      
      <div id="contact-cta">
        <ContactCTA />
      </div>
    </div>
  );
}
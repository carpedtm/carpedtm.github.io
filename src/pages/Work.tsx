import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Lightbox from '@/components/Lightbox';
import ProjectCard from '@/components/ProjectCard';
import { useInView } from 'react-intersection-observer';
import FilterButton from '@/components/FilterButton';
import SEO from '@/components/SEO';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const categories: ProjectCategory[] = ['All', 'Design', 'Photography', 'Web', 'Video'];
  const location = useLocation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Track if we're coming from a project page
  const isFromProject = location.state?.fromProject;
  
  const filteredProjects = (
    activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const [selectedMedia, setSelectedMedia] = useState<Array<{ url: string; type: 'image' | 'video' }>>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Restore scroll position if coming from a project page
  useEffect(() => {
    if (isFromProject) {
      const savedScroll = sessionStorage.getItem('workScrollPosition');
      if (savedScroll) {
        // Add a small delay to ensure the page has rendered
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
        }, 100);
      }
    }
  }, [isFromProject]);

  // Save scroll position when leaving the page
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('workScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force items to be visible when lightbox closes
  useEffect(() => {
    if (!isLightboxOpen) {
      // Trigger a small scroll to ensure intersection observer updates
      const currentScroll = window.scrollY;
      window.scrollTo(0, currentScroll + 1);
      setTimeout(() => {
        window.scrollTo(0, currentScroll);
      }, 50);
    }
  }, [isLightboxOpen]);

  const handleNextMedia = () => {
    if (selectedMedia.length > 0) {
      const nextIndex = (selectedMediaIndex + 1) % selectedMedia.length;
      setSelectedMediaIndex(nextIndex);
    }
  };

  const handlePrevMedia = () => {
    if (selectedMedia.length > 0) {
      const prevIndex = (selectedMediaIndex - 1 + selectedMedia.length) % selectedMedia.length;
      setSelectedMediaIndex(prevIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevMedia();
          break;
        case 'ArrowRight':
          handleNextMedia();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedMediaIndex, selectedMedia]);

  const openLightbox = (project: typeof projects[0]) => {
    const media: Array<{ url: string; type: 'image' | 'video' }> = [];
    
    // Add images from the images array
    if (project.images) {
      project.images.forEach(image => {
        media.push({ url: image, type: 'image' });
      });
    }

    // Add videos if they exist
    if (project.video) {
      if (Array.isArray(project.video)) {
        project.video.forEach(videoUrl => {
          if (typeof videoUrl === 'string') {
            media.push({ url: videoUrl, type: 'video' });
          }
        });
      } else if (typeof project.video === 'string') {
        media.push({ url: project.video, type: 'video' });
      }
    }
    
    setSelectedMedia(media);
    setSelectedMediaIndex(0);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMediaIndex(0);
  };

  return (
    <>
      <SEO
        title="Work • Las Vegas Web Developer & Graphic Artist"
        description="Discover the portfolio of carpedtm, a Las Vegas-based graphic artist and web designer. From custom visuals and branding to unique digital art and design, explore my creative work."
        keywords="Las Vegas portfolio website designer, custom graphics and branding Las Vegas, Las Vegas creative portfolio designer, Las Vegas digital designer, Las Vegas branding expert, affordable web design in Las Vegas, Las Vegas freelance web developer"
      />
      <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Selected Works
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-start mb-8 overflow-x-auto md:overflow-visible border-t border-b border-border py-4"
          >
            <div className="flex space-x-8 mx-auto md:mx-0">
              {categories.map(category => (
                <FilterButton 
                  key={category} 
                  active={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-border"
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative border-r border-b border-border p-1.5 md:p-3 group"
              >
                {project.interaction === 'link' ? (
                  <Link 
                    to={`/work/${project.id}`} 
                    state={{ fromWork: true }}
                    className="block focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <ProjectCard project={project} />
                  </Link>
                ) : (
                  <button 
                    onClick={() => openLightbox(project)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={`View ${project.title} in lightbox`}
                  >
                    <ProjectCard project={project} />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            <Lightbox
              media={selectedMedia}
              isOpen={isLightboxOpen}
              onClose={closeLightbox}
              initialIndex={selectedMediaIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Work;


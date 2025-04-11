import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Instagram, Youtube, Twitter, Store, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getFeaturedProjects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/Lightbox';
import ProjectCard from '@/components/ProjectCard';
import SEO from '@/components/SEO';

const Index = () => {
  const featuredProjects = getFeaturedProjects();
  const location = useLocation();
  
  // Track if we're coming from a project page
  const isFromProject = location.state?.fromProject;
  
  const [selectedMedia, setSelectedMedia] = useState<Array<{ url: string; type: 'image' | 'video' }>>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Restore scroll position if coming from a project page
  useEffect(() => {
    if (isFromProject) {
      const savedScroll = sessionStorage.getItem('indexScrollPosition');
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll));
      }
    }
  }, [isFromProject]);

  // Save scroll position when leaving the page
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('indexScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const openLightbox = (project: typeof featuredProjects[0]) => {
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
        title="carpedtm • Las Vegas Web Developer & Graphic Artist"
        description="Las Vegas-based web designer and graphic artist specializing in custom websites and modern web development, visual and graphic design, and unique digital solutions."
        keywords="Las Vegas web designer, Las Vegas creative agency, custom website design Las Vegas, Las Vegas UX/UI designer, modern website design for small businesses, Las Vegas digital branding services, Las Vegas creative portfolio designer, Las Vegas visual artist"
      />
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Main Content */}
            <div className="md:col-span-12 flex flex-col">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-none">
                    <span className="text-black">Hi, I'm</span>
                    <span className="block font-modern font-medium">carpedtm</span>
                  </h1>
                  <p className="text-base md:text-lg tracking-tight leading-relaxed text-muted-foreground max-w-md">
                    and I create visuals that stand out.
                  </p>
                </div>

                {/* Interactive Elements */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center -mt-2">
                  {/* Buttons */}
                  <div className="md:col-span-6 flex justify-start">
                    <div className="flex space-x-4">
                      <Button 
                        className="group relative bg-transparent border border-red text-red px-6 py-3 h-auto rounded-none text-xs tracking-wider w-fit overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none hover:bg-transparent hover:border-red"
                        asChild
                      >
                        <Link to="/contact">
                          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Let's Connect</span>
                          <span className="absolute inset-0 w-0 bg-red transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </Button>
                      <Button 
                        className="group relative bg-transparent border border-foreground text-foreground px-6 py-3 h-auto rounded-none text-xs tracking-wider w-fit overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none hover:bg-transparent hover:border-foreground"
                        asChild
                      >
                        <Link to="/work">
                          <span className="relative z-10 transition-colors duration-300 group-hover:text-background">View Work</span>
                          <span className="absolute inset-0 w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="md:col-span-6 flex justify-start md:justify-end">
                    <div className="flex space-x-6">
                      <a href="https://www.instagram.com/carpe.dtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-all duration-300 hover:scale-110">
                        <Instagram size={20} strokeWidth={1.5} />
                      </a>
                      <a href="https://www.youtube.com/@carpedtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-all duration-300 hover:scale-110">
                        <Youtube size={20} strokeWidth={1.5} />
                      </a>
                      <a href="https://x.com/carpedtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-all duration-300 hover:scale-110">
                        <Twitter size={20} strokeWidth={1.5} />
                      </a>
                      <a href="https://payhip.com/DtM" className="text-foreground hover:text-red transition-all duration-300 hover:scale-110">
                        <Store size={20} strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 md:px-8 pt-2 md:pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center overflow-x-auto md:overflow-visible border-t border-b border-border py-4">
            <span className="text-sm uppercase tracking-widest">Gallery</span>
            <Link to="/work" className="text-sm hover:text-red transition-colors underline underline-offset-4 decoration-foreground/50 hover:decoration-red">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 border-t border-l border-border mt-8">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="relative border-r border-b border-border p-1.5 md:p-3 group"
              >
                {project.interaction === 'link' ? (
                  <Link to={`/work/${project.id}`} state={{ fromIndex: true }}>
                    <ProjectCard project={project} />
                  </Link>
                ) : (
                  <button 
                    onClick={() => openLightbox(project)}
                    className="w-full text-left"
                  >
                    <ProjectCard project={project} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* About Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                About Me
              </h2>
              <p className="text-base tracking-tight leading-relaxed text-muted-foreground mb-6">
                I'm Day, a graphic designer, front-end developer and multidisciplinary visual artist based in Las Vegas, Nevada. Each project gets my full creative attention, whether you need a website, brand refresh, or graphics and animations that tell your story. I have over eight years of experience in creating…
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Plus size={14} strokeWidth={1.5} className="text-red mr-2 mt-1 flex-shrink-0" />
                  <span className="text-base tracking-tight leading-relaxed text-muted-foreground">High-performing websites.</span>
                </li>
                <li className="flex items-start">
                  <Plus size={14} strokeWidth={1.5} className="text-red mr-2 mt-1 flex-shrink-0" />
                  <span className="text-base tracking-tight leading-relaxed text-muted-foreground">Memorable brand identities.</span>
                </li>
                <li className="flex items-start">
                  <Plus size={14} strokeWidth={1.5} className="text-red mr-2 mt-1 flex-shrink-0" />
                  <span className="text-base tracking-tight leading-relaxed text-muted-foreground">Engaging visual content.</span>
                </li>
              </ul>
              <Button 
                className="group relative bg-transparent border border-foreground text-foreground px-6 py-3 h-auto rounded-none text-xs tracking-wider w-fit overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none hover:bg-transparent hover:border-foreground"
                asChild
              >
                <Link to="/contact">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-background">Get in Touch</span>
                  <span className="absolute inset-0 w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </Button>
            </div>
           
            <div className="md:col-span-7 relative h-full">
              <div className="h-full overflow-hidden">
                <img
                  src="https://live.staticflickr.com/65535/54438995862_b13df2f6bf_c_d.jpg"
                  alt="Day's profile"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-4 bg-white/90 backdrop-blur-sm">
                <span className="text-sm tracking-tight">Las Vegas, Nevada</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
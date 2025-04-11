import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import Lightbox from '@/components/Lightbox';
import { Button } from '@/components/ui/button';

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [galleryMedia, setGalleryMedia] = useState<Array<{ url: string; type: 'image' | 'video'; title?: string }>>([]);
  const [lightboxMedia, setLightboxMedia] = useState<Array<{ url: string; type: 'image' | 'video'; title?: string }>>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (project) {
      const mediaList: Array<{ url: string; type: 'image' | 'video'; title?: string }> = [];
      
      // Add images from the images array
      if (project.images) {
        project.images.forEach(image => {
          mediaList.push({
            url: image,
            type: 'image',
          });
        });
      }

      // Add videos if they exist
      if (project.video) {
        if (Array.isArray(project.video)) {
          project.video.forEach(videoUrl => {
            if (typeof videoUrl === 'string') {
              mediaList.push({
                url: videoUrl,
                type: 'video',
              });
            }
          });
        } else if (typeof project.video === 'string') {
          mediaList.push({
            url: project.video,
            type: 'video',
          });
        }
      }

      setGalleryMedia(mediaList);
      setLightboxMedia(mediaList);
      setLoadedImages(new Set());
    }
  }, [project]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    video.play().catch(error => {
      console.error('Error playing video:', error);
    });
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    const video = e.target as HTMLVideoElement;
    console.error('Video error details:', {
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState,
      src: video.currentSrc
    });
  };

  const openLightbox = (galleryIndex: number) => {
    setSelectedMediaIndex(galleryIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!project) {
    return (
      <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Project Not Found
            </h1>
            <p className="text-base md:text-lg tracking-tight leading-relaxed text-muted-foreground max-w-md mt-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex justify-start mb-8 overflow-x-auto md:overflow-visible border-t border-b border-border py-4">
            <div className="flex space-x-8 mx-auto md:mx-0">
              <span className="text-sm uppercase tracking-widest">Navigation</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-l border-border">
            <div className="col-span-2 border-r border-b border-border p-6 md:p-8">
              <div className="flex flex-col space-y-6">
                <p className="text-base tracking-tight leading-relaxed text-muted-foreground">
                  You can return to the work page to browse available projects.
                </p>
                <Button 
                  className="group relative bg-transparent border border-foreground text-foreground px-6 py-3 h-auto rounded-none text-xs tracking-wider w-fit overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none hover:bg-transparent hover:border-foreground"
                  asChild
                >
                  <Link to="/work">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-background">Back to Work</span>
                    <span className="absolute inset-0 w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 md:px-8 pt-4 md:pt-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <div className="mb-12 md:mb-16">
          <Link 
            to="/work" 
            state={{ fromProject: true }}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            All Work
          </Link>
          <div>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3 md:mb-4 leading-tight"
              dangerouslySetInnerHTML={{ __html: project.title }}
            />
            <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-muted-foreground">
              <span className="uppercase tracking-wider">{project.category}</span>
              <span>•</span>
              <span>{project.date}</span>
            </div>
          </div>
        </div>

        {/* Project Content and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-8 md:mb-12">
          <div className="md:col-span-8">
            <h2 className="text-xl font-light mb-4 md:mb-6 tracking-wide">About the Project</h2>
            <p 
              className="text-muted-foreground leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
          <div className="md:col-span-4">
            <h2 className="text-xl font-light mb-4 md:mb-6 tracking-wide">Tags</h2>
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {project.tags?.map((tag, index) => (
                <li 
                  key={index} 
                  className="px-3 md:px-4 py-1.5 md:py-2 border border-foreground/20 rounded-full text-sm tracking-wider hover:border-foreground/40 transition-colors duration-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {galleryMedia.map((media, index) => (
            <div
              key={index}
              className={`relative cursor-pointer group ${galleryMedia.length === 1 ? '' : 'aspect-video'}`}
              onClick={() => openLightbox(index)}
            >
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-lg z-10" />
              )}
              {media.type === 'video' ? (
                <>
                  <video
                    src={media.url}
                    className="w-full h-full object-cover rounded-lg"
                    controls={false}
                    muted
                    loop
                    playsInline
                    onLoadedData={() => handleImageLoad(index)}
                    onPlay={handleVideoLoad}
                    onError={handleVideoError}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                    <Play className="w-12 h-12 text-white stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </>
              ) : (
                <img
                  src={media.url}
                  alt={`${project.title} - Image ${index + 1}`}
                  className={`w-full h-full object-cover rounded-lg ${!loadedImages.has(index) ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  onLoad={() => handleImageLoad(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        media={lightboxMedia}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        initialIndex={selectedMediaIndex}
      />
    </motion.div>
  );
};

export default Project; 
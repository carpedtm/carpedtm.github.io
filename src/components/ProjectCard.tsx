import { Project } from '@/data/projects';
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setHasError(true);
    setIsLoading(false);
    const video = e.target as HTMLVideoElement;
    console.error('Video error details:', {
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState,
      src: video.currentSrc
    });
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    const video = e.target as HTMLVideoElement;
    video.play().catch(error => {
      console.error('Error playing video:', error);
    });
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="block">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 z-10">
          <span className="bg-white/90 backdrop-blur-sm px-1 py-0.5 text-[10px] uppercase tracking-wider inline-block">
            {project.client}
          </span>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red"></div>
          </div>
        )}
        {hasError ? (
          <div className="w-full aspect-[5/4] bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-500">Unable to load media for {project.title}. Please try refreshing the page.</span>
          </div>
        ) : project.videoThumbnail ? (
          <video
            src={project.videoThumbnail}
            className="w-full aspect-[5/4] object-cover transition-transform duration-500 group-hover:scale-105 rounded-sm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            title={`${project.title} - ${project.category} video preview by carpedtm, Las Vegas web developer and graphic artist`}
          />
        ) : project.video && Array.isArray(project.video) ? (
          <video
            src={project.video[0]}
            className="w-full aspect-[5/4] object-cover transition-transform duration-500 group-hover:scale-105 rounded-sm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            title={`${project.title} - ${project.category} video preview by carpedtm, Las Vegas web developer and graphic artist`}
          />
        ) : project.video && typeof project.video === 'string' ? (
          <video
            src={project.video}
            className="w-full aspect-[5/4] object-cover transition-transform duration-500 group-hover:scale-105 rounded-sm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            title={`${project.title} - ${project.category} video preview by carpedtm, Las Vegas web developer and graphic artist`}
          />
        ) : (
          <img 
            src={project.image}
            alt={`${project.title} - ${project.category} project preview by carpedtm, Las Vegas web developer and graphic artist`}
            className="w-full aspect-[5/4] object-cover transition-transform duration-500 group-hover:scale-105 rounded-sm"
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Loading Skeleton */}
        {!project.image && !project.video && !project.videoThumbnail && !hasError && (
          <div className="w-full aspect-[5/4]">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
        )}
      </div>
      <div className="pt-3 text-left">
        <h3 
          className="text-xs font-light tracking-tight"
          dangerouslySetInnerHTML={{ __html: project.title }}
        />
        <p className="text-[10px] text-muted-foreground">{project.date}</p>
      </div>
    </div>
  );
};

export default ProjectCard;


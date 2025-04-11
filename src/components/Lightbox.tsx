import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  title?: string;
}

interface LightboxProps {
  media: MediaItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const Lightbox = ({ media, isOpen, onClose, initialIndex = 0 }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug log when media or currentIndex changes
  useEffect(() => {
    console.log('Media list:', media);
    console.log('Current media:', media[currentIndex]);
  }, [media, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    // Reset video when switching media
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
    // Set loading state
    setIsLoading(true);
  }, [currentIndex]);

  const handleVideoLoad = () => {
    console.log('Video loaded:', media[currentIndex].url);
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.error('Autoplay failed');
        setIsLoading(false);
      });
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    console.error('Video error:', {
      url: media[currentIndex].url,
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState
    });
    setIsLoading(false);
  };

  const handlePrevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsLoading(true);
  };

  const handleNextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsLoading(true);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevMedia();
          break;
        case 'ArrowRight':
          handleNextMedia();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !media.length) return null;

  const currentMedia = media[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      <div 
        ref={contentRef} 
        className="relative max-w-[90vw] max-h-[90vh] mx-4"
        role="document"
      >
        {/* Loading State */}
        {isLoading && (
          <div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <div className="relative w-full h-full">
          {currentMedia.type === 'video' ? (
            <video
              key={currentMedia.url}
              ref={videoRef}
              src={currentMedia.url}
              title={`${currentMedia.title || 'Project video'} - Full view by carpedtm, Las Vegas web developer and graphic artist`}
              controls
              autoPlay
              preload="auto"
              playsInline
              className="max-w-full max-h-[80vh] object-contain"
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
              onCanPlay={() => setIsLoading(false)}
              aria-label={`${currentMedia.title || 'Project video'} - Full view`}
            />
          ) : (
            <img
              key={currentMedia.url}
              src={currentMedia.url}
              alt={`${currentMedia.title || 'Project image'} - Full view by carpedtm, Las Vegas web developer and graphic artist`}
              className="max-w-full max-h-[80vh] object-contain"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              loading="eager"
            />
          )}
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [&>svg]:stroke-white"
          aria-label="Close viewer"
        >
          <X size={24} />
        </button>
        
        {media.length > 1 && (
          <>
            <button 
              onClick={handlePrevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [&>svg]:stroke-white"
              aria-label="Previous media"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={handleNextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [&>svg]:stroke-white"
              aria-label="Next media"
            >
              <ChevronRight size={32} />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsLoading(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to item ${index + 1} of ${media.length}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Lightbox; 
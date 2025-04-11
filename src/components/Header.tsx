import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load icons
const Menu = lazy(() => import('lucide-react').then(mod => ({ default: mod.Menu })));
const X = lazy(() => import('lucide-react').then(mod => ({ default: mod.X })));
const Plus = lazy(() => import('lucide-react').then(mod => ({ default: mod.Plus })));

// Icon loading fallback
const IconFallback = () => (
  <div className="w-6 h-6 bg-gray-100 rounded animate-pulse" />
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = () => {
    setIsLoading(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (!mobileMenuRef.current?.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur z-50 border-b border-border header-shadow"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="font-light tracking-tight flex items-center hover:text-red transition-colors duration-300"
            aria-label="Home"
            onClick={handleNavigation}
          >
            <Suspense fallback={<IconFallback />}>
              <Plus size={14} strokeWidth={1.5} className={`mr-1 text-red ${isLoading ? 'loading' : ''}`} />
            </Suspense>
            <span className="text-sm">carpedtm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            <div className="flex items-center px-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive('/') ? 1 : 0, x: isActive('/') ? 0 : -20 }}
                transition={{ ease: [0.32, 0, 0.16, 1] }}
                className="mr-2 will-change-transform transform-gpu"
              >
                <Suspense fallback={<IconFallback />}>
                  <Plus 
                    size={12} 
                    strokeWidth={1.5} 
                    className={`text-red ${isLoading ? 'loading' : ''}`}
                  />
                </Suspense>
              </motion.div>
              <Link 
                to="/" 
                className="nav-link"
                onClick={handleNavigation}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                HOME
              </Link>
            </div>
            <div className="flex items-center px-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive('/work') ? 1 : 0, x: isActive('/work') ? 0 : -20 }}
                transition={{ ease: [0.32, 0, 0.16, 1] }}
                className="mr-2 will-change-transform transform-gpu"
              >
                <Suspense fallback={<IconFallback />}>
                  <Plus 
                    size={12} 
                    strokeWidth={1.5} 
                    className={`text-red ${isLoading ? 'loading' : ''}`}
                  />
                </Suspense>
              </motion.div>
              <Link 
                to="/work" 
                className="nav-link"
                onClick={handleNavigation}
                aria-current={isActive('/work') ? 'page' : undefined}
              >
                WORK
              </Link>
            </div>
            <div className="flex items-center px-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive('/contact') ? 1 : 0, x: isActive('/contact') ? 0 : -20 }}
                transition={{ ease: [0.32, 0, 0.16, 1] }}
                className="mr-2 will-change-transform transform-gpu"
              >
                <Suspense fallback={<IconFallback />}>
                  <Plus 
                    size={12} 
                    strokeWidth={1.5} 
                    className={`text-red ${isLoading ? 'loading' : ''}`}
                  />
                </Suspense>
              </motion.div>
              <Link 
                to="/contact" 
                className="nav-link"
                onClick={handleNavigation}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                CONTACT
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            <Suspense fallback={<IconFallback />}>
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </Suspense>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-border"
              onKeyDown={handleMobileMenuKeyDown}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  <Link
                    ref={firstMenuItemRef}
                    to="/"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 touch-manipulation"
                    onClick={handleNavigation}
                    aria-current={isActive('/') ? 'page' : undefined}
                  >
                    <Suspense fallback={<IconFallback />}>
                      <Plus size={12} strokeWidth={1.5} className="mr-2 text-red" />
                    </Suspense>
                    <span className="nav-link">HOME</span>
                  </Link>
                  <Link
                    to="/work"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 touch-manipulation"
                    onClick={handleNavigation}
                    aria-current={isActive('/work') ? 'page' : undefined}
                  >
                    <Suspense fallback={<IconFallback />}>
                      <Plus size={12} strokeWidth={1.5} className="mr-2 text-red" />
                    </Suspense>
                    <span className="nav-link">WORK</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 touch-manipulation"
                    onClick={handleNavigation}
                    aria-current={isActive('/contact') ? 'page' : undefined}
                  >
                    <Suspense fallback={<IconFallback />}>
                      <Plus size={12} strokeWidth={1.5} className="mr-2 text-red" />
                    </Suspense>
                    <span className="nav-link">CONTACT</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-red will-change-transform transform-gpu"
            >
              <motion.div
                className="h-full bg-red"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;

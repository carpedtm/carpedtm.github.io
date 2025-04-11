import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen font-light">
      <div className="fixed top-16 md:top-20 left-4 w-px h-[calc(100vh-4rem)] bg-border"></div>
      <div className="fixed top-16 md:top-20 right-4 w-px h-[calc(100vh-4rem)] bg-border"></div>
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

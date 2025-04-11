import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Store } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border mt-12">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 items-center">
          <div className="text-[10px] tracking-wider text-muted-foreground text-center md:text-left flex items-center justify-center md:justify-start order-2 md:order-1">
            &copy; {currentYear} All Rights Reserved
          </div>
          
          <div className="flex justify-center space-x-6 items-center order-3 md:order-2">
            <a href="https://www.instagram.com/carpe.dtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-colors">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="https://www.youtube.com/@carpedtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-colors">
              <Youtube size={18} strokeWidth={1.5} />
            </a>
            <a href="https://x.com/carpedtm" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red transition-colors">
              <Twitter size={18} strokeWidth={1.5} />
            </a>
            <a href="https://payhip.com/DtM" className="text-foreground hover:text-red transition-colors">
              <Store size={18} strokeWidth={1.5} />
            </a>
          </div>
          
          <div className="text-center md:text-right flex items-center justify-center md:justify-end order-1 md:order-3">
            <span className="text-[10px] tracking-wider text-muted-foreground">info.carpedtm@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
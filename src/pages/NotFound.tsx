import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Page Not Found
            </h1>
            <p className="text-base md:text-lg tracking-tight leading-relaxed text-muted-foreground max-w-md mt-6">
              The page you're looking for doesn't exist.
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
                  You can return to the work page to browse all projects.
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
    </>
  );
};

export default NotFound;

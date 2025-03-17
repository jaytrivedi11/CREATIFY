
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fade in the hero section
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
      heroRef.current.classList.remove("opacity-0");
    }

    // Staggered animation for text elements
    if (textRef.current) {
      const children = textRef.current.children;
      Array.from(children).forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("animate-slide-up");
          child.classList.remove("opacity-0");
        }, 150 * index);
      });
    }
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[90vh] flex items-center justify-center px-4 opacity-0 transition-opacity duration-700"
    >
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.1) 0%, rgba(255, 255, 255, 0) 50%)",
        }}
      />
      
      <div 
        ref={textRef}
        className="max-w-4xl mx-auto text-center z-10 py-20 md:py-0"
      >
        <span className="inline-block py-1 px-3 border border-primary/10 rounded-full text-xs font-medium mb-6 bg-primary/5 opacity-0 transition-all duration-500">
          Connect with exceptional talent
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight mb-6 lg:mb-8 opacity-0 transition-all duration-500">
          Where talent meets opportunity
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 transition-all duration-500">
          A minimalist platform for creatives to showcase their work and connect with clients seeking quality services.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 transition-all duration-500">
          <Button asChild size="lg" className="rounded-full px-6 w-full sm:w-auto">
            <Link to="/portfolios">
              Browse Portfolios <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-6 w-full sm:w-auto">
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>
        
        <div className="mt-16 md:mt-20 flex flex-col items-center opacity-0 transition-all duration-500">
          <p className="text-xs text-muted-foreground mb-3">Trusted by innovative brands</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 opacity-60">
            <div className="h-5 w-16 md:w-20 bg-gray-400/20 rounded" />
            <div className="h-5 w-20 md:w-24 bg-gray-400/20 rounded" />
            <div className="h-5 w-14 md:w-16 bg-gray-400/20 rounded" />
            <div className="h-5 w-16 md:w-20 bg-gray-400/20 rounded" />
            <div className="h-5 w-24 md:w-28 bg-gray-400/20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

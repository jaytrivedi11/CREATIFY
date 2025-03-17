
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PortfolioCard from "../shared/PortfolioCard";
import { cn } from "@/lib/utils";

// Mock data for featured portfolios
const FEATURED_PORTFOLIOS = [
  {
    id: "1",
    title: "Minimalist Brand Identity",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=1974&auto=format&fit=crop",
    creator: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
  },
  {
    id: "2",
    title: "Modern Architecture Portfolio",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1770&auto=format&fit=crop",
    creator: {
      name: "Sam Wilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
    },
  },
  {
    id: "3",
    title: "Digital Illustrations Collection",
    category: "Illustration",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop",
    creator: {
      name: "Nina Chen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
  },
  {
    id: "4",
    title: "Elegant UI Components",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1780&auto=format&fit=crop",
    creator: {
      name: "James Lee",
      avatar: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=1941&auto=format&fit=crop",
    },
  },
];

const FeaturedPortfolios = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "flex flex-col md:flex-row justify-between items-start md:items-end mb-12 opacity-0 translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              Portfolio Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">Featured work</h2>
            <p className="text-muted-foreground max-w-lg">
              Explore exceptional portfolios from our community of creative professionals.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex mt-4 md:mt-0">
            <Link to="/portfolios" className="group">
              View all portfolios 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURED_PORTFOLIOS.map((portfolio) => (
            <PortfolioCard key={portfolio.id} {...portfolio} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/portfolios">
              View all portfolios
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolios;

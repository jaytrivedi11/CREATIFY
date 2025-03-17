
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  freeOffer: boolean;
  provider: {
    name: string;
    avatar: string;
    id: string;
  };
}

const ServiceCard = ({
  id,
  title,
  description,
  category,
  freeOffer,
  provider,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-700",
        isVisible && "opacity-100 translate-y-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300",
          isHovered && "shadow-md border-transparent"
        )}
      >
        {freeOffer && (
          <span className="inline-block py-1 px-2 rounded-full text-xs font-medium mb-3 bg-primary/5 text-primary">
            Free First Session
          </span>
        )}
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <Link to={`/profile/${provider.id}`} className="flex items-center space-x-2 group">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-8 h-8 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {provider.name}
            </span>
          </Link>
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
        
        <Button
          asChild
          variant="ghost"
          className={cn(
            "w-full justify-start p-0 h-auto hover:bg-transparent group",
            isHovered && "text-primary"
          )}
        >
          <Link to={`/service/${id}`}>
            <span className="flex items-center">
              View details
              <ArrowRight 
                size={14} 
                className={cn(
                  "ml-1 transition-transform duration-300",
                  isHovered && "transform translate-x-1"
                )} 
              />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;

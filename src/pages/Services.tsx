
import { useState, useEffect } from "react";
import ServiceCard from "@/components/shared/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock services data
const ALL_SERVICES = [
  {
    id: "1",
    title: "Logo & Brand Identity Design",
    description: "Professional logo design and brand identity development for your business or project.",
    category: "Graphic Design",
    freeOffer: true,
    provider: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      id: "user1",
    },
  },
  {
    id: "2",
    title: "Architectural Visualization",
    description: "High-quality 3D rendering and architectural visualization for your projects.",
    category: "Architecture",
    freeOffer: false,
    provider: {
      name: "Sam Wilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
      id: "user2",
    },
  },
  {
    id: "3",
    title: "Custom Digital Illustrations",
    description: "Unique digital illustrations and artwork created for your specific needs.",
    category: "Illustration",
    freeOffer: true,
    provider: {
      name: "Nina Chen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      id: "user3",
    },
  },
  {
    id: "4",
    title: "UI/UX Design & Prototyping",
    description: "User-centered interface design and interactive prototyping for web and mobile apps.",
    category: "UI/UX Design",
    freeOffer: true,
    provider: {
      name: "James Lee",
      avatar: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=1941&auto=format&fit=crop",
      id: "user4",
    },
  },
  {
    id: "5",
    title: "Professional Photography",
    description: "High-quality photography services for products, events, portraits, and more.",
    category: "Photography",
    freeOffer: false,
    provider: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop",
      id: "user5",
    },
  },
  {
    id: "6",
    title: "Furniture & Product Design",
    description: "Custom furniture and product design with a focus on functionality and aesthetics.",
    category: "Product Design",
    freeOffer: true,
    provider: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      id: "user6",
    },
  },
  {
    id: "7",
    title: "Motion Graphics & Animation",
    description: "Engaging motion graphics and animation for videos, presentations, and digital content.",
    category: "Animation",
    freeOffer: true,
    provider: {
      name: "Emma White",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      id: "user7",
    },
  },
  {
    id: "8",
    title: "Website Development",
    description: "Custom website development with responsive design and modern technologies.",
    category: "Web Development",
    freeOffer: false,
    provider: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1999&auto=format&fit=crop",
      id: "user8",
    },
  },
];

// All categories from the services
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(ALL_SERVICES.map((service) => service.category))),
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(ALL_SERVICES);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  useEffect(() => {
    const filtered = ALL_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFree = freeOnly ? service.freeOffer : true;
      return matchesCategory && matchesSearch && matchesFree;
    });
    setFilteredServices(filtered);
  }, [selectedCategory, searchTerm, freeOnly]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Available Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover quality services from talented professionals. Many offer free initial sessions to help you find the perfect match.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Search services..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <Button
                variant={freeOnly ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap rounded-full flex items-center gap-2"
                onClick={() => setFreeOnly(!freeOnly)}
              >
                {freeOnly && <Check size={16} />}
                Free first session
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "overflow-x-auto pb-2 md:pb-0 transition-all duration-300 flex md:flex-row",
            isFilterVisible ? "max-h-20" : "max-h-0 md:max-h-20",
            "md:overflow-visible"
          )}>
            <div className="flex gap-2 md:gap-3">
              {ALL_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

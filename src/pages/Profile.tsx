import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Star, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PortfolioCard from "@/components/shared/PortfolioCard";
import ServiceCard from "@/components/shared/ServiceCard";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const USER = {
  id: "user1",
  name: "Alex Morgan",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  title: "Graphic Designer & Brand Strategist",
  location: "San Francisco, CA",
  bio: "Passionate graphic designer with 5+ years of experience in creating impactful visual identities for brands. Specialized in logo design, brand identity, and packaging design with a minimalist approach.",
  skills: ["Logo Design", "Brand Identity", "Typography", "Packaging", "Print Design"],
  portfolios: [
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
      id: "5",
      title: "Artisanal Coffee Packaging",
      category: "Packaging Design",
      image: "https://images.unsplash.com/photo-1637267492288-374af6f2f0fc?q=80&w=1964&auto=format&fit=crop",
      creator: {
        name: "Alex Morgan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      },
    },
    {
      id: "9",
      title: "Luxury Stationery Collection",
      category: "Print Design",
      image: "https://images.unsplash.com/photo-1598367772303-0bf80ddaa8d9?q=80&w=1974&auto=format&fit=crop",
      creator: {
        name: "Alex Morgan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      },
    },
  ],
  services: [
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
      id: "10",
      title: "Packaging Design",
      description: "Custom packaging design that stands out on the shelf and enhances your product experience.",
      category: "Packaging Design",
      freeOffer: false,
      provider: {
        name: "Alex Morgan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        id: "user1",
      },
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "Michael Roberts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      date: "2 months ago",
      rating: 5,
      content: "Alex created an amazing brand identity for my startup. The design was exactly what I was looking for - clean, modern, and professional. The process was smooth, and Alex was always responsive and open to feedback.",
    },
    {
      id: "r2",
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop",
      date: "4 months ago",
      rating: 5,
      content: "Working with Alex was a great experience. The packaging design for my product exceeded my expectations. Alex took the time to understand my brand and created a design that perfectly represents it.",
    },
  ],
};

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [user, setUser] = useState(USER);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [userId]);

  const handleContact = () => {
    toast({
      title: "Contact functionality",
      description: "This feature will be implemented in the next version.",
    });
  };

  const handleHire = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to hire this creator.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    navigate(`/hire/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser.id === userId;

  return (
    <div className="min-h-screen pb-16">
      <div 
        className="h-56 md:h-72 relative overflow-hidden bg-gray-100"
        style={{
          backgroundImage: `url(${user.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-8 left-8">
          <Button asChild variant="ghost" className="bg-white/80 hover:bg-white/90">
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative -mt-16 mb-8 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden mb-4 md:mb-0">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:ml-6">
              <h1 className="text-3xl font-medium">{user.name}</h1>
              <p className="text-muted-foreground">{user.title}</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span>{user.location}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 space-x-3">
            {!isOwnProfile && (
              <>
                <Button onClick={handleContact} variant="outline" className="rounded-full">
                  <MessageSquare size={16} className="mr-2" />
                  Message
                </Button>
                <Button onClick={handleHire} className="rounded-full">
                  <Briefcase size={16} className="mr-2" />
                  Hire
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium mb-3">About</h2>
            <p className="text-muted-foreground mb-6">{user.bio}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Briefcase size={16} />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Star size={16} />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className={cn(
            "transform transition-all duration-500",
            activeTab === "portfolio" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {user.portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} {...portfolio} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className={cn(
            "transform transition-all duration-500",
            activeTab === "services" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className={cn(
            "transform transition-all duration-500",
            activeTab === "reviews" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="space-y-8 max-w-4xl">
              {user.reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{review.author}</h3>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex mb-4">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

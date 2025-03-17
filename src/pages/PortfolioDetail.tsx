
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Heart } from "lucide-react";
import { ALL_PORTFOLIOS } from "@/data/portfolios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundPortfolio = ALL_PORTFOLIOS.find(p => p.id === id);
    
    if (foundPortfolio) {
      setPortfolio(foundPortfolio);
    }
    
    setLoading(false);
  }, [id]);

  const handleHireClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to hire this creator.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    navigate(`/hire/${portfolio.creator.id}`);
  };

  const handleContactClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact this creator.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    // Implement contact functionality (messaging)
    navigate(`/hire/${portfolio.creator.id}`); // For now, redirect to hire page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-medium mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-8">The portfolio you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/portfolios">Back to Portfolios</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/portfolios" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Portfolios
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
              <img 
                src={portfolio.image} 
                alt={portfolio.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-medium mb-4">{portfolio.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-block py-1 px-3 bg-primary/10 rounded-full text-xs font-medium">
                {portfolio.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart size={16} />
                <span>256 likes</span>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This is a detailed description of the portfolio project. In a real application, this would contain a comprehensive explanation of the project, its goals, and the process behind creating it.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The creator would share their approach, challenges faced during the project, and the solutions they implemented. This helps potential clients understand the depth of thought and expertise that went into the work.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={portfolio.creator.avatar} 
                    alt={portfolio.creator.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{portfolio.creator.name}</h3>
                  <p className="text-sm text-muted-foreground">{portfolio.category} Professional</p>
                </div>
              </div>
              
              <Button className="w-full mb-3" onClick={handleHireClick}>Hire Me</Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleContactClick}>
                <MessageSquare size={16} />
                Contact
              </Button>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-4">More Information</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span>5+ years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Duration</span>
                    <span>3 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Date</span>
                    <span>June 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;

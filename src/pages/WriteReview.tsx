
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

const WriteReview = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userServices] = useLocalStorage<any[]>("userServices", []);
  const [reviews, setReviews] = useLocalStorage<any[]>("reviews", []);
  
  const [service, setService] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Get service details
    const serviceDetails = userServices.find(s => s.id === serviceId);
    if (!serviceDetails) {
      navigate("/dashboard");
      return;
    }
    
    setService(serviceDetails);
  }, [user, navigate, serviceId, userServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!review) {
      toast({
        title: "Missing review",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview = {
        id: `review-${Date.now()}`,
        serviceId,
        serviceName: service.title,
        providerId: service.provider.id,
        providerName: service.provider.name,
        rating,
        content: review,
        author: user!.name,
        authorId: user!.id,
        avatar: user!.avatar,
        date: new Date().toISOString(),
      };
      
      setReviews([...reviews, newReview]);
      
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      });
      
      navigate(`/service/${serviceId}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-2xl mx-auto pt-24 px-4 pb-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <h1 className="text-2xl font-medium mb-8">Write a Review</h1>
        
        {service && (
          <div className="bg-secondary/30 p-4 rounded-lg mb-8">
            <h2 className="font-medium mb-2">{service.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {service.description}
            </p>
            <div className="text-sm">
              <span className="text-muted-foreground">Provider: </span>
              <span>{service.provider.name}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">Your Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      (hoverRating || rating) >= star
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-3 text-lg font-medium">
                {rating} out of 5
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Your Review</label>
            <Textarea 
              placeholder="Write your review here..." 
              rows={6}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;

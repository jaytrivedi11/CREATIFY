
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Calendar, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  freeOffer: boolean;
  provider: {
    name: string;
    avatar: string;
    id: string;
  };
}

const HireCreator = () => {
  const { creatorId } = useParams<{ creatorId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [services] = useLocalStorage<any[]>("userServices", []);
  const [orders, setOrders] = useLocalStorage<any[]>("orders", []);
  const [bookings, setBookings] = useLocalStorage<any[]>("bookings", []);
  const [conversations, setConversations] = useLocalStorage<any[]>("conversations", []);
  
  const [creator, setCreator] = useState<any>(null);
  const [creatorServices, setCreatorServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Get creator info (in a real app, this would come from an API)
    // For this example, we'll use mock data
    const mockCreator = {
      id: creatorId,
      name: "Alex Morgan",
      title: "Graphic Designer & Brand Strategist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    };
    
    setCreator(mockCreator);
    
    // Get creator's services
    const filteredServices = services.filter(service => service.provider.id === creatorId);
    setCreatorServices(filteredServices);
    
    if (filteredServices.length > 0) {
      setSelectedService(filteredServices[0].id);
    }
  }, [user, navigate, creatorId, services]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const service = creatorServices.find(s => s.id === selectedService);
      
      // Create order record
      const orderId = `order-${Date.now()}`;
      const orderData = {
        id: orderId,
        clientId: user!.id,
        clientName: user!.name,
        clientAvatar: user!.avatar,
        creatorId: creator.id,
        creatorName: creator.name,
        creatorAvatar: creator.avatar,
        serviceId: selectedService,
        serviceName: service?.title,
        description,
        budget: budget || (service?.price ? `$${service.price}` : "Free trial"),
        deadline: deadline || "To be discussed",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Create booking for creator
      const bookingData = {
        ...orderData,
        id: `booking-${Date.now()}`,
      };
      
      setOrders([...orders, orderData]);
      setBookings([...bookings, bookingData]);
      
      // Create or update conversation
      const existingConversation = conversations.find(convo => 
        convo.participants.includes(user!.id) && 
        convo.participants.includes(creator.id)
      );
      
      if (existingConversation) {
        const updatedConversations = conversations.map(convo => {
          if (convo.id === existingConversation.id) {
            return {
              ...convo,
              lastMessage: `${user!.name} sent a booking request`,
              updatedAt: new Date().toISOString()
            };
          }
          return convo;
        });
        
        setConversations(updatedConversations);
      } else {
        const newConversation = {
          id: `conversation-${Date.now()}`,
          participants: [user!.id, creator.id],
          participantNames: [user!.name, creator.name],
          participantAvatars: [user!.avatar, creator.avatar],
          lastMessage: `${user!.name} sent a booking request`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setConversations([...conversations, newConversation]);
      }
      
      toast({
        title: "Booking request sent!",
        description: "The creator has been notified of your request.",
      });
      
      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.error("Error sending booking request:", error);
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
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
        
        <h1 className="text-2xl font-medium mb-8">Hire Creator</h1>
        
        {creator && (
          <div className="mb-8 flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium">{creator.name}</h2>
              <p className="text-muted-foreground">{creator.title}</p>
              <Link to={`/profile/${creator.id}`} className="text-primary text-sm hover:underline">
                View Profile
              </Link>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection with Shadcn Select */}
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <Select
              value={selectedService}
              onValueChange={setSelectedService}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {creatorServices.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title} {service.freeOffer && "- Free Trial Available"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Service Information */}
          {selectedService && (
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">
                {creatorServices.find(s => s.id === selectedService)?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {creatorServices.find(s => s.id === selectedService)?.description}
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  {creatorServices.find(s => s.id === selectedService)?.freeOffer && (
                    <span className="flex items-center text-green-600">
                      <Check size={16} className="mr-1" />
                      Free Trial Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Details (Required)</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what you need in detail..." 
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="budget" 
                type="number" 
                placeholder="Enter your budget" 
                className="pl-8" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          
          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input 
              id="deadline" 
              type="date" 
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending Request..." : "Send Booking Request"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HireCreator;


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Clock, MessageSquare } from "lucide-react";
import { ALL_SERVICES } from "@/data/services";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundService = ALL_SERVICES.find(s => s.id === id);
    
    if (foundService) {
      setService(foundService);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p>Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-medium mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
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
            <Link to="/services" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Services
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-medium mb-4">{service.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-block py-1 px-3 bg-primary/10 rounded-full text-xs font-medium">
                {service.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>{service.deliveryTime}</span>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This is a detailed description of the service offered. In a real application, this would contain a comprehensive explanation of what clients can expect, the process, and the deliverables.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The service provider would outline their methodology, timeline, and what makes their service unique and valuable. This helps potential clients understand exactly what they're getting.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">What's Included</h3>
              <ul className="space-y-3">
                {['Professional consultation', 'High-quality deliverables', 'Up to 3 rounds of revisions', 'Source files included'].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={service.provider.avatar} 
                    alt={service.provider.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{service.provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.category} Expert</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <span className="text-2xl font-medium">${service.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">First-time clients get a free consultation</p>
              </div>
              
              <Button className="w-full mb-3">Book Now</Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                Contact
              </Button>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-4">Service Details</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Time</span>
                    <span>{service.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revisions</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span>Within 24 hours</span>
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

export default ServiceDetail;

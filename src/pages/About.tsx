
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">About Creatify</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our mission is to connect creative talent with opportunities and provide a platform for showcasing exceptional work.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Creatify was founded with a simple yet powerful vision: to create a minimalist, elegant platform where talented creators can showcase their work and connect with clients who appreciate quality.
          </p>
          
          <p>
            In today's digital landscape, we believe that genuine talent should be easily discoverable. Our platform strips away unnecessary complexity to focus on what truly matters—the work itself and the people behind it.
          </p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Quality Over Quantity</h3>
              <p className="text-muted-foreground">We celebrate excellence in craft and execution, promoting creators who demonstrate exceptional skill and attention to detail.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Creative Integrity</h3>
              <p className="text-muted-foreground">We believe in supporting authentic creative voices and encouraging work that represents a creator's genuine vision.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Accessible Opportunity</h3>
              <p className="text-muted-foreground">We're committed to making creative opportunities accessible to talented individuals, regardless of background or location.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Community Focus</h3>
              <p className="text-muted-foreground">We foster meaningful connections between creators and clients, building a community based on mutual respect and appreciation.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">How It Works</h2>
          
          <p>
            Creatify operates on a simple principle: connect the right talent with the right opportunity. Creators can showcase their portfolios, offer services, and build their reputation through quality work and client relationships.
          </p>
          
          <p>
            Clients can browse portfolios, discover services, and connect with creators who match their needs. We encourage initial collaborations through our "First Time Free" program, which allows creators to offer a sample of their services at no cost, building trust and demonstrating their capabilities.
          </p>
          
          <div className="bg-primary/5 p-6 rounded-lg my-8 text-center">
            <h3 className="text-xl font-medium mb-3">Ready to Join Our Creative Community?</h3>
            <p className="text-muted-foreground mb-6">Whether you're a creator looking to showcase your work or a client seeking creative talent, Creatify is the platform for you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth?tab=signup">Join as Creator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolios">Explore Portfolios</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedPortfolios from "@/components/home/FeaturedPortfolios";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
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

  const steps = [
    {
      title: "Create your portfolio",
      description: "Showcase your best work with our minimalist portfolio layout designed to highlight your creativity."
    },
    {
      title: "Offer your services",
      description: "List your services and offer free initial sessions to potential clients to demonstrate your expertise."
    },
    {
      title: "Connect with clients",
      description: "Build meaningful relationships with clients who appreciate your work and unique approach."
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "text-center mb-16 opacity-0 translate-y-4 transition-all duration-700",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <span className="text-sm font-medium text-muted-foreground">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">Simple and effective</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform connects talented professionals with clients looking for quality services through a simple process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-8 opacity-0 translate-y-4 transition-all",
                isVisible && "opacity-100 translate-y-0",
                // Add staggered delay
                isVisible && index === 0 && "transition-delay-0",
                isVisible && index === 1 && "transition-delay-[200ms]",
                isVisible && index === 2 && "transition-delay-[400ms]"
              )}
              style={{
                transitionDuration: "700ms",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <span className="text-primary font-medium">{index + 1}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className={cn(
          "text-center opacity-0 translate-y-4 transition-all duration-700 transition-delay-[600ms]",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/auth?tab=signup">
              Get started <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
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
    <div 
      ref={sectionRef}
      className="py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "text-center mb-16 opacity-0 translate-y-4 transition-all duration-700",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <span className="text-sm font-medium text-muted-foreground">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">What our users say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={cn(
            "bg-gray-50 rounded-xl p-8 opacity-0 translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <p className="text-lg mb-6">
              "As a freelance designer, this platform has been instrumental in showcasing my portfolio and connecting with clients who appreciate my aesthetic. The free session feature helped me build trust with new clients."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" 
                alt="Sarah M."
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">Sarah M.</h4>
                <p className="text-sm text-muted-foreground">Graphic Designer</p>
              </div>
            </div>
          </div>

          <div className={cn(
            "bg-gray-50 rounded-xl p-8 opacity-0 translate-y-4 transition-all duration-700 transition-delay-[200ms]",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <p className="text-lg mb-6">
              "I found an exceptional web developer through this platform. The trial session gave me confidence in their abilities before committing to the full project. The clean interface made browsing portfolios a pleasure."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" 
                alt="Alex K."
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">Alex K.</h4>
                <p className="text-sm text-muted-foreground">Startup Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CtaSection = () => {
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

  const benefits = [
    "Showcase your work with beautiful portfolios",
    "Offer free sessions to attract new clients",
    "Build meaningful professional relationships",
    "Grow your business with quality clients"
  ];

  return (
    <div 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={cn(
            "opacity-0 translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <span className="text-sm font-medium text-muted-foreground">
              Join our community
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">Ready to showcase your talent?</h2>
            <p className="text-muted-foreground mb-8">
              Join our community of creative professionals and connect with clients who value quality work. Create your portfolio today.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary mt-1 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="space-x-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/auth?tab=signup">
                  Get started <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/portfolios">
                  Explore portfolios
                </Link>
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "relative h-96 bg-gray-100 rounded-xl overflow-hidden opacity-0 translate-x-4 transition-all duration-700 transition-delay-[200ms]",
            isVisible && "opacity-100 translate-x-0"
          )}>
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="Creative workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedPortfolios />
        <HowItWorks />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

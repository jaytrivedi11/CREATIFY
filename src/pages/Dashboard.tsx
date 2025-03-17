
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, BookOpen, MessageSquare, Star, Briefcase, Settings } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PortfolioCard from "@/components/shared/PortfolioCard";
import ServiceCard from "@/components/shared/ServiceCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("portfolios");
  
  // Get user portfolios and services from localStorage
  const [userPortfolios] = useLocalStorage<any[]>("userPortfolios", []);
  const [userServices] = useLocalStorage<any[]>("userServices", []);
  
  // Get bookings (for creators) and orders (for clients) from localStorage
  const [bookings] = useLocalStorage<any[]>("bookings", []);
  const [orders] = useLocalStorage<any[]>("orders", []);
  
  // Get messages from localStorage
  const [messages] = useLocalStorage<any[]>("messages", []);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const filteredBookings = bookings.filter(booking => booking.creatorId === user.id);
  const filteredOrders = orders.filter(order => order.clientId === user.id);
  const filteredMessages = messages.filter(message => 
    message.senderId === user.id || message.receiverId === user.id
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-24 px-4 md:px-8">
        {/* Dashboard header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-medium">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mt-2">
                  {user.role === "creator" 
                    ? "Creator" 
                    : user.role === "client" 
                      ? "Client" 
                      : "Creator & Client"}
                </span>
              </div>
            </div>
            <div className="space-x-3">
              <Button asChild variant="outline" size="sm">
                <Link to={`/profile/${user.id}`}>
                  <BookOpen size={16} className="mr-2" />
                  View Public Profile
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/settings">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="portfolios" className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Portfolios</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Star size={16} />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{user.role === "client" ? "Orders" : "Bookings"}</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Portfolios Tab */}
          <TabsContent value="portfolios">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">My Portfolios</h2>
              <Button asChild size="sm">
                <Link to="/create-portfolio">
                  <PlusCircle size={16} className="mr-2" />
                  Create New
                </Link>
              </Button>
            </div>
            
            {userPortfolios.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPortfolios.map((portfolio) => (
                  <PortfolioCard key={portfolio.id} {...portfolio} />
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <h3 className="font-medium mb-2">No portfolios yet</h3>
                <p className="text-muted-foreground mb-6">
                  Showcase your work by creating your first portfolio
                </p>
                <Button asChild>
                  <Link to="/create-portfolio">
                    <PlusCircle size={16} className="mr-2" />
                    Create Portfolio
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">My Services</h2>
              <Button asChild size="sm">
                <Link to="/create-service">
                  <PlusCircle size={16} className="mr-2" />
                  Create New
                </Link>
              </Button>
            </div>
            
            {userServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userServices.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <h3 className="font-medium mb-2">No services yet</h3>
                <p className="text-muted-foreground mb-6">
                  Offer your skills by creating your first service
                </p>
                <Button asChild>
                  <Link to="/create-service">
                    <PlusCircle size={16} className="mr-2" />
                    Create Service
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Bookings/Orders Tab */}
          <TabsContent value="bookings">
            <div className="mb-6">
              <h2 className="text-xl font-medium">
                {user.role === "client" ? "My Orders" : "My Bookings"}
              </h2>
            </div>
            
            {(user.role === "client" ? filteredOrders : filteredBookings).length > 0 ? (
              <div className="space-y-4">
                {(user.role === "client" ? filteredOrders : filteredBookings).map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.role === "client" 
                          ? `Provider: ${item.creatorName}` 
                          : `Client: ${item.clientName}`}
                      </p>
                      <div className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : item.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-blue-100 text-blue-800"
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/booking/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <h3 className="font-medium mb-2">No {user.role === "client" ? "orders" : "bookings"} yet</h3>
                <p className="text-muted-foreground mb-6">
                  {user.role === "client" 
                    ? "Browse services and make your first order" 
                    : "Keep creating great services to attract clients"}
                </p>
                <Button asChild>
                  <Link to="/services">
                    Browse Services
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="mb-6">
              <h2 className="text-xl font-medium">My Messages</h2>
            </div>
            
            {filteredMessages.length > 0 ? (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={message.senderId === user.id ? message.receiverAvatar : message.senderAvatar} 
                          alt={message.senderId === user.id ? message.receiverName : message.senderName} 
                        />
                        <AvatarFallback>
                          {(message.senderId === user.id ? message.receiverName : message.senderName).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {message.senderId === user.id ? message.receiverName : message.senderName}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {message.lastMessage}
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/conversation/${message.conversationId}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <h3 className="font-medium mb-2">No messages yet</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with other users to start conversations
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useLocalStorage<any[]>("orders", []);
  const [bookings, setBookings] = useLocalStorage<any[]>("bookings", []);
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Payment form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Get order details
    const orderDetails = orders.find(o => o.id === orderId);
    if (!orderDetails) {
      navigate("/dashboard");
      return;
    }
    
    setOrder(orderDetails);
  }, [user, navigate, orderId, orders]);

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Split into groups of 4
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    // Join with spaces
    return groups.join(" ");
  };

  const formatExpiry = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.slice(0, 19)); // Max length: 4 groups of 4 + 3 spaces
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted.slice(0, 5)); // Max length: MM/YY
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvc(value.slice(0, 3)); // Max length: 3 digits
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (order.budget === "Free trial" || order.budget === "$0") {
      // Skip payment for free trials
      handleFreePayment();
      return;
    }
    
    if (!cardName || !cardNumber || !expiry || !cvc) {
      toast({
        title: "Missing payment information",
        description: "Please fill in all required payment fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update order and booking status
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          return { ...o, status: "confirmed", paidAt: new Date().toISOString() };
        }
        return o;
      });
      
      const updatedBookings = bookings.map(b => {
        if (b.creatorId === order.creatorId && b.clientId === order.clientId && b.serviceId === order.serviceId) {
          return { ...b, status: "confirmed", paidAt: new Date().toISOString() };
        }
        return b;
      });
      
      setOrders(updatedOrders);
      setBookings(updatedBookings);
      
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      });
      
      setIsComplete(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreePayment = async () => {
    setIsLoading(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update order and booking status
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          return { ...o, status: "confirmed", paidAt: new Date().toISOString() };
        }
        return o;
      });
      
      const updatedBookings = bookings.map(b => {
        if (b.creatorId === order.creatorId && b.clientId === order.clientId && b.serviceId === order.serviceId) {
          return { ...b, status: "confirmed", paidAt: new Date().toISOString() };
        }
        return b;
      });
      
      setOrders(updatedOrders);
      setBookings(updatedBookings);
      
      toast({
        title: "Booking confirmed!",
        description: "Your free trial session has been booked.",
      });
      
      setIsComplete(true);
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast({
        title: "Booking failed",
        description: "There was a problem confirming your booking. Please try again.",
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
        {!isComplete ? (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <h1 className="text-2xl font-medium mb-8">Complete Your Booking</h1>
            
            {order && (
              <div className="bg-secondary/30 p-6 rounded-lg mb-8">
                <h2 className="font-medium mb-4">Booking Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{order.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Creator:</span>
                    <span>{order.creatorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  {order.deadline && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span>{order.deadline}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">{order.budget}</span>
                  </div>
                </div>
              </div>
            )}
            
            {order && (order.budget === "Free trial" || order.budget === "$0") ? (
              <div className="bg-white border rounded-lg p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Free Trial Session</h2>
                  <p className="text-muted-foreground">
                    No payment required for this booking.
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleFreePayment}
                  disabled={isLoading}
                >
                  {isLoading ? "Confirming..." : "Confirm Free Booking"}
                </Button>
              </div>
            ) : (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Payment Information
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input 
                      id="cardName" 
                      placeholder="John Doe" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY" 
                        value={expiry}
                        onChange={handleExpiryChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        placeholder="123" 
                        value={cvc}
                        onChange={handleCvcChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-4" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : `Pay ${order?.budget}`}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  This is a demo. No actual payment will be processed.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-medium mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your booking has been successfully confirmed. The creator has been notified and will be in touch with you soon.
            </p>
            <div className="space-y-3">
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <div className="block">
                <Button asChild variant="outline" className="mt-3">
                  <Link to="/messages">Check Messages</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Portfolios from "./pages/Portfolios";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PortfolioDetail from "./pages/PortfolioDetail";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import CreatePortfolio from "./pages/CreatePortfolio";
import Messages from "./pages/Messages";
import Conversation from "./pages/Conversation";
import HireCreator from "./pages/HireCreator";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import WriteReview from "./pages/WriteReview";
import PrivateRoute from "./components/auth/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolios" element={<Portfolios />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/create-portfolio" element={
              <PrivateRoute>
                <CreatePortfolio />
              </PrivateRoute>
            } />
            <Route path="/messages" element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            } />
            <Route path="/conversation/:id" element={
              <PrivateRoute>
                <Conversation />
              </PrivateRoute>
            } />
            <Route path="/hire/:creatorId" element={
              <PrivateRoute>
                <HireCreator />
              </PrivateRoute>
            } />
            <Route path="/payment/:orderId" element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/write-review/:serviceId" element={
              <PrivateRoute>
                <WriteReview />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

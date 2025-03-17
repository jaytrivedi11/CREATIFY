
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, PlusCircle, MessageSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
        >
          CREATIFY
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link to="/portfolios" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Portfolios
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search size={18} />
          </button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/create-portfolio")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Create Portfolio</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/messages")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link to="/auth?tab=signup">Join</Link>
              </Button>
            </>
          )}
        </div>

        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white px-4 py-20 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-8">
          <Link 
            to="/portfolios" 
            className="text-lg font-medium hover:text-primary/80 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Portfolios
          </Link>
          <Link 
            to="/services" 
            className="text-lg font-medium hover:text-primary/80 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium hover:text-primary/80 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link 
                to="/dashboard" 
                className="text-lg font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/create-portfolio" 
                className="text-lg font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Portfolio
              </Link>
              <Link 
                to="/messages" 
                className="text-lg font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Messages
              </Link>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild size="lg" className="w-full">
                <Link to="/auth?tab=signup" onClick={() => setIsOpen(false)}>Join</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

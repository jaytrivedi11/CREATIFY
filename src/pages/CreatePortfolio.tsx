
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Upload, X, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const CATEGORIES = [
  "Graphic Design",
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Illustration",
  "Animation",
  "Photography",
  "Videography",
  "Writing",
  "Marketing",
  "Other",
];

const CreatePortfolio = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userPortfolios, setUserPortfolios] = useLocalStorage<any[]>("userPortfolios", []);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !imagePreview) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload an image.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPortfolio = {
        id: `portfolio-${Date.now()}`,
        title,
        category,
        description,
        image: imagePreview,
        creator: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar,
        },
        createdAt: new Date().toISOString(),
      };
      
      setUserPortfolios([...userPortfolios, newPortfolio]);
      
      toast({
        title: "Portfolio created!",
        description: "Your portfolio has been successfully created.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating portfolio:", error);
      toast({
        title: "Error",
        description: "Failed to create portfolio. Please try again.",
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
        
        <h1 className="text-2xl font-medium mb-8">Create New Portfolio</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Portfolio Image (Required)</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden aspect-[3/2] bg-gray-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-[3/2] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={32} className="text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG or GIF (Max 10MB)
                    </p>
                  </div>
                  <input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title (Required)</Label>
            <Input 
              id="title" 
              placeholder="E.g., Minimalist Brand Identity Design" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category (Required)</Label>
            <select
              id="category"
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your portfolio work..." 
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Portfolio"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePortfolio;

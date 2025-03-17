
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import PortfolioCard from "@/components/shared/PortfolioCard";
import { ALL_PORTFOLIOS } from "@/data/portfolios";

// All categories from the portfolios
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(ALL_PORTFOLIOS.map((portfolio) => portfolio.category))),
];

const Portfolios = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState(ALL_PORTFOLIOS);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const filtered = ALL_PORTFOLIOS.filter((portfolio) => {
      const matchesCategory = selectedCategory === "All" || portfolio.category === selectedCategory;
      const matchesSearch = portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           portfolio.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredPortfolios(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Creative Portfolios</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore exceptional portfolios from talented professionals across various creative fields.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Search portfolios..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <Filter size={16} />
              Filter by category
            </Button>
            
            <div className={cn(
              "overflow-x-auto pb-2 md:pb-0 transition-all duration-300 flex md:flex-row",
              isFilterVisible ? "max-h-20" : "max-h-0 md:max-h-20",
              "md:overflow-visible"
            )}>
              <div className="flex gap-2 md:gap-3">
                {ALL_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap rounded-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredPortfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} {...portfolio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No portfolios found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolios;

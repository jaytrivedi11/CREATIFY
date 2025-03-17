
import { Link } from "react-router-dom";

interface Creator {
  name: string;
  avatar: string;
}

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  creator: Creator;
}

const PortfolioCard = ({ id, title, category, image, creator }: PortfolioCardProps) => {
  return (
    <Link to={`/portfolio/${id}`} className="group">
      <div className="bg-card overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-1 text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{category}</p>
          
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground">{creator.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;

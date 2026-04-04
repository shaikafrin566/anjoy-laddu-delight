import { Star } from "lucide-react";
import { Laddu } from "@/data/laddus";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LadduCard = ({ laddu }: { laddu: Laddu }) => {
  const { addToCart } = useCart();
  const avgRating = laddu.reviews.reduce((s, r) => s + r.rating, 0) / laddu.reviews.length;

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-warm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/menu/${laddu.id}`} className="block overflow-hidden">
        <img
          src={laddu.image}
          alt={laddu.name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5">
        <Link to={`/menu/${laddu.id}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">{laddu.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? "text-gold fill-gold" : "text-border"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({laddu.reviews.length})</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{laddu.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-primary">₹{laddu.price}</span>
          <Button
            size="sm"
            onClick={() => { addToCart(laddu); toast.success(`${laddu.name} added to cart!`); }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LadduCard;

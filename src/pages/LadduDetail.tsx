import { useParams, Link } from "react-router-dom";
import { laddus } from "@/data/laddus";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/ReviewCard";
import { Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const LadduDetail = () => {
  const { id } = useParams();
  const laddu = laddus.find((l) => l.id === id);
  const { addToCart } = useCart();

  if (!laddu) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Laddu not found</h1>
      <Link to="/menu" className="text-primary underline mt-4 block">Back to menu</Link>
    </div>
  );

  const avgRating = laddu.reviews.reduce((s, r) => s + r.rating, 0) / laddu.reviews.length;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="overflow-hidden rounded-lg">
            <img src={laddu.image} alt={laddu.name} className="w-full aspect-square object-cover rounded-lg" width={640} height={640} />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">{laddu.name}</h1>
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? "text-gold fill-gold" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">({laddu.reviews.length} reviews)</span>
            </div>
            <p className="text-muted-foreground mb-6">{laddu.description}</p>
            <div className="mb-4">
              <span className="text-sm font-semibold text-foreground">Ingredients: </span>
              <span className="text-sm text-muted-foreground">{laddu.ingredients.join(", ")}</span>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <span className="font-heading text-3xl font-bold text-primary">₹{laddu.price}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">per pack</span>
            </div>
            <Button
              size="lg"
              onClick={() => { addToCart(laddu); toast.success(`${laddu.name} added to cart!`); }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto px-10"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {laddu.reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadduDetail;

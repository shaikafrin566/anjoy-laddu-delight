import { Star } from "lucide-react";
import { Review } from "@/data/laddus";

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-card rounded-lg p-5 border border-border">
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-gold fill-gold" : "text-border"}`} />
      ))}
    </div>
    <p className="text-sm text-foreground mb-3">"{review.comment}"</p>
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-foreground">{review.name}</span>
      <span className="text-xs text-muted-foreground">{review.date}</span>
    </div>
  </div>
);

export default ReviewCard;

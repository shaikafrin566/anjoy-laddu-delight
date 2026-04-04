import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import LadduCard from "@/components/LadduCard";
import { laddus } from "@/data/laddus";
import { Star } from "lucide-react";

const Index = () => {
  const featured = laddus.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={heroBanner} alt="Anjoy Date Laddus" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-warm-dark/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in-up">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
            Anjoy
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-2 font-light">
            Handcrafted Date Laddus with Premium Dry Fruits
          </p>
          <p className="text-sm text-primary-foreground/70 mb-8">
            100% Natural • No Sugar Added • No Preservatives
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                Explore Menu
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Anjoy */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Anjoy?</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Our laddus are made fresh with love, using the finest quality dates and premium dry fruits.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "100% Natural", desc: "No artificial colors, flavors, or preservatives. Just pure goodness." },
              { emoji: "💪", title: "Nutrient Rich", desc: "Packed with proteins, vitamins, and minerals from premium dry fruits." },
              { emoji: "🎁", title: "Perfect Gift", desc: "Beautifully crafted laddus ideal for festivals, celebrations, and gifting." },
            ].map((f) => (
              <div key={f.title} className="bg-card rounded-lg p-8 shadow-warm border border-border">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Bestsellers</h2>
            <p className="text-muted-foreground">Try our most loved laddus</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featured.map((l) => <LadduCard key={l.id} laddu={l} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Priya S.", text: "Best date laddus I've ever tasted! Pure and natural.", rating: 5 },
              { name: "Amit G.", text: "The Royal Mixed laddu is an absolute masterpiece!", rating: 5 },
              { name: "Dr. Sharma", text: "I recommend Anjoy laddus to all my patients for healthy snacking.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-card rounded-lg p-6 border border-border shadow-warm">
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3">"{t.text}"</p>
                <p className="font-semibold text-sm text-muted-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

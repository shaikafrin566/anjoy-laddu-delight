import LadduCard from "@/components/LadduCard";
import { laddus } from "@/data/laddus";

const MenuPage = () => (
  <div className="py-12">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover our handcrafted collection of premium date laddus, each made with the finest dry fruits and pure love.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {laddus.map((l) => <LadduCard key={l.id} laddu={l} />)}
      </div>
    </div>
  </div>
);

export default MenuPage;

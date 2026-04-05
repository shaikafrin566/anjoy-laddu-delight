import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, total, deliveryCharge, grandTotal } = useCart();

  if (items.length === 0) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
      <p className="text-muted-foreground mb-6">Add some delicious laddus to your cart!</p>
      <Link to="/menu">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Menu</Button>
      </Link>
    </div>
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Your Cart</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.laddu.id} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
              <img src={item.laddu.image} alt={item.laddu.name} className="w-20 h-20 rounded-lg object-cover" loading="lazy" width={80} height={80} />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground truncate">{item.laddu.name}</h3>
                <p className="text-sm text-muted-foreground">₹{item.laddu.price} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.laddu.id, item.quantity - 1)} className="p-1 rounded-md hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.laddu.id, item.quantity + 1)} className="p-1 rounded-md hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <span className="font-heading font-bold text-primary w-20 text-right">₹{item.laddu.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.laddu.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg text-foreground">Subtotal</span>
              <span className="font-heading text-lg font-semibold text-foreground">₹{total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg text-foreground">Delivery Charge</span>
              <span className="font-heading text-lg font-semibold text-foreground">₹{deliveryCharge}</span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-heading text-xl font-semibold text-foreground">Total</span>
              <span className="font-heading text-2xl font-bold text-primary">₹{grandTotal}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base mt-6">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type PaymentMethod = "paytm" | "phonepe" | "googlepay" | "cod";

const paymentOptions: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "paytm", label: "Paytm", icon: "💳" },
  { id: "phonepe", label: "PhonePe", icon: "📱" },
  { id: "googlepay", label: "Google Pay", icon: "🅖" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all delivery details");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/");
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Delivery Details */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-card" />
              <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-card" />
              <Input placeholder="Delivery Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="bg-card" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="bg-card" />
                <Input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="bg-card" />
              </div>
            </div>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-3">
              {paymentOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    payment === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <p className="text-sm font-semibold text-foreground mt-2">{p.label}</p>
                </button>
              ))}
            </div>

            {payment && payment !== "cod" && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-foreground font-semibold mb-1">Pay ₹{total} via {paymentOptions.find((p) => p.id === payment)?.label}</p>
                <p className="text-xs text-muted-foreground">
                  Send payment to UPI ID: <span className="font-mono font-semibold text-primary">anjoy@upi</span> and click "Place Order".
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="bg-card rounded-lg border border-border p-5 space-y-3">
              {items.map((item) => (
                <div key={item.laddu.id} className="flex justify-between text-sm">
                  <span className="text-foreground">{item.laddu.name} × {item.quantity}</span>
                  <span className="font-semibold text-foreground">₹{item.laddu.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-heading text-lg font-semibold text-foreground">Total</span>
                <span className="font-heading text-xl font-bold text-primary">₹{total}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleOrder}
              className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 text-base"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

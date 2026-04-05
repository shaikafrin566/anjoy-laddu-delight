import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

type PaymentMethod = "paytm" | "phonepe" | "googlepay" | "cod";

const paymentOptions: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "paytm", label: "Paytm", icon: "💳" },
  { id: "phonepe", label: "PhonePe", icon: "📱" },
  { id: "googlepay", label: "Google Pay", icon: "🅖" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

const CheckoutPage = () => {
  const { items, total, deliveryCharge, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [hasConfirmedPayment, setHasConfirmedPayment] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const UPI_ID = import.meta.env.VITE_UPI_ID ?? "8008144268@icici";
  const PAYMENT_MOBILE = "8008144268";
  const SELLER_WHATSAPP_NUMBER = "918008144268";

  const buildUpiLink = (method: PaymentMethod | "qr") => {
    const amount = grandTotal.toFixed(2);
    const payeeName = encodeURIComponent("Anjoy Laddu");
    const transactionNote = encodeURIComponent(`Anjoy Order via ${method === "qr" ? "QR Code" : (paymentOptions.find((p) => p.id === method)?.label ?? "UPI")}`);
    
    // Base UPI parameters
    const baseParams = `pa=${UPI_ID}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}`;

    // Specific app schemes for direct opening
    if (method === "paytm") return `paytmmp://pay?${baseParams}`;
    if (method === "phonepe") return `phonepe://pay?${baseParams}`;
    if (method === "googlepay") return `tez://upi/pay?${baseParams}`;

    return `upi://pay?${baseParams}`;
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPayment(method);
    setHasConfirmedPayment(false);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleOpenPaymentApp = () => {
    if (!payment || payment === "cod") return;
    const paymentUrl = buildUpiLink(payment);

    try {
      window.location.href = paymentUrl;
      toast.success("Opening payment app...");
      
      setTimeout(() => {
        if (!document.hidden) {
          toast.info("If the app didn't open, manually pay to: " + PAYMENT_MOBILE);
        }
      }, 3000);
    } catch (error) {
      toast.error("Unable to open app. Please pay manually.");
    }
  };

  const saveOrderToBackend = async (order) => {
    // Attempt to save to backend but don't block the user if it fails
    const isLocal = window.location.hostname === "localhost";
    const apiBase = isLocal ? "http://localhost:3000" : "";
    
    try {
      const response = await fetch(`${apiBase}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      return response.ok;
    } catch (e) {
      console.error("Backend error (silent):", e);
      return false;
    }
  };

  const sendWhatsAppOrder = (order) => {
    const itemsList = order.items.map((item) => `- ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`).join("\n");
    
    const message = `*New Anjoy Order!* 🛒\n\n` +
      `*Order ID:* #${order.orderId}\n` +
      `*Customer:* ${order.customer.name}\n` +
      `*Phone:* ${order.customer.phone}\n` +
      `*Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Payment Method:* ${paymentOptions.find(p => p.id === order.payment)?.label}\n` +
      `*Total Amount:* ₹${order.total}\n\n` +
      `Please confirm my order. Thank you!`;

    const url = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all delivery details");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }

    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const orderPayload = {
      orderId,
      total: grandTotal,
      payment,
      customer: { ...form },
      items: items.map((item) => ({
        id: item.laddu.id,
        name: item.laddu.name,
        price: item.laddu.price,
        quantity: item.quantity,
      })),
    };

    try {
      setIsSaving(true);
      
      // Save to backend (optional)
      await saveOrderToBackend(orderPayload);
      
      // Always open WhatsApp (The User's Option 1)
      sendWhatsAppOrder(orderPayload);
      
      toast.success("Order details sent on WhatsApp! 🎉");
      clearCart();
      navigate("/order-success", {
        state: { total: grandTotal, payment, orderId },
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Delivery Details */}
          <div className="space-y-6">
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
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePaymentSelect(p.id)}
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
            </div>

            {payment && payment !== "cod" && (
              <div className="p-4 bg-secondary rounded-lg border border-border">
                <p className="text-sm font-semibold mb-2">Pay ₹{grandTotal.toFixed(2)} to {PAYMENT_MOBILE}</p>
                
                {/* QR Code */}
                <div className="mb-4 flex flex-col items-center p-3 bg-white rounded-lg">
                  <QRCodeSVG value={buildUpiLink("qr")} size={160} />
                  <p className="text-[10px] text-gray-500 mt-2">Scan with any UPI app</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      id="confirm-pay"
                      type="checkbox"
                      checked={hasConfirmedPayment}
                      onChange={(e) => setHasConfirmedPayment(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="confirm-pay" className="text-xs">I have completed the payment</label>
                  </div>
                  <Button size="sm" onClick={handleOpenPaymentApp} className="w-full text-xs">
                    Open Payment App
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Order Summary</h2>
              <div className="bg-card rounded-lg border border-border p-5 space-y-3">
                {items.map((item) => (
                  <div key={item.laddu.id} className="flex justify-between text-sm">
                    <span>{item.laddu.name} × {item.quantity}</span>
                    <span className="font-semibold">₹{item.laddu.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleOrder}
              disabled={!payment || isSaving || (payment !== "cod" && !hasConfirmedPayment)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14"
            >
              {isSaving ? "Processing..." : "Place Order on WhatsApp"}
            </Button>
            
            <p className="text-[10px] text-center text-muted-foreground">
              Clicking "Place Order" will open WhatsApp to send your details to the seller.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

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
  const [hasConfirmedPayment, setHasConfirmedPayment] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const UPI_ID = import.meta.env.VITE_UPI_ID ?? "8008144268-2@axl";

  const buildUpiLink = (method: PaymentMethod) => {
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: "Anjoy Laddu",
      am: total.toString(),
      cu: "INR",
      tn: `Anjoy Order via ${paymentOptions.find((p) => p.id === method)?.label ?? "UPI"}`,
    });

    return `upi://pay?${params.toString()}`;
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPayment(method);
    setHasConfirmedPayment(false);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleOpenPaymentApp = () => {
    if (!payment || payment === "cod") return;
    const paymentUrl = buildUpiLink(payment);
    
    // Try opening via iframe to avoid page navigation
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = paymentUrl;
      document.body.appendChild(iframe);
      
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
      
      toast.success("Attempting to open payment app...");
      
      // Fallback message after timeout
      setTimeout(() => {
        if (!document.hidden) {
          toast.info("If payment app didn't open, complete payment manually and check the box below.");
        }
      }, 3000);
    } catch (error) {
      toast.error("Unable to open payment app. Please complete payment manually.");
    }
  };

  const saveOrderToBackend = async (order) => {
    const apiBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
    const response = await fetch(`${apiBase}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || "Failed to save order to backend");
    }

    return response.json();
  };

  const SELLER_WHATSAPP_NUMBER = "918008144268";
  const SELLER_EMAIL = "nanib9269@gmail.com";

  const buildWhatsAppUrl = (order) => {
    const lines = [
      `Anjoy Order #${order.orderId}`,
      `Customer: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`,
      `Payment Method: ${order.payment}`,
      "Order Items:",
      ...order.items.map((item) => `- ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`),
      `Total: ₹${order.total}`,
      `Estimated Delivery: ${order.estimatedDelivery}`,
      "\nPlease confirm this order.",
    ];

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${text}`;
  };

  const buildEmailUrl = (order) => {
    const subject = encodeURIComponent(`New Anjoy Order #${order.orderId}`);
    const body = encodeURIComponent([
      `Anjoy Order #${order.orderId}`,
      `Customer: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`,
      `Payment Method: ${order.payment}`,
      "Order Items:",
      ...order.items.map((item) => `- ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`),
      `Total: ₹${order.total}`,
      `Estimated Delivery: ${order.estimatedDelivery}`,
    ].join("\n"));

    return `mailto:${SELLER_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openWhatsAppWithOrder = (order) => {
    const url = buildWhatsAppUrl(order);
    window.open(url, "_blank");
  };

  const openEmailWithOrder = (order) => {
    const url = buildEmailUrl(order);
    window.open(url, "_blank");
  };

  const sendEmailNotification = async (order) => {
    try {
      // EmailJS configuration - Replace with your actual service details
      const serviceId = 'your_service_id'; // Replace with your EmailJS service ID
      const templateId = 'your_template_id'; // Replace with your EmailJS template ID
      const publicKey = 'your_public_key'; // Replace with your EmailJS public key

      const templateParams = {
        to_email: SELLER_EMAIL,
        order_id: order.orderId,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        customer_address: `${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`,
        payment_method: order.payment,
        order_items: order.items.map(item => `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n'),
        total_amount: `₹${order.total}`,
        estimated_delivery: order.estimatedDelivery,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
      // Fallback to mailto if EmailJS fails
      openEmailWithOrder(order);
    }
  };

  const createOrderPayload = () => {
    const orderId = generateOrderId();
    const estimatedDelivery = "30-45 minutes";

    return {
      orderId,
      total,
      payment,
      estimatedDelivery,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
      },
      items: items.map((item) => ({
        id: item.laddu.id,
        name: item.laddu.name,
        price: item.laddu.price,
        quantity: item.quantity,
      })),
    };
  };

  const handleSendOrderWhatsApp = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all delivery details before sending WhatsApp.");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method before sending WhatsApp.");
      return;
    }

    const orderPayload = createOrderPayload();
    openWhatsAppWithOrder(orderPayload);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const generateOrderId = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all delivery details");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }

    const orderPayload = createOrderPayload();

    try {
      setIsSaving(true);
      await saveOrderToBackend(orderPayload);
      openWhatsAppWithOrder(orderPayload);
      await sendEmailNotification(orderPayload);
      toast.success("Order placed successfully! 🎉");
      clearCart();
      navigate("/order-success", {
        state: { total, payment, orderId: orderPayload.orderId, estimatedDelivery: orderPayload.estimatedDelivery },
      });
    } catch (error) {
      toast.error(`${error instanceof Error ? error.message : "Unable to save order"}`);
    } finally {
      setIsSaving(false);
    }
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

            {payment && payment !== "cod" && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-foreground font-semibold mb-1">Selected: {paymentOptions.find((p) => p.id === payment)?.label}</p>
                <p className="text-sm text-foreground mb-3">Pay ₹{total} using your app.</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Send payment to UPI ID: <span className="font-mono font-semibold text-primary">{UPI_ID}</span>
                </p>
                <div className="mb-4 text-xs text-muted-foreground bg-primary/10 p-2 rounded">
                  <strong>📱 Payment Instructions:</strong>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Click "Open payment app" below</li>
                    <li>Complete the payment in your {paymentOptions.find((p) => p.id === payment)?.label} app</li>
                    <li>Return to this page and check the confirmation box</li>
                    <li>Click "Place Order" to confirm</li>
                  </ol>
                  <p className="mt-2 text-foreground">
                    Note: this is a demo-style checkout flow. If PhonePe declines the UPI ID, replace it with a valid UPI ID, mobile number, or QR code.
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    id="confirm-payment"
                    type="checkbox"
                    checked={hasConfirmedPayment}
                    onChange={(e) => setHasConfirmedPayment(e.target.checked)}
                    className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                  />
                  <label htmlFor="confirm-payment" className="text-sm text-foreground">
                    I have paid ₹{total} to {UPI_ID} via {paymentOptions.find((p) => p.id === payment)?.label}.
                  </label>
                </div>
                <Button size="sm" onClick={handleOpenPaymentApp} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Open payment app
                </Button>
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

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={handleSendOrderWhatsApp}
                disabled={
                  !payment ||
                  isSaving ||
                  (payment !== "cod" && !hasConfirmedPayment)
                }
                className="w-full mt-6 bg-green-600 text-primary-foreground hover:bg-green-700 text-base"
              >
                Send Order on WhatsApp
              </Button>

              <Button
                size="lg"
                onClick={handleOrder}
                disabled={
                  !payment ||
                  isSaving ||
                  (payment !== "cod" && !hasConfirmedPayment)
                }
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

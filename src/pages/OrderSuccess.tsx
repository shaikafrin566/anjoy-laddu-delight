import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface OrderState {
  total?: number;
  payment?: string;
  orderId?: string;
}

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OrderState | null;
  const total = state?.total ?? 0;
  const payment = state?.payment ?? "Payment method";
  const orderId = state?.orderId ?? "N/A";

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary">
            ✅
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-base text-muted-foreground mb-6">
            Your order has been placed successfully. Thank you for choosing Anjoy.
          </p>
          <div className="grid gap-3 rounded-2xl border border-border bg-background p-6 text-left">
            <div className="flex justify-between text-sm text-foreground/80">
              <span>Order number</span>
              <span className="font-semibold">#{orderId}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/80">
              <span>Order total</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/80">
              <span>Payment method</span>
              <span className="font-semibold capitalize">{payment}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              We will contact you soon to confirm the delivery details. Please keep your phone nearby.
            </div>
          </div>
          <Button className="mt-8" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

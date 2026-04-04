import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LastOrderSummary {
  orderId: string;
  total: number;
  estimatedDelivery?: string;
  createdAt?: string;
}

interface ProducerSummary {
  count: number;
  lastOrder?: LastOrderSummary | null;
}

const ProducerPage = () => {
  const [summary, setSummary] = useState<ProducerSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
        const response = await fetch(`${apiBase}/api/orders/summary`);
        if (!response.ok) {
          throw new Error("Unable to load order summary");
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary">
            📦
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Producer Order Summary</h1>
          <p className="text-base text-muted-foreground mb-6">
            This page shows only order status for the producer. Customer details are not displayed here.
          </p>

          {loading ? (
            <p className="text-sm text-foreground/80">Loading order summary...</p>
          ) : error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <div className="space-y-4 text-left">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-sm text-foreground/80">Total orders placed</p>
                <p className="text-3xl font-bold text-foreground">{summary?.count ?? 0}</p>
              </div>

              {summary?.lastOrder ? (
                <div className="rounded-2xl border border-border bg-background p-6">
                  <p className="text-sm text-foreground/80 mb-2">Latest order</p>
                  <div className="grid gap-2 text-sm text-foreground/80">
                    <div className="flex justify-between">
                      <span>Order ID</span>
                      <span className="font-semibold text-foreground">{summary.lastOrder.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order total</span>
                      <span className="font-semibold text-foreground">₹{summary.lastOrder.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated delivery</span>
                      <span className="font-semibold text-foreground">{summary.lastOrder.estimatedDelivery ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created</span>
                      <span className="font-semibold text-foreground">{summary.lastOrder.createdAt ? new Date(summary.lastOrder.createdAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-background p-6 text-sm text-foreground/80">
                  No orders have been placed yet.
                </div>
              )}
            </div>
          )}

          <Button className="mt-8" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default ProducerPage;

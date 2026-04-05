import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  orderId: string;
  total: number;
  payment: string;
  estimatedDelivery: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
}

const SellerDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
      const response = await fetch(`${apiBase}/api/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Seller Dashboard</h1>
          <Button onClick={fetchOrders} variant="outline">
            Refresh Orders
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{orders.length}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{orders.reduce((sum, order) => sum + order.total, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {orders.filter(order => order.payment !== 'cod').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Online Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">Recent Orders</h2>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No orders yet</p>
                </CardContent>
              </Card>
            ) : (
              orders.slice().reverse().map((order) => (
                <Card key={order.orderId}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <Badge variant={order.payment === 'cod' ? 'secondary' : 'default'}>
                        {order.payment.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Details</h4>
                        <p className="text-sm"><strong>Name:</strong> {order.customer.name}</p>
                        <p className="text-sm"><strong>Phone:</strong> {order.customer.phone}</p>
                        <p className="text-sm"><strong>Address:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Order Details</h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm">
                              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                            </p>
                          ))}
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <p className="text-sm font-semibold">Total: ₹{order.total}</p>
                          <p className="text-sm text-muted-foreground">
                            Estimated Delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
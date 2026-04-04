import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const ordersFile = path.resolve("server", "orders.json");

app.use(cors({ origin: true }));
app.use(express.json());

const readOrders = () => {
  try {
    const data = fs.readFileSync(ordersFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), "utf8");
};

app.get("/api/orders", (req, res) => {
  res.json(readOrders());
});

app.get("/api/orders/summary", (req, res) => {
  const orders = readOrders();
  const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  res.json({
    count: orders.length,
    lastOrder: lastOrder
      ? {
          orderId: lastOrder.orderId,
          total: lastOrder.total,
          estimatedDelivery: lastOrder.estimatedDelivery,
          createdAt: lastOrder.createdAt,
        }
      : null,
  });
});

app.post("/api/orders", (req, res) => {
  const order = req.body;

  if (!order || !order.orderId || !order.items || !order.total) {
    return res.status(400).json({ error: "Invalid order payload" });
  }

  const orders = readOrders();
  order.createdAt = new Date().toISOString();
  orders.push(order);
  writeOrders(orders);

  res.status(201).json({ message: "Order saved", order });
});

app.listen(port, () => {
  console.log(`Order API listening at http://localhost:${port}`);
});

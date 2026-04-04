import { createContext, useContext, useState, ReactNode } from "react";
import { Laddu } from "@/data/laddus";

export interface CartItem {
  laddu: Laddu;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (laddu: Laddu) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (laddu: Laddu) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.laddu.id === laddu.id);
      if (existing) {
        return prev.map((i) => i.laddu.id === laddu.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { laddu, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i.laddu.id !== id));
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems((prev) => prev.map((i) => i.laddu.id === id ? { ...i, quantity } : i));
  };
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.laddu.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

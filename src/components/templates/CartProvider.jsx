import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'aska_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p)));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0) * (it.quantity || 1), 0), [items]);

  const value = useMemo(() => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, total }), [items, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartProvider;

import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>(() => {
    const saved = localStorage.getItem('luxe-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luxe-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems };
};

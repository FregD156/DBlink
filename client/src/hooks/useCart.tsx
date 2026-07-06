'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Color, CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, color: Color, quantity?: number) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateQuantity: (productId: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('dblink_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('dblink_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const addToCart = (product: Product, color: Color, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.hex === color.hex
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.selectedColor.hex === colorHex))
    );
  };

  const updateQuantity = (productId: string, colorHex: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Tránh lỗi mismatch server-client render của NextJS bằng cách chờ component mounted
  return (
    <CartContext.Provider
      value={{
        cartItems: mounted ? cartItems : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: mounted ? cartCount : 0,
        cartTotal: mounted ? cartTotal : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

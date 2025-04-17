"use client";

import React, { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
};
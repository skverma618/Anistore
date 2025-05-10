"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    console.log('WishlistProvider: Initializing from localStorage');
    const storedWishlist = localStorage.getItem('animestore-wishlist');
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        console.log('WishlistProvider: Loaded wishlist from localStorage:', parsedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('animestore-wishlist');
      }
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      console.log('WishlistProvider: Saving wishlist to localStorage:', wishlistItems);
      localStorage.setItem('animestore-wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = (product: Product) => {
    console.log('Adding to wishlist:', product);
    
    try {
      setWishlistItems(prevItems => {
        // Check if product already exists in wishlist
        const existingItem = prevItems.find(item => item.id === product.id);
        
        console.log('Existing item in wishlist:', existingItem);

        if (existingItem) {
          toast.info(`${product.name} is already in your wishlist`);
          return prevItems;
        } else {
          // Add new product to wishlist
          console.log('New wishlist item:', product);
          toast.success(`Added ${product.name} to wishlist`);
          return [...prevItems, product];
        }
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = (productId: string) => {
    console.log('Removing from wishlist:', productId);
    
    try {
      setWishlistItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === productId);
        if (itemToRemove) {
          console.log('Item to remove from wishlist:', itemToRemove);
          toast.info(`Removed ${itemToRemove.name} from wishlist`);
        }
        return prevItems.filter(item => item.id !== productId);
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info('Wishlist cleared');
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
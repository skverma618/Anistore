"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Heart, ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleRemoveItem = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  const handleClearWishlist = () => {
    clearWishlist();
  };
  
  const handleAddToCart = (productId: string) => {
    console.log('Add to cart clicked from wishlist for product ID:', productId);
    
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      // Make sure all required properties are included
      const completeProduct = {
        ...product,
        subcategory: product.subcategory || '',
        rating: product.rating || 5,
        reviewCount: product.reviewCount || 0
      };
      
      console.log('Product to add from wishlist:', completeProduct);
      addToCart(completeProduct);
      toast.success(`Added ${product.name} to cart`);
    }
  };
  
  const handleMoveAllToCart = () => {
    console.log('Move all to cart clicked');
    
    wishlistItems.forEach(item => {
      // Make sure all required properties are included
      const completeProduct = {
        ...item,
        subcategory: item.subcategory || '',
        rating: item.rating || 5,
        reviewCount: item.reviewCount || 0
      };
      
      addToCart(completeProduct);
    });
    
    toast.success(`Added ${wishlistItems.length} items to cart`);
    clearWishlist();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex flex-wrap items-center text-sm">
          <li className="flex items-center">
            <Link 
              href="/"
              className="text-muted-foreground hover:text-anime-neonPurple transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          </li>
          <li>
            <span className="font-medium text-anime-neonPurple">
              Wishlist
            </span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <Heart className="h-24 w-24 text-muted-foreground/30" />
          </div>
          <h2 className="text-2xl font-medium">Your wishlist is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            You haven't added any items to your wishlist yet. 
            Browse our products and click the heart icon to save your favorites!
          </p>
          <Button 
            size="lg" 
            className="mt-4 bg-anime-deepPurple hover:bg-anime-neonPurple"
            asChild
          >
            <Link href="/products">
              Explore Products
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-medium">{wishlistItems.length} items</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearWishlist}
                className="text-muted-foreground hover:text-anime-bloodRed border-anime-deepPurple/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Wishlist
              </Button>
              
              {wishlistItems.length > 0 && (
                <Button
                  size="sm"
                  onClick={handleMoveAllToCart}
                  className="bg-anime-deepPurple hover:bg-anime-neonPurple"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move All to Cart
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-background rounded-lg border border-anime-deepPurple/20 overflow-hidden flex flex-col h-full"
              >
                {/* Product Image */}
                <Link href={`/product/${item.id}`} className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.isSoldOut && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg tracking-wider rotate-[-10deg] transform bg-anime-bloodRed px-6 py-1">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </Link>
                
                {/* Product Info */}
                <div className="p-4 flex-grow flex flex-col">
                  <Link href={`/anime/${item.anime.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-xs font-medium text-anime-electricBlue hover:text-anime-neonPurple transition-colors">
                      {item.anime}
                    </span>
                  </Link>
                  <Link href={`/product/${item.id}`} className="mt-1 mb-2">
                    <h3 className="font-medium text-sm line-clamp-2 hover:text-anime-neonPurple transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-anime-bloodRed hover:text-anime-bloodRed/80 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <Button
                      className="w-full bg-anime-deepPurple hover:bg-anime-neonPurple"
                      size="sm"
                      disabled={item.isSoldOut}
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.isSoldOut ? "Sold Out" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
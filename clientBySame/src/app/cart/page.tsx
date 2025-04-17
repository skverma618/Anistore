"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleCheckout = () => {
    toast.success("Checkout functionality will be implemented soon!");
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
              Shopping Cart
            </span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground/30" />
          </div>
          <h2 className="text-2xl font-medium">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. 
            Explore our collection to find your favorite anime merchandise!
          </p>
          <Button 
            size="lg" 
            className="mt-4 bg-anime-deepPurple hover:bg-anime-neonPurple"
            asChild
          >
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-background rounded-lg border border-anime-deepPurple/20 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 p-4 bg-anime-deepPurple/5 text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-1 md:grid-cols-12 p-4 border-t border-anime-deepPurple/20 first:border-t-0"
                >
                  {/* Product */}
                  <div className="col-span-6 flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-anime-deepPurple/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        <Link 
                          href={`/product/${item.id}`}
                          className="hover:text-anime-neonPurple transition-colors"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.anime} • {item.category}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-2 flex items-center text-xs text-anime-bloodRed hover:text-anime-bloodRed/80 transition-colors md:hidden"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-2 flex items-center justify-between md:justify-center mb-2 md:mb-0">
                    <span className="md:hidden text-sm font-medium">Price:</span>
                    <span className="text-sm">${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-between md:justify-center mb-2 md:mb-0">
                    <span className="md:hidden text-sm font-medium">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-anime-deepPurple/20 rounded-l-md hover:bg-anime-deepPurple/5 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <div className="w-8 h-7 flex items-center justify-center border-t border-b border-anime-deepPurple/20 text-sm">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-anime-deepPurple/20 rounded-r-md hover:bg-anime-deepPurple/5 transition-colors"
                        disabled={item.quantity >= 10}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden text-sm font-medium">Total:</span>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="hidden md:flex items-center text-anime-bloodRed hover:text-anime-bloodRed/80 transition-colors ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                className="text-muted-foreground hover:text-anime-bloodRed border-anime-deepPurple/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
              
              <Button 
                size="sm" 
                variant="outline"
                className="border-anime-deepPurple/20 hover:text-anime-neonPurple"
                asChild
              >
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-lg border border-anime-deepPurple/20 p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-anime-deepPurple/20 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-anime-deepPurple hover:bg-anime-neonPurple"
                size="lg"
                onClick={handleCheckout}
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="mt-4 text-xs text-center text-muted-foreground">
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
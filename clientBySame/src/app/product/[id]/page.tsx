"use client";

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Heart, ShoppingCart, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductById, Product } from '@/data/products';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // Get product data
  const product = getProductById(productId);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  
  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
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
          <li className="flex items-center">
            <Link 
              href="/products"
              className="text-muted-foreground hover:text-anime-neonPurple transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          </li>
          <li className="flex items-center">
            <Link 
              href={`/products?category=${product.category}`}
              className="text-muted-foreground hover:text-anime-neonPurple transition-colors"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          </li>
          <li>
            <span className="font-medium text-anime-neonPurple">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-anime-deepPurple/20 bg-background">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.isHot && <Badge variant="hot">HOT</Badge>}
              {product.isLimited && <Badge variant="limited">LIMITED</Badge>}
              {product.originalPrice && (
                <Badge variant="destructive">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
            
            {/* Wishlist button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 z-10 rounded-full h-8 w-8 bg-background/80 hover:bg-background hover:text-anime-neonPurple backdrop-blur-sm transition-all border border-anime-deepPurple/20"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Thumbnail Images (in a real app, these would be different images) */}
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  selectedImage === product.image && index === 0
                    ? 'border-anime-neonPurple'
                    : 'border-anime-deepPurple/20 hover:border-anime-neonPurple/50'
                }`}
                onClick={() => setSelectedImage(product.image)}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {/* Anime & Product Name */}
          <div>
            <Link 
              href={`/products?anime=${product.anime.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-anime-electricBlue hover:text-anime-neonPurple transition-colors"
            >
              {product.anime}
            </Link>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-yellow-400'
                      : index < (product.rating || 0)
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground">
            High-quality {product.category} featuring {product.name} from {product.anime}. 
            Perfect for anime fans and collectors. Made with premium materials for comfort and durability.
          </p>
          
          {/* Attributes */}
          <div className="space-y-4">
            {/* Category */}
            <div className="flex items-center">
              <span className="w-24 text-sm font-medium">Category:</span>
              <Link 
                href={`/products?category=${product.category}`}
                className="text-sm hover:text-anime-neonPurple transition-colors"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
            
            {/* Subcategory */}
            <div className="flex items-center">
              <span className="w-24 text-sm font-medium">Type:</span>
              <Link 
                href={`/products?category=${product.category}&subcategory=${product.subcategory.toLowerCase()}`}
                className="text-sm hover:text-anime-neonPurple transition-colors"
              >
                {product.subcategory}
              </Link>
            </div>
            
            {/* Size (if applicable) */}
            {product.size && (
              <div>
                <span className="block text-sm font-medium mb-2">Size:</span>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-anime-deepPurple/20 rounded-md text-sm hover:border-anime-neonPurple hover:bg-anime-deepPurple/5 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color (if applicable) */}
            {product.color && (
              <div>
                <span className="block text-sm font-medium mb-2">Color:</span>
                <div className="flex flex-wrap gap-2">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      className="flex items-center px-3 py-1 border border-anime-deepPurple/20 rounded-md text-sm hover:border-anime-neonPurple hover:bg-anime-deepPurple/5 transition-colors"
                    >
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ 
                          background: color.toLowerCase() === 'multi' 
                            ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' 
                            : color.toLowerCase() 
                        }}
                      ></span>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Quantity */}
          <div>
            <span className="block text-sm font-medium mb-2">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 flex items-center justify-center border border-anime-deepPurple/20 rounded-l-md hover:bg-anime-deepPurple/5 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="w-14 h-10 flex items-center justify-center border-t border-b border-anime-deepPurple/20">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 flex items-center justify-center border border-anime-deepPurple/20 rounded-r-md hover:bg-anime-deepPurple/5 transition-colors"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart & Wishlist */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 bg-anime-deepPurple hover:bg-anime-neonPurple"
              disabled={product.isSoldOut}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.isSoldOut ? "Sold Out" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Share */}
          <div className="pt-2">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-anime-neonPurple"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs (simplified version) */}
      <div className="border-t border-anime-deepPurple/20 pt-8">
        <div className="flex border-b border-anime-deepPurple/20">
          <button className="px-4 py-2 font-medium text-anime-neonPurple border-b-2 border-anime-neonPurple">
            Description
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Reviews ({product.reviewCount})
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Shipping
          </button>
        </div>
        
        <div className="py-6">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Introducing our exclusive {product.name} from the {product.anime} collection. 
              This premium {product.category} is designed for true anime enthusiasts who appreciate 
              quality and attention to detail.
            </p>
            <p>
              Crafted with high-quality materials, this {product.subcategory} features authentic 
              designs that stay true to the {product.anime} universe. Whether you're adding to your 
              collection or looking for the perfect gift for an anime fan, this product delivers 
              exceptional value.
            </p>
            <p>
              • Premium quality {product.category}<br />
              • Official {product.anime} merchandise<br />
              • Durable construction<br />
              • Perfect for fans and collectors<br />
              • Makes a great gift
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
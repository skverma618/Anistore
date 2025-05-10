"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  anime: string;
  category: string;
  subcategory?: string;
  isNew?: boolean;
  isHot?: boolean;
  isLimited?: boolean;
  isSoldOut?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  anime,
  category,
  subcategory,
  isNew = false,
  isHot = false,
  isLimited = false,
  isSoldOut = false,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Calculate discount percentage if there's an original price
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
    
  const handleAddToCart = () => {
    console.log('Add to cart clicked for:', name);
    
    // Create a complete product object with all required fields
    const product: Product = {
      id,
      name,
      price,
      originalPrice,
      image,
      anime,
      category,
      subcategory: subcategory || '', // Provide default value for potentially missing properties
      isNew,
      isHot,
      isLimited,
      isSoldOut,
      rating: 5, // Default rating if not provided
      reviewCount: 0 // Default review count if not provided
    };
    
    console.log('Product to add:', product);
    addToCart(product);
  };
  
  const handleWishlistToggle = () => {
    // Create a complete product object with all required fields
    const product: Product = {
      id,
      name,
      price,
      originalPrice,
      image,
      anime,
      category,
      subcategory: subcategory || '', // Provide default value for potentially missing properties
      isNew,
      isHot,
      isLimited,
      isSoldOut,
      rating: 5, // Default rating if not provided
      reviewCount: 0 // Default review count if not provided
    };
    
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="anime-card h-full flex flex-col overflow-hidden border-anime-deepPurple/20 dark:border-anime-neonPurple/20 relative">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {isNew && <Badge variant="new">NEW</Badge>}
          {isHot && <Badge variant="hot">HOT</Badge>}
          {isLimited && <Badge variant="limited">LIMITED</Badge>}
          {discountPercentage > 0 && (
            <Badge variant="destructive">-{discountPercentage}%</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 z-10 rounded-full h-8 w-8 bg-background/80 hover:bg-background backdrop-blur-sm transition-all border border-anime-deepPurple/20 ${
            isInWishlist(id) ? 'text-anime-bloodRed hover:text-anime-bloodRed' : 'hover:text-anime-neonPurple'
          }`}
          aria-label={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistToggle}
        >
          <Heart className="h-4 w-4" fill={isInWishlist(id) ? "currentColor" : "none"} />
        </Button>

        {/* Product Image */}
        <CardHeader className="p-0 overflow-hidden aspect-square relative">
          <Link href={`/product/${id}`}>
            <div className="h-full w-full absolute group">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-xl tracking-wider rotate-[-10deg] transform bg-anime-bloodRed px-8 py-2">
                    SOLD OUT
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </CardHeader>

        {/* Product info */}
        <CardContent className="p-4 flex-grow">
          <Link href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="text-xs font-medium text-anime-electricBlue hover:text-anime-neonPurple transition-colors">
              {anime}
            </span>
          </Link>
          <Link href={`/product/${id}`} className="inline-block mt-1 mb-2">
            <h3 className="font-medium text-sm line-clamp-2 hover:text-anime-neonPurple transition-colors">
              {name}
            </h3>
          </Link>
          {/* <div className="text-sm text-muted-foreground">{category}</div> */}
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              disabled={isSoldOut}
              className={isSoldOut ? "opacity-50 cursor-not-allowed" : "bg-anime-deepPurple hover:bg-anime-neonPurple"}
              onClick={handleAddToCart}
            >
              {isSoldOut ? "Sold Out" : (
                <span className="flex items-center gap-1">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </span>
              )}
            </Button>
          </div>
        </CardFooter>

        {/* Slice effect overlay (appears on hover) */}
        <div className="slice-effect absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" />
      </Card>
    </motion.div>
  );
};

export default ProductCard;

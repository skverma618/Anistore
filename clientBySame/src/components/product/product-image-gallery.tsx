"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ImageModal } from './image-modal';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badges?: {
    isNew?: boolean;
    isHot?: boolean;
    isLimited?: boolean;
    discountPercentage?: number;
  };
}

export function ProductImageGallery({
  images,
  productName,
  badges = {}
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Handle navigation
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };
  
  // Open modal when main image is clicked
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg border border-anime-deepPurple/20 bg-background group cursor-zoom-in"
        onClick={openModal}
      >
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={currentIndex === 0}
          onError={(e) => {
            console.error(`Failed to load image: ${images[currentIndex]}`);
            // Fallback to first image if current image fails to load
            if (currentIndex !== 0) setCurrentIndex(0);
          }}
        />
        
        {/* Navigation arrows (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm ml-2"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm mr-2"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {badges.isNew && <Badge variant="new">NEW</Badge>}
          {badges.isHot && <Badge variant="hot">HOT</Badge>}
          {badges.isLimited && <Badge variant="limited">LIMITED</Badge>}
          {badges.discountPercentage && (
            <Badge variant="destructive">
              -{badges.discountPercentage}%
            </Badge>
          )}
        </div>
        
        {/* Wishlist button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 z-10 rounded-full h-8 w-8 bg-background/80 hover:bg-background hover:text-anime-neonPurple backdrop-blur-sm transition-all border border-anime-deepPurple/20"
          aria-label="Add to wishlist"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2" onClick={(e) => e.stopPropagation()}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square overflow-hidden rounded-md border ${
              currentIndex === index
                ? 'border-anime-neonPurple'
                : 'border-anime-deepPurple/20 hover:border-anime-neonPurple/50'
            }`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling up to parent
              handleThumbnailClick(index);
            }}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 20vw, 10vw"
              onError={(e) => {
                console.error(`Failed to load thumbnail: ${image}`);
                // Hide the thumbnail if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </button>
        ))}
      </div>
      
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        initialIndex={currentIndex}
        productName={productName}
      />
      
      {/* Debug info - remove in production */}
      {/* <div className="mt-2 text-xs text-muted-foreground">
        Current Index: {currentIndex} | Modal Open: {isModalOpen ? 'Yes' : 'No'}
      </div> */}
    </div>
  );
}
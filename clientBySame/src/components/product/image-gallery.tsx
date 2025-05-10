"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { ImageModal } from './image-modal';

// In a real application, each product would have multiple images
// For this demo, we'll generate dummy images based on the main product image
const generateProductImages = (product: Product): string[] => {
  // In a real app, this would be replaced with actual product images
  // For now, we'll just return the same image multiple times
  return Array(5).fill(product.image);
};

interface ImageGalleryProps {
  product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
  const images = generateProductImages(product);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Open modal when main image is clicked
  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square overflow-hidden rounded-lg border border-anime-deepPurple/20 bg-background cursor-pointer"
        onClick={handleMainImageClick}
      >
        <Image
          src={images[selectedImageIndex]}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {product.isNew && <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</div>}
          {product.isHot && <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">HOT</div>}
          {product.isLimited && <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">LIMITED</div>}
          {product.originalPrice && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </div>
      </div>
      
      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border transition-all",
              selectedImageIndex === index
                ? "border-anime-neonPurple"
                : "border-anime-deepPurple/20 hover:border-anime-neonPurple/50"
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 20vw, 10vw"
            />
          </button>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        images={images} 
        initialIndex={selectedImageIndex}
        productName={product.name}
      />
    </div>
  );
}
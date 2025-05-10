"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
  productName: string;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  initialIndex,
  productName
}: ImageModalProps) {
  // All hooks must be at the top level, before any conditional returns
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle opening and closing with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to ensure the animation runs
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset current index and zoom when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && !isZoomed) {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight' && !isZoomed) {
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose, isZoomed]);

  // Handle image click for zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  // If modal is not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white/95 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        // Close modal when clicking on the background (not on the content)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full h-full max-w-7xl max-h-[90vh] mx-auto flex transition-transform duration-300 ${
          isAnimating ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Thumbnail previews on left side - vertical layout */}
        <div className="h-full w-[80px] flex flex-col items-center py-16 space-y-2 overflow-y-auto border-r border-gray-200">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden transition-all ${
                currentIndex === index
                  ? 'border-2 border-pink-500'
                  : 'border border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="60px"
                onError={(e) => {
                  console.error(`Failed to load modal thumbnail: ${image}`);
                  // Hide the thumbnail if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>

        {/* Image carousel */}
        <div className="h-full flex-1 flex items-center justify-center">
          <Carousel
            className="w-full h-full"
            opts={{
              loop: true,
              startIndex: currentIndex,
            }}
            setApi={(api) => {
              // When the carousel API is available, set up a select event handler
              if (api) {
                api.on('select', () => {
                  setCurrentIndex(api.selectedScrollSnap());
                  setIsZoomed(false); // Reset zoom when changing images
                });
              }
            }}
          >
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <div
                    className="relative w-4/5 h-[80vh] flex items-center justify-center"
                    style={{ overflow: isZoomed ? 'visible' : 'hidden' }}
                    onClick={toggleZoom}
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-300 ${
                        isZoomed ? 'scale-150' : 'scale-100'
                      }`}
                      style={{
                        transformOrigin: 'center center',
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                        position: 'relative'
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${productName} image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority={index === initialIndex}
                        quality={90}
                        style={{ position: 'absolute' }}
                        onError={(e) => {
                          console.error(`Failed to load modal image: ${image}`);
                          // If the current image fails to load, try to move to the next one
                          if (currentIndex === index && images.length > 1) {
                            setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                          }
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Always show navigation buttons, even when zoomed */}
            <CarouselPrevious
              className="left-20 h-12 w-12 bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-md z-50"
              onClick={() => {
                setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
                if (isZoomed) setIsZoomed(false); // Reset zoom when changing images
              }}
            />
            <CarouselNext
              className="right-4 h-12 w-12 bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-md z-50"
              onClick={() => {
                setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
                if (isZoomed) setIsZoomed(false); // Reset zoom when changing images
              }}
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
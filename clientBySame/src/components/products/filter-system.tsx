"use client";

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

// Define types for filter values
type FilterValue = string | number | boolean;

// Define the type for active filters
export type ProductFilters = {
  price?: number[];
  anime?: string[];
  availability?: string[];
  size?: string[];
  gender?: string[];
  color?: string[];
  material?: string[];
  sort?: string[];
  type?: string[];
  [key: string]: string[] | number[] | undefined;
};

type CategoryFilters = Record<string, Record<string, string[] | { min: number; max: number }>>;

// Filter configuration based on category
const filterConfig: CategoryFilters = {
  // Global filters for all categories
  global: {
    anime: ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball', 'Jujutsu Kaisen', 'Tokyo Revengers'],
    price: { min: 0, max: 5000 },
    availability: ['In Stock', 'Out of Stock', 'Pre-order'],
    sort: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Trending', 'Best Selling']
  },
  
  // Category-specific filters
  clothing: {
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    gender: ['Men', 'Women', 'Unisex', 'Kids'],
    color: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Grey', 'Multi'],
    fit: ['Regular', 'Slim', 'Oversized', 'Relaxed'],
    material: ['Cotton', 'Polyester', 'Blend', 'Fleece', 'Denim']
  },
  
  accessories: {
    type: ['Jewelry', 'Props', 'Bags', 'Tech Accessories'],
    material: ['Metal', 'Plastic', 'Fabric', 'Leather', 'Silicone'],
    color: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Grey', 'Multi']
  },
  
  costumes: {
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    gender: ['Men', 'Women', 'Unisex', 'Kids'],
    type: ['Full Sets', 'Partial Sets', 'Cloaks', 'Robes', 'Shoes'],
    character: ['Naruto', 'Luffy', 'Tanjiro', 'Eren', 'Deku', 'Goku']
  },
  
  'collectibles-decor': {
    type: ['Stickers', 'Toys & Figures', 'Home & Decor', 'Posters & Art'],
    size: ['Small', 'Medium', 'Large'],
    material: ['PVC', 'Fabric', 'Paper', 'Metal', 'Resin', 'Plastic']
  }
};

interface FilterSystemProps {
  category?: string;
  subcategory?: string;
  onFilterChange?: (filters: ProductFilters) => void;
}

const FilterSystem: React.FC<FilterSystemProps> = ({ category, subcategory, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({});
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['anime', 'price']);
  
  // Determine which filters to show based on the category
  const getCategoryFilters = () => {
    const categoryKey = category?.toLowerCase() || '';
    
    // Map from URL parameter to filter config key
    const categoryMap: Record<string, string> = {
      'clothing': 'clothing',
      'accessories': 'accessories',
      'costumes': 'costumes',
      'collectibles-decor': 'collectibles-decor'
    };
    
    const mappedCategory = categoryMap[categoryKey] || '';
    
    return {
      ...filterConfig.global,
      ...(mappedCategory ? filterConfig[mappedCategory] : {})
    };
  };
  
  const availableFilters = getCategoryFilters();
  
  // Toggle a filter section's expanded state
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };
  
  // Handle checkbox filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType] as string[] || [];
      
      return {
        ...prev,
        [filterType]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };
  
  // Handle price range changes
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setActiveFilters(prev => ({
      ...prev,
      price: values
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setPriceRange([0, 5000]);
  };
  
  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(activeFilters);
    }
  }, [activeFilters, onFilterChange]);
  
  // Helper function to check if a filter is an array
  const isFilterArray = (filter: string[] | { min: number; max: number }): filter is string[] => {
    return Array.isArray(filter);
  };
  
  // Render a filter section
  const renderFilterSection = (
    title: string, 
    filterKey: string, 
    items: string[],
    renderItem: (item: string) => React.ReactNode
  ) => {
    return (
      <>
        <div className="mb-2">
          <button 
            className="flex justify-between items-center w-full p-3 text-left hover:bg-anime-deepPurple/5 rounded-md transition-colors"
            onClick={() => toggleSection(filterKey)}
          >
            <h3 className="text-sm font-medium">{title}</h3>
            {expandedSections.includes(filterKey) ? 
              <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            }
          </button>
          
          {expandedSections.includes(filterKey) && (
            <div className="px-3 pt-2 pb-4">
              <div className="space-y-2">
                {items.map((item) => renderItem(item))}
              </div>
            </div>
          )}
        </div>
        
        <div className="h-px bg-anime-deepPurple/10 dark:bg-anime-neonPurple/10 my-2"></div>
      </>
    );
  };
  
  return (
    <div className="filter-system w-full max-w-[280px] bg-background border-r border-anime-deepPurple/10 dark:border-anime-neonPurple/10">
      <div className="filter-header flex justify-between items-center p-4 border-b border-anime-deepPurple/10 dark:border-anime-neonPurple/10">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-anime-neonPurple"
        >
          Clear All
        </Button>
      </div>
      
      <div className="filter-content p-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Price Range Filter */}
        {availableFilters.price && !isFilterArray(availableFilters.price) && (
          <>
            <div className="mb-2">
              <button 
                className="flex justify-between items-center w-full p-3 text-left hover:bg-anime-deepPurple/5 rounded-md transition-colors"
                onClick={() => toggleSection('price')}
              >
                <h3 className="text-sm font-medium">Price Range</h3>
                {expandedSections.includes('price') ? 
                  <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                }
              </button>
              
              {expandedSections.includes('price') && (
                <div className="px-3 pt-2 pb-4">
                  <div className="price-range-container">
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <Slider
                      defaultValue={[0, 5000]}
                      value={priceRange}
                      min={0}
                      max={5000}
                      step={100}
                      onValueChange={handlePriceChange}
                      className="my-4"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-px bg-anime-deepPurple/10 dark:bg-anime-neonPurple/10 my-2"></div>
          </>
        )}
        
        {/* Anime Filter */}
        {availableFilters.anime && isFilterArray(availableFilters.anime) && 
          renderFilterSection('Anime/Series', 'anime', availableFilters.anime, (anime) => (
            <div key={anime} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`anime-${anime}`}
                checked={Array.isArray(activeFilters.anime) && activeFilters.anime.includes(anime)}
                onChange={() => handleFilterChange('anime', anime)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`anime-${anime}`}
                className="text-sm cursor-pointer"
              >
                {anime}
              </label>
            </div>
          ))
        }
        
        {/* Availability Filter */}
        {availableFilters.availability && isFilterArray(availableFilters.availability) && 
          renderFilterSection('Availability', 'availability', availableFilters.availability, (status) => (
            <div key={status} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`availability-${status}`}
                checked={Array.isArray(activeFilters.availability) && activeFilters.availability.includes(status)}
                onChange={() => handleFilterChange('availability', status)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`availability-${status}`}
                className="text-sm cursor-pointer"
              >
                {status}
              </label>
            </div>
          ))
        }
        
        {/* Size Filter */}
        {availableFilters.size && isFilterArray(availableFilters.size) && 
          renderFilterSection('Size', 'size', availableFilters.size, (size) => (
            <div key={size} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={Array.isArray(activeFilters.size) && activeFilters.size.includes(size)}
                onChange={() => handleFilterChange('size', size)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`size-${size}`}
                className="text-sm cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))
        }
        
        {/* Gender Filter */}
        {availableFilters.gender && isFilterArray(availableFilters.gender) && 
          renderFilterSection('Gender', 'gender', availableFilters.gender, (gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`gender-${gender}`}
                checked={Array.isArray(activeFilters.gender) && activeFilters.gender.includes(gender)}
                onChange={() => handleFilterChange('gender', gender)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`gender-${gender}`}
                className="text-sm cursor-pointer"
              >
                {gender}
              </label>
            </div>
          ))
        }
        
        {/* Color Filter */}
        {availableFilters.color && isFilterArray(availableFilters.color) && 
          renderFilterSection('Color', 'color', availableFilters.color, (color) => (
            <div key={color} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={Array.isArray(activeFilters.color) && activeFilters.color.includes(color)}
                onChange={() => handleFilterChange('color', color)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`color-${color}`}
                className="flex items-center text-sm cursor-pointer"
              >
                <span 
                  className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300"
                  style={{ 
                    background: color.toLowerCase() === 'multi' 
                      ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' 
                      : color.toLowerCase() 
                  }}
                ></span>
                {color}
              </label>
            </div>
          ))
        }
        
        {/* Type Filter */}
        {availableFilters.type && isFilterArray(availableFilters.type) && 
          renderFilterSection('Type', 'type', availableFilters.type, (type) => (
            <div key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={Array.isArray(activeFilters.type) && activeFilters.type.includes(type)}
                onChange={() => handleFilterChange('type', type)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))
        }
        
        {/* Material Filter */}
        {availableFilters.material && isFilterArray(availableFilters.material) && 
          renderFilterSection('Material', 'material', availableFilters.material, (material) => (
            <div key={material} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`material-${material}`}
                checked={Array.isArray(activeFilters.material) && activeFilters.material.includes(material)}
                onChange={() => handleFilterChange('material', material)}
                className="h-4 w-4 rounded-sm border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`material-${material}`}
                className="text-sm cursor-pointer"
              >
                {material}
              </label>
            </div>
          ))
        }
        
        {/* Sort Options */}
        {availableFilters.sort && isFilterArray(availableFilters.sort) && 
          renderFilterSection('Sort By', 'sort', availableFilters.sort, (sortOption) => (
            <div key={sortOption} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`sort-${sortOption}`}
                name="sort"
                checked={Array.isArray(activeFilters.sort) && activeFilters.sort.includes(sortOption)}
                onChange={() => {
                  // For sort, we only want one option selected at a time
                  setActiveFilters(prev => ({
                    ...prev,
                    sort: [sortOption]
                  }));
                }}
                className="h-4 w-4 rounded-full border border-anime-deepPurple/50 focus:outline-none focus:ring-1 focus:ring-anime-neonPurple"
              />
              <label 
                htmlFor={`sort-${sortOption}`}
                className="text-sm cursor-pointer"
              >
                {sortOption}
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FilterSystem;
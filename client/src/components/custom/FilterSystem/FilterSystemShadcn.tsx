import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define types for filter values
type FilterValue = string | number | boolean;
type FilterValues = FilterValue[];
type FilterConfig = Record<string, FilterValues | { min: number; max: number }>;
type CategoryFilters = Record<string, FilterConfig>;

// Filter configuration based on category
const filterConfig: CategoryFilters = {
  // Global filters for all categories
  global: {
    anime: ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball', 'Jujutsu Kaisen', 'Tokyo Revengers'],
    character: ['Naruto Uzumaki', 'Monkey D. Luffy', 'Tanjiro Kamado', 'Eren Yeager', 'Izuku Midoriya', 'Goku', 'Itadori Yuji', 'Manjiro Sano'],
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
  
  posters: {
    size: ['Small (11"x17")', 'Medium (18"x24")', 'Large (24"x36")', 'Extra Large (27"x40")'],
    type: ['Wall Posters', 'Magnetic Posters', '3D Posters', 'Scrolls'],
    framing: ['Framed', 'Unframed'],
    orientation: ['Portrait', 'Landscape', 'Square']
  },
  
  stickers: {
    usage: ['Laptop', 'Bottle', 'Wall', 'Phone', 'Car'],
    finish: ['Glossy', 'Matte', 'Holographic', 'Transparent'],
    size: ['Small', 'Medium', 'Large'],
    material: ['Vinyl', 'Paper', 'PVC']
  },
  
  toys: {
    type: ['Plushie', 'Action Figure', 'Collectible', 'Nendoroid', 'Figma'],
    size: ['Mini', 'Standard', 'Large'],
    material: ['PVC', 'Fabric', 'Resin', 'Plastic'],
    articulation: ['Articulated', 'Non-articulated']
  },
  
  accessories: {
    type: ['Jewelry', 'Props', 'Bags', 'Tech Accessories'],
    material: ['Metal', 'Plastic', 'Fabric', 'Leather', 'Silicone'],
    color: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Grey', 'Multi']
  },
  
  costumes: {
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    gender: ['Men', 'Women', 'Unisex', 'Kids'],
    type: ['Full Sets', 'Partial Sets'],
    character: ['Naruto', 'Luffy', 'Tanjiro', 'Eren', 'Deku', 'Goku']
  },
  
  homeDecor: {
    type: ['Rugs', 'Pillows', 'Lamps', 'Wall Art', 'Bedding'],
    room: ['Bedroom', 'Living Room', 'Office', 'Kitchen'],
    size: ['Small', 'Medium', 'Large']
  }
};

// Define the type for active filters
type ActiveFilters = Record<string, string[] | number[]>;

interface FilterSystemProps {
  onFilterChange?: (filters: ActiveFilters) => void;
  className?: string;
}

const FilterSystemShadcn: React.FC<FilterSystemProps> = ({ onFilterChange, className }) => {
  const { productString } = useParams<{ productString?: string }>();
  const [category] = productString?.split('-') || [];
  
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['anime', 'price']);
  
  // Determine which filters to show based on the category
  const getCategoryFilters = (): Record<string, FilterValues | { min: number; max: number }> => {
    const categoryKey = category?.toLowerCase() || '';
    
    // Map from URL parameter to filter config key
    const categoryMap: Record<string, string> = {
      'clothing': 'clothing',
      'accessories': 'accessories',
      'costumes': 'costumes',
      'posters': 'posters',
      'stickers': 'stickers',
      'toys': 'toys',
      'home': 'homeDecor'
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
  const isFilterArray = (filter: FilterValues | { min: number; max: number }): filter is FilterValues => {
    return Array.isArray(filter);
  };
  
  return (
    <Sidebar className={cn("w-full max-w-[300px] bg-white border-r border-gray-200", className)}>
      <SidebarHeader className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold m-0">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-sm text-gray-600"
        >
          Clear All
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="py-2 overflow-y-auto max-h-[calc(100vh-60px)]">
        {/* Price Range Filter */}
        {availableFilters.price && !isFilterArray(availableFilters.price) && (
          <>
            <Collapsible 
              open={expandedSections.includes('price')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('price')}
              >
                <h3 className="text-base font-medium m-0">Price Range</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('price') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="py-2">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                    <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000]}
                    value={priceRange}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="h-1"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Anime Filter */}
        {availableFilters.anime && isFilterArray(availableFilters.anime) && (
          <>
            <Collapsible 
              open={expandedSections.includes('anime')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('anime')}
              >
                <h3 className="text-base font-medium m-0">Anime/Series</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('anime') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.anime.map((anime) => (
                    <div key={anime.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`anime-${anime}`}
                        checked={(activeFilters.anime as string[] || []).includes(anime.toString())}
                        onCheckedChange={() => handleFilterChange('anime', anime.toString())}
                      />
                      <label htmlFor={`anime-${anime}`} className="text-sm text-gray-800 cursor-pointer">
                        {anime}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Character Filter */}
        {availableFilters.character && isFilterArray(availableFilters.character) && (
          <>
            <Collapsible 
              open={expandedSections.includes('character')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('character')}
              >
                <h3 className="text-base font-medium m-0">Character</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('character') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.character.map((character) => (
                    <div key={character.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`character-${character}`}
                        checked={(activeFilters.character as string[] || []).includes(character.toString())}
                        onCheckedChange={() => handleFilterChange('character', character.toString())}
                      />
                      <label htmlFor={`character-${character}`} className="text-sm text-gray-800 cursor-pointer">
                        {character}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Availability Filter */}
        {availableFilters.availability && isFilterArray(availableFilters.availability) && (
          <>
            <Collapsible 
              open={expandedSections.includes('availability')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('availability')}
              >
                <h3 className="text-base font-medium m-0">Availability</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('availability') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.availability.map((status) => (
                    <div key={status.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`availability-${status}`}
                        checked={(activeFilters.availability as string[] || []).includes(status.toString())}
                        onCheckedChange={() => handleFilterChange('availability', status.toString())}
                      />
                      <label htmlFor={`availability-${status}`} className="text-sm text-gray-800 cursor-pointer">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Size Filter - For clothing, costumes, posters, etc. */}
        {availableFilters.size && isFilterArray(availableFilters.size) && (
          <>
            <Collapsible 
              open={expandedSections.includes('size')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('size')}
              >
                <h3 className="text-base font-medium m-0">Size</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('size') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.size.map((size) => (
                    <div key={size.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={(activeFilters.size as string[] || []).includes(size.toString())}
                        onCheckedChange={() => handleFilterChange('size', size.toString())}
                      />
                      <label htmlFor={`size-${size}`} className="text-sm text-gray-800 cursor-pointer">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Color Filter - For clothing and accessories */}
        {availableFilters.color && isFilterArray(availableFilters.color) && (
          <>
            <Collapsible 
              open={expandedSections.includes('color')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('color')}
              >
                <h3 className="text-base font-medium m-0">Color</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('color') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.color.map((color) => (
                    <div key={color.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={(activeFilters.color as string[] || []).includes(color.toString())}
                        onCheckedChange={() => handleFilterChange('color', color.toString())}
                      />
                      <label htmlFor={`color-${color}`} className="flex items-center text-sm text-gray-800 cursor-pointer">
                        <span 
                          className={cn(
                            "inline-block w-4 h-4 rounded-full mr-2 border border-gray-300",
                            {
                              "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500": color.toString().toLowerCase() === 'multi',
                              [`bg-${color.toString().toLowerCase()}`]: color.toString().toLowerCase() !== 'multi'
                            }
                          )}
                          style={{
                            backgroundColor: color.toString().toLowerCase() !== 'multi' 
                              ? color.toString().toLowerCase() 
                              : undefined
                          }}
                        ></span>
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Type Filter - For posters, stickers, toys, etc. */}
        {availableFilters.type && isFilterArray(availableFilters.type) && (
          <>
            <Collapsible 
              open={expandedSections.includes('type')}
              className="w-full"
            >
              <CollapsibleTrigger 
                className="flex justify-between items-center w-full py-3 px-4 bg-transparent border-none text-left cursor-pointer"
                onClick={() => toggleSection('type')}
              >
                <h3 className="text-base font-medium m-0">Type</h3>
                <span className="text-xs text-gray-600">
                  {expandedSections.includes('type') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <div className="flex flex-col gap-2">
                  {availableFilters.type.map((type) => (
                    <div key={type.toString()} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={(activeFilters.type as string[] || []).includes(type.toString())}
                        onCheckedChange={() => handleFilterChange('type', type.toString())}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm text-gray-800 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default FilterSystemShadcn;
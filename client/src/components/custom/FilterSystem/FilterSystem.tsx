import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import './FilterSystem.css';

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
}

const FilterSystem: React.FC<FilterSystemProps> = ({ onFilterChange }) => {
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
    <Sidebar className="filter-system">
      <SidebarHeader className="filter-header">
        <h2>Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="clear-filters-btn"
        >
          Clear All
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="filter-content">
        {/* Price Range Filter */}
        {availableFilters.price && !isFilterArray(availableFilters.price) && (
          <>
            <Collapsible 
              open={expandedSections.includes('price')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('price')}
              >
                <h3>Price Range</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('price') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="price-range-container">
                  <div className="price-inputs">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000]}
                    value={priceRange}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="price-slider"
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('anime')}
              >
                <h3>Anime/Series</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('anime') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.anime.map((anime) => (
                    <div key={anime.toString()} className="filter-option">
                      <Checkbox
                        id={`anime-${anime}`}
                        checked={(activeFilters.anime as string[] || []).includes(anime.toString())}
                        onCheckedChange={() => handleFilterChange('anime', anime.toString())}
                      />
                      <label htmlFor={`anime-${anime}`}>{anime}</label>
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('character')}
              >
                <h3>Character</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('character') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.character.map((character) => (
                    <div key={character.toString()} className="filter-option">
                      <Checkbox
                        id={`character-${character}`}
                        checked={(activeFilters.character as string[] || []).includes(character.toString())}
                        onCheckedChange={() => handleFilterChange('character', character.toString())}
                      />
                      <label htmlFor={`character-${character}`}>{character}</label>
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('availability')}
              >
                <h3>Availability</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('availability') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.availability.map((status) => (
                    <div key={status.toString()} className="filter-option">
                      <Checkbox
                        id={`availability-${status}`}
                        checked={(activeFilters.availability as string[] || []).includes(status.toString())}
                        onCheckedChange={() => handleFilterChange('availability', status.toString())}
                      />
                      <label htmlFor={`availability-${status}`}>{status}</label>
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('size')}
              >
                <h3>Size</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('size') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.size.map((size) => (
                    <div key={size.toString()} className="filter-option">
                      <Checkbox
                        id={`size-${size}`}
                        checked={(activeFilters.size as string[] || []).includes(size.toString())}
                        onCheckedChange={() => handleFilterChange('size', size.toString())}
                      />
                      <label htmlFor={`size-${size}`}>{size}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Gender Filter - For clothing and costumes */}
        {availableFilters.gender && isFilterArray(availableFilters.gender) && (
          <>
            <Collapsible 
              open={expandedSections.includes('gender')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('gender')}
              >
                <h3>Gender</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('gender') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.gender.map((gender) => (
                    <div key={gender.toString()} className="filter-option">
                      <Checkbox
                        id={`gender-${gender}`}
                        checked={(activeFilters.gender as string[] || []).includes(gender.toString())}
                        onCheckedChange={() => handleFilterChange('gender', gender.toString())}
                      />
                      <label htmlFor={`gender-${gender}`}>{gender}</label>
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('color')}
              >
                <h3>Color</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('color') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options color-options">
                  {availableFilters.color.map((color) => (
                    <div key={color.toString()} className="filter-option">
                      <Checkbox
                        id={`color-${color}`}
                        checked={(activeFilters.color as string[] || []).includes(color.toString())}
                        onCheckedChange={() => handleFilterChange('color', color.toString())}
                      />
                      <label htmlFor={`color-${color}`}>
                        <span 
                          className="color-swatch" 
                          style={{ 
                            backgroundColor: color.toString().toLowerCase() === 'multi' 
                              ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' 
                              : color.toString().toLowerCase() 
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
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('type')}
              >
                <h3>Type</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('type') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.type.map((type) => (
                    <div key={type.toString()} className="filter-option">
                      <Checkbox
                        id={`type-${type}`}
                        checked={(activeFilters.type as string[] || []).includes(type.toString())}
                        onCheckedChange={() => handleFilterChange('type', type.toString())}
                      />
                      <label htmlFor={`type-${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Material Filter - For clothing, toys, accessories */}
        {availableFilters.material && isFilterArray(availableFilters.material) && (
          <>
            <Collapsible 
              open={expandedSections.includes('material')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('material')}
              >
                <h3>Material</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('material') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.material.map((material) => (
                    <div key={material.toString()} className="filter-option">
                      <Checkbox
                        id={`material-${material}`}
                        checked={(activeFilters.material as string[] || []).includes(material.toString())}
                        onCheckedChange={() => handleFilterChange('material', material.toString())}
                      />
                      <label htmlFor={`material-${material}`}>{material}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Category-specific filters */}
        {/* Fit Filter - For clothing */}
        {availableFilters.fit && isFilterArray(availableFilters.fit) && (
          <>
            <Collapsible 
              open={expandedSections.includes('fit')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('fit')}
              >
                <h3>Fit</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('fit') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.fit.map((fit) => (
                    <div key={fit.toString()} className="filter-option">
                      <Checkbox
                        id={`fit-${fit}`}
                        checked={(activeFilters.fit as string[] || []).includes(fit.toString())}
                        onCheckedChange={() => handleFilterChange('fit', fit.toString())}
                      />
                      <label htmlFor={`fit-${fit}`}>{fit}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Framing Filter - For posters */}
        {availableFilters.framing && isFilterArray(availableFilters.framing) && (
          <>
            <Collapsible 
              open={expandedSections.includes('framing')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('framing')}
              >
                <h3>Framing</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('framing') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.framing.map((framing) => (
                    <div key={framing.toString()} className="filter-option">
                      <Checkbox
                        id={`framing-${framing}`}
                        checked={(activeFilters.framing as string[] || []).includes(framing.toString())}
                        onCheckedChange={() => handleFilterChange('framing', framing.toString())}
                      />
                      <label htmlFor={`framing-${framing}`}>{framing}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Usage Filter - For stickers */}
        {availableFilters.usage && isFilterArray(availableFilters.usage) && (
          <>
            <Collapsible 
              open={expandedSections.includes('usage')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('usage')}
              >
                <h3>Usage</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('usage') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.usage.map((usage) => (
                    <div key={usage.toString()} className="filter-option">
                      <Checkbox
                        id={`usage-${usage}`}
                        checked={(activeFilters.usage as string[] || []).includes(usage.toString())}
                        onCheckedChange={() => handleFilterChange('usage', usage.toString())}
                      />
                      <label htmlFor={`usage-${usage}`}>{usage}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Finish Filter - For stickers */}
        {availableFilters.finish && isFilterArray(availableFilters.finish) && (
          <>
            <Collapsible 
              open={expandedSections.includes('finish')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('finish')}
              >
                <h3>Finish</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('finish') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.finish.map((finish) => (
                    <div key={finish.toString()} className="filter-option">
                      <Checkbox
                        id={`finish-${finish}`}
                        checked={(activeFilters.finish as string[] || []).includes(finish.toString())}
                        onCheckedChange={() => handleFilterChange('finish', finish.toString())}
                      />
                      <label htmlFor={`finish-${finish}`}>{finish}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Room Filter - For home decor */}
        {availableFilters.room && isFilterArray(availableFilters.room) && (
          <>
            <Collapsible 
              open={expandedSections.includes('room')}
              className="filter-section"
            >
              <CollapsibleTrigger 
                className="filter-section-header"
                onClick={() => toggleSection('room')}
              >
                <h3>Room</h3>
                <span className="filter-arrow">
                  {expandedSections.includes('room') ? '▼' : '▶'}
                </span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="filter-section-content">
                <div className="filter-options">
                  {availableFilters.room.map((room) => (
                    <div key={room.toString()} className="filter-option">
                      <Checkbox
                        id={`room-${room}`}
                        checked={(activeFilters.room as string[] || []).includes(room.toString())}
                        onCheckedChange={() => handleFilterChange('room', room.toString())}
                      />
                      <label htmlFor={`room-${room}`}>{room}</label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <SidebarSeparator />
          </>
        )}
        
        {/* Sort By */}
        {availableFilters.sort && isFilterArray(availableFilters.sort) && (
          <Collapsible 
            open={expandedSections.includes('sort')}
            className="filter-section"
          >
            <CollapsibleTrigger 
              className="filter-section-header"
              onClick={() => toggleSection('sort')}
            >
              <h3>Sort By</h3>
              <span className="filter-arrow">
                {expandedSections.includes('sort') ? '▼' : '▶'}
              </span>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="filter-section-content">
              <div className="filter-options">
                {availableFilters.sort.map((sortOption) => (
                  <div key={sortOption.toString()} className="filter-option">
                    <Checkbox
                      id={`sort-${sortOption}`}
                      checked={(activeFilters.sort as string[] || []).includes(sortOption.toString())}
                      onCheckedChange={() => {
                        // Only allow one sort option at a time
                        setActiveFilters(prev => ({
                          ...prev,
                          sort: [sortOption.toString()]
                        }));
                      }}
                    />
                    <label htmlFor={`sort-${sortOption}`}>{sortOption}</label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  );
};

export default FilterSystem;
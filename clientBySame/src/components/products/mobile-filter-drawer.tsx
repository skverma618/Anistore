"use client";

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import FilterSystem, { ProductFilters } from './filter-system';

interface MobileFilterDrawerProps {
  category?: string;
  subcategory?: string;
  onFilterChange: (filters: ProductFilters) => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  category,
  subcategory,
  onFilterChange
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between lg:hidden"
        >
          <span>Filters</span>
          <FilterIcon className="h-4 w-4 ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-md p-0">
        <FilterSystem 
          category={category}
          subcategory={subcategory}
          onFilterChange={onFilterChange}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;